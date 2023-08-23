const m = "liveroom-client-element", a = "0.0.18", d = "module", u = "./dist/main.js", v = "./dist/main.cjs", p = [
  "dist",
  "!dist/vite.svg"
], f = {
  ".": {
    import: "./dist/main.js",
    require: "./dist/main.cjs"
  },
  "./liveroom-client-element": {
    import: "./dist/liveroom-client-element.js",
    require: "./dist/liveroom-client-element.cjs"
  }
}, y = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview",
  format: "prettier --write .",
  "check-format": "prettier . --check",
  check: "svelte-check --tsconfig ./tsconfig.json",
  lint: "npm run check-format && npm run check"
}, _ = {
  "phx-live-state": "^0.9.4"
}, h = {
  "@sveltejs/vite-plugin-svelte": "^2.4.2",
  "@tsconfig/svelte": "^5.0.0",
  prettier: "3.0.1",
  svelte: "^4.0.5",
  "svelte-check": "^3.4.6",
  tslib: "^2.6.0",
  typescript: "^5.0.2",
  vite: "^4.4.5"
}, j = {
  name: m,
  private: !1,
  version: a,
  type: d,
  module: u,
  main: v,
  files: p,
  exports: f,
  scripts: y,
  dependencies: _,
  devDependencies: h
}, g = j.version;
let s, t, e = null;
c();
b();
const w = "liveroom-client-element";
async function c() {
  const n = new URLSearchParams(window.location.search).get("_liveroom");
  e = // prod
  document.querySelector("script[src*='/liveroom-client-element']") || // local dev
  document.querySelector("script[src*='/client/dist/main.js']") || document.querySelector("script[src='/src/main.ts']");
  const i = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", l = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, o = n || l;
  o && o != s && (s = o, t && (t.remove(), t = void 0), await k(i, s));
}
function b() {
  window.addEventListener("popstate", c);
}
async function k(r, n) {
  var i;
  return n ? (await ((i = e == null ? void 0 : e.getAttribute("src")) != null && i.startsWith(
    "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.18"
  ) ? import("https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.18/dist/liveroom-client-element.min.js") : import("./liveroom-client-element.js")), console.log(`[Liveroom] Installed successfully (v${g})`), t = document.createElement(w), t.setAttribute("url", r), n && t.setAttribute("room_id", n), document.body.appendChild(t), console.log("[Liveroom] Injected successfully"), !0) : !1;
}
