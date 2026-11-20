# Tasks

## 1. Top Word Layout

- [x] 1.1 Increase the top word hint font size to approximately `4rem` and use responsive constraints so it remains visible for long words; verify the hint is clearly larger and readable in the browser.
- [x] 1.2 Enable pointer interaction for top-word letters while preserving their existing matched and dimmed opacity states; verify letter clicks do not advance keyboard progress.

## 2. Click Feedback

- [x] 2.1 Add a temporary ripple element for document clicks at `clientX`/`clientY` and remove it after its animation; verify clicks produce one ripple at the pointer position.
- [x] 2.2 Add temporary next-letter and clicked-letter highlight state that does not alter `wordState`; verify general clicks highlight the next unmatched letter and letter clicks highlight only the clicked letter.
- [x] 2.3 Restart temporary highlight feedback cleanly on repeated clicks and prevent it from changing completion or matched-letter state; verify rapid clicks do not corrupt word progress.

## 3. Integration Verification

- [x] 3.1 Run `npm run build` and verify the application compiles with no errors.
- [x] 3.2 Verify in the browser that the larger hint, general-click ripple and highlight, specific-letter highlight, and no-click typing side effects match the delta spec.
