# Spec Delta

## Purpose

Näyttää ruudun yläreunassa pienen kirjaimen ja sanakirjasta valitun sanan, kun käyttäjä kirjoittaa — jo painetut kirjaimet selkeinä ja loput himmennettyinä.

## ADDED Requirements

### Requirement: Yläpalkki näyttää valitun sanan
Kun painallus tuottaa sanakirjasta valitun sanan, sovelluksen SHALL näyttää sana ruudun yläreunassa pienellä fontilla. Painetut kirjaimet näytetään selkeinä ja loput himmennettyinä. Jos sanalla on emoji, se näytetään sanan vasemmalla puolella.

#### Scenario: Ensimmäinen kirjain täsmää
- **WHEN** käyttäjä painaa kirjainta jolle sanakirja palauttaa sanan
- **THEN** yläpalkissa näkyy sanan emoji (jos on), ensimmäinen kirjain selkeänä ja loput kirjaimet himmennettyinä

#### Scenario: Sana ilman emojia
- **WHEN** valitulla sanalla ei ole emojia
- **THEN** yläpalkissa näkyy vain kirjaimet ilman emojia

#### Scenario: Ei sanaa kirjaimelle
- **WHEN** painettu kirjain ei tuota sanaa sanakirjasta
- **THEN** yläpalkissa ei näy mitään

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
