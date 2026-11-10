# Tasks

<!-- Oletus: näytetään vain käyttäjän tuottama muoto (Shift huomioiden), ei molempia kirjainmuotoja samanaikaisesti. -->

## 1. Projektin pystytys

- [x] 1.1 Alusta Svelte + Vite -projekti (`npm create vite@latest . -- --template svelte`) ja varmista, että `npm run dev` käynnistyy virheittä
- [x] 1.2 Siivoa Vite-templaten oletussisältö (poista `counter`, `assets/svelte.svg` jne.) ja varmista, että tyhjä app latautuu selaimessa
- [x] 1.3 Lisää `svelte-check` ja TypeScript-tuki jos halutaan tyyppiturvallisuus; muussa tapauksessa jätä plain JS ja varmista, että `npm run build` tuottaa `dist/`-hakemiston

## 2. Näppäinsyöttö ja merkin näyttäminen

- [x] 2.1 Implementoi globaali `keydown`-kuuntelija `App.svelte`-komponentissa ja varmista, että `KeyboardEvent.key` logautuu konsoliin jokaisella painalluksella
- [x] 2.2 Suodata pois ei-tulostettavat näppäimet (`key.length !== 1`) ja varmista, että F-näppäimet, Ctrl, Alt ja Shift eivät muuta tilaa
- [x] 2.3 Tallenna painettu merkki reaktiiviseen muuttujaan ja näytä se ruudulla; varmista manuaalisesti, että ä, ö, å ja niiden isot versiot näkyvät oikein suomalaisella näppäinasettelulla
- [x] 2.4 Tyylitä merkki: vähintään 50 % ruudun pienemmästä mittasuhteesta, keskitetty, riittävä kontrasti (tarkista WCAG AA -taso selaimessa); varmista kolmessa eri ikkunakoossa (pieni, normaali, maksimoitu)

## 3. Fullscreen-toiminta

- [x] 3.1 Kutsu `document.requestFullscreen()` ensimmäisen `keydown`- tai `click`-tapahtuman yhteydessä ja varmista, että selain siirtyy fullscreen-tilaan
- [x] 3.2 Kuuntele `fullscreenchange`-tapahtumaa; jos fullscreen päättyy, kutsu `requestFullscreen()` uudelleen välittömästi ja varmista, että Escin jälkeen sovellus palaa fullscreeniin automaattisesti
- [x] 3.3 Lisää fallback: jos uudelleenpyyntö epäonnistuu, näytä koko ikkunan peittävä kehote "Klikkaa palataksesi koko ruutuun" ja varmista, että klikatessa paluu onnistuu
- [x] 3.4 Varmista, että fullscreen-tila ei estä näppäinpainalluksien käsittelyä: paina kirjainta fullscreen-tilassa ja tarkista että merkki päivittyy

## 4. Cross-platform -verifiointi ja build

- [x] 4.1 Testaa sovellus Chromella (Windows tai Linux), Firefoxilla ja yhdellä muulla selaimella; varmista fullscreen ja näppäinsyöttö toimivat kaikissa
- [x] 4.2 Aja `npm run build` ja avaa `dist/index.html` suoraan selaimessa (`file://`-protokollalla); varmista, että sovellus toimii ilman dev-serveriä
- [x] 4.3 Tarkista bundlen koko (`dist/assets/*.js` gzip-koossa) ja varmista, että se on alle 50 KB

## Workflow follow-up

- Kun toteutus on valmis, aja `/opsx:archive` arkistoidaksesi muutos.
