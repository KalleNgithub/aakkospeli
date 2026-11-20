<script>
  import { onMount, onDestroy } from 'svelte';
  import { pickEmoji } from './emojiMap.js';
  import { selectWord } from './dictionary.js';
  import { resetSpeechStatus, speakLetter, speakWord } from './letterSpeech.js';

  let currentChar = '';
  let charKey = 0;      // increments on every intentional press to restart animation
  let charHeld = false; // true while key is physically held down
  let heldKey = null;   // which key is being held
  let showReturnPrompt = false;
  let fullscreenRequested = false;
  let emojis = [];
  let nextId = 0;
  let wordState = null;    // null | { word, emoji, matched, completed }
  let completedWord = null;
  let completedEmoji = null;
  let completedWordKey = 0;
  let highlightedLetter = null;
  let highlightTimeout = null;
  let ripples = [];
  const WORD_COMPLETION_PROTECTION_MS = 1500;
  const COMPLETED_WORD_SPEECH_DELAY_MS = 600;

  // --- Fullscreen ---

  async function enterFullscreen() {
    resetSpeechStatus();
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Browser denied — stay in windowed mode silently
    }
  }

  async function handleFullscreenChange() {
    resetSpeechStatus();
    if (!document.fullscreenElement) {
      showReturnPrompt = false;
      if (!fullscreenRequested) {
        try {
          await document.documentElement.requestFullscreen();
        } catch {
          showReturnPrompt = true;
        }
      }
      fullscreenRequested = false;
    }
  }

  async function handleReturnClick() {
    showReturnPrompt = false;
    await enterFullscreen();
  }

  // --- Emoji placement ---

  function randomEmojiPosition() {
    // Divide screen into 4 edge zones: top, bottom, left, right.
    // Each zone avoids the central letter area (~30%–70% on both axes).
    const zone = Math.floor(Math.random() * 4);
    let x, y;
    // Margin from screen edge to keep emoji fully visible (~6vmin ≈ emoji size)
    const edgeMargin = 8;
    // Inner boundary (letter occupies roughly 30%–70%)
    const innerMin = 15;
    const innerMax = 85;

    if (zone === 0) {
      // Top zone
      x = innerMin + Math.random() * (innerMax - innerMin);
      y = edgeMargin + Math.random() * (25 - edgeMargin);
    } else if (zone === 1) {
      // Bottom zone
      x = innerMin + Math.random() * (innerMax - innerMin);
      y = 75 + Math.random() * (100 - 75 - edgeMargin);
    } else if (zone === 2) {
      // Left zone
      x = edgeMargin + Math.random() * (20 - edgeMargin);
      y = innerMin + Math.random() * (innerMax - innerMin);
    } else {
      // Right zone
      x = 80 + Math.random() * (100 - 80 - edgeMargin);
      y = innerMin + Math.random() * (innerMax - innerMin);
    }
    return { x, y };
  }

  function spawnEmoji(char) {
    const emoji = pickEmoji(char);
    if (!emoji) return null;

    const { x, y } = randomEmojiPosition();
    // Duration 2.5–4 s, slightly randomized per emoji
    const duration = 2500 + Math.random() * 1500;
    const id = nextId++;

    emojis = [...emojis, { id, emoji, x, y, duration }];

    // Safety removal in case animationend doesn't fire
    setTimeout(() => {
      emojis = emojis.filter(e => e.id !== id);
    }, duration + 500);

    return emoji;
  }

  function spawnReward(word, emoji) {
    const content = emoji ?? word.toUpperCase();
    for (let i = 0; i < 10; i++) {
      const x = 5 + Math.random() * 90;
      const y = 5 + Math.random() * 90;
      const duration = 1500 + Math.random() * 1000;
      const id = nextId++;
      emojis = [...emojis, { id, emoji: content, x, y, duration }];
      setTimeout(() => {
        emojis = emojis.filter(e => e.id !== id);
      }, duration + 500);
    }
  }

  function removeEmoji(id) {
    emojis = emojis.filter(e => e.id !== id);
  }

  function spawnRipple(x, y) {
    const id = nextId++;
    ripples = [...ripples, { id, x, y }];
    setTimeout(() => {
      ripples = ripples.filter(r => r.id !== id);
    }, 700);
  }

  function removeRipple(id) {
    ripples = ripples.filter(r => r.id !== id);
  }

  function highlightLetter(index) {
    if (highlightTimeout) clearTimeout(highlightTimeout);
    highlightedLetter = index;
    if (wordState && !wordState.completed) speakLetter(wordState.word[index]);
    highlightTimeout = setTimeout(() => {
      highlightedLetter = null;
    }, 800);
  }

  function handleLetterClick(event, index) {
    event.stopPropagation();
    spawnRipple(event.clientX, event.clientY);
    highlightLetter(index);
  }

  function handleScreenClick(event) {
    spawnRipple(event.clientX, event.clientY);
    if (event.target?.closest('.word-letter')) return;
    if (wordState && !wordState.completed) {
      highlightLetter(wordState.matched);
    }
  }

  // --- Keyboard ---

  function handleKeydown(event) {
    const key = event.key;

    if (!event.repeat && !document.fullscreenElement) {
      enterFullscreen();
    }

    if (key.length !== 1) return;

    if (event.repeat) {
      // Key held — freeze animation in place, don't spawn new emoji
      heldKey = key;
      charHeld = true;
      return;
    }

    // Fresh intentional press
    charHeld = false;
    heldKey = null;
    if (!wordState?.completed) speakLetter(key);

    // Ignore keypresses while a completion is animating
    if (wordState?.completed) return;

    completedWord = null;
    completedEmoji = null;
    const spawnedEmoji = spawnEmoji(key);

    let wordCompleted = false;
    if (wordState && key.toLowerCase() === wordState.word[wordState.matched].toLowerCase()) {
      const newMatched = wordState.matched + 1;
      if (newMatched === wordState.word.length) {
        wordCompleted = true;
        spawnReward(wordState.word, wordState.emoji);
        completedWord = wordState.word.toUpperCase();
        completedEmoji = wordState.emoji ?? null;
        completedWordKey++;
        wordState = { ...wordState, matched: newMatched, completed: true };
        setTimeout(() => {
          speakWord(wordState.word);
        }, COMPLETED_WORD_SPEECH_DELAY_MS);
        setTimeout(() => { wordState = null; }, WORD_COMPLETION_PROTECTION_MS);
      } else {
        wordState = { ...wordState, matched: newMatched };
      }
    } else {
      const entry = selectWord(key, spawnedEmoji);
      wordState = entry ? { word: entry.word, emoji: entry.emoji ?? null, matched: 1 } : null;
    }

    if (!wordCompleted) {
      currentChar = key;
      charKey++;
    }
  }

  function handleKeyup(event) {
    if (event.key === heldKey) {
      charHeld = false;
      heldKey = null;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('click', enterFullscreen);
    document.addEventListener('click', handleScreenClick);
  });

  onDestroy(() => {
    if (highlightTimeout) clearTimeout(highlightTimeout);
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', handleKeyup);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('click', enterFullscreen);
    document.removeEventListener('click', handleScreenClick);
  });
