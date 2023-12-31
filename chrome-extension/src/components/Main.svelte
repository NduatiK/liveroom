<script lang="ts">
  import { onMount } from "svelte";
  import LiveroomLogoSvg from "./LiveroomLogoSvg.svelte";
  import Overlay from "./Overlay.svelte";

  let thisEl: HTMLElement;
  let thisElObserver: IntersectionObserver;
  let injectionInterval: number;
  let open = false;
  let started = false;
  let isSessionActive = false;
  let isAltKeyPressed = false;

  onMount(() => {
    // periodically check if the toolbar is ready for injection
    injectionInterval = setInterval(maybeInjectInToolbar, 1000);

    // NOTE: Place an observer to re-run the periodic check if the button is removed.
    //       This happens when the window is resized and the toolbar is re-rendered.
    thisElObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (
        window.getComputedStyle(entry.target).display != "none" &&
        !entry.isIntersecting
      ) {
        console.log(
          "[Liveroom Extension] Toolbar removed, trying re-injection..."
        );
        injectionInterval = setInterval(maybeInjectInToolbar, 1000);
      }
    });
    thisElObserver.observe(thisEl);

    return () => {
      thisElObserver?.disconnect();
      clearInterval(injectionInterval);
    };
  });

  // HELPERS

  function maybeInjectInToolbar() {
    const micButtonEl = document.querySelector(
      "button[data-is-muted]:first-of-type"
    );
    const toolbarButtonsContainer = findFirstGridParent(micButtonEl);

    if (micButtonEl && toolbarButtonsContainer) {
      // stop periodic check
      clearInterval(injectionInterval);

      console.log("[Liveroom Extension] Injecting in the toolbar...");

      // inject the liveroom main component in the toolbar as the 1st child
      toolbarButtonsContainer.insertBefore(
        thisEl,
        toolbarButtonsContainer.firstElementChild
      );

      // show the liveroom main component
      thisEl.style.display = "flex";

      console.log("[Liveroom Extension] Injected in the toolbar.");
    } else {
      console.log(
        "[Liveroom Extension] Waiting for the toolbar to be ready..."
      );
    }
  }

  function findFirstGridParent(elem: Element | null): Element | null {
    if (!elem) return null;

    while (elem.parentElement) {
      elem = elem.parentElement;

      const displayStyle = window.getComputedStyle(elem).display;

      if (displayStyle === "grid" || displayStyle === "inline-grid") {
        return elem;
      }
    }

    // Returns null if no grid parent found
    return null;
  }
</script>

<!-- NOTE: Component will be displayed once injected in the Google Meet toolbar -->
<div id="liveroom-main" bind:this={thisEl} style:display="none">
  <Overlay
    bind:open
    bind:started
    bind:isAltKeyPressed
    on:session_started={() => {
      isSessionActive = true;
      // NOTE: Keep the overlay open to copy the installation code easily.
      open = true;
      // open = false;
    }}
    on:session_ended={() => {
      isSessionActive = false;
      isAltKeyPressed = false;
      open = false;
    }}
  />

  <button
    class="toggle-btn"
    data-open={open}
    data-issessionactive={isSessionActive}
    data-isaltkeypressed={isAltKeyPressed}
    on:click={() => (open = !open)}
  >
    {#if open}
      <svg
        class="svg-close"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    {:else}
      <LiveroomLogoSvg height="1.25rem" width="1.25rem" color="currentColor" />
    {/if}
  </button>
</div>

<style>
  #liveroom-main {
    position: relative;
  }

  .toggle-btn {
    color: white;
    background-color: rgb(38, 38, 38); /* Tailwind neutral-800 */
    border: 1px solid rgb(163, 163, 163, 0.1); /* Tailwind neutral-400 */
    border-radius: 100%;
    height: 39px; /* same as Google Meet toolbar buttons */
    width: 39px; /* same as Google Meet toolbar buttons */
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    cursor: pointer;
    transition: color 100ms ease-out, border-color 100ms ease-out;
  }
  .toggle-btn:hover {
    border-color: rgb(163, 163, 163, 0.3); /* Tailwind neutral-400 */
  }
  .toggle-btn[data-issessionactive="true"] {
    color: rgb(79, 70, 229); /* Tailwind indigo-600 */
    border-color: rgb(79, 70, 229, 0.2); /* Tailwind indigo-600 */
  }
  .toggle-btn[data-issessionactive="true"]:hover {
    border-color: rgb(79, 70, 229, 0.8); /* Tailwind indigo-600 */
  }
  .toggle-btn[data-isaltkeypressed="true"] {
    color: rgb(250, 204, 21); /* Tailwind yellow-400 */
    border-color: rgb(250, 204, 21, 0.2); /* Tailwind yellow-400 */
  }
  .toggle-btn[data-isaltkeypressed="true"]:hover {
    border-color: rgb(250, 204, 21, 0.8); /* Tailwind yellow-400 */
  }

  .toggle-btn .svg-close {
    color: white;
    height: 1.5rem;
    width: 1.5rem;
  }
</style>
