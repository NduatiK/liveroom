<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { LiveState } from "phx-live-state";
  import LiveroomLogoSvg from "./LiveroomLogoSvg.svelte";
  import CopyInstallationCodeButton from "./CopyInstallationCodeButton.svelte";
  import type { User } from "src/types/User";

  export let open = true;
  const dispatch = createEventDispatcher();

  let started = false;

  let pointerEventsOnVideoElStyle = document.createElement("style");
  pointerEventsOnVideoElStyle.textContent = `
    *[data-isliveroomscreensharing="true"] video {
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
    }
    *[data-isliveroomscreensharing="true"] *[jsaction^="mousedown:"]  {
      /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our mouse move listener on the video element */
      pointer-events: none !important;
    }
  `;

  let selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
    #liveroom-overlay, #liveroom-overlay * {
      visibility: visible !important;
    }
    video {
      visibility: visible !important;
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
      cursor: pointer;
    }
    /* NOTE: Unfortunately, we can't add a pseudo-element to the video element itself, so we add it to its parent */
    *:has(> video) {
      position: relative;
    }
    *:has(> video)::before {
      visibility: visible !important;
      z-index: 9999;
      opacity: 0;
      content: "";
      position: absolute;
      inset: 0;
      /* Tailwind indigo-600 */
      outline: 2px solid #4f46e5;
      background-color: #4f46e5;
      transition: opacity 0.15s ease-out;
    }
    *:has(> video:hover)::before {
      opacity: 0.8;
    }
    /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our video element hover */
    [jsaction] {
    /* [jsaction*="mousedown"] { */
      pointer-events: none !important;
    }
    body *:not(video) {
      visibility: hidden !important;
    }
    body {
      /* NOTE: Default dark background on Google Meet */
      background-color: #202124 !important;
    }
  `;

  let resizeObserver: ResizeObserver;

  let screensharingVideoEl: HTMLVideoElement;
  let screensharingVideoElWidth: number;
  let screensharingVideoElHeight: number;

  let mouseX: string; // string because we round it to 2 decimals using `toFixed(2)`
  let mouseY: string; // string because we round it to 2 decimals using `toFixed(2)`

  let roomId: string;
  let me: User<"admin">;
  let users: { [key: User["id"]]: User };
  let liveState: LiveState;

  // Observe the screensharing video element dimensions
  $: if (screensharingVideoEl) {
    // Set up screensharing video element dimensions
    screensharingVideoElHeight = Math.round(
      screensharingVideoEl.getBoundingClientRect().height
    );
    screensharingVideoElWidth = Math.round(
      screensharingVideoEl.getBoundingClientRect().width
    );

    // Set up resize observer
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          screensharingVideoElWidth = Math.round(width);
          screensharingVideoElHeight = Math.round(height);
        }
      });
      resizeObserver.observe(screensharingVideoEl);
    }
  } else {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
  }
  // If screensharing video size is 0, then it has been removed from DOM
  $: if (screensharingVideoElWidth === 0 && screensharingVideoElHeight === 0) {
    screensharingVideoEl = undefined;
    screensharingVideoElWidth = undefined;
    screensharingVideoElHeight = undefined;
    started = false;
  }

  // Set up listeners on the screensharing video element
  $: if (screensharingVideoEl) {
    // NOTE: We set a special data attribute on the 'top' parent container element,
    //       so we can better target it in the stylesheet overload 'pointerEventsOnVideoElStyle'.
    screensharingVideoEl
      .closest("[data-participant-id]")
      .setAttribute("data-isliveroomscreensharing", "true");
    document.head.appendChild(pointerEventsOnVideoElStyle);

    screensharingVideoEl.addEventListener("mousemove", handleMouseMove);
    screensharingVideoEl.addEventListener("mousedown", handleMouseDown);
    screensharingVideoEl.addEventListener("mouseup", handleMouseUp);
    screensharingVideoEl.addEventListener("keydown", handleKeyDown);
    screensharingVideoEl.addEventListener("keyup", handleKeyUp);
  } else {
    if (pointerEventsOnVideoElStyle.parentNode === document.head) {
      document.head.removeChild(pointerEventsOnVideoElStyle);
    }
  }

  // Connect LiveState socket
  $: if (screensharingVideoEl && !liveState) {
    const parts = window.location.pathname.split("/");
    roomId = parts.pop() || parts.pop(); // handle potential trailing slash
    console.log(`[Liveroom] Connecting to room '${roomId}'...`);

    liveState = new LiveState({
      url:
        process.env.NODE_ENV === "production"
          ? "wss://liveroom.app/client_socket"
          : "ws://localhost:4000/client_socket",
      topic: `liveroom-livestate:${roomId}`,
      params: {
        room_id: roomId,
        current_url: null,
        inner_width: null,
        inner_height: null,
      },
    });

    liveState.connect();
    liveState.addEventListener("livestate-change", ({ detail: { state } }) => {
      roomId = state.room_id;
      me = state.me;
      users = state.users;
    });
    dispatch("session_started");
  } else if (!screensharingVideoEl && liveState) {
    liveState.disconnect();
    liveState = undefined;
    dispatch("session_ended");
  }

  // LIFECYCLE

  onDestroy(() => {
    liveState?.disconnect();
    resizeObserver?.disconnect();
    screensharingVideoEl?.removeEventListener("mousemove", handleMouseMove);
    screensharingVideoEl?.removeEventListener("mousedown", handleMouseDown);
    screensharingVideoEl?.removeEventListener("mouseup", handleMouseUp);
    screensharingVideoEl?.removeEventListener("keydown", handleKeyDown);
    screensharingVideoEl?.removeEventListener("keyup", handleKeyUp);
    if (document.head.contains(selectVideoElStyle)) {
      document.head.removeChild(selectVideoElStyle);
    }
    if (document.head.contains(pointerEventsOnVideoElStyle)) {
      document.head.removeChild(pointerEventsOnVideoElStyle);
    }
  });

  // HELPERS

  function handleMouseMove(e) {
    // const xRatio = e.layerX / screensharingVideoEl.offsetWidth;
    const xRatio = e.layerX / screensharingVideoElWidth;
    mouseX = Number(xRatio * 100).toFixed(2); // in %

    // const yRatio = e.layerY / screensharingVideoEl.offsetHeight;
    const yRatio = e.layerY / screensharingVideoElHeight;
    mouseY = Number(yRatio * 100).toFixed(2); // in %

    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_move", {
          detail: { user_id: me.id, x: mouseX, y: mouseY },
        })
      );
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_down", { detail: { user_id: me.id } })
      );
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_up", { detail: { user_id: me.id } })
      );
    }
  }
  const INTERESTING_KEYS = ["Escape"];
  function handleKeyDown(e: KeyboardEvent) {
    // NOTE: To avoid sending multiple keydown events when a key is held down.
    const firstTimeKeyIsPressed = !e.repeat;

    if (
      liveState &&
      me?.id &&
      firstTimeKeyIsPressed &&
      INTERESTING_KEYS.includes(e.key)
    ) {
      liveState.dispatchEvent(
        new CustomEvent("key_down", { detail: { user_id: me.id, key: e.key } })
      );
    }
  }
  function handleKeyUp(e: KeyboardEvent) {
    if (liveState && me?.id && INTERESTING_KEYS.includes(e.key)) {
      liveState.dispatchEvent(
        new CustomEvent("key_up", { detail: { user_id: me.id, key: e.key } })
      );
    }
  }

  function placeCursorsContainerNextToScreensharingVideoEl(
    cursorsContainerEl: HTMLElement
  ) {
    screensharingVideoEl.parentElement.style.position = "relative";
    screensharingVideoEl.parentElement.appendChild(cursorsContainerEl);
    return {
      destroy() {
        if (screensharingVideoEl?.parentElement) {
          delete screensharingVideoEl.parentElement.style.position;
          if (screensharingVideoEl.parentElement.contains(cursorsContainerEl)) {
            screensharingVideoEl.parentElement.removeChild(cursorsContainerEl);
          }
        }
      },
    };
  }
</script>

<div id="liveroom-overlay" data-open={open}>
  <div class="body">
    {#if !started}
      <button
        on:click={() => {
          started = true;

          const videoEls = Array.from(document.querySelectorAll("video"));

          function handleVideoClick(e) {
            screensharingVideoEl = e.target;
            document.head.removeChild(selectVideoElStyle);
            // clean all click event listeners
            videoEls.forEach((videoEl) => {
              videoEl.removeEventListener("click", handleVideoClick);
            });
          }

          videoEls.forEach((videoEl) => {
            videoEl.addEventListener("click", handleVideoClick);
          });

          document.head.appendChild(selectVideoElStyle);
        }}
      >
        Start session
      </button>
    {:else if !screensharingVideoEl}
      <p class="instructions">Click on the screensharing video</p>
    {:else}
      {#if users}
        <div class="users-names-list">
          {#each Object.values(users) as user (user.id)}
            <span class="user-name" style:--color={user.color}>
              {user.name}
            </span>
          {/each}
        </div>
      {/if}

      <div class="separator" />

      <div class="buttons-container">
        <CopyInstallationCodeButton url={liveState.config.url} {roomId} />

        <button
          class="end-session-button"
          on:click={() => {
            started = false;
            screensharingVideoEl = undefined;
          }}
        >
          End session
        </button>
      </div>
    {/if}
  </div>

  <div class="footer">
    <p class="powered-by">
      powered by <a href="https://liveroom.app">
        <LiveroomLogoSvg height="10" width="10" color="currentColor" />
        <span>Liveroom</span>
      </a>
    </p>
  </div>
</div>

{#if screensharingVideoEl && me && users}
  <div id="users-container" use:placeCursorsContainerNextToScreensharingVideoEl>
    {#each Object.values(users) as user (user.id)}
      <div
        id="user-{user.id}"
        class="user"
        data-isself={user.id == me.id}
        style="
          --color: {user.color};
          --x: {(parseFloat(user.x) / 100) * screensharingVideoElWidth}px;
          --y: {(parseFloat(user.y) / 100) * screensharingVideoElHeight}px;
        "
      >
        <svg
          width="23"
          viewBox="0 0 27 24"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          class="cursor"
        >
          <path
            d="M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"
          />
        </svg>
        <span class="user-name">{user.name}</span>
        <!-- <div
          class="halo"
          data-show={user.is_mouse_down || user.is_escape_key_down}
        /> -->
      </div>
    {/each}
  </div>
{/if}

<style>
  /* reset */
  p {
    margin: unset;
  }

  #liveroom-overlay {
    position: absolute;
    bottom: 3.2rem;
    left: 0;
    min-width: 17rem;
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid rgb(82, 82, 82, 0.2); /* Tailwind neutral-600 */
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    resize: horizontal;
    overflow: auto;
  }
  #liveroom-overlay[data-open="false"] {
    display: none;
  }
  #liveroom-overlay[data-open="true"] {
    display: flex;
  }

  #liveroom-overlay button {
    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: 1px solid rgb(82, 82, 82); /* Tailwind neutral-600 */
    background-color: #262626; /* Tailwind neutral-800 */
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    cursor: pointer;
    transition: border-color 0.15s ease-out, background-color 0.15s ease-out;
  }
  #liveroom-overlay button:hover {
    border-color: black;
    background-color: black;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }

  .footer {
    display: flex;
    justify-content: center;
    padding: 0.3rem;
  }
  .footer .powered-by {
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    color: rgb(163, 163, 163, 0.7); /* Tailwind neutral-400 */
  }
  .footer .powered-by a {
    display: flex;
    align-items: center;
    gap: 0.1em;
    margin-left: 0.4em;
    color: rgb(163, 163, 163, 0.7); /* Tailwind neutral-400 */
    font-weight: 500;
    transition: color 0.15s ease-out;
  }
  .footer .powered-by a:hover {
    color: rgb(163, 163, 163); /* Tailwind neutral-400 */
  }

  .instructions {
    margin: auto;
    padding: 0.6rem 1rem;
    color: #525252; /* Tailwind neutral-600 */
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
  }

  .users-names-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .user-name {
    padding: 4px 10px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: black;
    background-color: var(--color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 9999px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* Tailwind 'shadow-sm' */
  }

  .separator {
    height: 1px;
    width: 50%;
    margin: 1.5rem auto;
    border-radius: 100%;
    background-color: rgb(229, 229, 229, 0.6); /* Tailwind neutral-200 */
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 0 1rem;
  }

  #users-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .user {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    transform: translate(var(--x), var(--y));
  }

  .user .cursor {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color);
    transform-origin: top left;
    transform: rotate(6deg);
  }
  .user[data-isself="true"] .cursor {
    display: none;
  }

  .user .user-name {
    position: absolute;
    top: 20px;
    left: 16px;
  }
  .user[data-isself="true"] .user-name {
    display: none;
  }

  /* .user .halo {
    transform: scale(0);
    z-index: -1;
    position: absolute;
    top: -60px;
    left: -60px;
    width: 120px;
    height: 120px;
    border-radius: 9999px;
    background-color: var(--color);
    opacity: 0.25;
    transition: transform 0.15s ease-out;
    /* Tailwind 'shadow-sm'
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
  .user .halo[data-show="true"] {
    transform: scale(1);
  } */
</style>
