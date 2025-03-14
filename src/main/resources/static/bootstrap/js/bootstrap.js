!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function o(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function s(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function r(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {}, i = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), i.forEach(function (e) {
                s(t, e, n[e])
            })
        }
        return t
    }

    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
    var a = "transitionend";

    function l(t) {
        var n = this, i = !1;
        return e(this).one(c.TRANSITION_END, function () {
            i = !0
        }), setTimeout(function () {
            i || c.triggerTransitionEnd(n)
        }, t), this
    }

    var c = {
        TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        }, getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        }, getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var n = e(t).css("transition-duration"), i = e(t).css("transition-delay"), o = parseFloat(n),
                s = parseFloat(i);
            return o || s ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
        }, reflow: function (t) {
            return t.offsetHeight
        }, triggerTransitionEnd: function (t) {
            e(t).trigger(a)
        }, supportsTransitionEnd: function () {
            return Boolean(a)
        }, isElement: function (t) {
            return (t[0] || t).nodeType
        }, typeCheckConfig: function (t, e, n) {
            for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
                var o = n[i], s = e[i],
                    r = s && c.isElement(s) ? "element" : (a = s, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                if (!new RegExp(o).test(r)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + r + '" but expected type "' + o + '".')
            }
            var a
        }, findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                var e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? c.findShadowRoot(t.parentNode) : null
        }
    };
    e.fn.emulateTransitionEnd = l, e.event.special[c.TRANSITION_END] = {
        bindType: a,
        delegateType: a,
        handle: function (t) {
            if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var h = e.fn.alert,
        u = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
        f = "alert", d = "fade", _ = "show", g = function () {
            function t(t) {
                this._element = t
            }

            var n = t.prototype;
            return n.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.dispose = function () {
                e.removeData(this._element, "bs.alert"), this._element = null
            }, n._getRootElement = function (t) {
                var n = c.getSelectorFromElement(t), i = !1;
                return n && (i = document.querySelector(n)), i || (i = e(t).closest("." + f)[0]), i
            }, n._triggerCloseEvent = function (t) {
                var n = e.Event(u.CLOSE);
                return e(t).trigger(n), n
            }, n._removeElement = function (t) {
                var n = this;
                if (e(t).removeClass(_), e(t).hasClass(d)) {
                    var i = c.getTransitionDurationFromElement(t);
                    e(t).one(c.TRANSITION_END, function (e) {
                        return n._destroyElement(t, e)
                    }).emulateTransitionEnd(i)
                } else this._destroyElement(t)
            }, n._destroyElement = function (t) {
                e(t).detach().trigger(u.CLOSED).remove()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this), o = i.data("bs.alert");
                    o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this)
                })
            }, t._handleDismiss = function (t) {
                return function (e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), e.fn.alert = g._jQueryInterface, e.fn.alert.Constructor = g, e.fn.alert.noConflict = function () {
        return e.fn.alert = h, g._jQueryInterface
    };
    var m = e.fn.button, p = "active", v = "btn", E = "focus", b = '[data-toggle^="button"]',
        y = '[data-toggle="buttons"]', T = 'input:not([type="hidden"])', C = ".active", S = ".btn", I = {
            CLICK_DATA_API: "click.bs.button.data-api",
            FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
        }, D = function () {
            function t(t) {
                this._element = t
            }

            var n = t.prototype;
            return n.toggle = function () {
                var t = !0, n = !0, i = e(this._element).closest(y)[0];
                if (i) {
                    var o = this._element.querySelector(T);
                    if (o) {
                        if ("radio" === o.type) if (o.checked && this._element.classList.contains(p)) t = !1; else {
                            var s = i.querySelector(C);
                            s && e(s).removeClass(p)
                        }
                        if (t) {
                            if (o.hasAttribute("disabled") || i.hasAttribute("disabled") || o.classList.contains("disabled") || i.classList.contains("disabled")) return;
                            o.checked = !this._element.classList.contains(p), e(o).trigger("change")
                        }
                        o.focus(), n = !1
                    }
                }
                n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(p)), t && e(this._element).toggleClass(p)
            }, n.dispose = function () {
                e.removeData(this._element, "bs.button"), this._element = null
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.button");
                    i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(I.CLICK_DATA_API, b, function (t) {
        t.preventDefault();
        var n = t.target;
        e(n).hasClass(v) || (n = e(n).closest(S)), D._jQueryInterface.call(e(n), "toggle")
    }).on(I.FOCUS_BLUR_DATA_API, b, function (t) {
        var n = e(t.target).closest(S)[0];
        e(n).toggleClass(E, /^focus(in)?$/.test(t.type))
    }), e.fn.button = D._jQueryInterface, e.fn.button.Constructor = D, e.fn.button.noConflict = function () {
        return e.fn.button = m, D._jQueryInterface
    };
    var A = "carousel", w = ".bs.carousel", N = e.fn[A],
        O = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0}, k = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }, L = "next", P = "prev", R = "left", j = "right", H = {
            SLIDE: "slide.bs.carousel",
            SLID: "slid.bs.carousel",
            KEYDOWN: "keydown.bs.carousel",
            MOUSEENTER: "mouseenter.bs.carousel",
            MOUSELEAVE: "mouseleave.bs.carousel",
            TOUCHSTART: "touchstart.bs.carousel",
            TOUCHMOVE: "touchmove.bs.carousel",
            TOUCHEND: "touchend.bs.carousel",
            POINTERDOWN: "pointerdown.bs.carousel",
            POINTERUP: "pointerup.bs.carousel",
            DRAG_START: "dragstart.bs.carousel",
            LOAD_DATA_API: "load.bs.carousel.data-api",
            CLICK_DATA_API: "click.bs.carousel.data-api"
        }, M = "carousel", W = "active", F = "slide", U = "carousel-item-right", x = "carousel-item-left",
        K = "carousel-item-next", q = "carousel-item-prev", V = "pointer-event", Q = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            ITEM_IMG: ".carousel-item img",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        }, B = {TOUCH: "touch", PEN: "pen"}, Y = function () {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(Q.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }

            var n = t.prototype;
            return n.next = function () {
                this._isSliding || this._slide(L)
            }, n.nextWhenVisible = function () {
                !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
            }, n.prev = function () {
                this._isSliding || this._slide(P)
            }, n.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(Q.NEXT_PREV) && (c.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function (t) {
                var n = this;
                this._activeElement = this._element.querySelector(Q.ACTIVE_ITEM);
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) e(this._element).one(H.SLID, function () {
                    return n.to(t)
                }); else {
                    if (i === t) return this.pause(), void this.cycle();
                    var o = t > i ? L : P;
                    this._slide(o, this._items[t])
                }
            }, n.dispose = function () {
                e(this._element).off(w), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function (t) {
                return t = r({}, O, t), c.typeCheckConfig(A, t, k), t
            }, n._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    e > 0 && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function () {
                var t = this;
                this._config.keyboard && e(this._element).on(H.KEYDOWN, function (e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && e(this._element).on(H.MOUSEENTER, function (e) {
                    return t.pause(e)
                }).on(H.MOUSELEAVE, function (e) {
                    return t.cycle(e)
                }), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function () {
                var t = this;
                if (this._touchSupported) {
                    var n = function (e) {
                        t._pointerEvent && B[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                    }, i = function (e) {
                        t._pointerEvent && B[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
                            return t.cycle(e)
                        }, 500 + t._config.interval))
                    };
                    e(this._element.querySelectorAll(Q.ITEM_IMG)).on(H.DRAG_START, function (t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (e(this._element).on(H.POINTERDOWN, function (t) {
                        return n(t)
                    }), e(this._element).on(H.POINTERUP, function (t) {
                        return i(t)
                    }), this._element.classList.add(V)) : (e(this._element).on(H.TOUCHSTART, function (t) {
                        return n(t)
                    }), e(this._element).on(H.TOUCHMOVE, function (e) {
                        return function (e) {
                            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
                        }(e)
                    }), e(this._element).on(H.TOUCHEND, function (t) {
                        return i(t)
                    }))
                }
            }, n._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(Q.ITEM)) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function (t, e) {
                var n = t === L, i = t === P, o = this._getItemIndex(e), s = this._items.length - 1;
                if ((i && 0 === o || n && o === s) && !this._config.wrap) return e;
                var r = (o + (t === P ? -1 : 1)) % this._items.length;
                return -1 === r ? this._items[this._items.length - 1] : this._items[r]
            }, n._triggerSlideEvent = function (t, n) {
                var i = this._getItemIndex(t), o = this._getItemIndex(this._element.querySelector(Q.ACTIVE_ITEM)),
                    s = e.Event(H.SLIDE, {relatedTarget: t, direction: n, from: o, to: i});
                return e(this._element).trigger(s), s
            }, n._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    var n = [].slice.call(this._indicatorsElement.querySelectorAll(Q.ACTIVE));
                    e(n).removeClass(W);
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && e(i).addClass(W)
                }
            }, n._slide = function (t, n) {
                var i, o, s, r = this, a = this._element.querySelector(Q.ACTIVE_ITEM), l = this._getItemIndex(a),
                    h = n || a && this._getItemByDirection(t, a), u = this._getItemIndex(h), f = Boolean(this._interval);
                if (t === L ? (i = x, o = K, s = R) : (i = U, o = q, s = j), h && e(h).hasClass(W)) this._isSliding = !1; else if (!this._triggerSlideEvent(h, s).isDefaultPrevented() && a && h) {
                    this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(h);
                    var d = e.Event(H.SLID, {relatedTarget: h, direction: s, from: l, to: u});
                    if (e(this._element).hasClass(F)) {
                        e(h).addClass(o), c.reflow(h), e(a).addClass(i), e(h).addClass(i);
                        var _ = parseInt(h.getAttribute("data-interval"), 10);
                        _ ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = _) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var g = c.getTransitionDurationFromElement(a);
                        e(a).one(c.TRANSITION_END, function () {
                            e(h).removeClass(i + " " + o).addClass(W), e(a).removeClass(W + " " + o + " " + i), r._isSliding = !1, setTimeout(function () {
                                return e(r._element).trigger(d)
                            }, 0)
                        }).emulateTransitionEnd(g)
                    } else e(a).removeClass(W), e(h).addClass(W), this._isSliding = !1, e(this._element).trigger(d);
                    f && this.cycle()
                }
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.carousel"), o = r({}, O, e(this).data());
                    "object" == typeof n && (o = r({}, o, n));
                    var s = "string" == typeof n ? n : o.slide;
                    if (i || (i = new t(this, o), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n); else if ("string" == typeof s) {
                        if (void 0 === i[s]) throw new TypeError('No method named "' + s + '"');
                        i[s]()
                    } else o.interval && o.ride && (i.pause(), i.cycle())
                })
            }, t._dataApiClickHandler = function (n) {
                var i = c.getSelectorFromElement(this);
                if (i) {
                    var o = e(i)[0];
                    if (o && e(o).hasClass(M)) {
                        var s = r({}, e(o).data(), e(this).data()), a = this.getAttribute("data-slide-to");
                        a && (s.interval = !1), t._jQueryInterface.call(e(o), s), a && e(o).data("bs.carousel").to(a), n.preventDefault()
                    }
                }
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return O
                }
            }]), t
        }();
    e(document).on(H.CLICK_DATA_API, Q.DATA_SLIDE, Y._dataApiClickHandler), e(window).on(H.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(Q.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
            var o = e(t[n]);
            Y._jQueryInterface.call(o, o.data())
        }
    }), e.fn[A] = Y._jQueryInterface, e.fn[A].Constructor = Y, e.fn[A].noConflict = function () {
        return e.fn[A] = N, Y._jQueryInterface
    };
    var G = "collapse", X = e.fn[G], z = {toggle: !0, parent: ""}, $ = {toggle: "boolean", parent: "(string|element)"},
        J = {
            SHOW: "show.bs.collapse",
            SHOWN: "shown.bs.collapse",
            HIDE: "hide.bs.collapse",
            HIDDEN: "hidden.bs.collapse",
            CLICK_DATA_API: "click.bs.collapse.data-api"
        }, Z = "show", tt = "collapse", et = "collapsing", nt = "collapsed", it = "width", ot = "height",
        st = {ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'}, rt = function () {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(st.DATA_TOGGLE)), i = 0, o = n.length; i < o; i++) {
                    var s = n[i], r = c.getSelectorFromElement(s),
                        a = [].slice.call(document.querySelectorAll(r)).filter(function (e) {
                            return e === t
                        });
                    null !== r && a.length > 0 && (this._selector = r, this._triggerArray.push(s))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }

            var n = t.prototype;
            return n.toggle = function () {
                e(this._element).hasClass(Z) ? this.hide() : this.show()
            }, n.show = function () {
                var n, i, o = this;
                if (!this._isTransitioning && !e(this._element).hasClass(Z) && (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(st.ACTIVES)).filter(function (t) {
                    return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(tt)
                })).length && (n = null), !(n && (i = e(n).not(this._selector).data("bs.collapse")) && i._isTransitioning))) {
                    var s = e.Event(J.SHOW);
                    if (e(this._element).trigger(s), !s.isDefaultPrevented()) {
                        n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data("bs.collapse", null));
                        var r = this._getDimension();
                        e(this._element).removeClass(tt).addClass(et), this._element.style[r] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(nt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var a = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            l = c.getTransitionDurationFromElement(this._element);
                        e(this._element).one(c.TRANSITION_END, function () {
                            e(o._element).removeClass(et).addClass(tt).addClass(Z), o._element.style[r] = "", o.setTransitioning(!1), e(o._element).trigger(J.SHOWN)
                        }).emulateTransitionEnd(l), this._element.style[r] = this._element[a] + "px"
                    }
                }
            }, n.hide = function () {
                var t = this;
                if (!this._isTransitioning && e(this._element).hasClass(Z)) {
                    var n = e.Event(J.HIDE);
                    if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                        var i = this._getDimension();
                        this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", c.reflow(this._element), e(this._element).addClass(et).removeClass(tt).removeClass(Z);
                        var o = this._triggerArray.length;
                        if (o > 0) for (var s = 0; s < o; s++) {
                            var r = this._triggerArray[s], a = c.getSelectorFromElement(r);
                            if (null !== a) e([].slice.call(document.querySelectorAll(a))).hasClass(Z) || e(r).addClass(nt).attr("aria-expanded", !1)
                        }
                        this.setTransitioning(!0);
                        this._element.style[i] = "";
                        var l = c.getTransitionDurationFromElement(this._element);
                        e(this._element).one(c.TRANSITION_END, function () {
                            t.setTransitioning(!1), e(t._element).removeClass(et).addClass(tt).trigger(J.HIDDEN)
                        }).emulateTransitionEnd(l)
                    }
                }
            }, n.setTransitioning = function (t) {
                this._isTransitioning = t
            }, n.dispose = function () {
                e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function (t) {
                return (t = r({}, z, t)).toggle = Boolean(t.toggle), c.typeCheckConfig(G, t, $), t
            }, n._getDimension = function () {
                return e(this._element).hasClass(it) ? it : ot
            }, n._getParent = function () {
                var n, i = this;
                c.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    s = [].slice.call(n.querySelectorAll(o));
                return e(s).each(function (e, n) {
                    i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                }), n
            }, n._addAriaAndCollapsedClass = function (t, n) {
                var i = e(t).hasClass(Z);
                n.length && e(n).toggleClass(nt, !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function (t) {
                var e = c.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this), o = i.data("bs.collapse"), s = r({}, z, i.data(), "object" == typeof n && n ? n : {});
                    if (!o && s.toggle && /show|hide/.test(n) && (s.toggle = !1), o || (o = new t(this, s), i.data("bs.collapse", o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return z
                }
            }]), t
        }();
    e(document).on(J.CLICK_DATA_API, st.DATA_TOGGLE, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this), i = c.getSelectorFromElement(this), o = [].slice.call(document.querySelectorAll(i));
        e(o).each(function () {
            var t = e(this), i = t.data("bs.collapse") ? "toggle" : n.data();
            rt._jQueryInterface.call(t, i)
        })
    }), e.fn[G] = rt._jQueryInterface, e.fn[G].Constructor = rt, e.fn[G].noConflict = function () {
        return e.fn[G] = X, rt._jQueryInterface
    };
    var at = "dropdown", lt = e.fn[at], ct = new RegExp("38|40|27"), ht = {
            HIDE: "hide.bs.dropdown",
            HIDDEN: "hidden.bs.dropdown",
            SHOW: "show.bs.dropdown",
            SHOWN: "shown.bs.dropdown",
            CLICK: "click.bs.dropdown",
            CLICK_DATA_API: "click.bs.dropdown.data-api",
            KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
            KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
        }, ut = "disabled", ft = "show", dt = "dropup", _t = "dropright", gt = "dropleft", mt = "dropdown-menu-right",
        pt = "position-static", vt = '[data-toggle="dropdown"]', Et = ".dropdown form", bt = ".dropdown-menu",
        yt = ".navbar-nav", Tt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Ct = "top-start",
        St = "top-end", It = "bottom-start", Dt = "bottom-end", At = "right-start", wt = "left-start",
        Nt = {offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic"}, Ot = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, kt = function () {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }

            var i = t.prototype;
            return i.toggle = function () {
                if (!this._element.disabled && !e(this._element).hasClass(ut)) {
                    var i = t._getParentFromElement(this._element), o = e(this._menu).hasClass(ft);
                    if (t._clearMenus(), !o) {
                        var s = {relatedTarget: this._element}, r = e.Event(ht.SHOW, s);
                        if (e(i).trigger(r), !r.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var a = this._element;
                                "parent" === this._config.reference ? a = i : c.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(i).addClass(pt), this._popper = new n(a, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === e(i).closest(yt).length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(ft), e(i).toggleClass(ft).trigger(e.Event(ht.SHOWN, s))
                        }
                    }
                }
            }, i.show = function () {
                if (!(this._element.disabled || e(this._element).hasClass(ut) || e(this._menu).hasClass(ft))) {
                    var n = {relatedTarget: this._element}, i = e.Event(ht.SHOW, n),
                        o = t._getParentFromElement(this._element);
                    e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(ft), e(o).toggleClass(ft).trigger(e.Event(ht.SHOWN, n)))
                }
            }, i.hide = function () {
                if (!this._element.disabled && !e(this._element).hasClass(ut) && e(this._menu).hasClass(ft)) {
                    var n = {relatedTarget: this._element}, i = e.Event(ht.HIDE, n),
                        o = t._getParentFromElement(this._element);
                    e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(ft), e(o).toggleClass(ft).trigger(e.Event(ht.HIDDEN, n)))
                }
            }, i.dispose = function () {
                e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, i.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, i._addEventListeners = function () {
                var t = this;
                e(this._element).on(ht.CLICK, function (e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, i._getConfig = function (t) {
                return t = r({}, this.constructor.Default, e(this._element).data(), t), c.typeCheckConfig(at, t, this.constructor.DefaultType), t
            }, i._getMenuElement = function () {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(bt))
                }
                return this._menu
            }, i._getPlacement = function () {
                var t = e(this._element.parentNode), n = It;
                return t.hasClass(dt) ? (n = Ct, e(this._menu).hasClass(mt) && (n = St)) : t.hasClass(_t) ? n = At : t.hasClass(gt) ? n = wt : e(this._menu).hasClass(mt) && (n = Dt), n
            }, i._detectNavbar = function () {
                return e(this._element).closest(".navbar").length > 0
            }, i._getOffset = function () {
                var t = this, e = {};
                return "function" == typeof this._config.offset ? e.fn = function (e) {
                    return e.offsets = r({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, i._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {enabled: this._config.flip},
                        preventOverflow: {boundariesElement: this._config.boundary}
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {enabled: !1}), t
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.dropdown");
                    if (i || (i = new t(this, "object" == typeof n ? n : null), e(this).data("bs.dropdown", i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, t._clearMenus = function (n) {
                if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which)) for (var i = [].slice.call(document.querySelectorAll(vt)), o = 0, s = i.length; o < s; o++) {
                    var r = t._getParentFromElement(i[o]), a = e(i[o]).data("bs.dropdown"), l = {relatedTarget: i[o]};
                    if (n && "click" === n.type && (l.clickEvent = n), a) {
                        var c = a._menu;
                        if (e(r).hasClass(ft) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(r, n.target))) {
                            var h = e.Event(ht.HIDE, l);
                            e(r).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), e(c).removeClass(ft), e(r).removeClass(ft).trigger(e.Event(ht.HIDDEN, l)))
                        }
                    }
                }
            }, t._getParentFromElement = function (t) {
                var e, n = c.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function (n) {
                if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(bt).length)) : ct.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(ut))) {
                    var i = t._getParentFromElement(this), o = e(i).hasClass(ft);
                    if (o && (!o || 27 !== n.which && 32 !== n.which)) {
                        var s = [].slice.call(i.querySelectorAll(Tt));
                        if (0 !== s.length) {
                            var r = s.indexOf(n.target);
                            38 === n.which && r > 0 && r--, 40 === n.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
                        }
                    } else {
                        if (27 === n.which) {
                            var a = i.querySelector(vt);
                            e(a).trigger("focus")
                        }
                        e(this).trigger("click")
                    }
                }
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Nt
                }
            }, {
                key: "DefaultType", get: function () {
                    return Ot
                }
            }]), t
        }();
    e(document).on(ht.KEYDOWN_DATA_API, vt, kt._dataApiKeydownHandler).on(ht.KEYDOWN_DATA_API, bt, kt._dataApiKeydownHandler).on(ht.CLICK_DATA_API + " " + ht.KEYUP_DATA_API, kt._clearMenus).on(ht.CLICK_DATA_API, vt, function (t) {
        t.preventDefault(), t.stopPropagation(), kt._jQueryInterface.call(e(this), "toggle")
    }).on(ht.CLICK_DATA_API, Et, function (t) {
        t.stopPropagation()
    }), e.fn[at] = kt._jQueryInterface, e.fn[at].Constructor = kt, e.fn[at].noConflict = function () {
        return e.fn[at] = lt, kt._jQueryInterface
    };
    var Lt = e.fn.modal, Pt = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
        Rt = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, jt = {
            HIDE: "hide.bs.modal",
            HIDDEN: "hidden.bs.modal",
            SHOW: "show.bs.modal",
            SHOWN: "shown.bs.modal",
            FOCUSIN: "focusin.bs.modal",
            RESIZE: "resize.bs.modal",
            CLICK_DISMISS: "click.dismiss.bs.modal",
            KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
            MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
            MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
            CLICK_DATA_API: "click.bs.modal.data-api"
        }, Ht = "modal-dialog-scrollable", Mt = "modal-scrollbar-measure", Wt = "modal-backdrop", Ft = "modal-open",
        Ut = "fade", xt = "show", Kt = {
            DIALOG: ".modal-dialog",
            MODAL_BODY: ".modal-body",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top"
        }, qt = function () {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(Kt.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }

            var n = t.prototype;
            return n.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function (t) {
                var n = this;
                if (!this._isShown && !this._isTransitioning) {
                    e(this._element).hasClass(Ut) && (this._isTransitioning = !0);
                    var i = e.Event(jt.SHOW, {relatedTarget: t});
                    e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(jt.CLICK_DISMISS, Kt.DATA_DISMISS, function (t) {
                        return n.hide(t)
                    }), e(this._dialog).on(jt.MOUSEDOWN_DISMISS, function () {
                        e(n._element).one(jt.MOUSEUP_DISMISS, function (t) {
                            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return n._showElement(t)
                    }))
                }
            }, n.hide = function (t) {
                var n = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var i = e.Event(jt.HIDE);
                    if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var o = e(this._element).hasClass(Ut);
                        if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(jt.FOCUSIN), e(this._element).removeClass(xt), e(this._element).off(jt.CLICK_DISMISS), e(this._dialog).off(jt.MOUSEDOWN_DISMISS), o) {
                            var s = c.getTransitionDurationFromElement(this._element);
                            e(this._element).one(c.TRANSITION_END, function (t) {
                                return n._hideModal(t)
                            }).emulateTransitionEnd(s)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function () {
                [window, this._element, this._dialog].forEach(function (t) {
                    return e(t).off(".bs.modal")
                }), e(document).off(jt.FOCUSIN), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function () {
                this._adjustDialog()
            }, n._getConfig = function (t) {
                return t = r({}, Pt, t), c.typeCheckConfig("modal", t, Rt), t
            }, n._showElement = function (t) {
                var n = this, i = e(this._element).hasClass(Ut);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass(Ht) ? this._dialog.querySelector(Kt.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, i && c.reflow(this._element), e(this._element).addClass(xt), this._config.focus && this._enforceFocus();
                var o = e.Event(jt.SHOWN, {relatedTarget: t}), s = function () {
                    n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
                };
                if (i) {
                    var r = c.getTransitionDurationFromElement(this._dialog);
                    e(this._dialog).one(c.TRANSITION_END, s).emulateTransitionEnd(r)
                } else s()
            }, n._enforceFocus = function () {
                var t = this;
                e(document).off(jt.FOCUSIN).on(jt.FOCUSIN, function (n) {
                    document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                })
            }, n._setEscapeEvent = function () {
                var t = this;
                this._isShown && this._config.keyboard ? e(this._element).on(jt.KEYDOWN_DISMISS, function (e) {
                    27 === e.which && (e.preventDefault(), t.hide())
                }) : this._isShown || e(this._element).off(jt.KEYDOWN_DISMISS)
            }, n._setResizeEvent = function () {
                var t = this;
                this._isShown ? e(window).on(jt.RESIZE, function (e) {
                    return t.handleUpdate(e)
                }) : e(window).off(jt.RESIZE)
            }, n._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                    e(document.body).removeClass(Ft), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(jt.HIDDEN)
                })
            }, n._removeBackdrop = function () {
                this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function (t) {
                var n = this, i = e(this._element).hasClass(Ut) ? Ut : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = Wt, i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(jt.CLICK_DISMISS, function (t) {
                        n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                    }), i && c.reflow(this._backdrop), e(this._backdrop).addClass(xt), !t) return;
                    if (!i) return void t();
                    var o = c.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(c.TRANSITION_END, t).emulateTransitionEnd(o)
                } else if (!this._isShown && this._backdrop) {
                    e(this._backdrop).removeClass(xt);
                    var s = function () {
                        n._removeBackdrop(), t && t()
                    };
                    if (e(this._element).hasClass(Ut)) {
                        var r = c.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(c.TRANSITION_END, s).emulateTransitionEnd(r)
                    } else s()
                } else t && t()
            }, n._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function () {
                var t = this;
                if (this._isBodyOverflowing) {
                    var n = [].slice.call(document.querySelectorAll(Kt.FIXED_CONTENT)),
                        i = [].slice.call(document.querySelectorAll(Kt.STICKY_CONTENT));
                    e(n).each(function (n, i) {
                        var o = i.style.paddingRight, s = e(i).css("padding-right");
                        e(i).data("padding-right", o).css("padding-right", parseFloat(s) + t._scrollbarWidth + "px")
                    }), e(i).each(function (n, i) {
                        var o = i.style.marginRight, s = e(i).css("margin-right");
                        e(i).data("margin-right", o).css("margin-right", parseFloat(s) - t._scrollbarWidth + "px")
                    });
                    var o = document.body.style.paddingRight, s = e(document.body).css("padding-right");
                    e(document.body).data("padding-right", o).css("padding-right", parseFloat(s) + this._scrollbarWidth + "px")
                }
                e(document.body).addClass(Ft)
            }, n._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(Kt.FIXED_CONTENT));
                e(t).each(function (t, n) {
                    var i = e(n).data("padding-right");
                    e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                });
                var n = [].slice.call(document.querySelectorAll("" + Kt.STICKY_CONTENT));
                e(n).each(function (t, n) {
                    var i = e(n).data("margin-right");
                    void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                });
                var i = e(document.body).data("padding-right");
                e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = Mt, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function (n, i) {
                return this.each(function () {
                    var o = e(this).data("bs.modal"), s = r({}, Pt, e(this).data(), "object" == typeof n && n ? n : {});
                    if (o || (o = new t(this, s), e(this).data("bs.modal", o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](i)
                    } else s.show && o.show(i)
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Pt
                }
            }]), t
        }();
    e(document).on(jt.CLICK_DATA_API, Kt.DATA_TOGGLE, function (t) {
        var n, i = this, o = c.getSelectorFromElement(this);
        o && (n = document.querySelector(o));
        var s = e(n).data("bs.modal") ? "toggle" : r({}, e(n).data(), e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var a = e(n).one(jt.SHOW, function (t) {
            t.isDefaultPrevented() || a.one(jt.HIDDEN, function () {
                e(i).is(":visible") && i.focus()
            })
        });
        qt._jQueryInterface.call(e(n), s, this)
    }), e.fn.modal = qt._jQueryInterface, e.fn.modal.Constructor = qt, e.fn.modal.noConflict = function () {
        return e.fn.modal = Lt, qt._jQueryInterface
    };
    var Vt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"], Qt = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }, Bt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Yt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Gt(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), s = [].slice.call(i.body.querySelectorAll("*")), r = function (t, n) {
            var i = s[t], r = i.nodeName.toLowerCase();
            if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
            var a = [].slice.call(i.attributes), l = [].concat(e["*"] || [], e[r] || []);
            a.forEach(function (t) {
                (function (t, e) {
                    var n = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(n)) return -1 === Vt.indexOf(n) || Boolean(t.nodeValue.match(Bt) || t.nodeValue.match(Yt));
                    for (var i = e.filter(function (t) {
                        return t instanceof RegExp
                    }), o = 0, s = i.length; o < s; o++) if (n.match(i[o])) return !0;
                    return !1
                })(t, l) || i.removeAttribute(t.nodeName)
            })
        }, a = 0, l = s.length; a < l; a++) r(a);
        return i.body.innerHTML
    }

    var Xt = "tooltip", zt = e.fn.tooltip, $t = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Jt = ["sanitize", "whiteList", "sanitizeFn"], Zt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        }, te = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, ee = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Qt
        }, ne = "show", ie = "out", oe = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        }, se = "fade", re = "show", ae = ".tooltip-inner", le = ".arrow", ce = "hover", he = "focus", ue = "click",
        fe = "manual", de = function () {
            function t(t, e) {
                if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }

            var i = t.prototype;
            return i.enable = function () {
                this._isEnabled = !0
            }, i.disable = function () {
                this._isEnabled = !1
            }, i.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, i.toggle = function (t) {
                if (this._isEnabled) if (t) {
                    var n = this.constructor.DATA_KEY, i = e(t.currentTarget).data(n);
                    i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                } else {
                    if (e(this.getTipElement()).hasClass(re)) return void this._leave(null, this);
                    this._enter(null, this)
                }
            }, i.dispose = function () {
                clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, i.show = function () {
                var t = this;
                if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                var i = e.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    e(this.element).trigger(i);
                    var o = c.findShadowRoot(this.element),
                        s = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
                    if (i.isDefaultPrevented() || !s) return;
                    var r = this.getTipElement(), a = c.getUID(this.constructor.NAME);
                    r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(r).addClass(se);
                    var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        h = this._getAttachment(l);
                    this.addAttachmentClass(h);
                    var u = this._getContainer();
                    e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(u), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                        placement: h,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {behavior: this.config.fallbackPlacement},
                            arrow: {element: le},
                            preventOverflow: {boundariesElement: this.config.boundary}
                        },
                        onCreate: function (e) {
                            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                        },
                        onUpdate: function (e) {
                            return t._handlePopperPlacementChange(e)
                        }
                    }), e(r).addClass(re), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                    var f = function () {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === ie && t._leave(null, t)
                    };
                    if (e(this.tip).hasClass(se)) {
                        var d = c.getTransitionDurationFromElement(this.tip);
                        e(this.tip).one(c.TRANSITION_END, f).emulateTransitionEnd(d)
                    } else f()
                }
            }, i.hide = function (t) {
                var n = this, i = this.getTipElement(), o = e.Event(this.constructor.Event.HIDE), s = function () {
                    n._hoverState !== ne && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                };
                if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
                    if (e(i).removeClass(re), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger[ue] = !1, this._activeTrigger[he] = !1, this._activeTrigger[ce] = !1, e(this.tip).hasClass(se)) {
                        var r = c.getTransitionDurationFromElement(i);
                        e(i).one(c.TRANSITION_END, s).emulateTransitionEnd(r)
                    } else s();
                    this._hoverState = ""
                }
            }, i.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, i.isWithContent = function () {
                return Boolean(this.getTitle())
            }, i.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-tooltip-" + t)
            }, i.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, i.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(e(t.querySelectorAll(ae)), this.getTitle()), e(t).removeClass(se + " " + re)
            }, i.setElementContent = function (t, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Gt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
            }, i.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, i._getOffset = function () {
                var t = this, e = {};
                return "function" == typeof this.config.offset ? e.fn = function (e) {
                    return e.offsets = r({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, i._getContainer = function () {
                return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
            }, i._getAttachment = function (t) {
                return te[t.toUpperCase()]
            }, i._setListeners = function () {
                var t = this;
                this.config.trigger.split(" ").forEach(function (n) {
                    if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
                        return t.toggle(e)
                    }); else if (n !== fe) {
                        var i = n === ce ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            o = n === ce ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        e(t.element).on(i, t.config.selector, function (e) {
                            return t._enter(e)
                        }).on(o, t.config.selector, function (e) {
                            return t._leave(e)
                        })
                    }
                }), e(this.element).closest(".modal").on("hide.bs.modal", function () {
                    t.element && t.hide()
                }), this.config.selector ? this.config = r({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, i._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, i._enter = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? he : ce] = !0), e(n.getTipElement()).hasClass(re) || n._hoverState === ne ? n._hoverState = ne : (clearTimeout(n._timeout), n._hoverState = ne, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
                    n._hoverState === ne && n.show()
                }, n.config.delay.show) : n.show())
            }, i._leave = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? he : ce] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = ie, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
                    n._hoverState === ie && n.hide()
                }, n.config.delay.hide) : n.hide())
            }, i._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                return !1
            }, i._getConfig = function (t) {
                var n = e(this.element).data();
                return Object.keys(n).forEach(function (t) {
                    -1 !== Jt.indexOf(t) && delete n[t]
                }), "number" == typeof (t = r({}, this.constructor.Default, n, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), c.typeCheckConfig(Xt, t, this.constructor.DefaultType), t.sanitize && (t.template = Gt(t.template, t.whiteList, t.sanitizeFn)), t
            }, i._getDelegateConfig = function () {
                var t = {};
                if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, i._cleanTipClass = function () {
                var t = e(this.getTipElement()), n = t.attr("class").match($t);
                null !== n && n.length && t.removeClass(n.join(""))
            }, i._handlePopperPlacementChange = function (t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, i._fixTransition = function () {
                var t = this.getTipElement(), n = this.config.animation;
                null === t.getAttribute("x-placement") && (e(t).removeClass(se), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.tooltip"), o = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return ee
                }
            }, {
                key: "NAME", get: function () {
                    return Xt
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return "bs.tooltip"
                }
            }, {
                key: "Event", get: function () {
                    return oe
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType", get: function () {
                    return Zt
                }
            }]), t
        }();
    e.fn.tooltip = de._jQueryInterface, e.fn.tooltip.Constructor = de, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = zt, de._jQueryInterface
    };
    var _e = "popover", ge = e.fn.popover, me = new RegExp("(^|\\s)bs-popover\\S+", "g"), pe = r({}, de.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), ve = r({}, de.DefaultType, {content: "(string|element|function)"}), Ee = "fade", be = "show",
        ye = ".popover-header", Te = ".popover-body", Ce = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        }, Se = function (t) {
            var n, i;

            function s() {
                return t.apply(this, arguments) || this
            }

            i = t, (n = s).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var r = s.prototype;
            return r.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-popover-" + t)
            }, r.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, r.setContent = function () {
                var t = e(this.getTipElement());
                this.setElementContent(t.find(ye), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(Te), n), t.removeClass(Ee + " " + be)
            }, r._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function () {
                var t = e(this.getTipElement()), n = t.attr("class").match(me);
                null !== n && n.length > 0 && t.removeClass(n.join(""))
            }, s._jQueryInterface = function (t) {
                return this.each(function () {
                    var n = e(this).data("bs.popover"), i = "object" == typeof t ? t : null;
                    if ((n || !/dispose|hide/.test(t)) && (n || (n = new s(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
                        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, o(s, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return pe
                }
            }, {
                key: "NAME", get: function () {
                    return _e
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return "bs.popover"
                }
            }, {
                key: "Event", get: function () {
                    return Ce
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType", get: function () {
                    return ve
                }
            }]), s
        }(de);
    e.fn.popover = Se._jQueryInterface, e.fn.popover.Constructor = Se, e.fn.popover.noConflict = function () {
        return e.fn.popover = ge, Se._jQueryInterface
    };
    var Ie = "scrollspy", De = e.fn[Ie], Ae = {offset: 10, method: "auto", target: ""},
        we = {offset: "number", method: "string", target: "(string|element)"}, Ne = {
            ACTIVATE: "activate.bs.scrollspy",
            SCROLL: "scroll.bs.scrollspy",
            LOAD_DATA_API: "load.bs.scrollspy.data-api"
        }, Oe = "dropdown-item", ke = "active", Le = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        }, Pe = "offset", Re = "position", je = function () {
            function t(t, n) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + Le.NAV_LINKS + "," + this._config.target + " " + Le.LIST_ITEMS + "," + this._config.target + " " + Le.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(Ne.SCROLL, function (t) {
                    return i._process(t)
                }), this.refresh(), this._process()
            }

            var n = t.prototype;
            return n.refresh = function () {
                var t = this, n = this._scrollElement === this._scrollElement.window ? Pe : Re,
                    i = "auto" === this._config.method ? n : this._config.method, o = i === Re ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                    var n, s = c.getSelectorFromElement(t);
                    if (s && (n = document.querySelector(s)), n) {
                        var r = n.getBoundingClientRect();
                        if (r.width || r.height) return [e(n)[i]().top + o, s]
                    }
                    return null
                }).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).forEach(function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, n.dispose = function () {
                e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function (t) {
                if ("string" != typeof (t = r({}, Ae, "object" == typeof t && t ? t : {})).target) {
                    var n = e(t.target).attr("id");
                    n || (n = c.getUID(Ie), e(t.target).attr("id", n)), t.target = "#" + n
                }
                return c.typeCheckConfig(Ie, t, we), t
            }, n._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function () {
                var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, n._activate = function (t) {
                this._activeTarget = t, this._clear();
                var n = this._selector.split(",").map(function (e) {
                    return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                }), i = e([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass(Oe) ? (i.closest(Le.DROPDOWN).find(Le.DROPDOWN_TOGGLE).addClass(ke), i.addClass(ke)) : (i.addClass(ke), i.parents(Le.NAV_LIST_GROUP).prev(Le.NAV_LINKS + ", " + Le.LIST_ITEMS).addClass(ke), i.parents(Le.NAV_LIST_GROUP).prev(Le.NAV_ITEMS).children(Le.NAV_LINKS).addClass(ke)), e(this._scrollElement).trigger(Ne.ACTIVATE, {relatedTarget: t})
            }, n._clear = function () {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                    return t.classList.contains(ke)
                }).forEach(function (t) {
                    return t.classList.remove(ke)
                })
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.scrollspy");
                    if (i || (i = new t(this, "object" == typeof n && n), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Ae
                }
            }]), t
        }();
    e(window).on(Ne.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(Le.DATA_SPY)), n = t.length; n--;) {
            var i = e(t[n]);
            je._jQueryInterface.call(i, i.data())
        }
    }), e.fn[Ie] = je._jQueryInterface, e.fn[Ie].Constructor = je, e.fn[Ie].noConflict = function () {
        return e.fn[Ie] = De, je._jQueryInterface
    };
    var He = e.fn.tab, Me = {
            HIDE: "hide.bs.tab",
            HIDDEN: "hidden.bs.tab",
            SHOW: "show.bs.tab",
            SHOWN: "shown.bs.tab",
            CLICK_DATA_API: "click.bs.tab.data-api"
        }, We = "dropdown-menu", Fe = "active", Ue = "disabled", xe = "fade", Ke = "show", qe = ".dropdown",
        Ve = ".nav, .list-group", Qe = ".active", Be = "> li > .active",
        Ye = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', Ge = ".dropdown-toggle",
        Xe = "> .dropdown-menu .active", ze = function () {
            function t(t) {
                this._element = t
            }

            var n = t.prototype;
            return n.show = function () {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(Fe) || e(this._element).hasClass(Ue))) {
                    var n, i, o = e(this._element).closest(Ve)[0], s = c.getSelectorFromElement(this._element);
                    if (o) {
                        var r = "UL" === o.nodeName || "OL" === o.nodeName ? Be : Qe;
                        i = (i = e.makeArray(e(o).find(r)))[i.length - 1]
                    }
                    var a = e.Event(Me.HIDE, {relatedTarget: this._element}), l = e.Event(Me.SHOW, {relatedTarget: i});
                    if (i && e(i).trigger(a), e(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
                        s && (n = document.querySelector(s)), this._activate(this._element, o);
                        var h = function () {
                            var n = e.Event(Me.HIDDEN, {relatedTarget: t._element}),
                                o = e.Event(Me.SHOWN, {relatedTarget: i});
                            e(i).trigger(n), e(t._element).trigger(o)
                        };
                        n ? this._activate(n, n.parentNode, h) : h()
                    }
                }
            }, n.dispose = function () {
                e.removeData(this._element, "bs.tab"), this._element = null
            }, n._activate = function (t, n, i) {
                var o = this, s = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(Qe) : e(n).find(Be))[0],
                    r = i && s && e(s).hasClass(xe), a = function () {
                        return o._transitionComplete(t, s, i)
                    };
                if (s && r) {
                    var l = c.getTransitionDurationFromElement(s);
                    e(s).removeClass(Ke).one(c.TRANSITION_END, a).emulateTransitionEnd(l)
                } else a()
            }, n._transitionComplete = function (t, n, i) {
                if (n) {
                    e(n).removeClass(Fe);
                    var o = e(n.parentNode).find(Xe)[0];
                    o && e(o).removeClass(Fe), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (e(t).addClass(Fe), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), c.reflow(t), t.classList.contains(xe) && t.classList.add(Ke), t.parentNode && e(t.parentNode).hasClass(We)) {
                    var s = e(t).closest(qe)[0];
                    if (s) {
                        var r = [].slice.call(s.querySelectorAll(Ge));
                        e(r).addClass(Fe)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this), o = i.data("bs.tab");
                    if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(Me.CLICK_DATA_API, Ye, function (t) {
        t.preventDefault(), ze._jQueryInterface.call(e(this), "show")
    }), e.fn.tab = ze._jQueryInterface, e.fn.tab.Constructor = ze, e.fn.tab.noConflict = function () {
        return e.fn.tab = He, ze._jQueryInterface
    };
    var $e = e.fn.toast, Je = {
            CLICK_DISMISS: "click.dismiss.bs.toast",
            HIDE: "hide.bs.toast",
            HIDDEN: "hidden.bs.toast",
            SHOW: "show.bs.toast",
            SHOWN: "shown.bs.toast"
        }, Ze = "fade", tn = "hide", en = "show", nn = "showing",
        on = {animation: "boolean", autohide: "boolean", delay: "number"},
        sn = {animation: !0, autohide: !0, delay: 500}, rn = '[data-dismiss="toast"]', an = function () {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }

            var n = t.prototype;
            return n.show = function () {
                var t = this;
                e(this._element).trigger(Je.SHOW), this._config.animation && this._element.classList.add(Ze);
                var n = function () {
                    t._element.classList.remove(nn), t._element.classList.add(en), e(t._element).trigger(Je.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove(tn), this._element.classList.add(nn), this._config.animation) {
                    var i = c.getTransitionDurationFromElement(this._element);
                    e(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, n.hide = function (t) {
                var n = this;
                this._element.classList.contains(en) && (e(this._element).trigger(Je.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
                    n._close()
                }, this._config.delay))
            }, n.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(en) && this._element.classList.remove(en), e(this._element).off(Je.CLICK_DISMISS), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null
            }, n._getConfig = function (t) {
                return t = r({}, sn, e(this._element).data(), "object" == typeof t && t ? t : {}), c.typeCheckConfig("toast", t, this.constructor.DefaultType), t
            }, n._setListeners = function () {
                var t = this;
                e(this._element).on(Je.CLICK_DISMISS, rn, function () {
                    return t.hide(!0)
                })
            }, n._close = function () {
                var t = this, n = function () {
                    t._element.classList.add(tn), e(t._element).trigger(Je.HIDDEN)
                };
                if (this._element.classList.remove(en), this._config.animation) {
                    var i = c.getTransitionDurationFromElement(this._element);
                    e(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this), o = i.data("bs.toast");
                    if (o || (o = new t(this, "object" == typeof n && n), i.data("bs.toast", o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](this)
                    }
                })
            }, o(t, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType", get: function () {
                    return on
                }
            }, {
                key: "Default", get: function () {
                    return sn
                }
            }]), t
        }();
    e.fn.toast = an._jQueryInterface, e.fn.toast.Constructor = an, e.fn.toast.noConflict = function () {
        return e.fn.toast = $e, an._jQueryInterface
    }, function () {
        if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = e.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(), t.Util = c, t.Alert = g, t.Button = D, t.Carousel = Y, t.Collapse = rt, t.Dropdown = kt, t.Modal = qt, t.Popover = Se, t.Scrollspy = je, t.Tab = ze, t.Toast = an, t.Tooltip = de, Object.defineProperty(t, "__esModule", {value: !0})
});