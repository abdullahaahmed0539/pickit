/*
DOCUMENTATION 
        Error codes:
        1. Cannot add due to duplication in database = 1
        2. encryption error = 2
        3. incorrect email format or password = 3
*/

const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const User = require("../../model/user");

const inputValidator = (email, password) => {
  const isEmailValid = emailValidator.validate(email);
  if (!isEmailValid) return "not valid";

  var passwordSchema = new passwordValidator();
  // Add properties to it
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 30
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
  if (!isPasswordValid) return "not valid";
  return "valid";
};

exports.signUp = (req, res) => {
  //storing values passed from client side
  const { username, email, password } = req.body;
  const userType = "normal";

  const validInputs = inputValidator(email, password);
  if (validInputs === "not valid") {
    res.status(406).json({
      error: {
        status: "1",
        code: "3",
        message: "Email or password not correct.",
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
        },
        data: {},
      });
      return console.error(`Error log: \n ${err}`);
    }

    //create new user
    var newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone: "",
      address: "",
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
          },
          data: {},
        });
        return console.error(`Error log: \n ${err}`);
      }

      //if username or email doesn't exist in database, then send success response.
      res.status(201).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          username: user.username,
          email: user.email,
          userType: user.userType,
        },
      });
    });
  });
};
