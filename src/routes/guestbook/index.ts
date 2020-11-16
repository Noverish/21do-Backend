import { Router } from 'express';

import createGuestbook from './create-guestbook';
import workflow from './workflow';

const router: Router = Router();

router.use('/', createGuestbook);
router.use('/', workflow);

export default router;
