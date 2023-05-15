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

  @ManyToOne(() => User, (user: User) => user, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Book, (book: Book) => book, { onDelete: 'CASCADE' })
  book: Book
}
