let n, e;
l();
s();
const a = "liveroom-client-element";
async function l() {
  const t = new URLSearchParams(window.location.search).get("_liveroom");
  t && t != n && (n = t, e && (e.remove(), e = void 0), await c(n));
}
function s() {
  window.addEventListener("popstate", l);
}
async function c(o) {
  if (!o)
    return !1;
  await import("./LiveroomClientElement-851fc55b.js"), console.log("[Liveroom] Installed successfully");
  const t = document.getElementsByTagName("body")[0];
  return e = document.createElement(a), e.setAttribute("url", "ws://localhost:4000/client_socket"), e.setAttribute("room_id", o), t.appendChild(e), console.log("[Liveroom] Element was injected successfully"), !0;
}
