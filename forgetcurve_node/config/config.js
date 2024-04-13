require('dotenv').config();

module.exports = {
    googleUrl: `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.API_KEY}`,
    port: process.env.PORT || 4000
};