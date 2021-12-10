const Order = require("../../model/order");

exports.createOrder = (req, res) => {
  const { username, email, phone, address, total, cart } = req.body;

  var newOrder = new Order({
    username,
    email,
    phone,
    address,
    total,
    verificationCode: Math.floor(1000 + Math.random() * 9000),
    date: Date.now(),
    status: "In progress",
    order: cart,
  });

  newOrder
    .save()
    .then(order => {
      res.status(201).json({
        error: {
          status: "0",
          code: "0",
          message: "",
        },
        data: order,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          status: "1",
          code: "1",
          message: "Error while posting in database",
        },
        data: {},
      });
    });
};
