# word-reward Specification

## Purpose

Näyttää lyhyen palkitsevan animaation kun käyttäjä kirjoittaa sanakirjasanan kokonaan oikein.

## Requirements

### Requirement: Konfettianimaatio sanan valmistuttua
Kun sanakirjasana kirjoitetaan kokonaan, sovelluksen SHALL näyttää lyhyen konfettianimaation ja lausua sanan, kun valmis sana ilmestyy ruudulle. Animaatio koostuu useasta emojista jotka ilmestyvät ruudulle samanaikaisesti ja häipyvät muutaman sekunnin kuluessa.

#### Scenario: Sana valmis
- **WHEN** käyttäjä painaa sanan viimeisen kirjaimen oikein
- **THEN** ruudulle ilmestyy useita konfettiemojeita samanaikaisesti, viimeinen kirjain lausutaan, valmis sana näytetään ja sana lausutaan 600 ms jälkeen

#### Scenario: Konfetti ei häiritse seuraavaa painallusta
- **WHEN** käyttäjä painaa näppäintä konfettianimaation aikana
- **THEN** uusi painallus käsitellään normaalisti eikä konfetti estä vuorovaikutusta

#### Scenario: Sana ei keskeydy nopeilla painalluksilla
- **WHEN** käyttäjä painaa näppäimiä sanan lausuttua 1500 ms pitkän valmistumisikkunan aikana
- **THEN** kirjainten puhe ei keskeytä sanan puhetta
