import { type Request, type Response } from 'express';
import Audit from '../models/audit.model.js';
import { ApiError } from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { sendAuditEmail } from '../utils/emailService.js';

// Capture lead controller -->
export const captureAuditLead = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { email, companyName, role } = req.body;

  if (!email) throw new ApiError(400, 'Email is required');

  const audit = await Audit.findOne({ slug });
  if (!audit) throw new ApiError(404, 'Audit report not found');

  // Update lead info
  audit.email = email.toLowerCase();
  audit.companyName = companyName || audit.companyName;
  audit.role = role || audit.role;
  audit.isLeadCaptured = true;

  await audit.save();

  // Send the email with the link
  try {
    const publicUrl = `${process.env.CLIENT_URL}/audit/${slug}`;
    await sendAuditEmail({
      to: audit.email!,
      subject: audit.companyName
        ? `${audit.companyName} Audit Report`
        : 'Your AI Optimization Report',
      auditSummary: audit.aiSummary,
      totalSavings: audit.totalMonthlySavings,
      publicUrl,
    });
  } catch (emailError) {
    console.error('Lead Capture Email Failed:', emailError);
  }

  return res.status(200).json(new ApiResponse(200, audit, 'Lead captured and report sent'));
});
