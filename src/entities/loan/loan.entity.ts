import { Copy, User } from '..'
import {
  AfterInsert,
  AfterLoad,
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

  @CreateDateColumn({ type: 'date' })
  created_at: Date | string

  @Column({ type: 'date', nullable: true })
  devolution_at: string

  @BeforeInsert()
  date_devolution() {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    let devolution = new Date(date.setDate(date.getDate() + 3))

    if (devolution.getDay() === 6) {
      devolution = new Date(devolution.setDate(date.getDate() + 2))
    } else if (devolution.getDay() === 0) {
      devolution = new Date(devolution.setDate(date.getDate() + 3))
    }
    devolution.setHours(0, 0, 0, 0)
    this.devolution_at = devolution.toISOString().split('T')[0]
  }

  @ManyToOne(() => User, (user: User) => user.id, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Copy, (copy: Copy) => copy.id, { onDelete: 'CASCADE' })
  copy: Copy
}
