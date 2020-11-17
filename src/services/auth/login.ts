import { User } from '@src/entity';
import { IsString, validateOrReject } from 'class-validator';
import bcrypt from 'bcrypt';
import { UserDTO } from '@src/models';

export async function authLogin(params: authLogin.Params): Promise<authLogin.Result> {
  await validateOrReject(new authLogin.Params(params));

  const { username, password } = params;

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
  export class Params {
    constructor(obj: object){
      Object.assign(this, obj);
    }

    @IsString()
    username: string;

    @IsString()
    password: string;
  }

  export type Result = UserDTO;
}