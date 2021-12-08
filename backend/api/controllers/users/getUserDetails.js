const User = require("../../model/user");

exports.getUserDetails = async (req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .select("-password")
    .then(user => {
      if (user.length === 0) {
        res.status(404).json({
          error: {
            status: "0",
            code: "0",
            message: "No such user",
          },
          data: {},
        });
      } else {
          res.status(200).json({
            error: {
              status: "0",
              code: "0",
              message: "",
            },
            data: user,
          });
      }
    })
      .catch(err => {
        res.status(500).json({
          error: {
            status: "1",
            code: "1",
            message: "Internal server error.",
          },
          data: {},
        });
    });
};
