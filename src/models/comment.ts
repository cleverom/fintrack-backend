import { any } from 'joi';
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({ 
requestID: {
    type: String,
},
authorEmail: {
    type: String,
},
comment: {
    type: Array,
},
},
{ timestamps:true },
);

export default mongoose.model('requestComment', commentSchema);