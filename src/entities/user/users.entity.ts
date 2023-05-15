import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { hashSync, getRounds } from 'bcryptjs'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  name: string

  @Column({ length: 50, unique: true })
  username: string

  @Column({ length: 170, unique: true })
  email: string

  @Column({ length: 150 })
  password: string

  @Column({ default: false })
  is_staff: boolean

  @Column({ default: false })
  is_blocked_loans: boolean

  @Column({ nullable: true, default: null, type: 'date' })
  date_unlock: string | null

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const passwordHash = getRounds(this.password)
    if (!passwordHash) {
      this.password = hashSync(this.password, 12)
    }
  }
}
