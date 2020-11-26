import { GuestbookDTOForUser } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Marriage, Transaction } from ".";

@Entity()
export default class Guestbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  guestbookId: number;

  @Column()
  marriageId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  transactionId?: number;

  @Column()
  belong: string;

  @Column()
  msg: string;

  @Column({ type: 'bool', default: false })
  isOnline: boolean;

  async toDTOForUser(): Promise<GuestbookDTOForUser> {
    return {
      guestbookId: this.guestbookId,
      marriage: await (await Marriage.findOne(this.marriageId)).toDTO(),
      transaction: (this.transactionId) ? await (await Transaction.findOne(this.transactionId)).toDTO() : undefined,
      belong: this.belong,
      msg: this.msg,
      isOnline: this.isOnline,
    }
  }
}