import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe, Query, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from '../config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy) { }

  @Get()
  getProducts(@Query() query: PaginationDto) {
    return this.productsClient.send('findAllProducts', query).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get(':uuid')
  getProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.productsClient.send('findOneProduct', { uuid }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsClient.send('createProduct', body).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':uuid')
  updateProduct(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() body: UpdateProductDto) {
    return this.productsClient.send('updateProduct', { uuid, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Delete(':uuid')
  deleteProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.productsClient.send('deleteProduct', { uuid }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }
}
