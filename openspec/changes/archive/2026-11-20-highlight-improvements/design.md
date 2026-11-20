# Design

## Context

The app uses one Svelte component for keyboard state and the top word hint. The existing top bar uses pointer-events: none and fixed text styles, while mouse clicks already request fullscreen through a document-level listener.

## Goals / Non-Goals

**Goals:**
- Make the top word substantially larger.
- Provide temporary visual feedback for general and letter-specific clicks.
- Preserve the existing keyboard-driven word progress logic.

**Non-Goals:**
- Change keyboard matching, word selection, or completion behavior.
- Add persistent selection or mouse-based typing.
- Replace the existing fullscreen or emoji systems.

## Decisions

- Keep ripple and temporary highlights as short-lived UI state in `App.svelte`. This avoids a separate store or data model for effects that do not affect game state.
- On document click, create a ripple at `event.clientX` and `event.clientY`.
- General document clicks highlight `wordState.matched` when a top word is visible. Letter clicks stop propagation or target-specific handling and highlight the clicked letter index instead.
- Use a small timeout or key-based CSS animation to remove temporary highlights; cleanup is independent of keyboard state.
- Increase the top bar font size from `2rem` to roughly `4rem`, using the existing responsive font conventions so it remains usable on varied screens.

## Risks / Trade-offs

- [Long words may not fit at larger sizes] -> Use existing flex layout with a viewport-relative maximum or responsive sizing rather than a fixed only.
- [Document-level ripple handling can overlap fullscreen entry] -> Keep fullscreen handling separate and add visual handling after it.
- [Rapid clicks may leave stale highlight state] -> Restart the highlight animation and clear previous highlight timers before applying a new target.

## Migration Plan

No persistent migration is needed. This is a UI-only change that can be deployed and rolled back with the application bundle.
