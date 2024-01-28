import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

Injectable();
export const globalMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  console.log('Global middleware');
  console.log('---------------------------');
  console.log('req = ', req.baseUrl);
  console.log('---------------------------');
  return next();
};
