# Proposal

## Why

The app currently shows letters and floating emojis in isolation — there is no connection to Finnish words or language learning. A dictionary feature links keypresses to real words, giving the child progressive feedback as they type correctly and a reward when they complete a word.

## What Changes

- New `src/dictionary.js` with a static word list (starting with only "ufo"), emoji-aware word selection, and a build-time check that dictionary emoji entries match `emojiMap` for the same letter
- `spawnEmoji` in `App.svelte` refactored to return the picked emoji so word selection can use the same value
- New top-of-screen strip: when the first letter of a dictionary word is pressed, the word appears with that letter clearly displayed and the remaining letters dimmed; no word shown if no match
- Each subsequent keypress either advances the word (next letter becomes clear) or resets to a new word lookup for the new letter
- Completing a full word triggers a brief confetti-style reward animation
- Initial dictionary: `{ word: "ufo", emoji: "🛸" }` only; expanded after manual verification

## Capabilities

### New Capabilities

- `dictionary`: Static word list, emoji-coupled word selection algorithm, and build-time emoji consistency validation
- `word-hint`: Top-of-screen display showing the current word with progressive letter reveal
- `word-reward`: Reward animation (confetti emoji burst) displayed on word completion

### Modified Capabilities

- `keypress-emoji`: `spawnEmoji` must return the emoji it picks so the word selection logic can use the same value

## Impact

- `src/App.svelte` — new reactive state for word tracking, top-bar UI section, modified keydown handler, reward trigger
- New file: `src/dictionary.js`
- `src/emojiMap.js` — imported by `dictionary.js` for validation; no changes to its own exports
- No new external dependencies
