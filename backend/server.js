const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\x1b[32m", "Database connection successful.");
    console.log("\x1b[0m", "");
  })
  .catch(err => {
    console.log("\x1b[31m", `Database connection unsuccessful.\n log: ${err}`);
    console.log("\x1b[0m", "");
  });

//Starting up server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Running on port ${PORT}.`);
  console.log("Connecting to database...");
});
