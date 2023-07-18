var Xe = Object.defineProperty;
var Ke = (n, s, t) => s in n ? Xe(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
var g = (n, s, t) => (Ke(n, typeof s != "symbol" ? s + "" : s, t), t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = window, Lt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = Symbol(), Qt = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(s, t, e) {
    if (this._$cssResult$ = !0, e !== Ut)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = t;
  }
  get styleSheet() {
    let s = this.o;
    const t = this.t;
    if (Lt && s === void 0) {
      const e = t !== void 0 && t.length === 1;
      e && (s = Qt.get(t)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), e && Qt.set(t, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
};
const Ye = (n) => new ve(typeof n == "string" ? n : n + "", void 0, Ut), Ze = (n, ...s) => {
  const t = n.length === 1 ? n[0] : s.reduce((e, i, r) => e + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new ve(t, n, Ut);
}, Qe = (n, s) => {
  Lt ? n.adoptedStyleSheets = s.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : s.forEach((t) => {
    const e = document.createElement("style"), i = dt.litNonce;
    i !== void 0 && e.setAttribute("nonce", i), e.textContent = t.cssText, n.appendChild(e);
  });
}, te = Lt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((s) => {
  let t = "";
  for (const e of s.cssRules)
    t += e.cssText;
  return Ye(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $t;
const vt = window, ee = vt.trustedTypes, ts = ee ? ee.emptyScript : "", se = vt.reactiveElementPolyfillSupport, Mt = { toAttribute(n, s) {
  switch (s) {
    case Boolean:
      n = n ? ts : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, s) {
  let t = n;
  switch (s) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, ge = (n, s) => s !== n && (s == s || n == n), Ct = { attribute: !0, type: String, converter: Mt, reflect: !1, hasChanged: ge };
let q = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(s) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(s);
  }
  static get observedAttributes() {
    this.finalize();
    const s = [];
    return this.elementProperties.forEach((t, e) => {
      const i = this._$Ep(e, t);
      i !== void 0 && (this._$Ev.set(i, e), s.push(i));
    }), s;
  }
  static createProperty(s, t = Ct) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(s, t), !t.noAccessor && !this.prototype.hasOwnProperty(s)) {
      const e = typeof s == "symbol" ? Symbol() : "__" + s, i = this.getPropertyDescriptor(s, e, t);
      i !== void 0 && Object.defineProperty(this.prototype, s, i);
    }
  }
  static getPropertyDescriptor(s, t, e) {
    return { get() {
      return this[t];
    }, set(i) {
      const r = this[s];
      this[t] = i, this.requestUpdate(s, r, e);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) || Ct;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const s = Object.getPrototypeOf(this);
    if (s.finalize(), s.h !== void 0 && (this.h = [...s.h]), this.elementProperties = new Map(s.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, e = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const i of e)
        this.createProperty(i, t[i]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(s) {
    const t = [];
    if (Array.isArray(s)) {
      const e = new Set(s.flat(1 / 0).reverse());
      for (const i of e)
        t.unshift(te(i));
    } else
      s !== void 0 && t.push(te(s));
    return t;
  }
  static _$Ep(s, t) {
    const e = t.attribute;
    return e === !1 ? void 0 : typeof e == "string" ? e : typeof s == "string" ? s.toLowerCase() : void 0;
  }
  u() {
    var s;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (s = this.constructor.h) === null || s === void 0 || s.forEach((t) => t(this));
  }
  addController(s) {
    var t, e;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(s), this.renderRoot !== void 0 && this.isConnected && ((e = s.hostConnected) === null || e === void 0 || e.call(s));
  }
  removeController(s) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(s) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((s, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var s;
    const t = (s = this.shadowRoot) !== null && s !== void 0 ? s : this.attachShadow(this.constructor.shadowRootOptions);
    return Qe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var s;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (s = this._$ES) === null || s === void 0 || s.forEach((t) => {
      var e;
      return (e = t.hostConnected) === null || e === void 0 ? void 0 : e.call(t);
    });
  }
  enableUpdating(s) {
  }
  disconnectedCallback() {
    var s;
    (s = this._$ES) === null || s === void 0 || s.forEach((t) => {
      var e;
      return (e = t.hostDisconnected) === null || e === void 0 ? void 0 : e.call(t);
    });
  }
  attributeChangedCallback(s, t, e) {
    this._$AK(s, e);
  }
  _$EO(s, t, e = Ct) {
    var i;
    const r = this.constructor._$Ep(s, e);
    if (r !== void 0 && e.reflect === !0) {
      const o = (((i = e.converter) === null || i === void 0 ? void 0 : i.toAttribute) !== void 0 ? e.converter : Mt).toAttribute(t, e.type);
      this._$El = s, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(s, t) {
    var e;
    const i = this.constructor, r = i._$Ev.get(s);
    if (r !== void 0 && this._$El !== r) {
      const o = i.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((e = o.converter) === null || e === void 0 ? void 0 : e.fromAttribute) !== void 0 ? o.converter : Mt;
      this._$El = r, this[r] = l.fromAttribute(t, o.type), this._$El = null;
    }
  }
  requestUpdate(s, t, e) {
    let i = !0;
    s !== void 0 && (((e = e || this.constructor.getPropertyOptions(s)).hasChanged || ge)(this[s], t) ? (this._$AL.has(s) || this._$AL.set(s, t), e.reflect === !0 && this._$El !== s && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(s, e))) : i = !1), !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const s = this.scheduleUpdate();
    return s != null && await s, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((i, r) => this[r] = i), this._$Ei = void 0);
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$ES) === null || s === void 0 || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) === null || r === void 0 ? void 0 : r.call(i);
      }), this.update(e)) : this._$Ek();
    } catch (i) {
      throw t = !1, this._$Ek(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(s) {
  }
  _$AE(s) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostUpdated) === null || i === void 0 ? void 0 : i.call(e);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(s)), this.updated(s);
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
  shouldUpdate(s) {
    return !0;
  }
  update(s) {
    this._$EC !== void 0 && (this._$EC.forEach((t, e) => this._$EO(e, this[e], t)), this._$EC = void 0), this._$Ek();
  }
  updated(s) {
  }
  firstUpdated(s) {
  }
};
q.finalized = !0, q.elementProperties = /* @__PURE__ */ new Map(), q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, se == null || se({ ReactiveElement: q }), (($t = vt.reactiveElementVersions) !== null && $t !== void 0 ? $t : vt.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Tt;
const gt = window, X = gt.trustedTypes, ne = X ? X.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Rt = "$lit$", I = `lit$${(Math.random() + "").slice(9)}$`, ye = "?" + I, es = `<${ye}>`, J = document, it = () => J.createComment(""), rt = (n) => n === null || typeof n != "object" && typeof n != "function", me = Array.isArray, ss = (n) => me(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", kt = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, re = />/g, V = RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ae = /"/g, _e = /^(?:script|style|textarea|title)$/i, ns = (n) => (s, ...t) => ({ _$litType$: n, strings: s, values: t }), he = ns(1), K = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), le = /* @__PURE__ */ new WeakMap(), z = J.createTreeWalker(J, 129, null, !1), is = (n, s) => {
  const t = n.length - 1, e = [];
  let i, r = s === 2 ? "<svg>" : "", o = Q;
  for (let u = 0; u < t; u++) {
    const d = n[u];
    let C, y, $ = -1, x = 0;
    for (; x < d.length && (o.lastIndex = x, y = o.exec(d), y !== null); )
      x = o.lastIndex, o === Q ? y[1] === "!--" ? o = ie : y[1] !== void 0 ? o = re : y[2] !== void 0 ? (_e.test(y[2]) && (i = RegExp("</" + y[2], "g")), o = V) : y[3] !== void 0 && (o = V) : o === V ? y[0] === ">" ? (o = i ?? Q, $ = -1) : y[1] === void 0 ? $ = -2 : ($ = o.lastIndex - y[2].length, C = y[1], o = y[3] === void 0 ? V : y[3] === '"' ? ae : oe) : o === ae || o === oe ? o = V : o === ie || o === re ? o = Q : (o = V, i = void 0);
    const W = o === V && n[u + 1].startsWith("/>") ? " " : "";
    r += o === Q ? d + es : $ >= 0 ? (e.push(C), d.slice(0, $) + Rt + d.slice($) + I + W) : d + I + ($ === -2 ? (e.push(void 0), u) : W);
  }
  const l = r + (n[t] || "<?>") + (s === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ne !== void 0 ? ne.createHTML(l) : l, e];
};
class ot {
  constructor({ strings: s, _$litType$: t }, e) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = s.length - 1, u = this.parts, [d, C] = is(s, t);
    if (this.el = ot.createElement(d, e), z.currentNode = this.el.content, t === 2) {
      const y = this.el.content, $ = y.firstChild;
      $.remove(), y.append(...$.childNodes);
    }
    for (; (i = z.nextNode()) !== null && u.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const y = [];
          for (const $ of i.getAttributeNames())
            if ($.endsWith(Rt) || $.startsWith(I)) {
              const x = C[o++];
              if (y.push($), x !== void 0) {
                const W = i.getAttribute(x.toLowerCase() + Rt).split(I), H = /([.?@])?(.*)/.exec(x);
                u.push({ type: 1, index: r, name: H[2], strings: W, ctor: H[1] === "." ? os : H[1] === "?" ? hs : H[1] === "@" ? ls : _t });
              } else
                u.push({ type: 6, index: r });
            }
          for (const $ of y)
            i.removeAttribute($);
        }
        if (_e.test(i.tagName)) {
          const y = i.textContent.split(I), $ = y.length - 1;
          if ($ > 0) {
            i.textContent = X ? X.emptyScript : "";
            for (let x = 0; x < $; x++)
              i.append(y[x], it()), z.nextNode(), u.push({ type: 2, index: ++r });
            i.append(y[$], it());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === ye)
          u.push({ type: 2, index: r });
        else {
          let y = -1;
          for (; (y = i.data.indexOf(I, y + 1)) !== -1; )
            u.push({ type: 7, index: r }), y += I.length - 1;
        }
      r++;
    }
  }
  static createElement(s, t) {
    const e = J.createElement("template");
    return e.innerHTML = s, e;
  }
}
function Y(n, s, t = n, e) {
  var i, r, o, l;
  if (s === K)
    return s;
  let u = e !== void 0 ? (i = t._$Co) === null || i === void 0 ? void 0 : i[e] : t._$Cl;
  const d = rt(s) ? void 0 : s._$litDirective$;
  return (u == null ? void 0 : u.constructor) !== d && ((r = u == null ? void 0 : u._$AO) === null || r === void 0 || r.call(u, !1), d === void 0 ? u = void 0 : (u = new d(n), u._$AT(n, t, e)), e !== void 0 ? ((o = (l = t)._$Co) !== null && o !== void 0 ? o : l._$Co = [])[e] = u : t._$Cl = u), u !== void 0 && (s = Y(n, u._$AS(n, s.values), u, e)), s;
}
class rs {
  constructor(s, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = s, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(s) {
    var t;
    const { el: { content: e }, parts: i } = this._$AD, r = ((t = s == null ? void 0 : s.creationScope) !== null && t !== void 0 ? t : J).importNode(e, !0);
    z.currentNode = r;
    let o = z.nextNode(), l = 0, u = 0, d = i[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let C;
        d.type === 2 ? C = new ht(o, o.nextSibling, this, s) : d.type === 1 ? C = new d.ctor(o, d.name, d.strings, this, s) : d.type === 6 && (C = new cs(o, this, s)), this._$AV.push(C), d = i[++u];
      }
      l !== (d == null ? void 0 : d.index) && (o = z.nextNode(), l++);
    }
    return z.currentNode = J, r;
  }
  v(s) {
    let t = 0;
    for (const e of this._$AV)
      e !== void 0 && (e.strings !== void 0 ? (e._$AI(s, e, t), t += e.strings.length - 2) : e._$AI(s[t])), t++;
  }
}
class ht {
  constructor(s, t, e, i) {
    var r;
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = s, this._$AB = t, this._$AM = e, this.options = i, this._$Cp = (r = i == null ? void 0 : i.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var s, t;
    return (t = (s = this._$AM) === null || s === void 0 ? void 0 : s._$AU) !== null && t !== void 0 ? t : this._$Cp;
  }
  get parentNode() {
    let s = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (s == null ? void 0 : s.nodeType) === 11 && (s = t.parentNode), s;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(s, t = this) {
    s = Y(this, s, t), rt(s) ? s === O || s == null || s === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : s !== this._$AH && s !== K && this._(s) : s._$litType$ !== void 0 ? this.g(s) : s.nodeType !== void 0 ? this.$(s) : ss(s) ? this.T(s) : this._(s);
  }
  k(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  $(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.k(s));
  }
  _(s) {
    this._$AH !== O && rt(this._$AH) ? this._$AA.nextSibling.data = s : this.$(J.createTextNode(s)), this._$AH = s;
  }
  g(s) {
    var t;
    const { values: e, _$litType$: i } = s, r = typeof i == "number" ? this._$AC(s) : (i.el === void 0 && (i.el = ot.createElement(i.h, this.options)), i);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === r)
      this._$AH.v(e);
    else {
      const o = new rs(r, this), l = o.u(this.options);
      o.v(e), this.$(l), this._$AH = o;
    }
  }
  _$AC(s) {
    let t = le.get(s.strings);
    return t === void 0 && le.set(s.strings, t = new ot(s)), t;
  }
  T(s) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let e, i = 0;
    for (const r of s)
      i === t.length ? t.push(e = new ht(this.k(it()), this.k(it()), this, this.options)) : e = t[i], e._$AI(r), i++;
    i < t.length && (this._$AR(e && e._$AB.nextSibling, i), t.length = i);
  }
  _$AR(s = this._$AA.nextSibling, t) {
    var e;
    for ((e = this._$AP) === null || e === void 0 || e.call(this, !1, !0, t); s && s !== this._$AB; ) {
      const i = s.nextSibling;
      s.remove(), s = i;
    }
  }
  setConnected(s) {
    var t;
    this._$AM === void 0 && (this._$Cp = s, (t = this._$AP) === null || t === void 0 || t.call(this, s));
  }
}
class _t {
  constructor(s, t, e, i, r) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = s, this.name = t, this._$AM = i, this.options = r, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = O;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s, t = this, e, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      s = Y(this, s, t, 0), o = !rt(s) || s !== this._$AH && s !== K, o && (this._$AH = s);
    else {
      const l = s;
      let u, d;
      for (s = r[0], u = 0; u < r.length - 1; u++)
        d = Y(this, l[e + u], t, u), d === K && (d = this._$AH[u]), o || (o = !rt(d) || d !== this._$AH[u]), d === O ? s = O : s !== O && (s += (d ?? "") + r[u + 1]), this._$AH[u] = d;
    }
    o && !i && this.j(s);
  }
  j(s) {
    s === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
}
class os extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === O ? void 0 : s;
  }
}
const as = X ? X.emptyScript : "";
class hs extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    s && s !== O ? this.element.setAttribute(this.name, as) : this.element.removeAttribute(this.name);
  }
}
class ls extends _t {
  constructor(s, t, e, i, r) {
    super(s, t, e, i, r), this.type = 5;
  }
  _$AI(s, t = this) {
    var e;
    if ((s = (e = Y(this, s, t, 0)) !== null && e !== void 0 ? e : O) === K)
      return;
    const i = this._$AH, r = s === O && i !== O || s.capture !== i.capture || s.once !== i.once || s.passive !== i.passive, o = s !== O && (i === O || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    var t, e;
    typeof this._$AH == "function" ? this._$AH.call((e = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && e !== void 0 ? e : this.element, s) : this._$AH.handleEvent(s);
  }
}
class cs {
  constructor(s, t, e) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    Y(this, s);
  }
}
const ce = gt.litHtmlPolyfillSupport;
ce == null || ce(ot, ht), ((Tt = gt.litHtmlVersions) !== null && Tt !== void 0 ? Tt : gt.litHtmlVersions = []).push("2.7.4");
const us = (n, s, t) => {
  var e, i;
  const r = (e = t == null ? void 0 : t.renderBefore) !== null && e !== void 0 ? e : s;
  let o = r._$litPart$;
  if (o === void 0) {
    const l = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : null;
    r._$litPart$ = o = new ht(s.insertBefore(it(), l), l, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var xt, St;
class et extends q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s, t;
    const e = super.createRenderRoot();
    return (s = (t = this.renderOptions).renderBefore) !== null && s !== void 0 || (t.renderBefore = e.firstChild), e;
  }
  update(s) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = us(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var s;
    super.connectedCallback(), (s = this._$Do) === null || s === void 0 || s.setConnected(!0);
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this._$Do) === null || s === void 0 || s.setConnected(!1);
  }
  render() {
    return K;
  }
}
et.finalized = !0, et._$litElement$ = !0, (xt = globalThis.litElementHydrateSupport) === null || xt === void 0 || xt.call(globalThis, { LitElement: et });
const ue = globalThis.litElementPolyfillSupport;
ue == null || ue({ LitElement: et });
((St = globalThis.litElementVersions) !== null && St !== void 0 ? St : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ps = (n) => (s) => typeof s == "function" ? ((t, e) => (customElements.define(t, e), e))(n, s) : ((t, e) => {
  const { kind: i, elements: r } = e;
  return { kind: i, elements: r, finisher(o) {
    customElements.define(t, o);
  } };
})(n, s);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ds = (n, s) => s.kind === "method" && s.descriptor && !("value" in s.descriptor) ? { ...s, finisher(t) {
  t.createProperty(s.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: s.key, initializer() {
  typeof s.initializer == "function" && (this[s.key] = s.initializer.call(this));
}, finisher(t) {
  t.createProperty(s.key, n);
} };
function Dt(n) {
  return (s, t) => t !== void 0 ? ((e, i, r) => {
    i.constructor.createProperty(r, e);
  })(n, s, t) : ds(n, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function we(n) {
  return Dt({ ...n, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ot;
((Ot = window.HTMLSlotElement) === null || Ot === void 0 ? void 0 : Ot.prototype.assignedElements) != null;
const { isArray: fs } = Array, vs = Object.keys, at = (n) => {
  if (!n)
    return n;
  if (fs(n)) {
    const s = [], t = n.length;
    for (let e = 0; e < t; e++)
      s.push(at(n[e]));
    return s;
  } else if (typeof n == "object") {
    const s = vs(n), t = s.length, e = {};
    for (let i = 0; i < t; i++) {
      const r = s[i];
      e[r] = at(n[r]);
    }
    return e;
  }
  return n;
};
class N {
  constructor(s) {
    g(this, "path");
    g(this, "from");
    this.path = s;
  }
}
const gs = /~1/g, ys = /~0/g, ms = /~/g, _s = /\//g;
function ws(n) {
  return n.indexOf("~") === -1 ? n : n.replace(gs, "/").replace(ys, "~");
}
function As(n) {
  return n.indexOf("/") === -1 && n.indexOf("~") === -1 ? n : n.replace(ms, "~0").replace(_s, "~1");
}
function Es(n) {
  return n ? n.slice(1).split("/").map(ws) : [];
}
function b(n) {
  return bs(n) ? "" : "/" + n.map((s) => As(String(s))).join("/");
}
const w = (n) => typeof n == "string" ? Es(n) : n, bs = (n) => !n.length, $s = Object.prototype.hasOwnProperty;
function Cs(n, s) {
  return $s.call(n, s);
}
const { isArray: Ae } = Array, T = (n, s) => {
  const t = s.length;
  if (!t)
    return { val: n };
  let e, i;
  for (let o = 0; o < t; o++)
    if (e = n, i = s[o], Ae(e)) {
      const l = e.length;
      if (i === "-")
        i = l;
      else if (typeof i == "string") {
        const u = ~~i;
        if ("" + u !== i)
          throw new Error("INVALID_INDEX");
        if (i = u, i < 0)
          throw new Error("INVALID_INDEX");
      }
      n = e[i];
    } else if (typeof e == "object" && e)
      n = Cs(e, i) ? e[i] : void 0;
    else
      throw new Error("NOT_FOUND");
  return { val: n, obj: e, key: i };
}, lt = (n) => Ae(n.obj) && typeof n.key == "number", wt = (n) => typeof n.obj == "object" && typeof n.key == "string";
class It extends N {
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
    const { val: e, key: i, obj: r } = T(t, this.path), o = at(this.value);
    if (!r)
      t = o;
    else if (typeof i == "string")
      r[i] = o;
    else {
      const l = r.length;
      if (i < l)
        r.splice(i, 0, o);
      else {
        if (i > l)
          throw new Error("INVALID_INDEX");
        r.push(o);
      }
    }
    return { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "add",
      path: b(this.path),
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
class Ee extends N {
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
    return wt(e) ? delete e.obj[e.key] : lt(e) ? e.val !== void 0 && e.obj.splice(e.key, 1) : t = null, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "remove",
      path: b(this.path)
    };
    return this.oldValue !== void 0 && (e.oldValue = this.oldValue), e;
  }
  toCompact(t, e) {
    const i = e ? "remove" : 1;
    return this.oldValue === void 0 ? [i, this.path] : [i, this.path, this.oldValue];
  }
  encode(t, e) {
    const i = this.oldValue !== void 0;
    t.encodeArrayHeader(i ? 3 : 2), t.writer.u8(1), t.encodeArray(this.path), i && t.encodeAny(this.oldValue);
  }
}
class Ts extends N {
  constructor(t, e, i) {
    super(t);
    g(this, "value");
    g(this, "oldValue");
    this.value = e, this.oldValue = i;
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
    return wt(e) ? e.obj[e.key] = this.value : lt(e) ? e.obj[e.key] = this.value : t = this.value, { doc: t, old: e.val };
  }
  toJson(t) {
    const e = {
      op: "replace",
      path: b(this.path),
      value: this.value
    };
    return this.oldValue !== void 0 && (e.oldValue = this.oldValue), e;
  }
  toCompact(t, e) {
    const i = e ? "replace" : 2;
    return this.oldValue === void 0 ? [i, this.path, this.value] : [i, this.path, this.value, this.oldValue];
  }
  encode(t, e) {
    const i = this.oldValue !== void 0;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(2), t.encodeArray(this.path), t.encodeAny(this.value), i && t.encodeAny(this.oldValue);
  }
}
class ks extends N {
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
    const e = new Ee(w(this.from), void 0).apply(t);
    return new It(this.path, e.old).apply(e.doc);
  }
  toJson(t) {
    return {
      op: "move",
      path: b(this.path),
      from: b(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "move" : 4, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(4), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class xs extends N {
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
    return new It(this.path, at(e)).apply(t);
  }
  toJson(t) {
    return {
      op: "copy",
      path: b(this.path),
      from: b(this.from)
    };
  }
  toCompact(t, e) {
    return [e ? "copy" : 3, this.path, this.from];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(3), t.encodeArray(this.path), t.encodeArray(this.from);
  }
}
class M extends N {
  apply(s) {
    if (!this.test(s))
      throw new Error("TEST");
    return { doc: s };
  }
}
const yt = (n, s) => {
  if (n === s)
    return !0;
  if (n && s && typeof n == "object" && typeof s == "object") {
    if (n.constructor !== s.constructor)
      return !1;
    let t, e, i;
    if (Array.isArray(n)) {
      if (t = n.length, t !== s.length)
        return !1;
      for (e = t; e-- !== 0; )
        if (!yt(n[e], s[e]))
          return !1;
      return !0;
    }
    if (i = Object.keys(n), t = i.length, t !== Object.keys(s).length)
      return !1;
    for (e = t; e-- !== 0; ) {
      const r = i[e];
      if (!yt(n[r], s[r]))
        return !1;
    }
    return !0;
  }
  return !1;
};
class Ss extends M {
  constructor(t, e, i) {
    super(t);
    g(this, "value");
    g(this, "not");
    this.value = e, this.not = i;
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
    const i = yt(e, this.value);
    return this.not ? !i : i;
  }
  toJson(t) {
    const e = {
      op: "test",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const i = t ? this.path.slice(t.path.length) : this.path, r = e ? "test" : 5;
    return this.not ? [r, i, this.value, 1] : [r, i, this.value];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 4 : 3), t.writer.u8(5), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeAny(this.value), this.not && t.writer.u8(1);
  }
}
class Os extends N {
  constructor(s) {
    super(s);
  }
  op() {
    return "flip";
  }
  code() {
    return 8;
  }
  apply(s) {
    const t = T(s, this.path);
    return t.obj ? t.obj[t.key] = !t.val : s = !t.val, { doc: s, old: t.val };
  }
  toJson(s) {
    return {
      op: "flip",
      path: b(this.path)
    };
  }
  toCompact(s, t) {
    return [t ? "flip" : 8, this.path];
  }
  encode(s, t) {
    s.encodeArrayHeader(2), s.writer.u8(8), s.encodeArray(this.path);
  }
}
class js extends N {
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
    const e = T(t, this.path), i = this.inc + Number(e.val);
    return e.obj ? e.obj[e.key] = i : t = i, { doc: t, old: e.val };
  }
  toJson(t) {
    return {
      op: "inc",
      path: b(this.path),
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
class Ms extends N {
  constructor(t, e, i) {
    super(t);
    g(this, "pos");
    g(this, "str");
    this.pos = e, this.str = i;
  }
  op() {
    return "str_ins";
  }
  code() {
    return 6;
  }
  apply(t) {
    const { val: e, key: i, obj: r } = T(t, this.path);
    if (typeof e != "string") {
      if (e !== void 0)
        throw new Error("NOT_A_STRING");
      if (this.pos !== 0)
        throw new Error("POS");
    }
    const o = typeof e == "string" ? e : "", l = Math.min(this.pos, o.length), u = o.slice(0, l), d = o.slice(l), C = u + this.str + d;
    return r ? r[i] = C : t = C, { doc: t, old: e };
  }
  toJson(t) {
    return {
      op: "str_ins",
      path: b(this.path),
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
class Rs extends N {
  constructor(t, e, i, r) {
    super(t);
    g(this, "pos");
    g(this, "str");
    g(this, "len");
    this.pos = e, this.str = i, this.len = r;
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
    const { val: e, key: i, obj: r } = T(t, this.path);
    if (typeof e != "string")
      throw new Error("NOT_A_STRING");
    const o = e.length, l = Math.min(this.pos, e.length), u = Math.min(l, o), d = this.str !== void 0 ? this.str.length : this.len, C = Math.min(l + d, o), y = e.slice(0, u), $ = e.substr(C), x = y + $;
    return r ? r[i] = x : t = x, { doc: t, old: e };
  }
  toJson(t) {
    return typeof this.str == "string" ? {
      op: "str_del",
      path: b(this.path),
      pos: this.pos,
      str: this.str
    } : {
      op: "str_del",
      path: b(this.path),
      pos: this.pos,
      len: this.len
    };
  }
  toCompact(t, e) {
    const i = e ? "str_del" : 7;
    return typeof this.str == "string" ? [i, this.path, this.pos, this.str] : [i, this.path, this.pos, 0, this.len];
  }
  encode(t, e) {
    const i = typeof this.str == "string";
    t.encodeArrayHeader(i ? 4 : 5), t.writer.u8(7), t.encodeArray(this.path), t.encodeNumber(this.pos), i ? t.encodeString(this.str) : (t.writer.u8(0), t.encodeNumber(this.len));
  }
}
const { isArray: Ns } = Array, Nt = (n) => !!n && typeof n == "object" && typeof n.text == "string", Pt = (n) => !!n && typeof n == "object" && Ns(n.children), Ps = (n, s) => {
  const t = new RegExp(n, s ? "i" : void 0);
  return (e) => t.test(e);
};
class Hs extends N {
  constructor(t, e, i) {
    super(t);
    g(this, "pos");
    g(this, "props");
    this.pos = e, this.props = i;
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
    const i = this.split(e.val);
    return wt(e) ? e.obj[e.key] = i : lt(e) ? (e.obj[e.key] = i[0], e.obj.splice(e.key + 1, 0, i[1])) : t = i, { doc: t, old: e.val };
  }
  split(t) {
    if (typeof t == "string") {
      const { pos: e, props: i } = this, r = t.slice(0, e), o = t.slice(e);
      return i ? [
        {
          ...i,
          text: r
        },
        {
          ...i,
          text: o
        }
      ] : [r, o];
    } else if (Nt(t)) {
      const { pos: e, props: i } = this, r = t.text.slice(0, e), o = t.text.slice(e);
      return [
        {
          ...t,
          ...i,
          text: r
        },
        {
          ...t,
          ...i,
          text: o
        }
      ];
    } else if (Pt(t)) {
      const { pos: e, props: i } = this, r = t.children.slice(0, e), o = t.children.slice(e);
      return [
        {
          ...t,
          ...i,
          children: r
        },
        {
          ...t,
          ...i,
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
      path: b(this.path),
      pos: this.pos
    };
    return this.props && (e.props = this.props), e;
  }
  toCompact(t, e) {
    const i = e ? "split" : 10;
    return this.props ? [i, this.path, this.pos, this.props] : [i, this.path, this.pos];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.props ? 4 : 3), t.writer.u8(10), t.encodeArray(this.path), t.encodeNumber(this.pos), this.props && t.encodeObject(this.props);
  }
}
class Ls extends N {
  constructor(t, e, i) {
    super(t);
    g(this, "pos");
    g(this, "props");
    this.pos = e, this.props = i;
  }
  op() {
    return "merge";
  }
  code() {
    return 11;
  }
  apply(t) {
    const e = T(t, this.path);
    if (!lt(e))
      throw new Error("INVALID_TARGET");
    if (e.key <= 0)
      throw new Error("INVALID_KEY");
    const i = e.obj[e.key - 1], r = e.obj[e.key], o = this.merge(i, r);
    return e.obj[e.key - 1] = o, e.obj.splice(e.key, 1), { doc: t, old: [i, r] };
  }
  merge(t, e) {
    return typeof t == "string" && typeof e == "string" || typeof t == "number" && typeof e == "number" ? t + e : Nt(t) && Nt(e) ? { ...t, ...e, text: t.text + e.text } : Pt(t) && Pt(e) ? { ...t, ...e, children: [...t.children, ...e.children] } : [t, e];
  }
  toJson(t) {
    const e = {
      op: "merge",
      path: b(this.path),
      pos: this.pos
    };
    return this.props && (e.props = this.props), e;
  }
  toCompact(t, e) {
    const i = e ? "merge" : 11;
    return this.props ? [i, this.path, this.pos, this.props] : [i, this.path, this.pos];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.props ? 4 : 3), t.writer.u8(11), t.encodeArray(this.path), t.encodeNumber(this.pos), this.props && t.encodeAny(this.props);
  }
}
const { isArray: Us } = Array;
class Ds extends N {
  constructor(t, e, i) {
    super(t);
    g(this, "props");
    g(this, "deleteNull");
    this.props = e, this.deleteNull = i;
  }
  op() {
    return "extend";
  }
  code() {
    return 12;
  }
  apply(t) {
    const e = T(t, this.path);
    return lt(e) ? e.val !== void 0 && (e.obj[e.key] = this.extend(e.val)) : wt(e) ? e.obj[e.key] = this.extend(e.val) : t = this.extend(t), { doc: t };
  }
  extend(t) {
    if (Us(t) || typeof t != "object" || !t)
      return t;
    for (const [e, i] of Object.entries(this.props)) {
      if (e === "__proto__")
        throw new Error("NO_PROTO");
      if (i === null && this.deleteNull) {
        delete t[e];
        continue;
      }
      t[e] = i;
    }
    return t;
  }
  toJson(t) {
    const e = {
      op: "extend",
      path: b(this.path),
      props: this.props
    };
    return this.deleteNull && (e.deleteNull = this.deleteNull), e;
  }
  toCompact(t, e) {
    const i = e ? "extend" : 12;
    return this.deleteNull ? [i, this.path, this.props, 1] : [i, this.path, this.props];
  }
  encode(t, e) {
    const { deleteNull: i } = this;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(12), t.encodeArray(this.path), t.encodeObject(this.props), i && t.writer.u8(1);
  }
}
class Is extends M {
  constructor(s) {
    super(s);
  }
  op() {
    return "defined";
  }
  code() {
    return 31;
  }
  test(s) {
    const { val: t } = T(s, this.path);
    return t !== void 0;
  }
  toJson(s) {
    return {
      op: "defined",
      path: b(s ? this.path.slice(s.path.length) : this.path)
    };
  }
  toCompact(s, t) {
    return [t ? "defined" : 31, s ? this.path.slice(s.path.length) : this.path];
  }
  encode(s, t) {
    s.encodeArrayHeader(2), s.writer.u8(31), s.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
class Vs extends M {
  constructor(s) {
    super(s);
  }
  op() {
    return "undefined";
  }
  code() {
    return 38;
  }
  test(s) {
    try {
      const { val: t } = T(s, this.path);
      return t === void 0;
    } catch (t) {
      if (t.message === "NOT_FOUND")
        return !0;
      throw t;
    }
  }
  toJson(s) {
    return {
      op: "undefined",
      path: b(s ? this.path.slice(s.path.length) : this.path)
    };
  }
  toCompact(s, t) {
    return [t ? "undefined" : 38, s ? this.path.slice(s.path.length) : this.path];
  }
  encode(s, t) {
    s.encodeArrayHeader(2), s.writer.u8(38), s.encodeArray(t ? this.path.slice(t.path.length) : this.path);
  }
}
const { isArray: zs } = Array;
class Js extends M {
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
    return e === null ? this.type.indexOf("null") > -1 : zs(e) ? this.type.indexOf("array") > -1 : this.type.indexOf(typeof e) > -1 || typeof e == "number" && e === Math.round(e) && this.type.indexOf("integer") > -1;
  }
  toJson(t) {
    return {
      op: "test_type",
      path: b(t ? this.path.slice(t.path.length) : this.path),
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
class Bs extends M {
  constructor(t, e, i, r) {
    super(t);
    g(this, "pos");
    g(this, "str");
    g(this, "not");
    this.pos = e, this.str = i, this.not = r;
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
    const i = e.length, r = Math.min(this.pos, i), o = Math.min(this.pos + this.str.length, i), l = e.substring(r, o) === this.str;
    return this.not ? !l : l;
  }
  toJson(t) {
    const e = {
      op: "test_string",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      pos: this.pos,
      str: this.str
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const i = e ? "test_string" : 40, r = t ? this.path.slice(t.path.length) : this.path;
    return this.not ? [i, r, this.pos, this.str, 1] : [i, r, this.pos, this.str];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 5 : 4), t.writer.u8(40), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.pos), t.encodeString(this.str), this.not && t.writer.u8(1);
  }
}
class Ws extends M {
  constructor(t, e, i) {
    super(t);
    g(this, "len");
    g(this, "not");
    this.len = e, this.not = i;
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
    const r = e.length >= this.len;
    return this.not ? !r : r;
  }
  toJson(t) {
    const e = {
      op: "test_string_len",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      len: this.len
    };
    return this.not && (e.not = this.not), e;
  }
  toCompact(t, e) {
    const i = e ? "test_string_len" : 41, r = t ? this.path.slice(t.path.length) : this.path;
    return this.not ? [i, r, this.len, 1] : [i, r, this.len];
  }
  encode(t, e) {
    t.encodeArrayHeader(this.not ? 4 : 3), t.writer.u8(41), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeNumber(this.len), this.not && t.writer.u8(1);
  }
}
class Gs extends M {
  constructor(t, e, i) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
    this.value = e, this.ignore_case = i;
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
    const i = this.ignore_case ? e.toLowerCase() : e, r = this.ignore_case ? this.value.toLowerCase() : this.value;
    return i.indexOf(r) > -1;
  }
  toJson(t) {
    const e = {
      op: "contains",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const i = e ? "contains" : 30;
    return this.ignore_case ? [i, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [i, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const i = this.ignore_case;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(30), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), i && t.writer.u8(1);
  }
}
class Fs extends M {
  constructor(t, e, i) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
    this.value = e, this.ignore_case = i;
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
    const i = this.ignore_case ? e.toLowerCase() : e, r = this.ignore_case ? this.value.toLowerCase() : this.value;
    return i.endsWith(r);
  }
  toJson(t) {
    const e = {
      op: "ends",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const i = e ? "ends" : 32;
    return this.ignore_case ? [i, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [i, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const i = this.ignore_case;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(32), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), i && t.writer.u8(1);
  }
}
class qs extends M {
  constructor(t, e, i) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
    this.value = e, this.ignore_case = i;
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
    const i = this.ignore_case ? e.toLowerCase() : e, r = this.ignore_case ? this.value.toLowerCase() : this.value;
    return i.startsWith(r);
  }
  toJson(t) {
    const e = {
      op: "starts",
      path: b(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const i = e ? "starts" : 37;
    return this.ignore_case ? [i, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [i, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const i = this.ignore_case;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(37), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), i && t.writer.u8(1);
  }
}
class Xs extends M {
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
    for (const i of this.value)
      if (yt(e, i))
        return !0;
    return !1;
  }
  toJson(t) {
    return {
      op: "in",
      path: b(t ? this.path.slice(t.path.length) : this.path),
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
class Ks extends M {
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
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
class Ys extends M {
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
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
class Vt extends M {
  constructor(t, e) {
    super(t);
    g(this, "ops");
    this.ops = e;
  }
}
class Zs extends Vt {
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((i) => i.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "and" : 43,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((r) => r.toCompact(this, e))
    ];
  }
  encode(t, e) {
    const i = e ? this.path.slice(e.path.length) : this.path;
    t.encodeArrayHeader(3), t.writer.u8(43), t.encodeArray(i);
    const r = this.ops.length;
    t.encodeArrayHeader(r);
    for (let o = 0; o < r; o++)
      this.ops[o].encode(t, this);
  }
}
class Qs extends Vt {
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((i) => i.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "or" : 45,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((r) => r.toCompact(this, e))
    ];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(45), t.encodeArray(e ? this.path.slice(e.path.length) : this.path);
    const i = this.ops.length;
    t.encodeArrayHeader(i);
    for (let r = 0; r < i; r++)
      this.ops[r].encode(t, this);
  }
}
class tn extends Vt {
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
      apply: this.ops.map((i) => i.toJson(this))
    };
  }
  toCompact(t, e) {
    return [
      e ? "not" : 44,
      t ? this.path.slice(t.path.length) : this.path,
      this.ops.map((r) => r.toCompact(this, e))
    ];
  }
  encode(t, e) {
    t.encodeArrayHeader(3), t.writer.u8(44), t.encodeArray(e ? this.path.slice(e.path.length) : this.path);
    const i = this.ops.length;
    t.encodeArrayHeader(i);
    for (let r = 0; r < i; r++)
      this.ops[r].encode(t, this);
  }
}
class en extends M {
  constructor(t, e, i, r) {
    super(t);
    g(this, "value");
    g(this, "ignore_case");
    g(this, "matcher");
    this.value = e, this.ignore_case = i, this.matcher = r(e, i);
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
      path: b(t ? this.path.slice(t.path.length) : this.path),
      value: this.value
    };
    return this.ignore_case && (e.ignore_case = this.ignore_case), e;
  }
  toCompact(t, e) {
    const i = e ? "matches" : 35;
    return this.ignore_case ? [i, t ? this.path.slice(t.path.length) : this.path, this.value, 1] : [i, t ? this.path.slice(t.path.length) : this.path, this.value];
  }
  encode(t, e) {
    const i = this.ignore_case;
    t.encodeArrayHeader(i ? 4 : 3), t.writer.u8(35), t.encodeArray(e ? this.path.slice(e.path.length) : this.path), t.encodeString(this.value), i && t.writer.u8(1);
  }
}
const { isArray: sn } = Array;
class nn extends M {
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
    return e === null ? this.value === "null" : sn(e) ? this.value === "array" : typeof e === this.value || typeof e == "number" && e === Math.round(e) && this.value === "integer";
  }
  toJson(t) {
    return {
      op: "type",
      path: b(t ? this.path.slice(t.path.length) : this.path),
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
const rn = (n, s) => {
  switch (n.op) {
    case "add":
      return new It(w(n.path), n.value);
    case "remove":
      return new Ee(w(n.path), n.oldValue);
    case "replace":
      return new Ts(w(n.path), n.value, n.oldValue);
    case "move":
      return new ks(w(n.path), w(n.from));
    case "copy":
      return new xs(w(n.path), w(n.from));
    case "flip":
      return new Os(w(n.path));
    case "inc":
      return new js(w(n.path), n.inc);
    case "str_ins":
      return new Ms(w(n.path), n.pos, n.str);
    case "str_del":
      return new Rs(w(n.path), n.pos, n.str, n.len);
    case "split":
      return new Hs(w(n.path), n.pos, n.props || null);
    case "merge":
      return new Ls(w(n.path), n.pos, n.props || null);
    case "extend":
      return new Ds(w(n.path), n.props, !!n.deleteNull);
    default:
      return ft(n, s);
  }
}, ft = (n, s) => {
  switch (n.op) {
    case "test":
      return new Ss(w(n.path), n.value, !!n.not);
    case "defined":
      return new Is(w(n.path));
    case "undefined":
      return new Vs(w(n.path));
    case "type":
      return new nn(w(n.path), n.value);
    case "test_type":
      return new Js(w(n.path), n.type);
    case "test_string":
      return new Bs(w(n.path), n.pos, n.str, !!n.not);
    case "test_string_len":
      return new Ws(w(n.path), n.len, !!n.not);
    case "contains":
      return new Gs(w(n.path), n.value, !!n.ignore_case);
    case "ends":
      return new Fs(w(n.path), n.value, !!n.ignore_case);
    case "starts":
      return new qs(w(n.path), n.value, !!n.ignore_case);
    case "matches":
      return new en(w(n.path), n.value, !!n.ignore_case, s.createMatcher || Ps);
    case "in":
      return new Xs(w(n.path), n.value);
    case "less":
      return new Ks(w(n.path), n.value);
    case "more":
      return new Ys(w(n.path), n.value);
    case "and": {
      const t = w(n.path);
      return new Zs(t, n.apply.map((e) => ft({ ...e, path: [...t, ...w(e.path)] }, s)));
    }
    case "or": {
      const t = w(n.path);
      return new Qs(t, n.apply.map((e) => ft({ ...e, path: [...t, ...w(e.path)] }, s)));
    }
    case "not": {
      const t = w(n.path);
      return new tn(t, n.apply.map((e) => ft({ ...e, path: [...t, ...w(e.path)] }, s)));
    }
    default:
      throw new Error("OP_UNKNOWN");
  }
};
function on(n, s, t) {
  t.mutate || (n = at(n));
  const e = [], i = s.length;
  for (let r = 0; r < i; r++) {
    const l = rn(s[r], t).apply(n);
    n = l.doc, e.push(l);
  }
  return { doc: n, res: e };
}
var st = (n) => typeof n == "function" ? n : function() {
  return n;
}, an = typeof self < "u" ? self : null, tt = typeof window < "u" ? window : null, nt = an || tt || nt, hn = "2.0.0", P = { connecting: 0, open: 1, closing: 2, closed: 3 }, ln = 1e4, cn = 1e3, R = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
}, U = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}, Ht = {
  longpoll: "longpoll",
  websocket: "websocket"
}, un = {
  complete: 4
}, ut = class {
  constructor(n, s, t, e) {
    this.channel = n, this.event = s, this.payload = t || function() {
      return {};
    }, this.receivedResp = null, this.timeout = e, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
  }
  resend(n) {
    this.timeout = n, this.reset(), this.send();
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
  receive(n, s) {
    return this.hasReceived(n) && s(this.receivedResp.response), this.recHooks.push({ status: n, callback: s }), this;
  }
  reset() {
    this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
  }
  matchReceive({ status: n, response: s, _ref: t }) {
    this.recHooks.filter((e) => e.status === n).forEach((e) => e.callback(s));
  }
  cancelRefEvent() {
    this.refEvent && this.channel.off(this.refEvent);
  }
  cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
  }
  startTimeout() {
    this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (n) => {
      this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = n, this.matchReceive(n);
    }), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  hasReceived(n) {
    return this.receivedResp && this.receivedResp.status === n;
  }
  trigger(n, s) {
    this.channel.trigger(this.refEvent, { status: n, response: s });
  }
}, be = class {
  constructor(n, s) {
    this.callback = n, this.timerCalc = s, this.timer = null, this.tries = 0;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}, pn = class {
  constructor(n, s, t) {
    this.state = R.closed, this.topic = n, this.params = st(s || {}), this.socket = t, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new ut(this, U.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new be(() => {
      this.socket.isConnected() && this.rejoin();
    }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
    })), this.joinPush.receive("ok", () => {
      this.state = R.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), this.pushBuffer = [];
    }), this.joinPush.receive("error", () => {
      this.state = R.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.onClose(() => {
      this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = R.closed, this.socket.remove(this);
    }), this.onError((e) => {
      this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e), this.isJoining() && this.joinPush.reset(), this.state = R.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.joinPush.receive("timeout", () => {
      this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new ut(this, U.leave, st({}), this.timeout).send(), this.state = R.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
    }), this.on(U.reply, (e, i) => {
      this.trigger(this.replyEventName(i), e);
    });
  }
  join(n = this.timeout) {
    if (this.joinedOnce)
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    return this.timeout = n, this.joinedOnce = !0, this.rejoin(), this.joinPush;
  }
  onClose(n) {
    this.on(U.close, n);
  }
  onError(n) {
    return this.on(U.error, (s) => n(s));
  }
  on(n, s) {
    let t = this.bindingRef++;
    return this.bindings.push({ event: n, ref: t, callback: s }), t;
  }
  off(n, s) {
    this.bindings = this.bindings.filter((t) => !(t.event === n && (typeof s > "u" || s === t.ref)));
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(n, s, t = this.timeout) {
    if (s = s || {}, !this.joinedOnce)
      throw new Error(`tried to push '${n}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    let e = new ut(this, n, function() {
      return s;
    }, t);
    return this.canPush() ? e.send() : (e.startTimeout(), this.pushBuffer.push(e)), e;
  }
  leave(n = this.timeout) {
    this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = R.leaving;
    let s = () => {
      this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(U.close, "leave");
    }, t = new ut(this, U.leave, st({}), n);
    return t.receive("ok", () => s()).receive("timeout", () => s()), t.send(), this.canPush() || t.trigger("ok", {}), t;
  }
  onMessage(n, s, t) {
    return s;
  }
  isMember(n, s, t, e) {
    return this.topic !== n ? !1 : e && e !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: n, event: s, payload: t, joinRef: e }), !1) : !0;
  }
  joinRef() {
    return this.joinPush.ref;
  }
  rejoin(n = this.timeout) {
    this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = R.joining, this.joinPush.resend(n));
  }
  trigger(n, s, t, e) {
    let i = this.onMessage(n, s, t, e);
    if (s && !i)
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    let r = this.bindings.filter((o) => o.event === n);
    for (let o = 0; o < r.length; o++)
      r[o].callback(i, t, e || this.joinRef());
  }
  replyEventName(n) {
    return `chan_reply_${n}`;
  }
  isClosed() {
    return this.state === R.closed;
  }
  isErrored() {
    return this.state === R.errored;
  }
  isJoined() {
    return this.state === R.joined;
  }
  isJoining() {
    return this.state === R.joining;
  }
  isLeaving() {
    return this.state === R.leaving;
  }
}, mt = class {
  static request(n, s, t, e, i, r, o) {
    if (nt.XDomainRequest) {
      let l = new nt.XDomainRequest();
      return this.xdomainRequest(l, n, s, e, i, r, o);
    } else {
      let l = new nt.XMLHttpRequest();
      return this.xhrRequest(l, n, s, t, e, i, r, o);
    }
  }
  static xdomainRequest(n, s, t, e, i, r, o) {
    return n.timeout = i, n.open(s, t), n.onload = () => {
      let l = this.parseJSON(n.responseText);
      o && o(l);
    }, r && (n.ontimeout = r), n.onprogress = () => {
    }, n.send(e), n;
  }
  static xhrRequest(n, s, t, e, i, r, o, l) {
    return n.open(s, t, !0), n.timeout = r, n.setRequestHeader("Content-Type", e), n.onerror = () => l && l(null), n.onreadystatechange = () => {
      if (n.readyState === un.complete && l) {
        let u = this.parseJSON(n.responseText);
        l(u);
      }
    }, o && (n.ontimeout = o), n.send(i), n;
  }
  static parseJSON(n) {
    if (!n || n === "")
      return null;
    try {
      return JSON.parse(n);
    } catch {
      return console && console.log("failed to parse JSON response", n), null;
    }
  }
  static serialize(n, s) {
    let t = [];
    for (var e in n) {
      if (!Object.prototype.hasOwnProperty.call(n, e))
        continue;
      let i = s ? `${s}[${e}]` : e, r = n[e];
      typeof r == "object" ? t.push(this.serialize(r, i)) : t.push(encodeURIComponent(i) + "=" + encodeURIComponent(r));
    }
    return t.join("&");
  }
  static appendParams(n, s) {
    if (Object.keys(s).length === 0)
      return n;
    let t = n.match(/\?/) ? "&" : "?";
    return `${n}${t}${this.serialize(s)}`;
  }
}, jt = class {
  constructor(n) {
    this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.onopen = function() {
    }, this.onerror = function() {
    }, this.onmessage = function() {
    }, this.onclose = function() {
    }, this.pollEndpoint = this.normalizeEndpoint(n), this.readyState = P.connecting, this.poll();
  }
  normalizeEndpoint(n) {
    return n.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + Ht.websocket), "$1/" + Ht.longpoll);
  }
  endpointURL() {
    return mt.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(n, s, t) {
    this.close(n, s, t), this.readyState = P.connecting;
  }
  ontimeout() {
    this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
  }
  isActive() {
    return this.readyState === P.open || this.readyState === P.connecting;
  }
  poll() {
    this.ajax("GET", null, () => this.ontimeout(), (n) => {
      if (n) {
        var { status: s, token: t, messages: e } = n;
        this.token = t;
      } else
        s = 0;
      switch (s) {
        case 200:
          e.forEach((i) => {
            setTimeout(() => this.onmessage({ data: i }), 0);
          }), this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = P.open, this.onopen({}), this.poll();
          break;
        case 403:
          this.onerror(403), this.close(1008, "forbidden", !1);
          break;
        case 0:
        case 500:
          this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${s}`);
      }
    });
  }
  send(n) {
    this.ajax("POST", n, () => this.onerror("timeout"), (s) => {
      (!s || s.status !== 200) && (this.onerror(s && s.status), this.closeAndRetry(1011, "internal server error", !1));
    });
  }
  close(n, s, t) {
    for (let i of this.reqs)
      i.abort();
    this.readyState = P.closed;
    let e = Object.assign({ code: 1e3, reason: void 0, wasClean: !0 }, { code: n, reason: s, wasClean: t });
    typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", e)) : this.onclose(e);
  }
  ajax(n, s, t, e) {
    let i, r = () => {
      this.reqs.delete(i), t();
    };
    i = mt.request(n, this.endpointURL(), "application/json", s, this.timeout, r, (o) => {
      this.reqs.delete(i), this.isActive() && e(o);
    }), this.reqs.add(i);
  }
}, pt = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(n, s) {
    if (n.payload.constructor === ArrayBuffer)
      return s(this.binaryEncode(n));
    {
      let t = [n.join_ref, n.ref, n.topic, n.event, n.payload];
      return s(JSON.stringify(t));
    }
  },
  decode(n, s) {
    if (n.constructor === ArrayBuffer)
      return s(this.binaryDecode(n));
    {
      let [t, e, i, r, o] = JSON.parse(n);
      return s({ join_ref: t, ref: e, topic: i, event: r, payload: o });
    }
  },
  binaryEncode(n) {
    let { join_ref: s, ref: t, event: e, topic: i, payload: r } = n, o = this.META_LENGTH + s.length + t.length + i.length + e.length, l = new ArrayBuffer(this.HEADER_LENGTH + o), u = new DataView(l), d = 0;
    u.setUint8(d++, this.KINDS.push), u.setUint8(d++, s.length), u.setUint8(d++, t.length), u.setUint8(d++, i.length), u.setUint8(d++, e.length), Array.from(s, (y) => u.setUint8(d++, y.charCodeAt(0))), Array.from(t, (y) => u.setUint8(d++, y.charCodeAt(0))), Array.from(i, (y) => u.setUint8(d++, y.charCodeAt(0))), Array.from(e, (y) => u.setUint8(d++, y.charCodeAt(0)));
    var C = new Uint8Array(l.byteLength + r.byteLength);
    return C.set(new Uint8Array(l), 0), C.set(new Uint8Array(r), l.byteLength), C.buffer;
  },
  binaryDecode(n) {
    let s = new DataView(n), t = s.getUint8(0), e = new TextDecoder();
    switch (t) {
      case this.KINDS.push:
        return this.decodePush(n, s, e);
      case this.KINDS.reply:
        return this.decodeReply(n, s, e);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(n, s, e);
    }
  },
  decodePush(n, s, t) {
    let e = s.getUint8(1), i = s.getUint8(2), r = s.getUint8(3), o = this.HEADER_LENGTH + this.META_LENGTH - 1, l = t.decode(n.slice(o, o + e));
    o = o + e;
    let u = t.decode(n.slice(o, o + i));
    o = o + i;
    let d = t.decode(n.slice(o, o + r));
    o = o + r;
    let C = n.slice(o, n.byteLength);
    return { join_ref: l, ref: null, topic: u, event: d, payload: C };
  },
  decodeReply(n, s, t) {
    let e = s.getUint8(1), i = s.getUint8(2), r = s.getUint8(3), o = s.getUint8(4), l = this.HEADER_LENGTH + this.META_LENGTH, u = t.decode(n.slice(l, l + e));
    l = l + e;
    let d = t.decode(n.slice(l, l + i));
    l = l + i;
    let C = t.decode(n.slice(l, l + r));
    l = l + r;
    let y = t.decode(n.slice(l, l + o));
    l = l + o;
    let $ = n.slice(l, n.byteLength), x = { status: y, response: $ };
    return { join_ref: u, ref: d, topic: C, event: U.reply, payload: x };
  },
  decodeBroadcast(n, s, t) {
    let e = s.getUint8(1), i = s.getUint8(2), r = this.HEADER_LENGTH + 2, o = t.decode(n.slice(r, r + e));
    r = r + e;
    let l = t.decode(n.slice(r, r + i));
    r = r + i;
    let u = n.slice(r, n.byteLength);
    return { join_ref: null, ref: null, topic: o, event: l, payload: u };
  }
}, dn = class {
  constructor(n, s = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = s.timeout || ln, this.transport = s.transport || nt.WebSocket || jt, this.establishedConnections = 0, this.defaultEncoder = pt.encode.bind(pt), this.defaultDecoder = pt.decode.bind(pt), this.closeWasClean = !1, this.binaryType = s.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== jt ? (this.encode = s.encode || this.defaultEncoder, this.decode = s.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
    let t = null;
    tt && tt.addEventListener && (tt.addEventListener("pagehide", (e) => {
      this.conn && (this.disconnect(), t = this.connectClock);
    }), tt.addEventListener("pageshow", (e) => {
      t === this.connectClock && (t = null, this.connect());
    })), this.heartbeatIntervalMs = s.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => s.rejoinAfterMs ? s.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4, this.reconnectAfterMs = (e) => s.reconnectAfterMs ? s.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3, this.logger = s.logger || null, this.longpollerTimeout = s.longpollerTimeout || 2e4, this.params = st(s.params || {}), this.endPoint = `${n}/${Ht.websocket}`, this.vsn = s.vsn || hn, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new be(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  getLongPollTransport() {
    return jt;
  }
  replaceTransport(n) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = n;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let n = mt.appendParams(mt.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    return n.charAt(0) !== "/" ? n : n.charAt(1) === "/" ? `${this.protocol()}:${n}` : `${this.protocol()}://${location.host}${n}`;
  }
  disconnect(n, s, t) {
    this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(n, s, t);
  }
  connect(n) {
    n && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = st(n)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (s) => this.onConnError(s), this.conn.onmessage = (s) => this.onConnMessage(s), this.conn.onclose = (s) => this.onConnClose(s));
  }
  log(n, s, t) {
    this.logger(n, s, t);
  }
  hasLogger() {
    return this.logger !== null;
  }
  onOpen(n) {
    let s = this.makeRef();
    return this.stateChangeCallbacks.open.push([s, n]), s;
  }
  onClose(n) {
    let s = this.makeRef();
    return this.stateChangeCallbacks.close.push([s, n]), s;
  }
  onError(n) {
    let s = this.makeRef();
    return this.stateChangeCallbacks.error.push([s, n]), s;
  }
  onMessage(n) {
    let s = this.makeRef();
    return this.stateChangeCallbacks.message.push([s, n]), s;
  }
  ping(n) {
    if (!this.isConnected())
      return !1;
    let s = this.makeRef(), t = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: s });
    let e = this.onMessage((i) => {
      i.ref === s && (this.off([e]), n(Date.now() - t));
    });
    return !0;
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(([, n]) => n());
  }
  heartbeatTimeout() {
    this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), cn, "heartbeat timeout"));
  }
  resetHeartbeat() {
    this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
  }
  teardown(n, s, t) {
    if (!this.conn)
      return n && n();
    this.waitForBufferDone(() => {
      this.conn && (s ? this.conn.close(s, t || "") : this.conn.close()), this.waitForSocketClosed(() => {
        this.conn && (this.conn.onopen = function() {
        }, this.conn.onerror = function() {
        }, this.conn.onmessage = function() {
        }, this.conn.onclose = function() {
        }, this.conn = null), n && n();
      });
    });
  }
  waitForBufferDone(n, s = 1) {
    if (s === 5 || !this.conn || !this.conn.bufferedAmount) {
      n();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(n, s + 1);
    }, 150 * s);
  }
  waitForSocketClosed(n, s = 1) {
    if (s === 5 || !this.conn || this.conn.readyState === P.closed) {
      n();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(n, s + 1);
    }, 150 * s);
  }
  onConnClose(n) {
    let s = n && n.code;
    this.hasLogger() && this.log("transport", "close", n), this.triggerChanError(), this.clearHeartbeats(), !this.closeWasClean && s !== 1e3 && this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(([, t]) => t(n));
  }
  onConnError(n) {
    this.hasLogger() && this.log("transport", n);
    let s = this.transport, t = this.establishedConnections;
    this.stateChangeCallbacks.error.forEach(([, e]) => {
      e(n, s, t);
    }), (s === this.transport || t > 0) && this.triggerChanError();
  }
  triggerChanError() {
    this.channels.forEach((n) => {
      n.isErrored() || n.isLeaving() || n.isClosed() || n.trigger(U.error);
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case P.connecting:
        return "connecting";
      case P.open:
        return "open";
      case P.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  isConnected() {
    return this.connectionState() === "open";
  }
  remove(n) {
    this.off(n.stateChangeRefs), this.channels = this.channels.filter((s) => s.joinRef() !== n.joinRef());
  }
  off(n) {
    for (let s in this.stateChangeCallbacks)
      this.stateChangeCallbacks[s] = this.stateChangeCallbacks[s].filter(([t]) => n.indexOf(t) === -1);
  }
  channel(n, s = {}) {
    let t = new pn(n, s, this);
    return this.channels.push(t), t;
  }
  push(n) {
    if (this.hasLogger()) {
      let { topic: s, event: t, payload: e, ref: i, join_ref: r } = n;
      this.log("push", `${s} ${t} (${r}, ${i})`, e);
    }
    this.isConnected() ? this.encode(n, (s) => this.conn.send(s)) : this.sendBuffer.push(() => this.encode(n, (s) => this.conn.send(s)));
  }
  makeRef() {
    let n = this.ref + 1;
    return n === this.ref ? this.ref = 0 : this.ref = n, this.ref.toString();
  }
  sendHeartbeat() {
    this.pendingHeartbeatRef && !this.isConnected() || (this.pendingHeartbeatRef = this.makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef }), this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs));
  }
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((n) => n()), this.sendBuffer = []);
  }
  onConnMessage(n) {
    this.decode(n.data, (s) => {
      let { topic: t, event: e, payload: i, ref: r, join_ref: o } = s;
      r && r === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${i.status || ""} ${t} ${e} ${r && "(" + r + ")" || ""}`, i);
      for (let l = 0; l < this.channels.length; l++) {
        const u = this.channels[l];
        u.isMember(t, e, i, o) && u.trigger(e, i, r, o);
      }
      for (let l = 0; l < this.stateChangeCallbacks.message.length; l++) {
        let [, u] = this.stateChangeCallbacks.message[l];
        u(s);
      }
    });
  }
  leaveOpenTopic(n) {
    let s = this.channels.find((t) => t.topic === n && (t.isJoined() || t.isJoining()));
    s && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${n}"`), s.leave());
  }
};
class fn {
  constructor(s) {
    this.connected = !1, this.config = s, this.socket = new dn(this.config.url, { logger: (t, e, i) => {
      console.log(`${t}: ${e}`, i);
    } }), this.channel = this.socket.channel(this.config.topic, this.config.params), this.eventTarget = new EventTarget();
  }
  /** connect to socket and join channel. will do nothing if already connected */
  connect() {
    this.connected || (this.socket.onError((s) => this.emitError("socket error", s)), this.socket.connect(), this.channel.onError((s) => console.log("channel error", s)), this.channel.join().receive("ok", () => {
      console.log("joined");
    }).receive("error", (s) => {
      this.emitError("channel join error", s);
    }), this.channel.on("state:change", (s) => this.handleChange(s)), this.channel.on("state:patch", (s) => this.handlePatch(s)), this.connected = !0);
  }
  /** leave channel and disconnect from socket */
  disconnect() {
    this.channel && this.channel.leave(), this.socket.disconnect(), this.connected = !1;
  }
  /** for events that begin with 'livestate-', add a listener. For
   * other events, additionally call `channel.on` to receive the event
   * over the channel, which will then be dispatched.
   */
  addEventListener(s, t, e) {
    var i;
    this.eventTarget.addEventListener(s, t, e), s.startsWith("livestate-") || (i = this.channel) == null || i.on(s, (r) => {
      this.eventTarget.dispatchEvent(new CustomEvent(s, { detail: r }));
    });
  }
  removeEventListener(s, t, e) {
    return this.eventTarget.removeEventListener(s, t, e);
  }
  /** @deprecated */
  subscribe(s) {
    this.addEventListener("livestate-change", s);
  }
  /** @deprecated */
  unsubscribe(s) {
    this.removeEventListener("livestate-change", s);
  }
  emitError(s, t) {
    this.eventTarget.dispatchEvent(new CustomEvent("livestate-error", {
      detail: {
        kind: s,
        error: t
      }
    }));
  }
  handleChange({ state: s, version: t }) {
    this.state = s, this.stateVersion = t, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
      detail: {
        state: this.state,
        version: this.stateVersion
      }
    }));
  }
  handlePatch({ patch: s, version: t }) {
    if (this.eventTarget.dispatchEvent(new CustomEvent("livestate-patch", {
      detail: { patch: s, version: t }
    })), t === this.stateVersion + 1) {
      const { doc: e, res: i } = on(this.state, s, { mutate: !1 });
      this.state = e, this.stateVersion = t, this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
        detail: {
          state: this.state,
          version: this.stateVersion
        }
      }));
    } else
      this.channel.push("lvs_refresh");
  }
  pushEvent(s, t) {
    this.dispatchEvent(new CustomEvent(s, { detail: t }));
  }
  /** Pushes the event over the channel, adding the `lvs_evt:` prefix and using the CustomEvent
   * detail property as the payload
   */
  dispatchEvent(s) {
    return this.channel.push(`lvs_evt:${s.type}`, s.detail), !0;
  }
  pushCustomEvent(s) {
    this.dispatchEvent(s);
  }
}
const vn = (n, s, { properties: t, attributes: e, events: i }) => {
  var r, o;
  s.liveState !== n && (n.connect(), t == null || t.forEach((l) => gn(n, s, l)), e == null || e.forEach((l) => yn(n, s, l)), (r = i == null ? void 0 : i.send) == null || r.forEach((l) => _n(n, s, l)), (o = i == null ? void 0 : i.receive) == null || o.forEach((l) => mn(n, s, l)), s.liveState = n);
}, gn = (n, s, t) => {
  n.addEventListener("livestate-change", ({ detail: { state: e } }) => {
    s[t] = e[t];
  });
}, yn = (n, s, t) => {
  n.addEventListener("livestate-change", ({ detail: { state: e } }) => {
    s.setAttribute(t, e[t]);
  });
}, mn = (n, s, t) => {
  n.addEventListener(t, ({ detail: e }) => {
    s.dispatchEvent(new CustomEvent(t, { detail: e }));
  });
}, _n = (n, s, t) => {
  s.addEventListener(t, (e) => {
    const { detail: i } = e;
    n.dispatchEvent(new CustomEvent(t, { detail: i }));
  });
};
Promise.resolve();
var pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
var de;
(function(n) {
  (function(s) {
    var t = typeof pe == "object" ? pe : typeof self == "object" ? self : typeof this == "object" ? this : Function("return this;")(), e = i(n);
    typeof t.Reflect > "u" ? t.Reflect = n : e = i(t.Reflect, e), s(e);
    function i(r, o) {
      return function(l, u) {
        typeof r[l] != "function" && Object.defineProperty(r, l, { configurable: !0, writable: !0, value: u }), o && o(l, u);
      };
    }
  })(function(s) {
    var t = Object.prototype.hasOwnProperty, e = typeof Symbol == "function", i = e && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", r = e && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", o = typeof Object.create == "function", l = { __proto__: [] } instanceof Array, u = !o && !l, d = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: o ? function() {
        return bt(/* @__PURE__ */ Object.create(null));
      } : l ? function() {
        return bt({ __proto__: null });
      } : function() {
        return bt({});
      },
      has: u ? function(a, h) {
        return t.call(a, h);
      } : function(a, h) {
        return h in a;
      },
      get: u ? function(a, h) {
        return t.call(a, h) ? a[h] : void 0;
      } : function(a, h) {
        return a[h];
      }
    }, C = Object.getPrototypeOf(Function), y = typeof process == "object" && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL === "true", $ = !y && typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Ge(), x = !y && typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Fe(), W = !y && typeof WeakMap == "function" ? WeakMap : qe(), H = new W();
    function $e(a, h, c, p) {
      if (k(c)) {
        if (!Xt(a))
          throw new TypeError();
        if (!Kt(h))
          throw new TypeError();
        return Ne(a, h);
      } else {
        if (!Xt(a))
          throw new TypeError();
        if (!S(h))
          throw new TypeError();
        if (!S(p) && !k(p) && !G(p))
          throw new TypeError();
        return G(p) && (p = void 0), c = L(c), Pe(a, h, c, p);
      }
    }
    s("decorate", $e);
    function Ce(a, h) {
      function c(p, f) {
        if (!S(p))
          throw new TypeError();
        if (!k(f) && !Ve(f))
          throw new TypeError();
        Wt(a, h, p, f);
      }
      return c;
    }
    s("metadata", Ce);
    function Te(a, h, c, p) {
      if (!S(c))
        throw new TypeError();
      return k(p) || (p = L(p)), Wt(a, h, c, p);
    }
    s("defineMetadata", Te);
    function ke(a, h, c) {
      if (!S(h))
        throw new TypeError();
      return k(c) || (c = L(c)), zt(a, h, c);
    }
    s("hasMetadata", ke);
    function xe(a, h, c) {
      if (!S(h))
        throw new TypeError();
      return k(c) || (c = L(c)), At(a, h, c);
    }
    s("hasOwnMetadata", xe);
    function Se(a, h, c) {
      if (!S(h))
        throw new TypeError();
      return k(c) || (c = L(c)), Jt(a, h, c);
    }
    s("getMetadata", Se);
    function Oe(a, h, c) {
      if (!S(h))
        throw new TypeError();
      return k(c) || (c = L(c)), Bt(a, h, c);
    }
    s("getOwnMetadata", Oe);
    function je(a, h) {
      if (!S(a))
        throw new TypeError();
      return k(h) || (h = L(h)), Gt(a, h);
    }
    s("getMetadataKeys", je);
    function Me(a, h) {
      if (!S(a))
        throw new TypeError();
      return k(h) || (h = L(h)), Ft(a, h);
    }
    s("getOwnMetadataKeys", Me);
    function Re(a, h, c) {
      if (!S(h))
        throw new TypeError();
      k(c) || (c = L(c));
      var p = Z(
        h,
        c,
        /*Create*/
        !1
      );
      if (k(p) || !p.delete(a))
        return !1;
      if (p.size > 0)
        return !0;
      var f = H.get(h);
      return f.delete(c), f.size > 0 || H.delete(h), !0;
    }
    s("deleteMetadata", Re);
    function Ne(a, h) {
      for (var c = a.length - 1; c >= 0; --c) {
        var p = a[c], f = p(h);
        if (!k(f) && !G(f)) {
          if (!Kt(f))
            throw new TypeError();
          h = f;
        }
      }
      return h;
    }
    function Pe(a, h, c, p) {
      for (var f = a.length - 1; f >= 0; --f) {
        var j = a[f], m = j(h, c, p);
        if (!k(m) && !G(m)) {
          if (!S(m))
            throw new TypeError();
          p = m;
        }
      }
      return p;
    }
    function Z(a, h, c) {
      var p = H.get(a);
      if (k(p)) {
        if (!c)
          return;
        p = new $(), H.set(a, p);
      }
      var f = p.get(h);
      if (k(f)) {
        if (!c)
          return;
        f = new $(), p.set(h, f);
      }
      return f;
    }
    function zt(a, h, c) {
      var p = At(a, h, c);
      if (p)
        return !0;
      var f = Et(h);
      return G(f) ? !1 : zt(a, f, c);
    }
    function At(a, h, c) {
      var p = Z(
        h,
        c,
        /*Create*/
        !1
      );
      return k(p) ? !1 : De(p.has(a));
    }
    function Jt(a, h, c) {
      var p = At(a, h, c);
      if (p)
        return Bt(a, h, c);
      var f = Et(h);
      if (!G(f))
        return Jt(a, f, c);
    }
    function Bt(a, h, c) {
      var p = Z(
        h,
        c,
        /*Create*/
        !1
      );
      if (!k(p))
        return p.get(a);
    }
    function Wt(a, h, c, p) {
      var f = Z(
        c,
        p,
        /*Create*/
        !0
      );
      f.set(a, h);
    }
    function Gt(a, h) {
      var c = Ft(a, h), p = Et(a);
      if (p === null)
        return c;
      var f = Gt(p, h);
      if (f.length <= 0)
        return c;
      if (c.length <= 0)
        return f;
      for (var j = new x(), m = [], _ = 0, v = c; _ < v.length; _++) {
        var A = v[_], E = j.has(A);
        E || (j.add(A), m.push(A));
      }
      for (var D = 0, Zt = f; D < Zt.length; D++) {
        var A = Zt[D], E = j.has(A);
        E || (j.add(A), m.push(A));
      }
      return m;
    }
    function Ft(a, h) {
      var c = [], p = Z(
        a,
        h,
        /*Create*/
        !1
      );
      if (k(p))
        return c;
      for (var f = p.keys(), j = ze(f), m = 0; ; ) {
        var _ = Be(j);
        if (!_)
          return c.length = m, c;
        var v = Je(_);
        try {
          c[m] = v;
        } catch (A) {
          try {
            We(j);
          } finally {
            throw A;
          }
        }
        m++;
      }
    }
    function qt(a) {
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
    function k(a) {
      return a === void 0;
    }
    function G(a) {
      return a === null;
    }
    function He(a) {
      return typeof a == "symbol";
    }
    function S(a) {
      return typeof a == "object" ? a !== null : typeof a == "function";
    }
    function Le(a, h) {
      switch (qt(a)) {
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
      var c = h === 3 ? "string" : h === 5 ? "number" : "default", p = Yt(a, i);
      if (p !== void 0) {
        var f = p.call(a, c);
        if (S(f))
          throw new TypeError();
        return f;
      }
      return Ue(a, c === "default" ? "number" : c);
    }
    function Ue(a, h) {
      if (h === "string") {
        var c = a.toString;
        if (F(c)) {
          var p = c.call(a);
          if (!S(p))
            return p;
        }
        var f = a.valueOf;
        if (F(f)) {
          var p = f.call(a);
          if (!S(p))
            return p;
        }
      } else {
        var f = a.valueOf;
        if (F(f)) {
          var p = f.call(a);
          if (!S(p))
            return p;
        }
        var j = a.toString;
        if (F(j)) {
          var p = j.call(a);
          if (!S(p))
            return p;
        }
      }
      throw new TypeError();
    }
    function De(a) {
      return !!a;
    }
    function Ie(a) {
      return "" + a;
    }
    function L(a) {
      var h = Le(
        a,
        3
        /* String */
      );
      return He(h) ? h : Ie(h);
    }
    function Xt(a) {
      return Array.isArray ? Array.isArray(a) : a instanceof Object ? a instanceof Array : Object.prototype.toString.call(a) === "[object Array]";
    }
    function F(a) {
      return typeof a == "function";
    }
    function Kt(a) {
      return typeof a == "function";
    }
    function Ve(a) {
      switch (qt(a)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function Yt(a, h) {
      var c = a[h];
      if (c != null) {
        if (!F(c))
          throw new TypeError();
        return c;
      }
    }
    function ze(a) {
      var h = Yt(a, r);
      if (!F(h))
        throw new TypeError();
      var c = h.call(a);
      if (!S(c))
        throw new TypeError();
      return c;
    }
    function Je(a) {
      return a.value;
    }
    function Be(a) {
      var h = a.next();
      return h.done ? !1 : h;
    }
    function We(a) {
      var h = a.return;
      h && h.call(a);
    }
    function Et(a) {
      var h = Object.getPrototypeOf(a);
      if (typeof a != "function" || a === C || h !== C)
        return h;
      var c = a.prototype, p = c && Object.getPrototypeOf(c);
      if (p == null || p === Object.prototype)
        return h;
      var f = p.constructor;
      return typeof f != "function" || f === a ? h : f;
    }
    function Ge() {
      var a = {}, h = [], c = (
        /** @class */
        function() {
          function m(_, v, A) {
            this._index = 0, this._keys = _, this._values = v, this._selector = A;
          }
          return m.prototype["@@iterator"] = function() {
            return this;
          }, m.prototype[r] = function() {
            return this;
          }, m.prototype.next = function() {
            var _ = this._index;
            if (_ >= 0 && _ < this._keys.length) {
              var v = this._selector(this._keys[_], this._values[_]);
              return _ + 1 >= this._keys.length ? (this._index = -1, this._keys = h, this._values = h) : this._index++, { value: v, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, m.prototype.throw = function(_) {
            throw this._index >= 0 && (this._index = -1, this._keys = h, this._values = h), _;
          }, m.prototype.return = function(_) {
            return this._index >= 0 && (this._index = -1, this._keys = h, this._values = h), { value: _, done: !0 };
          }, m;
        }()
      );
      return (
        /** @class */
        function() {
          function m() {
            this._keys = [], this._values = [], this._cacheKey = a, this._cacheIndex = -2;
          }
          return Object.defineProperty(m.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), m.prototype.has = function(_) {
            return this._find(
              _,
              /*insert*/
              !1
            ) >= 0;
          }, m.prototype.get = function(_) {
            var v = this._find(
              _,
              /*insert*/
              !1
            );
            return v >= 0 ? this._values[v] : void 0;
          }, m.prototype.set = function(_, v) {
            var A = this._find(
              _,
              /*insert*/
              !0
            );
            return this._values[A] = v, this;
          }, m.prototype.delete = function(_) {
            var v = this._find(
              _,
              /*insert*/
              !1
            );
            if (v >= 0) {
              for (var A = this._keys.length, E = v + 1; E < A; E++)
                this._keys[E - 1] = this._keys[E], this._values[E - 1] = this._values[E];
              return this._keys.length--, this._values.length--, _ === this._cacheKey && (this._cacheKey = a, this._cacheIndex = -2), !0;
            }
            return !1;
          }, m.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = a, this._cacheIndex = -2;
          }, m.prototype.keys = function() {
            return new c(this._keys, this._values, p);
          }, m.prototype.values = function() {
            return new c(this._keys, this._values, f);
          }, m.prototype.entries = function() {
            return new c(this._keys, this._values, j);
          }, m.prototype["@@iterator"] = function() {
            return this.entries();
          }, m.prototype[r] = function() {
            return this.entries();
          }, m.prototype._find = function(_, v) {
            return this._cacheKey !== _ && (this._cacheIndex = this._keys.indexOf(this._cacheKey = _)), this._cacheIndex < 0 && v && (this._cacheIndex = this._keys.length, this._keys.push(_), this._values.push(void 0)), this._cacheIndex;
          }, m;
        }()
      );
      function p(m, _) {
        return m;
      }
      function f(m, _) {
        return _;
      }
      function j(m, _) {
        return [m, _];
      }
    }
    function Fe() {
      return (
        /** @class */
        function() {
          function a() {
            this._map = new $();
          }
          return Object.defineProperty(a.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), a.prototype.has = function(h) {
            return this._map.has(h);
          }, a.prototype.add = function(h) {
            return this._map.set(h, h), this;
          }, a.prototype.delete = function(h) {
            return this._map.delete(h);
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
          }, a.prototype[r] = function() {
            return this.keys();
          }, a;
        }()
      );
    }
    function qe() {
      var a = 16, h = d.create(), c = p();
      return (
        /** @class */
        function() {
          function v() {
            this._key = p();
          }
          return v.prototype.has = function(A) {
            var E = f(
              A,
              /*create*/
              !1
            );
            return E !== void 0 ? d.has(E, this._key) : !1;
          }, v.prototype.get = function(A) {
            var E = f(
              A,
              /*create*/
              !1
            );
            return E !== void 0 ? d.get(E, this._key) : void 0;
          }, v.prototype.set = function(A, E) {
            var D = f(
              A,
              /*create*/
              !0
            );
            return D[this._key] = E, this;
          }, v.prototype.delete = function(A) {
            var E = f(
              A,
              /*create*/
              !1
            );
            return E !== void 0 ? delete E[this._key] : !1;
          }, v.prototype.clear = function() {
            this._key = p();
          }, v;
        }()
      );
      function p() {
        var v;
        do
          v = "@@WeakMap@@" + _();
        while (d.has(h, v));
        return h[v] = !0, v;
      }
      function f(v, A) {
        if (!t.call(v, c)) {
          if (!A)
            return;
          Object.defineProperty(v, c, { value: d.create() });
        }
        return v[c];
      }
      function j(v, A) {
        for (var E = 0; E < A; ++E)
          v[E] = Math.random() * 255 | 0;
        return v;
      }
      function m(v) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(v)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(v)) : j(new Uint8Array(v), v) : j(new Array(v), v);
      }
      function _() {
        var v = m(a);
        v[6] = v[6] & 79 | 64, v[8] = v[8] & 191 | 128;
        for (var A = "", E = 0; E < a; ++E) {
          var D = v[E];
          (E === 4 || E === 6 || E === 8) && (A += "-"), D < 16 && (A += "0"), A += D.toString(16).toLowerCase();
        }
        return A;
      }
    }
    function bt(a) {
      return a.__ = void 0, delete a.__, a;
    }
  });
})(de || (de = {}));
var wn = Object.defineProperty, An = Object.getOwnPropertyDescriptor, ct = (n, s, t, e) => {
  for (var i = e > 1 ? void 0 : e ? An(s, t) : s, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (e ? o(s, t, i) : o(i)) || i);
  return e && i && wn(s, t, i), i;
};
let B = class extends et {
  constructor() {
    super(...arguments), this.users = {}, this._throttledDispatchMouseMove = En(
      this._dispatchMouseMove.bind(this),
      // 15 // 15ms throttle interval = ~66.6 fps
      // 10 // 10ms throttle interval = 100 fps
      8
      // 8ms throttle interval = 125 fps
    );
  }
  render() {
    var n, s;
    return he`
      <div id="users-container">
        ${Object.values(this.users).map(
      (t) => {
        var e;
        return he`
              <div
                id="user-${t.id}"
                class="user"
                data-isself="${t.id == ((e = this.me) == null ? void 0 : e.id)}"
                style="--color: ${t.color}; --x: ${t.x}vw; --y: ${t.y}vh;"
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
                <span class="name">${t.name}</span>
                <div
                  class="halo"
                  data-show="${t.is_mouse_down || t.is_escape_key_down}"
                />
              </div>
            `;
      }
    )}
      </div>

      <div class="banner" style="--color: ${(n = this.me) == null ? void 0 : n.color}">
        <div class="pills">
          <div class="current_user">
            <span class="colorpoint"></span>
            <p class="name">${(s = this.me) == null ? void 0 : s.name}</p>
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
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    const n = new fn({
      url: this.url,
      topic: `liveroom-livestate:${this.room_id}`,
      params: {
        room_id: this.room_id,
        current_url: window.origin,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight
      }
    });
    vn(n, this, {
      properties: ["room_id", "me", "users"],
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
    }), this.liveState = n, window.addEventListener("mousemove", this._throttledDispatchMouseMove), window.addEventListener("mousedown", this._dispatchMouseDown.bind(this)), window.addEventListener("mouseup", this._dispatchMouseUp.bind(this)), window.addEventListener("keydown", this._dispatchKeyDown.bind(this)), window.addEventListener("keyup", this._dispatchKeyUp.bind(this)), window.addEventListener("resize", this._dispatchWindowResize.bind(this));
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this._dispatchWindowResize.bind(this)), window.removeEventListener("keyup", this._dispatchKeyUp.bind(this)), window.removeEventListener("keydown", this._dispatchKeyDown.bind(this)), window.removeEventListener("mouseup", this._dispatchMouseUp.bind(this)), window.removeEventListener("mousedown", this._dispatchMouseDown.bind(this)), window.removeEventListener("mousemove", this._throttledDispatchMouseMove), this.liveState && this.liveState.disconnect(), super.disconnectedCallback();
  }
  _dispatchMouseMove(n) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_move", {
        detail: {
          user_id: this.me.id,
          x: Number(n.pageX / window.innerWidth * 100).toFixed(2),
          // in %
          y: Number(n.pageY / window.innerHeight * 100).toFixed(2)
          // in %
        }
      })
    );
  }
  _dispatchMouseDown(n) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_down", {
        detail: {
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchMouseUp(n) {
    this.me && this.dispatchEvent(
      new CustomEvent("mouse_up", {
        detail: {
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchKeyDown(n) {
    !n.repeat && fe.includes(n.key) && this.me && this.dispatchEvent(
      new CustomEvent("key_down", {
        detail: {
          key: n.key,
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchKeyUp(n) {
    fe.includes(n.key) && this.me && this.dispatchEvent(
      new CustomEvent("key_up", {
        detail: {
          key: n.key,
          user_id: this.me.id
        }
      })
    );
  }
  _dispatchWindowResize(n) {
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
};
B.styles = Ze`
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
      padding: 3px 8px;
      background-color: white;
      border-radius: 9999px;
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
      font-size: 14px;
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
      font-size: 14px;
      font-weight: bold;
    }
    .banner .pills .other_users svg {
      width: 18px;
      opacity: 0.8;
    }
  `;
ct([
  Dt({ attribute: "url" })
], B.prototype, "url", 2);
ct([
  Dt({ attribute: "room_id" })
], B.prototype, "room_id", 2);
ct([
  we()
], B.prototype, "me", 2);
ct([
  we()
], B.prototype, "users", 2);
B = ct([
  ps("liveroom-client-element")
], B);
const fe = ["Escape"];
function En(n, s) {
  let t = 0;
  return function(...e) {
    let i = Date.now();
    if (i - t > s)
      return t = i, n.apply(this, e);
  };
}
export {
  B as LiveroomClientElement
};
