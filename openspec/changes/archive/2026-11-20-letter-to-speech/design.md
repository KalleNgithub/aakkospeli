# Design

## Context

`App.svelte` is the existing integration point for key presses, word-letter clicks, automatic highlights, and fullscreen transitions. Speech synthesis can remain local to the browser and should not alter visual behavior or dictionary selection.

## Goals / Non-Goals

**Goals:**
- Add one small pronunciation configuration module supporting language-keyed entries.
- Speak printable typed letters and word letters through the browser.
- Detect browser API failure once and remain silent for the rest of the session.
- Reset failure detection across fullscreen transitions and page reloads.

**Non-Goals:**
- Supporting other spoken languages in this change.
- Bundling, downloading, or fetching audio files.
- Selecting or configuring voices in the user interface.
- Using IPA syntax or relying on speech engine interpretation of IPA.

## Decisions

**Use Web Speech API as the only playback mechanism.**
The browser exposes `speechSynthesis` and `SpeechSynthesisUtterance`. There is no dependency or network request.

Alternative: recorded audio files would be consistent but would require a large asset set and are outside the current requirements.

**Use language-keyed text configuration.**
A module will map lowercase letters to an object with language keys, initially containing only `fi`. Entries such as `a: { fi: 'aa' }` remain easy to extend. Characters without a configured `fi` entry resolve to the character itself.

Alternative: a flat Finnish map would be smaller now but would make later languages more invasive.

**Track speech status as unknown, working, or broken.**
Unknown means the API has not been tested. Working means the first utterance started successfully. Broken means required APIs are missing or an utterance reported an error. Once broken, no later utterance is attempted until fullscreen entry or exit resets status.

For this change, `onstart` establishes working status. Missing APIs or `onerror` establish broken status. Status does not need to depend on voice discovery, because a missing Finnish voice is browser speech behavior and should fail silently only when the API reports an error.

**Reset status on fullscreen transitions and page reload.**
The existing fullscreen change handler is the reset point for entry and exit. Reload creates a fresh module state, so no persistent storage is needed.

**Cancel and replace utterances.**
Before speaking, call the browser synthesis cancel operation and create only the latest utterance. This avoids a queue of repeated key presses.

**Integrate speech at existing event points.**
Typed printable letters call the speech helper after intentional key handling. Clicked word letters call it with the clicked letter. Automatic highlighting calls it with the highlighted letter.

## Risks / Trade-offs

- **Browser voice quality and pronunciation vary** → Use short, configurable Finnish text and accept engine-dependent results.
- **Speech synthesis may start without a Finnish voice** → Request `fi-FI` and rely on browser fallback behavior and `onerror` handling.
- **Repeated letters may cancel each other immediately** → Replacement is deliberate, because rapid child key presses should not queue.
- **Speech may be blocked by browser policy** → Treat unavailable or blocked behavior as a silent failure.

## Migration Plan

No migration is required. The feature activates immediately after implementation. Rolling back removes the speech module import and calls while preserving current visual behavior.
