import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from '../config';
import { env } from '../config/envs';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.productsMicroserviceHost,
          port: env.productsMicroservicePort
        },
      },
    ]),
  ],
})
export class ProductsModule { }
