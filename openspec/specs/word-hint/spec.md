# word-hint Specification

## Purpose

Näyttää ruudun yläreunassa pienen kirjaimen ja sanakirjasta valitun sanan, kun käyttäjä kirjoittaa — jo painetut kirjaimet selkeinä ja loput himmennettyinä.

## Requirements

### Requirement: Yläpalkki näyttää valitun sanan
Kun painallus tuottaa sanakirjasta valitun sanan, sovelluksen SHALL näyttää sana ruudun yläreunassa suurella fontilla. Painetut kirjaimet näytetään selkeinä ja loput himmennettyinä. Jos sanalla on emoji, se näytetään sanan vasemmalla puolella.

#### Scenario: Ensimmäinen kirjain täsmää
- **WHEN** käyttäjä painaa kirjainta jolle sanakirja palauttaa sanan
- **THEN** yläpalkissa näkyy sanan emoji (jos on), ensimmäinen kirjain selkeänä ja loput kirjaimet himmennettyinä

#### Scenario: Sana ilman emojia
- **WHEN** valitulla sanalla ei ole emojia
- **THEN** yläpalkissa näkyy vain kirjaimet ilman emojia

#### Scenario: Ei sanaa kirjaimelle
- **WHEN** painettu kirjain ei tuota sanaa sanakirjasta
- **THEN** yläpalkissa ei näy mitään

### Requirement: Click ripple feedback
The system SHALL show a temporary ripple centered at the pointer position whenever the screen is clicked.

#### Scenario: General screen click
- **WHEN** a player clicks anywhere on the screen
- **THEN** a ripple appears at that pointer position and fades out automatically

### Requirement: Temporary letter clarification
The system SHALL temporarily highlight a requested letter without changing word typing progress.

#### Scenario: General click highlights next letter
- **WHEN** a player clicks the screen outside a top-word letter
- **THEN** the next unmatched letter in the top word is temporarily highlighted

#### Scenario: Letter click highlights clicked letter
- **WHEN** a player clicks a specific letter in the top word
- **THEN** only that clicked letter is temporarily highlighted instead of the next unmatched letter

#### Scenario: Click does not count as typing
- **WHEN** a player clicks a top-word letter or anywhere on the screen
- **THEN** the matched-letter count and word completion state remain unchanged

### Requirement: Yläpalkki pysyy kunnes uusi näppäin painetaan
Yläpalkin sisältö SHALL pysyä muuttumattomana kunnes seuraava näppäin painetaan. Yläpalkki ei häivy itsestään.

#### Scenario: Ei lisäpainalluksia
- **WHEN** sana on näkyvissä yläpalkissa eikä uusia näppäimiä paineta
- **THEN** yläpalkki pysyy näkyvissä toistaiseksi

### Requirement: Kirjainten eteneminen sanassa
Kun käyttäjä painaa seuraavaa oikeaa kirjainta, se SHALL muuttua selkeäksi ja loput jäävät himmennetyiksi. Väärä kirjain aloittaa uuden sanan haun kyseiselle kirjaimelle.

#### Scenario: Oikea seuraava kirjain
- **WHEN** käyttäjä painaa kirjainta joka vastaa sanan seuraavaa kirjainta (kirjainkoosta riippumatta)
- **THEN** kyseinen kirjain muuttuu selkeäksi yläpalkissa; loput pysyvät himmennettyinä

#### Scenario: Väärä kirjain
- **WHEN** käyttäjä painaa kirjainta joka ei vastaa sanan seuraavaa kirjainta
- **THEN** nykyinen sana hylätään ja uusi sananhaku käynnistyy painetulle kirjaimelle

#### Scenario: Kirjainkoosta riippumattomuus
- **WHEN** käyttäjä painaa oikeaa kirjainta isolla tai pienellä
- **THEN** kirjain lasketaan oikeaksi

### Requirement: Yläpalkki tyhjenee sanan valmistuttua
Kun kaikki sanan kirjaimet on painettu oikein, yläpalkki SHALL tyhjentyä.

#### Scenario: Sana valmis
- **WHEN** käyttäjä painaa sanan viimeisen kirjaimen
- **THEN** yläpalkki tyhjenee
