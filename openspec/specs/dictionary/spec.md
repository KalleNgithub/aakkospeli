# dictionary Specification

## Purpose

Maintains a static list of Finnish words, each optionally paired with an emoji, and selects the appropriate word to display when a key is pressed based on the emoji shown on screen.

## Requirements

### Requirement: Sanakirja sisältää staattiset sanat
Sovelluksella SHALL olla staattinen sanakirja, joka kuvaa kirjaimet sanalistoihin. Jokaisella sanalla voi olla valinnainen emoji. Sanakirjan alkutila sisältää vain sanan "ufo" kirjaimelle u, emoji 🛸. Petra SHALL kuulua P-sanojen sanakirjamerkintään hint-emojilla 👧 ja Senni SHALL kuulua S-sanojen sanakirjamerkintään hint-emojilla 👧.

#### Scenario: Sana ilman emojia
- **WHEN** sanakirjassa on kirjaimelle sana ilman emojia
- **THEN** sana on käytettävissä valinnassa kaikille kyseisen kirjaimen painalluksille

#### Scenario: Sana emojilla
- **WHEN** sanakirjassa on kirjaimelle sana jolla on emoji
- **THEN** sana on valittavissa vain kun kyseinen emoji on näytöllä

#### Scenario: Petra Easter egg
- **WHEN** P-sana Petra valitaan sanakirjasta
- **THEN** sanan hint-emoji on 👧

#### Scenario: Senni Easter egg
- **WHEN** S-sana Senni valitaan sanakirjasta
- **THEN** sanan hint-emoji on 👧

### Requirement: Sanakirjan emojit vastaavat emojikarttaa
Jokaisen sanakirjasanan emojin SHALL löytyä kyseisen sanan ensimmäisen kirjaimen emojilistasta emojiMap-moduulissa. Tämä tarkistetaan käännösaikana: ristiriita estää buildin.

#### Scenario: Yhteensopiva emoji
- **WHEN** sanakirjasanalla on emoji joka löytyy emojiMapista saman kirjaimen kohdalta
- **THEN** build onnistuu

#### Scenario: Yhteensopimaton emoji
- **WHEN** sanakirjasanalla on emoji joka ei löydy emojiMapista saman kirjaimen kohdalta
- **THEN** build epäonnistuu selkeällä virheilmoituksella

### Requirement: Sanan valinta painalluksella
Kun näppäintä painetaan ja emoji on valittu kyseiselle merkille, sovelluksen SHALL valita sana seuraavalla logiikalla: jos kirjaimelle ei ole sanoja, ei valita sanaa. Jos emojisanaa ei löydy sanakirjasta, valitaan satunnainen sanattomuuden-sana. Jos emojisana löytyy, valitaan painotettuna satunnaistuksena, jossa paino sanattomuuden-sanalle on sanattomuuden-sanojen lukumäärä ja emojisanoille emojisanojen lukumäärä.

#### Scenario: Ei sanoja kirjaimelle
- **WHEN** painettu kirjain ei esiinny sanakirjan avaimena
- **THEN** sanaa ei valita eikä sanavihjettä näytetä

#### Scenario: Vain sanattomuuden-sanoja, emoji ei täsmää
- **WHEN** kirjaimelle on vain sanattomuuden-sanoja eikä näytetty emoji täsmää mihinkään emojisanaan
- **THEN** valitaan satunnainen sanattomuuden-sana

#### Scenario: Emojisana löytyy, painotettu valinta
- **WHEN** kirjaimelle on sekä sanattomuuden-sanoja että emojisanoja ja näytetty emoji täsmää emojisanaan
- **THEN** valitaan painotetusti: sanattomuuden-sanojen lukumäärä vs. emojisanojen lukumäärä; emojisanan voittaessa valitaan täsmäävä emojisana

#### Scenario: Ei sanattomuuden-sanoja, emoji täsmää
- **WHEN** kirjaimelle on vain emojisanoja ja näytetty emoji täsmää
- **THEN** valitaan täsmäävä emojisana

#### Scenario: Ei sanattomuuden-sanoja, emoji ei täsmää
- **WHEN** kirjaimelle on vain emojisanoja mutta näytetty emoji ei täsmää mihinkään
- **THEN** sanaa ei valita
