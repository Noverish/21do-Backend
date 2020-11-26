import { Ticket } from '@src/entity';
import { TicketDTO } from '@src/models';
import Joi from 'joi';

export async function listTicket(params: listTicket.Params): Promise<listTicket.Result> {
  const value: listTicket.Params = await listTicket.schema.validateAsync(params);

  const { userId } = value;

  const tickets = await Ticket.find({ userId });
  const ticketsDTOs = await Promise.all(tickets.map(v => v.toDTO()));
  return ticketsDTOs;
}

export namespace listTicket {
  export interface Params {
    userId: number;
  }
  
  export const schema = Joi.object({
    userId: Joi.number().optional(),
  })
  
  export type Result = TicketDTO[];
}