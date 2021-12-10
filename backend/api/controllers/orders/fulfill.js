const Order = require("../../model/order");

exports.fulfillOrder = async (req, res) => {
  const { orderId, PIN } = req.body;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (order.verificationCode === PIN) {
      const fulfillOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { status: "complete" }
      ).select("status");
      res.status(201).json({
        error: {
          status: "0",
          code: "0",
          message: "",
        },
        data: {},
      });
    } else {
      res.status(400).json({
        error: {
          status: "0",
          code: "0",
          message: "",
        },
        data: {},
      });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        status: "1",
        code: "1",
        message: "Error while updating",
      },
      data: {},
    });
  }
};
