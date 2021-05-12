import { Request, Response } from 'express';
const { User, Admin, Agent } = require('../models/userModel');

export async function signUp(req: Request, res: Response) {
  const { name, email, password, role } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (admin) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });
    user.save();
    return res.status(201).json({ message: 'Admin created' });
  } catch (error) {
    console.error(error);
  }
}

export async function agentRole(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
     console.log(user);
    const inAgent = await Agent.findOne({ email });
    if (user && !inAgent) {
      const { name, uniqueId } = user;
      const agent = new Agent({
        name,
        email,
        uniqueId,
        role: 'agent',
      });
      agent.save();
      res.status(201).send(agent);
      return;
    }
    return res.status(404).json({
      message:
        'User could not be created check if he/she already exist as an agent',
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}


export async function adminRole(req: Request, res: Response) {
  console.log("i am here")
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user)
    const inAdmin = await Admin.findOne({ email });
    if (user && !inAdmin) {
      const { name, uniqueId } = user;
      const admin = new Admin({
        name,
        email,
        uniqueId,
        role: 'admin',
      });
      admin.save();
      res.status(201).send(admin);
      return;
    }
    return res
      .status(404)
      .json({
        message:
          'User could not be created check if he/she already exist as an admin',
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
