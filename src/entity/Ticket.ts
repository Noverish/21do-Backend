import { TicketDTO } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Marriage } from ".";

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

  async toDTO(): Promise<TicketDTO> {
    return {
      marriage: await (await Marriage.findOne(this.marriageId)).toDTO(),
      ...this,
    }
  }
}