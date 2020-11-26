import { Guestbook, Ticket, Transaction, User } from '@src/entity';
import { GuestbookDTOForUser } from '@src/models';
import Joi from 'joi';
import { paymentToss } from '../payment/toss';

export async function workflowGuestbook(params: workflowGuestbook.Params): Promise<workflowGuestbook.Result> {
  const value: workflowGuestbook.Params = await workflowGuestbook.schema.validateAsync(params);

  const { userId, marriageId, name, isOnline, toss, belong, msg } = value;

  await User.update(userId, { name });

  let transactionId = undefined;
  if (toss) {
    const result = await paymentToss(toss);
    const insertResult = await Transaction.insert({ userId, amount: result.totalAmount })
    transactionId = insertResult.identifiers[0].transactionId;
  }

  const ticketInsertResult = await Ticket.insert({ marriageId, userId });
  const ticket = await Ticket.findOne({ marriageId, userId });

  const insertResult = await Guestbook.insert({
    marriageId,
    userId,
    transactionId,
    belong,
    msg,
    isOnline: isOnline,
  })
  const guestbookId = insertResult.identifiers[0].guestbookId;
  const inserted = await Guestbook.findOne(guestbookId);
  return await inserted.toDTOForUser();
}

export namespace workflowGuestbook {
  interface GuestbookPayload {
  }

  export interface Params {
    userId: number;
    marriageId: number;
    name: string;
    isOnline: boolean;
    belong: string;
    msg: string;

    toss?: paymentToss.Params;
  }

  export const schema = Joi.object({
    userId: Joi.number().required(),
    marriageId: Joi.number().required(),
    name: Joi.string().required(),
    isOnline: Joi.boolean().required(),
    belong: Joi.string().allow('').required(),
    msg: Joi.string().allow('').required(),

    toss: paymentToss.schema.optional(),

  })

  export type Result = GuestbookDTOForUser;
}
