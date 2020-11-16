import { Guestbook, Marriage, Person } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    marriageId: number;
    userId: number | undefined;
    name: string;
    belong: string;
    msg: string;
  };

  const { marriageId, userId, name, belong, msg } = body;

  const insertResult = await Guestbook.insert({ marriageId, userId, name, belong, msg });
  const guestbook = await Guestbook.findOne(insertResult.identifiers[0].guestbookId);
  
  res.status(200);
  res.json(guestbook);
});

export default router;