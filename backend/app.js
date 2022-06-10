const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");
const requestRouter = require("./routes/requests");
const orderRouter = require("./routes/orders");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('frontend/build'));

app.get("*", (req, res) => {
    // Otherwise, redirect to /build/index.html
    res.sendFile(`${__dirname}/frontend/build/index.html`);
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/requests", requestRouter);
app.use("/api/orders", orderRouter);

module.exports = app;
