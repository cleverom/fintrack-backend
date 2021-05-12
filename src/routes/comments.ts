import {Router} from 'express';
import {createComment, getComment} from '../controllers/comment';
import {verifyToken} from '../help-auth/helper';

const router = Router();

router.post('/postComment/:id', async function postComment(req, res) {
    const data = req.body;
    const auth: any = req.headers.authorization;
    const token = auth.split(' ')[1];
    const decoded: string | any = await verifyToken(token);
    const authorEmail = decoded.allUser.email;
    const requestID = req.params.id;

    try {
        const comment = await createComment(requestID, authorEmail, data)
        res.status(201).send(comment)
    } catch (error) {
      throw error;  
    }
});

router.get('/comment/:id', getComment)

export default router;
