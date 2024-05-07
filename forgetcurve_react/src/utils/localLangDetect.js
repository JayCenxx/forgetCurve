export function localLangDetect(text) {
    const langRegex = {
        'Chinese': /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/,   
        'Japanese': /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/, 
        'Korean': /[\uAC00-\uD7AF]/,  
        'Tibetan': /[\u0F00-\u0FFF]/, 
        'Classical Vietnamese': /[\uAA00-\uAA5F\u2C00-\u2DFF\u1B00-\u1B7F]/,   
        'Burmese': /[\u1000-\u109F]/,   
        'Lao': /[\u0E80-\u0EFF]/   
    };

    for (let language in langRegex) {
        if (langRegex[language].test(text)) {
            //chinese etc ll return this
            return false;
        }
    }
    // english etc return this
    return true;
}
 