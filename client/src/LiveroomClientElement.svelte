<svelte:options customElement="liveroom-client-element" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { LiveState } from "phx-live-state";
  import type { User } from "./types/User";

  export let url: string;
  export let room_id: string;

  let thisEl: HTMLElement;
  let liveState: LiveState;

  let me: User<"client">;
  let users: { [key: User["id"]]: User };

  // computed
  let users_count: number;
  $: users_count = Object.keys(users || {}).length;

  onMount(async () => {
    // NOTE: room_id is read from url query param '_liveroom' if present,
    //       else from html custom element attribute 'room_id'
    const params = new URLSearchParams(window.location.search);
    const param = params.get("_liveroom");
    // can be either the google meet id or the full url
    const room_id_or_pathname = param?.split("https://meet.google.com/");
    let room_id_from_url = room_id_or_pathname?.[0];
    const is_pathname = !!room_id_or_pathname?.[1];
    if (is_pathname) {
      // just in case there are query params in the google meet url
      room_id_from_url = room_id_or_pathname[1].split("?")[0];
    }

    room_id = room_id_from_url || room_id;

    // start LiveState session
    startSession();
  });

  onDestroy(() => {
    endSession();
  });

  // HELPERS

  function startSession() {
    // Setup LiveState
    liveState = new LiveState({
      url,
      topic: `liveroom-livestate:${room_id}`,
      params: {
        room_id,
        current_url: window.origin,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
      },
    });
    liveState.connect();
    liveState.addEventListener(
      "livestate-change",
      ({ detail: { state } }: { detail: { state: State } }) => {
        room_id = state.room_id;
        me = state.me;
        users = state.users;
      }
    );

    // Setup event listeners
    // window.addEventListener('mousemove', throttledDispatchMouseMove);
    window.addEventListener("mousemove", dispatchMouseMove);
    window.addEventListener("mousedown", dispatchMouseDown);
    window.addEventListener("mouseup", dispatchMouseUp);
    window.addEventListener("keydown", dispatchKeyDown);
    window.addEventListener("keyup", dispatchKeyUp);
    window.addEventListener("resize", dispatchWindowResize);
  }

  function endSession() {
    // Remove event listeners
    window.removeEventListener("resize", dispatchWindowResize);
    window.removeEventListener("keyup", dispatchKeyUp);
    window.removeEventListener("keydown", dispatchKeyDown);
    window.removeEventListener("mouseup", dispatchMouseUp);
    window.removeEventListener("mousedown", dispatchMouseDown);
    // window.removeEventListener('mousemove', throttledDispatchMouseMove);
    window.removeEventListener("mousemove", dispatchMouseMove);

    // Disconnect LiveState
    liveState?.disconnect();
  }

  function dispatchMouseMove(e: MouseEvent) {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_move", {
          detail: {
            user_id: me.id,
            x: Number((e.clientX / window.innerWidth) * 100).toFixed(2), // in %
            y: Number((e.clientY / window.innerHeight) * 100).toFixed(2), // in %
          },
        })
      );
    }
  }
  function dispatchMouseDown() {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_down", {
          detail: {
            user_id: me.id,
          },
        })
      );
    }
  }
  function dispatchMouseUp() {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_up", {
          detail: {
            user_id: me.id,
          },
        })
      );
    }
  }

  const INTERESTING_KEYS = ["Shift"];

  function dispatchKeyDown(e: KeyboardEvent) {
    // NOTE: To avoid sending multiple keydown events when a key is held down.
    const firstTimeKeyIsPressed = !e.repeat;

    if (
      firstTimeKeyIsPressed &&
      INTERESTING_KEYS.includes(e.key) &&
      liveState &&
      me?.id
    ) {
      liveState.dispatchEvent(
        new CustomEvent("key_down", {
          detail: {
            key: e.key,
            user_id: me.id,
          },
        })
      );
    }
  }
  function dispatchKeyUp(e: KeyboardEvent) {
    if (INTERESTING_KEYS.includes(e.key) && liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("key_up", {
          detail: {
            key: e.key,
            user_id: me.id,
          },
        })
      );
    }
  }
  function dispatchWindowResize() {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("window_resize", {
          detail: {
            inner_width: window.innerWidth,
            inner_height: window.innerHeight,
            user_id: me.id,
          },
        })
      );
    }
  }

  // function throttledDispatchMouseMove() {
  // 	return throttle(
  // 		dispatchMouseMove,
  // 		// 15 // 15ms throttle interval = ~66.6 fps
  // 		// 10 // 10ms throttle interval = 100 fps
  // 		8 // 8ms throttle interval = 125 fps
  // 	);
  // }

  // function throttle(func: (...args: any[]) => any, limit: number) {
  // 	let lastCall = 0;
  // 	return function (...args: any[]) {
  // 		let now = Date.now();
  // 		if (now - lastCall > limit) {
  // 			lastCall = now;
  // 			// @ts-ignore
  // 			return func.apply(this, args);
  // 		}
  // 	};
  // }

  // Types

  type State = {
    room_id: string;
    me: User<"client">;
    users: { [key: User["id"]]: User };
  };
</script>

<div id="liveroom-client-element" bind:this={thisEl}>
  {#if me && users}
    <div id="users-container">
      {#each Object.values(users) as user (user.id)}
        <div
          id="user-{user.id}"
          class="user"
          data-isself={user.id == me.id}
          style="
          --color: {user.color};
          --x: {parseFloat(user.x)}vw;
          --y: {parseFloat(user.y)}vh;
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
          <div
            class="halo"
            data-show={/* user is activating the halo */
            (user.is_mouse_down || user.is_shift_key_down) &&
              /* user is not alone */
              users_count > 1}
          />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  #liveroom-client-element {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  #users-container {
    z-index: 99999;
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .user {
    z-index: 10;
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
  .user .user-name {
    position: absolute;
    top: 20px;
    left: 16px;
  }
  .user[data-isself="true"] .user-name {
    display: none;
  }

  .user .halo {
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
    /* Tailwind 'shadow-sm' */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
  .user .halo[data-show="true"] {
    transform: scale(1);
  }
</style>
