<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { User } from "../types/User";

  // mandatory
  export let user_name: User["name"];
  // optional
  export let hide: boolean = false;
  export let style: string = "";

  let text = user_name;
  let is_editing = false;

  const dispatch = createEventDispatcher();

  function handleInput(event: Event & { currentTarget: HTMLElement }) {
    if (event.currentTarget?.textContent)
      text = event.currentTarget.textContent;

    if (text !== user_name && text != null && text != "") {
      dispatch("_user_name_updated", { user_name: text });
      user_name = text;
    }
  }
  function preventNewLines(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
</script>

<p
  class="user-name"
  data-hide={hide}
  {style}
  contenteditable="true"
  on:focus={() => {
    is_editing = true;
    text = user_name;
  }}
  on:blur={() => {
    is_editing = false;
    user_name = text;
  }}
  on:input={handleInput}
  on:keydown={preventNewLines}
>
  {#if is_editing}
    {text}
  {:else}
    {user_name}
  {/if}
</p>

<style>
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
  .user-name[data-hide="true"] {
    display: none;
  }
</style>
