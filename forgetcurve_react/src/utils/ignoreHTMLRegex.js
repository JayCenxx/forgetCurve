export function ignoreHTMLRegex(str) {
    // Remove HTML tags from the string
 
    const strippedString = str.replace(/<[^>]+>/g, '');

    // Trim whitespace from the beginning and end of  string
    const trimmedContent = strippedString.trim();

    // Return the trimmed html string
    return trimmedContent;
  }
 