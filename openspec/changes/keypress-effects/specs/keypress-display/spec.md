# Spec Delta

## MODIFIED Requirements

### Requirement: Näppäinpainallus näyttää vastaavan merkin
Sovelluksen SHALL näyttää painetun näppäimen tuottaman merkin koko ruudun peittävänä visuaalisena elementtinä heti painalluksen jälkeen. Merkki SHALL häipyä näkyvistä muutaman sekunnin kuluessa. Kun uusi näppäin painetaan edellisen merkin vielä näkyessä, edellinen merkki SHALL vaihtua uuteen välittömästi (ilman odottelua).

#### Scenario: Kirjainpainallus
- **WHEN** käyttäjä painaa kirjainnäppäintä (esim. A, Ä, Ö, Å)
- **THEN** ruudulle ilmestyy kyseinen kirjain erittäin suurella fontilla

#### Scenario: Erikoismerkki
- **WHEN** käyttäjä painaa erikoismerkkiä tuottavaa näppäintä (esim. numerot, välimerkit)
- **THEN** ruudulle ilmestyy tuotettu merkki erittäin suurella fontilla

#### Scenario: Toimintonäppäin
- **WHEN** käyttäjä painaa näppäintä, joka ei tuota tulostettavaa merkkiä (esim. F1–F12, Ctrl, Alt, Shift)
- **THEN** ruudun sisältö ei muutu eikä virheitä näytetä

#### Scenario: Merkki häipyy automaattisesti
- **WHEN** kirjain on ilmestynyt ruudulle eikä uusia näppäimiä paineta
- **THEN** kirjain häipyy näkyvistä muutaman sekunnin kuluessa

#### Scenario: Uusi painallus korvaa näkyvän merkin
- **WHEN** käyttäjä painaa uutta näppäintä edellisen merkin vielä näkyessä
- **THEN** edellinen merkki vaihtuu välittömästi uuteen ilman viivettä
