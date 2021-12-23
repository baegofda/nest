import {
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Get, Post, Put } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getCats() {
    console.log('hello controller');
    return { cats: 'get all cat api' };
  }

  // cats/:id
  @Get(':id')
  getCatById(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    // console.log(typeof param);
    return 'get one cat api';
  }

  @Post()
  createCat() {
    return 'create cat api';
  }

  @Put(':id')
  updateCatById() {
    return 'update cat api';
  }

  @Patch(':id')
  updatePartialCatById() {
    return 'update partial cat api';
  }

  @Delete(':id')
  deleteCatById() {
    return 'delete service';
  }
}
