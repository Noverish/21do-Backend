import { Router } from 'express';

import createMarriage from './create-marriage';
import getMarriage from './get-marriage';
import findByPhone from './find-by-phone';

const router: Router = Router();

router.use('/', findByPhone);
router.use('/', createMarriage);
router.use('/', getMarriage);

export default router;
