const { speak } = require('google-translate-api-x');

const cSpeechService = (text, maxChunkSize, detectLangCode) => { 
    const chunks = [];
    let i = 0;

    while (i < text.length) {
        // Determine the end of the chunk
        let end = Math.min(i + maxChunkSize, text.length);
        
        // Ensure not to cut a word in half
        // If not at the end and the next character is not a space, move back until a space is found
        if (end < text.length && text[end] !== ' ') {
            while (end > i && text[end - 1] !== ' ') {
                end--;
            }
        }

        // If end equals i, we are at a single word longer than maxChunkSize, skip to prevent infinite loop
        if (end === i) {
            end = i + maxChunkSize; // Move at least maxChunkSize forward
        }

        const tempText = text.slice(i, end);
        console.log(tempText);
        const ttsBase64 = speak(tempText, { to: detectLangCode })
            .then(result => result)
            .catch(err => {
                console.error("something went wrong in cSpeechService", err);
                return null; // Handle errors gracefully
            });

        chunks.push(ttsBase64);
        i = end; // Move index to end of the last chunk 
    }

    return Promise.all(chunks); // This should be returned to handle async operations
};

module.exports = cSpeechService;