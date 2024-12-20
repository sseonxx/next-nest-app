import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  username: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
