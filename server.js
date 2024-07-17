const express = require("express");
require("dotenv").config();
const db = require("./models");
var customerRoute = require("./routes/customerRoutes");
const app = express();
var cronjob = require("./cronjob");

app.use(express.json());
// app.use(
//   "/customer",
//   customerRoute
// )
app.use("/customer", customerRoute);
const PORT = process.env.PORT;

cronjob();

(async () => {
  try {
    await db.Sequelize.sync();
    console.log("Database synchronized");
  } catch (err) {
    console.error("Error synchronizing the database:", err);
  }
})();
app.listen(PORT, () => {
  console.log(`Server is listening to port no ${PORT}`);
});
