import { Person } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/find/by/phone', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    phone: string;
  }

  const { phone } = body;

  const person = await Person.findOne({ phone });

  if (person) {
    res.status(200);
    res.json(person);
  } else {
    res.status(404);
    res.json({ msg: '존재하지 않는 사람입니다' });
  }
});

export default router;