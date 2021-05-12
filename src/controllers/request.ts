import express, { Request, Response} from 'express';
import Joi from 'joi';
import requestSchema from '../models/fintrackModels';
import { verifyToken } from '../help-auth/helper';
const requestObject = Joi.object({
    email: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    request: Joi.string().required(),
    image_url: Joi.array().single(),
    amount: Joi.number().required(),
    status: Joi.string(),
    approvers: Joi.array(),
});

export async function createRequest(data: Record<string, unknown>) {
  const { error, value } = requestObject.validate(data, { stripUnknown: true });
  if (error?.details) throw error;
  const userRequest = new requestSchema(value);
  userRequest
    .save()
    .then()
    .catch((error) => {
      throw error;
    });
  return userRequest;
}


export async function getRequest(req: express.Request, res: express.Response) {
  const auth: any = req.headers.authorization;
  const token = auth.split(' ')[1];
  const decoded: string | any = await verifyToken(token);
  const email = decoded.allUser.email;
  const newRequest = await requestSchema.find({ email });
  if (!newRequest) {
    res.status(400).json({ message: 'data not found' });
  }
  return res.status(200).json({ data: newRequest });
}

export async function getRequestById(req:Request, res: Response) {
  const id:any = req.params.id;
  console.log(id);
  
  const request = await requestSchema.findById(id);
  if(!request) {
     return  res.status(404).json({message: "Request not found"})
  }
 return  res.status(200).json({data: request})
}


export async function getAllRequest(
  req: express.Request,
  res: express.Response,
) {
  const allRequest = await requestSchema.find();
  if (!allRequest) {
    res.status(400).json({ message: 'data not found' });
  }
  res.status(200).json({ data: allRequest });
}
export default { createRequest, getRequest, getAllRequest };
