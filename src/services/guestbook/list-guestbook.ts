import { Guestbook } from '@src/entity';
import { GuestbookDTOForUser } from '@src/models';
import Joi from 'joi';

export async function listGuestbook(params: listGuestbook.Params): Promise<listGuestbook.Result> {
  const value: listGuestbook.Params = await listGuestbook.schema.validateAsync(params);

  const { userId } = value;

  const guestbooks = await Guestbook.find({ userId });
  const guestbookDTOs = await Promise.all(guestbooks.map(v => v.toDTOForUser()));
  return guestbookDTOs;
}

export namespace listGuestbook {
  export interface Params {
    userId: number;
  }
  
  export const schema = Joi.object({
    userId: Joi.number().optional(),
  })
  
  export type Result = GuestbookDTOForUser[];
}