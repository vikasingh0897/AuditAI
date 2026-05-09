import { z } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';

// Define the schema based on your IPricingTier and IAudit requirements
const auditSchema = z.object({
  body: z.object({
    teamSize: z.number().min(1, 'Team size must be at least 1'),
    useCase: z.enum(['coding', 'writing', 'data', 'research', 'mixed']),
    tools: z
      .array(
        z.object({
          toolName: z.string().min(1, 'Tool name is required'),
          plan: z.string().min(1, 'Plan name is required'),
          monthlySpend: z.number().min(0),
          seats: z.number().min(1),
        })
      )
      .min(1, 'At least one tool is required'),
  }),
});

// Validation middleware -->
export const validateAuditRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    auditSchema.parse({ body: req.body });
    next();
  } catch (error: any) {
    return res.status(400).json({
      error: 'Validation Failed',
      details: error.errors,
    });
  }
};
