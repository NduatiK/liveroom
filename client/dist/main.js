const a = "liveroom-client-element", d = "0.0.28", v = "module", u = "./dist/main.js", p = "./dist/main.cjs", f = [
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
}, b = {
  "@sveltejs/vite-plugin-svelte": "2.4.6",
  "@tsconfig/svelte": "5.0.2",
  prettier: "3.0.3",
  svelte: "4.2.1",
  "svelte-check": "3.5.2",
  tslib: "2.6.2",
  typescript: "5.2.2",
  vite: "4.4.9"
}, g = {
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
  devDependencies: b
};
let o, t, e = null;
const h = "liveroom-client-element", s = g.version;
c();
j();
async function c() {
  const n = new URLSearchParams(window.location.search).get("_liveroom");
  e = // prod
  document.querySelector("script[src*='/liveroom-client-element']"), e == null || e.setAttribute("version", s);
  const l = (e == null ? void 0 : e.getAttribute("data-url")) || "wss://liveroom.app/client_socket", m = (e == null ? void 0 : e.getAttribute("data-roomid")) || null, i = n || m;
  i && i != o && (o = i, t && (t.remove(), t = void 0), await k(l, o));
}
function j() {
  window.addEventListener("popstate", c);
}
async function k(r, n) {
  return n ? (await import("./liveroom-client-element.js"), console.log(`[Liveroom] Installed successfully (v${s})`), t = document.createElement(h), t.setAttribute("url", r), t.setAttribute("version", s), n && t.setAttribute("room_id", n), document.body.appendChild(t), console.log("[Liveroom] Injected successfully"), !0) : !1;
}
