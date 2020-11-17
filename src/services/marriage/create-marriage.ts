import { Marriage } from '@src/entity';
import { IsUserExist } from '@src/entity/User';
import { MarriageDTO } from '@src/models';
import { IsString, validateOrReject, IsInt, IsOptional } from 'class-validator';

export async function createMarriage(params: createMarriage.Params): Promise<createMarriage.Result> {
  await validateOrReject(new createMarriage.Params(params));

  const { maleUserId, ladyUserId, location, account, bank } = params;

  const insertResult = await Marriage.insert({ maleUserId, ladyUserId, location, account, bank });
  const marriageId = insertResult.identifiers[0].marriageId;
  const marriage = await Marriage.findOne(marriageId);
  return await marriage.toDTO();
}

export namespace createMarriage {
  export class Params {
    constructor(obj: object) {
      Object.assign(this, obj);
    }

    @IsInt()
    @IsUserExist()
    maleUserId: number;

    @IsInt()
    @IsUserExist()
    ladyUserId: number;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    account?: string;

    @IsString()
    @IsOptional()
    bank?: string;
  }

  export type Result = MarriageDTO;
}
