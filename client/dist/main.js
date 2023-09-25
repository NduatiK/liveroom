const a = "liveroom-client-element", d = "0.0.25", v = "module", u = "./dist/main.js", p = "./dist/main.cjs", f = [
  "dist",
  "!dist/vite.svg"
], _ = {
  ".": {
    import: "./dist/main.js",
    require: "./dist/main.cjs"
  },
  "./liveroom-client-element": {
    import: "./dist/liveroom-client-element.js",
    require: "./dist/liveroom-client-element.cjs"
  }
}, w = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview",
  format: "prettier --write .",
  "check-format": "prettier . --check",
  check: "svelte-check --tsconfig ./tsconfig.json",
  lint: "npm run check-format && npm run check"
}, y = {
  "phx-live-state": "0.10.2"
}, g = {
  "@sveltejs/vite-plugin-svelte": "2.4.6",
  "@tsconfig/svelte": "5.0.2",
  prettier: "3.0.3",
  svelte: "4.2.1",
  "svelte-check": "3.5.2",
  tslib: "2.6.2",
  typescript: "5.2.2",
  vite: "4.4.9"
}, h = {
  name: a,
  private: !1,
  version: d,
  type: v,
  module: u,
  main: p,
  files: f,
  exports: _,
  scripts: w,
  dependencies: y,
  devDependencies: g
};
let o, e, t = null;
c();
b();
const j = "liveroom-client-element", r = h.version;
async function c() {
  const n = new URLSearchParams(window.location.search).get("_liveroom");
  t = // prod
  document.querySelector("script[src*='/liveroom-client-element']");
  const l = (t == null ? void 0 : t.getAttribute("data-url")) || "wss://liveroom.app/client_socket", m = (t == null ? void 0 : t.getAttribute("data-roomid")) || null, i = n || m;
  i && i != o && (o = i, e && (e.remove(), e = void 0), await k(l, o));
}
function b() {
  window.addEventListener("popstate", c);
}
async function k(s, n) {
  return n ? (await import("./liveroom-client-element.js"), console.log(`[Liveroom] Installed successfully (v${r})`), e = document.createElement(j), e.setAttribute("url", s), e.setAttribute("version", r), n && e.setAttribute("room_id", n), document.body.appendChild(e), console.log("[Liveroom] Injected successfully"), !0) : !1;
}
