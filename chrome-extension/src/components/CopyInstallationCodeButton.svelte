<script lang="ts">
  export let url: string;
  export let roomId: string;

  let copied = false;
  let timeout: number;

  $: if (copied && !timeout) {
    timeout = setTimeout(() => {
      copied = false;
      timeout = undefined;
    }, 4000);
  }

  const SCRIPT_SRC =
    process.env.NODE_ENV === "production"
      ? "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.10"
      : "http://localhost:5173/src/main.ts";

  const SCRIPT = `
const script = document.createElement("script");
script.type = "module";
script.src = "${SCRIPT_SRC}";
script.setAttribute("data-url", "${url}");
script.setAttribute("data-roomid", "${roomId}");
document.head.appendChild(script);
`;
</script>

<button
  on:click={() => {
    if (copied) return;
    navigator.clipboard.writeText(SCRIPT);
    copied = true;
  }}
  disabled={copied}
  data-copied={copied}
>
  {#if !copied}
    <svg
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
        clip-rule="evenodd"
      />
    </svg>

    <span>Copy installation code</span>
  {:else}
    <svg
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M18 5.25a2.25 2.25 0 00-2.012-2.238A2.25 2.25 0 0013.75 1h-1.5a2.25 2.25 0 00-2.238 2.012c-.875.092-1.6.686-1.884 1.488H11A2.5 2.5 0 0113.5 7v7h2.25A2.25 2.25 0 0018 11.75v-6.5zM12.25 2.5a.75.75 0 00-.75.75v.25h3v-.25a.75.75 0 00-.75-.75h-1.5z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M3 6a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1H3zm6.874 4.166a.75.75 0 10-1.248-.832l-2.493 3.739-.853-.853a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.154-.114l3-4.5z"
        clip-rule="evenodd"
      />
    </svg>

    <span>Copied!</span>
  {/if}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem;
    color: white;
    background-color: rgb(38, 38, 38); /* Tailwind neutral-800 */
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: color 100ms ease-out, background-color 100ms ease-out;
  }
  button:hover {
    background-color: rgb(64, 64, 64); /* Tailwind neutral-700 */
  }
  button[data-copied="true"] {
    width: fit-content;
    cursor: auto;
  }
  button[data-copied="true"]:hover {
    background-color: transparent;
  }

  button svg {
    color: rgb(245, 245, 245); /* Tailwind neutral-100 */
  }
</style>
