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
The application SHALL cancel the previous utterance before starting another supported letter, except during the 1500 ms completed-word protection window.

#### Scenario: Second letter arrives while first is speaking
- **WHEN** a new printable letter or highlighted letter requests speech before the prior utterance finishes outside the completed-word protection window
- **THEN** the previous utterance is cancelled and only the latest letter is spoken

#### Scenario: Letter arrives during word reward
- **WHEN** the player presses a key or activates a letter highlight during the completed-word protection window
- **THEN** the completed word utterance continues undisturbed and no letter utterance replaces it

#### Scenario: Protection window ends
- **WHEN** the 1500 ms completed-word protection window ends
- **THEN** normal letter utterance replacement resumes

### Requirement: Dictionary words can be spoken
The application SHALL use a language-keyed dictionary word pronunciation and SHALL fall back to the dictionary word itself when no `fi` pronunciation exists.

#### Scenario: Word with Finnish configuration
- **WHEN** a completed dictionary word has a `fi` value in the word pronunciation configuration
- **THEN** the browser speaks that configured Finnish text

#### Scenario: Word without Finnish configuration
- **WHEN** a completed dictionary word has no `fi` value in the word pronunciation configuration
- **THEN** the browser speaks the dictionary word itself

### Requirement: Completed word speech starts with the reward
The application SHALL speak the final letter, wait 600 ms, and then speak the completed word after the completed-word display appears.

#### Scenario: Word completion
- **WHEN** the player completes a dictionary word
- **THEN** the final letter is spoken, the completed word is displayed, and 600 ms later its configured or fallback speech begins
