# Tasks

## 1. Speech Configuration

- [x] 1.1 Add a lowercase-character pronunciation map with `fi` text values and verify it provides `fi` entries for letters and falls back to the character for unspecified entries.
- [x] 1.2 Add a small speech helper that resolves language-keyed text, cancels prior speech, sets `fi-FI`, and verifies typed letters are not queued.

## 2. Speech Status

- [x] 2.1 Implement unknown, working, and broken speech status states and verify missing browser APIs and synthesis errors make later speech silent.
- [x] 2.2 Reset speech status on fullscreen entry and exit and verify page reload starts with unknown status.

## 3. App Integration

- [x] 3.1 Call the speech helper for intentional printable key presses and verify held keys do not start repeated utterances.
- [x] 3.2 Call the speech helper for clicked and automatically highlighted word letters and verify they use the same configuration.

## 4. Verification

- [x] 4.1 Build the app and verify the change introduces no build or runtime module errors.
- [x] 4.2 Verify typed letters, highlighted letters, rapid replacement, API failure silence, and fullscreen status reset with manual browser checks.
