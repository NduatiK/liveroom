export function installationCode(
  url: string | undefined,
  roomId: string | undefined,
): string {
  return `
const script = document.createElement("script");
script.type = "module";
script.src = "${SRC}";
script.setAttribute("data-url", "${url}");
script.setAttribute("data-roomid", "${roomId}");
document.head.appendChild(script);
`;
}

const SRC = import.meta.env.PROD
  ? "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.25/dist/main.min.js"
  : "http://localhost:5173/src/main.ts";
