const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const requestRouter = require('./routes/requests');


const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/requests", requestRouter);

module.exports = app;






 

