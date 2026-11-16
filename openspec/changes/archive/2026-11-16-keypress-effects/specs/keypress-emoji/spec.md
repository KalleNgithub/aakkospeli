# Spec Delta

## Purpose

Näyttää näppäinpainalluksen yhteydessä merkille sopivan emojin satunnaisessa sijainnissa ruudulla, ja häivyttää sen muutaman sekunnin kuluttua itsenäisesti kirjaimesta riippumatta.

## ADDED Requirements

### Requirement: Emoji valitaan merkille ennalta määrätystä listasta
Jokaiselle tuettavalle merkille SHALL olla ennalta määrätty lista emojeista. Näytettävä emoji SHALL valita satunnaisesti tasaisesta jakaumasta kyseisen merkin listalta.

#### Scenario: Kirjain jolla on useita emojeita
- **WHEN** käyttäjä painaa kirjainta, jolle on määritelty useita emojeita
- **THEN** yksi emojilistan emojista valitaan satunnaisesti ja näytetään ruudulla

#### Scenario: Kirjain jolla on vain yksi emoji
- **WHEN** käyttäjä painaa kirjainta, jolle on määritelty vain yksi emoji
- **THEN** kyseinen ainoa emoji näytetään aina

#### Scenario: Ei-tuettu merkki
- **WHEN** käyttäjä painaa merkkiä, jolle ei ole emoji-listaa
- **THEN** ruudulla ei näy emojia eikä virhettä ilmene

### Requirement: Kirjainmerkkien emojit liittyvät kirjaimen äänteeseen suomeksi
Kirjainmerkeille (a–z, å, ä, ö sekä isot kirjaimet) SHALL määritellä vähintään yksi emoji. Kirjainten emojien tulee esittää asiaa tai eläintä, jonka nimi suomeksi alkaa kyseisellä kirjaimella. Poikkeuksena sallitaan kirjaimen oma unicode-emoji-merkki (esim. 🇿 tai vastaava) sellaisille kirjaimille, joille sopivaa suomenkielistä sanaa ei löydy.

#### Scenario: Yleinen suomalainen kirjain
- **WHEN** ruudulla näkyy kirjain jonka äänteellä on runsaasti suomenkielisiä sanoja (esim. A, B, E, K)
- **THEN** näytettävä emoji esittää asiaa, jonka suomenkielinen nimi alkaa kyseisellä kirjaimella

#### Scenario: Harvinainen kirjain
- **WHEN** ruudulla näkyy kirjain jonka äänteellä on vähän tai ei lainkaan sopivia suomenkielisiä sanoja (esim. Z, X, W)
- **THEN** näytettävä emoji on kirjainta itseään esittävä emoji tai muu kirjaimeen liittyvä symboli

### Requirement: Numeromerkkien emojit ovat numeroon liittyviä
Numeromerkeille (0–9) SHALL määritellä vähintään numero-emoji (esim. 1️⃣) sekä vastaava kellonaika-emoji (esim. 🕐). Näytettävä emoji valitaan satunnaisesti näistä vaihtoehdoista.

#### Scenario: Numeropainallus
- **WHEN** käyttäjä painaa numeronäppäintä (0–9)
- **THEN** näytetään joko numeroa esittävä emoji tai vastaava kellonaika-emoji

### Requirement: Emoji sijoitetaan satunnaisesti kirjaimen ympärille
Emoji SHALL ilmestyä ruudulle satunnaiseen sijaintiin siten, että se ei peity kirjaimen alle eikä mene ruudun reunan yli.

#### Scenario: Emojin sijainti
- **WHEN** emoji ilmestyy ruudulle
- **THEN** emoji on näkyvissä kokonaan ruudun sisällä ja selvästi erillään kirjaimen pääalueesta

### Requirement: Emoji häipyy itsenäisesti
Emoji SHALL häipyä näkyvistä muutaman sekunnin kuluessa ilmestymisestä. Häipymisaika voi poiketa kirjaimen häipymisajasta ja saa vaihdella hieman satunnaisesti painalluksesta toiseen.

#### Scenario: Emojin häipyminen
- **WHEN** emoji on ilmestynyt ruudulle
- **THEN** emoji häipyy näkyvistä itsenäisesti muutaman sekunnin kuluessa

#### Scenario: Emojit viipyvät uuden painalluksen yli
- **WHEN** käyttäjä painaa uutta näppäintä edellisen emojin vielä näkyessä
- **THEN** edellinen emoji jatkaa häipymistään omaan tahtiinsa eikä poistu välittömästi
