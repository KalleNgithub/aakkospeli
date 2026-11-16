# word-reward Specification

## Purpose

Näyttää lyhyen palkitsevan animaation kun käyttäjä kirjoittaa sanakirjasanan kokonaan oikein.

## Requirements

### Requirement: Konfettianimaatio sanan valmistuttua
Kun sanakirjasana kirjoitetaan kokonaan, sovelluksen SHALL näyttää lyhyen konfettianimaation. Animaatio koostuu useasta emojista jotka ilmestyvät ruudulle samanaikaisesti ja häipyvät muutaman sekunnin kuluessa.

#### Scenario: Sana valmis
- **WHEN** käyttäjä painaa sanan viimeisen kirjaimen oikein
- **THEN** ruudulle ilmestyy useita konfettiemojeita samanaikaisesti ja ne häipyvät muutaman sekunnin kuluessa

#### Scenario: Konfetti ei häiritse seuraavaa painallusta
- **WHEN** käyttäjä painaa näppäintä konfettianimaation aikana
- **THEN** uusi painallus käsitellään normaalisti eikä konfetti estä vuorovaikutusta
