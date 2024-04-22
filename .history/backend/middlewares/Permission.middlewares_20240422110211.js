import jwt from "jsonwebtoken";
// verify token
const verifyToken = (req, res) => {
  const token = req.header.token;
  // Bearer : 12312312323123123123231231323v :token
  if (token) {
    const accessToken = token.split(" "[1]);
  }
};
