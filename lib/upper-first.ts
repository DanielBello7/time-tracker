export default function upperFirst(text: string): string {
  const sliced = text.split(" ");
  if (sliced.length > 1) {
    const firstWord = sliced[0];
    const firstLetter = firstWord[0].toUpperCase();
    const correctedFirstWord = `${firstLetter}${firstWord.slice(1, firstWord.length)}`;
    sliced[0] = correctedFirstWord;
    return sliced.join(" ");
  } else {
    const word = text;
    const firstLetter = word[0].toUpperCase();
    const corrected = `${firstLetter}${word.slice(1, word.length)}`;
    return corrected;
  }
}

