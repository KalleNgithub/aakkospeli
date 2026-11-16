# Design

## Context

App.svelte handles all keypress logic in a single `handleKeydown` function. `spawnEmoji` picks and spawns a floating emoji but currently returns nothing — the picked value is discarded after rendering. The emoji map (`emojiMap.js`) is the only static data source; there is no word data or multi-keypress state.

## Goals / Non-Goals

**Goals:**
- New `src/dictionary.js` module that owns word data, selection logic, and build-time emoji validation
- `spawnEmoji` returns the picked emoji so word selection gets the same value shown on screen
- Reactive word-tracking state in App.svelte drives the top-bar display
- Confetti burst reuses existing emoji spawn infrastructure

**Non-Goals:**
- Dynamic or server-side word lists
- Animations on the top bar itself (progressive reveal is CSS opacity only)
- Localization beyond Finnish

## Decisions

### 1. `src/dictionary.js` owns data, selection, and build-time validation

Word data lives in a single module. A module-level loop over the dictionary throws at Vite bundle time if any emoji word's emoji is absent from `emojiMap` for that letter — no Vite plugin needed, plain JS suffices. The `selectWord(char, displayedEmoji)` function encapsulates the weighted-selection algorithm and returns `null` when no word applies.

Dictionary entry shape: `{ word: string, emoji?: string }`. Keyed by lowercase first letter.

Alternative considered: separate `dictionaryData.js` + `dictionaryLogic.js`. Rejected — unnecessary split for a small module.

### 2. `spawnEmoji` refactored to return the picked emoji

`spawnEmoji(char)` now returns the emoji string it picked (or `null` if the char has no emoji list). `handleKeydown` captures this return value and passes it to `selectWord`. One random pick serves both display and word selection — no second draw.

### 3. Word-tracking state machine in App.svelte

```
wordState: null | { word: string, emoji: string|null, matched: number }
```

On every fresh keypress (not repeat, not function key):
1. `emoji = spawnEmoji(key)` — spawn floating emoji, capture value
2. `entry = selectWord(key, emoji)` — null or `{ word, emoji }`
3. If `wordState` exists and `key` matches `wordState.word[wordState.matched]` (case-insensitive):
   - `matched++`
   - If `matched === word.length` → trigger reward, `wordState = null`
   - Else → update wordState (Svelte reactivity via reassignment)
4. Else (mismatch or no active word):
   - `wordState = entry ? { word: entry.word, emoji: entry.emoji ?? null, matched: 1 } : null`

Steps 3 and 4 always run regardless of step 1/2 result when `wordState` is active, except the emoji/word lookup in step 2 is still performed (the new emoji and potentially new word are needed if the letter doesn't match).

Actually simplified: check wordState first. If active and key matches next letter → advance. Otherwise → new lookup (steps 1–2 always happen for the floating emoji; word state resets based on the new lookup result).

### 4. Top bar rendering

A `<div class="top-bar">` appears only when `wordState !== null`. It renders:
- The word's emoji (if any) in a span to the left
- Each letter of the word in a span, `opacity: 1` for indices `< matched`, `opacity: 0.3` for indices `>= matched`
- Word is displayed uppercase regardless of pressed key case

The top bar is `position: fixed` at the top-center, small font (~2rem), does not interfere with the main centered character.

### 5. Confetti burst reuses emoji spawn loop

A `spawnConfetti()` function spawns 12 emojis at once from a fixed confetti list (`🎉`, `🎊`, `✨`, `⭐`, `🌟`, `🎈`). Unlike regular emoji spawning (edge zones only), confetti positions are uniformly random across the full screen. Each confetti emoji uses the existing fade animation with a short, slightly randomized duration (~1.5–2.5 s). No new animation is needed.

## Risks / Trade-offs

- **Build-time validation only catches emoji mismatches, not missing words**: if a letter's emoji list in emojiMap is extended later and the dictionary isn't updated, no error is raised. Acceptable for a manually curated list.
- **UFO-only initial dictionary**: `selectWord('u', '🛸')` always returns "ufo" because there are no plain words for 'u' and the emoji always matches. This makes the initial test deterministic, which is intentional.
- **Confetti overlaps active game state**: confetti emojis use the same `emojis` array as regular spawns. They fade naturally and don't block input. Acceptable for a simple reward effect.
