import { Marriage } from '@src/entity';
import { MarriageDTO } from '@src/models';
import Joi from 'joi';

export async function listMarriage(params: listMarriage.Params): Promise<listMarriage.Result> {
  const value: listMarriage.Params = await listMarriage.schema.validateAsync(params);

  const {} = value;

  const marriages = await Marriage.find();
  return await Promise.all(marriages.map(v => v.toDTO()));
}

export namespace listMarriage {
  export interface Params {
  }

  export const schema = Joi.object({
  })

  export type Result = MarriageDTO[];
}