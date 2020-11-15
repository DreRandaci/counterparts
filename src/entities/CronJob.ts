import { Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CronJob {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  lastUpdate: string;
}
