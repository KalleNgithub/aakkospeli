export const letterPronunciations = {
  a: { fi: 'aa' },
  b: { fi: 'bee' },
  c: { fi: 'see' },
  d: { fi: 'dee' },
  e: { fi: 'ee' },
  f: { fi: 'äf' },
  g: { fi: 'gee' },
  h: { fi: 'hoo' },
  i: { fi: 'ii' },
  j: { fi: 'joo' },
  k: { fi: 'koo' },
  l: { fi: 'äl' },
  m: { fi: 'äm' },
  n: { fi: 'än' },
  o: { fi: 'oo' },
  p: { fi: 'pee' },
  q: { fi: 'kuu' },
  r: { fi: 'är' },
  s: { fi: 'äs' },
  t: { fi: 'tee' },
  u: { fi: 'uu' },
  v: { fi: 'vee' },
  w: { fi: 'kaksoisvee' },
  x: { fi: 'äks' },
  y: { fi: 'yy' },
  z: { fi: 'tseta' },
  å: { fi: 'å' },
  ä: { fi: 'ää' },
  ö: { fi: 'öö' }
};

let speechStatus = 'unknown';
let activeUtterance = null;

export function getSpeechStatus() {
  return speechStatus;
}

export function resetSpeechStatus() {
  speechStatus = 'unknown';
  activeUtterance = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function resolveLetterSpeech(character, language = 'fi') {
  const lower = character.toLowerCase();
  return letterPronunciations[lower]?.[language] ?? character;
}

export function speakLetter(character) {
  if (speechStatus === 'broken') return;
  if (typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      typeof window.SpeechSynthesisUtterance !== 'function') {
    speechStatus = 'broken';
    return;
  }

  activeUtterance = null;
  window.speechSynthesis.cancel();

  const utterance = new window.SpeechSynthesisUtterance(resolveLetterSpeech(character, 'fi'));
  utterance.lang = 'fi-FI';
  utterance.onstart = () => {
    if (activeUtterance === utterance) speechStatus = 'working';
  };
  utterance.onerror = () => {
    if (activeUtterance === utterance) speechStatus = 'broken';
  };
  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
