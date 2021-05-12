import { Router } from 'express';
import { restrictTo } from '../middleware/auth';
import {
  getRequestByDate,
  getRequestByCategory,
  getRequestByAgent,
  getRequestByUser,
  getRequestByStatus,
  getSlaRequest,
} from '../controllers/analytics';

const router = Router();

router.get('/request/analytics', restrictTo('admin'), getRequestByDate);
router.get('/analytics', restrictTo('admin'), getRequestByCategory,);
router.get('/agentAnalytics', restrictTo('admin'), getRequestByAgent);
router.get('/userAnalytics', restrictTo('admin'), getRequestByUser);
router.get('/statusAnalytics', restrictTo('admin'), getRequestByStatus);
router.get('/slaRequest', restrictTo('admin'), getSlaRequest);

export default router;
