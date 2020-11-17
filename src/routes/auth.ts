import { Router, Request, Response, NextFunction } from 'express';

import { authLogin, authRegister, authAdd } from '@src/services';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/add', (req: Request, res: Response, next: NextFunction) => {
  authAdd(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  authRegister(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  authLogin(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
