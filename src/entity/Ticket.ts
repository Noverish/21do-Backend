import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  ticketId: number;
  
  @Column()
  userId: number;

  @Column()
  marriageId: number;

  @Column({ type: 'bool', default: false })
  isUsed: boolean;
}