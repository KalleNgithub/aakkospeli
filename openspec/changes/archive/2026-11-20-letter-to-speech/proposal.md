# Proposal

## Why

The app currently gives visual feedback for typed letters and highlighted word letters. Speaking the letter adds an accessible Finnish pronunciation cue without requiring audio assets or a network service.

## What Changes

- Add configurable Finnish text-to-speech pronunciations for printable characters.
- Speak a letter on intentional key press and when a word letter is clicked or highlighted.
- Use browser Web Speech API voice availability with Finnish locale selection.
- Replace, rather than queue, overlapping speech utterances.
- Silence playback when Web Speech API is unavailable or stops working.
- Reset speech API status when fullscreen is entered, exited, or the page reloads.

## Capabilities

### New Capabilities
- `letter-speech`: Browser-based spoken feedback for typed and highlighted letters, with configurable Finnish pronunciations and graceful API failure fallback.

### Modified Capabilities

None.

## Impact

- Affects `src/App.svelte` and likely one small speech configuration module.
- Uses the browser Web Speech API and may use locally available Finnish voices.
- No dependencies, network API, or bundled audio files.
