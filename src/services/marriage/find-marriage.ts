import { Marriage, User } from '@src/entity';
import { MarriageDTO } from '@src/models';
import { FindConditions } from 'typeorm';

export async function findMarriage(params: findMarriage.Params): Promise<findMarriage.Result> {
  const { phone } = params;

  let list: Marriage[] = [];
  if (phone) {
    const user = await User.findOne({ phone });
    if (user) {
      list = await Marriage.find({
        where: [{
          maleUserId: user.userId,
        }, {
          ladyUserId: user.userId,
        }]
      });
    }
  } else {
    list = await Marriage.find(params);
  }

  const result = await Promise.all(list.map(v => v.toDTO()));
  return result;
}

export namespace findMarriage {
  export type Params = FindConditions<Marriage> & { phone?: string };

  export type Result = MarriageDTO[];
}
