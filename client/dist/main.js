let c, e;
s();
a();
const l = "liveroom-client-element";
async function s() {
  const o = new URLSearchParams(window.location.search).get("_liveroom"), n = (
    // prod
    document.querySelector("script[src*='liveroom-client-element.js']") || // local dev
    document.querySelector("script[src*='client/dist/main.js']")
  ), i = n == null ? void 0 : n.getAttribute("data-roomid"), r = o || i;
  r && r != c && (c = r, e && (e.remove(), e = void 0), await m(c));
}
function a() {
  window.addEventListener("popstate", s);
}
async function m(t) {
  if (!t)
    return !1;
  await import("./liveroom-client-element.js"), console.log("[Liveroom] Installed successfully");
  const o = document.getElementsByTagName("body")[0];
  return e = document.createElement(l), e.setAttribute("url", "ws://localhost:4000/client_socket"), e.setAttribute("room_id", t), o.appendChild(e), console.log("[Liveroom] Injected successfully"), !0;
}
