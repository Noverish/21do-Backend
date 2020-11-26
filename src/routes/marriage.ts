import { Router, Request, Response, NextFunction } from 'express';

import { createMarriage, getMarriage, findMarriageOrCreate } from '@src/services';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/find-or-create', async (req: Request, res: Response, next: NextFunction) => {
  findMarriageOrCreate(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createMarriage(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.get('/:marriageId', async (req: Request, res: Response, next: NextFunction) => {
  getMarriage(req.params as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
