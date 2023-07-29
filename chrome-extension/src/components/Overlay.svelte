<script lang="ts">
  import { onDestroy } from "svelte";

  let started = false;

  let selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
          .overlay, .overlay * {
            visibility: visible !important;
          }
          video {
            visibility: visible !important;
            /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
            pointer-events: auto !important;
            cursor: pointer;
          }
          /* NOTE: Unfortunately, we can't add a pseudo-element to the video element itself, so we add it to its parent */
          *:has(> video) {
            position: relative;
          }
          *:has(> video)::before {
            visibility: visible !important;
            z-index: 9999;
            opacity: 0;
            content: "";
            position: absolute;
            inset: 0;
            outline: 2px solid white;
            background-color: white;
            transition: opacity 0.1s ease-out;
          }
          *:has(> video:hover)::before {
            opacity: 0.5;
          }
          /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our video element hover */
          [jsaction] {
          /* [jsaction*="mousedown"] { */
            pointer-events: none !important;
          }
          body *:not(video) {
            visibility: hidden !important;
          }
          body {
            /* NOTE: Default dark background on Google Meet */
            background-color: #202124 !important;
          }
        `;

  let resizeObserver;
  let selectVideoElListener;

  let screensharingVideoEl;
  let screensharingVideoElWidth;
  let screensharingVideoElHeight;

  $: if (screensharingVideoEl) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        screensharingVideoElWidth = width;
        screensharingVideoElHeight = height;
      }
    });
    resizeObserver.observe(screensharingVideoEl);
  } else if (resizeObserver) {
    resizeObserver.disconnect();
  }

  onDestroy(() => {
    resizeObserver?.disconnect();
  });
</script>

<div class="overlay">
  {#if !started}
    <button
      on:click={() => {
        started = true;

        const videoEls = Array.from(document.querySelectorAll("video"));
        console.log("videoEls", videoEls);

        function handleVideoClick(e) {
          screensharingVideoEl = e.target;
          document.head.removeChild(selectVideoElStyle);
          // clean all click event listeners
          videoEls.forEach((videoEl) => {
            videoEl.removeEventListener("click", handleVideoClick);
          });
        }

        videoEls.forEach((videoEl) => {
          videoEl.addEventListener("click", handleVideoClick);
        });

        document.head.appendChild(selectVideoElStyle);
      }}
    >
      Select screensharing video
    </button>
  {/if}

  {#if started && !screensharingVideoEl}
    <p>Click on the screensharing video</p>
  {/if}

  {#if screensharingVideoElWidth && screensharingVideoElHeight}
    <p>
      Screensharing dimensions: {screensharingVideoElWidth}x{screensharingVideoElHeight}
    </p>
  {/if}
</div>

<style>
  .overlay {
    z-index: 9999;
    position: fixed;
    top: 16px;
    left: 16px;
    background-color: white;
    border: 1px solid black;
    padding: 4px;
  }
</style>