</script>

{#if showReturnPrompt}
  <div
    class="return-prompt"
    role="button"
    tabindex="0"
    on:click={handleReturnClick}
    on:keydown={(e) => e.key === 'Enter' && handleReturnClick()}
  >
    <p>Klikkaa palataksesi koko ruutuun</p>
  </div>
{/if}

<!-- Emojis: each has its own fade animation with individual duration -->
{#each emojis as e (e.id)}
  <span
    class="emoji"
    style="left: {e.x}%; top: {e.y}%; animation-duration: {e.duration}ms;"
    on:animationend={() => removeEmoji(e.id)}
  >{e.emoji}</span>
{/each}

{#each ripples as r (r.id)}
  <span
    class="ripple"
    style="left: {r.x}px; top: {r.y}px;"
    on:animationend={() => removeRipple(r.id)}
  ></span>
{/each}

{#if wordState}
  <div class="top-bar" class:completed={wordState.completed}>
    {#if wordState.emoji}
      <span class="word-emoji">{wordState.emoji}</span>
    {/if}
    {#each wordState.word.toUpperCase().split('') as letter, i}
      <button
        type="button"
        class="word-letter"
        class:clarified={highlightedLetter === i}
        style="opacity: {i < wordState.matched ? 1 : 0.3}"
        on:click={(event) => handleLetterClick(event, i)}
      >{letter}</button>
    {/each}
  </div>
{/if}

<main>
  {#key completedWordKey}
    {#if completedWord}
      {@const emojiSlots = completedEmoji ? 2 : 0}
      <div class="char word-complete-display" style="font-size: min({Math.floor(70 / (completedWord.length + emojiSlots))}vw, 65vh)">
        {#if completedEmoji}<span>{completedEmoji}</span>{/if}
        <span>{completedWord}</span>
      </div>
    {/if}
  {/key}
  {#if !completedWord}
    {#key charKey}
      {#if currentChar}
        <span class="char" style={charHeld ? 'animation-play-state: paused' : ''}>{currentChar}</span>
      {:else}
        <p class="hint">Paina näppäintä</p>
      {/if}
    {/key}
  {/if}
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: #1a1a2e;
  }

  /* Letter: appear instantly, hold ~2.5s, fade over 1s */
  @keyframes charFade {
    0%   { opacity: 1; }
    70%  { opacity: 1; }
    100% { opacity: 0; }
  }

  .char {
    font-family: system-ui, sans-serif;
    font-size: min(70vw, 70vh);
    font-weight: 700;
    color: #f0e6ff;
    line-height: 1;
    user-select: none;
    animation: charFade 3.5s ease-in forwards;
  }

  .hint {
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    color: #6b5f8a;
    margin: 0;
    user-select: none;
  }

  /* Emoji: positioned absolutely, fades with individual duration */
  @keyframes emojiFade {
    0%   { opacity: 1; }
    60%  { opacity: 1; }
    100% { opacity: 0; }
  }

  .emoji {
    position: fixed;
    transform: translate(-50%, -50%);
    font-size: clamp(2rem, 6vmin, 5rem);
    font-family: system-ui, sans-serif;
    font-weight: 700;
    color: white;
    user-select: none;
    pointer-events: none;
    animation: emojiFade linear forwards;
    /* animation-duration set inline per element */
  }

  @keyframes ripple {
    0% {
      width: 0.5rem;
      height: 0.5rem;
      opacity: 0.8;
    }
    100% {
      width: 8rem;
      height: 8rem;
      opacity: 0;
    }
  }

  .ripple {
    position: fixed;
    z-index: 50;
    transform: translate(-50%, -50%);
    border: 0.3rem solid #f0e6ff;
    border-radius: 50%;
    pointer-events: none;
    animation: ripple 650ms ease-out forwards;
  }

  .word-complete-display {
    display: flex;
    align-items: center;
    gap: 0.2em;
  }

  .top-bar {
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.15em;
    font-family: system-ui, sans-serif;
    max-width: 96vw;
    font-size: clamp(2.5rem, 12vw, 4rem);
    font-weight: 700;
    color: #f0e6ff;
    user-select: none;
    pointer-events: auto;
    z-index: 10;
  }

  .word-emoji {
    margin-right: 0.3em;
  }

  .word-letter {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    line-height: 1;
    transition: opacity 0.1s, transform 0.1s, color 0.1s;
    cursor: pointer;
  }

  .word-letter.clarified {
    color: #ffd700;
    transform: scale(1.18);
  }

  @keyframes wordComplete {
    0%   { opacity: 1; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }

  .top-bar.completed {
    color: #ffd700;
    animation: wordComplete 1.5s ease-in forwards;
  }

  .return-prompt {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a2e;
    cursor: pointer;
  }

  .return-prompt p {
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    color: #f0e6ff;
    text-align: center;
    margin: 0;
    padding: 1rem;
  }
</style>
