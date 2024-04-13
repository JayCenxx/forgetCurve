require("dotenv").config();
const axios = require("axios")
const express = require("express");
const app = express();
const cors = require("cors")

const { googleUrl,port } = require("./config/config");
const speechRoutes = require('./routes/speechRoutes');

app.use(express.json())
app.use(cors())


app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.json({ status: "success" });
  } else {
    next();
  }
});

app.use('/google',speechRoutes);




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
