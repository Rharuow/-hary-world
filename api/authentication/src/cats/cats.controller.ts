import { CatsService } from './cats.service';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Array<Cat>> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id = ', id);
    return `This action returns a #${id} cat`;
  }
}
