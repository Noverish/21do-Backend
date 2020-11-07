import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    res.status(200);
    res.json({
      body: req.body,
      headers: req.headers,
    });
  }, 1500)
});

export default router;