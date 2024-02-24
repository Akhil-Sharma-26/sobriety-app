import connection from "../../../db/db.js";

function queryPromise(queryTemplate, params) {
  return new Promise((resolve, reject) => {
    connection.query(queryTemplate, params, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const registerUser = async (req, res) => {
  let q;

  // check if the email is already registered
  q = queryPromise(`select * from users where email = ?`, [req.body.email]);
  q.then((result) => {
    if (result.length > 0) {
      res.status(400).json({ message: "User already exists" });
    } else {
      queryPromise(
        `insert into users (display_name, email, password) values (?, ?, ?)`,
        [req.body.display_name, req.body.email, req.body.password]
      );
      q.then((result) => {
        res.status(201).json({ message: "User created successfully" });
      }).catch((err) => {
        res.status(500).json({ message: "Internal server error" });
      });
    }
  }).catch((err) => {
    res.status(500).json({ message: "Internal server error" });
  });
};

const loginUser = async (req, res) => {
  let q;

  // check if the email is registered
  q = queryPromise(`select * from users where email = ?`, [req.body.email]);
  q.then((result) => {
    if (result.length == 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      queryPromise(
        `select user_id from users where email = ? and password = ?`,
        [req.body.email, req.body.password]
      )
        .then((result) => {
          if (result.length == 0) {
            res.status(401).json({ message: "Invalid credentials" });
          } else {
            res.status(200).json({
              message: "User logged in successfully",
              user_id: result[0].user_id,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Internal server error" });
        });
    }
  }).catch((err) => {
    res.status(500).json({ message: "Internal server error" });
  });
};

export { registerUser, loginUser };
