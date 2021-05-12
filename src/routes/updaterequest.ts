import {Router} from 'express';
import requestSchema from '../models/fintrackModels'
import { restrictTo } from '../middleware/auth';

const router = Router();

router.patch('/:id', async function updateRequest(req, res) {
    try {
        const requestID = req.params.id;
        const newData = req.body;
        console.log(newData);
     let request:any = await requestSchema.findById(requestID);
      request['email'] = request['email'];
      request['title'] = newData.title || request['title']
      request['description'] = newData.description || request['description']
      request['request'] = newData.request || request['request']
      request['image_url'] = newData.image_url || request['image_url']
      request['amount'] = newData.amount || request['amount']
      request['status'] = newData.status || request['status']
      request['approvers'] = newData.status || request['approvers']

      request.save()
     return res.status(201).json({request})
        
    } catch (error) {
        throw error;
      }
    
})

export default router;
