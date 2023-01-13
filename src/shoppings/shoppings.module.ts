import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Shopping } from './entities/shopping.entity';
import { ShoppingsController } from './shoppings.controller';
import { ShoppingsService } from './shoppings.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { Order } from './entities/order.entity';

@Module({
  controllers: [ShoppingsController],
  providers: [ShoppingsService],
  imports:[
    TypeOrmModule.forFeature([ Shopping , Order]),
    AuthModule,
    ProductsModule
  ],
  exports: [
    ShoppingsService,
    TypeOrmModule,
  ]
})
export class ShoppingsModule {}
