import { Copy, User } from '..'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  date_loan_at: string

  @Column({ type: 'date' })
  devolution_at: string

  @BeforeInsert()
  date_devolution() {
    this.devolution_at = this.date_loan_at
  }

  @ManyToOne(() => User, (user: User) => user)
  user: User

  @ManyToOne(() => Copy, (copy: Copy) => copy)
  copy: Copy
}
