import { Router, Request, Response, NextFunction } from 'express';
import { PaymentReadyService, PaymentApproveService } from '@src/services';

const router: Router = Router();

router.post('/ready', (req: Request, res: Response, next: NextFunction) => {
  const origin = req.header('origin');
  const { amount } = req.body;

  if (!amount) {
    res.status(400);
    res.json({ msg: 'amount is not exist '});
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

router.post('/approve', (req: Request, res: Response, next: NextFunction) => {
  const { pg_token, tid } = req.body;

  if (!pg_token || !tid) {
    res.status(400);
    res.json({ msg: 'params is insufficient'});
    return;
  }

  PaymentApproveService({ pg_token, tid })
    .then((result: PaymentApproveService.Result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(500);
      res.json(err.response.data);
    })
});

export default router;