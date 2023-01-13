import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShoppingsService } from './shoppings.service';
import { CreateShoppingDto } from './dto/create-shopping.dto';

import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { Shopping } from './entities/shopping.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('Shoppings')
@Controller('shoppings')
export class ShoppingsController {
  constructor(private readonly shoppingsService: ShoppingsService) { }

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Shopping was created', type: Shopping })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  createOrUpdate(
    @Body() createShoppingDto: CreateShoppingDto,
    @GetUser() user: User) {
    return this.shoppingsService.createOrUpdate(createShoppingDto, user);
  }

  @Post('orders')
  @Auth()
  @ApiResponse({ status: 201, description: 'Order was created', type: Order })
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.shoppingsService.createOrder(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shoppingsService.findOne(id);
  }

}
