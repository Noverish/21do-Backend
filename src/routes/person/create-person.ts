import { Person } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    name: string;
    phone: string;
  };

  const { name, phone } = body;

  const insertResult = await Person.insert({ name, phone });
  const person = await Person.findOne(insertResult.identifiers[0].personId);
  
  res.status(200);
  res.json(person);
});

export default router;