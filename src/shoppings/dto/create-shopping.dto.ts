import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';
import { Cart } from '../interfaces/shopping.interface';

export class CreateShoppingDto {
  @ApiProperty({
    description: 'Cart with Product ID and quantity',
    example: [{
      product: "0b699130-57e3-4bef-b174-c7af5d9ffdcd",
      quantity: 2
    },
    {
      product: "01d760de-700c-4f1b-a881-79b1bd2b2da1",
      quantity: 5
    },
  ],
    uniqueItems: true
  })
  @IsArray()
  cart: Cart[];
}
