export function createPointerEventsOnVideoElStyle() {
  const pointerEventsOnVideoElStyle = document.createElement("style");
  pointerEventsOnVideoElStyle.textContent = `
  *[data-isliveroomscreensharing="true"] video {
    /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
    pointer-events: auto !important;
  }
  *[data-isliveroomscreensharing="true"] *[jsaction^="mousedown:"]  {
    /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our mouse move listener on the video element */
    pointer-events: none !important;
  }
  `;
  return pointerEventsOnVideoElStyle;
}

export function createSelectVideoElStyle() {
  const selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
    #liveroom-overlay, #liveroom-overlay * {
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
      /* Tailwind indigo-600 */
      outline: 2px solid #4f46e5;
      background-color: #4f46e5;
      transition: opacity 100ms ease-out;
    }
    *:has(> video:hover)::before {
      opacity: 0.8;
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

  return selectVideoElStyle;
}
