const Order = require("../../model/order");

exports.getOrder = async (req, res) => {
  const orderId = req.params.order_id;

  try {
    const order = await Order.findById(orderId);
    res.status(200).json({
      error: {
        status: "0",
        code: "0",
        message: "",
      },
      data: { order },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        status: "1",
        code: "1",
        message: "Cannot find your order.",
      },
      data: {},
    });
  }
};
