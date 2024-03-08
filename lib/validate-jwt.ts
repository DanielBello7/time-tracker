import jsonwebtoken from "jsonwebtoken";
import { variables } from "@/constants";

function validateJwt(token: string): (string | jsonwebtoken.JwtPayload) | false {
  try {
    const { AUTH_SECRET } = variables.ENV;
    const response = jsonwebtoken.verify(token, AUTH_SECRET);
    return response;
  } catch (error) {
    return false
  }
}

export default validateJwt;

