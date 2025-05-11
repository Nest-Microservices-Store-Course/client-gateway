import { IsOptional, IsEnum } from "class-validator";
import { OrderStatus } from "../enum/order.enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Valid status are: ${Object.values(OrderStatus).join(', ')}`
    })
    status: string;
}