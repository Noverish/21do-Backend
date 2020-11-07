import { Router } from 'express';

import payment from './payment';
import dummy from './dummy';

const router: Router = Router();

router.use('/payment', payment);
router.use('/dummy', dummy);

export default router;
