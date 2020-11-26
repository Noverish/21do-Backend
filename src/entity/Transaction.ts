import { TransactionDTO } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;
  
  @Column()
  userId: number;
  
  @Column()
  amount: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  async toDTO(): Promise<TransactionDTO> {
    return {
      transactionId: this.transactionId,
      amount: this.amount,
      date: this.date.toISOString(),
    }
  }
}