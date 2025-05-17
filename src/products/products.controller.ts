import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe, Query, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get()
  getProducts(@Query() query: PaginationDto) {
    return this.client.send('findAllProducts', query).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get(':uuid')
  getProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.client.send('findOneProduct', { uuid }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.client.send('createProduct', body).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':uuid')
  updateProduct(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() body: UpdateProductDto) {
    return this.client.send('updateProduct', { uuid, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Delete(':uuid')
  deleteProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.client.send('deleteProduct', { uuid }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }
}
