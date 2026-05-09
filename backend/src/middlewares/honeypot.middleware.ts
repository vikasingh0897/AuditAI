import { type Request, type Response, type NextFunction } from 'express';

export const honeypot = (fieldName: string = 'website_url') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body[fieldName]) {
      console.warn(`Honeypot triggered: Bot detected via field "${fieldName}"`);
      return res.status(200).json({
        success: true,
        message: 'Message processed successfully',
      });
    }
    delete req.body[fieldName];
    next();
  };
};
