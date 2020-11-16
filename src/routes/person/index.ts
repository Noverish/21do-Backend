import { Router } from 'express';

import getPerson from './get-person';
import createPerson from './create-person';
import findPersonByPhone from './find-by-phone';

const router: Router = Router();

router.use('/', getPerson);
router.use('/', createPerson);
router.use('/', findPersonByPhone);

export default router;
