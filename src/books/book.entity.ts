import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  series: string;

  @Column()
  genres: string;

  @Column()
  cover: string;

  @Column()
  description: string;

  @Column()
  is_queer: boolean;

  @Column()
  queer_data: string;
}
