var xe = Object.defineProperty;
var Se = (s, n, t) => n in s ? xe(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var f = (s, n, t) => (Se(s, typeof n != "symbol" ? n + "" : n, t), t);
function pt() {
}
function he(s) {
  return s();
}
function Zt() {
  return /* @__PURE__ */ Object.create(null);
}
function gt(s) {
  s.forEach(he);
}
function ce(s) {
  return typeof s == "function";
}
function Me(s, n) {
  return s != s ? n == n : s !== n || s && typeof s == "object" || typeof s == "function";
}
function Le(s) {
  return Object.keys(s).length === 0;
}
function G(s, n) {
  s.appendChild(n);
}
function Ne(s, n, t) {
  const e = Re(s);
  if (!e.getElementById(n)) {
    const r = K("style");
    r.id = n, r.textContent = t, He(e, r);
  }
}
function Re(s) {
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
  return G(
    /** @type {Document} */
    s.head || s,
    n
  ), n.sheet;
}
function kt(s, n, t) {
  s.insertBefore(n, t || null);
}
function vt(s) {
  s.parentNode && s.parentNode.removeChild(s);
}
function K(s) {
  return document.createElement(s);
}
function Qt(s) {
  return document.createElementNS("http://www.w3.org/2000/svg", s);
}
function le(s) {
  return document.createTextNode(s);
}
function xt() {
  return le(" ");
}
function M(s, n, t) {
  t == null ? s.removeAttribute(n) : s.getAttribute(n) !== t && s.setAttribute(n, t);
}
function Pe(s) {
  return Array.from(s.childNodes);
}
function Ie(s, n) {
  n = "" + n, s.data !== n && (s.data = /** @type {string} */
  n);
}
function st(s, n, t, e) {
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
let ft;
function ht(s) {
  ft = s;
}
function ue() {
  if (!ft)
    throw new Error("Function called outside component initialization");
  return ft;
}
function Ue(s) {
  ue().$$.on_mount.push(s);
}
function Je(s) {
  ue().$$.on_destroy.push(s);
}
const rt = [], Kt = [];
let it = [];
const te = [], Ve = /* @__PURE__ */ Promise.resolve();
let Lt = !1;
function Be() {
  Lt || (Lt = !0, Ve.then(ct));
}
function Nt(s) {
  it.push(s);
}
const St = /* @__PURE__ */ new Set();
let nt = 0;
function ct() {
  if (nt !== 0)
    return;
  const s = ft;
  do {
    try {
      for (; nt < rt.length; ) {
        const n = rt[nt];
        nt++, ht(n), Fe(n.$$);
      }
    } catch (n) {
      throw rt.length = 0, nt = 0, n;
    }
    for (ht(null), rt.length = 0, nt = 0; Kt.length; )
      Kt.pop()();
    for (let n = 0; n < it.length; n += 1) {
      const t = it[n];
      St.has(t) || (St.add(t), t());
    }
    it.length = 0;
  } while (rt.length);
  for (; te.length; )
    te.pop()();
  Lt = !1, St.clear(), ht(s);
}
function Fe(s) {
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
const We = /* @__PURE__ */ new Set();
function pe(s, n) {
  s && s.i && (We.delete(s), s.i(n));
}
function ee(s) {
  return (s == null ? void 0 : s.length) !== void 0 ? s : Array.from(s);
}
function Ge(s, n) {
  s.d(1), n.delete(s.key);
}
function Xe(s, n, t, e, r, i, o, h, p, d, b, _) {
  let T = s.length, O = i.length, S = T;
  const H = {};
  for (; S--; )
    H[s[S].key] = S;
  const L = [], q = /* @__PURE__ */ new Map(), Y = /* @__PURE__ */ new Map(), A = [];
  for (S = O; S--; ) {
    const j = _(r, i, S), C = t(j);
    let I = o.get(C);
    I ? e && A.push(() => I.p(j, n)) : (I = d(C, j), I.c()), q.set(C, L[S] = I), C in H && Y.set(C, Math.abs(S - H[C]));
  }
  const B = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
  function F(j) {
    pe(j, 1), j.m(h, b), o.set(j.key, j), b = j.first, O--;
  }
  for (; T && O; ) {
    const j = L[O - 1], C = s[T - 1], I = j.key, Z = C.key;
    j === C ? (b = j.first, T--, O--) : q.has(Z) ? !o.has(I) || B.has(I) ? F(j) : U.has(Z) ? T-- : Y.get(I) > Y.get(Z) ? (U.add(I), F(j)) : (B.add(Z), T--) : (p(C, o), T--);
  }
  for (; T--; ) {
    const j = s[T];
    q.has(j.key) || p(j, o);
  }
  for (; O; )
    F(L[O - 1]);
  return gt(A), L;
}
function qe(s, n, t) {
  const { fragment: e, after_update: r } = s.$$;
  e && e.m(n, t), Nt(() => {
    const i = s.$$.on_mount.map(he).filter(ce);
    s.$$.on_destroy ? s.$$.on_destroy.push(...i) : gt(i), s.$$.on_mount = [];
  }), r.forEach(Nt);
}
function Ye(s, n) {
  const t = s.$$;
  t.fragment !== null && (ze(t.after_update), gt(t.on_destroy), t.fragment && t.fragment.d(n), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Ze(s, n) {
  s.$$.dirty[0] === -1 && (rt.push(s), Be(), s.$$.dirty.fill(0)), s.$$.dirty[n / 31 | 0] |= 1 << n % 31;
}
function Qe(s, n, t, e, r, i, o, h = [-1]) {
  const p = ft;
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
    context: new Map(n.context || (p ? p.$$.context : [])),
    // everything else
    callbacks: Zt(),
    dirty: h,
    skip_bound: !1,
    root: n.target || p.$$.root
  };
  o && o(d.root);
  let b = !1;
  if (d.ctx = t ? t(s, n.props || {}, (_, T, ...O) => {
    const S = O.length ? O[0] : T;
    return d.ctx && r(d.ctx[_], d.ctx[_] = S) && (!d.skip_bound && d.bound[_] && d.bound[_](S), b && Ze(s, _)), T;
  }) : [], d.update(), b = !0, gt(d.before_update), d.fragment = e ? e(d.ctx) : !1, n.target) {
    if (n.hydrate) {
      const _ = Pe(n.target);
      d.fragment && d.fragment.l(_), _.forEach(vt);
    } else
      d.fragment && d.fragment.c();
    n.intro && pe(s.$$.fragment), qe(s, n.target, n.anchor), ct();
  }
  ht(p);
}
let fe;
typeof HTMLElement == "function" && (fe = class extends HTMLElement {
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
          let o;
          return {
            c: function() {
              o = K("slot"), i !== "default" && M(o, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(d, b) {
              kt(d, o, b);
            },
            d: function(d) {
              d && vt(o);
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
        o in this.$$d || (this.$$d[o] = _t(o, i.value, this.$$p_d, "toProp"));
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
            const o = _t(
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
function Ke(s, n, t, e, r, i) {
  let o = class extends fe {
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
        var d;
        p = _t(h, p, n), this.$$d[h] = p, (d = this.$$c) == null || d.$set({ [h]: p });
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
class ts {
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
    Ye(this, 1), this.$destroy = pt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(n, t) {
    if (!ce(t))
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
    this.$$set && !Le(n) && (this.$$.skip_bound = !0, this.$$set(n), this.$$.skip_bound = !1);
  }
}
const es = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(es);
const { isArray: ss } = Array, ns = Object.keys, dt = (s) => {
  if (!s)
    return s;
  if (ss(s)) {
    const n = [], t = s.length;
    for (let e = 0; e < t; e++)
      n.push(dt(s[e]));
    return n;
  } else if (typeof s == "object") {
    const n = ns(s), t = n.length, e = {};
    for (let r = 0; r < t; r++) {
      const i = n[r];
      e[i] = dt(s[i]);
    }
    return e;
  }
  return s;
};
class V {
  constructor(n) {
    f(this, "path");
    f(this, "from");
    this.path = n;
  }
}
const rs = /~1/g, is = /~0/g, os = /~/g, as = /\//g;
function hs(s) {
  return s.indexOf("~") === -1 ? s : s.replace(rs, "/").replace(is, "~");
}
function cs(s) {
  return s.indexOf("/") === -1 && s.indexOf("~") === -1 ? s : s.replace(os, "~0").replace(as, "~1");
}
function ls(s) {
  return s ? s.slice(1).split("/").map(hs) : [];
}
function k(s) {
  return us(s) ? "" : "/" + s.map((n) => cs(String(n))).join("/");
}
const w = (s) => typeof s == "string" ? ls(s) : s, us = (s) => !s.length, ps = Object.prototype.hasOwnProperty;
function fs(s, n) {
  return ps.call(s, n);
}
const { isArray: de } = Array, x = (s, n) => {
  const t = n.length;
  if (!t)
    return { val: s };
  let e, r;
  for (let o = 0; o < t; o++)
    if (e = s, r = n[o], de(e)) {
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
      s = fs(e, r) ? e[r] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: s, obj: e, key: r };
}, yt = (s) => de(s.obj) && typeof s.key == "number", Ct = (s) => typeof s.obj == "object" && typeof s.key == "string";
class It extends V {
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
    const { val: e, key: r, obj: i } = x(t, this.path), o = dt(this.value);
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
      path: k(this.path),
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
class ge extends V {
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
    const e = x(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return Ct(e) ? delete e.obj[e.key] : yt(e) ? e.val !== void 0 && e.obj.splice(e.key, 1) : t = null, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "remove",
      path: k(this.path)
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
class ds extends V {
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
    const e = x(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    return Ct(e) ? e.obj[e.key] = this.value : yt(e) ? e.obj[e.key] = this.value : t = this.value, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "replace",
      path: k(this.path),
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
class gs extends V {
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
    const e = new ge(w(this.from), void 0).apply(t);
    return new It(this.path, e.old).apply(e.doc);
  }
  toJson(t) {
    return {
      op: "move",
      path: k(this.path),
      from: k(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "move" : 4, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(4), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class vs extends V {
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
    const { val: e } = x(t, this.from);
    if (e === void 0)
      throw new Error("NOT_FOUND");
    return new It(this.path, dt(e)).apply(t);
  }
  toJson(t) {
    return {
      op: "copy",
      path: k(this.path),
      from: k(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "copy" : 3, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(3), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class D extends V {
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
class ys extends D {
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
    const { val: e } = x(t, this.path);
    if (e === void 0)
      return !!this.not;
    const r = Et(e, this.value);
    return this.not ? !r : r;
  }
  toJson(t) {
    const e = {
      op: "test",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class ms extends V {
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
    const t = x(n, this.path);
    return t.obj ? t.obj[t.key] = !t.val : n = !t.val, { doc: n, old: t.val };
  }
  toJson(n) {
    return {
      op: "flip",
      path: k(this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "flip" : 8, this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(8), n.encodeArray(this.path);
  }
}
class ws extends V {
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
    const e = x(t, this.path), r = this.inc + Number(e.val);
    return e.obj ? e.obj[e.key] = r : t = r, { doc: t, old: e.val };
  }
  toJson(t) {
    return {
      op: "inc",
      path: k(this.path),
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
class _s extends V {
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
    const { val: e, key: r, obj: i } = x(t, this.path);
    if (typeof e != "string") {
      if (e !== void 0)
        throw new Error("NOT_A_STRING");
      if (this.pos !== 0)
        throw new Error("POS");
    }
    const o = typeof e == "string" ? e : "", h = Math.min(this.pos, o.length), p = o.slice(0, h), d = o.slice(h), b = p + this.str + d;
    return i ? i[r] = b : t = b, { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "str_ins",
      path: k(this.path),
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
class bs extends V {
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
    const { val: e, key: r, obj: i } = x(t, this.path);
    if (typeof e != "string")
      throw new Error("NOT_A_STRING");
    const o = e.length, h = Math.min(this.pos, e.length), p = Math.min(h, o), d = this.str !== void 0 ? this.str.length : this.len, b = Math.min(h + d, o), _ = e.slice(0, p), T = e.substr(b), O = _ + T;
    return i ? i[r] = O : t = O, { doc: t, old: e };
  }
  toJson(t) {
    return typeof this.str == "string" ? {
      op: "str_del",
      path: k(this.path),
      pos: this.pos,
      str: this.str
    } : {
      op: "str_del",
      path: k(this.path),
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
const { isArray: Es } = Array, Rt = (s) => !!s && typeof s == "object" && typeof s.text == "string", Ht = (s) => !!s && typeof s == "object" && Es(s.children), $s = (s, n) => {
  const t = new RegExp(s, n ? "i" : void 0);
  return (e) => t.test(e);
};
class ks extends V {
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
    const e = x(t, this.path);
    if (e.val === void 0)
      throw new Error("NOT_FOUND");
    const r = this.split(e.val);
    return Ct(e) ? e.obj[e.key] = r : yt(e) ? (e.obj[e.key] = r[0], e.obj.splice(e.key + 1, 0, r[1])) : t = r, { doc: t, old: e.val };
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
    } else if (Rt(t)) {
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
    } else if (Ht(t)) {
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
      path: k(this.path),
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
    const e = x(t, this.path);
    if (!yt(e))
      throw new Error("INVALID_TARGET");
    if (e.key <= 0)
      throw new Error("INVALID_KEY");
    const r = e.obj[e.key - 1], i = e.obj[e.key], o = this.merge(r, i);
    return e.obj[e.key - 1] = o, e.obj.splice(e.key, 1), { doc: t, old: [r, i] };
  }
  merge(t, e) {
    return typeof t == "string" && typeof e == "string" || typeof t == "number" && typeof e == "number" ? t + e : Rt(t) && Rt(e) ? { ...t, ...e, text: t.text + e.text } : Ht(t) && Ht(e) ? { ...t, ...e, children: [...t.children, ...e.children] } : [t, e];
  }
  toJson(t) {
    const e = {
      op: "merge",
      path: k(this.path),
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
const { isArray: As } = Array;
class Ts extends V {
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
    const e = x(t, this.path);
    return yt(e) ? e.val !== void 0 && (e.obj[e.key] = this.extend(e.val)) : Ct(e) ? e.obj[e.key] = this.extend(e.val) : t = this.extend(t), { doc: t };
  }
  extend(t) {
    if (As(t) || typeof t != "object" || !t)
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
      path: k(this.path),
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
    const { val: t } = x(n, this.path);
    return t !== void 0;
  }
  toJson(n) {
    return {
      op: "defined",
      path: k(n ? this.path.slice(n.path.length) : this.path)
    };
  }
  toCompact(n, t) {
    return [t ? "defined" : 31, n ? this.path.slice(n.path.length) : this.path];
  }
  encode(n, t) {
    n.encodeArrayHeader(2), n.writer.u8(31), n.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
class js extends D {
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
      const { val: t } = x(n, this.path);
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
      path: k(n ? this.path.slice(n.path.length) : this.path)
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
class Ss extends D {
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
    const { val: e } = x(t, this.path);
    return e === null ? this.type.indexOf("null") > -1 : xs(e) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof e) > -1 || typeof e == "number" && e === Math.round(e) && this.type.indexOf("integer") > -1;
  }
  toJson(t) {
    return {
      op: "test_type",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Ms extends D {
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
    const { val: e } = x(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = e.length, i = Math.min(this.pos, r), o = Math.min(this.pos + this.str.length, r), h = e.substring(i, o) === this.str;
    return this.not ? !h : h;
  }
  toJson(t) {
    const e = {
      op: "test_string",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Ls extends D {
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
    const { val: e } = x(t, this.path);
    if (typeof e != "string")
      return !1;
    const i = e.length >= this.len;
    return this.not ? !i : i;
  }
  toJson(t) {
    const e = {
      op: "test_string_len",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Ns extends D {
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
    const { val: e } = x(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.indexOf(i) > -1;
  }
  toJson(t) {
    const e = {
      op: "contains",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Rs extends D {
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
    const { val: e } = x(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.endsWith(i);
  }
  toJson(t) {
    const e = {
      op: "ends",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
    const { val: e } = x(t, this.path);
    if (typeof e != "string")
      return !1;
    const r = this.ignore_case ? e.toLowerCase() : e, i = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.startsWith(i);
  }
  toJson(t) {
    const e = {
      op: "starts",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Ps extends D {
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
    const { val: e } = x(t, this.path);
    for (const r of this.value)
      if (Et(e, r))
        return !0;
    return !1;
  }
  toJson(t) {
    return {
      op: "in",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Is extends D {
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
    const { val: e } = x(t, this.path);
    return typeof e != "number" ? !1 : e < this.value;
  }
  toJson(t) {
    return {
      op: "less",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
    const { val: e } = x(t, this.path);
    return typeof e != "number" ? !1 : e > this.value;
  }
  toJson(t) {
    return {
      op: "more",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Dt extends D {
  constructor(t, e) {
    super(t);
    f(this, "ops");
    this.ops = e;
  }
}
class Us extends Dt {
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
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Js extends Dt {
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
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class Vs extends Dt {
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
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
    const { val: e } = x(t, this.path);
    return typeof e != "string" ? !1 : this.matcher(e);
  }
  toJson(t) {
    const e = {
      op: "matches",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
class zs extends D {
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
    const { val: e } = x(t, this.path);
    return e === null ? this.value === "null" : Fs(e) ? this.value === "array" : typeof e === this.value || typeof e == "number" && e === Math.round(e) && this.value === "integer";
  }
  toJson(t) {
    return {
      op: "type",
      path: k(t ? this.path.slice(t.path.length) : this.path),
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
const Ws = (s, n) => {
  switch (s.op) {
    case "add":
      return new It(w(s.path), s.value);
    case "remove":
      return new ge(w(s.path), s.oldValue);
    case "replace":
      return new ds(w(s.path), s.value, s.oldValue);
    case "move":
      return new gs(w(s.path), w(s.from));
    case "copy":
      return new vs(w(s.path), w(s.from));
    case "flip":
      return new ms(w(s.path));
    case "inc":
      return new ws(w(s.path), s.inc);
    case "str_ins":
      return new _s(w(s.path), s.pos, s.str);
    case "str_del":
      return new bs(w(s.path), s.pos, s.str, s.len);
    case "split":
      return new ks(w(s.path), s.pos, s.props || null);
    case "merge":
      return new Cs(w(s.path), s.pos, s.props || null);
    case "extend":
      return new Ts(w(s.path), s.props, !!s.deleteNull);
    default:
      return bt(s, n);
  }
}, bt = (s, n) => {
  switch (s.op) {
    case "test":
      return new ys(w(s.path), s.value, !!s.not);
    case "defined":
      return new Os(w(s.path));
    case "undefined":
      return new js(w(s.path));
    case "type":
      return new zs(w(s.path), s.value);
    case "test_type":
      return new Ss(w(s.path), s.type);
    case "test_string":
      return new Ms(w(s.path), s.pos, s.str, !!s.not);
    case "test_string_len":
      return new Ls(w(s.path), s.len, !!s.not);
    case "contains":
      return new Ns(w(s.path), s.value, !!s.ignore_case);
    case "ends":
      return new Rs(w(s.path), s.value, !!s.ignore_case);
    case "starts":
      return new Hs(w(s.path), s.value, !!s.ignore_case);
    case "matches":
      return new Bs(w(s.path), s.value, !!s.ignore_case, n.createMatcher || $s);
    case "in":
      return new Ps(w(s.path), s.value);
    case "less":
      return new Is(w(s.path), s.value);
    case "more":
      return new Ds(w(s.path), s.value);
    case "and": {
      const t = w(s.path);
      return new Us(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    case "or": {
      const t = w(s.path);
      return new Js(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    case "not": {
      const t = w(s.path);
      return new Vs(t, s.apply.map((e) => bt({ ...e, path: [...t, ...w(e.path)] }, n)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function Gs(s, n, t) {
  t.mutate || (s = dt(s));
  const e = [], r = n.length;
  for (let i = 0; i < r; i++) {
    const h = Ws(n[i], t).apply(s);
    s = h.doc, e.push(h);
  }
  return { doc: s, res: e };
}
var lt = (s) => typeof s == "function" ? s : function() {
  return s;
}, Xs = typeof self < "u" ? self : null, at = typeof window < "u" ? window : null, ut = Xs || at || ut, qs = "2.0.0", z = { connecting: 0, open: 1, closing: 2, closed: 3 }, Ys = 1e4, Zs = 1e3, J = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
}, X = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}, Pt = {
  longpoll: "longpoll",
  websocket: "websocket"
}, Qs = {
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
}, Ks = class {
  constructor(s, n, t) {
    this.state = J.closed, this.topic = s, this.params = lt(n || {}), this.socket = t, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new mt(this, X.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new ve(() => {
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
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new mt(this, X.leave, lt({}), this.timeout).send(), this.state = J.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.on(X.reply, (e, r) => {
      this.trigger(this.replyEventName(r), e);
    });
  }
  join(s = this.timeout) {
    if (this.joinedOnce)
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    return this.timeout = s, this.joinedOnce = !0, this.rejoin(), this.joinPush;
  }
  onClose(s) {
    this.on(X.close, s);
  }
  onError(s) {
    return this.on(X.error, (n) => s(n));
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
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = J.leaving;
    let n = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(X.close, "leave");
    }, t = new mt(this, X.leave, lt({}), s);
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
    let i = this.bindings.filter((o) => o.event === s);
    for (let o = 0; o < i.length; o++)
      i[o].callback(r, t, e || this.joinRef());
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
}, $t = class {
  static request(s, n, t, e, r, i, o) {
    if (ut.XDomainRequest) {
      let h = new ut.XDomainRequest();
      return this.xdomainRequest(h, s, n, e, r, i, o);
    } else {
      let h = new ut.XMLHttpRequest();
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
      if (s.readyState === Qs.complete && h) {
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
}, Mt = class {
  constructor(s) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(s), this.readyState = z.connecting, this.poll();
  }
  normalizeEndpoint(s) {
    return s.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + Pt.websocket), "$1/" + Pt.longpoll);
  }
  endpointURL() {
    return $t.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(s, n, t) {
    this.close(s, n, t), this.readyState = z.connecting;
  }
  ontimeout() {
    this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
  }
  isActive() {
    return this.readyState === z.open || this.readyState === z.connecting;
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
          this.readyState = z.open, this.onopen({}), this.poll();
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
    this.readyState = z.closed;
    let e = Object.assign({ code: 1e3, reason: void 0, wasClean: !0 }, { code: s, reason: n, wasClean: t });
    typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", e)) : this.onclose(e);
  }
  ajax(s, n, t, e) {
    let r, i = () => {
      this.reqs.delete(r), t();
    };
    r = $t.request(s, this.endpointURL(), "application/json", n, this.timeout, i, (o) => {
      this.reqs.delete(r), this.isActive() && e(o);
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
      let [t, e, r, i, o] = JSON.parse(s);
      return n({ join_ref: t, ref: e, topic: r, event: i, payload: o });
    }
  },
  binaryEncode(s) {
    let { join_ref: n, ref: t, event: e, topic: r, payload: i } = s, o = this.META_LENGTH + n.length + t.length + r.length + e.length, h = new ArrayBuffer(this.HEADER_LENGTH + o), p = new DataView(h), d = 0;
    p.setUint8(d++, this.KINDS.push), p.setUint8(d++, n.length), p.setUint8(d++, t.length), p.setUint8(d++, r.length), p.setUint8(d++, e.length), Array.from(n, (_) => p.setUint8(d++, _.charCodeAt(0))), Array.from(t, (_) => p.setUint8(d++, _.charCodeAt(0))), Array.from(r, (_) => p.setUint8(d++, _.charCodeAt(0))), Array.from(e, (_) => p.setUint8(d++, _.charCodeAt(0)));
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
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), o = this.HEADER_LENGTH + this.META_LENGTH - 1, h = t.decode(s.slice(o, o + e));
    o = o + e;
    let p = t.decode(s.slice(o, o + r));
    o = o + r;
    let d = t.decode(s.slice(o, o + i));
    o = o + i;
    let b = s.slice(o, s.byteLength);
    return { join_ref: h, ref: null, topic: p, event: d, payload: b };
  },
  decodeReply(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = n.getUint8(3), o = n.getUint8(4), h = this.HEADER_LENGTH + this.META_LENGTH, p = t.decode(s.slice(h, h + e));
    h = h + e;
    let d = t.decode(s.slice(h, h + r));
    h = h + r;
    let b = t.decode(s.slice(h, h + i));
    h = h + i;
    let _ = t.decode(s.slice(h, h + o));
    h = h + o;
    let T = s.slice(h, s.byteLength), O = { status: _, response: T };
    return { join_ref: p, ref: d, topic: b, event: X.reply, payload: O };
  },
  decodeBroadcast(s, n, t) {
    let e = n.getUint8(1), r = n.getUint8(2), i = this.HEADER_LENGTH + 2, o = t.decode(s.slice(i, i + e));
    i = i + e;
    let h = t.decode(s.slice(i, i + r));
    i = i + r;
    let p = s.slice(i, s.byteLength);
    return { join_ref: null, ref: null, topic: o, event: h, payload: p };
  }
}, tn = class {
  constructor(s, n = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = n.timeout || Ys, this.transport = n.transport || ut.WebSocket || Mt, this.establishedConnections = 0, this.defaultEncoder = wt.encode.bind(wt), this.defaultDecoder = wt.decode.bind(wt), this.closeWasClean = !1, this.binaryType = n.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== Mt ? (this.encode = n.encode || this.defaultEncoder, this.decode = n.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let t = null;
    at && at.addEventListener && (at.addEventListener("pagehide", (e) => {
      this.conn && (this.disconnect(), t = this.connectClock);
    }), at.addEventListener("pageshow", (e) => {
      t === this.connectClock && (t = null, this.connect());
    })), this.heartbeatIntervalMs = n.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => n.rejoinAfterMs ? n.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4, this.reconnectAfterMs = (e) => n.reconnectAfterMs ? n.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3, this.logger = n.logger || null, this.longpollerTimeout = n.longpollerTimeout || 2e4, this.params = lt(n.params || {}), this.endPoint = `${s}/${Pt.websocket}`, this.vsn = n.vsn || qs, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new ve(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return Mt;
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
    this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Zs, "heartbeat timeout"));
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
    if (n === 5 || !this.conn || this.conn.readyState === z.closed) {
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
      s.isErrored() || s.isLeaving() || s.isClosed() || s.trigger(X.error);
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case z.connecting:
        return "connecting";
      case z.open:
        return "open";
      case z.closing:
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
    let t = new Ks(s, n, this);
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
class en {
  constructor(n) {
    this.connected = !1, this.config = n, this.socket = new tn(this.config.url, this.config.socketOptions || { logger: (t, e, r) => {
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
      const { doc: e, res: r } = Gs(this.state, n, { mutate: !1 });
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
    var t = Object.prototype.hasOwnProperty, e = typeof Symbol == "function", r = e && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", i = e && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", o = typeof Object.create == "function", h = { __proto__: [] } instanceof Array, p = !o && !h, d = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: o ? function() {
        return jt(/* @__PURE__ */ Object.create(null));
      } : h ? function() {
        return jt({ __proto__: null });
      } : function() {
        return jt({});
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
    }, b = Object.getPrototypeOf(Function), _ = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", T = !_ && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Te(), O = !_ && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Oe(), S = !_ && typeof WeakMap == "function" ? WeakMap : je(), H = new S();
    function L(a, c, l, u) {
      if (N(l)) {
        if (!Gt(a))
          throw new TypeError();
        if (!Xt(c))
          throw new TypeError();
        return Z(a, c);
      } else {
        if (!Gt(a))
          throw new TypeError();
        if (!R(c))
          throw new TypeError();
        if (!R(u) && !N(u) && !tt(u))
          throw new TypeError();
        return tt(u) && (u = void 0), l = W(l), At(a, c, l, u);
      }
    }
    n("decorate", L);
    function q(a, c) {
      function l(u, g) {
        if (!R(u))
          throw new TypeError();
        if (!N(g) && !Ee(g))
          throw new TypeError();
        Bt(a, c, u, g);
      }
      return l;
    }
    n("metadata", q);
    function Y(a, c, l, u) {
      if (!R(l))
        throw new TypeError();
      return N(u) || (u = W(u)), Bt(a, c, l, u);
    }
    n("defineMetadata", Y);
    function A(a, c, l) {
      if (!R(c))
        throw new TypeError();
      return N(l) || (l = W(l)), Ut(a, c, l);
    }
    n("hasMetadata", A);
    function B(a, c, l) {
      if (!R(c))
        throw new TypeError();
      return N(l) || (l = W(l)), Tt(a, c, l);
    }
    n("hasOwnMetadata", B);
    function U(a, c, l) {
      if (!R(c))
        throw new TypeError();
      return N(l) || (l = W(l)), Jt(a, c, l);
    }
    n("getMetadata", U);
    function F(a, c, l) {
      if (!R(c))
        throw new TypeError();
      return N(l) || (l = W(l)), Vt(a, c, l);
    }
    n("getOwnMetadata", F);
    function j(a, c) {
      if (!R(a))
        throw new TypeError();
      return N(c) || (c = W(c)), Ft(a, c);
    }
    n("getMetadataKeys", j);
    function C(a, c) {
      if (!R(a))
        throw new TypeError();
      return N(c) || (c = W(c)), zt(a, c);
    }
    n("getOwnMetadataKeys", C);
    function I(a, c, l) {
      if (!R(c))
        throw new TypeError();
      N(l) || (l = W(l));
      var u = ot(
        c,
        l,
        /*Create*/
        !1
      );
      if (N(u) || !u.delete(a))
        return !1;
      if (u.size > 0)
        return !0;
      var g = H.get(c);
      return g.delete(l), g.size > 0 || H.delete(c), !0;
    }
    n("deleteMetadata", I);
    function Z(a, c) {
      for (var l = a.length - 1; l >= 0; --l) {
        var u = a[l], g = u(c);
        if (!N(g) && !tt(g)) {
          if (!Xt(g))
            throw new TypeError();
          c = g;
        }
      }
      return c;
    }
    function At(a, c, l, u) {
      for (var g = a.length - 1; g >= 0; --g) {
        var P = a[g], y = P(c, l, u);
        if (!N(y) && !tt(y)) {
          if (!R(y))
            throw new TypeError();
          u = y;
        }
      }
      return u;
    }
    function ot(a, c, l) {
      var u = H.get(a);
      if (N(u)) {
        if (!l)
          return;
        u = new T(), H.set(a, u);
      }
      var g = u.get(c);
      if (N(g)) {
        if (!l)
          return;
        g = new T(), u.set(c, g);
      }
      return g;
    }
    function Ut(a, c, l) {
      var u = Tt(a, c, l);
      if (u)
        return !0;
      var g = Ot(c);
      return tt(g) ? !1 : Ut(a, g, l);
    }
    function Tt(a, c, l) {
      var u = ot(
        c,
        l,
        /*Create*/
        !1
      );
      return N(u) ? !1 : _e(u.has(a));
    }
    function Jt(a, c, l) {
      var u = Tt(a, c, l);
      if (u)
        return Vt(a, c, l);
      var g = Ot(c);
      if (!tt(g))
        return Jt(a, g, l);
    }
    function Vt(a, c, l) {
      var u = ot(
        c,
        l,
        /*Create*/
        !1
      );
      if (!N(u))
        return u.get(a);
    }
    function Bt(a, c, l, u) {
      var g = ot(
        l,
        u,
        /*Create*/
        !0
      );
      g.set(a, c);
    }
    function Ft(a, c) {
      var l = zt(a, c), u = Ot(a);
      if (u === null)
        return l;
      var g = Ft(u, c);
      if (g.length <= 0)
        return l;
      if (l.length <= 0)
        return g;
      for (var P = new O(), y = [], m = 0, v = l; m < v.length; m++) {
        var E = v[m], $ = P.has(E);
        $ || (P.add(E), y.push(E));
      }
      for (var Q = 0, Yt = g; Q < Yt.length; Q++) {
        var E = Yt[Q], $ = P.has(E);
        $ || (P.add(E), y.push(E));
      }
      return y;
    }
    function zt(a, c) {
      var l = [], u = ot(
        a,
        c,
        /*Create*/
        !1
      );
      if (N(u))
        return l;
      for (var g = u.keys(), P = $e(g), y = 0; ; ) {
        var m = Ce(P);
        if (!m)
          return l.length = y, l;
        var v = ke(m);
        try {
          l[y] = v;
        } catch (E) {
          try {
            Ae(P);
          } finally {
            throw E;
          }
        }
        y++;
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
    function N(a) {
      return a === void 0;
    }
    function tt(a) {
      return a === null;
    }
    function ye(a) {
      return typeof a == "symbol";
    }
    function R(a) {
      return typeof a == "object" ? a !== null : typeof a == "function";
    }
    function me(a, c) {
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
        var g = u.call(a, l);
        if (R(g))
          throw new TypeError();
        return g;
      }
      return we(a, l === "default" ? "number" : l);
    }
    function we(a, c) {
      if (c === "string") {
        var l = a.toString;
        if (et(l)) {
          var u = l.call(a);
          if (!R(u))
            return u;
        }
        var g = a.valueOf;
        if (et(g)) {
          var u = g.call(a);
          if (!R(u))
            return u;
        }
      } else {
        var g = a.valueOf;
        if (et(g)) {
          var u = g.call(a);
          if (!R(u))
            return u;
        }
        var P = a.toString;
        if (et(P)) {
          var u = P.call(a);
          if (!R(u))
            return u;
        }
      }
      throw new TypeError();
    }
    function _e(a) {
      return !!a;
    }
    function be(a) {
      return "" + a;
    }
    function W(a) {
      var c = me(
        a,
        3
        /* String */
      );
      return ye(c) ? c : be(c);
    }
    function Gt(a) {
      return Array.isArray ? Array.isArray(a) : a instanceof Object ? a instanceof Array : Object.prototype.toString.call(a) === "[object Array]";
    }
    function et(a) {
      return typeof a == "function";
    }
    function Xt(a) {
      return typeof a == "function";
    }
    function Ee(a) {
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
        if (!et(l))
          throw new TypeError();
        return l;
      }
    }
    function $e(a) {
      var c = qt(a, i);
      if (!et(c))
        throw new TypeError();
      var l = c.call(a);
      if (!R(l))
        throw new TypeError();
      return l;
    }
    function ke(a) {
      return a.value;
    }
    function Ce(a) {
      var c = a.next();
      return c.done ? !1 : c;
    }
    function Ae(a) {
      var c = a.return;
      c && c.call(a);
    }
    function Ot(a) {
      var c = Object.getPrototypeOf(a);
      if (typeof a != "function" || a === b || c !== b)
        return c;
      var l = a.prototype, u = l && Object.getPrototypeOf(l);
      if (u == null || u === Object.prototype)
        return c;
      var g = u.constructor;
      return typeof g != "function" || g === a ? c : g;
    }
    function Te() {
      var a = {}, c = [], l = (
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
            this._keys = [], this._values = [], this._cacheKey = a, this._cacheIndex = -2;
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
              return this._keys.length--, this._values.length--, m === this._cacheKey && (this._cacheKey = a, this._cacheIndex = -2), !0;
            }
            return !1;
          }, y.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = a, this._cacheIndex = -2;
          }, y.prototype.keys = function() {
            return new l(this._keys, this._values, u);
          }, y.prototype.values = function() {
            return new l(this._keys, this._values, g);
          }, y.prototype.entries = function() {
            return new l(this._keys, this._values, P);
          }, y.prototype["@@iterator"] = function() {
            return this.entries();
          }, y.prototype[i] = function() {
            return this.entries();
          }, y.prototype._find = function(m, v) {
            return this._cacheKey !== m && (this._cacheIndex = this._keys.indexOf(this._cacheKey = m)), this._cacheIndex < 0 && v && (this._cacheIndex = this._keys.length, this._keys.push(m), this._values.push(void 0)), this._cacheIndex;
          }, y;
        }()
      );
      function u(y, m) {
        return y;
      }
      function g(y, m) {
        return m;
      }
      function P(y, m) {
        return [y, m];
      }
    }
    function Oe() {
      return (
        /** @class */
        function() {
          function a() {
            this._map = new T();
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
    function je() {
      var a = 16, c = d.create(), l = u();
      return (
        /** @class */
        function() {
          function v() {
            this._key = u();
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
            var Q = g(
              E,
              /*create*/
              !0
            );
            return Q[this._key] = $, this;
          }, v.prototype.delete = function(E) {
            var $ = g(
              E,
              /*create*/
              !1
            );
            return $ !== void 0 ? delete $[this._key] : !1;
          }, v.prototype.clear = function() {
            this._key = u();
          }, v;
        }()
      );
      function u() {
        var v;
        do
          v = "@@WeakMap@@" + m();
        while (d.has(c, v));
        return c[v] = !0, v;
      }
      function g(v, E) {
        if (!t.call(v, l)) {
          if (!E)
            return;
          Object.defineProperty(v, l, { value: d.create() });
        }
        return v[l];
      }
      function P(v, E) {
        for (var $ = 0; $ < E; ++$)
          v[$] = Math.random() * 255 | 0;
        return v;
      }
      function y(v) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(v)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(v)) : P(new Uint8Array(v), v) : P(new Array(v), v);
      }
      function m() {
        var v = y(a);
        v[6] = v[6] & 79 | 64, v[8] = v[8] & 191 | 128;
        for (var E = "", $ = 0; $ < a; ++$) {
          var Q = v[$];
          ($ === 4 || $ === 6 || $ === 8) && (E += "-"), Q < 16 && (E += "0"), E += Q.toString(16).toLowerCase();
        }
        return E;
      }
    }
    function jt(a) {
      return a.__ = void 0, delete a.__, a;
    }
  });
})(ne || (ne = {}));
function sn(s) {
  Ne(s, "svelte-18hw81g", '#liveroom-client-element.svelte-18hw81g.svelte-18hw81g{font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}#users-container.svelte-18hw81g.svelte-18hw81g{z-index:99999;position:fixed;inset:0;overflow:hidden;pointer-events:none}.user.svelte-18hw81g.svelte-18hw81g{z-index:10;position:absolute;top:0;left:0;user-select:none;transform:translate(var(--x), var(--y));transition:transform 100ms linear}.user.svelte-18hw81g .cursor.svelte-18hw81g{position:absolute;top:0;left:0;color:var(--color);transform-origin:top left;transform:rotate(6deg)}.user[data-isself="true"].svelte-18hw81g .cursor.svelte-18hw81g{display:none}.user-name.svelte-18hw81g.svelte-18hw81g{padding:4px 10px;font-size:14px;line-height:20px;font-weight:600;color:black;background-color:var(--color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:9999px;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-18hw81g .user-name.svelte-18hw81g{position:absolute;top:20px;left:16px}.user[data-isself="true"].svelte-18hw81g .user-name.svelte-18hw81g{display:none}.user.svelte-18hw81g .halo.svelte-18hw81g{transform:scale(0);z-index:-1;position:absolute;top:-60px;left:-60px;width:120px;height:120px;border-radius:9999px;background-color:var(--color);opacity:0.25;transition:transform 100ms ease-out;box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}.user.svelte-18hw81g .halo[data-show="true"].svelte-18hw81g{transform:scale(1)}');
}
function re(s, n, t) {
  const e = s.slice();
  return e[16] = n[t], e;
}
function ie(s) {
  let n, t = [], e = /* @__PURE__ */ new Map(), r = ee(Object.values(
    /*users*/
    s[0]
  ));
  const i = (o) => (
    /*user*/
    o[16].id
  );
  for (let o = 0; o < r.length; o += 1) {
    let h = re(s, r, o), p = i(h);
    e.set(p, t[o] = oe(p, h));
  }
  return {
    c() {
      n = K("div");
      for (let o = 0; o < t.length; o += 1)
        t[o].c();
      M(n, "id", "users-container"), M(n, "class", "svelte-18hw81g");
    },
    m(o, h) {
      kt(o, n, h);
      for (let p = 0; p < t.length; p += 1)
        t[p] && t[p].m(n, null);
    },
    p(o, h) {
      h & /*Object, users, me, parseFloat, users_count*/
      7 && (r = ee(Object.values(
        /*users*/
        o[0]
      )), t = Xe(t, h, i, 1, o, r, e, n, Ge, oe, null, re));
    },
    d(o) {
      o && vt(n);
      for (let h = 0; h < t.length; h += 1)
        t[h].d();
    }
  };
}
function oe(s, n) {
  let t, e, r, i, o, h = (
    /*user*/
    n[16].name + ""
  ), p, d, b, _, T, O, S;
  return {
    key: s,
    first: null,
    c() {
      t = K("div"), e = Qt("svg"), r = Qt("path"), i = xt(), o = K("span"), p = le(h), d = xt(), b = K("div"), T = xt(), M(r, "d", "M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"), M(e, "width", "23"), M(e, "viewBox", "0 0 27 24"), M(e, "fill", "currentColor"), M(e, "aria-hidden", "true"), M(e, "xmlns", "http://www.w3.org/2000/svg"), M(e, "class", "cursor svelte-18hw81g"), M(o, "class", "user-name svelte-18hw81g"), M(b, "class", "halo svelte-18hw81g"), M(b, "data-show", _ = /*user*/
      (n[16].id == /*me*/
      n[1].id && /*user*/
      n[16].is_shift_key_down || /*user*/
      n[16].id != /*me*/
      n[1].id && /*user*/
      (n[16].is_shift_key_down || /*user*/
      n[16].is_mouse_down)) && /*users_count*/
      n[2] > 1), M(t, "id", O = "user-" + /*user*/
      n[16].id), M(t, "class", "user svelte-18hw81g"), M(t, "data-isself", S = /*user*/
      n[16].id == /*me*/
      n[1].id), st(
        t,
        "--color",
        /*user*/
        n[16].color
      ), st(t, "--x", parseFloat(
        /*user*/
        n[16].x
      ) + "vw"), st(t, "--y", parseFloat(
        /*user*/
        n[16].y
      ) + "vh"), this.first = t;
    },
    m(H, L) {
      kt(H, t, L), G(t, e), G(e, r), G(t, i), G(t, o), G(o, p), G(t, d), G(t, b), G(t, T);
    },
    p(H, L) {
      n = H, L & /*users*/
      1 && h !== (h = /*user*/
      n[16].name + "") && Ie(p, h), L & /*users, me, users_count*/
      7 && _ !== (_ = /*user*/
      (n[16].id == /*me*/
      n[1].id && /*user*/
      n[16].is_shift_key_down || /*user*/
      n[16].id != /*me*/
      n[1].id && /*user*/
      (n[16].is_shift_key_down || /*user*/
      n[16].is_mouse_down)) && /*users_count*/
      n[2] > 1) && M(b, "data-show", _), L & /*users*/
      1 && O !== (O = "user-" + /*user*/
      n[16].id) && M(t, "id", O), L & /*users, me*/
      3 && S !== (S = /*user*/
      n[16].id == /*me*/
      n[1].id) && M(t, "data-isself", S), L & /*users*/
      1 && st(
        t,
        "--color",
        /*user*/
        n[16].color
      ), L & /*users*/
      1 && st(t, "--x", parseFloat(
        /*user*/
        n[16].x
      ) + "vw"), L & /*users*/
      1 && st(t, "--y", parseFloat(
        /*user*/
        n[16].y
      ) + "vh");
    },
    d(H) {
      H && vt(t);
    }
  };
}
function nn(s) {
  let n, t = (
    /*me*/
    s[1] && /*users*/
    s[0] && ie(s)
  );
  return {
    c() {
      n = K("div"), t && t.c(), M(n, "id", "liveroom-client-element"), M(n, "class", "svelte-18hw81g");
    },
    m(e, r) {
      kt(e, n, r), t && t.m(n, null);
    },
    p(e, [r]) {
      /*me*/
      e[1] && /*users*/
      e[0] ? t ? t.p(e, r) : (t = ie(e), t.c(), t.m(n, null)) : t && (t.d(1), t = null);
    },
    i: pt,
    o: pt,
    d(e) {
      e && vt(n), t && t.d();
    }
  };
}
function ae(s, n) {
  let t = parseInt(s.slice(1, 3), 16), e = parseInt(s.slice(3, 5), 16), r = parseInt(s.slice(5, 7), 16);
  return n ? "rgba(" + t + ", " + e + ", " + r + ", " + n + ")" : "rgb(" + t + ", " + e + ", " + r + ")";
}
function rn(s, n, t) {
  let { url: e } = n, { room_id: r } = n, { user_name: i } = n, o, h, p, d;
  Ue(async () => {
    const A = new URLSearchParams(window.location.search), B = A.get("_liveroom"), U = B == null ? void 0 : B.split("https://meet.google.com/");
    let F = U == null ? void 0 : U[0];
    !!(U != null && U[1]) && (F = U[1].split("?")[0]), t(3, r = F || r);
    const C = A.get("_liveroom_user_name");
    C && t(4, i = C), b();
  }), Je(() => {
    _();
  });
  function b() {
    o = new en({
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
    }), o.connect(), o.addEventListener("click-from-another-user", ({ detail: { from_user_id: A, from_user_color: B, x: U, y: F } }) => {
      var I;
      const j = new MouseEvent(
        "click",
        {
          view: window,
          bubbles: !0,
          cancelable: !0,
          clientX: window.innerWidth * U / 100,
          clientY: window.innerHeight * F / 100
        }
      ), C = document.elementFromPoint(j.clientX, j.clientY);
      if (C instanceof HTMLElement) {
        if (
          // NOTE: Element is clickable if:
          C.getAttribute("onclick") || C.getAttribute("href") || C.getAttribute("role") === "button" || C.getAttribute("type") === "button" || C.getAttribute("type") === "submit"
        ) {
          const Z = C.style.color, At = C.style.backgroundColor;
          ((I = C.computedStyleMap().get("background-color")) == null ? void 0 : I.toString()) !== "rgba(0, 0, 0, 0)" ? (C.style.color = "white", C.style.backgroundColor = ae(B, 0.6)) : C.style.color = ae(B, 0.6), setTimeout(
            () => {
              C.style.color = Z, C.style.backgroundColor = At;
            },
            500
          );
        }
        C.dispatchEvent(j);
      }
    }), o.addEventListener("livestate-change", ({ detail: { state: A } }) => {
      t(3, r = A.room_id), t(1, h = A.me), t(0, p = A.users);
    }), window.addEventListener("mousemove", T), window.addEventListener("mousedown", O), window.addEventListener("mouseup", S), window.addEventListener("keydown", L), window.addEventListener("keyup", q), window.addEventListener("resize", Y);
  }
  function _() {
    window.removeEventListener("resize", Y), window.removeEventListener("keyup", q), window.removeEventListener("keydown", L), window.removeEventListener("mouseup", S), window.removeEventListener("mousedown", O), window.removeEventListener("mousemove", T), o == null || o.disconnect();
  }
  function T(A) {
    o && (h != null && h.id) && o.dispatchEvent(new CustomEvent(
      "mouse_move",
      {
        detail: {
          user_id: h.id,
          x: Number(A.clientX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(A.clientY / window.innerHeight * 100).toFixed(2)
        }
        // in %
      }
    ));
  }
  function O() {
    o && (h != null && h.id) && o.dispatchEvent(new CustomEvent("mouse_down", { detail: { user_id: h.id } }));
  }
  function S() {
    o && (h != null && h.id) && o.dispatchEvent(new CustomEvent("mouse_up", { detail: { user_id: h.id } }));
  }
  const H = ["Shift"];
  function L(A) {
    !A.repeat && H.includes(A.key) && o && (h != null && h.id) && o.dispatchEvent(new CustomEvent("key_down", { detail: { key: A.key, user_id: h.id } }));
  }
  function q(A) {
    H.includes(A.key) && o && (h != null && h.id) && o.dispatchEvent(new CustomEvent("key_up", { detail: { key: A.key, user_id: h.id } }));
  }
  function Y() {
    o && (h != null && h.id) && o.dispatchEvent(new CustomEvent(
      "window_resize",
      {
        detail: {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
          user_id: h.id
        }
      }
    ));
  }
  return s.$$set = (A) => {
    "url" in A && t(5, e = A.url), "room_id" in A && t(3, r = A.room_id), "user_name" in A && t(4, i = A.user_name);
  }, s.$$.update = () => {
    s.$$.dirty & /*users*/
    1 && t(2, d = Object.keys(p || {}).length);
  }, [p, h, d, r, i, e];
}
class on extends ts {
  constructor(n) {
    super(), Qe(this, n, rn, nn, Me, { url: 5, room_id: 3, user_name: 4 }, sn);
  }
  get url() {
    return this.$$.ctx[5];
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
customElements.define("liveroom-client-element", Ke(on, { url: {}, room_id: {}, user_name: {} }, [], [], !0));
export {
  on as default
};
