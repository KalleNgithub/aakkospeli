# Proposal

## Why

The top word hint is currently small and difficult to use as a visual teaching cue. Click feedback should also help the player identify the next letter without changing keyboard progress.

## What Changes

- Increase the top word hint font size substantially, roughly doubling it.
- Add a ripple effect at the pointer position for screen clicks.
- Temporarily highlight the next letter in the top word after a general screen click.
- When a letter in the top word is clicked, temporarily highlight only that letter instead of the next letter.
- Do not advance word progress or trigger typing behavior from mouse clicks.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `word-hint`: Add larger hint text and temporary pointer-triggered letter highlighting behavior.

## Impact

- `src/App.svelte`: add click handling, temporary highlight state, and top-word letter click targets.
- `src/app.css`: add any shared ripple styling if needed.
