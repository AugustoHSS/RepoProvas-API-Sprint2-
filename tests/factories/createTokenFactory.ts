
import jwt from "jsonwebtoken";
export default async function createToken() {

  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);

  return token

}