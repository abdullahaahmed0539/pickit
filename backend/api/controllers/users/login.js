/*
DOCUMENTATION 
        Error codes:
        1. not able to find DB = 4
        2. User not found in DB = 5
        3. Incorrect password = 6
        4. compare method not working = 7
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

exports.login = (req, res) => {
  //storing values passed from client side
  const { username, password } = req.body;

  //searching the mongo database
  User.findOne({ username: username })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          error: {
            status: "1",
            code: "5",
            message: "Username not found.",
          },
          data: {},
        });
      } else {
        //if a value is returned then compare the password with the encrypted password saved in db
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: {
                status: "1",
                code: "7",
                message:
                  "Problem in comparing password with the encrypted password in database.",
              },
              data: {},
            });
            return console.error(`Error log: \n ${err}`);
          }

          //if both passwords are equal then sign the payload
          if (result) {
            let token = jwt.sign(
              {
                _id: user._id,
                username: user.username,
                email: user.email,
                userType: user.userType,
              },
              "verysecretprivatekey",
              { expiresIn: "3h" }
            );

            res.status(200).json({
              error: {
                status: "0",
                code: "0",
                message: "no error.",
              },
              data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                userType: user.userType,
                token,
              },
            });
          }

          //if not equal then incorrect password
          else {
            res.status(401).json({
              error: {
                status: "1",
                code: "6",
                message: "Incorrect password.",
              },
              data: {},
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          status: "1",
          code: "4",
          message: "Problem with FindOne query.",
        },
        data: {},
      });
      return console.error(`Error log: \n ${err}`);
    });
};
