import { User } from '@src/entity';
import { IsUserExist } from '@src/entity/User';
import { UserDTO } from '@src/models';
import bcrypt from 'bcrypt';
import { IsInt, IsString, validateOrReject } from 'class-validator';

export async function authRegister(params: authRegister.Params): Promise<authRegister.Result> {
  await validateOrReject(new authRegister.Params(params));

  const { userId, username, password, name, phone } = params;

  if (await User.findOne({ username })) {
    throw new Error('이미 존재하는 아이디입니다');
  }
  
  const hashedPassword: string = await bcrypt.hash(password, 10);
  await User.update(userId, { username, password: hashedPassword, name, phone });
  const user = await User.findOne(userId)
  return await user.toDTO();
}

export namespace authRegister {
  export class Params {
    constructor(obj: object) {
      Object.assign(this, obj);
    }

    @IsInt()
    @IsUserExist()
    userId: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    phone: string;
  }

  export type Result = UserDTO;
}