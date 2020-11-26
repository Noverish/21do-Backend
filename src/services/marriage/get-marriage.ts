import { Marriage } from '@src/entity';
import { MarriageDTO } from '@src/models';
import Joi from 'joi';


export async function getMarriage(params: getMarriage.Params): Promise<getMarriage.Result> {
  const value: getMarriage.Params = await getMarriage.schema.validateAsync(params);

  const { marriageId } = value;

  const marriage = await Marriage.findOne(marriageId);
  if (marriage) {
    return await marriage.toDTO();
  } else {
    throw new Error('No such marriage');
  }
}

export namespace getMarriage {
  export interface Params {
    marriageId: number;
  }

  export const schema = Joi.object({
    marriageId: Joi.number().required(),
  })

  export type Result = MarriageDTO;
}