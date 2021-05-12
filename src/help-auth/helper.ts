import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const azureJWT = require('azure-jwt-verify');
dotenv.config();

const secretKey: string | any = process.env.JWT_SECRET;

export const generateToken = async (payload: any, secret = secretKey) => {
  const token = await jwt.sign(payload, secret, { expiresIn: '1d' });
  console.log(token);
  return token;
};


export const verifyToken = async (token: any, secret = secretKey) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};


 export const verify = async (token: any, iss: any, aud: any) => {
  const jwtToken = token;
  const config = {
    JWK_URI: process.env.JWK_URI_KEYS,
    ISS: iss,
    AUD: aud,
  };


  let value = await azureJWT.verify(jwtToken, config);
  let parsed = JSON.parse(value);
  console.log(parsed.status);
  if (parsed.status === 'success') {
    return parsed.status;
  } else {
    console.log('Error');
    return 'Not Verified';
  }
};

export default verifyToken;

