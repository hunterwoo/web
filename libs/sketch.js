/* Copyright (C) 2013 Justin Windle, http://soulwire.co.uk */
!function (e, t) {
    "object" == typeof exports ? module.exports = t(e, e.document) : "function" == typeof define && define.amd ? define(function () {
        return t(e, e.document)
    }) : e.Sketch = t(e, e.document)
}(typeof window !== "undefined" ? window : this, function (e, t) {
    "use strict";
    function n(e) {
        return "[object Array]" == Object.prototype.toString.call(e)
    }

    function o(e) {
        return "function" == typeof e
    }

    function r(e) {
        return "number" == typeof e
    }

    function i(e) {
        return "string" == typeof e
    }

    function u(e) {
        return C[e] || String.fromCharCode(e)
    }

    function a(e, t, n) {
        for (var o in t)!n && o in e || (e[o] = t[o]);
        return e
    }

    function c(e, t) {
        return function () {
            e.apply(t, arguments)
        }
    }

    function s(e) {
        var t = {};
        for (var n in e)t[n] = o(e[n]) ? c(e[n], e) : e[n];
        return t
    }

    function l(e) {
        function t(t) {
            o(t) && t.apply(e, [].splice.call(arguments, 1))
        }

        function n(e) {
            for (_ = 0; _ < et.length; _++)B = et[_], i(B) ? O[(e ? "add" : "remove") + "EventListener"].call(O, B, k, !1) : o(B) ? k = B : O = B
        }

        function r() {
            R(T), T = L(r), K || (t(e.setup), K = o(e.setup)), U || (t(e.resize), U = o(e.resize)), e.running && !Y && (e.dt = (z = +new Date) - e.now, e.millis += e.dt, e.now = z, t(e.update), Z && (e.retina && (e.save(), e.scale(V, V)), e.autoclear && e.clear()), t(e.draw), Z && e.retina && e.restore()), Y = ++Y % e.interval
        }

        function c() {
            O = J ? e.style : e.canvas, D = J ? "px" : "", Q = e.width, X = e.height, e.fullscreen && (X = e.height = w.innerHeight, Q = e.width = w.innerWidth), e.retina && Z && V && (O.style.height = X + "px", O.style.width = Q + "px", Q *= V, X *= V), O.height !== X && (O.height = X + D), O.width !== Q && (O.width = Q + D), K && t(e.resize)
        }

        function l(e, t) {
            return N = t.getBoundingClientRect(), e.x = e.pageX - N.left - (w.scrollX || w.pageXOffset), e.y = e.pageY - N.top - (w.scrollY || w.pageYOffset), e
        }

        function f(t, n) {
            return l(t, e.element), n = n || {}, n.ox = n.x || t.x, n.oy = n.y || t.y, n.x = t.x, n.y = t.y, n.dx = n.x - n.ox, n.dy = n.y - n.oy, n
        }

        function d(e) {
            if (e.preventDefault(), G = s(e), G.originalEvent = e, G.touches)for (M.length = G.touches.length, _ = 0; _ < G.touches.length; _++)M[_] = f(G.touches[_], M[_]); else M.length = 0, M[0] = f(G, $);
            return a($, M[0], !0), G
        }

        function g(n) {
            for (n = d(n), j = (q = et.indexOf(W = n.type)) - 1, e.dragging = /down|start/.test(W) ? !0 : /up|end/.test(W) ? !1 : e.dragging; j;)i(et[j]) ? t(e[et[j--]], n) : i(et[q]) ? t(e[et[q++]], n) : j = 0
        }

        function p(n) {
            F = n.keyCode, H = "keyup" == n.type, tt[F] = tt[u(F)] = !H, t(e[n.type], n)
        }

        function m(n) {
            e.autopause && ("blur" == n.type ? b : y)(), t(e[n.type], n)
        }

        function y() {
            e.now = +new Date, e.running = !0
        }

        function b() {
            e.running = !1
        }

        function P() {
            (e.running ? b : y)()
        }

        function A() {
            Z && e.clearRect(0, 0, e.width, e.height)
        }

        function S() {
            I = e.element.parentNode, _ = E.indexOf(e), I && I.removeChild(e.element), ~_ && E.splice(_, 1), n(!1), b()
        }

        var T, k, O, I, N, _, D, z, B, G, W, F, H, j, q, Q, X, Y = 0, M = [], U = !1, K = !1, V = w.devicePixelRatio || 1, J = e.type == x, Z = e.type == h, $ = {
            x: 0,
            y: 0,
            ox: 0,
            oy: 0,
            dx: 0,
            dy: 0
        }, et = [e.element, g, "mousedown", "touchstart", g, "mousemove", "touchmove", g, "mouseup", "touchend", g, "click", g, "mouseout", g, "mouseover", v, p, "keydown", "keyup", w, m, "focus", "blur", c, "resize"], tt = {};
        for (F in C)tt[C[F]] = !1;
        return a(e, {
            touches: M,
            mouse: $,
            keys: tt,
            dragging: !1,
            running: !1,
            millis: 0,
            now: 0 / 0,
            dt: 0 / 0,
            destroy: S,
            toggle: P,
            clear: A,
            start: y,
            stop: b
        }), E.push(e), e.autostart && y(), n(!0), c(), r(), e
    }

    for (var f, d, g = "E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "), p = "__hasSketch", m = Math, h = "canvas", y = "webgl", x = "dom", v = t, w = e, E = [], b = {
        fullscreen: !0,
        autostart: !0,
        autoclear: !0,
        autopause: !0,
        container: v.body,
        interval: 1,
        globals: !0,
        retina: !1,
        type: h
    }, C = {
        8: "BACKSPACE",
        9: "TAB",
        13: "ENTER",
        16: "SHIFT",
        27: "ESCAPE",
        32: "SPACE",
        37: "LEFT",
        38: "UP",
        39: "RIGHT",
        40: "DOWN"
    }, P = {
        CANVAS: h, WEB_GL: y, WEBGL: y, DOM: x, instances: E, install: function (e) {
            if (!e[p]) {
                for (var t = 0; t < g.length; t++)e[g[t]] = m[g[t]];
                a(e, {
                    TWO_PI: 2 * m.PI, HALF_PI: m.PI / 2, QUATER_PI: m.PI / 4, random: function (e, t) {
                        return n(e) ? e[~~(m.random() * e.length)] : (r(t) || (t = e || 1, e = 0), e + m.random() * (t - e))
                    }, lerp: function (e, t, n) {
                        return e + n * (t - e)
                    }, map: function (e, t, n, o, r) {
                        return (e - t) / (n - t) * (r - o) + o
                    }
                }), e[p] = !0
            }
        }, create: function (e) {
            return e = a(e || {}, b), e.globals && P.install(self), f = e.element = e.element || v.createElement(e.type === x ? "div" : "canvas"), d = e.context = e.context || function () {
                    switch (e.type) {
                        case h:
                            return f.getContext("2d", e);
                        case y:
                            return f.getContext("webgl", e) || f.getContext("experimental-webgl", e);
                        case x:
                            return f.canvas = f
                    }
                }(), (e.container || v.body).appendChild(f), P.augment(d, e)
        }, augment: function (e, t) {
            return t = a(t || {}, b), t.element = e.canvas || e, t.element.className += " sketch", a(e, t, !0), l(e)
        }
    }, A = ["ms", "moz", "webkit", "o"], S = self, T = 0, k = "AnimationFrame", O = "request" + k, I = "cancel" + k, L = S[O], R = S[I], N = 0; N < A.length && !L; N++)L = S[A[N] + "Request" + k], R = S[A[N] + "Cancel" + k];
    return S[O] = L = L || function (e) {
            var t = +new Date, n = m.max(0, 16 - (t - T)), o = setTimeout(function () {
                e(t + n)
            }, n);
            return T = t + n, o
        }, S[I] = R = R || function (e) {
            clearTimeout(e)
        }, P
});