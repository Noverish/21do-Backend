import { Guestbook } from '@src/entity';
import { IsMarriageExist } from '@src/entity/Marriage';
import { IsUserExist } from '@src/entity/User';
import { GuestbookDTOForUser } from '@src/models';
import { IsBoolean, IsInt, IsOptional, IsString, validateOrReject } from 'class-validator';

export async function createGuestbook(params: createGuestbook.Params): Promise<createGuestbook.Result> {
  await validateOrReject(new createGuestbook.Params(params));

  const { marriageId, userId, transactionId, belong, msg, isOnline } = params;

  const insertResult = await Guestbook.insert({
    marriageId,
    userId,
    transactionId: transactionId,
    belong: belong,
    msg: msg,
    isOnline: isOnline,
  })
  const guestbookId = insertResult.identifiers[0].guestbookId;
  const guestbook = await Guestbook.findOne(guestbookId);
  return await guestbook.toDTOForUser();
}

export namespace createGuestbook {
  export class Params {
    constructor(obj: object){
      Object.assign(this, obj);
    }

    @IsInt()
    @IsMarriageExist()
    marriageId: number;

    @IsInt()
    @IsUserExist()
    userId: number;

    @IsOptional()
    @IsInt()
    transactionId?: number;

    @IsOptional()
    @IsString()
    belong?: string;

    @IsOptional()
    @IsString()
    msg?: string;

    @IsBoolean()
    isOnline: boolean;
  }

  export type Result = GuestbookDTOForUser;
}
