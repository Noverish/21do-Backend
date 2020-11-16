import { Person, User } from '@src/entity';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    username: string;
    password: string;
    phone: string;
    name: string;
  };

  const { username, password, phone, name } = body;

  if (await User.findOne({ username })) {
    res.status(400);
    res.json({ msg: '이미 존재하는 아이디입니다' });
    return;
  }

  let personId: number;
  const person = await Person.findOne({ phone });
  if (person) {
    personId = person.personId;
  } else {
    const personInsertResult = await Person.insert({ name, phone });
    personId = personInsertResult.identifiers[0].personId;
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const userInsertResult = await User.insert({ username, personId, password: hashedPassword });

  res.status(200);
  res.json({ userId: userInsertResult.identifiers[0].userId });
});

export default router;
