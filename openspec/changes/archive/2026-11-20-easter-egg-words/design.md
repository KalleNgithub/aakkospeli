# Design

## Context

See proposal.md for motivation. Dictionary entries currently carry the hint emoji used for word selection, while completion rewards derive the confetti content from that entry emoji.

## Goals / Non-Goals

**Goals:**
- Add Petra and Senni as dictionary words.
- Keep 👧 as the Petra and Senni hint emoji.
- Let Petra and Senni use heart emoji confetti on completion.
- Preserve existing P/S key emoji behavior.

**Non-Goals:**
- Adding special key-press emojis for P or S.
- Changing normal reward behavior for unrelated words.
- Adding new name-speech overrides.

## Decisions

**Separate hint and reward emoji fields.**
Each dictionary entry keeps `emoji` for hint and selection behavior and may add `rewardEmojis` for completion confetti.

Petra and Senni use `emoji: '👧'`. They use a shared red-heart list containing only `❤️` as `rewardEmojis`.

**Use heart confetti only for matching entries.**
The completion reward resolves `rewardEmojis` from the completed dictionary entry. When absent, it retains the current entry emoji or word fallback.

The P and S key press effects remain unchanged because only the dictionary entry and completion path consume `rewardEmojis`.

## Risks / Trade-offs

- **Girl emoji differs in rendering across devices** -> Use the standard Unicode person emoji and browser-native rendering.
- **Heart list may be too many variants** -> Keep it as a short static list and only use it for these entries.

## Migration Plan

No migration is needed. Petra and Senni become available in normal P/S dictionary selection after implementation.
