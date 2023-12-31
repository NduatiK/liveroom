<svelte:options customElement="liveroom-client-element" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { LiveState } from "phx-live-state";
  import {
    createBlockClickMouseStyle,
    createBlockClickPointerEventsStyle,
  } from "./stylesheets";
  import type { User } from "./types/User";

  export let version: string | undefined;
  export let url: string;
  export let room_id: string;
  export let user_name: string | undefined = undefined;

  let liveState: LiveState;
  let isClickBlocked: boolean = false;

  let blockClickMouseStyle = createBlockClickMouseStyle();
  let blockClickPointerEventsStyle = createBlockClickPointerEventsStyle();

  let me: User<"client">;
  let users: { [key: User["id"]]: User };

  // computed
  let users_count: number;
  $: users_count = Object.keys(users || {}).length;

  // TODO: check perfs of such thing, how often it is run?
  $: if (
    !isClickBlocked &&
    users &&
    Object.values(users).some((u) => u.type == "admin" && u.is_space_key_down)
  ) {
    enableBlockClick();
  }
  $: if (
    isClickBlocked &&
    users &&
    Object.values(users)
      .filter((u) => u.type == "admin")
      .every((u) => !u.is_space_key_down)
  ) {
    disableBlockClick();
  }

  onMount(async () => {
    console.log(`[Liveroom] Starting... (v${version})`);

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

    // set user name
    const param_user_name = params.get("_liveroom_user_name");
    if (param_user_name) user_name = param_user_name;

    // start LiveState session
    startSession();
  });

  onDestroy(() => {
    endSession();
    disableBlockClick();
  });

  // HELPERS

  function startSession() {
    // Setup LiveState
    liveState = new LiveState({
      url,
      topic: `liveroom-livestate:${room_id}`,
      params: {
        room_id,
        user_name,
        referrer: document.referrer,
        current_url: window.location.href,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        language: window.navigator.language,
        user_agent: window.navigator.userAgent,
      },
      socketOptions: import.meta.env.PROD ? { logger: null } : undefined,
    });

    liveState.addEventListener(
      "wheel-from-another-user",
      ({
        detail: { delta_x, delta_y, x, y },
      }: {
        detail: {
          from_user_id: string;
          from_user_color: string;
          delta_x: string;
          delta_y: string;
          x: string;
          y: string;
        };
      }) => {
        const delta_x_int = parseInt(delta_x);
        const delta_y_int = parseInt(delta_y);

        const ev = new WheelEvent("wheel", {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: (window.innerWidth * parseFloat(x)) / 100,
          clientY: (window.innerHeight * parseFloat(y)) / 100,
          deltaX: delta_x_int,
          deltaY: delta_y_int,
          deltaMode: 0,
        });

        // NOTE: elementFromPoint() is not working correctly if pointer-events is set to none.
        //       So we remove it temporarly if set, and set it back after the function call.

        const pointerEventsNoneIsSet = document.head.contains(
          blockClickPointerEventsStyle
        );

        if (pointerEventsNoneIsSet) {
          document.head.removeChild(blockClickPointerEventsStyle);
        }

        const wheeledEl = document.elementFromPoint(ev.clientX, ev.clientY);

        if (pointerEventsNoneIsSet) {
          document.head.appendChild(blockClickPointerEventsStyle);
        }

        // NOTE: Not sure it is needed, but keeping it for now.
        if (
          wheeledEl instanceof HTMLElement ||
          wheeledEl instanceof SVGElement
        ) {
          // wheeledEl.dispatchEvent(ev);

          // NOTE: We have to prioritize scrolling over 1 single direction
          //       else with the trackpad it gets glitchy when scrolling horizontally a container
          //       it also scrolls vertically the window, which is weird.
          if (Math.abs(delta_y_int) >= Math.abs(delta_x_int)) {
            const verticalTarget = findScrollTarget(wheeledEl, "vertical");
            verticalTarget.scrollBy(0, delta_y_int);
          } else {
            const horizontalTarget = findScrollTarget(wheeledEl, "horizontal");
            horizontalTarget.scrollBy(delta_x_int, 0);
          }
        }
      }
    );
    liveState.addEventListener(
      "click-from-another-user",
      ({
        detail: { x, y },
      }: {
        detail: {
          from_user_id: string;
          from_user_color: string;
          x: string;
          y: string;
        };
      }) => {
        const ev = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: (window.innerWidth * parseFloat(x)) / 100,
          clientY: (window.innerHeight * parseFloat(y)) / 100,
        });
        // NOTE: elementFromPoint() is not working correctly if pointer-events is set to none.
        //       So we remove it temporarly if set, and set it back after the function call.

        const pointerEventsNoneIsSet = document.head.contains(
          blockClickPointerEventsStyle
        );

        if (pointerEventsNoneIsSet) {
          document.head.removeChild(blockClickPointerEventsStyle);
        }

        const clickedEl = document.elementFromPoint(ev.clientX, ev.clientY);

        if (pointerEventsNoneIsSet) {
          document.head.appendChild(blockClickPointerEventsStyle);
        }

        // NOTE: Not sure it is needed, but keeping it for now.
        if (
          clickedEl instanceof HTMLElement ||
          clickedEl instanceof SVGElement
        ) {
          clickedEl.dispatchEvent(ev);
        }
      }
    );
    liveState.addEventListener(
      "livestate-change",
      ({ detail: { state } }: { detail: { state: State } }) => {
        room_id = state.room_id;
        me = state.me;
        users = state.users;
      }
    );
    liveState.connect();

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

  function enableBlockClick() {
    document.head.appendChild(blockClickMouseStyle);
    document.head.appendChild(blockClickPointerEventsStyle);
    isClickBlocked = true;
  }
  function disableBlockClick() {
    document.head.removeChild(blockClickMouseStyle);
    document.head.removeChild(blockClickPointerEventsStyle);
    isClickBlocked = false;
  }

  function findScrollTarget(
    el: HTMLElement | SVGElement,
    direction: "vertical" | "horizontal"
  ): Window | HTMLElement | SVGElement {
    if (el.tagName === "BODY") return window;
    if (
      (direction === "vertical" && el.scrollHeight > el.clientHeight) ||
      (direction === "horizontal" && el.scrollWidth > el.clientWidth)
    ) {
      return el;
    }
    if (el.parentElement) {
      return findScrollTarget(el.parentElement, direction);
    }
    return window;
  }

  // Types

  type State = {
    room_id: string;
    me: User<"client">;
    users: { [key: User["id"]]: User };
  };
</script>

<div id="liveroom-client-element">
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
          <!-- NOTE: Show halo if user not alone in room and:
                       - user is self: shift key is down
                       - user is not self: shift key is down or mouse is down -->
          <div
            class="halo"
            data-show={((user.id == me.id && user.is_shift_key_down) ||
              (user.id != me.id &&
                (user.is_shift_key_down || user.is_mouse_down))) &&
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
    transition: transform 100ms linear;
    will-change: transform;
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
    padding: 0.25rem 0.7rem;
    font-size: 0.8rem;
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
    transition: transform 100ms ease-out;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* Tailwind 'shadow-sm' */
  }
  .user .halo[data-show="true"] {
    transform: scale(1);
  }
</style>
