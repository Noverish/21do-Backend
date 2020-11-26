import { User } from '@src/entity';
import { UserDTO } from '@src/models';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export async function authRegister(params: authRegister.Params): Promise<authRegister.Result> {
  const value: authRegister.Params = await authRegister.schema.validateAsync(params);

  const { userId, username, password, name, phone } = value;

  if (await User.findOne({ username })) {
    throw new Error('이미 존재하는 아이디입니다');
  }
  
  const hashedPassword: string = await bcrypt.hash(password, 10);
  await User.update(userId, { username, password: hashedPassword, name, phone, regDate: new Date() });
  const user = await User.findOne(userId);
  return await user.toDTO();
}

export namespace authRegister {
  export interface Params {
    userId: number;
    username: string;
    password: string;
    name: string;
    phone: string;
  }

  export const schema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().length(11).required(),
  })

  export type Result = UserDTO;
}