# Spec Delta

## ADDED Requirements

### Requirement: Näytetty emoji välitetään sananvalintaan
Kun painallukselle valitaan emoji näytettäväksi, sama emoji-instanssi SHALL välittyä sananvalintalogiikalle. Emoji-listalta ei tehdä kahta erillistä arvontaa — yksi arvonta palvelee sekä näyttöä että sananvalintaa.

#### Scenario: Emoji ja sana ovat yhteneväiset
- **WHEN** käyttäjä painaa näppäintä ja ruudulle ilmestyy emoji
- **THEN** sananvalintalogiikka käyttää täsmälleen samaa emojia jonka ruudulle näkyy, eikä arvoi uutta
