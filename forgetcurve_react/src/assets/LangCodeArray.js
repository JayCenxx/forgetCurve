
export const langCodeArray = [
    {"language":"Auto-Detect","langCode":"auto"},
    {"language": "Amharic", "langCode": "am"},
    {"language": "Arabic", "langCode": "ar"},
    {"language": "Basque", "langCode": "eu"},
    {"language": "Bengali", "langCode": "bn"},
    {"language": "Bulgarian", "langCode": "bg"},
    {"language": "Catalan", "langCode": "ca"},
    {"language": "Cherokee", "langCode": "chr"},
    {"language": "Chinese (Traditional)", "langCode": "zh-TW"},
    {"language": "Chinese (Simplified)", "langCode": "zh-CN"},
    {"language": "Croatian", "langCode": "hr"},
    {"language": "Czech", "langCode": "cs"},
    {"language": "Danish", "langCode": "da"},
    {"language": "Dutch", "langCode": "nl"},
    {"language": "English (US)", "langCode": "en"},
    {"language": "English (UK)", "langCode": "en-GB"},
    {"language": "Estonian", "langCode": "et"},
    {"language": "Filipino", "langCode": "fil"},
    {"language": "Finnish", "langCode": "fi"},
    {"language": "French", "langCode": "fr"},
    {"language": "German", "langCode": "de"},
    {"language": "Greek", "langCode": "el"},
    {"language": "Gujarati", "langCode": "gu"},
    {"language": "Hebrew", "langCode": "iw"},
    {"language": "Hindi", "langCode": "hi"},
    {"language": "Hungarian", "langCode": "hu"},
    {"language": "Icelandic", "langCode": "is"},
    {"language": "Indonesian", "langCode": "id"},
    {"language": "Italian", "langCode": "it"},
    {"language": "Japanese", "langCode": "ja"},
    {"language": "Kannada", "langCode": "kn"},
    {"language": "Korean", "langCode": "ko"},
    {"language": "Latvian", "langCode": "lv"},
    {"language": "Lithuanian", "langCode": "lt"},
    {"language": "Malay", "langCode": "ms"},
    {"language": "Malayalam", "langCode": "ml"},
    {"language": "Marathi", "langCode": "mr"},
    {"language": "Norwegian", "langCode": "no"},
    {"language": "Polish", "langCode": "pl"},
    {"language": "Portuguese (Portugal)", "langCode": "pt-PT"},
    {"language": "Portuguese (Brazil)", "langCode": "pt-BR"},
    {"language": "Romanian", "langCode": "ro"},
    {"language": "Russian", "langCode": "ru"},
    {"language": "Serbian", "langCode": "sr"},
    {"language": "Slovak", "langCode": "sk"},
    {"language": "Slovenian", "langCode": "sl"},
    {"language": "Spanish", "langCode": "es"},
    {"language": "Swahili", "langCode": "sw"},
    {"language": "Swedish", "langCode": "sv"},
    {"language": "Tamil", "langCode": "ta"},
    {"language": "Telugu", "langCode": "te"},
    {"language": "Thai", "langCode": "th"},
    {"language": "Turkish", "langCode": "tr"},
    {"language": "Urdu", "langCode": "ur"},
    {"language": "Ukrainian", "langCode": "uk"},
    {"language": "Vietnamese", "langCode": "vi"},
    {"language": "Welsh", "langCode": "cy"}
  ];



  export const findLanguageWithLangCode = (tempLangCode) => {
    const langCodeMap = langCodeArray.reduce((acc, { langCode, language }) => {
      // ex, "en" : "English" 
        acc[langCode] = language;
        return acc;
      }, {});

      if (!langCodeMap[tempLangCode]) {
        throw new Error("langCode Not Found");
      }

    return langCodeMap[tempLangCode] || "";
  }