import { type Request, type Response } from 'express';
import { ApiError } from '../utils/apiError.js';
import Pricing from '../models/pricing.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

// GetAllTools Controller --> Fetches a list of tools
export const getAllTools = asyncHandler(async (req: Request, res: Response) => {
  const tools = await Pricing.find({})
    .select('toolName category tiers')
    .sort({ toolName: 1 })
    .lean();

  if (!tools || tools.length === 0) {
    throw new ApiError(404, 'No tools found in the database');
  }

  return res.status(200).json(new ApiResponse(200, tools, 'Tools fetched successfully'));
});

// GetToolDetails Controller --> Fetches specific plans and pricing
export const getToolDetails = asyncHandler(async (req: Request, res: Response) => {
  const { toolName } = req.params;

  const tool = await Pricing.findOne({
    toolName: { $regex: new RegExp(`^${toolName}$`, 'i') },
  }).lean();

  if (!tool) {
    throw new ApiError(404, `Pricing data for tool '${toolName}' not found`);
  }

  return res.status(200).json(new ApiResponse(200, tool, 'Tool details fetched successfully'));
});
