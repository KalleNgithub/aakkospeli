# letter-speech Specification

## Purpose

Provides configurable spoken feedback for typed letters and highlighted word letters using browser speech synthesis, with Finnish text as the first supported language.

## Requirements

### Requirement: Typed letters can be spoken
The application SHALL speak the configured Finnish pronunciation after an intentional printable key press and SHALL use the lowercase character to look up the configuration.

#### Scenario: Letter with Finnish configuration
- **WHEN** the user presses a letter that has an entry for the `fi` language
- **THEN** the browser speaks the configured Finnish text

#### Scenario: Letter without Finnish configuration
- **WHEN** the user presses a printable character without an entry for the `fi` language
- **THEN** the character itself is spoken when browser speech synthesis is available

#### Scenario: Uppercase letter
- **WHEN** the user presses an uppercase letter
- **THEN** the application uses the lowercase letter's pronunciation configuration

### Requirement: Highlighted word letters can be spoken
The application SHALL speak a word letter when that letter is clicked or is automatically highlighted.

#### Scenario: Letter clicked
- **WHEN** the user clicks a letter in the displayed word
- **THEN** the application speaks that letter using the same pronunciation configuration as key presses

#### Scenario: Next expected letter highlighted
- **WHEN** the application highlights the next unmatched word letter
- **THEN** the application speaks that letter using the same pronunciation configuration as key presses

### Requirement: Pronunciations support multiple language keys
The pronunciation configuration SHALL store language-specific values by language key and SHALL support `fi` in the first implementation.

#### Scenario: Finnish pronunciation selected
- **WHEN** the application resolves a character for speech
- **THEN** it reads the character's `fi` value

#### Scenario: Added language without implementation selection
- **WHEN** another language key is present in the configuration
- **THEN** the application does not change the selected language or alter its Finnish behavior

### Requirement: Speech synthesis failures stay silent
The application SHALL fall back to silence when browser speech synthesis is unavailable or has reported an error.

#### Scenario: API unavailable on first letter
- **WHEN** the first supported letter is typed and browser speech synthesis APIs are unavailable
- **THEN** the application marks speech unavailable and plays no sound

#### Scenario: Speech synthesis reports an error
- **WHEN** browser speech synthesis reports an error for a spoken letter
- **THEN** the application marks speech unavailable for the rest of the fullscreen session

#### Scenario: Repeated use after failure
- **WHEN** an unavailable or broken speech status is already known
- **THEN** later letters are spoken no further attempts

### Requirement: Speech status resets with fullscreen and reload
The application SHALL reset the speech API status when fullscreen is entered, when fullscreen is exited, or when the page reloads.

#### Scenario: Enter fullscreen
- **WHEN** fullscreen entry completes or is attempted
- **THEN** the speech status returns to untested

#### Scenario: Exit fullscreen
- **WHEN** fullscreen ends
- **THEN** the speech status returns to untested

#### Scenario: Page reload
- **WHEN** the page reloads
- **THEN** the speech status begins as untested

### Requirement: Rapid speech replaces previous utterance
The application SHALL cancel the previous utterance before starting another supported letter.

#### Scenario: Second letter arrives while first is speaking
- **WHEN** a new printable letter or highlighted letter requests speech before the prior utterance finishes
- **THEN** the previous utterance is cancelled and only the latest letter is spoken
