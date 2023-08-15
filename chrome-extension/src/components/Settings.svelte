<script lang="ts">
  import PoweredByLiveroom from "./PoweredByLiveroom.svelte";
</script>

<div class="container">
  <div class="body">
    <h1>Settings</h1>
    <p>There is nothing to see for now</p>
  </div>

  <div class="footer">
    <PoweredByLiveroom />
  </div>
</div>

<style>
  .container {
    min-height: 150px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 1rem 0 1rem;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .body h1 {
    color: rgb(82, 82, 82); /* Tailwind neutral-600 */
    font-size: 1rem;
    font-weight: 600;
  }

  .body p {
    color: rgb(163, 163, 163); /* Tailwind neutral-400 */
    font-size: 0.8rem;
    font-weight: 400;
  }

  .footer {
    display: flex;
    justify-content: center;
    padding: 0.3rem;
  }
</style>
