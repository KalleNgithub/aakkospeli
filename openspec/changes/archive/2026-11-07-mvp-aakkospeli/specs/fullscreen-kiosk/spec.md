# Spec Delta

## Purpose

Pitää sovelluksen koko ruudun tilassa siten, että lapsi ei vahingossa poistu pelistä normaalin selailun aikana.

## ADDED Requirements

### Requirement: Sovellus pyytää fullscreen-tilan käynnistyessä
Sovelluksen SHALL pyytää selaimen Fullscreen API:n kautta koko ruudun tilaa heti ensimmäisen käyttäjävuorovaikutuksen jälkeen (selainturvallisuussyistä fullscreen vaatii käyttäjätoiminnon).

#### Scenario: Fullscreen myönnetty
- **WHEN** käyttäjä klikkaa tai painaa näppäintä ensimmäistä kertaa
- **THEN** sovellus siirtyy koko ruudun tilaan ja peittää koko näytön

#### Scenario: Fullscreen estetty
- **WHEN** selain estää fullscreen-pyynnön (esim. käyttäjä kieltää sen)
- **THEN** sovellus jatkaa toimintaansa normaalissa ikkunatilassa ilman virheilmoitusta

### Requirement: Sovellus palaa fullscreen-tilaan poistumisen jälkeen
Sovelluksen SHALL havaita fullscreen-tilan päättyminen ja pyytää välittömästi paluuta siihen.

#### Scenario: Esc-näppäin painettu
- **WHEN** käyttäjä painaa Esc-näppäintä (selain pakottaa ulos fullscreenista)
- **THEN** sovellus pyytää fullscreen-tilaa uudelleen mahdollisimman nopeasti

#### Scenario: Paluupyyntö epäonnistuu
- **WHEN** selain kieltää uudelleenpyynnön (esim. fokus puuttuu)
- **THEN** sovellus näyttää koko ikkunan peittävän kehotteen, joka pyytää klikkaamaan palatakseen koko ruutuun

### Requirement: Fullscreen-tila ei häiritse näppäinsyöttöä
Fullscreen-moodi EI SAA estää tai muuttaa näppäinpainalluksien käsittelyä.

#### Scenario: Näppäin painettu fullscreen-tilassa
- **WHEN** käyttäjä painaa mitä tahansa näppäintä fullscreen-tilassa
- **THEN** sovellus käsittelee näppäimen normaalisti kuten ei-fullscreen-tilassa
