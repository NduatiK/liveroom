const m = "liveroom-client-element", a = "0.0.19", d = "module", v = "./dist/main.js", u = "./dist/main.cjs", p = [
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
}, _ = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview",
  format: "prettier --write .",
  "check-format": "prettier . --check",
  check: "svelte-check --tsconfig ./tsconfig.json",
  lint: "npm run check-format && npm run check"
}, w = {
  "phx-live-state": "0.10.1"
}, y = {
  "@sveltejs/vite-plugin-svelte": "2.4.5",
  "@tsconfig/svelte": "5.0.2",
  prettier: "3.0.3",
  svelte: "4.2.0",
  "svelte-check": "3.5.1",
  tslib: "2.6.2",
  typescript: "5.2.2",
  vite: "4.4.9"
}, g = {
  name: m,
  private: !1,
  version: a,
  type: d,
  module: v,
  main: u,
  files: p,
  exports: f,
  scripts: _,
  dependencies: w,
  devDependencies: y
}, h = g.version;
let o, t, e = null;
c();
b();
const j = "liveroom-client-element";
async function c() {
  const n = new URLSearchParams(window.location.search).get("_liveroom");
  e = // prod
  document.querySelector("script[src*='/liveroom-client-element']");
  const r = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", l = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, i = n || l;
  i && i != o && (o = i, t && (t.remove(), t = void 0), await k(r, o));
}
function b() {
  window.addEventListener("popstate", c);
}
async function k(s, n) {
  return n ? (await import("./liveroom-client-element.js"), console.log(`[Liveroom] Installed successfully (v${h})`), t = document.createElement(j), t.setAttribute("url", s), n && t.setAttribute("room_id", n), document.body.appendChild(t), console.log("[Liveroom] Injected successfully"), !0) : !1;
}
