import { Router } from 'express';
import { auditRateLimiter } from '../middlewares/rateLimiter.js';
import { createAudit, getAuditByURL, refreshAiSummary } from '../controllers/audit.controller.js';

const router = Router();

// Rate limiter -->
router.use(auditRateLimiter);

// audit.routes.ts
router.post('/create', createAudit);
router.get('/:slug', getAuditByURL);
router.patch('/:id/refresh-summary', refreshAiSummary);

export default router;
