# Proposal

## Why

Petra and Senni should be special hidden dictionary words with personal completion rewards instead of ordinary P/S word behavior.

## What Changes

- Add Petra to the P dictionary and Senni to the S dictionary.
- Use the girl emoji for Petra and Senni in word hints.
- Award completion confetti composed of heart emojis when either word is completed.
- Keep Petra and Senni separate from normal P/S emoji selection for key presses.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `dictionary`: Adds Petra and Senni entries with hint emoji data.
- `word-reward`: Supports word-specific heart completion confetti.

## Impact

- Affects `src/dictionary.js` and `src/App.svelte`.
- May require a small reward-emoji field on dictionary entries.
- No dependencies or audio changes.
