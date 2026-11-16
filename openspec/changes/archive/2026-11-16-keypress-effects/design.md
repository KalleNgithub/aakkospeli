# Design

## Context

Sovelluksessa on yksi komponentti (`App.svelte`) joka hallinnoi kaiken tilan. Nykyinen toteutus tallentaa `currentChar`-muuttujaan viimeisimmän painetun merkin ja näyttää sen staattisesti. Tähän muutokseen lisätään häivytyslogiikka kirjaimelle sekä kokonaan uusi emoji-järjestelmä erillisessä datamoodulissa.

## Goals / Non-Goals

**Goals:**
- Kirjaimen häipyminen CSS-animaatioilla — ei JS-pohjaista opacity-interpolaatiota
- Emojit itsenäisinä olioina omalla elinajallaan; useita voi olla ruudulla samanaikaisesti
- Emoji-mapping erillisessä `src/emojiMap.js`-tiedostossa — helppo täydentää myöhemmin
- Ei uusia ulkoisia riippuvuuksia

**Non-Goals:**
- Usean emojin näyttäminen per painallus
- Emojin animointi liikkeessä (pelkkä fade riittää)
- Häipymisaikojen tallentaminen tai konfigurointi käyttöliittymästä

## Decisions

### 1. Kirjaimen häipyminen: CSS-animaatio + avaintunnus

Kun uusi painallus tulee, `currentChar` vaihtuu välittömästi ja CSS-animaatio käynnistetään alusta. Tämä hoidetaan antamalla elementille uusi avaintunnus (`key`-attribuutti Sveltessä) joka pakottaa DOM-elementin uudelleenluomisen ja nollaa animaation. Svelte `{#key currentChar}` -rakenne sopii tähän suoraan.

CSS `@keyframes` määrittelee: ilmesty välittömästi täydellä opasiteetilla → pysy näkyvänä n. 2–3 s → häivy 1 s:ssa.

Vaihtoehto hylätty: `setTimeout` + `opacity`-muuttuja JS:ssä — monimutkaisempi, ei käytä selaimen CSS-optimointeja.

### 2. Emojit: reaktiivinen taulukko itsenäisillä elinajoilla

```
emojis = [
  { id, char, x, y, createdAt },
  ...
]
```

Jokainen emoji on taulukossa omana olionaan. CSS-animaatio (`animation-duration` asetetaan per-elementti inline-tyylillä satunnaisarvolla) huolehtii häipymisestä. Kun animaatio päättyy (`animationend`-tapahtuma), emoji poistetaan taulukosta.

Emojin sijainti (`x`, `y`) arvotaan niin, että emoji pysyy ruudun sisällä ja välttää kirjaimen keskeisen alueen (karkeasti `30%–70%` molemmilla akseleilla on kirjaimen varausala, emojit asetetaan reunavyöhykkeelle).

Vaihtoehto hylätty: erillinen Svelte-komponentti emojeille — tarpeetonta abstraktiota MVP:lle.

### 3. Emoji-mapping: `src/emojiMap.js`

```js
export const emojiMap = {
  'a': ['🐒', '🦌', '🍊'],  // apina, aavis(?) — oikeasti: apina, aasi, appelsiini
  'b': ['🍌'],
  // ...
  '1': ['1️⃣', '🕐'],
  // ...
};
```

Avaimet ovat pieniä kirjaimia ja numeroita. Haku tehdään `key.toLowerCase()`. Jos merkkiä ei löydy, emojia ei näytetä. Isoille ja pienille kirjaimille sama lista.

### 4. Sijainnin arvonta reunavyöhykkeelle

Ruutu jaetaan neljään reunavyöhykkeeseen (ylä, ala, vasen, oikea), joista arvotaan yksi. Tämä estää emojin päätymisen kirjaimen päälle ja varmistaa tasaisen jakauman ruudun reunoille. Tarkat marginaalit: `10%–30%` reunasta riippuen akselin suunnasta.

## Risks / Trade-offs

- **Useita emojeita ruudulla samanaikaisesti** → pitkä painallusputki täyttää ruudun emojeja; ei ongelma normaalikäytössä mutta teoriassa mahdollinen; ei tarvita rajoitusta MVP:ssä
- **`animationend` ei aina palaudu** (esim. elementti poistetaan ennen animaation loppua) → mitigaatio: varmuuspoisto `setTimeout`:lla emojin max-elinajan verran
