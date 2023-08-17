var je = Object.defineProperty;
var xe = (s, n, t) => n in s ? je(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var f = (s, n, t) => (xe(s, typeof n != "symbol" ? n + "" : n, t), t);
function pt() {
}
function oe(s) {
  return s();
}
function Zt() {
  return /* @__PURE__ */ Object.create(null);
}
function gt(s) {
  s.forEach(oe);
}
function ae(s) {
  return typeof s == "function";
}
function Se(s, n) {
  return s != s ? n == n : s !== n || s && typeof s == "object" || typeof s == "function";
}
function Me(s) {
  return Object.keys(s).length === 0;
}
function F(s, n) {
  s.appendChild(n);
}
function Le(s, n, t) {
  const e = Ne(s);
  if (!e.getElementById(n)) {
    const r = Z("style");
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
  return F(
    /** @type {Document} */
    s.head || s,
    n
  ), n.sheet;
}
function Ct(s, n, t) {
  s.insertBefore(n, t || null);
}
function vt(s) {
  s.parentNode && s.parentNode.removeChild(s);
}
function Z(s) {
  return document.createElement(s);
}
function Qt(s) {
  return document.createElementNS("http://www.w3.org/2000/svg", s);
}
function he(s) {
  return document.createTextNode(s);
}
function jt() {
  return he(" ");
}
function S(s, n, t) {
  t == null ? s.removeAttribute(n) : s.getAttribute(n) !== t && s.setAttribute(n, t);
}
function He(s) {
  return Array.from(s.childNodes);
}
function Pe(s, n) {
  n = "" + n, s.data !== n && (s.data = /** @type {string} */
  n);
}
function st(s, n, t, e) {
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
let ft;
function ht(s) {
  ft = s;
}
function ce() {
  if (!ft)
    throw new Error("Function called outside component initialization");
  return ft;
}
function De(s) {
  ce().$$.on_mount.push(s);
}
function Ue(s) {
  ce().$$.on_destroy.push(s);
}
const rt = [], Mt = [];
let it = [];
const Kt = [], Je = /* @__PURE__ */ Promise.resolve();
let Lt = !1;
function Ve() {
  Lt || (Lt = !0, Je.then(ct));
}
function Nt(s) {
  it.push(s);
}
const xt = /* @__PURE__ */ new Set();
let nt = 0;
function ct() {
  if (nt !== 0)
    return;
  const s = ft;
  do {
    try {
      for (; nt < rt.length; ) {
        const n = rt[nt];
        nt++, ht(n), Be(n.$$);
      }
    } catch (n) {
      throw rt.length = 0, nt = 0, n;
    }
    for (ht(null), rt.length = 0, nt = 0; Mt.length; )
      Mt.pop()();
    for (let n = 0; n < it.length; n += 1) {
      const t = it[n];
      xt.has(t) || (xt.add(t), t());
    }
    it.length = 0;
  } while (rt.length);
  for (; Kt.length; )
    Kt.pop()();
  Lt = !1, xt.clear(), ht(s);
}
function Be(s) {
  if (s.fragment !== null) {
    s.update(), gt(s.before_update);
    const n = s.dirty;
    s.dirty = [-1], s.fragment && s.fragment.p(s.ctx, n), s.after_update.forEach(Nt);
  }
}
function ze(s) {
  const n = [], t = [];
  it.forEach((e) => s.indexOf(e) === -1 ? n.push(e) : t.push(e)), t.forEach((e) => e()), it = n;
}
const Fe = /* @__PURE__ */ new Set();
function le(s, n) {
  s && s.i && (Fe.delete(s), s.i(n));
}
function te(s) {
  return (s == null ? void 0 : s.length) !== void 0 ? s : Array.from(s);
}
function We(s, n) {
  s.d(1), n.delete(s.key);
}
function Ge(s, n, t, e, r, i, a, h, l, d, _, b) {
  let T = s.length, O = i.length, x = T;
  const R = {};
  for (; x--; )
    R[s[x].key] = x;
  const M = [], G = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map(), Y = [];
  for (x = O; x--; ) {
    const A = b(r, i, x), P = t(A);
    let D = a.get(P);
    D ? e && Y.push(() => D.p(A, n)) : (D = d(P, A), D.c()), G.set(P, M[x] = D), P in R && X.set(P, Math.abs(x - R[P]));
  }
  const Q = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set();
  function V(A) {
    le(A, 1), A.m(h, _), a.set(A.key, A), _ = A.first, O--;
  }
  for (; T && O; ) {
    const A = M[O - 1], P = s[T - 1], D = A.key, K = P.key;
    A === P ? (_ = A.first, T--, O--) : G.has(K) ? !a.has(D) || Q.has(D) ? V(A) : k.has(K) ? T-- : X.get(D) > X.get(K) ? (k.add(D), V(A)) : (Q.add(K), T--) : (l(P, a), T--);
  }
  for (; T--; ) {
    const A = s[T];
    G.has(A.key) || l(A, a);
  }
  for (; O; )
    V(M[O - 1]);
  return gt(Y), M;
}
function Xe(s, n, t) {
  const { fragment: e, after_update: r } = s.$$;
  e && e.m(n, t), Nt(() => {
    const i = s.$$.on_mount.map(oe).filter(ae);
    s.$$.on_destroy ? s.$$.on_destroy.push(...i) : gt(i), s.$$.on_mount = [];
  }), r.forEach(Nt);
}
function qe(s, n) {
  const t = s.$$;
  t.fragment !== null && (ze(t.after_update), gt(t.on_destroy), t.fragment && t.fragment.d(n), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Ye(s, n) {
  s.$$.dirty[0] === -1 && (rt.push(s), Ve(), s.$$.dirty.fill(0)), s.$$.dirty[n / 31 | 0] |= 1 << n % 31;
}
function Ze(s, n, t, e, r, i, a, h = [-1]) {
  const l = ft;
  ht(s);
  const d = s.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: pt,
    not_equal: r,
    bound: Zt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(n.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: Zt(),
    dirty: h,
    skip_bound: !1,
    root: n.target || l.$$.root
  };
  a && a(d.root);
  let _ = !1;
  if (d.ctx = t ? t(s, n.props || {}, (b, T, ...O) => {
    const x = O.length ? O[0] : T;
    return d.ctx && r(d.ctx[b], d.ctx[b] = x) && (!d.skip_bound && d.bound[b] && d.bound[b](x), _ && Ye(s, b)), T;
  }) : [], d.update(), _ = !0, gt(d.before_update), d.fragment = e ? e(d.ctx) : !1, n.target) {
    if (n.hydrate) {
      const b = He(n.target);
      d.fragment && d.fragment.l(b), b.forEach(vt);
    } else
      d.fragment && d.fragment.c();
    n.intro && le(s.$$.fragment), Xe(s, n.target, n.anchor), ct();
  }
  ht(l);
}
let ue;
typeof HTMLElement == "function" && (ue = class extends HTMLElement {
  constructor(n, t, e) {
    super();
    /** The Svelte component constructor */
    f(this, "$$ctor");
    /** Slots */
    f(this, "$$s");
    /** The Svelte component instance */
    f(this, "$$c");
    /** Whether or not the custom element is connected */
    f(this, "$$cn", !1);
    /** Component props data */
    f(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    f(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    f(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    f(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    f(this, "$$l_u", /* @__PURE__ */ new Map());
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
              a = Z("slot"), i !== "default" && S(a, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(d, _) {
              Ct(d, a, _);
            },
            d: function(d) {
              d && vt(a);
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
        a in this.$$d || (this.$$d[a] = _t(a, i.value, this.$$p_d, "toProp"));
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
            const a = _t(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            a == null ? this.removeAttribute(i) : this.setAttribute(this.$$p_d[i].attribute || i, a);
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
    this.$$r || (n = this.$$g_p(n), this.$$d[n] = _t(n, e, this.$$p_d, "toProp"), (r = this.$$c) == null || r.$set({ [n]: this.$$d[n] }));
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
function _t(s, n, t, e) {
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
  let a = class extends ue {
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
      set(l) {
        var d;
        l = _t(h, l, n), this.$$d[h] = l, (d = this.$$c) == null || d.$set({ [h]: l });
      }
    });
  }), e.forEach((h) => {
    Object.defineProperty(a.prototype, h, {
      get() {
        var l;
        return (l = this.$$c) == null ? void 0 : l[h];
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
    f(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    f(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    qe(this, 1), this.$destroy = pt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(n, t) {
    if (!ae(t))
      return pt;
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
const { isArray: es } = Array, ss = Object.keys, dt = (s) => {
  if (!s)
    return s;
  if (es(s)) {
    const n = [], t = s.length;
    for (let e = 0; e < t; e++)
      n.push(dt(s[e]));
    return n;
  } else if (typeof s == "object") {
    const n = ss(s), t = n.length, e = {};
    for (let r = 0; r < t; r++) {
      const i = n[r];
      e[i] = dt(s[i]);
    }
    return e;
  }
  return s;
};
class J {
  constructor(n) {
    f(this, "path");
    f(this, "from");
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
function C(s) {
  return ls(s) ? "" : "/" + s.map((n) => hs(String(n))).join("/");
}
const w = (s) => typeof s == "string" ? cs(s) : s, ls = (s) => !s.length, us = Object.prototype.hasOwnProperty;
function ps(s, n) {
  return us.call(s, n);
}
const { isArray: pe } = Array, j = (s, n) => {
  const t = n.length;
  if (!t)
    return { val: s };
  let e, r;
  for (let a = 0; a < t; a++)
    if (e = s, r = n[a], pe(e)) {
      const h = e.length;
      if (r === "-")
        r = h;
      else if (typeof r == "string") {
        const l = ~~r;
        if ("" + l !== r)
          throw new Error("INVALID_INDEX");
        if (r = l, r < 0)
          throw new Error("INVALID_INDEX");
      }
      s = e[r];
    } else if (typeof e == "object" && e)
      s = ps(e, r) ? e[r] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: s, obj: e, key: r };
}, yt = (s) => pe(s.obj) && typeof s.key == "number", kt = (s) => typeof s.obj == "object" && typeof s.key == "string";
class It extends J {
  constructor(t, e) {
    super(t);
    f(this, "value");
    this.value = e;
  }
  op() {
    return "add";
  }
  code() {
    return 0;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = j(t, this.path), a = dt(this.value);
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
      path: C(this.path),
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
class fe extends J {
  constructor(t, e) {
    super(t);
    f(this, "oldValue");
    this.oldValue = e;
  }
  op() {
    return "remove";
  }
  code() {
    return 1;
  }
  apply(t) {
    const e = j(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return kt(e) ? delete e.obj[e.key] : yt(e) ? e.val !== void 0 && e.obj.splice(e.key, 1) : t = null, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "remove",
      path: C(this.path)
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
class fs extends J {
  constructor(t, e, r) {
    super(t);
    f(this, "value");
    f(this, "oldValue");
    this.value = e, this.oldValue = r;
  }
  op() {
    return "replace";
  }
  code() {
    return 2;
  }
  apply(t) {
    const e = j(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return kt(e) ? e.obj[e.key] = this.value : yt(e) ? e.obj[e.key] = this.value : t = this.value, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "replace",
      path: C(this.path),
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
class ds extends J {
  constructor(t, e) {
    super(t);
    f(this, "from");
    this.from = e;
  }
  op() {
    return "move";
  }
  code() {
    return 4;
  }
  apply(t) {
    const e = new fe(w(this.from), void 0).apply(t);
    return new It(this.path, e.old).apply(e.doc);
  }
  toJson(t) {
    return {
      op: "move",
      path: C(this.path),
      from: C(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "move" : 4, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(4), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class gs extends J {
  constructor(t, e) {
    super(t);
    f(this, "from");
    this.from = e;
  }
  op() {
    return "copy";
  }
  code() {
    return 3;
  }
  apply(t) {
    const { val: e } = j(t, this.from);
    if (e === void 0)
      throw new Error("NOT_FOUND");
    return new It(this.path, dt(e)).apply(t);
  }
  toJson(t) {
    return {
      op: "copy",
      path: C(this.path),
      from: C(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "copy" : 3, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(3), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class I extends J {
  apply(n) {
    if (!this.test(n))
      throw new Error("TEST");
    return { doc: n };
  }
}
const Et = (s, n) => {
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
        if (!Et(s[e], n[e]))
          return !1;
      return !0;
    }
    if (r = Object.keys(s), t = r.length, t !== Object.keys(n).length)
      return !1;
    for (e = t; e-- !== 0; ) {
      const i = r[e];
      if (!Et(s[i], n[i]))
        return !1;
    }
    return !0;
  }
  return !1;
};
class vs extends I {
  constructor(t, e, r) {
    super(t);
    f(this, "value");
    f(this, "not");
    this.value = e, this.not = r;
  }
  op() {
    return "test";
  }
  code() {
    return 5;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (e === void 0)
      return !!this.not;
    const r = Et(e, this.value);
    return this.not ? !r : r;
  }
  toJson(t) {
    const e = {
      op: "test",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class ys extends J {
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
    const t = j(n, this.path);
    return t.obj ? t.obj[t.key] = !t.val : n = !t.val, { doc: n, old: t.val };
  }
  toJson(n) {
    return {
      op: "flip",
      path: C(this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "flip" : 8, this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(8), n.encodeArray(this.path);
  }
}
class ms extends J {
  constructor(t, e) {
    super(t);
    f(this, "inc");
    this.inc = e;
  }
  op() {
    return "inc";
  }
  code() {
    return 9;
  }
  apply(t) {
    const e = j(t, this.path), r = this.inc + Number(e.val);
    return e.obj ? e.obj[e.key] = r : t = r, { doc: t, old: e.val };
  }
  toJson(t) {
    return {
      op: "inc",
      path: C(this.path),
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
class ws extends J {
  constructor(t, e, r) {
    super(t);
    f(this, "pos");
    f(this, "str");
    this.pos = e, this.str = r;
  }
  op() {
    return "str_ins";
  }
  code() {
    return 6;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = j(t, this.path);
    if (typeof e != "string") {
      if (e !== void 0)
        throw new Error("NOT_A_STRING");
      if (this.pos !== 0)
        throw new Error("POS");
    }
    const a = typeof e == "string" ? e : "", h = Math.min(this.pos, a.length), l = a.slice(0, h), d = a.slice(h), _ = l + this.str + d;
    return i ? i[r] = _ : t = _, { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "str_ins",
      path: C(this.path),
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
class _s extends J {
  constructor(t, e, r, i) {
    super(t);
    f(this, "pos");
    f(this, "str");
    f(this, "len");
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
    const { val: e, key: r, obj: i } = j(t, this.path);
    if (typeof e != "string")
      throw new Error("NOT_A_STRING");
    const a = e.length, h = Math.min(this.pos, e.length), l = Math.min(h, a), d = this.str !== void 0 ? this.str.length : this.len, _ = Math.min(h + d, a), b = e.slice(0, l), T = e.substr(_), O = b + T;
    return i ? i[r] = O : t = O, { doc: t, old: e };
  }
  toJson(t) {
    return typeof this.str == "string" ? {
      op: "str_del",
      path: C(this.path),
      pos: this.pos,
      str: this.str
    } : {
      op: "str_del",
      path: C(this.path),
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
const { isArray: bs } = Array, Rt = (s) => !!s && typeof s == "object" && typeof s.text == "string", Ht = (s) => !!s && typeof s == "object" && bs(s.children), Es = (s, n) => {
  const t = new RegExp(s, n ? "i" : void 0);
  return (e) => t.test(e);
};
class $s extends J {
  constructor(t, e, r) {
    super(t);
    f(this, "pos");
    f(this, "props");
    this.pos = e, this.props = r;
  }
  op() {
    return "split";
  }
  code() {
    return 10;
  }
  apply(t) {
    const e = j(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    const r = this.split(e.val);
    return kt(e) ? e.obj[e.key] = r : yt(e) ? (e.obj[e.key] = r[0], e.obj.splice(e.key + 1, 0, r[1])) : t = r, { doc: t, old: e.val };
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
    } else if (Rt(t)) {
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
      path: C(this.path),
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
class Cs extends J {
  constructor(t, e, r) {
    super(t);
    f(this, "pos");
    f(this, "props");
    this.pos = e, this.props = r;
  }
  op() {
    return "merge";
  }
  code() {
    return 11;
  }
  apply(t) {
    const e = j(t, this.path);
    if (!yt(e))
      throw new Error("INVALID_TARGET");
    if (e.key <= 0)
      throw new Error("INVALID_KEY");
    const r = e.obj[e.key - 1], i = e.obj[e.key], a = this.merge(r, i);
    return e.obj[e.key - 1] = a, e.obj.splice(e.key, 1), { doc: t, old: [r, i] };
  }
  merge(t, e) {
    return typeof t == "string" && typeof e == "string" || typeof t == "number" && typeof e == "number" ? t + e : Rt(t) && Rt(e) ? { ...t, ...e, text: t.text + e.text } : Ht(t) && Ht(e) ? { ...t, ...e, children: [...t.children, ...e.children] } : [t, e];
  }
  toJson(t) {
    const e = {
      op: "merge",
      path: C(this.path),
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
const { isArray: ks } = Array;
class As extends J {
  constructor(t, e, r) {
    super(t);
    f(this, "props");
    f(this, "deleteNull");
    this.props = e, this.deleteNull = r;
  }
  op() {
    return "extend";
  }
  code() {
    return 12;
  }
  apply(t) {
    const e = j(t, this.path);
    return yt(e) ? e.val !== void 0 && (e.obj[e.key] = this.extend(e.val)) : kt(e) ? e.obj[e.key] = this.extend(e.val) : t = this.extend(t), { doc: t };
  }
  extend(t) {
    if (ks(t) || typeof t != "object" || !t)
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
      path: C(this.path),
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
class Ts extends I {
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
    const { val: t } = j(n, this.path);
    return t !== void 0;
  }
  toJson(n) {
    return {
      op: "defined",
      path: C(n ? this.path.slice(n.path.length) : this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "defined" : 31, n ? this.path.slice(n.path.length) : this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(31), n.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
class Os extends I {
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
      const { val: t } = j(n, this.path);
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
      path: C(n ? this.path.slice(n.path.length) : this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "undefined" : 38, n ? this.path.slice(n.path.length) : this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(38), n.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
const { isArray: js } = Array;
class xs extends I {
  constructor(t, e) {
    super(t);
    f(this, "type");
    this.type = e;
  }
  op() {
    return "test_type";
  }
  code() {
    return 39;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    return e === null ? this.type.indexOf("null") > -1 : js(e) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof e) > -1 || typeof e == "number" && e === Math.round(e) && this.type.indexOf("integer") > -1;
  }
  toJson(t) {
    return {
      op: "test_type",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Ss extends I {
  constructor(t, e, r, i) {
    super(t);
    f(this, "pos");
    f(this, "str");
    f(this, "not");
    this.pos = e, this.str = r, this.not = i;
  }
  op() {
    return "test_string";
  }
  code() {
    return 40;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = e.length, i = Math.min(this.pos, r), a = Math.min(this.pos + this.str.length, r), h = e.substring(i, a) === this.str;
    return this.not ? !h : h;
  }
  toJson(t) {
    const e = {
      op: "test_string",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "len");
    f(this, "not");
    this.len = e, this.not = r;
  }
  op() {
    return "test_string_len";
  }
  code() {
    return 41;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (typeof e != "string")
      return !1;
    const i = e.length >= this.len;
    return this.not ? !i : i;
  }
  toJson(t) {
    const e = {
      op: "test_string_len",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "value");
    f(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "contains";
  }
  code() {
    return 30;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.indexOf(i) > -1;
  }
  toJson(t) {
    const e = {
      op: "contains",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "value");
    f(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "ends";
  }
  code() {
    return 32;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.endsWith(i);
  }
  toJson(t) {
    const e = {
      op: "ends",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "value");
    f(this, "ignore_case");
    this.value = e, this.ignore_case = r;
  }
  op() {
    return "starts";
  }
  code() {
    return 37;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.startsWith(i);
  }
  toJson(t) {
    const e = {
      op: "starts",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Hs extends I {
  constructor(t, e) {
    super(t);
    f(this, "value");
    this.value = e;
  }
  op() {
    return "in";
  }
  code() {
    return 33;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    for (const r of this.value)
      if (Et(e, r))
        return !0;
    return !1;
  }
  toJson(t) {
    return {
      op: "in",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Ps extends I {
  constructor(t, e) {
    super(t);
    f(this, "value");
    this.value = e;
  }
  op() {
    return "less";
  }
  code() {
    return 34;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    return typeof e != "number" ? !1 : e < this.value;
  }
  toJson(t) {
    return {
      op: "less",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "value");
    this.value = e;
  }
  op() {
    return "more";
  }
  code() {
    return 36;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    return typeof e != "number" ? !1 : e > this.value;
  }
  toJson(t) {
    return {
      op: "more",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Dt extends I {
  constructor(t, e) {
    super(t);
    f(this, "ops");
    this.ops = e;
  }
}
class Ds extends Dt {
  constructor(t, e) {
    super(t, e);
    f(this, "ops");
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
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Us extends Dt {
  constructor(t, e) {
    super(t, e);
    f(this, "ops");
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
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class Js extends Dt {
  constructor(t, e) {
    super(t, e);
    f(this, "ops");
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
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
    f(this, "value");
    f(this, "ignore_case");
    f(this, "matcher");
    this.value = e, this.ignore_case = r, this.matcher = i(e, r);
  }
  op() {
    return "matches";
  }
  code() {
    return 35;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    return typeof e != "string" ? !1 : this.matcher(e);
  }
  toJson(t) {
    const e = {
      op: "matches",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
class zs extends I {
  constructor(t, e) {
    super(t);
    f(this, "value");
    this.value = e;
  }
  op() {
    return "type";
  }
  code() {
    return 42;
  }
  test(t) {
    const { val: e } = j(t, this.path);
    return e === null ? this.value === "null" : Bs(e) ? this.value === "array" : typeof e === this.value || typeof e == "number" && e === Math.round(e) && this.value === "integer";
  }
  toJson(t) {
    return {
      op: "type",
      path: C(t ? this.path.slice(t.path.length) : this.path),
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
const Fs = (s, n) => {
  switch (s.op) {
    case "add":
      return new It(w(s.path), s.value);
    case "remove":
      return new fe(w(s.path), s.oldValue);
    case "replace":
      return new fs(w(s.path), s.value, s.oldValue);
    case "move":
      return new ds(w(s.path), w(s.from));
    case "copy":
      return new gs(w(s.path), w(s.from));
    case "flip":
      return new ys(w(s.path));
    case "inc":
      return new ms(w(s.path), s.inc);
    case "str_ins":
      return new ws(w(s.path), s.pos, s.str);
    case "str_del":
      return new _s(w(s.path), s.pos, s.str, s.len);
    case "split":
      return new $s(w(s.path), s.pos, s.props || null);
    case "merge":
      return new Cs(w(s.path), s.pos, s.props || null);
    case "extend":
      return new As(w(s.path), s.props, !!s.deleteNull);
    default:
      return bt(s, n);
  }
}, bt = (s, n) => {
  switch (s.op) {
    case "test":
      return new vs(w(s.path), s.value, !!s.not);
    case "defined":
      return new Ts(w(s.path));
    case "undefined":
      return new Os(w(s.path));
    case "type":
      return new zs(w(s.path), s.value);
    case "test_type":
      return new xs(w(s.path), s.type);
    case "test_string":
      return new Ss(w(s.path), s.pos, s.str, !!s.not);
    case "test_string_len":
      return new Ms(w(s.path), s.len, !!s.not);
    case "contains":
      return new Ls(w(s.path), s.value, !!s.ignore_case);
    case "ends":
      return new Ns(w(s.path), s.value, !!s.ignore_case);
    case "starts":
      return new Rs(w(s.path), s.value, !!s.ignore_case);
    case "matches":
      return new Vs(w(s.path), s.value, !!s.ignore_case, n.createMatcher || Es);
    case "in":
      return new Hs(w(s.path), s.value);
    case "less":
      return new Ps(w(s.path), s.value);
    case "more":
      return new Is(w(s.path), s.value);
    case "and": {
      const t = w(s.path);
      return new Ds(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    case "or": {
      const t = w(s.path);
      return new Us(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    case "not": {
      const t = w(s.path);
      return new Js(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function Ws(s, n, t) {
  t.mutate || (s = dt(s));
  const e = [], r = n.length;
  for (let i = 0; i < r; i++) {
    const h = Fs(n[i], t).apply(s);
    s = h.doc, e.push(h);
  }
  return { doc: s, res: e };
}
var lt = (s) => typeof s == "function" ? s : function() {
  return s;
}, Gs = typeof self < "u" ? self : null, at = typeof window < "u" ? window : null, ut = Gs || at || ut, Xs = "2.0.0", B = { connecting: 0, open: 1, closing: 2, closed: 3 }, qs = 1e4, Ys = 1e3, U = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
}, W = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}, Pt = {
  longpoll: "longpoll",
  websocket: "websocket"
}, Zs = {
  complete: 4
}, mt = class {
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
}, de = class {
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
    this.state = U.closed, this.topic = s, this.params = lt(n || {}), this.socket = t, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new mt(this, W.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new de(() => {
      this.socket.isConnected() && this.rejoin();
    }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
    })), this.joinPush.receive("ok", () => {
      this.state = U.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), this.pushBuffer = [];
    }), this.joinPush.receive("error", () => {
      this.state = U.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.onClose(() => {
      this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = U.closed, this.socket.remove(this);
    }), this.onError((e) => {
      this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e), this.isJoining() && this.joinPush.reset(), this.state = U.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.joinPush.receive("timeout", () => {
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new mt(this, W.leave, lt({}), this.timeout).send(), this.state = U.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.on(W.reply, (e, r) => {
      this.trigger(this.replyEventName(r), e);
    });
  }
  join(s = this.timeout) {
    if (this.joinedOnce)
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    return this.timeout = s, this.joinedOnce = !0, this.rejoin(), this.joinPush;
  }
  onClose(s) {
    this.on(W.close, s);
  }
  onError(s) {
    return this.on(W.error, (n) => s(n));
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
    let e = new mt(this, s, function() {
      return n;
    }, t);
    return this.canPush() ? e.send() : (e.startTimeout(), this.pushBuffer.push(e)), e;
  }
  leave(s = this.timeout) {
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = U.leaving;
    let n = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(W.close, "leave");
    }, t = new mt(this, W.leave, lt({}), s);
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
    this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = U.joining, this.joinPush.resend(s));
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
    return this.state === U.closed;
  }
  isErrored() {
    return this.state === U.errored;
  }
  isJoined() {
    return this.state === U.joined;
  }
  isJoining() {
    return this.state === U.joining;
  }
  isLeaving() {
    return this.state === U.leaving;
  }
}, $t = class {
  static request(s, n, t, e, r, i, a) {
    if (ut.XDomainRequest) {
      let h = new ut.XDomainRequest();
      return this.xdomainRequest(h, s, n, e, r, i, a);
    } else {
      let h = new ut.XMLHttpRequest();
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
        let l = this.parseJSON(s.responseText);
        h(l);
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
}, St = class {
  constructor(s) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(s), this.readyState = B.connecting, this.poll();
  }
  normalizeEndpoint(s) {
    return s.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + Pt.websocket), "$1/" + Pt.longpoll);
  }
  endpointURL() {
    return $t.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(s, n, t) {
    this.close(s, n, t), this.readyState = B.connecting;
  }
  ontimeout() {
    this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
  }
  isActive() {
    return this.readyState === B.open || this.readyState === B.connecting;
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
          this.readyState = B.open, this.onopen({}), this.poll();
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
    this.readyState = B.closed;
    let e = Object.assign({ code: 1e3, reason: void 0, wasClean: !0 }, { code: s, reason: n, wasClean: t });
    typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", e)) : this.onclose(e);
  }
  ajax(s, n, t, e) {
    let r, i = () => {
      this.reqs.delete(r), t();
    };
    r = $t.request(s, this.endpointURL(), "application/json", n, this.timeout, i, (a) => {
      this.reqs.delete(r), this.isActive() && e(a);
    }), this.reqs.add(r);
  }
}, wt = {
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
    let { join_ref: n, ref: t, event: e, topic: r, payload: i } = s, a = this.META_LENGTH + n.length + t.length + r.length + e.length, h = new ArrayBuffer(this.HEADER_LENGTH + a), l = new DataView(h), d = 0;
    l.setUint8(d++, this.KINDS.push), l.setUint8(d++, n.length), l.setUint8(d++, t.length), l.setUint8(d++, r.length), l.setUint8(d++, e.length), Array.from(n, (b) => l.setUint8(d++, b.charCodeAt(0))), Array.from(t, (b) => l.setUint8(d++, b.charCodeAt(0))), Array.from(r, (b) => l.setUint8(d++, b.charCodeAt(0))), Array.from(e, (b) => l.setUint8(d++, b.charCodeAt(0)));
    var _ = new Uint8Array(h.byteLength + i.byteLength);
    return _.set(new Uint8Array(h), 0), _.set(new Uint8Array(i), h.byteLength), _.buffer;
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
    let l = t.decode(s.slice(a, a + r));
    a = a + r;
    let d = t.decode(s.slice(a, a + i));
    a = a + i;
    let _ = s.slice(a, s.byteLength);
    return { join_ref: h, ref: null, topic: l, event: d, payload: _ };
  },
  decodeReply(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), a = n.getUint8(4), h = this.HEADER_LENGTH + this.META_LENGTH, l = t.decode(s.slice(h, h + e));
    h = h + e;
    let d = t.decode(s.slice(h, h + r));
    h = h + r;
    let _ = t.decode(s.slice(h, h + i));
    h = h + i;
    let b = t.decode(s.slice(h, h + a));
    h = h + a;
    let T = s.slice(h, s.byteLength), O = { status: b, response: T };
    return { join_ref: l, ref: d, topic: _, event: W.reply, payload: O };
  },
  decodeBroadcast(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = this.HEADER_LENGTH + 2, a = t.decode(s.slice(i, i + e));
    i = i + e;
    let h = t.decode(s.slice(i, i + r));
    i = i + r;
    let l = s.slice(i, s.byteLength);
    return { join_ref: null, ref: null, topic: a, event: h, payload: l };
  }
}, Ks = class {
  constructor(s, n = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = n.timeout || qs, this.transport = n.transport || ut.WebSocket || St, this.establishedConnections = 0, this.defaultEncoder = wt.encode.bind(wt), this.defaultDecoder = wt.decode.bind(wt), this.closeWasClean = !1, this.binaryType = n.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== St ? (this.encode = n.encode || this.defaultEncoder, this.decode = n.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let t = null;
    at && at.addEventListener && (at.addEventListener("pagehide", (e) => {
      this.conn && (this.disconnect(), t = this.connectClock);
    }), at.addEventListener("pageshow", (e) => {
      t === this.connectClock && (t = null, this.connect());
    })), this.heartbeatIntervalMs = n.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => n.rejoinAfterMs ? n.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4, this.reconnectAfterMs = (e) => n.reconnectAfterMs ? n.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3, this.logger = n.logger || null, this.longpollerTimeout = n.longpollerTimeout || 2e4, this.params = lt(n.params || {}), this.endPoint = `${s}/${Pt.websocket}`, this.vsn = n.vsn || Xs, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new de(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return St;
  }
  replaceTransport(s) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = s;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let s = $t.appendParams($t.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    return s.charAt(0) !== "/" ? s : s.charAt(1) === "/" ? `${this.protocol()}:${s}` : `${this.protocol()}://${location.host}${s}`;
  }
  disconnect(s, n, t) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(s, n, t);
  }
  connect(s) {
    s && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = lt(s)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (n) => this.onConnError(n), this.conn.onmessage = (n) => this.onConnMessage(n), this.conn.onclose = (n) => this.onConnClose(n));
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
    if (n === 5 || !this.conn || this.conn.readyState === B.closed) {
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
      s.isErrored() || s.isLeaving() || s.isClosed() || s.trigger(W.error);
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case B.connecting:
        return "connecting";
      case B.open:
        return "open";
      case B.closing:
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
        const l = this.channels[h];
        l.isMember(t, e, r, a) && l.trigger(e, r, i, a);
      }
      for (let h = 0; h < this.stateChangeCallbacks.message.length; h++) {
        let [, l] = this.stateChangeCallbacks.message[h];
        l(n);
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
    this.connected = !1, this.config = n, this.socket = new Ks(this.config.url, { logger: (t, e, r) => {
      console.log(`${t}: ${e}`, r);
    } }), this.channel = this.socket.channel(this.config.topic, this.config.params), this.eventTarget = new EventTarget();
  }
  /** connect to socket and join channel. will do nothing if already connected */
  connect() {
    this.connected || (this.socket.onError((n) => this.emitError("socket error", n)), this.socket.connect(), this.channel.onError((n) => console.log("channel error", n)), this.channel.join().receive("ok", () => {
      console.log("joined");
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
    })), t === this.stateVersion + 1) {
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
var ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
var se;
(function(s) {
  (function(n) {
    var t = typeof ee == "object" ? ee : typeof self == "object" ? self : typeof this == "object" ? this : Function("return this;")(), e = r(s);
    typeof t.Reflect > "u" ? t.Reflect = s : e = r(t.Reflect, e), n(e);
    function r(i, a) {
      return function(h, l) {
        typeof i[h] != "function" && Object.defineProperty(i, h, { configurable: !0, writable: !0, value: l }), a && a(h, l);
      };
    }
  })(function(n) {
    var t = Object.prototype.hasOwnProperty, e = typeof Symbol == "function", r = e && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", i = e && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", a = typeof Object.create == "function", h = { __proto__: [] } instanceof Array, l = !a && !h, d = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: a ? function() {
        return Ot(/* @__PURE__ */ Object.create(null));
      } : h ? function() {
        return Ot({ __proto__: null });
      } : function() {
        return Ot({});
      },
      has: l ? function(o, c) {
        return t.call(o, c);
      } : function(o, c) {
        return c in o;
      },
      get: l ? function(o, c) {
        return t.call(o, c) ? o[c] : void 0;
      } : function(o, c) {
        return o[c];
      }
    }, _ = Object.getPrototypeOf(Function), b = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", T = !b && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Ae(), O = !b && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Te(), x = !b && typeof WeakMap == "function" ? WeakMap : Oe(), R = new x();
    function M(o, c, u, p) {
      if (L(u)) {
        if (!Gt(o))
          throw new TypeError();
        if (!Xt(c))
          throw new TypeError();
        return K(o, c);
      } else {
        if (!Gt(o))
          throw new TypeError();
        if (!N(c))
          throw new TypeError();
        if (!N(p) && !L(p) && !tt(p))
          throw new TypeError();
        return tt(p) && (p = void 0), u = z(u), ge(o, c, u, p);
      }
    }
    n("decorate", M);
    function G(o, c) {
      function u(p, g) {
        if (!N(p))
          throw new TypeError();
        if (!L(g) && !be(g))
          throw new TypeError();
        Bt(o, c, p, g);
      }
      return u;
    }
    n("metadata", G);
    function X(o, c, u, p) {
      if (!N(u))
        throw new TypeError();
      return L(p) || (p = z(p)), Bt(o, c, u, p);
    }
    n("defineMetadata", X);
    function Y(o, c, u) {
      if (!N(c))
        throw new TypeError();
      return L(u) || (u = z(u)), Ut(o, c, u);
    }
    n("hasMetadata", Y);
    function Q(o, c, u) {
      if (!N(c))
        throw new TypeError();
      return L(u) || (u = z(u)), At(o, c, u);
    }
    n("hasOwnMetadata", Q);
    function k(o, c, u) {
      if (!N(c))
        throw new TypeError();
      return L(u) || (u = z(u)), Jt(o, c, u);
    }
    n("getMetadata", k);
    function V(o, c, u) {
      if (!N(c))
        throw new TypeError();
      return L(u) || (u = z(u)), Vt(o, c, u);
    }
    n("getOwnMetadata", V);
    function A(o, c) {
      if (!N(o))
        throw new TypeError();
      return L(c) || (c = z(c)), zt(o, c);
    }
    n("getMetadataKeys", A);
    function P(o, c) {
      if (!N(o))
        throw new TypeError();
      return L(c) || (c = z(c)), Ft(o, c);
    }
    n("getOwnMetadataKeys", P);
    function D(o, c, u) {
      if (!N(c))
        throw new TypeError();
      L(u) || (u = z(u));
      var p = ot(
        c,
        u,
        /*Create*/
        !1
      );
      if (L(p) || !p.delete(o))
        return !1;
      if (p.size > 0)
        return !0;
      var g = R.get(c);
      return g.delete(u), g.size > 0 || R.delete(c), !0;
    }
    n("deleteMetadata", D);
    function K(o, c) {
      for (var u = o.length - 1; u >= 0; --u) {
        var p = o[u], g = p(c);
        if (!L(g) && !tt(g)) {
          if (!Xt(g))
            throw new TypeError();
          c = g;
        }
      }
      return c;
    }
    function ge(o, c, u, p) {
      for (var g = o.length - 1; g >= 0; --g) {
        var H = o[g], y = H(c, u, p);
        if (!L(y) && !tt(y)) {
          if (!N(y))
            throw new TypeError();
          p = y;
        }
      }
      return p;
    }
    function ot(o, c, u) {
      var p = R.get(o);
      if (L(p)) {
        if (!u)
          return;
        p = new T(), R.set(o, p);
      }
      var g = p.get(c);
      if (L(g)) {
        if (!u)
          return;
        g = new T(), p.set(c, g);
      }
      return g;
    }
    function Ut(o, c, u) {
      var p = At(o, c, u);
      if (p)
        return !0;
      var g = Tt(c);
      return tt(g) ? !1 : Ut(o, g, u);
    }
    function At(o, c, u) {
      var p = ot(
        c,
        u,
        /*Create*/
        !1
      );
      return L(p) ? !1 : we(p.has(o));
    }
    function Jt(o, c, u) {
      var p = At(o, c, u);
      if (p)
        return Vt(o, c, u);
      var g = Tt(c);
      if (!tt(g))
        return Jt(o, g, u);
    }
    function Vt(o, c, u) {
      var p = ot(
        c,
        u,
        /*Create*/
        !1
      );
      if (!L(p))
        return p.get(o);
    }
    function Bt(o, c, u, p) {
      var g = ot(
        u,
        p,
        /*Create*/
        !0
      );
      g.set(o, c);
    }
    function zt(o, c) {
      var u = Ft(o, c), p = Tt(o);
      if (p === null)
        return u;
      var g = zt(p, c);
      if (g.length <= 0)
        return u;
      if (u.length <= 0)
        return g;
      for (var H = new O(), y = [], m = 0, v = u; m < v.length; m++) {
        var E = v[m], $ = H.has(E);
        $ || (H.add(E), y.push(E));
      }
      for (var q = 0, Yt = g; q < Yt.length; q++) {
        var E = Yt[q], $ = H.has(E);
        $ || (H.add(E), y.push(E));
      }
      return y;
    }
    function Ft(o, c) {
      var u = [], p = ot(
        o,
        c,
        /*Create*/
        !1
      );
      if (L(p))
        return u;
      for (var g = p.keys(), H = Ee(g), y = 0; ; ) {
        var m = Ce(H);
        if (!m)
          return u.length = y, u;
        var v = $e(m);
        try {
          u[y] = v;
        } catch (E) {
          try {
            ke(H);
          } finally {
            throw E;
          }
        }
        y++;
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
    function tt(o) {
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
      var u = c === 3 ? "string" : c === 5 ? "number" : "default", p = qt(o, r);
      if (p !== void 0) {
        var g = p.call(o, u);
        if (N(g))
          throw new TypeError();
        return g;
      }
      return me(o, u === "default" ? "number" : u);
    }
    function me(o, c) {
      if (c === "string") {
        var u = o.toString;
        if (et(u)) {
          var p = u.call(o);
          if (!N(p))
            return p;
        }
        var g = o.valueOf;
        if (et(g)) {
          var p = g.call(o);
          if (!N(p))
            return p;
        }
      } else {
        var g = o.valueOf;
        if (et(g)) {
          var p = g.call(o);
          if (!N(p))
            return p;
        }
        var H = o.toString;
        if (et(H)) {
          var p = H.call(o);
          if (!N(p))
            return p;
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
    function et(o) {
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
      var u = o[c];
      if (u != null) {
        if (!et(u))
          throw new TypeError();
        return u;
      }
    }
    function Ee(o) {
      var c = qt(o, i);
      if (!et(c))
        throw new TypeError();
      var u = c.call(o);
      if (!N(u))
        throw new TypeError();
      return u;
    }
    function $e(o) {
      return o.value;
    }
    function Ce(o) {
      var c = o.next();
      return c.done ? !1 : c;
    }
    function ke(o) {
      var c = o.return;
      c && c.call(o);
    }
    function Tt(o) {
      var c = Object.getPrototypeOf(o);
      if (typeof o != "function" || o === _ || c !== _)
        return c;
      var u = o.prototype, p = u && Object.getPrototypeOf(u);
      if (p == null || p === Object.prototype)
        return c;
      var g = p.constructor;
      return typeof g != "function" || g === o ? c : g;
    }
    function Ae() {
      var o = {}, c = [], u = (
        /** @class */
        function() {
          function y(m, v, E) {
            this._index = 0, this._keys = m, this._values = v, this._selector = E;
          }
          return y.prototype["@@iterator"] = function() {
            return this;
          }, y.prototype[i] = function() {
            return this;
          }, y.prototype.next = function() {
            var m = this._index;
            if (m >= 0 && m < this._keys.length) {
              var v = this._selector(this._keys[m], this._values[m]);
              return m + 1 >= this._keys.length ? (this._index = -1, this._keys = c, this._values = c) : this._index++, { value: v, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, y.prototype.throw = function(m) {
            throw this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), m;
          }, y.prototype.return = function(m) {
            return this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), { value: m, done: !0 };
          }, y;
        }()
      );
      return (
        /** @class */
        function() {
          function y() {
            this._keys = [], this._values = [], this._cacheKey = o, this._cacheIndex = -2;
          }
          return Object.defineProperty(y.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), y.prototype.has = function(m) {
            return this._find(
              m,
              /*insert*/
              !1
            ) >= 0;
          }, y.prototype.get = function(m) {
            var v = this._find(
              m,
              /*insert*/
              !1
            );
            return v >= 0 ? this._values[v] : void 0;
          }, y.prototype.set = function(m, v) {
            var E = this._find(
              m,
              /*insert*/
              !0
            );
            return this._values[E] = v, this;
          }, y.prototype.delete = function(m) {
            var v = this._find(
              m,
              /*insert*/
              !1
            );
            if (v >= 0) {
              for (var E = this._keys.length, $ = v + 1; $ < E; $++)
                this._keys[$ - 1] = this._keys[$], this._values[$ - 1] = this._values[$];
              return this._keys.length--, this._values.length--, m === this._cacheKey && (this._cacheKey = o, this._cacheIndex = -2), !0;
            }
            return !1;
          }, y.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = o, this._cacheIndex = -2;
          }, y.prototype.keys = function() {
            return new u(this._keys, this._values, p);
          }, y.prototype.values = function() {
            return new u(this._keys, this._values, g);
          }, y.prototype.entries = function() {
            return new u(this._keys, this._values, H);
          }, y.prototype["@@iterator"] = function() {
            return this.entries();
          }, y.prototype[i] = function() {
            return this.entries();
          }, y.prototype._find = function(m, v) {
            return this._cacheKey !== m && (this._cacheIndex = this._keys.indexOf(this._cacheKey = m)), this._cacheIndex < 0 && v && (this._cacheIndex = this._keys.length, this._keys.push(m), this._values.push(void 0)), this._cacheIndex;
          }, y;
        }()
      );
      function p(y, m) {
        return y;
      }
      function g(y, m) {
        return m;
      }
      function H(y, m) {
        return [y, m];
      }
    }
    function Te() {
      return (
        /** @class */
        function() {
          function o() {
            this._map = new T();
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
    function Oe() {
      var o = 16, c = d.create(), u = p();
      return (
        /** @class */
        function() {
          function v() {
            this._key = p();
          }
          return v.prototype.has = function(E) {
            var $ = g(
              E,
              /*create*/
              !1
            );
            return $ !== void 0 ? d.has($, this._key) : !1;
          }, v.prototype.get = function(E) {
            var $ = g(
              E,
              /*create*/
              !1
            );
            return $ !== void 0 ? d.get($, this._key) : void 0;
          }, v.prototype.set = function(E, $) {
            var q = g(
              E,
              /*create*/
              !0
            );
            return q[this._key] = $, this;
          }, v.prototype.delete = function(E) {
            var $ = g(
              E,
              /*create*/
              !1
            );
            return $ !== void 0 ? delete $[this._key] : !1;
          }, v.prototype.clear = function() {
            this._key = p();
          }, v;
        }()
      );
      function p() {
        var v;
        do
          v = "@@WeakMap@@" + m();
        while (d.has(c, v));
        return c[v] = !0, v;
      }
      function g(v, E) {
        if (!t.call(v, u)) {
          if (!E)
            return;
          Object.defineProperty(v, u, { value: d.create() });
        }
        return v[u];
      }
      function H(v, E) {
        for (var $ = 0; $ < E; ++$)
          v[$] = Math.random() * 255 | 0;
        return v;
      }
      function y(v) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(v)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(v)) : H(new Uint8Array(v), v) : H(new Array(v), v);
      }
      function m() {
        var v = y(o);
        v[6] = v[6] & 79 | 64, v[8] = v[8] & 191 | 128;
        for (var E = "", $ = 0; $ < o; ++$) {
          var q = v[$];
          ($ === 4 || $ === 6 || $ === 8) && (E += "-"), q < 16 && (E += "0"), E += q.toString(16).toLowerCase();
        }
        return E;
      }
    }
    function Ot(o) {
      return o.__ = void 0, delete o.__, o;
    }
  });
})(se || (se = {}));
function en(s) {
  Le(s, "svelte-1tmn7wo", '#liveroom-client-element.svelte-1tmn7wo.svelte-1tmn7wo{font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}#users-container.svelte-1tmn7wo.svelte-1tmn7wo{z-index:99999;position:fixed;inset:0;overflow:hidden;pointer-events:none}.user.svelte-1tmn7wo.svelte-1tmn7wo{z-index:10;position:absolute;top:0;left:0;user-select:none;transform:translate(var(--x), var(--y))}.user.svelte-1tmn7wo .cursor.svelte-1tmn7wo{position:absolute;top:0;left:0;color:var(--color);transform-origin:top left;transform:rotate(6deg)}.user[data-isself="true"].svelte-1tmn7wo .cursor.svelte-1tmn7wo{display:none}.user-name.svelte-1tmn7wo.svelte-1tmn7wo{padding:4px 10px;font-size:14px;line-height:20px;font-weight:600;color:black;background-color:var(--color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:9999px;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-1tmn7wo .user-name.svelte-1tmn7wo{position:absolute;top:20px;left:16px}.user[data-isself="true"].svelte-1tmn7wo .user-name.svelte-1tmn7wo{display:none}.user.svelte-1tmn7wo .halo.svelte-1tmn7wo{transform:scale(0);z-index:-1;position:absolute;top:-60px;left:-60px;width:120px;height:120px;border-radius:9999px;background-color:var(--color);opacity:0.25;transition:transform 100ms ease-out;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-1tmn7wo .halo[data-show="true"].svelte-1tmn7wo{transform:scale(1)}');
}
function ne(s, n, t) {
  const e = s.slice();
  return e[18] = n[t], e;
}
function re(s) {
  let n, t = [], e = /* @__PURE__ */ new Map(), r = te(Object.values(
    /*users*/
    s[0]
  ));
  const i = (a) => (
    /*user*/
    a[18].id
  );
  for (let a = 0; a < r.length; a += 1) {
    let h = ne(s, r, a), l = i(h);
    e.set(l, t[a] = ie(l, h));
  }
  return {
    c() {
      n = Z("div");
      for (let a = 0; a < t.length; a += 1)
        t[a].c();
      S(n, "id", "users-container"), S(n, "class", "svelte-1tmn7wo");
    },
    m(a, h) {
      Ct(a, n, h);
      for (let l = 0; l < t.length; l += 1)
        t[l] && t[l].m(n, null);
    },
    p(a, h) {
      h & /*Object, users, me, parseFloat, users_count*/
      13 && (r = te(Object.values(
        /*users*/
        a[0]
      )), t = Ge(t, h, i, 1, a, r, e, n, We, ie, null, ne));
    },
    d(a) {
      a && vt(n);
      for (let h = 0; h < t.length; h += 1)
        t[h].d();
    }
  };
}
function ie(s, n) {
  let t, e, r, i, a, h = (
    /*user*/
    n[18].name + ""
  ), l, d, _, b, T, O, x;
  return {
    key: s,
    first: null,
    c() {
      t = Z("div"), e = Qt("svg"), r = Qt("path"), i = jt(), a = Z("span"), l = he(h), d = jt(), _ = Z("div"), T = jt(), S(r, "d", "M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"), S(e, "width", "23"), S(e, "viewBox", "0 0 27 24"), S(e, "fill", "currentColor"), S(e, "aria-hidden", "true"), S(e, "xmlns", "http://www.w3.org/2000/svg"), S(e, "class", "cursor svelte-1tmn7wo"), S(a, "class", "user-name svelte-1tmn7wo"), S(_, "class", "halo svelte-1tmn7wo"), S(_, "data-show", b = /*user*/
      (n[18].id == /*me*/
      n[2].id && /*user*/
      n[18].is_shift_key_down || /*user*/
      n[18].id != /*me*/
      n[2].id && /*user*/
      (n[18].is_shift_key_down || /*user*/
      n[18].is_mouse_down)) && /*users_count*/
      n[3] > 1), S(t, "id", O = "user-" + /*user*/
      n[18].id), S(t, "class", "user svelte-1tmn7wo"), S(t, "data-isself", x = /*user*/
      n[18].id == /*me*/
      n[2].id), st(
        t,
        "--color",
        /*user*/
        n[18].color
      ), st(t, "--x", parseFloat(
        /*user*/
        n[18].x
      ) + "vw"), st(t, "--y", parseFloat(
        /*user*/
        n[18].y
      ) + "vh"), this.first = t;
    },
    m(R, M) {
      Ct(R, t, M), F(t, e), F(e, r), F(t, i), F(t, a), F(a, l), F(t, d), F(t, _), F(t, T);
    },
    p(R, M) {
      n = R, M & /*users*/
      1 && h !== (h = /*user*/
      n[18].name + "") && Pe(l, h), M & /*users, me, users_count*/
      13 && b !== (b = /*user*/
      (n[18].id == /*me*/
      n[2].id && /*user*/
      n[18].is_shift_key_down || /*user*/
      n[18].id != /*me*/
      n[2].id && /*user*/
      (n[18].is_shift_key_down || /*user*/
      n[18].is_mouse_down)) && /*users_count*/
      n[3] > 1) && S(_, "data-show", b), M & /*users*/
      1 && O !== (O = "user-" + /*user*/
      n[18].id) && S(t, "id", O), M & /*users, me*/
      5 && x !== (x = /*user*/
      n[18].id == /*me*/
      n[2].id) && S(t, "data-isself", x), M & /*users*/
      1 && st(
        t,
        "--color",
        /*user*/
        n[18].color
      ), M & /*users*/
      1 && st(t, "--x", parseFloat(
        /*user*/
        n[18].x
      ) + "vw"), M & /*users*/
      1 && st(t, "--y", parseFloat(
        /*user*/
        n[18].y
      ) + "vh");
    },
    d(R) {
      R && vt(t);
    }
  };
}
function sn(s) {
  let n, t = (
    /*me*/
    s[2] && /*users*/
    s[0] && re(s)
  );
  return {
    c() {
      n = Z("div"), t && t.c(), S(n, "id", "liveroom-client-element"), S(n, "class", "svelte-1tmn7wo");
    },
    m(e, r) {
      Ct(e, n, r), t && t.m(n, null), s[7](n);
    },
    p(e, [r]) {
      /*me*/
      e[2] && /*users*/
      e[0] ? t ? t.p(e, r) : (t = re(e), t.c(), t.m(n, null)) : t && (t.d(1), t = null);
    },
    i: pt,
    o: pt,
    d(e) {
      e && vt(n), t && t.d(), s[7](null);
    }
  };
}
function nn(s, n, t) {
  let { url: e } = n, { room_id: r } = n, { user_name: i } = n, a, h, l, d, _;
  De(async () => {
    const k = new URLSearchParams(window.location.search), V = k.get("_liveroom"), A = V == null ? void 0 : V.split("https://meet.google.com/");
    let P = A == null ? void 0 : A[0];
    !!(A != null && A[1]) && (P = A[1].split("?")[0]), t(4, r = P || r), t(5, i = k.get("_liveroom_user_name")), b();
  }), Ue(() => {
    T();
  });
  function b() {
    h = new tn({
      url: e,
      topic: `liveroom-livestate:${r}`,
      params: {
        room_id: r,
        user_name: i,
        current_url: window.origin,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight
      }
    }), h.connect(), h.addEventListener("livestate-change", ({ detail: { state: k } }) => {
      t(4, r = k.room_id), t(2, l = k.me), t(0, d = k.users);
    }), window.addEventListener("mousemove", O), window.addEventListener("mousedown", x), window.addEventListener("mouseup", R), window.addEventListener("keydown", G), window.addEventListener("keyup", X), window.addEventListener("resize", Y);
  }
  function T() {
    window.removeEventListener("resize", Y), window.removeEventListener("keyup", X), window.removeEventListener("keydown", G), window.removeEventListener("mouseup", R), window.removeEventListener("mousedown", x), window.removeEventListener("mousemove", O), h == null || h.disconnect();
  }
  function O(k) {
    h && (l != null && l.id) && h.dispatchEvent(new CustomEvent(
      "mouse_move",
      {
        detail: {
          user_id: l.id,
          x: Number(k.clientX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(k.clientY / window.innerHeight * 100).toFixed(2)
        }
        // in %
      }
    ));
  }
  function x() {
    h && (l != null && l.id) && h.dispatchEvent(new CustomEvent("mouse_down", { detail: { user_id: l.id } }));
  }
  function R() {
    h && (l != null && l.id) && h.dispatchEvent(new CustomEvent("mouse_up", { detail: { user_id: l.id } }));
  }
  const M = ["Shift"];
  function G(k) {
    !k.repeat && M.includes(k.key) && h && (l != null && l.id) && h.dispatchEvent(new CustomEvent("key_down", { detail: { key: k.key, user_id: l.id } }));
  }
  function X(k) {
    M.includes(k.key) && h && (l != null && l.id) && h.dispatchEvent(new CustomEvent("key_up", { detail: { key: k.key, user_id: l.id } }));
  }
  function Y() {
    h && (l != null && l.id) && h.dispatchEvent(new CustomEvent(
      "window_resize",
      {
        detail: {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
          user_id: l.id
        }
      }
    ));
  }
  function Q(k) {
    Mt[k ? "unshift" : "push"](() => {
      a = k, t(1, a);
    });
  }
  return s.$$set = (k) => {
    "url" in k && t(6, e = k.url), "room_id" in k && t(4, r = k.room_id), "user_name" in k && t(5, i = k.user_name);
  }, s.$$.update = () => {
    s.$$.dirty & /*users*/
    1 && t(3, _ = Object.keys(d || {}).length);
  }, [d, a, l, _, r, i, e, Q];
}
class rn extends Ke {
  constructor(n) {
    super(), Ze(this, n, nn, sn, Se, { url: 6, room_id: 4, user_name: 5 }, en);
  }
  get url() {
    return this.$$.ctx[6];
  }
  set url(n) {
    this.$$set({ url: n }), ct();
  }
  get room_id() {
    return this.$$.ctx[4];
  }
  set room_id(n) {
    this.$$set({ room_id: n }), ct();
  }
  get user_name() {
    return this.$$.ctx[5];
  }
  set user_name(n) {
    this.$$set({ user_name: n }), ct();
  }
}
customElements.define("liveroom-client-element", Qe(rn, { url: {}, room_id: {}, user_name: {} }, [], [], !0));
export {
  rn as default
};
