import { Router } from 'express';

import payment from './payment';
import dummy from './dummy';
import marriage from './marriage';
import auth from './auth';
import guestbook from './guestbook';
import ticket from './ticket';

const router: Router = Router();

router.use('/auth', auth);
router.use('/payment', payment);
router.use('/dummy', dummy);
router.use('/marriage', marriage);
router.use('/guestbook', guestbook);
router.use('/ticket', ticket);

export default router;
