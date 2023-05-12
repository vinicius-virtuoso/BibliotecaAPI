import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Copy } from '..'

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
  language: BookLanguage

  @Column({ type: 'date' })
  date_release: string

  @OneToMany(() => Copy, (copy: Copy) => copy.book)
  copy: Copy[]
}
