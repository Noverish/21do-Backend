import { MarriageDTO } from '@src/models';
import { IsString, validateOrReject } from 'class-validator';
import { authAdd } from '../auth/add';
import { findUser } from '../auth/find-user';
import { createMarriage } from './create-marriage';
import { findMarriage } from './find-marriage';

export async function getMarriageByPhone(params: getMarriageByPhone.Params): Promise<getMarriageByPhone.Result> {
  await validateOrReject(new getMarriageByPhone.Params(params));

  const { phone, name } = params;

  const marriages = await findMarriage({ phone });
  if (marriages.length > 0) {
    return marriages[marriages.length - 1];
  }

  const user = await findUser({ phone });
  if (user.length > 0) {
    const newUser = await authAdd();
    const marriage = await createMarriage({ maleUserId: user[0].userId, ladyUserId: newUser.userId });
    return marriage;
  } else {
    const newUser1 = await authAdd({ phone, name });
    const newUser2 = await authAdd();
    const marriage = await createMarriage({ maleUserId: newUser1.userId, ladyUserId: newUser2.userId });
    return marriage;
  }
}

export namespace getMarriageByPhone {
  export class Params {
    constructor(obj: object){
      Object.assign(this, obj);
    }

    @IsString()
    name: string;

    @IsString()
    phone: string;
  }

  export type Result = MarriageDTO;
}
