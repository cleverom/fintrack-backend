import {Request, Response} from 'express'
import {commentObject} from '../uttils/comment'
import commentSchema from '../models/comment'

export async function createComment(requestID:any, authorEmail:string, comment: string){
    const{error, value} = commentObject.validate({requestID, authorEmail, comment})
    if(error?.details) throw error;
    const comments = new commentSchema(value)
    
    comments
    .save()
    .then()
    .catch((error) => {
        throw error;
    });
    return comments;

}

export async function getComment(req:Request, res: Response) {
    const requestID:any = req.params.id;
    console.log(requestID);
    
    const comment = await commentSchema.find({requestID});
    if(!comment) {
       return  res.status(404).json({message: "Comment not found"})
    }
   return  res.status(200).json({data: comment})
}
export default {createComment, getComment};