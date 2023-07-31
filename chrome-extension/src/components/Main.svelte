<script lang="ts">
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
      <svg
        class="svg-liveroom-logo"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.8678 0.0593359L0.710725 8.05957H0.679164C0.479467 8.13153 0.30747 8.25952 0.18622 8.42653C0.0648571 8.59354 -8.24167e-05 8.79166 -8.24167e-05 8.99459C-8.24167e-05 9.19751 0.0648571 9.39564 0.18622 9.56265C0.30747 9.72966 0.479467 9.85765 0.679164 9.92962L10.7841 13.7698L14.826 23.37C14.904 23.5561 15.039 23.7156 15.2136 23.828C15.3881 23.9402 15.5941 24.0002 15.8049 24C16.0213 24 16.2323 23.9365 16.4093 23.8184C16.5864 23.7004 16.7208 23.5332 16.7944 23.34L25.2151 1.33937C25.283 1.16076 25.2958 0.967504 25.2523 0.782189C25.2088 0.596873 25.1106 0.427163 24.9693 0.292901C24.828 0.158639 24.6493 0.0653762 24.4543 0.0240151C24.2592 -0.0173461 24.0558 -0.00509504 23.8678 0.0593359Z"
          fill="#4F46E5"
        />
      </svg>
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

  .toggle-btn .svg-liveroom-logo {
    height: 1.5rem;
    width: 1.5rem;
    /* TODO: svg is not centered in viewbox... */
    margin-top: 7px;
    margin-left: 2px;
  }
</style>
