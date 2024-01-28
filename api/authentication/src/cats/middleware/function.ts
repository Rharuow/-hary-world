import { NextFunction, Request, Response } from 'express';

export const functionCatMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  console.log('FUNCTION MIDDLEWARE CAT');
  console.log('-----------------------------');
  console.log('req = ', req.baseUrl);
  console.log('-----------------------------');
  return next();
};
