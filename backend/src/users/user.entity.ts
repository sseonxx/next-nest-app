import { Exclude } from 'class-transformer';
import { Board } from 'src/boards/board.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

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

  @OneToMany((type) => Board, (board) => board.user, { eager: false })
  boards: Board[];
}
