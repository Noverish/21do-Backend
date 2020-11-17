import { User } from '@src/entity';
import { UserDTO } from '@src/models';
import { IsOptional, IsString, validateOrReject } from 'class-validator';

export async function authAdd(params: authAdd.Params = {}): Promise<authAdd.Result> {
  await validateOrReject(new authAdd.Params(params))

  const { phone, name } = params;

  const userInsertResult = await User.insert({ phone, name });
  const userId = userInsertResult.identifiers[0].userId;
  return await (await User.findOne(userId)).toDTO();
}

export namespace authAdd {
  export class Params {
    constructor(obj: object){
      Object.assign(this, obj);
    }

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    name?: string;
  }

  export type Result = UserDTO;
}