! function (e, r) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : e.Pristine = r()
}(this, function () {
    "use strict";

    function e(e) {
        var r = arguments;
        return this.replace(/\${([^{}]*)}/g, function (e, t) {
            return r[t]
        })
    }

    function r(e) {
        return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length
    }

    function t(r, t, n) {
        function u(e, r, t, n) {
            var i = l[t];
            if (i && (e.push(i), n)) {
                var s = n.split(",");
                s.unshift(null), r[t] = s
            }
        }

        function c(e) {
            if (e.errorElements) return e.errorElements;
            var r = function (e, r) {
                for (;
                    (e = e.parentElement) && !e.classList.contains(r););
                return e
            }(e.input, m.config.classTo),
                t = null,
                n = null;
            return (t = m.config.classTo === m.config.errorTextParent ? r : r.querySelector(m.errorTextParent)) && ((n = t.querySelector("." + s)) || ((n = document.createElement(m.config.errorTextTag)).className = s + " " + m.config.errorTextClass, t.appendChild(n), n.pristineDisplay = n.style.display)), e.errorElements = [r, n]
        }

        function f(e) {
            var r = c(e),
                t = r[0],
                n = r[1];
            t && (t.classList.remove(m.config.successClass), t.classList.add(m.config.errorClass)), n && (n.innerHTML = e.errors.join("<br/>"), n.style.display = n.pristineDisplay || "")
        }

        function p(e) {
            var r = function (e) {
                var r = c(e),
                    t = r[0],
                    n = r[1];
                return t && (t.classList.remove(m.config.errorClass), t.classList.remove(m.config.successClass)), n && (n.innerHTML = "", n.style.display = "none"), r
            }(e)[0];
            r && r.classList.add(m.config.successClass)
        }
        var m = this;
        return function (e, r, t) {
            e.setAttribute("novalidate", "true"), m.form = e, m.config = function (e, r) {
                for (var t in r) t in e || (e[t] = r[t]);
                return e
            }(r || {}, i), m.live = !(!1 === t), m.fields = Array.from(e.querySelectorAll(a)).map(function (e) {
                var r = [],
                    t = {},
                    n = {};
                return [].forEach.call(e.attributes, function (e) {
                    if (/^data-pristine-/.test(e.name)) {
                        var i = e.name.substr(14);
                        if (i.endsWith("-message")) return void (n[i.slice(0, i.length - 8)] = e.value);
                        "type" === i && (i = e.value), u(r, t, i, e.value)
                    } else ~o.indexOf(e.name) ? u(r, t, e.name, e.value) : "type" === e.name && u(r, t, e.value)
                }), r.sort(function (e, r) {
                    return r.priority - e.priority
                }), m.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function (e) {
                    m.validate(e.target)
                }.bind(m)), e.pristine = {
                    input: e,
                    validators: r,
                    params: t,
                    messages: n,
                    self: m
                }
            }.bind(m))
        }(r, t, n), m.validate = function (r, t) {
            t = r && !0 === t || !0 === r;
            var n = m.fields;
            !0 !== r && !1 !== r && (r instanceof HTMLElement ? n = [r.pristine] : (r instanceof NodeList || r instanceof (window.$ || Array) || r instanceof Array) && (n = Array.from(r).map(function (e) {
                return e.pristine
            })));
            var i = !0;
            for (var s in n) {
                var a = n[s];
                ! function (r) {
                    var t = [],
                        n = !0;
                    for (var i in r.validators) {
                        var s = r.validators[i],
                            a = r.params[s.name] ? r.params[s.name] : [];
                        if (a[0] = r.input.value, !s.fn.apply(r.input, a)) {
                            n = !1;
                            var o = r.messages[s.name] || s.msg;
                            if (t.push(e.apply(o, a)), !0 === s.halt) break
                        }
                    }
                    return r.errors = t, n
                }(a) ? (i = !1, !t && f(a)) : !t && p(a)
            }
            return i
        }, m.getErrors = function (e) {
            if (!e) {
                for (var r = [], t = 0; t < m.fields.length; t++) {
                    var n = m.fields[t];
                    n.errors.length && r.push({
                        input: n.input,
                        errors: n.errors
                    })
                }
                return r
            }
            return e.length ? e[0].pristine.errors : e.pristine.errors
        }, m.addValidator = function (e, r, t, n, i) {
            e instanceof HTMLElement ? (e.pristine.validators.push({
                fn: r,
                msg: t,
                priority: n,
                halt: i
            }), e.pristine.validators.sort(function (e, r) {
                return r.priority - e.priority
            })) : console.warn("The parameter elem must be a dom element")
        }, m.addError = function (e, r) {
            (e = e.length ? e[0] : e).pristine.errors.push(r), f(e.pristine)
        }, m.reset = function () {
            for (var e in m.fields) m.fields[e].errorElements = null;
            Array.from(m.form.querySelectorAll("." + s)).map(function (e) {
                e.parentNode.removeChild(e)
            }), Array.from(m.form.querySelectorAll("." + m.config.classTo)).map(function (e) {
                e.classList.remove(m.config.successClass), e.classList.remove(m.config.errorClass)
            })
        }, m.destroy = function () {
            m.reset(), m.fields.forEach(function (e) {
                delete e.input.pristine
            }), m.fields = []
        }, m.setGlobalConfig = function (e) {
            i = e
        }, m
    }
    var n = {
        required: "Preencha o campo corretamente",
        email: "Preencha o campo corretamente",
        number: "Preencha o campo corretamente",
        url: "Preencha o campo corretamente",
        tel: "Preencha o campo corretamente",
        maxlength: "Preencha o campo corretamente",
        minlength: "Preencha o campo corretamente",
        min: "Preencha o campo corretamente",
        max: "Preencha o campo corretamente",
        pattern: "Preencha o campo corretamente"
    },
        i = {
            classTo: "form-group",
            errorClass: "has-danger",
            successClass: "has-success",
            errorTextParent: "form-group",
            errorTextTag: "div",
            errorTextClass: "text-help"
        },
        s = "pristine-error",
        a = "input:not([type^=hidden]):not([type^=submit]), select, textarea",
        o = ["required", "min", "max", "minlength", "maxlength", "pattern"],
        l = {},
        u = function (e, r) {
            r.name = e, r.msg || (r.msg = n[e]), void 0 === r.priority && (r.priority = 1), l[e] = r
        };
    return u("text", {
        fn: function (e) {
            return !0
        },
        priority: 0
    }), u("required", {
        fn: function (e) {
            return "radio" === this.type || "checkbox" === this.type ? r(this) : void 0 !== e && "" !== e
        },
        priority: 99,
        halt: !0
    }), u("email", {
        fn: function (e) {
            return !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
        }
    }), u("number", {
        fn: function (e) {
            return !e || !isNaN(parseFloat(e))
        },
        priority: 2
    }), u("integer", {
        fn: function (e) {
            return e && /^\d+$/.test(e)
        }
    }), u("minlength", {
        fn: function (e, r) {
            return !e || e.length >= parseInt(r)
        }
    }), u("maxlength", {
        fn: function (e, r) {
            return !e || e.length <= parseInt(r)
        }
    }), u("min", {
        fn: function (e, t) {
            return !e || ("checkbox" === this.type ? r(this) >= parseInt(t) : parseFloat(e) >= parseFloat(t))
        }
    }), u("max", {
        fn: function (e, t) {
            return !e || ("checkbox" === this.type ? r(this) <= parseInt(t) : parseFloat(e) <= parseFloat(t))
        }
    }), u("pattern", {
        fn: function (e, r) {
            var t = r.match(new RegExp("^/(.*?)/([gimy]*)$"));
            return !e || new RegExp(t[1], t[2]).test(e)
        }
    }), t.addValidator = function (e, r, t, n, i) {
        u(e, {
            fn: r,
            msg: t,
            priority: n,
            halt: i
        })
    }, t
});