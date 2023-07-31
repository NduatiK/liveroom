<script lang="ts">
  import { onDestroy } from "svelte";
  import { LiveState } from "phx-live-state";

  export let open = true;

  let started = false;

  let pointerEventsOnVideoElStyle = document.createElement("style");
  pointerEventsOnVideoElStyle.textContent = `
    video {
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
    }
    [jsaction^="mousedown:"] {
      /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our mouse move listener on the video element */
      pointer-events: none !important;
    }
  `;

  let selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
    #overlay, #overlay * {
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
      /* NOTE: Liveroom brand color */
      outline: 2px solid #4f46e5;
      background-color: #4f46e5;
      transition: opacity 0.1s ease-out;
    }
    *:has(> video:hover)::before {
      opacity: 0.5;
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
  // TODO: Type me
  let me;
  // TODO: Type me
  let users: { [key: string]: any };
  let liveState: LiveState;

  // Observe the screensharing video element dimensions
  $: if (screensharingVideoEl) {
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          screensharingVideoElWidth = width;
          screensharingVideoElHeight = height;
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
    // FIXME: using hard coded public for dev purposes
    // const parts = window.location.pathname.split("/");
    // roomId = parts.pop() || parts.pop(); // handle potential trailing slash
    roomId = "public";
    console.log("roomId", roomId);

    liveState = new LiveState({
      url: "ws://localhost:4000/client_socket",
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
    if (me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_down", { detail: { user_id: me.id } })
      );
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_up", { detail: { user_id: me.id } })
      );
    }
  }
  const INTERESTING_KEYS = ["Escape"];
  function handleKeyDown(e: KeyboardEvent) {
    // NOTE: To avoid sending multiple keydown events when a key is held down.
    const firstTimeKeyIsPressed = !e.repeat;

    if (firstTimeKeyIsPressed && INTERESTING_KEYS.includes(e.key) && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("key_down", { detail: { user_id: me.id, key: e.key } })
      );
    }
  }
  function handleKeyUp(e: KeyboardEvent) {
    if (INTERESTING_KEYS.includes(e.key) && me?.id) {
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

<div id="overlay" data-open={open}>
  {#if !started}
    <button
      on:click={() => {
        started = true;

        const videoEls = Array.from(document.querySelectorAll("video"));
        console.log("videoEls", videoEls);

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
      Select screensharing video
    </button>
  {:else if !screensharingVideoEl}
    <p>Click on the screensharing video</p>
  {:else}
    <p>Name: <b>{me?.name}</b></p>
    <p>Color: <b>{me?.color}</b></p>
    <p>
      Screensharing dimensions:
      <b>{screensharingVideoElWidth}x{screensharingVideoElHeight}</b>
    </p>
    <p>
      Mouse coordinates:
      <b>{mouseX}, {mouseY}</b>
    </p>

    {#if users}
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        {#each Object.values(users) as user (user.id)}
          <div>
            <b
              style="background-color: {user.color}; padding: 4px 8px; border-radius: 9999px;"
            >
              {user.name}
            </b>
          </div>
        {/each}
      </div>
    {/if}

    <button
      style="margin-top: 24px;"
      on:click={() => {
        started = false;
        screensharingVideoEl = undefined;
        // TODO: reload the whole component properly?
      }}
    >
      Stop
    </button>
  {/if}
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
          --x: {(user.x / 100) * screensharingVideoElWidth}px;
          --y: {(user.y / 100) * screensharingVideoElHeight}px;
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
        <span class="name">{user.name}</span>
        <!-- <div
          class="halo"
          data-show={user.is_mouse_down || user.is_escape_key_down}
        /> -->
      </div>
    {/each}
  </div>
{/if}

<style>
  #overlay {
    /* min-height: 200px;
    max-height: 800px;
    min-width: 150px;
    max-width: 600px; */
    background-color: white;
    border: 1px solid rgb(82, 82, 82, 0.2); /* Tailwind neutral-600 */
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    /* overflow: auto; */
    /* resize: both; */
  }
  #overlay[data-open="false"] {
    display: none;
  }
  #overlay[data-open="true"] {
    display: block;
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

  .user .name {
    position: absolute;
    top: 20px;
    left: 16px;
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
    /* Tailwind 'shadow-sm' */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
  .user[data-isself="true"] .name {
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
