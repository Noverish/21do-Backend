import { GuestbookDTOForUser } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Marriage, Transaction } from ".";

@Entity()
export default class Guestbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  guestbookId: number;

  @Column()
  userId: number;

  @Column()
  marriageId: number;

  @Column({ nullable: true })
  transactionId?: number;

  @Column({ nullable: true })
  belong?: string;

  @Column({ nullable: true })
  msg?: string;

  @Column({ type: 'bool', default: false })
  isOnline: boolean;

  async toDTOForUser(): Promise<GuestbookDTOForUser> {
    return {
      marriage: await (await Marriage.findOne(this.marriageId)).toDTO(),
      transaction: (this.transactionId) ? await (await Transaction.findOne(this.transactionId)).toDTO() : undefined,
      ...this,
    }
  }
}