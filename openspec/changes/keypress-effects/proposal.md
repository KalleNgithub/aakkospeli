# Proposal

## Why

Pelkkä staattinen kirjain ruudulla on toimiva MVP, mutta lapsen kannalta peli on kiinnostavampi kun painalluksesta syntyy elävä reaktio. Häivytysefekti tekee näytöstä dynaamisemman ja emojit antavat lapselle hauskoja visuaalisia vihjeitä merkin merkityksestä — A näyttää apinan, B näyttää banaanin. Tämä parantaa oppimismotivaatiota ilman, että sovelluksen yksinkertaisuus kärsii.

## What Changes

- Ruudulla näkyvä kirjain häipyy muutamassa sekunnissa; uusi painallus vaihtaa kirjaimen välittömästi uuteen
- Jokaisen näppäinpainalluksen yhteydessä näytölle ilmestyy yksi emoji satunnaiseen paikkaan kirjaimen ympärille
- Emoji valitaan merkille ennalta määrätystä listasta tasaisella satunnaisotannalla
- Kirjainmerkeillä emojin nimi tai esittämä asia alkaa kyseisellä kirjaimella (suomeksi)
- Numeromerkeillä emoji on numeroa esittävä emoji tai vastaava kellonaika-emoji
- Emojit häipyvät omalla aikataulullaan (voi poiketa kirjaimen ajasta ja olla hieman satunnainen)
- Kun uusi näppäin painetaan aiempien emojien vielä näkyessä, edelliset emojit saavat jäädä häipymään omaan tahtiinsa

## Capabilities

### New Capabilities

- `keypress-emoji`: Merkille spesifinen emoji-lista, satunnainen valinta ja sijoitus, itsenäinen häivytysanimaatio

### Modified Capabilities

- `keypress-display`: Kirjain häipyy muutamassa sekunnissa painalluksen jälkeen; uusi painallus vaihtaa kirjaimen välittömästi

## Impact

- Muutos koskee `src/App.svelte` — lisätään tilanhallintalogiikat häivytystä ja emoji-kokoelmaa varten
- Uusi moduuli tai tiedosto emoji-mappingille (`src/emojiMap.js`)
- Ei uusia ulkoisia riippuvuuksia; CSS-animaatiot hoitavat häivytyksen
- Ei vaikutusta fullscreen-logiikkaan
