# Tasks

## 1. Emoji-mapping

- [x] 1.1 Luo `src/emojiMap.js` joka exportaa `emojiMap`-objektin; sisällytä kaikki 26 latinalaista kirjainta (a–z), å, ä, ö sekä numerot 0–9; varmista, että jokaisella merkillä on vähintään yksi emoji ja että kirjainten emojit noudattavat suomenkielistä alkukirjain-periaatetta; varmista visuaalisesti, että emojit renderöityvät oikein selaimessa
- [x] 1.2 Lisää haku-apufunktio `getEmojis(char)` joka palauttaa merkin emojilistan (tai tyhjän taulukon jos merkkiä ei löydy) ja `pickEmoji(char)` joka valitsee satunnaisesti yhden emojin listasta; varmista yksikkötesteillä tai konsolilogeilla, että satunnaistus on tasainen ja että tuntematon merkki palauttaa `null`

## 2. Kirjaimen häipymisanimaatio

- [x] 2.1 Lisää `App.svelte`:hen `{#key currentChar}`-rakenne kirjaimen ympärille ja määrittele CSS `@keyframes`-animaatio joka pitää kirjaimen täysin näkyvänä ~2–3 s ja häivyttää sen ~1 s:ssa; varmista, että uusi painallus käynnistää animaation alusta (vanha kirjain vaihtuu välittömästi)
- [x] 2.2 Varmista, että toimintonäppäimet (F-näppäimet, Ctrl, Alt, Shift) eivät nollaa animaatiota eivätkä muuta näkyvää kirjainta

## 3. Emojien näyttäminen ja sijoittaminen

- [x] 3.1 Lisää `App.svelte`:hen `emojis`-taulukko (reaktiivinen); jokaisella painalluksella joka tuottaa tulostettavan merkin, lisää taulukkoon uusi emoji-olio `{ id, emoji, x, y, duration }` jossa `x` ja `y` ovat prosentuaaliset sijainnit reunavyöhykkeellä ja `duration` on satunnainen arvo väliltä 2.5–4 s
- [x] 3.2 Implementoi reunavyöhyke-arvonta: jaa ruutu neljään alueeseen (ylä/ala/vasen/oikea), valitse satunnaisesti yksi alue, arvo sijainti alueen sisältä siten, että emoji ei mene ruudun reunan yli (huomioi emojin likimääräinen koko ~3rem); varmista visuaalisesti, että emojit eivät katoa ruudun reunojen taakse

## 4. Emojien häipyminen ja siivous

- [x] 4.1 Renderöi `emojis`-taulukko `{#each}`-rakenteella; aseta jokaiselle emoji-elementille `position: fixed`, sijainti `x`/`y`, sekä CSS-animaatio jonka kesto on `duration`; varmista, että useita emojeita voi olla ruudulla samanaikaisesti
- [x] 4.2 Kuuntele `animationend`-tapahtumaa per emoji-elementti ja poista emoji taulukosta animaation päättyessä; lisää varmuuspoisto `setTimeout`:lla (`duration + 500 ms`) estämään muistivuotoa jos `animationend` ei palaudu; varmista, että taulukko ei kasva loputtomasti pitkällä käytöllä

## 5. Integraatio ja verifiointi

- [x] 5.1 Testaa koko flow manuaalisesti: paina nopeasti useita näppäimiä peräkkäin ja varmista, että kirjain vaihtuu välittömästi, edelliset emojit viipyvät ja häipyvät omaan tahtiinsa, eikä konsolissa näy virheitä
- [x] 5.2 Aja `npm run build` ja varmista, että bundle pysyy alle 50 KB gzip; tarkista, että `dist/index.html` toimii `file://`-protokollalla

## Workflow follow-up

- Kun toteutus on valmis, aja `/opsx:archive`.
