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

async function initialiseUser(user_id) {
    await queryPromise("delete from streak where user_id = ?", [user_id]);
    await queryPromise("update users set addiction = NULL where user_id = ?", [user_id]);

    let year = new Date().getFullYear();
    let isLeapYear = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    return queryPromise(
        "insert into streak (user_id, streak_year, streak_array) values (?, ?, ?)",
        [user_id, 2024, generateEmptyStreak(isLeapYear)]
    )
}

function generateEmptyStreak(isLeapYear) {
    let days = isLeapYear ? 366 : 365;
    let output = "";
    for (let i = 0; i < days; i++) {
        output += "0";
    }
    
    return output;
}

function parseStreak(streakArray, year) {
    let isLeapYear = year % 4 == 0;
    let days = isLeapYear ? 366 : 365;
    let output = [];

    for (let i = 0; i < days; i++) {
        output.push(streakArray[i] == "1");
    }
    return output;
}


// api functions

const registerUser = async(req, res) => {
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
  console.log(req);
  queryPromise("select display_name, addiction from users where user_id = ?", [
    req.body.user_id,
  ])
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          message: "User details fetched successfully",
          details: result[0],
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

const fetchUserBlogs = async (req, res) => {
  queryPromise("select * from blog_posts where user_id = ?", [req.body.user_id])
    .then((result) => {
      if (result.length == 0) {
        res.status(404).json({ message: "No blogs found for this user" });
      } else {
        res.status(200).json({
          message: "User blogs fetched successfully",
          blogs: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};


const resetUser = async (req, res) => {
    initialiseUser(req.body.user_id).then((result) => {
        if (result) {
            res.status(200).json({message: "User details reset successfully"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    })   
}

const getStreak = async (req, res) => {
    queryPromise(
        "select streak_array, streak_year from streak where user_id = ? and streak_year = ?", [req.body.user_id, req.body.streak_year]
    ).then((result) => {
        // console.log(result);
        if (result.length == 0) {
            res.status(404).json({message: "Streak not found"});
        } else {
            res.status(200).json({
                message: "Streak fetched successfully",
                streak: parseStreak(result[0].streak_array, result[0].streak_year)
            });
        }
    }).catch((err) => { 
        res.status(500).json({message: "Internal server error"});
        // console.log(err);
    });
}

const checkIn = async (req, res) => {
  // if day_number is provided, use it
  if (req.body.day_number) {
    queryPromise(
      "select streak_array, streak_year from streak where user_id = ? and streak_year = ?",
      [req.body.user_id, req.body.streak_year]
    ).then((result) => {
      if (result.length == 0) {
        res.status(404).json({ message: "Streak not found" });
      } else {
        let streak = parseStreak(result[0].streak_array, result[0].streak_year);
        streak[req.body.day_number-1] = true;
        let output = "";
        for (let i = 0; i < streak.length; i++) {
          output += streak[i] ? "1" : "0";
        }

        queryPromise(
          "update streak set streak_array = ? where user_id = ? and streak_year = ?",
          [output, req.body.user_id, result[0].streak_year]
        ).then((result) => {
          res.status(200).json({ message: `Check-in successful for day ${req.body.day_number}` });
        }).catch((err) => {
          res.status(500).json({ message: "Internal server error" });
        });
      }
    }).catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
  }

  // if day_number is not provided, use the current date
  else {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = ~~(diff / oneDay);

    queryPromise(
        "select streak_array, streak_year from streak where user_id = ? and streak_year = ?",
        [req.body.user_id, req.body.streak_year]
    ).then((result) => {
        if (result.length == 0) {
            res.status(404).json({message: "Streak not found"});
        } else {
            let streak = parseStreak(result[0].streak_array, result[0].streak_year);
            streak[dayOfYear-1] = true;
            let output = "";
            for (let i = 0; i < streak.length; i++) {
                output += streak[i] ? "1" : "0";
            }

            queryPromise(
                "update streak set streak_array = ? where user_id = ? and streak_year = ?",
                [output, req.body.user_id, result[0].streak_year]
            ).then((result) => {
                res.status(200).json({message: "Check-in successful"});
            }).catch((err) => {
                res.status(500).json({message: "Internal server error"});
            });
        }
    }).catch((err) => { 
        res.status(500).json({message: "Internal server error"});
    });
  }
}
const fetchAllBlogs = async (req, res) => {
  queryPromise("select post_id, users.display_name, date_created, date_edited, heading, content, upvote from blog_posts, users where blog_posts.author = users.user_id")
    .then((result) => {
      if (result.length == 0) {
        res.status(404).json({ message: "No blogs found" });
      } else {
        res.status(200).json({
          message: "User blogs fetched successfully",
          blogs: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const getStreakInfo = async (req, res) => {
  queryPromise(
    "select streak_array, streak_year from streak where user_id = ? and streak_year = ?",
    [req.body.user_id, req.body.streak_year]
  ).then((result) => {
    if (result.length == 0) {
      res.status(404).json({ message: "Streak not found" });
    } else {
      let streak = parseStreak(result[0].streak_array, result[0].streak_year);
      
      let longestStreak = 0;
      let currentStreak = 0;

      const dayOfYear = ~~(
        (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );

      for (let i = 0; i < dayOfYear; i++) {
        if (streak[i]) {
          currentStreak++;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      }

      res.status(200).json({
        message: "Streak info fetched successfully",
        longestStreak: longestStreak,
        currentStreak: currentStreak,
      });
    }
  }).catch((err) => {
    res.status(500).json({ message: "Internal server error" });
  });
}


export {
    registerUser,
    loginUser,
    fetchUserDetails,
    fetchUserBlogs,
    resetUser,
    getStreak,
    checkIn,
    fetchAllBlogs,
    getStreakInfo
}

