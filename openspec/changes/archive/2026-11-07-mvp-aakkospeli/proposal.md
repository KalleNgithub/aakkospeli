# Proposal

## Why

Lapset oppivat kirjaimia parhaiten välittömän palautteen kautta. Tarvitsemme yksinkertaisen, häiriöttömän sovelluksen, jossa lapsi voi vapaasti painella näppäimiä ja nähdä mitä kirjainta kukin näppäin vastaa — ilman riskiä vahingossa avata muita ikkunoita tai sulkea peli.

## What Changes

- Luodaan uusi selainpohjainen sovellus (Svelte + Vite) tyhjästä
- Sovellus käynnistyy koko ruudun tilassa ja pysyy siinä niin pitkälle kuin selain sallii
- Jokainen näppäinpainallus näyttää vastaavan merkin koko näytöllä isolla fontilla
- Suomalaisen näppäinasettelun erikoismerkit (ä, ö, å jne.) tuetaan suoraan käyttöjärjestelmän kautta
- Staattinen build, joka ajetaan lokaalisti; ei palvelinvaatimuksia

## Capabilities

### New Capabilities

- `fullscreen-kiosk`: Sovellus pyytää fullscreen-tilan käynnistyessä ja palaa siihen automaattisesti jos käyttäjä poistuu (esim. Esc-näppäimellä)
- `keypress-display`: Näppäinpainallus näyttää vastaavan merkin ruudulla; tukee koko suomalaisen näppäinasettelun merkistön mukaan lukien ä, ö, å ja erikoismerkit

### Modified Capabilities

*(ei olemassa olevia speksejä — greenfield-projekti)*

## Impact

- Uudet riippuvuudet: Svelte, Vite (dev-only build tooling)
- Ei backend-riippuvuuksia
- Toimii Windows 10/11, macOS, Ubuntu moderneilla selaimilla (Chrome, Firefox, Edge, Safari)
- Tulevaisuudessa: Web Speech API (`fi-FI`) ääntämistukea varten — arkkitehtuuri ei saa sulkea tätä pois
