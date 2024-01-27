import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
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
