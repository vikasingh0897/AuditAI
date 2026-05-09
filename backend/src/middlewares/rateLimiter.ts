import { rateLimit } from 'express-rate-limit';

// Abuse Protection Middleware -->
export const auditRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 5,
  message: {
    error: 'Too many audit requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
