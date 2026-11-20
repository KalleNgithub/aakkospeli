# Spec Delta

## MODIFIED Requirements

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
