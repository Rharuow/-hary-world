import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sing-in')
  async singIn(@Body() signIn: SignInDto) {
    try {
      return await this.authService.signIn({
        email: signIn.email,
        password: signIn.password,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error.message,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    try {
      const token = this.authGuard.extractTokenFromHeader(request);
      if (!token) throw new Error("There isn't a token");
      return await this.authService.getProfile({ token });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error.message,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }
}
