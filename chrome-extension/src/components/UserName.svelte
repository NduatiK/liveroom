<script lang="ts">
  import type { User } from "../types/User";

  // mandatory
  export let user_name: User["name"];
  // optional
  export let hide: boolean = false;
  export let style: string = "";
</script>

<span class="user-name" data-hide={hide} {style}> {user_name}</span>

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
