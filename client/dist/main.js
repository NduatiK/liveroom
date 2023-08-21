let r, t;
l();
m();
const i = "liveroom-client-element";
async function l() {
  const o = new URLSearchParams(window.location.search).get("_liveroom"), e = (
    // prod
    document.querySelector("script[src*='liveroom-client-element.js']") || // local dev
    document.querySelector("script[src*='client/dist/main.js']")
  ), s = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", a = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, n = o || a;
  n && n != r && (r = n, t && (t.remove(), t = void 0), await u(s, r));
}
function m() {
  window.addEventListener("popstate", l);
}
async function u(c, o) {
  if (!o)
    return !1;
  await import("./liveroom-client-element.js"), console.log("[Liveroom] Installed successfully");
  const e = document.getElementsByTagName("body")[0];
  return t = document.createElement(i), t.setAttribute("url", c), o && t.setAttribute("room_id", o), e.appendChild(t), console.log("[Liveroom] Injected successfully"), !0;
}
