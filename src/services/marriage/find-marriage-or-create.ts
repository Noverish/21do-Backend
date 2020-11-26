import { Marriage } from '@src/entity';
import { MarriageDTO } from '@src/models';
import Joi from 'joi';
import { createMarriage } from './create-marriage';

export async function findMarriageOrCreate(params: findMarriageOrCreate.Params): Promise<findMarriageOrCreate.Result> {
  const value: findMarriageOrCreate.Params = await findMarriageOrCreate.schema.validateAsync(params);

  const { phone, name, isMale } = value;

  const found = await Marriage.findOne({
    where: [{ malePhone: phone }, { ladyPhone: phone }]
  });
  if (found) {
    return await found.toDTO();
  }

  if (isMale) {
    return await createMarriage({ maleName: name, malePhone: phone });
  } else {
    return await createMarriage({ ladyName: name, ladyPhone: phone });
  }
}

export namespace findMarriageOrCreate {
  export interface Params {
    name: string;
    phone: string;
    isMale: boolean;
  }

  export const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().length(11).required(),
    isMale: Joi.boolean().required(),
  })

  export type Result = MarriageDTO;
}
