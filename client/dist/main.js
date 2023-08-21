let r, t;
s();
m();
const a = "liveroom-client-element";
async function s() {
  const o = new URLSearchParams(window.location.search).get("_liveroom"), e = (
    // prod
    document.querySelector("script[src*='/liveroom-client-element']") || // local dev
    document.querySelector("script[src*='/client/dist/main.js']") || document.querySelector("script[src='/src/main.ts']")
  ), l = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", i = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, n = o || i;
  n && n != r && (r = n, t && (t.remove(), t = void 0), await u(l, r));
}
function m() {
  window.addEventListener("popstate", s);
}
async function u(c, o) {
  if (!o)
    return !1;
  await import("./liveroom-client-element.js"), console.log("[Liveroom] Installed successfully");
  const e = document.getElementsByTagName("body")[0];
  return t = document.createElement(a), t.setAttribute("url", c), o && t.setAttribute("room_id", o), e.appendChild(t), console.log("[Liveroom] Injected successfully"), !0;
}
