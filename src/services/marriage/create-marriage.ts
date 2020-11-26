import { Marriage } from '@src/entity';
import { MarriageDTO } from '@src/models';
import Joi from 'joi';

export async function createMarriage(params: createMarriage.Params): Promise<createMarriage.Result> {
  const value: createMarriage.Params = await createMarriage.schema.validateAsync(params);

  const insertResult = await Marriage.insert(value);
  const marriage = await Marriage.findOne(insertResult.identifiers[0].marriageId);
  return await marriage.toDTO();
}

export namespace createMarriage {
  export interface Params {
    maleName?: string;
    malePhone?: string;
    ladyName?: string;
    ladyPhone?: string;
    location?: string;
    account?: string;
    bank?: string;
  }
  
  export const schema = Joi.object({
    maleName: Joi.string().optional(),
    malePhone: Joi.string().length(11).optional(),
    ladyName: Joi.string().optional(),
    ladyPhone: Joi.string().length(11).optional(),
    location: Joi.string().optional(),
    account: Joi.string().optional(),
    bank: Joi.string().optional(),
  })
  
  export type Result = MarriageDTO;
}