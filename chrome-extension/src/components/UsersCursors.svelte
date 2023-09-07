<script lang="ts">
  import type { User } from "../types/User";
  import UserName from "./UserName.svelte";

  export let me_id: string;
  export let users: { [key: User["id"]]: User };
  export let screensharingVideoEl: HTMLVideoElement | undefined;
  export let screensharingVideoElWidth: number | undefined;
  export let screensharingVideoElHeight: number | undefined;

  function placeCursorsContainerNextToScreensharingVideoEl(
    cursorsContainerEl: HTMLElement
  ) {
    if (screensharingVideoEl?.parentElement) {
      screensharingVideoEl.parentElement.style.position = "relative";
      screensharingVideoEl.parentElement.appendChild(cursorsContainerEl);
    }
    return {
      destroy() {
        if (screensharingVideoEl?.parentElement) {
          screensharingVideoEl.parentElement.style.position = "";
          if (screensharingVideoEl.parentElement.contains(cursorsContainerEl)) {
            screensharingVideoEl.parentElement.removeChild(cursorsContainerEl);
          }
        }
      },
    };
  }
</script>

<div id="users-container" use:placeCursorsContainerNextToScreensharingVideoEl>
  {#each Object.values(users) as user (user.id)}
    <div
      id="user-{user.id}"
      class="user"
      data-isself={user.id == me_id}
      data-isclickblocked={users[me_id].is_space_key_down}
      style="
          --color: {user.color};
          --x: {(screensharingVideoElWidth &&
        (parseFloat(user.x) / 100) * screensharingVideoElWidth) ||
        0}px;
          --y: {(screensharingVideoElHeight &&
        (parseFloat(user.y) / 100) * screensharingVideoElHeight) ||
        0}px;
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
      <UserName
        user_name={user.name}
        hide={user.id == me_id}
        style="position: absolute; top: 20px; left: 16px"
      />
      <div
        class="halo-small"
        data-show={user.id != me_id && user.is_mouse_down}
      />
    </div>
  {/each}
</div>

<style>
  #users-container {
    position: absolute;
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
    transform: translate(var(--x), var(--y)) scale(0.9);
  }
  .user[data-isclickblocked="true"] {
    opacity: 0.4;
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

  .user .halo-small {
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
    transition: transform 500ms ease-out;
    /* Tailwind 'shadow-sm' */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
  .user .halo-small[data-show="true"] {
    transform: scale(1);
  }
</style>
