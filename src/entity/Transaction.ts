import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;
  
  @Column({ nullable: true })
  fromUserId: number;

  @Column({ nullable: true })
  fromName: string;

  @Column({ nullable: true })
  toMarriageId: number;

  @Column({ nullable: true })
  toPerson: number;

  @Column()
  amount: number;

  @Column({ type: 'bool', default: false })
  isOnline: boolean;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}