import connection from "../../../db/db.js";


// helper functions

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
      ).then((result) => {
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
        `select user_id,display_name from users where email = ? and password = ?`,
        [req.body.email, req.body.password]
      )
        .then((result) => {
          if (result.length == 0) {
            res.status(401).json({ message: "Invalid credentials" });
          } else {
            res.status(200).json({
              message: "User logged in successfully",
              user_id: result[0].user_id,
              display_name: result[0].display_name
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

const fetchUserDetails = async (req, res) => {
    queryPromise(
        "select display_name, addiction from users where user_id = ?",
        [req.body.user_id]
    ).then((result) => {
        if (result.length > 0) {
            res.status(200).json({
                message: "User details fetched successfully",
                details: result[0]
            });
        } else {
            res.status(404).json({message: "User not found"});
        }
    }).catch((err) => {
        res.status(500).json({message: "Internal server error"});
    });
}

const fetchUserBlogs = async (req, res) => {
    queryPromise(
        "select * from blog_posts where user_id = ?",
        [req.body.user_id]
    ).then((result) => {
        if (result.length == 0) {
            res.status(404).json({message: "No blogs found for this user"});
        } else {
            res.status(200).json({
                message: "User blogs fetched successfully",
                blogs: result
            });
        }
    }).catch((err) => {
        res.status(500).json({message: "Internal server error"});
    });
}

export {
    registerUser,
    loginUser,
    fetchUserDetails,
    fetchUserBlogs
}
