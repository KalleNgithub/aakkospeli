# Tasks

## 1. Sanakirjamoduuli

- [x] 1.1 Luo `src/dictionary.js` jossa staattinen sanakirja `{ 'u': [{ word: 'ufo', emoji: '🛸' }] }`, käännösaikainen validointisilmukka (heittää virheen jos emojia ei löydy emojiMapista kyseisen kirjaimen kohdalta) ja `selectWord(char, displayedEmoji)` funktio joka toteuttaa painotetun valinnan; varmista että `npm run build` onnistuu ja että virheellinen emoji sanakirjassa estää buildin
- [x] 1.2 Varmista `selectWord`-logiikka: `selectWord('u', '🛸')` palauttaa UFO-entryn, `selectWord('u', '🎈')` palauttaa null (ei plain-sanoja, emoji ei täsmää), `selectWord('a', '🛸')` palauttaa null (ei sanoja kirjaimelle a); tarkista konsolilogeilla tai devtoolsilla

## 2. spawnEmoji-refaktorointi

- [x] 2.1 Muokkaa `spawnEmoji` `App.svelte`:ssä palauttamaan valittu emoji-merkkijono (tai null jos merkillä ei ole emojeja); varmista että paluuarvo on käytettävissä `handleKeydown`:ssa lokittamalla se väliaikaisesti konsoliin

## 3. Seuranta-tila ja tilasiirtymät

- [x] 3.1 Lisää `wordState`-reaktiivinen muuttuja `App.svelte`:hen ja kutsu `selectWord` `handleKeydown`:ssa `spawnEmoji`:n jälkeen; varmista että U-painallus asettaa `wordState = { word: 'ufo', emoji: '🛸', matched: 1 }`
- [x] 3.2 Toteuta etenemislogiikka: jos `wordState` on aktiivinen ja painettu kirjain vastaa sanan seuraavaa kirjainta (kirjainkoosta riippumatta), kasvata `matched`; jos koko sana on valmis, nollaa `wordState`; muuten nollaa `wordState` ja tee uusi sananhaku painetulle kirjaimelle; varmista sekvenssi U→F→O valmistaa sanan ja U→A nollaa UFOn ja hakee sanan A:lle

## 4. Yläpalkin käyttöliittymä

- [x] 4.1 Lisää `App.svelte`:hen yläpalkin `<div>` joka renderöityy kun `wordState !== null`: näyttää sanan emojin vasemmalla (jos on), sanan kirjaimet isolla kirjoitettuna siten että jo painetuilla (`< matched`) on `opacity: 1` ja lopuilla `opacity: 0.3`; varmista visuaalisesti että U-painallus näyttää "🛸 U fo" oikealla tyylillä
- [x] 4.2 Lisää CSS yläpalkille: `position: fixed`, ylhäällä keskellä, fonttikoko ~2rem, ei päällekkäisyyttä pääkirjaimen kanssa; varmista visuaalisesti että palkki ilmestyy oikeaan paikkaan ja tyhjenee sanan valmistuttua

## 5. Konfettipalkkio

- [x] 5.1 Lisää `spawnConfetti()`-funktio `App.svelte`:hen: lisää 12 emojia `emojis`-taulukkoon kerralla konfettilistalta (`🎉`, `🎊`, `✨`, `⭐`, `🌟`, `🎈`), sijoittuen satunnaisesti koko ruudulle (ei reunavyöhykkeisiin rajoitettuna); kutsu `spawnConfetti()` kun sana valmistuu; varmista visuaalisesti että konfetti leijahtaa kun UFO kirjoitetaan kokonaan

## 6. Integraatiovarmistus

- [x] 6.1 Manuaalinen testi — paina U: varmista että 🛸 ilmestyy ruudulle ja yläpalkissa näkyy "🛸 Ufo" U selkeänä ja "fo" himmennettyinä; paina F: varmista "🛸 UFo" UF selkeänä; paina O: varmista konfetti ja yläpalkki tyhjenee
- [x] 6.2 Manuaalinen testi — paina U sitten jokin muu kirjain (esim. A): varmista että UFO-sananhint häviää ja yläpalkki näyttää A:n sanan tai tyhjenee kokonaan jos A:lle ei ole sanaa
- [x] 6.3 Aja `npm run build` ja varmista että bundle pysyy alle 50 KB gzip

## Workflow follow-up

- Kun toteutus ja UFO-testaus on valmis, laajennetaan sanakirja käyttäjän spesifikaation mukaan.
- Laajennuksen jälkeen aja `/opsx:archive`.
