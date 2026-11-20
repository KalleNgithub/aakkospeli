# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
