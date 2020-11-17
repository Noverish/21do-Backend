import { Router, Request, Response, NextFunction } from 'express';

import { createGuestbook } from '@src/services';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  createGuestbook(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
