require("dotenv").config();
const axios = require("axios")
const express = require("express");
const app = express();
const cors = require("cors")
const translate = require('google-translate-api-x');
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

app.post('/google',speechRoutes);

app.post('/translate', async (req, res) => {
  try{
  const result = await translate("how are you doing", { to: 'es' });
    res.json({translateText:result.text,
    langCode:result.from.language.iso
    })
  }
  catch(err){
  console.log('Error translating', err);
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
