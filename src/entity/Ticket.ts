import { TicketDTO } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Marriage } from ".";

@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column()
  marriageId: number;
  
  @Column()
  userId: number;

  @Column({ type: 'bool', default: false })
  isUsed: boolean;

  async toDTO(): Promise<TicketDTO> {
    return {
      ticketId: this.ticketId,
      marriage: await (await Marriage.findOne(this.marriageId)).toDTO(),
      isUsed: this.isUsed,
    }
  }
}