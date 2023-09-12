<script lang="ts">
  export let label: string;
  export let labelCopied: string = "Copied!";
  export let textToCopy: string;

  let copied = false;
  let timeout: number | undefined;

  $: if (copied && !timeout) {
    timeout = setTimeout(() => {
      copied = false;
      timeout = undefined;
    }, 4000);
  }

  function onClick() {
    if (copied) return;

    // NOTE: Note to Chrome Web Store reviewers - this code is NOT executed by the Chrome extension,
    //       so no remote code execution is possible. It is only used to generate the installation code,
    //       copied to the user clipboard, to send it to his interlocutor.
    navigator.clipboard.writeText(textToCopy);

    copied = true;
  }
</script>

<button on:click={onClick} disabled={copied} data-copied={copied}>
  {#if !copied}
    <svg
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
      />
    </svg>

    <span>{label}</span>
  {:else}
    <svg
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
      />
    </svg>

    <span>{labelCopied}</span>
  {/if}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem;
    color: rgb(250, 250, 250); /* Tailwind neutral-50 */
    background-color: rgb(38, 38, 38); /* Tailwind neutral-800 */
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: color 100ms ease-out, background-color 100ms ease-out;
  }
  button:hover {
    background-color: rgb(64, 64, 64, 0.8); /* Tailwind neutral-700 */
  }
  button[data-copied="true"] {
    width: fit-content;
    cursor: auto;
  }
  button[data-copied="true"]:hover {
    background-color: transparent;
  }

  button svg {
    color: rgb(250, 250, 250, 0.6); /* Tailwind neutral-50 */
  }
</style>
