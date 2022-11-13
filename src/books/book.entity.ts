import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  series: string | null;

  @Column()
  genres: string;

  @Column()
  cover: string;

  @Column()
  description: string;

  @Column()
  is_queer: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  queer_data: string;

  @Column({ default: false })
  approved: boolean;
}
