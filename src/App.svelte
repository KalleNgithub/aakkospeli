<script>
  import { onMount, onDestroy } from 'svelte';
  import { pickEmoji } from './emojiMap.js';

  let currentChar = '';
  let charKey = 0;      // increments on every intentional press to restart animation
  let charHeld = false; // true while key is physically held down
  let heldKey = null;   // which key is being held
  let showReturnPrompt = false;
  let fullscreenRequested = false;
  let emojis = [];
  let nextId = 0;

  // --- Fullscreen ---

  async function enterFullscreen() {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Browser denied — stay in windowed mode silently
    }
  }

  async function handleFullscreenChange() {
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
    if (!emoji) return;

    const { x, y } = randomEmojiPosition();
    // Duration 2.5–4 s, slightly randomized per emoji
    const duration = 2500 + Math.random() * 1500;
    const id = nextId++;

    emojis = [...emojis, { id, emoji, x, y, duration }];

    // Safety removal in case animationend doesn't fire
    setTimeout(() => {
      emojis = emojis.filter(e => e.id !== id);
    }, duration + 500);
  }

  function removeEmoji(id) {
    emojis = emojis.filter(e => e.id !== id);
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

    // Fresh intentional press — restart animation even for same character
    charHeld = false;
    heldKey = null;
    currentChar = key;
    charKey++;
    spawnEmoji(key);
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
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', handleKeyup);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('click', enterFullscreen);
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

<!-- {#key charKey} restarts animation on every intentional press, including same character -->
<main>
  {#key charKey}
    {#if currentChar}
      <span class="char" style={charHeld ? 'animation-play-state: paused' : ''}>{currentChar}</span>
    {:else}
      <p class="hint">Paina näppäintä</p>
    {/if}
  {/key}
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
    user-select: none;
    pointer-events: none;
    animation: emojiFade linear forwards;
    /* animation-duration set inline per element */
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
