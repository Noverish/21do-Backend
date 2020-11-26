import { paymentApprove, paymentKakaoReady, paymentToss } from '@src/services';
import { NextFunction, Request, Response, Router } from 'express';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/kakao/ready', async (req: Request, res: Response, next: NextFunction) => {
  paymentKakaoReady(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/kakao/approve', (req: Request, res: Response, next: NextFunction) => {
  paymentApprove(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

router.post('/toss', (req: Request, res: Response, next: NextFunction) => {
  paymentToss(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;