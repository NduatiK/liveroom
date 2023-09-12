<script lang="ts">
  export let label: string;
  export let isPressed: boolean = false;
</script>

<kbd data-ispressed={isPressed}>{label}</kbd>

<style>
  kbd {
    font-size: 0.5rem;
    font-weight: 600;
    color: rgb(163, 163, 163, 0.5); /* Tailwind neutral-400 */
    padding: 0.1rem 0.2rem;
    border: 0.5px solid rgb(163, 163, 163, 0.2); /* Tailwind neutral-400 */
    border-radius: 4px;
  }

  kbd[data-ispressed="true"] {
    color: rgb(163, 163, 163, 0.7); /* Tailwind neutral-400 */
    background-color: rgb(115, 115, 115, 0.1); /* Tailwind neutral-500 */
  }
</style>
