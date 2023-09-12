<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import Kbd from "./Kbd.svelte";

  export let label: string;
  export let keyHint: string | null = null;
  export let checked: boolean = false;

  export let handleChange: ChangeEventHandler<HTMLInputElement> = () => {};
</script>

<label>
  <div class="label-container">
    <span>{label}</span>

    {#if keyHint}
      <Kbd label={keyHint} />
      <!-- <Kbd label={keyHint} isPressed={checked} /> -->
    {/if}
  </div>

  <input type="checkbox" bind:checked on:change={handleChange} />
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: rgb(250, 250, 250); /* Tailwind neutral-50 */
    font-weight: 600;
    font-size: 0.8rem;
  }

  .label-container {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  input {
    cursor: pointer;
    appearance: none;
    border: none;
    margin: 0;
    position: relative;
    transition: all 100ms ease-out;
    width: 2rem;
    height: 1.2rem;
    background-color: rgb(82, 82, 82); /* Tailwind neutral-600 */
    border-radius: 9999px;
  }
  input:hover {
    background-color: rgb(115, 115, 115); /* Tailwind neutral-500 */
  }
  input::before {
    content: "";
    position: absolute;
    inset: -0.25rem;
  }
  input::after {
    content: "";
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    background-color: rgb(250, 250, 250); /* Tailwind neutral-50 */
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    transition: all 100ms ease-out;
  }
  input:checked {
    background-color: rgb(79, 70, 229); /* Tailwind indigo-600 */
  }
  input:checked:hover {
    background-color: rgb(99, 102, 241); /* Tailwind indigo-500 */
  }
  input:checked::after {
    transform: translateX(0.8rem);
  }
</style>
