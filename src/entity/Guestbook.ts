import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Guestbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  guestbookId: number;

  @Column()
  marriageId: number;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  name: string;

  @Column()
  belong: string;

  @Column()
  msg: string;

  @Column({ type: 'bool', default: false })
  isOnline: boolean;
}