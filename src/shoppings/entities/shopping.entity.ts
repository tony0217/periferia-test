import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cart, Status } from '../interfaces/shopping.interface';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'shoppings' })
export class Shopping {

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Shopping ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Cart with Product ID and quantity',
    type: [],
    example: [{
      product: "0b699130-57e3-4bef-b174-c7af5d9ffdcd",
      quantity: 2
    },],
    uniqueItems: true
  })
  @Column('jsonb', {
    nullable: true
    //default: []
  })
  cart?: object[];

  @ApiProperty({
    example: 100,
    description: 'Total Amount',
  })
  @Column('float', {
    default: 0
  })
  total: number;
  
  @ApiProperty()
  @ManyToOne(
    () => User,
    (user) => user.shopping,
    { eager: true }
  )
  user: User;

}
