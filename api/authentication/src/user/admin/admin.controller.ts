import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/admins')
  async createAdmin(
    @Body()
    data: Prisma.AdminCreateInput & Prisma.UserCreateInput & { roleId: string },
  ) {
    try {
      await this.adminService.createAdmin(data);
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
}
