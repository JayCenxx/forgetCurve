require("dotenv").config();
const express = require("express");
const cors = require("cors")
const { port } = require("./config/config");
const speechRoutes = require('./routes/speechRoutes');

const app = express();
app.use(express.json())
app.use(cors())

const {TranslationServiceClient} = require('@google-cloud/translate');
const client = new TranslationServiceClient({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});


app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.json({ status: "success" });
  } else {
    next();
  }
});

app.use('/google',speechRoutes)




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
