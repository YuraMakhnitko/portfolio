(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        n = e.dataset.da.trim().split(","),
        i = {};
      (i.element = e),
        (i.parent = e.parentNode),
        (i.destination = document.querySelector(n[0].trim())),
        (i.breakpoint = n[1] ? n[1].trim() : "767"),
        (i.place = n[2] ? n[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, n) {
          return Array.prototype.indexOf.call(n, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const n = this.mediaQueries[e],
        i = String.prototype.split.call(n, ","),
        s = window.matchMedia(i[0]),
        a = i[1],
        o = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === a;
        });
      s.addListener(function () {
        t.mediaHandler(s, o);
      }),
        this.mediaHandler(s, o);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const n = e[t];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, n) {
      e.classList.add(this.daClassname),
        "last" === t || t >= n.children.length
          ? n.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? n.children[t].insertAdjacentElement("beforebegin", e)
          : n.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, n) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[n]
          ? t.children[n].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const n = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(n, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  var e = function () {
    return (e =
      Object.assign ||
      function (t) {
        for (var e, n = 1, i = arguments.length; n < i; n++)
          for (var s in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
        return t;
      }).apply(this, arguments);
  };
  !(function () {
    function t(t, n, i) {
      var s = this;
      (this.endVal = n),
        (this.options = i),
        (this.version = "2.3.2"),
        (this.defaults = {
          startVal: 0,
          decimalPlaces: 0,
          duration: 2,
          useEasing: !0,
          useGrouping: !0,
          smartEasingThreshold: 999,
          smartEasingAmount: 333,
          separator: ",",
          decimal: ".",
          prefix: "",
          suffix: "",
          enableScrollSpy: !1,
          scrollSpyDelay: 200,
          scrollSpyOnce: !1,
        }),
        (this.finalEndVal = null),
        (this.useEasing = !0),
        (this.countDown = !1),
        (this.error = ""),
        (this.startVal = 0),
        (this.paused = !0),
        (this.once = !1),
        (this.count = function (t) {
          s.startTime || (s.startTime = t);
          var e = t - s.startTime;
          (s.remaining = s.duration - e),
            s.useEasing
              ? s.countDown
                ? (s.frameVal =
                    s.startVal -
                    s.easingFn(e, 0, s.startVal - s.endVal, s.duration))
                : (s.frameVal = s.easingFn(
                    e,
                    s.startVal,
                    s.endVal - s.startVal,
                    s.duration
                  ))
              : (s.frameVal =
                  s.startVal + (s.endVal - s.startVal) * (e / s.duration));
          var n = s.countDown ? s.frameVal < s.endVal : s.frameVal > s.endVal;
          (s.frameVal = n ? s.endVal : s.frameVal),
            (s.frameVal = Number(s.frameVal.toFixed(s.options.decimalPlaces))),
            s.printValue(s.frameVal),
            e < s.duration
              ? (s.rAF = requestAnimationFrame(s.count))
              : null !== s.finalEndVal
              ? s.update(s.finalEndVal)
              : s.callback && s.callback();
        }),
        (this.formatNumber = function (t) {
          var e,
            n,
            i,
            a,
            o = t < 0 ? "-" : "";
          e = Math.abs(t).toFixed(s.options.decimalPlaces);
          var r = (e += "").split(".");
          if (
            ((n = r[0]),
            (i = r.length > 1 ? s.options.decimal + r[1] : ""),
            s.options.useGrouping)
          ) {
            a = "";
            for (var l = 0, c = n.length; l < c; ++l)
              0 !== l && l % 3 == 0 && (a = s.options.separator + a),
                (a = n[c - l - 1] + a);
            n = a;
          }
          return (
            s.options.numerals &&
              s.options.numerals.length &&
              ((n = n.replace(/[0-9]/g, function (t) {
                return s.options.numerals[+t];
              })),
              (i = i.replace(/[0-9]/g, function (t) {
                return s.options.numerals[+t];
              }))),
            o + s.options.prefix + n + i + s.options.suffix
          );
        }),
        (this.easeOutExpo = function (t, e, n, i) {
          return (n * (1 - Math.pow(2, (-10 * t) / i)) * 1024) / 1023 + e;
        }),
        (this.options = e(e({}, this.defaults), i)),
        (this.formattingFn = this.options.formattingFn
          ? this.options.formattingFn
          : this.formatNumber),
        (this.easingFn = this.options.easingFn
          ? this.options.easingFn
          : this.easeOutExpo),
        (this.startVal = this.validateValue(this.options.startVal)),
        (this.frameVal = this.startVal),
        (this.endVal = this.validateValue(n)),
        (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
        this.resetDuration(),
        (this.options.separator = String(this.options.separator)),
        (this.useEasing = this.options.useEasing),
        "" === this.options.separator && (this.options.useGrouping = !1),
        (this.el = "string" == typeof t ? document.getElementById(t) : t),
        this.el
          ? this.printValue(this.startVal)
          : (this.error = "[CountUp] target is null or undefined"),
        "undefined" != typeof window &&
          this.options.enableScrollSpy &&
          (this.error
            ? console.error(this.error, t)
            : ((window.onScrollFns = window.onScrollFns || []),
              window.onScrollFns.push(function () {
                return s.handleScroll(s);
              }),
              (window.onscroll = function () {
                window.onScrollFns.forEach(function (t) {
                  return t();
                });
              }),
              this.handleScroll(this)));
    }
    (t.prototype.handleScroll = function (t) {
      if (t && window && !t.once) {
        var e = window.innerHeight + window.scrollY,
          n = t.el.getBoundingClientRect(),
          i = n.top + n.height + window.pageYOffset;
        i < e && i > window.scrollY && t.paused
          ? ((t.paused = !1),
            setTimeout(function () {
              return t.start();
            }, t.options.scrollSpyDelay),
            t.options.scrollSpyOnce && (t.once = !0))
          : window.scrollY > i && !t.paused && t.reset();
      }
    }),
      (t.prototype.determineDirectionAndSmartEasing = function () {
        var t = this.finalEndVal ? this.finalEndVal : this.endVal;
        this.countDown = this.startVal > t;
        var e = t - this.startVal;
        if (
          Math.abs(e) > this.options.smartEasingThreshold &&
          this.options.useEasing
        ) {
          this.finalEndVal = t;
          var n = this.countDown ? 1 : -1;
          (this.endVal = t + n * this.options.smartEasingAmount),
            (this.duration = this.duration / 2);
        } else (this.endVal = t), (this.finalEndVal = null);
        null !== this.finalEndVal
          ? (this.useEasing = !1)
          : (this.useEasing = this.options.useEasing);
      }),
      (t.prototype.start = function (t) {
        this.error ||
          ((this.callback = t),
          this.duration > 0
            ? (this.determineDirectionAndSmartEasing(),
              (this.paused = !1),
              (this.rAF = requestAnimationFrame(this.count)))
            : this.printValue(this.endVal));
      }),
      (t.prototype.pauseResume = function () {
        this.paused
          ? ((this.startTime = null),
            (this.duration = this.remaining),
            (this.startVal = this.frameVal),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)))
          : cancelAnimationFrame(this.rAF),
          (this.paused = !this.paused);
      }),
      (t.prototype.reset = function () {
        cancelAnimationFrame(this.rAF),
          (this.paused = !0),
          this.resetDuration(),
          (this.startVal = this.validateValue(this.options.startVal)),
          (this.frameVal = this.startVal),
          this.printValue(this.startVal);
      }),
      (t.prototype.update = function (t) {
        cancelAnimationFrame(this.rAF),
          (this.startTime = null),
          (this.endVal = this.validateValue(t)),
          this.endVal !== this.frameVal &&
            ((this.startVal = this.frameVal),
            null == this.finalEndVal && this.resetDuration(),
            (this.finalEndVal = null),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)));
      }),
      (t.prototype.printValue = function (t) {
        var e = this.formattingFn(t);
        "INPUT" === this.el.tagName
          ? (this.el.value = e)
          : "text" === this.el.tagName || "tspan" === this.el.tagName
          ? (this.el.textContent = e)
          : (this.el.innerHTML = e);
      }),
      (t.prototype.ensureNumber = function (t) {
        return "number" == typeof t && !isNaN(t);
      }),
      (t.prototype.validateValue = function (t) {
        var e = Number(t);
        return this.ensureNumber(e)
          ? e
          : ((this.error = "[CountUp] invalid start or end value: ".concat(t)),
            null);
      }),
      (t.prototype.resetDuration = function () {
        (this.startTime = null),
          (this.duration = 1e3 * Number(this.options.duration)),
          (this.remaining = this.duration);
      });
  })();
  let n = !1;
  setTimeout(() => {
    if (n) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  const i = document.querySelectorAll("._anim-imtems"),
    s = document.querySelectorAll(".range-percent"),
    a = document.querySelectorAll("[data-box]");
  if (i.length > 0) {
    let c = !0;
    function u() {
      i.forEach((t) => {
        const e = t.offsetHeight,
          n = d(t).top;
        let i = (window.innerHeight + e) / 1.1;
        if (
          window.scrollY > n - i &&
          window.scrollY < n + e &&
          window.scrollY > window.innerHeight / 4
        ) {
          const e = document.querySelector(".skills__skill"),
            n = document.querySelector(".skills__content"),
            i = document.querySelectorAll(".skills__range");
          t.classList.add("_active"),
            i.length > 0 &&
              i.forEach((t) => {
                c &&
                  window.scrollY > n.offsetHeight - 5 * e.offsetHeight &&
                  t.classList.add("_active-range");
              }),
            c &&
              window.scrollY > n.offsetHeight - 5 * e.offsetHeight &&
              s.length > 0 &&
              (s.forEach((t) => {
                !(function (t, e, n) {
                  let i = 0,
                    s = Math.round(e / t / 1),
                    a = setInterval(() => {
                      (i += 1), i == t && clearInterval(a), (n.innerHTML = i);
                    }, s);
                })(t.getAttribute("data-percent"), 2e3, t);
              }),
              (c = !1));
        }
      }),
        a.length > 0 &&
          a.forEach((t) => {
            const e = t.querySelector("[data-work]"),
              n = d(t).top,
              i = d(e).top,
              s = d(document.querySelector("._last-work")).top;
            window.scrollY > i - 20
              ? e.classList.add("_stop")
              : window.scrollY < n - 20 && e.classList.remove("_stop"),
              window.scrollY > s - 20 && e.classList.remove("_stop");
          });
    }
    function d(t) {
      const e = t.getBoundingClientRect(),
        n = window.pageXOffset || document.documentElement.scrollLeft,
        i = window.pageYOffset || document.documentElement.scrollTop;
      return { top: e.top + i, left: e.left + n };
    }
    window.addEventListener("scroll", u),
      setTimeout(() => {
        u();
      }, 300);
  }
  document.querySelector(".cursor-big");
  const o = document.querySelector(".cursor"),
    r = document.querySelector(".cursor-small"),
    l = document.querySelectorAll("a");
  l.forEach((t) => {
    t.addEventListener("mouseover", () => {
      o.classList.add("_active-cursor"), r.classList.add("_active-cursor");
    });
  }),
    l.forEach((t) => {
      t.addEventListener("mouseout", () => {
        o.classList.remove("_active-cursor"),
          r.classList.remove("_active-cursor");
      });
    }),
    document.addEventListener("mousemove", (t) => {
      o.style.cssText = r.style.cssText =
        "left:" + t.clientX + "px; top:" + t.clientY + "px";
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    });
})();
