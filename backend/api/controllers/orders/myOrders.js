const Orders = require("../../model/order");

exports.myOrders = async (req, res) => {
  const username = req.params.username;
  try {
    const orders = await Orders.find({ username }).select(
      "-email -phone -username -address -total -order -__v"
    );
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
};
