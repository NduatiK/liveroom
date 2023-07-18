var Td = Object.defineProperty;
var Ed = (e, t, i) => t in e ? Td(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var F = (e, t, i) => (Ed(e, typeof t != "symbol" ? t + "" : t, i), i);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mn = window, os = Mn.ShadowRoot && (Mn.ShadyCSS === void 0 || Mn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, cs = Symbol(), Os = /* @__PURE__ */ new WeakMap();
let qo = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== cs)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (os && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Os.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Os.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pd = (e) => new qo(typeof e == "string" ? e : e + "", void 0, cs), wd = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new qo(i, e, cs);
}, Rd = (e, t) => {
  os ? e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet) : t.forEach((i) => {
    const n = document.createElement("style"), r = Mn.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  });
}, Ns = os ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules)
    i += n.cssText;
  return Pd(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ar;
const Hn = window, As = Hn.trustedTypes, Od = As ? As.emptyScript : "", Is = Hn.reactiveElementPolyfillSupport, Dr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Od : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Go = (e, t) => t !== e && (t == t || e == e), or = { attribute: !0, type: String, converter: Dr, reflect: !1, hasChanged: Go }, Ur = "finalized";
let fi = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    this.finalize(), ((i = this.h) !== null && i !== void 0 ? i : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, n) => {
      const r = this._$Ep(n, i);
      r !== void 0 && (this._$Ev.set(r, n), t.push(r));
    }), t;
  }
  static createProperty(t, i = or) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const n = typeof t == "symbol" ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    return { get() {
      return this[i];
    }, set(r) {
      const s = this[t];
      this[i] = r, this.requestUpdate(t, s, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || or;
  }
  static finalize() {
    if (this.hasOwnProperty(Ur))
      return !1;
    this[Ur] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const i = this.properties, n = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)];
      for (const r of n)
        this.createProperty(r, i[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const r of n)
        i.unshift(Ns(r));
    } else
      t !== void 0 && i.push(Ns(t));
    return i;
  }
  static _$Ep(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((i) => i(this));
  }
  addController(t) {
    var i, n;
    ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) === null || n === void 0 || n.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const i = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Rd(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var n;
      return (n = i.hostConnected) === null || n === void 0 ? void 0 : n.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var n;
      return (n = i.hostDisconnected) === null || n === void 0 ? void 0 : n.call(i);
    });
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$EO(t, i, n = or) {
    var r;
    const s = this.constructor._$Ep(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const a = (((r = n.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? n.converter : Dr).toAttribute(i, n.type);
      this._$El = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$El = null;
    }
  }
  _$AK(t, i) {
    var n;
    const r = this.constructor, s = r._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const a = r.getPropertyOptions(s), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Dr;
      this._$El = s, this[s] = o.fromAttribute(i, a.type), this._$El = null;
    }
  }
  requestUpdate(t, i, n) {
    let r = !0;
    t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || Go)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, n))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, s) => this[s] = r), this._$Ei = void 0);
    let i = !1;
    const n = this._$AL;
    try {
      i = this.shouldUpdate(n), i ? (this.willUpdate(n), (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
        var s;
        return (s = r.hostUpdate) === null || s === void 0 ? void 0 : s.call(r);
      }), this.update(n)) : this._$Ek();
    } catch (r) {
      throw i = !1, this._$Ek(), r;
    }
    i && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.forEach((n) => {
      var r;
      return (r = n.hostUpdated) === null || r === void 0 ? void 0 : r.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((i, n) => this._$EO(n, this[n], i)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
fi[Ur] = !0, fi.elementProperties = /* @__PURE__ */ new Map(), fi.elementStyles = [], fi.shadowRootOptions = { mode: "open" }, Is == null || Is({ ReactiveElement: fi }), ((ar = Hn.reactiveElementVersions) !== null && ar !== void 0 ? ar : Hn.reactiveElementVersions = []).push("1.6.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var cr;
const qn = window, Ki = qn.trustedTypes, Ds = Ki ? Ki.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Mr = "$lit$", zt = `lit$${(Math.random() + "").slice(9)}$`, Wo = "?" + zt, Nd = `<${Wo}>`, ai = document, yn = () => ai.createComment(""), Sn = (e) => e === null || typeof e != "object" && typeof e != "function", zo = Array.isArray, Ad = (e) => zo(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", dr = `[ 	
\f\r]`, rn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Us = /-->/g, Ms = />/g, Yt = RegExp(`>|${dr}(?:([^\\s"'>=/]+)(${dr}*=${dr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ls = /'/g, xs = /"/g, Zo = /^(?:script|style|textarea|title)$/i, Id = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $s = Id(1), Yi = Symbol.for("lit-noChange"), Ne = Symbol.for("lit-nothing"), Fs = /* @__PURE__ */ new WeakMap(), jt = ai.createTreeWalker(ai, 129, null, !1);
function Qo(e, t) {
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ds !== void 0 ? Ds.createHTML(t) : t;
}
const Dd = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : "", a = rn;
  for (let o = 0; o < i; o++) {
    const c = e[o];
    let d, u, l = -1, h = 0;
    for (; h < c.length && (a.lastIndex = h, u = a.exec(c), u !== null); )
      h = a.lastIndex, a === rn ? u[1] === "!--" ? a = Us : u[1] !== void 0 ? a = Ms : u[2] !== void 0 ? (Zo.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = Yt) : u[3] !== void 0 && (a = Yt) : a === Yt ? u[0] === ">" ? (a = r ?? rn, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? Yt : u[3] === '"' ? xs : Ls) : a === xs || a === Ls ? a = Yt : a === Us || a === Ms ? a = rn : (a = Yt, r = void 0);
    const f = a === Yt && e[o + 1].startsWith("/>") ? " " : "";
    s += a === rn ? c + Nd : l >= 0 ? (n.push(d), c.slice(0, l) + Mr + c.slice(l) + zt + f) : c + zt + (l === -2 ? (n.push(void 0), o) : f);
  }
  return [Qo(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class kn {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, a = 0;
    const o = t.length - 1, c = this.parts, [d, u] = Dd(t, i);
    if (this.el = kn.createElement(d, n), jt.currentNode = this.el.content, i === 2) {
      const l = this.el.content, h = l.firstChild;
      h.remove(), l.append(...h.childNodes);
    }
    for (; (r = jt.nextNode()) !== null && c.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const l = [];
          for (const h of r.getAttributeNames())
            if (h.endsWith(Mr) || h.startsWith(zt)) {
              const f = u[a++];
              if (l.push(h), f !== void 0) {
                const p = r.getAttribute(f.toLowerCase() + Mr).split(zt), m = /([.?@])?(.*)/.exec(f);
                c.push({ type: 1, index: s, name: m[2], strings: p, ctor: m[1] === "." ? Md : m[1] === "?" ? xd : m[1] === "@" ? $d : er });
              } else
                c.push({ type: 6, index: s });
            }
          for (const h of l)
            r.removeAttribute(h);
        }
        if (Zo.test(r.tagName)) {
          const l = r.textContent.split(zt), h = l.length - 1;
          if (h > 0) {
            r.textContent = Ki ? Ki.emptyScript : "";
            for (let f = 0; f < h; f++)
              r.append(l[f], yn()), jt.nextNode(), c.push({ type: 2, index: ++s });
            r.append(l[h], yn());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Wo)
          c.push({ type: 2, index: s });
        else {
          let l = -1;
          for (; (l = r.data.indexOf(zt, l + 1)) !== -1; )
            c.push({ type: 7, index: s }), l += zt.length - 1;
        }
      s++;
    }
  }
  static createElement(t, i) {
    const n = ai.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Xi(e, t, i = e, n) {
  var r, s, a, o;
  if (t === Yi)
    return t;
  let c = n !== void 0 ? (r = i._$Co) === null || r === void 0 ? void 0 : r[n] : i._$Cl;
  const d = Sn(t) ? void 0 : t._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== d && ((s = c == null ? void 0 : c._$AO) === null || s === void 0 || s.call(c, !1), d === void 0 ? c = void 0 : (c = new d(e), c._$AT(e, i, n)), n !== void 0 ? ((a = (o = i)._$Co) !== null && a !== void 0 ? a : o._$Co = [])[n] = c : i._$Cl = c), c !== void 0 && (t = Xi(e, c._$AS(e, t.values), c, n)), t;
}
class Ud {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var i;
    const { el: { content: n }, parts: r } = this._$AD, s = ((i = t == null ? void 0 : t.creationScope) !== null && i !== void 0 ? i : ai).importNode(n, !0);
    jt.currentNode = s;
    let a = jt.nextNode(), o = 0, c = 0, d = r[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let u;
        d.type === 2 ? u = new wn(a, a.nextSibling, this, t) : d.type === 1 ? u = new d.ctor(a, d.name, d.strings, this, t) : d.type === 6 && (u = new Fd(a, this, t)), this._$AV.push(u), d = r[++c];
      }
      o !== (d == null ? void 0 : d.index) && (a = jt.nextNode(), o++);
    }
    return jt.currentNode = ai, s;
  }
  v(t) {
    let i = 0;
    for (const n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class wn {
  constructor(t, i, n, r) {
    var s;
    this.type = 2, this._$AH = Ne, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = r, this._$Cp = (s = r == null ? void 0 : r.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var t, i;
    return (i = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && i !== void 0 ? i : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = Xi(this, t, i), Sn(t) ? t === Ne || t == null || t === "" ? (this._$AH !== Ne && this._$AR(), this._$AH = Ne) : t !== this._$AH && t !== Yi && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Ad(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== Ne && Sn(this._$AH) ? this._$AA.nextSibling.data = t : this.$(ai.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var i;
    const { values: n, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = kn.createElement(Qo(r.h, r.h[0]), this.options)), r);
    if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === s)
      this._$AH.v(n);
    else {
      const a = new Ud(s, this), o = a.u(this.options);
      a.v(n), this.$(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = Fs.get(t.strings);
    return i === void 0 && Fs.set(t.strings, i = new kn(t)), i;
  }
  T(t) {
    zo(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t)
      r === i.length ? i.push(n = new wn(this.k(yn()), this.k(yn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, i); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cp = t, (i = this._$AP) === null || i === void 0 || i.call(this, t));
  }
}
class er {
  constructor(t, i, n, r, s) {
    this.type = 1, this._$AH = Ne, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Ne;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let a = !1;
    if (s === void 0)
      t = Xi(this, t, i, 0), a = !Sn(t) || t !== this._$AH && t !== Yi, a && (this._$AH = t);
    else {
      const o = t;
      let c, d;
      for (t = s[0], c = 0; c < s.length - 1; c++)
        d = Xi(this, o[n + c], i, c), d === Yi && (d = this._$AH[c]), a || (a = !Sn(d) || d !== this._$AH[c]), d === Ne ? t = Ne : t !== Ne && (t += (d ?? "") + s[c + 1]), this._$AH[c] = d;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === Ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Md extends er {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Ne ? void 0 : t;
  }
}
const Ld = Ki ? Ki.emptyScript : "";
class xd extends er {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== Ne ? this.element.setAttribute(this.name, Ld) : this.element.removeAttribute(this.name);
  }
}
class $d extends er {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    var n;
    if ((t = (n = Xi(this, t, i, 0)) !== null && n !== void 0 ? n : Ne) === Yi)
      return;
    const r = this._$AH, s = t === Ne && r !== Ne || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== Ne && (r === Ne || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, n;
    typeof this._$AH == "function" ? this._$AH.call((n = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fd {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Xi(this, t);
  }
}
const Bs = qn.litHtmlPolyfillSupport;
Bs == null || Bs(kn, wn), ((cr = qn.litHtmlVersions) !== null && cr !== void 0 ? cr : qn.litHtmlVersions = []).push("2.7.5");
const Bd = (e, t, i) => {
  var n, r;
  const s = (n = i == null ? void 0 : i.renderBefore) !== null && n !== void 0 ? n : t;
  let a = s._$litPart$;
  if (a === void 0) {
    const o = (r = i == null ? void 0 : i.renderBefore) !== null && r !== void 0 ? r : null;
    s._$litPart$ = a = new wn(t.insertBefore(yn(), o), o, void 0, i ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ur, lr;
class hn extends fi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, i;
    const n = super.createRenderRoot();
    return (t = (i = this.renderOptions).renderBefore) !== null && t !== void 0 || (i.renderBefore = n.firstChild), n;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bd(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return Yi;
  }
}
hn.finalized = !0, hn._$litElement$ = !0, (ur = globalThis.litElementHydrateSupport) === null || ur === void 0 || ur.call(globalThis, { LitElement: hn });
const Js = globalThis.litElementPolyfillSupport;
Js == null || Js({ LitElement: hn });
((lr = globalThis.litElementVersions) !== null && lr !== void 0 ? lr : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jd = (e) => (t) => typeof t == "function" ? ((i, n) => (customElements.define(i, n), n))(e, t) : ((i, n) => {
  const { kind: r, elements: s } = n;
  return { kind: r, elements: s, finisher(a) {
    customElements.define(i, a);
  } };
})(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vd = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(i) {
  i.createProperty(t.key, e);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(i) {
  i.createProperty(t.key, e);
} }, Hd = (e, t, i) => {
  t.constructor.createProperty(i, e);
};
function ds(e) {
  return (t, i) => i !== void 0 ? Hd(e, t, i) : Vd(e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function tr(e) {
  return ds({ ...e, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qd = ({ finisher: e, descriptor: t }) => (i, n) => {
  var r;
  if (n === void 0) {
    const s = (r = i.originalKey) !== null && r !== void 0 ? r : i.key, a = t != null ? { kind: "method", placement: "prototype", key: s, descriptor: t(i.key) } : { ...i, key: s };
    return e != null && (a.finisher = function(o) {
      e(o, s);
    }), a;
  }
  {
    const s = i.constructor;
    t !== void 0 && Object.defineProperty(i, n, t(n)), e == null || e(s, n);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ko(e) {
  return qd({ descriptor: (t) => ({ async get() {
    var i;
    return await this.updateComplete, (i = this.renderRoot) === null || i === void 0 ? void 0 : i.querySelector(e);
  }, enumerable: !0, configurable: !0 }) });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var hr;
((hr = window.HTMLSlotElement) === null || hr === void 0 ? void 0 : hr.prototype.assignedElements) != null;
const { isArray: Gd } = Array, Wd = Object.keys, bn = (e) => {
  if (!e)
    return e;
  if (Gd(e)) {
    const t = [], i = e.length;
    for (let n = 0; n < i; n++)
      t.push(bn(e[n]));
    return t;
  } else if (typeof e == "object") {
    const t = Wd(e), i = t.length, n = {};
    for (let r = 0; r < i; r++) {
      const s = t[r];
      n[s] = bn(e[s]);
    }
    return n;
  }
  return e;
};
class je {
  constructor(t) {
    F(this, "path");
    F(this, "from");
    this.path = t;
  }
}
const zd = /~1/g, Zd = /~0/g, Qd = /~/g, Kd = /\//g;
function Yd(e) {
  return e.indexOf("~") === -1 ? e : e.replace(zd, "/").replace(Zd, "~");
}
function Xd(e) {
  return e.indexOf("/") === -1 && e.indexOf("~") === -1 ? e : e.replace(Qd, "~0").replace(Kd, "~1");
}
function jd(e) {
  return e ? e.slice(1).split("/").map(Yd) : [];
}
function K(e) {
  return eu(e) ? "" : "/" + e.map((t) => Xd(String(t))).join("/");
}
const G = (e) => typeof e == "string" ? jd(e) : e, eu = (e) => !e.length, tu = Object.prototype.hasOwnProperty;
function iu(e, t) {
  return tu.call(e, t);
}
const { isArray: Yo } = Array, ce = (e, t) => {
  const i = t.length;
  if (!i)
    return { val: e };
  let n, r;
  for (let a = 0; a < i; a++)
    if (n = e, r = t[a], Yo(n)) {
      const o = n.length;
      if (r === "-")
        r = o;
      else if (typeof r == "string") {
        const c = ~~r;
        if ("" + c !== r)
          throw new Error("INVALID_INDEX");
        if (r = c, r < 0)
          throw new Error("INVALID_INDEX");
      }
      e = n[r];
    } else if (typeof n == "object" && n)
      e = iu(n, r) ? n[r] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: e, obj: n, key: r };
}, Rn = (e) => Yo(e.obj) && typeof e.key == "number", ir = (e) => typeof e.obj == "object" && typeof e.key == "string";
class us extends je {
  constructor(i, n) {
    super(i);
    F(this, "value");
    this.value = n;
  }
  op() {
    return "add";
  }
  code() {
    return 0;
  }
  apply(i) {
    const { val: n, key: r, obj: s } = ce(i, this.path), a = bn(this.value);
    if (!s)
      i = a;
    else if (typeof r == "string")
      s[r] = a;
    else {
      const o = s.length;
      if (r < o)
        s.splice(r, 0, a);
      else {
        if (r > o)
          throw new Error("INVALID_INDEX");
        s.push(a);
      }
    }
    return { doc: i, old: n };
  }
  toJson(i) {
    return {
      op: "add",
      path: K(this.path),
      value: this.value
    };
  }
  toCompact(i, n) {
    return [n ? "add" : 0, this.path, this.value];
  }
  encode(i) {
    i.encodeArrayHeader(3), i.writer.u8(0), i.encodeArray(this.path), i.encodeAny(this.value);
  }
}
class Xo extends je {
  constructor(i, n) {
    super(i);
    F(this, "oldValue");
    this.oldValue = n;
  }
  op() {
    return "remove";
  }
  code() {
    return 1;
  }
  apply(i) {
    const n = ce(i, this.path);
    if (n.val === void 0)
      throw new Error("NOT_FOUND");
    return ir(n) ? delete n.obj[n.key] : Rn(n) ? n.val !== void 0 && n.obj.splice(n.key, 1) : i = null, { doc: i, old: n.val };
  }
  toJson(i) {
    const n = {
      op: "remove",
      path: K(this.path)
    };
    return this.oldValue !== void 0 && (n.oldValue = this.oldValue), n;
  }
  toCompact(i, n) {
    const r = n ? "remove" : 1;
    return this.oldValue === void 0 ? [r, this.path] : [r, this.path, this.oldValue];
  }
  encode(i, n) {
    const r = this.oldValue !== void 0;
    i.encodeArrayHeader(r ? 3 : 2), i.writer.u8(1), i.encodeArray(this.path), r && i.encodeAny(this.oldValue);
  }
}
class nu extends je {
  constructor(i, n, r) {
    super(i);
    F(this, "value");
    F(this, "oldValue");
    this.value = n, this.oldValue = r;
  }
  op() {
    return "replace";
  }
  code() {
    return 2;
  }
  apply(i) {
    const n = ce(i, this.path);
    if (n.val === void 0)
      throw new Error("NOT_FOUND");
    return ir(n) ? n.obj[n.key] = this.value : Rn(n) ? n.obj[n.key] = this.value : i = this.value, { doc: i, old: n.val };
  }
  toJson(i) {
    const n = {
      op: "replace",
      path: K(this.path),
      value: this.value
    };
    return this.oldValue !== void 0 && (n.oldValue = this.oldValue), n;
  }
  toCompact(i, n) {
    const r = n ? "replace" : 2;
    return this.oldValue === void 0 ? [r, this.path, this.value] : [r, this.path, this.value, this.oldValue];
  }
  encode(i, n) {
    const r = this.oldValue !== void 0;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(2), i.encodeArray(this.path), i.encodeAny(this.value), r && i.encodeAny(this.oldValue);
  }
}
class ru extends je {
  constructor(i, n) {
    super(i);
    F(this, "from");
    this.from = n;
  }
  op() {
    return "move";
  }
  code() {
    return 4;
  }
  apply(i) {
    const n = new Xo(G(this.from), void 0).apply(i);
    return new us(this.path, n.old).apply(n.doc);
  }
  toJson(i) {
    return {
      op: "move",
      path: K(this.path),
      from: K(this.from)
    };
  }
  toCompact(i, n) {
    return [n ? "move" : 4, this.path, this.from];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(4), i.encodeArray(this.path), i.encodeArray(this.from);
  }
}
class su extends je {
  constructor(i, n) {
    super(i);
    F(this, "from");
    this.from = n;
  }
  op() {
    return "copy";
  }
  code() {
    return 3;
  }
  apply(i) {
    const { val: n } = ce(i, this.from);
    if (n === void 0)
      throw new Error("NOT_FOUND");
    return new us(this.path, bn(n)).apply(i);
  }
  toJson(i) {
    return {
      op: "copy",
      path: K(this.path),
      from: K(this.from)
    };
  }
  toCompact(i, n) {
    return [n ? "copy" : 3, this.path, this.from];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(3), i.encodeArray(this.path), i.encodeArray(this.from);
  }
}
class He extends je {
  apply(t) {
    if (!this.test(t))
      throw new Error("TEST");
    return { doc: t };
  }
}
const Gn = (e, t) => {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    let i, n, r;
    if (Array.isArray(e)) {
      if (i = e.length, i !== t.length)
        return !1;
      for (n = i; n-- !== 0; )
        if (!Gn(e[n], t[n]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), i = r.length, i !== Object.keys(t).length)
      return !1;
    for (n = i; n-- !== 0; ) {
      const s = r[n];
      if (!Gn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return !1;
};
class au extends He {
  constructor(i, n, r) {
    super(i);
    F(this, "value");
    F(this, "not");
    this.value = n, this.not = r;
  }
  op() {
    return "test";
  }
  code() {
    return 5;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (n === void 0)
      return !!this.not;
    const r = Gn(n, this.value);
    return this.not ? !r : r;
  }
  toJson(i) {
    const n = {
      op: "test",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
    return this.not && (n.not = this.not), n;
  }
  toCompact(i, n) {
    const r = i ? this.path.slice(i.path.length) : this.path, s = n ? "test" : 5;
    return this.not ? [s, r, this.value, 1] : [s, r, this.value];
  }
  encode(i, n) {
    i.encodeArrayHeader(this.not ? 4 : 3), i.writer.u8(5), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeAny(this.value), this.not && i.writer.u8(1);
  }
}
class ou extends je {
  constructor(t) {
    super(t);
  }
  op() {
    return "flip";
  }
  code() {
    return 8;
  }
  apply(t) {
    const i = ce(t, this.path);
    return i.obj ? i.obj[i.key] = !i.val : t = !i.val, { doc: t, old: i.val };
  }
  toJson(t) {
    return {
      op: "flip",
      path: K(this.path)
    };
  }
  toCompact(t, i) {
    return [i ? "flip" : 8, this.path];
  }
  encode(t, i) {
    t.encodeArrayHeader(2), t.writer.u8(8), t.encodeArray(this.path);
  }
}
class cu extends je {
  constructor(i, n) {
    super(i);
    F(this, "inc");
    this.inc = n;
  }
  op() {
    return "inc";
  }
  code() {
    return 9;
  }
  apply(i) {
    const n = ce(i, this.path), r = this.inc + Number(n.val);
    return n.obj ? n.obj[n.key] = r : i = r, { doc: i, old: n.val };
  }
  toJson(i) {
    return {
      op: "inc",
      path: K(this.path),
      inc: this.inc
    };
  }
  toCompact(i, n) {
    return [n ? "inc" : 9, this.path, this.inc];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(9), i.encodeArray(this.path), i.encodeNumber(this.inc);
  }
}
class du extends je {
  constructor(i, n, r) {
    super(i);
    F(this, "pos");
    F(this, "str");
    this.pos = n, this.str = r;
  }
  op() {
    return "str_ins";
  }
  code() {
    return 6;
  }
  apply(i) {
    const { val: n, key: r, obj: s } = ce(i, this.path);
    if (typeof n != "string") {
      if (n !== void 0)
        throw new Error("NOT_A_STRING");
      if (this.pos !== 0)
        throw new Error("POS");
    }
    const a = typeof n == "string" ? n : "", o = Math.min(this.pos, a.length), c = a.slice(0, o), d = a.slice(o), u = c + this.str + d;
    return s ? s[r] = u : i = u, { doc: i, old: n };
  }
  toJson(i) {
    return {
      op: "str_ins",
      path: K(this.path),
      pos: this.pos,
      str: this.str
    };
  }
  toCompact(i, n) {
    return [n ? "str_ins" : 6, this.path, this.pos, this.str];
  }
  encode(i, n) {
    i.encodeArrayHeader(4), i.writer.u8(6), i.encodeArray(this.path), i.encodeNumber(this.pos), i.encodeString(this.str);
  }
}
class uu extends je {
  constructor(i, n, r, s) {
    super(i);
    F(this, "pos");
    F(this, "str");
    F(this, "len");
    this.pos = n, this.str = r, this.len = s;
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
  apply(i) {
    const { val: n, key: r, obj: s } = ce(i, this.path);
    if (typeof n != "string")
      throw new Error("NOT_A_STRING");
    const a = n.length, o = Math.min(this.pos, n.length), c = Math.min(o, a), d = this.str !== void 0 ? this.str.length : this.len, u = Math.min(o + d, a), l = n.slice(0, c), h = n.substr(u), f = l + h;
    return s ? s[r] = f : i = f, { doc: i, old: n };
  }
  toJson(i) {
    return typeof this.str == "string" ? {
      op: "str_del",
      path: K(this.path),
      pos: this.pos,
      str: this.str
    } : {
      op: "str_del",
      path: K(this.path),
      pos: this.pos,
      len: this.len
    };
  }
  toCompact(i, n) {
    const r = n ? "str_del" : 7;
    return typeof this.str == "string" ? [r, this.path, this.pos, this.str] : [r, this.path, this.pos, 0, this.len];
  }
  encode(i, n) {
    const r = typeof this.str == "string";
    i.encodeArrayHeader(r ? 4 : 5), i.writer.u8(7), i.encodeArray(this.path), i.encodeNumber(this.pos), r ? i.encodeString(this.str) : (i.writer.u8(0), i.encodeNumber(this.len));
  }
}
const { isArray: lu } = Array, Lr = (e) => !!e && typeof e == "object" && typeof e.text == "string", xr = (e) => !!e && typeof e == "object" && lu(e.children), hu = (e, t) => {
  const i = new RegExp(e, t ? "i" : void 0);
  return (n) => i.test(n);
};
class fu extends je {
  constructor(i, n, r) {
    super(i);
    F(this, "pos");
    F(this, "props");
    this.pos = n, this.props = r;
  }
  op() {
    return "split";
  }
  code() {
    return 10;
  }
  apply(i) {
    const n = ce(i, this.path);
    if (n.val === void 0)
      throw new Error("NOT_FOUND");
    const r = this.split(n.val);
    return ir(n) ? n.obj[n.key] = r : Rn(n) ? (n.obj[n.key] = r[0], n.obj.splice(n.key + 1, 0, r[1])) : i = r, { doc: i, old: n.val };
  }
  split(i) {
    if (typeof i == "string") {
      const { pos: n, props: r } = this, s = i.slice(0, n), a = i.slice(n);
      return r ? [
        {
          ...r,
          text: s
        },
        {
          ...r,
          text: a
        }
      ] : [s, a];
    } else if (Lr(i)) {
      const { pos: n, props: r } = this, s = i.text.slice(0, n), a = i.text.slice(n);
      return [
        {
          ...i,
          ...r,
          text: s
        },
        {
          ...i,
          ...r,
          text: a
        }
      ];
    } else if (xr(i)) {
      const { pos: n, props: r } = this, s = i.children.slice(0, n), a = i.children.slice(n);
      return [
        {
          ...i,
          ...r,
          children: s
        },
        {
          ...i,
          ...r,
          children: a
        }
      ];
    } else if (typeof i == "number") {
      const { pos: n } = this;
      return [n, i - n];
    } else
      return [i, i];
  }
  toJson(i) {
    const n = {
      op: "split",
      path: K(this.path),
      pos: this.pos
    };
    return this.props && (n.props = this.props), n;
  }
  toCompact(i, n) {
    const r = n ? "split" : 10;
    return this.props ? [r, this.path, this.pos, this.props] : [r, this.path, this.pos];
  }
  encode(i, n) {
    i.encodeArrayHeader(this.props ? 4 : 3), i.writer.u8(10), i.encodeArray(this.path), i.encodeNumber(this.pos), this.props && i.encodeObject(this.props);
  }
}
class pu extends je {
  constructor(i, n, r) {
    super(i);
    F(this, "pos");
    F(this, "props");
    this.pos = n, this.props = r;
  }
  op() {
    return "merge";
  }
  code() {
    return 11;
  }
  apply(i) {
    const n = ce(i, this.path);
    if (!Rn(n))
      throw new Error("INVALID_TARGET");
    if (n.key <= 0)
      throw new Error("INVALID_KEY");
    const r = n.obj[n.key - 1], s = n.obj[n.key], a = this.merge(r, s);
    return n.obj[n.key - 1] = a, n.obj.splice(n.key, 1), { doc: i, old: [r, s] };
  }
  merge(i, n) {
    return typeof i == "string" && typeof n == "string" || typeof i == "number" && typeof n == "number" ? i + n : Lr(i) && Lr(n) ? { ...i, ...n, text: i.text + n.text } : xr(i) && xr(n) ? { ...i, ...n, children: [...i.children, ...n.children] } : [i, n];
  }
  toJson(i) {
    const n = {
      op: "merge",
      path: K(this.path),
      pos: this.pos
    };
    return this.props && (n.props = this.props), n;
  }
  toCompact(i, n) {
    const r = n ? "merge" : 11;
    return this.props ? [r, this.path, this.pos, this.props] : [r, this.path, this.pos];
  }
  encode(i, n) {
    i.encodeArrayHeader(this.props ? 4 : 3), i.writer.u8(11), i.encodeArray(this.path), i.encodeNumber(this.pos), this.props && i.encodeAny(this.props);
  }
}
const { isArray: mu } = Array;
class vu extends je {
  constructor(i, n, r) {
    super(i);
    F(this, "props");
    F(this, "deleteNull");
    this.props = n, this.deleteNull = r;
  }
  op() {
    return "extend";
  }
  code() {
    return 12;
  }
  apply(i) {
    const n = ce(i, this.path);
    return Rn(n) ? n.val !== void 0 && (n.obj[n.key] = this.extend(n.val)) : ir(n) ? n.obj[n.key] = this.extend(n.val) : i = this.extend(i), { doc: i };
  }
  extend(i) {
    if (mu(i) || typeof i != "object" || !i)
      return i;
    for (const [n, r] of Object.entries(this.props)) {
      if (n === "__proto__")
        throw new Error("NO_PROTO");
      if (r === null && this.deleteNull) {
        delete i[n];
        continue;
      }
      i[n] = r;
    }
    return i;
  }
  toJson(i) {
    const n = {
      op: "extend",
      path: K(this.path),
      props: this.props
    };
    return this.deleteNull && (n.deleteNull = this.deleteNull), n;
  }
  toCompact(i, n) {
    const r = n ? "extend" : 12;
    return this.deleteNull ? [r, this.path, this.props, 1] : [r, this.path, this.props];
  }
  encode(i, n) {
    const { deleteNull: r } = this;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(12), i.encodeArray(this.path), i.encodeObject(this.props), r && i.writer.u8(1);
  }
}
class gu extends He {
  constructor(t) {
    super(t);
  }
  op() {
    return "defined";
  }
  code() {
    return 31;
  }
  test(t) {
    const { val: i } = ce(t, this.path);
    return i !== void 0;
  }
  toJson(t) {
    return {
      op: "defined",
      path: K(t ? this.path.slice(t.path.length) : this.path)
    };
  }
  toCompact(t, i) {
    return [i ? "defined" : 31, t ? this.path.slice(t.path.length) : this.path];
  }
  encode(t, i) {
    t.encodeArrayHeader(2), t.writer.u8(31), t.encodeArray(i ? this.path.slice(i.path.length) : this.path);
  }
}
class yu extends He {
  constructor(t) {
    super(t);
  }
  op() {
    return "undefined";
  }
  code() {
    return 38;
  }
  test(t) {
    try {
      const { val: i } = ce(t, this.path);
      return i === void 0;
    } catch (i) {
      if (i.message === "NOT_FOUND")
        return !0;
      throw i;
    }
  }
  toJson(t) {
    return {
      op: "undefined",
      path: K(t ? this.path.slice(t.path.length) : this.path)
    };
  }
  toCompact(t, i) {
    return [i ? "undefined" : 38, t ? this.path.slice(t.path.length) : this.path];
  }
  encode(t, i) {
    t.encodeArrayHeader(2), t.writer.u8(38), t.encodeArray(i ? this.path.slice(i.path.length) : this.path);
  }
}
const { isArray: Su } = Array;
class ku extends He {
  constructor(i, n) {
    super(i);
    F(this, "type");
    this.type = n;
  }
  op() {
    return "test_type";
  }
  code() {
    return 39;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    return n === null ? this.type.indexOf("null") > -1 : Su(n) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof n) > -1 || typeof n == "number" && n === Math.round(n) && this.type.indexOf("integer") > -1;
  }
  toJson(i) {
    return {
      op: "test_type",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      type: this.type
    };
  }
  toCompact(i, n) {
    return [n ? "test_type" : 39, i ? this.path.slice(i.path.length) : this.path, this.type];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(39), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeArray(this.type);
  }
}
class bu extends He {
  constructor(i, n, r, s) {
    super(i);
    F(this, "pos");
    F(this, "str");
    F(this, "not");
    this.pos = n, this.str = r, this.not = s;
  }
  op() {
    return "test_string";
  }
  code() {
    return 40;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (typeof n != "string")
      return !1;
    const r = n.length, s = Math.min(this.pos, r), a = Math.min(this.pos + this.str.length, r), o = n.substring(s, a) === this.str;
    return this.not ? !o : o;
  }
  toJson(i) {
    const n = {
      op: "test_string",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      pos: this.pos,
      str: this.str
    };
    return this.not && (n.not = this.not), n;
  }
  toCompact(i, n) {
    const r = n ? "test_string" : 40, s = i ? this.path.slice(i.path.length) : this.path;
    return this.not ? [r, s, this.pos, this.str, 1] : [r, s, this.pos, this.str];
  }
  encode(i, n) {
    i.encodeArrayHeader(this.not ? 5 : 4), i.writer.u8(40), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeNumber(this.pos), i.encodeString(this.str), this.not && i.writer.u8(1);
  }
}
class Cu extends He {
  constructor(i, n, r) {
    super(i);
    F(this, "len");
    F(this, "not");
    this.len = n, this.not = r;
  }
  op() {
    return "test_string_len";
  }
  code() {
    return 41;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (typeof n != "string")
      return !1;
    const s = n.length >= this.len;
    return this.not ? !s : s;
  }
  toJson(i) {
    const n = {
      op: "test_string_len",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      len: this.len
    };
    return this.not && (n.not = this.not), n;
  }
  toCompact(i, n) {
    const r = n ? "test_string_len" : 41, s = i ? this.path.slice(i.path.length) : this.path;
    return this.not ? [r, s, this.len, 1] : [r, s, this.len];
  }
  encode(i, n) {
    i.encodeArrayHeader(this.not ? 4 : 3), i.writer.u8(41), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeNumber(this.len), this.not && i.writer.u8(1);
  }
}
class _u extends He {
  constructor(i, n, r) {
    super(i);
    F(this, "value");
    F(this, "ignore_case");
    this.value = n, this.ignore_case = r;
  }
  op() {
    return "contains";
  }
  code() {
    return 30;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (typeof n != "string")
      return !1;
    const r = this.ignore_case ? n.toLowerCase() : n, s = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.indexOf(s) > -1;
  }
  toJson(i) {
    const n = {
      op: "contains",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (n.ignore_case = this.ignore_case), n;
  }
  toCompact(i, n) {
    const r = n ? "contains" : 30;
    return this.ignore_case ? [r, i ? this.path.slice(i.path.length) : this.path, this.value, 1] : [r, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    const r = this.ignore_case;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(30), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeString(this.value), r && i.writer.u8(1);
  }
}
class Tu extends He {
  constructor(i, n, r) {
    super(i);
    F(this, "value");
    F(this, "ignore_case");
    this.value = n, this.ignore_case = r;
  }
  op() {
    return "ends";
  }
  code() {
    return 32;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (typeof n != "string")
      return !1;
    const r = this.ignore_case ? n.toLowerCase() : n, s = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.endsWith(s);
  }
  toJson(i) {
    const n = {
      op: "ends",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (n.ignore_case = this.ignore_case), n;
  }
  toCompact(i, n) {
    const r = n ? "ends" : 32;
    return this.ignore_case ? [r, i ? this.path.slice(i.path.length) : this.path, this.value, 1] : [r, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    const r = this.ignore_case;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(32), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeString(this.value), r && i.writer.u8(1);
  }
}
class Eu extends He {
  constructor(i, n, r) {
    super(i);
    F(this, "value");
    F(this, "ignore_case");
    this.value = n, this.ignore_case = r;
  }
  op() {
    return "starts";
  }
  code() {
    return 37;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    if (typeof n != "string")
      return !1;
    const r = this.ignore_case ? n.toLowerCase() : n, s = this.ignore_case ? this.value.toLowerCase() : this.value;
    return r.startsWith(s);
  }
  toJson(i) {
    const n = {
      op: "starts",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (n.ignore_case = this.ignore_case), n;
  }
  toCompact(i, n) {
    const r = n ? "starts" : 37;
    return this.ignore_case ? [r, i ? this.path.slice(i.path.length) : this.path, this.value, 1] : [r, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    const r = this.ignore_case;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(37), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeString(this.value), r && i.writer.u8(1);
  }
}
class Pu extends He {
  constructor(i, n) {
    super(i);
    F(this, "value");
    this.value = n;
  }
  op() {
    return "in";
  }
  code() {
    return 33;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    for (const r of this.value)
      if (Gn(n, r))
        return !0;
    return !1;
  }
  toJson(i) {
    return {
      op: "in",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(i, n) {
    return [n ? "in" : 33, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(33), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeArray(this.value);
  }
}
class wu extends He {
  constructor(i, n) {
    super(i);
    F(this, "value");
    this.value = n;
  }
  op() {
    return "less";
  }
  code() {
    return 34;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    return typeof n != "number" ? !1 : n < this.value;
  }
  toJson(i) {
    return {
      op: "less",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(i, n) {
    return [n ? "less" : 34, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(34), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeNumber(this.value);
  }
}
class Ru extends He {
  constructor(i, n) {
    super(i);
    F(this, "value");
    this.value = n;
  }
  op() {
    return "more";
  }
  code() {
    return 36;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    return typeof n != "number" ? !1 : n > this.value;
  }
  toJson(i) {
    return {
      op: "more",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(i, n) {
    return [n ? "more" : 36, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(36), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeNumber(this.value);
  }
}
class ls extends He {
  constructor(i, n) {
    super(i);
    F(this, "ops");
    this.ops = n;
  }
}
class Ou extends ls {
  constructor(i, n) {
    super(i, n);
    F(this, "ops");
    this.ops = n;
  }
  op() {
    return "and";
  }
  code() {
    return 43;
  }
  test(i) {
    for (const n of this.ops)
      if (!n.test(i))
        return !1;
    return !0;
  }
  toJson(i) {
    return {
      op: "and",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(i, n) {
    return [
      n ? "and" : 43,
      i ? this.path.slice(i.path.length) : this.path,
      this.ops.map((s) => s.toCompact(this, n))
    ];
  }
  encode(i, n) {
    const r = n ? this.path.slice(n.path.length) : this.path;
    i.encodeArrayHeader(3), i.writer.u8(43), i.encodeArray(r);
    const s = this.ops.length;
    i.encodeArrayHeader(s);
    for (let a = 0; a < s; a++)
      this.ops[a].encode(i, this);
  }
}
class Nu extends ls {
  constructor(i, n) {
    super(i, n);
    F(this, "ops");
    this.ops = n;
  }
  op() {
    return "or";
  }
  code() {
    return 45;
  }
  test(i) {
    for (const n of this.ops)
      if (n.test(i))
        return !0;
    return !1;
  }
  toJson(i) {
    return {
      op: "or",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(i, n) {
    return [
      n ? "or" : 45,
      i ? this.path.slice(i.path.length) : this.path,
      this.ops.map((s) => s.toCompact(this, n))
    ];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(45), i.encodeArray(n ? this.path.slice(n.path.length) : this.path);
    const r = this.ops.length;
    i.encodeArrayHeader(r);
    for (let s = 0; s < r; s++)
      this.ops[s].encode(i, this);
  }
}
class Au extends ls {
  constructor(i, n) {
    super(i, n);
    F(this, "ops");
    this.ops = n;
  }
  op() {
    return "not";
  }
  code() {
    return 44;
  }
  test(i) {
    for (const n of this.ops)
      if (n.test(i))
        return !1;
    return !0;
  }
  toJson(i) {
    return {
      op: "not",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      apply: this.ops.map((r) => r.toJson(this))
    };
  }
  toCompact(i, n) {
    return [
      n ? "not" : 44,
      i ? this.path.slice(i.path.length) : this.path,
      this.ops.map((s) => s.toCompact(this, n))
    ];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(44), i.encodeArray(n ? this.path.slice(n.path.length) : this.path);
    const r = this.ops.length;
    i.encodeArrayHeader(r);
    for (let s = 0; s < r; s++)
      this.ops[s].encode(i, this);
  }
}
class Iu extends He {
  constructor(i, n, r, s) {
    super(i);
    F(this, "value");
    F(this, "ignore_case");
    F(this, "matcher");
    this.value = n, this.ignore_case = r, this.matcher = s(n, r);
  }
  op() {
    return "matches";
  }
  code() {
    return 35;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    return typeof n != "string" ? !1 : this.matcher(n);
  }
  toJson(i) {
    const n = {
      op: "matches",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (n.ignore_case = this.ignore_case), n;
  }
  toCompact(i, n) {
    const r = n ? "matches" : 35;
    return this.ignore_case ? [r, i ? this.path.slice(i.path.length) : this.path, this.value, 1] : [r, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    const r = this.ignore_case;
    i.encodeArrayHeader(r ? 4 : 3), i.writer.u8(35), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeString(this.value), r && i.writer.u8(1);
  }
}
const { isArray: Du } = Array;
class Uu extends He {
  constructor(i, n) {
    super(i);
    F(this, "value");
    this.value = n;
  }
  op() {
    return "type";
  }
  code() {
    return 42;
  }
  test(i) {
    const { val: n } = ce(i, this.path);
    return n === null ? this.value === "null" : Du(n) ? this.value === "array" : typeof n === this.value || typeof n == "number" && n === Math.round(n) && this.value === "integer";
  }
  toJson(i) {
    return {
      op: "type",
      path: K(i ? this.path.slice(i.path.length) : this.path),
      value: this.value
    };
  }
  toCompact(i, n) {
    return [n ? "type" : 42, i ? this.path.slice(i.path.length) : this.path, this.value];
  }
  encode(i, n) {
    i.encodeArrayHeader(3), i.writer.u8(42), i.encodeArray(n ? this.path.slice(n.path.length) : this.path), i.encodeString(this.value);
  }
}
const Mu = (e, t) => {
  switch (e.op) {
    case "add":
      return new us(G(e.path), e.value);
    case "remove":
      return new Xo(G(e.path), e.oldValue);
    case "replace":
      return new nu(G(e.path), e.value, e.oldValue);
    case "move":
      return new ru(G(e.path), G(e.from));
    case "copy":
      return new su(G(e.path), G(e.from));
    case "flip":
      return new ou(G(e.path));
    case "inc":
      return new cu(G(e.path), e.inc);
    case "str_ins":
      return new du(G(e.path), e.pos, e.str);
    case "str_del":
      return new uu(G(e.path), e.pos, e.str, e.len);
    case "split":
      return new fu(G(e.path), e.pos, e.props || null);
    case "merge":
      return new pu(G(e.path), e.pos, e.props || null);
    case "extend":
      return new vu(G(e.path), e.props, !!e.deleteNull);
    default:
      return Ln(e, t);
  }
}, Ln = (e, t) => {
  switch (e.op) {
    case "test":
      return new au(G(e.path), e.value, !!e.not);
    case "defined":
      return new gu(G(e.path));
    case "undefined":
      return new yu(G(e.path));
    case "type":
      return new Uu(G(e.path), e.value);
    case "test_type":
      return new ku(G(e.path), e.type);
    case "test_string":
      return new bu(G(e.path), e.pos, e.str, !!e.not);
    case "test_string_len":
      return new Cu(G(e.path), e.len, !!e.not);
    case "contains":
      return new _u(G(e.path), e.value, !!e.ignore_case);
    case "ends":
      return new Tu(G(e.path), e.value, !!e.ignore_case);
    case "starts":
      return new Eu(G(e.path), e.value, !!e.ignore_case);
    case "matches":
      return new Iu(G(e.path), e.value, !!e.ignore_case, t.createMatcher || hu);
    case "in":
      return new Pu(G(e.path), e.value);
    case "less":
      return new wu(G(e.path), e.value);
    case "more":
      return new Ru(G(e.path), e.value);
    case "and": {
      const i = G(e.path);
      return new Ou(i, e.apply.map((n) => Ln({ ...n, path: [...i, ...G(n.path)] }, t)));
    }
    case "or": {
      const i = G(e.path);
      return new Nu(i, e.apply.map((n) => Ln({ ...n, path: [...i, ...G(n.path)] }, t)));
    }
    case "not": {
      const i = G(e.path);
      return new Au(i, e.apply.map((n) => Ln({ ...n, path: [...i, ...G(n.path)] }, t)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function Lu(e, t, i) {
  i.mutate || (e = bn(e));
  const n = [], r = t.length;
  for (let s = 0; s < r; s++) {
    const o = Mu(t[s], i).apply(e);
    e = o.doc, n.push(o);
  }
  return { doc: e, res: n };
}
var fn = (e) => typeof e == "function" ? e : function() {
  return e;
}, xu = typeof self < "u" ? self : null, dn = typeof window < "u" ? window : null, pn = xu || dn || pn, $u = "2.0.0", Et = { connecting: 0, open: 1, closing: 2, closed: 3 }, Fu = 1e4, Bu = 1e3, Qe = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
}, Jt = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}, $r = {
  longpoll: "longpoll",
  websocket: "websocket"
}, Ju = {
  complete: 4
}, An = class {
  constructor(e, t, i, n) {
    this.channel = e, this.event = t, this.payload = i || function() {
      return {};
    }, this.receivedResp = null, this.timeout = n, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
  }
  resend(e) {
    this.timeout = e, this.reset(), this.send();
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
  receive(e, t) {
    return this.hasReceived(e) && t(this.receivedResp.response), this.recHooks.push({ status: e, callback: t }), this;
  }
  reset() {
    this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
  }
  matchReceive({ status: e, response: t, _ref: i }) {
    this.recHooks.filter((n) => n.status === e).forEach((n) => n.callback(t));
  }
  cancelRefEvent() {
    this.refEvent && this.channel.off(this.refEvent);
  }
  cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
  }
  startTimeout() {
    this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e) => {
      this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e, this.matchReceive(e);
    }), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
  trigger(e, t) {
    this.channel.trigger(this.refEvent, { status: e, response: t });
  }
}, jo = class {
  constructor(e, t) {
    this.callback = e, this.timerCalc = t, this.timer = null, this.tries = 0;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}, Vu = class {
  constructor(e, t, i) {
    this.state = Qe.closed, this.topic = e, this.params = fn(t || {}), this.socket = i, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new An(this, Jt.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new jo(() => {
      this.socket.isConnected() && this.rejoin();
    }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
    })), this.joinPush.receive("ok", () => {
      this.state = Qe.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((n) => n.send()), this.pushBuffer = [];
    }), this.joinPush.receive("error", () => {
      this.state = Qe.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.onClose(() => {
      this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = Qe.closed, this.socket.remove(this);
    }), this.onError((n) => {
      this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, n), this.isJoining() && this.joinPush.reset(), this.state = Qe.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.joinPush.receive("timeout", () => {
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new An(this, Jt.leave, fn({}), this.timeout).send(), this.state = Qe.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.on(Jt.reply, (n, r) => {
      this.trigger(this.replyEventName(r), n);
    });
  }
  join(e = this.timeout) {
    if (this.joinedOnce)
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    return this.timeout = e, this.joinedOnce = !0, this.rejoin(), this.joinPush;
  }
  onClose(e) {
    this.on(Jt.close, e);
  }
  onError(e) {
    return this.on(Jt.error, (t) => e(t));
  }
  on(e, t) {
    let i = this.bindingRef++;
    return this.bindings.push({ event: e, ref: i, callback: t }), i;
  }
  off(e, t) {
    this.bindings = this.bindings.filter((i) => !(i.event === e && (typeof t > "u" || t === i.ref)));
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(e, t, i = this.timeout) {
    if (t = t || {}, !this.joinedOnce)
      throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    let n = new An(this, e, function() {
      return t;
    }, i);
    return this.canPush() ? n.send() : (n.startTimeout(), this.pushBuffer.push(n)), n;
  }
  leave(e = this.timeout) {
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = Qe.leaving;
    let t = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(Jt.close, "leave");
    }, i = new An(this, Jt.leave, fn({}), e);
    return i.receive("ok", () => t()).receive("timeout", () => t()), i.send(), this.canPush() || i.trigger("ok", {}), i;
  }
  onMessage(e, t, i) {
    return t;
  }
  isMember(e, t, i, n) {
    return this.topic !== e ? !1 : n && n !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: e, event: t, payload: i, joinRef: n }), !1) : !0;
  }
  joinRef() {
    return this.joinPush.ref;
  }
  rejoin(e = this.timeout) {
    this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = Qe.joining, this.joinPush.resend(e));
  }
  trigger(e, t, i, n) {
    let r = this.onMessage(e, t, i, n);
    if (t && !r)
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    let s = this.bindings.filter((a) => a.event === e);
    for (let a = 0; a < s.length; a++)
      s[a].callback(r, i, n || this.joinRef());
  }
  replyEventName(e) {
    return `chan_reply_${e}`;
  }
  isClosed() {
    return this.state === Qe.closed;
  }
  isErrored() {
    return this.state === Qe.errored;
  }
  isJoined() {
    return this.state === Qe.joined;
  }
  isJoining() {
    return this.state === Qe.joining;
  }
  isLeaving() {
    return this.state === Qe.leaving;
  }
}, Wn = class {
  static request(e, t, i, n, r, s, a) {
    if (pn.XDomainRequest) {
      let o = new pn.XDomainRequest();
      return this.xdomainRequest(o, e, t, n, r, s, a);
    } else {
      let o = new pn.XMLHttpRequest();
      return this.xhrRequest(o, e, t, i, n, r, s, a);
    }
  }
  static xdomainRequest(e, t, i, n, r, s, a) {
    return e.timeout = r, e.open(t, i), e.onload = () => {
      let o = this.parseJSON(e.responseText);
      a && a(o);
    }, s && (e.ontimeout = s), e.onprogress = () => {
    }, e.send(n), e;
  }
  static xhrRequest(e, t, i, n, r, s, a, o) {
    return e.open(t, i, !0), e.timeout = s, e.setRequestHeader("Content-Type", n), e.onerror = () => o && o(null), e.onreadystatechange = () => {
      if (e.readyState === Ju.complete && o) {
        let c = this.parseJSON(e.responseText);
        o(c);
      }
    }, a && (e.ontimeout = a), e.send(r), e;
  }
  static parseJSON(e) {
    if (!e || e === "")
      return null;
    try {
      return JSON.parse(e);
    } catch {
      return console && console.log("failed to parse JSON response", e), null;
    }
  }
  static serialize(e, t) {
    let i = [];
    for (var n in e) {
      if (!Object.prototype.hasOwnProperty.call(e, n))
        continue;
      let r = t ? `${t}[${n}]` : n, s = e[n];
      typeof s == "object" ? i.push(this.serialize(s, r)) : i.push(encodeURIComponent(r) + "=" + encodeURIComponent(s));
    }
    return i.join("&");
  }
  static appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    let i = e.match(/\?/) ? "&" : "?";
    return `${e}${i}${this.serialize(t)}`;
  }
}, fr = class {
  constructor(e) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(e), this.readyState = Et.connecting, this.poll();
  }
  normalizeEndpoint(e) {
    return e.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + $r.websocket), "$1/" + $r.longpoll);
  }
  endpointURL() {
    return Wn.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(e, t, i) {
    this.close(e, t, i), this.readyState = Et.connecting;
  }
  ontimeout() {
    this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
  }
  isActive() {
    return this.readyState === Et.open || this.readyState === Et.connecting;
  }
  poll() {
    this.ajax("GET", null, () => this.ontimeout(), (e) => {
      if (e) {
        var { status: t, token: i, messages: n } = e;
        this.token = i;
      } else
        t = 0;
      switch (t) {
        case 200:
          n.forEach((r) => {
            setTimeout(() => this.onmessage({ data: r }), 0);
          }), this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = Et.open, this.onopen({}), this.poll();
          break;
        case 403:
          this.onerror(403), this.close(1008, "forbidden", !1);
          break;
        case 0:
        case 500:
          this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${t}`);
      }
    });
  }
  send(e) {
    this.ajax("POST", e, () => this.onerror("timeout"), (t) => {
      (!t || t.status !== 200) && (this.onerror(t && t.status), this.closeAndRetry(1011, "internal server error", !1));
    });
  }
  close(e, t, i) {
    for (let r of this.reqs)
      r.abort();
    this.readyState = Et.closed;
    let n = Object.assign({ code: 1e3, reason: void 0, wasClean: !0 }, { code: e, reason: t, wasClean: i });
    typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", n)) : this.onclose(n);
  }
  ajax(e, t, i, n) {
    let r, s = () => {
      this.reqs.delete(r), i();
    };
    r = Wn.request(e, this.endpointURL(), "application/json", t, this.timeout, s, (a) => {
      this.reqs.delete(r), this.isActive() && n(a);
    }), this.reqs.add(r);
  }
}, In = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(e, t) {
    if (e.payload.constructor === ArrayBuffer)
      return t(this.binaryEncode(e));
    {
      let i = [e.join_ref, e.ref, e.topic, e.event, e.payload];
      return t(JSON.stringify(i));
    }
  },
  decode(e, t) {
    if (e.constructor === ArrayBuffer)
      return t(this.binaryDecode(e));
    {
      let [i, n, r, s, a] = JSON.parse(e);
      return t({ join_ref: i, ref: n, topic: r, event: s, payload: a });
    }
  },
  binaryEncode(e) {
    let { join_ref: t, ref: i, event: n, topic: r, payload: s } = e, a = this.META_LENGTH + t.length + i.length + r.length + n.length, o = new ArrayBuffer(this.HEADER_LENGTH + a), c = new DataView(o), d = 0;
    c.setUint8(d++, this.KINDS.push), c.setUint8(d++, t.length), c.setUint8(d++, i.length), c.setUint8(d++, r.length), c.setUint8(d++, n.length), Array.from(t, (l) => c.setUint8(d++, l.charCodeAt(0))), Array.from(i, (l) => c.setUint8(d++, l.charCodeAt(0))), Array.from(r, (l) => c.setUint8(d++, l.charCodeAt(0))), Array.from(n, (l) => c.setUint8(d++, l.charCodeAt(0)));
    var u = new Uint8Array(o.byteLength + s.byteLength);
    return u.set(new Uint8Array(o), 0), u.set(new Uint8Array(s), o.byteLength), u.buffer;
  },
  binaryDecode(e) {
    let t = new DataView(e), i = t.getUint8(0), n = new TextDecoder();
    switch (i) {
      case this.KINDS.push:
        return this.decodePush(e, t, n);
      case this.KINDS.reply:
        return this.decodeReply(e, t, n);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(e, t, n);
    }
  },
  decodePush(e, t, i) {
    let n = t.getUint8(1), r = t.getUint8(2), s = t.getUint8(3), a = this.HEADER_LENGTH + this.META_LENGTH - 1, o = i.decode(e.slice(a, a + n));
    a = a + n;
    let c = i.decode(e.slice(a, a + r));
    a = a + r;
    let d = i.decode(e.slice(a, a + s));
    a = a + s;
    let u = e.slice(a, e.byteLength);
    return { join_ref: o, ref: null, topic: c, event: d, payload: u };
  },
  decodeReply(e, t, i) {
    let n = t.getUint8(1), r = t.getUint8(2), s = t.getUint8(3), a = t.getUint8(4), o = this.HEADER_LENGTH + this.META_LENGTH, c = i.decode(e.slice(o, o + n));
    o = o + n;
    let d = i.decode(e.slice(o, o + r));
    o = o + r;
    let u = i.decode(e.slice(o, o + s));
    o = o + s;
    let l = i.decode(e.slice(o, o + a));
    o = o + a;
    let h = e.slice(o, e.byteLength), f = { status: l, response: h };
    return { join_ref: c, ref: d, topic: u, event: Jt.reply, payload: f };
  },
  decodeBroadcast(e, t, i) {
    let n = t.getUint8(1), r = t.getUint8(2), s = this.HEADER_LENGTH + 2, a = i.decode(e.slice(s, s + n));
    s = s + n;
    let o = i.decode(e.slice(s, s + r));
    s = s + r;
    let c = e.slice(s, e.byteLength);
    return { join_ref: null, ref: null, topic: a, event: o, payload: c };
  }
}, Hu = class {
  constructor(e, t = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = t.timeout || Fu, this.transport = t.transport || pn.WebSocket || fr, this.establishedConnections = 0, this.defaultEncoder = In.encode.bind(In), this.defaultDecoder = In.decode.bind(In), this.closeWasClean = !1, this.binaryType = t.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== fr ? (this.encode = t.encode || this.defaultEncoder, this.decode = t.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let i = null;
    dn && dn.addEventListener && (dn.addEventListener("pagehide", (n) => {
      this.conn && (this.disconnect(), i = this.connectClock);
    }), dn.addEventListener("pageshow", (n) => {
      i === this.connectClock && (i = null, this.connect());
    })), this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (n) => t.rejoinAfterMs ? t.rejoinAfterMs(n) : [1e3, 2e3, 5e3][n - 1] || 1e4, this.reconnectAfterMs = (n) => t.reconnectAfterMs ? t.reconnectAfterMs(n) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][n - 1] || 5e3, this.logger = t.logger || null, this.longpollerTimeout = t.longpollerTimeout || 2e4, this.params = fn(t.params || {}), this.endPoint = `${e}/${$r.websocket}`, this.vsn = t.vsn || $u, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new jo(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return fr;
  }
  replaceTransport(e) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = e;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let e = Wn.appendParams(Wn.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    return e.charAt(0) !== "/" ? e : e.charAt(1) === "/" ? `${this.protocol()}:${e}` : `${this.protocol()}://${location.host}${e}`;
  }
  disconnect(e, t, i) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(e, t, i);
  }
  connect(e) {
    e && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = fn(e)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (t) => this.onConnError(t), this.conn.onmessage = (t) => this.onConnMessage(t), this.conn.onclose = (t) => this.onConnClose(t));
  }
  log(e, t, i) {
    this.logger(e, t, i);
  }
  hasLogger() {
    return this.logger !== null;
  }
  onOpen(e) {
    let t = this.makeRef();
    return this.stateChangeCallbacks.open.push([t, e]), t;
  }
  onClose(e) {
    let t = this.makeRef();
    return this.stateChangeCallbacks.close.push([t, e]), t;
  }
  onError(e) {
    let t = this.makeRef();
    return this.stateChangeCallbacks.error.push([t, e]), t;
  }
  onMessage(e) {
    let t = this.makeRef();
    return this.stateChangeCallbacks.message.push([t, e]), t;
  }
  ping(e) {
    if (!this.isConnected())
      return !1;
    let t = this.makeRef(), i = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: t });
    let n = this.onMessage((r) => {
      r.ref === t && (this.off([n]), e(Date.now() - i));
    });
    return !0;
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(([, e]) => e());
  }
  heartbeatTimeout() {
    this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Bu, "heartbeat timeout"));
  }
  resetHeartbeat() {
    this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
  }
  teardown(e, t, i) {
    if (!this.conn)
      return e && e();
    this.waitForBufferDone(() => {
      this.conn && (t ? this.conn.close(t, i || "") : this.conn.close()), this.waitForSocketClosed(() => {
        this.conn && (this.conn.onopen = function() {
        }, this.conn.onerror = function() {
        }, this.conn.onmessage = function() {
        }, this.conn.onclose = function() {
        }, this.conn = null), e && e();
      });
    });
  }
  waitForBufferDone(e, t = 1) {
    if (t === 5 || !this.conn || !this.conn.bufferedAmount) {
      e();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(e, t + 1);
    }, 150 * t);
  }
  waitForSocketClosed(e, t = 1) {
    if (t === 5 || !this.conn || this.conn.readyState === Et.closed) {
      e();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(e, t + 1);
    }, 150 * t);
  }
  onConnClose(e) {
    let t = e && e.code;
    this.hasLogger() && this.log("transport", "close", e), this.triggerChanError(), this.clearHeartbeats(), !this.closeWasClean && t !== 1e3 && this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(([, i]) => i(e));
  }
  onConnError(e) {
    this.hasLogger() && this.log("transport", e);
    let t = this.transport, i = this.establishedConnections;
    this.stateChangeCallbacks.error.forEach(([, n]) => {
      n(e, t, i);
    }), (t === this.transport || i > 0) && this.triggerChanError();
  }
  triggerChanError() {
    this.channels.forEach((e) => {
      e.isErrored() || e.isLeaving() || e.isClosed() || e.trigger(Jt.error);
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case Et.connecting:
        return "connecting";
      case Et.open:
        return "open";
      case Et.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  isConnected() {
    return this.connectionState() === "open";
  }
  remove(e) {
    this.off(e.stateChangeRefs), this.channels = this.channels.filter((t) => t.joinRef() !== e.joinRef());
  }
  off(e) {
    for (let t in this.stateChangeCallbacks)
      this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(([i]) => e.indexOf(i) === -1);
  }
  channel(e, t = {}) {
    let i = new Vu(e, t, this);
    return this.channels.push(i), i;
  }
  push(e) {
    if (this.hasLogger()) {
      let { topic: t, event: i, payload: n, ref: r, join_ref: s } = e;
      this.log("push", `${t} ${i} (${s}, ${r})`, n);
    }
    this.isConnected() ? this.encode(e, (t) => this.conn.send(t)) : this.sendBuffer.push(() => this.encode(e, (t) => this.conn.send(t)));
  }
  makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
  }
  sendHeartbeat() {
    this.pendingHeartbeatRef && !this.isConnected() || (this.pendingHeartbeatRef = this.makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef }), this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs));
  }
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
  }
  onConnMessage(e) {
    this.decode(e.data, (t) => {
      let { topic: i, event: n, payload: r, ref: s, join_ref: a } = t;
      s && s === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${r.status || ""} ${i} ${n} ${s && "(" + s + ")" || ""}`, r);
      for (let o = 0; o < this.channels.length; o++) {
        const c = this.channels[o];
        c.isMember(i, n, r, a) && c.trigger(n, r, s, a);
      }
      for (let o = 0; o < this.stateChangeCallbacks.message.length; o++) {
        let [, c] = this.stateChangeCallbacks.message[o];
        c(t);
      }
    });
  }
  leaveOpenTopic(e) {
    let t = this.channels.find((i) => i.topic === e && (i.isJoined() || i.isJoining()));
    t && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e}"`), t.leave());
  }
};
class qu {
  constructor(t) {
    this.connected = !1, this.config = t, this.socket = new Hu(this.config.url, { logger: (i, n, r) => {
      console.log(`${i}: ${n}`, r);
    } }), this.channel = this.socket.channel(this.config.topic, this.config.params), this.eventTarget = new EventTarget();
  }
  /** connect to socket and join channel. will do nothing if already connected */
  connect() {
    this.connected || (this.socket.onError((t) => this.emitError("socket error", t)), this.socket.connect(), this.channel.onError((t) => console.log("channel error", t)), this.channel.join().receive("ok", () => {
      console.log("joined");
    }).receive("error", (t) => {
      this.emitError("channel join error", t);
    }), this.channel.on("state:change", (t) => this.handleChange(t)), this.channel.on("state:patch", (t) => this.handlePatch(t)), this.connected = !0);
  }
  /** leave channel and disconnect from socket */
  disconnect() {
    this.channel && this.channel.leave(), this.socket.disconnect(), this.connected = !1;
  }
  /** for events that begin with 'livestate-', add a listener. For
   * other events, additionally call `channel.on` to receive the event
   * over the channel, which will then be dispatched.
   */
  addEventListener(t, i, n) {
    var r;
    this.eventTarget.addEventListener(t, i, n), t.startsWith("livestate-") || (r = this.channel) == null || r.on(t, (s) => {
      this.eventTarget.dispatchEvent(new CustomEvent(t, { detail: s }));
    });
  }
  removeEventListener(t, i, n) {
    return this.eventTarget.removeEventListener(t, i, n);
  }
  /** @deprecated */
  subscribe(t) {
    this.addEventListener("livestate-change", t);
  }
  /** @deprecated */
  unsubscribe(t) {
    this.removeEventListener("livestate-change", t);
  }
  emitError(t, i) {
    this.eventTarget.dispatchEvent(new CustomEvent("livestate-error", {
      detail: {
        kind: t,
        error: i
      }
    }));
  }
  handleChange({ state: t, version: i }) {
    this.state = t, this.stateVersion = i, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
      detail: {
        state: this.state,
        version: this.stateVersion
      }
    }));
  }
  handlePatch({ patch: t, version: i }) {
    if (this.eventTarget.dispatchEvent(new CustomEvent("livestate-patch", {
      detail: { patch: t, version: i }
    })), i === this.stateVersion + 1) {
      const { doc: n, res: r } = Lu(this.state, t, { mutate: !1 });
      this.state = n, this.stateVersion = i, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
        detail: {
          state: this.state,
          version: this.stateVersion
        }
      }));
    } else
      this.channel.push("lvs_refresh");
  }
  pushEvent(t, i) {
    this.dispatchEvent(new CustomEvent(t, { detail: i }));
  }
  /** Pushes the event over the channel, adding the `lvs_evt:` prefix and using the CustomEvent
   * detail property as the payload
   */
  dispatchEvent(t) {
    return this.channel.push(`lvs_evt:${t.type}`, t.detail), !0;
  }
  pushCustomEvent(t) {
    this.dispatchEvent(t);
  }
}
const Gu = (e, t, { properties: i, attributes: n, events: r }) => {
  var s, a;
  t.liveState !== e && (e.connect(), i == null || i.forEach((o) => Wu(e, t, o)), n == null || n.forEach((o) => zu(e, t, o)), (s = r == null ? void 0 : r.send) == null || s.forEach((o) => Qu(e, t, o)), (a = r == null ? void 0 : r.receive) == null || a.forEach((o) => Zu(e, t, o)), t.liveState = e);
}, Wu = (e, t, i) => {
  e.addEventListener("livestate-change", ({ detail: { state: n } }) => {
    t[i] = n[i];
  });
}, zu = (e, t, i) => {
  e.addEventListener("livestate-change", ({ detail: { state: n } }) => {
    t.setAttribute(i, n[i]);
  });
}, Zu = (e, t, i) => {
  e.addEventListener(i, ({ detail: n }) => {
    t.dispatchEvent(new CustomEvent(i, { detail: n }));
  });
}, Qu = (e, t, i) => {
  t.addEventListener(i, (n) => {
    const { detail: r } = n;
    e.dispatchEvent(new CustomEvent(i, { detail: r }));
  });
};
Promise.resolve();
var Vs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
var Hs;
(function(e) {
  (function(t) {
    var i = typeof Vs == "object" ? Vs : typeof self == "object" ? self : typeof this == "object" ? this : Function("return this;")(), n = r(e);
    typeof i.Reflect > "u" ? i.Reflect = e : n = r(i.Reflect, n), t(n);
    function r(s, a) {
      return function(o, c) {
        typeof s[o] != "function" && Object.defineProperty(s, o, { configurable: !0, writable: !0, value: c }), a && a(o, c);
      };
    }
  })(function(t) {
    var i = Object.prototype.hasOwnProperty, n = typeof Symbol == "function", r = n && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", s = n && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", a = typeof Object.create == "function", o = { __proto__: [] } instanceof Array, c = !a && !o, d = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: a ? function() {
        return j(/* @__PURE__ */ Object.create(null));
      } : o ? function() {
        return j({ __proto__: null });
      } : function() {
        return j({});
      },
      has: c ? function(y, S) {
        return i.call(y, S);
      } : function(y, S) {
        return S in y;
      },
      get: c ? function(y, S) {
        return i.call(y, S) ? y[S] : void 0;
      } : function(y, S) {
        return y[S];
      }
    }, u = Object.getPrototypeOf(Function), l = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", h = !l && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : $t(), f = !l && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Ft(), p = !l && typeof WeakMap == "function" ? WeakMap : Bt(), m = new p();
    function C(y, S, _, R) {
      if (q(_)) {
        if (!te(y))
          throw new TypeError();
        if (!_t(S))
          throw new TypeError();
        return x(y, S);
      } else {
        if (!te(y))
          throw new TypeError();
        if (!W(S))
          throw new TypeError();
        if (!W(R) && !q(R) && !me(R))
          throw new TypeError();
        return me(R) && (R = void 0), _ = V(_), X(y, S, _, R);
      }
    }
    t("decorate", C);
    function E(y, S) {
      function _(R, M) {
        if (!W(R))
          throw new TypeError();
        if (!q(M) && !Dt(M))
          throw new TypeError();
        Ee(y, S, R, M);
      }
      return _;
    }
    t("metadata", E);
    function A(y, S, _, R) {
      if (!W(_))
        throw new TypeError();
      return q(R) || (R = V(R)), Ee(y, S, _, R);
    }
    t("defineMetadata", A);
    function I(y, S, _) {
      if (!W(S))
        throw new TypeError();
      return q(_) || (_ = V(_)), Ce(y, S, _);
    }
    t("hasMetadata", I);
    function B(y, S, _) {
      if (!W(S))
        throw new TypeError();
      return q(_) || (_ = V(_)), ke(y, S, _);
    }
    t("hasOwnMetadata", B);
    function ee(y, S, _) {
      if (!W(S))
        throw new TypeError();
      return q(_) || (_ = V(_)), _e(y, S, _);
    }
    t("getMetadata", ee);
    function ae(y, S, _) {
      if (!W(S))
        throw new TypeError();
      return q(_) || (_ = V(_)), Te(y, S, _);
    }
    t("getOwnMetadata", ae);
    function he(y, S) {
      if (!W(y))
        throw new TypeError();
      return q(S) || (S = V(S)), Pe(y, S);
    }
    t("getMetadataKeys", he);
    function de(y, S) {
      if (!W(y))
        throw new TypeError();
      return q(S) || (S = V(S)), we(y, S);
    }
    t("getOwnMetadataKeys", de);
    function L(y, S, _) {
      if (!W(S))
        throw new TypeError();
      q(_) || (_ = V(_));
      var R = ne(
        S,
        _,
        /*Create*/
        !1
      );
      if (q(R) || !R.delete(y))
        return !1;
      if (R.size > 0)
        return !0;
      var M = m.get(S);
      return M.delete(_), M.size > 0 || m.delete(S), !0;
    }
    t("deleteMetadata", L);
    function x(y, S) {
      for (var _ = y.length - 1; _ >= 0; --_) {
        var R = y[_], M = R(S);
        if (!q(M) && !me(M)) {
          if (!_t(M))
            throw new TypeError();
          S = M;
        }
      }
      return S;
    }
    function X(y, S, _, R) {
      for (var M = y.length - 1; M >= 0; --M) {
        var Le = y[M], J = Le(S, _, R);
        if (!q(J) && !me(J)) {
          if (!W(J))
            throw new TypeError();
          R = J;
        }
      }
      return R;
    }
    function ne(y, S, _) {
      var R = m.get(y);
      if (q(R)) {
        if (!_)
          return;
        R = new h(), m.set(y, R);
      }
      var M = R.get(S);
      if (q(M)) {
        if (!_)
          return;
        M = new h(), R.set(S, M);
      }
      return M;
    }
    function Ce(y, S, _) {
      var R = ke(y, S, _);
      if (R)
        return !0;
      var M = at(S);
      return me(M) ? !1 : Ce(y, M, _);
    }
    function ke(y, S, _) {
      var R = ne(
        S,
        _,
        /*Create*/
        !1
      );
      return q(R) ? !1 : Ue(R.has(y));
    }
    function _e(y, S, _) {
      var R = ke(y, S, _);
      if (R)
        return Te(y, S, _);
      var M = at(S);
      if (!me(M))
        return _e(y, M, _);
    }
    function Te(y, S, _) {
      var R = ne(
        S,
        _,
        /*Create*/
        !1
      );
      if (!q(R))
        return R.get(y);
    }
    function Ee(y, S, _, R) {
      var M = ne(
        _,
        R,
        /*Create*/
        !0
      );
      M.set(y, S);
    }
    function Pe(y, S) {
      var _ = we(y, S), R = at(y);
      if (R === null)
        return _;
      var M = Pe(R, S);
      if (M.length <= 0)
        return _;
      if (_.length <= 0)
        return M;
      for (var Le = new f(), J = [], H = 0, $ = _; H < $.length; H++) {
        var Z = $[H], Q = Le.has(Z);
        Q || (Le.add(Z), J.push(Z));
      }
      for (var Gt = 0, Rs = M; Gt < Rs.length; Gt++) {
        var Z = Rs[Gt], Q = Le.has(Z);
        Q || (Le.add(Z), J.push(Z));
      }
      return J;
    }
    function we(y, S) {
      var _ = [], R = ne(
        y,
        S,
        /*Create*/
        !1
      );
      if (q(R))
        return _;
      for (var M = R.keys(), Le = Ut(M), J = 0; ; ) {
        var H = Lt(Le);
        if (!H)
          return _.length = J, _;
        var $ = Mt(H);
        try {
          _[J] = $;
        } catch (Z) {
          try {
            xt(Le);
          } finally {
            throw Z;
          }
        }
        J++;
      }
    }
    function Re(y) {
      if (y === null)
        return 1;
      switch (typeof y) {
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
          return y === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function q(y) {
      return y === void 0;
    }
    function me(y) {
      return y === null;
    }
    function Ae(y) {
      return typeof y == "symbol";
    }
    function W(y) {
      return typeof y == "object" ? y !== null : typeof y == "function";
    }
    function Ie(y, S) {
      switch (Re(y)) {
        case 0:
          return y;
        case 1:
          return y;
        case 2:
          return y;
        case 3:
          return y;
        case 4:
          return y;
        case 5:
          return y;
      }
      var _ = S === 3 ? "string" : S === 5 ? "number" : "default", R = Tt(y, r);
      if (R !== void 0) {
        var M = R.call(y, _);
        if (W(M))
          throw new TypeError();
        return M;
      }
      return De(y, _ === "default" ? "number" : _);
    }
    function De(y, S) {
      if (S === "string") {
        var _ = y.toString;
        if (qe(_)) {
          var R = _.call(y);
          if (!W(R))
            return R;
        }
        var M = y.valueOf;
        if (qe(M)) {
          var R = M.call(y);
          if (!W(R))
            return R;
        }
      } else {
        var M = y.valueOf;
        if (qe(M)) {
          var R = M.call(y);
          if (!W(R))
            return R;
        }
        var Le = y.toString;
        if (qe(Le)) {
          var R = Le.call(y);
          if (!W(R))
            return R;
        }
      }
      throw new TypeError();
    }
    function Ue(y) {
      return !!y;
    }
    function Me(y) {
      return "" + y;
    }
    function V(y) {
      var S = Ie(
        y,
        3
        /* String */
      );
      return Ae(S) ? S : Me(S);
    }
    function te(y) {
      return Array.isArray ? Array.isArray(y) : y instanceof Object ? y instanceof Array : Object.prototype.toString.call(y) === "[object Array]";
    }
    function qe(y) {
      return typeof y == "function";
    }
    function _t(y) {
      return typeof y == "function";
    }
    function Dt(y) {
      switch (Re(y)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function Tt(y, S) {
      var _ = y[S];
      if (_ != null) {
        if (!qe(_))
          throw new TypeError();
        return _;
      }
    }
    function Ut(y) {
      var S = Tt(y, s);
      if (!qe(S))
        throw new TypeError();
      var _ = S.call(y);
      if (!W(_))
        throw new TypeError();
      return _;
    }
    function Mt(y) {
      return y.value;
    }
    function Lt(y) {
      var S = y.next();
      return S.done ? !1 : S;
    }
    function xt(y) {
      var S = y.return;
      S && S.call(y);
    }
    function at(y) {
      var S = Object.getPrototypeOf(y);
      if (typeof y != "function" || y === u || S !== u)
        return S;
      var _ = y.prototype, R = _ && Object.getPrototypeOf(_);
      if (R == null || R === Object.prototype)
        return S;
      var M = R.constructor;
      return typeof M != "function" || M === y ? S : M;
    }
    function $t() {
      var y = {}, S = [], _ = (
        /** @class */
        function() {
          function J(H, $, Z) {
            this._index = 0, this._keys = H, this._values = $, this._selector = Z;
          }
          return J.prototype["@@iterator"] = function() {
            return this;
          }, J.prototype[s] = function() {
            return this;
          }, J.prototype.next = function() {
            var H = this._index;
            if (H >= 0 && H < this._keys.length) {
              var $ = this._selector(this._keys[H], this._values[H]);
              return H + 1 >= this._keys.length ? (this._index = -1, this._keys = S, this._values = S) : this._index++, { value: $, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, J.prototype.throw = function(H) {
            throw this._index >= 0 && (this._index = -1, this._keys = S, this._values = S), H;
          }, J.prototype.return = function(H) {
            return this._index >= 0 && (this._index = -1, this._keys = S, this._values = S), { value: H, done: !0 };
          }, J;
        }()
      );
      return (
        /** @class */
        function() {
          function J() {
            this._keys = [], this._values = [], this._cacheKey = y, this._cacheIndex = -2;
          }
          return Object.defineProperty(J.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), J.prototype.has = function(H) {
            return this._find(
              H,
              /*insert*/
              !1
            ) >= 0;
          }, J.prototype.get = function(H) {
            var $ = this._find(
              H,
              /*insert*/
              !1
            );
            return $ >= 0 ? this._values[$] : void 0;
          }, J.prototype.set = function(H, $) {
            var Z = this._find(
              H,
              /*insert*/
              !0
            );
            return this._values[Z] = $, this;
          }, J.prototype.delete = function(H) {
            var $ = this._find(
              H,
              /*insert*/
              !1
            );
            if ($ >= 0) {
              for (var Z = this._keys.length, Q = $ + 1; Q < Z; Q++)
                this._keys[Q - 1] = this._keys[Q], this._values[Q - 1] = this._values[Q];
              return this._keys.length--, this._values.length--, H === this._cacheKey && (this._cacheKey = y, this._cacheIndex = -2), !0;
            }
            return !1;
          }, J.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = y, this._cacheIndex = -2;
          }, J.prototype.keys = function() {
            return new _(this._keys, this._values, R);
          }, J.prototype.values = function() {
            return new _(this._keys, this._values, M);
          }, J.prototype.entries = function() {
            return new _(this._keys, this._values, Le);
          }, J.prototype["@@iterator"] = function() {
            return this.entries();
          }, J.prototype[s] = function() {
            return this.entries();
          }, J.prototype._find = function(H, $) {
            return this._cacheKey !== H && (this._cacheIndex = this._keys.indexOf(this._cacheKey = H)), this._cacheIndex < 0 && $ && (this._cacheIndex = this._keys.length, this._keys.push(H), this._values.push(void 0)), this._cacheIndex;
          }, J;
        }()
      );
      function R(J, H) {
        return J;
      }
      function M(J, H) {
        return H;
      }
      function Le(J, H) {
        return [J, H];
      }
    }
    function Ft() {
      return (
        /** @class */
        function() {
          function y() {
            this._map = new h();
          }
          return Object.defineProperty(y.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), y.prototype.has = function(S) {
            return this._map.has(S);
          }, y.prototype.add = function(S) {
            return this._map.set(S, S), this;
          }, y.prototype.delete = function(S) {
            return this._map.delete(S);
          }, y.prototype.clear = function() {
            this._map.clear();
          }, y.prototype.keys = function() {
            return this._map.keys();
          }, y.prototype.values = function() {
            return this._map.values();
          }, y.prototype.entries = function() {
            return this._map.entries();
          }, y.prototype["@@iterator"] = function() {
            return this.keys();
          }, y.prototype[s] = function() {
            return this.keys();
          }, y;
        }()
      );
    }
    function Bt() {
      var y = 16, S = d.create(), _ = R();
      return (
        /** @class */
        function() {
          function $() {
            this._key = R();
          }
          return $.prototype.has = function(Z) {
            var Q = M(
              Z,
              /*create*/
              !1
            );
            return Q !== void 0 ? d.has(Q, this._key) : !1;
          }, $.prototype.get = function(Z) {
            var Q = M(
              Z,
              /*create*/
              !1
            );
            return Q !== void 0 ? d.get(Q, this._key) : void 0;
          }, $.prototype.set = function(Z, Q) {
            var Gt = M(
              Z,
              /*create*/
              !0
            );
            return Gt[this._key] = Q, this;
          }, $.prototype.delete = function(Z) {
            var Q = M(
              Z,
              /*create*/
              !1
            );
            return Q !== void 0 ? delete Q[this._key] : !1;
          }, $.prototype.clear = function() {
            this._key = R();
          }, $;
        }()
      );
      function R() {
        var $;
        do
          $ = "@@WeakMap@@" + H();
        while (d.has(S, $));
        return S[$] = !0, $;
      }
      function M($, Z) {
        if (!i.call($, _)) {
          if (!Z)
            return;
          Object.defineProperty($, _, { value: d.create() });
        }
        return $[_];
      }
      function Le($, Z) {
        for (var Q = 0; Q < Z; ++Q)
          $[Q] = Math.random() * 255 | 0;
        return $;
      }
      function J($) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array($)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array($)) : Le(new Uint8Array($), $) : Le(new Array($), $);
      }
      function H() {
        var $ = J(y);
        $[6] = $[6] & 79 | 64, $[8] = $[8] & 191 | 128;
        for (var Z = "", Q = 0; Q < y; ++Q) {
          var Gt = $[Q];
          (Q === 4 || Q === 6 || Q === 8) && (Z += "-"), Gt < 16 && (Z += "0"), Z += Gt.toString(16).toLowerCase();
        }
        return Z;
      }
    }
    function j(y) {
      return y.__ = void 0, delete y.__, y;
    }
  });
})(Hs || (Hs = {}));
function Ku(e, t) {
  return t.forEach(function(i) {
    i && typeof i != "string" && !Array.isArray(i) && Object.keys(i).forEach(function(n) {
      if (n !== "default" && !(n in e)) {
        var r = Object.getOwnPropertyDescriptor(i, n);
        Object.defineProperty(e, n, r.get ? r : {
          enumerable: !0,
          get: function() {
            return i[n];
          }
        });
      }
    });
  }), Object.freeze(e);
}
var Wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ec = { exports: {} };
(function(e) {
  (function(t, i) {
    e.exports ? e.exports = i() : t.log = i();
  })(Wt, function() {
    var t = function() {
    }, i = "undefined", n = typeof window !== i && typeof window.navigator !== i && /Trident\/|MSIE /.test(window.navigator.userAgent), r = ["trace", "debug", "info", "warn", "error"];
    function s(m, C) {
      var E = m[C];
      if (typeof E.bind == "function")
        return E.bind(m);
      try {
        return Function.prototype.bind.call(E, m);
      } catch {
        return function() {
          return Function.prototype.apply.apply(E, [m, arguments]);
        };
      }
    }
    function a() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function o(m) {
      return m === "debug" && (m = "log"), typeof console === i ? !1 : m === "trace" && n ? a : console[m] !== void 0 ? s(console, m) : console.log !== void 0 ? s(console, "log") : t;
    }
    function c(m, C) {
      for (var E = 0; E < r.length; E++) {
        var A = r[E];
        this[A] = E < m ? t : this.methodFactory(A, m, C);
      }
      this.log = this.debug;
    }
    function d(m, C, E) {
      return function() {
        typeof console !== i && (c.call(this, C, E), this[m].apply(this, arguments));
      };
    }
    function u(m, C, E) {
      return o(m) || d.apply(this, arguments);
    }
    function l(m, C, E) {
      var A = this, I;
      C = C ?? "WARN";
      var B = "loglevel";
      typeof m == "string" ? B += ":" + m : typeof m == "symbol" && (B = void 0);
      function ee(L) {
        var x = (r[L] || "silent").toUpperCase();
        if (!(typeof window === i || !B)) {
          try {
            window.localStorage[B] = x;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(B) + "=" + x + ";";
          } catch {
          }
        }
      }
      function ae() {
        var L;
        if (!(typeof window === i || !B)) {
          try {
            L = window.localStorage[B];
          } catch {
          }
          if (typeof L === i)
            try {
              var x = window.document.cookie, X = x.indexOf(encodeURIComponent(B) + "=");
              X !== -1 && (L = /^([^;]+)/.exec(x.slice(X))[1]);
            } catch {
            }
          return A.levels[L] === void 0 && (L = void 0), L;
        }
      }
      function he() {
        if (!(typeof window === i || !B)) {
          try {
            window.localStorage.removeItem(B);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(B) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      A.name = m, A.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, A.methodFactory = E || u, A.getLevel = function() {
        return I;
      }, A.setLevel = function(L, x) {
        if (typeof L == "string" && A.levels[L.toUpperCase()] !== void 0 && (L = A.levels[L.toUpperCase()]), typeof L == "number" && L >= 0 && L <= A.levels.SILENT) {
          if (I = L, x !== !1 && ee(L), c.call(A, L, m), typeof console === i && L < A.levels.SILENT)
            return "No console available for logging";
        } else
          throw "log.setLevel() called with invalid level: " + L;
      }, A.setDefaultLevel = function(L) {
        C = L, ae() || A.setLevel(L, !1);
      }, A.resetLevel = function() {
        A.setLevel(C, !1), he();
      }, A.enableAll = function(L) {
        A.setLevel(A.levels.TRACE, L);
      }, A.disableAll = function(L) {
        A.setLevel(A.levels.SILENT, L);
      };
      var de = ae();
      de == null && (de = C), A.setLevel(de, !1);
    }
    var h = new l(), f = {};
    h.getLogger = function(C) {
      if (typeof C != "symbol" && typeof C != "string" || C === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var E = f[C];
      return E || (E = f[C] = new l(C, h.getLevel(), h.methodFactory)), E;
    };
    var p = typeof window !== i ? window.log : void 0;
    return h.noConflict = function() {
      return typeof window !== i && window.log === h && (window.log = p), h;
    }, h.getLoggers = function() {
      return f;
    }, h.default = h, h;
  });
})(ec);
var tc = ec.exports, Fr;
(function(e) {
  e[e.trace = 0] = "trace", e[e.debug = 1] = "debug", e[e.info = 2] = "info", e[e.warn = 3] = "warn", e[e.error = 4] = "error", e[e.silent = 5] = "silent";
})(Fr || (Fr = {}));
const g = tc.getLogger("livekit");
g.setDefaultLevel(Fr.info);
tc.getLogger("lk-e2ee");
var Yu = re, tt = null;
try {
  tt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {
}
function re(e, t, i) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!i;
}
re.prototype.__isLong__;
Object.defineProperty(re.prototype, "__isLong__", {
  value: !0
});
function Ze(e) {
  return (e && e.__isLong__) === !0;
}
re.isLong = Ze;
var qs = {}, Gs = {};
function di(e, t) {
  var i, n, r;
  return t ? (e >>>= 0, (r = 0 <= e && e < 256) && (n = Gs[e], n) ? n : (i = se(e, (e | 0) < 0 ? -1 : 0, !0), r && (Gs[e] = i), i)) : (e |= 0, (r = -128 <= e && e < 128) && (n = qs[e], n) ? n : (i = se(e, e < 0 ? -1 : 0, !1), r && (qs[e] = i), i));
}
re.fromInt = di;
function it(e, t) {
  if (isNaN(e))
    return t ? ei : nt;
  if (t) {
    if (e < 0)
      return ei;
    if (e >= ic)
      return sc;
  } else {
    if (e <= -zs)
      return We;
    if (e + 1 >= zs)
      return rc;
  }
  return e < 0 ? it(-e, t).neg() : se(e % ji | 0, e / ji | 0, t);
}
re.fromNumber = it;
function se(e, t, i) {
  return new re(e, t, i);
}
re.fromBits = se;
var zn = Math.pow;
function hs(e, t, i) {
  if (e.length === 0)
    throw Error("empty string");
  if (e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return nt;
  if (typeof t == "number" ? (i = t, t = !1) : t = !!t, i = i || 10, i < 2 || 36 < i)
    throw RangeError("radix");
  var n;
  if ((n = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (n === 0)
    return hs(e.substring(1), t, i).neg();
  for (var r = it(zn(i, 8)), s = nt, a = 0; a < e.length; a += 8) {
    var o = Math.min(8, e.length - a), c = parseInt(e.substring(a, a + o), i);
    if (o < 8) {
      var d = it(zn(i, o));
      s = s.mul(d).add(it(c));
    } else
      s = s.mul(r), s = s.add(it(c));
  }
  return s.unsigned = t, s;
}
re.fromString = hs;
function Ct(e, t) {
  return typeof e == "number" ? it(e, t) : typeof e == "string" ? hs(e, t) : se(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
re.fromValue = Ct;
var Ws = 65536, Xu = 1 << 24, ji = Ws * Ws, ic = ji * ji, zs = ic / 2, Zs = di(Xu), nt = di(0);
re.ZERO = nt;
var ei = di(0, !0);
re.UZERO = ei;
var qi = di(1);
re.ONE = qi;
var nc = di(1, !0);
re.UONE = nc;
var Br = di(-1);
re.NEG_ONE = Br;
var rc = se(-1, 2147483647, !1);
re.MAX_VALUE = rc;
var sc = se(-1, -1, !0);
re.MAX_UNSIGNED_VALUE = sc;
var We = se(0, -2147483648, !1);
re.MIN_VALUE = We;
var w = re.prototype;
w.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
w.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * ji + (this.low >>> 0) : this.high * ji + (this.low >>> 0);
};
w.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(We)) {
      var i = it(t), n = this.div(i), r = n.mul(i).sub(this);
      return n.toString(t) + r.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var s = it(zn(t, 6), this.unsigned), a = this, o = ""; ; ) {
    var c = a.div(s), d = a.sub(c.mul(s)).toInt() >>> 0, u = d.toString(t);
    if (a = c, a.isZero())
      return u + o;
    for (; u.length < 6; )
      u = "0" + u;
    o = "" + u + o;
  }
};
w.getHighBits = function() {
  return this.high;
};
w.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
w.getLowBits = function() {
  return this.low;
};
w.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
w.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(We) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, i = 31; i > 0 && !(t & 1 << i); i--)
    ;
  return this.high != 0 ? i + 33 : i + 1;
};
w.isZero = function() {
  return this.high === 0 && this.low === 0;
};
w.eqz = w.isZero;
w.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
w.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
w.isOdd = function() {
  return (this.low & 1) === 1;
};
w.isEven = function() {
  return (this.low & 1) === 0;
};
w.equals = function(t) {
  return Ze(t) || (t = Ct(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
w.eq = w.equals;
w.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
w.neq = w.notEquals;
w.ne = w.notEquals;
w.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
w.lt = w.lessThan;
w.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
w.lte = w.lessThanOrEqual;
w.le = w.lessThanOrEqual;
w.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
w.gt = w.greaterThan;
w.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
w.gte = w.greaterThanOrEqual;
w.ge = w.greaterThanOrEqual;
w.compare = function(t) {
  if (Ze(t) || (t = Ct(t)), this.eq(t))
    return 0;
  var i = this.isNegative(), n = t.isNegative();
  return i && !n ? -1 : !i && n ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
w.comp = w.compare;
w.negate = function() {
  return !this.unsigned && this.eq(We) ? We : this.not().add(qi);
};
w.neg = w.negate;
w.add = function(t) {
  Ze(t) || (t = Ct(t));
  var i = this.high >>> 16, n = this.high & 65535, r = this.low >>> 16, s = this.low & 65535, a = t.high >>> 16, o = t.high & 65535, c = t.low >>> 16, d = t.low & 65535, u = 0, l = 0, h = 0, f = 0;
  return f += s + d, h += f >>> 16, f &= 65535, h += r + c, l += h >>> 16, h &= 65535, l += n + o, u += l >>> 16, l &= 65535, u += i + a, u &= 65535, se(h << 16 | f, u << 16 | l, this.unsigned);
};
w.subtract = function(t) {
  return Ze(t) || (t = Ct(t)), this.add(t.neg());
};
w.sub = w.subtract;
w.multiply = function(t) {
  if (this.isZero())
    return nt;
  if (Ze(t) || (t = Ct(t)), tt) {
    var i = tt.mul(this.low, this.high, t.low, t.high);
    return se(i, tt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return nt;
  if (this.eq(We))
    return t.isOdd() ? We : nt;
  if (t.eq(We))
    return this.isOdd() ? We : nt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Zs) && t.lt(Zs))
    return it(this.toNumber() * t.toNumber(), this.unsigned);
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, a = this.low & 65535, o = t.high >>> 16, c = t.high & 65535, d = t.low >>> 16, u = t.low & 65535, l = 0, h = 0, f = 0, p = 0;
  return p += a * u, f += p >>> 16, p &= 65535, f += s * u, h += f >>> 16, f &= 65535, f += a * d, h += f >>> 16, f &= 65535, h += r * u, l += h >>> 16, h &= 65535, h += s * d, l += h >>> 16, h &= 65535, h += a * c, l += h >>> 16, h &= 65535, l += n * u + r * d + s * c + a * o, l &= 65535, se(f << 16 | p, l << 16 | h, this.unsigned);
};
w.mul = w.multiply;
w.divide = function(t) {
  if (Ze(t) || (t = Ct(t)), t.isZero())
    throw Error("division by zero");
  if (tt) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var i = (this.unsigned ? tt.div_u : tt.div_s)(this.low, this.high, t.low, t.high);
    return se(i, tt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? ei : nt;
  var n, r, s;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return ei;
    if (t.gt(this.shru(1)))
      return nc;
    s = ei;
  } else {
    if (this.eq(We)) {
      if (t.eq(qi) || t.eq(Br))
        return We;
      if (t.eq(We))
        return qi;
      var a = this.shr(1);
      return n = a.div(t).shl(1), n.eq(nt) ? t.isNegative() ? qi : Br : (r = this.sub(t.mul(n)), s = n.add(r.div(t)), s);
    } else if (t.eq(We))
      return this.unsigned ? ei : nt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    s = nt;
  }
  for (r = this; r.gte(t); ) {
    n = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
    for (var o = Math.ceil(Math.log(n) / Math.LN2), c = o <= 48 ? 1 : zn(2, o - 48), d = it(n), u = d.mul(t); u.isNegative() || u.gt(r); )
      n -= c, d = it(n, this.unsigned), u = d.mul(t);
    d.isZero() && (d = qi), s = s.add(d), r = r.sub(u);
  }
  return s;
};
w.div = w.divide;
w.modulo = function(t) {
  if (Ze(t) || (t = Ct(t)), tt) {
    var i = (this.unsigned ? tt.rem_u : tt.rem_s)(this.low, this.high, t.low, t.high);
    return se(i, tt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
w.mod = w.modulo;
w.rem = w.modulo;
w.not = function() {
  return se(~this.low, ~this.high, this.unsigned);
};
w.and = function(t) {
  return Ze(t) || (t = Ct(t)), se(this.low & t.low, this.high & t.high, this.unsigned);
};
w.or = function(t) {
  return Ze(t) || (t = Ct(t)), se(this.low | t.low, this.high | t.high, this.unsigned);
};
w.xor = function(t) {
  return Ze(t) || (t = Ct(t)), se(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
w.shiftLeft = function(t) {
  return Ze(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? se(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : se(0, this.low << t - 32, this.unsigned);
};
w.shl = w.shiftLeft;
w.shiftRight = function(t) {
  return Ze(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? se(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : se(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
w.shr = w.shiftRight;
w.shiftRightUnsigned = function(t) {
  if (Ze(t) && (t = t.toInt()), t &= 63, t === 0)
    return this;
  var i = this.high;
  if (t < 32) {
    var n = this.low;
    return se(n >>> t | i << 32 - t, i >>> t, this.unsigned);
  } else
    return t === 32 ? se(i, 0, this.unsigned) : se(i >>> t - 32, 0, this.unsigned);
};
w.shru = w.shiftRightUnsigned;
w.shr_u = w.shiftRightUnsigned;
w.toSigned = function() {
  return this.unsigned ? se(this.low, this.high, !1) : this;
};
w.toUnsigned = function() {
  return this.unsigned ? this : se(this.low, this.high, !0);
};
w.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
w.toBytesLE = function() {
  var t = this.high, i = this.low;
  return [i & 255, i >>> 8 & 255, i >>> 16 & 255, i >>> 24, t & 255, t >>> 8 & 255, t >>> 16 & 255, t >>> 24];
};
w.toBytesBE = function() {
  var t = this.high, i = this.low;
  return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, t & 255, i >>> 24, i >>> 16 & 255, i >>> 8 & 255, i & 255];
};
re.fromBytes = function(t, i, n) {
  return n ? re.fromBytesLE(t, i) : re.fromBytesBE(t, i);
};
re.fromBytesLE = function(t, i) {
  return new re(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, i);
};
re.fromBytesBE = function(t, i) {
  return new re(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], i);
};
var en = /* @__PURE__ */ nr(Yu), ac = {}, pr = {}, mr, Qs;
function ju() {
  if (Qs)
    return mr;
  Qs = 1, mr = e;
  function e(t, i) {
    for (var n = new Array(arguments.length - 1), r = 0, s = 2, a = !0; s < arguments.length; )
      n[r++] = arguments[s++];
    return new Promise(function(c, d) {
      n[r] = function(l) {
        if (a)
          if (a = !1, l)
            d(l);
          else {
            for (var h = new Array(arguments.length - 1), f = 0; f < h.length; )
              h[f++] = arguments[f];
            c.apply(null, h);
          }
      };
      try {
        t.apply(i || null, n);
      } catch (u) {
        a && (a = !1, d(u));
      }
    });
  }
  return mr;
}
var vr = {}, Ks;
function el() {
  return Ks || (Ks = 1, function(e) {
    var t = e;
    t.length = function(o) {
      var c = o.length;
      if (!c)
        return 0;
      for (var d = 0; --c % 4 > 1 && o.charAt(c) === "="; )
        ++d;
      return Math.ceil(o.length * 3) / 4 - d;
    };
    for (var i = new Array(64), n = new Array(123), r = 0; r < 64; )
      n[i[r] = r < 26 ? r + 65 : r < 52 ? r + 71 : r < 62 ? r - 4 : r - 59 | 43] = r++;
    t.encode = function(o, c, d) {
      for (var u = null, l = [], h = 0, f = 0, p; c < d; ) {
        var m = o[c++];
        switch (f) {
          case 0:
            l[h++] = i[m >> 2], p = (m & 3) << 4, f = 1;
            break;
          case 1:
            l[h++] = i[p | m >> 4], p = (m & 15) << 2, f = 2;
            break;
          case 2:
            l[h++] = i[p | m >> 6], l[h++] = i[m & 63], f = 0;
            break;
        }
        h > 8191 && ((u || (u = [])).push(String.fromCharCode.apply(String, l)), h = 0);
      }
      return f && (l[h++] = i[p], l[h++] = 61, f === 1 && (l[h++] = 61)), u ? (h && u.push(String.fromCharCode.apply(String, l.slice(0, h))), u.join("")) : String.fromCharCode.apply(String, l.slice(0, h));
    };
    var s = "invalid encoding";
    t.decode = function(o, c, d) {
      for (var u = d, l = 0, h, f = 0; f < o.length; ) {
        var p = o.charCodeAt(f++);
        if (p === 61 && l > 1)
          break;
        if ((p = n[p]) === void 0)
          throw Error(s);
        switch (l) {
          case 0:
            h = p, l = 1;
            break;
          case 1:
            c[d++] = h << 2 | (p & 48) >> 4, h = p, l = 2;
            break;
          case 2:
            c[d++] = (h & 15) << 4 | (p & 60) >> 2, h = p, l = 3;
            break;
          case 3:
            c[d++] = (h & 3) << 6 | p, l = 0;
            break;
        }
      }
      if (l === 1)
        throw Error(s);
      return d - u;
    }, t.test = function(o) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(o);
    };
  }(vr)), vr;
}
var gr, Ys;
function tl() {
  if (Ys)
    return gr;
  Ys = 1, gr = e;
  function e() {
    this._listeners = {};
  }
  return e.prototype.on = function(i, n, r) {
    return (this._listeners[i] || (this._listeners[i] = [])).push({
      fn: n,
      ctx: r || this
    }), this;
  }, e.prototype.off = function(i, n) {
    if (i === void 0)
      this._listeners = {};
    else if (n === void 0)
      this._listeners[i] = [];
    else
      for (var r = this._listeners[i], s = 0; s < r.length; )
        r[s].fn === n ? r.splice(s, 1) : ++s;
    return this;
  }, e.prototype.emit = function(i) {
    var n = this._listeners[i];
    if (n) {
      for (var r = [], s = 1; s < arguments.length; )
        r.push(arguments[s++]);
      for (s = 0; s < n.length; )
        n[s].fn.apply(n[s++].ctx, r);
    }
    return this;
  }, gr;
}
var yr, Xs;
function il() {
  if (Xs)
    return yr;
  Xs = 1, yr = e(e);
  function e(s) {
    return typeof Float32Array < "u" ? function() {
      var a = new Float32Array([-0]), o = new Uint8Array(a.buffer), c = o[3] === 128;
      function d(f, p, m) {
        a[0] = f, p[m] = o[0], p[m + 1] = o[1], p[m + 2] = o[2], p[m + 3] = o[3];
      }
      function u(f, p, m) {
        a[0] = f, p[m] = o[3], p[m + 1] = o[2], p[m + 2] = o[1], p[m + 3] = o[0];
      }
      s.writeFloatLE = c ? d : u, s.writeFloatBE = c ? u : d;
      function l(f, p) {
        return o[0] = f[p], o[1] = f[p + 1], o[2] = f[p + 2], o[3] = f[p + 3], a[0];
      }
      function h(f, p) {
        return o[3] = f[p], o[2] = f[p + 1], o[1] = f[p + 2], o[0] = f[p + 3], a[0];
      }
      s.readFloatLE = c ? l : h, s.readFloatBE = c ? h : l;
    }() : function() {
      function a(c, d, u, l) {
        var h = d < 0 ? 1 : 0;
        if (h && (d = -d), d === 0)
          c(1 / d > 0 ? (
            /* positive */
            0
          ) : (
            /* negative 0 */
            2147483648
          ), u, l);
        else if (isNaN(d))
          c(2143289344, u, l);
        else if (d > 34028234663852886e22)
          c((h << 31 | 2139095040) >>> 0, u, l);
        else if (d < 11754943508222875e-54)
          c((h << 31 | Math.round(d / 1401298464324817e-60)) >>> 0, u, l);
        else {
          var f = Math.floor(Math.log(d) / Math.LN2), p = Math.round(d * Math.pow(2, -f) * 8388608) & 8388607;
          c((h << 31 | f + 127 << 23 | p) >>> 0, u, l);
        }
      }
      s.writeFloatLE = a.bind(null, t), s.writeFloatBE = a.bind(null, i);
      function o(c, d, u) {
        var l = c(d, u), h = (l >> 31) * 2 + 1, f = l >>> 23 & 255, p = l & 8388607;
        return f === 255 ? p ? NaN : h * (1 / 0) : f === 0 ? h * 1401298464324817e-60 * p : h * Math.pow(2, f - 150) * (p + 8388608);
      }
      s.readFloatLE = o.bind(null, n), s.readFloatBE = o.bind(null, r);
    }(), typeof Float64Array < "u" ? function() {
      var a = new Float64Array([-0]), o = new Uint8Array(a.buffer), c = o[7] === 128;
      function d(f, p, m) {
        a[0] = f, p[m] = o[0], p[m + 1] = o[1], p[m + 2] = o[2], p[m + 3] = o[3], p[m + 4] = o[4], p[m + 5] = o[5], p[m + 6] = o[6], p[m + 7] = o[7];
      }
      function u(f, p, m) {
        a[0] = f, p[m] = o[7], p[m + 1] = o[6], p[m + 2] = o[5], p[m + 3] = o[4], p[m + 4] = o[3], p[m + 5] = o[2], p[m + 6] = o[1], p[m + 7] = o[0];
      }
      s.writeDoubleLE = c ? d : u, s.writeDoubleBE = c ? u : d;
      function l(f, p) {
        return o[0] = f[p], o[1] = f[p + 1], o[2] = f[p + 2], o[3] = f[p + 3], o[4] = f[p + 4], o[5] = f[p + 5], o[6] = f[p + 6], o[7] = f[p + 7], a[0];
      }
      function h(f, p) {
        return o[7] = f[p], o[6] = f[p + 1], o[5] = f[p + 2], o[4] = f[p + 3], o[3] = f[p + 4], o[2] = f[p + 5], o[1] = f[p + 6], o[0] = f[p + 7], a[0];
      }
      s.readDoubleLE = c ? l : h, s.readDoubleBE = c ? h : l;
    }() : function() {
      function a(c, d, u, l, h, f) {
        var p = l < 0 ? 1 : 0;
        if (p && (l = -l), l === 0)
          c(0, h, f + d), c(1 / l > 0 ? (
            /* positive */
            0
          ) : (
            /* negative 0 */
            2147483648
          ), h, f + u);
        else if (isNaN(l))
          c(0, h, f + d), c(2146959360, h, f + u);
        else if (l > 17976931348623157e292)
          c(0, h, f + d), c((p << 31 | 2146435072) >>> 0, h, f + u);
        else {
          var m;
          if (l < 22250738585072014e-324)
            m = l / 5e-324, c(m >>> 0, h, f + d), c((p << 31 | m / 4294967296) >>> 0, h, f + u);
          else {
            var C = Math.floor(Math.log(l) / Math.LN2);
            C === 1024 && (C = 1023), m = l * Math.pow(2, -C), c(m * 4503599627370496 >>> 0, h, f + d), c((p << 31 | C + 1023 << 20 | m * 1048576 & 1048575) >>> 0, h, f + u);
          }
        }
      }
      s.writeDoubleLE = a.bind(null, t, 0, 4), s.writeDoubleBE = a.bind(null, i, 4, 0);
      function o(c, d, u, l, h) {
        var f = c(l, h + d), p = c(l, h + u), m = (p >> 31) * 2 + 1, C = p >>> 20 & 2047, E = 4294967296 * (p & 1048575) + f;
        return C === 2047 ? E ? NaN : m * (1 / 0) : C === 0 ? m * 5e-324 * E : m * Math.pow(2, C - 1075) * (E + 4503599627370496);
      }
      s.readDoubleLE = o.bind(null, n, 0, 4), s.readDoubleBE = o.bind(null, r, 4, 0);
    }(), s;
  }
  function t(s, a, o) {
    a[o] = s & 255, a[o + 1] = s >>> 8 & 255, a[o + 2] = s >>> 16 & 255, a[o + 3] = s >>> 24;
  }
  function i(s, a, o) {
    a[o] = s >>> 24, a[o + 1] = s >>> 16 & 255, a[o + 2] = s >>> 8 & 255, a[o + 3] = s & 255;
  }
  function n(s, a) {
    return (s[a] | s[a + 1] << 8 | s[a + 2] << 16 | s[a + 3] << 24) >>> 0;
  }
  function r(s, a) {
    return (s[a] << 24 | s[a + 1] << 16 | s[a + 2] << 8 | s[a + 3]) >>> 0;
  }
  return yr;
}
var Sr, js;
function nl() {
  if (js)
    return Sr;
  js = 1, Sr = e;
  function e(t) {
    try {
      var i = void 0;
      if (i && (i.length || Object.keys(i).length))
        return i;
    } catch {
    }
    return null;
  }
  return Sr;
}
var kr = {}, ea;
function rl() {
  return ea || (ea = 1, function(e) {
    var t = e;
    t.length = function(n) {
      for (var r = 0, s = 0, a = 0; a < n.length; ++a)
        s = n.charCodeAt(a), s < 128 ? r += 1 : s < 2048 ? r += 2 : (s & 64512) === 55296 && (n.charCodeAt(a + 1) & 64512) === 56320 ? (++a, r += 4) : r += 3;
      return r;
    }, t.read = function(n, r, s) {
      var a = s - r;
      if (a < 1)
        return "";
      for (var o = null, c = [], d = 0, u; r < s; )
        u = n[r++], u < 128 ? c[d++] = u : u > 191 && u < 224 ? c[d++] = (u & 31) << 6 | n[r++] & 63 : u > 239 && u < 365 ? (u = ((u & 7) << 18 | (n[r++] & 63) << 12 | (n[r++] & 63) << 6 | n[r++] & 63) - 65536, c[d++] = 55296 + (u >> 10), c[d++] = 56320 + (u & 1023)) : c[d++] = (u & 15) << 12 | (n[r++] & 63) << 6 | n[r++] & 63, d > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, c)), d = 0);
      return o ? (d && o.push(String.fromCharCode.apply(String, c.slice(0, d))), o.join("")) : String.fromCharCode.apply(String, c.slice(0, d));
    }, t.write = function(n, r, s) {
      for (var a = s, o, c, d = 0; d < n.length; ++d)
        o = n.charCodeAt(d), o < 128 ? r[s++] = o : o < 2048 ? (r[s++] = o >> 6 | 192, r[s++] = o & 63 | 128) : (o & 64512) === 55296 && ((c = n.charCodeAt(d + 1)) & 64512) === 56320 ? (o = 65536 + ((o & 1023) << 10) + (c & 1023), ++d, r[s++] = o >> 18 | 240, r[s++] = o >> 12 & 63 | 128, r[s++] = o >> 6 & 63 | 128, r[s++] = o & 63 | 128) : (r[s++] = o >> 12 | 224, r[s++] = o >> 6 & 63 | 128, r[s++] = o & 63 | 128);
      return s - a;
    };
  }(kr)), kr;
}
var br, ta;
function sl() {
  if (ta)
    return br;
  ta = 1, br = e;
  function e(t, i, n) {
    var r = n || 8192, s = r >>> 1, a = null, o = r;
    return function(d) {
      if (d < 1 || d > s)
        return t(d);
      o + d > r && (a = t(r), o = 0);
      var u = i.call(a, o, o += d);
      return o & 7 && (o = (o | 7) + 1), u;
    };
  }
  return br;
}
var Cr, ia;
function al() {
  if (ia)
    return Cr;
  ia = 1, Cr = t;
  var e = ui();
  function t(s, a) {
    this.lo = s >>> 0, this.hi = a >>> 0;
  }
  var i = t.zero = new t(0, 0);
  i.toNumber = function() {
    return 0;
  }, i.zzEncode = i.zzDecode = function() {
    return this;
  }, i.length = function() {
    return 1;
  };
  var n = t.zeroHash = "\0\0\0\0\0\0\0\0";
  t.fromNumber = function(a) {
    if (a === 0)
      return i;
    var o = a < 0;
    o && (a = -a);
    var c = a >>> 0, d = (a - c) / 4294967296 >>> 0;
    return o && (d = ~d >>> 0, c = ~c >>> 0, ++c > 4294967295 && (c = 0, ++d > 4294967295 && (d = 0))), new t(c, d);
  }, t.from = function(a) {
    if (typeof a == "number")
      return t.fromNumber(a);
    if (e.isString(a))
      if (e.Long)
        a = e.Long.fromString(a);
      else
        return t.fromNumber(parseInt(a, 10));
    return a.low || a.high ? new t(a.low >>> 0, a.high >>> 0) : i;
  }, t.prototype.toNumber = function(a) {
    if (!a && this.hi >>> 31) {
      var o = ~this.lo + 1 >>> 0, c = ~this.hi >>> 0;
      return o || (c = c + 1 >>> 0), -(o + c * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  }, t.prototype.toLong = function(a) {
    return e.Long ? new e.Long(this.lo | 0, this.hi | 0, !!a) : {
      low: this.lo | 0,
      high: this.hi | 0,
      unsigned: !!a
    };
  };
  var r = String.prototype.charCodeAt;
  return t.fromHash = function(a) {
    return a === n ? i : new t((r.call(a, 0) | r.call(a, 1) << 8 | r.call(a, 2) << 16 | r.call(a, 3) << 24) >>> 0, (r.call(a, 4) | r.call(a, 5) << 8 | r.call(a, 6) << 16 | r.call(a, 7) << 24) >>> 0);
  }, t.prototype.toHash = function() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
  }, t.prototype.zzEncode = function() {
    var a = this.hi >> 31;
    return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ a) >>> 0, this.lo = (this.lo << 1 ^ a) >>> 0, this;
  }, t.prototype.zzDecode = function() {
    var a = -(this.lo & 1);
    return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ a) >>> 0, this.hi = (this.hi >>> 1 ^ a) >>> 0, this;
  }, t.prototype.length = function() {
    var a = this.lo, o = (this.lo >>> 28 | this.hi << 4) >>> 0, c = this.hi >>> 24;
    return c === 0 ? o === 0 ? a < 16384 ? a < 128 ? 1 : 2 : a < 2097152 ? 3 : 4 : o < 16384 ? o < 128 ? 5 : 6 : o < 2097152 ? 7 : 8 : c < 128 ? 9 : 10;
  }, Cr;
}
var na;
function ui() {
  return na || (na = 1, function(e) {
    var t = e;
    t.asPromise = ju(), t.base64 = el(), t.EventEmitter = tl(), t.float = il(), t.inquire = nl(), t.utf8 = rl(), t.pool = sl(), t.LongBits = al(), t.isNode = !!(typeof Wt < "u" && Wt && Wt.process && Wt.process.versions && Wt.process.versions.node), t.global = t.isNode && Wt || typeof window < "u" && window || typeof self < "u" && self || Wt, t.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    ), t.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    ), t.isInteger = Number.isInteger || /* istanbul ignore next */
    function(s) {
      return typeof s == "number" && isFinite(s) && Math.floor(s) === s;
    }, t.isString = function(s) {
      return typeof s == "string" || s instanceof String;
    }, t.isObject = function(s) {
      return s && typeof s == "object";
    }, t.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    t.isSet = function(s, a) {
      var o = s[a];
      return o != null && s.hasOwnProperty(a) ? typeof o != "object" || (Array.isArray(o) ? o.length : Object.keys(o).length) > 0 : !1;
    }, t.Buffer = function() {
      try {
        var r = t.inquire("buffer").Buffer;
        return r.prototype.utf8Write ? r : (
          /* istanbul ignore next */
          null
        );
      } catch {
        return null;
      }
    }(), t._Buffer_from = null, t._Buffer_allocUnsafe = null, t.newBuffer = function(s) {
      return typeof s == "number" ? t.Buffer ? t._Buffer_allocUnsafe(s) : new t.Array(s) : t.Buffer ? t._Buffer_from(s) : typeof Uint8Array > "u" ? s : new Uint8Array(s);
    }, t.Array = typeof Uint8Array < "u" ? Uint8Array : Array, t.Long = /* istanbul ignore next */
    t.global.dcodeIO && /* istanbul ignore next */
    t.global.dcodeIO.Long || /* istanbul ignore next */
    t.global.Long || t.inquire("long"), t.key2Re = /^true|false|0|1$/, t.key32Re = /^-?(?:0|[1-9][0-9]*)$/, t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, t.longToHash = function(s) {
      return s ? t.LongBits.from(s).toHash() : t.LongBits.zeroHash;
    }, t.longFromHash = function(s, a) {
      var o = t.LongBits.fromHash(s);
      return t.Long ? t.Long.fromBits(o.lo, o.hi, a) : o.toNumber(!!a);
    };
    function i(r, s, a) {
      for (var o = Object.keys(s), c = 0; c < o.length; ++c)
        (r[o[c]] === void 0 || !a) && (r[o[c]] = s[o[c]]);
      return r;
    }
    t.merge = i, t.lcFirst = function(s) {
      return s.charAt(0).toLowerCase() + s.substring(1);
    };
    function n(r) {
      function s(a, o) {
        if (!(this instanceof s))
          return new s(a, o);
        Object.defineProperty(this, "message", {
          get: function() {
            return a;
          }
        }), Error.captureStackTrace ? Error.captureStackTrace(this, s) : Object.defineProperty(this, "stack", {
          value: new Error().stack || ""
        }), o && i(this, o);
      }
      return s.prototype = Object.create(Error.prototype, {
        constructor: {
          value: s,
          writable: !0,
          enumerable: !1,
          configurable: !0
        },
        name: {
          get: function() {
            return r;
          },
          set: void 0,
          enumerable: !1,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: !0
        },
        toString: {
          value: function() {
            return this.name + ": " + this.message;
          },
          writable: !0,
          enumerable: !1,
          configurable: !0
        }
      }), s;
    }
    t.newError = n, t.ProtocolError = n("ProtocolError"), t.oneOfGetter = function(s) {
      for (var a = {}, o = 0; o < s.length; ++o)
        a[s[o]] = 1;
      return function() {
        for (var c = Object.keys(this), d = c.length - 1; d > -1; --d)
          if (a[c[d]] === 1 && this[c[d]] !== void 0 && this[c[d]] !== null)
            return c[d];
      };
    }, t.oneOfSetter = function(s) {
      return function(a) {
        for (var o = 0; o < s.length; ++o)
          s[o] !== a && delete this[s[o]];
      };
    }, t.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: !0
    }, t._configure = function() {
      var r = t.Buffer;
      if (!r) {
        t._Buffer_from = t._Buffer_allocUnsafe = null;
        return;
      }
      t._Buffer_from = r.from !== Uint8Array.from && r.from || /* istanbul ignore next */
      function(a, o) {
        return new r(a, o);
      }, t._Buffer_allocUnsafe = r.allocUnsafe || /* istanbul ignore next */
      function(a) {
        return new r(a);
      };
    };
  }(pr)), pr;
}
var oc = z, st = ui(), Jr, rr = st.LongBits, ra = st.base64, sa = st.utf8;
function On(e, t, i) {
  this.fn = e, this.len = t, this.next = void 0, this.val = i;
}
function fs() {
}
function ol(e) {
  this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states;
}
function z() {
  this.len = 0, this.head = new On(fs, 0, 0), this.tail = this.head, this.states = null;
}
var cc = function() {
  return st.Buffer ? function() {
    return (z.create = function() {
      return new Jr();
    })();
  } : function() {
    return new z();
  };
};
z.create = cc();
z.alloc = function(t) {
  return new st.Array(t);
};
st.Array !== Array && (z.alloc = st.pool(z.alloc, st.Array.prototype.subarray));
z.prototype._push = function(t, i, n) {
  return this.tail = this.tail.next = new On(t, i, n), this.len += i, this;
};
function ps(e, t, i) {
  t[i] = e & 255;
}
function cl(e, t, i) {
  for (; e > 127; )
    t[i++] = e & 127 | 128, e >>>= 7;
  t[i] = e;
}
function ms(e, t) {
  this.len = e, this.next = void 0, this.val = t;
}
ms.prototype = Object.create(On.prototype);
ms.prototype.fn = cl;
z.prototype.uint32 = function(t) {
  return this.len += (this.tail = this.tail.next = new ms((t = t >>> 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this;
};
z.prototype.int32 = function(t) {
  return t < 0 ? this._push(vs, 10, rr.fromNumber(t)) : this.uint32(t);
};
z.prototype.sint32 = function(t) {
  return this.uint32((t << 1 ^ t >> 31) >>> 0);
};
function vs(e, t, i) {
  for (; e.hi; )
    t[i++] = e.lo & 127 | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;
  for (; e.lo > 127; )
    t[i++] = e.lo & 127 | 128, e.lo = e.lo >>> 7;
  t[i++] = e.lo;
}
z.prototype.uint64 = function(t) {
  var i = rr.from(t);
  return this._push(vs, i.length(), i);
};
z.prototype.int64 = z.prototype.uint64;
z.prototype.sint64 = function(t) {
  var i = rr.from(t).zzEncode();
  return this._push(vs, i.length(), i);
};
z.prototype.bool = function(t) {
  return this._push(ps, 1, t ? 1 : 0);
};
function Vr(e, t, i) {
  t[i] = e & 255, t[i + 1] = e >>> 8 & 255, t[i + 2] = e >>> 16 & 255, t[i + 3] = e >>> 24;
}
z.prototype.fixed32 = function(t) {
  return this._push(Vr, 4, t >>> 0);
};
z.prototype.sfixed32 = z.prototype.fixed32;
z.prototype.fixed64 = function(t) {
  var i = rr.from(t);
  return this._push(Vr, 4, i.lo)._push(Vr, 4, i.hi);
};
z.prototype.sfixed64 = z.prototype.fixed64;
z.prototype.float = function(t) {
  return this._push(st.float.writeFloatLE, 4, t);
};
z.prototype.double = function(t) {
  return this._push(st.float.writeDoubleLE, 8, t);
};
var dl = st.Array.prototype.set ? function(t, i, n) {
  i.set(t, n);
} : function(t, i, n) {
  for (var r = 0; r < t.length; ++r)
    i[n + r] = t[r];
};
z.prototype.bytes = function(t) {
  var i = t.length >>> 0;
  if (!i)
    return this._push(ps, 1, 0);
  if (st.isString(t)) {
    var n = z.alloc(i = ra.length(t));
    ra.decode(t, n, 0), t = n;
  }
  return this.uint32(i)._push(dl, i, t);
};
z.prototype.string = function(t) {
  var i = sa.length(t);
  return i ? this.uint32(i)._push(sa.write, i, t) : this._push(ps, 1, 0);
};
z.prototype.fork = function() {
  return this.states = new ol(this), this.head = this.tail = new On(fs, 0, 0), this.len = 0, this;
};
z.prototype.reset = function() {
  return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new On(fs, 0, 0), this.len = 0), this;
};
z.prototype.ldelim = function() {
  var t = this.head, i = this.tail, n = this.len;
  return this.reset().uint32(n), n && (this.tail.next = t.next, this.tail = i, this.len += n), this;
};
z.prototype.finish = function() {
  for (var t = this.head.next, i = this.constructor.alloc(this.len), n = 0; t; )
    t.fn(t.val, i, n), n += t.len, t = t.next;
  return i;
};
z._configure = function(e) {
  Jr = e, z.create = cc(), Jr._configure();
};
var ul = Nt, dc = oc;
(Nt.prototype = Object.create(dc.prototype)).constructor = Nt;
var Qt = ui();
function Nt() {
  dc.call(this);
}
Nt._configure = function() {
  Nt.alloc = Qt._Buffer_allocUnsafe, Nt.writeBytesBuffer = Qt.Buffer && Qt.Buffer.prototype instanceof Uint8Array && Qt.Buffer.prototype.set.name === "set" ? function(t, i, n) {
    i.set(t, n);
  } : function(t, i, n) {
    if (t.copy)
      t.copy(i, n, 0, t.length);
    else
      for (var r = 0; r < t.length; )
        i[n++] = t[r++];
  };
};
Nt.prototype.bytes = function(t) {
  Qt.isString(t) && (t = Qt._Buffer_from(t, "base64"));
  var i = t.length >>> 0;
  return this.uint32(i), i && this._push(Nt.writeBytesBuffer, i, t), this;
};
function ll(e, t, i) {
  e.length < 40 ? Qt.utf8.write(e, t, i) : t.utf8Write ? t.utf8Write(e, i) : t.write(e, i);
}
Nt.prototype.string = function(t) {
  var i = Qt.Buffer.byteLength(t);
  return this.uint32(i), i && this._push(ll, i, t), this;
};
Nt._configure();
var uc = ye, It = ui(), Hr, lc = It.LongBits, hl = It.utf8;
function kt(e, t) {
  return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);
}
function ye(e) {
  this.buf = e, this.pos = 0, this.len = e.length;
}
var aa = typeof Uint8Array < "u" ? function(t) {
  if (t instanceof Uint8Array || Array.isArray(t))
    return new ye(t);
  throw Error("illegal buffer");
} : function(t) {
  if (Array.isArray(t))
    return new ye(t);
  throw Error("illegal buffer");
}, hc = function() {
  return It.Buffer ? function(i) {
    return (ye.create = function(r) {
      return It.Buffer.isBuffer(r) ? new Hr(r) : aa(r);
    })(i);
  } : aa;
};
ye.create = hc();
ye.prototype._slice = It.Array.prototype.subarray || /* istanbul ignore next */
It.Array.prototype.slice;
ye.prototype.uint32 = function() {
  var t = 4294967295;
  return function() {
    if (t = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128 || (t = (t | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) || (t = (t | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) || (t = (t | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) || (t = (t | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128))
      return t;
    if ((this.pos += 5) > this.len)
      throw this.pos = this.len, kt(this, 10);
    return t;
  };
}();
ye.prototype.int32 = function() {
  return this.uint32() | 0;
};
ye.prototype.sint32 = function() {
  var t = this.uint32();
  return t >>> 1 ^ -(t & 1) | 0;
};
function _r() {
  var e = new lc(0, 0), t = 0;
  if (this.len - this.pos > 4) {
    for (; t < 4; ++t)
      if (e.lo = (e.lo | (this.buf[this.pos] & 127) << t * 7) >>> 0, this.buf[this.pos++] < 128)
        return e;
    if (e.lo = (e.lo | (this.buf[this.pos] & 127) << 28) >>> 0, e.hi = (e.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128)
      return e;
    t = 0;
  } else {
    for (; t < 3; ++t) {
      if (this.pos >= this.len)
        throw kt(this);
      if (e.lo = (e.lo | (this.buf[this.pos] & 127) << t * 7) >>> 0, this.buf[this.pos++] < 128)
        return e;
    }
    return e.lo = (e.lo | (this.buf[this.pos++] & 127) << t * 7) >>> 0, e;
  }
  if (this.len - this.pos > 4) {
    for (; t < 5; ++t)
      if (e.hi = (e.hi | (this.buf[this.pos] & 127) << t * 7 + 3) >>> 0, this.buf[this.pos++] < 128)
        return e;
  } else
    for (; t < 5; ++t) {
      if (this.pos >= this.len)
        throw kt(this);
      if (e.hi = (e.hi | (this.buf[this.pos] & 127) << t * 7 + 3) >>> 0, this.buf[this.pos++] < 128)
        return e;
    }
  throw Error("invalid varint encoding");
}
ye.prototype.bool = function() {
  return this.uint32() !== 0;
};
function Zn(e, t) {
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}
ye.prototype.fixed32 = function() {
  if (this.pos + 4 > this.len)
    throw kt(this, 4);
  return Zn(this.buf, this.pos += 4);
};
ye.prototype.sfixed32 = function() {
  if (this.pos + 4 > this.len)
    throw kt(this, 4);
  return Zn(this.buf, this.pos += 4) | 0;
};
function oa() {
  if (this.pos + 8 > this.len)
    throw kt(this, 8);
  return new lc(Zn(this.buf, this.pos += 4), Zn(this.buf, this.pos += 4));
}
ye.prototype.float = function() {
  if (this.pos + 4 > this.len)
    throw kt(this, 4);
  var t = It.float.readFloatLE(this.buf, this.pos);
  return this.pos += 4, t;
};
ye.prototype.double = function() {
  if (this.pos + 8 > this.len)
    throw kt(this, 4);
  var t = It.float.readDoubleLE(this.buf, this.pos);
  return this.pos += 8, t;
};
ye.prototype.bytes = function() {
  var t = this.uint32(), i = this.pos, n = this.pos + t;
  if (n > this.len)
    throw kt(this, t);
  return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(i, n) : i === n ? new this.buf.constructor(0) : this._slice.call(this.buf, i, n);
};
ye.prototype.string = function() {
  var t = this.bytes();
  return hl.read(t, 0, t.length);
};
ye.prototype.skip = function(t) {
  if (typeof t == "number") {
    if (this.pos + t > this.len)
      throw kt(this, t);
    this.pos += t;
  } else
    do
      if (this.pos >= this.len)
        throw kt(this);
    while (this.buf[this.pos++] & 128);
  return this;
};
ye.prototype.skipType = function(e) {
  switch (e) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      for (; (e = this.uint32() & 7) !== 4; )
        this.skipType(e);
      break;
    case 5:
      this.skip(4);
      break;
    default:
      throw Error("invalid wire type " + e + " at offset " + this.pos);
  }
  return this;
};
ye._configure = function(e) {
  Hr = e, ye.create = hc(), Hr._configure();
  var t = It.Long ? "toLong" : (
    /* istanbul ignore next */
    "toNumber"
  );
  It.merge(ye.prototype, {
    int64: function() {
      return _r.call(this)[t](!1);
    },
    uint64: function() {
      return _r.call(this)[t](!0);
    },
    sint64: function() {
      return _r.call(this).zzDecode()[t](!1);
    },
    fixed64: function() {
      return oa.call(this)[t](!0);
    },
    sfixed64: function() {
      return oa.call(this)[t](!1);
    }
  });
};
var fl = oi, fc = uc;
(oi.prototype = Object.create(fc.prototype)).constructor = oi;
var ca = ui();
function oi(e) {
  fc.call(this, e);
}
oi._configure = function() {
  ca.Buffer && (oi.prototype._slice = ca.Buffer.prototype.slice);
};
oi.prototype.string = function() {
  var t = this.uint32();
  return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + t, this.len));
};
oi._configure();
var pc = {}, pl = Cn, gs = ui();
(Cn.prototype = Object.create(gs.EventEmitter.prototype)).constructor = Cn;
function Cn(e, t, i) {
  if (typeof e != "function")
    throw TypeError("rpcImpl must be a function");
  gs.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = !!t, this.responseDelimited = !!i;
}
Cn.prototype.rpcCall = function e(t, i, n, r, s) {
  if (!r)
    throw TypeError("request must be specified");
  var a = this;
  if (!s)
    return gs.asPromise(e, a, t, i, n, r);
  if (!a.rpcImpl) {
    setTimeout(function() {
      s(Error("already ended"));
    }, 0);
    return;
  }
  try {
    return a.rpcImpl(t, i[a.requestDelimited ? "encodeDelimited" : "encode"](r).finish(), function(c, d) {
      if (c)
        return a.emit("error", c, t), s(c);
      if (d === null) {
        a.end(
          /* endedByRPC */
          !0
        );
        return;
      }
      if (!(d instanceof n))
        try {
          d = n[a.responseDelimited ? "decodeDelimited" : "decode"](d);
        } catch (u) {
          return a.emit("error", u, t), s(u);
        }
      return a.emit("data", d, t), s(null, d);
    });
  } catch (o) {
    a.emit("error", o, t), setTimeout(function() {
      s(o);
    }, 0);
    return;
  }
};
Cn.prototype.end = function(t) {
  return this.rpcImpl && (t || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
};
(function(e) {
  var t = e;
  t.Service = pl;
})(pc);
var ml = {};
(function(e) {
  var t = e;
  t.build = "minimal", t.Writer = oc, t.BufferWriter = ul, t.Reader = uc, t.BufferReader = fl, t.util = ui(), t.rpc = pc, t.roots = ml, t.configure = i;
  function i() {
    t.util._configure(), t.Writer._configure(t.BufferWriter), t.Reader._configure(t.BufferReader);
  }
  i();
})(ac);
var vl = ac, v = /* @__PURE__ */ nr(vl);
(() => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw "Unable to locate global object";
})();
v.util.Long !== en && (v.util.Long = en, v.configure());
var da;
(function(e) {
  e[e.DEFAULT_AC = 0] = "DEFAULT_AC", e[e.OPUS = 1] = "OPUS", e[e.AAC = 2] = "AAC", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(da || (da = {}));
var ua;
(function(e) {
  e[e.DEFAULT_VC = 0] = "DEFAULT_VC", e[e.H264_BASELINE = 1] = "H264_BASELINE", e[e.H264_MAIN = 2] = "H264_MAIN", e[e.H264_HIGH = 3] = "H264_HIGH", e[e.VP8 = 4] = "VP8", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(ua || (ua = {}));
var be;
(function(e) {
  e[e.AUDIO = 0] = "AUDIO", e[e.VIDEO = 1] = "VIDEO", e[e.DATA = 2] = "DATA", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(be || (be = {}));
function mc(e) {
  switch (e) {
    case 0:
    case "AUDIO":
      return be.AUDIO;
    case 1:
    case "VIDEO":
      return be.VIDEO;
    case 2:
    case "DATA":
      return be.DATA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return be.UNRECOGNIZED;
  }
}
function vc(e) {
  switch (e) {
    case be.AUDIO:
      return "AUDIO";
    case be.VIDEO:
      return "VIDEO";
    case be.DATA:
      return "DATA";
    case be.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var ie;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.CAMERA = 1] = "CAMERA", e[e.MICROPHONE = 2] = "MICROPHONE", e[e.SCREEN_SHARE = 3] = "SCREEN_SHARE", e[e.SCREEN_SHARE_AUDIO = 4] = "SCREEN_SHARE_AUDIO", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(ie || (ie = {}));
function ys(e) {
  switch (e) {
    case 0:
    case "UNKNOWN":
      return ie.UNKNOWN;
    case 1:
    case "CAMERA":
      return ie.CAMERA;
    case 2:
    case "MICROPHONE":
      return ie.MICROPHONE;
    case 3:
    case "SCREEN_SHARE":
      return ie.SCREEN_SHARE;
    case 4:
    case "SCREEN_SHARE_AUDIO":
      return ie.SCREEN_SHARE_AUDIO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ie.UNRECOGNIZED;
  }
}
function Ss(e) {
  switch (e) {
    case ie.UNKNOWN:
      return "UNKNOWN";
    case ie.CAMERA:
      return "CAMERA";
    case ie.MICROPHONE:
      return "MICROPHONE";
    case ie.SCREEN_SHARE:
      return "SCREEN_SHARE";
    case ie.SCREEN_SHARE_AUDIO:
      return "SCREEN_SHARE_AUDIO";
    case ie.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var le;
(function(e) {
  e[e.LOW = 0] = "LOW", e[e.MEDIUM = 1] = "MEDIUM", e[e.HIGH = 2] = "HIGH", e[e.OFF = 3] = "OFF", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(le || (le = {}));
function ks(e) {
  switch (e) {
    case 0:
    case "LOW":
      return le.LOW;
    case 1:
    case "MEDIUM":
      return le.MEDIUM;
    case 2:
    case "HIGH":
      return le.HIGH;
    case 3:
    case "OFF":
      return le.OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return le.UNRECOGNIZED;
  }
}
function bs(e) {
  switch (e) {
    case le.LOW:
      return "LOW";
    case le.MEDIUM:
      return "MEDIUM";
    case le.HIGH:
      return "HIGH";
    case le.OFF:
      return "OFF";
    case le.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var Xe;
(function(e) {
  e[e.POOR = 0] = "POOR", e[e.GOOD = 1] = "GOOD", e[e.EXCELLENT = 2] = "EXCELLENT", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Xe || (Xe = {}));
function gl(e) {
  switch (e) {
    case 0:
    case "POOR":
      return Xe.POOR;
    case 1:
    case "GOOD":
      return Xe.GOOD;
    case 2:
    case "EXCELLENT":
      return Xe.EXCELLENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Xe.UNRECOGNIZED;
  }
}
function yl(e) {
  switch (e) {
    case Xe.POOR:
      return "POOR";
    case Xe.GOOD:
      return "GOOD";
    case Xe.EXCELLENT:
      return "EXCELLENT";
    case Xe.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var rt;
(function(e) {
  e[e.UNSET = 0] = "UNSET", e[e.DISABLED = 1] = "DISABLED", e[e.ENABLED = 2] = "ENABLED", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(rt || (rt = {}));
function qr(e) {
  switch (e) {
    case 0:
    case "UNSET":
      return rt.UNSET;
    case 1:
    case "DISABLED":
      return rt.DISABLED;
    case 2:
    case "ENABLED":
      return rt.ENABLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return rt.UNRECOGNIZED;
  }
}
function Gr(e) {
  switch (e) {
    case rt.UNSET:
      return "UNSET";
    case rt.DISABLED:
      return "DISABLED";
    case rt.ENABLED:
      return "ENABLED";
    case rt.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var ue;
(function(e) {
  e[e.UNKNOWN_REASON = 0] = "UNKNOWN_REASON", e[e.CLIENT_INITIATED = 1] = "CLIENT_INITIATED", e[e.DUPLICATE_IDENTITY = 2] = "DUPLICATE_IDENTITY", e[e.SERVER_SHUTDOWN = 3] = "SERVER_SHUTDOWN", e[e.PARTICIPANT_REMOVED = 4] = "PARTICIPANT_REMOVED", e[e.ROOM_DELETED = 5] = "ROOM_DELETED", e[e.STATE_MISMATCH = 6] = "STATE_MISMATCH", e[e.JOIN_FAILURE = 7] = "JOIN_FAILURE", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(ue || (ue = {}));
function Sl(e) {
  switch (e) {
    case 0:
    case "UNKNOWN_REASON":
      return ue.UNKNOWN_REASON;
    case 1:
    case "CLIENT_INITIATED":
      return ue.CLIENT_INITIATED;
    case 2:
    case "DUPLICATE_IDENTITY":
      return ue.DUPLICATE_IDENTITY;
    case 3:
    case "SERVER_SHUTDOWN":
      return ue.SERVER_SHUTDOWN;
    case 4:
    case "PARTICIPANT_REMOVED":
      return ue.PARTICIPANT_REMOVED;
    case 5:
    case "ROOM_DELETED":
      return ue.ROOM_DELETED;
    case 6:
    case "STATE_MISMATCH":
      return ue.STATE_MISMATCH;
    case 7:
    case "JOIN_FAILURE":
      return ue.JOIN_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ue.UNRECOGNIZED;
  }
}
function kl(e) {
  switch (e) {
    case ue.UNKNOWN_REASON:
      return "UNKNOWN_REASON";
    case ue.CLIENT_INITIATED:
      return "CLIENT_INITIATED";
    case ue.DUPLICATE_IDENTITY:
      return "DUPLICATE_IDENTITY";
    case ue.SERVER_SHUTDOWN:
      return "SERVER_SHUTDOWN";
    case ue.PARTICIPANT_REMOVED:
      return "PARTICIPANT_REMOVED";
    case ue.ROOM_DELETED:
      return "ROOM_DELETED";
    case ue.STATE_MISMATCH:
      return "STATE_MISMATCH";
    case ue.JOIN_FAILURE:
      return "JOIN_FAILURE";
    case ue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var ct;
(function(e) {
  e[e.RR_UNKNOWN = 0] = "RR_UNKNOWN", e[e.RR_SIGNAL_DISCONNECTED = 1] = "RR_SIGNAL_DISCONNECTED", e[e.RR_PUBLISHER_FAILED = 2] = "RR_PUBLISHER_FAILED", e[e.RR_SUBSCRIBER_FAILED = 3] = "RR_SUBSCRIBER_FAILED", e[e.RR_SWITCH_CANDIDATE = 4] = "RR_SWITCH_CANDIDATE", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(ct || (ct = {}));
var Rt;
(function(e) {
  e[e.SE_UNKNOWN = 0] = "SE_UNKNOWN", e[e.SE_CODEC_UNSUPPORTED = 1] = "SE_CODEC_UNSUPPORTED", e[e.SE_TRACK_NOTFOUND = 2] = "SE_TRACK_NOTFOUND", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Rt || (Rt = {}));
function bl(e) {
  switch (e) {
    case 0:
    case "SE_UNKNOWN":
      return Rt.SE_UNKNOWN;
    case 1:
    case "SE_CODEC_UNSUPPORTED":
      return Rt.SE_CODEC_UNSUPPORTED;
    case 2:
    case "SE_TRACK_NOTFOUND":
      return Rt.SE_TRACK_NOTFOUND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Rt.UNRECOGNIZED;
  }
}
function Cl(e) {
  switch (e) {
    case Rt.SE_UNKNOWN:
      return "SE_UNKNOWN";
    case Rt.SE_CODEC_UNSUPPORTED:
      return "SE_CODEC_UNSUPPORTED";
    case Rt.SE_TRACK_NOTFOUND:
      return "SE_TRACK_NOTFOUND";
    case Rt.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var Ge;
(function(e) {
  e[e.JOINING = 0] = "JOINING", e[e.JOINED = 1] = "JOINED", e[e.ACTIVE = 2] = "ACTIVE", e[e.DISCONNECTED = 3] = "DISCONNECTED", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Ge || (Ge = {}));
function _l(e) {
  switch (e) {
    case 0:
    case "JOINING":
      return Ge.JOINING;
    case 1:
    case "JOINED":
      return Ge.JOINED;
    case 2:
    case "ACTIVE":
      return Ge.ACTIVE;
    case 3:
    case "DISCONNECTED":
      return Ge.DISCONNECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Ge.UNRECOGNIZED;
  }
}
function Tl(e) {
  switch (e) {
    case Ge.JOINING:
      return "JOINING";
    case Ge.JOINED:
      return "JOINED";
    case Ge.ACTIVE:
      return "ACTIVE";
    case Ge.DISCONNECTED:
      return "DISCONNECTED";
    case Ge.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var xe;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.GCM = 1] = "GCM", e[e.CUSTOM = 2] = "CUSTOM", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(xe || (xe = {}));
function gc(e) {
  switch (e) {
    case 0:
    case "NONE":
      return xe.NONE;
    case 1:
    case "GCM":
      return xe.GCM;
    case 2:
    case "CUSTOM":
      return xe.CUSTOM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return xe.UNRECOGNIZED;
  }
}
function yc(e) {
  switch (e) {
    case xe.NONE:
      return "NONE";
    case xe.GCM:
      return "GCM";
    case xe.CUSTOM:
      return "CUSTOM";
    case xe.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var Se;
(function(e) {
  e[e.RELIABLE = 0] = "RELIABLE", e[e.LOSSY = 1] = "LOSSY", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Se || (Se = {}));
function El(e) {
  switch (e) {
    case 0:
    case "RELIABLE":
      return Se.RELIABLE;
    case 1:
    case "LOSSY":
      return Se.LOSSY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Se.UNRECOGNIZED;
  }
}
function Pl(e) {
  switch (e) {
    case Se.RELIABLE:
      return "RELIABLE";
    case Se.LOSSY:
      return "LOSSY";
    case Se.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var Kt;
(function(e) {
  e[e.Standard = 0] = "Standard", e[e.Cloud = 1] = "Cloud", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Kt || (Kt = {}));
function wl(e) {
  switch (e) {
    case 0:
    case "Standard":
      return Kt.Standard;
    case 1:
    case "Cloud":
      return Kt.Cloud;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Kt.UNRECOGNIZED;
  }
}
function Rl(e) {
  switch (e) {
    case Kt.Standard:
      return "Standard";
    case Kt.Cloud:
      return "Cloud";
    case Kt.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var pe;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.JS = 1] = "JS", e[e.SWIFT = 2] = "SWIFT", e[e.ANDROID = 3] = "ANDROID", e[e.FLUTTER = 4] = "FLUTTER", e[e.GO = 5] = "GO", e[e.UNITY = 6] = "UNITY", e[e.REACT_NATIVE = 7] = "REACT_NATIVE", e[e.RUST = 8] = "RUST", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(pe || (pe = {}));
function Ol(e) {
  switch (e) {
    case 0:
    case "UNKNOWN":
      return pe.UNKNOWN;
    case 1:
    case "JS":
      return pe.JS;
    case 2:
    case "SWIFT":
      return pe.SWIFT;
    case 3:
    case "ANDROID":
      return pe.ANDROID;
    case 4:
    case "FLUTTER":
      return pe.FLUTTER;
    case 5:
    case "GO":
      return pe.GO;
    case 6:
    case "UNITY":
      return pe.UNITY;
    case 7:
    case "REACT_NATIVE":
      return pe.REACT_NATIVE;
    case 8:
    case "RUST":
      return pe.RUST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return pe.UNRECOGNIZED;
  }
}
function Nl(e) {
  switch (e) {
    case pe.UNKNOWN:
      return "UNKNOWN";
    case pe.JS:
      return "JS";
    case pe.SWIFT:
      return "SWIFT";
    case pe.ANDROID:
      return "ANDROID";
    case pe.FLUTTER:
      return "FLUTTER";
    case pe.GO:
      return "GO";
    case pe.UNITY:
      return "UNITY";
    case pe.REACT_NATIVE:
      return "REACT_NATIVE";
    case pe.RUST:
      return "RUST";
    case pe.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
function la() {
  return {
    sid: "",
    name: "",
    emptyTimeout: 0,
    maxParticipants: 0,
    creationTime: 0,
    turnPassword: "",
    enabledCodecs: [],
    metadata: "",
    numParticipants: 0,
    numPublishers: 0,
    activeRecording: !1
  };
}
const dt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.sid !== "" && t.uint32(10).string(e.sid), e.name !== "" && t.uint32(18).string(e.name), e.emptyTimeout !== 0 && t.uint32(24).uint32(e.emptyTimeout), e.maxParticipants !== 0 && t.uint32(32).uint32(e.maxParticipants), e.creationTime !== 0 && t.uint32(40).int64(e.creationTime), e.turnPassword !== "" && t.uint32(50).string(e.turnPassword);
    for (const i of e.enabledCodecs)
      Fe.encode(i, t.uint32(58).fork()).ldelim();
    return e.metadata !== "" && t.uint32(66).string(e.metadata), e.numParticipants !== 0 && t.uint32(72).uint32(e.numParticipants), e.numPublishers !== 0 && t.uint32(88).uint32(e.numPublishers), e.activeRecording === !0 && t.uint32(80).bool(e.activeRecording), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = la();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.sid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.name = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.emptyTimeout = i.uint32();
          continue;
        case 4:
          if (s !== 32)
            break;
          r.maxParticipants = i.uint32();
          continue;
        case 5:
          if (s !== 40)
            break;
          r.creationTime = kc(i.int64());
          continue;
        case 6:
          if (s !== 50)
            break;
          r.turnPassword = i.string();
          continue;
        case 7:
          if (s !== 58)
            break;
          r.enabledCodecs.push(Fe.decode(i, i.uint32()));
          continue;
        case 8:
          if (s !== 66)
            break;
          r.metadata = i.string();
          continue;
        case 9:
          if (s !== 72)
            break;
          r.numParticipants = i.uint32();
          continue;
        case 11:
          if (s !== 88)
            break;
          r.numPublishers = i.uint32();
          continue;
        case 10:
          if (s !== 80)
            break;
          r.activeRecording = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sid: P(e.sid) ? String(e.sid) : "",
      name: P(e.name) ? String(e.name) : "",
      emptyTimeout: P(e.emptyTimeout) ? Number(e.emptyTimeout) : 0,
      maxParticipants: P(e.maxParticipants) ? Number(e.maxParticipants) : 0,
      creationTime: P(e.creationTime) ? Number(e.creationTime) : 0,
      turnPassword: P(e.turnPassword) ? String(e.turnPassword) : "",
      enabledCodecs: Array.isArray(e == null ? void 0 : e.enabledCodecs) ? e.enabledCodecs.map((t) => Fe.fromJSON(t)) : [],
      metadata: P(e.metadata) ? String(e.metadata) : "",
      numParticipants: P(e.numParticipants) ? Number(e.numParticipants) : 0,
      numPublishers: P(e.numPublishers) ? Number(e.numPublishers) : 0,
      activeRecording: P(e.activeRecording) ? !!e.activeRecording : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.sid !== void 0 && (t.sid = e.sid), e.name !== void 0 && (t.name = e.name), e.emptyTimeout !== void 0 && (t.emptyTimeout = Math.round(e.emptyTimeout)), e.maxParticipants !== void 0 && (t.maxParticipants = Math.round(e.maxParticipants)), e.creationTime !== void 0 && (t.creationTime = Math.round(e.creationTime)), e.turnPassword !== void 0 && (t.turnPassword = e.turnPassword), e.enabledCodecs ? t.enabledCodecs = e.enabledCodecs.map((i) => i ? Fe.toJSON(i) : void 0) : t.enabledCodecs = [], e.metadata !== void 0 && (t.metadata = e.metadata), e.numParticipants !== void 0 && (t.numParticipants = Math.round(e.numParticipants)), e.numPublishers !== void 0 && (t.numPublishers = Math.round(e.numPublishers)), e.activeRecording !== void 0 && (t.activeRecording = e.activeRecording), t;
  },
  create(e) {
    return dt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l;
    const h = la();
    return h.sid = (t = e.sid) !== null && t !== void 0 ? t : "", h.name = (i = e.name) !== null && i !== void 0 ? i : "", h.emptyTimeout = (n = e.emptyTimeout) !== null && n !== void 0 ? n : 0, h.maxParticipants = (r = e.maxParticipants) !== null && r !== void 0 ? r : 0, h.creationTime = (s = e.creationTime) !== null && s !== void 0 ? s : 0, h.turnPassword = (a = e.turnPassword) !== null && a !== void 0 ? a : "", h.enabledCodecs = ((o = e.enabledCodecs) === null || o === void 0 ? void 0 : o.map((f) => Fe.fromPartial(f))) || [], h.metadata = (c = e.metadata) !== null && c !== void 0 ? c : "", h.numParticipants = (d = e.numParticipants) !== null && d !== void 0 ? d : 0, h.numPublishers = (u = e.numPublishers) !== null && u !== void 0 ? u : 0, h.activeRecording = (l = e.activeRecording) !== null && l !== void 0 ? l : !1, h;
  }
};
function ha() {
  return {
    mime: "",
    fmtpLine: ""
  };
}
const Fe = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.mime !== "" && t.uint32(10).string(e.mime), e.fmtpLine !== "" && t.uint32(18).string(e.fmtpLine), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ha();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.mime = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.fmtpLine = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      mime: P(e.mime) ? String(e.mime) : "",
      fmtpLine: P(e.fmtpLine) ? String(e.fmtpLine) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.mime !== void 0 && (t.mime = e.mime), e.fmtpLine !== void 0 && (t.fmtpLine = e.fmtpLine), t;
  },
  create(e) {
    return Fe.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = ha();
    return n.mime = (t = e.mime) !== null && t !== void 0 ? t : "", n.fmtpLine = (i = e.fmtpLine) !== null && i !== void 0 ? i : "", n;
  }
};
function fa() {
  return {
    canSubscribe: !1,
    canPublish: !1,
    canPublishData: !1,
    canPublishSources: [],
    hidden: !1,
    recorder: !1,
    canUpdateMetadata: !1
  };
}
const pi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.canSubscribe === !0 && t.uint32(8).bool(e.canSubscribe), e.canPublish === !0 && t.uint32(16).bool(e.canPublish), e.canPublishData === !0 && t.uint32(24).bool(e.canPublishData), t.uint32(74).fork();
    for (const i of e.canPublishSources)
      t.int32(i);
    return t.ldelim(), e.hidden === !0 && t.uint32(56).bool(e.hidden), e.recorder === !0 && t.uint32(64).bool(e.recorder), e.canUpdateMetadata === !0 && t.uint32(80).bool(e.canUpdateMetadata), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = fa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.canSubscribe = i.bool();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.canPublish = i.bool();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.canPublishData = i.bool();
          continue;
        case 9:
          if (s === 72) {
            r.canPublishSources.push(i.int32());
            continue;
          }
          if (s === 74) {
            const a = i.uint32() + i.pos;
            for (; i.pos < a; )
              r.canPublishSources.push(i.int32());
            continue;
          }
          break;
        case 7:
          if (s !== 56)
            break;
          r.hidden = i.bool();
          continue;
        case 8:
          if (s !== 64)
            break;
          r.recorder = i.bool();
          continue;
        case 10:
          if (s !== 80)
            break;
          r.canUpdateMetadata = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      canSubscribe: P(e.canSubscribe) ? !!e.canSubscribe : !1,
      canPublish: P(e.canPublish) ? !!e.canPublish : !1,
      canPublishData: P(e.canPublishData) ? !!e.canPublishData : !1,
      canPublishSources: Array.isArray(e == null ? void 0 : e.canPublishSources) ? e.canPublishSources.map((t) => ys(t)) : [],
      hidden: P(e.hidden) ? !!e.hidden : !1,
      recorder: P(e.recorder) ? !!e.recorder : !1,
      canUpdateMetadata: P(e.canUpdateMetadata) ? !!e.canUpdateMetadata : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.canSubscribe !== void 0 && (t.canSubscribe = e.canSubscribe), e.canPublish !== void 0 && (t.canPublish = e.canPublish), e.canPublishData !== void 0 && (t.canPublishData = e.canPublishData), e.canPublishSources ? t.canPublishSources = e.canPublishSources.map((i) => Ss(i)) : t.canPublishSources = [], e.hidden !== void 0 && (t.hidden = e.hidden), e.recorder !== void 0 && (t.recorder = e.recorder), e.canUpdateMetadata !== void 0 && (t.canUpdateMetadata = e.canUpdateMetadata), t;
  },
  create(e) {
    return pi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o;
    const c = fa();
    return c.canSubscribe = (t = e.canSubscribe) !== null && t !== void 0 ? t : !1, c.canPublish = (i = e.canPublish) !== null && i !== void 0 ? i : !1, c.canPublishData = (n = e.canPublishData) !== null && n !== void 0 ? n : !1, c.canPublishSources = ((r = e.canPublishSources) === null || r === void 0 ? void 0 : r.map((d) => d)) || [], c.hidden = (s = e.hidden) !== null && s !== void 0 ? s : !1, c.recorder = (a = e.recorder) !== null && a !== void 0 ? a : !1, c.canUpdateMetadata = (o = e.canUpdateMetadata) !== null && o !== void 0 ? o : !1, c;
  }
};
function pa() {
  return {
    sid: "",
    identity: "",
    state: 0,
    tracks: [],
    metadata: "",
    joinedAt: 0,
    name: "",
    version: 0,
    permission: void 0,
    region: "",
    isPublisher: !1
  };
}
const Oe = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.sid !== "" && t.uint32(10).string(e.sid), e.identity !== "" && t.uint32(18).string(e.identity), e.state !== 0 && t.uint32(24).int32(e.state);
    for (const i of e.tracks)
      Je.encode(i, t.uint32(34).fork()).ldelim();
    return e.metadata !== "" && t.uint32(42).string(e.metadata), e.joinedAt !== 0 && t.uint32(48).int64(e.joinedAt), e.name !== "" && t.uint32(74).string(e.name), e.version !== 0 && t.uint32(80).uint32(e.version), e.permission !== void 0 && pi.encode(e.permission, t.uint32(90).fork()).ldelim(), e.region !== "" && t.uint32(98).string(e.region), e.isPublisher === !0 && t.uint32(104).bool(e.isPublisher), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = pa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.sid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.identity = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.state = i.int32();
          continue;
        case 4:
          if (s !== 34)
            break;
          r.tracks.push(Je.decode(i, i.uint32()));
          continue;
        case 5:
          if (s !== 42)
            break;
          r.metadata = i.string();
          continue;
        case 6:
          if (s !== 48)
            break;
          r.joinedAt = kc(i.int64());
          continue;
        case 9:
          if (s !== 74)
            break;
          r.name = i.string();
          continue;
        case 10:
          if (s !== 80)
            break;
          r.version = i.uint32();
          continue;
        case 11:
          if (s !== 90)
            break;
          r.permission = pi.decode(i, i.uint32());
          continue;
        case 12:
          if (s !== 98)
            break;
          r.region = i.string();
          continue;
        case 13:
          if (s !== 104)
            break;
          r.isPublisher = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sid: P(e.sid) ? String(e.sid) : "",
      identity: P(e.identity) ? String(e.identity) : "",
      state: P(e.state) ? _l(e.state) : 0,
      tracks: Array.isArray(e == null ? void 0 : e.tracks) ? e.tracks.map((t) => Je.fromJSON(t)) : [],
      metadata: P(e.metadata) ? String(e.metadata) : "",
      joinedAt: P(e.joinedAt) ? Number(e.joinedAt) : 0,
      name: P(e.name) ? String(e.name) : "",
      version: P(e.version) ? Number(e.version) : 0,
      permission: P(e.permission) ? pi.fromJSON(e.permission) : void 0,
      region: P(e.region) ? String(e.region) : "",
      isPublisher: P(e.isPublisher) ? !!e.isPublisher : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.sid !== void 0 && (t.sid = e.sid), e.identity !== void 0 && (t.identity = e.identity), e.state !== void 0 && (t.state = Tl(e.state)), e.tracks ? t.tracks = e.tracks.map((i) => i ? Je.toJSON(i) : void 0) : t.tracks = [], e.metadata !== void 0 && (t.metadata = e.metadata), e.joinedAt !== void 0 && (t.joinedAt = Math.round(e.joinedAt)), e.name !== void 0 && (t.name = e.name), e.version !== void 0 && (t.version = Math.round(e.version)), e.permission !== void 0 && (t.permission = e.permission ? pi.toJSON(e.permission) : void 0), e.region !== void 0 && (t.region = e.region), e.isPublisher !== void 0 && (t.isPublisher = e.isPublisher), t;
  },
  create(e) {
    return Oe.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u;
    const l = pa();
    return l.sid = (t = e.sid) !== null && t !== void 0 ? t : "", l.identity = (i = e.identity) !== null && i !== void 0 ? i : "", l.state = (n = e.state) !== null && n !== void 0 ? n : 0, l.tracks = ((r = e.tracks) === null || r === void 0 ? void 0 : r.map((h) => Je.fromPartial(h))) || [], l.metadata = (s = e.metadata) !== null && s !== void 0 ? s : "", l.joinedAt = (a = e.joinedAt) !== null && a !== void 0 ? a : 0, l.name = (o = e.name) !== null && o !== void 0 ? o : "", l.version = (c = e.version) !== null && c !== void 0 ? c : 0, l.permission = e.permission !== void 0 && e.permission !== null ? pi.fromPartial(e.permission) : void 0, l.region = (d = e.region) !== null && d !== void 0 ? d : "", l.isPublisher = (u = e.isPublisher) !== null && u !== void 0 ? u : !1, l;
  }
};
function ma() {
  return {
    mimeType: "",
    mid: "",
    cid: "",
    layers: []
  };
}
const mi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.mimeType !== "" && t.uint32(10).string(e.mimeType), e.mid !== "" && t.uint32(18).string(e.mid), e.cid !== "" && t.uint32(26).string(e.cid);
    for (const i of e.layers)
      ge.encode(i, t.uint32(34).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ma();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.mimeType = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.mid = i.string();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.cid = i.string();
          continue;
        case 4:
          if (s !== 34)
            break;
          r.layers.push(ge.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      mimeType: P(e.mimeType) ? String(e.mimeType) : "",
      mid: P(e.mid) ? String(e.mid) : "",
      cid: P(e.cid) ? String(e.cid) : "",
      layers: Array.isArray(e == null ? void 0 : e.layers) ? e.layers.map((t) => ge.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.mimeType !== void 0 && (t.mimeType = e.mimeType), e.mid !== void 0 && (t.mid = e.mid), e.cid !== void 0 && (t.cid = e.cid), e.layers ? t.layers = e.layers.map((i) => i ? ge.toJSON(i) : void 0) : t.layers = [], t;
  },
  create(e) {
    return mi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r;
    const s = ma();
    return s.mimeType = (t = e.mimeType) !== null && t !== void 0 ? t : "", s.mid = (i = e.mid) !== null && i !== void 0 ? i : "", s.cid = (n = e.cid) !== null && n !== void 0 ? n : "", s.layers = ((r = e.layers) === null || r === void 0 ? void 0 : r.map((a) => ge.fromPartial(a))) || [], s;
  }
};
function va() {
  return {
    sid: "",
    type: 0,
    name: "",
    muted: !1,
    width: 0,
    height: 0,
    simulcast: !1,
    disableDtx: !1,
    source: 0,
    layers: [],
    mimeType: "",
    mid: "",
    codecs: [],
    stereo: !1,
    disableRed: !1,
    encryption: 0
  };
}
const Je = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.sid !== "" && t.uint32(10).string(e.sid), e.type !== 0 && t.uint32(16).int32(e.type), e.name !== "" && t.uint32(26).string(e.name), e.muted === !0 && t.uint32(32).bool(e.muted), e.width !== 0 && t.uint32(40).uint32(e.width), e.height !== 0 && t.uint32(48).uint32(e.height), e.simulcast === !0 && t.uint32(56).bool(e.simulcast), e.disableDtx === !0 && t.uint32(64).bool(e.disableDtx), e.source !== 0 && t.uint32(72).int32(e.source);
    for (const i of e.layers)
      ge.encode(i, t.uint32(82).fork()).ldelim();
    e.mimeType !== "" && t.uint32(90).string(e.mimeType), e.mid !== "" && t.uint32(98).string(e.mid);
    for (const i of e.codecs)
      mi.encode(i, t.uint32(106).fork()).ldelim();
    return e.stereo === !0 && t.uint32(112).bool(e.stereo), e.disableRed === !0 && t.uint32(120).bool(e.disableRed), e.encryption !== 0 && t.uint32(128).int32(e.encryption), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = va();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.sid = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.type = i.int32();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.name = i.string();
          continue;
        case 4:
          if (s !== 32)
            break;
          r.muted = i.bool();
          continue;
        case 5:
          if (s !== 40)
            break;
          r.width = i.uint32();
          continue;
        case 6:
          if (s !== 48)
            break;
          r.height = i.uint32();
          continue;
        case 7:
          if (s !== 56)
            break;
          r.simulcast = i.bool();
          continue;
        case 8:
          if (s !== 64)
            break;
          r.disableDtx = i.bool();
          continue;
        case 9:
          if (s !== 72)
            break;
          r.source = i.int32();
          continue;
        case 10:
          if (s !== 82)
            break;
          r.layers.push(ge.decode(i, i.uint32()));
          continue;
        case 11:
          if (s !== 90)
            break;
          r.mimeType = i.string();
          continue;
        case 12:
          if (s !== 98)
            break;
          r.mid = i.string();
          continue;
        case 13:
          if (s !== 106)
            break;
          r.codecs.push(mi.decode(i, i.uint32()));
          continue;
        case 14:
          if (s !== 112)
            break;
          r.stereo = i.bool();
          continue;
        case 15:
          if (s !== 120)
            break;
          r.disableRed = i.bool();
          continue;
        case 16:
          if (s !== 128)
            break;
          r.encryption = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sid: P(e.sid) ? String(e.sid) : "",
      type: P(e.type) ? mc(e.type) : 0,
      name: P(e.name) ? String(e.name) : "",
      muted: P(e.muted) ? !!e.muted : !1,
      width: P(e.width) ? Number(e.width) : 0,
      height: P(e.height) ? Number(e.height) : 0,
      simulcast: P(e.simulcast) ? !!e.simulcast : !1,
      disableDtx: P(e.disableDtx) ? !!e.disableDtx : !1,
      source: P(e.source) ? ys(e.source) : 0,
      layers: Array.isArray(e == null ? void 0 : e.layers) ? e.layers.map((t) => ge.fromJSON(t)) : [],
      mimeType: P(e.mimeType) ? String(e.mimeType) : "",
      mid: P(e.mid) ? String(e.mid) : "",
      codecs: Array.isArray(e == null ? void 0 : e.codecs) ? e.codecs.map((t) => mi.fromJSON(t)) : [],
      stereo: P(e.stereo) ? !!e.stereo : !1,
      disableRed: P(e.disableRed) ? !!e.disableRed : !1,
      encryption: P(e.encryption) ? gc(e.encryption) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.sid !== void 0 && (t.sid = e.sid), e.type !== void 0 && (t.type = vc(e.type)), e.name !== void 0 && (t.name = e.name), e.muted !== void 0 && (t.muted = e.muted), e.width !== void 0 && (t.width = Math.round(e.width)), e.height !== void 0 && (t.height = Math.round(e.height)), e.simulcast !== void 0 && (t.simulcast = e.simulcast), e.disableDtx !== void 0 && (t.disableDtx = e.disableDtx), e.source !== void 0 && (t.source = Ss(e.source)), e.layers ? t.layers = e.layers.map((i) => i ? ge.toJSON(i) : void 0) : t.layers = [], e.mimeType !== void 0 && (t.mimeType = e.mimeType), e.mid !== void 0 && (t.mid = e.mid), e.codecs ? t.codecs = e.codecs.map((i) => i ? mi.toJSON(i) : void 0) : t.codecs = [], e.stereo !== void 0 && (t.stereo = e.stereo), e.disableRed !== void 0 && (t.disableRed = e.disableRed), e.encryption !== void 0 && (t.encryption = yc(e.encryption)), t;
  },
  create(e) {
    return Je.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C;
    const E = va();
    return E.sid = (t = e.sid) !== null && t !== void 0 ? t : "", E.type = (i = e.type) !== null && i !== void 0 ? i : 0, E.name = (n = e.name) !== null && n !== void 0 ? n : "", E.muted = (r = e.muted) !== null && r !== void 0 ? r : !1, E.width = (s = e.width) !== null && s !== void 0 ? s : 0, E.height = (a = e.height) !== null && a !== void 0 ? a : 0, E.simulcast = (o = e.simulcast) !== null && o !== void 0 ? o : !1, E.disableDtx = (c = e.disableDtx) !== null && c !== void 0 ? c : !1, E.source = (d = e.source) !== null && d !== void 0 ? d : 0, E.layers = ((u = e.layers) === null || u === void 0 ? void 0 : u.map((A) => ge.fromPartial(A))) || [], E.mimeType = (l = e.mimeType) !== null && l !== void 0 ? l : "", E.mid = (h = e.mid) !== null && h !== void 0 ? h : "", E.codecs = ((f = e.codecs) === null || f === void 0 ? void 0 : f.map((A) => mi.fromPartial(A))) || [], E.stereo = (p = e.stereo) !== null && p !== void 0 ? p : !1, E.disableRed = (m = e.disableRed) !== null && m !== void 0 ? m : !1, E.encryption = (C = e.encryption) !== null && C !== void 0 ? C : 0, E;
  }
};
function ga() {
  return {
    quality: 0,
    width: 0,
    height: 0,
    bitrate: 0,
    ssrc: 0
  };
}
const ge = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.quality !== 0 && t.uint32(8).int32(e.quality), e.width !== 0 && t.uint32(16).uint32(e.width), e.height !== 0 && t.uint32(24).uint32(e.height), e.bitrate !== 0 && t.uint32(32).uint32(e.bitrate), e.ssrc !== 0 && t.uint32(40).uint32(e.ssrc), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ga();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.quality = i.int32();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.width = i.uint32();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.height = i.uint32();
          continue;
        case 4:
          if (s !== 32)
            break;
          r.bitrate = i.uint32();
          continue;
        case 5:
          if (s !== 40)
            break;
          r.ssrc = i.uint32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      quality: P(e.quality) ? ks(e.quality) : 0,
      width: P(e.width) ? Number(e.width) : 0,
      height: P(e.height) ? Number(e.height) : 0,
      bitrate: P(e.bitrate) ? Number(e.bitrate) : 0,
      ssrc: P(e.ssrc) ? Number(e.ssrc) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.quality !== void 0 && (t.quality = bs(e.quality)), e.width !== void 0 && (t.width = Math.round(e.width)), e.height !== void 0 && (t.height = Math.round(e.height)), e.bitrate !== void 0 && (t.bitrate = Math.round(e.bitrate)), e.ssrc !== void 0 && (t.ssrc = Math.round(e.ssrc)), t;
  },
  create(e) {
    return ge.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s;
    const a = ga();
    return a.quality = (t = e.quality) !== null && t !== void 0 ? t : 0, a.width = (i = e.width) !== null && i !== void 0 ? i : 0, a.height = (n = e.height) !== null && n !== void 0 ? n : 0, a.bitrate = (r = e.bitrate) !== null && r !== void 0 ? r : 0, a.ssrc = (s = e.ssrc) !== null && s !== void 0 ? s : 0, a;
  }
};
function ya() {
  return {
    kind: 0,
    value: void 0
  };
}
const Wr = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    var i;
    switch (e.kind !== 0 && t.uint32(8).int32(e.kind), (i = e.value) === null || i === void 0 ? void 0 : i.$case) {
      case "user":
        gi.encode(e.value.user, t.uint32(18).fork()).ldelim();
        break;
      case "speaker":
        vi.encode(e.value.speaker, t.uint32(26).fork()).ldelim();
        break;
    }
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ya();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.kind = i.int32();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.value = {
            $case: "user",
            user: gi.decode(i, i.uint32())
          };
          continue;
        case 3:
          if (s !== 26)
            break;
          r.value = {
            $case: "speaker",
            speaker: vi.decode(i, i.uint32())
          };
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      kind: P(e.kind) ? El(e.kind) : 0,
      value: P(e.user) ? {
        $case: "user",
        user: gi.fromJSON(e.user)
      } : P(e.speaker) ? {
        $case: "speaker",
        speaker: vi.fromJSON(e.speaker)
      } : void 0
    };
  },
  toJSON(e) {
    var t, i, n, r, s, a;
    const o = {};
    return e.kind !== void 0 && (o.kind = Pl(e.kind)), ((t = e.value) === null || t === void 0 ? void 0 : t.$case) === "user" && (o.user = !((i = e.value) === null || i === void 0) && i.user ? gi.toJSON((n = e.value) === null || n === void 0 ? void 0 : n.user) : void 0), ((r = e.value) === null || r === void 0 ? void 0 : r.$case) === "speaker" && (o.speaker = !((s = e.value) === null || s === void 0) && s.speaker ? vi.toJSON((a = e.value) === null || a === void 0 ? void 0 : a.speaker) : void 0), o;
  },
  create(e) {
    return Wr.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o;
    const c = ya();
    return c.kind = (t = e.kind) !== null && t !== void 0 ? t : 0, ((i = e.value) === null || i === void 0 ? void 0 : i.$case) === "user" && ((n = e.value) === null || n === void 0 ? void 0 : n.user) !== void 0 && ((r = e.value) === null || r === void 0 ? void 0 : r.user) !== null && (c.value = {
      $case: "user",
      user: gi.fromPartial(e.value.user)
    }), ((s = e.value) === null || s === void 0 ? void 0 : s.$case) === "speaker" && ((a = e.value) === null || a === void 0 ? void 0 : a.speaker) !== void 0 && ((o = e.value) === null || o === void 0 ? void 0 : o.speaker) !== null && (c.value = {
      $case: "speaker",
      speaker: vi.fromPartial(e.value.speaker)
    }), c;
  }
};
function Sa() {
  return {
    speakers: []
  };
}
const vi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.speakers)
      ut.encode(i, t.uint32(10).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Sa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.speakers.push(ut.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      speakers: Array.isArray(e == null ? void 0 : e.speakers) ? e.speakers.map((t) => ut.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.speakers ? t.speakers = e.speakers.map((i) => i ? ut.toJSON(i) : void 0) : t.speakers = [], t;
  },
  create(e) {
    return vi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = Sa();
    return i.speakers = ((t = e.speakers) === null || t === void 0 ? void 0 : t.map((n) => ut.fromPartial(n))) || [], i;
  }
};
function ka() {
  return {
    sid: "",
    level: 0,
    active: !1
  };
}
const ut = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.sid !== "" && t.uint32(10).string(e.sid), e.level !== 0 && t.uint32(21).float(e.level), e.active === !0 && t.uint32(24).bool(e.active), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ka();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.sid = i.string();
          continue;
        case 2:
          if (s !== 21)
            break;
          r.level = i.float();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.active = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sid: P(e.sid) ? String(e.sid) : "",
      level: P(e.level) ? Number(e.level) : 0,
      active: P(e.active) ? !!e.active : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.sid !== void 0 && (t.sid = e.sid), e.level !== void 0 && (t.level = e.level), e.active !== void 0 && (t.active = e.active), t;
  },
  create(e) {
    return ut.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = ka();
    return r.sid = (t = e.sid) !== null && t !== void 0 ? t : "", r.level = (i = e.level) !== null && i !== void 0 ? i : 0, r.active = (n = e.active) !== null && n !== void 0 ? n : !1, r;
  }
};
function ba() {
  return {
    participantSid: "",
    payload: new Uint8Array(),
    destinationSids: [],
    topic: void 0
  };
}
const gi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.participantSid !== "" && t.uint32(10).string(e.participantSid), e.payload.length !== 0 && t.uint32(18).bytes(e.payload);
    for (const i of e.destinationSids)
      t.uint32(26).string(i);
    return e.topic !== void 0 && t.uint32(34).string(e.topic), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ba();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.payload = i.bytes();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.destinationSids.push(i.string());
          continue;
        case 4:
          if (s !== 34)
            break;
          r.topic = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: P(e.participantSid) ? String(e.participantSid) : "",
      payload: P(e.payload) ? Al(e.payload) : new Uint8Array(),
      destinationSids: Array.isArray(e == null ? void 0 : e.destinationSids) ? e.destinationSids.map((t) => String(t)) : [],
      topic: P(e.topic) ? String(e.topic) : void 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.payload !== void 0 && (t.payload = Il(e.payload !== void 0 ? e.payload : new Uint8Array())), e.destinationSids ? t.destinationSids = e.destinationSids.map((i) => i) : t.destinationSids = [], e.topic !== void 0 && (t.topic = e.topic), t;
  },
  create(e) {
    return gi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r;
    const s = ba();
    return s.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", s.payload = (i = e.payload) !== null && i !== void 0 ? i : new Uint8Array(), s.destinationSids = ((n = e.destinationSids) === null || n === void 0 ? void 0 : n.map((a) => a)) || [], s.topic = (r = e.topic) !== null && r !== void 0 ? r : void 0, s;
  }
};
function Ca() {
  return {
    participantSid: "",
    trackSids: []
  };
}
const yi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.participantSid !== "" && t.uint32(10).string(e.participantSid);
    for (const i of e.trackSids)
      t.uint32(18).string(i);
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ca();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.trackSids.push(i.string());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: P(e.participantSid) ? String(e.participantSid) : "",
      trackSids: Array.isArray(e == null ? void 0 : e.trackSids) ? e.trackSids.map((t) => String(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.trackSids ? t.trackSids = e.trackSids.map((i) => i) : t.trackSids = [], t;
  },
  create(e) {
    return yi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ca();
    return n.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", n.trackSids = ((i = e.trackSids) === null || i === void 0 ? void 0 : i.map((r) => r)) || [], n;
  }
};
function _a() {
  return {
    edition: 0,
    version: "",
    protocol: 0,
    region: "",
    nodeId: "",
    debugInfo: ""
  };
}
const Si = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.edition !== 0 && t.uint32(8).int32(e.edition), e.version !== "" && t.uint32(18).string(e.version), e.protocol !== 0 && t.uint32(24).int32(e.protocol), e.region !== "" && t.uint32(34).string(e.region), e.nodeId !== "" && t.uint32(42).string(e.nodeId), e.debugInfo !== "" && t.uint32(50).string(e.debugInfo), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = _a();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.edition = i.int32();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.version = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.protocol = i.int32();
          continue;
        case 4:
          if (s !== 34)
            break;
          r.region = i.string();
          continue;
        case 5:
          if (s !== 42)
            break;
          r.nodeId = i.string();
          continue;
        case 6:
          if (s !== 50)
            break;
          r.debugInfo = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      edition: P(e.edition) ? wl(e.edition) : 0,
      version: P(e.version) ? String(e.version) : "",
      protocol: P(e.protocol) ? Number(e.protocol) : 0,
      region: P(e.region) ? String(e.region) : "",
      nodeId: P(e.nodeId) ? String(e.nodeId) : "",
      debugInfo: P(e.debugInfo) ? String(e.debugInfo) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.edition !== void 0 && (t.edition = Rl(e.edition)), e.version !== void 0 && (t.version = e.version), e.protocol !== void 0 && (t.protocol = Math.round(e.protocol)), e.region !== void 0 && (t.region = e.region), e.nodeId !== void 0 && (t.nodeId = e.nodeId), e.debugInfo !== void 0 && (t.debugInfo = e.debugInfo), t;
  },
  create(e) {
    return Si.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a;
    const o = _a();
    return o.edition = (t = e.edition) !== null && t !== void 0 ? t : 0, o.version = (i = e.version) !== null && i !== void 0 ? i : "", o.protocol = (n = e.protocol) !== null && n !== void 0 ? n : 0, o.region = (r = e.region) !== null && r !== void 0 ? r : "", o.nodeId = (s = e.nodeId) !== null && s !== void 0 ? s : "", o.debugInfo = (a = e.debugInfo) !== null && a !== void 0 ? a : "", o;
  }
};
function Ta() {
  return {
    sdk: 0,
    version: "",
    protocol: 0,
    os: "",
    osVersion: "",
    deviceModel: "",
    browser: "",
    browserVersion: "",
    address: "",
    network: ""
  };
}
const Sc = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.sdk !== 0 && t.uint32(8).int32(e.sdk), e.version !== "" && t.uint32(18).string(e.version), e.protocol !== 0 && t.uint32(24).int32(e.protocol), e.os !== "" && t.uint32(34).string(e.os), e.osVersion !== "" && t.uint32(42).string(e.osVersion), e.deviceModel !== "" && t.uint32(50).string(e.deviceModel), e.browser !== "" && t.uint32(58).string(e.browser), e.browserVersion !== "" && t.uint32(66).string(e.browserVersion), e.address !== "" && t.uint32(74).string(e.address), e.network !== "" && t.uint32(82).string(e.network), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ta();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.sdk = i.int32();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.version = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.protocol = i.int32();
          continue;
        case 4:
          if (s !== 34)
            break;
          r.os = i.string();
          continue;
        case 5:
          if (s !== 42)
            break;
          r.osVersion = i.string();
          continue;
        case 6:
          if (s !== 50)
            break;
          r.deviceModel = i.string();
          continue;
        case 7:
          if (s !== 58)
            break;
          r.browser = i.string();
          continue;
        case 8:
          if (s !== 66)
            break;
          r.browserVersion = i.string();
          continue;
        case 9:
          if (s !== 74)
            break;
          r.address = i.string();
          continue;
        case 10:
          if (s !== 82)
            break;
          r.network = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sdk: P(e.sdk) ? Ol(e.sdk) : 0,
      version: P(e.version) ? String(e.version) : "",
      protocol: P(e.protocol) ? Number(e.protocol) : 0,
      os: P(e.os) ? String(e.os) : "",
      osVersion: P(e.osVersion) ? String(e.osVersion) : "",
      deviceModel: P(e.deviceModel) ? String(e.deviceModel) : "",
      browser: P(e.browser) ? String(e.browser) : "",
      browserVersion: P(e.browserVersion) ? String(e.browserVersion) : "",
      address: P(e.address) ? String(e.address) : "",
      network: P(e.network) ? String(e.network) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.sdk !== void 0 && (t.sdk = Nl(e.sdk)), e.version !== void 0 && (t.version = e.version), e.protocol !== void 0 && (t.protocol = Math.round(e.protocol)), e.os !== void 0 && (t.os = e.os), e.osVersion !== void 0 && (t.osVersion = e.osVersion), e.deviceModel !== void 0 && (t.deviceModel = e.deviceModel), e.browser !== void 0 && (t.browser = e.browser), e.browserVersion !== void 0 && (t.browserVersion = e.browserVersion), e.address !== void 0 && (t.address = e.address), e.network !== void 0 && (t.network = e.network), t;
  },
  create(e) {
    return Sc.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u;
    const l = Ta();
    return l.sdk = (t = e.sdk) !== null && t !== void 0 ? t : 0, l.version = (i = e.version) !== null && i !== void 0 ? i : "", l.protocol = (n = e.protocol) !== null && n !== void 0 ? n : 0, l.os = (r = e.os) !== null && r !== void 0 ? r : "", l.osVersion = (s = e.osVersion) !== null && s !== void 0 ? s : "", l.deviceModel = (a = e.deviceModel) !== null && a !== void 0 ? a : "", l.browser = (o = e.browser) !== null && o !== void 0 ? o : "", l.browserVersion = (c = e.browserVersion) !== null && c !== void 0 ? c : "", l.address = (d = e.address) !== null && d !== void 0 ? d : "", l.network = (u = e.network) !== null && u !== void 0 ? u : "", l;
  }
};
function Ea() {
  return {
    video: void 0,
    screen: void 0,
    resumeConnection: 0,
    disabledCodecs: void 0,
    forceRelay: 0
  };
}
const lt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.video !== void 0 && ot.encode(e.video, t.uint32(10).fork()).ldelim(), e.screen !== void 0 && ot.encode(e.screen, t.uint32(18).fork()).ldelim(), e.resumeConnection !== 0 && t.uint32(24).int32(e.resumeConnection), e.disabledCodecs !== void 0 && ki.encode(e.disabledCodecs, t.uint32(34).fork()).ldelim(), e.forceRelay !== 0 && t.uint32(40).int32(e.forceRelay), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ea();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.video = ot.decode(i, i.uint32());
          continue;
        case 2:
          if (s !== 18)
            break;
          r.screen = ot.decode(i, i.uint32());
          continue;
        case 3:
          if (s !== 24)
            break;
          r.resumeConnection = i.int32();
          continue;
        case 4:
          if (s !== 34)
            break;
          r.disabledCodecs = ki.decode(i, i.uint32());
          continue;
        case 5:
          if (s !== 40)
            break;
          r.forceRelay = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      video: P(e.video) ? ot.fromJSON(e.video) : void 0,
      screen: P(e.screen) ? ot.fromJSON(e.screen) : void 0,
      resumeConnection: P(e.resumeConnection) ? qr(e.resumeConnection) : 0,
      disabledCodecs: P(e.disabledCodecs) ? ki.fromJSON(e.disabledCodecs) : void 0,
      forceRelay: P(e.forceRelay) ? qr(e.forceRelay) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.video !== void 0 && (t.video = e.video ? ot.toJSON(e.video) : void 0), e.screen !== void 0 && (t.screen = e.screen ? ot.toJSON(e.screen) : void 0), e.resumeConnection !== void 0 && (t.resumeConnection = Gr(e.resumeConnection)), e.disabledCodecs !== void 0 && (t.disabledCodecs = e.disabledCodecs ? ki.toJSON(e.disabledCodecs) : void 0), e.forceRelay !== void 0 && (t.forceRelay = Gr(e.forceRelay)), t;
  },
  create(e) {
    return lt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ea();
    return n.video = e.video !== void 0 && e.video !== null ? ot.fromPartial(e.video) : void 0, n.screen = e.screen !== void 0 && e.screen !== null ? ot.fromPartial(e.screen) : void 0, n.resumeConnection = (t = e.resumeConnection) !== null && t !== void 0 ? t : 0, n.disabledCodecs = e.disabledCodecs !== void 0 && e.disabledCodecs !== null ? ki.fromPartial(e.disabledCodecs) : void 0, n.forceRelay = (i = e.forceRelay) !== null && i !== void 0 ? i : 0, n;
  }
};
function Pa() {
  return {
    hardwareEncoder: 0
  };
}
const ot = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.hardwareEncoder !== 0 && t.uint32(8).int32(e.hardwareEncoder), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Pa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.hardwareEncoder = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      hardwareEncoder: P(e.hardwareEncoder) ? qr(e.hardwareEncoder) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.hardwareEncoder !== void 0 && (t.hardwareEncoder = Gr(e.hardwareEncoder)), t;
  },
  create(e) {
    return ot.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = Pa();
    return i.hardwareEncoder = (t = e.hardwareEncoder) !== null && t !== void 0 ? t : 0, i;
  }
};
function wa() {
  return {
    codecs: [],
    publish: []
  };
}
const ki = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.codecs)
      Fe.encode(i, t.uint32(10).fork()).ldelim();
    for (const i of e.publish)
      Fe.encode(i, t.uint32(18).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = wa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.codecs.push(Fe.decode(i, i.uint32()));
          continue;
        case 2:
          if (s !== 18)
            break;
          r.publish.push(Fe.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      codecs: Array.isArray(e == null ? void 0 : e.codecs) ? e.codecs.map((t) => Fe.fromJSON(t)) : [],
      publish: Array.isArray(e == null ? void 0 : e.publish) ? e.publish.map((t) => Fe.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.codecs ? t.codecs = e.codecs.map((i) => i ? Fe.toJSON(i) : void 0) : t.codecs = [], e.publish ? t.publish = e.publish.map((i) => i ? Fe.toJSON(i) : void 0) : t.publish = [], t;
  },
  create(e) {
    return ki.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = wa();
    return n.codecs = ((t = e.codecs) === null || t === void 0 ? void 0 : t.map((r) => Fe.fromPartial(r))) || [], n.publish = ((i = e.publish) === null || i === void 0 ? void 0 : i.map((r) => Fe.fromPartial(r))) || [], n;
  }
};
var ii = (() => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw "Unable to locate global object";
})();
function Al(e) {
  if (ii.Buffer)
    return Uint8Array.from(ii.Buffer.from(e, "base64"));
  {
    const t = ii.atob(e), i = new Uint8Array(t.length);
    for (let n = 0; n < t.length; ++n)
      i[n] = t.charCodeAt(n);
    return i;
  }
}
function Il(e) {
  if (ii.Buffer)
    return ii.Buffer.from(e).toString("base64");
  {
    const t = [];
    return e.forEach((i) => {
      t.push(String.fromCharCode(i));
    }), ii.btoa(t.join(""));
  }
}
function kc(e) {
  if (e.gt(Number.MAX_SAFE_INTEGER))
    throw new ii.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  return e.toNumber();
}
v.util.Long !== en && (v.util.Long = en, v.configure());
function P(e) {
  return e != null;
}
const sn = 7e3, Dl = [0, 300, 2 * 2 * 300, 3 * 3 * 300, 4 * 4 * 300, sn, sn, sn, sn, sn];
class Ul {
  constructor(t) {
    this._retryDelays = t !== void 0 ? [...t] : Dl;
  }
  nextRetryDelayInMs(t) {
    if (t.retryCount >= this._retryDelays.length)
      return null;
    const i = this._retryDelays[t.retryCount];
    return t.retryCount <= 1 ? i : i + Math.random() * 1e3;
  }
}
function k(e, t, i, n) {
  function r(s) {
    return s instanceof i ? s : new i(function(a) {
      a(s);
    });
  }
  return new (i || (i = Promise))(function(s, a) {
    function o(u) {
      try {
        d(n.next(u));
      } catch (l) {
        a(l);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (l) {
        a(l);
      }
    }
    function d(u) {
      u.done ? s(u.value) : r(u.value).then(o, c);
    }
    d((n = n.apply(e, t || [])).next());
  });
}
function Ra(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, i = t && e[t], n = 0;
  if (i)
    return i.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function bc(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], i;
  return t ? t.call(e) : (e = typeof Ra == "function" ? Ra(e) : e[Symbol.iterator](), i = {}, n("next"), n("throw"), n("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function n(s) {
    i[s] = e[s] && function(a) {
      return new Promise(function(o, c) {
        a = e[s](a), r(o, c, a.done, a.value);
      });
    };
  }
  function r(s, a, o, c) {
    Promise.resolve(c).then(function(d) {
      s({ value: d, done: o });
    }, a);
  }
}
var Cc = { exports: {} };
(function(e) {
  var t = Object.prototype.hasOwnProperty, i = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (i = !1));
  function r(c, d, u) {
    this.fn = c, this.context = d, this.once = u || !1;
  }
  function s(c, d, u, l, h) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var f = new r(u, l || c, h), p = i ? i + d : d;
    return c._events[p] ? c._events[p].fn ? c._events[p] = [c._events[p], f] : c._events[p].push(f) : (c._events[p] = f, c._eventsCount++), c;
  }
  function a(c, d) {
    --c._eventsCount === 0 ? c._events = new n() : delete c._events[d];
  }
  function o() {
    this._events = new n(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var d = [], u, l;
    if (this._eventsCount === 0)
      return d;
    for (l in u = this._events)
      t.call(u, l) && d.push(i ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(u)) : d;
  }, o.prototype.listeners = function(d) {
    var u = i ? i + d : d, l = this._events[u];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var h = 0, f = l.length, p = new Array(f); h < f; h++)
      p[h] = l[h].fn;
    return p;
  }, o.prototype.listenerCount = function(d) {
    var u = i ? i + d : d, l = this._events[u];
    return l ? l.fn ? 1 : l.length : 0;
  }, o.prototype.emit = function(d, u, l, h, f, p) {
    var m = i ? i + d : d;
    if (!this._events[m])
      return !1;
    var C = this._events[m], E = arguments.length, A, I;
    if (C.fn) {
      switch (C.once && this.removeListener(d, C.fn, void 0, !0), E) {
        case 1:
          return C.fn.call(C.context), !0;
        case 2:
          return C.fn.call(C.context, u), !0;
        case 3:
          return C.fn.call(C.context, u, l), !0;
        case 4:
          return C.fn.call(C.context, u, l, h), !0;
        case 5:
          return C.fn.call(C.context, u, l, h, f), !0;
        case 6:
          return C.fn.call(C.context, u, l, h, f, p), !0;
      }
      for (I = 1, A = new Array(E - 1); I < E; I++)
        A[I - 1] = arguments[I];
      C.fn.apply(C.context, A);
    } else {
      var B = C.length, ee;
      for (I = 0; I < B; I++)
        switch (C[I].once && this.removeListener(d, C[I].fn, void 0, !0), E) {
          case 1:
            C[I].fn.call(C[I].context);
            break;
          case 2:
            C[I].fn.call(C[I].context, u);
            break;
          case 3:
            C[I].fn.call(C[I].context, u, l);
            break;
          case 4:
            C[I].fn.call(C[I].context, u, l, h);
            break;
          default:
            if (!A)
              for (ee = 1, A = new Array(E - 1); ee < E; ee++)
                A[ee - 1] = arguments[ee];
            C[I].fn.apply(C[I].context, A);
        }
    }
    return !0;
  }, o.prototype.on = function(d, u, l) {
    return s(this, d, u, l, !1);
  }, o.prototype.once = function(d, u, l) {
    return s(this, d, u, l, !0);
  }, o.prototype.removeListener = function(d, u, l, h) {
    var f = i ? i + d : d;
    if (!this._events[f])
      return this;
    if (!u)
      return a(this, f), this;
    var p = this._events[f];
    if (p.fn)
      p.fn === u && (!h || p.once) && (!l || p.context === l) && a(this, f);
    else {
      for (var m = 0, C = [], E = p.length; m < E; m++)
        (p[m].fn !== u || h && !p[m].once || l && p[m].context !== l) && C.push(p[m]);
      C.length ? this._events[f] = C.length === 1 ? C[0] : C : a(this, f);
    }
    return this;
  }, o.prototype.removeAllListeners = function(d) {
    var u;
    return d ? (u = i ? i + d : d, this._events[u] && a(this, u)) : (this._events = new n(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = i, o.EventEmitter = o, e.exports = o;
})(Cc);
var Ml = Cc.exports, li = /* @__PURE__ */ nr(Ml);
let _c = !0, Tc = !0;
function xn(e, t, i) {
  const n = e.match(t);
  return n && n.length >= i && parseInt(n[i], 10);
}
function hi(e, t, i) {
  if (!e.RTCPeerConnection)
    return;
  const n = e.RTCPeerConnection.prototype, r = n.addEventListener;
  n.addEventListener = function(a, o) {
    if (a !== t)
      return r.apply(this, arguments);
    const c = (d) => {
      const u = i(d);
      u && (o.handleEvent ? o.handleEvent(u) : o(u));
    };
    return this._eventMap = this._eventMap || {}, this._eventMap[t] || (this._eventMap[t] = /* @__PURE__ */ new Map()), this._eventMap[t].set(o, c), r.apply(this, [a, c]);
  };
  const s = n.removeEventListener;
  n.removeEventListener = function(a, o) {
    if (a !== t || !this._eventMap || !this._eventMap[t])
      return s.apply(this, arguments);
    if (!this._eventMap[t].has(o))
      return s.apply(this, arguments);
    const c = this._eventMap[t].get(o);
    return this._eventMap[t].delete(o), this._eventMap[t].size === 0 && delete this._eventMap[t], Object.keys(this._eventMap).length === 0 && delete this._eventMap, s.apply(this, [a, c]);
  }, Object.defineProperty(n, "on" + t, {
    get() {
      return this["_on" + t];
    },
    set(a) {
      this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), a && this.addEventListener(t, this["_on" + t] = a);
    },
    enumerable: !0,
    configurable: !0
  });
}
function Ll(e) {
  return typeof e != "boolean" ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (_c = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function xl(e) {
  return typeof e != "boolean" ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (Tc = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
}
function Ec() {
  if (typeof window == "object") {
    if (_c)
      return;
    typeof console < "u" && typeof console.log == "function" && console.log.apply(console, arguments);
  }
}
function Cs(e, t) {
  Tc && console.warn(e + " is deprecated, please use " + t + " instead.");
}
function $l(e) {
  const t = {
    browser: null,
    version: null
  };
  if (typeof e > "u" || !e.navigator)
    return t.browser = "Not a browser.", t;
  const {
    navigator: i
  } = e;
  if (i.mozGetUserMedia)
    t.browser = "firefox", t.version = xn(i.userAgent, /Firefox\/(\d+)\./, 1);
  else if (i.webkitGetUserMedia || e.isSecureContext === !1 && e.webkitRTCPeerConnection)
    t.browser = "chrome", t.version = xn(i.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  else if (e.RTCPeerConnection && i.userAgent.match(/AppleWebKit\/(\d+)\./))
    t.browser = "safari", t.version = xn(i.userAgent, /AppleWebKit\/(\d+)\./, 1), t.supportsUnifiedPlan = e.RTCRtpTransceiver && "currentDirection" in e.RTCRtpTransceiver.prototype;
  else
    return t.browser = "Not a supported browser.", t;
  return t;
}
function Oa(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Pc(e) {
  return Oa(e) ? Object.keys(e).reduce(function(t, i) {
    const n = Oa(e[i]), r = n ? Pc(e[i]) : e[i], s = n && !Object.keys(r).length;
    return r === void 0 || s ? t : Object.assign(t, {
      [i]: r
    });
  }, {}) : e;
}
function zr(e, t, i) {
  !t || i.has(t.id) || (i.set(t.id, t), Object.keys(t).forEach((n) => {
    n.endsWith("Id") ? zr(e, e.get(t[n]), i) : n.endsWith("Ids") && t[n].forEach((r) => {
      zr(e, e.get(r), i);
    });
  }));
}
function Na(e, t, i) {
  const n = i ? "outbound-rtp" : "inbound-rtp", r = /* @__PURE__ */ new Map();
  if (t === null)
    return r;
  const s = [];
  return e.forEach((a) => {
    a.type === "track" && a.trackIdentifier === t.id && s.push(a);
  }), s.forEach((a) => {
    e.forEach((o) => {
      o.type === n && o.trackId === a.id && zr(e, o, r);
    });
  }), r;
}
const Aa = Ec;
function wc(e, t) {
  const i = e && e.navigator;
  if (!i.mediaDevices)
    return;
  const n = function(o) {
    if (typeof o != "object" || o.mandatory || o.optional)
      return o;
    const c = {};
    return Object.keys(o).forEach((d) => {
      if (d === "require" || d === "advanced" || d === "mediaSource")
        return;
      const u = typeof o[d] == "object" ? o[d] : {
        ideal: o[d]
      };
      u.exact !== void 0 && typeof u.exact == "number" && (u.min = u.max = u.exact);
      const l = function(h, f) {
        return h ? h + f.charAt(0).toUpperCase() + f.slice(1) : f === "deviceId" ? "sourceId" : f;
      };
      if (u.ideal !== void 0) {
        c.optional = c.optional || [];
        let h = {};
        typeof u.ideal == "number" ? (h[l("min", d)] = u.ideal, c.optional.push(h), h = {}, h[l("max", d)] = u.ideal, c.optional.push(h)) : (h[l("", d)] = u.ideal, c.optional.push(h));
      }
      u.exact !== void 0 && typeof u.exact != "number" ? (c.mandatory = c.mandatory || {}, c.mandatory[l("", d)] = u.exact) : ["min", "max"].forEach((h) => {
        u[h] !== void 0 && (c.mandatory = c.mandatory || {}, c.mandatory[l(h, d)] = u[h]);
      });
    }), o.advanced && (c.optional = (c.optional || []).concat(o.advanced)), c;
  }, r = function(o, c) {
    if (t.version >= 61)
      return c(o);
    if (o = JSON.parse(JSON.stringify(o)), o && typeof o.audio == "object") {
      const d = function(u, l, h) {
        l in u && !(h in u) && (u[h] = u[l], delete u[l]);
      };
      o = JSON.parse(JSON.stringify(o)), d(o.audio, "autoGainControl", "googAutoGainControl"), d(o.audio, "noiseSuppression", "googNoiseSuppression"), o.audio = n(o.audio);
    }
    if (o && typeof o.video == "object") {
      let d = o.video.facingMode;
      d = d && (typeof d == "object" ? d : {
        ideal: d
      });
      const u = t.version < 66;
      if (d && (d.exact === "user" || d.exact === "environment" || d.ideal === "user" || d.ideal === "environment") && !(i.mediaDevices.getSupportedConstraints && i.mediaDevices.getSupportedConstraints().facingMode && !u)) {
        delete o.video.facingMode;
        let l;
        if (d.exact === "environment" || d.ideal === "environment" ? l = ["back", "rear"] : (d.exact === "user" || d.ideal === "user") && (l = ["front"]), l)
          return i.mediaDevices.enumerateDevices().then((h) => {
            h = h.filter((p) => p.kind === "videoinput");
            let f = h.find((p) => l.some((m) => p.label.toLowerCase().includes(m)));
            return !f && h.length && l.includes("back") && (f = h[h.length - 1]), f && (o.video.deviceId = d.exact ? {
              exact: f.deviceId
            } : {
              ideal: f.deviceId
            }), o.video = n(o.video), Aa("chrome: " + JSON.stringify(o)), c(o);
          });
      }
      o.video = n(o.video);
    }
    return Aa("chrome: " + JSON.stringify(o)), c(o);
  }, s = function(o) {
    return t.version >= 64 ? o : {
      name: {
        PermissionDeniedError: "NotAllowedError",
        PermissionDismissedError: "NotAllowedError",
        InvalidStateError: "NotAllowedError",
        DevicesNotFoundError: "NotFoundError",
        ConstraintNotSatisfiedError: "OverconstrainedError",
        TrackStartError: "NotReadableError",
        MediaDeviceFailedDueToShutdown: "NotAllowedError",
        MediaDeviceKillSwitchOn: "NotAllowedError",
        TabCaptureError: "AbortError",
        ScreenCaptureError: "AbortError",
        DeviceCaptureError: "AbortError"
      }[o.name] || o.name,
      message: o.message,
      constraint: o.constraint || o.constraintName,
      toString() {
        return this.name + (this.message && ": ") + this.message;
      }
    };
  }, a = function(o, c, d) {
    r(o, (u) => {
      i.webkitGetUserMedia(u, c, (l) => {
        d && d(s(l));
      });
    });
  };
  if (i.getUserMedia = a.bind(i), i.mediaDevices.getUserMedia) {
    const o = i.mediaDevices.getUserMedia.bind(i.mediaDevices);
    i.mediaDevices.getUserMedia = function(c) {
      return r(c, (d) => o(d).then((u) => {
        if (d.audio && !u.getAudioTracks().length || d.video && !u.getVideoTracks().length)
          throw u.getTracks().forEach((l) => {
            l.stop();
          }), new DOMException("", "NotFoundError");
        return u;
      }, (u) => Promise.reject(s(u))));
    };
  }
}
function Fl(e, t) {
  if (!(e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices) && e.navigator.mediaDevices) {
    if (typeof t != "function") {
      console.error("shimGetDisplayMedia: getSourceId argument is not a function");
      return;
    }
    e.navigator.mediaDevices.getDisplayMedia = function(n) {
      return t(n).then((r) => {
        const s = n.video && n.video.width, a = n.video && n.video.height, o = n.video && n.video.frameRate;
        return n.video = {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: r,
            maxFrameRate: o || 3
          }
        }, s && (n.video.mandatory.maxWidth = s), a && (n.video.mandatory.maxHeight = a), e.navigator.mediaDevices.getUserMedia(n);
      });
    };
  }
}
function Rc(e) {
  e.MediaStream = e.MediaStream || e.webkitMediaStream;
}
function Oc(e) {
  if (typeof e == "object" && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
    Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
      get() {
        return this._ontrack;
      },
      set(i) {
        this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = i);
      },
      enumerable: !0,
      configurable: !0
    });
    const t = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function() {
      return this._ontrackpoly || (this._ontrackpoly = (n) => {
        n.stream.addEventListener("addtrack", (r) => {
          let s;
          e.RTCPeerConnection.prototype.getReceivers ? s = this.getReceivers().find((o) => o.track && o.track.id === r.track.id) : s = {
            track: r.track
          };
          const a = new Event("track");
          a.track = r.track, a.receiver = s, a.transceiver = {
            receiver: s
          }, a.streams = [n.stream], this.dispatchEvent(a);
        }), n.stream.getTracks().forEach((r) => {
          let s;
          e.RTCPeerConnection.prototype.getReceivers ? s = this.getReceivers().find((o) => o.track && o.track.id === r.id) : s = {
            track: r
          };
          const a = new Event("track");
          a.track = r, a.receiver = s, a.transceiver = {
            receiver: s
          }, a.streams = [n.stream], this.dispatchEvent(a);
        });
      }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments);
    };
  } else
    hi(e, "track", (t) => (t.transceiver || Object.defineProperty(t, "transceiver", {
      value: {
        receiver: t.receiver
      }
    }), t));
}
function Nc(e) {
  if (typeof e == "object" && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
    const t = function(r, s) {
      return {
        track: s,
        get dtmf() {
          return this._dtmf === void 0 && (s.kind === "audio" ? this._dtmf = r.createDTMFSender(s) : this._dtmf = null), this._dtmf;
        },
        _pc: r
      };
    };
    if (!e.RTCPeerConnection.prototype.getSenders) {
      e.RTCPeerConnection.prototype.getSenders = function() {
        return this._senders = this._senders || [], this._senders.slice();
      };
      const r = e.RTCPeerConnection.prototype.addTrack;
      e.RTCPeerConnection.prototype.addTrack = function(o, c) {
        let d = r.apply(this, arguments);
        return d || (d = t(this, o), this._senders.push(d)), d;
      };
      const s = e.RTCPeerConnection.prototype.removeTrack;
      e.RTCPeerConnection.prototype.removeTrack = function(o) {
        s.apply(this, arguments);
        const c = this._senders.indexOf(o);
        c !== -1 && this._senders.splice(c, 1);
      };
    }
    const i = e.RTCPeerConnection.prototype.addStream;
    e.RTCPeerConnection.prototype.addStream = function(s) {
      this._senders = this._senders || [], i.apply(this, [s]), s.getTracks().forEach((a) => {
        this._senders.push(t(this, a));
      });
    };
    const n = e.RTCPeerConnection.prototype.removeStream;
    e.RTCPeerConnection.prototype.removeStream = function(s) {
      this._senders = this._senders || [], n.apply(this, [s]), s.getTracks().forEach((a) => {
        const o = this._senders.find((c) => c.track === a);
        o && this._senders.splice(this._senders.indexOf(o), 1);
      });
    };
  } else if (typeof e == "object" && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
    const t = e.RTCPeerConnection.prototype.getSenders;
    e.RTCPeerConnection.prototype.getSenders = function() {
      const n = t.apply(this, []);
      return n.forEach((r) => r._pc = this), n;
    }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
      get() {
        return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
      }
    });
  }
}
function Ac(e) {
  if (!e.RTCPeerConnection)
    return;
  const t = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function() {
    const [n, r, s] = arguments;
    if (arguments.length > 0 && typeof n == "function")
      return t.apply(this, arguments);
    if (t.length === 0 && (arguments.length === 0 || typeof n != "function"))
      return t.apply(this, []);
    const a = function(c) {
      const d = {};
      return c.result().forEach((l) => {
        const h = {
          id: l.id,
          timestamp: l.timestamp,
          type: {
            localcandidate: "local-candidate",
            remotecandidate: "remote-candidate"
          }[l.type] || l.type
        };
        l.names().forEach((f) => {
          h[f] = l.stat(f);
        }), d[h.id] = h;
      }), d;
    }, o = function(c) {
      return new Map(Object.keys(c).map((d) => [d, c[d]]));
    };
    if (arguments.length >= 2) {
      const c = function(d) {
        r(o(a(d)));
      };
      return t.apply(this, [c, n]);
    }
    return new Promise((c, d) => {
      t.apply(this, [function(u) {
        c(o(a(u)));
      }, d]);
    }).then(r, s);
  };
}
function Ic(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver))
    return;
  if (!("getStats" in e.RTCRtpSender.prototype)) {
    const i = e.RTCPeerConnection.prototype.getSenders;
    i && (e.RTCPeerConnection.prototype.getSenders = function() {
      const s = i.apply(this, []);
      return s.forEach((a) => a._pc = this), s;
    });
    const n = e.RTCPeerConnection.prototype.addTrack;
    n && (e.RTCPeerConnection.prototype.addTrack = function() {
      const s = n.apply(this, arguments);
      return s._pc = this, s;
    }), e.RTCRtpSender.prototype.getStats = function() {
      const s = this;
      return this._pc.getStats().then((a) => (
        /* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */
        Na(a, s.track, !0)
      ));
    };
  }
  if (!("getStats" in e.RTCRtpReceiver.prototype)) {
    const i = e.RTCPeerConnection.prototype.getReceivers;
    i && (e.RTCPeerConnection.prototype.getReceivers = function() {
      const r = i.apply(this, []);
      return r.forEach((s) => s._pc = this), r;
    }), hi(e, "track", (n) => (n.receiver._pc = n.srcElement, n)), e.RTCRtpReceiver.prototype.getStats = function() {
      const r = this;
      return this._pc.getStats().then((s) => Na(s, r.track, !1));
    };
  }
  if (!("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype))
    return;
  const t = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function() {
    if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
      const n = arguments[0];
      let r, s, a;
      return this.getSenders().forEach((o) => {
        o.track === n && (r ? a = !0 : r = o);
      }), this.getReceivers().forEach((o) => (o.track === n && (s ? a = !0 : s = o), o.track === n)), a || r && s ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : r ? r.getStats() : s ? s.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
    }
    return t.apply(this, arguments);
  };
}
function Dc(e) {
  e.RTCPeerConnection.prototype.getLocalStreams = function() {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map((a) => this._shimmedLocalStreams[a][0]);
  };
  const t = e.RTCPeerConnection.prototype.addTrack;
  e.RTCPeerConnection.prototype.addTrack = function(a, o) {
    if (!o)
      return t.apply(this, arguments);
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    const c = t.apply(this, arguments);
    return this._shimmedLocalStreams[o.id] ? this._shimmedLocalStreams[o.id].indexOf(c) === -1 && this._shimmedLocalStreams[o.id].push(c) : this._shimmedLocalStreams[o.id] = [o, c], c;
  };
  const i = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function(a) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a.getTracks().forEach((d) => {
      if (this.getSenders().find((l) => l.track === d))
        throw new DOMException("Track already exists.", "InvalidAccessError");
    });
    const o = this.getSenders();
    i.apply(this, arguments);
    const c = this.getSenders().filter((d) => o.indexOf(d) === -1);
    this._shimmedLocalStreams[a.id] = [a].concat(c);
  };
  const n = e.RTCPeerConnection.prototype.removeStream;
  e.RTCPeerConnection.prototype.removeStream = function(a) {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[a.id], n.apply(this, arguments);
  };
  const r = e.RTCPeerConnection.prototype.removeTrack;
  e.RTCPeerConnection.prototype.removeTrack = function(a) {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a && Object.keys(this._shimmedLocalStreams).forEach((o) => {
      const c = this._shimmedLocalStreams[o].indexOf(a);
      c !== -1 && this._shimmedLocalStreams[o].splice(c, 1), this._shimmedLocalStreams[o].length === 1 && delete this._shimmedLocalStreams[o];
    }), r.apply(this, arguments);
  };
}
function Uc(e, t) {
  if (!e.RTCPeerConnection)
    return;
  if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65)
    return Dc(e);
  const i = e.RTCPeerConnection.prototype.getLocalStreams;
  e.RTCPeerConnection.prototype.getLocalStreams = function() {
    const u = i.apply(this);
    return this._reverseStreams = this._reverseStreams || {}, u.map((l) => this._reverseStreams[l.id]);
  };
  const n = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function(u) {
    if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, u.getTracks().forEach((l) => {
      if (this.getSenders().find((f) => f.track === l))
        throw new DOMException("Track already exists.", "InvalidAccessError");
    }), !this._reverseStreams[u.id]) {
      const l = new e.MediaStream(u.getTracks());
      this._streams[u.id] = l, this._reverseStreams[l.id] = u, u = l;
    }
    n.apply(this, [u]);
  };
  const r = e.RTCPeerConnection.prototype.removeStream;
  e.RTCPeerConnection.prototype.removeStream = function(u) {
    this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, r.apply(this, [this._streams[u.id] || u]), delete this._reverseStreams[this._streams[u.id] ? this._streams[u.id].id : u.id], delete this._streams[u.id];
  }, e.RTCPeerConnection.prototype.addTrack = function(u, l) {
    if (this.signalingState === "closed")
      throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
    const h = [].slice.call(arguments, 1);
    if (h.length !== 1 || !h[0].getTracks().find((m) => m === u))
      throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
    if (this.getSenders().find((m) => m.track === u))
      throw new DOMException("Track already exists.", "InvalidAccessError");
    this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
    const p = this._streams[l.id];
    if (p)
      p.addTrack(u), Promise.resolve().then(() => {
        this.dispatchEvent(new Event("negotiationneeded"));
      });
    else {
      const m = new e.MediaStream([u]);
      this._streams[l.id] = m, this._reverseStreams[m.id] = l, this.addStream(m);
    }
    return this.getSenders().find((m) => m.track === u);
  };
  function s(d, u) {
    let l = u.sdp;
    return Object.keys(d._reverseStreams || []).forEach((h) => {
      const f = d._reverseStreams[h], p = d._streams[f.id];
      l = l.replace(new RegExp(p.id, "g"), f.id);
    }), new RTCSessionDescription({
      type: u.type,
      sdp: l
    });
  }
  function a(d, u) {
    let l = u.sdp;
    return Object.keys(d._reverseStreams || []).forEach((h) => {
      const f = d._reverseStreams[h], p = d._streams[f.id];
      l = l.replace(new RegExp(f.id, "g"), p.id);
    }), new RTCSessionDescription({
      type: u.type,
      sdp: l
    });
  }
  ["createOffer", "createAnswer"].forEach(function(d) {
    const u = e.RTCPeerConnection.prototype[d], l = {
      [d]() {
        const h = arguments;
        return arguments.length && typeof arguments[0] == "function" ? u.apply(this, [(p) => {
          const m = s(this, p);
          h[0].apply(null, [m]);
        }, (p) => {
          h[1] && h[1].apply(null, p);
        }, arguments[2]]) : u.apply(this, arguments).then((p) => s(this, p));
      }
    };
    e.RTCPeerConnection.prototype[d] = l[d];
  });
  const o = e.RTCPeerConnection.prototype.setLocalDescription;
  e.RTCPeerConnection.prototype.setLocalDescription = function() {
    return !arguments.length || !arguments[0].type ? o.apply(this, arguments) : (arguments[0] = a(this, arguments[0]), o.apply(this, arguments));
  };
  const c = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
  Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
    get() {
      const d = c.get.apply(this);
      return d.type === "" ? d : s(this, d);
    }
  }), e.RTCPeerConnection.prototype.removeTrack = function(u) {
    if (this.signalingState === "closed")
      throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
    if (!u._pc)
      throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
    if (!(u._pc === this))
      throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
    this._streams = this._streams || {};
    let h;
    Object.keys(this._streams).forEach((f) => {
      this._streams[f].getTracks().find((m) => u.track === m) && (h = this._streams[f]);
    }), h && (h.getTracks().length === 1 ? this.removeStream(this._reverseStreams[h.id]) : h.removeTrack(u.track), this.dispatchEvent(new Event("negotiationneeded")));
  };
}
function Zr(e, t) {
  !e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection && t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(i) {
    const n = e.RTCPeerConnection.prototype[i], r = {
      [i]() {
        return arguments[0] = new (i === "addIceCandidate" ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
      }
    };
    e.RTCPeerConnection.prototype[i] = r[i];
  });
}
function Mc(e, t) {
  hi(e, "negotiationneeded", (i) => {
    const n = i.target;
    if (!((t.version < 72 || n.getConfiguration && n.getConfiguration().sdpSemantics === "plan-b") && n.signalingState !== "stable"))
      return i;
  });
}
var Ia = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fixNegotiationNeeded: Mc,
  shimAddTrackRemoveTrack: Uc,
  shimAddTrackRemoveTrackWithNative: Dc,
  shimGetDisplayMedia: Fl,
  shimGetSendersWithDtmf: Nc,
  shimGetStats: Ac,
  shimGetUserMedia: wc,
  shimMediaStream: Rc,
  shimOnTrack: Oc,
  shimPeerConnection: Zr,
  shimSenderReceiverGetStats: Ic
});
function Lc(e, t) {
  const i = e && e.navigator, n = e && e.MediaStreamTrack;
  if (i.getUserMedia = function(r, s, a) {
    Cs("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), i.mediaDevices.getUserMedia(r).then(s, a);
  }, !(t.version > 55 && "autoGainControl" in i.mediaDevices.getSupportedConstraints())) {
    const r = function(a, o, c) {
      o in a && !(c in a) && (a[c] = a[o], delete a[o]);
    }, s = i.mediaDevices.getUserMedia.bind(i.mediaDevices);
    if (i.mediaDevices.getUserMedia = function(a) {
      return typeof a == "object" && typeof a.audio == "object" && (a = JSON.parse(JSON.stringify(a)), r(a.audio, "autoGainControl", "mozAutoGainControl"), r(a.audio, "noiseSuppression", "mozNoiseSuppression")), s(a);
    }, n && n.prototype.getSettings) {
      const a = n.prototype.getSettings;
      n.prototype.getSettings = function() {
        const o = a.apply(this, arguments);
        return r(o, "mozAutoGainControl", "autoGainControl"), r(o, "mozNoiseSuppression", "noiseSuppression"), o;
      };
    }
    if (n && n.prototype.applyConstraints) {
      const a = n.prototype.applyConstraints;
      n.prototype.applyConstraints = function(o) {
        return this.kind === "audio" && typeof o == "object" && (o = JSON.parse(JSON.stringify(o)), r(o, "autoGainControl", "mozAutoGainControl"), r(o, "noiseSuppression", "mozNoiseSuppression")), a.apply(this, [o]);
      };
    }
  }
}
function Bl(e, t) {
  e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function(n) {
    if (!(n && n.video)) {
      const r = new DOMException("getDisplayMedia without video constraints is undefined");
      return r.name = "NotFoundError", r.code = 8, Promise.reject(r);
    }
    return n.video === !0 ? n.video = {
      mediaSource: t
    } : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n);
  });
}
function xc(e) {
  typeof e == "object" && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
    get() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function Qr(e, t) {
  if (typeof e != "object" || !(e.RTCPeerConnection || e.mozRTCPeerConnection))
    return;
  !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(r) {
    const s = e.RTCPeerConnection.prototype[r], a = {
      [r]() {
        return arguments[0] = new (r === "addIceCandidate" ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), s.apply(this, arguments);
      }
    };
    e.RTCPeerConnection.prototype[r] = a[r];
  });
  const i = {
    inboundrtp: "inbound-rtp",
    outboundrtp: "outbound-rtp",
    candidatepair: "candidate-pair",
    localcandidate: "local-candidate",
    remotecandidate: "remote-candidate"
  }, n = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function() {
    const [s, a, o] = arguments;
    return n.apply(this, [s || null]).then((c) => {
      if (t.version < 53 && !a)
        try {
          c.forEach((d) => {
            d.type = i[d.type] || d.type;
          });
        } catch (d) {
          if (d.name !== "TypeError")
            throw d;
          c.forEach((u, l) => {
            c.set(l, Object.assign({}, u, {
              type: i[u.type] || u.type
            }));
          });
        }
      return c;
    }).then(a, o);
  };
}
function $c(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype)
    return;
  const t = e.RTCPeerConnection.prototype.getSenders;
  t && (e.RTCPeerConnection.prototype.getSenders = function() {
    const r = t.apply(this, []);
    return r.forEach((s) => s._pc = this), r;
  });
  const i = e.RTCPeerConnection.prototype.addTrack;
  i && (e.RTCPeerConnection.prototype.addTrack = function() {
    const r = i.apply(this, arguments);
    return r._pc = this, r;
  }), e.RTCRtpSender.prototype.getStats = function() {
    return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
  };
}
function Fc(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype)
    return;
  const t = e.RTCPeerConnection.prototype.getReceivers;
  t && (e.RTCPeerConnection.prototype.getReceivers = function() {
    const n = t.apply(this, []);
    return n.forEach((r) => r._pc = this), n;
  }), hi(e, "track", (i) => (i.receiver._pc = i.srcElement, i)), e.RTCRtpReceiver.prototype.getStats = function() {
    return this._pc.getStats(this.track);
  };
}
function Bc(e) {
  !e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(i) {
    Cs("removeStream", "removeTrack"), this.getSenders().forEach((n) => {
      n.track && i.getTracks().includes(n.track) && this.removeTrack(n);
    });
  });
}
function Jc(e) {
  e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
}
function Vc(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection))
    return;
  const t = e.RTCPeerConnection.prototype.addTransceiver;
  t && (e.RTCPeerConnection.prototype.addTransceiver = function() {
    this.setParametersPromises = [];
    let n = arguments[1] && arguments[1].sendEncodings;
    n === void 0 && (n = []), n = [...n];
    const r = n.length > 0;
    r && n.forEach((a) => {
      if ("rid" in a && !/^[a-z0-9]{0,16}$/i.test(a.rid))
        throw new TypeError("Invalid RID value provided.");
      if ("scaleResolutionDownBy" in a && !(parseFloat(a.scaleResolutionDownBy) >= 1))
        throw new RangeError("scale_resolution_down_by must be >= 1.0");
      if ("maxFramerate" in a && !(parseFloat(a.maxFramerate) >= 0))
        throw new RangeError("max_framerate must be >= 0.0");
    });
    const s = t.apply(this, arguments);
    if (r) {
      const {
        sender: a
      } = s, o = a.getParameters();
      (!("encodings" in o) || // Avoid being fooled by patched getParameters() below.
      o.encodings.length === 1 && Object.keys(o.encodings[0]).length === 0) && (o.encodings = n, a.sendEncodings = n, this.setParametersPromises.push(a.setParameters(o).then(() => {
        delete a.sendEncodings;
      }).catch(() => {
        delete a.sendEncodings;
      })));
    }
    return s;
  });
}
function Hc(e) {
  if (!(typeof e == "object" && e.RTCRtpSender))
    return;
  const t = e.RTCRtpSender.prototype.getParameters;
  t && (e.RTCRtpSender.prototype.getParameters = function() {
    const n = t.apply(this, arguments);
    return "encodings" in n || (n.encodings = [].concat(this.sendEncodings || [{}])), n;
  });
}
function qc(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection))
    return;
  const t = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function() {
    return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => {
      this.setParametersPromises = [];
    }) : t.apply(this, arguments);
  };
}
function Gc(e) {
  if (!(typeof e == "object" && e.RTCPeerConnection))
    return;
  const t = e.RTCPeerConnection.prototype.createAnswer;
  e.RTCPeerConnection.prototype.createAnswer = function() {
    return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => {
      this.setParametersPromises = [];
    }) : t.apply(this, arguments);
  };
}
var Da = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  shimAddTransceiver: Vc,
  shimCreateAnswer: Gc,
  shimCreateOffer: qc,
  shimGetDisplayMedia: Bl,
  shimGetParameters: Hc,
  shimGetUserMedia: Lc,
  shimOnTrack: xc,
  shimPeerConnection: Qr,
  shimRTCDataChannel: Jc,
  shimReceiverGetStats: Fc,
  shimRemoveStream: Bc,
  shimSenderGetStats: $c
});
function Wc(e) {
  if (!(typeof e != "object" || !e.RTCPeerConnection)) {
    if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this._localStreams || (this._localStreams = []), this._localStreams;
    }), !("addStream" in e.RTCPeerConnection.prototype)) {
      const t = e.RTCPeerConnection.prototype.addTrack;
      e.RTCPeerConnection.prototype.addStream = function(n) {
        this._localStreams || (this._localStreams = []), this._localStreams.includes(n) || this._localStreams.push(n), n.getAudioTracks().forEach((r) => t.call(this, r, n)), n.getVideoTracks().forEach((r) => t.call(this, r, n));
      }, e.RTCPeerConnection.prototype.addTrack = function(n) {
        for (var r = arguments.length, s = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          s[a - 1] = arguments[a];
        return s && s.forEach((o) => {
          this._localStreams ? this._localStreams.includes(o) || this._localStreams.push(o) : this._localStreams = [o];
        }), t.apply(this, arguments);
      };
    }
    "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(i) {
      this._localStreams || (this._localStreams = []);
      const n = this._localStreams.indexOf(i);
      if (n === -1)
        return;
      this._localStreams.splice(n, 1);
      const r = i.getTracks();
      this.getSenders().forEach((s) => {
        r.includes(s.track) && this.removeTrack(s);
      });
    });
  }
}
function zc(e) {
  if (!(typeof e != "object" || !e.RTCPeerConnection) && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
    return this._remoteStreams ? this._remoteStreams : [];
  }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
    Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
      get() {
        return this._onaddstream;
      },
      set(i) {
        this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = i), this.addEventListener("track", this._onaddstreampoly = (n) => {
          n.streams.forEach((r) => {
            if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(r))
              return;
            this._remoteStreams.push(r);
            const s = new Event("addstream");
            s.stream = r, this.dispatchEvent(s);
          });
        });
      }
    });
    const t = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function() {
      const n = this;
      return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(r) {
        r.streams.forEach((s) => {
          if (n._remoteStreams || (n._remoteStreams = []), n._remoteStreams.indexOf(s) >= 0)
            return;
          n._remoteStreams.push(s);
          const a = new Event("addstream");
          a.stream = s, n.dispatchEvent(a);
        });
      }), t.apply(n, arguments);
    };
  }
}
function Zc(e) {
  if (typeof e != "object" || !e.RTCPeerConnection)
    return;
  const t = e.RTCPeerConnection.prototype, i = t.createOffer, n = t.createAnswer, r = t.setLocalDescription, s = t.setRemoteDescription, a = t.addIceCandidate;
  t.createOffer = function(d, u) {
    const l = arguments.length >= 2 ? arguments[2] : arguments[0], h = i.apply(this, [l]);
    return u ? (h.then(d, u), Promise.resolve()) : h;
  }, t.createAnswer = function(d, u) {
    const l = arguments.length >= 2 ? arguments[2] : arguments[0], h = n.apply(this, [l]);
    return u ? (h.then(d, u), Promise.resolve()) : h;
  };
  let o = function(c, d, u) {
    const l = r.apply(this, [c]);
    return u ? (l.then(d, u), Promise.resolve()) : l;
  };
  t.setLocalDescription = o, o = function(c, d, u) {
    const l = s.apply(this, [c]);
    return u ? (l.then(d, u), Promise.resolve()) : l;
  }, t.setRemoteDescription = o, o = function(c, d, u) {
    const l = a.apply(this, [c]);
    return u ? (l.then(d, u), Promise.resolve()) : l;
  }, t.addIceCandidate = o;
}
function Qc(e) {
  const t = e && e.navigator;
  if (t.mediaDevices && t.mediaDevices.getUserMedia) {
    const i = t.mediaDevices, n = i.getUserMedia.bind(i);
    t.mediaDevices.getUserMedia = (r) => n(Kc(r));
  }
  !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = (function(n, r, s) {
    t.mediaDevices.getUserMedia(n).then(r, s);
  }).bind(t));
}
function Kc(e) {
  return e && e.video !== void 0 ? Object.assign({}, e, {
    video: Pc(e.video)
  }) : e;
}
function Yc(e) {
  if (!e.RTCPeerConnection)
    return;
  const t = e.RTCPeerConnection;
  e.RTCPeerConnection = function(n, r) {
    if (n && n.iceServers) {
      const s = [];
      for (let a = 0; a < n.iceServers.length; a++) {
        let o = n.iceServers[a];
        o.urls === void 0 && o.url ? (Cs("RTCIceServer.url", "RTCIceServer.urls"), o = JSON.parse(JSON.stringify(o)), o.urls = o.url, delete o.url, s.push(o)) : s.push(n.iceServers[a]);
      }
      n.iceServers = s;
    }
    return new t(n, r);
  }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in t && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
    get() {
      return t.generateCertificate;
    }
  });
}
function Xc(e) {
  typeof e == "object" && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
    get() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function jc(e) {
  const t = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function(n) {
    if (n) {
      typeof n.offerToReceiveAudio < "u" && (n.offerToReceiveAudio = !!n.offerToReceiveAudio);
      const r = this.getTransceivers().find((a) => a.receiver.track.kind === "audio");
      n.offerToReceiveAudio === !1 && r ? r.direction === "sendrecv" ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : r.direction === "recvonly" && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : n.offerToReceiveAudio === !0 && !r && this.addTransceiver("audio", {
        direction: "recvonly"
      }), typeof n.offerToReceiveVideo < "u" && (n.offerToReceiveVideo = !!n.offerToReceiveVideo);
      const s = this.getTransceivers().find((a) => a.receiver.track.kind === "video");
      n.offerToReceiveVideo === !1 && s ? s.direction === "sendrecv" ? s.setDirection ? s.setDirection("sendonly") : s.direction = "sendonly" : s.direction === "recvonly" && (s.setDirection ? s.setDirection("inactive") : s.direction = "inactive") : n.offerToReceiveVideo === !0 && !s && this.addTransceiver("video", {
        direction: "recvonly"
      });
    }
    return t.apply(this, arguments);
  };
}
function ed(e) {
  typeof e != "object" || e.AudioContext || (e.AudioContext = e.webkitAudioContext);
}
var Ua = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  shimAudioContext: ed,
  shimCallbacksAPI: Zc,
  shimConstraints: Kc,
  shimCreateOfferLegacy: jc,
  shimGetUserMedia: Qc,
  shimLocalStreamsAPI: Wc,
  shimRTCIceServerUrls: Yc,
  shimRemoteStreamsAPI: zc,
  shimTrackEventTransceiver: Xc
}), td = { exports: {} };
(function(e) {
  const t = {};
  t.generateIdentifier = function() {
    return Math.random().toString(36).substring(2, 12);
  }, t.localCName = t.generateIdentifier(), t.splitLines = function(i) {
    return i.trim().split(`
`).map((n) => n.trim());
  }, t.splitSections = function(i) {
    return i.split(`
m=`).map((r, s) => (s > 0 ? "m=" + r : r).trim() + `\r
`);
  }, t.getDescription = function(i) {
    const n = t.splitSections(i);
    return n && n[0];
  }, t.getMediaSections = function(i) {
    const n = t.splitSections(i);
    return n.shift(), n;
  }, t.matchPrefix = function(i, n) {
    return t.splitLines(i).filter((r) => r.indexOf(n) === 0);
  }, t.parseCandidate = function(i) {
    let n;
    i.indexOf("a=candidate:") === 0 ? n = i.substring(12).split(" ") : n = i.substring(10).split(" ");
    const r = {
      foundation: n[0],
      component: {
        1: "rtp",
        2: "rtcp"
      }[n[1]] || n[1],
      protocol: n[2].toLowerCase(),
      priority: parseInt(n[3], 10),
      ip: n[4],
      address: n[4],
      // address is an alias for ip.
      port: parseInt(n[5], 10),
      // skip parts[6] == 'typ'
      type: n[7]
    };
    for (let s = 8; s < n.length; s += 2)
      switch (n[s]) {
        case "raddr":
          r.relatedAddress = n[s + 1];
          break;
        case "rport":
          r.relatedPort = parseInt(n[s + 1], 10);
          break;
        case "tcptype":
          r.tcpType = n[s + 1];
          break;
        case "ufrag":
          r.ufrag = n[s + 1], r.usernameFragment = n[s + 1];
          break;
        default:
          r[n[s]] === void 0 && (r[n[s]] = n[s + 1]);
          break;
      }
    return r;
  }, t.writeCandidate = function(i) {
    const n = [];
    n.push(i.foundation);
    const r = i.component;
    r === "rtp" ? n.push(1) : r === "rtcp" ? n.push(2) : n.push(r), n.push(i.protocol.toUpperCase()), n.push(i.priority), n.push(i.address || i.ip), n.push(i.port);
    const s = i.type;
    return n.push("typ"), n.push(s), s !== "host" && i.relatedAddress && i.relatedPort && (n.push("raddr"), n.push(i.relatedAddress), n.push("rport"), n.push(i.relatedPort)), i.tcpType && i.protocol.toLowerCase() === "tcp" && (n.push("tcptype"), n.push(i.tcpType)), (i.usernameFragment || i.ufrag) && (n.push("ufrag"), n.push(i.usernameFragment || i.ufrag)), "candidate:" + n.join(" ");
  }, t.parseIceOptions = function(i) {
    return i.substring(14).split(" ");
  }, t.parseRtpMap = function(i) {
    let n = i.substring(9).split(" ");
    const r = {
      payloadType: parseInt(n.shift(), 10)
      // was: id
    };
    return n = n[0].split("/"), r.name = n[0], r.clockRate = parseInt(n[1], 10), r.channels = n.length === 3 ? parseInt(n[2], 10) : 1, r.numChannels = r.channels, r;
  }, t.writeRtpMap = function(i) {
    let n = i.payloadType;
    i.preferredPayloadType !== void 0 && (n = i.preferredPayloadType);
    const r = i.channels || i.numChannels || 1;
    return "a=rtpmap:" + n + " " + i.name + "/" + i.clockRate + (r !== 1 ? "/" + r : "") + `\r
`;
  }, t.parseExtmap = function(i) {
    const n = i.substring(9).split(" ");
    return {
      id: parseInt(n[0], 10),
      direction: n[0].indexOf("/") > 0 ? n[0].split("/")[1] : "sendrecv",
      uri: n[1],
      attributes: n.slice(2).join(" ")
    };
  }, t.writeExtmap = function(i) {
    return "a=extmap:" + (i.id || i.preferredId) + (i.direction && i.direction !== "sendrecv" ? "/" + i.direction : "") + " " + i.uri + (i.attributes ? " " + i.attributes : "") + `\r
`;
  }, t.parseFmtp = function(i) {
    const n = {};
    let r;
    const s = i.substring(i.indexOf(" ") + 1).split(";");
    for (let a = 0; a < s.length; a++)
      r = s[a].trim().split("="), n[r[0].trim()] = r[1];
    return n;
  }, t.writeFmtp = function(i) {
    let n = "", r = i.payloadType;
    if (i.preferredPayloadType !== void 0 && (r = i.preferredPayloadType), i.parameters && Object.keys(i.parameters).length) {
      const s = [];
      Object.keys(i.parameters).forEach((a) => {
        i.parameters[a] !== void 0 ? s.push(a + "=" + i.parameters[a]) : s.push(a);
      }), n += "a=fmtp:" + r + " " + s.join(";") + `\r
`;
    }
    return n;
  }, t.parseRtcpFb = function(i) {
    const n = i.substring(i.indexOf(" ") + 1).split(" ");
    return {
      type: n.shift(),
      parameter: n.join(" ")
    };
  }, t.writeRtcpFb = function(i) {
    let n = "", r = i.payloadType;
    return i.preferredPayloadType !== void 0 && (r = i.preferredPayloadType), i.rtcpFeedback && i.rtcpFeedback.length && i.rtcpFeedback.forEach((s) => {
      n += "a=rtcp-fb:" + r + " " + s.type + (s.parameter && s.parameter.length ? " " + s.parameter : "") + `\r
`;
    }), n;
  }, t.parseSsrcMedia = function(i) {
    const n = i.indexOf(" "), r = {
      ssrc: parseInt(i.substring(7, n), 10)
    }, s = i.indexOf(":", n);
    return s > -1 ? (r.attribute = i.substring(n + 1, s), r.value = i.substring(s + 1)) : r.attribute = i.substring(n + 1), r;
  }, t.parseSsrcGroup = function(i) {
    const n = i.substring(13).split(" ");
    return {
      semantics: n.shift(),
      ssrcs: n.map((r) => parseInt(r, 10))
    };
  }, t.getMid = function(i) {
    const n = t.matchPrefix(i, "a=mid:")[0];
    if (n)
      return n.substring(6);
  }, t.parseFingerprint = function(i) {
    const n = i.substring(14).split(" ");
    return {
      algorithm: n[0].toLowerCase(),
      // algorithm is case-sensitive in Edge.
      value: n[1].toUpperCase()
      // the definition is upper-case in RFC 4572.
    };
  }, t.getDtlsParameters = function(i, n) {
    return {
      role: "auto",
      fingerprints: t.matchPrefix(i + n, "a=fingerprint:").map(t.parseFingerprint)
    };
  }, t.writeDtlsParameters = function(i, n) {
    let r = "a=setup:" + n + `\r
`;
    return i.fingerprints.forEach((s) => {
      r += "a=fingerprint:" + s.algorithm + " " + s.value + `\r
`;
    }), r;
  }, t.parseCryptoLine = function(i) {
    const n = i.substring(9).split(" ");
    return {
      tag: parseInt(n[0], 10),
      cryptoSuite: n[1],
      keyParams: n[2],
      sessionParams: n.slice(3)
    };
  }, t.writeCryptoLine = function(i) {
    return "a=crypto:" + i.tag + " " + i.cryptoSuite + " " + (typeof i.keyParams == "object" ? t.writeCryptoKeyParams(i.keyParams) : i.keyParams) + (i.sessionParams ? " " + i.sessionParams.join(" ") : "") + `\r
`;
  }, t.parseCryptoKeyParams = function(i) {
    if (i.indexOf("inline:") !== 0)
      return null;
    const n = i.substring(7).split("|");
    return {
      keyMethod: "inline",
      keySalt: n[0],
      lifeTime: n[1],
      mkiValue: n[2] ? n[2].split(":")[0] : void 0,
      mkiLength: n[2] ? n[2].split(":")[1] : void 0
    };
  }, t.writeCryptoKeyParams = function(i) {
    return i.keyMethod + ":" + i.keySalt + (i.lifeTime ? "|" + i.lifeTime : "") + (i.mkiValue && i.mkiLength ? "|" + i.mkiValue + ":" + i.mkiLength : "");
  }, t.getCryptoParameters = function(i, n) {
    return t.matchPrefix(i + n, "a=crypto:").map(t.parseCryptoLine);
  }, t.getIceParameters = function(i, n) {
    const r = t.matchPrefix(i + n, "a=ice-ufrag:")[0], s = t.matchPrefix(i + n, "a=ice-pwd:")[0];
    return r && s ? {
      usernameFragment: r.substring(12),
      password: s.substring(10)
    } : null;
  }, t.writeIceParameters = function(i) {
    let n = "a=ice-ufrag:" + i.usernameFragment + `\r
a=ice-pwd:` + i.password + `\r
`;
    return i.iceLite && (n += `a=ice-lite\r
`), n;
  }, t.parseRtpParameters = function(i) {
    const n = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: [],
      rtcp: []
    }, s = t.splitLines(i)[0].split(" ");
    n.profile = s[2];
    for (let o = 3; o < s.length; o++) {
      const c = s[o], d = t.matchPrefix(i, "a=rtpmap:" + c + " ")[0];
      if (d) {
        const u = t.parseRtpMap(d), l = t.matchPrefix(i, "a=fmtp:" + c + " ");
        switch (u.parameters = l.length ? t.parseFmtp(l[0]) : {}, u.rtcpFeedback = t.matchPrefix(i, "a=rtcp-fb:" + c + " ").map(t.parseRtcpFb), n.codecs.push(u), u.name.toUpperCase()) {
          case "RED":
          case "ULPFEC":
            n.fecMechanisms.push(u.name.toUpperCase());
            break;
        }
      }
    }
    t.matchPrefix(i, "a=extmap:").forEach((o) => {
      n.headerExtensions.push(t.parseExtmap(o));
    });
    const a = t.matchPrefix(i, "a=rtcp-fb:* ").map(t.parseRtcpFb);
    return n.codecs.forEach((o) => {
      a.forEach((c) => {
        o.rtcpFeedback.find((u) => u.type === c.type && u.parameter === c.parameter) || o.rtcpFeedback.push(c);
      });
    }), n;
  }, t.writeRtpDescription = function(i, n) {
    let r = "";
    r += "m=" + i + " ", r += n.codecs.length > 0 ? "9" : "0", r += " " + (n.profile || "UDP/TLS/RTP/SAVPF") + " ", r += n.codecs.map((a) => a.preferredPayloadType !== void 0 ? a.preferredPayloadType : a.payloadType).join(" ") + `\r
`, r += `c=IN IP4 0.0.0.0\r
`, r += `a=rtcp:9 IN IP4 0.0.0.0\r
`, n.codecs.forEach((a) => {
      r += t.writeRtpMap(a), r += t.writeFmtp(a), r += t.writeRtcpFb(a);
    });
    let s = 0;
    return n.codecs.forEach((a) => {
      a.maxptime > s && (s = a.maxptime);
    }), s > 0 && (r += "a=maxptime:" + s + `\r
`), n.headerExtensions && n.headerExtensions.forEach((a) => {
      r += t.writeExtmap(a);
    }), r;
  }, t.parseRtpEncodingParameters = function(i) {
    const n = [], r = t.parseRtpParameters(i), s = r.fecMechanisms.indexOf("RED") !== -1, a = r.fecMechanisms.indexOf("ULPFEC") !== -1, o = t.matchPrefix(i, "a=ssrc:").map((h) => t.parseSsrcMedia(h)).filter((h) => h.attribute === "cname"), c = o.length > 0 && o[0].ssrc;
    let d;
    const u = t.matchPrefix(i, "a=ssrc-group:FID").map((h) => h.substring(17).split(" ").map((p) => parseInt(p, 10)));
    u.length > 0 && u[0].length > 1 && u[0][0] === c && (d = u[0][1]), r.codecs.forEach((h) => {
      if (h.name.toUpperCase() === "RTX" && h.parameters.apt) {
        let f = {
          ssrc: c,
          codecPayloadType: parseInt(h.parameters.apt, 10)
        };
        c && d && (f.rtx = {
          ssrc: d
        }), n.push(f), s && (f = JSON.parse(JSON.stringify(f)), f.fec = {
          ssrc: c,
          mechanism: a ? "red+ulpfec" : "red"
        }, n.push(f));
      }
    }), n.length === 0 && c && n.push({
      ssrc: c
    });
    let l = t.matchPrefix(i, "b=");
    return l.length && (l[0].indexOf("b=TIAS:") === 0 ? l = parseInt(l[0].substring(7), 10) : l[0].indexOf("b=AS:") === 0 ? l = parseInt(l[0].substring(5), 10) * 1e3 * 0.95 - 50 * 40 * 8 : l = void 0, n.forEach((h) => {
      h.maxBitrate = l;
    })), n;
  }, t.parseRtcpParameters = function(i) {
    const n = {}, r = t.matchPrefix(i, "a=ssrc:").map((o) => t.parseSsrcMedia(o)).filter((o) => o.attribute === "cname")[0];
    r && (n.cname = r.value, n.ssrc = r.ssrc);
    const s = t.matchPrefix(i, "a=rtcp-rsize");
    n.reducedSize = s.length > 0, n.compound = s.length === 0;
    const a = t.matchPrefix(i, "a=rtcp-mux");
    return n.mux = a.length > 0, n;
  }, t.writeRtcpParameters = function(i) {
    let n = "";
    return i.reducedSize && (n += `a=rtcp-rsize\r
`), i.mux && (n += `a=rtcp-mux\r
`), i.ssrc !== void 0 && i.cname && (n += "a=ssrc:" + i.ssrc + " cname:" + i.cname + `\r
`), n;
  }, t.parseMsid = function(i) {
    let n;
    const r = t.matchPrefix(i, "a=msid:");
    if (r.length === 1)
      return n = r[0].substring(7).split(" "), {
        stream: n[0],
        track: n[1]
      };
    const s = t.matchPrefix(i, "a=ssrc:").map((a) => t.parseSsrcMedia(a)).filter((a) => a.attribute === "msid");
    if (s.length > 0)
      return n = s[0].value.split(" "), {
        stream: n[0],
        track: n[1]
      };
  }, t.parseSctpDescription = function(i) {
    const n = t.parseMLine(i), r = t.matchPrefix(i, "a=max-message-size:");
    let s;
    r.length > 0 && (s = parseInt(r[0].substring(19), 10)), isNaN(s) && (s = 65536);
    const a = t.matchPrefix(i, "a=sctp-port:");
    if (a.length > 0)
      return {
        port: parseInt(a[0].substring(12), 10),
        protocol: n.fmt,
        maxMessageSize: s
      };
    const o = t.matchPrefix(i, "a=sctpmap:");
    if (o.length > 0) {
      const c = o[0].substring(10).split(" ");
      return {
        port: parseInt(c[0], 10),
        protocol: c[1],
        maxMessageSize: s
      };
    }
  }, t.writeSctpDescription = function(i, n) {
    let r = [];
    return i.protocol !== "DTLS/SCTP" ? r = ["m=" + i.kind + " 9 " + i.protocol + " " + n.protocol + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctp-port:" + n.port + `\r
`] : r = ["m=" + i.kind + " 9 " + i.protocol + " " + n.port + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctpmap:" + n.port + " " + n.protocol + ` 65535\r
`], n.maxMessageSize !== void 0 && r.push("a=max-message-size:" + n.maxMessageSize + `\r
`), r.join("");
  }, t.generateSessionId = function() {
    return Math.random().toString().substr(2, 22);
  }, t.writeSessionBoilerplate = function(i, n, r) {
    let s;
    const a = n !== void 0 ? n : 2;
    return i ? s = i : s = t.generateSessionId(), `v=0\r
o=` + (r || "thisisadapterortc") + " " + s + " " + a + ` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`;
  }, t.getDirection = function(i, n) {
    const r = t.splitLines(i);
    for (let s = 0; s < r.length; s++)
      switch (r[s]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
          return r[s].substring(2);
      }
    return n ? t.getDirection(n) : "sendrecv";
  }, t.getKind = function(i) {
    return t.splitLines(i)[0].split(" ")[0].substring(2);
  }, t.isRejected = function(i) {
    return i.split(" ", 2)[1] === "0";
  }, t.parseMLine = function(i) {
    const r = t.splitLines(i)[0].substring(2).split(" ");
    return {
      kind: r[0],
      port: parseInt(r[1], 10),
      protocol: r[2],
      fmt: r.slice(3).join(" ")
    };
  }, t.parseOLine = function(i) {
    const r = t.matchPrefix(i, "o=")[0].substring(2).split(" ");
    return {
      username: r[0],
      sessionId: r[1],
      sessionVersion: parseInt(r[2], 10),
      netType: r[3],
      addressType: r[4],
      address: r[5]
    };
  }, t.isValidSDP = function(i) {
    if (typeof i != "string" || i.length === 0)
      return !1;
    const n = t.splitLines(i);
    for (let r = 0; r < n.length; r++)
      if (n[r].length < 2 || n[r].charAt(1) !== "=")
        return !1;
    return !0;
  }, e.exports = t;
})(td);
var id = td.exports, zi = /* @__PURE__ */ nr(id), Jl = /* @__PURE__ */ Ku({
  __proto__: null,
  default: zi
}, [id]);
function $n(e) {
  if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)
    return;
  const t = e.RTCIceCandidate;
  e.RTCIceCandidate = function(n) {
    if (typeof n == "object" && n.candidate && n.candidate.indexOf("a=") === 0 && (n = JSON.parse(JSON.stringify(n)), n.candidate = n.candidate.substring(2)), n.candidate && n.candidate.length) {
      const r = new t(n), s = zi.parseCandidate(n.candidate);
      for (const a in s)
        a in r || Object.defineProperty(r, a, {
          value: s[a]
        });
      return r.toJSON = function() {
        return {
          candidate: r.candidate,
          sdpMid: r.sdpMid,
          sdpMLineIndex: r.sdpMLineIndex,
          usernameFragment: r.usernameFragment
        };
      }, r;
    }
    return new t(n);
  }, e.RTCIceCandidate.prototype = t.prototype, hi(e, "icecandidate", (i) => (i.candidate && Object.defineProperty(i, "candidate", {
    value: new e.RTCIceCandidate(i.candidate),
    writable: "false"
  }), i));
}
function Kr(e) {
  !e.RTCIceCandidate || e.RTCIceCandidate && "relayProtocol" in e.RTCIceCandidate.prototype || hi(e, "icecandidate", (t) => {
    if (t.candidate) {
      const i = zi.parseCandidate(t.candidate.candidate);
      i.type === "relay" && (t.candidate.relayProtocol = {
        0: "tls",
        1: "tcp",
        2: "udp"
      }[i.priority >> 24]);
    }
    return t;
  });
}
function Fn(e, t) {
  if (!e.RTCPeerConnection)
    return;
  "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
    get() {
      return typeof this._sctp > "u" ? null : this._sctp;
    }
  });
  const i = function(o) {
    if (!o || !o.sdp)
      return !1;
    const c = zi.splitSections(o.sdp);
    return c.shift(), c.some((d) => {
      const u = zi.parseMLine(d);
      return u && u.kind === "application" && u.protocol.indexOf("SCTP") !== -1;
    });
  }, n = function(o) {
    const c = o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
    if (c === null || c.length < 2)
      return -1;
    const d = parseInt(c[1], 10);
    return d !== d ? -1 : d;
  }, r = function(o) {
    let c = 65536;
    return t.browser === "firefox" && (t.version < 57 ? o === -1 ? c = 16384 : c = 2147483637 : t.version < 60 ? c = t.version === 57 ? 65535 : 65536 : c = 2147483637), c;
  }, s = function(o, c) {
    let d = 65536;
    t.browser === "firefox" && t.version === 57 && (d = 65535);
    const u = zi.matchPrefix(o.sdp, "a=max-message-size:");
    return u.length > 0 ? d = parseInt(u[0].substring(19), 10) : t.browser === "firefox" && c !== -1 && (d = 2147483637), d;
  }, a = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function() {
    if (this._sctp = null, t.browser === "chrome" && t.version >= 76) {
      const {
        sdpSemantics: c
      } = this.getConfiguration();
      c === "plan-b" && Object.defineProperty(this, "sctp", {
        get() {
          return typeof this._sctp > "u" ? null : this._sctp;
        },
        enumerable: !0,
        configurable: !0
      });
    }
    if (i(arguments[0])) {
      const c = n(arguments[0]), d = r(c), u = s(arguments[0], c);
      let l;
      d === 0 && u === 0 ? l = Number.POSITIVE_INFINITY : d === 0 || u === 0 ? l = Math.max(d, u) : l = Math.min(d, u);
      const h = {};
      Object.defineProperty(h, "maxMessageSize", {
        get() {
          return l;
        }
      }), this._sctp = h;
    }
    return a.apply(this, arguments);
  };
}
function Bn(e) {
  if (!(e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype))
    return;
  function t(n, r) {
    const s = n.send;
    n.send = function() {
      const o = arguments[0], c = o.length || o.size || o.byteLength;
      if (n.readyState === "open" && r.sctp && c > r.sctp.maxMessageSize)
        throw new TypeError("Message too large (can send a maximum of " + r.sctp.maxMessageSize + " bytes)");
      return s.apply(n, arguments);
    };
  }
  const i = e.RTCPeerConnection.prototype.createDataChannel;
  e.RTCPeerConnection.prototype.createDataChannel = function() {
    const r = i.apply(this, arguments);
    return t(r, this), r;
  }, hi(e, "datachannel", (n) => (t(n.channel, n.target), n));
}
function Yr(e) {
  if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype)
    return;
  const t = e.RTCPeerConnection.prototype;
  Object.defineProperty(t, "connectionState", {
    get() {
      return {
        completed: "connected",
        checking: "connecting"
      }[this.iceConnectionState] || this.iceConnectionState;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t, "onconnectionstatechange", {
    get() {
      return this._onconnectionstatechange || null;
    },
    set(i) {
      this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), i && this.addEventListener("connectionstatechange", this._onconnectionstatechange = i);
    },
    enumerable: !0,
    configurable: !0
  }), ["setLocalDescription", "setRemoteDescription"].forEach((i) => {
    const n = t[i];
    t[i] = function() {
      return this._connectionstatechangepoly || (this._connectionstatechangepoly = (r) => {
        const s = r.target;
        if (s._lastConnectionState !== s.connectionState) {
          s._lastConnectionState = s.connectionState;
          const a = new Event("connectionstatechange", r);
          s.dispatchEvent(a);
        }
        return r;
      }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments);
    };
  });
}
function Xr(e, t) {
  if (!e.RTCPeerConnection || t.browser === "chrome" && t.version >= 71 || t.browser === "safari" && t.version >= 605)
    return;
  const i = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function(r) {
    if (r && r.sdp && r.sdp.indexOf(`
a=extmap-allow-mixed`) !== -1) {
      const s = r.sdp.split(`
`).filter((a) => a.trim() !== "a=extmap-allow-mixed").join(`
`);
      e.RTCSessionDescription && r instanceof e.RTCSessionDescription ? arguments[0] = new e.RTCSessionDescription({
        type: r.type,
        sdp: s
      }) : r.sdp = s;
    }
    return i.apply(this, arguments);
  };
}
function Jn(e, t) {
  if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype))
    return;
  const i = e.RTCPeerConnection.prototype.addIceCandidate;
  !i || i.length === 0 || (e.RTCPeerConnection.prototype.addIceCandidate = function() {
    return arguments[0] ? (t.browser === "chrome" && t.version < 78 || t.browser === "firefox" && t.version < 68 || t.browser === "safari") && arguments[0] && arguments[0].candidate === "" ? Promise.resolve() : i.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
  });
}
function Vn(e, t) {
  if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype))
    return;
  const i = e.RTCPeerConnection.prototype.setLocalDescription;
  !i || i.length === 0 || (e.RTCPeerConnection.prototype.setLocalDescription = function() {
    let r = arguments[0] || {};
    if (typeof r != "object" || r.type && r.sdp)
      return i.apply(this, arguments);
    if (r = {
      type: r.type,
      sdp: r.sdp
    }, !r.type)
      switch (this.signalingState) {
        case "stable":
        case "have-local-offer":
        case "have-remote-pranswer":
          r.type = "offer";
          break;
        default:
          r.type = "answer";
          break;
      }
    return r.sdp || r.type !== "offer" && r.type !== "answer" ? i.apply(this, [r]) : (r.type === "offer" ? this.createOffer : this.createAnswer).apply(this).then((a) => i.apply(this, [a]));
  });
}
var Vl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  removeExtmapAllowMixed: Xr,
  shimAddIceCandidateNullOrEmpty: Jn,
  shimConnectionState: Yr,
  shimMaxMessageSize: Fn,
  shimParameterlessSetLocalDescription: Vn,
  shimRTCIceCandidate: $n,
  shimRTCIceCandidateRelayProtocol: Kr,
  shimSendThrowTypeError: Bn
});
function Hl() {
  let {
    window: e
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    shimChrome: !0,
    shimFirefox: !0,
    shimSafari: !0
  };
  const i = Ec, n = $l(e), r = {
    browserDetails: n,
    commonShim: Vl,
    extractVersion: xn,
    disableLog: Ll,
    disableWarnings: xl,
    // Expose sdp as a convenience. For production apps include directly.
    sdp: Jl
  };
  switch (n.browser) {
    case "chrome":
      if (!Ia || !Zr || !t.shimChrome)
        return i("Chrome shim is not included in this adapter release."), r;
      if (n.version === null)
        return i("Chrome shim can not determine version, not shimming."), r;
      i("adapter.js shimming chrome."), r.browserShim = Ia, Jn(e, n), Vn(e), wc(e, n), Rc(e), Zr(e, n), Oc(e), Uc(e, n), Nc(e), Ac(e), Ic(e), Mc(e, n), $n(e), Kr(e), Yr(e), Fn(e, n), Bn(e), Xr(e, n);
      break;
    case "firefox":
      if (!Da || !Qr || !t.shimFirefox)
        return i("Firefox shim is not included in this adapter release."), r;
      i("adapter.js shimming firefox."), r.browserShim = Da, Jn(e, n), Vn(e), Lc(e, n), Qr(e, n), xc(e), Bc(e), $c(e), Fc(e), Jc(e), Vc(e), Hc(e), qc(e), Gc(e), $n(e), Yr(e), Fn(e, n), Bn(e);
      break;
    case "safari":
      if (!Ua || !t.shimSafari)
        return i("Safari shim is not included in this adapter release."), r;
      i("adapter.js shimming safari."), r.browserShim = Ua, Jn(e, n), Vn(e), Yc(e), jc(e), Zc(e), Wc(e), zc(e), Xc(e), Qc(e), ed(e), $n(e), Kr(e), Fn(e, n), Bn(e), Xr(e, n);
      break;
    default:
      i("Unsupported browser!");
      break;
  }
  return r;
}
Hl({
  window: typeof window > "u" ? void 0 : window
});
var Ve;
(function(e) {
  e[e.PUBLISHER = 0] = "PUBLISHER", e[e.SUBSCRIBER = 1] = "SUBSCRIBER", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Ve || (Ve = {}));
function nd(e) {
  switch (e) {
    case 0:
    case "PUBLISHER":
      return Ve.PUBLISHER;
    case 1:
    case "SUBSCRIBER":
      return Ve.SUBSCRIBER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Ve.UNRECOGNIZED;
  }
}
function rd(e) {
  switch (e) {
    case Ve.PUBLISHER:
      return "PUBLISHER";
    case Ve.SUBSCRIBER:
      return "SUBSCRIBER";
    case Ve.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var At;
(function(e) {
  e[e.ACTIVE = 0] = "ACTIVE", e[e.PAUSED = 1] = "PAUSED", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(At || (At = {}));
function ql(e) {
  switch (e) {
    case 0:
    case "ACTIVE":
      return At.ACTIVE;
    case 1:
    case "PAUSED":
      return At.PAUSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return At.UNRECOGNIZED;
  }
}
function Gl(e) {
  switch (e) {
    case At.ACTIVE:
      return "ACTIVE";
    case At.PAUSED:
      return "PAUSED";
    case At.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
var Ot;
(function(e) {
  e[e.UDP = 0] = "UDP", e[e.TCP = 1] = "TCP", e[e.TLS = 2] = "TLS", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED";
})(Ot || (Ot = {}));
function Wl(e) {
  switch (e) {
    case 0:
    case "UDP":
      return Ot.UDP;
    case 1:
    case "TCP":
      return Ot.TCP;
    case 2:
    case "TLS":
      return Ot.TLS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Ot.UNRECOGNIZED;
  }
}
function zl(e) {
  switch (e) {
    case Ot.UDP:
      return "UDP";
    case Ot.TCP:
      return "TCP";
    case Ot.TLS:
      return "TLS";
    case Ot.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
function Ma() {
  return {
    message: void 0
  };
}
const jr = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    var i;
    switch ((i = e.message) === null || i === void 0 ? void 0 : i.$case) {
      case "offer":
        Y.encode(e.message.offer, t.uint32(10).fork()).ldelim();
        break;
      case "answer":
        Y.encode(e.message.answer, t.uint32(18).fork()).ldelim();
        break;
      case "trickle":
        ht.encode(e.message.trickle, t.uint32(26).fork()).ldelim();
        break;
      case "addTrack":
        Zt.encode(e.message.addTrack, t.uint32(34).fork()).ldelim();
        break;
      case "mute":
        ft.encode(e.message.mute, t.uint32(42).fork()).ldelim();
        break;
      case "subscription":
        mt.encode(e.message.subscription, t.uint32(50).fork()).ldelim();
        break;
      case "trackSetting":
        Xt.encode(e.message.trackSetting, t.uint32(58).fork()).ldelim();
        break;
      case "leave":
        vt.encode(e.message.leave, t.uint32(66).fork()).ldelim();
        break;
      case "updateLayers":
        Pi.encode(e.message.updateLayers, t.uint32(82).fork()).ldelim();
        break;
      case "subscriptionPermission":
        xi.encode(e.message.subscriptionPermission, t.uint32(90).fork()).ldelim();
        break;
      case "syncState":
        Fi.encode(e.message.syncState, t.uint32(98).fork()).ldelim();
        break;
      case "simulate":
        St.encode(e.message.simulate, t.uint32(106).fork()).ldelim();
        break;
      case "ping":
        t.uint32(112).int64(e.message.ping);
        break;
      case "updateMetadata":
        wi.encode(e.message.updateMetadata, t.uint32(122).fork()).ldelim();
        break;
      case "pingReq":
        Ji.encode(e.message.pingReq, t.uint32(130).fork()).ldelim();
        break;
    }
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ma();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.message = {
            $case: "offer",
            offer: Y.decode(i, i.uint32())
          };
          continue;
        case 2:
          if (s !== 18)
            break;
          r.message = {
            $case: "answer",
            answer: Y.decode(i, i.uint32())
          };
          continue;
        case 3:
          if (s !== 26)
            break;
          r.message = {
            $case: "trickle",
            trickle: ht.decode(i, i.uint32())
          };
          continue;
        case 4:
          if (s !== 34)
            break;
          r.message = {
            $case: "addTrack",
            addTrack: Zt.decode(i, i.uint32())
          };
          continue;
        case 5:
          if (s !== 42)
            break;
          r.message = {
            $case: "mute",
            mute: ft.decode(i, i.uint32())
          };
          continue;
        case 6:
          if (s !== 50)
            break;
          r.message = {
            $case: "subscription",
            subscription: mt.decode(i, i.uint32())
          };
          continue;
        case 7:
          if (s !== 58)
            break;
          r.message = {
            $case: "trackSetting",
            trackSetting: Xt.decode(i, i.uint32())
          };
          continue;
        case 8:
          if (s !== 66)
            break;
          r.message = {
            $case: "leave",
            leave: vt.decode(i, i.uint32())
          };
          continue;
        case 10:
          if (s !== 82)
            break;
          r.message = {
            $case: "updateLayers",
            updateLayers: Pi.decode(i, i.uint32())
          };
          continue;
        case 11:
          if (s !== 90)
            break;
          r.message = {
            $case: "subscriptionPermission",
            subscriptionPermission: xi.decode(i, i.uint32())
          };
          continue;
        case 12:
          if (s !== 98)
            break;
          r.message = {
            $case: "syncState",
            syncState: Fi.decode(i, i.uint32())
          };
          continue;
        case 13:
          if (s !== 106)
            break;
          r.message = {
            $case: "simulate",
            simulate: St.decode(i, i.uint32())
          };
          continue;
        case 14:
          if (s !== 112)
            break;
          r.message = {
            $case: "ping",
            ping: ci(i.int64())
          };
          continue;
        case 15:
          if (s !== 122)
            break;
          r.message = {
            $case: "updateMetadata",
            updateMetadata: wi.decode(i, i.uint32())
          };
          continue;
        case 16:
          if (s !== 130)
            break;
          r.message = {
            $case: "pingReq",
            pingReq: Ji.decode(i, i.uint32())
          };
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      message: b(e.offer) ? {
        $case: "offer",
        offer: Y.fromJSON(e.offer)
      } : b(e.answer) ? {
        $case: "answer",
        answer: Y.fromJSON(e.answer)
      } : b(e.trickle) ? {
        $case: "trickle",
        trickle: ht.fromJSON(e.trickle)
      } : b(e.addTrack) ? {
        $case: "addTrack",
        addTrack: Zt.fromJSON(e.addTrack)
      } : b(e.mute) ? {
        $case: "mute",
        mute: ft.fromJSON(e.mute)
      } : b(e.subscription) ? {
        $case: "subscription",
        subscription: mt.fromJSON(e.subscription)
      } : b(e.trackSetting) ? {
        $case: "trackSetting",
        trackSetting: Xt.fromJSON(e.trackSetting)
      } : b(e.leave) ? {
        $case: "leave",
        leave: vt.fromJSON(e.leave)
      } : b(e.updateLayers) ? {
        $case: "updateLayers",
        updateLayers: Pi.fromJSON(e.updateLayers)
      } : b(e.subscriptionPermission) ? {
        $case: "subscriptionPermission",
        subscriptionPermission: xi.fromJSON(e.subscriptionPermission)
      } : b(e.syncState) ? {
        $case: "syncState",
        syncState: Fi.fromJSON(e.syncState)
      } : b(e.simulate) ? {
        $case: "simulate",
        simulate: St.fromJSON(e.simulate)
      } : b(e.ping) ? {
        $case: "ping",
        ping: Number(e.ping)
      } : b(e.updateMetadata) ? {
        $case: "updateMetadata",
        updateMetadata: wi.fromJSON(e.updateMetadata)
      } : b(e.pingReq) ? {
        $case: "pingReq",
        pingReq: Ji.fromJSON(e.pingReq)
      } : void 0
    };
  },
  toJSON(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C, E, A, I, B, ee, ae, he, de, L, x, X, ne, Ce, ke, _e, Te, Ee, Pe, we, Re, q, me, Ae, W, Ie, De, Ue, Me;
    const V = {};
    return ((t = e.message) === null || t === void 0 ? void 0 : t.$case) === "offer" && (V.offer = !((i = e.message) === null || i === void 0) && i.offer ? Y.toJSON((n = e.message) === null || n === void 0 ? void 0 : n.offer) : void 0), ((r = e.message) === null || r === void 0 ? void 0 : r.$case) === "answer" && (V.answer = !((s = e.message) === null || s === void 0) && s.answer ? Y.toJSON((a = e.message) === null || a === void 0 ? void 0 : a.answer) : void 0), ((o = e.message) === null || o === void 0 ? void 0 : o.$case) === "trickle" && (V.trickle = !((c = e.message) === null || c === void 0) && c.trickle ? ht.toJSON((d = e.message) === null || d === void 0 ? void 0 : d.trickle) : void 0), ((u = e.message) === null || u === void 0 ? void 0 : u.$case) === "addTrack" && (V.addTrack = !((l = e.message) === null || l === void 0) && l.addTrack ? Zt.toJSON((h = e.message) === null || h === void 0 ? void 0 : h.addTrack) : void 0), ((f = e.message) === null || f === void 0 ? void 0 : f.$case) === "mute" && (V.mute = !((p = e.message) === null || p === void 0) && p.mute ? ft.toJSON((m = e.message) === null || m === void 0 ? void 0 : m.mute) : void 0), ((C = e.message) === null || C === void 0 ? void 0 : C.$case) === "subscription" && (V.subscription = !((E = e.message) === null || E === void 0) && E.subscription ? mt.toJSON((A = e.message) === null || A === void 0 ? void 0 : A.subscription) : void 0), ((I = e.message) === null || I === void 0 ? void 0 : I.$case) === "trackSetting" && (V.trackSetting = !((B = e.message) === null || B === void 0) && B.trackSetting ? Xt.toJSON((ee = e.message) === null || ee === void 0 ? void 0 : ee.trackSetting) : void 0), ((ae = e.message) === null || ae === void 0 ? void 0 : ae.$case) === "leave" && (V.leave = !((he = e.message) === null || he === void 0) && he.leave ? vt.toJSON((de = e.message) === null || de === void 0 ? void 0 : de.leave) : void 0), ((L = e.message) === null || L === void 0 ? void 0 : L.$case) === "updateLayers" && (V.updateLayers = !((x = e.message) === null || x === void 0) && x.updateLayers ? Pi.toJSON((X = e.message) === null || X === void 0 ? void 0 : X.updateLayers) : void 0), ((ne = e.message) === null || ne === void 0 ? void 0 : ne.$case) === "subscriptionPermission" && (V.subscriptionPermission = !((Ce = e.message) === null || Ce === void 0) && Ce.subscriptionPermission ? xi.toJSON((ke = e.message) === null || ke === void 0 ? void 0 : ke.subscriptionPermission) : void 0), ((_e = e.message) === null || _e === void 0 ? void 0 : _e.$case) === "syncState" && (V.syncState = !((Te = e.message) === null || Te === void 0) && Te.syncState ? Fi.toJSON((Ee = e.message) === null || Ee === void 0 ? void 0 : Ee.syncState) : void 0), ((Pe = e.message) === null || Pe === void 0 ? void 0 : Pe.$case) === "simulate" && (V.simulate = !((we = e.message) === null || we === void 0) && we.simulate ? St.toJSON((Re = e.message) === null || Re === void 0 ? void 0 : Re.simulate) : void 0), ((q = e.message) === null || q === void 0 ? void 0 : q.$case) === "ping" && (V.ping = Math.round((me = e.message) === null || me === void 0 ? void 0 : me.ping)), ((Ae = e.message) === null || Ae === void 0 ? void 0 : Ae.$case) === "updateMetadata" && (V.updateMetadata = !((W = e.message) === null || W === void 0) && W.updateMetadata ? wi.toJSON((Ie = e.message) === null || Ie === void 0 ? void 0 : Ie.updateMetadata) : void 0), ((De = e.message) === null || De === void 0 ? void 0 : De.$case) === "pingReq" && (V.pingReq = !((Ue = e.message) === null || Ue === void 0) && Ue.pingReq ? Ji.toJSON((Me = e.message) === null || Me === void 0 ? void 0 : Me.pingReq) : void 0), V;
  },
  create(e) {
    return jr.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C, E, A, I, B, ee, ae, he, de, L, x, X, ne, Ce, ke, _e, Te, Ee, Pe, we, Re, q, me, Ae, W, Ie, De, Ue, Me, V;
    const te = Ma();
    return ((t = e.message) === null || t === void 0 ? void 0 : t.$case) === "offer" && ((i = e.message) === null || i === void 0 ? void 0 : i.offer) !== void 0 && ((n = e.message) === null || n === void 0 ? void 0 : n.offer) !== null && (te.message = {
      $case: "offer",
      offer: Y.fromPartial(e.message.offer)
    }), ((r = e.message) === null || r === void 0 ? void 0 : r.$case) === "answer" && ((s = e.message) === null || s === void 0 ? void 0 : s.answer) !== void 0 && ((a = e.message) === null || a === void 0 ? void 0 : a.answer) !== null && (te.message = {
      $case: "answer",
      answer: Y.fromPartial(e.message.answer)
    }), ((o = e.message) === null || o === void 0 ? void 0 : o.$case) === "trickle" && ((c = e.message) === null || c === void 0 ? void 0 : c.trickle) !== void 0 && ((d = e.message) === null || d === void 0 ? void 0 : d.trickle) !== null && (te.message = {
      $case: "trickle",
      trickle: ht.fromPartial(e.message.trickle)
    }), ((u = e.message) === null || u === void 0 ? void 0 : u.$case) === "addTrack" && ((l = e.message) === null || l === void 0 ? void 0 : l.addTrack) !== void 0 && ((h = e.message) === null || h === void 0 ? void 0 : h.addTrack) !== null && (te.message = {
      $case: "addTrack",
      addTrack: Zt.fromPartial(e.message.addTrack)
    }), ((f = e.message) === null || f === void 0 ? void 0 : f.$case) === "mute" && ((p = e.message) === null || p === void 0 ? void 0 : p.mute) !== void 0 && ((m = e.message) === null || m === void 0 ? void 0 : m.mute) !== null && (te.message = {
      $case: "mute",
      mute: ft.fromPartial(e.message.mute)
    }), ((C = e.message) === null || C === void 0 ? void 0 : C.$case) === "subscription" && ((E = e.message) === null || E === void 0 ? void 0 : E.subscription) !== void 0 && ((A = e.message) === null || A === void 0 ? void 0 : A.subscription) !== null && (te.message = {
      $case: "subscription",
      subscription: mt.fromPartial(e.message.subscription)
    }), ((I = e.message) === null || I === void 0 ? void 0 : I.$case) === "trackSetting" && ((B = e.message) === null || B === void 0 ? void 0 : B.trackSetting) !== void 0 && ((ee = e.message) === null || ee === void 0 ? void 0 : ee.trackSetting) !== null && (te.message = {
      $case: "trackSetting",
      trackSetting: Xt.fromPartial(e.message.trackSetting)
    }), ((ae = e.message) === null || ae === void 0 ? void 0 : ae.$case) === "leave" && ((he = e.message) === null || he === void 0 ? void 0 : he.leave) !== void 0 && ((de = e.message) === null || de === void 0 ? void 0 : de.leave) !== null && (te.message = {
      $case: "leave",
      leave: vt.fromPartial(e.message.leave)
    }), ((L = e.message) === null || L === void 0 ? void 0 : L.$case) === "updateLayers" && ((x = e.message) === null || x === void 0 ? void 0 : x.updateLayers) !== void 0 && ((X = e.message) === null || X === void 0 ? void 0 : X.updateLayers) !== null && (te.message = {
      $case: "updateLayers",
      updateLayers: Pi.fromPartial(e.message.updateLayers)
    }), ((ne = e.message) === null || ne === void 0 ? void 0 : ne.$case) === "subscriptionPermission" && ((Ce = e.message) === null || Ce === void 0 ? void 0 : Ce.subscriptionPermission) !== void 0 && ((ke = e.message) === null || ke === void 0 ? void 0 : ke.subscriptionPermission) !== null && (te.message = {
      $case: "subscriptionPermission",
      subscriptionPermission: xi.fromPartial(e.message.subscriptionPermission)
    }), ((_e = e.message) === null || _e === void 0 ? void 0 : _e.$case) === "syncState" && ((Te = e.message) === null || Te === void 0 ? void 0 : Te.syncState) !== void 0 && ((Ee = e.message) === null || Ee === void 0 ? void 0 : Ee.syncState) !== null && (te.message = {
      $case: "syncState",
      syncState: Fi.fromPartial(e.message.syncState)
    }), ((Pe = e.message) === null || Pe === void 0 ? void 0 : Pe.$case) === "simulate" && ((we = e.message) === null || we === void 0 ? void 0 : we.simulate) !== void 0 && ((Re = e.message) === null || Re === void 0 ? void 0 : Re.simulate) !== null && (te.message = {
      $case: "simulate",
      simulate: St.fromPartial(e.message.simulate)
    }), ((q = e.message) === null || q === void 0 ? void 0 : q.$case) === "ping" && ((me = e.message) === null || me === void 0 ? void 0 : me.ping) !== void 0 && ((Ae = e.message) === null || Ae === void 0 ? void 0 : Ae.ping) !== null && (te.message = {
      $case: "ping",
      ping: e.message.ping
    }), ((W = e.message) === null || W === void 0 ? void 0 : W.$case) === "updateMetadata" && ((Ie = e.message) === null || Ie === void 0 ? void 0 : Ie.updateMetadata) !== void 0 && ((De = e.message) === null || De === void 0 ? void 0 : De.updateMetadata) !== null && (te.message = {
      $case: "updateMetadata",
      updateMetadata: wi.fromPartial(e.message.updateMetadata)
    }), ((Ue = e.message) === null || Ue === void 0 ? void 0 : Ue.$case) === "pingReq" && ((Me = e.message) === null || Me === void 0 ? void 0 : Me.pingReq) !== void 0 && ((V = e.message) === null || V === void 0 ? void 0 : V.pingReq) !== null && (te.message = {
      $case: "pingReq",
      pingReq: Ji.fromPartial(e.message.pingReq)
    }), te;
  }
};
function La() {
  return {
    message: void 0
  };
}
const es = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    var i;
    switch ((i = e.message) === null || i === void 0 ? void 0 : i.$case) {
      case "join":
        Ci.encode(e.message.join, t.uint32(10).fork()).ldelim();
        break;
      case "answer":
        Y.encode(e.message.answer, t.uint32(18).fork()).ldelim();
        break;
      case "offer":
        Y.encode(e.message.offer, t.uint32(26).fork()).ldelim();
        break;
      case "trickle":
        ht.encode(e.message.trickle, t.uint32(34).fork()).ldelim();
        break;
      case "update":
        Ei.encode(e.message.update, t.uint32(42).fork()).ldelim();
        break;
      case "trackPublished":
        pt.encode(e.message.trackPublished, t.uint32(50).fork()).ldelim();
        break;
      case "leave":
        vt.encode(e.message.leave, t.uint32(66).fork()).ldelim();
        break;
      case "mute":
        ft.encode(e.message.mute, t.uint32(74).fork()).ldelim();
        break;
      case "speakersChanged":
        Ri.encode(e.message.speakersChanged, t.uint32(82).fork()).ldelim();
        break;
      case "roomUpdate":
        Oi.encode(e.message.roomUpdate, t.uint32(90).fork()).ldelim();
        break;
      case "connectionQuality":
        Ai.encode(e.message.connectionQuality, t.uint32(98).fork()).ldelim();
        break;
      case "streamStateUpdate":
        Di.encode(e.message.streamStateUpdate, t.uint32(106).fork()).ldelim();
        break;
      case "subscribedQualityUpdate":
        Mi.encode(e.message.subscribedQualityUpdate, t.uint32(114).fork()).ldelim();
        break;
      case "subscriptionPermissionUpdate":
        $i.encode(e.message.subscriptionPermissionUpdate, t.uint32(122).fork()).ldelim();
        break;
      case "refreshToken":
        t.uint32(130).string(e.message.refreshToken);
        break;
      case "trackUnpublished":
        Ti.encode(e.message.trackUnpublished, t.uint32(138).fork()).ldelim();
        break;
      case "pong":
        t.uint32(144).int64(e.message.pong);
        break;
      case "reconnect":
        _i.encode(e.message.reconnect, t.uint32(154).fork()).ldelim();
        break;
      case "pongResp":
        Vi.encode(e.message.pongResp, t.uint32(162).fork()).ldelim();
        break;
      case "subscriptionResponse":
        Hi.encode(e.message.subscriptionResponse, t.uint32(170).fork()).ldelim();
        break;
    }
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = La();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.message = {
            $case: "join",
            join: Ci.decode(i, i.uint32())
          };
          continue;
        case 2:
          if (s !== 18)
            break;
          r.message = {
            $case: "answer",
            answer: Y.decode(i, i.uint32())
          };
          continue;
        case 3:
          if (s !== 26)
            break;
          r.message = {
            $case: "offer",
            offer: Y.decode(i, i.uint32())
          };
          continue;
        case 4:
          if (s !== 34)
            break;
          r.message = {
            $case: "trickle",
            trickle: ht.decode(i, i.uint32())
          };
          continue;
        case 5:
          if (s !== 42)
            break;
          r.message = {
            $case: "update",
            update: Ei.decode(i, i.uint32())
          };
          continue;
        case 6:
          if (s !== 50)
            break;
          r.message = {
            $case: "trackPublished",
            trackPublished: pt.decode(i, i.uint32())
          };
          continue;
        case 8:
          if (s !== 66)
            break;
          r.message = {
            $case: "leave",
            leave: vt.decode(i, i.uint32())
          };
          continue;
        case 9:
          if (s !== 74)
            break;
          r.message = {
            $case: "mute",
            mute: ft.decode(i, i.uint32())
          };
          continue;
        case 10:
          if (s !== 82)
            break;
          r.message = {
            $case: "speakersChanged",
            speakersChanged: Ri.decode(i, i.uint32())
          };
          continue;
        case 11:
          if (s !== 90)
            break;
          r.message = {
            $case: "roomUpdate",
            roomUpdate: Oi.decode(i, i.uint32())
          };
          continue;
        case 12:
          if (s !== 98)
            break;
          r.message = {
            $case: "connectionQuality",
            connectionQuality: Ai.decode(i, i.uint32())
          };
          continue;
        case 13:
          if (s !== 106)
            break;
          r.message = {
            $case: "streamStateUpdate",
            streamStateUpdate: Di.decode(i, i.uint32())
          };
          continue;
        case 14:
          if (s !== 114)
            break;
          r.message = {
            $case: "subscribedQualityUpdate",
            subscribedQualityUpdate: Mi.decode(i, i.uint32())
          };
          continue;
        case 15:
          if (s !== 122)
            break;
          r.message = {
            $case: "subscriptionPermissionUpdate",
            subscriptionPermissionUpdate: $i.decode(i, i.uint32())
          };
          continue;
        case 16:
          if (s !== 130)
            break;
          r.message = {
            $case: "refreshToken",
            refreshToken: i.string()
          };
          continue;
        case 17:
          if (s !== 138)
            break;
          r.message = {
            $case: "trackUnpublished",
            trackUnpublished: Ti.decode(i, i.uint32())
          };
          continue;
        case 18:
          if (s !== 144)
            break;
          r.message = {
            $case: "pong",
            pong: ci(i.int64())
          };
          continue;
        case 19:
          if (s !== 154)
            break;
          r.message = {
            $case: "reconnect",
            reconnect: _i.decode(i, i.uint32())
          };
          continue;
        case 20:
          if (s !== 162)
            break;
          r.message = {
            $case: "pongResp",
            pongResp: Vi.decode(i, i.uint32())
          };
          continue;
        case 21:
          if (s !== 170)
            break;
          r.message = {
            $case: "subscriptionResponse",
            subscriptionResponse: Hi.decode(i, i.uint32())
          };
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      message: b(e.join) ? {
        $case: "join",
        join: Ci.fromJSON(e.join)
      } : b(e.answer) ? {
        $case: "answer",
        answer: Y.fromJSON(e.answer)
      } : b(e.offer) ? {
        $case: "offer",
        offer: Y.fromJSON(e.offer)
      } : b(e.trickle) ? {
        $case: "trickle",
        trickle: ht.fromJSON(e.trickle)
      } : b(e.update) ? {
        $case: "update",
        update: Ei.fromJSON(e.update)
      } : b(e.trackPublished) ? {
        $case: "trackPublished",
        trackPublished: pt.fromJSON(e.trackPublished)
      } : b(e.leave) ? {
        $case: "leave",
        leave: vt.fromJSON(e.leave)
      } : b(e.mute) ? {
        $case: "mute",
        mute: ft.fromJSON(e.mute)
      } : b(e.speakersChanged) ? {
        $case: "speakersChanged",
        speakersChanged: Ri.fromJSON(e.speakersChanged)
      } : b(e.roomUpdate) ? {
        $case: "roomUpdate",
        roomUpdate: Oi.fromJSON(e.roomUpdate)
      } : b(e.connectionQuality) ? {
        $case: "connectionQuality",
        connectionQuality: Ai.fromJSON(e.connectionQuality)
      } : b(e.streamStateUpdate) ? {
        $case: "streamStateUpdate",
        streamStateUpdate: Di.fromJSON(e.streamStateUpdate)
      } : b(e.subscribedQualityUpdate) ? {
        $case: "subscribedQualityUpdate",
        subscribedQualityUpdate: Mi.fromJSON(e.subscribedQualityUpdate)
      } : b(e.subscriptionPermissionUpdate) ? {
        $case: "subscriptionPermissionUpdate",
        subscriptionPermissionUpdate: $i.fromJSON(e.subscriptionPermissionUpdate)
      } : b(e.refreshToken) ? {
        $case: "refreshToken",
        refreshToken: String(e.refreshToken)
      } : b(e.trackUnpublished) ? {
        $case: "trackUnpublished",
        trackUnpublished: Ti.fromJSON(e.trackUnpublished)
      } : b(e.pong) ? {
        $case: "pong",
        pong: Number(e.pong)
      } : b(e.reconnect) ? {
        $case: "reconnect",
        reconnect: _i.fromJSON(e.reconnect)
      } : b(e.pongResp) ? {
        $case: "pongResp",
        pongResp: Vi.fromJSON(e.pongResp)
      } : b(e.subscriptionResponse) ? {
        $case: "subscriptionResponse",
        subscriptionResponse: Hi.fromJSON(e.subscriptionResponse)
      } : void 0
    };
  },
  toJSON(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C, E, A, I, B, ee, ae, he, de, L, x, X, ne, Ce, ke, _e, Te, Ee, Pe, we, Re, q, me, Ae, W, Ie, De, Ue, Me, V, te, qe, _t, Dt, Tt, Ut, Mt, Lt, xt, at, $t, Ft, Bt;
    const j = {};
    return ((t = e.message) === null || t === void 0 ? void 0 : t.$case) === "join" && (j.join = !((i = e.message) === null || i === void 0) && i.join ? Ci.toJSON((n = e.message) === null || n === void 0 ? void 0 : n.join) : void 0), ((r = e.message) === null || r === void 0 ? void 0 : r.$case) === "answer" && (j.answer = !((s = e.message) === null || s === void 0) && s.answer ? Y.toJSON((a = e.message) === null || a === void 0 ? void 0 : a.answer) : void 0), ((o = e.message) === null || o === void 0 ? void 0 : o.$case) === "offer" && (j.offer = !((c = e.message) === null || c === void 0) && c.offer ? Y.toJSON((d = e.message) === null || d === void 0 ? void 0 : d.offer) : void 0), ((u = e.message) === null || u === void 0 ? void 0 : u.$case) === "trickle" && (j.trickle = !((l = e.message) === null || l === void 0) && l.trickle ? ht.toJSON((h = e.message) === null || h === void 0 ? void 0 : h.trickle) : void 0), ((f = e.message) === null || f === void 0 ? void 0 : f.$case) === "update" && (j.update = !((p = e.message) === null || p === void 0) && p.update ? Ei.toJSON((m = e.message) === null || m === void 0 ? void 0 : m.update) : void 0), ((C = e.message) === null || C === void 0 ? void 0 : C.$case) === "trackPublished" && (j.trackPublished = !((E = e.message) === null || E === void 0) && E.trackPublished ? pt.toJSON((A = e.message) === null || A === void 0 ? void 0 : A.trackPublished) : void 0), ((I = e.message) === null || I === void 0 ? void 0 : I.$case) === "leave" && (j.leave = !((B = e.message) === null || B === void 0) && B.leave ? vt.toJSON((ee = e.message) === null || ee === void 0 ? void 0 : ee.leave) : void 0), ((ae = e.message) === null || ae === void 0 ? void 0 : ae.$case) === "mute" && (j.mute = !((he = e.message) === null || he === void 0) && he.mute ? ft.toJSON((de = e.message) === null || de === void 0 ? void 0 : de.mute) : void 0), ((L = e.message) === null || L === void 0 ? void 0 : L.$case) === "speakersChanged" && (j.speakersChanged = !((x = e.message) === null || x === void 0) && x.speakersChanged ? Ri.toJSON((X = e.message) === null || X === void 0 ? void 0 : X.speakersChanged) : void 0), ((ne = e.message) === null || ne === void 0 ? void 0 : ne.$case) === "roomUpdate" && (j.roomUpdate = !((Ce = e.message) === null || Ce === void 0) && Ce.roomUpdate ? Oi.toJSON((ke = e.message) === null || ke === void 0 ? void 0 : ke.roomUpdate) : void 0), ((_e = e.message) === null || _e === void 0 ? void 0 : _e.$case) === "connectionQuality" && (j.connectionQuality = !((Te = e.message) === null || Te === void 0) && Te.connectionQuality ? Ai.toJSON((Ee = e.message) === null || Ee === void 0 ? void 0 : Ee.connectionQuality) : void 0), ((Pe = e.message) === null || Pe === void 0 ? void 0 : Pe.$case) === "streamStateUpdate" && (j.streamStateUpdate = !((we = e.message) === null || we === void 0) && we.streamStateUpdate ? Di.toJSON((Re = e.message) === null || Re === void 0 ? void 0 : Re.streamStateUpdate) : void 0), ((q = e.message) === null || q === void 0 ? void 0 : q.$case) === "subscribedQualityUpdate" && (j.subscribedQualityUpdate = !((me = e.message) === null || me === void 0) && me.subscribedQualityUpdate ? Mi.toJSON((Ae = e.message) === null || Ae === void 0 ? void 0 : Ae.subscribedQualityUpdate) : void 0), ((W = e.message) === null || W === void 0 ? void 0 : W.$case) === "subscriptionPermissionUpdate" && (j.subscriptionPermissionUpdate = !((Ie = e.message) === null || Ie === void 0) && Ie.subscriptionPermissionUpdate ? $i.toJSON((De = e.message) === null || De === void 0 ? void 0 : De.subscriptionPermissionUpdate) : void 0), ((Ue = e.message) === null || Ue === void 0 ? void 0 : Ue.$case) === "refreshToken" && (j.refreshToken = (Me = e.message) === null || Me === void 0 ? void 0 : Me.refreshToken), ((V = e.message) === null || V === void 0 ? void 0 : V.$case) === "trackUnpublished" && (j.trackUnpublished = !((te = e.message) === null || te === void 0) && te.trackUnpublished ? Ti.toJSON((qe = e.message) === null || qe === void 0 ? void 0 : qe.trackUnpublished) : void 0), ((_t = e.message) === null || _t === void 0 ? void 0 : _t.$case) === "pong" && (j.pong = Math.round((Dt = e.message) === null || Dt === void 0 ? void 0 : Dt.pong)), ((Tt = e.message) === null || Tt === void 0 ? void 0 : Tt.$case) === "reconnect" && (j.reconnect = !((Ut = e.message) === null || Ut === void 0) && Ut.reconnect ? _i.toJSON((Mt = e.message) === null || Mt === void 0 ? void 0 : Mt.reconnect) : void 0), ((Lt = e.message) === null || Lt === void 0 ? void 0 : Lt.$case) === "pongResp" && (j.pongResp = !((xt = e.message) === null || xt === void 0) && xt.pongResp ? Vi.toJSON((at = e.message) === null || at === void 0 ? void 0 : at.pongResp) : void 0), (($t = e.message) === null || $t === void 0 ? void 0 : $t.$case) === "subscriptionResponse" && (j.subscriptionResponse = !((Ft = e.message) === null || Ft === void 0) && Ft.subscriptionResponse ? Hi.toJSON((Bt = e.message) === null || Bt === void 0 ? void 0 : Bt.subscriptionResponse) : void 0), j;
  },
  create(e) {
    return es.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C, E, A, I, B, ee, ae, he, de, L, x, X, ne, Ce, ke, _e, Te, Ee, Pe, we, Re, q, me, Ae, W, Ie, De, Ue, Me, V, te, qe, _t, Dt, Tt, Ut, Mt, Lt, xt, at, $t, Ft, Bt, j, y;
    const S = La();
    return ((t = e.message) === null || t === void 0 ? void 0 : t.$case) === "join" && ((i = e.message) === null || i === void 0 ? void 0 : i.join) !== void 0 && ((n = e.message) === null || n === void 0 ? void 0 : n.join) !== null && (S.message = {
      $case: "join",
      join: Ci.fromPartial(e.message.join)
    }), ((r = e.message) === null || r === void 0 ? void 0 : r.$case) === "answer" && ((s = e.message) === null || s === void 0 ? void 0 : s.answer) !== void 0 && ((a = e.message) === null || a === void 0 ? void 0 : a.answer) !== null && (S.message = {
      $case: "answer",
      answer: Y.fromPartial(e.message.answer)
    }), ((o = e.message) === null || o === void 0 ? void 0 : o.$case) === "offer" && ((c = e.message) === null || c === void 0 ? void 0 : c.offer) !== void 0 && ((d = e.message) === null || d === void 0 ? void 0 : d.offer) !== null && (S.message = {
      $case: "offer",
      offer: Y.fromPartial(e.message.offer)
    }), ((u = e.message) === null || u === void 0 ? void 0 : u.$case) === "trickle" && ((l = e.message) === null || l === void 0 ? void 0 : l.trickle) !== void 0 && ((h = e.message) === null || h === void 0 ? void 0 : h.trickle) !== null && (S.message = {
      $case: "trickle",
      trickle: ht.fromPartial(e.message.trickle)
    }), ((f = e.message) === null || f === void 0 ? void 0 : f.$case) === "update" && ((p = e.message) === null || p === void 0 ? void 0 : p.update) !== void 0 && ((m = e.message) === null || m === void 0 ? void 0 : m.update) !== null && (S.message = {
      $case: "update",
      update: Ei.fromPartial(e.message.update)
    }), ((C = e.message) === null || C === void 0 ? void 0 : C.$case) === "trackPublished" && ((E = e.message) === null || E === void 0 ? void 0 : E.trackPublished) !== void 0 && ((A = e.message) === null || A === void 0 ? void 0 : A.trackPublished) !== null && (S.message = {
      $case: "trackPublished",
      trackPublished: pt.fromPartial(e.message.trackPublished)
    }), ((I = e.message) === null || I === void 0 ? void 0 : I.$case) === "leave" && ((B = e.message) === null || B === void 0 ? void 0 : B.leave) !== void 0 && ((ee = e.message) === null || ee === void 0 ? void 0 : ee.leave) !== null && (S.message = {
      $case: "leave",
      leave: vt.fromPartial(e.message.leave)
    }), ((ae = e.message) === null || ae === void 0 ? void 0 : ae.$case) === "mute" && ((he = e.message) === null || he === void 0 ? void 0 : he.mute) !== void 0 && ((de = e.message) === null || de === void 0 ? void 0 : de.mute) !== null && (S.message = {
      $case: "mute",
      mute: ft.fromPartial(e.message.mute)
    }), ((L = e.message) === null || L === void 0 ? void 0 : L.$case) === "speakersChanged" && ((x = e.message) === null || x === void 0 ? void 0 : x.speakersChanged) !== void 0 && ((X = e.message) === null || X === void 0 ? void 0 : X.speakersChanged) !== null && (S.message = {
      $case: "speakersChanged",
      speakersChanged: Ri.fromPartial(e.message.speakersChanged)
    }), ((ne = e.message) === null || ne === void 0 ? void 0 : ne.$case) === "roomUpdate" && ((Ce = e.message) === null || Ce === void 0 ? void 0 : Ce.roomUpdate) !== void 0 && ((ke = e.message) === null || ke === void 0 ? void 0 : ke.roomUpdate) !== null && (S.message = {
      $case: "roomUpdate",
      roomUpdate: Oi.fromPartial(e.message.roomUpdate)
    }), ((_e = e.message) === null || _e === void 0 ? void 0 : _e.$case) === "connectionQuality" && ((Te = e.message) === null || Te === void 0 ? void 0 : Te.connectionQuality) !== void 0 && ((Ee = e.message) === null || Ee === void 0 ? void 0 : Ee.connectionQuality) !== null && (S.message = {
      $case: "connectionQuality",
      connectionQuality: Ai.fromPartial(e.message.connectionQuality)
    }), ((Pe = e.message) === null || Pe === void 0 ? void 0 : Pe.$case) === "streamStateUpdate" && ((we = e.message) === null || we === void 0 ? void 0 : we.streamStateUpdate) !== void 0 && ((Re = e.message) === null || Re === void 0 ? void 0 : Re.streamStateUpdate) !== null && (S.message = {
      $case: "streamStateUpdate",
      streamStateUpdate: Di.fromPartial(e.message.streamStateUpdate)
    }), ((q = e.message) === null || q === void 0 ? void 0 : q.$case) === "subscribedQualityUpdate" && ((me = e.message) === null || me === void 0 ? void 0 : me.subscribedQualityUpdate) !== void 0 && ((Ae = e.message) === null || Ae === void 0 ? void 0 : Ae.subscribedQualityUpdate) !== null && (S.message = {
      $case: "subscribedQualityUpdate",
      subscribedQualityUpdate: Mi.fromPartial(e.message.subscribedQualityUpdate)
    }), ((W = e.message) === null || W === void 0 ? void 0 : W.$case) === "subscriptionPermissionUpdate" && ((Ie = e.message) === null || Ie === void 0 ? void 0 : Ie.subscriptionPermissionUpdate) !== void 0 && ((De = e.message) === null || De === void 0 ? void 0 : De.subscriptionPermissionUpdate) !== null && (S.message = {
      $case: "subscriptionPermissionUpdate",
      subscriptionPermissionUpdate: $i.fromPartial(e.message.subscriptionPermissionUpdate)
    }), ((Ue = e.message) === null || Ue === void 0 ? void 0 : Ue.$case) === "refreshToken" && ((Me = e.message) === null || Me === void 0 ? void 0 : Me.refreshToken) !== void 0 && ((V = e.message) === null || V === void 0 ? void 0 : V.refreshToken) !== null && (S.message = {
      $case: "refreshToken",
      refreshToken: e.message.refreshToken
    }), ((te = e.message) === null || te === void 0 ? void 0 : te.$case) === "trackUnpublished" && ((qe = e.message) === null || qe === void 0 ? void 0 : qe.trackUnpublished) !== void 0 && ((_t = e.message) === null || _t === void 0 ? void 0 : _t.trackUnpublished) !== null && (S.message = {
      $case: "trackUnpublished",
      trackUnpublished: Ti.fromPartial(e.message.trackUnpublished)
    }), ((Dt = e.message) === null || Dt === void 0 ? void 0 : Dt.$case) === "pong" && ((Tt = e.message) === null || Tt === void 0 ? void 0 : Tt.pong) !== void 0 && ((Ut = e.message) === null || Ut === void 0 ? void 0 : Ut.pong) !== null && (S.message = {
      $case: "pong",
      pong: e.message.pong
    }), ((Mt = e.message) === null || Mt === void 0 ? void 0 : Mt.$case) === "reconnect" && ((Lt = e.message) === null || Lt === void 0 ? void 0 : Lt.reconnect) !== void 0 && ((xt = e.message) === null || xt === void 0 ? void 0 : xt.reconnect) !== null && (S.message = {
      $case: "reconnect",
      reconnect: _i.fromPartial(e.message.reconnect)
    }), ((at = e.message) === null || at === void 0 ? void 0 : at.$case) === "pongResp" && (($t = e.message) === null || $t === void 0 ? void 0 : $t.pongResp) !== void 0 && ((Ft = e.message) === null || Ft === void 0 ? void 0 : Ft.pongResp) !== null && (S.message = {
      $case: "pongResp",
      pongResp: Vi.fromPartial(e.message.pongResp)
    }), ((Bt = e.message) === null || Bt === void 0 ? void 0 : Bt.$case) === "subscriptionResponse" && ((j = e.message) === null || j === void 0 ? void 0 : j.subscriptionResponse) !== void 0 && ((y = e.message) === null || y === void 0 ? void 0 : y.subscriptionResponse) !== null && (S.message = {
      $case: "subscriptionResponse",
      subscriptionResponse: Hi.fromPartial(e.message.subscriptionResponse)
    }), S;
  }
};
function xa() {
  return {
    codec: "",
    cid: "",
    enableSimulcastLayers: !1
  };
}
const bi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.codec !== "" && t.uint32(10).string(e.codec), e.cid !== "" && t.uint32(18).string(e.cid), e.enableSimulcastLayers === !0 && t.uint32(24).bool(e.enableSimulcastLayers), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = xa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.codec = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.cid = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.enableSimulcastLayers = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      codec: b(e.codec) ? String(e.codec) : "",
      cid: b(e.cid) ? String(e.cid) : "",
      enableSimulcastLayers: b(e.enableSimulcastLayers) ? !!e.enableSimulcastLayers : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.codec !== void 0 && (t.codec = e.codec), e.cid !== void 0 && (t.cid = e.cid), e.enableSimulcastLayers !== void 0 && (t.enableSimulcastLayers = e.enableSimulcastLayers), t;
  },
  create(e) {
    return bi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = xa();
    return r.codec = (t = e.codec) !== null && t !== void 0 ? t : "", r.cid = (i = e.cid) !== null && i !== void 0 ? i : "", r.enableSimulcastLayers = (n = e.enableSimulcastLayers) !== null && n !== void 0 ? n : !1, r;
  }
};
function $a() {
  return {
    cid: "",
    name: "",
    type: 0,
    width: 0,
    height: 0,
    muted: !1,
    disableDtx: !1,
    source: 0,
    layers: [],
    simulcastCodecs: [],
    sid: "",
    stereo: !1,
    disableRed: !1,
    encryption: 0
  };
}
const Zt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.cid !== "" && t.uint32(10).string(e.cid), e.name !== "" && t.uint32(18).string(e.name), e.type !== 0 && t.uint32(24).int32(e.type), e.width !== 0 && t.uint32(32).uint32(e.width), e.height !== 0 && t.uint32(40).uint32(e.height), e.muted === !0 && t.uint32(48).bool(e.muted), e.disableDtx === !0 && t.uint32(56).bool(e.disableDtx), e.source !== 0 && t.uint32(64).int32(e.source);
    for (const i of e.layers)
      ge.encode(i, t.uint32(74).fork()).ldelim();
    for (const i of e.simulcastCodecs)
      bi.encode(i, t.uint32(82).fork()).ldelim();
    return e.sid !== "" && t.uint32(90).string(e.sid), e.stereo === !0 && t.uint32(96).bool(e.stereo), e.disableRed === !0 && t.uint32(104).bool(e.disableRed), e.encryption !== 0 && t.uint32(112).int32(e.encryption), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = $a();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.cid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.name = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.type = i.int32();
          continue;
        case 4:
          if (s !== 32)
            break;
          r.width = i.uint32();
          continue;
        case 5:
          if (s !== 40)
            break;
          r.height = i.uint32();
          continue;
        case 6:
          if (s !== 48)
            break;
          r.muted = i.bool();
          continue;
        case 7:
          if (s !== 56)
            break;
          r.disableDtx = i.bool();
          continue;
        case 8:
          if (s !== 64)
            break;
          r.source = i.int32();
          continue;
        case 9:
          if (s !== 74)
            break;
          r.layers.push(ge.decode(i, i.uint32()));
          continue;
        case 10:
          if (s !== 82)
            break;
          r.simulcastCodecs.push(bi.decode(i, i.uint32()));
          continue;
        case 11:
          if (s !== 90)
            break;
          r.sid = i.string();
          continue;
        case 12:
          if (s !== 96)
            break;
          r.stereo = i.bool();
          continue;
        case 13:
          if (s !== 104)
            break;
          r.disableRed = i.bool();
          continue;
        case 14:
          if (s !== 112)
            break;
          r.encryption = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      cid: b(e.cid) ? String(e.cid) : "",
      name: b(e.name) ? String(e.name) : "",
      type: b(e.type) ? mc(e.type) : 0,
      width: b(e.width) ? Number(e.width) : 0,
      height: b(e.height) ? Number(e.height) : 0,
      muted: b(e.muted) ? !!e.muted : !1,
      disableDtx: b(e.disableDtx) ? !!e.disableDtx : !1,
      source: b(e.source) ? ys(e.source) : 0,
      layers: Array.isArray(e == null ? void 0 : e.layers) ? e.layers.map((t) => ge.fromJSON(t)) : [],
      simulcastCodecs: Array.isArray(e == null ? void 0 : e.simulcastCodecs) ? e.simulcastCodecs.map((t) => bi.fromJSON(t)) : [],
      sid: b(e.sid) ? String(e.sid) : "",
      stereo: b(e.stereo) ? !!e.stereo : !1,
      disableRed: b(e.disableRed) ? !!e.disableRed : !1,
      encryption: b(e.encryption) ? gc(e.encryption) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.cid !== void 0 && (t.cid = e.cid), e.name !== void 0 && (t.name = e.name), e.type !== void 0 && (t.type = vc(e.type)), e.width !== void 0 && (t.width = Math.round(e.width)), e.height !== void 0 && (t.height = Math.round(e.height)), e.muted !== void 0 && (t.muted = e.muted), e.disableDtx !== void 0 && (t.disableDtx = e.disableDtx), e.source !== void 0 && (t.source = Ss(e.source)), e.layers ? t.layers = e.layers.map((i) => i ? ge.toJSON(i) : void 0) : t.layers = [], e.simulcastCodecs ? t.simulcastCodecs = e.simulcastCodecs.map((i) => i ? bi.toJSON(i) : void 0) : t.simulcastCodecs = [], e.sid !== void 0 && (t.sid = e.sid), e.stereo !== void 0 && (t.stereo = e.stereo), e.disableRed !== void 0 && (t.disableRed = e.disableRed), e.encryption !== void 0 && (t.encryption = yc(e.encryption)), t;
  },
  create(e) {
    return Zt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p;
    const m = $a();
    return m.cid = (t = e.cid) !== null && t !== void 0 ? t : "", m.name = (i = e.name) !== null && i !== void 0 ? i : "", m.type = (n = e.type) !== null && n !== void 0 ? n : 0, m.width = (r = e.width) !== null && r !== void 0 ? r : 0, m.height = (s = e.height) !== null && s !== void 0 ? s : 0, m.muted = (a = e.muted) !== null && a !== void 0 ? a : !1, m.disableDtx = (o = e.disableDtx) !== null && o !== void 0 ? o : !1, m.source = (c = e.source) !== null && c !== void 0 ? c : 0, m.layers = ((d = e.layers) === null || d === void 0 ? void 0 : d.map((C) => ge.fromPartial(C))) || [], m.simulcastCodecs = ((u = e.simulcastCodecs) === null || u === void 0 ? void 0 : u.map((C) => bi.fromPartial(C))) || [], m.sid = (l = e.sid) !== null && l !== void 0 ? l : "", m.stereo = (h = e.stereo) !== null && h !== void 0 ? h : !1, m.disableRed = (f = e.disableRed) !== null && f !== void 0 ? f : !1, m.encryption = (p = e.encryption) !== null && p !== void 0 ? p : 0, m;
  }
};
function Fa() {
  return {
    candidateInit: "",
    target: 0
  };
}
const ht = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.candidateInit !== "" && t.uint32(10).string(e.candidateInit), e.target !== 0 && t.uint32(16).int32(e.target), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Fa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.candidateInit = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.target = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      candidateInit: b(e.candidateInit) ? String(e.candidateInit) : "",
      target: b(e.target) ? nd(e.target) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.candidateInit !== void 0 && (t.candidateInit = e.candidateInit), e.target !== void 0 && (t.target = rd(e.target)), t;
  },
  create(e) {
    return ht.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Fa();
    return n.candidateInit = (t = e.candidateInit) !== null && t !== void 0 ? t : "", n.target = (i = e.target) !== null && i !== void 0 ? i : 0, n;
  }
};
function Ba() {
  return {
    sid: "",
    muted: !1
  };
}
const ft = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.sid !== "" && t.uint32(10).string(e.sid), e.muted === !0 && t.uint32(16).bool(e.muted), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ba();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.sid = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.muted = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      sid: b(e.sid) ? String(e.sid) : "",
      muted: b(e.muted) ? !!e.muted : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.sid !== void 0 && (t.sid = e.sid), e.muted !== void 0 && (t.muted = e.muted), t;
  },
  create(e) {
    return ft.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ba();
    return n.sid = (t = e.sid) !== null && t !== void 0 ? t : "", n.muted = (i = e.muted) !== null && i !== void 0 ? i : !1, n;
  }
};
function Ja() {
  return {
    room: void 0,
    participant: void 0,
    otherParticipants: [],
    serverVersion: "",
    iceServers: [],
    subscriberPrimary: !1,
    alternativeUrl: "",
    clientConfiguration: void 0,
    serverRegion: "",
    pingTimeout: 0,
    pingInterval: 0,
    serverInfo: void 0,
    sifTrailer: new Uint8Array()
  };
}
const Ci = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.room !== void 0 && dt.encode(e.room, t.uint32(10).fork()).ldelim(), e.participant !== void 0 && Oe.encode(e.participant, t.uint32(18).fork()).ldelim();
    for (const i of e.otherParticipants)
      Oe.encode(i, t.uint32(26).fork()).ldelim();
    e.serverVersion !== "" && t.uint32(34).string(e.serverVersion);
    for (const i of e.iceServers)
      gt.encode(i, t.uint32(42).fork()).ldelim();
    return e.subscriberPrimary === !0 && t.uint32(48).bool(e.subscriberPrimary), e.alternativeUrl !== "" && t.uint32(58).string(e.alternativeUrl), e.clientConfiguration !== void 0 && lt.encode(e.clientConfiguration, t.uint32(66).fork()).ldelim(), e.serverRegion !== "" && t.uint32(74).string(e.serverRegion), e.pingTimeout !== 0 && t.uint32(80).int32(e.pingTimeout), e.pingInterval !== 0 && t.uint32(88).int32(e.pingInterval), e.serverInfo !== void 0 && Si.encode(e.serverInfo, t.uint32(98).fork()).ldelim(), e.sifTrailer.length !== 0 && t.uint32(106).bytes(e.sifTrailer), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ja();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.room = dt.decode(i, i.uint32());
          continue;
        case 2:
          if (s !== 18)
            break;
          r.participant = Oe.decode(i, i.uint32());
          continue;
        case 3:
          if (s !== 26)
            break;
          r.otherParticipants.push(Oe.decode(i, i.uint32()));
          continue;
        case 4:
          if (s !== 34)
            break;
          r.serverVersion = i.string();
          continue;
        case 5:
          if (s !== 42)
            break;
          r.iceServers.push(gt.decode(i, i.uint32()));
          continue;
        case 6:
          if (s !== 48)
            break;
          r.subscriberPrimary = i.bool();
          continue;
        case 7:
          if (s !== 58)
            break;
          r.alternativeUrl = i.string();
          continue;
        case 8:
          if (s !== 66)
            break;
          r.clientConfiguration = lt.decode(i, i.uint32());
          continue;
        case 9:
          if (s !== 74)
            break;
          r.serverRegion = i.string();
          continue;
        case 10:
          if (s !== 80)
            break;
          r.pingTimeout = i.int32();
          continue;
        case 11:
          if (s !== 88)
            break;
          r.pingInterval = i.int32();
          continue;
        case 12:
          if (s !== 98)
            break;
          r.serverInfo = Si.decode(i, i.uint32());
          continue;
        case 13:
          if (s !== 106)
            break;
          r.sifTrailer = i.bytes();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      room: b(e.room) ? dt.fromJSON(e.room) : void 0,
      participant: b(e.participant) ? Oe.fromJSON(e.participant) : void 0,
      otherParticipants: Array.isArray(e == null ? void 0 : e.otherParticipants) ? e.otherParticipants.map((t) => Oe.fromJSON(t)) : [],
      serverVersion: b(e.serverVersion) ? String(e.serverVersion) : "",
      iceServers: Array.isArray(e == null ? void 0 : e.iceServers) ? e.iceServers.map((t) => gt.fromJSON(t)) : [],
      subscriberPrimary: b(e.subscriberPrimary) ? !!e.subscriberPrimary : !1,
      alternativeUrl: b(e.alternativeUrl) ? String(e.alternativeUrl) : "",
      clientConfiguration: b(e.clientConfiguration) ? lt.fromJSON(e.clientConfiguration) : void 0,
      serverRegion: b(e.serverRegion) ? String(e.serverRegion) : "",
      pingTimeout: b(e.pingTimeout) ? Number(e.pingTimeout) : 0,
      pingInterval: b(e.pingInterval) ? Number(e.pingInterval) : 0,
      serverInfo: b(e.serverInfo) ? Si.fromJSON(e.serverInfo) : void 0,
      sifTrailer: b(e.sifTrailer) ? Zl(e.sifTrailer) : new Uint8Array()
    };
  },
  toJSON(e) {
    const t = {};
    return e.room !== void 0 && (t.room = e.room ? dt.toJSON(e.room) : void 0), e.participant !== void 0 && (t.participant = e.participant ? Oe.toJSON(e.participant) : void 0), e.otherParticipants ? t.otherParticipants = e.otherParticipants.map((i) => i ? Oe.toJSON(i) : void 0) : t.otherParticipants = [], e.serverVersion !== void 0 && (t.serverVersion = e.serverVersion), e.iceServers ? t.iceServers = e.iceServers.map((i) => i ? gt.toJSON(i) : void 0) : t.iceServers = [], e.subscriberPrimary !== void 0 && (t.subscriberPrimary = e.subscriberPrimary), e.alternativeUrl !== void 0 && (t.alternativeUrl = e.alternativeUrl), e.clientConfiguration !== void 0 && (t.clientConfiguration = e.clientConfiguration ? lt.toJSON(e.clientConfiguration) : void 0), e.serverRegion !== void 0 && (t.serverRegion = e.serverRegion), e.pingTimeout !== void 0 && (t.pingTimeout = Math.round(e.pingTimeout)), e.pingInterval !== void 0 && (t.pingInterval = Math.round(e.pingInterval)), e.serverInfo !== void 0 && (t.serverInfo = e.serverInfo ? Si.toJSON(e.serverInfo) : void 0), e.sifTrailer !== void 0 && (t.sifTrailer = Ql(e.sifTrailer !== void 0 ? e.sifTrailer : new Uint8Array())), t;
  },
  create(e) {
    return Ci.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d;
    const u = Ja();
    return u.room = e.room !== void 0 && e.room !== null ? dt.fromPartial(e.room) : void 0, u.participant = e.participant !== void 0 && e.participant !== null ? Oe.fromPartial(e.participant) : void 0, u.otherParticipants = ((t = e.otherParticipants) === null || t === void 0 ? void 0 : t.map((l) => Oe.fromPartial(l))) || [], u.serverVersion = (i = e.serverVersion) !== null && i !== void 0 ? i : "", u.iceServers = ((n = e.iceServers) === null || n === void 0 ? void 0 : n.map((l) => gt.fromPartial(l))) || [], u.subscriberPrimary = (r = e.subscriberPrimary) !== null && r !== void 0 ? r : !1, u.alternativeUrl = (s = e.alternativeUrl) !== null && s !== void 0 ? s : "", u.clientConfiguration = e.clientConfiguration !== void 0 && e.clientConfiguration !== null ? lt.fromPartial(e.clientConfiguration) : void 0, u.serverRegion = (a = e.serverRegion) !== null && a !== void 0 ? a : "", u.pingTimeout = (o = e.pingTimeout) !== null && o !== void 0 ? o : 0, u.pingInterval = (c = e.pingInterval) !== null && c !== void 0 ? c : 0, u.serverInfo = e.serverInfo !== void 0 && e.serverInfo !== null ? Si.fromPartial(e.serverInfo) : void 0, u.sifTrailer = (d = e.sifTrailer) !== null && d !== void 0 ? d : new Uint8Array(), u;
  }
};
function Va() {
  return {
    iceServers: [],
    clientConfiguration: void 0
  };
}
const _i = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.iceServers)
      gt.encode(i, t.uint32(10).fork()).ldelim();
    return e.clientConfiguration !== void 0 && lt.encode(e.clientConfiguration, t.uint32(18).fork()).ldelim(), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Va();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.iceServers.push(gt.decode(i, i.uint32()));
          continue;
        case 2:
          if (s !== 18)
            break;
          r.clientConfiguration = lt.decode(i, i.uint32());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      iceServers: Array.isArray(e == null ? void 0 : e.iceServers) ? e.iceServers.map((t) => gt.fromJSON(t)) : [],
      clientConfiguration: b(e.clientConfiguration) ? lt.fromJSON(e.clientConfiguration) : void 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.iceServers ? t.iceServers = e.iceServers.map((i) => i ? gt.toJSON(i) : void 0) : t.iceServers = [], e.clientConfiguration !== void 0 && (t.clientConfiguration = e.clientConfiguration ? lt.toJSON(e.clientConfiguration) : void 0), t;
  },
  create(e) {
    return _i.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = Va();
    return i.iceServers = ((t = e.iceServers) === null || t === void 0 ? void 0 : t.map((n) => gt.fromPartial(n))) || [], i.clientConfiguration = e.clientConfiguration !== void 0 && e.clientConfiguration !== null ? lt.fromPartial(e.clientConfiguration) : void 0, i;
  }
};
function Ha() {
  return {
    cid: "",
    track: void 0
  };
}
const pt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.cid !== "" && t.uint32(10).string(e.cid), e.track !== void 0 && Je.encode(e.track, t.uint32(18).fork()).ldelim(), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ha();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.cid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.track = Je.decode(i, i.uint32());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      cid: b(e.cid) ? String(e.cid) : "",
      track: b(e.track) ? Je.fromJSON(e.track) : void 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.cid !== void 0 && (t.cid = e.cid), e.track !== void 0 && (t.track = e.track ? Je.toJSON(e.track) : void 0), t;
  },
  create(e) {
    return pt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = Ha();
    return i.cid = (t = e.cid) !== null && t !== void 0 ? t : "", i.track = e.track !== void 0 && e.track !== null ? Je.fromPartial(e.track) : void 0, i;
  }
};
function qa() {
  return {
    trackSid: ""
  };
}
const Ti = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.trackSid !== "" && t.uint32(10).string(e.trackSid), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = qa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSid = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSid: b(e.trackSid) ? String(e.trackSid) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSid !== void 0 && (t.trackSid = e.trackSid), t;
  },
  create(e) {
    return Ti.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = qa();
    return i.trackSid = (t = e.trackSid) !== null && t !== void 0 ? t : "", i;
  }
};
function Ga() {
  return {
    type: "",
    sdp: ""
  };
}
const Y = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.type !== "" && t.uint32(10).string(e.type), e.sdp !== "" && t.uint32(18).string(e.sdp), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ga();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.type = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.sdp = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      type: b(e.type) ? String(e.type) : "",
      sdp: b(e.sdp) ? String(e.sdp) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.type !== void 0 && (t.type = e.type), e.sdp !== void 0 && (t.sdp = e.sdp), t;
  },
  create(e) {
    return Y.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ga();
    return n.type = (t = e.type) !== null && t !== void 0 ? t : "", n.sdp = (i = e.sdp) !== null && i !== void 0 ? i : "", n;
  }
};
function Wa() {
  return {
    participants: []
  };
}
const Ei = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.participants)
      Oe.encode(i, t.uint32(10).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Wa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participants.push(Oe.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participants: Array.isArray(e == null ? void 0 : e.participants) ? e.participants.map((t) => Oe.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.participants ? t.participants = e.participants.map((i) => i ? Oe.toJSON(i) : void 0) : t.participants = [], t;
  },
  create(e) {
    return Ei.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = Wa();
    return i.participants = ((t = e.participants) === null || t === void 0 ? void 0 : t.map((n) => Oe.fromPartial(n))) || [], i;
  }
};
function za() {
  return {
    trackSids: [],
    subscribe: !1,
    participantTracks: []
  };
}
const mt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.trackSids)
      t.uint32(10).string(i);
    e.subscribe === !0 && t.uint32(16).bool(e.subscribe);
    for (const i of e.participantTracks)
      yi.encode(i, t.uint32(26).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = za();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSids.push(i.string());
          continue;
        case 2:
          if (s !== 16)
            break;
          r.subscribe = i.bool();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.participantTracks.push(yi.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSids: Array.isArray(e == null ? void 0 : e.trackSids) ? e.trackSids.map((t) => String(t)) : [],
      subscribe: b(e.subscribe) ? !!e.subscribe : !1,
      participantTracks: Array.isArray(e == null ? void 0 : e.participantTracks) ? e.participantTracks.map((t) => yi.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSids ? t.trackSids = e.trackSids.map((i) => i) : t.trackSids = [], e.subscribe !== void 0 && (t.subscribe = e.subscribe), e.participantTracks ? t.participantTracks = e.participantTracks.map((i) => i ? yi.toJSON(i) : void 0) : t.participantTracks = [], t;
  },
  create(e) {
    return mt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = za();
    return r.trackSids = ((t = e.trackSids) === null || t === void 0 ? void 0 : t.map((s) => s)) || [], r.subscribe = (i = e.subscribe) !== null && i !== void 0 ? i : !1, r.participantTracks = ((n = e.participantTracks) === null || n === void 0 ? void 0 : n.map((s) => yi.fromPartial(s))) || [], r;
  }
};
function Za() {
  return {
    trackSids: [],
    disabled: !1,
    quality: 0,
    width: 0,
    height: 0,
    fps: 0,
    priority: 0
  };
}
const Xt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.trackSids)
      t.uint32(10).string(i);
    return e.disabled === !0 && t.uint32(24).bool(e.disabled), e.quality !== 0 && t.uint32(32).int32(e.quality), e.width !== 0 && t.uint32(40).uint32(e.width), e.height !== 0 && t.uint32(48).uint32(e.height), e.fps !== 0 && t.uint32(56).uint32(e.fps), e.priority !== 0 && t.uint32(64).uint32(e.priority), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Za();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSids.push(i.string());
          continue;
        case 3:
          if (s !== 24)
            break;
          r.disabled = i.bool();
          continue;
        case 4:
          if (s !== 32)
            break;
          r.quality = i.int32();
          continue;
        case 5:
          if (s !== 40)
            break;
          r.width = i.uint32();
          continue;
        case 6:
          if (s !== 48)
            break;
          r.height = i.uint32();
          continue;
        case 7:
          if (s !== 56)
            break;
          r.fps = i.uint32();
          continue;
        case 8:
          if (s !== 64)
            break;
          r.priority = i.uint32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSids: Array.isArray(e == null ? void 0 : e.trackSids) ? e.trackSids.map((t) => String(t)) : [],
      disabled: b(e.disabled) ? !!e.disabled : !1,
      quality: b(e.quality) ? ks(e.quality) : 0,
      width: b(e.width) ? Number(e.width) : 0,
      height: b(e.height) ? Number(e.height) : 0,
      fps: b(e.fps) ? Number(e.fps) : 0,
      priority: b(e.priority) ? Number(e.priority) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSids ? t.trackSids = e.trackSids.map((i) => i) : t.trackSids = [], e.disabled !== void 0 && (t.disabled = e.disabled), e.quality !== void 0 && (t.quality = bs(e.quality)), e.width !== void 0 && (t.width = Math.round(e.width)), e.height !== void 0 && (t.height = Math.round(e.height)), e.fps !== void 0 && (t.fps = Math.round(e.fps)), e.priority !== void 0 && (t.priority = Math.round(e.priority)), t;
  },
  create(e) {
    return Xt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o;
    const c = Za();
    return c.trackSids = ((t = e.trackSids) === null || t === void 0 ? void 0 : t.map((d) => d)) || [], c.disabled = (i = e.disabled) !== null && i !== void 0 ? i : !1, c.quality = (n = e.quality) !== null && n !== void 0 ? n : 0, c.width = (r = e.width) !== null && r !== void 0 ? r : 0, c.height = (s = e.height) !== null && s !== void 0 ? s : 0, c.fps = (a = e.fps) !== null && a !== void 0 ? a : 0, c.priority = (o = e.priority) !== null && o !== void 0 ? o : 0, c;
  }
};
function Qa() {
  return {
    canReconnect: !1,
    reason: 0
  };
}
const vt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.canReconnect === !0 && t.uint32(8).bool(e.canReconnect), e.reason !== 0 && t.uint32(16).int32(e.reason), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Qa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.canReconnect = i.bool();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.reason = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      canReconnect: b(e.canReconnect) ? !!e.canReconnect : !1,
      reason: b(e.reason) ? Sl(e.reason) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.canReconnect !== void 0 && (t.canReconnect = e.canReconnect), e.reason !== void 0 && (t.reason = kl(e.reason)), t;
  },
  create(e) {
    return vt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Qa();
    return n.canReconnect = (t = e.canReconnect) !== null && t !== void 0 ? t : !1, n.reason = (i = e.reason) !== null && i !== void 0 ? i : 0, n;
  }
};
function Ka() {
  return {
    trackSid: "",
    layers: []
  };
}
const Pi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.trackSid !== "" && t.uint32(10).string(e.trackSid);
    for (const i of e.layers)
      ge.encode(i, t.uint32(18).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ka();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.layers.push(ge.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSid: b(e.trackSid) ? String(e.trackSid) : "",
      layers: Array.isArray(e == null ? void 0 : e.layers) ? e.layers.map((t) => ge.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSid !== void 0 && (t.trackSid = e.trackSid), e.layers ? t.layers = e.layers.map((i) => i ? ge.toJSON(i) : void 0) : t.layers = [], t;
  },
  create(e) {
    return Pi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ka();
    return n.trackSid = (t = e.trackSid) !== null && t !== void 0 ? t : "", n.layers = ((i = e.layers) === null || i === void 0 ? void 0 : i.map((r) => ge.fromPartial(r))) || [], n;
  }
};
function Ya() {
  return {
    metadata: "",
    name: ""
  };
}
const wi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.metadata !== "" && t.uint32(10).string(e.metadata), e.name !== "" && t.uint32(18).string(e.name), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Ya();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.metadata = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.name = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      metadata: b(e.metadata) ? String(e.metadata) : "",
      name: b(e.name) ? String(e.name) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.metadata !== void 0 && (t.metadata = e.metadata), e.name !== void 0 && (t.name = e.name), t;
  },
  create(e) {
    return wi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = Ya();
    return n.metadata = (t = e.metadata) !== null && t !== void 0 ? t : "", n.name = (i = e.name) !== null && i !== void 0 ? i : "", n;
  }
};
function Xa() {
  return {
    urls: [],
    username: "",
    credential: ""
  };
}
const gt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.urls)
      t.uint32(10).string(i);
    return e.username !== "" && t.uint32(18).string(e.username), e.credential !== "" && t.uint32(26).string(e.credential), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = Xa();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.urls.push(i.string());
          continue;
        case 2:
          if (s !== 18)
            break;
          r.username = i.string();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.credential = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      urls: Array.isArray(e == null ? void 0 : e.urls) ? e.urls.map((t) => String(t)) : [],
      username: b(e.username) ? String(e.username) : "",
      credential: b(e.credential) ? String(e.credential) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.urls ? t.urls = e.urls.map((i) => i) : t.urls = [], e.username !== void 0 && (t.username = e.username), e.credential !== void 0 && (t.credential = e.credential), t;
  },
  create(e) {
    return gt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = Xa();
    return r.urls = ((t = e.urls) === null || t === void 0 ? void 0 : t.map((s) => s)) || [], r.username = (i = e.username) !== null && i !== void 0 ? i : "", r.credential = (n = e.credential) !== null && n !== void 0 ? n : "", r;
  }
};
function ja() {
  return {
    speakers: []
  };
}
const Ri = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.speakers)
      ut.encode(i, t.uint32(10).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ja();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.speakers.push(ut.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      speakers: Array.isArray(e == null ? void 0 : e.speakers) ? e.speakers.map((t) => ut.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.speakers ? t.speakers = e.speakers.map((i) => i ? ut.toJSON(i) : void 0) : t.speakers = [], t;
  },
  create(e) {
    return Ri.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = ja();
    return i.speakers = ((t = e.speakers) === null || t === void 0 ? void 0 : t.map((n) => ut.fromPartial(n))) || [], i;
  }
};
function eo() {
  return {
    room: void 0
  };
}
const Oi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.room !== void 0 && dt.encode(e.room, t.uint32(10).fork()).ldelim(), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = eo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.room = dt.decode(i, i.uint32());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      room: b(e.room) ? dt.fromJSON(e.room) : void 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.room !== void 0 && (t.room = e.room ? dt.toJSON(e.room) : void 0), t;
  },
  create(e) {
    return Oi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    const t = eo();
    return t.room = e.room !== void 0 && e.room !== null ? dt.fromPartial(e.room) : void 0, t;
  }
};
function to() {
  return {
    participantSid: "",
    quality: 0,
    score: 0
  };
}
const Ni = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.participantSid !== "" && t.uint32(10).string(e.participantSid), e.quality !== 0 && t.uint32(16).int32(e.quality), e.score !== 0 && t.uint32(29).float(e.score), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = to();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.quality = i.int32();
          continue;
        case 3:
          if (s !== 29)
            break;
          r.score = i.float();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: b(e.participantSid) ? String(e.participantSid) : "",
      quality: b(e.quality) ? gl(e.quality) : 0,
      score: b(e.score) ? Number(e.score) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.quality !== void 0 && (t.quality = yl(e.quality)), e.score !== void 0 && (t.score = e.score), t;
  },
  create(e) {
    return Ni.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = to();
    return r.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", r.quality = (i = e.quality) !== null && i !== void 0 ? i : 0, r.score = (n = e.score) !== null && n !== void 0 ? n : 0, r;
  }
};
function io() {
  return {
    updates: []
  };
}
const Ai = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.updates)
      Ni.encode(i, t.uint32(10).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = io();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.updates.push(Ni.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      updates: Array.isArray(e == null ? void 0 : e.updates) ? e.updates.map((t) => Ni.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.updates ? t.updates = e.updates.map((i) => i ? Ni.toJSON(i) : void 0) : t.updates = [], t;
  },
  create(e) {
    return Ai.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = io();
    return i.updates = ((t = e.updates) === null || t === void 0 ? void 0 : t.map((n) => Ni.fromPartial(n))) || [], i;
  }
};
function no() {
  return {
    participantSid: "",
    trackSid: "",
    state: 0
  };
}
const Ii = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.participantSid !== "" && t.uint32(10).string(e.participantSid), e.trackSid !== "" && t.uint32(18).string(e.trackSid), e.state !== 0 && t.uint32(24).int32(e.state), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = no();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.trackSid = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.state = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: b(e.participantSid) ? String(e.participantSid) : "",
      trackSid: b(e.trackSid) ? String(e.trackSid) : "",
      state: b(e.state) ? ql(e.state) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.trackSid !== void 0 && (t.trackSid = e.trackSid), e.state !== void 0 && (t.state = Gl(e.state)), t;
  },
  create(e) {
    return Ii.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = no();
    return r.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", r.trackSid = (i = e.trackSid) !== null && i !== void 0 ? i : "", r.state = (n = e.state) !== null && n !== void 0 ? n : 0, r;
  }
};
function ro() {
  return {
    streamStates: []
  };
}
const Di = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    for (const i of e.streamStates)
      Ii.encode(i, t.uint32(10).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ro();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.streamStates.push(Ii.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      streamStates: Array.isArray(e == null ? void 0 : e.streamStates) ? e.streamStates.map((t) => Ii.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.streamStates ? t.streamStates = e.streamStates.map((i) => i ? Ii.toJSON(i) : void 0) : t.streamStates = [], t;
  },
  create(e) {
    return Di.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t;
    const i = ro();
    return i.streamStates = ((t = e.streamStates) === null || t === void 0 ? void 0 : t.map((n) => Ii.fromPartial(n))) || [], i;
  }
};
function so() {
  return {
    quality: 0,
    enabled: !1
  };
}
const yt = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.quality !== 0 && t.uint32(8).int32(e.quality), e.enabled === !0 && t.uint32(16).bool(e.enabled), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = so();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.quality = i.int32();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.enabled = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      quality: b(e.quality) ? ks(e.quality) : 0,
      enabled: b(e.enabled) ? !!e.enabled : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.quality !== void 0 && (t.quality = bs(e.quality)), e.enabled !== void 0 && (t.enabled = e.enabled), t;
  },
  create(e) {
    return yt.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = so();
    return n.quality = (t = e.quality) !== null && t !== void 0 ? t : 0, n.enabled = (i = e.enabled) !== null && i !== void 0 ? i : !1, n;
  }
};
function ao() {
  return {
    codec: "",
    qualities: []
  };
}
const Ui = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.codec !== "" && t.uint32(10).string(e.codec);
    for (const i of e.qualities)
      yt.encode(i, t.uint32(18).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ao();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.codec = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.qualities.push(yt.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      codec: b(e.codec) ? String(e.codec) : "",
      qualities: Array.isArray(e == null ? void 0 : e.qualities) ? e.qualities.map((t) => yt.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.codec !== void 0 && (t.codec = e.codec), e.qualities ? t.qualities = e.qualities.map((i) => i ? yt.toJSON(i) : void 0) : t.qualities = [], t;
  },
  create(e) {
    return Ui.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = ao();
    return n.codec = (t = e.codec) !== null && t !== void 0 ? t : "", n.qualities = ((i = e.qualities) === null || i === void 0 ? void 0 : i.map((r) => yt.fromPartial(r))) || [], n;
  }
};
function oo() {
  return {
    trackSid: "",
    subscribedQualities: [],
    subscribedCodecs: []
  };
}
const Mi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.trackSid !== "" && t.uint32(10).string(e.trackSid);
    for (const i of e.subscribedQualities)
      yt.encode(i, t.uint32(18).fork()).ldelim();
    for (const i of e.subscribedCodecs)
      Ui.encode(i, t.uint32(26).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = oo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.subscribedQualities.push(yt.decode(i, i.uint32()));
          continue;
        case 3:
          if (s !== 26)
            break;
          r.subscribedCodecs.push(Ui.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSid: b(e.trackSid) ? String(e.trackSid) : "",
      subscribedQualities: Array.isArray(e == null ? void 0 : e.subscribedQualities) ? e.subscribedQualities.map((t) => yt.fromJSON(t)) : [],
      subscribedCodecs: Array.isArray(e == null ? void 0 : e.subscribedCodecs) ? e.subscribedCodecs.map((t) => Ui.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSid !== void 0 && (t.trackSid = e.trackSid), e.subscribedQualities ? t.subscribedQualities = e.subscribedQualities.map((i) => i ? yt.toJSON(i) : void 0) : t.subscribedQualities = [], e.subscribedCodecs ? t.subscribedCodecs = e.subscribedCodecs.map((i) => i ? Ui.toJSON(i) : void 0) : t.subscribedCodecs = [], t;
  },
  create(e) {
    return Mi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = oo();
    return r.trackSid = (t = e.trackSid) !== null && t !== void 0 ? t : "", r.subscribedQualities = ((i = e.subscribedQualities) === null || i === void 0 ? void 0 : i.map((s) => yt.fromPartial(s))) || [], r.subscribedCodecs = ((n = e.subscribedCodecs) === null || n === void 0 ? void 0 : n.map((s) => Ui.fromPartial(s))) || [], r;
  }
};
function co() {
  return {
    participantSid: "",
    allTracks: !1,
    trackSids: [],
    participantIdentity: ""
  };
}
const Li = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.participantSid !== "" && t.uint32(10).string(e.participantSid), e.allTracks === !0 && t.uint32(16).bool(e.allTracks);
    for (const i of e.trackSids)
      t.uint32(26).string(i);
    return e.participantIdentity !== "" && t.uint32(34).string(e.participantIdentity), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = co();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.allTracks = i.bool();
          continue;
        case 3:
          if (s !== 26)
            break;
          r.trackSids.push(i.string());
          continue;
        case 4:
          if (s !== 34)
            break;
          r.participantIdentity = i.string();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: b(e.participantSid) ? String(e.participantSid) : "",
      allTracks: b(e.allTracks) ? !!e.allTracks : !1,
      trackSids: Array.isArray(e == null ? void 0 : e.trackSids) ? e.trackSids.map((t) => String(t)) : [],
      participantIdentity: b(e.participantIdentity) ? String(e.participantIdentity) : ""
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.allTracks !== void 0 && (t.allTracks = e.allTracks), e.trackSids ? t.trackSids = e.trackSids.map((i) => i) : t.trackSids = [], e.participantIdentity !== void 0 && (t.participantIdentity = e.participantIdentity), t;
  },
  create(e) {
    return Li.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r;
    const s = co();
    return s.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", s.allTracks = (i = e.allTracks) !== null && i !== void 0 ? i : !1, s.trackSids = ((n = e.trackSids) === null || n === void 0 ? void 0 : n.map((a) => a)) || [], s.participantIdentity = (r = e.participantIdentity) !== null && r !== void 0 ? r : "", s;
  }
};
function uo() {
  return {
    allParticipants: !1,
    trackPermissions: []
  };
}
const xi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.allParticipants === !0 && t.uint32(8).bool(e.allParticipants);
    for (const i of e.trackPermissions)
      Li.encode(i, t.uint32(18).fork()).ldelim();
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = uo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.allParticipants = i.bool();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.trackPermissions.push(Li.decode(i, i.uint32()));
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      allParticipants: b(e.allParticipants) ? !!e.allParticipants : !1,
      trackPermissions: Array.isArray(e == null ? void 0 : e.trackPermissions) ? e.trackPermissions.map((t) => Li.fromJSON(t)) : []
    };
  },
  toJSON(e) {
    const t = {};
    return e.allParticipants !== void 0 && (t.allParticipants = e.allParticipants), e.trackPermissions ? t.trackPermissions = e.trackPermissions.map((i) => i ? Li.toJSON(i) : void 0) : t.trackPermissions = [], t;
  },
  create(e) {
    return xi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = uo();
    return n.allParticipants = (t = e.allParticipants) !== null && t !== void 0 ? t : !1, n.trackPermissions = ((i = e.trackPermissions) === null || i === void 0 ? void 0 : i.map((r) => Li.fromPartial(r))) || [], n;
  }
};
function lo() {
  return {
    participantSid: "",
    trackSid: "",
    allowed: !1
  };
}
const $i = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.participantSid !== "" && t.uint32(10).string(e.participantSid), e.trackSid !== "" && t.uint32(18).string(e.trackSid), e.allowed === !0 && t.uint32(24).bool(e.allowed), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = lo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.participantSid = i.string();
          continue;
        case 2:
          if (s !== 18)
            break;
          r.trackSid = i.string();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.allowed = i.bool();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      participantSid: b(e.participantSid) ? String(e.participantSid) : "",
      trackSid: b(e.trackSid) ? String(e.trackSid) : "",
      allowed: b(e.allowed) ? !!e.allowed : !1
    };
  },
  toJSON(e) {
    const t = {};
    return e.participantSid !== void 0 && (t.participantSid = e.participantSid), e.trackSid !== void 0 && (t.trackSid = e.trackSid), e.allowed !== void 0 && (t.allowed = e.allowed), t;
  },
  create(e) {
    return $i.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = lo();
    return r.participantSid = (t = e.participantSid) !== null && t !== void 0 ? t : "", r.trackSid = (i = e.trackSid) !== null && i !== void 0 ? i : "", r.allowed = (n = e.allowed) !== null && n !== void 0 ? n : !1, r;
  }
};
function ho() {
  return {
    answer: void 0,
    subscription: void 0,
    publishTracks: [],
    dataChannels: [],
    offer: void 0
  };
}
const Fi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    e.answer !== void 0 && Y.encode(e.answer, t.uint32(10).fork()).ldelim(), e.subscription !== void 0 && mt.encode(e.subscription, t.uint32(18).fork()).ldelim();
    for (const i of e.publishTracks)
      pt.encode(i, t.uint32(26).fork()).ldelim();
    for (const i of e.dataChannels)
      Bi.encode(i, t.uint32(34).fork()).ldelim();
    return e.offer !== void 0 && Y.encode(e.offer, t.uint32(42).fork()).ldelim(), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = ho();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.answer = Y.decode(i, i.uint32());
          continue;
        case 2:
          if (s !== 18)
            break;
          r.subscription = mt.decode(i, i.uint32());
          continue;
        case 3:
          if (s !== 26)
            break;
          r.publishTracks.push(pt.decode(i, i.uint32()));
          continue;
        case 4:
          if (s !== 34)
            break;
          r.dataChannels.push(Bi.decode(i, i.uint32()));
          continue;
        case 5:
          if (s !== 42)
            break;
          r.offer = Y.decode(i, i.uint32());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      answer: b(e.answer) ? Y.fromJSON(e.answer) : void 0,
      subscription: b(e.subscription) ? mt.fromJSON(e.subscription) : void 0,
      publishTracks: Array.isArray(e == null ? void 0 : e.publishTracks) ? e.publishTracks.map((t) => pt.fromJSON(t)) : [],
      dataChannels: Array.isArray(e == null ? void 0 : e.dataChannels) ? e.dataChannels.map((t) => Bi.fromJSON(t)) : [],
      offer: b(e.offer) ? Y.fromJSON(e.offer) : void 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.answer !== void 0 && (t.answer = e.answer ? Y.toJSON(e.answer) : void 0), e.subscription !== void 0 && (t.subscription = e.subscription ? mt.toJSON(e.subscription) : void 0), e.publishTracks ? t.publishTracks = e.publishTracks.map((i) => i ? pt.toJSON(i) : void 0) : t.publishTracks = [], e.dataChannels ? t.dataChannels = e.dataChannels.map((i) => i ? Bi.toJSON(i) : void 0) : t.dataChannels = [], e.offer !== void 0 && (t.offer = e.offer ? Y.toJSON(e.offer) : void 0), t;
  },
  create(e) {
    return Fi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = ho();
    return n.answer = e.answer !== void 0 && e.answer !== null ? Y.fromPartial(e.answer) : void 0, n.subscription = e.subscription !== void 0 && e.subscription !== null ? mt.fromPartial(e.subscription) : void 0, n.publishTracks = ((t = e.publishTracks) === null || t === void 0 ? void 0 : t.map((r) => pt.fromPartial(r))) || [], n.dataChannels = ((i = e.dataChannels) === null || i === void 0 ? void 0 : i.map((r) => Bi.fromPartial(r))) || [], n.offer = e.offer !== void 0 && e.offer !== null ? Y.fromPartial(e.offer) : void 0, n;
  }
};
function fo() {
  return {
    label: "",
    id: 0,
    target: 0
  };
}
const Bi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.label !== "" && t.uint32(10).string(e.label), e.id !== 0 && t.uint32(16).uint32(e.id), e.target !== 0 && t.uint32(24).int32(e.target), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = fo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.label = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.id = i.uint32();
          continue;
        case 3:
          if (s !== 24)
            break;
          r.target = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      label: b(e.label) ? String(e.label) : "",
      id: b(e.id) ? Number(e.id) : 0,
      target: b(e.target) ? nd(e.target) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.label !== void 0 && (t.label = e.label), e.id !== void 0 && (t.id = Math.round(e.id)), e.target !== void 0 && (t.target = rd(e.target)), t;
  },
  create(e) {
    return Bi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n;
    const r = fo();
    return r.label = (t = e.label) !== null && t !== void 0 ? t : "", r.id = (i = e.id) !== null && i !== void 0 ? i : 0, r.target = (n = e.target) !== null && n !== void 0 ? n : 0, r;
  }
};
function po() {
  return {
    scenario: void 0
  };
}
const St = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    var i;
    switch ((i = e.scenario) === null || i === void 0 ? void 0 : i.$case) {
      case "speakerUpdate":
        t.uint32(8).int32(e.scenario.speakerUpdate);
        break;
      case "nodeFailure":
        t.uint32(16).bool(e.scenario.nodeFailure);
        break;
      case "migration":
        t.uint32(24).bool(e.scenario.migration);
        break;
      case "serverLeave":
        t.uint32(32).bool(e.scenario.serverLeave);
        break;
      case "switchCandidateProtocol":
        t.uint32(40).int32(e.scenario.switchCandidateProtocol);
        break;
      case "subscriberBandwidth":
        t.uint32(48).int64(e.scenario.subscriberBandwidth);
        break;
    }
    return t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = po();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.scenario = {
            $case: "speakerUpdate",
            speakerUpdate: i.int32()
          };
          continue;
        case 2:
          if (s !== 16)
            break;
          r.scenario = {
            $case: "nodeFailure",
            nodeFailure: i.bool()
          };
          continue;
        case 3:
          if (s !== 24)
            break;
          r.scenario = {
            $case: "migration",
            migration: i.bool()
          };
          continue;
        case 4:
          if (s !== 32)
            break;
          r.scenario = {
            $case: "serverLeave",
            serverLeave: i.bool()
          };
          continue;
        case 5:
          if (s !== 40)
            break;
          r.scenario = {
            $case: "switchCandidateProtocol",
            switchCandidateProtocol: i.int32()
          };
          continue;
        case 6:
          if (s !== 48)
            break;
          r.scenario = {
            $case: "subscriberBandwidth",
            subscriberBandwidth: ci(i.int64())
          };
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      scenario: b(e.speakerUpdate) ? {
        $case: "speakerUpdate",
        speakerUpdate: Number(e.speakerUpdate)
      } : b(e.nodeFailure) ? {
        $case: "nodeFailure",
        nodeFailure: !!e.nodeFailure
      } : b(e.migration) ? {
        $case: "migration",
        migration: !!e.migration
      } : b(e.serverLeave) ? {
        $case: "serverLeave",
        serverLeave: !!e.serverLeave
      } : b(e.switchCandidateProtocol) ? {
        $case: "switchCandidateProtocol",
        switchCandidateProtocol: Wl(e.switchCandidateProtocol)
      } : b(e.subscriberBandwidth) ? {
        $case: "subscriberBandwidth",
        subscriberBandwidth: Number(e.subscriberBandwidth)
      } : void 0
    };
  },
  toJSON(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f;
    const p = {};
    return ((t = e.scenario) === null || t === void 0 ? void 0 : t.$case) === "speakerUpdate" && (p.speakerUpdate = Math.round((i = e.scenario) === null || i === void 0 ? void 0 : i.speakerUpdate)), ((n = e.scenario) === null || n === void 0 ? void 0 : n.$case) === "nodeFailure" && (p.nodeFailure = (r = e.scenario) === null || r === void 0 ? void 0 : r.nodeFailure), ((s = e.scenario) === null || s === void 0 ? void 0 : s.$case) === "migration" && (p.migration = (a = e.scenario) === null || a === void 0 ? void 0 : a.migration), ((o = e.scenario) === null || o === void 0 ? void 0 : o.$case) === "serverLeave" && (p.serverLeave = (c = e.scenario) === null || c === void 0 ? void 0 : c.serverLeave), ((d = e.scenario) === null || d === void 0 ? void 0 : d.$case) === "switchCandidateProtocol" && (p.switchCandidateProtocol = ((u = e.scenario) === null || u === void 0 ? void 0 : u.switchCandidateProtocol) !== void 0 ? zl((l = e.scenario) === null || l === void 0 ? void 0 : l.switchCandidateProtocol) : void 0), ((h = e.scenario) === null || h === void 0 ? void 0 : h.$case) === "subscriberBandwidth" && (p.subscriberBandwidth = Math.round((f = e.scenario) === null || f === void 0 ? void 0 : f.subscriberBandwidth)), p;
  },
  create(e) {
    return St.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i, n, r, s, a, o, c, d, u, l, h, f, p, m, C, E, A;
    const I = po();
    return ((t = e.scenario) === null || t === void 0 ? void 0 : t.$case) === "speakerUpdate" && ((i = e.scenario) === null || i === void 0 ? void 0 : i.speakerUpdate) !== void 0 && ((n = e.scenario) === null || n === void 0 ? void 0 : n.speakerUpdate) !== null && (I.scenario = {
      $case: "speakerUpdate",
      speakerUpdate: e.scenario.speakerUpdate
    }), ((r = e.scenario) === null || r === void 0 ? void 0 : r.$case) === "nodeFailure" && ((s = e.scenario) === null || s === void 0 ? void 0 : s.nodeFailure) !== void 0 && ((a = e.scenario) === null || a === void 0 ? void 0 : a.nodeFailure) !== null && (I.scenario = {
      $case: "nodeFailure",
      nodeFailure: e.scenario.nodeFailure
    }), ((o = e.scenario) === null || o === void 0 ? void 0 : o.$case) === "migration" && ((c = e.scenario) === null || c === void 0 ? void 0 : c.migration) !== void 0 && ((d = e.scenario) === null || d === void 0 ? void 0 : d.migration) !== null && (I.scenario = {
      $case: "migration",
      migration: e.scenario.migration
    }), ((u = e.scenario) === null || u === void 0 ? void 0 : u.$case) === "serverLeave" && ((l = e.scenario) === null || l === void 0 ? void 0 : l.serverLeave) !== void 0 && ((h = e.scenario) === null || h === void 0 ? void 0 : h.serverLeave) !== null && (I.scenario = {
      $case: "serverLeave",
      serverLeave: e.scenario.serverLeave
    }), ((f = e.scenario) === null || f === void 0 ? void 0 : f.$case) === "switchCandidateProtocol" && ((p = e.scenario) === null || p === void 0 ? void 0 : p.switchCandidateProtocol) !== void 0 && ((m = e.scenario) === null || m === void 0 ? void 0 : m.switchCandidateProtocol) !== null && (I.scenario = {
      $case: "switchCandidateProtocol",
      switchCandidateProtocol: e.scenario.switchCandidateProtocol
    }), ((C = e.scenario) === null || C === void 0 ? void 0 : C.$case) === "subscriberBandwidth" && ((E = e.scenario) === null || E === void 0 ? void 0 : E.subscriberBandwidth) !== void 0 && ((A = e.scenario) === null || A === void 0 ? void 0 : A.subscriberBandwidth) !== null && (I.scenario = {
      $case: "subscriberBandwidth",
      subscriberBandwidth: e.scenario.subscriberBandwidth
    }), I;
  }
};
function mo() {
  return {
    timestamp: 0,
    rtt: 0
  };
}
const Ji = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.timestamp !== 0 && t.uint32(8).int64(e.timestamp), e.rtt !== 0 && t.uint32(16).int64(e.rtt), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = mo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.timestamp = ci(i.int64());
          continue;
        case 2:
          if (s !== 16)
            break;
          r.rtt = ci(i.int64());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      timestamp: b(e.timestamp) ? Number(e.timestamp) : 0,
      rtt: b(e.rtt) ? Number(e.rtt) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.timestamp !== void 0 && (t.timestamp = Math.round(e.timestamp)), e.rtt !== void 0 && (t.rtt = Math.round(e.rtt)), t;
  },
  create(e) {
    return Ji.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = mo();
    return n.timestamp = (t = e.timestamp) !== null && t !== void 0 ? t : 0, n.rtt = (i = e.rtt) !== null && i !== void 0 ? i : 0, n;
  }
};
function vo() {
  return {
    lastPingTimestamp: 0,
    timestamp: 0
  };
}
const Vi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.lastPingTimestamp !== 0 && t.uint32(8).int64(e.lastPingTimestamp), e.timestamp !== 0 && t.uint32(16).int64(e.timestamp), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = vo();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 8)
            break;
          r.lastPingTimestamp = ci(i.int64());
          continue;
        case 2:
          if (s !== 16)
            break;
          r.timestamp = ci(i.int64());
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      lastPingTimestamp: b(e.lastPingTimestamp) ? Number(e.lastPingTimestamp) : 0,
      timestamp: b(e.timestamp) ? Number(e.timestamp) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.lastPingTimestamp !== void 0 && (t.lastPingTimestamp = Math.round(e.lastPingTimestamp)), e.timestamp !== void 0 && (t.timestamp = Math.round(e.timestamp)), t;
  },
  create(e) {
    return Vi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = vo();
    return n.lastPingTimestamp = (t = e.lastPingTimestamp) !== null && t !== void 0 ? t : 0, n.timestamp = (i = e.timestamp) !== null && i !== void 0 ? i : 0, n;
  }
};
function go() {
  return {
    trackSid: "",
    err: 0
  };
}
const Hi = {
  encode(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Writer.create();
    return e.trackSid !== "" && t.uint32(10).string(e.trackSid), e.err !== 0 && t.uint32(16).int32(e.err), t;
  },
  decode(e, t) {
    const i = e instanceof v.Reader ? e : v.Reader.create(e);
    let n = t === void 0 ? i.len : i.pos + t;
    const r = go();
    for (; i.pos < n; ) {
      const s = i.uint32();
      switch (s >>> 3) {
        case 1:
          if (s !== 10)
            break;
          r.trackSid = i.string();
          continue;
        case 2:
          if (s !== 16)
            break;
          r.err = i.int32();
          continue;
      }
      if ((s & 7) === 4 || s === 0)
        break;
      i.skipType(s & 7);
    }
    return r;
  },
  fromJSON(e) {
    return {
      trackSid: b(e.trackSid) ? String(e.trackSid) : "",
      err: b(e.err) ? bl(e.err) : 0
    };
  },
  toJSON(e) {
    const t = {};
    return e.trackSid !== void 0 && (t.trackSid = e.trackSid), e.err !== void 0 && (t.err = Cl(e.err)), t;
  },
  create(e) {
    return Hi.fromPartial(e ?? {});
  },
  fromPartial(e) {
    var t, i;
    const n = go();
    return n.trackSid = (t = e.trackSid) !== null && t !== void 0 ? t : "", n.err = (i = e.err) !== null && i !== void 0 ? i : 0, n;
  }
};
var ni = (() => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw "Unable to locate global object";
})();
function Zl(e) {
  if (ni.Buffer)
    return Uint8Array.from(ni.Buffer.from(e, "base64"));
  {
    const t = ni.atob(e), i = new Uint8Array(t.length);
    for (let n = 0; n < t.length; ++n)
      i[n] = t.charCodeAt(n);
    return i;
  }
}
function Ql(e) {
  if (ni.Buffer)
    return ni.Buffer.from(e).toString("base64");
  {
    const t = [];
    return e.forEach((i) => {
      t.push(String.fromCharCode(i));
    }), ni.btoa(t.join(""));
  }
}
function ci(e) {
  if (e.gt(Number.MAX_SAFE_INTEGER))
    throw new ni.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  return e.toNumber();
}
v.util.Long !== en && (v.util.Long = en, v.configure());
function b(e) {
  return e != null;
}
class tn extends Error {
  constructor(t, i) {
    super(i || "an error has occured"), this.code = t;
  }
}
class ve extends tn {
  constructor(t, i, n) {
    super(1, t), this.status = n, this.reason = i;
  }
}
class _s extends tn {
  constructor(t) {
    super(21, t ?? "device is unsupported");
  }
}
class Pt extends tn {
  constructor(t) {
    super(20, t ?? "track is invalid");
  }
}
class Kl extends tn {
  constructor(t) {
    super(10, t ?? "unsupported server");
  }
}
class $e extends tn {
  constructor(t) {
    super(12, t ?? "unexpected connection state");
  }
}
class ts extends tn {
  constructor(t) {
    super(13, t ?? "unable to negotiate");
  }
}
var Qn;
(function(e) {
  e.PermissionDenied = "PermissionDenied", e.NotFound = "NotFound", e.DeviceInUse = "DeviceInUse", e.Other = "Other";
})(Qn || (Qn = {}));
(function(e) {
  function t(i) {
    if (i && "name" in i)
      return i.name === "NotFoundError" || i.name === "DevicesNotFoundError" ? e.NotFound : i.name === "NotAllowedError" || i.name === "PermissionDeniedError" ? e.PermissionDenied : i.name === "NotReadableError" || i.name === "TrackStartError" ? e.DeviceInUse : e.Other;
  }
  e.getFailure = t;
})(Qn || (Qn = {}));
class Be {
}
Be.setTimeout = function() {
  return setTimeout(...arguments);
};
Be.setInterval = function() {
  return setInterval(...arguments);
};
Be.clearTimeout = function() {
  return clearTimeout(...arguments);
};
Be.clearInterval = function() {
  return clearInterval(...arguments);
};
const Yl = /version\/(\d+(\.?_?\d+)+)/i;
let Tr;
function nn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (typeof e > "u" && typeof navigator > "u")
    return;
  const i = (e ?? navigator.userAgent).toLowerCase();
  if (Tr === void 0 || t) {
    const n = Xl.find((r) => {
      let {
        test: s
      } = r;
      return s.test(i);
    });
    Tr = n == null ? void 0 : n.describe(i);
  }
  return Tr;
}
const Xl = [
  {
    test: /firefox|iceweasel|fxios/i,
    describe(e) {
      return {
        name: "Firefox",
        version: Er(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e),
        os: e.toLowerCase().includes("fxios") ? "iOS" : void 0
      };
    }
  },
  {
    test: /chrom|crios|crmo/i,
    describe(e) {
      return {
        name: "Chrome",
        version: Er(/(?:chrome|chromium|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e),
        os: e.toLowerCase().includes("crios") ? "iOS" : void 0
      };
    }
  },
  /* Safari */
  {
    test: /safari|applewebkit/i,
    describe(e) {
      return {
        name: "Safari",
        version: Er(Yl, e),
        os: e.includes("Mobile/") ? "iOS" : "macOS"
      };
    }
  }
];
function Er(e, t) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  const n = t.match(e);
  return n && n.length >= i && n[i] || "";
}
var jl = "1.12.1";
const eh = jl, th = 9;
class oe {
  constructor(t, i, n, r, s) {
    this.width = t, this.height = i, this.encoding = {
      maxBitrate: n,
      maxFramerate: r,
      priority: s
    };
  }
  get resolution() {
    return {
      width: this.width,
      height: this.height,
      frameRate: this.encoding.maxFramerate,
      aspectRatio: this.width / this.height
    };
  }
}
const ih = ["vp8", "h264"], sd = ["vp8", "h264", "vp9", "av1"];
function nh(e) {
  return !!ih.find((t) => t === e);
}
function yo(e, t) {
  return (e == null ? void 0 : e.toLowerCase().replace(/audio\/|video\//y, "")) === (t == null ? void 0 : t.toLowerCase().replace(/audio\/|video\//y, ""));
}
var Kn;
(function(e) {
  e.telephone = {
    maxBitrate: 12e3
  }, e.speech = {
    maxBitrate: 2e4
  }, e.music = {
    maxBitrate: 32e3
  }, e.musicStereo = {
    maxBitrate: 48e3
  }, e.musicHighQuality = {
    maxBitrate: 64e3
  }, e.musicHighQualityStereo = {
    maxBitrate: 96e3
  };
})(Kn || (Kn = {}));
const _n = {
  h90: new oe(160, 90, 6e4, 15),
  h180: new oe(320, 180, 12e4, 15),
  h216: new oe(384, 216, 18e4, 15),
  h360: new oe(640, 360, 3e5, 20),
  h540: new oe(960, 540, 6e5, 25),
  h720: new oe(1280, 720, 17e5, 30),
  h1080: new oe(1920, 1080, 3e6, 30),
  h1440: new oe(2560, 1440, 5e6, 30),
  h2160: new oe(3840, 2160, 8e6, 30)
}, is = {
  h120: new oe(160, 120, 8e4, 15),
  h180: new oe(240, 180, 1e5, 15),
  h240: new oe(320, 240, 15e4, 15),
  h360: new oe(480, 360, 225e3, 20),
  h480: new oe(640, 480, 3e5, 20),
  h540: new oe(720, 540, 45e4, 25),
  h720: new oe(960, 720, 15e5, 30),
  h1080: new oe(1440, 1080, 25e5, 30),
  h1440: new oe(1920, 1440, 35e5, 30)
}, Ts = {
  h360fps3: new oe(640, 360, 2e5, 3, "medium"),
  h720fps5: new oe(1280, 720, 4e5, 5, "medium"),
  h720fps15: new oe(1280, 720, 1e6, 15, "medium"),
  h1080fps15: new oe(1920, 1080, 15e5, 15, "medium"),
  h1080fps30: new oe(1920, 1080, 3e6, 30, "medium")
};
var O;
(function(e) {
  e.Connected = "connected", e.Reconnecting = "reconnecting", e.Reconnected = "reconnected", e.Disconnected = "disconnected", e.ConnectionStateChanged = "connectionStateChanged", e.StateChanged = "connectionStateChanged", e.MediaDevicesChanged = "mediaDevicesChanged", e.ParticipantConnected = "participantConnected", e.ParticipantDisconnected = "participantDisconnected", e.TrackPublished = "trackPublished", e.TrackSubscribed = "trackSubscribed", e.TrackSubscriptionFailed = "trackSubscriptionFailed", e.TrackUnpublished = "trackUnpublished", e.TrackUnsubscribed = "trackUnsubscribed", e.TrackMuted = "trackMuted", e.TrackUnmuted = "trackUnmuted", e.LocalTrackPublished = "localTrackPublished", e.LocalTrackUnpublished = "localTrackUnpublished", e.LocalAudioSilenceDetected = "localAudioSilenceDetected", e.ActiveSpeakersChanged = "activeSpeakersChanged", e.ParticipantMetadataChanged = "participantMetadataChanged", e.ParticipantNameChanged = "participantNameChanged", e.RoomMetadataChanged = "roomMetadataChanged", e.DataReceived = "dataReceived", e.ConnectionQualityChanged = "connectionQualityChanged", e.TrackStreamStateChanged = "trackStreamStateChanged", e.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", e.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", e.AudioPlaybackStatusChanged = "audioPlaybackChanged", e.MediaDevicesError = "mediaDevicesError", e.ParticipantPermissionsChanged = "participantPermissionsChanged", e.SignalConnected = "signalConnected", e.RecordingStatusChanged = "recordingStatusChanged", e.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", e.EncryptionError = "encryptionError", e.DCBufferStatusChanged = "dcBufferStatusChanged", e.ActiveDeviceChanged = "activeDeviceChanged";
})(O || (O = {}));
var D;
(function(e) {
  e.TrackPublished = "trackPublished", e.TrackSubscribed = "trackSubscribed", e.TrackSubscriptionFailed = "trackSubscriptionFailed", e.TrackUnpublished = "trackUnpublished", e.TrackUnsubscribed = "trackUnsubscribed", e.TrackMuted = "trackMuted", e.TrackUnmuted = "trackUnmuted", e.LocalTrackPublished = "localTrackPublished", e.LocalTrackUnpublished = "localTrackUnpublished", e.ParticipantMetadataChanged = "participantMetadataChanged", e.ParticipantNameChanged = "participantNameChanged", e.DataReceived = "dataReceived", e.IsSpeakingChanged = "isSpeakingChanged", e.ConnectionQualityChanged = "connectionQualityChanged", e.TrackStreamStateChanged = "trackStreamStateChanged", e.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", e.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", e.MediaDevicesError = "mediaDevicesError", e.ParticipantPermissionsChanged = "participantPermissionsChanged", e.PCTrackAdded = "pcTrackAdded";
})(D || (D = {}));
var U;
(function(e) {
  e.TransportsCreated = "transportsCreated", e.Connected = "connected", e.Disconnected = "disconnected", e.Resuming = "resuming", e.Resumed = "resumed", e.Restarting = "restarting", e.Restarted = "restarted", e.SignalResumed = "signalResumed", e.SignalRestarted = "signalRestarted", e.Closing = "closing", e.MediaTrackAdded = "mediaTrackAdded", e.ActiveSpeakersUpdate = "activeSpeakersUpdate", e.DataPacketReceived = "dataPacketReceived", e.RTPVideoMapUpdate = "rtpVideoMapUpdate", e.DCBufferStatusChanged = "dcBufferStatusChanged", e.ParticipantUpdate = "participantUpdate", e.RoomUpdate = "roomUpdate", e.SpeakersChanged = "speakersChanged", e.StreamStateChanged = "streamStateChanged", e.ConnectionQualityUpdate = "connectionQualityUpdate", e.SubscriptionError = "subscriptionError", e.SubscriptionPermissionUpdate = "subscriptionPermissionUpdate";
})(U || (U = {}));
var N;
(function(e) {
  e.Message = "message", e.Muted = "muted", e.Unmuted = "unmuted", e.Restarted = "restarted", e.Ended = "ended", e.Subscribed = "subscribed", e.Unsubscribed = "unsubscribed", e.UpdateSettings = "updateSettings", e.UpdateSubscription = "updateSubscription", e.AudioPlaybackStarted = "audioPlaybackStarted", e.AudioPlaybackFailed = "audioPlaybackFailed", e.AudioSilenceDetected = "audioSilenceDetected", e.VisibilityChanged = "visibilityChanged", e.VideoDimensionsChanged = "videoDimensionsChanged", e.ElementAttached = "elementAttached", e.ElementDetached = "elementDetached", e.UpstreamPaused = "upstreamPaused", e.UpstreamResumed = "upstreamResumed", e.SubscriptionPermissionChanged = "subscriptionPermissionChanged", e.SubscriptionStatusChanged = "subscriptionStatusChanged", e.SubscriptionFailed = "subscriptionFailed";
})(N || (N = {}));
const rh = 5e3, an = [];
class T extends li {
  constructor(t, i) {
    super(), this.attachedElements = [], this.isMuted = !1, this.streamState = T.StreamState.Active, this.isInBackground = !1, this._currentBitrate = 0, this.appVisibilityChangedListener = () => {
      this.backgroundTimeout && clearTimeout(this.backgroundTimeout), document.visibilityState === "hidden" ? this.backgroundTimeout = setTimeout(() => this.handleAppVisibilityChanged(), rh) : this.handleAppVisibilityChanged();
    }, this.kind = i, this._mediaStreamTrack = t, this._mediaStreamID = t.id, this.source = T.Source.Unknown;
  }
  /** current receive bits per second */
  get currentBitrate() {
    return this._currentBitrate;
  }
  get mediaStreamTrack() {
    return this._mediaStreamTrack;
  }
  /**
   * @internal
   * used for keep mediaStream's first id, since it's id might change
   * if we disable/enable a track
   */
  get mediaStreamID() {
    return this._mediaStreamID;
  }
  attach(t) {
    let i = "audio";
    this.kind === T.Kind.Video && (i = "video"), this.attachedElements.length === 0 && T.Kind.Video && this.addAppVisibilityListener(), t || (i === "audio" && (an.forEach((r) => {
      r.parentElement === null && !t && (t = r);
    }), t && an.splice(an.indexOf(t), 1)), t || (t = document.createElement(i))), this.attachedElements.includes(t) || this.attachedElements.push(t), Gi(this.mediaStreamTrack, t);
    const n = t.srcObject.getTracks();
    return n.some((r) => r.kind === "audio") && t.play().then(() => {
      this.emit(N.AudioPlaybackStarted);
    }).catch((r) => {
      r.name === "NotAllowedError" ? this.emit(N.AudioPlaybackFailed, r) : g.warn("could not playback audio", r), t && n.some((s) => s.kind === "video") && r.name === "NotAllowedError" && (t.muted = !0, t.play().catch(() => {
      }));
    }), this.emit(N.ElementAttached, t), t;
  }
  detach(t) {
    try {
      if (t) {
        Zi(this.mediaStreamTrack, t);
        const n = this.attachedElements.indexOf(t);
        return n >= 0 && (this.attachedElements.splice(n, 1), this.recycleElement(t), this.emit(N.ElementDetached, t)), t;
      }
      const i = [];
      return this.attachedElements.forEach((n) => {
        Zi(this.mediaStreamTrack, n), i.push(n), this.recycleElement(n), this.emit(N.ElementDetached, n);
      }), this.attachedElements = [], i;
    } finally {
      this.attachedElements.length === 0 && this.removeAppVisibilityListener();
    }
  }
  stop() {
    this.stopMonitor(), this._mediaStreamTrack.stop();
  }
  enable() {
    this._mediaStreamTrack.enabled = !0;
  }
  disable() {
    this._mediaStreamTrack.enabled = !1;
  }
  /* @internal */
  stopMonitor() {
    this.monitorInterval && clearInterval(this.monitorInterval);
  }
  recycleElement(t) {
    if (t instanceof HTMLAudioElement) {
      let i = !0;
      t.pause(), an.forEach((n) => {
        n.parentElement || (i = !1);
      }), i && an.push(t);
    }
  }
  handleAppVisibilityChanged() {
    return k(this, void 0, void 0, function* () {
      this.isInBackground = document.visibilityState === "hidden";
    });
  }
  addAppVisibilityListener() {
    ze() ? (this.isInBackground = document.visibilityState === "hidden", document.addEventListener("visibilitychange", this.appVisibilityChangedListener)) : this.isInBackground = !1;
  }
  removeAppVisibilityListener() {
    ze() && document.removeEventListener("visibilitychange", this.appVisibilityChangedListener);
  }
}
function Gi(e, t) {
  let i;
  t.srcObject instanceof MediaStream ? i = t.srcObject : i = new MediaStream();
  let n;
  e.kind === "audio" ? n = i.getAudioTracks() : n = i.getVideoTracks(), n.includes(e) || (n.forEach((r) => {
    i.removeTrack(r);
  }), i.addTrack(e)), t.autoplay = !0, t.muted = i.getAudioTracks().length === 0, t instanceof HTMLVideoElement && (t.playsInline = !0), t.srcObject !== i && (t.srcObject = i, (Yn() || Tn()) && t instanceof HTMLVideoElement && setTimeout(() => {
    t.srcObject = i, t.play().catch(() => {
    });
  }, 0));
}
function Zi(e, t) {
  if (t.srcObject instanceof MediaStream) {
    const i = t.srcObject;
    i.removeTrack(e), i.getTracks().length > 0 ? t.srcObject = i : t.srcObject = null;
  }
}
(function(e) {
  let t;
  (function(d) {
    d.Audio = "audio", d.Video = "video", d.Unknown = "unknown";
  })(t = e.Kind || (e.Kind = {}));
  let i;
  (function(d) {
    d.Camera = "camera", d.Microphone = "microphone", d.ScreenShare = "screen_share", d.ScreenShareAudio = "screen_share_audio", d.Unknown = "unknown";
  })(i = e.Source || (e.Source = {}));
  let n;
  (function(d) {
    d.Active = "active", d.Paused = "paused", d.Unknown = "unknown";
  })(n = e.StreamState || (e.StreamState = {}));
  function r(d) {
    switch (d) {
      case t.Audio:
        return be.AUDIO;
      case t.Video:
        return be.VIDEO;
      default:
        return be.UNRECOGNIZED;
    }
  }
  e.kindToProto = r;
  function s(d) {
    switch (d) {
      case be.AUDIO:
        return t.Audio;
      case be.VIDEO:
        return t.Video;
      default:
        return t.Unknown;
    }
  }
  e.kindFromProto = s;
  function a(d) {
    switch (d) {
      case i.Camera:
        return ie.CAMERA;
      case i.Microphone:
        return ie.MICROPHONE;
      case i.ScreenShare:
        return ie.SCREEN_SHARE;
      case i.ScreenShareAudio:
        return ie.SCREEN_SHARE_AUDIO;
      default:
        return ie.UNRECOGNIZED;
    }
  }
  e.sourceToProto = a;
  function o(d) {
    switch (d) {
      case ie.CAMERA:
        return i.Camera;
      case ie.MICROPHONE:
        return i.Microphone;
      case ie.SCREEN_SHARE:
        return i.ScreenShare;
      case ie.SCREEN_SHARE_AUDIO:
        return i.ScreenShareAudio;
      default:
        return i.Unknown;
    }
  }
  e.sourceFromProto = o;
  function c(d) {
    switch (d) {
      case At.ACTIVE:
        return n.Active;
      case At.PAUSED:
        return n.Paused;
      default:
        return n.Unknown;
    }
  }
  e.streamStateFromProto = c;
})(T || (T = {}));
function sh(e, t, i) {
  const n = Object.assign({}, e);
  return n.audio === !0 && (n.audio = {}), n.video === !0 && (n.video = {}), n.audio && ns(n.audio, t), n.video && ns(n.video, i), n;
}
function ns(e, t) {
  return Object.keys(t).forEach((i) => {
    e[i] === void 0 && (e[i] = t[i]);
  }), e;
}
function Es(e) {
  const t = {};
  if (e.video)
    if (typeof e.video == "object") {
      const i = {}, n = i, r = e.video;
      Object.keys(r).forEach((s) => {
        switch (s) {
          case "resolution":
            ns(n, r.resolution);
            break;
          default:
            n[s] = r[s];
        }
      }), t.video = i;
    } else
      t.video = e.video;
  else
    t.video = !1;
  return e.audio ? typeof e.audio == "object" ? t.audio = e.audio : t.audio = !0 : t.audio = !1, t;
}
function ah(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 200;
  return k(this, void 0, void 0, function* () {
    const i = ad();
    if (i) {
      const n = i.createAnalyser();
      n.fftSize = 2048;
      const r = n.frequencyBinCount, s = new Uint8Array(r);
      i.createMediaStreamSource(new MediaStream([e.mediaStreamTrack])).connect(n), yield ri(t), n.getByteTimeDomainData(s);
      const o = s.some((c) => c !== 128 && c !== 0);
      return i.close(), !o;
    }
    return !1;
  });
}
function ad() {
  const e = (
    // @ts-ignore
    typeof window < "u" && (window.AudioContext || window.webkitAudioContext)
  );
  if (e)
    return new e({
      latencyHint: "interactive"
    });
}
function oh(e) {
  return e === T.Source.Microphone ? "audioinput" : e === T.Source.Camera ? "videoinput" : void 0;
}
const ch = "|", So = "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension";
function dh(e) {
  const t = e.split(ch);
  return t.length > 1 ? [t[0], e.substr(t[0].length + 1)] : [e, ""];
}
function ri(e) {
  return k(this, void 0, void 0, function* () {
    return new Promise((t) => setTimeout(t, e));
  });
}
function ko() {
  return "addTransceiver" in RTCPeerConnection.prototype;
}
function bo() {
  return "addTrack" in RTCPeerConnection.prototype;
}
function uh() {
  if (!("getCapabilities" in RTCRtpSender))
    return !1;
  const e = RTCRtpSender.getCapabilities("video");
  let t = !1;
  if (e) {
    for (const i of e.codecs)
      if (i.mimeType === "video/AV1") {
        t = !0;
        break;
      }
  }
  return t;
}
function lh() {
  if (!("getCapabilities" in RTCRtpSender))
    return !1;
  const e = RTCRtpSender.getCapabilities("video");
  let t = !1;
  if (e) {
    for (const i of e.codecs)
      if (i.mimeType === "video/VP9") {
        t = !0;
        break;
      }
  }
  return t;
}
function mn(e) {
  return e === "av1" || e === "vp9";
}
function rs(e) {
  return document ? (e || (e = document.createElement("audio")), "setSinkId" in e) : !1;
}
const hh = {
  Chrome: "100",
  Safari: "15",
  Firefox: "100"
};
function fh(e) {
  if (!ze() || !("setCodecPreferences" in e))
    return !1;
  const t = nn();
  if (!(t != null && t.name) || !t.version)
    return !1;
  const i = hh[t.name];
  return i ? ud(t.version, i) >= 0 : !1;
}
function Tn() {
  var e;
  return ((e = nn()) === null || e === void 0 ? void 0 : e.name) === "Firefox";
}
function ph() {
  var e;
  return ((e = nn()) === null || e === void 0 ? void 0 : e.name) === "Chrome";
}
function Yn() {
  var e;
  return ((e = nn()) === null || e === void 0 ? void 0 : e.name) === "Safari";
}
function od() {
  return ze() ? /Tablet|iPad|Mobile|Android|BlackBerry/.test(navigator.userAgent) : !1;
}
function ze() {
  return typeof document < "u";
}
function Nn() {
  return navigator.product == "ReactNative";
}
function Ps(e) {
  return e.hostname.endsWith(".livekit.cloud");
}
function cd() {
  if (global && global.LiveKitReactNativeGlobal)
    return global.LiveKitReactNativeGlobal;
}
function dd() {
  if (!Nn())
    return;
  let e = cd();
  if (e)
    return e.platform;
}
function Co() {
  if (ze())
    return window.devicePixelRatio;
  if (Nn()) {
    let e = cd();
    if (e)
      return e.devicePixelRatio;
  }
  return 1;
}
function ud(e, t) {
  const i = e.split("."), n = t.split("."), r = Math.min(i.length, n.length);
  for (let s = 0; s < r; ++s) {
    const a = parseInt(i[s], 10), o = parseInt(n[s], 10);
    if (a > o)
      return 1;
    if (a < o)
      return -1;
    if (s === r - 1 && a === o)
      return 0;
  }
  return e === "" && t !== "" ? -1 : t === "" ? 1 : i.length == n.length ? 0 : i.length < n.length ? -1 : 1;
}
function mh(e) {
  for (const t of e)
    t.target.handleResize(t);
}
function vh(e) {
  for (const t of e)
    t.target.handleVisibilityChanged(t);
}
let Pr = null;
const _o = () => (Pr || (Pr = new ResizeObserver(mh)), Pr);
let wr = null;
const To = () => (wr || (wr = new IntersectionObserver(vh, {
  root: null,
  rootMargin: "0px"
})), wr);
function gh() {
  var e;
  const t = Sc.fromPartial({
    sdk: pe.JS,
    protocol: th,
    version: eh
  });
  return Nn() && (t.os = (e = dd()) !== null && e !== void 0 ? e : ""), t;
}
function Eo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 16, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  const r = document.createElement("canvas");
  r.width = e, r.height = t;
  const s = r.getContext("2d");
  s == null || s.fillRect(0, 0, r.width, r.height), n && s && (s.beginPath(), s.arc(e / 2, t / 2, 50, 0, Math.PI * 2, !0), s.closePath(), s.fillStyle = "grey", s.fill());
  const a = r.captureStream(), [o] = a.getTracks();
  if (!o)
    throw Error("Could not get empty media stream video track");
  return o.enabled = i, o;
}
let on;
function Rr() {
  if (!on) {
    const e = new AudioContext(), t = e.createOscillator(), i = e.createGain();
    i.gain.setValueAtTime(0, 0);
    const n = e.createMediaStreamDestination();
    if (t.connect(i), i.connect(n), t.start(), [on] = n.stream.getAudioTracks(), !on)
      throw Error("Could not get empty media stream audio track");
    on.enabled = !1;
  }
  return on.clone();
}
class ld {
  constructor(t, i) {
    this.onFinally = i, this.promise = new Promise((n, r) => k(this, void 0, void 0, function* () {
      this.resolve = n, this.reject = r, t && (yield t(n, r));
    })).finally(() => {
      var n;
      return (n = this.onFinally) === null || n === void 0 ? void 0 : n.call(this);
    });
  }
}
class Ht {
  constructor() {
    this._locking = Promise.resolve(), this._locks = 0;
  }
  isLocked() {
    return this._locks > 0;
  }
  lock() {
    this._locks += 1;
    let t;
    const i = new Promise((r) => t = () => {
      this._locks -= 1, r();
    }), n = this._locking.then(() => t);
    return this._locking = this._locking.then(() => i), n;
  }
}
function yh(e) {
  return sd.includes(e);
}
function si(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e))
    return e[0];
  if (e.exact)
    return Array.isArray(e.exact) ? e.exact[0] : e.exact;
  if (e.ideal)
    return Array.isArray(e.ideal) ? e.ideal[0] : e.ideal;
  throw Error("could not unwrap constraint");
}
var vn;
(function(e) {
  e[e.WAITING = 0] = "WAITING", e[e.RUNNING = 1] = "RUNNING", e[e.COMPLETED = 2] = "COMPLETED";
})(vn || (vn = {}));
class Sh {
  constructor() {
    this.pendingTasks = /* @__PURE__ */ new Map(), this.taskMutex = new Ht(), this.nextTaskIndex = 0;
  }
  run(t) {
    return k(this, void 0, void 0, function* () {
      const i = {
        id: this.nextTaskIndex++,
        enqueuedAt: Date.now(),
        status: vn.WAITING
      };
      this.pendingTasks.set(i.id, i);
      const n = yield this.taskMutex.lock();
      try {
        return i.executedAt = Date.now(), i.status = vn.RUNNING, yield t();
      } finally {
        i.status = vn.COMPLETED, this.pendingTasks.delete(i.id), n();
      }
    });
  }
  flush() {
    return k(this, void 0, void 0, function* () {
      return this.run(() => k(this, void 0, void 0, function* () {
      }));
    });
  }
  snapshot() {
    return Array.from(this.pendingTasks.values());
  }
}
const kh = ["syncState", "trickle", "offer", "answer", "simulate", "leave"];
function bh(e) {
  const t = kh.indexOf(e.$case) >= 0;
  return g.trace("request allowed to bypass queue:", {
    canPass: t,
    req: e
  }), t;
}
class Ch {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    this.rtt = 0, this.resetCallbacks = () => {
      this.onAnswer = void 0, this.onLeave = void 0, this.onLocalTrackPublished = void 0, this.onLocalTrackUnpublished = void 0, this.onNegotiateRequested = void 0, this.onOffer = void 0, this.onRemoteMuteChanged = void 0, this.onSubscribedQualityUpdate = void 0, this.onTokenRefresh = void 0, this.onTrickle = void 0, this.onClose = void 0;
    }, this.isConnected = !1, this.isReconnecting = !1, this.useJSON = t, this.requestQueue = new Sh(), this.queuedRequests = [], this.closingLock = new Ht();
  }
  join(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      return this.isConnected = !1, this.options = n, yield this.connect(t, i, n, r);
    });
  }
  reconnect(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      if (!this.options) {
        g.warn("attempted to reconnect without signal options being set, ignoring");
        return;
      }
      return this.isReconnecting = !0, this.clearPingInterval(), yield this.connect(t, i, Object.assign(Object.assign({}, this.options), {
        reconnect: !0,
        sid: n,
        reconnectReason: r
      }));
    });
  }
  connect(t, i, n, r) {
    this.connectOptions = n, t.startsWith("http") && (t = t.replace("http", "ws")), t = t.replace(/\/$/, ""), t += "/rtc";
    const s = gh(), a = _h(i, s, n);
    return new Promise((o, c) => k(this, void 0, void 0, function* () {
      const d = () => k(this, void 0, void 0, function* () {
        this.close(), c(new ve("room connection has been cancelled (signal)"));
      });
      r != null && r.aborted && d(), r == null || r.addEventListener("abort", d), g.debug("connecting to ".concat(t + a)), this.ws && (yield this.close()), this.ws = new WebSocket(t + a), this.ws.binaryType = "arraybuffer", this.ws.onerror = (u) => k(this, void 0, void 0, function* () {
        if (!this.isConnected) {
          try {
            const l = yield fetch("http".concat(t.substring(2), "/validate").concat(a));
            if (l.status.toFixed(0).startsWith("4")) {
              const h = yield l.text();
              c(new ve(h, 0, l.status));
            } else
              c(new ve("Internal error", 2, l.status));
          } catch {
            c(new ve(
              "server was not reachable",
              1
              /* ConnectionErrorReason.ServerUnreachable */
            ));
          }
          return;
        }
        this.handleWSError(u);
      }), this.ws.onmessage = (u) => k(this, void 0, void 0, function* () {
        var l, h, f, p;
        let m;
        if (typeof u.data == "string") {
          const C = JSON.parse(u.data);
          m = es.fromJSON(C);
        } else if (u.data instanceof ArrayBuffer)
          m = es.decode(new Uint8Array(u.data));
        else {
          g.error("could not decode websocket message: ".concat(typeof u.data));
          return;
        }
        if (!this.isConnected) {
          let C = !1;
          if (((l = m.message) === null || l === void 0 ? void 0 : l.$case) === "join" ? (this.isConnected = !0, r == null || r.removeEventListener("abort", d), this.pingTimeoutDuration = m.message.join.pingTimeout, this.pingIntervalDuration = m.message.join.pingInterval, this.pingTimeoutDuration && this.pingTimeoutDuration > 0 && (g.debug("ping config", {
            timeout: this.pingTimeoutDuration,
            interval: this.pingIntervalDuration
          }), this.startPingInterval()), o(m.message.join)) : n.reconnect ? (this.isConnected = !0, r == null || r.removeEventListener("abort", d), this.startPingInterval(), ((h = m.message) === null || h === void 0 ? void 0 : h.$case) === "reconnect" ? o((f = m.message) === null || f === void 0 ? void 0 : f.reconnect) : (o(), C = !0)) : n.reconnect || c(new ve("did not receive join response, got ".concat((p = m.message) === null || p === void 0 ? void 0 : p.$case, " instead"))), !C)
            return;
        }
        this.signalLatency && (yield ri(this.signalLatency)), this.handleSignalResponse(m);
      }), this.ws.onclose = (u) => {
        g.warn("websocket closed", {
          ev: u
        }), this.handleOnClose(u.reason);
      };
    }));
  }
  close() {
    return k(this, void 0, void 0, function* () {
      const t = yield this.closingLock.lock();
      try {
        if (this.isConnected = !1, this.ws) {
          this.ws.onmessage = null, this.ws.onopen = null, this.ws.onclose = null;
          const i = new Promise((n) => {
            this.ws ? this.ws.onclose = () => {
              n();
            } : n();
          });
          this.ws.readyState < this.ws.CLOSING && (this.ws.close(), yield Promise.race([i, ri(250)])), this.ws = void 0;
        }
      } finally {
        this.clearPingInterval(), t();
      }
    });
  }
  // initial offer after joining
  sendOffer(t) {
    g.debug("sending offer", t), this.sendRequest({
      $case: "offer",
      offer: Xn(t)
    });
  }
  // answer a server-initiated offer
  sendAnswer(t) {
    return g.debug("sending answer"), this.sendRequest({
      $case: "answer",
      answer: Xn(t)
    });
  }
  sendIceCandidate(t, i) {
    return g.trace("sending ice candidate", t), this.sendRequest({
      $case: "trickle",
      trickle: {
        candidateInit: JSON.stringify(t),
        target: i
      }
    });
  }
  sendMuteTrack(t, i) {
    return this.sendRequest({
      $case: "mute",
      mute: {
        sid: t,
        muted: i
      }
    });
  }
  sendAddTrack(t) {
    return this.sendRequest({
      $case: "addTrack",
      addTrack: t
    });
  }
  sendUpdateLocalMetadata(t, i) {
    return this.sendRequest({
      $case: "updateMetadata",
      updateMetadata: {
        metadata: t,
        name: i
      }
    });
  }
  sendUpdateTrackSettings(t) {
    this.sendRequest({
      $case: "trackSetting",
      trackSetting: t
    });
  }
  sendUpdateSubscription(t) {
    return this.sendRequest({
      $case: "subscription",
      subscription: t
    });
  }
  sendSyncState(t) {
    return this.sendRequest({
      $case: "syncState",
      syncState: t
    });
  }
  sendUpdateVideoLayers(t, i) {
    return this.sendRequest({
      $case: "updateLayers",
      updateLayers: {
        trackSid: t,
        layers: i
      }
    });
  }
  sendUpdateSubscriptionPermissions(t, i) {
    return this.sendRequest({
      $case: "subscriptionPermission",
      subscriptionPermission: {
        allParticipants: t,
        trackPermissions: i
      }
    });
  }
  sendSimulateScenario(t) {
    return this.sendRequest({
      $case: "simulate",
      simulate: t
    });
  }
  sendPing() {
    return Promise.all([this.sendRequest({
      $case: "ping",
      ping: Date.now()
    }), this.sendRequest({
      $case: "pingReq",
      pingReq: {
        timestamp: Date.now(),
        rtt: this.rtt
      }
    })]);
  }
  sendLeave() {
    return this.sendRequest({
      $case: "leave",
      leave: {
        canReconnect: !1,
        reason: ue.CLIENT_INITIATED
      }
    });
  }
  sendRequest(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return k(this, void 0, void 0, function* () {
      if (!i && !bh(t) && this.isReconnecting) {
        this.queuedRequests.push(() => k(this, void 0, void 0, function* () {
          yield this.sendRequest(t, !0);
        }));
        return;
      }
      if (i || (yield this.requestQueue.flush()), this.signalLatency && (yield ri(this.signalLatency)), !this.ws || this.ws.readyState !== this.ws.OPEN) {
        g.error("cannot send signal request before connected, type: ".concat(t == null ? void 0 : t.$case));
        return;
      }
      const r = {
        message: t
      };
      try {
        this.useJSON ? this.ws.send(JSON.stringify(jr.toJSON(r))) : this.ws.send(jr.encode(r).finish());
      } catch (s) {
        g.error("error sending signal message", {
          error: s
        });
      }
    });
  }
  handleSignalResponse(t) {
    var i, n;
    const r = t.message;
    if (r == null) {
      g.debug("received unsupported message");
      return;
    }
    if (r.$case === "answer") {
      const s = Po(r.answer);
      this.onAnswer && this.onAnswer(s);
    } else if (r.$case === "offer") {
      const s = Po(r.offer);
      this.onOffer && this.onOffer(s);
    } else if (r.$case === "trickle") {
      const s = JSON.parse(r.trickle.candidateInit);
      this.onTrickle && this.onTrickle(s, r.trickle.target);
    } else
      r.$case === "update" ? this.onParticipantUpdate && this.onParticipantUpdate((i = r.update.participants) !== null && i !== void 0 ? i : []) : r.$case === "trackPublished" ? this.onLocalTrackPublished && this.onLocalTrackPublished(r.trackPublished) : r.$case === "speakersChanged" ? this.onSpeakersChanged && this.onSpeakersChanged((n = r.speakersChanged.speakers) !== null && n !== void 0 ? n : []) : r.$case === "leave" ? this.onLeave && this.onLeave(r.leave) : r.$case === "mute" ? this.onRemoteMuteChanged && this.onRemoteMuteChanged(r.mute.sid, r.mute.muted) : r.$case === "roomUpdate" ? this.onRoomUpdate && r.roomUpdate.room && this.onRoomUpdate(r.roomUpdate.room) : r.$case === "connectionQuality" ? this.onConnectionQuality && this.onConnectionQuality(r.connectionQuality) : r.$case === "streamStateUpdate" ? this.onStreamStateUpdate && this.onStreamStateUpdate(r.streamStateUpdate) : r.$case === "subscribedQualityUpdate" ? this.onSubscribedQualityUpdate && this.onSubscribedQualityUpdate(r.subscribedQualityUpdate) : r.$case === "subscriptionPermissionUpdate" ? this.onSubscriptionPermissionUpdate && this.onSubscriptionPermissionUpdate(r.subscriptionPermissionUpdate) : r.$case === "refreshToken" ? this.onTokenRefresh && this.onTokenRefresh(r.refreshToken) : r.$case === "trackUnpublished" ? this.onLocalTrackUnpublished && this.onLocalTrackUnpublished(r.trackUnpublished) : r.$case === "subscriptionResponse" ? this.onSubscriptionError && this.onSubscriptionError(r.subscriptionResponse) : r.$case === "pong" ? this.resetPingTimeout() : r.$case === "pongResp" ? (this.rtt = Date.now() - r.pongResp.lastPingTimestamp, this.resetPingTimeout()) : g.debug("unsupported message", r);
  }
  setReconnected() {
    for (; this.queuedRequests.length > 0; ) {
      const t = this.queuedRequests.shift();
      t && this.requestQueue.run(t);
    }
    this.isReconnecting = !1;
  }
  handleOnClose(t) {
    return k(this, void 0, void 0, function* () {
      if (!this.isConnected)
        return;
      const i = this.onClose;
      yield this.close(), g.debug("websocket connection closed: ".concat(t)), i && i(t);
    });
  }
  handleWSError(t) {
    g.error("websocket error", t);
  }
  /**
   * Resets the ping timeout and starts a new timeout.
   * Call this after receiving a pong message
   */
  resetPingTimeout() {
    if (this.clearPingTimeout(), !this.pingTimeoutDuration) {
      g.warn("ping timeout duration not set");
      return;
    }
    this.pingTimeout = Be.setTimeout(() => {
      g.warn("ping timeout triggered. last pong received at: ".concat(new Date(Date.now() - this.pingTimeoutDuration * 1e3).toUTCString())), this.handleOnClose("ping timeout");
    }, this.pingTimeoutDuration * 1e3);
  }
  /**
   * Clears ping timeout (does not start a new timeout)
   */
  clearPingTimeout() {
    this.pingTimeout && Be.clearTimeout(this.pingTimeout);
  }
  startPingInterval() {
    if (this.clearPingInterval(), this.resetPingTimeout(), !this.pingIntervalDuration) {
      g.warn("ping interval duration not set");
      return;
    }
    g.debug("start ping interval"), this.pingInterval = Be.setInterval(() => {
      this.sendPing();
    }, this.pingIntervalDuration * 1e3);
  }
  clearPingInterval() {
    g.debug("clearing ping interval"), this.clearPingTimeout(), this.pingInterval && Be.clearInterval(this.pingInterval);
  }
}
function Po(e) {
  const t = {
    type: "offer",
    sdp: e.sdp
  };
  switch (e.type) {
    case "answer":
    case "offer":
    case "pranswer":
    case "rollback":
      t.type = e.type;
      break;
  }
  return t;
}
function Xn(e) {
  return {
    sdp: e.sdp,
    type: e.type
  };
}
function _h(e, t, i) {
  var n;
  const r = new URLSearchParams();
  return r.set("access_token", e), i.reconnect && (r.set("reconnect", "1"), i.sid && r.set("sid", i.sid)), r.set("auto_subscribe", i.autoSubscribe ? "1" : "0"), r.set("sdk", Nn() ? "reactnative" : "js"), r.set("version", t.version), r.set("protocol", t.protocol.toString()), t.deviceModel && r.set("device_model", t.deviceModel), t.os && r.set("os", t.os), t.osVersion && r.set("os_version", t.osVersion), t.browser && r.set("browser", t.browser), t.browserVersion && r.set("browser_version", t.browserVersion), i.publishOnly !== void 0 && r.set("publish", i.publishOnly), i.adaptiveStream && r.set("adaptive_stream", "1"), i.reconnectReason && r.set("reconnect_reason", i.reconnectReason.toString()), !((n = navigator.connection) === null || n === void 0) && n.type && r.set("network", navigator.connection.type), "?".concat(r.toString());
}
const Dn = "lk_e2ee";
function Th() {
  return Eh() || ss();
}
function ss() {
  return typeof window.RTCRtpScriptTransform < "u";
}
function Eh() {
  return typeof window.RTCRtpSender < "u" && // @ts-ignore
  typeof window.RTCRtpSender.prototype.createEncodedStreams < "u";
}
function Ph(e) {
  const t = e.split("/")[1].toLowerCase();
  if (!sd.includes(t))
    throw Error("Video codec not supported: ".concat(t));
  return t;
}
const Wi = {
  ParticipantEncryptionStatusChanged: "participantEncryptionStatusChanged",
  Error: "encryptionError"
}, wo = "default";
class wt {
  static getInstance() {
    return this.instance === void 0 && (this.instance = new wt()), this.instance;
  }
  getDevices(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    var n;
    return k(this, void 0, void 0, function* () {
      if (((n = wt.userMediaPromiseMap) === null || n === void 0 ? void 0 : n.size) > 0) {
        g.debug("awaiting getUserMedia promise");
        try {
          t ? yield wt.userMediaPromiseMap.get(t) : yield Promise.all(wt.userMediaPromiseMap.values());
        } catch {
          g.warn("error waiting for media permissons");
        }
      }
      let r = yield navigator.mediaDevices.enumerateDevices();
      if (i && t && // for safari we need to skip this check, as otherwise it will re-acquire user media and fail on iOS https://bugs.webkit.org/show_bug.cgi?id=179363
      (!wt.userMediaPromiseMap.get(t) || !Yn()) && (r.length === 0 || r.some((a) => {
        const o = a.label === "", c = t ? a.kind === t : !0;
        return o && c;
      }))) {
        const a = {
          video: t !== "audioinput" && t !== "audiooutput",
          audio: t !== "videoinput"
        }, o = yield navigator.mediaDevices.getUserMedia(a);
        r = yield navigator.mediaDevices.enumerateDevices(), o.getTracks().forEach((c) => {
          c.stop();
        });
      }
      return t && (r = r.filter((s) => s.kind === t)), r;
    });
  }
  normalizeDeviceId(t, i, n) {
    return k(this, void 0, void 0, function* () {
      if (i !== wo)
        return i;
      const s = (yield this.getDevices(t)).find((a) => a.groupId === n && a.deviceId !== wo);
      return s == null ? void 0 : s.deviceId;
    });
  }
}
wt.mediaDeviceKinds = ["audioinput", "audiooutput", "videoinput"];
wt.userMediaPromiseMap = /* @__PURE__ */ new Map();
const wh = 1e3;
class En extends T {
  get constraints() {
    return this._constraints;
  }
  /**
   *
   * @param mediaTrack
   * @param kind
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(t, i, n) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    super(t, i), this._isUpstreamPaused = !1, this.handleEnded = () => {
      this.isInBackground && (this.reacquireTrack = !0), this._mediaStreamTrack.removeEventListener("mute", this.pauseUpstream), this._mediaStreamTrack.removeEventListener("unmute", this.resumeUpstream), this.emit(N.Ended, this);
    }, this.pauseUpstream = () => k(this, void 0, void 0, function* () {
      const s = yield this.pauseUpstreamLock.lock();
      try {
        if (this._isUpstreamPaused === !0)
          return;
        if (!this.sender) {
          g.warn("unable to pause upstream for an unpublished track");
          return;
        }
        this._isUpstreamPaused = !0, this.emit(N.UpstreamPaused, this);
        const a = nn();
        if ((a == null ? void 0 : a.name) === "Safari" && ud(a.version, "12.0") < 0)
          throw new _s("pauseUpstream is not supported on Safari < 12.");
        yield this.sender.replaceTrack(null);
      } finally {
        s();
      }
    }), this.resumeUpstream = () => k(this, void 0, void 0, function* () {
      const s = yield this.pauseUpstreamLock.lock();
      try {
        if (this._isUpstreamPaused === !1)
          return;
        if (!this.sender) {
          g.warn("unable to resume upstream for an unpublished track");
          return;
        }
        this._isUpstreamPaused = !1, this.emit(N.UpstreamResumed, this), yield this.sender.replaceTrack(this._mediaStreamTrack);
      } finally {
        s();
      }
    }), this.reacquireTrack = !1, this.providedByUser = r, this.muteLock = new Ht(), this.pauseUpstreamLock = new Ht(), this.processorLock = new Ht(), this.setMediaStreamTrack(t, !0), this._constraints = t.getConstraints(), n && (this._constraints = n);
  }
  get id() {
    return this._mediaStreamTrack.id;
  }
  get dimensions() {
    if (this.kind !== T.Kind.Video)
      return;
    const {
      width: t,
      height: i
    } = this._mediaStreamTrack.getSettings();
    if (t && i)
      return {
        width: t,
        height: i
      };
  }
  get isUpstreamPaused() {
    return this._isUpstreamPaused;
  }
  get isUserProvided() {
    return this.providedByUser;
  }
  get mediaStreamTrack() {
    var t, i;
    return (i = (t = this.processor) === null || t === void 0 ? void 0 : t.processedTrack) !== null && i !== void 0 ? i : this._mediaStreamTrack;
  }
  setMediaStreamTrack(t, i) {
    return k(this, void 0, void 0, function* () {
      t === this._mediaStreamTrack && !i || (this._mediaStreamTrack && (this.attachedElements.forEach((n) => {
        Zi(this._mediaStreamTrack, n);
      }), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.pauseUpstream), this._mediaStreamTrack.removeEventListener("unmute", this.resumeUpstream), !this.providedByUser && this._mediaStreamTrack !== t && this._mediaStreamTrack.stop()), this.mediaStream = new MediaStream([t]), t && (t.addEventListener("ended", this.handleEnded), t.addEventListener("mute", this.pauseUpstream), t.addEventListener("unmute", this.resumeUpstream), this._constraints = t.getConstraints()), this.sender && (yield this.sender.replaceTrack(t)), this._mediaStreamTrack = t, t && (this._mediaStreamTrack.enabled = !this.isMuted, yield this.resumeUpstream(), this.attachedElements.forEach((n) => {
        Gi(t, n);
      })));
    });
  }
  waitForDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wh;
    return k(this, void 0, void 0, function* () {
      if (this.kind === T.Kind.Audio)
        throw new Error("cannot get dimensions for audio tracks");
      const i = Date.now();
      for (; Date.now() - i < t; ) {
        const n = this.dimensions;
        if (n)
          return n;
        yield ri(50);
      }
      throw new Pt("unable to get track dimensions after timeout");
    });
  }
  /**
   * @returns DeviceID of the device that is currently being used for this track
   */
  getDeviceId() {
    return k(this, void 0, void 0, function* () {
      if (this.source === T.Source.ScreenShare)
        return;
      const {
        deviceId: t,
        groupId: i
      } = this._mediaStreamTrack.getSettings(), n = this.kind === T.Kind.Audio ? "audioinput" : "videoinput";
      return wt.getInstance().normalizeDeviceId(n, t, i);
    });
  }
  mute() {
    return k(this, void 0, void 0, function* () {
      return this.setTrackMuted(!0), this;
    });
  }
  unmute() {
    return k(this, void 0, void 0, function* () {
      return this.setTrackMuted(!1), this;
    });
  }
  replaceTrack(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return k(this, void 0, void 0, function* () {
      if (!this.sender)
        throw new Pt("unable to replace an unpublished track");
      return g.debug("replace MediaStreamTrack"), yield this.setMediaStreamTrack(t), this.providedByUser = i, this.processor && (yield this.stopProcessor()), this;
    });
  }
  restart(t) {
    return k(this, void 0, void 0, function* () {
      t || (t = this._constraints), g.debug("restarting track with constraints", t);
      const i = {
        audio: !1,
        video: !1
      };
      this.kind === T.Kind.Video ? i.video = t : i.audio = t, this.attachedElements.forEach((s) => {
        Zi(this.mediaStreamTrack, s);
      }), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.stop();
      const r = (yield navigator.mediaDevices.getUserMedia(i)).getTracks()[0];
      if (r.addEventListener("ended", this.handleEnded), g.debug("re-acquired MediaStreamTrack"), yield this.setMediaStreamTrack(r), this._constraints = t, this.processor) {
        const s = this.processor;
        yield this.setProcessor(s);
      } else
        this.attachedElements.forEach((s) => {
          Gi(this._mediaStreamTrack, s);
        });
      return this.emit(N.Restarted, this), this;
    });
  }
  setTrackMuted(t) {
    g.debug("setting ".concat(this.kind, " track ").concat(t ? "muted" : "unmuted")), !(this.isMuted === t && this._mediaStreamTrack.enabled !== t) && (this.isMuted = t, this._mediaStreamTrack.enabled = !t, this.emit(t ? N.Muted : N.Unmuted, this));
  }
  get needsReAcquisition() {
    return this._mediaStreamTrack.readyState !== "live" || this._mediaStreamTrack.muted || !this._mediaStreamTrack.enabled || this.reacquireTrack;
  }
  handleAppVisibilityChanged() {
    const t = Object.create(null, {
      handleAppVisibilityChanged: {
        get: () => super.handleAppVisibilityChanged
      }
    });
    return k(this, void 0, void 0, function* () {
      yield t.handleAppVisibilityChanged.call(this), od() && (g.debug("visibility changed, is in Background: ".concat(this.isInBackground)), !this.isInBackground && this.needsReAcquisition && !this.isUserProvided && !this.isMuted && (g.debug("track needs to be reaquired, restarting ".concat(this.source)), yield this.restart(), this.reacquireTrack = !1));
    });
  }
  stop() {
    var t;
    super.stop(), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.pauseUpstream), this._mediaStreamTrack.removeEventListener("unmute", this.resumeUpstream), (t = this.processor) === null || t === void 0 || t.destroy(), this.processor = void 0;
  }
  /**
   * Sets a processor on this track.
   * See https://github.com/livekit/track-processors-js for example usage
   *
   * @experimental
   *
   * @param processor
   * @param showProcessedStreamLocally
   * @returns
   */
  setProcessor(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    var n, r;
    return k(this, void 0, void 0, function* () {
      const s = yield this.processorLock.lock();
      try {
        if (g.debug("setting up processor"), this.processor && (yield this.stopProcessor()), this.kind === "unknown")
          throw TypeError("cannot set processor on track of unknown kind");
        this.processorElement = (n = this.processorElement) !== null && n !== void 0 ? n : document.createElement(this.kind), this.processorElement.muted = !0, Gi(this._mediaStreamTrack, this.processorElement), this.processorElement.play().catch((o) => g.error("failed to play processor element", {
          error: o
        }));
        const a = {
          kind: this.kind,
          track: this._mediaStreamTrack,
          element: this.processorElement
        };
        if (yield t.init(a), this.processor = t, this.processor.processedTrack) {
          for (const o of this.attachedElements)
            o !== this.processorElement && i && (Zi(this._mediaStreamTrack, o), Gi(this.processor.processedTrack, o));
          yield (r = this.sender) === null || r === void 0 ? void 0 : r.replaceTrack(this.processor.processedTrack);
        }
      } finally {
        s();
      }
    });
  }
  getProcessor() {
    return this.processor;
  }
  /**
   * Stops the track processor
   * See https://github.com/livekit/track-processors-js for example usage
   *
   * @experimental
   * @returns
   */
  stopProcessor() {
    var t, i;
    return k(this, void 0, void 0, function* () {
      this.processor && (g.debug("stopping processor"), (t = this.processor.processedTrack) === null || t === void 0 || t.stop(), yield this.processor.destroy(), this.processor = void 0, (i = this.processorElement) === null || i === void 0 || i.remove(), this.processorElement = void 0, yield this.restart());
    });
  }
}
class Rh extends li {
  get isEnabled() {
    return this.encryptionEnabled;
  }
  constructor(t) {
    super(), this.onWorkerMessage = (i) => {
      var n, r;
      const {
        kind: s,
        data: a
      } = i.data;
      switch (s) {
        case "error":
          console.error("error in worker", {
            data: a
          }), this.emit(Wi.Error, a.error);
          break;
        case "enable":
          if (this.encryptionEnabled !== a.enabled && !a.participantId)
            this.emit(Wi.ParticipantEncryptionStatusChanged, a.enabled, (n = this.room) === null || n === void 0 ? void 0 : n.localParticipant), this.encryptionEnabled = a.enabled;
          else if (a.participantId) {
            const o = (r = this.room) === null || r === void 0 ? void 0 : r.getParticipantByIdentity(a.participantId);
            this.emit(Wi.ParticipantEncryptionStatusChanged, a.enabled, o);
          }
          this.encryptionEnabled && this.keyProvider.getKeys().forEach((o) => {
            this.postKey(o);
          });
          break;
        case "ratchetKey":
          this.keyProvider.emit("keyRatcheted", a.material, a.keyIndex);
          break;
      }
    }, this.onWorkerError = (i) => {
      g.error("e2ee worker encountered an error:", {
        error: i.error
      }), this.emit(Wi.Error, i.error);
    }, this.keyProvider = t.keyProvider, this.worker = t.worker, this.encryptionEnabled = !1;
  }
  /**
   * @internal
   */
  setup(t) {
    if (!Th())
      throw new _s("tried to setup end-to-end encryption on an unsupported browser");
    if (g.info("setting up e2ee"), t !== this.room) {
      this.room = t, this.setupEventListeners(t, this.keyProvider);
      const i = {
        kind: "init",
        data: {
          keyProviderOptions: this.keyProvider.getOptions()
        }
      };
      this.worker && (g.info("initializing worker", {
        worker: this.worker
      }), this.worker.onmessage = this.onWorkerMessage, this.worker.onerror = this.onWorkerError, this.worker.postMessage(i));
    }
  }
  /**
   * @internal
   */
  setParticipantCryptorEnabled(t, i) {
    return k(this, void 0, void 0, function* () {
      if (g.info("set e2ee to ".concat(t)), this.worker) {
        const n = {
          kind: "enable",
          data: {
            enabled: t,
            participantId: i
          }
        };
        this.worker.postMessage(n);
      } else
        throw new ReferenceError("failed to enable e2ee, worker is not ready");
    });
  }
  setupEngine(t) {
    t.on(U.RTPVideoMapUpdate, (i) => {
      this.postRTPMap(i);
    });
  }
  setupEventListeners(t, i) {
    t.on(O.TrackPublished, (n, r) => this.setParticipantCryptorEnabled(n.trackInfo.encryption !== xe.NONE, r.identity)), t.on(O.ConnectionStateChanged, (n) => {
      n === fe.Connected && t.participants.forEach((r) => {
        r.tracks.forEach((s) => {
          this.setParticipantCryptorEnabled(s.trackInfo.encryption !== xe.NONE, r.identity);
        });
      });
    }), t.on(O.TrackUnsubscribed, (n, r, s) => {
      var a;
      const o = {
        kind: "removeTransform",
        data: {
          participantId: s.identity,
          trackId: n.mediaStreamID
        }
      };
      (a = this.worker) === null || a === void 0 || a.postMessage(o);
    }), t.on(O.TrackSubscribed, (n, r, s) => {
      this.setupE2EEReceiver(n, s.identity, r.trackInfo);
    }), t.localParticipant.on(D.LocalTrackPublished, (n) => k(this, void 0, void 0, function* () {
      this.setupE2EESender(n.track, n.track.sender, t.localParticipant.identity);
    })), i.on("setKey", (n) => this.postKey(n)).on("ratchetRequest", (n, r) => this.postRatchetRequest(n, r));
  }
  postRatchetRequest(t, i) {
    if (!this.worker)
      throw Error("could not ratchet key, worker is missing");
    const n = {
      kind: "ratchetRequest",
      data: {
        participantId: t,
        keyIndex: i
      }
    };
    this.worker.postMessage(n);
  }
  postKey(t) {
    let {
      key: i,
      participantId: n,
      keyIndex: r
    } = t;
    if (!this.worker)
      throw Error("could not set key, worker is missing");
    const s = {
      kind: "setKey",
      data: {
        participantId: n,
        key: i,
        keyIndex: r
      }
    };
    this.worker.postMessage(s);
  }
  postRTPMap(t) {
    if (!this.worker)
      throw Error("could not post rtp map, worker is missing");
    const i = {
      kind: "setRTPMap",
      data: {
        map: t
      }
    };
    this.worker.postMessage(i);
  }
  setupE2EEReceiver(t, i, n) {
    if (t.receiver) {
      if (!(n != null && n.mimeType) || n.mimeType === "")
        throw new TypeError("MimeType missing from trackInfo, cannot set up E2EE cryptor");
      this.handleReceiver(t.receiver, t.mediaStreamID, i, t.kind === "video" ? Ph(n.mimeType) : void 0);
    }
  }
  setupE2EESender(t, i, n) {
    if (!(t instanceof En) || !i) {
      i || g.warn("early return because sender is not ready");
      return;
    }
    this.handleSender(i, t.mediaStreamID, n, void 0);
  }
  /**
   * Handles the given {@code RTCRtpReceiver} by creating a {@code TransformStream} which will inject
   * a frame decoder.
   *
   */
  handleReceiver(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      if (this.worker) {
        if (ss()) {
          const s = {
            kind: "decode",
            participantId: n,
            trackId: i,
            codec: r
          };
          t.transform = new RTCRtpScriptTransform(this.worker, s);
        } else {
          if (Dn in t && r) {
            const c = {
              kind: "updateCodec",
              data: {
                trackId: i,
                codec: r,
                participantId: n
              }
            };
            this.worker.postMessage(c);
            return;
          }
          let s = t.writableStream, a = t.readableStream;
          if (!s || !a) {
            const c = t.createEncodedStreams();
            t.writableStream = c.writable, s = c.writable, t.readableStream = c.readable, a = c.readable;
          }
          const o = {
            kind: "decode",
            data: {
              readableStream: a,
              writableStream: s,
              trackId: i,
              codec: r,
              participantId: n
            }
          };
          this.worker.postMessage(o, [a, s]);
        }
        t[Dn] = !0;
      }
    });
  }
  /**
   * Handles the given {@code RTCRtpSender} by creating a {@code TransformStream} which will inject
   * a frame encoder.
   *
   */
  handleSender(t, i, n, r) {
    if (!(Dn in t || !this.worker)) {
      if (ss()) {
        g.warn("initialize script transform");
        const s = {
          kind: "encode",
          participantId: n,
          trackId: i,
          codec: r
        };
        t.transform = new RTCRtpScriptTransform(this.worker, s);
      } else {
        g.warn("initialize encoded streams");
        const s = t.createEncodedStreams(), a = {
          kind: "encode",
          data: {
            readableStream: s.readable,
            writableStream: s.writable,
            codec: r,
            trackId: i,
            participantId: n
          }
        };
        this.worker.postMessage(a, [s.readable, s.writable]);
      }
      t[Dn] = !0;
    }
  }
}
var hd = {}, fd = { exports: {} }, Ro = fd.exports = {
  v: [{
    name: "version",
    reg: /^(\d*)$/
  }],
  o: [{
    // o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: "origin",
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
    format: "%s %s %d %s IP%d %s"
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{
    name: "name"
  }],
  i: [{
    name: "description"
  }],
  u: [{
    name: "uri"
  }],
  e: [{
    name: "email"
  }],
  p: [{
    name: "phone"
  }],
  z: [{
    name: "timezones"
  }],
  // TODO: this one can actually be parsed properly...
  r: [{
    name: "repeats"
  }],
  // TODO: this one can also be parsed properly
  // k: [{}], // outdated thing ignored
  t: [{
    // t=0 0
    name: "timing",
    reg: /^(\d*) (\d*)/,
    names: ["start", "stop"],
    format: "%d %d"
  }],
  c: [{
    // c=IN IP4 10.47.197.26
    name: "connection",
    reg: /^IN IP(\d) (\S*)/,
    names: ["version", "ip"],
    format: "IN IP%d %s"
  }],
  b: [{
    // b=AS:4000
    push: "bandwidth",
    reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
    names: ["type", "limit"],
    format: "%s:%s"
  }],
  m: [{
    // m=video 51744 RTP/AVP 126 97 98 34 31
    // NB: special - pushes to session
    // TODO: rtp/fmtp should be filtered by the payloads found here?
    reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
    names: ["type", "port", "protocol", "payloads"],
    format: "%s %d %s %s"
  }],
  a: [
    {
      // a=rtpmap:110 opus/48000/2
      push: "rtp",
      reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ["payload", "codec", "rate", "encoding"],
      format: function(e) {
        return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
      }
    },
    {
      // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      // a=fmtp:111 minptime=10; useinbandfec=1
      push: "fmtp",
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ["payload", "config"],
      format: "fmtp:%d %s"
    },
    {
      // a=control:streamid=0
      name: "control",
      reg: /^control:(.*)/,
      format: "control:%s"
    },
    {
      // a=rtcp:65179 IN IP4 193.84.77.194
      name: "rtcp",
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ["port", "netType", "ipVer", "address"],
      format: function(e) {
        return e.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
      }
    },
    {
      // a=rtcp-fb:98 trr-int 100
      push: "rtcpFbTrrInt",
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ["payload", "value"],
      format: "rtcp-fb:%s trr-int %d"
    },
    {
      // a=rtcp-fb:98 nack rpsi
      push: "rtcpFb",
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ["payload", "type", "subtype"],
      format: function(e) {
        return e.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
      }
    },
    {
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:1/recvonly URI-gps-string
      // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
      push: "ext",
      reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
      names: ["value", "direction", "encrypt-uri", "uri", "config"],
      format: function(e) {
        return "extmap:%d" + (e.direction ? "/%s" : "%v") + (e["encrypt-uri"] ? " %s" : "%v") + " %s" + (e.config ? " %s" : "");
      }
    },
    {
      // a=extmap-allow-mixed
      name: "extmapAllowMixed",
      reg: /^(extmap-allow-mixed)/
    },
    {
      // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: "crypto",
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ["id", "suite", "config", "sessionConfig"],
      format: function(e) {
        return e.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
      }
    },
    {
      // a=setup:actpass
      name: "setup",
      reg: /^setup:(\w*)/,
      format: "setup:%s"
    },
    {
      // a=connection:new
      name: "connectionType",
      reg: /^connection:(new|existing)/,
      format: "connection:%s"
    },
    {
      // a=mid:1
      name: "mid",
      reg: /^mid:([^\s]*)/,
      format: "mid:%s"
    },
    {
      // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: "msid",
      reg: /^msid:(.*)/,
      format: "msid:%s"
    },
    {
      // a=ptime:20
      name: "ptime",
      reg: /^ptime:(\d*(?:\.\d*)*)/,
      format: "ptime:%d"
    },
    {
      // a=maxptime:60
      name: "maxptime",
      reg: /^maxptime:(\d*(?:\.\d*)*)/,
      format: "maxptime:%d"
    },
    {
      // a=sendrecv
      name: "direction",
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    {
      // a=ice-lite
      name: "icelite",
      reg: /^(ice-lite)/
    },
    {
      // a=ice-ufrag:F7gI
      name: "iceUfrag",
      reg: /^ice-ufrag:(\S*)/,
      format: "ice-ufrag:%s"
    },
    {
      // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: "icePwd",
      reg: /^ice-pwd:(\S*)/,
      format: "ice-pwd:%s"
    },
    {
      // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: "fingerprint",
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ["type", "hash"],
      format: "fingerprint:%s %s"
    },
    {
      // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
      // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
      push: "candidates",
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
      names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
      format: function(e) {
        var t = "candidate:%s %d %s %d %s %d typ %s";
        return t += e.raddr != null ? " raddr %s rport %d" : "%v%v", t += e.tcptype != null ? " tcptype %s" : "%v", e.generation != null && (t += " generation %d"), t += e["network-id"] != null ? " network-id %d" : "%v", t += e["network-cost"] != null ? " network-cost %d" : "%v", t;
      }
    },
    {
      // a=end-of-candidates (keep after the candidates line for readability)
      name: "endOfCandidates",
      reg: /^(end-of-candidates)/
    },
    {
      // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: "remoteCandidates",
      reg: /^remote-candidates:(.*)/,
      format: "remote-candidates:%s"
    },
    {
      // a=ice-options:google-ice
      name: "iceOptions",
      reg: /^ice-options:(\S*)/,
      format: "ice-options:%s"
    },
    {
      // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: "ssrcs",
      reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
      names: ["id", "attribute", "value"],
      format: function(e) {
        var t = "ssrc:%d";
        return e.attribute != null && (t += " %s", e.value != null && (t += ":%s")), t;
      }
    },
    {
      // a=ssrc-group:FEC 1 2
      // a=ssrc-group:FEC-FR 3004364195 1080772241
      push: "ssrcGroups",
      // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
      reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
      names: ["semantics", "ssrcs"],
      format: "ssrc-group:%s %s"
    },
    {
      // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: "msidSemantic",
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ["semantic", "token"],
      format: "msid-semantic: %s %s"
      // space after ':' is not accidental
    },
    {
      // a=group:BUNDLE audio video
      push: "groups",
      reg: /^group:(\w*) (.*)/,
      names: ["type", "mids"],
      format: "group:%s %s"
    },
    {
      // a=rtcp-mux
      name: "rtcpMux",
      reg: /^(rtcp-mux)/
    },
    {
      // a=rtcp-rsize
      name: "rtcpRsize",
      reg: /^(rtcp-rsize)/
    },
    {
      // a=sctpmap:5000 webrtc-datachannel 1024
      name: "sctpmap",
      reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
      names: ["sctpmapNumber", "app", "maxMessageSize"],
      format: function(e) {
        return e.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
      }
    },
    {
      // a=x-google-flag:conference
      name: "xGoogleFlag",
      reg: /^x-google-flag:([^\s]*)/,
      format: "x-google-flag:%s"
    },
    {
      // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
      push: "rids",
      reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
      names: ["id", "direction", "params"],
      format: function(e) {
        return e.params ? "rid:%s %s %s" : "rid:%s %s";
      }
    },
    {
      // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
      // a=imageattr:* send [x=800,y=640] recv *
      // a=imageattr:100 recv [x=320,y=240]
      push: "imageattrs",
      reg: new RegExp(
        // a=imageattr:97
        "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
      ),
      names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
      format: function(e) {
        return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "");
      }
    },
    {
      // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
      // a=simulcast:recv 1;4,5 send 6;7
      name: "simulcast",
      reg: new RegExp(
        // a=simulcast:
        "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
      ),
      names: ["dir1", "list1", "dir2", "list2"],
      format: function(e) {
        return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "");
      }
    },
    {
      // old simulcast draft 03 (implemented by Firefox)
      //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
      // a=simulcast: recv pt=97;98 send pt=97
      // a=simulcast: send rid=5;6;7 paused=6,7
      name: "simulcast_03",
      reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
      names: ["value"],
      format: "simulcast: %s"
    },
    {
      // a=framerate:25
      // a=framerate:29.97
      name: "framerate",
      reg: /^framerate:(\d+(?:$|\.\d+))/,
      format: "framerate:%s"
    },
    {
      // RFC4570
      // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
      name: "sourceFilter",
      reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
      names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
      format: "source-filter: %s %s %s %s %s"
    },
    {
      // a=bundle-only
      name: "bundleOnly",
      reg: /^(bundle-only)/
    },
    {
      // a=label:1
      name: "label",
      reg: /^label:(.+)/,
      format: "label:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
      name: "sctpPort",
      reg: /^sctp-port:(\d+)$/,
      format: "sctp-port:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
      name: "maxMessageSize",
      reg: /^max-message-size:(\d+)$/,
      format: "max-message-size:%s"
    },
    {
      // RFC7273
      // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
      push: "tsRefClocks",
      reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
      names: ["clksrc", "clksrcExt"],
      format: function(e) {
        return "ts-refclk:%s" + (e.clksrcExt != null ? "=%s" : "");
      }
    },
    {
      // RFC7273
      // a=mediaclk:direct=963214424
      name: "mediaClk",
      reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
      names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
      format: function(e) {
        var t = "mediaclk:";
        return t += e.id != null ? "id=%s %s" : "%v%s", t += e.mediaClockValue != null ? "=%s" : "", t += e.rateNumerator != null ? " rate=%s" : "", t += e.rateDenominator != null ? "/%s" : "", t;
      }
    },
    {
      // a=keywds:keywords
      name: "keywords",
      reg: /^keywds:(.+)$/,
      format: "keywds:%s"
    },
    {
      // a=content:main
      name: "content",
      reg: /^content:(.+)/,
      format: "content:%s"
    },
    // BFCP https://tools.ietf.org/html/rfc4583
    {
      // a=floorctrl:c-s
      name: "bfcpFloorCtrl",
      reg: /^floorctrl:(c-only|s-only|c-s)/,
      format: "floorctrl:%s"
    },
    {
      // a=confid:1
      name: "bfcpConfId",
      reg: /^confid:(\d+)/,
      format: "confid:%s"
    },
    {
      // a=userid:1
      name: "bfcpUserId",
      reg: /^userid:(\d+)/,
      format: "userid:%s"
    },
    {
      // a=floorid:1
      name: "bfcpFloorId",
      reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
      names: ["id", "mStream"],
      format: "floorid:%s mstrm:%s"
    },
    {
      // any a= that we don't understand is kept verbatim on media.invalid
      push: "invalid",
      names: ["value"]
    }
  ]
};
Object.keys(Ro).forEach(function(e) {
  var t = Ro[e];
  t.forEach(function(i) {
    i.reg || (i.reg = /(.*)/), i.format || (i.format = "%s");
  });
});
var pd = fd.exports;
(function(e) {
  var t = function(o) {
    return String(Number(o)) === o ? Number(o) : o;
  }, i = function(o, c, d, u) {
    if (u && !d)
      c[u] = t(o[1]);
    else
      for (var l = 0; l < d.length; l += 1)
        o[l + 1] != null && (c[d[l]] = t(o[l + 1]));
  }, n = function(o, c, d) {
    var u = o.name && o.names;
    o.push && !c[o.push] ? c[o.push] = [] : u && !c[o.name] && (c[o.name] = {});
    var l = o.push ? {} : (
      // blank object that will be pushed
      u ? c[o.name] : c
    );
    i(d.match(o.reg), l, o.names, o.name), o.push && c[o.push].push(l);
  }, r = pd, s = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
  e.parse = function(o) {
    var c = {}, d = [], u = c;
    return o.split(/(\r\n|\r|\n)/).filter(s).forEach(function(l) {
      var h = l[0], f = l.slice(2);
      h === "m" && (d.push({
        rtp: [],
        fmtp: []
      }), u = d[d.length - 1]);
      for (var p = 0; p < (r[h] || []).length; p += 1) {
        var m = r[h][p];
        if (m.reg.test(f))
          return n(m, u, f);
      }
    }), c.media = d, c;
  };
  var a = function(o, c) {
    var d = c.split(/=(.+)/, 2);
    return d.length === 2 ? o[d[0]] = t(d[1]) : d.length === 1 && c.length > 1 && (o[d[0]] = void 0), o;
  };
  e.parseParams = function(o) {
    return o.split(/;\s?/).reduce(a, {});
  }, e.parseFmtpConfig = e.parseParams, e.parsePayloads = function(o) {
    return o.toString().split(" ").map(Number);
  }, e.parseRemoteCandidates = function(o) {
    for (var c = [], d = o.split(" ").map(t), u = 0; u < d.length; u += 3)
      c.push({
        component: d[u],
        ip: d[u + 1],
        port: d[u + 2]
      });
    return c;
  }, e.parseImageAttributes = function(o) {
    return o.split(" ").map(function(c) {
      return c.substring(1, c.length - 1).split(",").reduce(a, {});
    });
  }, e.parseSimulcastStreamList = function(o) {
    return o.split(";").map(function(c) {
      return c.split(",").map(function(d) {
        var u, l = !1;
        return d[0] !== "~" ? u = t(d) : (u = t(d.substring(1, d.length)), l = !0), {
          scid: u,
          paused: l
        };
      });
    });
  };
})(hd);
var Or = pd, Oh = /%[sdv%]/g, Nh = function(e) {
  var t = 1, i = arguments, n = i.length;
  return e.replace(Oh, function(r) {
    if (t >= n)
      return r;
    var s = i[t];
    switch (t += 1, r) {
      case "%%":
        return "%";
      case "%s":
        return String(s);
      case "%d":
        return Number(s);
      case "%v":
        return "";
    }
  });
}, cn = function(e, t, i) {
  var n = t.format instanceof Function ? t.format(t.push ? i : i[t.name]) : t.format, r = [e + "=" + n];
  if (t.names)
    for (var s = 0; s < t.names.length; s += 1) {
      var a = t.names[s];
      t.name ? r.push(i[t.name][a]) : r.push(i[t.names[s]]);
    }
  else
    r.push(i[t.name]);
  return Nh.apply(null, r);
}, Ah = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"], Ih = ["i", "c", "b", "a"], Dh = function(e, t) {
  t = t || {}, e.version == null && (e.version = 0), e.name == null && (e.name = " "), e.media.forEach(function(s) {
    s.payloads == null && (s.payloads = "");
  });
  var i = t.outerOrder || Ah, n = t.innerOrder || Ih, r = [];
  return i.forEach(function(s) {
    Or[s].forEach(function(a) {
      a.name in e && e[a.name] != null ? r.push(cn(s, a, e)) : a.push in e && e[a.push] != null && e[a.push].forEach(function(o) {
        r.push(cn(s, a, o));
      });
    });
  }), e.media.forEach(function(s) {
    r.push(cn("m", Or.m[0], s)), n.forEach(function(a) {
      Or[a].forEach(function(o) {
        o.name in s && s[o.name] != null ? r.push(cn(a, o, s)) : o.push in s && s[o.push] != null && s[o.push].forEach(function(c) {
          r.push(cn(a, o, c));
        });
      });
    });
  }), r.join(`\r
`) + `\r
`;
}, Uh = hd, Mh = Dh, Nr = Mh, un = Uh.parse;
function md(e, t, i) {
  var n, r, s;
  t === void 0 && (t = 50), i === void 0 && (i = {});
  var a = (n = i.isImmediate) != null && n, o = (r = i.callback) != null && r, c = i.maxWait, d = Date.now(), u = [];
  function l() {
    if (c !== void 0) {
      var f = Date.now() - d;
      if (f + t >= c)
        return c - f;
    }
    return t;
  }
  var h = function() {
    var f = [].slice.call(arguments), p = this;
    return new Promise(function(m, C) {
      var E = a && s === void 0;
      if (s !== void 0 && clearTimeout(s), s = setTimeout(function() {
        if (s = void 0, d = Date.now(), !a) {
          var I = e.apply(p, f);
          o && o(I), u.forEach(function(B) {
            return (0, B.resolve)(I);
          }), u = [];
        }
      }, l()), E) {
        var A = e.apply(p, f);
        return o && o(A), m(A);
      }
      u.push({
        resolve: m,
        reject: C
      });
    });
  };
  return h.cancel = function(f) {
    s !== void 0 && clearTimeout(s), u.forEach(function(p) {
      return (0, p.reject)(f);
    }), u = [];
  }, h;
}
const Oo = 0.7, Qi = {
  NegotiationStarted: "negotiationStarted",
  NegotiationComplete: "negotiationComplete",
  RTPVideoPayloadTypes: "rtpVideoPayloadTypes"
};
class No extends li {
  get pc() {
    if (this._pc)
      return this._pc;
    throw new $e("Expected peer connection to be available");
  }
  constructor(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), this.pendingCandidates = [], this.restartingIce = !1, this.renegotiate = !1, this.trackBitrates = [], this.remoteStereoMids = [], this.remoteNackMids = [], this.negotiate = md((n) => {
      this.emit(Qi.NegotiationStarted);
      try {
        this.createAndSendOffer();
      } catch (r) {
        if (n)
          n(r);
        else
          throw r;
      }
    }, 100), this._pc = ph() ? (
      // @ts-expect-error chrome allows additional media constraints to be passed into the RTCPeerConnection constructor
      new RTCPeerConnection(t, i)
    ) : new RTCPeerConnection(t);
  }
  get isICEConnected() {
    return this._pc !== null && (this.pc.iceConnectionState === "connected" || this.pc.iceConnectionState === "completed");
  }
  addIceCandidate(t) {
    return k(this, void 0, void 0, function* () {
      if (this.pc.remoteDescription && !this.restartingIce)
        return this.pc.addIceCandidate(t);
      this.pendingCandidates.push(t);
    });
  }
  setRemoteDescription(t) {
    var i;
    return k(this, void 0, void 0, function* () {
      let n;
      if (t.type === "offer") {
        let {
          stereoMids: r,
          nackMids: s
        } = xh(t);
        this.remoteStereoMids = r, this.remoteNackMids = s;
      } else if (t.type === "answer") {
        const r = un((i = t.sdp) !== null && i !== void 0 ? i : "");
        r.media.forEach((s) => {
          s.type === "audio" && this.trackBitrates.some((a) => {
            if (!a.transceiver || s.mid != a.transceiver.mid)
              return !1;
            let o = 0;
            if (s.rtp.some((d) => d.codec.toUpperCase() === a.codec.toUpperCase() ? (o = d.payload, !0) : !1), o === 0)
              return !0;
            let c = !1;
            for (const d of s.fmtp)
              if (d.payload === o) {
                d.config = d.config.split(";").filter((u) => !u.includes("maxaveragebitrate")).join(";"), a.maxbr > 0 && (d.config += ";maxaveragebitrate=".concat(a.maxbr * 1e3)), c = !0;
                break;
              }
            return c || a.maxbr > 0 && s.fmtp.push({
              payload: o,
              config: "maxaveragebitrate=".concat(a.maxbr * 1e3)
            }), !0;
          });
        }), n = Nr(r);
      }
      yield this.setMungedSDP(t, n, !0), this.pendingCandidates.forEach((r) => {
        this.pc.addIceCandidate(r);
      }), this.pendingCandidates = [], this.restartingIce = !1, this.renegotiate ? (this.renegotiate = !1, this.createAndSendOffer()) : t.type === "answer" && (this.emit(Qi.NegotiationComplete), t.sdp && un(t.sdp).media.forEach((s) => {
        s.type === "video" && this.emit(Qi.RTPVideoPayloadTypes, s.rtp);
      }));
    });
  }
  createAndSendOffer(t) {
    var i;
    return k(this, void 0, void 0, function* () {
      if (this.onOffer === void 0)
        return;
      if (t != null && t.iceRestart && (g.debug("restarting ICE"), this.restartingIce = !0), this._pc && this._pc.signalingState === "have-local-offer") {
        const s = this.pc.remoteDescription;
        if (t != null && t.iceRestart && s)
          yield this.pc.setRemoteDescription(s);
        else {
          this.renegotiate = !0;
          return;
        }
      } else if (!this._pc || this._pc.signalingState === "closed") {
        g.warn("could not createOffer with closed peer connection");
        return;
      }
      g.debug("starting to negotiate");
      const n = yield this.pc.createOffer(t), r = un((i = n.sdp) !== null && i !== void 0 ? i : "");
      r.media.forEach((s) => {
        s.type === "audio" ? Ao(s, [], []) : s.type === "video" && (Lh(s), this.trackBitrates.some((a) => {
          if (!s.msid || !a.cid || !s.msid.includes(a.cid))
            return !1;
          let o = 0;
          if (s.rtp.some((d) => d.codec.toUpperCase() === a.codec.toUpperCase() ? (o = d.payload, !0) : !1), o === 0)
            return !0;
          let c = !1;
          for (const d of s.fmtp)
            if (d.payload === o) {
              d.config.includes("x-google-start-bitrate") || (d.config += ";x-google-start-bitrate=".concat(a.maxbr * Oo)), d.config.includes("x-google-max-bitrate") || (d.config += ";x-google-max-bitrate=".concat(a.maxbr)), c = !0;
              break;
            }
          return c || s.fmtp.push({
            payload: o,
            config: "x-google-start-bitrate=".concat(a.maxbr * Oo, ";x-google-max-bitrate=").concat(a.maxbr)
          }), !0;
        }));
      }), yield this.setMungedSDP(n, Nr(r)), this.onOffer(n);
    });
  }
  createAndSetAnswer() {
    var t;
    return k(this, void 0, void 0, function* () {
      const i = yield this.pc.createAnswer(), n = un((t = i.sdp) !== null && t !== void 0 ? t : "");
      return n.media.forEach((r) => {
        r.type === "audio" && Ao(r, this.remoteStereoMids, this.remoteNackMids);
      }), yield this.setMungedSDP(i, Nr(n)), i;
    });
  }
  setTrackCodecBitrate(t) {
    this.trackBitrates.push(t);
  }
  close() {
    this._pc && (this._pc.close(), this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.ondatachannel = null, this._pc.onnegotiationneeded = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ondatachannel = null, this._pc.ontrack = null, this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc = null);
  }
  setMungedSDP(t, i, n) {
    return k(this, void 0, void 0, function* () {
      if (i) {
        const r = t.sdp;
        t.sdp = i;
        try {
          g.debug("setting munged ".concat(n ? "remote" : "local", " description")), n ? yield this.pc.setRemoteDescription(t) : yield this.pc.setLocalDescription(t);
          return;
        } catch (s) {
          g.warn("not able to set ".concat(t.type, ", falling back to unmodified sdp"), {
            error: s
          }), t.sdp = r;
        }
      }
      try {
        n ? yield this.pc.setRemoteDescription(t) : yield this.pc.setLocalDescription(t);
      } catch (r) {
        let s = "unknown error";
        throw r instanceof Error ? s = r.message : typeof r == "string" && (s = r), new ts(s);
      }
    });
  }
}
function Ao(e, t, i) {
  let n = 0;
  e.rtp.some((r) => r.codec === "opus" ? (n = r.payload, !0) : !1), n > 0 && (e.rtcpFb || (e.rtcpFb = []), i.includes(e.mid) && !e.rtcpFb.some((r) => r.payload === n && r.type === "nack") && e.rtcpFb.push({
    payload: n,
    type: "nack"
  }), t.includes(e.mid) && e.fmtp.some((r) => r.payload === n ? (r.config.includes("stereo=1") || (r.config += ";stereo=1"), !0) : !1));
}
function Lh(e) {
  var t, i, n, r;
  const s = (i = (t = e.rtp[0]) === null || t === void 0 ? void 0 : t.codec) === null || i === void 0 ? void 0 : i.toLowerCase();
  if (!mn(s))
    return;
  let a = 0;
  ((n = e.ext) === null || n === void 0 ? void 0 : n.some((c) => c.uri === So ? !0 : (c.value > a && (a = c.value), !1))) || (r = e.ext) === null || r === void 0 || r.push({
    value: a + 1,
    uri: So
  });
}
function xh(e) {
  var t;
  const i = [], n = [], r = un((t = e.sdp) !== null && t !== void 0 ? t : "");
  let s = 0;
  return r.media.forEach((a) => {
    var o;
    a.type === "audio" && (a.rtp.some((c) => c.codec === "opus" ? (s = c.payload, !0) : !1), !((o = a.rtcpFb) === null || o === void 0) && o.some((c) => c.payload === s && c.type === "nack") && n.push(a.mid), a.fmtp.some((c) => c.payload === s ? (c.config.includes("sprop-stereo=1") && i.push(a.mid), !0) : !1));
  }), {
    stereoMids: i,
    nackMids: n
  };
}
class vd {
  constructor(t, i) {
    this.lastUpdateAt = 0, this.settingsCacheTime = 3e3, this.attemptedRegions = [], this.serverUrl = new URL(t), this.token = i;
  }
  isCloud() {
    return Ps(this.serverUrl);
  }
  getNextBestRegionUrl(t) {
    return k(this, void 0, void 0, function* () {
      if (!this.isCloud())
        throw Error("region availability is only supported for LiveKit Cloud domains");
      (!this.regionSettings || Date.now() - this.lastUpdateAt > this.settingsCacheTime) && (this.regionSettings = yield this.fetchRegionSettings(t));
      const i = this.regionSettings.regions.filter((n) => !this.attemptedRegions.find((r) => r.url === n.url));
      if (i.length > 0) {
        const n = i[0];
        return this.attemptedRegions.push(n), g.debug("next region: ".concat(n.region)), n.url;
      } else
        return null;
    });
  }
  resetAttempts() {
    this.attemptedRegions = [];
  }
  fetchRegionSettings(t) {
    return k(this, void 0, void 0, function* () {
      const i = yield fetch("".concat($h(this.serverUrl), "/regions"), {
        headers: {
          authorization: "Bearer ".concat(this.token)
        },
        signal: t
      });
      if (i.ok) {
        const n = yield i.json();
        return this.lastUpdateAt = Date.now(), n;
      } else
        throw new ve("Could not fetch region settings: ".concat(i.statusText), i.status === 401 ? 0 : void 0, i.status);
    });
  }
}
function $h(e) {
  return "".concat(e.protocol.replace("ws", "http"), "//").concat(e.host, "/settings");
}
const Fh = {
  /**
   * @deprecated
   */
  audioBitrate: Kn.music.maxBitrate,
  audioPreset: Kn.music,
  dtx: !0,
  red: !0,
  forceStereo: !1,
  simulcast: !0,
  screenShareEncoding: Ts.h1080fps15.encoding,
  stopMicTrackOnMute: !1,
  videoCodec: "vp8",
  backupCodec: !1
}, Bh = {
  autoGainControl: !0,
  echoCancellation: !0,
  noiseSuppression: !0
}, Jh = {
  resolution: _n.h720.resolution
}, Vh = {
  adaptiveStream: !1,
  dynacast: !1,
  stopLocalTrackOnUnpublish: !0,
  reconnectPolicy: new Ul(),
  disconnectOnPageLeave: !0,
  expWebAudioMix: !1
}, gd = {
  autoSubscribe: !0,
  maxRetries: 1,
  peerConnectionTimeout: 15e3
}, Io = "_lossy", Do = "_reliable", Hh = 2 * 1e3, Uo = "leave-reconnect";
var Ke;
(function(e) {
  e[e.New = 0] = "New", e[e.Connected = 1] = "Connected", e[e.Disconnected = 2] = "Disconnected", e[e.Reconnecting = 3] = "Reconnecting", e[e.Closed = 4] = "Closed";
})(Ke || (Ke = {}));
class qh extends li {
  get isClosed() {
    return this._isClosed;
  }
  constructor(t) {
    super(), this.options = t, this.rtcConfig = {}, this.peerConnectionTimeout = gd.peerConnectionTimeout, this.fullReconnectOnNext = !1, this.subscriberPrimary = !1, this.pcState = Ke.New, this._isClosed = !0, this.pendingTrackResolvers = {}, this.hasPublished = !1, this.reconnectAttempts = 0, this.reconnectStart = 0, this.attemptingReconnect = !1, this.joinAttempts = 0, this.maxJoinAttempts = 1, this.shouldFailNext = !1, this.handleDataChannel = (i) => {
      let {
        channel: n
      } = i;
      return k(this, void 0, void 0, function* () {
        if (n) {
          if (n.label === Do)
            this.reliableDCSub = n;
          else if (n.label === Io)
            this.lossyDCSub = n;
          else
            return;
          g.debug("on data channel ".concat(n.id, ", ").concat(n.label)), n.onmessage = this.handleDataMessage;
        }
      });
    }, this.handleDataMessage = (i) => k(this, void 0, void 0, function* () {
      var n, r;
      const s = yield this.dataProcessLock.lock();
      try {
        let a;
        if (i.data instanceof ArrayBuffer)
          a = i.data;
        else if (i.data instanceof Blob)
          a = yield i.data.arrayBuffer();
        else {
          g.error("unsupported data type", i.data);
          return;
        }
        const o = Wr.decode(new Uint8Array(a));
        ((n = o.value) === null || n === void 0 ? void 0 : n.$case) === "speaker" ? this.emit(U.ActiveSpeakersUpdate, o.value.speaker.speakers) : ((r = o.value) === null || r === void 0 ? void 0 : r.$case) === "user" && this.emit(U.DataPacketReceived, o.value.user, o.kind);
      } finally {
        s();
      }
    }), this.handleDataError = (i) => {
      const r = i.currentTarget.maxRetransmits === 0 ? "lossy" : "reliable";
      if (i instanceof ErrorEvent) {
        const {
          error: s
        } = i.error;
        g.error("DataChannel error on ".concat(r, ": ").concat(i.message), s);
      } else
        g.error("Unknown DataChannel Error on ".concat(r), i);
    }, this.handleBufferedAmountLow = (i) => {
      const r = i.currentTarget.maxRetransmits === 0 ? Se.LOSSY : Se.RELIABLE;
      this.updateAndEmitDCBufferStatus(r);
    }, this.handleDisconnect = (i, n) => {
      if (this._isClosed)
        return;
      g.warn("".concat(i, " disconnected")), this.reconnectAttempts === 0 && (this.reconnectStart = Date.now());
      const r = (o) => {
        g.warn("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(o, "ms. giving up")), this.emit(U.Disconnected), this.close();
      }, s = Date.now() - this.reconnectStart;
      let a = this.getNextRetryDelay({
        elapsedMs: s,
        retryCount: this.reconnectAttempts
      });
      if (a === null) {
        r(s);
        return;
      }
      i === Uo && (a = 0), g.debug("reconnecting in ".concat(a, "ms")), this.clearReconnectTimeout(), this.url && this.token && Ps(new URL(this.url)) && (this.regionUrlProvider = new vd(this.url, this.token)), this.reconnectTimeout = Be.setTimeout(() => this.attemptReconnect(n), a);
    }, this.waitForRestarted = () => new Promise((i, n) => {
      this.pcState === Ke.Connected && i();
      const r = () => {
        this.off(U.Disconnected, s), i();
      }, s = () => {
        this.off(U.Restarted, r), n();
      };
      this.once(U.Restarted, r), this.once(U.Disconnected, s), this.once(U.Closing, s);
    }), this.updateAndEmitDCBufferStatus = (i) => {
      const n = this.isBufferStatusLow(i);
      typeof n < "u" && n !== this.dcBufferStatus.get(i) && (this.dcBufferStatus.set(i, n), this.emit(U.DCBufferStatusChanged, n, i));
    }, this.isBufferStatusLow = (i) => {
      const n = this.dataChannelForKind(i);
      if (n)
        return n.bufferedAmount <= n.bufferedAmountLowThreshold;
    }, this.handleBrowserOnLine = () => {
      this.client.isReconnecting && (this.clearReconnectTimeout(), this.attemptReconnect(ct.RR_SIGNAL_DISCONNECTED));
    }, this.client = new Ch(), this.client.signalLatency = this.options.expSignalLatency, this.reconnectPolicy = this.options.reconnectPolicy, this.registerOnLineListener(), this.closingLock = new Ht(), this.dataProcessLock = new Ht(), this.dcBufferStatus = /* @__PURE__ */ new Map([[Se.LOSSY, !0], [Se.RELIABLE, !0]]), this.client.onParticipantUpdate = (i) => this.emit(U.ParticipantUpdate, i), this.client.onConnectionQuality = (i) => this.emit(U.ConnectionQualityUpdate, i), this.client.onRoomUpdate = (i) => this.emit(U.RoomUpdate, i), this.client.onSubscriptionError = (i) => this.emit(U.SubscriptionError, i), this.client.onSubscriptionPermissionUpdate = (i) => this.emit(U.SubscriptionPermissionUpdate, i), this.client.onSpeakersChanged = (i) => this.emit(U.SpeakersChanged, i), this.client.onStreamStateUpdate = (i) => this.emit(U.StreamStateChanged, i);
  }
  join(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      this.url = t, this.token = i, this.signalOpts = n;
      try {
        this.joinAttempts += 1;
        const s = yield this.client.join(t, i, n, r);
        return this._isClosed = !1, this.latestJoinResponse = s, this.subscriberPrimary = s.subscriberPrimary, this.publisher || this.configure(s), this.subscriberPrimary || this.negotiate(), this.setupSignalClientCallbacks(), this.clientConfiguration = s.clientConfiguration, s;
      } catch (s) {
        if (s instanceof ve && s.reason === 1 && (g.warn("Couldn't connect to server, attempt ".concat(this.joinAttempts, " of ").concat(this.maxJoinAttempts)), this.joinAttempts < this.maxJoinAttempts))
          return this.join(t, i, n, r);
        throw s;
      }
    });
  }
  close() {
    return k(this, void 0, void 0, function* () {
      const t = yield this.closingLock.lock();
      if (this.isClosed) {
        t();
        return;
      }
      try {
        this._isClosed = !0, this.emit(U.Closing), this.removeAllListeners(), this.deregisterOnLineListener(), this.clearPendingReconnect(), yield this.cleanupPeerConnections(), yield this.cleanupClient();
      } finally {
        t();
      }
    });
  }
  cleanupPeerConnections() {
    return k(this, void 0, void 0, function* () {
      this.publisher && this.publisher.pc.signalingState !== "closed" && this.publisher.pc.getSenders().forEach((i) => {
        var n, r;
        try {
          !((n = this.publisher) === null || n === void 0) && n.pc.removeTrack && ((r = this.publisher) === null || r === void 0 || r.pc.removeTrack(i));
        } catch (s) {
          g.warn("could not removeTrack", {
            error: s
          });
        }
      }), this.publisher && (this.publisher.close(), this.publisher = void 0), this.subscriber && (this.subscriber.close(), this.subscriber = void 0), this.primaryPC = void 0;
      const t = (i) => {
        i && (i.close(), i.onbufferedamountlow = null, i.onclose = null, i.onclosing = null, i.onerror = null, i.onmessage = null, i.onopen = null);
      };
      t(this.lossyDC), t(this.lossyDCSub), t(this.reliableDC), t(this.reliableDCSub), this.lossyDC = void 0, this.lossyDCSub = void 0, this.reliableDC = void 0, this.reliableDCSub = void 0;
    });
  }
  cleanupClient() {
    return k(this, void 0, void 0, function* () {
      yield this.client.close(), this.client.resetCallbacks();
    });
  }
  addTrack(t) {
    if (this.pendingTrackResolvers[t.cid])
      throw new Pt("a track with the same ID has already been published");
    return new Promise((i, n) => {
      const r = setTimeout(() => {
        delete this.pendingTrackResolvers[t.cid], n(new ve("publication of local track timed out, no response from server"));
      }, 1e4);
      this.pendingTrackResolvers[t.cid] = {
        resolve: (s) => {
          clearTimeout(r), i(s);
        },
        reject: () => {
          clearTimeout(r), n(new Error("Cancelled publication by calling unpublish"));
        }
      }, this.client.sendAddTrack(t);
    });
  }
  /**
   * Removes sender from PeerConnection, returning true if it was removed successfully
   * and a negotiation is necessary
   * @param sender
   * @returns
   */
  removeTrack(t) {
    var i;
    if (t.track && this.pendingTrackResolvers[t.track.id]) {
      const {
        reject: n
      } = this.pendingTrackResolvers[t.track.id];
      n && n(), delete this.pendingTrackResolvers[t.track.id];
    }
    try {
      return (i = this.publisher) === null || i === void 0 || i.pc.removeTrack(t), !0;
    } catch (n) {
      g.warn("failed to remove track", {
        error: n,
        method: "removeTrack"
      });
    }
    return !1;
  }
  updateMuteStatus(t, i) {
    this.client.sendMuteTrack(t, i);
  }
  get dataSubscriberReadyState() {
    var t;
    return (t = this.reliableDCSub) === null || t === void 0 ? void 0 : t.readyState;
  }
  getConnectedServerAddress() {
    return k(this, void 0, void 0, function* () {
      if (this.primaryPC !== void 0)
        return Gh(this.primaryPC);
    });
  }
  configure(t) {
    var i, n;
    if (this.publisher || this.subscriber)
      return;
    this.participantSid = (i = t.participant) === null || i === void 0 ? void 0 : i.sid;
    const r = this.makeRTCConfiguration(t);
    !((n = this.signalOpts) === null || n === void 0) && n.e2eeEnabled && (g.debug("E2EE - setting up transports with insertable streams"), r.encodedInsertableStreams = !0);
    const s = {
      optional: [{
        googDscp: !0
      }]
    };
    this.publisher = new No(r, s), this.subscriber = new No(r), this.emit(U.TransportsCreated, this.publisher, this.subscriber), this.publisher.pc.onicecandidate = (d) => {
      d.candidate && (g.trace("adding ICE candidate for peer", d.candidate), this.client.sendIceCandidate(d.candidate, Ve.PUBLISHER));
    }, this.subscriber.pc.onicecandidate = (d) => {
      d.candidate && this.client.sendIceCandidate(d.candidate, Ve.SUBSCRIBER);
    }, this.publisher.onOffer = (d) => {
      this.client.sendOffer(d);
    };
    let a = this.publisher.pc, o = this.subscriber.pc, c = t.subscriberPrimary;
    c && (a = this.subscriber.pc, o = this.publisher.pc, this.subscriber.pc.ondatachannel = this.handleDataChannel), this.primaryPC = a, a.onconnectionstatechange = () => k(this, void 0, void 0, function* () {
      if (g.debug("primary PC state changed ".concat(a.connectionState)), a.connectionState === "connected") {
        const d = this.pcState === Ke.New;
        this.pcState = Ke.Connected, d && this.emit(U.Connected, t);
      } else
        a.connectionState === "failed" && this.pcState === Ke.Connected && (this.pcState = Ke.Disconnected, this.handleDisconnect("primary peerconnection", c ? ct.RR_SUBSCRIBER_FAILED : ct.RR_PUBLISHER_FAILED));
    }), o.onconnectionstatechange = () => k(this, void 0, void 0, function* () {
      g.debug("secondary PC state changed ".concat(o.connectionState)), o.connectionState === "failed" && this.handleDisconnect("secondary peerconnection", c ? ct.RR_PUBLISHER_FAILED : ct.RR_SUBSCRIBER_FAILED);
    }), this.subscriber.pc.ontrack = (d) => {
      this.emit(U.MediaTrackAdded, d.track, d.streams[0], d.receiver);
    }, this.createDataChannels();
  }
  setupSignalClientCallbacks() {
    this.client.onAnswer = (t) => k(this, void 0, void 0, function* () {
      this.publisher && (g.debug("received server answer", {
        RTCSdpType: t.type,
        signalingState: this.publisher.pc.signalingState.toString()
      }), yield this.publisher.setRemoteDescription(t));
    }), this.client.onTrickle = (t, i) => {
      !this.publisher || !this.subscriber || (g.trace("got ICE candidate from peer", {
        candidate: t,
        target: i
      }), i === Ve.PUBLISHER ? this.publisher.addIceCandidate(t) : this.subscriber.addIceCandidate(t));
    }, this.client.onOffer = (t) => k(this, void 0, void 0, function* () {
      if (!this.subscriber)
        return;
      g.debug("received server offer", {
        RTCSdpType: t.type,
        signalingState: this.subscriber.pc.signalingState.toString()
      }), yield this.subscriber.setRemoteDescription(t);
      const i = yield this.subscriber.createAndSetAnswer();
      this.client.sendAnswer(i);
    }), this.client.onLocalTrackPublished = (t) => {
      g.debug("received trackPublishedResponse", t);
      const {
        resolve: i
      } = this.pendingTrackResolvers[t.cid];
      if (!i) {
        g.error("missing track resolver for ".concat(t.cid));
        return;
      }
      delete this.pendingTrackResolvers[t.cid], i(t.track);
    }, this.client.onTokenRefresh = (t) => {
      this.token = t;
    }, this.client.onClose = () => {
      this.handleDisconnect("signal", ct.RR_SIGNAL_DISCONNECTED);
    }, this.client.onLeave = (t) => {
      t != null && t.canReconnect ? (this.fullReconnectOnNext = !0, this.primaryPC = void 0, this.handleDisconnect(Uo)) : (this.emit(U.Disconnected, t == null ? void 0 : t.reason), this.close()), g.trace("leave request", {
        leave: t
      });
    };
  }
  makeRTCConfiguration(t) {
    const i = Object.assign({}, this.rtcConfig);
    if (t.iceServers && !i.iceServers) {
      const n = [];
      t.iceServers.forEach((r) => {
        const s = {
          urls: r.urls
        };
        r.username && (s.username = r.username), r.credential && (s.credential = r.credential), n.push(s);
      }), i.iceServers = n;
    }
    return t.clientConfiguration && t.clientConfiguration.forceRelay === rt.ENABLED && (i.iceTransportPolicy = "relay"), i.sdpSemantics = "unified-plan", i.continualGatheringPolicy = "gather_continually", i;
  }
  createDataChannels() {
    this.publisher && (this.lossyDC && (this.lossyDC.onmessage = null, this.lossyDC.onerror = null), this.reliableDC && (this.reliableDC.onmessage = null, this.reliableDC.onerror = null), this.lossyDC = this.publisher.pc.createDataChannel(Io, {
      // will drop older packets that arrive
      ordered: !0,
      maxRetransmits: 0
    }), this.reliableDC = this.publisher.pc.createDataChannel(Do, {
      ordered: !0
    }), this.lossyDC.onmessage = this.handleDataMessage, this.reliableDC.onmessage = this.handleDataMessage, this.lossyDC.onerror = this.handleDataError, this.reliableDC.onerror = this.handleDataError, this.lossyDC.bufferedAmountLowThreshold = 65535, this.reliableDC.bufferedAmountLowThreshold = 65535, this.lossyDC.onbufferedamountlow = this.handleBufferedAmountLow, this.reliableDC.onbufferedamountlow = this.handleBufferedAmountLow);
  }
  setPreferredCodec(t, i, n) {
    if (!("getCapabilities" in RTCRtpSender))
      return;
    const r = RTCRtpSender.getCapabilities(i);
    if (!r)
      return;
    g.debug("get capabilities", r);
    const s = [], a = [], o = [];
    r.codecs.forEach((c) => {
      const d = c.mimeType.toLowerCase();
      if (d === "audio/opus") {
        s.push(c);
        return;
      }
      if (!(d === "video/".concat(n))) {
        o.push(c);
        return;
      }
      if (n === "h264") {
        c.sdpFmtpLine && c.sdpFmtpLine.includes("profile-level-id=42e01f") ? s.push(c) : a.push(c);
        return;
      }
      s.push(c);
    }), fh(t) && t.setCodecPreferences(s.concat(a, o));
  }
  createSender(t, i, n) {
    return k(this, void 0, void 0, function* () {
      if (ko())
        return yield this.createTransceiverRTCRtpSender(t, i, n);
      if (bo())
        return g.warn("using add-track fallback"), yield this.createRTCRtpSender(t.mediaStreamTrack);
      throw new $e("Required webRTC APIs not supported on this device");
    });
  }
  createSimulcastSender(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      if (ko())
        return this.createSimulcastTransceiverSender(t, i, n, r);
      if (bo())
        return g.debug("using add-track fallback"), this.createRTCRtpSender(t.mediaStreamTrack);
      throw new $e("Cannot stream on this device");
    });
  }
  createTransceiverRTCRtpSender(t, i, n) {
    return k(this, void 0, void 0, function* () {
      if (!this.publisher)
        throw new $e("publisher is closed");
      const r = [];
      t.mediaStream && r.push(t.mediaStream);
      const s = {
        direction: "sendonly",
        streams: r
      };
      n && (s.sendEncodings = n);
      const a = yield this.publisher.pc.addTransceiver(t.mediaStreamTrack, s);
      return t.kind === T.Kind.Video && i.videoCodec && (this.setPreferredCodec(a, t.kind, i.videoCodec), t.codec = i.videoCodec), a.sender;
    });
  }
  createSimulcastTransceiverSender(t, i, n, r) {
    return k(this, void 0, void 0, function* () {
      if (!this.publisher)
        throw new $e("publisher is closed");
      const s = {
        direction: "sendonly"
      };
      r && (s.sendEncodings = r);
      const a = yield this.publisher.pc.addTransceiver(i.mediaStreamTrack, s);
      if (n.videoCodec)
        return this.setPreferredCodec(a, t.kind, n.videoCodec), t.setSimulcastTrackSender(n.videoCodec, a.sender), a.sender;
    });
  }
  createRTCRtpSender(t) {
    return k(this, void 0, void 0, function* () {
      if (!this.publisher)
        throw new $e("publisher is closed");
      return this.publisher.pc.addTrack(t);
    });
  }
  attemptReconnect(t) {
    var i, n, r;
    return k(this, void 0, void 0, function* () {
      if (!this._isClosed && !this.attemptingReconnect) {
        (((i = this.clientConfiguration) === null || i === void 0 ? void 0 : i.resumeConnection) === rt.DISABLED || // signaling state could change to closed due to hardware sleep
        // those connections cannot be resumed
        ((r = (n = this.primaryPC) === null || n === void 0 ? void 0 : n.signalingState) !== null && r !== void 0 ? r : "closed") === "closed") && (this.fullReconnectOnNext = !0);
        try {
          this.attemptingReconnect = !0, this.fullReconnectOnNext ? yield this.restartConnection() : yield this.resumeConnection(t), this.clearPendingReconnect(), this.fullReconnectOnNext = !1;
        } catch (s) {
          this.reconnectAttempts += 1;
          let a = !0;
          s instanceof $e ? (g.debug("received unrecoverable error", {
            error: s
          }), a = !1) : s instanceof Un || (this.fullReconnectOnNext = !0), a ? this.handleDisconnect("reconnect", ct.RR_UNKNOWN) : (g.info("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(Date.now() - this.reconnectStart, "ms. giving up")), this.emit(U.Disconnected), yield this.close());
        } finally {
          this.attemptingReconnect = !1;
        }
      }
    });
  }
  getNextRetryDelay(t) {
    try {
      return this.reconnectPolicy.nextRetryDelayInMs(t);
    } catch (i) {
      g.warn("encountered error in reconnect policy", {
        error: i
      });
    }
    return null;
  }
  restartConnection(t) {
    var i, n, r;
    return k(this, void 0, void 0, function* () {
      try {
        if (!this.url || !this.token)
          throw new $e("could not reconnect, url or token not saved");
        g.info("reconnecting, attempt: ".concat(this.reconnectAttempts)), this.emit(U.Restarting), this.client.isConnected && (yield this.client.sendLeave()), yield this.cleanupPeerConnections(), yield this.cleanupClient();
        let s;
        try {
          if (!this.signalOpts)
            throw g.warn("attempted connection restart, without signal options present"), new Un();
          s = yield this.join(t ?? this.url, this.token, this.signalOpts);
        } catch (a) {
          throw a instanceof ve && a.reason === 0 ? new $e("could not reconnect, token might be expired") : new Un();
        }
        if (this.shouldFailNext)
          throw this.shouldFailNext = !1, new Error("simulated failure");
        this.client.setReconnected(), this.emit(U.SignalRestarted, s), yield this.waitForPCReconnected(), (i = this.regionUrlProvider) === null || i === void 0 || i.resetAttempts(), this.emit(U.Restarted);
      } catch (s) {
        const a = yield (n = this.regionUrlProvider) === null || n === void 0 ? void 0 : n.getNextBestRegionUrl();
        if (a) {
          yield this.restartConnection(a);
          return;
        } else
          throw (r = this.regionUrlProvider) === null || r === void 0 || r.resetAttempts(), s;
      }
    });
  }
  resumeConnection(t) {
    var i;
    return k(this, void 0, void 0, function* () {
      if (!this.url || !this.token)
        throw new $e("could not reconnect, url or token not saved");
      if (!this.publisher || !this.subscriber)
        throw new $e("publisher and subscriber connections unset");
      g.info("resuming signal connection, attempt ".concat(this.reconnectAttempts)), this.emit(U.Resuming);
      try {
        this.setupSignalClientCallbacks();
        const n = yield this.client.reconnect(this.url, this.token, this.participantSid, t);
        if (n) {
          const r = this.makeRTCConfiguration(n);
          this.publisher.pc.setConfiguration(r), this.subscriber.pc.setConfiguration(r);
        }
      } catch (n) {
        let r = "";
        throw n instanceof Error && (r = n.message), n instanceof ve && n.reason === 0 ? new $e("could not reconnect, token might be expired") : new Un(r);
      }
      if (this.emit(U.SignalResumed), this.shouldFailNext)
        throw this.shouldFailNext = !1, new Error("simulated failure");
      this.subscriber.restartingIce = !0, this.hasPublished && (yield this.publisher.createAndSendOffer({
        iceRestart: !0
      })), yield this.waitForPCReconnected(), this.client.setReconnected(), ((i = this.reliableDC) === null || i === void 0 ? void 0 : i.readyState) === "open" && this.reliableDC.id === null && this.createDataChannels(), this.emit(U.Resumed);
    });
  }
  waitForPCInitialConnection(t, i) {
    return k(this, void 0, void 0, function* () {
      if (this.pcState !== Ke.Connected) {
        if (this.pcState !== Ke.New)
          throw new $e("Expected peer connection to be new on initial connection");
        return new Promise((n, r) => {
          const s = () => {
            g.warn("closing engine"), Be.clearTimeout(o), r(new ve(
              "room connection has been cancelled",
              3
              /* ConnectionErrorReason.Cancelled */
            ));
          };
          i != null && i.signal.aborted && s(), i == null || i.signal.addEventListener("abort", s);
          const a = () => {
            Be.clearTimeout(o), i == null || i.signal.removeEventListener("abort", s), n();
          }, o = Be.setTimeout(() => {
            this.off(U.Connected, a), r(new ve("could not establish pc connection"));
          }, t ?? this.peerConnectionTimeout);
          this.once(U.Connected, a);
        });
      }
    });
  }
  waitForPCReconnected() {
    var t;
    return k(this, void 0, void 0, function* () {
      const i = Date.now();
      let n = i;
      for (this.pcState = Ke.Reconnecting, g.debug("waiting for peer connection to reconnect"); n - i < this.peerConnectionTimeout && this.primaryPC !== void 0; ) {
        if (
          // on Safari, we don't get a connectionstatechanged event during ICE restart
          // this means we'd have to check its status manually and update address
          // manually
          n - i > Hh && ((t = this.primaryPC) === null || t === void 0 ? void 0 : t.connectionState) === "connected" && (this.pcState = Ke.Connected), this.pcState === Ke.Connected
        )
          return;
        yield ri(100), n = Date.now();
      }
      throw new ve("could not establish PC connection");
    });
  }
  /* @internal */
  sendDataPacket(t, i) {
    return k(this, void 0, void 0, function* () {
      const n = Wr.encode(t).finish();
      yield this.ensurePublisherConnected(i);
      const r = this.dataChannelForKind(i);
      r && r.send(n), this.updateAndEmitDCBufferStatus(i);
    });
  }
  /**
   * @internal
   */
  ensureDataTransportConnected(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.subscriberPrimary;
    var n, r, s;
    return k(this, void 0, void 0, function* () {
      const a = i ? this.subscriber : this.publisher, o = i ? "Subscriber" : "Publisher";
      if (!a)
        throw new ve("".concat(o, " connection not set"));
      !i && !(!((n = this.publisher) === null || n === void 0) && n.isICEConnected) && ((r = this.publisher) === null || r === void 0 ? void 0 : r.pc.iceConnectionState) !== "checking" && this.negotiate();
      const c = this.dataChannelForKind(t, i);
      if ((c == null ? void 0 : c.readyState) === "open")
        return;
      const d = (/* @__PURE__ */ new Date()).getTime() + this.peerConnectionTimeout;
      for (; (/* @__PURE__ */ new Date()).getTime() < d; ) {
        if (a.isICEConnected && ((s = this.dataChannelForKind(t, i)) === null || s === void 0 ? void 0 : s.readyState) === "open")
          return;
        yield ri(50);
      }
      throw new ve("could not establish ".concat(o, " connection, state: ").concat(a.pc.iceConnectionState));
    });
  }
  ensurePublisherConnected(t) {
    return k(this, void 0, void 0, function* () {
      yield this.ensureDataTransportConnected(t, !1);
    });
  }
  /* @internal */
  verifyTransport() {
    return !(!this.primaryPC || this.primaryPC.connectionState === "closed" || this.primaryPC.connectionState === "failed" || this.hasPublished && this.subscriberPrimary && (!this.publisher || this.publisher.pc.connectionState === "closed" || this.publisher.pc.connectionState === "failed") || !this.client.ws || this.client.ws.readyState === WebSocket.CLOSED);
  }
  /** @internal */
  negotiate() {
    return new Promise((t, i) => {
      if (!this.publisher) {
        i(new ts("publisher is not defined"));
        return;
      }
      this.hasPublished = !0;
      const n = () => {
        g.warn("engine disconnected while negotiation was ongoing"), s(), t();
      };
      this.isClosed && i("cannot negotiate on closed engine"), this.on(U.Closing, n);
      const r = setTimeout(() => {
        i("negotiation timed out"), this.handleDisconnect("negotiation", ct.RR_SIGNAL_DISCONNECTED);
      }, this.peerConnectionTimeout), s = () => {
        clearTimeout(r), this.off(U.Closing, n);
      };
      this.publisher.once(Qi.NegotiationStarted, () => {
        var a;
        (a = this.publisher) === null || a === void 0 || a.once(Qi.NegotiationComplete, () => {
          s(), t();
        });
      }), this.publisher.once(Qi.RTPVideoPayloadTypes, (a) => {
        const o = /* @__PURE__ */ new Map();
        a.forEach((c) => {
          const d = c.codec.toLowerCase();
          yh(d) && o.set(c.payload, d);
        }), this.emit(U.RTPVideoMapUpdate, o);
      }), this.publisher.negotiate((a) => {
        s(), i(a), a instanceof ts && (this.fullReconnectOnNext = !0), this.handleDisconnect("negotiation", ct.RR_UNKNOWN);
      });
    });
  }
  dataChannelForKind(t, i) {
    if (i) {
      if (t === Se.LOSSY)
        return this.lossyDCSub;
      if (t === Se.RELIABLE)
        return this.reliableDCSub;
    } else {
      if (t === Se.LOSSY)
        return this.lossyDC;
      if (t === Se.RELIABLE)
        return this.reliableDC;
    }
  }
  /* @internal */
  failNext() {
    this.shouldFailNext = !0;
  }
  clearReconnectTimeout() {
    this.reconnectTimeout && Be.clearTimeout(this.reconnectTimeout);
  }
  clearPendingReconnect() {
    this.clearReconnectTimeout(), this.reconnectAttempts = 0;
  }
  registerOnLineListener() {
    ze() && window.addEventListener("online", this.handleBrowserOnLine);
  }
  deregisterOnLineListener() {
    ze() && window.removeEventListener("online", this.handleBrowserOnLine);
  }
}
function Gh(e) {
  var t;
  return k(this, void 0, void 0, function* () {
    let i = "";
    const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    if ((yield e.getStats()).forEach((o) => {
      switch (o.type) {
        case "transport":
          i = o.selectedCandidatePairId;
          break;
        case "candidate-pair":
          i === "" && o.selected && (i = o.id), n.set(o.id, o);
          break;
        case "remote-candidate":
          r.set(o.id, "".concat(o.address, ":").concat(o.port));
          break;
      }
    }), i === "")
      return;
    const a = (t = n.get(i)) === null || t === void 0 ? void 0 : t.remoteCandidateId;
    if (a !== void 0)
      return r.get(a);
  });
}
class Un extends Error {
}
const ws = 2e3;
function sr(e, t) {
  if (!t)
    return 0;
  let i, n;
  return "bytesReceived" in e ? (i = e.bytesReceived, n = t.bytesReceived) : "bytesSent" in e && (i = e.bytesSent, n = t.bytesSent), i === void 0 || n === void 0 || e.timestamp === void 0 || t.timestamp === void 0 ? 0 : (i - n) * 8 * 1e3 / (e.timestamp - t.timestamp);
}
class et extends En {
  /**
   *
   * @param mediaTrack
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(t, i) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    super(t, T.Kind.Audio, i, n), this.stopOnMute = !1, this.monitorSender = () => k(this, void 0, void 0, function* () {
      if (!this.sender) {
        this._currentBitrate = 0;
        return;
      }
      let r;
      try {
        r = yield this.getSenderStats();
      } catch (s) {
        g.error("could not get audio sender stats", {
          error: s
        });
        return;
      }
      r && this.prevStats && (this._currentBitrate = sr(r, this.prevStats)), this.prevStats = r;
    }), this.checkForSilence();
  }
  setDeviceId(t) {
    return k(this, void 0, void 0, function* () {
      return this._constraints.deviceId === t ? !0 : (this._constraints.deviceId = t, this.isMuted || (yield this.restartTrack()), this.isMuted || si(t) === this.mediaStreamTrack.getSettings().deviceId);
    });
  }
  mute() {
    const t = Object.create(null, {
      mute: {
        get: () => super.mute
      }
    });
    return k(this, void 0, void 0, function* () {
      const i = yield this.muteLock.lock();
      try {
        return this.source === T.Source.Microphone && this.stopOnMute && !this.isUserProvided && (g.debug("stopping mic track"), this._mediaStreamTrack.stop()), yield t.mute.call(this), this;
      } finally {
        i();
      }
    });
  }
  unmute() {
    const t = Object.create(null, {
      unmute: {
        get: () => super.unmute
      }
    });
    return k(this, void 0, void 0, function* () {
      const i = yield this.muteLock.lock();
      try {
        const n = this._constraints.deviceId && this._mediaStreamTrack.getSettings().deviceId !== si(this._constraints.deviceId);
        return this.source === T.Source.Microphone && (this.stopOnMute || this._mediaStreamTrack.readyState === "ended" || n) && !this.isUserProvided && (g.debug("reacquiring mic track"), yield this.restartTrack()), yield t.unmute.call(this), this;
      } finally {
        i();
      }
    });
  }
  restartTrack(t) {
    return k(this, void 0, void 0, function* () {
      let i;
      if (t) {
        const n = Es({
          audio: t
        });
        typeof n.audio != "boolean" && (i = n.audio);
      }
      yield this.restart(i);
    });
  }
  restart(t) {
    const i = Object.create(null, {
      restart: {
        get: () => super.restart
      }
    });
    return k(this, void 0, void 0, function* () {
      const n = yield i.restart.call(this, t);
      return this.checkForSilence(), n;
    });
  }
  /* @internal */
  startMonitor() {
    ze() && (this.monitorInterval || (this.monitorInterval = setInterval(() => {
      this.monitorSender();
    }, ws)));
  }
  getSenderStats() {
    var t;
    return k(this, void 0, void 0, function* () {
      if (!(!((t = this.sender) === null || t === void 0) && t.getStats))
        return;
      const i = yield this.sender.getStats();
      let n;
      return i.forEach((r) => {
        r.type === "outbound-rtp" && (n = {
          type: "audio",
          streamId: r.id,
          packetsSent: r.packetsSent,
          packetsLost: r.packetsLost,
          bytesSent: r.bytesSent,
          timestamp: r.timestamp,
          roundTripTime: r.roundTripTime,
          jitter: r.jitter
        });
      }), n;
    });
  }
  checkForSilence() {
    return k(this, void 0, void 0, function* () {
      const t = yield ah(this);
      return t && (this.isMuted || g.warn("silence detected on local audio track"), this.emit(N.AudioSilenceDetected)), t;
    });
  }
}
function Wh(e, t) {
  switch (e.kind) {
    case "audio":
      return new et(e, t, !1);
    case "video":
      return new Ye(e, t, !1);
    default:
      throw new Pt("unsupported track type: ".concat(e.kind));
  }
}
const zh = Object.values(_n), Zh = Object.values(is), Qh = Object.values(Ts), Kh = [_n.h180, _n.h360], Yh = [is.h180, is.h360], Xh = (e) => [{
  scaleResolutionDownBy: 2,
  fps: 3
}].map((i) => {
  var n;
  return new oe(Math.floor(e.width / i.scaleResolutionDownBy), Math.floor(e.height / i.scaleResolutionDownBy), Math.max(15e4, Math.floor(e.encoding.maxBitrate / (Math.pow(i.scaleResolutionDownBy, 2) * (((n = e.encoding.maxFramerate) !== null && n !== void 0 ? n : 30) / i.fps)))), i.fps, e.encoding.priority);
}), as = ["q", "h", "f"];
function yd(e, t, i, n) {
  var r, s;
  let a = n == null ? void 0 : n.videoEncoding;
  e && (a = n == null ? void 0 : n.screenShareEncoding);
  const o = n == null ? void 0 : n.simulcast, c = n == null ? void 0 : n.scalabilityMode, d = n == null ? void 0 : n.videoCodec;
  if (!a && !o && !c || !t || !i)
    return [{}];
  a || (a = jh(e, t, i, d), g.debug("using video encoding", a));
  const u = new oe(t, i, a.maxBitrate, a.maxFramerate, a.priority);
  if (c && mn(d)) {
    g.debug("using svc with scalabilityMode ".concat(c));
    const f = new Sd(c), p = [];
    if (f.spatial > 3)
      throw new Error("unsupported scalabilityMode: ".concat(c));
    for (let m = 0; m < f.spatial; m += 1)
      p.push({
        rid: as[2 - m],
        maxBitrate: a.maxBitrate / Math.pow(3, m),
        /* @ts-ignore */
        maxFramerate: u.encoding.maxFramerate
      });
    return p[0].scalabilityMode = c, g.debug("encodings", p), p;
  }
  if (!o)
    return [a];
  let l = [];
  e ? l = (r = xo(n == null ? void 0 : n.screenShareSimulcastLayers)) !== null && r !== void 0 ? r : Lo(e, u) : l = (s = xo(n == null ? void 0 : n.videoSimulcastLayers)) !== null && s !== void 0 ? s : Lo(e, u);
  let h;
  if (l.length > 0) {
    const f = l[0];
    l.length > 1 && ([, h] = l);
    const p = Math.max(t, i);
    if (p >= 960 && h)
      return Ar(t, i, [f, h, u]);
    if (p >= 480)
      return Ar(t, i, [f, u]);
  }
  return Ar(t, i, [u]);
}
function Mo(e, t, i) {
  var n, r, s, a;
  if (!i.backupCodec || i.backupCodec.codec === i.videoCodec)
    return;
  t !== i.backupCodec.codec && g.warn("requested a different codec than specified as backup", {
    serverRequested: t,
    backup: i.backupCodec.codec
  }), i.videoCodec = t, i.videoEncoding = i.backupCodec.encoding;
  const o = e.mediaStreamTrack.getSettings(), c = (n = o.width) !== null && n !== void 0 ? n : (r = e.dimensions) === null || r === void 0 ? void 0 : r.width, d = (s = o.height) !== null && s !== void 0 ? s : (a = e.dimensions) === null || a === void 0 ? void 0 : a.height;
  return yd(e.source === T.Source.ScreenShare, c, d, i);
}
function jh(e, t, i, n) {
  const r = ef(e, t, i);
  let {
    encoding: s
  } = r[0];
  const a = Math.max(t, i);
  for (let o = 0; o < r.length; o += 1) {
    const c = r[o];
    if (s = c.encoding, c.width >= a)
      break;
  }
  if (n)
    switch (n) {
      case "av1":
        s = Object.assign({}, s), s.maxBitrate = s.maxBitrate * 0.7;
        break;
      case "vp9":
        s = Object.assign({}, s), s.maxBitrate = s.maxBitrate * 0.85;
        break;
    }
  return s;
}
function ef(e, t, i) {
  if (e)
    return Qh;
  const n = t > i ? t / i : i / t;
  return Math.abs(n - 16 / 9) < Math.abs(n - 4 / 3) ? zh : Zh;
}
function Lo(e, t) {
  if (e)
    return Xh(t);
  const {
    width: i,
    height: n
  } = t, r = i > n ? i / n : n / i;
  return Math.abs(r - 16 / 9) < Math.abs(r - 4 / 3) ? Kh : Yh;
}
function Ar(e, t, i) {
  const n = [];
  if (i.forEach((r, s) => {
    if (s >= as.length)
      return;
    const a = Math.min(e, t), c = {
      rid: as[s],
      scaleResolutionDownBy: Math.max(1, a / Math.min(r.width, r.height)),
      maxBitrate: r.encoding.maxBitrate
    };
    r.encoding.maxFramerate && (c.maxFramerate = r.encoding.maxFramerate);
    const d = Tn() || s === 0;
    r.encoding.priority && d && (c.priority = r.encoding.priority, c.networkPriority = r.encoding.priority), n.push(c);
  }), Nn() && dd() === "ios") {
    let r;
    n.forEach((a) => {
      r ? a.maxFramerate && a.maxFramerate > r && (r = a.maxFramerate) : r = a.maxFramerate;
    });
    let s = !0;
    n.forEach((a) => {
      var o;
      a.maxFramerate != r && (s && (s = !1, g.info("Simulcast on iOS React-Native requires all encodings to share the same framerate.")), g.info('Setting framerate of encoding "'.concat((o = a.rid) !== null && o !== void 0 ? o : "", '" to ').concat(r)), a.maxFramerate = r);
    });
  }
  return n;
}
function xo(e) {
  if (e)
    return e.sort((t, i) => {
      const {
        encoding: n
      } = t, {
        encoding: r
      } = i;
      return n.maxBitrate > r.maxBitrate ? 1 : n.maxBitrate < r.maxBitrate ? -1 : n.maxBitrate === r.maxBitrate && n.maxFramerate && r.maxFramerate ? n.maxFramerate > r.maxFramerate ? 1 : -1 : 0;
    });
}
class Sd {
  constructor(t) {
    const i = t.match(/^L(\d)T(\d)(h|_KEY|_KEY_SHIFT){0,1}$/);
    if (!i)
      throw new Error("invalid scalability mode");
    if (this.spatial = parseInt(i[1]), this.temporal = parseInt(i[2]), i.length > 3)
      switch (i[3]) {
        case "h":
        case "_KEY":
        case "_KEY_SHIFT":
          this.suffix = i[3];
      }
  }
  toString() {
    var t;
    return "L".concat(this.spatial, "T").concat(this.temporal).concat((t = this.suffix) !== null && t !== void 0 ? t : "");
  }
}
const tf = 5e3;
class Ye extends En {
  /**
   *
   * @param mediaTrack
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(t, i) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    super(t, T.Kind.Video, i, n), this.simulcastCodecs = /* @__PURE__ */ new Map(), this.monitorSender = () => k(this, void 0, void 0, function* () {
      if (!this.sender) {
        this._currentBitrate = 0;
        return;
      }
      let r;
      try {
        r = yield this.getSenderStats();
      } catch (a) {
        g.error("could not get audio sender stats", {
          error: a
        });
        return;
      }
      const s = new Map(r.map((a) => [a.rid, a]));
      if (this.prevStats) {
        let a = 0;
        s.forEach((o, c) => {
          var d;
          const u = (d = this.prevStats) === null || d === void 0 ? void 0 : d.get(c);
          a += sr(o, u);
        }), this._currentBitrate = a;
      }
      this.prevStats = s;
    }), this.senderLock = new Ht();
  }
  get isSimulcast() {
    return !!(this.sender && this.sender.getParameters().encodings.length > 1);
  }
  /* @internal */
  startMonitor(t) {
    var i;
    if (this.signalClient = t, !ze())
      return;
    const n = (i = this.sender) === null || i === void 0 ? void 0 : i.getParameters();
    n && (this.encodings = n.encodings), !this.monitorInterval && (this.monitorInterval = setInterval(() => {
      this.monitorSender();
    }, ws));
  }
  stop() {
    this._mediaStreamTrack.getConstraints(), this.simulcastCodecs.forEach((t) => {
      t.mediaStreamTrack.stop();
    }), super.stop();
  }
  mute() {
    const t = Object.create(null, {
      mute: {
        get: () => super.mute
      }
    });
    return k(this, void 0, void 0, function* () {
      const i = yield this.muteLock.lock();
      try {
        return this.source === T.Source.Camera && !this.isUserProvided && (g.debug("stopping camera track"), this._mediaStreamTrack.stop()), yield t.mute.call(this), this;
      } finally {
        i();
      }
    });
  }
  unmute() {
    const t = Object.create(null, {
      unmute: {
        get: () => super.unmute
      }
    });
    return k(this, void 0, void 0, function* () {
      const i = yield this.muteLock.lock();
      try {
        return this.source === T.Source.Camera && !this.isUserProvided && (g.debug("reacquiring camera track"), yield this.restartTrack()), yield t.unmute.call(this), this;
      } finally {
        i();
      }
    });
  }
  getSenderStats() {
    var t;
    return k(this, void 0, void 0, function* () {
      if (!(!((t = this.sender) === null || t === void 0) && t.getStats))
        return [];
      const i = [], n = yield this.sender.getStats();
      return n.forEach((r) => {
        var s;
        if (r.type === "outbound-rtp") {
          const a = {
            type: "video",
            streamId: r.id,
            frameHeight: r.frameHeight,
            frameWidth: r.frameWidth,
            firCount: r.firCount,
            pliCount: r.pliCount,
            nackCount: r.nackCount,
            packetsSent: r.packetsSent,
            bytesSent: r.bytesSent,
            framesSent: r.framesSent,
            timestamp: r.timestamp,
            rid: (s = r.rid) !== null && s !== void 0 ? s : r.id,
            retransmittedPacketsSent: r.retransmittedPacketsSent,
            qualityLimitationReason: r.qualityLimitationReason,
            qualityLimitationResolutionChanges: r.qualityLimitationResolutionChanges
          }, o = n.get(r.remoteId);
          o && (a.jitter = o.jitter, a.packetsLost = o.packetsLost, a.roundTripTime = o.roundTripTime), i.push(a);
        }
      }), i;
    });
  }
  setPublishingQuality(t) {
    const i = [];
    for (let n = le.LOW; n <= le.HIGH; n += 1)
      i.push({
        quality: n,
        enabled: n <= t
      });
    g.debug("setting publishing quality. max quality ".concat(t)), this.setPublishingLayers(i);
  }
  setDeviceId(t) {
    return k(this, void 0, void 0, function* () {
      return this._constraints.deviceId === t && this._mediaStreamTrack.getSettings().deviceId === si(t) ? !0 : (this._constraints.deviceId = t, this.isMuted || (yield this.restartTrack()), this.isMuted || si(t) === this._mediaStreamTrack.getSettings().deviceId);
    });
  }
  restartTrack(t) {
    return k(this, void 0, void 0, function* () {
      let i;
      if (t) {
        const n = Es({
          video: t
        });
        typeof n.video != "boolean" && (i = n.video);
      }
      yield this.restart(i);
    });
  }
  addSimulcastTrack(t, i) {
    if (this.simulcastCodecs.has(t))
      throw new Error("".concat(t, " already added"));
    const n = {
      codec: t,
      mediaStreamTrack: this.mediaStreamTrack.clone(),
      sender: void 0,
      encodings: i
    };
    return this.simulcastCodecs.set(t, n), n;
  }
  setSimulcastTrackSender(t, i) {
    const n = this.simulcastCodecs.get(t);
    n && (n.sender = i, setTimeout(() => {
      this.subscribedCodecs && this.setPublishingCodecs(this.subscribedCodecs);
    }, tf));
  }
  /**
   * @internal
   * Sets codecs that should be publishing
   */
  setPublishingCodecs(t) {
    var i, n, r, s, a, o, c;
    return k(this, void 0, void 0, function* () {
      if (g.debug("setting publishing codecs", {
        codecs: t,
        currentCodec: this.codec
      }), !this.codec && t.length > 0)
        return yield this.setPublishingLayers(t[0].qualities), [];
      this.subscribedCodecs = t;
      const d = [];
      try {
        for (i = !0, n = bc(t); r = yield n.next(), s = r.done, !s; i = !0) {
          c = r.value, i = !1;
          const u = c;
          if (!this.codec || this.codec === u.codec)
            yield this.setPublishingLayers(u.qualities);
          else {
            const l = this.simulcastCodecs.get(u.codec);
            if (g.debug("try setPublishingCodec for ".concat(u.codec), l), !l || !l.sender) {
              for (const h of u.qualities)
                if (h.enabled) {
                  d.push(u.codec);
                  break;
                }
            } else
              l.encodings && (g.debug("try setPublishingLayersForSender ".concat(u.codec)), yield $o(l.sender, l.encodings, u.qualities, this.senderLock));
          }
        }
      } catch (u) {
        a = {
          error: u
        };
      } finally {
        try {
          !i && !s && (o = n.return) && (yield o.call(n));
        } finally {
          if (a)
            throw a.error;
        }
      }
      return d;
    });
  }
  /**
   * @internal
   * Sets layers that should be publishing
   */
  setPublishingLayers(t) {
    return k(this, void 0, void 0, function* () {
      g.debug("setting publishing layers", t), !(!this.sender || !this.encodings) && (yield $o(this.sender, this.encodings, t, this.senderLock));
    });
  }
  handleAppVisibilityChanged() {
    const t = Object.create(null, {
      handleAppVisibilityChanged: {
        get: () => super.handleAppVisibilityChanged
      }
    });
    return k(this, void 0, void 0, function* () {
      yield t.handleAppVisibilityChanged.call(this), od() && this.isInBackground && this.source === T.Source.Camera && (this._mediaStreamTrack.enabled = !1);
    });
  }
}
function $o(e, t, i, n) {
  return k(this, void 0, void 0, function* () {
    const r = yield n.lock();
    g.debug("setPublishingLayersForSender", {
      sender: e,
      qualities: i,
      senderEncodings: t
    });
    try {
      const s = e.getParameters(), {
        encodings: a
      } = s;
      if (!a)
        return;
      if (a.length !== t.length) {
        g.warn("cannot set publishing layers, encodings mismatch");
        return;
      }
      let o = !1;
      !1 && a[0].scalabilityMode || a.forEach((d, u) => {
        var l;
        let h = (l = d.rid) !== null && l !== void 0 ? l : "";
        h === "" && (h = "q");
        const f = kd(h), p = i.find((m) => m.quality === f);
        p && d.active !== p.enabled && (o = !0, d.active = p.enabled, g.debug("setting layer ".concat(p.quality, " to ").concat(d.active ? "enabled" : "disabled")), Tn() && (p.enabled ? (d.scaleResolutionDownBy = t[u].scaleResolutionDownBy, d.maxBitrate = t[u].maxBitrate, d.maxFrameRate = t[u].maxFrameRate) : (d.scaleResolutionDownBy = 4, d.maxBitrate = 10, d.maxFrameRate = 2)));
      }), o && (s.encodings = a, g.debug("setting encodings", s.encodings), yield e.setParameters(s));
    } finally {
      r();
    }
  });
}
function kd(e) {
  switch (e) {
    case "f":
      return le.HIGH;
    case "h":
      return le.MEDIUM;
    case "q":
      return le.LOW;
    default:
      return le.UNRECOGNIZED;
  }
}
function Fo(e, t, i, n) {
  if (!i)
    return [{
      quality: le.HIGH,
      width: e,
      height: t,
      bitrate: 0,
      ssrc: 0
    }];
  if (n) {
    const r = new Sd(i[0].scalabilityMode), s = [];
    for (let a = 0; a < r.spatial; a += 1)
      s.push({
        quality: le.HIGH - a,
        width: e / Math.pow(2, a),
        height: t / Math.pow(2, a),
        bitrate: i[0].maxBitrate ? i[0].maxBitrate / Math.pow(3, a) : 0,
        ssrc: 0
      });
    return s;
  }
  return i.map((r) => {
    var s, a, o;
    const c = (s = r.scaleResolutionDownBy) !== null && s !== void 0 ? s : 1;
    let d = kd((a = r.rid) !== null && a !== void 0 ? a : "");
    return d === le.UNRECOGNIZED && i.length === 1 && (d = le.HIGH), {
      quality: d,
      width: e / c,
      height: t / c,
      bitrate: (o = r.maxBitrate) !== null && o !== void 0 ? o : 0,
      ssrc: 0
    };
  });
}
class bd extends T {
  constructor(t, i, n, r) {
    super(t, n), this.sid = i, this.receiver = r;
  }
  /** @internal */
  setMuted(t) {
    this.isMuted !== t && (this.isMuted = t, this._mediaStreamTrack.enabled = !t, this.emit(t ? N.Muted : N.Unmuted, this));
  }
  /** @internal */
  setMediaStream(t) {
    this.mediaStream = t, t.onremovetrack = () => {
      this.receiver = void 0, this._currentBitrate = 0, this.emit(N.Ended, this);
    };
  }
  start() {
    this.startMonitor(), super.enable();
  }
  stop() {
    this.stopMonitor(), super.disable();
  }
  /* @internal */
  startMonitor() {
    this.monitorInterval || (this.monitorInterval = setInterval(() => this.monitorReceiver(), ws));
  }
}
class ln extends bd {
  constructor(t, i, n, r, s) {
    super(t, i, T.Kind.Audio, n), this.monitorReceiver = () => k(this, void 0, void 0, function* () {
      if (!this.receiver) {
        this._currentBitrate = 0;
        return;
      }
      const a = yield this.getReceiverStats();
      a && this.prevStats && this.receiver && (this._currentBitrate = sr(a, this.prevStats)), this.prevStats = a;
    }), this.audioContext = r, this.webAudioPluginNodes = [], s && (this.sinkId = s.deviceId);
  }
  /**
   * sets the volume for all attached audio elements
   */
  setVolume(t) {
    var i;
    for (const n of this.attachedElements)
      this.audioContext ? (i = this.gainNode) === null || i === void 0 || i.gain.setTargetAtTime(t, 0, 0.1) : n.volume = t;
    this.elementVolume = t;
  }
  /**
   * gets the volume of attached audio elements (loudest)
   */
  getVolume() {
    if (this.elementVolume)
      return this.elementVolume;
    let t = 0;
    return this.attachedElements.forEach((i) => {
      i.volume > t && (t = i.volume);
    }), t;
  }
  /**
   * calls setSinkId on all attached elements, if supported
   * @param deviceId audio output device
   */
  setSinkId(t) {
    return k(this, void 0, void 0, function* () {
      this.sinkId = t, yield Promise.all(this.attachedElements.map((i) => {
        if (rs(i))
          return i.setSinkId(t);
      }));
    });
  }
  attach(t) {
    const i = this.attachedElements.length === 0;
    return t ? super.attach(t) : t = super.attach(), this.elementVolume && (t.volume = this.elementVolume), this.sinkId && rs(t) && t.setSinkId(this.sinkId), this.audioContext && i && (g.debug("using audio context mapping"), this.connectWebAudio(this.audioContext, t), t.volume = 0, t.muted = !0), t;
  }
  detach(t) {
    let i;
    return t ? (i = super.detach(t), this.audioContext && (this.attachedElements.length > 0 ? this.connectWebAudio(this.audioContext, this.attachedElements[0]) : this.disconnectWebAudio())) : (i = super.detach(), this.disconnectWebAudio()), i;
  }
  /**
   * @internal
   * @experimental
   */
  setAudioContext(t) {
    this.audioContext = t, t && this.attachedElements.length > 0 ? this.connectWebAudio(t, this.attachedElements[0]) : t || this.disconnectWebAudio();
  }
  /**
   * @internal
   * @experimental
   * @param {AudioNode[]} nodes - An array of WebAudio nodes. These nodes should not be connected to each other when passed, as the sdk will take care of connecting them in the order of the array.
   */
  setWebAudioPlugins(t) {
    this.webAudioPluginNodes = t, this.attachedElements.length > 0 && this.audioContext && this.connectWebAudio(this.audioContext, this.attachedElements[0]);
  }
  connectWebAudio(t, i) {
    this.disconnectWebAudio(), this.sourceNode = t.createMediaStreamSource(i.srcObject);
    let n = this.sourceNode;
    this.webAudioPluginNodes.forEach((r) => {
      n.connect(r), n = r;
    }), this.gainNode = t.createGain(), n.connect(this.gainNode), this.gainNode.connect(t.destination), this.elementVolume && this.gainNode.gain.setTargetAtTime(this.elementVolume, 0, 0.1), t.state !== "running" && t.resume().then(() => {
      t.state !== "running" && this.emit(N.AudioPlaybackFailed, new Error("Audio Context couldn't be started automatically"));
    }).catch((r) => {
      this.emit(N.AudioPlaybackFailed, r);
    });
  }
  disconnectWebAudio() {
    var t, i;
    (t = this.gainNode) === null || t === void 0 || t.disconnect(), (i = this.sourceNode) === null || i === void 0 || i.disconnect(), this.gainNode = void 0, this.sourceNode = void 0;
  }
  getReceiverStats() {
    return k(this, void 0, void 0, function* () {
      if (!this.receiver || !this.receiver.getStats)
        return;
      const t = yield this.receiver.getStats();
      let i;
      return t.forEach((n) => {
        n.type === "inbound-rtp" && (i = {
          type: "audio",
          timestamp: n.timestamp,
          jitter: n.jitter,
          bytesReceived: n.bytesReceived,
          concealedSamples: n.concealedSamples,
          concealmentEvents: n.concealmentEvents,
          silentConcealedSamples: n.silentConcealedSamples,
          silentConcealmentEvents: n.silentConcealmentEvents,
          totalAudioEnergy: n.totalAudioEnergy,
          totalSamplesDuration: n.totalSamplesDuration
        });
      }), i;
    });
  }
}
const Ir = 100;
class gn extends bd {
  constructor(t, i, n, r) {
    super(t, i, T.Kind.Video, n), this.elementInfos = [], this.monitorReceiver = () => k(this, void 0, void 0, function* () {
      if (!this.receiver) {
        this._currentBitrate = 0;
        return;
      }
      const s = yield this.getReceiverStats();
      s && this.prevStats && this.receiver && (this._currentBitrate = sr(s, this.prevStats)), this.prevStats = s;
    }), this.debouncedHandleResize = md(() => {
      this.updateDimensions();
    }, Ir), this.adaptiveStreamSettings = r;
  }
  get isAdaptiveStream() {
    return this.adaptiveStreamSettings !== void 0;
  }
  /**
   * Note: When using adaptiveStream, you need to use remoteVideoTrack.attach() to add the track to a HTMLVideoElement, otherwise your video tracks might never start
   */
  get mediaStreamTrack() {
    return this._mediaStreamTrack;
  }
  /** @internal */
  setMuted(t) {
    super.setMuted(t), this.attachedElements.forEach((i) => {
      t ? Zi(this._mediaStreamTrack, i) : Gi(this._mediaStreamTrack, i);
    });
  }
  attach(t) {
    if (t ? super.attach(t) : t = super.attach(), this.adaptiveStreamSettings && this.elementInfos.find((i) => i.element === t) === void 0) {
      const i = new nf(t);
      this.observeElementInfo(i);
    }
    return t;
  }
  /**
   * Observe an ElementInfo for changes when adaptive streaming.
   * @param elementInfo
   * @internal
   */
  observeElementInfo(t) {
    this.adaptiveStreamSettings && this.elementInfos.find((i) => i === t) === void 0 ? (t.handleResize = () => {
      this.debouncedHandleResize();
    }, t.handleVisibilityChanged = () => {
      this.updateVisibility();
    }, this.elementInfos.push(t), t.observe(), this.debouncedHandleResize(), this.updateVisibility()) : g.warn("visibility resize observer not triggered");
  }
  /**
   * Stop observing an ElementInfo for changes.
   * @param elementInfo
   * @internal
   */
  stopObservingElementInfo(t) {
    if (!this.isAdaptiveStream) {
      g.warn("stopObservingElementInfo ignored");
      return;
    }
    const i = this.elementInfos.filter((n) => n === t);
    for (const n of i)
      n.stopObserving();
    this.elementInfos = this.elementInfos.filter((n) => n !== t), this.updateVisibility(), this.debouncedHandleResize();
  }
  detach(t) {
    let i = [];
    if (t)
      return this.stopObservingElement(t), super.detach(t);
    i = super.detach();
    for (const n of i)
      this.stopObservingElement(n);
    return i;
  }
  /** @internal */
  getDecoderImplementation() {
    var t;
    return (t = this.prevStats) === null || t === void 0 ? void 0 : t.decoderImplementation;
  }
  getReceiverStats() {
    return k(this, void 0, void 0, function* () {
      if (!this.receiver || !this.receiver.getStats)
        return;
      const t = yield this.receiver.getStats();
      let i;
      return t.forEach((n) => {
        n.type === "inbound-rtp" && (i = {
          type: "video",
          framesDecoded: n.framesDecoded,
          framesDropped: n.framesDropped,
          framesReceived: n.framesReceived,
          packetsReceived: n.packetsReceived,
          packetsLost: n.packetsLost,
          frameWidth: n.frameWidth,
          frameHeight: n.frameHeight,
          pliCount: n.pliCount,
          firCount: n.firCount,
          nackCount: n.nackCount,
          jitter: n.jitter,
          timestamp: n.timestamp,
          bytesReceived: n.bytesReceived,
          decoderImplementation: n.decoderImplementation
        });
      }), i;
    });
  }
  stopObservingElement(t) {
    const i = this.elementInfos.filter((n) => n.element === t);
    for (const n of i)
      this.stopObservingElementInfo(n);
  }
  handleAppVisibilityChanged() {
    const t = Object.create(null, {
      handleAppVisibilityChanged: {
        get: () => super.handleAppVisibilityChanged
      }
    });
    return k(this, void 0, void 0, function* () {
      yield t.handleAppVisibilityChanged.call(this), this.isAdaptiveStream && this.updateVisibility();
    });
  }
  updateVisibility() {
    var t, i;
    const n = this.elementInfos.reduce((o, c) => Math.max(o, c.visibilityChangedAt || 0), 0), r = !((i = (t = this.adaptiveStreamSettings) === null || t === void 0 ? void 0 : t.pauseVideoInBackground) !== null && i !== void 0) || i ? this.isInBackground : !1, s = this.elementInfos.some((o) => o.pictureInPicture), a = this.elementInfos.some((o) => o.visible) && !r || s;
    if (this.lastVisible !== a) {
      if (!a && Date.now() - n < Ir) {
        Be.setTimeout(() => {
          this.updateVisibility();
        }, Ir);
        return;
      }
      this.lastVisible = a, this.emit(N.VisibilityChanged, a, this);
    }
  }
  updateDimensions() {
    var t, i;
    let n = 0, r = 0;
    const s = this.getPixelDensity();
    for (const a of this.elementInfos) {
      const o = a.width() * s, c = a.height() * s;
      o + c > n + r && (n = o, r = c);
    }
    ((t = this.lastDimensions) === null || t === void 0 ? void 0 : t.width) === n && ((i = this.lastDimensions) === null || i === void 0 ? void 0 : i.height) === r || (this.lastDimensions = {
      width: n,
      height: r
    }, this.emit(N.VideoDimensionsChanged, this.lastDimensions, this));
  }
  getPixelDensity() {
    var t;
    const i = (t = this.adaptiveStreamSettings) === null || t === void 0 ? void 0 : t.pixelDensity;
    return i === "screen" ? Co() : i || (Co() > 2 ? 2 : 1);
  }
}
class nf {
  get visible() {
    return this.isPiP || this.isIntersecting;
  }
  get pictureInPicture() {
    return this.isPiP;
  }
  constructor(t, i) {
    this.onVisibilityChanged = (n) => {
      var r;
      const {
        target: s,
        isIntersecting: a
      } = n;
      s === this.element && (this.isIntersecting = a, this.visibilityChangedAt = Date.now(), (r = this.handleVisibilityChanged) === null || r === void 0 || r.call(this));
    }, this.onEnterPiP = () => {
      var n;
      this.isPiP = !0, (n = this.handleVisibilityChanged) === null || n === void 0 || n.call(this);
    }, this.onLeavePiP = () => {
      var n;
      this.isPiP = !1, (n = this.handleVisibilityChanged) === null || n === void 0 || n.call(this);
    }, this.element = t, this.isIntersecting = i ?? Bo(t), this.isPiP = ze() && document.pictureInPictureElement === t, this.visibilityChangedAt = 0;
  }
  width() {
    return this.element.clientWidth;
  }
  height() {
    return this.element.clientHeight;
  }
  observe() {
    this.isIntersecting = Bo(this.element), this.isPiP = document.pictureInPictureElement === this.element, this.element.handleResize = () => {
      var t;
      (t = this.handleResize) === null || t === void 0 || t.call(this);
    }, this.element.handleVisibilityChanged = this.onVisibilityChanged, To().observe(this.element), _o().observe(this.element), this.element.addEventListener("enterpictureinpicture", this.onEnterPiP), this.element.addEventListener("leavepictureinpicture", this.onLeavePiP);
  }
  stopObserving() {
    var t, i;
    (t = To()) === null || t === void 0 || t.unobserve(this.element), (i = _o()) === null || i === void 0 || i.unobserve(this.element), this.element.removeEventListener("enterpictureinpicture", this.onEnterPiP), this.element.removeEventListener("leavepictureinpicture", this.onLeavePiP);
  }
}
function Bo(e) {
  let t = e.offsetTop, i = e.offsetLeft;
  const n = e.offsetWidth, r = e.offsetHeight, {
    hidden: s
  } = e, {
    opacity: a,
    display: o
  } = getComputedStyle(e);
  for (; e.offsetParent; )
    e = e.offsetParent, t += e.offsetTop, i += e.offsetLeft;
  return t < window.pageYOffset + window.innerHeight && i < window.pageXOffset + window.innerWidth && t + r > window.pageYOffset && i + n > window.pageXOffset && !s && (a !== "" ? parseFloat(a) > 0 : !0) && o !== "none";
}
class Vt extends li {
  constructor(t, i, n) {
    super(), this.metadataMuted = !1, this.encryption = xe.NONE, this.handleMuted = () => {
      this.emit(N.Muted);
    }, this.handleUnmuted = () => {
      this.emit(N.Unmuted);
    }, this.kind = t, this.trackSid = i, this.trackName = n, this.source = T.Source.Unknown;
  }
  /** @internal */
  setTrack(t) {
    this.track && (this.track.off(N.Muted, this.handleMuted), this.track.off(N.Unmuted, this.handleUnmuted)), this.track = t, t && (t.on(N.Muted, this.handleMuted), t.on(N.Unmuted, this.handleUnmuted));
  }
  get isMuted() {
    return this.metadataMuted;
  }
  get isEnabled() {
    return !0;
  }
  get isSubscribed() {
    return this.track !== void 0;
  }
  get isEncrypted() {
    return this.encryption !== xe.NONE;
  }
  /**
   * an [AudioTrack] if this publication holds an audio track
   */
  get audioTrack() {
    if (this.track instanceof et || this.track instanceof ln)
      return this.track;
  }
  /**
   * an [VideoTrack] if this publication holds a video track
   */
  get videoTrack() {
    if (this.track instanceof Ye || this.track instanceof gn)
      return this.track;
  }
  /** @internal */
  updateInfo(t) {
    this.trackSid = t.sid, this.trackName = t.name, this.source = T.sourceFromProto(t.source), this.mimeType = t.mimeType, this.kind === T.Kind.Video && t.width > 0 && (this.dimensions = {
      width: t.width,
      height: t.height
    }, this.simulcasted = t.simulcast), this.encryption = t.encryption, this.trackInfo = t, g.debug("update publication info", {
      info: t
    });
  }
}
(function(e) {
  (function(t) {
    t.Desired = "desired", t.Subscribed = "subscribed", t.Unsubscribed = "unsubscribed";
  })(e.SubscriptionStatus || (e.SubscriptionStatus = {})), function(t) {
    t.Allowed = "allowed", t.NotAllowed = "not_allowed";
  }(e.PermissionStatus || (e.PermissionStatus = {}));
})(Vt || (Vt = {}));
class jn extends Vt {
  get isUpstreamPaused() {
    var t;
    return (t = this.track) === null || t === void 0 ? void 0 : t.isUpstreamPaused;
  }
  constructor(t, i, n) {
    super(t, i.sid, i.name), this.track = void 0, this.handleTrackEnded = () => {
      this.emit(N.Ended);
    }, this.updateInfo(i), this.setTrack(n);
  }
  setTrack(t) {
    this.track && this.track.off(N.Ended, this.handleTrackEnded), super.setTrack(t), t && t.on(N.Ended, this.handleTrackEnded);
  }
  get isMuted() {
    return this.track ? this.track.isMuted : super.isMuted;
  }
  get audioTrack() {
    return super.audioTrack;
  }
  get videoTrack() {
    return super.videoTrack;
  }
  /**
   * Mute the track associated with this publication
   */
  mute() {
    var t;
    return k(this, void 0, void 0, function* () {
      return (t = this.track) === null || t === void 0 ? void 0 : t.mute();
    });
  }
  /**
   * Unmute track associated with this publication
   */
  unmute() {
    var t;
    return k(this, void 0, void 0, function* () {
      return (t = this.track) === null || t === void 0 ? void 0 : t.unmute();
    });
  }
  /**
   * Pauses the media stream track associated with this publication from being sent to the server
   * and signals "muted" event to other participants
   * Useful if you want to pause the stream without pausing the local media stream track
   */
  pauseUpstream() {
    var t;
    return k(this, void 0, void 0, function* () {
      yield (t = this.track) === null || t === void 0 ? void 0 : t.pauseUpstream();
    });
  }
  /**
   * Resumes sending the media stream track associated with this publication to the server after a call to [[pauseUpstream()]]
   * and signals "unmuted" event to other participants (unless the track is explicitly muted)
   */
  resumeUpstream() {
    var t;
    return k(this, void 0, void 0, function* () {
      yield (t = this.track) === null || t === void 0 ? void 0 : t.resumeUpstream();
    });
  }
}
var ti;
(function(e) {
  e.Excellent = "excellent", e.Good = "good", e.Poor = "poor", e.Unknown = "unknown";
})(ti || (ti = {}));
function rf(e) {
  switch (e) {
    case Xe.EXCELLENT:
      return ti.Excellent;
    case Xe.GOOD:
      return ti.Good;
    case Xe.POOR:
      return ti.Poor;
    default:
      return ti.Unknown;
  }
}
class Cd extends li {
  get isEncrypted() {
    return this.tracks.size > 0 && Array.from(this.tracks.values()).every((t) => t.isEncrypted);
  }
  /** @internal */
  constructor(t, i, n, r) {
    super(), this.audioLevel = 0, this.isSpeaking = !1, this._connectionQuality = ti.Unknown, this.sid = t, this.identity = i, this.name = n, this.metadata = r, this.audioTracks = /* @__PURE__ */ new Map(), this.videoTracks = /* @__PURE__ */ new Map(), this.tracks = /* @__PURE__ */ new Map();
  }
  getTracks() {
    return Array.from(this.tracks.values());
  }
  /**
   * Finds the first track that matches the source filter, for example, getting
   * the user's camera track with getTrackBySource(Track.Source.Camera).
   * @param source
   * @returns
   */
  getTrack(t) {
    for (const [, i] of this.tracks)
      if (i.source === t)
        return i;
  }
  /**
   * Finds the first track that matches the track's name.
   * @param name
   * @returns
   */
  getTrackByName(t) {
    for (const [, i] of this.tracks)
      if (i.trackName === t)
        return i;
  }
  get connectionQuality() {
    return this._connectionQuality;
  }
  get isCameraEnabled() {
    var t;
    const i = this.getTrack(T.Source.Camera);
    return !(!((t = i == null ? void 0 : i.isMuted) !== null && t !== void 0) || t);
  }
  get isMicrophoneEnabled() {
    var t;
    const i = this.getTrack(T.Source.Microphone);
    return !(!((t = i == null ? void 0 : i.isMuted) !== null && t !== void 0) || t);
  }
  get isScreenShareEnabled() {
    return !!this.getTrack(T.Source.ScreenShare);
  }
  get isLocal() {
    return !1;
  }
  /** when participant joined the room */
  get joinedAt() {
    return this.participantInfo ? new Date(this.participantInfo.joinedAt * 1e3) : /* @__PURE__ */ new Date();
  }
  /** @internal */
  updateInfo(t) {
    return this.participantInfo && this.participantInfo.sid === t.sid && this.participantInfo.version > t.version ? !1 : (this.identity = t.identity, this.sid = t.sid, this.setName(t.name), this.setMetadata(t.metadata), t.permission && this.setPermissions(t.permission), this.participantInfo = t, g.trace("update participant info", {
      info: t
    }), !0);
  }
  /** @internal */
  setMetadata(t) {
    const i = this.metadata !== t, n = this.metadata;
    this.metadata = t, i && this.emit(D.ParticipantMetadataChanged, n);
  }
  setName(t) {
    const i = this.name !== t;
    this.name = t, i && this.emit(D.ParticipantNameChanged, t);
  }
  /** @internal */
  setPermissions(t) {
    var i, n, r, s, a;
    const o = this.permissions, c = t.canPublish !== ((i = this.permissions) === null || i === void 0 ? void 0 : i.canPublish) || t.canSubscribe !== ((n = this.permissions) === null || n === void 0 ? void 0 : n.canSubscribe) || t.canPublishData !== ((r = this.permissions) === null || r === void 0 ? void 0 : r.canPublishData) || t.hidden !== ((s = this.permissions) === null || s === void 0 ? void 0 : s.hidden) || t.recorder !== ((a = this.permissions) === null || a === void 0 ? void 0 : a.recorder) || t.canPublishSources.length !== this.permissions.canPublishSources.length || t.canPublishSources.some((d, u) => {
      var l;
      return d !== ((l = this.permissions) === null || l === void 0 ? void 0 : l.canPublishSources[u]);
    });
    return this.permissions = t, c && this.emit(D.ParticipantPermissionsChanged, o), c;
  }
  /** @internal */
  setIsSpeaking(t) {
    t !== this.isSpeaking && (this.isSpeaking = t, t && (this.lastSpokeAt = /* @__PURE__ */ new Date()), this.emit(D.IsSpeakingChanged, t));
  }
  /** @internal */
  setConnectionQuality(t) {
    const i = this._connectionQuality;
    this._connectionQuality = rf(t), i !== this._connectionQuality && this.emit(D.ConnectionQualityChanged, this._connectionQuality);
  }
  addTrackPublication(t) {
    t.on(N.Muted, () => {
      this.emit(D.TrackMuted, t);
    }), t.on(N.Unmuted, () => {
      this.emit(D.TrackUnmuted, t);
    });
    const i = t;
    switch (i.track && (i.track.sid = t.trackSid), this.tracks.set(t.trackSid, t), t.kind) {
      case T.Kind.Audio:
        this.audioTracks.set(t.trackSid, t);
        break;
      case T.Kind.Video:
        this.videoTracks.set(t.trackSid, t);
        break;
    }
  }
}
function sf(e) {
  var t, i, n;
  if (!e.participantSid && !e.participantIdentity)
    throw new Error("Invalid track permission, must provide at least one of participantIdentity and participantSid");
  return {
    participantIdentity: (t = e.participantIdentity) !== null && t !== void 0 ? t : "",
    participantSid: (i = e.participantSid) !== null && i !== void 0 ? i : "",
    allTracks: (n = e.allowAll) !== null && n !== void 0 ? n : !1,
    trackSids: e.allowedTrackSids || []
  };
}
class _d extends Vt {
  constructor(t, i, n) {
    super(t, i.sid, i.name), this.track = void 0, this.allowed = !0, this.disabled = !1, this.currentVideoQuality = le.HIGH, this.handleEnded = (r) => {
      this.setTrack(void 0), this.emit(N.Ended, r);
    }, this.handleVisibilityChange = (r) => {
      g.debug("adaptivestream video visibility ".concat(this.trackSid, ", visible=").concat(r), {
        trackSid: this.trackSid
      }), this.disabled = !r, this.emitTrackUpdate();
    }, this.handleVideoDimensionsChange = (r) => {
      g.debug("adaptivestream video dimensions ".concat(r.width, "x").concat(r.height), {
        trackSid: this.trackSid
      }), this.videoDimensions = r, this.emitTrackUpdate();
    }, this.subscribed = n, this.updateInfo(i);
  }
  /**
   * Subscribe or unsubscribe to this remote track
   * @param subscribed true to subscribe to a track, false to unsubscribe
   */
  setSubscribed(t) {
    const i = this.subscriptionStatus, n = this.permissionStatus;
    this.subscribed = t, t && (this.allowed = !0);
    const r = {
      trackSids: [this.trackSid],
      subscribe: this.subscribed,
      participantTracks: [{
        // sending an empty participant id since TrackPublication doesn't keep it
        // this is filled in by the participant that receives this message
        participantSid: "",
        trackSids: [this.trackSid]
      }]
    };
    this.emit(N.UpdateSubscription, r), this.emitSubscriptionUpdateIfChanged(i), this.emitPermissionUpdateIfChanged(n);
  }
  get subscriptionStatus() {
    return this.subscribed === !1 ? Vt.SubscriptionStatus.Unsubscribed : super.isSubscribed ? Vt.SubscriptionStatus.Subscribed : Vt.SubscriptionStatus.Desired;
  }
  get permissionStatus() {
    return this.allowed ? Vt.PermissionStatus.Allowed : Vt.PermissionStatus.NotAllowed;
  }
  /**
   * Returns true if track is subscribed, and ready for playback
   */
  get isSubscribed() {
    return this.subscribed === !1 ? !1 : super.isSubscribed;
  }
  // returns client's desire to subscribe to a track, also true if autoSubscribe is enabled
  get isDesired() {
    return this.subscribed !== !1;
  }
  get isEnabled() {
    return !this.disabled;
  }
  /**
   * disable server from sending down data for this track. this is useful when
   * the participant is off screen, you may disable streaming down their video
   * to reduce bandwidth requirements
   * @param enabled
   */
  setEnabled(t) {
    !this.isManualOperationAllowed() || this.disabled === !t || (this.disabled = !t, this.emitTrackUpdate());
  }
  /**
   * for tracks that support simulcasting, adjust subscribed quality
   *
   * This indicates the highest quality the client can accept. if network
   * bandwidth does not allow, server will automatically reduce quality to
   * optimize for uninterrupted video
   */
  setVideoQuality(t) {
    !this.isManualOperationAllowed() || this.currentVideoQuality === t || (this.currentVideoQuality = t, this.videoDimensions = void 0, this.emitTrackUpdate());
  }
  setVideoDimensions(t) {
    var i, n;
    this.isManualOperationAllowed() && (((i = this.videoDimensions) === null || i === void 0 ? void 0 : i.width) === t.width && ((n = this.videoDimensions) === null || n === void 0 ? void 0 : n.height) === t.height || (this.track instanceof gn && (this.videoDimensions = t), this.currentVideoQuality = void 0, this.emitTrackUpdate()));
  }
  setVideoFPS(t) {
    this.isManualOperationAllowed() && this.track instanceof gn && this.fps !== t && (this.fps = t, this.emitTrackUpdate());
  }
  get videoQuality() {
    return this.currentVideoQuality;
  }
  /** @internal */
  setTrack(t) {
    const i = this.subscriptionStatus, n = this.permissionStatus, r = this.track;
    r !== t && (r && (r.off(N.VideoDimensionsChanged, this.handleVideoDimensionsChange), r.off(N.VisibilityChanged, this.handleVisibilityChange), r.off(N.Ended, this.handleEnded), r.detach(), r.stopMonitor(), this.emit(N.Unsubscribed, r)), super.setTrack(t), t && (t.sid = this.trackSid, t.on(N.VideoDimensionsChanged, this.handleVideoDimensionsChange), t.on(N.VisibilityChanged, this.handleVisibilityChange), t.on(N.Ended, this.handleEnded), this.emit(N.Subscribed, t)), this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(i));
  }
  /** @internal */
  setAllowed(t) {
    const i = this.subscriptionStatus, n = this.permissionStatus;
    this.allowed = t, this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(i);
  }
  /** @internal */
  setSubscriptionError(t) {
    this.emit(N.SubscriptionFailed, t);
  }
  /** @internal */
  updateInfo(t) {
    super.updateInfo(t);
    const i = this.metadataMuted;
    this.metadataMuted = t.muted, this.track ? this.track.setMuted(t.muted) : i !== t.muted && this.emit(t.muted ? N.Muted : N.Unmuted);
  }
  emitSubscriptionUpdateIfChanged(t) {
    const i = this.subscriptionStatus;
    t !== i && this.emit(N.SubscriptionStatusChanged, i, t);
  }
  emitPermissionUpdateIfChanged(t) {
    this.permissionStatus !== t && this.emit(N.SubscriptionPermissionChanged, this.permissionStatus, t);
  }
  isManualOperationAllowed() {
    return this.kind === T.Kind.Video && this.isAdaptiveStream ? (g.warn("adaptive stream is enabled, cannot change video track settings", {
      trackSid: this.trackSid
    }), !1) : this.isDesired ? !0 : (g.warn("cannot update track settings when not subscribed", {
      trackSid: this.trackSid
    }), !1);
  }
  get isAdaptiveStream() {
    return this.track instanceof gn && this.track.isAdaptiveStream;
  }
  /* @internal */
  emitTrackUpdate() {
    const t = Xt.fromPartial({
      trackSids: [this.trackSid],
      disabled: this.disabled,
      fps: this.fps
    });
    this.videoDimensions ? (t.width = this.videoDimensions.width, t.height = this.videoDimensions.height) : this.currentVideoQuality !== void 0 ? t.quality = this.currentVideoQuality : t.quality = le.HIGH, this.emit(N.UpdateSettings, t);
  }
}
class Pn extends Cd {
  /** @internal */
  static fromParticipantInfo(t, i) {
    return new Pn(t, i.sid, i.identity, i.name, i.metadata);
  }
  /** @internal */
  constructor(t, i, n, r, s) {
    super(i, n || "", r, s), this.signalClient = t, this.tracks = /* @__PURE__ */ new Map(), this.audioTracks = /* @__PURE__ */ new Map(), this.videoTracks = /* @__PURE__ */ new Map(), this.volumeMap = /* @__PURE__ */ new Map();
  }
  addTrackPublication(t) {
    super.addTrackPublication(t), t.on(N.UpdateSettings, (i) => {
      g.debug("send update settings", i), this.signalClient.sendUpdateTrackSettings(i);
    }), t.on(N.UpdateSubscription, (i) => {
      i.participantTracks.forEach((n) => {
        n.participantSid = this.sid;
      }), this.signalClient.sendUpdateSubscription(i);
    }), t.on(N.SubscriptionPermissionChanged, (i) => {
      this.emit(D.TrackSubscriptionPermissionChanged, t, i);
    }), t.on(N.SubscriptionStatusChanged, (i) => {
      this.emit(D.TrackSubscriptionStatusChanged, t, i);
    }), t.on(N.Subscribed, (i) => {
      this.emit(D.TrackSubscribed, i, t);
    }), t.on(N.Unsubscribed, (i) => {
      this.emit(D.TrackUnsubscribed, i, t);
    }), t.on(N.SubscriptionFailed, (i) => {
      this.emit(D.TrackSubscriptionFailed, t.trackSid, i);
    });
  }
  getTrack(t) {
    const i = super.getTrack(t);
    if (i)
      return i;
  }
  getTrackByName(t) {
    const i = super.getTrackByName(t);
    if (i)
      return i;
  }
  /**
   * sets the volume on the participant's audio track
   * by default, this affects the microphone publication
   * a different source can be passed in as a second argument
   * if no track exists the volume will be applied when the microphone track is added
   */
  setVolume(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : T.Source.Microphone;
    this.volumeMap.set(i, t);
    const n = this.getTrack(i);
    n && n.track && n.track.setVolume(t);
  }
  /**
   * gets the volume on the participant's microphone track
   */
  getVolume() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : T.Source.Microphone;
    const i = this.getTrack(t);
    return i && i.track ? i.track.getVolume() : this.volumeMap.get(t);
  }
  /** @internal */
  addSubscribedMediaTrack(t, i, n, r, s, a) {
    let o = this.getTrackPublication(i);
    if (o || i.startsWith("TR") || this.tracks.forEach((u) => {
      !o && t.kind === u.kind.toString() && (o = u);
    }), !o) {
      if (a === 0) {
        g.error("could not find published track", {
          participant: this.sid,
          trackSid: i
        }), this.emit(D.TrackSubscriptionFailed, i);
        return;
      }
      a === void 0 && (a = 20), setTimeout(() => {
        this.addSubscribedMediaTrack(t, i, n, r, s, a - 1);
      }, 150);
      return;
    }
    if (t.readyState === "ended") {
      g.error("unable to subscribe because MediaStreamTrack is ended. Do not call MediaStreamTrack.stop()", {
        participant: this.sid,
        trackSid: i
      }), this.emit(D.TrackSubscriptionFailed, i);
      return;
    }
    const c = t.kind === "video";
    let d;
    return c ? d = new gn(t, i, r, s) : d = new ln(t, i, r, this.audioContext, this.audioOutput), d.source = o.source, d.isMuted = o.isMuted, d.setMediaStream(n), d.start(), o.setTrack(d), this.volumeMap.has(o.source) && d instanceof ln && d.setVolume(this.volumeMap.get(o.source)), o;
  }
  /** @internal */
  get hasMetadata() {
    return !!this.participantInfo;
  }
  getTrackPublication(t) {
    return this.tracks.get(t);
  }
  /** @internal */
  updateInfo(t) {
    if (!super.updateInfo(t))
      return !1;
    const i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    return t.tracks.forEach((r) => {
      var s;
      let a = this.getTrackPublication(r.sid);
      if (a)
        a.updateInfo(r);
      else {
        const o = T.kindFromProto(r.type);
        if (!o)
          return;
        a = new _d(o, r, (s = this.signalClient.connectOptions) === null || s === void 0 ? void 0 : s.autoSubscribe), a.updateInfo(r), n.set(r.sid, a);
        const c = Array.from(this.tracks.values()).find((d) => d.source === (a == null ? void 0 : a.source));
        c && a.source !== T.Source.Unknown && g.debug("received a second track publication for ".concat(this.identity, " with the same source: ").concat(a.source), {
          oldTrack: c,
          newTrack: a,
          participant: this,
          participantInfo: t
        }), this.addTrackPublication(a);
      }
      i.set(r.sid, a);
    }), this.tracks.forEach((r) => {
      i.has(r.trackSid) || (g.trace("detected removed track on remote participant, unpublishing", {
        publication: r,
        participantSid: this.sid
      }), this.unpublishTrack(r.trackSid, !0));
    }), n.forEach((r) => {
      this.emit(D.TrackPublished, r);
    }), !0;
  }
  /** @internal */
  unpublishTrack(t, i) {
    const n = this.tracks.get(t);
    if (!n)
      return;
    const {
      track: r
    } = n;
    switch (r && (r.stop(), n.setTrack(void 0)), this.tracks.delete(t), n.kind) {
      case T.Kind.Audio:
        this.audioTracks.delete(t);
        break;
      case T.Kind.Video:
        this.videoTracks.delete(t);
        break;
    }
    i && this.emit(D.TrackUnpublished, n);
  }
  /**
   * @internal
   */
  setAudioContext(t) {
    this.audioContext = t, this.audioTracks.forEach((i) => i.track instanceof ln && i.track.setAudioContext(t));
  }
  /**
   * @internal
   */
  setAudioOutput(t) {
    return k(this, void 0, void 0, function* () {
      this.audioOutput = t;
      const i = [];
      this.audioTracks.forEach((n) => {
        var r;
        n.track instanceof ln && i.push(n.track.setSinkId((r = t.deviceId) !== null && r !== void 0 ? r : "default"));
      }), yield Promise.all(i);
    });
  }
  /** @internal */
  emit(t) {
    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      n[r - 1] = arguments[r];
    return g.trace("participant event", {
      participant: this.sid,
      event: t,
      args: n
    }), super.emit(t, ...n);
  }
}
class Jo extends Cd {
  /** @internal */
  constructor(t, i, n, r) {
    super(t, i), this.pendingPublishing = /* @__PURE__ */ new Set(), this.pendingPublishPromises = /* @__PURE__ */ new Map(), this.participantTrackPermissions = [], this.allParticipantsAllowedToSubscribe = !0, this.encryptionType = xe.NONE, this.handleReconnecting = () => {
      this.reconnectFuture || (this.reconnectFuture = new ld());
    }, this.handleReconnected = () => {
      var s, a;
      (a = (s = this.reconnectFuture) === null || s === void 0 ? void 0 : s.resolve) === null || a === void 0 || a.call(s), this.reconnectFuture = void 0, this.updateTrackSubscriptionPermissions();
    }, this.handleDisconnected = () => {
      var s, a;
      this.reconnectFuture && (this.reconnectFuture.promise.catch((o) => g.warn(o)), (a = (s = this.reconnectFuture) === null || s === void 0 ? void 0 : s.reject) === null || a === void 0 || a.call(s, "Got disconnected during reconnection attempt"), this.reconnectFuture = void 0);
    }, this.updateTrackSubscriptionPermissions = () => {
      g.debug("updating track subscription permissions", {
        allParticipantsAllowed: this.allParticipantsAllowedToSubscribe,
        participantTrackPermissions: this.participantTrackPermissions
      }), this.engine.client.sendUpdateSubscriptionPermissions(this.allParticipantsAllowedToSubscribe, this.participantTrackPermissions.map((s) => sf(s)));
    }, this.onTrackUnmuted = (s) => {
      this.onTrackMuted(s, s.isUpstreamPaused);
    }, this.onTrackMuted = (s, a) => {
      if (a === void 0 && (a = !0), !s.sid) {
        g.error("could not update mute status for unpublished track", s);
        return;
      }
      this.engine.updateMuteStatus(s.sid, a);
    }, this.onTrackUpstreamPaused = (s) => {
      g.debug("upstream paused"), this.onTrackMuted(s, !0);
    }, this.onTrackUpstreamResumed = (s) => {
      g.debug("upstream resumed"), this.onTrackMuted(s, s.isMuted);
    }, this.handleSubscribedQualityUpdate = (s) => k(this, void 0, void 0, function* () {
      var a, o, c, d, u, l;
      if (!(!((u = this.roomOptions) === null || u === void 0) && u.dynacast))
        return;
      const h = this.videoTracks.get(s.trackSid);
      if (!h) {
        g.warn("received subscribed quality update for unknown track", {
          method: "handleSubscribedQualityUpdate",
          sid: s.trackSid
        });
        return;
      }
      if (s.subscribedCodecs.length > 0) {
        if (!h.videoTrack)
          return;
        const C = yield h.videoTrack.setPublishingCodecs(s.subscribedCodecs);
        try {
          for (var f = !0, p = bc(C), m; m = yield p.next(), a = m.done, !a; f = !0) {
            d = m.value, f = !1;
            const E = d;
            nh(E) && (g.debug("publish ".concat(E, " for ").concat(h.videoTrack.sid)), yield this.publishAdditionalCodecForTrack(h.videoTrack, E, h.options));
          }
        } catch (E) {
          o = {
            error: E
          };
        } finally {
          try {
            !f && !a && (c = p.return) && (yield c.call(p));
          } finally {
            if (o)
              throw o.error;
          }
        }
      } else
        s.subscribedQualities.length > 0 && (yield (l = h.videoTrack) === null || l === void 0 ? void 0 : l.setPublishingLayers(s.subscribedQualities));
    }), this.handleLocalTrackUnpublished = (s) => {
      const a = this.tracks.get(s.trackSid);
      if (!a) {
        g.warn("received unpublished event for unknown track", {
          method: "handleLocalTrackUnpublished",
          trackSid: s.trackSid
        });
        return;
      }
      this.unpublishTrack(a.track);
    }, this.handleTrackEnded = (s) => k(this, void 0, void 0, function* () {
      if (s.source === T.Source.ScreenShare || s.source === T.Source.ScreenShareAudio)
        g.debug("unpublishing local track due to TrackEnded", {
          track: s.sid
        }), this.unpublishTrack(s);
      else if (s.isUserProvided)
        yield s.mute();
      else if (s instanceof et || s instanceof Ye)
        try {
          if (ze())
            try {
              const a = yield navigator == null ? void 0 : navigator.permissions.query({
                // the permission query for camera and microphone currently not supported in Safari and Firefox
                // @ts-ignore
                name: s.source === T.Source.Camera ? "camera" : "microphone"
              });
              if (a && a.state === "denied")
                throw g.warn("user has revoked access to ".concat(s.source)), a.onchange = () => {
                  a.state !== "denied" && (s.isMuted || s.restartTrack(), a.onchange = null);
                }, new Error("GetUserMedia Permission denied");
            } catch {
            }
          s.isMuted || (g.debug("track ended, attempting to use a different device"), yield s.restartTrack());
        } catch {
          g.warn("could not restart track, muting instead"), yield s.mute();
        }
    }), this.audioTracks = /* @__PURE__ */ new Map(), this.videoTracks = /* @__PURE__ */ new Map(), this.tracks = /* @__PURE__ */ new Map(), this.engine = n, this.roomOptions = r, this.setupEngine(n), this.activeDeviceMap = /* @__PURE__ */ new Map();
  }
  get lastCameraError() {
    return this.cameraError;
  }
  get lastMicrophoneError() {
    return this.microphoneError;
  }
  getTrack(t) {
    const i = super.getTrack(t);
    if (i)
      return i;
  }
  getTrackByName(t) {
    const i = super.getTrackByName(t);
    if (i)
      return i;
  }
  /**
   * @internal
   */
  setupEngine(t) {
    this.engine = t, this.engine.client.onRemoteMuteChanged = (i, n) => {
      const r = this.tracks.get(i);
      !r || !r.track || (n ? r.mute() : r.unmute());
    }, this.engine.client.onSubscribedQualityUpdate = this.handleSubscribedQualityUpdate, this.engine.client.onLocalTrackUnpublished = this.handleLocalTrackUnpublished, this.engine.on(U.Connected, this.handleReconnected).on(U.Restarted, this.handleReconnected).on(U.Resumed, this.handleReconnected).on(U.Restarting, this.handleReconnecting).on(U.Resuming, this.handleReconnecting).on(U.Disconnected, this.handleDisconnected);
  }
  /**
   * Sets and updates the metadata of the local participant.
   * Note: this requires `canUpdateOwnMetadata` permission encoded in the token.
   * @param metadata
   */
  setMetadata(t) {
    var i;
    super.setMetadata(t), this.engine.client.sendUpdateLocalMetadata(t, (i = this.name) !== null && i !== void 0 ? i : "");
  }
  /**
   * Sets and updates the name of the local participant.
   * Note: this requires `canUpdateOwnMetadata` permission encoded in the token.
   * @param metadata
   */
  setName(t) {
    var i;
    super.setName(t), this.engine.client.sendUpdateLocalMetadata((i = this.metadata) !== null && i !== void 0 ? i : "", t);
  }
  /**
   * Enable or disable a participant's camera track.
   *
   * If a track has already published, it'll mute or unmute the track.
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setCameraEnabled(t, i, n) {
    return this.setTrackEnabled(T.Source.Camera, t, i, n);
  }
  /**
   * Enable or disable a participant's microphone track.
   *
   * If a track has already published, it'll mute or unmute the track.
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setMicrophoneEnabled(t, i, n) {
    return this.setTrackEnabled(T.Source.Microphone, t, i, n);
  }
  /**
   * Start or stop sharing a participant's screen
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setScreenShareEnabled(t, i, n) {
    return this.setTrackEnabled(T.Source.ScreenShare, t, i, n);
  }
  /** @internal */
  setPermissions(t) {
    const i = this.permissions, n = super.setPermissions(t);
    return n && i && this.emit(D.ParticipantPermissionsChanged, i), n;
  }
  /** @internal */
  setE2EEEnabled(t) {
    return k(this, void 0, void 0, function* () {
      this.encryptionType = t ? xe.GCM : xe.NONE, yield this.republishAllTracks(void 0, !1);
    });
  }
  setTrackEnabled(t, i, n, r) {
    var s, a;
    return k(this, void 0, void 0, function* () {
      g.debug("setTrackEnabled", {
        source: t,
        enabled: i
      });
      let o = this.getTrack(t);
      if (i)
        if (o)
          yield o.unmute();
        else {
          let c;
          if (this.pendingPublishing.has(t)) {
            g.info("skipping duplicate published source", {
              source: t
            });
            return;
          }
          this.pendingPublishing.add(t);
          try {
            switch (t) {
              case T.Source.Camera:
                c = yield this.createTracks({
                  video: (s = n) !== null && s !== void 0 ? s : !0
                });
                break;
              case T.Source.Microphone:
                c = yield this.createTracks({
                  audio: (a = n) !== null && a !== void 0 ? a : !0
                });
                break;
              case T.Source.ScreenShare:
                c = yield this.createScreenTracks(Object.assign({}, n));
                break;
              default:
                throw new Pt(t);
            }
            const d = [];
            for (const l of c)
              g.info("publishing track", {
                localTrack: l
              }), d.push(this.publishTrack(l, r));
            [o] = yield Promise.all(d);
          } catch (d) {
            throw d instanceof Error && !(d instanceof Pt) && this.emit(D.MediaDevicesError, d), d;
          } finally {
            this.pendingPublishing.delete(t);
          }
        }
      else if (o && o.track)
        if (t === T.Source.ScreenShare) {
          o = yield this.unpublishTrack(o.track);
          const c = this.getTrack(T.Source.ScreenShareAudio);
          c && c.track && this.unpublishTrack(c.track);
        } else
          yield o.mute();
      return o;
    });
  }
  /**
   * Publish both camera and microphone at the same time. This is useful for
   * displaying a single Permission Dialog box to the end user.
   */
  enableCameraAndMicrophone() {
    return k(this, void 0, void 0, function* () {
      if (!(this.pendingPublishing.has(T.Source.Camera) || this.pendingPublishing.has(T.Source.Microphone))) {
        this.pendingPublishing.add(T.Source.Camera), this.pendingPublishing.add(T.Source.Microphone);
        try {
          const t = yield this.createTracks({
            audio: !0,
            video: !0
          });
          yield Promise.all(t.map((i) => this.publishTrack(i)));
        } finally {
          this.pendingPublishing.delete(T.Source.Camera), this.pendingPublishing.delete(T.Source.Microphone);
        }
      }
    });
  }
  /**
   * Create local camera and/or microphone tracks
   * @param options
   * @returns
   */
  createTracks(t) {
    var i, n;
    return k(this, void 0, void 0, function* () {
      const r = sh(t, (i = this.roomOptions) === null || i === void 0 ? void 0 : i.audioCaptureDefaults, (n = this.roomOptions) === null || n === void 0 ? void 0 : n.videoCaptureDefaults), s = Es(r);
      let a;
      try {
        a = yield navigator.mediaDevices.getUserMedia(s);
      } catch (o) {
        throw o instanceof Error && (s.audio && (this.microphoneError = o), s.video && (this.cameraError = o)), o;
      }
      return s.audio && (this.microphoneError = void 0), s.video && (this.cameraError = void 0), a.getTracks().map((o) => {
        const c = o.kind === "audio";
        c ? t.audio : t.video;
        let d;
        const u = c ? s.audio : s.video;
        typeof u != "boolean" && (d = u);
        const l = Wh(o, d);
        return l.kind === T.Kind.Video ? l.source = T.Source.Camera : l.kind === T.Kind.Audio && (l.source = T.Source.Microphone), l.mediaStream = a, l;
      });
    });
  }
  /**
   * Creates a screen capture tracks with getDisplayMedia().
   * A LocalVideoTrack is always created and returned.
   * If { audio: true }, and the browser supports audio capture, a LocalAudioTrack is also created.
   */
  createScreenTracks(t) {
    var i;
    return k(this, void 0, void 0, function* () {
      t === void 0 && (t = {}), t.resolution === void 0 && (t.resolution = Ts.h1080fps15.resolution);
      let n = !0;
      if (t.resolution && (Yn() ? n = {
        width: {
          max: t.resolution.width
        },
        height: {
          max: t.resolution.height
        },
        frameRate: t.resolution.frameRate
      } : n = {
        width: {
          ideal: t.resolution.width
        },
        height: {
          ideal: t.resolution.height
        },
        frameRate: t.resolution.frameRate
      }), navigator.mediaDevices.getDisplayMedia === void 0)
        throw new _s("getDisplayMedia not supported");
      const r = yield navigator.mediaDevices.getDisplayMedia({
        audio: (i = t.audio) !== null && i !== void 0 ? i : !1,
        video: n,
        // @ts-expect-error support for experimental display media features
        controller: t.controller,
        selfBrowserSurface: t.selfBrowserSurface,
        surfaceSwitching: t.surfaceSwitching,
        systemAudio: t.systemAudio
      }), s = r.getVideoTracks();
      if (s.length === 0)
        throw new Pt("no video track found");
      const a = new Ye(s[0], void 0, !1);
      a.source = T.Source.ScreenShare;
      const o = [a];
      if (r.getAudioTracks().length > 0) {
        const c = new et(r.getAudioTracks()[0], void 0, !1);
        c.source = T.Source.ScreenShareAudio, o.push(c);
      }
      return o;
    });
  }
  /**
   * Publish a new track to the room
   * @param track
   * @param options
   */
  publishTrack(t, i) {
    var n, r, s, a;
    return k(this, void 0, void 0, function* () {
      yield (n = this.reconnectFuture) === null || n === void 0 ? void 0 : n.promise, t instanceof En && this.pendingPublishPromises.has(t) && (yield this.pendingPublishPromises.get(t));
      let o;
      if (t instanceof MediaStreamTrack)
        o = t.getConstraints();
      else {
        o = t.constraints;
        let f;
        switch (t.source) {
          case T.Source.Microphone:
            f = "audioinput";
            break;
          case T.Source.Camera:
            f = "videoinput";
        }
        f && this.activeDeviceMap.has(f) && (o = Object.assign(Object.assign({}, o), {
          deviceId: this.activeDeviceMap.get(f)
        }));
      }
      if (t instanceof MediaStreamTrack)
        switch (t.kind) {
          case "audio":
            t = new et(t, o, !0);
            break;
          case "video":
            t = new Ye(t, o, !0);
            break;
          default:
            throw new Pt("unsupported MediaStreamTrack kind ".concat(t.kind));
        }
      let c;
      if (this.tracks.forEach((f) => {
        f.track && f.track === t && (c = f);
      }), c)
        return g.warn("track has already been published, skipping"), c;
      const d = "channelCount" in t.mediaStreamTrack.getSettings() && // @ts-ignore `channelCount` on getSettings() is currently only available for Safari, but is generally the best way to determine a stereo track https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/channelCount
      t.mediaStreamTrack.getSettings().channelCount === 2 || t.mediaStreamTrack.getConstraints().channelCount === 2, u = (r = i == null ? void 0 : i.forceStereo) !== null && r !== void 0 ? r : d;
      u && (i || (i = {}), i.dtx === void 0 && g.info("Opus DTX will be disabled for stereo tracks by default. Enable them explicitly to make it work."), i.red === void 0 && g.info("Opus RED will be disabled for stereo tracks by default. Enable them explicitly to make it work."), (s = i.dtx) !== null && s !== void 0 || (i.dtx = !1), (a = i.red) !== null && a !== void 0 || (i.red = !1));
      const l = Object.assign(Object.assign({}, this.roomOptions.publishDefaults), i);
      Yn() && this.roomOptions.e2ee && (g.info("End-to-end encryption is set up, simulcast publishing will be disabled on Safari"), l.simulcast = !1), l.source && (t.source = l.source);
      const h = this.publish(t, l, i, u);
      this.pendingPublishPromises.set(t, h);
      try {
        return yield h;
      } catch (f) {
        throw f;
      } finally {
        this.pendingPublishPromises.delete(t);
      }
    });
  }
  publish(t, i, n, r) {
    var s, a, o, c, d, u, l, h, f, p, m, C, E;
    return k(this, void 0, void 0, function* () {
      const A = Array.from(this.tracks.values()).find((x) => t instanceof En && x.source === t.source);
      if (A && t.source !== T.Source.Unknown)
        try {
          throw Error("publishing a second track with the same source: ".concat(t.source));
        } catch (x) {
          x instanceof Error && g.warn(x.message, {
            oldTrack: A,
            newTrack: t,
            trace: x.stack
          });
        }
      i.stopMicTrackOnMute && t instanceof et && (t.stopOnMute = !0), t.source === T.Source.ScreenShare && Tn() && (i.simulcast = !1), i.videoCodec === "av1" && !uh() && (i.videoCodec = void 0), i.videoCodec === "vp9" && !lh() && (i.videoCodec = void 0), t.on(N.Muted, this.onTrackMuted), t.on(N.Unmuted, this.onTrackUnmuted), t.on(N.Ended, this.handleTrackEnded), t.on(N.UpstreamPaused, this.onTrackUpstreamPaused), t.on(N.UpstreamResumed, this.onTrackUpstreamResumed);
      const I = Zt.fromPartial({
        // get local track id for use during publishing
        cid: t.mediaStreamTrack.id,
        name: n == null ? void 0 : n.name,
        type: T.kindToProto(t.kind),
        muted: t.isMuted,
        source: T.sourceToProto(t.source),
        disableDtx: !(!((s = i.dtx) !== null && s !== void 0) || s),
        encryption: this.encryptionType,
        stereo: r
        // disableRed: !(opts.red ?? true),
      });
      let B, ee;
      if (t.kind === T.Kind.Video) {
        let x = {
          width: 0,
          height: 0
        };
        try {
          x = yield t.waitForDimensions();
        } catch {
          const ne = (o = (a = this.roomOptions.videoCaptureDefaults) === null || a === void 0 ? void 0 : a.resolution) !== null && o !== void 0 ? o : _n.h720.resolution;
          x = {
            width: ne.width,
            height: ne.height
          }, g.error("could not determine track dimensions, using defaults", x);
        }
        if (I.width = x.width, I.height = x.height, t instanceof Ye)
          if (mn(i.videoCodec) && (i.scalabilityMode = (c = i.scalabilityMode) !== null && c !== void 0 ? c : "L3T3_KEY"), i.videoCodec && i.backupCodec && i.videoCodec !== i.backupCodec.codec) {
            const X = Object.assign({}, i);
            X.simulcast = !0, ee = Mo(t, i.backupCodec.codec, X), I.simulcastCodecs = [{
              codec: i.videoCodec,
              cid: t.mediaStreamTrack.id,
              enableSimulcastLayers: !0
            }, {
              codec: i.backupCodec.codec,
              cid: "",
              enableSimulcastLayers: !0
            }];
          } else
            i.videoCodec && (I.simulcastCodecs = [{
              codec: i.videoCodec,
              cid: t.mediaStreamTrack.id,
              enableSimulcastLayers: (d = i.simulcast) !== null && d !== void 0 ? d : !1
            }]);
        B = yd(t.source === T.Source.ScreenShare, x.width, x.height, i), I.layers = Fo(I.width, I.height, B, mn(i.videoCodec));
      } else
        t.kind === T.Kind.Audio && (B = [{
          maxBitrate: (l = (u = i.audioPreset) === null || u === void 0 ? void 0 : u.maxBitrate) !== null && l !== void 0 ? l : i.audioBitrate,
          priority: (f = (h = i.audioPreset) === null || h === void 0 ? void 0 : h.priority) !== null && f !== void 0 ? f : "high",
          networkPriority: (m = (p = i.audioPreset) === null || p === void 0 ? void 0 : p.priority) !== null && m !== void 0 ? m : "high"
        }]);
      if (!this.engine || this.engine.isClosed)
        throw new $e("cannot publish track when not connected");
      const ae = yield this.engine.addTrack(I);
      let he = !1, de = !1;
      if (ae.codecs.forEach((x) => {
        yo(x.mimeType, i.videoCodec) ? he = !0 : i.backupCodec && yo(x.mimeType, i.backupCodec.codec) && (de = !0);
      }), I.simulcastCodecs.length > 0) {
        if (!he && !de)
          throw Error("cannot publish track, codec not supported by server");
        if (!he && i.backupCodec) {
          const x = i.backupCodec;
          i = Object.assign({}, i), g.debug("primary codec ".concat(i.videoCodec, " not supported, fallback to ").concat(x.codec)), i.videoCodec = x.codec, i.videoEncoding = x.encoding, B = ee;
        }
      }
      const L = new jn(t.kind, ae, t);
      if (L.options = i, t.sid = ae.sid, !this.engine.publisher)
        throw new $e("publisher is closed");
      if (g.debug("publishing ".concat(t.kind, " with encodings"), {
        encodings: B,
        trackInfo: ae
      }), t.sender = yield this.engine.createSender(t, i, B), B)
        if (Tn() && t.kind === T.Kind.Audio) {
          let x;
          for (const X of this.engine.publisher.pc.getTransceivers())
            if (X.sender === t.sender) {
              x = X;
              break;
            }
          x && this.engine.publisher.setTrackCodecBitrate({
            transceiver: x,
            codec: "opus",
            maxbr: !((C = B[0]) === null || C === void 0) && C.maxBitrate ? B[0].maxBitrate / 1e3 : 0
          });
        } else
          t.codec && mn(t.codec) && (!((E = B[0]) === null || E === void 0) && E.maxBitrate) && this.engine.publisher.setTrackCodecBitrate({
            cid: I.cid,
            codec: t.codec,
            maxbr: B[0].maxBitrate / 1e3
          });
      return yield this.engine.negotiate(), t instanceof Ye ? t.startMonitor(this.engine.client) : t instanceof et && t.startMonitor(), this.addTrackPublication(L), this.emit(D.LocalTrackPublished, L), L;
    });
  }
  get isLocal() {
    return !0;
  }
  /** @internal
   * publish additional codec to existing track
   */
  publishAdditionalCodecForTrack(t, i, n) {
    var r;
    return k(this, void 0, void 0, function* () {
      let s;
      if (this.tracks.forEach((l) => {
        l.track && l.track === t && (s = l);
      }), !s)
        throw new Pt("track is not published");
      if (!(t instanceof Ye))
        throw new Pt("track is not a video track");
      const a = Object.assign(Object.assign({}, (r = this.roomOptions) === null || r === void 0 ? void 0 : r.publishDefaults), n), o = Mo(t, i, a);
      if (!o) {
        g.info("backup codec has been disabled, ignoring request to add additional codec for track");
        return;
      }
      const c = t.addSimulcastTrack(i, o), d = Zt.fromPartial({
        cid: c.mediaStreamTrack.id,
        type: T.kindToProto(t.kind),
        muted: t.isMuted,
        source: T.sourceToProto(t.source),
        sid: t.sid,
        simulcastCodecs: [{
          codec: a.videoCodec,
          cid: c.mediaStreamTrack.id,
          enableSimulcastLayers: a.simulcast
        }]
      });
      if (d.layers = Fo(d.width, d.height, o), !this.engine || this.engine.isClosed)
        throw new $e("cannot publish track when not connected");
      const u = yield this.engine.addTrack(d);
      yield this.engine.createSimulcastSender(t, c, a, o), yield this.engine.negotiate(), g.debug("published ".concat(i, " for track ").concat(t.sid), {
        encodings: o,
        trackInfo: u
      });
    });
  }
  unpublishTrack(t, i) {
    var n, r;
    return k(this, void 0, void 0, function* () {
      const s = this.getPublicationForTrack(t);
      if (g.debug("unpublishing track", {
        track: t,
        method: "unpublishTrack"
      }), !s || !s.track) {
        g.warn("track was not unpublished because no publication was found", {
          track: t,
          method: "unpublishTrack"
        });
        return;
      }
      t = s.track, t.off(N.Muted, this.onTrackMuted), t.off(N.Unmuted, this.onTrackUnmuted), t.off(N.Ended, this.handleTrackEnded), t.off(N.UpstreamPaused, this.onTrackUpstreamPaused), t.off(N.UpstreamResumed, this.onTrackUpstreamResumed), i === void 0 && (i = (r = (n = this.roomOptions) === null || n === void 0 ? void 0 : n.stopLocalTrackOnUnpublish) !== null && r !== void 0 ? r : !0), i && t.stop();
      let a = !1;
      const o = t.sender;
      if (t.sender = void 0, this.engine.publisher && this.engine.publisher.pc.connectionState !== "closed" && o)
        try {
          for (const c of this.engine.publisher.pc.getTransceivers())
            c.sender === o && (c.direction = "inactive", a = !0);
          if (this.engine.removeTrack(o) && (a = !0), t instanceof Ye) {
            for (const [, c] of t.simulcastCodecs)
              c.sender && (this.engine.removeTrack(c.sender) && (a = !0), c.sender = void 0);
            t.simulcastCodecs.clear();
          }
        } catch (c) {
          g.warn("failed to unpublish track", {
            error: c,
            method: "unpublishTrack"
          });
        }
      switch (this.tracks.delete(s.trackSid), s.kind) {
        case T.Kind.Audio:
          this.audioTracks.delete(s.trackSid);
          break;
        case T.Kind.Video:
          this.videoTracks.delete(s.trackSid);
          break;
      }
      return this.emit(D.LocalTrackUnpublished, s), s.setTrack(void 0), a && (yield this.engine.negotiate()), s;
    });
  }
  unpublishTracks(t) {
    return k(this, void 0, void 0, function* () {
      return (yield Promise.all(t.map((n) => this.unpublishTrack(n)))).filter((n) => n instanceof jn);
    });
  }
  republishAllTracks(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return k(this, void 0, void 0, function* () {
      const n = [];
      this.tracks.forEach((r) => {
        r.track && (t && (r.options = Object.assign(Object.assign({}, r.options), t)), n.push(r));
      }), yield Promise.all(n.map((r) => k(this, void 0, void 0, function* () {
        const s = r.track;
        yield this.unpublishTrack(s, !1), i && !s.isMuted && (s instanceof et || s instanceof Ye) && !s.isUserProvided && (g.debug("restarting existing track", {
          track: r.trackSid
        }), yield s.restartTrack()), yield this.publishTrack(s, r.options);
      })));
    });
  }
  publishData(t, i) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return k(this, void 0, void 0, function* () {
      const r = Array.isArray(n) ? n : n == null ? void 0 : n.destination, s = [], a = Array.isArray(n) ? void 0 : n.topic;
      r !== void 0 && r.forEach((c) => {
        c instanceof Pn ? s.push(c.sid) : s.push(c);
      });
      const o = {
        kind: i,
        value: {
          $case: "user",
          user: {
            participantSid: this.sid,
            payload: t,
            destinationSids: s,
            topic: a
          }
        }
      };
      yield this.engine.sendDataPacket(o, i);
    });
  }
  /**
   * Control who can subscribe to LocalParticipant's published tracks.
   *
   * By default, all participants can subscribe. This allows fine-grained control over
   * who is able to subscribe at a participant and track level.
   *
   * Note: if access is given at a track-level (i.e. both [allParticipantsAllowed] and
   * [ParticipantTrackPermission.allTracksAllowed] are false), any newer published tracks
   * will not grant permissions to any participants and will require a subsequent
   * permissions update to allow subscription.
   *
   * @param allParticipantsAllowed Allows all participants to subscribe all tracks.
   *  Takes precedence over [[participantTrackPermissions]] if set to true.
   *  By default this is set to true.
   * @param participantTrackPermissions Full list of individual permissions per
   *  participant/track. Any omitted participants will not receive any permissions.
   */
  setTrackSubscriptionPermissions(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    this.participantTrackPermissions = i, this.allParticipantsAllowedToSubscribe = t, this.engine.client.isConnected && this.updateTrackSubscriptionPermissions();
  }
  /** @internal */
  updateInfo(t) {
    return t.sid !== this.sid || !super.updateInfo(t) ? !1 : (t.tracks.forEach((i) => {
      var n, r;
      const s = this.tracks.get(i.sid);
      if (s) {
        const a = s.isMuted || ((r = (n = s.track) === null || n === void 0 ? void 0 : n.isUpstreamPaused) !== null && r !== void 0 ? r : !1);
        a !== i.muted && (g.debug("updating server mute state after reconcile", {
          sid: i.sid,
          muted: a
        }), this.engine.client.sendMuteTrack(i.sid, a));
      }
    }), !0);
  }
  getPublicationForTrack(t) {
    let i;
    return this.tracks.forEach((n) => {
      const r = n.track;
      r && (t instanceof MediaStreamTrack ? (r instanceof et || r instanceof Ye) && r.mediaStreamTrack === t && (i = n) : t === r && (i = n));
    }), i;
  }
  /** @internal */
  publishedTracksInfo() {
    const t = [];
    return this.tracks.forEach((i) => {
      i.track !== void 0 && t.push({
        cid: i.track.mediaStreamID,
        track: i.trackInfo
      });
    }), t;
  }
  /** @internal */
  dataChannelsInfo() {
    const t = [], i = (n, r) => {
      (n == null ? void 0 : n.id) !== void 0 && n.id !== null && t.push({
        label: n.label,
        id: n.id,
        target: r
      });
    };
    return i(this.engine.dataChannelForKind(Se.LOSSY), Ve.PUBLISHER), i(this.engine.dataChannelForKind(Se.RELIABLE), Ve.PUBLISHER), i(this.engine.dataChannelForKind(Se.LOSSY, !0), Ve.SUBSCRIBER), i(this.engine.dataChannelForKind(Se.RELIABLE, !0), Ve.SUBSCRIBER), t;
  }
}
var fe;
(function(e) {
  e.Disconnected = "disconnected", e.Connecting = "connecting", e.Connected = "connected", e.Reconnecting = "reconnecting";
})(fe || (fe = {}));
const af = 2 * 1e3;
class of extends li {
  /**
   * Creates a new Room, the primary construct for a LiveKit session.
   * @param options
   */
  constructor(t) {
    var i, n;
    super(), i = this, this.state = fe.Disconnected, this.activeSpeakers = [], this.isE2EEEnabled = !1, this.audioEnabled = !0, this.connect = (r, s, a) => k(this, void 0, void 0, function* () {
      const o = yield this.disconnectLock.lock();
      if (this.state === fe.Connected)
        return g.info("already connected to room ".concat(this.name)), o(), Promise.resolve();
      if (this.connectFuture)
        return o(), this.connectFuture.promise;
      this.setAndEmitConnectionState(fe.Connecting);
      const c = new vd(r, s), d = (u, l, h) => k(this, void 0, void 0, function* () {
        var f;
        this.abortController && this.abortController.abort(), this.abortController = new AbortController(), o == null || o();
        try {
          yield this.attemptConnection(h ?? r, s, a, this.abortController), this.abortController = void 0, u();
        } catch (p) {
          if (Ps(new URL(r)) && p instanceof ve && p.reason !== 3) {
            let m = null;
            try {
              m = yield c.getNextBestRegionUrl((f = this.abortController) === null || f === void 0 ? void 0 : f.signal);
            } catch (C) {
              if (C instanceof ve && (C.status === 401 || C.reason === 3)) {
                l(C);
                return;
              }
            }
            m ? (g.debug("initial connection failed, retrying with another region"), yield d(u, l, m)) : l(p);
          } else
            l(p);
        }
      });
      return this.connectFuture = new ld(d, () => {
        this.clearConnectionFutures();
      }), this.connectFuture.promise;
    }), this.connectSignal = (r, s, a, o, c, d) => k(this, void 0, void 0, function* () {
      const u = yield a.join(r, s, {
        autoSubscribe: o.autoSubscribe,
        publishOnly: o.publishOnly,
        adaptiveStream: typeof c.adaptiveStream == "object" ? !0 : c.adaptiveStream,
        maxRetries: o.maxRetries,
        e2eeEnabled: !!this.e2eeManager
      }, d.signal);
      let l = u.serverInfo;
      if (l || (l = {
        version: u.serverVersion,
        region: u.serverRegion
      }), g.debug("connected to Livekit Server ".concat(Object.entries(l).map((h) => {
        let [f, p] = h;
        return "".concat(f, ": ").concat(p);
      }).join(", "))), !u.serverVersion)
        throw new Kl("unknown server version");
      return u.serverVersion === "0.15.1" && this.options.dynacast && (g.debug("disabling dynacast due to server version"), c.dynacast = !1), u;
    }), this.applyJoinResponse = (r) => {
      const s = r.participant;
      this.localParticipant.sid = s.sid, this.localParticipant.identity = s.identity, this.handleParticipantUpdates([s, ...r.otherParticipants]), r.room && this.handleRoomUpdate(r.room);
    }, this.attemptConnection = (r, s, a, o) => k(this, void 0, void 0, function* () {
      var c;
      this.state === fe.Reconnecting ? (g.info("Reconnection attempt replaced by new connection attempt"), this.recreateEngine()) : this.maybeCreateEngine(), this.acquireAudioContext(), this.connOptions = Object.assign(Object.assign({}, gd), a), this.connOptions.rtcConfig && (this.engine.rtcConfig = this.connOptions.rtcConfig), this.connOptions.peerConnectionTimeout && (this.engine.peerConnectionTimeout = this.connOptions.peerConnectionTimeout);
      try {
        const d = yield this.connectSignal(r, s, this.engine, this.connOptions, this.options, o);
        this.applyJoinResponse(d), this.setupLocalParticipantEvents(), this.emit(O.SignalConnected);
      } catch (d) {
        this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish);
        const u = new ve("could not establish signal connection");
        throw d instanceof Error && (u.message = "".concat(u.message, ": ").concat(d.message)), d instanceof ve && (u.reason = d.reason, u.status = d.status), g.debug("error trying to establish signal connection", {
          error: d
        }), u;
      }
      if (o.signal.aborted)
        throw this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), new ve("Connection attempt aborted");
      try {
        yield this.engine.waitForPCInitialConnection(this.connOptions.peerConnectionTimeout, o);
      } catch (d) {
        throw this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), d;
      }
      ze() && this.options.disconnectOnPageLeave && (window.addEventListener("pagehide", this.onPageLeave), window.addEventListener("beforeunload", this.onPageLeave)), ze() && (document.addEventListener("freeze", this.onPageLeave), (c = navigator.mediaDevices) === null || c === void 0 || c.addEventListener("devicechange", this.handleDeviceChange)), this.setAndEmitConnectionState(fe.Connected), this.emit(O.Connected), this.registerConnectionReconcile();
    }), this.disconnect = function() {
      let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      return k(i, void 0, void 0, function* () {
        var s, a, o, c;
        const d = yield this.disconnectLock.lock();
        try {
          if (this.state === fe.Disconnected) {
            g.debug("already disconnected");
            return;
          }
          g.info("disconnect from room", {
            identity: this.localParticipant.identity
          }), (this.state === fe.Connecting || this.state === fe.Reconnecting) && (g.warn("abort connection attempt"), (s = this.abortController) === null || s === void 0 || s.abort(), (o = (a = this.connectFuture) === null || a === void 0 ? void 0 : a.reject) === null || o === void 0 || o.call(a, new ve("Client initiated disconnect")), this.connectFuture = void 0), !((c = this.engine) === null || c === void 0) && c.client.isConnected && (yield this.engine.client.sendLeave()), this.engine && (yield this.engine.close()), this.handleDisconnect(r, ue.CLIENT_INITIATED), this.engine = void 0;
        } finally {
          d();
        }
      });
    }, this.onPageLeave = () => k(this, void 0, void 0, function* () {
      yield this.disconnect();
    }), this.handleRestarting = () => {
      this.clearConnectionReconcile();
      for (const r of this.participants.values())
        this.handleParticipantDisconnected(r.sid, r);
      this.setAndEmitConnectionState(fe.Reconnecting) && this.emit(O.Reconnecting);
    }, this.handleSignalRestarted = (r) => k(this, void 0, void 0, function* () {
      g.debug("signal reconnected to server", {
        region: r.serverRegion
      }), this.cachedParticipantSids = [], this.applyJoinResponse(r);
      try {
        const s = [];
        this.localParticipant.tracks.forEach((a) => {
          a.track && s.push(a);
        }), yield Promise.all(s.map((a) => k(this, void 0, void 0, function* () {
          const o = a.track;
          this.localParticipant.unpublishTrack(o, !1), o.isMuted || ((o instanceof et || o instanceof Ye) && !o.isUserProvided && (g.debug("restarting existing track", {
            track: a.trackSid
          }), yield o.restartTrack()), g.debug("publishing new track", {
            track: a.trackSid
          }), yield this.localParticipant.publishTrack(o, a.options));
        })));
      } catch (s) {
        g.error("error trying to re-publish tracks after reconnection", {
          error: s
        });
      }
      try {
        yield this.engine.waitForRestarted(), g.debug("fully reconnected to server", {
          region: r.serverRegion
        });
      } catch {
        return;
      }
      this.setAndEmitConnectionState(fe.Connected), this.emit(O.Reconnected), this.registerConnectionReconcile(), this.participants.forEach((s) => {
        this.emit(O.ParticipantConnected, s);
      });
    }), this.handleParticipantUpdates = (r) => {
      r.forEach((s) => {
        if (s.identity === this.localParticipant.identity) {
          this.localParticipant.updateInfo(s);
          return;
        }
        const a = this.identityToSid.get(s.identity);
        a && a !== s.sid && this.handleParticipantDisconnected(a, this.participants.get(a));
        let o = this.participants.get(s.sid);
        const c = !o;
        s.state === Ge.DISCONNECTED ? this.handleParticipantDisconnected(s.sid, o) : (o = this.getOrCreateParticipant(s.sid, s), c || o.updateInfo(s));
      });
    }, this.handleActiveSpeakersUpdate = (r) => {
      const s = [], a = {};
      r.forEach((o) => {
        if (a[o.sid] = !0, o.sid === this.localParticipant.sid)
          this.localParticipant.audioLevel = o.level, this.localParticipant.setIsSpeaking(!0), s.push(this.localParticipant);
        else {
          const c = this.participants.get(o.sid);
          c && (c.audioLevel = o.level, c.setIsSpeaking(!0), s.push(c));
        }
      }), a[this.localParticipant.sid] || (this.localParticipant.audioLevel = 0, this.localParticipant.setIsSpeaking(!1)), this.participants.forEach((o) => {
        a[o.sid] || (o.audioLevel = 0, o.setIsSpeaking(!1));
      }), this.activeSpeakers = s, this.emitWhenConnected(O.ActiveSpeakersChanged, s);
    }, this.handleSpeakersChanged = (r) => {
      const s = /* @__PURE__ */ new Map();
      this.activeSpeakers.forEach((o) => {
        s.set(o.sid, o);
      }), r.forEach((o) => {
        let c = this.participants.get(o.sid);
        o.sid === this.localParticipant.sid && (c = this.localParticipant), c && (c.audioLevel = o.level, c.setIsSpeaking(o.active), o.active ? s.set(o.sid, c) : s.delete(o.sid));
      });
      const a = Array.from(s.values());
      a.sort((o, c) => c.audioLevel - o.audioLevel), this.activeSpeakers = a, this.emitWhenConnected(O.ActiveSpeakersChanged, a);
    }, this.handleStreamStateUpdate = (r) => {
      r.streamStates.forEach((s) => {
        const a = this.participants.get(s.participantSid);
        if (!a)
          return;
        const o = a.getTrackPublication(s.trackSid);
        !o || !o.track || (o.track.streamState = T.streamStateFromProto(s.state), a.emit(D.TrackStreamStateChanged, o, o.track.streamState), this.emitWhenConnected(O.TrackStreamStateChanged, o, o.track.streamState, a));
      });
    }, this.handleSubscriptionPermissionUpdate = (r) => {
      const s = this.participants.get(r.participantSid);
      if (!s)
        return;
      const a = s.getTrackPublication(r.trackSid);
      a && a.setAllowed(r.allowed);
    }, this.handleSubscriptionError = (r) => {
      const s = Array.from(this.participants.values()).find((o) => o.tracks.has(r.trackSid));
      if (!s)
        return;
      const a = s.getTrackPublication(r.trackSid);
      a && a.setSubscriptionError(r.err);
    }, this.handleDataPacket = (r, s) => {
      const a = this.participants.get(r.participantSid);
      this.emit(O.DataReceived, r.payload, a, s, r.topic), a == null || a.emit(D.DataReceived, r.payload, s);
    }, this.handleAudioPlaybackStarted = () => {
      this.canPlaybackAudio || (this.audioEnabled = !0, this.emit(O.AudioPlaybackStatusChanged, !0));
    }, this.handleAudioPlaybackFailed = (r) => {
      g.warn("could not playback audio", r), this.canPlaybackAudio && (this.audioEnabled = !1, this.emit(O.AudioPlaybackStatusChanged, !1));
    }, this.handleDeviceChange = () => k(this, void 0, void 0, function* () {
      this.emit(O.MediaDevicesChanged);
    }), this.handleRoomUpdate = (r) => {
      const s = this.roomInfo;
      this.roomInfo = r, s && s.metadata !== r.metadata && this.emitWhenConnected(O.RoomMetadataChanged, r.metadata), (s == null ? void 0 : s.activeRecording) !== r.activeRecording && this.emitWhenConnected(O.RecordingStatusChanged, r.activeRecording);
    }, this.handleConnectionQualityUpdate = (r) => {
      r.updates.forEach((s) => {
        if (s.participantSid === this.localParticipant.sid) {
          this.localParticipant.setConnectionQuality(s.quality);
          return;
        }
        const a = this.participants.get(s.participantSid);
        a && a.setConnectionQuality(s.quality);
      });
    }, this.onLocalParticipantMetadataChanged = (r) => {
      this.emit(O.ParticipantMetadataChanged, r, this.localParticipant);
    }, this.onLocalParticipantNameChanged = (r) => {
      this.emit(O.ParticipantNameChanged, r, this.localParticipant);
    }, this.onLocalTrackMuted = (r) => {
      this.emit(O.TrackMuted, r, this.localParticipant);
    }, this.onLocalTrackUnmuted = (r) => {
      this.emit(O.TrackUnmuted, r, this.localParticipant);
    }, this.onLocalTrackPublished = (r) => k(this, void 0, void 0, function* () {
      var s;
      this.emit(O.LocalTrackPublished, r, this.localParticipant), r.track instanceof et && (yield r.track.checkForSilence()) && this.emit(O.LocalAudioSilenceDetected, r);
      const a = yield (s = r.track) === null || s === void 0 ? void 0 : s.getDeviceId(), o = oh(r.source);
      o && a && a !== this.localParticipant.activeDeviceMap.get(o) && (this.localParticipant.activeDeviceMap.set(o, a), this.emit(O.ActiveDeviceChanged, o, a));
    }), this.onLocalTrackUnpublished = (r) => {
      this.emit(O.LocalTrackUnpublished, r, this.localParticipant);
    }, this.onLocalConnectionQualityChanged = (r) => {
      this.emit(O.ConnectionQualityChanged, r, this.localParticipant);
    }, this.onMediaDevicesError = (r) => {
      this.emit(O.MediaDevicesError, r);
    }, this.onLocalParticipantPermissionsChanged = (r) => {
      this.emit(O.ParticipantPermissionsChanged, r, this.localParticipant);
    }, this.participants = /* @__PURE__ */ new Map(), this.cachedParticipantSids = [], this.identityToSid = /* @__PURE__ */ new Map(), this.options = Object.assign(Object.assign({}, Vh), t), this.options.audioCaptureDefaults = Object.assign(Object.assign({}, Bh), t == null ? void 0 : t.audioCaptureDefaults), this.options.videoCaptureDefaults = Object.assign(Object.assign({}, Jh), t == null ? void 0 : t.videoCaptureDefaults), this.options.publishDefaults = Object.assign(Object.assign({}, Fh), t == null ? void 0 : t.publishDefaults), this.maybeCreateEngine(), this.disconnectLock = new Ht(), this.localParticipant = new Jo("", "", this.engine, this.options), this.options.videoCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("videoinput", si(this.options.videoCaptureDefaults.deviceId)), this.options.audioCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("audioinput", si(this.options.audioCaptureDefaults.deviceId)), !((n = this.options.audioOutput) === null || n === void 0) && n.deviceId && this.switchActiveDevice("audiooutput", si(this.options.audioOutput.deviceId)), this.options.e2ee && this.setupE2EE();
  }
  /**
   * @experimental
   */
  setE2EEEnabled(t) {
    return k(this, void 0, void 0, function* () {
      if (this.e2eeManager)
        yield Promise.all([this.localParticipant.setE2EEEnabled(t), this.e2eeManager.setParticipantCryptorEnabled(t)]);
      else
        throw Error("e2ee not configured, please set e2ee settings within the room options");
    });
  }
  setupE2EE() {
    var t;
    this.options.e2ee && (this.e2eeManager = new Rh(this.options.e2ee), this.e2eeManager.on(Wi.ParticipantEncryptionStatusChanged, (i, n) => {
      n instanceof Jo && (this.isE2EEEnabled = i), this.emit(O.ParticipantEncryptionStatusChanged, i, n);
    }), this.e2eeManager.on(Wi.Error, (i) => this.emit(O.EncryptionError, i)), (t = this.e2eeManager) === null || t === void 0 || t.setup(this));
  }
  /**
   * if the current room has a participant with `recorder: true` in its JWT grant
   **/
  get isRecording() {
    var t, i;
    return (i = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.activeRecording) !== null && i !== void 0 ? i : !1;
  }
  /** server assigned unique room id */
  get sid() {
    var t, i;
    return (i = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.sid) !== null && i !== void 0 ? i : "";
  }
  /** user assigned name, derived from JWT token */
  get name() {
    var t, i;
    return (i = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.name) !== null && i !== void 0 ? i : "";
  }
  /** room metadata */
  get metadata() {
    var t;
    return (t = this.roomInfo) === null || t === void 0 ? void 0 : t.metadata;
  }
  get numParticipants() {
    var t, i;
    return (i = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.numParticipants) !== null && i !== void 0 ? i : 0;
  }
  get numPublishers() {
    var t, i;
    return (i = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.numPublishers) !== null && i !== void 0 ? i : 0;
  }
  maybeCreateEngine() {
    this.engine && !this.engine.isClosed || (this.engine = new qh(this.options), this.engine.on(U.ParticipantUpdate, this.handleParticipantUpdates).on(U.RoomUpdate, this.handleRoomUpdate).on(U.SpeakersChanged, this.handleSpeakersChanged).on(U.StreamStateChanged, this.handleStreamStateUpdate).on(U.ConnectionQualityUpdate, this.handleConnectionQualityUpdate).on(U.SubscriptionError, this.handleSubscriptionError).on(U.SubscriptionPermissionUpdate, this.handleSubscriptionPermissionUpdate).on(U.MediaTrackAdded, (t, i, n) => {
      this.onTrackAdded(t, i, n);
    }).on(U.Disconnected, (t) => {
      this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, t);
    }).on(U.ActiveSpeakersUpdate, this.handleActiveSpeakersUpdate).on(U.DataPacketReceived, this.handleDataPacket).on(U.Resuming, () => {
      this.clearConnectionReconcile(), this.setAndEmitConnectionState(fe.Reconnecting) && this.emit(O.Reconnecting), this.cachedParticipantSids = Array.from(this.participants.keys());
    }).on(U.Resumed, () => {
      this.setAndEmitConnectionState(fe.Connected), this.emit(O.Reconnected), this.registerConnectionReconcile(), this.updateSubscriptions(), Array.from(this.participants.values()).filter((i) => !this.cachedParticipantSids.includes(i.sid)).forEach((i) => this.emit(O.ParticipantConnected, i)), this.cachedParticipantSids = [];
    }).on(U.SignalResumed, () => {
      this.state === fe.Reconnecting && this.sendSyncState();
    }).on(U.Restarting, this.handleRestarting).on(U.SignalRestarted, this.handleSignalRestarted).on(U.DCBufferStatusChanged, (t, i) => {
      this.emit(O.DCBufferStatusChanged, t, i);
    }), this.localParticipant && this.localParticipant.setupEngine(this.engine), this.e2eeManager && this.e2eeManager.setupEngine(this.engine));
  }
  /**
   * getLocalDevices abstracts navigator.mediaDevices.enumerateDevices.
   * In particular, it handles Chrome's unique behavior of creating `default`
   * devices. When encountered, it'll be removed from the list of devices.
   * The actual default device will be placed at top.
   * @param kind
   * @returns a list of available local devices
   */
  static getLocalDevices(t) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return wt.getInstance().getDevices(t, i);
  }
  /**
   * prepares the connection to the livekit server by sending a HEAD request in order to
   * 1. speed up DNS resolution
   * 2. speed up TLS setup
   * on the actual connection request
   * throws an error if server is not reachable after the request timeout
   * @experimental
   */
  prepareConnection(t) {
    return k(this, void 0, void 0, function* () {
      yield fetch("http".concat(t.substring(2)), {
        method: "HEAD"
      });
    });
  }
  /**
   * retrieves a participant by identity
   * @param identity
   * @returns
   */
  getParticipantByIdentity(t) {
    if (this.localParticipant.identity === t)
      return this.localParticipant;
    const i = this.identityToSid.get(t);
    if (i)
      return this.participants.get(i);
  }
  clearConnectionFutures() {
    this.connectFuture = void 0;
  }
  /**
   * @internal for testing
   */
  simulateScenario(t) {
    return k(this, void 0, void 0, function* () {
      let i = () => {
      }, n;
      switch (t) {
        case "signal-reconnect":
          yield this.engine.client.handleOnClose("simulate disconnect");
          break;
        case "speaker":
          n = St.fromPartial({
            scenario: {
              $case: "speakerUpdate",
              speakerUpdate: 3
            }
          });
          break;
        case "node-failure":
          n = St.fromPartial({
            scenario: {
              $case: "nodeFailure",
              nodeFailure: !0
            }
          });
          break;
        case "server-leave":
          n = St.fromPartial({
            scenario: {
              $case: "serverLeave",
              serverLeave: !0
            }
          });
          break;
        case "migration":
          n = St.fromPartial({
            scenario: {
              $case: "migration",
              migration: !0
            }
          });
          break;
        case "resume-reconnect":
          this.engine.failNext(), yield this.engine.client.handleOnClose("simulate resume-disconnect");
          break;
        case "full-reconnect":
          this.engine.fullReconnectOnNext = !0, yield this.engine.client.handleOnClose("simulate full-reconnect");
          break;
        case "force-tcp":
        case "force-tls":
          n = St.fromPartial({
            scenario: {
              $case: "switchCandidateProtocol",
              switchCandidateProtocol: t === "force-tls" ? 2 : 1
            }
          }), i = () => k(this, void 0, void 0, function* () {
            const r = this.engine.client.onLeave;
            r && r({
              reason: ue.CLIENT_INITIATED,
              canReconnect: !0
            });
          });
          break;
      }
      n && (this.engine.client.sendSimulateScenario(n), i());
    });
  }
  /**
   * Browsers have different policies regarding audio playback. Most requiring
   * some form of user interaction (click/tap/etc).
   * In those cases, audio will be silent until a click/tap triggering one of the following
   * - `startAudio`
   * - `getUserMedia`
   */
  startAudio() {
    return k(this, void 0, void 0, function* () {
      yield this.acquireAudioContext();
      const t = [], i = nn();
      if (i && i.os === "iOS") {
        const n = "livekit-dummy-audio-el";
        let r = document.getElementById(n);
        if (!r) {
          r = document.createElement("audio"), r.id = n, r.autoplay = !0, r.hidden = !0;
          const s = Rr();
          s.enabled = !0, r.srcObject = new MediaStream([s]), document.body.append(r);
        }
        t.push(r);
      }
      this.participants.forEach((n) => {
        n.audioTracks.forEach((r) => {
          r.track && r.track.attachedElements.forEach((s) => {
            t.push(s);
          });
        });
      });
      try {
        yield Promise.all(t.map((n) => (n.muted = !1, n.play()))), this.handleAudioPlaybackStarted();
      } catch (n) {
        throw this.handleAudioPlaybackFailed(n), n;
      }
    });
  }
  /**
   * Returns true if audio playback is enabled
   */
  get canPlaybackAudio() {
    return this.audioEnabled;
  }
  /**
   * Returns the active audio output device used in this room.
   * @return the previously successfully set audio output device ID or an empty string if the default device is used.
   * @deprecated use `getActiveDevice('audiooutput')` instead
   */
  getActiveAudioOutputDevice() {
    var t, i;
    return (i = (t = this.options.audioOutput) === null || t === void 0 ? void 0 : t.deviceId) !== null && i !== void 0 ? i : "";
  }
  getActiveDevice(t) {
    return this.localParticipant.activeDeviceMap.get(t);
  }
  /**
   * Switches all active devices used in this room to the given device.
   *
   * Note: setting AudioOutput is not supported on some browsers. See [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility)
   *
   * @param kind use `videoinput` for camera track,
   *  `audioinput` for microphone track,
   *  `audiooutput` to set speaker for all incoming audio tracks
   * @param deviceId
   */
  switchActiveDevice(t, i) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    var r, s, a;
    return k(this, void 0, void 0, function* () {
      let o = !1, c = !0;
      const d = n ? {
        exact: i
      } : i;
      if (t === "audioinput") {
        const u = this.options.audioCaptureDefaults.deviceId;
        this.options.audioCaptureDefaults.deviceId = d, o = u !== d;
        const l = Array.from(this.localParticipant.audioTracks.values()).filter((h) => h.source === T.Source.Microphone);
        try {
          c = (yield Promise.all(l.map((h) => {
            var f;
            return (f = h.audioTrack) === null || f === void 0 ? void 0 : f.setDeviceId(d);
          }))).every((h) => h === !0);
        } catch (h) {
          throw this.options.audioCaptureDefaults.deviceId = u, h;
        }
      } else if (t === "videoinput") {
        const u = this.options.videoCaptureDefaults.deviceId;
        this.options.videoCaptureDefaults.deviceId = d, o = u !== d;
        const l = Array.from(this.localParticipant.videoTracks.values()).filter((h) => h.source === T.Source.Camera);
        try {
          c = (yield Promise.all(l.map((h) => {
            var f;
            return (f = h.videoTrack) === null || f === void 0 ? void 0 : f.setDeviceId(d);
          }))).every((h) => h === !0);
        } catch (h) {
          throw this.options.videoCaptureDefaults.deviceId = u, h;
        }
      } else if (t === "audiooutput") {
        if (!rs() && !this.options.expWebAudioMix || this.options.expWebAudioMix && this.audioContext && !("setSinkId" in this.audioContext))
          throw new Error("cannot switch audio output, setSinkId not supported");
        (r = (a = this.options).audioOutput) !== null && r !== void 0 || (a.audioOutput = {});
        const u = this.options.audioOutput.deviceId;
        this.options.audioOutput.deviceId = i, o = u !== d;
        try {
          this.options.expWebAudioMix ? (s = this.audioContext) === null || s === void 0 || s.setSinkId(i) : yield Promise.all(Array.from(this.participants.values()).map((l) => l.setAudioOutput({
            deviceId: i
          })));
        } catch (l) {
          throw this.options.audioOutput.deviceId = u, l;
        }
      }
      return o && c && (this.localParticipant.activeDeviceMap.set(t, i), this.emit(O.ActiveDeviceChanged, t, i)), c;
    });
  }
  setupLocalParticipantEvents() {
    this.localParticipant.on(D.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).on(D.ParticipantNameChanged, this.onLocalParticipantNameChanged).on(D.TrackMuted, this.onLocalTrackMuted).on(D.TrackUnmuted, this.onLocalTrackUnmuted).on(D.LocalTrackPublished, this.onLocalTrackPublished).on(D.LocalTrackUnpublished, this.onLocalTrackUnpublished).on(D.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).on(D.MediaDevicesError, this.onMediaDevicesError).on(D.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged);
  }
  recreateEngine() {
    var t;
    (t = this.engine) === null || t === void 0 || t.close(), this.engine = void 0, this.participants.clear(), this.maybeCreateEngine();
  }
  onTrackAdded(t, i, n) {
    if (this.state === fe.Connecting || this.state === fe.Reconnecting) {
      const d = () => {
        this.onTrackAdded(t, i, n), u();
      }, u = () => {
        this.off(O.Reconnected, d), this.off(O.Connected, d), this.off(O.Disconnected, u);
      };
      this.once(O.Reconnected, d), this.once(O.Connected, d), this.once(O.Disconnected, u);
      return;
    }
    if (this.state === fe.Disconnected) {
      g.warn("skipping incoming track after Room disconnected");
      return;
    }
    const r = dh(i.id), s = r[0];
    let a = r[1];
    if ((!a || a === "") && (a = t.id), s === this.localParticipant.sid) {
      g.warn("tried to create RemoteParticipant for local participant");
      return;
    }
    const o = this.getOrCreateParticipant(s);
    let c;
    this.options.adaptiveStream && (typeof this.options.adaptiveStream == "object" ? c = this.options.adaptiveStream : c = {}), o.addSubscribedMediaTrack(t, a, i, n, c);
  }
  handleDisconnect() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, i = arguments.length > 1 ? arguments[1] : void 0;
    var n;
    if (this.clearConnectionReconcile(), this.state !== fe.Disconnected)
      try {
        this.participants.forEach((r) => {
          r.tracks.forEach((s) => {
            r.unpublishTrack(s.trackSid);
          });
        }), this.localParticipant.tracks.forEach((r) => {
          var s, a;
          r.track && this.localParticipant.unpublishTrack(r.track, t), t && ((s = r.track) === null || s === void 0 || s.detach(), (a = r.track) === null || a === void 0 || a.stop());
        }), this.localParticipant.off(D.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).off(D.ParticipantNameChanged, this.onLocalParticipantNameChanged).off(D.TrackMuted, this.onLocalTrackMuted).off(D.TrackUnmuted, this.onLocalTrackUnmuted).off(D.LocalTrackPublished, this.onLocalTrackPublished).off(D.LocalTrackUnpublished, this.onLocalTrackUnpublished).off(D.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).off(D.MediaDevicesError, this.onMediaDevicesError).off(D.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged), this.localParticipant.tracks.clear(), this.localParticipant.videoTracks.clear(), this.localParticipant.audioTracks.clear(), this.participants.clear(), this.activeSpeakers = [], this.audioContext && typeof this.options.expWebAudioMix == "boolean" && (this.audioContext.close(), this.audioContext = void 0), ze() && (window.removeEventListener("beforeunload", this.onPageLeave), window.removeEventListener("pagehide", this.onPageLeave), window.removeEventListener("freeze", this.onPageLeave), (n = navigator.mediaDevices) === null || n === void 0 || n.removeEventListener("devicechange", this.handleDeviceChange));
      } finally {
        this.setAndEmitConnectionState(fe.Disconnected), this.emit(O.Disconnected, i);
      }
  }
  handleParticipantDisconnected(t, i) {
    this.participants.delete(t), i && (this.identityToSid.delete(i.identity), i.tracks.forEach((n) => {
      i.unpublishTrack(n.trackSid, !0);
    }), this.emit(O.ParticipantDisconnected, i));
  }
  acquireAudioContext() {
    var t, i;
    return k(this, void 0, void 0, function* () {
      if (typeof this.options.expWebAudioMix != "boolean" && this.options.expWebAudioMix.audioContext ? this.audioContext = this.options.expWebAudioMix.audioContext : (!this.audioContext || this.audioContext.state === "closed") && (this.audioContext = (t = ad()) !== null && t !== void 0 ? t : void 0), this.audioContext && this.audioContext.state === "suspended")
        try {
          yield this.audioContext.resume();
        } catch (r) {
          g.warn(r);
        }
      this.options.expWebAudioMix && this.participants.forEach((r) => r.setAudioContext(this.audioContext));
      const n = ((i = this.audioContext) === null || i === void 0 ? void 0 : i.state) === "running";
      n !== this.canPlaybackAudio && (this.audioEnabled = n, this.emit(O.AudioPlaybackStatusChanged, n));
    });
  }
  createParticipant(t, i) {
    let n;
    return i ? n = Pn.fromParticipantInfo(this.engine.client, i) : n = new Pn(this.engine.client, t, "", void 0, void 0), this.options.expWebAudioMix && n.setAudioContext(this.audioContext), n;
  }
  getOrCreateParticipant(t, i) {
    if (this.participants.has(t))
      return this.participants.get(t);
    const n = this.createParticipant(t, i);
    return this.participants.set(t, n), i && (this.identityToSid.set(i.identity, i.sid), this.emitWhenConnected(O.ParticipantConnected, n)), n.on(D.TrackPublished, (r) => {
      this.emitWhenConnected(O.TrackPublished, r, n);
    }).on(D.TrackSubscribed, (r, s) => {
      r.kind === T.Kind.Audio && (r.on(N.AudioPlaybackStarted, this.handleAudioPlaybackStarted), r.on(N.AudioPlaybackFailed, this.handleAudioPlaybackFailed)), this.emit(O.TrackSubscribed, r, s, n);
    }).on(D.TrackUnpublished, (r) => {
      this.emit(O.TrackUnpublished, r, n);
    }).on(D.TrackUnsubscribed, (r, s) => {
      this.emit(O.TrackUnsubscribed, r, s, n);
    }).on(D.TrackSubscriptionFailed, (r) => {
      this.emit(O.TrackSubscriptionFailed, r, n);
    }).on(D.TrackMuted, (r) => {
      this.emitWhenConnected(O.TrackMuted, r, n);
    }).on(D.TrackUnmuted, (r) => {
      this.emitWhenConnected(O.TrackUnmuted, r, n);
    }).on(D.ParticipantMetadataChanged, (r) => {
      this.emitWhenConnected(O.ParticipantMetadataChanged, r, n);
    }).on(D.ParticipantNameChanged, (r) => {
      this.emitWhenConnected(O.ParticipantNameChanged, r, n);
    }).on(D.ConnectionQualityChanged, (r) => {
      this.emitWhenConnected(O.ConnectionQualityChanged, r, n);
    }).on(D.ParticipantPermissionsChanged, (r) => {
      this.emitWhenConnected(O.ParticipantPermissionsChanged, r, n);
    }).on(D.TrackSubscriptionStatusChanged, (r, s) => {
      this.emitWhenConnected(O.TrackSubscriptionStatusChanged, r, s, n);
    }).on(D.TrackSubscriptionFailed, (r, s) => {
      this.emit(O.TrackSubscriptionFailed, r, n, s);
    }).on(D.TrackSubscriptionPermissionChanged, (r, s) => {
      this.emitWhenConnected(O.TrackSubscriptionPermissionChanged, r, s, n);
    }), i && n.updateInfo(i), n;
  }
  sendSyncState() {
    var t, i;
    if (this.engine.subscriber === void 0 || this.engine.subscriber.pc.localDescription === null)
      return;
    const n = this.engine.subscriber.pc.localDescription, r = this.engine.subscriber.pc.remoteDescription, s = (i = (t = this.connOptions) === null || t === void 0 ? void 0 : t.autoSubscribe) !== null && i !== void 0 ? i : !0, a = new Array();
    this.participants.forEach((o) => {
      o.tracks.forEach((c) => {
        c.isDesired !== s && a.push(c.trackSid);
      });
    }), this.engine.client.sendSyncState({
      answer: Xn({
        sdp: n.sdp,
        type: n.type
      }),
      offer: r ? Xn({
        sdp: r.sdp,
        type: r.type
      }) : void 0,
      subscription: {
        trackSids: a,
        subscribe: !s,
        participantTracks: []
      },
      publishTracks: this.localParticipant.publishedTracksInfo(),
      dataChannels: this.localParticipant.dataChannelsInfo()
    });
  }
  /**
   * After resuming, we'll need to notify the server of the current
   * subscription settings.
   */
  updateSubscriptions() {
    for (const t of this.participants.values())
      for (const i of t.videoTracks.values())
        i.isSubscribed && i instanceof _d && i.emitTrackUpdate();
  }
  registerConnectionReconcile() {
    this.clearConnectionReconcile();
    let t = 0;
    this.connectionReconcileInterval = Be.setInterval(() => {
      // ensure we didn't tear it down
      !this.engine || // engine detected close, but Room missed it
      this.engine.isClosed || // transports failed without notifying engine
      !this.engine.verifyTransport() ? (t++, g.warn("detected connection state mismatch", {
        numFailures: t
      }), t >= 3 && (this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, ue.STATE_MISMATCH))) : t = 0;
    }, af);
  }
  clearConnectionReconcile() {
    this.connectionReconcileInterval && Be.clearInterval(this.connectionReconcileInterval);
  }
  setAndEmitConnectionState(t) {
    return t === this.state ? !1 : (this.state = t, this.emit(O.ConnectionStateChanged, this.state), !0);
  }
  emitWhenConnected(t) {
    if (this.state === fe.Connected) {
      for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
        n[r - 1] = arguments[r];
      return this.emit(t, ...n);
    }
    return !1;
  }
  /**
   * Allows to populate a room with simulated participants.
   * No actual connection to a server will be established, all state is
   * @experimental
   */
  simulateParticipants(t) {
    var i, n;
    return k(this, void 0, void 0, function* () {
      const r = Object.assign({
        audio: !0,
        video: !0,
        useRealTracks: !1
      }, t.publish), s = Object.assign({
        count: 9,
        audio: !1,
        video: !0,
        aspectRatios: [1.66, 1.7, 1.3]
      }, t.participants);
      if (this.handleDisconnect(), this.roomInfo = {
        sid: "RM_SIMULATED",
        name: "simulated-room",
        emptyTimeout: 0,
        maxParticipants: 0,
        creationTime: (/* @__PURE__ */ new Date()).getTime(),
        metadata: "",
        numParticipants: 1,
        numPublishers: 1,
        turnPassword: "",
        enabledCodecs: [],
        activeRecording: !1
      }, this.localParticipant.updateInfo(Oe.fromPartial({
        identity: "simulated-local",
        name: "local-name"
      })), this.setupLocalParticipantEvents(), this.emit(O.SignalConnected), this.emit(O.Connected), this.setAndEmitConnectionState(fe.Connected), r.video) {
        const a = new jn(T.Kind.Video, Je.fromPartial({
          source: ie.CAMERA,
          sid: Math.floor(Math.random() * 1e4).toString(),
          type: be.AUDIO,
          name: "video-dummy"
        }), new Ye(r.useRealTracks ? (yield window.navigator.mediaDevices.getUserMedia({
          video: !0
        })).getVideoTracks()[0] : Eo((i = 160 * s.aspectRatios[0]) !== null && i !== void 0 ? i : 1, 160, !0, !0)));
        this.localParticipant.addTrackPublication(a), this.localParticipant.emit(D.LocalTrackPublished, a);
      }
      if (r.audio) {
        const a = new jn(T.Kind.Audio, Je.fromPartial({
          source: ie.MICROPHONE,
          sid: Math.floor(Math.random() * 1e4).toString(),
          type: be.AUDIO
        }), new et(r.useRealTracks ? (yield navigator.mediaDevices.getUserMedia({
          audio: !0
        })).getAudioTracks()[0] : Rr()));
        this.localParticipant.addTrackPublication(a), this.localParticipant.emit(D.LocalTrackPublished, a);
      }
      for (let a = 0; a < s.count - 1; a += 1) {
        let o = Oe.fromPartial({
          sid: Math.floor(Math.random() * 1e4).toString(),
          identity: "simulated-".concat(a),
          state: Ge.ACTIVE,
          tracks: [],
          joinedAt: Date.now()
        });
        const c = this.getOrCreateParticipant(o.identity, o);
        if (s.video) {
          const d = Eo((n = 160 * s.aspectRatios[a % s.aspectRatios.length]) !== null && n !== void 0 ? n : 1, 160, !1, !0), u = Je.fromPartial({
            source: ie.CAMERA,
            sid: Math.floor(Math.random() * 1e4).toString(),
            type: be.AUDIO
          });
          c.addSubscribedMediaTrack(d, u.sid, new MediaStream([d])), o.tracks = [...o.tracks, u];
        }
        if (s.audio) {
          const d = Rr(), u = Je.fromPartial({
            source: ie.MICROPHONE,
            sid: Math.floor(Math.random() * 1e4).toString(),
            type: be.AUDIO
          });
          c.addSubscribedMediaTrack(d, u.sid, new MediaStream([d])), o.tracks = [...o.tracks, u];
        }
        c.updateInfo(o);
      }
    });
  }
  // /** @internal */
  emit(t) {
    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      n[r - 1] = arguments[r];
    return t !== O.ActiveSpeakersChanged && g.debug("room event ".concat(t), {
      event: t,
      args: n
    }), super.emit(t, ...n);
  }
}
var Vo;
(function(e) {
  e[e.IDLE = 0] = "IDLE", e[e.RUNNING = 1] = "RUNNING", e[e.SKIPPED = 2] = "SKIPPED", e[e.SUCCESS = 3] = "SUCCESS", e[e.FAILED = 4] = "FAILED";
})(Vo || (Vo = {}));
var cf = Object.defineProperty, df = Object.getOwnPropertyDescriptor, qt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? df(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && cf(t, i, r), r;
};
let bt = class extends hn {
  constructor() {
    super(...arguments), this.users = {}, this._throttledDispatchMouseMove = uf(
      this._dispatchMouseMove.bind(this),
      // 15 // 15ms throttle interval = ~66.6 fps
      // 10 // 10ms throttle interval = 100 fps
      8
      // 8ms throttle interval = 125 fps
    );
  }
  render() {
    var e, t;
    return $s`
      <div id="users-container">
        ${Object.values(this.users).map(
      (i) => {
        var n;
        return $s`
              <div
                id="user-${i.id}"
                class="user"
                data-isself="${i.id == ((n = this.me) == null ? void 0 : n.id)}"
                style="--color: ${i.color}; --x: ${i.x}vw; --y: ${i.y}vh;"
              >
                <svg
                  width="23"
                  viewBox="0 0 27 24"
                  fill="currentColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  class="cursor"
                >
                  <path
                    d="M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z"
                  />
                </svg>
                <span class="name">${i.name}</span>
                <div
                  class="halo"
                  data-show="${i.is_mouse_down || i.is_escape_key_down}"
                />
              </div>
            `;
      }
    )}
      </div>

      <div class="banner" style="--color: ${(e = this.me) == null ? void 0 : e.color}">
        <div class="pills">
          <video id="local-video"></video>

          <div class="infos">
            <div class="current_user">
              <span class="colorpoint"></span>
              <p class="name">${(t = this.me) == null ? void 0 : t.name}</p>
            </div>

            <div class="other_users">
              <span>${Object.values(this.users).length}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                />
              </svg>
            </div>
          </div>

          <video id="admin-video"></video>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    const e = new qu({
      url: this.url,
      topic: `liveroom-livestate:${this.room_id}`,
      params: {
        room_id: this.room_id,
        current_url: window.origin,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight
      }
    });
    Gu(e, this, {
      properties: ["room_id", "me", "users", "livekit_ws_url", "livekit_token"],
      events: {
        send: [
          "mouse_move",
          "mouse_down",
          "mouse_up",
          "key_down",
          "key_up",
          "window_resize"
        ],
        receive: []
      }
    }), this.liveState = e, window.addEventListener("mousemove", this._throttledDispatchMouseMove), window.addEventListener("mousedown", this._dispatchMouseDown.bind(this)), window.addEventListener("mouseup", this._dispatchMouseUp.bind(this)), window.addEventListener("keydown", this._dispatchKeyDown.bind(this)), window.addEventListener("keyup", this._dispatchKeyUp.bind(this)), window.addEventListener("resize", this._dispatchWindowResize.bind(this));
  }
  disconnectedCallback() {
    var e, t;
    window.removeEventListener("resize", this._dispatchWindowResize.bind(this)), window.removeEventListener("keyup", this._dispatchKeyUp.bind(this)), window.removeEventListener("keydown", this._dispatchKeyDown.bind(this)), window.removeEventListener("mouseup", this._dispatchMouseUp.bind(this)), window.removeEventListener("mousedown", this._dispatchMouseDown.bind(this)), window.removeEventListener("mousemove", this._throttledDispatchMouseMove), (e = this.liveState) == null || e.disconnect(), (t = this.livekitRoom) == null || t.disconnect(), super.disconnectedCallback();
  }
  updated(e) {
    (e.has("livekit_ws_url") || e.has("livekit_token")) && this.livekit_ws_url && this.livekit_token && this._setupLiveKit();
  }
  _dispatchMouseMove(e) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_move", {
        detail: {
          user_id: this.me.id,
          x: Number(e.pageX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(e.pageY / window.innerHeight * 100).toFixed(2)
          // in %
        }
      })
    );
  }
  _dispatchMouseDown(e) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_down", {
        detail: {
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchMouseUp(e) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_up", {
        detail: {
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchKeyDown(e) {
    !e.repeat && Ho.includes(e.key) && this.me && this.dispatchEvent(
      new CustomEvent("key_down", {
        detail: {
          key: e.key,
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchKeyUp(e) {
    Ho.includes(e.key) && this.me && this.dispatchEvent(
      new CustomEvent("key_up", {
        detail: {
          key: e.key,
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchWindowResize(e) {
    this.me && this.dispatchEvent(
      new CustomEvent("window_resize", {
        detail: {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
          user_id: this.me.id
        }
      })
    );
  }
  async _setupLiveKit() {
    if (this.livekitRoom = new of({ dynacast: !0 }).on(
      O.TrackSubscribed,
      async (e, t, i) => {
        switch (console.log(
          "[LiveKit] Track Subscribed",
          e,
          t,
          i
        ), console.table({
          identity: i.identity,
          source: t.source
        }), t.source) {
          case T.Source.Camera: {
            const n = await this._adminVideoEl;
            n && (console.log(
              `[LiveKit] Attaching admin user camera (identity ${i.identity})`
            ), e.attach(n));
            break;
          }
        }
      }
    ), !this.livekit_ws_url)
      throw new Error("LiveKit websocket URL not set");
    if (!this.livekit_token)
      throw new Error("LiveKit token not set");
    await this.livekitRoom.connect(this.livekit_ws_url, this.livekit_token, {
      autoSubscribe: !0
    }), console.log("[LiveKit] Connected to room", this.livekitRoom.name), await Promise.all([
      this.livekitRoom.localParticipant.enableCameraAndMicrophone().then(() => console.log("[LiveKit] Local camera & mic enabled")).then(async () => {
        var n, r, s, a;
        const e = await this._localVideoEl, t = (s = (r = (n = this.livekitRoom) == null ? void 0 : n.localParticipant) == null ? void 0 : r.videoTracks) == null ? void 0 : s.values(), i = t && ((a = Array.from(t)[0]) == null ? void 0 : a.track);
        e && i && (console.log("[LiveKit] Attaching local user camera"), i.attach(e));
      }),
      this.livekitRoom.localParticipant.setScreenShareEnabled(!0, {
        audio: !1,
        selfBrowserSurface: "include",
        surfaceSwitching: "exclude",
        systemAudio: "exclude"
      }).then(() => console.log("[LiveKit] Local screen share enabled"))
    ]);
  }
};
bt.styles = wd`
    #users-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .user {
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      user-select: none;
      transform: translate(var(--x), var(--y));
    }

    .user .cursor {
      position: absolute;
      top: 0;
      left: 0;
      color: var(--color);
      transform-origin: top left;
      transform: rotate(6deg);
    }
    .user[data-isself="true"] .cursor {
      display: none;
    }

    .user .name {
      position: absolute;
      top: 20px;
      left: 16px;
      padding: 4px 10px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: black;
      background-color: var(--color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 9999px;
      // Tailwind 'shadow-sm'
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    .user[data-isself="true"] .name {
      display: none;
    }

    .user .halo {
      transform: scale(0);
      z-index: -1;
      position: absolute;
      top: -60px;
      left: -60px;
      width: 120px;
      height: 120px;
      border-radius: 9999px;
      background-color: var(--color);
      opacity: 0.25;
      transition: transform 0.15s ease-out;
      // Tailwind 'shadow-sm'
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    .user .halo[data-show="true"] {
      transform: scale(1);
    }

    .banner {
      z-index: 1000;
      position: fixed;
      bottom: 12px;
      inset-inline: 0;
      display: flex;
      justify-content: center;
      justify-items: center;
    }

    .banner .pills {
      display: flex;
      justify-content: between;
      align-items: center;
      gap: 36px;
      padding: 1px 5px;
      background-color: white;
      border-radius: 9999px;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    .banner .pills .infos {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3px;
      padding: 2px 0;
    }

    .banner .pills .current_user {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    .banner .pills .current_user .colorpoint {
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      background-color: var(--color);
    }
    .banner .pills .current_user .name {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      color: black;
    }

    .banner .pills .other_users {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      color: gray;
    }
    .banner .pills .other_users span {
      font-size: 12px;
      font-weight: bold;
    }
    .banner .pills .other_users svg {
      width: 16px;
      opacity: 0.8;
    }

    .banner .pills #local-video {
      width: 75px;
      aspect-ratio: 16 / 9;
      border-radius: 9999px;
      background-color: lightgrey;
    }
    .banner .pills #admin-video {
      width: 75px;
      aspect-ratio: 16 / 9;
      border-radius: 9999px;
      background-color: lightgrey;
    }
  `;
qt([
  ds({ attribute: "url" })
], bt.prototype, "url", 2);
qt([
  ds({ attribute: "room_id" })
], bt.prototype, "room_id", 2);
qt([
  tr()
], bt.prototype, "me", 2);
qt([
  tr()
], bt.prototype, "users", 2);
qt([
  tr()
], bt.prototype, "livekit_ws_url", 2);
qt([
  tr()
], bt.prototype, "livekit_token", 2);
qt([
  Ko("video#local-video")
], bt.prototype, "_localVideoEl", 2);
qt([
  Ko("video#admin-video")
], bt.prototype, "_adminVideoEl", 2);
bt = qt([
  Jd("liveroom-client-element")
], bt);
const Ho = ["Escape"];
function uf(e, t) {
  let i = 0;
  return function(...n) {
    let r = Date.now();
    if (r - i > t)
      return i = r, e.apply(this, n);
  };
}
export {
  bt as LiveroomClientElement
};
