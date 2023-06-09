import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Copy, Follower } from '..'

export enum BookLanguage {
  en_US = 'en-US',
  pt_BR = 'pt-BR',
  pt_PT = 'pt-PT',
}

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, length: 180 })
  title: string

  @Column({ type: 'text', nullable: true })
  synopsis: string

  @Column({ length: 50 })
  author: string

  @Column()
  pages: number

  @Column({ type: 'enum', enum: BookLanguage, default: BookLanguage.en_US })
  language: BookLanguage | string

  @Column({ type: 'date' })
  date_release: string

  @Column({ default: true })
  availability: boolean

  @OneToMany(() => Copy, (copy: Copy) => copy.book, { cascade: true })
  copy: Copy[]

  @OneToMany(() => Follower, (follower: Follower) => follower.user, {
    onDelete: 'CASCADE',
  })
  followers: []
}
