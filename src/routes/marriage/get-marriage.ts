import { Marriage } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/:marriageId', async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as {
    marriageId: string;
  }

  const { marriageId } = params;

  const marraige = await Marriage.findOne({
    relations: ["male", "lady"],
    where: { marriageId },
  });
  if (marraige) {
    res.status(200);
    res.json(marraige);
  } else {
    res.status(404);
    res.json({ msg: '존재하지 않는 결혼식입니다' });
  }
});

export default router;