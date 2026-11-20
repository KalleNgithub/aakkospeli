# Proposal

## Why

Completing a dictionary word should provide the same spoken feedback as typing letters, so the child hears the reward word when it appears.

## What Changes

- Add language-keyed pronunciation configuration for dictionary words.
- Speak a completed word when the completed-word display appears.
- Preserve the spoken word for the existing 1500 ms completed-word protection window.
- Prevent letter key presses from replacing or cancelling word speech during that window.
- Fall back to speaking the dictionary word text when no configured pronunciation exists.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `letter-speech`: Adds spoken completed words and protected speech for the completion window.
- `word-reward`: Adds spoken feedback when the completed word appears.

## Impact

- Affects `src/letterSpeech.js` and `src/App.svelte`.
- Uses the existing browser Web Speech API and 1500 ms completion protection state.
- No dependencies or audio files.
