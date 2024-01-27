import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action return all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id = ', id);
    return `This action returns a #${id} cat`;
  }
}
