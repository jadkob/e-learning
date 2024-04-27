import * as jwt from "jsonwebtoken";

export const authenticate = async (token: string) => {
  try {
    await jwt.verify(token, "secret");
    return true;
  } catch (error) {
    return false;
  }
};
