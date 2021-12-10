import { Router } from 'express';
import requestSchema from '../models/fintrackModels'


const router = Router();

router.delete('/:id', function closeRequest(req, res) {
    console.log("i am here")
    try {
    const {id}  = req.params;
    requestSchema.findByIdAndDelete(id).then((result: any) => {
        if (!result) {
            
            return res.status(404).json('request not found')
        }
        
        res.status(200).json('request successfully deleted')
    })
    } catch (error) {
    throw error;
    }
    
});



export default router;                                                              