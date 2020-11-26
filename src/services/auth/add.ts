import { User } from '@src/entity';
import { UserDTO } from '@src/models';
import Joi from 'joi';

export async function authAdd(params: authAdd.Params): Promise<authAdd.Result> {
  const value: authAdd.Params = await authAdd.schema.validateAsync(params);

  const {} = value;

  const insertResult = await User.insert({});
  const user = await User.findOne(insertResult.identifiers[0].userId);
  return await user.toDTO();
}

export namespace authAdd {
  export interface Params {
    
  }

  export const schema = Joi.object({
    
  })

  export type Result = UserDTO;
}