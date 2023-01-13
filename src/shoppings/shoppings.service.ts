import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { CreateShoppingDto } from './dto/create-shopping.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';
import { Shopping } from './entities/shopping.entity';
import { Cart } from './interfaces/shopping.interface';

import { Product } from 'src/products/entities';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class ShoppingsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Shopping)
    private readonly shoppingRepository: Repository<Shopping>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

  ) { }

  async createOrUpdate(createShoppingDto: CreateShoppingDto, user: User) {
    try {
      const { cart } = createShoppingDto;

      const soldOut = await this.validateStock(cart)

      if (soldOut) {
        return soldOut
      }

      const existCart = await this.shoppingRepository.findOneBy({ user } as any);

      if (existCart && !soldOut) {
        const { id, cart: oldcart, total } = existCart
        const cartToUpdate = await this.removeDuplicates(oldcart, cart)
        const subTotal = await this.calculateSubTotalPrice(cartToUpdate as Cart[])

        if (subTotal > user.spaceAvailable) {
          const avalible = user.spaceAvailable - total;
          return {
            message: `sobrepasa su cupo de ${avalible}`
          }
        }

        const updateCart = await this.shoppingRepository.preload({ id, cart: cartToUpdate, total: subTotal });
        await this.shoppingRepository.save(updateCart);

        return { success: true }

      }

      const subTotal = await this.calculateSubTotalPrice(cart as Cart[])

      const shoppingCart = this.shoppingRepository.create({
        cart,
        user,
        total: subTotal
      });

      await this.shoppingRepository.save(shoppingCart);

      return { ...shoppingCart };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async createOrder({ shoppingId }: CreateOrderDto) {

    try {
      const shopping = await this.findOne(shoppingId)
      
      const { cart, total, user } = shopping

      const productsIds = cart.map(({ product }: Cart) => product)
      const products = await this.productRepository.findByIds(productsIds)
      const productDetail = products.map(({ id, title, price, description }) => ({ id, title, pricePerUnit: price, description }))

      const orderDetail = cart.map((item: Cart) => {
        const product = productDetail.find(p => p.id === item.product);
        product['quantity'] = item.quantity;
        return product;
      });

      const order = this.orderRepository.create({
        orderDetail,
        total,
        user
      });

      await this.orderRepository.save(order);

      orderDetail.map(async (item) =>{
         await this.productRepository.increment({ id: item.id},'salesNumber', item['quantity']);  
      })
     
      await this.shoppingRepository.remove(shopping)

      return { ...order };

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findOne(id: string) {
    let cart: Shopping;

    if (isUUID(id)) {
      cart = await this.shoppingRepository.findOneBy({ id });
    }

    if (!cart)
      throw new NotFoundException(`Cart with ${id} not found`);

    return cart;
  }

  private async validateStock(cart: Cart[]) {
    const productsIds = cart.map(({ product }: Cart) => product)
    const products = await this.productRepository.findByIds(productsIds)

    if (products.length === 0)
      throw new NotFoundException(`Products ids [${productsIds}] not found`);

    const validStock = cart.map(item => {
      const product = products.find(p => p.id === item.product);
      if (product.stock <= 0 || product.stock < item.quantity) {
        return `No stock for product ${product.title}`;
      }
      return null
    });

    const soldOut = validStock.filter(item => item != null)

    if (soldOut.length > 0) {
      return {
        message: soldOut
      }
    }
  }

  private async calculateSubTotalPrice(cart: Cart[]) {
    const productsIds = cart.map(({ product }: Cart) => product)
    const products = await this.productRepository.findByIds(productsIds)

    if (products.length === 0)
      throw new NotFoundException(`Products ids [${productsIds}] not found`);

    const inventory = products.map(({ id, price, stock }: Product) => ({ id, price, stock }))

    const cartTotal = cart.reduce((acc, item: Cart) => {
      const product = inventory.find(p => p.id === item.product);
      if (product.stock > 0 && product.stock >= item.quantity) {
        acc.push({
          product: item.product,
          quantity: item.quantity,
          price: product.price,
          total: product.price * item.quantity
        });
      }
      return acc;
    }, []);

    const sumary = cartTotal.map(({ total }) => total)

    const subTotal = sumary.reduce((prev, next) => prev + next);

    return subTotal
  }

  private removeDuplicates(cart, newItem) {
    const existingIndex = cart.findIndex(item => item.product === newItem.product);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = newItem.quantity;
    } else {
      cart.push(...newItem);
    }
    const summary = cart.reduce((acc, product) => {
      if (acc[product.product]) {
        acc[product.product] += product.quantity;
      } else {
        acc[product.product] = product.quantity;
      }
      return acc;
    }, {});

    return Object.entries(summary).map(([product, quantity]) => ({ product, quantity }));

  }
  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
