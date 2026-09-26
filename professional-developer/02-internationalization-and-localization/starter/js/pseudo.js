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

// TODO 11: write pseudoLocalize(text). It should:
//   1. Replace each vowel in `text` with its accented look-alike from
//      ACCENTS above (leave everything else the same).
//   2. Add about 30% more length by repeating the last few characters of
//      each word, or by appending a fixed padding word — anything that
//      grows the string without changing its meaning. Keep {placeholder}
//      tokens intact: do not accent or pad inside curly braces.
//   3. Wrap the whole result in brackets, e.g. `[⟦text⟧]`, so a pseudo
//      string is unmistakable at a glance and a leftover real string
//      (never wrapped) stands out just as clearly.
// A small, imperfect transform is enough: this is a QA tool, not a
// translation.
export function pseudoLocalize(text) {
  return text;
}
