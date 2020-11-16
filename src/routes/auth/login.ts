import { User } from '@src/entity';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

async function handle(req, res) {
  const body = req.body as {
    username: string;
    password: string;
  };

  const { username, password } = body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    res.json({ msg: '아이디가 틀렸습니다' });
    return;
  }

  console.log('password', password);
  console.log('user.password', user.password);

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    res.json({ msg: '비밀번호가 틀렸습니다' });
    return;
  }

  res.status(200);
  res.json({ userId: user.userId });
}

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  handle(req, res)
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ msg: err.toString() });
    })
});

export default router;