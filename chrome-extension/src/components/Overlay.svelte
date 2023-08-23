<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { LiveState } from "phx-live-state";
  import PoweredByLiveroom from "./PoweredByLiveroom.svelte";
  import CopyInstallationCodeButton from "./CopyInstallationCodeButton.svelte";
  import UserName from "./UserName.svelte";
  import UsersCursors from "./UsersCursors.svelte";
  import {
    createSelectVideoElStyle,
    createPointerEventsOnVideoElStyle,
  } from "./stylesheets";
  import type { User } from "src/types/User";

  export let open = true;
  export let started = false;

  const dispatch = createEventDispatcher();

  let selectVideoElStyle = createSelectVideoElStyle();
  let pointerEventsOnVideoElStyle = createPointerEventsOnVideoElStyle();

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

  // Start selecting the screensharing video (screensharingVideoEl)
  $: if (started && !screensharingVideoEl) {
    // add video click handlers
    const videoEls = Array.from(document.querySelectorAll("video"));

    function handleVideoClick(e) {
      screensharingVideoEl = e.target;
      cleanup();
    }

    videoEls.forEach((videoEl) => {
      videoEl.addEventListener("click", handleVideoClick);
    });

    document.head.appendChild(selectVideoElStyle);

    // add escape key handler

    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        cleanup();
        open = false;
        started = false;
      }
    }
    window.addEventListener("keydown", handleEscapeKey);

    // -- helpers
    function cleanup() {
      document.head.removeChild(selectVideoElStyle);

      // clean all click event listeners
      videoEls.forEach((videoEl) => {
        videoEl.removeEventListener("click", handleVideoClick);
      });

      // clean escape key handler
      window.removeEventListener("keydown", handleEscapeKey);
    }
  }

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
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  } else {
    endSession();
    cleanStyles();
  }

  // Connect LiveState socket
  $: if (screensharingVideoEl && !liveState) {
    startSession();
  }

  // LIFECYCLE

  onDestroy(() => {
    endSession();
    cleanStyles();
  });

  // HELPERS

  function startSession() {
    const parts = window.location.pathname.split("/");
    roomId = parts.pop() || parts.pop(); // handle potential trailing slash
    console.log(`[Liveroom Extension] Connecting to room '${roomId}'...`);

    liveState = new LiveState({
      url: import.meta.env.PROD
        ? "wss://liveroom.app/client_socket"
        : "ws://localhost:4000/client_socket",
      topic: `liveroom-livestate:${roomId}`,
      params: {
        room_id: roomId,
        user_name: getOwnName(),
        participant_user_name: getParticipantName(),
        referrer: document.referrer,
        current_url: window.location.href,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        language: window.navigator.language,
        user_agent: window.navigator.userAgent,
      },
      socketOptions: import.meta.env.PROD ? { logger: null } : undefined,
    });

    liveState.connect();
    liveState.addEventListener("livestate-change", ({ detail: { state } }) => {
      roomId = state.room_id;
      me = state.me;
      users = state.users;
    });
    dispatch("session_started");
  }

  function getOwnName(): string | null {
    const [email, name] = extractEmailAndNameFromPage();
    console.log(
      `[Liveroom Extension] Admin is user '${name}' (email: '${email}')...`
    );
    return formatFirstName(name);
  }

  function getParticipantName(): string | null {
    const texts = document.querySelectorAll(
      `img[src^="https://lh3.googleusercontent.com/"] + span`
    );
    const text = texts?.[texts.length - 1]?.innerHTML;
    const name = text?.split(" (", 1)?.[0];
    console.log(`[Liveroom Extension] Participant is user '${name}'`);
    return formatFirstName(name);
  }

  function formatFirstName(name: string | null): string | null {
    return name?.split(" ", 1)?.[0];
  }

  function extractEmailAndNameFromPage() {
    const scripts = Array.from(document.getElementsByTagName("script")).filter(
      (script) => script.innerHTML.includes("AF_initDataCallback")
    );

    const script = scripts[scripts.length - 2];
    const text = script?.innerHTML;

    const splits = text?.split(",", 11);
    const raw_email = splits?.[splits.length - 5];
    const raw_name = splits?.[splits.length - 3];

    const email = raw_email?.replace(/\"/g, "");
    const name = raw_name?.replace(/\"/g, "");

    return [email, name];
  }

  function endSession() {
    if (liveState) {
      liveState.disconnect();
      liveState = undefined;
      dispatch("session_ended");
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
    screensharingVideoEl?.removeEventListener("mousemove", handleMouseMove);
    screensharingVideoEl?.removeEventListener("mousedown", handleMouseDown);
    screensharingVideoEl?.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function cleanStyles() {
    if (document.head.contains(selectVideoElStyle)) {
      document.head.removeChild(selectVideoElStyle);
    }
    if (document.head.contains(pointerEventsOnVideoElStyle)) {
      document.head.removeChild(pointerEventsOnVideoElStyle);
    }
  }

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
  const INTERESTING_KEYS = ["Shift"];
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
  function onUserNameUpdated(user_id) {
    return function _onUserNameUpdated(e) {
      if (liveState && me?.id) {
        liveState.dispatchEvent(
          new CustomEvent("user_name_updated", {
            detail: {
              user_name: e.detail.user_name,
              user_id: user_id,
              updated_by_id: me.id,
            },
          })
        );
      }
    };
  }
</script>

<div
  id="liveroom-overlay"
  data-open={open}
  data-started={started}
  data-hasvideoel={!!screensharingVideoEl}
>
  <div class="body">
    {#if !started}
      <button on:click={() => (started = true)}> Start session </button>
    {:else if !screensharingVideoEl}
      <p class="instructions">Click on the screensharing video</p>
      <p class="sub-instructions">
        press <img
          alt="Escape key"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVR4nO1ZPYsUQRAdUVFBRQ3kzs9ITAyMTDX3RFQOA3N/gN6dGPvBgYkbKC4s9PZ7PbMyIiaCqKybiCJGfqAImqgcCip6XuDHeiPF1cAyYLC7N3230g86mOmunnpdr2eqpqMoICAgIGAxwjk3QrJJcoZk5rMB+K7P3t8XCQBnfTvPf7cz/URCJvgBYIzkcOQZJIdJjosP6kv3kQFwT8M7VoqX3fkyoUSavRiLPjNjzFC0wDDGDCmR6a6Nc21GiwTs1Z9ApCQwRIRhj5QCBmkxSGuwpJVl2RKSJ0i+APAbwBTJyUqlsqIjT7ouX2OSvwA8tdYezO3TNN1AEgDeSmYN4D7Jfd6JADitudg7AHWSr/T6ivbf1jksyfM5IWvtNu1vaf9rkncAzGpatMU3kQ8A2s657Tp+LYDPck9XW+qXP865o3IN4ACAUyR3AtilpKdqtdoatb8M4I219rA3InEcr1dH2vLwvOXpdhzHewBc6yiQ2iQfADimi3BE79+cD396NlT9iyNfZZWLrdFobE3TdCmAUQBXAXzpIDUqUSoSSdN0lSyQMWalNyKy0VVas8653erIagDnZMPHcbyD5F0AifS1Wq1lJC/onJO5tEh+FNkV9swhb0T0wcd1zIzW1e/zza2OP9dVfyQyE+KyZ/I3k0RDx3/Kx5J8Uq1Wl3slIrDW7iV5A8BLAA+dcydFUtKXJMkmAJdIPpZ+krc6S1VjzDoAF0k+k1c4ySqAjf34M7+GJYGBCENESgGDtBikVQoYpMX/R1rTauz953UR9Xp9s6Y736JuofmTEBmPFhiYq2N6+4kteVHHscKE5E6RZyRz+ZqUBj97PlYQyOHKwB/0FCLTzI8ZBvLoLSAgICAgKgl/Aeu7ynZWblLrAAAAAElFTkSuQmCC"
        /> to exit
      </p>
    {:else}
      {#if users}
        <div class="users-names-list">
          {#each Object.values(users) as user (user.id)}
            <UserName
              user_name={user.name}
              style="--color: {user.color}"
              on:_user_name_updated={onUserNameUpdated(user.id)}
            />
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
    <PoweredByLiveroom />
  </div>
</div>

{#if screensharingVideoEl && me && users}
  <UsersCursors
    me_id={me.id}
    {users}
    {screensharingVideoEl}
    {screensharingVideoElWidth}
    {screensharingVideoElHeight}
  />
{/if}

<style>
  /* reset */
  p {
    margin: unset;
  }

  #liveroom-overlay {
    z-index: 9999;
    position: absolute;
    bottom: 3.2rem;
    left: 0;
    min-width: 17rem;
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    background-color: rgb(38, 38, 38); /* Tailwind neutral-800 */
    border: 1px solid rgb(82, 82, 82, 0.2); /* Tailwind neutral-600 */
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    overflow: auto;
  }
  #liveroom-overlay[data-open="false"] {
    display: none;
  }
  #liveroom-overlay[data-open="true"] {
    display: flex;
  }
  #liveroom-overlay[data-open="true"][data-started="true"][data-hasvideoel="false"] {
    /* Move the popup down so that it doesn't get it the way of selecting the video element */
    transform: translateY(4rem);
  }

  #liveroom-overlay button {
    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: 1px solid rgb(82, 82, 82); /* Tailwind neutral-600 */
    background-color: rgb(38, 38, 38); /* Tailwind neutral-800 */
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    cursor: pointer;
    transition: color 100ms ease-out, background-color 100ms ease-out,
      border-color 100ms ease-out;
  }
  #liveroom-overlay button:hover {
    border-color: white;
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

  .instructions {
    margin: auto;
    padding: 1.5rem 1rem 0 1rem;
    color: rgb(229, 229, 229); /* Tailwind neutral-200 */
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
  }
  .sub-instructions {
    margin: auto;
    padding: 1rem 1rem 1.5rem 1rem;
    color: rgb(163, 163, 163); /* Tailwind neutral-400 */
    font-size: 1em;
    font-weight: 400;
    text-align: center;
  }
  .sub-instructions img {
    margin-bottom: -0.8rem;
    width: 2rem;
    color: white;
    color: white;
  }

  .users-names-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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

  .end-session-button:hover {
    color: rgb(239, 68, 68) !important; /* Tailwind red-500 */
    background-color: rgb(220, 38, 38, 0.1) !important; /* Tailwind red-600 */
    border-color: rgb(220, 38, 38, 0.3) !important; /* Tailwind red-600 */
  }
</style>
