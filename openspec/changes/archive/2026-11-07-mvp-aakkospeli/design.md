# Design

## Context

Greenfield-projekti — ei olemassa olevaa koodipohjaa. Sovellus on tarkoitettu yhdelle lapselle, jota vanhempi käyttää lokaalilla koneella; ei autentikaatiota, ei backendiä, ei verkkovaatimuksia. Tulevaisuudessa sovellukseen tulee Web Speech API -pohjainen ääntämistuki (fi-FI), mikä vaikuttaa teknologiavalintaan jo nyt.

## Goals / Non-Goals

**Goals:**
- Minimaalinen bundle-koko (tavoite <50 KB gzip)
- Välitön responssi näppäinpainallukseen (<16 ms frame)
- Toimii Chrome, Firefox, Edge, Safari moderneilla versioilla (Windows 10/11, macOS, Ubuntu)
- Arkkitehtuuri tukee myöhempää Web Speech API -integrointia ilman rakenteellisia muutoksia

**Non-Goals:**
- Mobiilituki (MVP on PC-näppäimistö)
- Palvelinpuoli tai käyttäjätunnistus
- Usean näppäinasettelun tuki samanaikaisesti
- Offline-first PWA-ominaisuudet

## Decisions

### 1. Svelte + Vite vanilla-JS:n sijaan

Svelte tuottaa pienen runtime-footprintin (~15 KB min+gzip) mutta tarjoaa reaktiivisen tilan hallinnan, joka kasvaa siististi kun äänituki lisätään. Pure vanilla JS toimisi MVP:lle, mutta äänentoistologiikka (TTS-tila, audiofilen lataus, jonottaminen) muuttuu nopeasti hankalaksi ilman komponenttikehystä. React tai Vue olisivat ylimitoitettuja (50–100 KB runtime).

Vaihtoehto hylätty: Electron — koko (~100 MB) on liian suuri ja lisää asennusvaatimuksia ilman MVP-hyötyä.

### 2. KeyboardEvent.key merkin tunnistamiseen

`KeyboardEvent.key` palauttaa käyttöjärjestelmän näppäinasettelun mukaisen merkin suoraan — ei tarvita manuaalista keycode-mappingia. Suomalaiset erikoismerkit (ä, ö, å) toimivat oikein kun käyttäjällä on FI-asettelu aktiivisena. Ei-tulostettavat näppäimet (F-näppäimet, Ctrl jne.) tuottavat monimerkkisiä arvoja kuten `"F1"` tai `"Control"`, jotka suodatetaan pois tarkistamalla `key.length === 1`.

### 3. Fullscreen API + välitön uudelleenpyyntö Escin jälkeen

`document.requestFullscreen()` kutsutaan ensimmäisen käyttäjätapahtuman yhteydessä (selainrajoitus). `fullscreenchange`-tapahtumaa kuunnellaan: jos fullscreen päättyy eikä sovellus itse pyytänyt poistumista, uusi `requestFullscreen()`-kutsu tehdään välittömästi. Jos pyyntö epäonnistuu (fokus puuttuu), näytetään koko ruudun peittävä takaisin-kehote.

Vaihtoehto hylätty: `pointer-lock` tai muut selainrajoitusten kiertämiset — eivät toimi tai vaativat erikoisoikeuksia.

### 4. Staattinen build, ei palvelinta

`vite build` tuottaa `dist/`-hakemiston, jota voidaan avata suoraan selaimella (`file://`) tai tarjoilla myöhemmin staattisena sivuna (GitHub Pages, Netlify tms.). Ei Node-palvelinta tarvita.

## Risks / Trade-offs

- **Esc-näppäin vie ulos fullscreenista** → Mitigaatio: välitön uudelleenpyyntö ja visuaalinen kehote pitävät viiveen alle sekunnin; täyttä estoa ei ole mahdollista toteuttaa selaimessa
- **Suomalainen näppäinasettelu riippuu käyttöjärjestelmästä** → Mitigaatio: `KeyboardEvent.key` toimii oikein kun OS-asettelu on FI; sovellus ei yritä korjata väärää asettelua
- **Web Speech API fi-FI -äänen saatavuus vaihtelee** → Ei MVP-ongelma; huomioitava kun äänituki lisätään (fallback: audiofilet)

## Open Questions

- Halutaanko näytettävässä merkissä sekä iso että pieni kirjain samanaikaisesti, vai ainoastaan se muoto jonka käyttäjä tuotti (Shift huomioiden)?
