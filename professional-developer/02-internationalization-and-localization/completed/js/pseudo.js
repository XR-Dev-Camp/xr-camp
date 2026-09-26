// pseudo.js: pseudo-localization. A pseudo-locale is not a real language —
// it is a fake one used only to test the other two before a translator ever
// sees the app. It answers three questions no English-only reading can:
//   - Does the layout survive text that is 30-50% longer (most translations
//     expand from English)?
//   - Does every visible string actually go through t(), or did one get
//     left as plain English text in the HTML?
//   - Do accented and non-Latin characters render without clipping, breaking
//     the layout, or being cut off by a fixed-width box?
// See "Pseudo-localization" in the README.

const ACCENTS = {
  a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú',
  A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú',
};

// Splits `text` on {placeholder} tokens, so the transform below only ever
// touches the literal words a translator would touch, never a token that
// format() still needs to find and replace.
function splitOnPlaceholders(text) {
  return text.split(/(\{\w+\})/g);
}

function accent(word) {
  return word.replace(/[aeiouAEIOU]/g, (ch) => ACCENTS[ch] ?? ch);
}

// Roughly 30% longer: repeats the last syllable-sized chunk of each word
// that is long enough to have one. Short words and punctuation are left
// alone, so the padding reads as "stretched", not as noise.
function stretch(word) {
  if (word.length < 4 || /^\{/.test(word)) return word;
  return word + word.slice(-2);
}

export function pseudoLocalize(text) {
  const pieces = splitOnPlaceholders(text).map((piece) => {
    if (/^\{\w+\}$/.test(piece)) return piece; // leave placeholders untouched
    return piece
      .split(' ')
      .map((word) => stretch(accent(word)))
      .join(' ');
  });
  return `[⟦${pieces.join('')}⟧]`;
}
