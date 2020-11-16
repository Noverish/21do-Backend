import { Router } from 'express';

import listTicket from './list-ticket';

const router: Router = Router();

router.use('/', listTicket);

export default router;
