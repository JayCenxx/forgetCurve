require("dotenv").config();
const axios = require("axios")
const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())
const googleUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.API_KEY}`;

const port = process.env.PORT;
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.json({ status: "success" });
  } else {
    next();
  }
});

app.post('/synthesize-speech', async (req, res) => {
  
  const { input,voice,audioConfig } = req.body; 

  if (!input.text) {
      return res.status(400).send({ error: 'Text is required' });
  }

  const requestData = {
      input: input,
      voice: voice,
      audioConfig: { audioEncoding: 'MP3' ,speakingRate: audioConfig.speakingRate},
  };

  try {
      const response = await axios.post(googleUrl, requestData);
      res.json(response.data);
  } catch (error) {
      console.error('Error calling the Google Text-to-Speech API:', error.message);
      res.status(500).send({ error: 'Error processing your request' });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
