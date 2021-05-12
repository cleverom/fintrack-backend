import express, { Request, Response, NextFunction}from 'express';
import requestSchema from '../models/fintrackModels';

const { Agent } = require('../models/userModel')

export async function getRequestByDate( req: Request, res: Response ) {

  const date: string | any = req.query.date;
  try {
    const requestTimeCreated = await requestSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date),
          },
        },
      },
    ]);

    if (requestTimeCreated) {
      return res.status(200).json({ data: requestTimeCreated });
    }
    return res.status(400).json({message: "Not Found"})
  }
  catch (error) {
     console.error(error);
  }
}


export async function getRequestByCategory(req: Request , res: Response) {
  const { category } = req.query
  try {
    const type = await requestSchema.find({ category })
    if (type) {
      return res.status(200).json({ data: type });
    }
    return res.status(404).send("No request In this category")
  }
  catch (err) {
   return res.status(500).json({message: err})
  }
}


export async function getRequestByAgent(req: Request , res: Response) {
  const { email } = req.query;
   try {
     const agent = await Agent.find({ email });
     if (agent) {
       const user = await requestSchema.find({ email });
       if (user) {
         return res.status(200).json({ data: user });
       }
       return res.status(404).send("user has no request In this category")
     }
     return res
       .status(400)
       .json({ message: 'user is not an agent' });
   } catch (err) {
     return res.status(500).json({ message: err });
   }
}


export async function getRequestByUser(req: Request , res: Response) {
  const { userEmail } = req.query;
  console.log(userEmail)
  try {
    const user = await requestSchema.find({ email: userEmail })
    if (user) {
      return res.status(200).json({data: user})
    }
    return res.status(400).json({message: "user have no request in such category"})
  }
  catch (err) {
    return res.status(500).json({message: err})
  }
}


export async function getRequestByStatus(req: Request , res: Response) {
  const { status } = req.query;
  console.log(status)
   try {
     const result = await requestSchema.find({ status: status });
     if (result) {
       return res.status(200).json({ data: result });
     }
     return res.status(404).send('No request In this category');
   } catch (err) {
     return res.status(500).json({ message: err });
   }
}


export async function getSlaRequest(req: Request, res: Response) {
  const sla: string | any = req.query.sla;
  const check = new Date(new Date().setHours(new Date().getHours() - sla));
  try {
    const slaRequest = await requestSchema.aggregate([
      {
        $match: {
          status: { $nin: ['canceled', 'resolved'] },
          createdAt: {
            $gte: new Date(`${check}`),
          },
        },
      },
    ]);

    if (slaRequest.length > 0) {
      return res.status(200).json({ data: slaRequest });
    }
    return res.status(400).json({ message: 'No SLA requests in our range' });
  } catch (error) {
    console.error(error);
  }
}

