<script lang="ts">
  import LiveroomLogoSvg from "./LiveroomLogoSvg.svelte";
</script>

<p class="powered-by">
  powered by <a href="https://liveroom.app" target="_blank">
    <LiveroomLogoSvg height="10" width="10" color="currentColor" />
    <span>Liveroom</span>
  </a>
</p>

<style>
  .powered-by {
    display: flex;
    align-items: center;
    margin: unset;
    font-size: 0.6rem;
    color: rgb(163, 163, 163, 0.7); /* Tailwind neutral-400 */
  }

  .powered-by a {
    display: flex;
    align-items: center;
    gap: 0.1em;
    margin-left: 0.4em;
    color: rgb(163, 163, 163, 0.7); /* Tailwind neutral-400 */
    font-weight: 500;
    transition: color 100ms ease-out;
    text-decoration: none;
  }
  .powered-by a:hover {
    color: rgb(163, 163, 163); /* Tailwind neutral-400 */
  }
</style>
