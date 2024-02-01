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
import { ClientService } from './client.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('users')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(AuthGuard)
  @Post('/clients')
  @HttpCode(204)
  async createClient(
    @Body()
    data: Prisma.ClientCreateInput &
      Prisma.UserCreateInput & { roleId: string },
  ) {
    try {
      await this.clientService.createClient(data);
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
  @Get('/clients')
  async listClient() {
    try {
      return await this.clientService.listClient();
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
  @Get('/:id/clients/:clientId')
  async getClient(@Param() { clientId, id }: { id: string; clientId: string }) {
    try {
      return await this.clientService.getClient({ clientId, id });
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
  @Put('/:id/clients/:clientId')
  @HttpCode(204)
  async updateClient(
    @Param() { clientId, id }: { id: string; clientId: string },
    @Body() data: Prisma.UserUpdateInput & { client: Prisma.ClientUpdateInput },
  ) {
    try {
      await this.clientService.updateClient({ clientId, id, data });
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
