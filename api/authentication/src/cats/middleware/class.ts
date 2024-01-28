import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class MiddlewareCatsClass implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    console.log('cat class middleware');
    console.log('_______________________');
    console.log('req = ', req.baseUrl);
    console.log('_______________________');
    return next();
  }
}
