import { User } from '@src/entity';
import { UserDTO } from '@src/models';
import { FindConditions } from 'typeorm';

export async function findUser(params: findUser.Params): Promise<findUser.Result> {
  const list = await User.find(params);
  const result = await Promise.all(list.map(v => v.toDTO()));
  return result;
}

export namespace findUser {
  export type Params = FindConditions<User>;

  export type Result = UserDTO[];
}
