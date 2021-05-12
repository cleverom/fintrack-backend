import express, { Request, Response, NextFunction, response } from 'express';
import * as msal from '@azure/msal-node';
import config from '../config/config';
import { verify, generateToken } from '../help-auth/helper';

const { User, Admin, Agent } = require('../models/userModel');

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);
export const getAuth = (req: Request, res: Response) => {
  const authCodeUrlParameters = {
    scopes: ['user.read'],
    redirectUri: process.env.REDIRECT_URI!,
  };

  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      console.log(response, 'look at me!!!!!!');
      res.redirect(response);
    })
    .catch((error) => console.log(JSON.stringify(error)));
};

export const getAcquireToken = (req: Request, res: Response) => {
  const tokenRequest: any = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: process.env.REDIRECT_URI,
  };
  cca
    .acquireTokenByCode(tokenRequest)
    .then(async (response: string | any) => {
      console.log(response, tokenRequest);
      console.log('*************************', 'i am done');
      const { uniqueId, account, idToken, idTokenClaims } = response;
      const { username, name } = account;
      const { aud, iss } = idTokenClaims;

      console.log(response);
      const verified = await verify(idToken, iss, aud);

      if (verified === 'success') {
        const email = username;
        let role: any;
        try {
          let allUser = await Admin.findOne({ email });
          if (allUser) {
            const payload = {
              allUser,
            };
            let accessToken = await generateToken(payload);
            res.cookie('myCookie', accessToken);
            console.log('the first one');

            res.redirect('http://localhost:3001/admin');
          }
          allUser = await Agent.findOne({ email });
          if (allUser) {
            const payload = {
              allUser,
            };
            let accessToken = await generateToken(payload);
            res.cookie('myCookie', accessToken);
            res.redirect('http://localhost:3001/agent');
            return;
          }

          allUser = await User.findOne({ email });
          if (allUser) {
            const payload = {
              allUser,
            };
            let accessToken = await generateToken(payload);
            res.cookie('myCookie', accessToken);
            res.redirect('http://localhost:3001/user');
            return;
          }
          allUser = await User.find();
          if (allUser.length === 0) {
            allUser = new Admin({
              name,
              email,
              uniqueId,
              role: 'admin',
            });
            const user = new User({
              name,
              email,
              uniqueId,
              role,
            });
            const payload = {
              allUser,
            };
            let accessToken = await generateToken(payload);
            res.cookie('myCookie', accessToken);
            res.redirect('http://localhost:3001/user');
            await allUser.save();
            await user.save();
          }
          allUser = new User({
            name,
            email,
            uniqueId,
            role,
          });
          const payload = {
            allUser,
          };
          let accessToken = await generateToken(payload);
          res.cookie('myCookie', accessToken);
          await allUser.save();
          res.redirect('http://localhost:3001/user');
        } catch (error) {
          console.error(error);
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

// export const logOutUser = (req: Request, res: Response) => {
//   res.clearCookie("myCookie");

//   console.log("Logged Out");
// }
