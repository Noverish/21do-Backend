import { Router, Request, Response, NextFunction } from 'express';
import { PaymentReadyService, PaymentApproveService } from '@src/services';
import { Transaction } from '@src/entity';

const router: Router = Router();

router.post('/ready', (req: Request, res: Response, next: NextFunction) => {
  const origin = req.header('origin');
  const { amount } = req.body;

  if (!amount) {
    res.status(400);
    res.json({ msg: 'amount is not exist' });
    return;
  }

  PaymentReadyService({ amount, origin })
    .then((result: PaymentReadyService.Result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(500);
      res.json(err.response.data);
    })
});

router.post('/approve', async (req: Request, res: Response, next: NextFunction) => {
  const { pg_token, tid } = req.body as {
    pg_token: string;
    tid: string;
  };

  if (!pg_token || !tid) {
    res.status(400);
    res.json({ msg: 'params is insufficient' });
    return;
  }

  const result = await PaymentApproveService({ pg_token, tid });

  res.status(200);
  res.json(result);
});

export default router;