// NOTE: Those are split in 2, because when a click from another user comes in,
//       we use elementFromPoint() to get the element that was clicked on.
//       However, elementFromPoint() does not work on elements that have pointer-events: none.
//       So we need to remove pointer-events: none, and then add it back after we're done.

export function createBlockClickMouseStyle() {
  const blockClickMouseStyle = document.createElement("style");
  blockClickMouseStyle.textContent = `
    * {
      cursor: crosshair !important;
    }
  `;

  return blockClickMouseStyle;
}

export function createBlockClickPointerEventsStyle() {
  const blockClickPointerEventsStyle = document.createElement("style");
  blockClickPointerEventsStyle.textContent = `
    * {
      pointer-events: none !important;
      user-select: none !important;
    }
  `;

  return blockClickPointerEventsStyle;
}
