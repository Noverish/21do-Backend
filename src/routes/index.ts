import { Router } from 'express';

import payment from './payment';
import dummy from './dummy';
import marriage from './marriage';
import person from './person';
import auth from './auth';
import guestbook from './guestbook';

const router: Router = Router();

router.use('/auth', auth);
router.use('/payment', payment);
router.use('/dummy', dummy);
router.use('/marriage', marriage);
router.use('/person', person);
router.use('/guestbook', guestbook);

export default router;
