import jwt from "jsonwebtoken";
import db from ""; // database connections

export const verifyJWT = async (req, res, next) => {
  const aToken = req.cookies?.accessToken;
  if (!aToken) {
    console.log("No Access Token Found, auth.middleware.js");
  }
  const decodedToken = jwt.verify(aToken, process.env.ACESS_TOKEN_SECRET);
  const user = decodedToken.id;
  db.query("SELECT * FROM users WHERE id = ?", [user], (error, results) => {
    if (error) {
      return res.status(500).send("Error on the server");
    }
    if (!results[0]) {
      return res.status(404).send("No User Found");
    }
    req.user = results[0];
    next();
  });
};
