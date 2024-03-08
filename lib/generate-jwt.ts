import JWT from 'jsonwebtoken';
import { variables } from '@/constants';

function generateJwt(data: any, exp?: string) {
  const { AUTH_SECRET } = variables.ENV;
  if (exp) return JWT.sign(data, AUTH_SECRET, { expiresIn: exp });
  return JWT.sign(data, AUTH_SECRET);
}

export default generateJwt;
