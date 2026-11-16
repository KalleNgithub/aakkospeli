// Emoji-lista per merkki. Avaimet ovat pieniä kirjaimia/numeroita.
// Kirjainten emojit: nimi suomeksi alkaa kyseisellä kirjaimella.
// Harvinaisille kirjaimille (c, f, g, q, w, å) ei löydy suomalaisia sanoja —
// niille käytetään yhtä erikoisempaa emojia.
export const emojiMap = {
  'a': ['🐒', '🫏', '🍊', '🚗', '🦆', '🌞'],
  // apina, aasi, appelsiini, auto, ankka, aurinko

  'b': ['🍌'],
  // banaani

  'c': ['🥌'],
  // curling

  'd': ['🐬', '🦕'],
  // delfiini, dinosaurus

  'e': ['🐘', '👼', '🐌'],
  // elefantti, enkeli, etana

  'f': ['🦩'],
  // flamingo (lainasana)

  'g': ['🇬🇪', '🦍'],
  // Georgia, gorilla

  'h': ['🐴', '🦈', '🐭', '🦭'],
  // hevonen, hai, hiiri, hylje

  'i': ['🎈'],
  // ilmapallo

  'j': ['🐰', '🎄', '🧊', '🍦', '🦢'],
  // jänis, joulukuusi, jää, jäätelö, joutsen

  'k': ['🐟', '🎸', '🌙', '🌸', '🐶', '🐱', '🦒', '✉️', '🎃', '🏀'],
  // kala, kitara, kuu, kukka, koira, kissa, kirahvi, kirjekuori, kurpitsa, koripallo

  'l': ['🦁', '🐄', '✈️', '🚢', '🐑'],
  // leijona, lehmä, lentokone, laiva, lammas

  'm': ['🍓', '🌊', '🍆', '🐝', '🪱'],
  // mansikka, meri, munakoiso, mehiläinen, mato

  'n': ['🧸', '🎲', '🪆'],
  // nalle, noppa, nukke

  'o': ['🐿️', '🍎'],
  // orava, omena

  'p': ['🐷', '🍕', '⚽', '🌲', '🐧', '🦋', '⛵', '🦉'],
  // possu, pizza, pallo, puu, pingviini, perhonen, purjevene, pöllö

  'q': ['🇶🇦'],
  // Qatar

  'r': ['🤖', '🌹', '🚀', '🐀', '🍇'],
  // robotti, ruusu, raketti, rotta, rypäle

  's': ['🦔', '🐸', '🐺', '🦦', '🍋'],
  // siili, sammakko, susi, saukko, sitruuna

  't': ['⭐', '🐯', '🏠', '🚜', '🍅', '🌷'],
  // tähti, tiikeri, talo, traktori, tomaatti, tulppaani

  'u': ['🛸'],
  // ufo

  'v': ['🐳', '🍉', '🧛', '🧙', '🍇'],
  // valas, vesimeloni, vampyyri, velho, viinirypäle

  'w': ['🏴󠁧󠁢󠁷󠁬󠁳󠁿'],
  // Wales

  'x': ['❌'],
  // x-merkki

  'y': ['🦄', '🌿'],
  // yksisarvinen, yrtti

  'z': ['🧟', '🇿🇼', '🧘', '💤'],
  // zombi, Zimbabwe, zen, z-kirjain (nukkuminen)

  'å': ['🏴󠁦󠁩󠁡󠁸󠁿', '🏞️'],
  // Ahvenanmaa, luontomaisema; ei suomalaisia å-sanoja

  'ä': ['🪣', '🦀'],
  // ämpäri, äyriäinen

  'ö': ['🛢️'],
  // öljy

  // Numerot: numero-emoji + vastaava kellonaika
  '0': ['0️⃣', '🕛'],
  '1': ['1️⃣', '🕐'],
  '2': ['2️⃣', '🕑'],
  '3': ['3️⃣', '🕒'],
  '4': ['4️⃣', '🕓'],
  '5': ['5️⃣', '🕔'],
  '6': ['6️⃣', '🕕'],
  '7': ['7️⃣', '🕖'],
  '8': ['8️⃣', '🕗'],
  '9': ['9️⃣', '🕘'],
};

export function getEmojis(char) {
  return emojiMap[char.toLowerCase()] ?? [];
}

export function pickEmoji(char) {
  const list = getEmojis(char);
  if (list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}
