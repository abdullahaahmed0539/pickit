const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const User = require("../model/user");

/*
DOCUMENTATION 
    Sign up:-
        Error codes:
        1. Cannot add due to duplication in database = 1
        2. encryption error = 2
        3. incorrect email format or password = 3

    Login:-
        Error codes:
        1. not able to find DB = 4
        2. User not found in DB = 5
        3. Incorrect password = 6
        4. compare method not working = 7

*/

const inputValidator = (email, password) => {
  const isEmailValid = emailValidator.validate(email);
  console.log(isEmailValid);
  if (!isEmailValid) return "not valid";

  var passwordSchema = new passwordValidator();
  // Add properties to it
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces(); // Should not have spaces

  const isPasswordValid = passwordSchema.validate(password);
  console.log(isPasswordValid);
  if (!isPasswordValid) return "not valid";

  return "valid";
};

exports.signUp = (req, res) => {
  //storing values passed from client side
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const userType = "normal";

  const validInputs = inputValidator(email, password);
  if (validInputs === "not valid") {
    res.status(406).json({
      error: {
        status: "1",
        code: "3",
        message: "Email or password not correct.",
        log: "Incorrect email format or password",
      },
      data: {},
    });
    return "";
  }

  //encrypts the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({
        error: {
          status: "1",
          code: "2",
          message: "Encryption error",
          log: err,
        },
        data: {},
      });
    }

    //create new user
    var newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });
    newUser.save(function (err, user) {
      //if username or email already exist in database, then send error.
      if (err) {
        res.status(406).json({
          error: {
            status: "1",
            code: "1",
            message: "Duplication error",
            log: err,
          },
          data: {},
        });
        return console.log(err);
      }

      //if username or email doesn't exist in database, then send success response.
      res.status(201).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
          log: "none",
        },
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          userType: user.userType,
        },
      });
    });
  });
};

exports.login = (req, res) => {
  //storing values passed from client side
  const username = req.body.username;
  const password = req.body.password;

  //searching the mongo database
  User.findOne({ username: username })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          error: {
            status: "1",
            code: "5",
            message: "Username not found.",
            log: "",
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
                log: err,
              },
              data: {},
            });
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
              { expiresIn: "1h" }
            );

            res.status(200).json({
              error: {
                status: "0",
                code: "0",
                message: "no error.",
                log: "none",
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
            res.status(500).json({
              error: {
                status: "1",
                code: "6",
                message: "Incorrect password.",
                log: "",
              },
              data: {},
            });
          }
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        error: {
          status: "1",
          code: "4",
          message: "Problem with FindOne query.",
          log: err,
        },
        data: {},
      })
    );
};
