import { Ticket } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    userId: number;
  }

  const { userId } = body;

  const marraige = await Ticket.find({
    where: { userId },
  });
  
  res.status(200);
  res.json(marraige);
});

export default router;