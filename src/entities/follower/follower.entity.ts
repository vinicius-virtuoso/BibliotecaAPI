import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Book, User } from '..'

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: string

  @ManyToOne(() => User, (user: User) => user)
  user: User

  @ManyToOne(() => Book, (book: Book) => book)
  book: Book
}
