const getMaxNextLine = (input, maxWords = 5) => {
  const words = input.trim().split(/\s+/); // Split input into words
  let lineWords = [];

  for (let i = 0; i < words.length; i++) {
    if (lineWords.length < maxWords) {
      lineWords.push(words[i]);
    } else {
      break;
    }
  }

  const line = lineWords.join(' ');
  const remainingWords = words.slice(lineWords.length).join(' ');

  return { line, remainingWords };
};


export const formatTitle = (title) => {
  let output = [];

  // Split the title into lines, each containing up to 5 words
  while (title.trim().length > 0) {
    const { line, remainingWords } = getMaxNextLine(title, 5);
    output.push(line);
    title = remainingWords.trim(); // Update title to remaining words
  }
  return output;
};