import { Router } from 'express';
import { restrictTo } from '../middleware/auth';
import {
  agentRole,
  adminRole
} from '../controllers/user';

const router = Router();

router.post('/updateAgent', restrictTo('admin'), agentRole);
router.post('/updateAdmin', restrictTo('admin'), adminRole);


export default router;
