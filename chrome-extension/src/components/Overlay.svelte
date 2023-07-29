<script lang="ts">
  import { onDestroy } from "svelte";

  let started = false;

  let mouseMoveCompatibleStyle = document.createElement("style");
  mouseMoveCompatibleStyle.textContent = `
    video {
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
    }
    [jsaction^="mousedown:"] {
      /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our mouse move listener on the video element */
      pointer-events: none !important;
    }
  `;

  let selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
    #overlay, #overlay * {
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

  let resizeObserver: ResizeObserver;

  let screensharingVideoEl: HTMLVideoElement;
  let screensharingVideoElWidth: number;
  let screensharingVideoElHeight: number;

  let mouseX: number;
  let mouseY: number;

  // Observe the screensharing video element dimensions
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

  // Observe the mouse coordinates
  $: if (screensharingVideoEl) {
    document.head.appendChild(mouseMoveCompatibleStyle);
    screensharingVideoEl.addEventListener("mousemove", handleMouseMove);
  } else {
    if (mouseMoveCompatibleStyle.parentNode === document.head) {
      document.head.removeChild(mouseMoveCompatibleStyle);
    }
  }

  // LIFECYCLE

  onDestroy(() => {
    resizeObserver?.disconnect();
    screensharingVideoEl?.removeEventListener("mousemove", handleMouseMove);
    if (selectVideoElStyle.parentNode === document.head) {
      document.head.removeChild(selectVideoElStyle);
    }
    if (mouseMoveCompatibleStyle.parentNode === document.head) {
      document.head.removeChild(mouseMoveCompatibleStyle);
    }
  });

  // HELPERS

  function handleMouseMove(e) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
</script>

<div id="overlay">
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

  {#if screensharingVideoEl}
    <p>
      Screensharing dimensions:
      <b>{screensharingVideoElWidth}x{screensharingVideoElHeight}</b>
    </p>
    <p>
      Mouse coordinates:
      <b>{mouseX}, {mouseY}</b>
    </p>
  {/if}
</div>

<style>
  #overlay {
    z-index: 9999;
    position: fixed;
    top: 80px;
    left: 16px;
    /* min-height: 200px;
    max-height: 800px;
    min-width: 150px;
    max-width: 600px; */
    background-color: lightgray;
    border-radius: 4px;
    padding: 12px;
    /* overflow: auto; */
    /* resize: both; */
  }
</style>
