import { Router } from 'express';
import { restrictTo } from '../middleware/auth';
import { createData, getData } from '../controllers/fintrack';
import { getAuth, getAcquireToken} from '../controllers/auth';

const router = Router();

router.get('/', function (req, res) {
  return res.status(200).json('Welcome to FinTrack');
});

router.get('/upload', (req, res) => {
  res.render('index');
});

router.post('/request', createData);

router.get('/request', restrictTo('admin'), getData);

router.get('/login', getAuth);
router.get('/redirect', getAcquireToken);

export default router;
