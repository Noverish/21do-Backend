import { User } from '@src/entity';
import { UserDTO } from '@src/models';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export async function authLogin(params: authLogin.Params): Promise<authLogin.Result> {
  const value: authLogin.Params = await authLogin.schema.validateAsync(params);

  const { username, password } = value;

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('아이디가 틀렸습니다');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('비밀번호가 틀렸습니다');
  }

  return await user.toDTO();
}

export namespace authLogin {
  export interface Params {
    username: string;
    password: string;
  }

  export const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })

  export type Result = UserDTO;
}