import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CustomException } from './custom.exception';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('errors')
export class ErrorsController {
  @Get('/400')
  async badRequest() {
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  @Get('/401')
  async unauthorized() {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Get('/402')
  async paymentRequired() {
    throw new HttpException('Payment Required', HttpStatus.PAYMENT_REQUIRED);
  }

  @Get('/403')
  async forbidden() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('/404')
  async notFound() {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('/custom')
  async getCustomException() {
    throw new CustomException();
  }

  @Get('/built-in')
  async builtIn() {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }

  @Get('/custom-filter')
  @UseFilters(new HttpExceptionFilter())
  async getCustomFilter() {
    throw new ForbiddenException();
  }
}
