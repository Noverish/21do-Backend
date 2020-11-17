import { Marriage } from '@src/entity';
import { MarriageDTO } from '@src/models';
import { IsInt, validateOrReject } from 'class-validator';

export async function getMarriage(params: getMarriage.Params): Promise<getMarriage.Result> {
  await validateOrReject(new getMarriage.Params(params));

  const { marriageId } = params;

  const marriage = await Marriage.findOne(marriageId);
  if (marriage) {
    return await marriage.toDTO();
  } else {
    throw new Error('No such marriage');
  }
}

export namespace getMarriage {
  export class Params {
    constructor(obj: object){
      Object.assign(this, obj);
    }

    @IsInt()
    marriageId: number;
  }

  export type Result = MarriageDTO;
}
