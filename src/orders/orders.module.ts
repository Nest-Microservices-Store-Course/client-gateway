import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '../config';
import { env } from '../config/envs';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.ordersMicroserviceHost,
          port: env.ordersMicroservicePort,
        },
      },
    ]),
  ],
})
export class OrdersModule { }
