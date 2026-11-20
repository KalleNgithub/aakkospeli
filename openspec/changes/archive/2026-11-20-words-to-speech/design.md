# Design

## Context

See proposal.md for motivation. The app already has a 1500 ms completed-word window in `App.svelte`, and `letterSpeech.js` already owns speech status and utterance replacement.

## Goals / Non-Goals

**Goals:**
- Add language-keyed dictionary word pronunciations with Finnish text.
- Speak the completed word when its reward display appears.
- Keep word speech uninterrupted by letter presses for the completed-word window.
- Preserve browser API failure and fullscreen reset behavior.

**Non-Goals:**
- Speaking words when hints appear.
- Waiting for spoken text to finish before handling key presses.
- Changing the existing 1500 ms reward timing.

## Decisions

**Extend the existing speech module with word resolution.**
Add a `wordPronunciations` map in `letterSpeech.js`. Both letter and word resolution use the same language-keyed shape and `fi-FI` locale. Unconfigured words resolve to the word text itself.

**Reuse the existing speech-status state.**
Add `speakWord(word)` beside `speakLetter(character)`. It uses the same Web Speech API, cancellation, working/broken status, and silent fallback.

**Protect word utterances from letter replacement.**
At word completion, set the existing `wordState.completed` state before the word utterance starts, call `speakWord(word)`, and keep that state for the existing 1500 ms timeout. `speakLetter` will not cancel or replace the utterance while this state is active.

The protection follows `wordState.completed`, so visual protection and speech protection have exactly the same start and end.

**Sequence the final letter and completed word with a fixed delay.**
On the final key press, `speakLetter(key)` runs immediately. The app schedules `speakWord(word)` for 600 ms later. The 1500 ms completion protection begins at the same completion event, so rapid keys cannot replace either utterance during the protected window.

**No synchronous waiting.**
The reward and key handling remain asynchronous. Starting a word utterance does not delay display or block key events.

## Risks / Trade-offs

- **Word utterances may outlive the 1500 ms window** -> The window only prevents interruption; `speakLetter` may replace it only after the window ends.
- **Speech engine quality varies** -> Keep short configurable Finnish text and fall back to the dictionary word.
- **Dictionary grows over time** -> Unconfigured words work automatically; overrides remain optional.

## Migration Plan

No migration is required. A fallback speaks dictionary text even before every word has an explicit pronunciation entry.
