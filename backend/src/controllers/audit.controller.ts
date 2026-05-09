import { type Request, type Response } from 'express';
import { nanoid } from 'nanoid';
import Pricing from '../models/pricing.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { verifyHCaptcha } from '../utils/captcha.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateAuditSummary } from '../utils/summaryEngine.js';
import Audit, { type IToolInput, type IRecommendation } from '../models/audit.model.js';

// Helper Function to calculate the savings -->
export const calculateSavings = async (tools: IToolInput[], teamSize: number) => {
  let totalMonthlySavings = 0;
  const recommendations: IRecommendation[] = [];

  for (const inputTool of tools) {
    const pricingData = await Pricing.findOne({
      toolName: { $regex: new RegExp(`^${inputTool.toolName}$`, 'i') },
    });

    if (!pricingData) continue;

    const validTiers = pricingData.tiers.filter((t) => !t.maxSeats || teamSize <= t.maxSeats);

    if (validTiers.length > 0) {
      const bestTier = validTiers.reduce((prev, curr) => {
        const prevCost = prev.isFlatFee ? prev.pricePerSeat : prev.pricePerSeat * inputTool.seats;
        const currCost = curr.isFlatFee ? curr.pricePerSeat : curr.pricePerSeat * inputTool.seats;
        return prevCost < currCost ? prev : curr;
      });

      const idealMonthlySpend = bestTier.isFlatFee
        ? bestTier.pricePerSeat
        : bestTier.pricePerSeat * inputTool.seats;
      const potentialSavings = Math.max(0, inputTool.monthlySpend - idealMonthlySpend);

      // Only suggest alternatives if the current tool is expensive or if there's a Credex discount available elsewhere
      const alternativeTool = await Pricing.findOne({
        category: pricingData.category,
        toolName: { $ne: pricingData.toolName },
        credexAvailable: true,
      }).sort({ 'tiers.0.pricePerSeat': 1 });

      if (potentialSavings > 0) {
        totalMonthlySavings += potentialSavings;
        recommendations.push({
          toolName: inputTool.toolName,
          currentSpend: inputTool.monthlySpend,
          suggestedAction: `Downgrade to ${bestTier.planName}`,
          potentialSavings: potentialSavings,
          reason: `You are currently overpaying for your seat count. The ${bestTier.planName} plan covers your team for $${idealMonthlySpend}/mo.`,
        });
      } else if (alternativeTool) {
        // Suggest a switch even if current plan is "optimal" but a competitor is cheaper or has credits
        recommendations.push({
          toolName: inputTool.toolName,
          currentSpend: inputTool.monthlySpend,
          suggestedAction: `Switch to ${alternativeTool.toolName}`,
          potentialSavings: 0, // Potential savings would need deeper calc
          reason: `While your ${inputTool.plan} plan is priced correctly, ${alternativeTool.toolName} offers startup credits via Credex that could offset this cost entirely.`,
        });
      }
    }
  }

  return { totalMonthlySavings, recommendations };
};

// CreateAudit Controller -->
export const createAudit = asyncHandler(async (req: Request, res: Response) => {
  const { tools, teamSize, useCase, hCaptchaToken } = req.body;

  if (!hCaptchaToken) {
    return res.status(400).json({ success: false, message: 'Captcha token missing.' });
  }

  const isHuman = await verifyHCaptcha(hCaptchaToken);
  if (!isHuman) {
    return res.status(403).json({ success: false, message: 'Captcha verification failed.' });
  }

  if (!tools || !Array.isArray(tools)) {
    throw new ApiError(400, 'Invalid tools data provided');
  }

  // 1. Run Math Engine
  const { totalMonthlySavings, recommendations } = await calculateSavings(tools, teamSize);

  // 2. Prepare the Audit Object
  const slug = nanoid(10);
  const audit = new Audit({
    slug,
    teamSize,
    tools,
    totalMonthlySavings,
    recommendations,
    isLeadCaptured: false,
  });

  // GENERATE AI SUMMARY
  try {
    const summary = await generateAuditSummary(audit);
    audit.aiSummary = summary;
  } catch (error) {
    console.error('AI Summary generation failed, using fallback:', error);
    audit.aiSummary = `Our analysis suggests a potential saving of $${totalMonthlySavings}/mo by optimizing your ${tools[0]?.toolName || 'AI stack'}.`;
  }

  // 4. Save the complete Audit (including summary)
  await audit.save();

  return res.status(201).json(new ApiResponse(201, audit, 'Audit report generated successfully'));
});

// GetAuditByURL Controller -->
export const getAuditByURL = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const audit = await Audit.findOne({ slug }).select('-email -companyName -role').lean();

  if (!audit) {
    throw new ApiError(404, 'Audit report not found');
  }

  return res.status(200).json(new ApiResponse(200, audit, 'Audit fetched successfully'));
});

// Regenerate AI Summary COntroller -->
export const refreshAiSummary = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const audit = await Audit.findById(id);

  if (!audit) throw new ApiError(404, 'Audit not found');

  const newSummary = await generateAuditSummary(audit);
  audit.aiSummary = newSummary;
  await audit.save();

  return res.status(200).json(new ApiResponse(200, { aiSummary: newSummary }, 'Summary updated'));
});
