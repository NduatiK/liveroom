let c, t, e = null;
s();
a();
const m = "liveroom-client-element";
async function s() {
  const o = new URLSearchParams(window.location.search).get("_liveroom");
  e = // prod
  document.querySelector("script[src*='/liveroom-client-element']") || // local dev
  document.querySelector("script[src*='/client/dist/main.js']") || document.querySelector("script[src='/src/main.ts']");
  const r = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", n = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, l = o || n;
  l && l != c && (c = l, t && (t.remove(), t = void 0), await u(r, c));
}
function a() {
  window.addEventListener("popstate", s);
}
async function u(i, o) {
  var n;
  if (!o)
    return !1;
  await ((n = e == null ? void 0 : e.getAttribute("src")) != null && n.startsWith(
    "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.15"
  ) ? import("https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.15/dist/liveroom-client-element.min.js") : import("./liveroom-client-element.js")), console.log("[Liveroom] Installed successfully");
  const r = document.getElementsByTagName("body")[0];
  return t = document.createElement(m), t.setAttribute("url", i), o && t.setAttribute("room_id", o), r.appendChild(t), console.log("[Liveroom] Injected successfully"), !0;
}
