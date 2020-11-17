import { Router, Request, Response, NextFunction } from 'express';

import { createMarriage, findMarriage, getMarriage, getMarriageByPhone } from '@src/services';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/get/by/phone', async (req: Request, res: Response, next: NextFunction) => {
  getMarriageByPhone(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/find', async (req: Request, res: Response, next: NextFunction) => {
  findMarriage(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createMarriage(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.get('/:marriageId', async (req: Request, res: Response, next: NextFunction) => {
  getMarriage({ marriageId: parseInt(req.params.marriageId) })
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
