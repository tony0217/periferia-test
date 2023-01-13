import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'orders' })
export class Order {

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Order ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'orderDetail',
    uniqueItems: true
  })
  @Column('jsonb', {
    nullable: true
    //default: []
  })
  orderDetail?: object;

  @Column('float', {
    default: 0
  })
  total: number;

  @Column('bool', {
    default: true
  })
  active: boolean;

  @ManyToOne(
    () => User,
    (user) => user.shopping,
    { eager: true }
  )
  user: User;

}
