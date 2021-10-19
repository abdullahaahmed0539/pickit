/*
DOCUMENTATION 
    Error codes:
        1. Password encryption = 2
        2. Error while updating = 1
        3. Error while finding updated record = 3
        4. Auth = 4
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const joi = require('joi')


exports.updateProfile = (req, res) => {
  const { token, username, password, phone, address, image } = req.body;
  const decodedToken = jwt.verify(token, "verysecretprivatekey");
  if (username === decodedToken.username) {
    updateAttributes = {_id: decodedToken._id,username, email:decodedToken.email};
    
    phone != null ? updateAttributes = { ...updateAttributes, phone }: null;
    address != null ? updateAttributes = { ...updateAttributes, address }: null;
    image != null ? updateAttributes = { ...updateAttributes, image }: null;
    if (password != null) {
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
        }
        updateAttributes = { ...updateAttributes, password: hashedPassword };
        User.updateOne({ _id: decodedToken._id }, updateAttributes )
        .then()
        .catch(err => {
            res.status(500).json({
                error: {
                  status: '1',
                  code: '1',
                  message: 'Error while updating.',
                },
                data: {},
              })
            console.error(`Error log: \n ${err}`);
        })
        User.findById({ _id: decodedToken._id })
        .then(user => {
            res.status(201).json({
                error: {
                  status: '0',
                  code: '0',
                  message: 'no error.',
                },
                data: {
                  username,
                  email: decodedToken.email,
                  phone: user.phone,
                  address: user.address,
                  image: user.image,
                  userType: user.userType,
                }
             })
            })
        .catch(err => {
            res.status(500).json({
                error: {
                  status: '1',
                  code: '3',
                  message: 'Error while retrieving user.',
                },
                data: {},
              })
            console.error(`Error log: \n ${err}`);
        })
      });
      return '';
    }


    User.updateOne({ _id: decodedToken._id }, updateAttributes )
        .then()
        .catch(err => {
            res.status(500).json({
                error: {
                  status: '1',
                  code: '1',
                  message: 'Error while updating.',
                },
                data: {},
              })
            console.error(`Error log: \n ${err}`);
        })
        User.findById({ _id: decodedToken._id })
        .then(user => {
            res.status(201).json({
                error: {
                  status: '0',
                  code: '0',
                  message: 'no error.',
                },
                data: {
                  username,
                  email: decodedToken.email,
                  phone: user.phone,
                  address: user.address,
                  image: user.image,    
                  userType: user.userType,
                }
             })
            })
        .catch(err => {
            res.status(500).json({
                error: {
                  status: '1',
                  code: '3',
                  message: 'Error while updating.',
                },
                data: {},
              })
            console.error(`Error log: \n ${err}`);
        })
    
  } else {
    res.status(401).json({
        error: {
          status: '1',
          code: '4',
          message: 'Unauthorized access.',
        },
        data: {},
      })
    console.error(`Error log: Invalid token`);
  }
};
