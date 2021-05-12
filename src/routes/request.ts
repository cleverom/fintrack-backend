import { Router } from 'express';
import { verifyToken } from '../help-auth/helper';
import nodemailer from 'nodemailer';
import { restrictTo } from '../middleware/auth';
import {
  createRequest,
  getRequest,
  getRequestById,
  getAllRequest,
} from '../controllers/request';

const router = Router();
router.post('/', async function postRequest(req, res) {
  const data = req.body;
  console.log(data, "**********");
  // console.log(req.headers);

  const auth: any = req.headers.authorization;
  const token = auth.split(' ')[1];
  const decoded: string | any = await verifyToken(token);
  const email = decoded.allUser.email;
  const platform = 'http://localhost:3000';
  const userRole = decoded.allUser.role;
  console.log(req.body);
  try {
    if (userRole == 'admin' && data.email !== email) {
      const request = await createRequest(data);
      res.status(201).json({ data: request });
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      console.log("you do not have permission *****************");
      let info = await transporter.sendMail({
        from: '"Fintrack Contact" <cleveromo@gmail.com>',
        to: data.approvers,
        subject: 'Fintrack Contact Request',
        text: 'Hello world?',
        html: `<p>${email} just made a request. please review at:</p>
        <a href=${platform}>Fintrack home page</a>
        `,
      });

      console.log('Message sent: %s', info.messageId);
    } else if (data.email === email) {
      const request = await createRequest(data);
      res.status(201).json({ data: request });
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      let info = await transporter.sendMail({
        from: '"Fintrack Contact" <cleveromo@gmail.com>',
        to: data.approvers,
        subject: 'Fintrack Contact Request',
        text: 'Hello world?',
        html: `<div>${email} just made a request. please review at:</div>
        <a href=${platform}>Fintrack home page</a>
        `,
      });

      console.log('Message sent: %s', info.messageId);

      return;
    } else {
      console.log("you do not have permission");
      
      return res
        .status(401)
        .json({message: 'You do not have permission to perform this action'});
    }
  } catch (error) {
    return res.status(401).json({message: 'You do not have permission to perform this action'});
   
  }
});

router.get('/userRequest', getRequest);
router.get('/request/:id', getRequestById);
router.get('/allRequest', restrictTo('admin', 'agent'), getAllRequest);

export default router;
