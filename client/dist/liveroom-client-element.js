var Oe = Object.defineProperty;
var Se = (s, n, t) => n in s ? Oe(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var d = (s, n, t) => (Se(s, typeof n != "symbol" ? n + "" : n, t), t);
function gt() {
}
function ae(s) {
  return s();
}
function Zt() {
  return /* @__PURE__ */ Object.create(null);
}
function mt(s) {
  s.forEach(ae);
}
function he(s) {
  return typeof s == "function";
}
function xe(s, n) {
  return s != s ? n == n : s !== n || s && typeof s == "object" || typeof s == "function";
}
function Me(s) {
  return Object.keys(s).length === 0;
}
function W(s, n) {
  s.appendChild(n);
}
function Le(s, n, t) {
  const e = Ne(s);
  if (!e.getElementById(n)) {
    const r = st("style");
    r.id = n, r.textContent = t, Re(e, r);
  }
}
function Ne(s) {
  if (!s)
    return document;
  const n = s.getRootNode ? s.getRootNode() : s.ownerDocument;
  return n && /** @type {ShadowRoot} */
  n.host ? (
    /** @type {ShadowRoot} */
    n
  ) : s.ownerDocument;
}
function Re(s, n) {
  return W(
    /** @type {Document} */
    s.head || s,
    n
  ), n.sheet;
}
function jt(s, n, t) {
  s.insertBefore(n, t || null);
}
function wt(s) {
  s.parentNode && s.parentNode.removeChild(s);
}
function st(s) {
  return document.createElement(s);
}
function Qt(s) {
  return document.createElementNS("http://www.w3.org/2000/svg", s);
}
function ce(s) {
  return document.createTextNode(s);
}
function xt() {
  return ce(" ");
}
function S(s, n, t) {
  t == null ? s.removeAttribute(n) : s.getAttribute(n) !== t && s.setAttribute(n, t);
}
function Pe(s) {
  return Array.from(s.childNodes);
}
function He(s, n) {
  n = "" + n, s.data !== n && (s.data = /** @type {string} */
  n);
}
function ot(s, n, t, e) {
  t == null ? s.style.removeProperty(n) : s.style.setProperty(n, t, e ? "important" : "");
}
function Ie(s) {
  const n = {};
  return s.childNodes.forEach(
    /** @param {Element} node */
    (t) => {
      n[t.slot || "default"] = !0;
    }
  ), n;
}
let vt;
function pt(s) {
  vt = s;
}
function le() {
  if (!vt)
    throw new Error("Function called outside component initialization");
  return vt;
}
function De(s) {
  le().$$.on_mount.push(s);
}
function Ue(s) {
  le().$$.on_destroy.push(s);
}
const ht = [], Kt = [];
let lt = [];
const te = [], Je = /* @__PURE__ */ Promise.resolve();
let Nt = !1;
function Ve() {
  Nt || (Nt = !0, Je.then(ct));
}
function Rt(s) {
  lt.push(s);
}
const Mt = /* @__PURE__ */ new Set();
let at = 0;
function ct() {
  if (at !== 0)
    return;
  const s = vt;
  do {
    try {
      for (; at < ht.length; ) {
        const n = ht[at];
        at++, pt(n), Be(n.$$);
      }
    } catch (n) {
      throw ht.length = 0, at = 0, n;
    }
    for (pt(null), ht.length = 0, at = 0; Kt.length; )
      Kt.pop()();
    for (let n = 0; n < lt.length; n += 1) {
      const t = lt[n];
      Mt.has(t) || (Mt.add(t), t());
    }
    lt.length = 0;
  } while (ht.length);
  for (; te.length; )
    te.pop()();
  Nt = !1, Mt.clear(), pt(s);
}
function Be(s) {
  if (s.fragment !== null) {
    s.update(), mt(s.before_update);
    const n = s.dirty;
    s.dirty = [-1], s.fragment && s.fragment.p(s.ctx, n), s.after_update.forEach(Rt);
  }
}
function Fe(s) {
  const n = [], t = [];
  lt.forEach((e) => s.indexOf(e) === -1 ? n.push(e) : t.push(e)), t.forEach((e) => e()), lt = n;
}
const ze = /* @__PURE__ */ new Set();
function ue(s, n) {
  s && s.i && (ze.delete(s), s.i(n));
}
function ee(s) {
  return (s == null ? void 0 : s.length) !== void 0 ? s : Array.from(s);
}
function We(s, n) {
  s.d(1), n.delete(s.key);
}
function Ge(s, n, t, e, r, i, a, h, p, g, b, f) {
  let A = s.length, j = i.length, x = A;
  const P = {};
  for (; x--; )
    P[s[x].key] = x;
  const M = [], X = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map(), Q = [];
  for (x = j; x--; ) {
    const O = f(r, i, x), H = t(O);
    let m = a.get(H);
    m ? e && Q.push(() => m.p(O, n)) : (m = g(H, O), m.c()), X.set(H, M[x] = m), H in P && q.set(H, Math.abs(x - P[H]));
  }
  const K = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new Set();
  function Y(O) {
    ue(O, 1), O.m(h, b), a.set(O.key, O), b = O.first, j--;
  }
  for (; A && j; ) {
    const O = M[j - 1], H = s[A - 1], m = O.key, D = H.key;
    O === H ? (b = O.first, A--, j--) : X.has(D) ? !a.has(m) || K.has(m) ? Y(O) : tt.has(D) ? A-- : q.get(m) > q.get(D) ? (tt.add(m), Y(O)) : (K.add(D), A--) : (p(H, a), A--);
  }
  for (; A--; ) {
    const O = s[A];
    X.has(O.key) || p(O, a);
  }
  for (; j; )
    Y(M[j - 1]);
  return mt(Q), M;
}
function Xe(s, n, t) {
  const { fragment: e, after_update: r } = s.$$;
  e && e.m(n, t), Rt(() => {
    const i = s.$$.on_mount.map(ae).filter(he);
    s.$$.on_destroy ? s.$$.on_destroy.push(...i) : mt(i), s.$$.on_mount = [];
  }), r.forEach(Rt);
}
function qe(s, n) {
  const t = s.$$;
  t.fragment !== null && (Fe(t.after_update), mt(t.on_destroy), t.fragment && t.fragment.d(n), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Ye(s, n) {
  s.$$.dirty[0] === -1 && (ht.push(s), Ve(), s.$$.dirty.fill(0)), s.$$.dirty[n / 31 | 0] |= 1 << n % 31;
}
function Ze(s, n, t, e, r, i, a = null, h = [-1]) {
  const p = vt;
  pt(s);
  const g = s.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: gt,
    not_equal: r,
    bound: Zt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(n.context || (p ? p.$$.context : [])),
    // everything else
    callbacks: Zt(),
    dirty: h,
    skip_bound: !1,
    root: n.target || p.$$.root
  };
  a && a(g.root);
  let b = !1;
  if (g.ctx = t ? t(s, n.props || {}, (f, A, ...j) => {
    const x = j.length ? j[0] : A;
    return g.ctx && r(g.ctx[f], g.ctx[f] = x) && (!g.skip_bound && g.bound[f] && g.bound[f](x), b && Ye(s, f)), A;
  }) : [], g.update(), b = !0, mt(g.before_update), g.fragment = e ? e(g.ctx) : !1, n.target) {
    if (n.hydrate) {
      const f = Pe(n.target);
      g.fragment && g.fragment.l(f), f.forEach(wt);
    } else
      g.fragment && g.fragment.c();
    n.intro && ue(s.$$.fragment), Xe(s, n.target, n.anchor), ct();
  }
  pt(p);
}
let pe;
typeof HTMLElement == "function" && (pe = class extends HTMLElement {
  constructor(n, t, e) {
    super();
    /** The Svelte component constructor */
    d(this, "$$ctor");
    /** Slots */
    d(this, "$$s");
    /** The Svelte component instance */
    d(this, "$$c");
    /** Whether or not the custom element is connected */
    d(this, "$$cn", !1);
    /** Component props data */
    d(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    d(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    d(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    d(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    d(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = n, this.$$s = t, e && this.attachShadow({ mode: "open" });
  }
  addEventListener(n, t, e) {
    if (this.$$l[n] = this.$$l[n] || [], this.$$l[n].push(t), this.$$c) {
      const r = this.$$c.$on(n, t);
      this.$$l_u.set(t, r);
    }
    super.addEventListener(n, t, e);
  }
  removeEventListener(n, t, e) {
    if (super.removeEventListener(n, t, e), this.$$c) {
      const r = this.$$l_u.get(t);
      r && (r(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let n = function(i) {
        return () => {
          let a;
          return {
            c: function() {
              a = st("slot"), i !== "default" && S(a, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(g, b) {
              jt(g, a, b);
            },
            d: function(g) {
              g && wt(a);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn)
        return;
      const t = {}, e = Ie(this);
      for (const i of this.$$s)
        i in e && (t[i] = [n(i)]);
      for (const i of this.attributes) {
        const a = this.$$g_p(i.name);
        a in this.$$d || (this.$$d[a] = kt(a, i.value, this.$$p_d, "toProp"));
      }
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$scope: {
            ctx: []
          }
        }
      });
      const r = () => {
        this.$$r = !0;
        for (const i in this.$$p_d)
          if (this.$$d[i] = this.$$c.$$.ctx[this.$$c.$$.props[i]], this.$$p_d[i].reflect) {
            const a = kt(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            a == null ? this.removeAttribute(this.$$p_d[i].attribute || i) : this.setAttribute(this.$$p_d[i].attribute || i, a);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(r), r();
      for (const i in this.$$l)
        for (const a of this.$$l[i]) {
          const h = this.$$c.$on(i, a);
          this.$$l_u.set(a, h);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(n, t, e) {
    var r;
    this.$$r || (n = this.$$g_p(n), this.$$d[n] = kt(n, e, this.$$p_d, "toProp"), (r = this.$$c) == null || r.$set({ [n]: this.$$d[n] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      this.$$cn || (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(n) {
    return Object.keys(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === n || !this.$$p_d[t].attribute && t.toLowerCase() === n
    ) || n;
  }
});
function kt(s, n, t, e) {
  var i;
  const r = (i = t[s]) == null ? void 0 : i.type;
  if (n = r === "Boolean" && typeof n != "boolean" ? n != null : n, !e || !t[s])
    return n;
  if (e === "toAttribute")
    switch (r) {
      case "Object":
      case "Array":
        return n == null ? null : JSON.stringify(n);
      case "Boolean":
        return n ? "" : null;
      case "Number":
        return n ?? null;
      default:
        return n;
    }
  else
    switch (r) {
      case "Object":
      case "Array":
        return n && JSON.parse(n);
      case "Boolean":
        return n;
      case "Number":
        return n != null ? +n : n;
      default:
        return n;
    }
}
function Qe(s, n, t, e, r, i) {
  let a = class extends pe {
    constructor() {
      super(s, t, r), this.$$p_d = n;
    }
    static get observedAttributes() {
      return Object.keys(n).map(
        (h) => (n[h].attribute || h).toLowerCase()
      );
    }
  };
  return Object.keys(n).forEach((h) => {
    Object.defineProperty(a.prototype, h, {
      get() {
        return this.$$c && h in this.$$c ? this.$$c[h] : this.$$d[h];
      },
      set(p) {
        var g;
        p = kt(h, p, n), this.$$d[h] = p, (g = this.$$c) == null || g.$set({ [h]: p });
      }
    });
  }), e.forEach((h) => {
    Object.defineProperty(a.prototype, h, {
      get() {
        var p;
        return (p = this.$$c) == null ? void 0 : p[h];
      }
    });
  }), i && (a = i(a)), s.element = /** @type {any} */
  a, a;
}
class Ke {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    qe(this, 1), this.$destroy = gt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(n, t) {
    if (!he(t))
      return gt;
    const e = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
    return e.push(t), () => {
      const r = e.indexOf(t);
      r !== -1 && e.splice(r, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(n) {
    this.$$set && !Me(n) && (this.$$.skip_bound = !0, this.$$set(n), this.$$.skip_bound = !1);
  }
}
const ts = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ts);
const { isArray: es } = Array, ss = Object.keys, yt = (s) => {
  if (!s)
    return s;
  if (es(s)) {
    const n = [], t = s.length;
    for (let e = 0; e < t; e++)
      n.push(yt(s[e]));
    return n;
  } else if (typeof s == "object") {
    const n = ss(s), t = n.length, e = {};
    for (let r = 0; r < t; r++) {
      const i = n[r];
      e[i] = yt(s[i]);
    }
    return e;
  }
  return s;
};
class V {
  constructor(n) {
    d(this, "path");
    d(this, "from");
    this.path = n;
  }
}
const ns = /~1/g, rs = /~0/g, is = /~/g, os = /\//g;
function as(s) {
  return s.indexOf("~") === -1 ? s : s.replace(ns, "/").replace(rs, "~");
}
function hs(s) {
  return s.indexOf("/") === -1 && s.indexOf("~") === -1 ? s : s.replace(is, "~0").replace(os, "~1");
}
function cs(s) {
  return s ? s.slice(1).split("/").map(as) : [];
}
function $(s) {
  return ls(s) ? "" : "/" + s.map((n) => hs(String(n))).join("/");
}
const E = (s) => typeof s == "string" ? cs(s) : s, ls = (s) => !s.length, us = Object.prototype.hasOwnProperty;
function ps(s, n) {
  return us.call(s, n);
}
const { isArray: fe } = Array, T = (s, n) => {
  const t = n.length;
  if (!t)
    return { val: s };
  let e, r;
  for (let a = 0; a < t; a++)
    if (e = s, r = n[a], fe(e)) {
      const h = e.length;
      if (r === "-")
        r = h;
      else if (typeof r == "string") {
        const p = ~~r;
        if ("" + p !== r)
          throw new Error("INVALID_INDEX");
        if (r = p, r < 0)
          throw new Error("INVALID_INDEX");
      }
      s = e[r];
    } else if (typeof e == "object" && e)
      s = ps(e, r) ? e[r] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: s, obj: e, key: r };
}, _t = (s) => fe(s.obj) && typeof s.key == "number", Tt = (s) => typeof s.obj == "object" && typeof s.key == "string";
class Dt extends V {
  constructor(t, e) {
    super(t);
    d(this, "value");
    this.value = e;
  }
  op() {
    return "add";
  }
  code() {
    return 0;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = T(t, this.path), a = yt(this.value);
    if (!i)
      t = a;
    else if (typeof r == "string")
      i[r] = a;
    else {
      const h = i.length;
      if (r < h)
        i.splice(r, 0, a);
      else {
        if (r > h)
          throw new Error("INVALID_INDEX");
        i.push(a);
      }
    }
    return { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "add",
      path: $(this.path),
      value: this.value
    };
  }
  toCompact(t, e) {
    return [e ? "add" : 0, this.path, this.value];
  }
  encode(t) {
    t.encodeArrayHeader(3), t.writer.u8(0), t.encodeArray(this.path), t.encodeAny(this.value);
  }
}
class de extends V {
  constructor(t, e) {
    super(t);
    d(this, "oldValue");
    this.oldValue = e;
  }
  op() {
    return "remove";
  }
  code() {
    return 1;
  }
  apply(t) {
    const e = T(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return Tt(e) ? delete e.obj[e.key] : _t(e) ? e.val !== void 0 && e.obj.splice(e.key, 1) : t = null, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "remove",
      path: $(this.path)
    };
    return this.oldValue !== void 0 && (e.oldValue = this.oldValue), e;
  }
  toCompact(t, e) {
    const r = e ? "remove" : 1;
    return this.oldValue === void 0 ? [r, this.path] : [r, this.path, this.oldValue];
  }
  encode(t, e) {
    const r = this.oldValue !== void 0;
    t.encodeArrayHeader(r ? 3 : 2), t.writer.u8(1), t.encodeArray(this.path), r && t.encodeAny(this.oldValue);
  }
}
class fs extends V {
  constructor(t, e, r) {
    super(t);
    d(this, "value");
    d(this, "oldValue");
    this.value = e, this.oldValue = r;
  }
  op() {
    return "replace";
  }
  code() {
    return 2;
  }
  apply(t) {
    const e = T(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return Tt(e) ? e.obj[e.key] = this.value : _t(e) ? e.obj[e.key] = this.value : t = this.value, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "replace",
      path: $(this.path),
      value: this.value
    };
    return this.oldValue !== void 0 && (e.oldValue = this.oldValue), e;
  }
  toCompact(t, e) {
    const r = e ? "replace" : 2;
    return this.oldValue === void 0 ? [r, this.path, this.value] : [r, this.path, this.value, this.oldValue];
  }
  encode(t, e) {
    const r = this.oldValue !== void 0;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(2), t.encodeArray(this.path), t.encodeAny(this.value), r && t.encodeAny(this.oldValue);
  }
}
class ds extends V {
  constructor(t, e) {
    super(t);
    d(this, "from");
    this.from = e;
  }
  op() {
    return "move";
  }
  code() {
    return 4;
  }
  apply(t) {
    const e = new de(E(this.from), void 0).apply(t);
    return new Dt(this.path, e.old).apply(e.doc);
  }
  toJson(t) {
    return {
      op: "move",
      path: $(this.path),
      from: $(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "move" : 4, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(4), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class gs extends V {
  constructor(t, e) {
    super(t);
    d(this, "from");
    this.from = e;
  }
  op() {
    return "copy";
  }
  code() {
    return 3;
  }
  apply(t) {
    const { val: e } = T(t, this.from);
    if (e === void 0)
      throw new Error("NOT_FOUND");
    return new Dt(this.path, yt(e)).apply(t);
  }
  toJson(t) {
    return {
      op: "copy",
      path: $(this.path),
      from: $(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "copy" : 3, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(3), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class I extends V {
  apply(n) {
    if (!this.test(n))
      throw new Error("TEST");
    return { doc: n };
  }
}
const $t = (s, n) => {
  if (s === n)
    return !0;
  if (s && n && typeof s == "object" && typeof n == "object") {
    if (s.constructor !== n.constructor)
      return !1;
    let t, e, r;
    if (Array.isArray(s)) {
      if (t = s.length, t !== n.length)
        return !1;
      for (e = t; e-- !== 0; )
        if (!$t(s[e], n[e]))
          return !1;
      return !0;
    }
    if (r = Object.keys(s), t = r.length, t !== Object.keys(n).length)
      return !1;
    for (e = t; e-- !== 0; ) {
      const i = r[e];
      if (!$t(s[i], n[i]))
        return !1;
    }
    return !0;
  }
  return !1;
};
class vs extends I {
  constructor(t, e, r) {
    super(t);
    d(this, "value");
    d(this, "not");
    this.value = e, this.not = r;
  }
  op() {
    return "test";
  }
  code() {
    return 5;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (e === void 0)
      return !!this.not;
    const r = $t(e, this.value);
    return this.not ? !r : r;
  }
  toJson(t) {
    const e = {
      op: "test",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const r = t ? this.path.slice(t.path.length) : this.path, i = e ? "test" : 5;
    return this.not ? [i, r, this.value, 1] : [i, r, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 4 : 3), t.writer.u8(5), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeAny(this.value), this.not && t.writer.u8(1);
  }
}
class ys extends V {
  constructor(n) {
    super(n);
  }
  op() {
    return "flip";
  }
  code() {
    return 8;
  }
  apply(n) {
    const t = T(n, this.path);
    return t.obj ? t.obj[t.key] = !t.val : n = !t.val, { doc: n, old: t.val };
  }
  toJson(n) {
    return {
      op: "flip",
      path: $(this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "flip" : 8, this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(8), n.encodeArray(this.path);
  }
}
class ms extends V {
  constructor(t, e) {
    super(t);
    d(this, "inc");
    this.inc = e;
  }
  op() {
    return "inc";
  }
  code() {
    return 9;
  }
  apply(t) {
    const e = T(t, this.path), r = this.inc + Number(e.val);
    return e.obj ? e.obj[e.key] = r : t = r, { doc: t, old: e.val };
  }
  toJson(t) {
    return {
      op: "inc",
      path: $(this.path),
      inc: this.inc
    };
  }
  toCompact(t, e) {
    return [e ? "inc" : 9, this.path, this.inc];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(9), t.encodeArray(this.path), t.encodeNumber(this.inc);
  }
}
class ws extends V {
  constructor(t, e, r) {
    super(t);
    d(this, "pos");
    d(this, "str");
    this.pos = e, this.str = r;
  }
  op() {
    return "str_ins";
  }
  code() {
    return 6;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = T(t, this.path);
    if (typeof e != "string") {
      if (e !== void 0)
        throw new Error("NOT_A_STRING");
      if (this.pos !== 0)
        throw new Error("POS");
    }
    const a = typeof e == "string" ? e : "", h = Math.min(this.pos, a.length), p = a.slice(0, h), g = a.slice(h), b = p + this.str + g;
    return i ? i[r] = b : t = b, { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "str_ins",
      path: $(this.path),
      pos: this.pos,
      str: this.str
    };
  }
  toCompact(t, e) {
    return [e ? "str_ins" : 6, this.path, this.pos, this.str];
  }
  encode(t, e) {
    t.encodeArrayHeader(4), t.writer.u8(6), t.encodeArray(this.path), t.encodeNumber(this.pos), t.encodeString(this.str);
  }
}
class _s extends V {
  constructor(t, e, r, i) {
    super(t);
    d(this, "pos");
    d(this, "str");
    d(this, "len");
    this.pos = e, this.str = r, this.len = i;
  }
  op() {
    return "str_del";
  }
  code() {
    return 7;
  }
  deleteLength() {
    return typeof this.str == "string" ? this.str.length : this.len;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = T(t, this.path);
    if (typeof e != "string")
      throw new Error("NOT_A_STRING");
    const a = e.length, h = Math.min(this.pos, e.length), p = Math.min(h, a), g = this.str !== void 0 ? this.str.length : this.len, b = Math.min(h + g, a), f = e.slice(0, p), A = e.substr(b), j = f + A;
    return i ? i[r] = j : t = j, { doc: t, old: e };
  }
  toJson(t) {
    return typeof this.str == "string" ? {
      op: "str_del",
      path: $(this.path),
      pos: this.pos,
      str: this.str
    } : {
      op: "str_del",
      path: $(this.path),
      pos: this.pos,
      len: this.len
    };
  }
  toCompact(t, e) {
    const r = e ? "str_del" : 7;
    return typeof this.str == "string" ? [r, this.path, this.pos, this.str] : [r, this.path, this.pos, 0, this.len];
  }
  encode(t, e) {
    const r = typeof this.str == "string";
    t.encodeArrayHeader(r ? 4 : 5), t.writer.u8(7), t.encodeArray(this.path), t.encodeNumber(this.pos), r ? t.encodeString(this.str) : (t.writer.u8(0), t.encodeNumber(this.len));
  }
}
const { isArray: bs } = Array, Pt = (s) => !!s && typeof s == "object" && typeof s.text == "string", Ht = (s) => !!s && typeof s == "object" && bs(s.children), Es = (s, n) => {
  const t = new RegExp(s, n ? "i" : void 0);
  return (e) => t.test(e);
};
class ks extends V {
  constructor(t, e, r) {
    super(t);
    d(this, "pos");
    d(this, "props");
    this.pos = e, this.props = r;
  }
  op() {
    return "split";
  }
  code() {
    return 10;
  }
  apply(t) {
    const e = T(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    const r = this.split(e.val);
    return Tt(e) ? e.obj[e.key] = r : _t(e) ? (e.obj[e.key] = r[0], e.obj.splice(e.key + 1, 0, r[1])) : t = r, { doc: t, old: e.val };
  }
  split(t) {
    if (typeof t == "string") {
      const { pos: e, props: r } = this, i = t.slice(0, e), a = t.slice(e);
      return r ? [
        {
          ...r,
          text: i
        },
        {
          ...r,
          text: a
        }
      ] : [i, a];
    } else if (Pt(t)) {
      const { pos: e, props: r } = this, i = t.text.slice(0, e), a = t.text.slice(e);
      return [
        {
          ...t,
          ...r,
          text: i
        },
        {
          ...t,
          ...r,
          text: a
        }
      ];
    } else if (Ht(t)) {
      const { pos: e, props: r } = this, i = t.children.slice(0, e), a = t.children.slice(e);
      return [
        {
          ...t,
          ...r,
          children: i
        },
        {
          ...t,
          ...r,
          children: a
        }
      ];
    } else if (typeof t == "number") {
      const { pos: e } = this;
      return [e, t - e];
    } else
      return [t, t];
  }
  toJson(t) {
    const e = {
      op: "split",
      path: $(this.path),
      pos: this.pos
    };
    return this.props && (e.props = this.props), e;
  }
  toCompact(t, e) {
    const r = e ? "split" : 10;
    return this.props ? [r, this.path, this.pos, this.props] : [r, this.path, this.pos];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.props ? 4 : 3), t.writer.u8(10), t.encodeArray(this.path), t.encodeNumber(this.pos), this.props && t.encodeObject(this.props);
  }
}
class Cs extends V {
  constructor(t, e, r) {
    super(t);
    d(this, "pos");
    d(this, "props");
    this.pos = e, this.props = r;
  }
  op() {
    return "merge";
  }
  code() {
    return 11;
  }
  apply(t) {
    const e = T(t, this.path);
    if (!_t(e))
      throw new Error("INVALID_TARGET");
    if (e.key <= 0)
      throw new Error("INVALID_KEY");
    const r = e.obj[e.key - 1], i = e.obj[e.key], a = this.merge(r, i);
    return e.obj[e.key - 1] = a, e.obj.splice(e.key, 1), { doc: t, old: [r, i] };
  }
  merge(t, e) {
    return typeof t == "string" && typeof e == "string" || typeof t == "number" && typeof e == "number" ? t + e : Pt(t) && Pt(e) ? { ...t, ...e, text: t.text + e.text } : Ht(t) && Ht(e) ? { ...t, ...e, children: [...t.children, ...e.children] } : [t, e];
  }
  toJson(t) {
    const e = {
      op: "merge",
      path: $(this.path),
      pos: this.pos
    };
    return this.props && (e.props = this.props), e;
  }
  toCompact(t, e) {
    const r = e ? "merge" : 11;
    return this.props ? [r, this.path, this.pos, this.props] : [r, this.path, this.pos];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.props ? 4 : 3), t.writer.u8(11), t.encodeArray(this.path), t.encodeNumber(this.pos), this.props && t.encodeAny(this.props);
  }
}
const { isArray: $s } = Array;
class As extends V {
  constructor(t, e, r) {
    super(t);
    d(this, "props");
    d(this, "deleteNull");
    this.props = e, this.deleteNull = r;
  }
  op() {
    return "extend";
  }
  code() {
    return 12;
  }
  apply(t) {
    const e = T(t, this.path);
    return _t(e) ? e.val !== void 0 && (e.obj[e.key] = this.extend(e.val)) : Tt(e) ? e.obj[e.key] = this.extend(e.val) : t = this.extend(t), { doc: t };
  }
  extend(t) {
    if ($s(t) || typeof t != "object" || !t)
      return t;
    for (const [e, r] of Object.entries(this.props)) {
      if (e === "__proto__")
        throw new Error("NO_PROTO");
      if (r === null && this.deleteNull) {
        delete t[e];
        continue;
      }
      t[e] = r;
    }
    return t;
  }
  toJson(t) {
    const e = {
      op: "extend",
      path: $(this.path),
      props: this.props
    };
    return this.deleteNull && (e.deleteNull = this.deleteNull), e;
  }
  toCompact(t, e) {
    const r = e ? "extend" : 12;
    return this.deleteNull ? [r, this.path, this.props, 1] : [r, this.path, this.props];
  }
  encode(t, e) {
    const { deleteNull: r } = this;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(12), t.encodeArray(this.path), t.encodeObject(this.props), r && t.writer.u8(1);
  }
}
class js extends I {
  constructor(n) {
    super(n);
  }
  op() {
    return "defined";
  }
  code() {
    return 31;
  }
  test(n) {
    const { val: t } = T(n, this.path);
    return t !== void 0;
  }
  toJson(n) {
    return {
      op: "defined",
      path: $(n ? this.path.slice(n.path.length) : this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "defined" : 31, n ? this.path.slice(n.path.length) : this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(31), n.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
class Ts extends I {
  constructor(n) {
    super(n);
  }
  op() {
    return "undefined";
  }
  code() {
    return 38;
  }
  test(n) {
    try {
      const { val: t } = T(n, this.path);
      return t === void 0;
    } catch (t) {
      if (t.message === "NOT_FOUND")
        return !0;
      throw t;
    }
  }
  toJson(n) {
    return {
      op: "undefined",
      path: $(n ? this.path.slice(n.path.length) : this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "undefined" : 38, n ? this.path.slice(n.path.length) : this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(38), n.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
const { isArray: Os } = Array;
class Ss extends I {
  constructor(t, e) {
    super(t);
    d(this, "type");
    this.type = e;
  }
  op() {
    return "test_type";
  }
  code() {
    return 39;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    return e === null ? this.type.indexOf("null") > -1 : Os(e) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof e) > -1 || typeof e == "number" && e === Math.round(e) && this.type.indexOf("integer") > -1;
  }
  toJson(t) {
    return {
      op: "test_type",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      type: this.type
    };
  }
  toCompact(t, e) {
    return [e ? "test_type" : 39, t ? this.path.slice(t.path.length) : this.path, this.type];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(39), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeArray(this.type);
  }
}
class xs extends I {
  constructor(t, e, r, i) {
    super(t);
    d(this, "pos");
    d(this, "str");
    d(this, "not");
    this.pos = e, this.str = r, this.not = i;
  }
  op() {
    return "test_string";
  }
  code() {
    return 40;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = e.length, i = Math.min(this.pos, r), a = Math.min(this.pos + this.str.length, r), h = e.substring(i, a) === this.str;
    return this.not ? !h : h;
  }
  toJson(t) {
    const e = {
      op: "test_string",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      pos: this.pos,
      str: this.str
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const r = e ? "test_string" : 40, i = t ? this.path.slice(t.path.length) : this.path;
    return this.not ? [r, i, this.pos, this.str, 1] : [r, i, this.pos, this.str];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 5 : 4), t.writer.u8(40), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.pos), t.encodeString(this.str), this.not && t.writer.u8(1);
  }
}
class Ms extends I {
  constructor(t, e, r) {
    super(t);
    d(this, "len");
    d(this, "not");
    this.len = e, this.not = r;
  }
  op() {
    return "test_string_len";
  }
  code() {
    return 41;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (typeof e != "string")
      return !1;
    const i = e.length >= this.len;
    return this.not ? !i : i;
  }
  toJson(t) {
    const e = {
      op: "test_string_len",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      len: this.len
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const r = e ? "test_string_len" : 41, i = t ? this.path.slice(t.path.length) : this.path;
    return this.not ? [r, i, this.len, 1] : [r, i, this.len];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 4 : 3), t.writer.u8(41), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.len), this.not && t.writer.u8(1);
  }
}
class Ls extends I {
  constructor(t, e, r) {
    super(t);
    d(this, "value");
    d(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "contains";
  }
  code() {
    return 30;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.indexOf(i) > -1;
  }
  toJson(t) {
    const e = {
      op: "contains",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const r = e ? "contains" : 30;
    return this.ignore_case ? [r, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [r, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const r = this.ignore_case;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(30), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), r && t.writer.u8(1);
  }
}
class Ns extends I {
  constructor(t, e, r) {
    super(t);
    d(this, "value");
    d(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "ends";
  }
  code() {
    return 32;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.endsWith(i);
  }
  toJson(t) {
    const e = {
      op: "ends",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const r = e ? "ends" : 32;
    return this.ignore_case ? [r, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [r, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const r = this.ignore_case;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(32), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), r && t.writer.u8(1);
  }
}
class Rs extends I {
  constructor(t, e, r) {
    super(t);
    d(this, "value");
    d(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "starts";
  }
  code() {
    return 37;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.startsWith(i);
  }
  toJson(t) {
    const e = {
      op: "starts",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const r = e ? "starts" : 37;
    return this.ignore_case ? [r, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [r, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const r = this.ignore_case;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(37), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), r && t.writer.u8(1);
  }
}
class Ps extends I {
  constructor(t, e) {
    super(t);
    d(this, "value");
    this.value = e;
  }
  op() {
    return "in";
  }
  code() {
    return 33;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    for (const r of this.value)
      if ($t(e, r))
        return !0;
    return !1;
  }
  toJson(t) {
    return {
      op: "in",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(t, e) {
    return [e ? "in" : 33, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(33), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeArray(this.value);
  }
}
class Hs extends I {
  constructor(t, e) {
    super(t);
    d(this, "value");
    this.value = e;
  }
  op() {
    return "less";
  }
  code() {
    return 34;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    return typeof e != "number" ? !1 : e < this.value;
  }
  toJson(t) {
    return {
      op: "less",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(t, e) {
    return [e ? "less" : 34, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(34), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.value);
  }
}
class Is extends I {
  constructor(t, e) {
    super(t);
    d(this, "value");
    this.value = e;
  }
  op() {
    return "more";
  }
  code() {
    return 36;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    return typeof e != "number" ? !1 : e > this.value;
  }
  toJson(t) {
    return {
      op: "more",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(t, e) {
    return [e ? "more" : 36, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(36), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.value);
  }
}
class Ut extends I {
  constructor(t, e) {
    super(t);
    d(this, "ops");
    this.ops = e;
  }
}
class Ds extends Ut {
  constructor(t, e) {
    super(t, e);
    d(this, "ops");
    this.ops = e;
  }
  op() {
    return "and";
  }
  code() {
    return 43;
  }
  test(t) {
    for (const e of this.ops)
      if (!e.test(t))
        return !1;
    return !0;
  }
  toJson(t) {
    return {
      op: "and",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "and" : 43,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((i) => i.toCompact(this, e))
    ];
  }
  encode(t, e) {
    const r = e ? this.path.slice(e.path.length) : this.path;
    t.encodeArrayHeader(3), t.writer.u8(43), t.encodeArray(r);
    const i = this.ops.length;
    t.encodeArrayHeader(i);
    for (let a = 0; a < i; a++)
      this.ops[a].encode(t, this);
  }
}
class Us extends Ut {
  constructor(t, e) {
    super(t, e);
    d(this, "ops");
    this.ops = e;
  }
  op() {
    return "or";
  }
  code() {
    return 45;
  }
  test(t) {
    for (const e of this.ops)
      if (e.test(t))
        return !0;
    return !1;
  }
  toJson(t) {
    return {
      op: "or",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "or" : 45,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((i) => i.toCompact(this, e))
    ];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(45), t.encodeArray(e ? this.path.slice(e.path.length) : this.path);
    const r = this.ops.length;
    t.encodeArrayHeader(r);
    for (let i = 0; i < r; i++)
      this.ops[i].encode(t, this);
  }
}
class Js extends Ut {
  constructor(t, e) {
    super(t, e);
    d(this, "ops");
    this.ops = e;
  }
  op() {
    return "not";
  }
  code() {
    return 44;
  }
  test(t) {
    for (const e of this.ops)
      if (e.test(t))
        return !1;
    return !0;
  }
  toJson(t) {
    return {
      op: "not",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "not" : 44,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((i) => i.toCompact(this, e))
    ];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(44), t.encodeArray(e ? this.path.slice(e.path.length) : this.path);
    const r = this.ops.length;
    t.encodeArrayHeader(r);
    for (let i = 0; i < r; i++)
      this.ops[i].encode(t, this);
  }
}
class Vs extends I {
  constructor(t, e, r, i) {
    super(t);
    d(this, "value");
    d(this, "ignore_case");
    d(this, "matcher");
    this.value = e, this.ignore_case = r, this.matcher = i(e, r);
  }
  op() {
    return "matches";
  }
  code() {
    return 35;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    return typeof e != "string" ? !1 : this.matcher(e);
  }
  toJson(t) {
    const e = {
      op: "matches",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const r = e ? "matches" : 35;
    return this.ignore_case ? [r, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [r, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const r = this.ignore_case;
    t.encodeArrayHeader(r ? 4 : 3), t.writer.u8(35), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), r && t.writer.u8(1);
  }
}
const { isArray: Bs } = Array;
class Fs extends I {
  constructor(t, e) {
    super(t);
    d(this, "value");
    this.value = e;
  }
  op() {
    return "type";
  }
  code() {
    return 42;
  }
  test(t) {
    const { val: e } = T(t, this.path);
    return e === null ? this.value === "null" : Bs(e) ? this.value === "array" : typeof e === this.value || typeof e == "number" && e === Math.round(e) && this.value === "integer";
  }
  toJson(t) {
    return {
      op: "type",
      path: $(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(t, e) {
    return [e ? "type" : 42, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(42), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value);
  }
}
const zs = (s, n) => {
  switch (s.op) {
    case "add":
      return new Dt(E(s.path), s.value);
    case "remove":
      return new de(E(s.path), s.oldValue);
    case "replace":
      return new fs(E(s.path), s.value, s.oldValue);
    case "move":
      return new ds(E(s.path), E(s.from));
    case "copy":
      return new gs(E(s.path), E(s.from));
    case "flip":
      return new ys(E(s.path));
    case "inc":
      return new ms(E(s.path), s.inc);
    case "str_ins":
      return new ws(E(s.path), s.pos, s.str);
    case "str_del":
      return new _s(E(s.path), s.pos, s.str, s.len);
    case "split":
      return new ks(E(s.path), s.pos, s.props || null);
    case "merge":
      return new Cs(E(s.path), s.pos, s.props || null);
    case "extend":
      return new As(E(s.path), s.props, !!s.deleteNull);
    default:
      return Ct(s, n);
  }
}, Ct = (s, n) => {
  switch (s.op) {
    case "test":
      return new vs(E(s.path), s.value, !!s.not);
    case "defined":
      return new js(E(s.path));
    case "undefined":
      return new Ts(E(s.path));
    case "type":
      return new Fs(E(s.path), s.value);
    case "test_type":
      return new Ss(E(s.path), s.type);
    case "test_string":
      return new xs(E(s.path), s.pos, s.str, !!s.not);
    case "test_string_len":
      return new Ms(E(s.path), s.len, !!s.not);
    case "contains":
      return new Ls(E(s.path), s.value, !!s.ignore_case);
    case "ends":
      return new Ns(E(s.path), s.value, !!s.ignore_case);
    case "starts":
      return new Rs(E(s.path), s.value, !!s.ignore_case);
    case "matches":
      return new Vs(E(s.path), s.value, !!s.ignore_case, n.createMatcher || Es);
    case "in":
      return new Ps(E(s.path), s.value);
    case "less":
      return new Hs(E(s.path), s.value);
    case "more":
      return new Is(E(s.path), s.value);
    case "and": {
      const t = E(s.path);
      return new Ds(t, s.apply.map((e) => Ct({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    case "or": {
      const t = E(s.path);
      return new Us(t, s.apply.map((e) => Ct({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    case "not": {
      const t = E(s.path);
      return new Js(t, s.apply.map((e) => Ct({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function Ws(s, n, t) {
  t.mutate || (s = yt(s));
  const e = [], r = n.length;
  for (let i = 0; i < r; i++) {
    const h = zs(n[i], t).apply(s);
    s = h.doc, e.push(h);
  }
  return { doc: s, res: e };
}
var ft = (s) => typeof s == "function" ? s : function() {
  return s;
}, Gs = typeof self < "u" ? self : null, ut = typeof window < "u" ? window : null, dt = Gs || ut || dt, Xs = "2.0.0", F = { connecting: 0, open: 1, closing: 2, closed: 3 }, qs = 1e4, Ys = 1e3, J = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
}, G = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}, It = {
  longpoll: "longpoll",
  websocket: "websocket"
}, Zs = {
  complete: 4
}, bt = class {
  constructor(s, n, t, e) {
    this.channel = s, this.event = n, this.payload = t || function() {
      return {};
    }, this.receivedResp = null, this.timeout = e, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
  }
  resend(s) {
    this.timeout = s, this.reset(), this.send();
  }
  send() {
    this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload(),
      ref: this.ref,
      join_ref: this.channel.joinRef()
    }));
  }
  receive(s, n) {
    return this.hasReceived(s) && n(this.receivedResp.response), this.recHooks.push({ status: s, callback: n }), this;
  }
  reset() {
    this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
  }
  matchReceive({ status: s, response: n, _ref: t }) {
    this.recHooks.filter((e) => e.status === s).forEach((e) => e.callback(n));
  }
  cancelRefEvent() {
    this.refEvent && this.channel.off(this.refEvent);
  }
  cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
  }
  startTimeout() {
    this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (s) => {
      this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = s, this.matchReceive(s);
    }), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  hasReceived(s) {
    return this.receivedResp && this.receivedResp.status === s;
  }
  trigger(s, n) {
    this.channel.trigger(this.refEvent, { status: s, response: n });
  }
}, ge = class {
  constructor(s, n) {
    this.callback = s, this.timerCalc = n, this.timer = null, this.tries = 0;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}, Qs = class {
  constructor(s, n, t) {
    this.state = J.closed, this.topic = s, this.params = ft(n || {}), this.socket = t, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new bt(this, G.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new ge(() => {
      this.socket.isConnected() && this.rejoin();
    }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
    })), this.joinPush.receive("ok", () => {
      this.state = J.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), this.pushBuffer = [];
    }), this.joinPush.receive("error", () => {
      this.state = J.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.onClose(() => {
      this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = J.closed, this.socket.remove(this);
    }), this.onError((e) => {
      this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e), this.isJoining() && this.joinPush.reset(), this.state = J.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.joinPush.receive("timeout", () => {
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new bt(this, G.leave, ft({}), this.timeout).send(), this.state = J.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.on(G.reply, (e, r) => {
      this.trigger(this.replyEventName(r), e);
    });
  }
  join(s = this.timeout) {
    if (this.joinedOnce)
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    return this.timeout = s, this.joinedOnce = !0, this.rejoin(), this.joinPush;
  }
  onClose(s) {
    this.on(G.close, s);
  }
  onError(s) {
    return this.on(G.error, (n) => s(n));
  }
  on(s, n) {
    let t = this.bindingRef++;
    return this.bindings.push({ event: s, ref: t, callback: n }), t;
  }
  off(s, n) {
    this.bindings = this.bindings.filter((t) => !(t.event === s && (typeof n > "u" || n === t.ref)));
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(s, n, t = this.timeout) {
    if (n = n || {}, !this.joinedOnce)
      throw new Error(`tried to push '${s}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    let e = new bt(this, s, function() {
      return n;
    }, t);
    return this.canPush() ? e.send() : (e.startTimeout(), this.pushBuffer.push(e)), e;
  }
  leave(s = this.timeout) {
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = J.leaving;
    let n = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(G.close, "leave");
    }, t = new bt(this, G.leave, ft({}), s);
    return t.receive("ok", () => n()).receive("timeout", () => n()), t.send(), this.canPush() || t.trigger("ok", {}), t;
  }
  onMessage(s, n, t) {
    return n;
  }
  isMember(s, n, t, e) {
    return this.topic !== s ? !1 : e && e !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: s, event: n, payload: t, joinRef: e }), !1) : !0;
  }
  joinRef() {
    return this.joinPush.ref;
  }
  rejoin(s = this.timeout) {
    this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = J.joining, this.joinPush.resend(s));
  }
  trigger(s, n, t, e) {
    let r = this.onMessage(s, n, t, e);
    if (n && !r)
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    let i = this.bindings.filter((a) => a.event === s);
    for (let a = 0; a < i.length; a++)
      i[a].callback(r, t, e || this.joinRef());
  }
  replyEventName(s) {
    return `chan_reply_${s}`;
  }
  isClosed() {
    return this.state === J.closed;
  }
  isErrored() {
    return this.state === J.errored;
  }
  isJoined() {
    return this.state === J.joined;
  }
  isJoining() {
    return this.state === J.joining;
  }
  isLeaving() {
    return this.state === J.leaving;
  }
}, At = class {
  static request(s, n, t, e, r, i, a) {
    if (dt.XDomainRequest) {
      let h = new dt.XDomainRequest();
      return this.xdomainRequest(h, s, n, e, r, i, a);
    } else {
      let h = new dt.XMLHttpRequest();
      return this.xhrRequest(h, s, n, t, e, r, i, a);
    }
  }
  static xdomainRequest(s, n, t, e, r, i, a) {
    return s.timeout = r, s.open(n, t), s.onload = () => {
      let h = this.parseJSON(s.responseText);
      a && a(h);
    }, i && (s.ontimeout = i), s.onprogress = () => {
    }, s.send(e), s;
  }
  static xhrRequest(s, n, t, e, r, i, a, h) {
    return s.open(n, t, !0), s.timeout = i, s.setRequestHeader("Content-Type", e), s.onerror = () => h && h(null), s.onreadystatechange = () => {
      if (s.readyState === Zs.complete && h) {
        let p = this.parseJSON(s.responseText);
        h(p);
      }
    }, a && (s.ontimeout = a), s.send(r), s;
  }
  static parseJSON(s) {
    if (!s || s === "")
      return null;
    try {
      return JSON.parse(s);
    } catch {
      return console && console.log("failed to parse JSON response", s), null;
    }
  }
  static serialize(s, n) {
    let t = [];
    for (var e in s) {
      if (!Object.prototype.hasOwnProperty.call(s, e))
        continue;
      let r = n ? `${n}[${e}]` : e, i = s[e];
      typeof i == "object" ? t.push(this.serialize(i, r)) : t.push(encodeURIComponent(r) + "=" + encodeURIComponent(i));
    }
    return t.join("&");
  }
  static appendParams(s, n) {
    if (Object.keys(n).length === 0)
      return s;
    let t = s.match(/\?/) ? "&" : "?";
    return `${s}${t}${this.serialize(n)}`;
  }
}, Lt = class {
  constructor(s) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(s), this.readyState = F.connecting, this.poll();
  }
  normalizeEndpoint(s) {
    return s.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + It.websocket), "$1/" + It.longpoll);
  }
  endpointURL() {
    return At.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(s, n, t) {
    this.close(s, n, t), this.readyState = F.connecting;
  }
  ontimeout() {
    this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
  }
  isActive() {
    return this.readyState === F.open || this.readyState === F.connecting;
  }
  poll() {
    this.ajax("GET", null, () => this.ontimeout(), (s) => {
      if (s) {
        var { status: n, token: t, messages: e } = s;
        this.token = t;
      } else
        n = 0;
      switch (n) {
        case 200:
          e.forEach((r) => {
            setTimeout(() => this.onmessage({ data: r }), 0);
          }), this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = F.open, this.onopen({}), this.poll();
          break;
        case 403:
          this.onerror(403), this.close(1008, "forbidden", !1);
          break;
        case 0:
        case 500:
          this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${n}`);
      }
    });
  }
  send(s) {
    this.ajax("POST", s, () => this.onerror("timeout"), (n) => {
      (!n || n.status !== 200) && (this.onerror(n && n.status), this.closeAndRetry(1011, "internal server error", !1));
    });
  }
  close(s, n, t) {
    for (let r of this.reqs)
      r.abort();
    this.readyState = F.closed;
    let e = Object.assign({ code: 1e3, reason: void 0, wasClean: !0 }, { code: s, reason: n, wasClean: t });
    typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", e)) : this.onclose(e);
  }
  ajax(s, n, t, e) {
    let r, i = () => {
      this.reqs.delete(r), t();
    };
    r = At.request(s, this.endpointURL(), "application/json", n, this.timeout, i, (a) => {
      this.reqs.delete(r), this.isActive() && e(a);
    }), this.reqs.add(r);
  }
}, Et = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(s, n) {
    if (s.payload.constructor === ArrayBuffer)
      return n(this.binaryEncode(s));
    {
      let t = [s.join_ref, s.ref, s.topic, s.event, s.payload];
      return n(JSON.stringify(t));
    }
  },
  decode(s, n) {
    if (s.constructor === ArrayBuffer)
      return n(this.binaryDecode(s));
    {
      let [t, e, r, i, a] = JSON.parse(s);
      return n({ join_ref: t, ref: e, topic: r, event: i, payload: a });
    }
  },
  binaryEncode(s) {
    let { join_ref: n, ref: t, event: e, topic: r, payload: i } = s, a = this.META_LENGTH + n.length + t.length + r.length + e.length, h = new ArrayBuffer(this.HEADER_LENGTH + a), p = new DataView(h), g = 0;
    p.setUint8(g++, this.KINDS.push), p.setUint8(g++, n.length), p.setUint8(g++, t.length), p.setUint8(g++, r.length), p.setUint8(g++, e.length), Array.from(n, (f) => p.setUint8(g++, f.charCodeAt(0))), Array.from(t, (f) => p.setUint8(g++, f.charCodeAt(0))), Array.from(r, (f) => p.setUint8(g++, f.charCodeAt(0))), Array.from(e, (f) => p.setUint8(g++, f.charCodeAt(0)));
    var b = new Uint8Array(h.byteLength + i.byteLength);
    return b.set(new Uint8Array(h), 0), b.set(new Uint8Array(i), h.byteLength), b.buffer;
  },
  binaryDecode(s) {
    let n = new DataView(s), t = n.getUint8(0), e = new TextDecoder();
    switch (t) {
      case this.KINDS.push:
        return this.decodePush(s, n, e);
      case this.KINDS.reply:
        return this.decodeReply(s, n, e);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(s, n, e);
    }
  },
  decodePush(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), a = this.HEADER_LENGTH + this.META_LENGTH - 1, h = t.decode(s.slice(a, a + e));
    a = a + e;
    let p = t.decode(s.slice(a, a + r));
    a = a + r;
    let g = t.decode(s.slice(a, a + i));
    a = a + i;
    let b = s.slice(a, s.byteLength);
    return { join_ref: h, ref: null, topic: p, event: g, payload: b };
  },
  decodeReply(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), a = n.getUint8(4), h = this.HEADER_LENGTH + this.META_LENGTH, p = t.decode(s.slice(h, h + e));
    h = h + e;
    let g = t.decode(s.slice(h, h + r));
    h = h + r;
    let b = t.decode(s.slice(h, h + i));
    h = h + i;
    let f = t.decode(s.slice(h, h + a));
    h = h + a;
    let A = s.slice(h, s.byteLength), j = { status: f, response: A };
    return { join_ref: p, ref: g, topic: b, event: G.reply, payload: j };
  },
  decodeBroadcast(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = this.HEADER_LENGTH + 2, a = t.decode(s.slice(i, i + e));
    i = i + e;
    let h = t.decode(s.slice(i, i + r));
    i = i + r;
    let p = s.slice(i, s.byteLength);
    return { join_ref: null, ref: null, topic: a, event: h, payload: p };
  }
}, Ks = class {
  constructor(s, n = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = n.timeout || qs, this.transport = n.transport || dt.WebSocket || Lt, this.establishedConnections = 0, this.defaultEncoder = Et.encode.bind(Et), this.defaultDecoder = Et.decode.bind(Et), this.closeWasClean = !1, this.binaryType = n.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== Lt ? (this.encode = n.encode || this.defaultEncoder, this.decode = n.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let t = null;
    ut && ut.addEventListener && (ut.addEventListener("pagehide", (e) => {
      this.conn && (this.disconnect(), t = this.connectClock);
    }), ut.addEventListener("pageshow", (e) => {
      t === this.connectClock && (t = null, this.connect());
    })), this.heartbeatIntervalMs = n.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => n.rejoinAfterMs ? n.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4, this.reconnectAfterMs = (e) => n.reconnectAfterMs ? n.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3, this.logger = n.logger || null, this.longpollerTimeout = n.longpollerTimeout || 2e4, this.params = ft(n.params || {}), this.endPoint = `${s}/${It.websocket}`, this.vsn = n.vsn || Xs, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new ge(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return Lt;
  }
  replaceTransport(s) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = s;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let s = At.appendParams(At.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    return s.charAt(0) !== "/" ? s : s.charAt(1) === "/" ? `${this.protocol()}:${s}` : `${this.protocol()}://${location.host}${s}`;
  }
  disconnect(s, n, t) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(s, n, t);
  }
  connect(s) {
    s && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = ft(s)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (n) => this.onConnError(n), this.conn.onmessage = (n) => this.onConnMessage(n), this.conn.onclose = (n) => this.onConnClose(n));
  }
  log(s, n, t) {
    this.logger(s, n, t);
  }
  hasLogger() {
    return this.logger !== null;
  }
  onOpen(s) {
    let n = this.makeRef();
    return this.stateChangeCallbacks.open.push([n, s]), n;
  }
  onClose(s) {
    let n = this.makeRef();
    return this.stateChangeCallbacks.close.push([n, s]), n;
  }
  onError(s) {
    let n = this.makeRef();
    return this.stateChangeCallbacks.error.push([n, s]), n;
  }
  onMessage(s) {
    let n = this.makeRef();
    return this.stateChangeCallbacks.message.push([n, s]), n;
  }
  ping(s) {
    if (!this.isConnected())
      return !1;
    let n = this.makeRef(), t = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: n });
    let e = this.onMessage((r) => {
      r.ref === n && (this.off([e]), s(Date.now() - t));
    });
    return !0;
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(([, s]) => s());
  }
  heartbeatTimeout() {
    this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Ys, "heartbeat timeout"));
  }
  resetHeartbeat() {
    this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
  }
  teardown(s, n, t) {
    if (!this.conn)
      return s && s();
    this.waitForBufferDone(() => {
      this.conn && (n ? this.conn.close(n, t || "") : this.conn.close()), this.waitForSocketClosed(() => {
        this.conn && (this.conn.onopen = function() {
        }, this.conn.onerror = function() {
        }, this.conn.onmessage = function() {
        }, this.conn.onclose = function() {
        }, this.conn = null), s && s();
      });
    });
  }
  waitForBufferDone(s, n = 1) {
    if (n === 5 || !this.conn || !this.conn.bufferedAmount) {
      s();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(s, n + 1);
    }, 150 * n);
  }
  waitForSocketClosed(s, n = 1) {
    if (n === 5 || !this.conn || this.conn.readyState === F.closed) {
      s();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(s, n + 1);
    }, 150 * n);
  }
  onConnClose(s) {
    let n = s && s.code;
    this.hasLogger() && this.log("transport", "close", s), this.triggerChanError(), this.clearHeartbeats(), !this.closeWasClean && n !== 1e3 && this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(([, t]) => t(s));
  }
  onConnError(s) {
    this.hasLogger() && this.log("transport", s);
    let n = this.transport, t = this.establishedConnections;
    this.stateChangeCallbacks.error.forEach(([, e]) => {
      e(s, n, t);
    }), (n === this.transport || t > 0) && this.triggerChanError();
  }
  triggerChanError() {
    this.channels.forEach((s) => {
      s.isErrored() || s.isLeaving() || s.isClosed() || s.trigger(G.error);
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case F.connecting:
        return "connecting";
      case F.open:
        return "open";
      case F.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  isConnected() {
    return this.connectionState() === "open";
  }
  remove(s) {
    this.off(s.stateChangeRefs), this.channels = this.channels.filter((n) => n.joinRef() !== s.joinRef());
  }
  off(s) {
    for (let n in this.stateChangeCallbacks)
      this.stateChangeCallbacks[n] = this.stateChangeCallbacks[n].filter(([t]) => s.indexOf(t) === -1);
  }
  channel(s, n = {}) {
    let t = new Qs(s, n, this);
    return this.channels.push(t), t;
  }
  push(s) {
    if (this.hasLogger()) {
      let { topic: n, event: t, payload: e, ref: r, join_ref: i } = s;
      this.log("push", `${n} ${t} (${i}, ${r})`, e);
    }
    this.isConnected() ? this.encode(s, (n) => this.conn.send(n)) : this.sendBuffer.push(() => this.encode(s, (n) => this.conn.send(n)));
  }
  makeRef() {
    let s = this.ref + 1;
    return s === this.ref ? this.ref = 0 : this.ref = s, this.ref.toString();
  }
  sendHeartbeat() {
    this.pendingHeartbeatRef && !this.isConnected() || (this.pendingHeartbeatRef = this.makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef }), this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs));
  }
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((s) => s()), this.sendBuffer = []);
  }
  onConnMessage(s) {
    this.decode(s.data, (n) => {
      let { topic: t, event: e, payload: r, ref: i, join_ref: a } = n;
      i && i === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${r.status || ""} ${t} ${e} ${i && "(" + i + ")" || ""}`, r);
      for (let h = 0; h < this.channels.length; h++) {
        const p = this.channels[h];
        p.isMember(t, e, r, a) && p.trigger(e, r, i, a);
      }
      for (let h = 0; h < this.stateChangeCallbacks.message.length; h++) {
        let [, p] = this.stateChangeCallbacks.message[h];
        p(n);
      }
    });
  }
  leaveOpenTopic(s) {
    let n = this.channels.find((t) => t.topic === s && (t.isJoined() || t.isJoining()));
    n && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${s}"`), n.leave());
  }
};
class tn {
  constructor(n) {
    this.connected = !1, this.config = n, this.socket = new Ks(this.config.url, this.config.socketOptions || { logger: (t, e, r) => {
      console.debug(`${t}: ${e}`, r);
    } }), this.channel = this.socket.channel(this.config.topic, this.config.params), this.eventTarget = new EventTarget();
  }
  /** connect to socket and join channel. will do nothing if already connected */
  connect() {
    this.connected || (this.socket.onError((n) => this.emitError("socket error", n)), this.socket.connect(), this.channel.onError((n) => this.emitError("channel error", n)), this.channel.join().receive("ok", (n) => {
      console.debug("channel joined", n);
    }).receive("error", (n) => {
      this.emitError("channel join error", n);
    }), this.channel.on("state:change", (n) => this.handleChange(n)), this.channel.on("state:patch", (n) => this.handlePatch(n)), this.connected = !0);
  }
  /** leave channel and disconnect from socket */
  disconnect() {
    this.channel && this.channel.leave(), this.socket.disconnect(), this.connected = !1;
  }
  /** for events that begin with 'livestate-', add a listener. For
   * other events, additionally call `channel.on` to receive the event
   * over the channel, which will then be dispatched.
   */
  addEventListener(n, t, e) {
    var r;
    this.eventTarget.addEventListener(n, t, e), n.startsWith("livestate-") || (r = this.channel) == null || r.on(n, (i) => {
      this.eventTarget.dispatchEvent(new CustomEvent(n, { detail: i }));
    });
  }
  removeEventListener(n, t, e) {
    return this.eventTarget.removeEventListener(n, t, e);
  }
  /** @deprecated */
  subscribe(n) {
    this.addEventListener("livestate-change", n);
  }
  /** @deprecated */
  unsubscribe(n) {
    this.removeEventListener("livestate-change", n);
  }
  emitError(n, t) {
    this.eventTarget.dispatchEvent(new CustomEvent("livestate-error", {
      detail: {
        kind: n,
        error: t
      }
    }));
  }
  handleChange({ state: n, version: t }) {
    this.state = n, this.stateVersion = t, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
      detail: {
        state: this.state,
        version: this.stateVersion
      }
    }));
  }
  handlePatch({ patch: n, version: t }) {
    if (this.eventTarget.dispatchEvent(new CustomEvent("livestate-patch", {
      detail: { patch: n, version: t }
    })), this.versionMatches(t)) {
      const { doc: e, res: r } = Ws(this.state, n, { mutate: !1 });
      this.state = e, this.stateVersion = t, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
        detail: {
          state: this.state,
          version: this.stateVersion
        }
      }));
    } else
      this.channel.push("lvs_refresh");
  }
  versionMatches(n) {
    return n === this.stateVersion + 1 || n === 0;
  }
  pushEvent(n, t) {
    this.dispatchEvent(new CustomEvent(n, { detail: t }));
  }
  /** Pushes the event over the channel, adding the `lvs_evt:` prefix and using the CustomEvent
   * detail property as the payload
   */
  dispatchEvent(n) {
    return this.channel.push(`lvs_evt:${n.type}`, n.detail), !0;
  }
  pushCustomEvent(n) {
    this.dispatchEvent(n);
  }
}
Promise.resolve();
var se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var ne;
(function(s) {
  (function(n) {
    var t = typeof se == "object" ? se : typeof self == "object" ? self : typeof this == "object" ? this : Function("return this;")(), e = r(s);
    typeof t.Reflect > "u" ? t.Reflect = s : e = r(t.Reflect, e), n(e);
    function r(i, a) {
      return function(h, p) {
        typeof i[h] != "function" && Object.defineProperty(i, h, { configurable: !0, writable: !0, value: p }), a && a(h, p);
      };
    }
  })(function(n) {
    var t = Object.prototype.hasOwnProperty, e = typeof Symbol == "function", r = e && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", i = e && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", a = typeof Object.create == "function", h = { __proto__: [] } instanceof Array, p = !a && !h, g = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: a ? function() {
        return St(/* @__PURE__ */ Object.create(null));
      } : h ? function() {
        return St({ __proto__: null });
      } : function() {
        return St({});
      },
      has: p ? function(o, c) {
        return t.call(o, c);
      } : function(o, c) {
        return c in o;
      },
      get: p ? function(o, c) {
        return t.call(o, c) ? o[c] : void 0;
      } : function(o, c) {
        return o[c];
      }
    }, b = Object.getPrototypeOf(Function), f = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", A = !f && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Ae(), j = !f && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : je(), x = !f && typeof WeakMap == "function" ? WeakMap : Te(), P = new x();
    function M(o, c, l, u) {
      if (L(l)) {
        if (!Gt(o))
          throw new TypeError();
        if (!Xt(c))
          throw new TypeError();
        return D(o, c);
      } else {
        if (!Gt(o))
          throw new TypeError();
        if (!N(c))
          throw new TypeError();
        if (!N(u) && !L(u) && !rt(u))
          throw new TypeError();
        return rt(u) && (u = void 0), l = z(l), U(o, c, l, u);
      }
    }
    n("decorate", M);
    function X(o, c) {
      function l(u, v) {
        if (!N(u))
          throw new TypeError();
        if (!L(v) && !be(v))
          throw new TypeError();
        Bt(o, c, u, v);
      }
      return l;
    }
    n("metadata", X);
    function q(o, c, l, u) {
      if (!N(l))
        throw new TypeError();
      return L(u) || (u = z(u)), Bt(o, c, l, u);
    }
    n("defineMetadata", q);
    function Q(o, c, l) {
      if (!N(c))
        throw new TypeError();
      return L(l) || (l = z(l)), et(o, c, l);
    }
    n("hasMetadata", Q);
    function K(o, c, l) {
      if (!N(c))
        throw new TypeError();
      return L(l) || (l = z(l)), nt(o, c, l);
    }
    n("hasOwnMetadata", K);
    function tt(o, c, l) {
      if (!N(c))
        throw new TypeError();
      return L(l) || (l = z(l)), Jt(o, c, l);
    }
    n("getMetadata", tt);
    function Y(o, c, l) {
      if (!N(c))
        throw new TypeError();
      return L(l) || (l = z(l)), Vt(o, c, l);
    }
    n("getOwnMetadata", Y);
    function O(o, c) {
      if (!N(o))
        throw new TypeError();
      return L(c) || (c = z(c)), Ft(o, c);
    }
    n("getMetadataKeys", O);
    function H(o, c) {
      if (!N(o))
        throw new TypeError();
      return L(c) || (c = z(c)), zt(o, c);
    }
    n("getOwnMetadataKeys", H);
    function m(o, c, l) {
      if (!N(c))
        throw new TypeError();
      L(l) || (l = z(l));
      var u = B(
        c,
        l,
        /*Create*/
        !1
      );
      if (L(u) || !u.delete(o))
        return !1;
      if (u.size > 0)
        return !0;
      var v = P.get(c);
      return v.delete(l), v.size > 0 || P.delete(c), !0;
    }
    n("deleteMetadata", m);
    function D(o, c) {
      for (var l = o.length - 1; l >= 0; --l) {
        var u = o[l], v = u(c);
        if (!L(v) && !rt(v)) {
          if (!Xt(v))
            throw new TypeError();
          c = v;
        }
      }
      return c;
    }
    function U(o, c, l, u) {
      for (var v = o.length - 1; v >= 0; --v) {
        var R = o[v], w = R(c, l, u);
        if (!L(w) && !rt(w)) {
          if (!N(w))
            throw new TypeError();
          u = w;
        }
      }
      return u;
    }
    function B(o, c, l) {
      var u = P.get(o);
      if (L(u)) {
        if (!l)
          return;
        u = new A(), P.set(o, u);
      }
      var v = u.get(c);
      if (L(v)) {
        if (!l)
          return;
        v = new A(), u.set(c, v);
      }
      return v;
    }
    function et(o, c, l) {
      var u = nt(o, c, l);
      if (u)
        return !0;
      var v = Ot(c);
      return rt(v) ? !1 : et(o, v, l);
    }
    function nt(o, c, l) {
      var u = B(
        c,
        l,
        /*Create*/
        !1
      );
      return L(u) ? !1 : we(u.has(o));
    }
    function Jt(o, c, l) {
      var u = nt(o, c, l);
      if (u)
        return Vt(o, c, l);
      var v = Ot(c);
      if (!rt(v))
        return Jt(o, v, l);
    }
    function Vt(o, c, l) {
      var u = B(
        c,
        l,
        /*Create*/
        !1
      );
      if (!L(u))
        return u.get(o);
    }
    function Bt(o, c, l, u) {
      var v = B(
        l,
        u,
        /*Create*/
        !0
      );
      v.set(o, c);
    }
    function Ft(o, c) {
      var l = zt(o, c), u = Ot(o);
      if (u === null)
        return l;
      var v = Ft(u, c);
      if (v.length <= 0)
        return l;
      if (l.length <= 0)
        return v;
      for (var R = new j(), w = [], _ = 0, y = l; _ < y.length; _++) {
        var k = y[_], C = R.has(k);
        C || (R.add(k), w.push(k));
      }
      for (var Z = 0, Yt = v; Z < Yt.length; Z++) {
        var k = Yt[Z], C = R.has(k);
        C || (R.add(k), w.push(k));
      }
      return w;
    }
    function zt(o, c) {
      var l = [], u = B(
        o,
        c,
        /*Create*/
        !1
      );
      if (L(u))
        return l;
      for (var v = u.keys(), R = Ee(v), w = 0; ; ) {
        var _ = Ce(R);
        if (!_)
          return l.length = w, l;
        var y = ke(_);
        try {
          l[w] = y;
        } catch (k) {
          try {
            $e(R);
          } finally {
            throw k;
          }
        }
        w++;
      }
    }
    function Wt(o) {
      if (o === null)
        return 1;
      switch (typeof o) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return o === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function L(o) {
      return o === void 0;
    }
    function rt(o) {
      return o === null;
    }
    function ve(o) {
      return typeof o == "symbol";
    }
    function N(o) {
      return typeof o == "object" ? o !== null : typeof o == "function";
    }
    function ye(o, c) {
      switch (Wt(o)) {
        case 0:
          return o;
        case 1:
          return o;
        case 2:
          return o;
        case 3:
          return o;
        case 4:
          return o;
        case 5:
          return o;
      }
      var l = c === 3 ? "string" : c === 5 ? "number" : "default", u = qt(o, r);
      if (u !== void 0) {
        var v = u.call(o, l);
        if (N(v))
          throw new TypeError();
        return v;
      }
      return me(o, l === "default" ? "number" : l);
    }
    function me(o, c) {
      if (c === "string") {
        var l = o.toString;
        if (it(l)) {
          var u = l.call(o);
          if (!N(u))
            return u;
        }
        var v = o.valueOf;
        if (it(v)) {
          var u = v.call(o);
          if (!N(u))
            return u;
        }
      } else {
        var v = o.valueOf;
        if (it(v)) {
          var u = v.call(o);
          if (!N(u))
            return u;
        }
        var R = o.toString;
        if (it(R)) {
          var u = R.call(o);
          if (!N(u))
            return u;
        }
      }
      throw new TypeError();
    }
    function we(o) {
      return !!o;
    }
    function _e(o) {
      return "" + o;
    }
    function z(o) {
      var c = ye(
        o,
        3
        /* String */
      );
      return ve(c) ? c : _e(c);
    }
    function Gt(o) {
      return Array.isArray ? Array.isArray(o) : o instanceof Object ? o instanceof Array : Object.prototype.toString.call(o) === "[object Array]";
    }
    function it(o) {
      return typeof o == "function";
    }
    function Xt(o) {
      return typeof o == "function";
    }
    function be(o) {
      switch (Wt(o)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function qt(o, c) {
      var l = o[c];
      if (l != null) {
        if (!it(l))
          throw new TypeError();
        return l;
      }
    }
    function Ee(o) {
      var c = qt(o, i);
      if (!it(c))
        throw new TypeError();
      var l = c.call(o);
      if (!N(l))
        throw new TypeError();
      return l;
    }
    function ke(o) {
      return o.value;
    }
    function Ce(o) {
      var c = o.next();
      return c.done ? !1 : c;
    }
    function $e(o) {
      var c = o.return;
      c && c.call(o);
    }
    function Ot(o) {
      var c = Object.getPrototypeOf(o);
      if (typeof o != "function" || o === b || c !== b)
        return c;
      var l = o.prototype, u = l && Object.getPrototypeOf(l);
      if (u == null || u === Object.prototype)
        return c;
      var v = u.constructor;
      return typeof v != "function" || v === o ? c : v;
    }
    function Ae() {
      var o = {}, c = [], l = (
        /** @class */
        function() {
          function w(_, y, k) {
            this._index = 0, this._keys = _, this._values = y, this._selector = k;
          }
          return w.prototype["@@iterator"] = function() {
            return this;
          }, w.prototype[i] = function() {
            return this;
          }, w.prototype.next = function() {
            var _ = this._index;
            if (_ >= 0 && _ < this._keys.length) {
              var y = this._selector(this._keys[_], this._values[_]);
              return _ + 1 >= this._keys.length ? (this._index = -1, this._keys = c, this._values = c) : this._index++, { value: y, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, w.prototype.throw = function(_) {
            throw this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), _;
          }, w.prototype.return = function(_) {
            return this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), { value: _, done: !0 };
          }, w;
        }()
      );
      return (
        /** @class */
        function() {
          function w() {
            this._keys = [], this._values = [], this._cacheKey = o, this._cacheIndex = -2;
          }
          return Object.defineProperty(w.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), w.prototype.has = function(_) {
            return this._find(
              _,
              /*insert*/
              !1
            ) >= 0;
          }, w.prototype.get = function(_) {
            var y = this._find(
              _,
              /*insert*/
              !1
            );
            return y >= 0 ? this._values[y] : void 0;
          }, w.prototype.set = function(_, y) {
            var k = this._find(
              _,
              /*insert*/
              !0
            );
            return this._values[k] = y, this;
          }, w.prototype.delete = function(_) {
            var y = this._find(
              _,
              /*insert*/
              !1
            );
            if (y >= 0) {
              for (var k = this._keys.length, C = y + 1; C < k; C++)
                this._keys[C - 1] = this._keys[C], this._values[C - 1] = this._values[C];
              return this._keys.length--, this._values.length--, _ === this._cacheKey && (this._cacheKey = o, this._cacheIndex = -2), !0;
            }
            return !1;
          }, w.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = o, this._cacheIndex = -2;
          }, w.prototype.keys = function() {
            return new l(this._keys, this._values, u);
          }, w.prototype.values = function() {
            return new l(this._keys, this._values, v);
          }, w.prototype.entries = function() {
            return new l(this._keys, this._values, R);
          }, w.prototype["@@iterator"] = function() {
            return this.entries();
          }, w.prototype[i] = function() {
            return this.entries();
          }, w.prototype._find = function(_, y) {
            return this._cacheKey !== _ && (this._cacheIndex = this._keys.indexOf(this._cacheKey = _)), this._cacheIndex < 0 && y && (this._cacheIndex = this._keys.length, this._keys.push(_), this._values.push(void 0)), this._cacheIndex;
          }, w;
        }()
      );
      function u(w, _) {
        return w;
      }
      function v(w, _) {
        return _;
      }
      function R(w, _) {
        return [w, _];
      }
    }
    function je() {
      return (
        /** @class */
        function() {
          function o() {
            this._map = new A();
          }
          return Object.defineProperty(o.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), o.prototype.has = function(c) {
            return this._map.has(c);
          }, o.prototype.add = function(c) {
            return this._map.set(c, c), this;
          }, o.prototype.delete = function(c) {
            return this._map.delete(c);
          }, o.prototype.clear = function() {
            this._map.clear();
          }, o.prototype.keys = function() {
            return this._map.keys();
          }, o.prototype.values = function() {
            return this._map.values();
          }, o.prototype.entries = function() {
            return this._map.entries();
          }, o.prototype["@@iterator"] = function() {
            return this.keys();
          }, o.prototype[i] = function() {
            return this.keys();
          }, o;
        }()
      );
    }
    function Te() {
      var o = 16, c = g.create(), l = u();
      return (
        /** @class */
        function() {
          function y() {
            this._key = u();
          }
          return y.prototype.has = function(k) {
            var C = v(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? g.has(C, this._key) : !1;
          }, y.prototype.get = function(k) {
            var C = v(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? g.get(C, this._key) : void 0;
          }, y.prototype.set = function(k, C) {
            var Z = v(
              k,
              /*create*/
              !0
            );
            return Z[this._key] = C, this;
          }, y.prototype.delete = function(k) {
            var C = v(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? delete C[this._key] : !1;
          }, y.prototype.clear = function() {
            this._key = u();
          }, y;
        }()
      );
      function u() {
        var y;
        do
          y = "@@WeakMap@@" + _();
        while (g.has(c, y));
        return c[y] = !0, y;
      }
      function v(y, k) {
        if (!t.call(y, l)) {
          if (!k)
            return;
          Object.defineProperty(y, l, { value: g.create() });
        }
        return y[l];
      }
      function R(y, k) {
        for (var C = 0; C < k; ++C)
          y[C] = Math.random() * 255 | 0;
        return y;
      }
      function w(y) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(y)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(y)) : R(new Uint8Array(y), y) : R(new Array(y), y);
      }
      function _() {
        var y = w(o);
        y[6] = y[6] & 79 | 64, y[8] = y[8] & 191 | 128;
        for (var k = "", C = 0; C < o; ++C) {
          var Z = y[C];
          (C === 4 || C === 6 || C === 8) && (k += "-"), Z < 16 && (k += "0"), k += Z.toString(16).toLowerCase();
        }
        return k;
      }
    }
    function St(o) {
      return o.__ = void 0, delete o.__, o;
    }
  });
})(ne || (ne = {}));
function en() {
  const s = document.createElement("style");
  return s.textContent = `
    * {
      cursor: crosshair !important;
    }
  `, s;
}
function sn() {
  const s = document.createElement("style");
  return s.textContent = `
    * {
      pointer-events: none !important;
      user-select: none !important;
    }
  `, s;
}
function nn(s) {
  Le(s, "svelte-150j673", '#liveroom-client-element.svelte-150j673.svelte-150j673{font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}#users-container.svelte-150j673.svelte-150j673{z-index:99999;position:fixed;inset:0;overflow:hidden;pointer-events:none}.user.svelte-150j673.svelte-150j673{z-index:10;position:absolute;top:0;left:0;user-select:none;transform:translate(var(--x), var(--y));transition:transform 100ms linear;will-change:transform}.user.svelte-150j673 .cursor.svelte-150j673{position:absolute;top:0;left:0;color:var(--color);transform-origin:top left;transform:rotate(6deg)}.user[data-isself="true"].svelte-150j673 .cursor.svelte-150j673{display:none}.user-name.svelte-150j673.svelte-150j673{padding:0.25rem 0.7rem;font-size:0.8rem;font-weight:600;color:black;background-color:var(--color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:9999px;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-150j673 .user-name.svelte-150j673{position:absolute;top:20px;left:16px}.user[data-isself="true"].svelte-150j673 .user-name.svelte-150j673{display:none}.user.svelte-150j673 .halo.svelte-150j673{transform:scale(0);z-index:-1;position:absolute;top:-60px;left:-60px;width:120px;height:120px;border-radius:9999px;background-color:var(--color);opacity:0.25;transition:transform 100ms ease-out;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-150j673 .halo[data-show="true"].svelte-150j673{transform:scale(1)}');
}
function re(s, n, t) {
  const e = s.slice();
  return e[22] = n[t], e;
}
function ie(s) {
  let n, t = [], e = /* @__PURE__ */ new Map(), r = ee(Object.values(
    /*users*/
    s[0]
  ));
  const i = (a) => (
    /*user*/
    a[22].id
  );
  for (let a = 0; a < r.length; a += 1) {
    let h = re(s, r, a), p = i(h);
    e.set(p, t[a] = oe(p, h));
  }
  return {
    c() {
      n = st("div");
      for (let a = 0; a < t.length; a += 1)
        t[a].c();
      S(n, "id", "users-container"), S(n, "class", "svelte-150j673");
    },
    m(a, h) {
      jt(a, n, h);
      for (let p = 0; p < t.length; p += 1)
        t[p] && t[p].m(n, null);
    },
    p(a, h) {
      h & /*Object, users, me, parseFloat, users_count*/
      7 && (r = ee(Object.values(
        /*users*/
        a[0]
      )), t = Ge(t, h, i, 1, a, r, e, n, We, oe, null, re));
    },
    d(a) {
      a && wt(n);
      for (let h = 0; h < t.length; h += 1)
        t[h].d();
    }
  };
}
function oe(s, n) {
  let t, e, r, i, a, h = (
    /*user*/
    n[22].name + ""
  ), p, g, b, f, A, j, x;
  return {
    key: s,
    first: null,
    c() {
      t = st("div"), e = Qt("svg"), r = Qt("path"), i = xt(), a = st("span"), p = ce(h), g = xt(), b = st("div"), A = xt(), S(r, "d", "M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"), S(e, "width", "23"), S(e, "viewBox", "0 0 27 24"), S(e, "fill", "currentColor"), S(e, "aria-hidden", "true"), S(e, "xmlns", "http://www.w3.org/2000/svg"), S(e, "class", "cursor svelte-150j673"), S(a, "class", "user-name svelte-150j673"), S(b, "class", "halo svelte-150j673"), S(b, "data-show", f = /*user*/
      (n[22].id == /*me*/
      n[1].id && /*user*/
      n[22].is_shift_key_down || /*user*/
      n[22].id != /*me*/
      n[1].id && /*user*/
      (n[22].is_shift_key_down || /*user*/
      n[22].is_mouse_down)) && /*users_count*/
      n[2] > 1), S(t, "id", j = "user-" + /*user*/
      n[22].id), S(t, "class", "user svelte-150j673"), S(t, "data-isself", x = /*user*/
      n[22].id == /*me*/
      n[1].id), ot(
        t,
        "--color",
        /*user*/
        n[22].color
      ), ot(t, "--x", parseFloat(
        /*user*/
        n[22].x
      ) + "vw"), ot(t, "--y", parseFloat(
        /*user*/
        n[22].y
      ) + "vh"), this.first = t;
    },
    m(P, M) {
      jt(P, t, M), W(t, e), W(e, r), W(t, i), W(t, a), W(a, p), W(t, g), W(t, b), W(t, A);
    },
    p(P, M) {
      n = P, M & /*users*/
      1 && h !== (h = /*user*/
      n[22].name + "") && He(p, h), M & /*users, me, users_count*/
      7 && f !== (f = /*user*/
      (n[22].id == /*me*/
      n[1].id && /*user*/
      n[22].is_shift_key_down || /*user*/
      n[22].id != /*me*/
      n[1].id && /*user*/
      (n[22].is_shift_key_down || /*user*/
      n[22].is_mouse_down)) && /*users_count*/
      n[2] > 1) && S(b, "data-show", f), M & /*users*/
      1 && j !== (j = "user-" + /*user*/
      n[22].id) && S(t, "id", j), M & /*users, me*/
      3 && x !== (x = /*user*/
      n[22].id == /*me*/
      n[1].id) && S(t, "data-isself", x), M & /*users*/
      1 && ot(
        t,
        "--color",
        /*user*/
        n[22].color
      ), M & /*users*/
      1 && ot(t, "--x", parseFloat(
        /*user*/
        n[22].x
      ) + "vw"), M & /*users*/
      1 && ot(t, "--y", parseFloat(
        /*user*/
        n[22].y
      ) + "vh");
    },
    d(P) {
      P && wt(t);
    }
  };
}
function rn(s) {
  let n, t = (
    /*me*/
    s[1] && /*users*/
    s[0] && ie(s)
  );
  return {
    c() {
      n = st("div"), t && t.c(), S(n, "id", "liveroom-client-element"), S(n, "class", "svelte-150j673");
    },
    m(e, r) {
      jt(e, n, r), t && t.m(n, null);
    },
    p(e, [r]) {
      /*me*/
      e[1] && /*users*/
      e[0] ? t ? t.p(e, r) : (t = ie(e), t.c(), t.m(n, null)) : t && (t.d(1), t = null);
    },
    i: gt,
    o: gt,
    d(e) {
      e && wt(n), t && t.d();
    }
  };
}
function on(s, n, t) {
  let { version: e } = n, { url: r } = n, { room_id: i } = n, { user_name: a = void 0 } = n, h, p = !1, g = en(), b = sn(), f, A, j;
  De(async () => {
    console.log(`[Liveroom] Starting... (v${e})`);
    const m = new URLSearchParams(window.location.search), D = m.get("_liveroom"), U = D == null ? void 0 : D.split("https://meet.google.com/");
    let B = U == null ? void 0 : U[0];
    !!(U != null && U[1]) && (B = U[1].split("?")[0]), t(3, i = B || i);
    const nt = m.get("_liveroom_user_name");
    nt && t(4, a = nt), x();
  }), Ue(() => {
    P(), H();
  });
  function x() {
    h = new tn({
      url: r,
      topic: `liveroom-livestate:${i}`,
      params: {
        room_id: i,
        user_name: a,
        referrer: document.referrer,
        current_url: window.location.href,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        language: window.navigator.language,
        user_agent: window.navigator.userAgent
      },
      socketOptions: { logger: null }
    }), h.addEventListener("click-from-another-user", ({ detail: { x: m, y: D } }) => {
      const U = new MouseEvent(
        "click",
        {
          view: window,
          bubbles: !0,
          cancelable: !0,
          clientX: window.innerWidth * parseFloat(m) / 100,
          clientY: window.innerHeight * parseFloat(D) / 100
        }
      ), B = document.head.contains(b);
      B && document.head.removeChild(b);
      const et = document.elementFromPoint(U.clientX, U.clientY);
      B && document.head.appendChild(b), (et instanceof HTMLElement || et instanceof SVGElement) && et.dispatchEvent(U);
    }), h.addEventListener("livestate-change", ({ detail: { state: m } }) => {
      t(3, i = m.room_id), t(1, f = m.me), t(0, A = m.users);
    }), h.connect(), window.addEventListener("mousemove", M), window.addEventListener("mousedown", X), window.addEventListener("mouseup", q), window.addEventListener("keydown", K), window.addEventListener("keyup", tt), window.addEventListener("resize", Y);
  }
  function P() {
    window.removeEventListener("resize", Y), window.removeEventListener("keyup", tt), window.removeEventListener("keydown", K), window.removeEventListener("mouseup", q), window.removeEventListener("mousedown", X), window.removeEventListener("mousemove", M), h == null || h.disconnect();
  }
  function M(m) {
    h && (f != null && f.id) && h.dispatchEvent(new CustomEvent(
      "mouse_move",
      {
        detail: {
          user_id: f.id,
          x: Number(m.clientX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(m.clientY / window.innerHeight * 100).toFixed(2)
        }
        // in %
      }
    ));
  }
  function X() {
    h && (f != null && f.id) && h.dispatchEvent(new CustomEvent("mouse_down", { detail: { user_id: f.id } }));
  }
  function q() {
    h && (f != null && f.id) && h.dispatchEvent(new CustomEvent("mouse_up", { detail: { user_id: f.id } }));
  }
  const Q = ["Shift"];
  function K(m) {
    !m.repeat && Q.includes(m.key) && h && (f != null && f.id) && h.dispatchEvent(new CustomEvent("key_down", { detail: { key: m.key, user_id: f.id } }));
  }
  function tt(m) {
    Q.includes(m.key) && h && (f != null && f.id) && h.dispatchEvent(new CustomEvent("key_up", { detail: { key: m.key, user_id: f.id } }));
  }
  function Y() {
    h && (f != null && f.id) && h.dispatchEvent(new CustomEvent(
      "window_resize",
      {
        detail: {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
          user_id: f.id
        }
      }
    ));
  }
  function O() {
    document.head.appendChild(g), document.head.appendChild(b), t(7, p = !0);
  }
  function H() {
    document.head.removeChild(g), document.head.removeChild(b), t(7, p = !1);
  }
  return s.$$set = (m) => {
    "version" in m && t(5, e = m.version), "url" in m && t(6, r = m.url), "room_id" in m && t(3, i = m.room_id), "user_name" in m && t(4, a = m.user_name);
  }, s.$$.update = () => {
    s.$$.dirty & /*users*/
    1 && t(2, j = Object.keys(A || {}).length), s.$$.dirty & /*isClickBlocked, users*/
    129 && !p && A && Object.values(A).some((m) => m.type == "admin" && m.is_space_key_down) && O(), s.$$.dirty & /*isClickBlocked, users*/
    129 && p && A && Object.values(A).filter((m) => m.type == "admin").every((m) => !m.is_space_key_down) && H();
  }, [A, f, j, i, a, e, r, p];
}
class an extends Ke {
  constructor(n) {
    super(), Ze(
      this,
      n,
      on,
      rn,
      xe,
      {
        version: 5,
        url: 6,
        room_id: 3,
        user_name: 4
      },
      nn
    );
  }
  get version() {
    return this.$$.ctx[5];
  }
  set version(n) {
    this.$$set({ version: n }), ct();
  }
  get url() {
    return this.$$.ctx[6];
  }
  set url(n) {
    this.$$set({ url: n }), ct();
  }
  get room_id() {
    return this.$$.ctx[3];
  }
  set room_id(n) {
    this.$$set({ room_id: n }), ct();
  }
  get user_name() {
    return this.$$.ctx[4];
  }
  set user_name(n) {
    this.$$set({ user_name: n }), ct();
  }
}
customElements.define("liveroom-client-element", Qe(an, { version: {}, url: {}, room_id: {}, user_name: {} }, [], [], !0));
export {
  an as default
};
