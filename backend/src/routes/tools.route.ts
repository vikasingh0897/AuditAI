import { Router } from 'express';
import { auditRateLimiter } from '../middlewares/rateLimiter.js';
import { getAllTools, getToolDetails } from '../controllers/pricing.controller.js';

const router = Router();

// Rate limiter -->
router.use(auditRateLimiter);

// Get all tools route -->
router.get('/getAllTools', getAllTools);

// Get specific tool details route -->
router.get('/getToolDetails/:toolName', getToolDetails);

export default router;
