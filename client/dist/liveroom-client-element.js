var xe = Object.defineProperty;
var Me = (s, n, t) => n in s ? xe(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var g = (s, n, t) => (Me(s, typeof n != "symbol" ? n + "" : n, t), t);
function mt() {
}
function ce(s) {
  return s();
}
function Zt() {
  return /* @__PURE__ */ Object.create(null);
}
function wt(s) {
  s.forEach(ce);
}
function le(s) {
  return typeof s == "function";
}
function Le(s, n) {
  return s != s ? n == n : s !== n || s && typeof s == "object" || typeof s == "function";
}
function Ne(s) {
  return Object.keys(s).length === 0;
}
function W(s, n) {
  s.appendChild(n);
}
function Re(s, n, t) {
  const e = Pe(s);
  if (!e.getElementById(n)) {
    const r = st("style");
    r.id = n, r.textContent = t, He(e, r);
  }
}
function Pe(s) {
  if (!s)
    return document;
  const n = s.getRootNode ? s.getRootNode() : s.ownerDocument;
  return n && /** @type {ShadowRoot} */
  n.host ? (
    /** @type {ShadowRoot} */
    n
  ) : s.ownerDocument;
}
function He(s, n) {
  return W(
    /** @type {Document} */
    s.head || s,
    n
  ), n.sheet;
}
function St(s, n, t) {
  s.insertBefore(n, t || null);
}
function _t(s) {
  s.parentNode && s.parentNode.removeChild(s);
}
function st(s) {
  return document.createElement(s);
}
function Qt(s) {
  return document.createElementNS("http://www.w3.org/2000/svg", s);
}
function ue(s) {
  return document.createTextNode(s);
}
function Nt() {
  return ue(" ");
}
function x(s, n, t) {
  t == null ? s.removeAttribute(n) : s.getAttribute(n) !== t && s.setAttribute(n, t);
}
function Ie(s) {
  return Array.from(s.childNodes);
}
function Ue(s, n) {
  n = "" + n, s.data !== n && (s.data = /** @type {string} */
  n);
}
function ot(s, n, t, e) {
  t == null ? s.style.removeProperty(n) : s.style.setProperty(n, t, e ? "important" : "");
}
function De(s) {
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
function pe() {
  if (!vt)
    throw new Error("Function called outside component initialization");
  return vt;
}
function ze(s) {
  pe().$$.on_mount.push(s);
}
function Je(s) {
  pe().$$.on_destroy.push(s);
}
const ht = [], Kt = [];
let ct = [];
const te = [], Ve = /* @__PURE__ */ Promise.resolve();
let Ht = !1;
function Be() {
  Ht || (Ht = !0, Ve.then(ft));
}
function It(s) {
  ct.push(s);
}
const Rt = /* @__PURE__ */ new Set();
let at = 0;
function ft() {
  if (at !== 0)
    return;
  const s = vt;
  do {
    try {
      for (; at < ht.length; ) {
        const n = ht[at];
        at++, pt(n), Fe(n.$$);
      }
    } catch (n) {
      throw ht.length = 0, at = 0, n;
    }
    for (pt(null), ht.length = 0, at = 0; Kt.length; )
      Kt.pop()();
    for (let n = 0; n < ct.length; n += 1) {
      const t = ct[n];
      Rt.has(t) || (Rt.add(t), t());
    }
    ct.length = 0;
  } while (ht.length);
  for (; te.length; )
    te.pop()();
  Ht = !1, Rt.clear(), pt(s);
}
function Fe(s) {
  if (s.fragment !== null) {
    s.update(), wt(s.before_update);
    const n = s.dirty;
    s.dirty = [-1], s.fragment && s.fragment.p(s.ctx, n), s.after_update.forEach(It);
  }
}
function We(s) {
  const n = [], t = [];
  ct.forEach((e) => s.indexOf(e) === -1 ? n.push(e) : t.push(e)), t.forEach((e) => e()), ct = n;
}
const Ge = /* @__PURE__ */ new Set();
function fe(s, n) {
  s && s.i && (Ge.delete(s), s.i(n));
}
function ee(s) {
  return (s == null ? void 0 : s.length) !== void 0 ? s : Array.from(s);
}
function Xe(s, n) {
  s.d(1), n.delete(s.key);
}
function qe(s, n, t, e, r, i, o, h, p, f, d, _) {
  let A = s.length, j = i.length, M = A;
  const H = {};
  for (; M--; )
    H[s[M].key] = M;
  const N = [], X = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map(), Q = [];
  for (M = j; M--; ) {
    const O = _(r, i, M), y = t(O);
    let L = o.get(y);
    L ? e && Q.push(() => L.p(O, n)) : (L = f(y, O), L.c()), X.set(y, N[M] = L), y in H && q.set(y, Math.abs(M - H[y]));
  }
  const K = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new Set();
  function et(O) {
    fe(O, 1), O.m(h, d), o.set(O.key, O), d = O.first, j--;
  }
  for (; A && j; ) {
    const O = N[j - 1], y = s[A - 1], L = O.key, U = y.key;
    O === y ? (d = O.first, A--, j--) : X.has(U) ? !o.has(L) || K.has(L) ? et(O) : tt.has(U) ? A-- : q.get(L) > q.get(U) ? (tt.add(L), et(O)) : (K.add(U), A--) : (p(y, o), A--);
  }
  for (; A--; ) {
    const O = s[A];
    X.has(O.key) || p(O, o);
  }
  for (; j; )
    et(N[j - 1]);
  return wt(Q), N;
}
function Ye(s, n, t) {
  const { fragment: e, after_update: r } = s.$$;
  e && e.m(n, t), It(() => {
    const i = s.$$.on_mount.map(ce).filter(le);
    s.$$.on_destroy ? s.$$.on_destroy.push(...i) : wt(i), s.$$.on_mount = [];
  }), r.forEach(It);
}
function Ze(s, n) {
  const t = s.$$;
  t.fragment !== null && (We(t.after_update), wt(t.on_destroy), t.fragment && t.fragment.d(n), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Qe(s, n) {
  s.$$.dirty[0] === -1 && (ht.push(s), Be(), s.$$.dirty.fill(0)), s.$$.dirty[n / 31 | 0] |= 1 << n % 31;
}
function Ke(s, n, t, e, r, i, o, h = [-1]) {
  const p = vt;
  pt(s);
  const f = s.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: mt,
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
  o && o(f.root);
  let d = !1;
  if (f.ctx = t ? t(s, n.props || {}, (_, A, ...j) => {
    const M = j.length ? j[0] : A;
    return f.ctx && r(f.ctx[_], f.ctx[_] = M) && (!f.skip_bound && f.bound[_] && f.bound[_](M), d && Qe(s, _)), A;
  }) : [], f.update(), d = !0, wt(f.before_update), f.fragment = e ? e(f.ctx) : !1, n.target) {
    if (n.hydrate) {
      const _ = Ie(n.target);
      f.fragment && f.fragment.l(_), _.forEach(_t);
    } else
      f.fragment && f.fragment.c();
    n.intro && fe(s.$$.fragment), Ye(s, n.target, n.anchor), ft();
  }
  pt(p);
}
let de;
typeof HTMLElement == "function" && (de = class extends HTMLElement {
  constructor(n, t, e) {
    super();
    /** The Svelte component constructor */
    g(this, "$$ctor");
    /** Slots */
    g(this, "$$s");
    /** The Svelte component instance */
    g(this, "$$c");
    /** Whether or not the custom element is connected */
    g(this, "$$cn", !1);
    /** Component props data */
    g(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    g(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    g(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    g(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    g(this, "$$l_u", /* @__PURE__ */ new Map());
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
          let o;
          return {
            c: function() {
              o = st("slot"), i !== "default" && x(o, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(f, d) {
              St(f, o, d);
            },
            d: function(f) {
              f && _t(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn)
        return;
      const t = {}, e = De(this);
      for (const i of this.$$s)
        i in e && (t[i] = [n(i)]);
      for (const i of this.attributes) {
        const o = this.$$g_p(i.name);
        o in this.$$d || (this.$$d[o] = At(o, i.value, this.$$p_d, "toProp"));
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
            const o = At(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(i) : this.setAttribute(this.$$p_d[i].attribute || i, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(r), r();
      for (const i in this.$$l)
        for (const o of this.$$l[i]) {
          const h = this.$$c.$on(i, o);
          this.$$l_u.set(o, h);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(n, t, e) {
    var r;
    this.$$r || (n = this.$$g_p(n), this.$$d[n] = At(n, e, this.$$p_d, "toProp"), (r = this.$$c) == null || r.$set({ [n]: this.$$d[n] }));
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
function At(s, n, t, e) {
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
function ts(s, n, t, e, r, i) {
  let o = class extends de {
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
    Object.defineProperty(o.prototype, h, {
      get() {
        return this.$$c && h in this.$$c ? this.$$c[h] : this.$$d[h];
      },
      set(p) {
        var f;
        p = At(h, p, n), this.$$d[h] = p, (f = this.$$c) == null || f.$set({ [h]: p });
      }
    });
  }), e.forEach((h) => {
    Object.defineProperty(o.prototype, h, {
      get() {
        var p;
        return (p = this.$$c) == null ? void 0 : p[h];
      }
    });
  }), i && (o = i(o)), s.element = /** @type {any} */
  o, o;
}
class es {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    g(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    g(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Ze(this, 1), this.$destroy = mt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(n, t) {
    if (!le(t))
      return mt;
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
    this.$$set && !Ne(n) && (this.$$.skip_bound = !0, this.$$set(n), this.$$.skip_bound = !1);
  }
}
const ss = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ss);
const { isArray: ns } = Array, rs = Object.keys, yt = (s) => {
  if (!s)
    return s;
  if (ns(s)) {
    const n = [], t = s.length;
    for (let e = 0; e < t; e++)
      n.push(yt(s[e]));
    return n;
  } else if (typeof s == "object") {
    const n = rs(s), t = n.length, e = {};
    for (let r = 0; r < t; r++) {
      const i = n[r];
      e[i] = yt(s[i]);
    }
    return e;
  }
  return s;
};
class J {
  constructor(n) {
    g(this, "path");
    g(this, "from");
    this.path = n;
  }
}
const is = /~1/g, os = /~0/g, as = /~/g, hs = /\//g;
function cs(s) {
  return s.indexOf("~") === -1 ? s : s.replace(is, "/").replace(os, "~");
}
function ls(s) {
  return s.indexOf("/") === -1 && s.indexOf("~") === -1 ? s : s.replace(as, "~0").replace(hs, "~1");
}
function us(s) {
  return s ? s.slice(1).split("/").map(cs) : [];
}
function $(s) {
  return ps(s) ? "" : "/" + s.map((n) => ls(String(n))).join("/");
}
const E = (s) => typeof s == "string" ? us(s) : s, ps = (s) => !s.length, fs = Object.prototype.hasOwnProperty;
function ds(s, n) {
  return fs.call(s, n);
}
const { isArray: ge } = Array, T = (s, n) => {
  const t = n.length;
  if (!t)
    return { val: s };
  let e, r;
  for (let o = 0; o < t; o++)
    if (e = s, r = n[o], ge(e)) {
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
      s = ds(e, r) ? e[r] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: s, obj: e, key: r };
}, bt = (s) => ge(s.obj) && typeof s.key == "number", xt = (s) => typeof s.obj == "object" && typeof s.key == "string";
class Jt extends J {
  constructor(t, e) {
    super(t);
    g(this, "value");
    this.value = e;
  }
  op() {
    return "add";
  }
  code() {
    return 0;
  }
  apply(t) {
    const { val: e, key: r, obj: i } = T(t, this.path), o = yt(this.value);
    if (!i)
      t = o;
    else if (typeof r == "string")
      i[r] = o;
    else {
      const h = i.length;
      if (r < h)
        i.splice(r, 0, o);
      else {
        if (r > h)
          throw new Error("INVALID_INDEX");
        i.push(o);
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
class me extends J {
  constructor(t, e) {
    super(t);
    g(this, "oldValue");
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
    return xt(e) ? delete e.obj[e.key] : bt(e) ? e.val !== void 0 && e.obj.splice(e.key, 1) : t = null, { doc: t, old: e.val };
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
class gs extends J {
  constructor(t, e, r) {
    super(t);
    g(this, "value");
    g(this, "oldValue");
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
    return xt(e) ? e.obj[e.key] = this.value : bt(e) ? e.obj[e.key] = this.value : t = this.value, { doc: t, old: e.val };
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
class ms extends J {
  constructor(t, e) {
    super(t);
    g(this, "from");
    this.from = e;
  }
  op() {
    return "move";
  }
  code() {
    return 4;
  }
  apply(t) {
    const e = new me(E(this.from), void 0).apply(t);
    return new Jt(this.path, e.old).apply(e.doc);
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
class vs extends J {
  constructor(t, e) {
    super(t);
    g(this, "from");
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
    return new Jt(this.path, yt(e)).apply(t);
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
class D extends J {
  apply(n) {
    if (!this.test(n))
      throw new Error("TEST");
    return { doc: n };
  }
}
const jt = (s, n) => {
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
        if (!jt(s[e], n[e]))
          return !1;
      return !0;
    }
    if (r = Object.keys(s), t = r.length, t !== Object.keys(n).length)
      return !1;
    for (e = t; e-- !== 0; ) {
      const i = r[e];
      if (!jt(s[i], n[i]))
        return !1;
    }
    return !0;
  }
  return !1;
};
class ys extends D {
  constructor(t, e, r) {
    super(t);
    g(this, "value");
    g(this, "not");
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
    const r = jt(e, this.value);
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
class ws extends J {
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
class _s extends J {
  constructor(t, e) {
    super(t);
    g(this, "inc");
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
class bs extends J {
  constructor(t, e, r) {
    super(t);
    g(this, "pos");
    g(this, "str");
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
    const o = typeof e == "string" ? e : "", h = Math.min(this.pos, o.length), p = o.slice(0, h), f = o.slice(h), d = p + this.str + f;
    return i ? i[r] = d : t = d, { doc: t, old: e };
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
class Es extends J {
  constructor(t, e, r, i) {
    super(t);
    g(this, "pos");
    g(this, "str");
    g(this, "len");
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
    const o = e.length, h = Math.min(this.pos, e.length), p = Math.min(h, o), f = this.str !== void 0 ? this.str.length : this.len, d = Math.min(h + f, o), _ = e.slice(0, p), A = e.substr(d), j = _ + A;
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
const { isArray: ks } = Array, Ut = (s) => !!s && typeof s == "object" && typeof s.text == "string", Dt = (s) => !!s && typeof s == "object" && ks(s.children), Cs = (s, n) => {
  const t = new RegExp(s, n ? "i" : void 0);
  return (e) => t.test(e);
};
class $s extends J {
  constructor(t, e, r) {
    super(t);
    g(this, "pos");
    g(this, "props");
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
    return xt(e) ? e.obj[e.key] = r : bt(e) ? (e.obj[e.key] = r[0], e.obj.splice(e.key + 1, 0, r[1])) : t = r, { doc: t, old: e.val };
  }
  split(t) {
    if (typeof t == "string") {
      const { pos: e, props: r } = this, i = t.slice(0, e), o = t.slice(e);
      return r ? [
        {
          ...r,
          text: i
        },
        {
          ...r,
          text: o
        }
      ] : [i, o];
    } else if (Ut(t)) {
      const { pos: e, props: r } = this, i = t.text.slice(0, e), o = t.text.slice(e);
      return [
        {
          ...t,
          ...r,
          text: i
        },
        {
          ...t,
          ...r,
          text: o
        }
      ];
    } else if (Dt(t)) {
      const { pos: e, props: r } = this, i = t.children.slice(0, e), o = t.children.slice(e);
      return [
        {
          ...t,
          ...r,
          children: i
        },
        {
          ...t,
          ...r,
          children: o
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
class As extends J {
  constructor(t, e, r) {
    super(t);
    g(this, "pos");
    g(this, "props");
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
    if (!bt(e))
      throw new Error("INVALID_TARGET");
    if (e.key <= 0)
      throw new Error("INVALID_KEY");
    const r = e.obj[e.key - 1], i = e.obj[e.key], o = this.merge(r, i);
    return e.obj[e.key - 1] = o, e.obj.splice(e.key, 1), { doc: t, old: [r, i] };
  }
  merge(t, e) {
    return typeof t == "string" && typeof e == "string" || typeof t == "number" && typeof e == "number" ? t + e : Ut(t) && Ut(e) ? { ...t, ...e, text: t.text + e.text } : Dt(t) && Dt(e) ? { ...t, ...e, children: [...t.children, ...e.children] } : [t, e];
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
const { isArray: Ts } = Array;
class js extends J {
  constructor(t, e, r) {
    super(t);
    g(this, "props");
    g(this, "deleteNull");
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
    return bt(e) ? e.val !== void 0 && (e.obj[e.key] = this.extend(e.val)) : xt(e) ? e.obj[e.key] = this.extend(e.val) : t = this.extend(t), { doc: t };
  }
  extend(t) {
    if (Ts(t) || typeof t != "object" || !t)
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
class Os extends D {
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
class Ss extends D {
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
const { isArray: xs } = Array;
class Ms extends D {
  constructor(t, e) {
    super(t);
    g(this, "type");
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
    return e === null ? this.type.indexOf("null") > -1 : xs(e) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof e) > -1 || typeof e == "number" && e === Math.round(e) && this.type.indexOf("integer") > -1;
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
class Ls extends D {
  constructor(t, e, r, i) {
    super(t);
    g(this, "pos");
    g(this, "str");
    g(this, "not");
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
    const r = e.length, i = Math.min(this.pos, r), o = Math.min(this.pos + this.str.length, r), h = e.substring(i, o) === this.str;
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
class Ns extends D {
  constructor(t, e, r) {
    super(t);
    g(this, "len");
    g(this, "not");
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
class Rs extends D {
  constructor(t, e, r) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
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
class Ps extends D {
  constructor(t, e, r) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
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
class Hs extends D {
  constructor(t, e, r) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
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
class Is extends D {
  constructor(t, e) {
    super(t);
    g(this, "value");
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
      if (jt(e, r))
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
class Us extends D {
  constructor(t, e) {
    super(t);
    g(this, "value");
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
class Ds extends D {
  constructor(t, e) {
    super(t);
    g(this, "value");
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
class Vt extends D {
  constructor(t, e) {
    super(t);
    g(this, "ops");
    this.ops = e;
  }
}
class zs extends Vt {
  constructor(t, e) {
    super(t, e);
    g(this, "ops");
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
    for (let o = 0; o < i; o++)
      this.ops[o].encode(t, this);
  }
}
class Js extends Vt {
  constructor(t, e) {
    super(t, e);
    g(this, "ops");
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
class Vs extends Vt {
  constructor(t, e) {
    super(t, e);
    g(this, "ops");
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
class Bs extends D {
  constructor(t, e, r, i) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
    g(this, "matcher");
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
const { isArray: Fs } = Array;
class Ws extends D {
  constructor(t, e) {
    super(t);
    g(this, "value");
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
    return e === null ? this.value === "null" : Fs(e) ? this.value === "array" : typeof e === this.value || typeof e == "number" && e === Math.round(e) && this.value === "integer";
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
const Gs = (s, n) => {
  switch (s.op) {
    case "add":
      return new Jt(E(s.path), s.value);
    case "remove":
      return new me(E(s.path), s.oldValue);
    case "replace":
      return new gs(E(s.path), s.value, s.oldValue);
    case "move":
      return new ms(E(s.path), E(s.from));
    case "copy":
      return new vs(E(s.path), E(s.from));
    case "flip":
      return new ws(E(s.path));
    case "inc":
      return new _s(E(s.path), s.inc);
    case "str_ins":
      return new bs(E(s.path), s.pos, s.str);
    case "str_del":
      return new Es(E(s.path), s.pos, s.str, s.len);
    case "split":
      return new $s(E(s.path), s.pos, s.props || null);
    case "merge":
      return new As(E(s.path), s.pos, s.props || null);
    case "extend":
      return new js(E(s.path), s.props, !!s.deleteNull);
    default:
      return Tt(s, n);
  }
}, Tt = (s, n) => {
  switch (s.op) {
    case "test":
      return new ys(E(s.path), s.value, !!s.not);
    case "defined":
      return new Os(E(s.path));
    case "undefined":
      return new Ss(E(s.path));
    case "type":
      return new Ws(E(s.path), s.value);
    case "test_type":
      return new Ms(E(s.path), s.type);
    case "test_string":
      return new Ls(E(s.path), s.pos, s.str, !!s.not);
    case "test_string_len":
      return new Ns(E(s.path), s.len, !!s.not);
    case "contains":
      return new Rs(E(s.path), s.value, !!s.ignore_case);
    case "ends":
      return new Ps(E(s.path), s.value, !!s.ignore_case);
    case "starts":
      return new Hs(E(s.path), s.value, !!s.ignore_case);
    case "matches":
      return new Bs(E(s.path), s.value, !!s.ignore_case, n.createMatcher || Cs);
    case "in":
      return new Is(E(s.path), s.value);
    case "less":
      return new Us(E(s.path), s.value);
    case "more":
      return new Ds(E(s.path), s.value);
    case "and": {
      const t = E(s.path);
      return new zs(t, s.apply.map((e) => Tt({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    case "or": {
      const t = E(s.path);
      return new Js(t, s.apply.map((e) => Tt({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    case "not": {
      const t = E(s.path);
      return new Vs(t, s.apply.map((e) => Tt({ ...e, path: [...t, ...E(e.path)] }, n)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function Xs(s, n, t) {
  t.mutate || (s = yt(s));
  const e = [], r = n.length;
  for (let i = 0; i < r; i++) {
    const h = Gs(n[i], t).apply(s);
    s = h.doc, e.push(h);
  }
  return { doc: s, res: e };
}
var dt = (s) => typeof s == "function" ? s : function() {
  return s;
}, qs = typeof self < "u" ? self : null, ut = typeof window < "u" ? window : null, gt = qs || ut || gt, Ys = "2.0.0", B = { connecting: 0, open: 1, closing: 2, closed: 3 }, Zs = 1e4, Qs = 1e3, z = {
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
}, zt = {
  longpoll: "longpoll",
  websocket: "websocket"
}, Ks = {
  complete: 4
}, Ct = class {
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
}, ve = class {
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
}, tn = class {
  constructor(s, n, t) {
    this.state = z.closed, this.topic = s, this.params = dt(n || {}), this.socket = t, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new Ct(this, G.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new ve(() => {
      this.socket.isConnected() && this.rejoin();
    }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
    })), this.joinPush.receive("ok", () => {
      this.state = z.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), this.pushBuffer = [];
    }), this.joinPush.receive("error", () => {
      this.state = z.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.onClose(() => {
      this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = z.closed, this.socket.remove(this);
    }), this.onError((e) => {
      this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e), this.isJoining() && this.joinPush.reset(), this.state = z.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.joinPush.receive("timeout", () => {
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new Ct(this, G.leave, dt({}), this.timeout).send(), this.state = z.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
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
    let e = new Ct(this, s, function() {
      return n;
    }, t);
    return this.canPush() ? e.send() : (e.startTimeout(), this.pushBuffer.push(e)), e;
  }
  leave(s = this.timeout) {
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = z.leaving;
    let n = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(G.close, "leave");
    }, t = new Ct(this, G.leave, dt({}), s);
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
    this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = z.joining, this.joinPush.resend(s));
  }
  trigger(s, n, t, e) {
    let r = this.onMessage(s, n, t, e);
    if (n && !r)
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    let i = this.bindings.filter((o) => o.event === s);
    for (let o = 0; o < i.length; o++)
      i[o].callback(r, t, e || this.joinRef());
  }
  replyEventName(s) {
    return `chan_reply_${s}`;
  }
  isClosed() {
    return this.state === z.closed;
  }
  isErrored() {
    return this.state === z.errored;
  }
  isJoined() {
    return this.state === z.joined;
  }
  isJoining() {
    return this.state === z.joining;
  }
  isLeaving() {
    return this.state === z.leaving;
  }
}, Ot = class {
  static request(s, n, t, e, r, i, o) {
    if (gt.XDomainRequest) {
      let h = new gt.XDomainRequest();
      return this.xdomainRequest(h, s, n, e, r, i, o);
    } else {
      let h = new gt.XMLHttpRequest();
      return this.xhrRequest(h, s, n, t, e, r, i, o);
    }
  }
  static xdomainRequest(s, n, t, e, r, i, o) {
    return s.timeout = r, s.open(n, t), s.onload = () => {
      let h = this.parseJSON(s.responseText);
      o && o(h);
    }, i && (s.ontimeout = i), s.onprogress = () => {
    }, s.send(e), s;
  }
  static xhrRequest(s, n, t, e, r, i, o, h) {
    return s.open(n, t, !0), s.timeout = i, s.setRequestHeader("Content-Type", e), s.onerror = () => h && h(null), s.onreadystatechange = () => {
      if (s.readyState === Ks.complete && h) {
        let p = this.parseJSON(s.responseText);
        h(p);
      }
    }, o && (s.ontimeout = o), s.send(r), s;
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
}, Pt = class {
  constructor(s) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(s), this.readyState = B.connecting, this.poll();
  }
  normalizeEndpoint(s) {
    return s.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + zt.websocket), "$1/" + zt.longpoll);
  }
  endpointURL() {
    return Ot.appendParams(this.pollEndpoint, { token: this.token });
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
    r = Ot.request(s, this.endpointURL(), "application/json", n, this.timeout, i, (o) => {
      this.reqs.delete(r), this.isActive() && e(o);
    }), this.reqs.add(r);
  }
}, $t = {
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
      let [t, e, r, i, o] = JSON.parse(s);
      return n({ join_ref: t, ref: e, topic: r, event: i, payload: o });
    }
  },
  binaryEncode(s) {
    let { join_ref: n, ref: t, event: e, topic: r, payload: i } = s, o = this.META_LENGTH + n.length + t.length + r.length + e.length, h = new ArrayBuffer(this.HEADER_LENGTH + o), p = new DataView(h), f = 0;
    p.setUint8(f++, this.KINDS.push), p.setUint8(f++, n.length), p.setUint8(f++, t.length), p.setUint8(f++, r.length), p.setUint8(f++, e.length), Array.from(n, (_) => p.setUint8(f++, _.charCodeAt(0))), Array.from(t, (_) => p.setUint8(f++, _.charCodeAt(0))), Array.from(r, (_) => p.setUint8(f++, _.charCodeAt(0))), Array.from(e, (_) => p.setUint8(f++, _.charCodeAt(0)));
    var d = new Uint8Array(h.byteLength + i.byteLength);
    return d.set(new Uint8Array(h), 0), d.set(new Uint8Array(i), h.byteLength), d.buffer;
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
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), o = this.HEADER_LENGTH + this.META_LENGTH - 1, h = t.decode(s.slice(o, o + e));
    o = o + e;
    let p = t.decode(s.slice(o, o + r));
    o = o + r;
    let f = t.decode(s.slice(o, o + i));
    o = o + i;
    let d = s.slice(o, s.byteLength);
    return { join_ref: h, ref: null, topic: p, event: f, payload: d };
  },
  decodeReply(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), o = n.getUint8(4), h = this.HEADER_LENGTH + this.META_LENGTH, p = t.decode(s.slice(h, h + e));
    h = h + e;
    let f = t.decode(s.slice(h, h + r));
    h = h + r;
    let d = t.decode(s.slice(h, h + i));
    h = h + i;
    let _ = t.decode(s.slice(h, h + o));
    h = h + o;
    let A = s.slice(h, s.byteLength), j = { status: _, response: A };
    return { join_ref: p, ref: f, topic: d, event: G.reply, payload: j };
  },
  decodeBroadcast(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = this.HEADER_LENGTH + 2, o = t.decode(s.slice(i, i + e));
    i = i + e;
    let h = t.decode(s.slice(i, i + r));
    i = i + r;
    let p = s.slice(i, s.byteLength);
    return { join_ref: null, ref: null, topic: o, event: h, payload: p };
  }
}, en = class {
  constructor(s, n = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = n.timeout || Zs, this.transport = n.transport || gt.WebSocket || Pt, this.establishedConnections = 0, this.defaultEncoder = $t.encode.bind($t), this.defaultDecoder = $t.decode.bind($t), this.closeWasClean = !1, this.binaryType = n.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== Pt ? (this.encode = n.encode || this.defaultEncoder, this.decode = n.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let t = null;
    ut && ut.addEventListener && (ut.addEventListener("pagehide", (e) => {
      this.conn && (this.disconnect(), t = this.connectClock);
    }), ut.addEventListener("pageshow", (e) => {
      t === this.connectClock && (t = null, this.connect());
    })), this.heartbeatIntervalMs = n.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => n.rejoinAfterMs ? n.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4, this.reconnectAfterMs = (e) => n.reconnectAfterMs ? n.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3, this.logger = n.logger || null, this.longpollerTimeout = n.longpollerTimeout || 2e4, this.params = dt(n.params || {}), this.endPoint = `${s}/${zt.websocket}`, this.vsn = n.vsn || Ys, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new ve(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return Pt;
  }
  replaceTransport(s) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = s;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let s = Ot.appendParams(Ot.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    return s.charAt(0) !== "/" ? s : s.charAt(1) === "/" ? `${this.protocol()}:${s}` : `${this.protocol()}://${location.host}${s}`;
  }
  disconnect(s, n, t) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(s, n, t);
  }
  connect(s) {
    s && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = dt(s)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (n) => this.onConnError(n), this.conn.onmessage = (n) => this.onConnMessage(n), this.conn.onclose = (n) => this.onConnClose(n));
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
    this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Qs, "heartbeat timeout"));
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
      s.isErrored() || s.isLeaving() || s.isClosed() || s.trigger(G.error);
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
    let t = new tn(s, n, this);
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
      let { topic: t, event: e, payload: r, ref: i, join_ref: o } = n;
      i && i === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${r.status || ""} ${t} ${e} ${i && "(" + i + ")" || ""}`, r);
      for (let h = 0; h < this.channels.length; h++) {
        const p = this.channels[h];
        p.isMember(t, e, r, o) && p.trigger(e, r, i, o);
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
class sn {
  constructor(n) {
    this.connected = !1, this.config = n, this.socket = new en(this.config.url, this.config.socketOptions || { logger: (t, e, r) => {
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
    })), this.versionMatches(t)) {
      const { doc: e, res: r } = Xs(this.state, n, { mutate: !1 });
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
    function r(i, o) {
      return function(h, p) {
        typeof i[h] != "function" && Object.defineProperty(i, h, { configurable: !0, writable: !0, value: p }), o && o(h, p);
      };
    }
  })(function(n) {
    var t = Object.prototype.hasOwnProperty, e = typeof Symbol == "function", r = e && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", i = e && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", o = typeof Object.create == "function", h = { __proto__: [] } instanceof Array, p = !o && !h, f = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: o ? function() {
        return Lt(/* @__PURE__ */ Object.create(null));
      } : h ? function() {
        return Lt({ __proto__: null });
      } : function() {
        return Lt({});
      },
      has: p ? function(a, c) {
        return t.call(a, c);
      } : function(a, c) {
        return c in a;
      },
      get: p ? function(a, c) {
        return t.call(a, c) ? a[c] : void 0;
      } : function(a, c) {
        return a[c];
      }
    }, d = Object.getPrototypeOf(Function), _ = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", A = !_ && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : je(), j = !_ && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Oe(), M = !_ && typeof WeakMap == "function" ? WeakMap : Se(), H = new M();
    function N(a, c, l, u) {
      if (R(l)) {
        if (!Gt(a))
          throw new TypeError();
        if (!Xt(c))
          throw new TypeError();
        return U(a, c);
      } else {
        if (!Gt(a))
          throw new TypeError();
        if (!P(c))
          throw new TypeError();
        if (!P(u) && !R(u) && !rt(u))
          throw new TypeError();
        return rt(u) && (u = void 0), l = F(l), nt(a, c, l, u);
      }
    }
    n("decorate", N);
    function X(a, c) {
      function l(u, m) {
        if (!P(u))
          throw new TypeError();
        if (!R(m) && !ke(m))
          throw new TypeError();
        kt(a, c, u, m);
      }
      return l;
    }
    n("metadata", X);
    function q(a, c, l, u) {
      if (!P(l))
        throw new TypeError();
      return R(u) || (u = F(u)), kt(a, c, l, u);
    }
    n("defineMetadata", q);
    function Q(a, c, l) {
      if (!P(c))
        throw new TypeError();
      return R(l) || (l = F(l)), Y(a, c, l);
    }
    n("hasMetadata", Q);
    function K(a, c, l) {
      if (!P(c))
        throw new TypeError();
      return R(l) || (l = F(l)), S(a, c, l);
    }
    n("hasOwnMetadata", K);
    function tt(a, c, l) {
      if (!P(c))
        throw new TypeError();
      return R(l) || (l = F(l)), lt(a, c, l);
    }
    n("getMetadata", tt);
    function et(a, c, l) {
      if (!P(c))
        throw new TypeError();
      return R(l) || (l = F(l)), Et(a, c, l);
    }
    n("getOwnMetadata", et);
    function O(a, c) {
      if (!P(a))
        throw new TypeError();
      return R(c) || (c = F(c)), Bt(a, c);
    }
    n("getMetadataKeys", O);
    function y(a, c) {
      if (!P(a))
        throw new TypeError();
      return R(c) || (c = F(c)), Ft(a, c);
    }
    n("getOwnMetadataKeys", y);
    function L(a, c, l) {
      if (!P(c))
        throw new TypeError();
      R(l) || (l = F(l));
      var u = V(
        c,
        l,
        /*Create*/
        !1
      );
      if (R(u) || !u.delete(a))
        return !1;
      if (u.size > 0)
        return !0;
      var m = H.get(c);
      return m.delete(l), m.size > 0 || H.delete(c), !0;
    }
    n("deleteMetadata", L);
    function U(a, c) {
      for (var l = a.length - 1; l >= 0; --l) {
        var u = a[l], m = u(c);
        if (!R(m) && !rt(m)) {
          if (!Xt(m))
            throw new TypeError();
          c = m;
        }
      }
      return c;
    }
    function nt(a, c, l, u) {
      for (var m = a.length - 1; m >= 0; --m) {
        var I = a[m], w = I(c, l, u);
        if (!R(w) && !rt(w)) {
          if (!P(w))
            throw new TypeError();
          u = w;
        }
      }
      return u;
    }
    function V(a, c, l) {
      var u = H.get(a);
      if (R(u)) {
        if (!l)
          return;
        u = new A(), H.set(a, u);
      }
      var m = u.get(c);
      if (R(m)) {
        if (!l)
          return;
        m = new A(), u.set(c, m);
      }
      return m;
    }
    function Y(a, c, l) {
      var u = S(a, c, l);
      if (u)
        return !0;
      var m = Mt(c);
      return rt(m) ? !1 : Y(a, m, l);
    }
    function S(a, c, l) {
      var u = V(
        c,
        l,
        /*Create*/
        !1
      );
      return R(u) ? !1 : be(u.has(a));
    }
    function lt(a, c, l) {
      var u = S(a, c, l);
      if (u)
        return Et(a, c, l);
      var m = Mt(c);
      if (!rt(m))
        return lt(a, m, l);
    }
    function Et(a, c, l) {
      var u = V(
        c,
        l,
        /*Create*/
        !1
      );
      if (!R(u))
        return u.get(a);
    }
    function kt(a, c, l, u) {
      var m = V(
        l,
        u,
        /*Create*/
        !0
      );
      m.set(a, c);
    }
    function Bt(a, c) {
      var l = Ft(a, c), u = Mt(a);
      if (u === null)
        return l;
      var m = Bt(u, c);
      if (m.length <= 0)
        return l;
      if (l.length <= 0)
        return m;
      for (var I = new j(), w = [], b = 0, v = l; b < v.length; b++) {
        var k = v[b], C = I.has(k);
        C || (I.add(k), w.push(k));
      }
      for (var Z = 0, Yt = m; Z < Yt.length; Z++) {
        var k = Yt[Z], C = I.has(k);
        C || (I.add(k), w.push(k));
      }
      return w;
    }
    function Ft(a, c) {
      var l = [], u = V(
        a,
        c,
        /*Create*/
        !1
      );
      if (R(u))
        return l;
      for (var m = u.keys(), I = Ce(m), w = 0; ; ) {
        var b = Ae(I);
        if (!b)
          return l.length = w, l;
        var v = $e(b);
        try {
          l[w] = v;
        } catch (k) {
          try {
            Te(I);
          } finally {
            throw k;
          }
        }
        w++;
      }
    }
    function Wt(a) {
      if (a === null)
        return 1;
      switch (typeof a) {
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
          return a === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function R(a) {
      return a === void 0;
    }
    function rt(a) {
      return a === null;
    }
    function ye(a) {
      return typeof a == "symbol";
    }
    function P(a) {
      return typeof a == "object" ? a !== null : typeof a == "function";
    }
    function we(a, c) {
      switch (Wt(a)) {
        case 0:
          return a;
        case 1:
          return a;
        case 2:
          return a;
        case 3:
          return a;
        case 4:
          return a;
        case 5:
          return a;
      }
      var l = c === 3 ? "string" : c === 5 ? "number" : "default", u = qt(a, r);
      if (u !== void 0) {
        var m = u.call(a, l);
        if (P(m))
          throw new TypeError();
        return m;
      }
      return _e(a, l === "default" ? "number" : l);
    }
    function _e(a, c) {
      if (c === "string") {
        var l = a.toString;
        if (it(l)) {
          var u = l.call(a);
          if (!P(u))
            return u;
        }
        var m = a.valueOf;
        if (it(m)) {
          var u = m.call(a);
          if (!P(u))
            return u;
        }
      } else {
        var m = a.valueOf;
        if (it(m)) {
          var u = m.call(a);
          if (!P(u))
            return u;
        }
        var I = a.toString;
        if (it(I)) {
          var u = I.call(a);
          if (!P(u))
            return u;
        }
      }
      throw new TypeError();
    }
    function be(a) {
      return !!a;
    }
    function Ee(a) {
      return "" + a;
    }
    function F(a) {
      var c = we(
        a,
        3
        /* String */
      );
      return ye(c) ? c : Ee(c);
    }
    function Gt(a) {
      return Array.isArray ? Array.isArray(a) : a instanceof Object ? a instanceof Array : Object.prototype.toString.call(a) === "[object Array]";
    }
    function it(a) {
      return typeof a == "function";
    }
    function Xt(a) {
      return typeof a == "function";
    }
    function ke(a) {
      switch (Wt(a)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function qt(a, c) {
      var l = a[c];
      if (l != null) {
        if (!it(l))
          throw new TypeError();
        return l;
      }
    }
    function Ce(a) {
      var c = qt(a, i);
      if (!it(c))
        throw new TypeError();
      var l = c.call(a);
      if (!P(l))
        throw new TypeError();
      return l;
    }
    function $e(a) {
      return a.value;
    }
    function Ae(a) {
      var c = a.next();
      return c.done ? !1 : c;
    }
    function Te(a) {
      var c = a.return;
      c && c.call(a);
    }
    function Mt(a) {
      var c = Object.getPrototypeOf(a);
      if (typeof a != "function" || a === d || c !== d)
        return c;
      var l = a.prototype, u = l && Object.getPrototypeOf(l);
      if (u == null || u === Object.prototype)
        return c;
      var m = u.constructor;
      return typeof m != "function" || m === a ? c : m;
    }
    function je() {
      var a = {}, c = [], l = (
        /** @class */
        function() {
          function w(b, v, k) {
            this._index = 0, this._keys = b, this._values = v, this._selector = k;
          }
          return w.prototype["@@iterator"] = function() {
            return this;
          }, w.prototype[i] = function() {
            return this;
          }, w.prototype.next = function() {
            var b = this._index;
            if (b >= 0 && b < this._keys.length) {
              var v = this._selector(this._keys[b], this._values[b]);
              return b + 1 >= this._keys.length ? (this._index = -1, this._keys = c, this._values = c) : this._index++, { value: v, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, w.prototype.throw = function(b) {
            throw this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), b;
          }, w.prototype.return = function(b) {
            return this._index >= 0 && (this._index = -1, this._keys = c, this._values = c), { value: b, done: !0 };
          }, w;
        }()
      );
      return (
        /** @class */
        function() {
          function w() {
            this._keys = [], this._values = [], this._cacheKey = a, this._cacheIndex = -2;
          }
          return Object.defineProperty(w.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), w.prototype.has = function(b) {
            return this._find(
              b,
              /*insert*/
              !1
            ) >= 0;
          }, w.prototype.get = function(b) {
            var v = this._find(
              b,
              /*insert*/
              !1
            );
            return v >= 0 ? this._values[v] : void 0;
          }, w.prototype.set = function(b, v) {
            var k = this._find(
              b,
              /*insert*/
              !0
            );
            return this._values[k] = v, this;
          }, w.prototype.delete = function(b) {
            var v = this._find(
              b,
              /*insert*/
              !1
            );
            if (v >= 0) {
              for (var k = this._keys.length, C = v + 1; C < k; C++)
                this._keys[C - 1] = this._keys[C], this._values[C - 1] = this._values[C];
              return this._keys.length--, this._values.length--, b === this._cacheKey && (this._cacheKey = a, this._cacheIndex = -2), !0;
            }
            return !1;
          }, w.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = a, this._cacheIndex = -2;
          }, w.prototype.keys = function() {
            return new l(this._keys, this._values, u);
          }, w.prototype.values = function() {
            return new l(this._keys, this._values, m);
          }, w.prototype.entries = function() {
            return new l(this._keys, this._values, I);
          }, w.prototype["@@iterator"] = function() {
            return this.entries();
          }, w.prototype[i] = function() {
            return this.entries();
          }, w.prototype._find = function(b, v) {
            return this._cacheKey !== b && (this._cacheIndex = this._keys.indexOf(this._cacheKey = b)), this._cacheIndex < 0 && v && (this._cacheIndex = this._keys.length, this._keys.push(b), this._values.push(void 0)), this._cacheIndex;
          }, w;
        }()
      );
      function u(w, b) {
        return w;
      }
      function m(w, b) {
        return b;
      }
      function I(w, b) {
        return [w, b];
      }
    }
    function Oe() {
      return (
        /** @class */
        function() {
          function a() {
            this._map = new A();
          }
          return Object.defineProperty(a.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), a.prototype.has = function(c) {
            return this._map.has(c);
          }, a.prototype.add = function(c) {
            return this._map.set(c, c), this;
          }, a.prototype.delete = function(c) {
            return this._map.delete(c);
          }, a.prototype.clear = function() {
            this._map.clear();
          }, a.prototype.keys = function() {
            return this._map.keys();
          }, a.prototype.values = function() {
            return this._map.values();
          }, a.prototype.entries = function() {
            return this._map.entries();
          }, a.prototype["@@iterator"] = function() {
            return this.keys();
          }, a.prototype[i] = function() {
            return this.keys();
          }, a;
        }()
      );
    }
    function Se() {
      var a = 16, c = f.create(), l = u();
      return (
        /** @class */
        function() {
          function v() {
            this._key = u();
          }
          return v.prototype.has = function(k) {
            var C = m(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? f.has(C, this._key) : !1;
          }, v.prototype.get = function(k) {
            var C = m(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? f.get(C, this._key) : void 0;
          }, v.prototype.set = function(k, C) {
            var Z = m(
              k,
              /*create*/
              !0
            );
            return Z[this._key] = C, this;
          }, v.prototype.delete = function(k) {
            var C = m(
              k,
              /*create*/
              !1
            );
            return C !== void 0 ? delete C[this._key] : !1;
          }, v.prototype.clear = function() {
            this._key = u();
          }, v;
        }()
      );
      function u() {
        var v;
        do
          v = "@@WeakMap@@" + b();
        while (f.has(c, v));
        return c[v] = !0, v;
      }
      function m(v, k) {
        if (!t.call(v, l)) {
          if (!k)
            return;
          Object.defineProperty(v, l, { value: f.create() });
        }
        return v[l];
      }
      function I(v, k) {
        for (var C = 0; C < k; ++C)
          v[C] = Math.random() * 255 | 0;
        return v;
      }
      function w(v) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(v)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(v)) : I(new Uint8Array(v), v) : I(new Array(v), v);
      }
      function b() {
        var v = w(a);
        v[6] = v[6] & 79 | 64, v[8] = v[8] & 191 | 128;
        for (var k = "", C = 0; C < a; ++C) {
          var Z = v[C];
          (C === 4 || C === 6 || C === 8) && (k += "-"), Z < 16 && (k += "0"), k += Z.toString(16).toLowerCase();
        }
        return k;
      }
    }
    function Lt(a) {
      return a.__ = void 0, delete a.__, a;
    }
  });
})(ne || (ne = {}));
function nn() {
  const s = document.createElement("style");
  return s.textContent = `
    * {
      cursor: crosshair !important;
    }
  `, s;
}
function rn() {
  const s = document.createElement("style");
  return s.textContent = `
    * {
      pointer-events: none !important;
    }
  `, s;
}
function on(s) {
  Re(s, "svelte-j5nzm1", '#liveroom-client-element.svelte-j5nzm1.svelte-j5nzm1{font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}#users-container.svelte-j5nzm1.svelte-j5nzm1{z-index:99999;position:fixed;inset:0;overflow:hidden;pointer-events:none}.user.svelte-j5nzm1.svelte-j5nzm1{z-index:10;position:absolute;top:0;left:0;user-select:none;transform:translate(var(--x), var(--y));transition:transform 100ms linear}.user.svelte-j5nzm1 .cursor.svelte-j5nzm1{position:absolute;top:0;left:0;color:var(--color);transform-origin:top left;transform:rotate(6deg)}.user[data-isself="true"].svelte-j5nzm1 .cursor.svelte-j5nzm1{display:none}.user-name.svelte-j5nzm1.svelte-j5nzm1{padding:0.25rem 0.7rem;font-size:0.8rem;font-weight:600;color:black;background-color:var(--color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:9999px;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-j5nzm1 .user-name.svelte-j5nzm1{position:absolute;top:20px;left:16px}.user[data-isself="true"].svelte-j5nzm1 .user-name.svelte-j5nzm1{display:none}.user.svelte-j5nzm1 .halo.svelte-j5nzm1{transform:scale(0);z-index:-1;position:absolute;top:-60px;left:-60px;width:120px;height:120px;border-radius:9999px;background-color:var(--color);opacity:0.25;transition:transform 100ms ease-out;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-j5nzm1 .halo[data-show="true"].svelte-j5nzm1{transform:scale(1)}');
}
function re(s, n, t) {
  const e = s.slice();
  return e[21] = n[t], e;
}
function ie(s) {
  let n, t = [], e = /* @__PURE__ */ new Map(), r = ee(Object.values(
    /*users*/
    s[0]
  ));
  const i = (o) => (
    /*user*/
    o[21].id
  );
  for (let o = 0; o < r.length; o += 1) {
    let h = re(s, r, o), p = i(h);
    e.set(p, t[o] = oe(p, h));
  }
  return {
    c() {
      n = st("div");
      for (let o = 0; o < t.length; o += 1)
        t[o].c();
      x(n, "id", "users-container"), x(n, "class", "svelte-j5nzm1");
    },
    m(o, h) {
      St(o, n, h);
      for (let p = 0; p < t.length; p += 1)
        t[p] && t[p].m(n, null);
    },
    p(o, h) {
      h & /*Object, users, me, parseFloat, users_count*/
      7 && (r = ee(Object.values(
        /*users*/
        o[0]
      )), t = qe(t, h, i, 1, o, r, e, n, Xe, oe, null, re));
    },
    d(o) {
      o && _t(n);
      for (let h = 0; h < t.length; h += 1)
        t[h].d();
    }
  };
}
function oe(s, n) {
  let t, e, r, i, o, h = (
    /*user*/
    n[21].name + ""
  ), p, f, d, _, A, j, M;
  return {
    key: s,
    first: null,
    c() {
      t = st("div"), e = Qt("svg"), r = Qt("path"), i = Nt(), o = st("span"), p = ue(h), f = Nt(), d = st("div"), A = Nt(), x(r, "d", "M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"), x(e, "width", "23"), x(e, "viewBox", "0 0 27 24"), x(e, "fill", "currentColor"), x(e, "aria-hidden", "true"), x(e, "xmlns", "http://www.w3.org/2000/svg"), x(e, "class", "cursor svelte-j5nzm1"), x(o, "class", "user-name svelte-j5nzm1"), x(d, "class", "halo svelte-j5nzm1"), x(d, "data-show", _ = /*user*/
      (n[21].id == /*me*/
      n[1].id && /*user*/
      n[21].is_shift_key_down || /*user*/
      n[21].id != /*me*/
      n[1].id && /*user*/
      (n[21].is_shift_key_down || /*user*/
      n[21].is_mouse_down)) && /*users_count*/
      n[2] > 1), x(t, "id", j = "user-" + /*user*/
      n[21].id), x(t, "class", "user svelte-j5nzm1"), x(t, "data-isself", M = /*user*/
      n[21].id == /*me*/
      n[1].id), ot(
        t,
        "--color",
        /*user*/
        n[21].color
      ), ot(t, "--x", parseFloat(
        /*user*/
        n[21].x
      ) + "vw"), ot(t, "--y", parseFloat(
        /*user*/
        n[21].y
      ) + "vh"), this.first = t;
    },
    m(H, N) {
      St(H, t, N), W(t, e), W(e, r), W(t, i), W(t, o), W(o, p), W(t, f), W(t, d), W(t, A);
    },
    p(H, N) {
      n = H, N & /*users*/
      1 && h !== (h = /*user*/
      n[21].name + "") && Ue(p, h), N & /*users, me, users_count*/
      7 && _ !== (_ = /*user*/
      (n[21].id == /*me*/
      n[1].id && /*user*/
      n[21].is_shift_key_down || /*user*/
      n[21].id != /*me*/
      n[1].id && /*user*/
      (n[21].is_shift_key_down || /*user*/
      n[21].is_mouse_down)) && /*users_count*/
      n[2] > 1) && x(d, "data-show", _), N & /*users*/
      1 && j !== (j = "user-" + /*user*/
      n[21].id) && x(t, "id", j), N & /*users, me*/
      3 && M !== (M = /*user*/
      n[21].id == /*me*/
      n[1].id) && x(t, "data-isself", M), N & /*users*/
      1 && ot(
        t,
        "--color",
        /*user*/
        n[21].color
      ), N & /*users*/
      1 && ot(t, "--x", parseFloat(
        /*user*/
        n[21].x
      ) + "vw"), N & /*users*/
      1 && ot(t, "--y", parseFloat(
        /*user*/
        n[21].y
      ) + "vh");
    },
    d(H) {
      H && _t(t);
    }
  };
}
function an(s) {
  let n, t = (
    /*me*/
    s[1] && /*users*/
    s[0] && ie(s)
  );
  return {
    c() {
      n = st("div"), t && t.c(), x(n, "id", "liveroom-client-element"), x(n, "class", "svelte-j5nzm1");
    },
    m(e, r) {
      St(e, n, r), t && t.m(n, null);
    },
    p(e, [r]) {
      /*me*/
      e[1] && /*users*/
      e[0] ? t ? t.p(e, r) : (t = ie(e), t.c(), t.m(n, null)) : t && (t.d(1), t = null);
    },
    i: mt,
    o: mt,
    d(e) {
      e && _t(n), t && t.d();
    }
  };
}
function ae(s) {
  s.isOtherUser || (console.log("[Liveroom] Click blocked"), s.stopPropagation(), s.preventDefault());
}
function he(s, n) {
  let t = parseInt(s.slice(1, 3), 16), e = parseInt(s.slice(3, 5), 16), r = parseInt(s.slice(5, 7), 16);
  return n ? "rgba(" + t + ", " + e + ", " + r + ", " + n + ")" : "rgb(" + t + ", " + e + ", " + r + ")";
}
function hn(s, n, t) {
  let { url: e } = n, { room_id: r } = n, { user_name: i } = n, o, h = !1, p = nn(), f = rn(), d, _, A;
  ze(async () => {
    const y = new URLSearchParams(window.location.search), L = y.get("_liveroom"), U = L == null ? void 0 : L.split("https://meet.google.com/");
    let nt = U == null ? void 0 : U[0];
    !!(U != null && U[1]) && (nt = U[1].split("?")[0]), t(3, r = nt || r);
    const Y = y.get("_liveroom_user_name");
    Y && t(4, i = Y), j();
  }), Je(() => {
    M(), O();
  });
  function j() {
    o = new sn({
      url: e,
      topic: `liveroom-livestate:${r}`,
      params: {
        room_id: r,
        user_name: i,
        referrer: document.referrer,
        current_url: window.location.href,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        language: window.navigator.language,
        user_agent: window.navigator.userAgent
      },
      socketOptions: { logger: null }
    }), o.addEventListener("click-from-another-user", ({ detail: { from_user_id: y, from_user_color: L, x: U, y: nt } }) => {
      var lt;
      const V = new MouseEvent(
        "click",
        {
          view: window,
          bubbles: !0,
          cancelable: !0,
          clientX: window.innerWidth * parseFloat(U) / 100,
          clientY: window.innerHeight * parseFloat(nt) / 100
        }
      );
      V.isOtherUser = !0;
      const Y = document.head.contains(f);
      Y && document.head.removeChild(f);
      const S = document.elementFromPoint(V.clientX, V.clientY);
      if (Y && document.head.appendChild(f), S instanceof HTMLElement || S instanceof SVGElement) {
        if (
          // NOTE: Element is clickable if:
          S.getAttribute("onclick") || S.getAttribute("href") || S.getAttribute("role") === "button" || S.getAttribute("type") === "button" || S.getAttribute("type") === "submit" || // clickedEl.getAttribute("type") === "checkbox" ||
          // clickedEl.getAttribute("type") === "radio" ||
          ["a", "button"].includes(S.tagName.toLowerCase())
        ) {
          const Et = S.style.color, kt = S.style.backgroundColor;
          ((lt = S.computedStyleMap().get("background-color")) == null ? void 0 : lt.toString()) !== "rgba(0, 0, 0, 0)" ? (S.style.color = "white", S.style.backgroundColor = he(L, 0.6)) : S.style.color = he(L, 0.6), setTimeout(
            () => {
              S.style.color = Et, S.style.backgroundColor = kt;
            },
            500
          );
        }
        S.dispatchEvent(V);
      }
    }), o.addEventListener("livestate-change", ({ detail: { state: y } }) => {
      t(3, r = y.room_id), t(1, d = y.me), t(0, _ = y.users);
    }), o.connect(), window.addEventListener("mousemove", H), window.addEventListener("mousedown", N), window.addEventListener("mouseup", X), window.addEventListener("keydown", Q), window.addEventListener("keyup", K), window.addEventListener("resize", tt);
  }
  function M() {
    window.removeEventListener("resize", tt), window.removeEventListener("keyup", K), window.removeEventListener("keydown", Q), window.removeEventListener("mouseup", X), window.removeEventListener("mousedown", N), window.removeEventListener("mousemove", H), o == null || o.disconnect();
  }
  function H(y) {
    o && (d != null && d.id) && o.dispatchEvent(new CustomEvent(
      "mouse_move",
      {
        detail: {
          user_id: d.id,
          x: Number(y.clientX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(y.clientY / window.innerHeight * 100).toFixed(2)
        }
        // in %
      }
    ));
  }
  function N() {
    o && (d != null && d.id) && o.dispatchEvent(new CustomEvent("mouse_down", { detail: { user_id: d.id } }));
  }
  function X() {
    o && (d != null && d.id) && o.dispatchEvent(new CustomEvent("mouse_up", { detail: { user_id: d.id } }));
  }
  const q = ["Shift"];
  function Q(y) {
    !y.repeat && q.includes(y.key) && o && (d != null && d.id) && o.dispatchEvent(new CustomEvent("key_down", { detail: { key: y.key, user_id: d.id } }));
  }
  function K(y) {
    q.includes(y.key) && o && (d != null && d.id) && o.dispatchEvent(new CustomEvent("key_up", { detail: { key: y.key, user_id: d.id } }));
  }
  function tt() {
    o && (d != null && d.id) && o.dispatchEvent(new CustomEvent(
      "window_resize",
      {
        detail: {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
          user_id: d.id
        }
      }
    ));
  }
  function et() {
    document.addEventListener("click", ae, !0), document.head.appendChild(p), document.head.appendChild(f), t(6, h = !0);
  }
  function O() {
    document.removeEventListener("click", ae, !0), document.head.removeChild(p), document.head.removeChild(f), t(6, h = !1);
  }
  return s.$$set = (y) => {
    "url" in y && t(5, e = y.url), "room_id" in y && t(3, r = y.room_id), "user_name" in y && t(4, i = y.user_name);
  }, s.$$.update = () => {
    s.$$.dirty & /*users*/
    1 && t(2, A = Object.keys(_ || {}).length), s.$$.dirty & /*isClickBlocked, users*/
    65 && !h && _ && Object.values(_).some((y) => y.type == "admin" && y.is_space_key_down) && et(), s.$$.dirty & /*isClickBlocked, users*/
    65 && h && _ && Object.values(_).filter((y) => y.type == "admin").every((y) => !y.is_space_key_down) && O();
  }, [_, d, A, r, i, e, h];
}
class cn extends es {
  constructor(n) {
    super(), Ke(this, n, hn, an, Le, { url: 5, room_id: 3, user_name: 4 }, on);
  }
  get url() {
    return this.$$.ctx[5];
  }
  set url(n) {
    this.$$set({ url: n }), ft();
  }
  get room_id() {
    return this.$$.ctx[3];
  }
  set room_id(n) {
    this.$$set({ room_id: n }), ft();
  }
  get user_name() {
    return this.$$.ctx[4];
  }
  set user_name(n) {
    this.$$set({ user_name: n }), ft();
  }
}
customElements.define("liveroom-client-element", ts(cn, { url: {}, room_id: {}, user_name: {} }, [], [], !0));
export {
  cn as default
};
