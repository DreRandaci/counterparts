import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  productId: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'json' })
  imageUrl: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column()
  source: string;

  @CreateDateColumn()
  createdAt: string;
}
