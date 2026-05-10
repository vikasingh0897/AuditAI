import { Router } from 'express';
import { auditRateLimiter } from '../middlewares/rateLimiter.js';
import { honeypot } from '../middlewares/honeypot.middleware.js';
import { captureAuditLead } from '../controllers/lead.controller.js';

const router = Router();

// Caputre lead route -->
router.post('/capture/:slug', auditRateLimiter, honeypot('website_url'), captureAuditLead);

export default router;
