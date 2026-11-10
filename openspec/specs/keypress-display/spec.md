# keypress-display Specification

## Purpose

Näyttää lapselle ruudulla suurella fontilla sen kirjaimen tai merkin, jota hän juuri painoi näppäimistöllä.

## Requirements

### Requirement: Näppäinpainallus näyttää vastaavan merkin
Sovelluksen SHALL näyttää painetun näppäimen tuottaman merkin koko ruudun peittävänä visuaalisena elementtinä heti painalluksen jälkeen.

#### Scenario: Kirjainpainallus
- **WHEN** käyttäjä painaa kirjainnäppäintä (esim. A, Ä, Ö, Å)
- **THEN** ruudulle ilmestyy kyseinen kirjain erittäin suurella fontilla

#### Scenario: Erikoismerkki
- **WHEN** käyttäjä painaa erikoismerkkiä tuottavaa näppäintä (esim. numerot, välimerkit)
- **THEN** ruudulle ilmestyy tuotettu merkki erittäin suurella fontilla

#### Scenario: Toimintonäppäin
- **WHEN** käyttäjä painaa näppäintä, joka ei tuota tulostettavaa merkkiä (esim. F1–F12, Ctrl, Alt, Shift)
- **THEN** ruudun sisältö ei muutu eikä virheitä näytetä

### Requirement: Suomalaisen näppäinasettelun merkit tuetaan
Sovelluksen SHALL näyttää oikea merkki kaikille suomalaisen näppäinasettelun (Finnish QWERTY) näppäimille, mukaan lukien ä, ö, å ja niiden isot kirjaimet Ä, Ö, Å.

#### Scenario: Suomalaiset erikoiskirjaimet
- **WHEN** käyttäjä painaa ä-, ö- tai å-näppäintä suomalaisella näppäinasettelulla
- **THEN** ruudulle ilmestyy oikea merkki (ä, ö tai å)

#### Scenario: Iso kirjain Shift-näppäimellä
- **WHEN** käyttäjä pitää Shift pohjassa ja painaa kirjainnäppäintä
- **THEN** ruudulle ilmestyy isolla kirjoitettu versio merkistä

### Requirement: Merkki on selkeästi luettavissa
Näytettävä merkki SHALL täyttää suuren osan ruudusta ja olla helposti lapsen luettavissa normaalilta katseluetäisyydeltä.

#### Scenario: Merkki näkyvissä
- **WHEN** jokin merkki on näytettynä
- **THEN** merkki on asemoitu ruudun keskelle ja täyttää vähintään 50 % ruudun pienemmästä mittasuhteesta

#### Scenario: Kontrasti
- **WHEN** jokin merkki on näytettynä
- **THEN** merkin ja taustan välinen kontrasti on riittävä selkeään erottuvuuteen (WCAG AA minimissään)
