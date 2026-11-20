# Tasks

## 1. Word Pronunciation Configuration

- [x] 1.1 Add a dictionary word pronunciation map with optional `fi` text values and verify configured words resolve correctly while unspecified words fall back to their word text.
- [x] 1.2 Add word speech playback to the existing speech helper and verify it uses `fi-FI` and the established silent failure behavior.

## 2. Completion Protection

- [x] 2.1 Protect active word utterances for the existing 1500 ms completion window and verify rapid letter presses neither cancel nor replace word speech during it.
- [x] 2.2 Resume normal letter utterance replacement after the protection window and verify the completion timeout remains aligned with visual protection.
- [x] 2.3 Sequence the final letter immediately before the completed word, with a fixed 600 ms delay, and verify no key press cancels either utterance during completion.

## 3. App Integration

- [x] 3.1 Start word speech when the completed-word display appears and verify no synchronous waiting delays the reward.
- [x] 3.2 Verify word and letter speech share browser API status and fullscreen reset behavior.

## 4. Verification

- [x] 4.1 Build the app and verify the change introduces no build or runtime module errors.
- [x] 4.2 Verify final-letter speech, 600 ms delayed completed-word speech, fallback text, 1500 ms protection, rapid key presses, and fullscreen/API fallback behavior with browser checks.
