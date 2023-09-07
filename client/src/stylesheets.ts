export function createBlockClickStyle() {
  const blockClickStyle = document.createElement("style");
  blockClickStyle.textContent = `
    * {
      cursor: crosshair !important;
      pointer-events: none !important;
    }
  `;

  return blockClickStyle;
}
