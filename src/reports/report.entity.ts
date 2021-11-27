import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
