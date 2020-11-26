import { listTicket } from '@src/services';
import { Router, Request, Response, NextFunction } from 'express';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  listTicket({ userId: req.query.userId ? parseInt(req.query.userId as string) : undefined })
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
