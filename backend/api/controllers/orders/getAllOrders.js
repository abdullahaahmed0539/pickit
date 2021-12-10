const Order = require("../../model/order");

exports.getAllOrders = async (req, res) => { 
    try {
  const orders = await Order.find({status:'In progress'}).select('_id');
  res.status(200).json({
    error: {
      status: "0",
      code: "0",
      message: "",
    },
    data: { orders },
  });
} catch (error) {
  res.status(500).json({
    error: {
      status: "1",
      code: "1",
      message: error,
    },
    data: {},
  });
}
}