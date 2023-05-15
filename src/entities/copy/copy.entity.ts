import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Book, Loan } from '..'

@Entity('copys')
export class Copy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  quantity: number

  @CreateDateColumn()
  created_at: string

  @ManyToOne(() => Book, (book: Book) => book.copy, { onDelete: 'CASCADE' })
  book: Book

  @OneToMany(() => Loan, (loan: Loan) => loan.copy, { onDelete: 'CASCADE' })
  lonas: []
}
