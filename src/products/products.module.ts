import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [ProductsController],
  imports: [
    NatsModule,
  ],
})
export class ProductsModule { }
