import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus } from "../enum/order.enum";

export class OrderPaginationDto extends PaginationDto {
    @IsString()
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Possible status values are: ${Object.values(OrderStatus).join(', ')}`
    })
    status: string;
}