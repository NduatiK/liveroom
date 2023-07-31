<script lang="ts">
  import LiveroomLogoSvg from "./LiveroomLogoSvg.svelte";
  import Overlay from "./Overlay.svelte";

  let open = false;
</script>

<div id="liveroom-main">
  <button class="toggle-btn" on:click={() => (open = !open)}>
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
      <LiveroomLogoSvg height="1.5rem" width="1.5rem" />
    {/if}
  </button>

  <Overlay bind:open />
</div>

<style>
  #liveroom-main {
    z-index: 10; /* else is below */
    position: fixed;
    top: 16px;
    left: 16px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .toggle-btn {
    background-color: #ffffff;
    border: 1px solid rgb(82, 82, 82, 0.2); /* Tailwind neutral-600 */
    border-radius: 100%;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    cursor: pointer;
    transition: border-color 0.1s ease-out;
  }
  .toggle-btn:hover {
    border-color: rgb(82, 82, 82, 0.5); /* Tailwind neutral-600 */
  }

  .toggle-btn .svg-close {
    height: 2rem;
    width: 2rem;
    color: #a3a3a3; /* Tailwind neutral-400 */
    transition: color 0.1s ease-out;
  }
  .toggle-btn:hover .svg-close {
    color: rgb(82, 82, 82); /* Tailwind neutral-600 */
  }
</style>
