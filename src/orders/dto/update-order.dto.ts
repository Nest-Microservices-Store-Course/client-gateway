import { OrderStatus } from '../enum/order.enum';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
