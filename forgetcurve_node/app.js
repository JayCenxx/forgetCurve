require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT;
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.json({ status: "success" });
  } else {
    //next();
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
