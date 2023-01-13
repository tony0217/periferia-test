import { Order } from 'src/shoppings/entities/order.entity';
import { Shopping } from 'src/shoppings/entities/shopping.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('float', {
        default: 0
    })
    spaceAvailable: number;

    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Product;

    @OneToMany(
        () => Shopping,
        (shopping) => shopping.user,
        // { eager: true }
    )
    shopping: Shopping;

    @OneToMany(
        () => Order,
        (order) => order.user,
        // { eager: true }
    )
    order: Order;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}
