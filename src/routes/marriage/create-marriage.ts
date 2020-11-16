import { Marriage, Person } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    maleName: string;
    malePhone: string;
    ladyName: string;
    ladyPhone: string;
    location: string;
    account: string;
    bank: string;
  };

  const { maleName, malePhone, ladyName, ladyPhone, location, account, bank } = body;

  const male = await Person.getOrCreateIfNotExist(malePhone, maleName);
  const lady = await Person.getOrCreateIfNotExist(ladyPhone, ladyName);
  const marriageInsertResult = await Marriage.insert({ male, lady, location, account, bank });
  const marriage = await Marriage.findOne(marriageInsertResult.identifiers[0].marriageId);
  
  res.status(200);
  res.json(marriage);
});

export default router;