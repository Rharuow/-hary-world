import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard)
  @Post('/admins')
  @HttpCode(204)
  async createAdmin(
    @Body()
    data: Prisma.AdminCreateInput & Prisma.UserCreateInput & { roleId: string },
  ) {
    try {
      await this.adminService.createAdmin(data);
      return;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error.message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/admins')
  async listAdmin() {
    try {
      return await this.adminService.listAdmin();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Resource not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id/admins/:adminId')
  async getAdmin(@Param() { adminId, id }: { id: string; adminId: string }) {
    try {
      return await this.adminService.getAdmin({ adminId, id });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:id/admins/:adminId')
  @HttpCode(204)
  async updateAdmin(
    @Param() { adminId, id }: { id: string; adminId: string },
    @Body() data: Prisma.UserUpdateInput & { admin: Prisma.AdminUpdateInput },
  ) {
    try {
      await this.adminService.updateAdmin({ adminId, id, data });
      return;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error.message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
        {
          cause: error,
        },
      );
    }
  }
}
