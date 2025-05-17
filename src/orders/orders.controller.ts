import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Inject, Query } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get()
  findAll(@Query() query: OrderPaginationDto) {
    return this.client.send('findAllOrders', query).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get('id/:uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.client.send('findOneOrder', { uuid }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':uuid')
  changeStatus(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.client.send('changeOrderStatus', { uuid, ...updateOrderDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }
}
