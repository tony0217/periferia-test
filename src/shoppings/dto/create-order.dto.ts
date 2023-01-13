import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Cart } from '../interfaces/shopping.interface';

export class CreateOrderDto {
  @ApiProperty({
    description: 'shoppingId (unique)',
    nullable: false,
    required: true,
    example: "0a6ca404-b34c-4a26-b7b8-7112d2dfd5ae" 
  })
  @IsNotEmpty()
  shoppingId: string;
}
