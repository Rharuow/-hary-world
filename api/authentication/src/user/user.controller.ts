import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers() {
    try {
      return await this.userService.listUsers();
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

  @Get('/:id')
  async findUser(@Param() { id }: { id: string }) {
    try {
      return await this.userService.findUser(id);
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

  @Delete('/:id')
  async deleteUser(@Param() params: { id: string }) {
    try {
      const isRootUser = await this.userService.findUser(params.id);
      if (isRootUser && isRootUser.role.name === 'ROOT')
        throw new Error('Root user cannot be deleted');
      return await this.userService.deleteUser(params.id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
