import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
