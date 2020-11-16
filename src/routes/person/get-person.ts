import { Person } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/:personId', async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as {
    personId: string;
  }

  const { personId } = params;

  const marraige = await Person.findOne(personId);
  if (marraige) {
    res.status(200);
    res.json(marraige);
  } else {
    res.status(404);
    res.json({ msg: '존재하지 않는 사람입니다' });
  }
});

export default router;