import asyncHandler from "../utils/async_handler.js";
import connection from "../../../db/db.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("Request ", req.body.email);
  connection.query(
    `insert into users (display_name, email, password) values ("${req.body.display_name}", "${req.body.email}", "${req.body.password}")`,
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

const loginUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser };
