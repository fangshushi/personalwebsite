//var ipad = function(){  
//        return navigator.userAgent.match(/iPad/i)?true:false;  
//    }
    
$(function() {
    var e, t, n, a, i, r, o, s, l, c, d, u, p, f, v, m;
    
    return $.createEventCapturing = function() {
        var e;
        return e = $.event.special, function(t) {
            return document.addEventListener ? ("string" == typeof t && (t = [t]), $.each(t, function(t, n) {
                var a;
                return a = function(e) {
                    return e = $.event.fix(e), $.event.dispatch.call(this, e)
                }, e[n] = e[n] || {}, e[n].setup || e[n].teardown ? void 0 : $.extend(e[n], {
                    setup: function() {
                        this.addEventListener(n, a, !0)
                    },
                    teardown: function() {
                        this.removeEventListener(n, a, !0)
                    }
                })
            })) : void 0
        }
    }(), $.createEventCapturing(["play", "loadedmetadata", "pause", "ended"]), u = function(e) {
        var t, n, a, i;
        for (null == e && (e = 36), a = Math.floor(4294967296 * Math.random()), t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = "", n = 26; e > 0;) n -= 6, e -= 6, i += t[63 & a >>> n] ? t[63 & a >>> n] : "t";
        return i
    }, c = function(e) {
        return '<div class="modal modal-video fade" id="' + e.name + '" tabindex="-1">\n  <div class="modal-dialog modal-lg default-margin">\n    <div class="modal-content">\n    <div class="modal-header">\n      <a class="modal-close pull-right icon icon-remove" data-dismiss="modal"></a>\n    </div>\n      <div class="modal-body">\n        <div class="video-loading">\n          <img src="https://dn-st.teambition.net/site/v1.0.0/images/index/model-video-bg.gif?' + (new Date).getTime() + '" class="img-responsive">\n        </div>\n        <div class="embed-responsive embed-responsive-16by9">\n          <video class="embed-responsive-item" controls="controls">\n            <source src="' + e.url + '" type="video/mp4">\n          </video>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
    }, e = $(window), t = $('.page-index, body[class*="page-support"]'), n = $(".watch-handler", t), r = {
        delayMin: 3500
    }, d = {
        tbOfficial: {
            initDelay: 300
        },
        actionCase: {
            initDelay: 1400
        },
        videoList: {
            isInit: !0,
            endClose: !1
        }
    }, n.on("click", function(e) {
        var t, n, a, i;
        return e.preventDefault(), t = $(e.currentTarget), a = t.data("name"), i = t.data("url") || t.data("video"), n = t.data("endClose") || !0, p(a, i, n)
    }), t.on("show.bs.modal", ".modal-video", function(e) {
        var t, n, a;
        return t = $(e.target), n = $("video", t).get(0), a = t.attr("id"), v(n, a)
    }), t.on("hidden.bs.modal", ".modal-video", function(e) {
        var t;
        return t = $(e.target), o(t)
    }), t.on("keyup", ".modal-video", function(e) {
        var t, n, a, i, r;
        return e.preventDefault(), t = $(e.target), n = $("video", t).get(0), r = t.hasClass("video-list"), i = t.hasClass("is-list-init"), a = t.hasClass("is-init"), (!r || i) && 32 === e.keyCode && a ? m(n) : void 0
    }), t.on("click", ".modal-video .toggle-play", function(e) {
        var t, n;
        return t = $(e.target).closest(".modal-video"), n = $("video", t).get(0), m(n)
    }), e.on("resize.modal", function(e) {
        var t;
        return t = $(".modal-video:visible"), f(t)
    }), t.on("play loadedmetadata pause ended", function(e) {
        var t, n, i, r;
        switch (n = $(e.target), t = n.closest(".modal-video"), r = t.attr("id"), i = e.type) {
        case "play":
            return l(t, r, i);
        case "loadedmetadata":
            return l(t, r, i);
        case "pause":
            return a(t, r, i);
        case "ended":
            return a(t, r, i)
        }
    }), i = function() {
        return n.each(function(e, t) {
            var n, a;
            return n = $(t), n.data("name") ? void 0 : (a = u(), n.attr("data-name", a), d[a] = {})
        })
    }, p = function(e, n, a) {
        var i, r, o;
        return o = d[e], null != o.isInit ? i = $("[id='" + e + "']") : (i = $(c({
            name: e,
            url: n
        })), r = $("video", i).get(0), o.url = n, o.endClose = a, $(".modal-video", t).filter("[id='" + e + "']:not(.is-init)").remove(), i.appendTo(t), r.load()), i.css({
            display: "block"
        }), f(i), i.modal("show")
    }, v = function(e, t) {
        var n;
        return n = d[t], n.timeLoad = (new Date).getTime(), e.play()
    }, o = function(e) {
        return $("video", e).get(0).pause()
    }, f = function(t) {
        var n, a, i, r;
        return i = 630, r = 768, n = $(".modal-dialog", t), e.width() > r && e.height() > i ? (a = (e.height() - n.outerHeight()) / 2, n.css({
            marginTop: a + "px",
            marginBottom: 0
        })) : n.removeAttr("style")
    }, l = function(e, t, n) {
        var a, i, o, s;
        return a = $("video", e).get(0), o = d[t], o && (null == o.isInit && "loadedmetadata" === n && (a.pause(), o.timeStart = (new Date).getTime(), i = null != o.playedTime ? o.playedTime - o.timeStart : o.timeStart - o.timeLoad, s = i > r.delayMin ? 0 : r.delayMin - i, setTimeout(function() {
            return a.play(), e.hasClass("in") ? setTimeout(function() {
                return o.isInit = !0, e.addClass("is-init is-playing"), e.on("transitionend webkitTransitionEnd", ".video-loading", function() {
                    return $(this).remove()
                })
            }, o.initDelay || 0) : (a.pause(), e.remove())
        }, s)), "play" === n && (o.playedTime = (new Date).getTime()), null != o.isInit) ? e.addClass("is-playing") : void 0
    }, a = function(e, t, n) {
        var a;
        return e.removeClass("is-playing"), "ended" === n && (null != (a = d[t]) ? a.endClose : void 0) ? (e.modal("hide"), d[t].isInit = !1) : void 0
    }, m = function(e) {
        return e.paused ? e.play() : e.pause()
    }, window.modalVideo = {
        modals: d
    }, (s = function() {
        return i()
    })()
}), $(function() {
    var e, t, n, a;
    return a = $(".tbsite-article"), t = {
        appid: "",
        title: document.title,
        desc: $('meta[name="description"]').attr("content"),
        image: $(".navbar-brand").data("circle"),
        link: location.href,
        callback: function() {}
    }, a.length ? (e = a.find(".modal-wechat .qrcode"), e.qrcode({
        text: e.data("src"),
        size: 250
    }), n = $.extend({}, t, {
        title: a.find(".title").text(),
        desc: e.data("desc"),
        image: a.find(".topbanner").data("bg"),
        link: e.data("src")
    })) : n = t, $(document).on("WeixinJSBridgeReady", function() {
        return WeixinJSBridge.on("menu:share:appmessage", function() {
            return WeixinJSBridge.invoke("sendAppMessage", {
                appid: n.appid,
                title: n.title,
                desc: n.desc,
                img_url: n.image,
                link: n.link
            }, n.callback)
        }), WeixinJSBridge.on("menu:share:timeline", function() {
            return WeixinJSBridge.invoke("shareTimeline", {
                title: n.title,
                desc: n.desc,
                img_url: n.image,
                link: n.link
            }, n.callback)
        })
    })
}), $(function() {
    var e, t, n, a, i, r, o, s;
    return t = $(".csr-form :input"), o = $("#teambition-account"), a = $(".csr-form #submit"), r = !1, i = !1, $(".csr-form .type").on("click", function() {
        return $(".type").removeClass("active"), $(this).addClass("active")
    }), a.on("click", function(a) {
        var l;
        return a.preventDefault(), l = {
            email: o.val(),
            type: $(".active").data("type"),
            name: $("#organization-name").val(),
            description: $("#organization-description").val(),
            contact: $("#organization-contact-info").val()
        }, r === !1 ? n(l.email) ? $.post("/philanthropy", l, function(e) {
            return s(teambitionI18n.applySuccess, !1), r = !0, t.off(".validate")
        }).fail(function() {
            return i = !0, s(teambitionI18n.pleaseRetry, !0), e()
        }) : (i = !0, o.addClass("validate-error"), s(teambitionI18n.errorEmail, !0)) : s(teambitionI18n.submitted, !0)
    }), t.on("keyup.validate", function() {
        if (n(o.val())) {
            if (o.removeClass("validate-error"), i) return e() ? s(teambitionI18n.applyNow, !1) : s(teambitionI18n.pleaseRetry, !0)
        } else if (i) return o.addClass("validate-error"), s(teambitionI18n.errorEmail, !0)
    }), e = function() {
        var e;
        return e = !0, t.each(function() {
            return $.trim(this.value) ? $(this).removeClass("validate-error") : ($(this).addClass("validate-error"), e = !1), !0
        }), e
    }, s = function(e, t) {
        return a.html(e + ' <img src="">')[t ? "addClass" : "removeClass"]("disabled")
    }, n = function(e) {
        var t;
        return t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, t.test(e)
    }
}), $(function() {
    var e, t, n;
    return t = $(".deploy-form"), e = t.find(".confirm-handler"), n = !1, e.on("click", function(t) {
        var a;
        return t.preventDefault(), a = {
            type: "deployment",
            companyName: $("#company-name").val(),
            contactName: $("#contact-name").val(),
            contact: $("#contact-phone").val()
        }, n === !1 ? $.post("/philanthropy", a, function(t) {
            return e.html(teambitionI18n.applySuccess), n = !0
        }).fail(function() {
            return e.html(teambitionI18n.pleaseRetry)
        }) : e.html(teambitionI18n.submitted).addClass("disabled")
    }), t.find(".form-input").on("keydown", function() {
        return e.html(teambitionI18n.confirm)
    })
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d, u;
    return i = $("#incubator-name-sh").html(), a = $("#incubator-name-bj").html(), r = $("#incubator-name-sz").html(), t = $("#incubator-name"), n = $(".incubator-form :input"), o = $("#teambition-account"), e = $(".incubator-form #submit-handler"), d = !1, c = !1, t.html(i), $("#organization-city").change(function() {
        return t.empty(), 0 === this.selectedIndex ? t.html(i) : 1 === this.selectedIndex ? t.html(a) : t.html(r)
    }), e.on("click", function(e) {
        var t;
        return e.preventDefault(), t = {
            type: "incubator",
            email: $("#teambition-account").val(),
            name: $("#organization-name").val(),
            city: $("#organization-city").val(),
            incubatorName: $("#incubator-name").val(),
            description: $("#organization-desc").val(),
            contactName: $("#organization-contact-name").val(),
            contact: $("#organization-contact-info").val()
        }, d === !1 ? l(t.email) ? $.post("/philanthropy", t, function(e) {
            return u(teambitionI18n.applySuccess, !1), d = !0, n.off(".validate")
        }).fail(function() {
            return c = !0, u(teambitionI18n.pleaseRetry, !0), s()
        }) : (c = !0, o.addClass("validate-error"), u(teambitionI18n.errorEmail, !0)) : u(teambitionI18n.submitted, !0)
    }), n.on("keyup.validate", function() {
        if (l(o.val())) {
            if (o.removeClass("validate-error"), c) return s() ? u(teambitionI18n.applyNow, !1) : u(teambitionI18n.pleaseRetry, !0)
        } else if (c) return o.addClass("validate-error"), u(teambitionI18n.errorEmail, !0)
    }), s = function() {
        var e;
        return e = !0, n.each(function() {
            return $.trim(this.value) ? $(this).removeClass("validate-error") : ($(this).addClass("validate-error"), e = !1), !0
        }), e
    }, u = function(t, n) {
        return e.html(t)[n ? "addClass" : "removeClass"]("disabled")
    }, l = function(e) {
        var t;
        return t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, t.test(e)
    }
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c;
    return i = $(".research-form"), n = i.find(".input-group"), a = i.find(".form-control"), t = i.find("#contact"), e = i.find(".confirm-handler"), l = !1, s = !1, i.find(".subtype").on("click", function() {
        return $(".subtype").removeClass("active"), $(this).addClass("active")
    }), i.find("#share-experience").on("click", function() {
        return $("#content").attr("placeholder", "输入您要分享的内容")
    }), i.find("#need-help").on("click", function() {
        return $("#content").attr("placeholder", "输入您遇到的问题")
    }), e.on("click", function(e) {
        var n;
        return e.preventDefault(), n = {
            type: "research",
            subtype: $(".subtype.active").data("subtype"),
            industry: $("#industry").val(),
            companyName: $("#company-name").val(),
            name: $("#name").val(),
            jobTitle: $("#job-title").val(),
            contact: t.val(),
            phone: $("#phone").val(),
            users: $("#users").val(),
            content: $("#content").val()
        }, l === !1 ? o(n.contact) ? $.post("/philanthropy", n, function(e) {
            return c(teambitionI18n.applySuccess, !1), l = !0, a.off(".validate")
        }).fail(function() {
            return s = !0, c(teambitionI18n.pleaseRetry, !0), r()
        }) : (s = !0, t.addClass("validate-error"), c(teambitionI18n.errorEmail, !0)) : c(teambitionI18n.submitted, !0)
    }), a.on("keyup", function() {
        return $.trim(this.value).length ? $(this).parents().addClass("has-value") : $(this).parents().removeClass("has-value")
    }), a.on("keyup.validate", function() {
        if (o(t.val())) {
            if (t.removeClass("validate-error"), s) return r() ? c("加入行业研究计划", !1) : c(teambitionI18n.pleaseRetry, !0)
        } else if (s) return t.addClass("validate-error"), c(teambitionI18n.errorEmail, !0)
    }), r = function() {
        var e;
        return e = !0, a.each(function() {
            return $.trim(this.value) ? $(this).removeClass("validate-error") : ($(this).addClass("validate-error"), e = !1), !0
        }), e
    }, c = function(t, n) {
        return e.html(t)[n ? "addClass" : "removeClass"]("disabled")
    }, o = function(e) {
        var t;
        return t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, t.test(e)
    }
}), $(function() {
    var e, t, n;
    return t = $(".page-apps .site-main"), e = $(".page-apps .site-footer"), n = $(".page-apps .container"), t.removeClass("pc ios android"), /(iPhone|iPod|iOS)/i.test(navigator.userAgent) ? (t.addClass("ios"), e.css("display", "none")) : /(Android)/i.test(navigator.userAgent) ? (t.addClass("android"), e.css("display", "none")) : (t.addClass("pc"), e.css("display", "block"))
}), $(function() {
    var e;
    return e = {
        animation: !0,
        triggrt: "hover"
    }, $(".devtooltip").tooltip(e), $("body").scrollspy({
        target: ".api-sidebar"
    }), $(".api-sidebar").affix({
        offset: {
            top: $(".site-header").outerHeight() + $(".jumbotron").outerHeight(!0)
        }
    }), $("body").on("click", ".back-to-top", function(e) {
        return e.preventDefault(), $("body").animate({
            scrollTop: 0
        }, 300)
    })
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d, u, p, f;
    return a = $(".page-index"), n = $(".site-header"), i = $(".press"), t = $(".goto-work"), r = $(".quote-wrap"), e = $(".quote-handlerset .cursor"), $(".members-tab a").on("click", function(e) {
        return e.preventDefault(), $(this).tab("show")
    }), o = function() {
        return a.on("mouseover click", ".quote-handler", function(e) {
            return u(e)
        })
    }, u = function(e) {
        var t;
        return t = $(e.currentTarget), t.hasClass("is-current") && "mouseover" === e.type ? void 0 : (p(t), f(t), d(t))
    }, l = function() {
        var e;
        return e = $("#hero-slide"), e.carousel({
            interval: 1e4,
            pause: !1
        })
    }, p = function(e) {
        var t, n;
        return n = e.index() > 3 ? e.index() - 1 : e.index(), t = r.find(".quote-item").eq(n), r.css("height", t.height()), i.carousel({
            interval: !1
        }), i.carousel(n)
    }, f = function(e) {
        return e.addClass("is-current").siblings().removeClass("is-current")
    }, d = function(t) {
        var n, a;
        return n = -10, a = t.position().left + parseInt(t.css("margin-left"), 10) + t.width() / 2, a += n, e.css("left", a)
    }, s = function() {
        var e, n, i, r, o, s, l, c;
        (a.hasClass("zh") || a.hasClass("tw")) && (i = $(".full-video-wrap", t), s = $("video", i)[0], n = $(".demo-video-banner", t), o = $("video", n)[0], r = $(".start-handler", t), e = $(".video-close", t), a.on("play pause ended", function(t) {
            var n, a;
            if (a = t.target, n = t.type, "fullVideo" === a.id) switch (n) {
            case "ended":
                return e.trigger("click")
            }
        }), $(window).on("scroll", _.throttle(function(e) {
            var t, n, r, o;
           // if (i) return o = a.scrollTop() || document.documentElement.scrollTop, t = i.offset().top, n = i.height(), r = 200, o > t - r && t + n - r > o ? i.hasClass("is-start") ? void 0 : l("start") : l("stop")
        }, 200)), r.on("click", function() {
            return l("stop"), c("start")
        }), e.on("click", function() {
            return l("start"), c("stop")
        }), c = function(e) {
            var t;
            return t = i.attr("class").split(" ").pop(), i.removeClass(t).addClass("is-" + e), "start" === e ? (s.currentTime = 0, s.play()) : s.pause()
        }, l = function(e) {
            var t;
            return t = n.attr("class").split(" ").pop(), n.removeClass(t).addClass("is-" + e), "start" === e ? (o.play(), r.one("bsTransitionEnd", function(e) {
                return l("started")
            })) : "stop" === e ? (r.off("bsTransitionEnd"), o.pause()) : void 0
        })
    }, c = function() {
        return a.length ? (o(), l(), s(), $(".quote-handler.is-current").trigger("click")) : void 0
    }()
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d;
    return n = $(window), e = $(".members-list"), t = e.find(".member"), c = {
        imageSize: 190,
        lookStraight: 30
    }, a = function(e, t, n, a) {
        var i, r, o, s, l;
        return s = e - n, l = t - a, i = Math.sqrt(s * s + l * l), i < c.lookStraight ? o = 12 : (r = Math.PI / 6, o = Math.round(Math.atan2(s, l) / r), o -= 3, o = (12 - o) % 12), o
    }, d = function(e, n) {
        var i, r;
        return r = c.imageSize, i = c.imageSize, $.each(t, function(t, o) {
            var s, l, c, d, u;
            return o = $(o), s = o.offset(), l = s.left + r / 2, c = s.top + i / 2, u = 1, d = -i * a(e, n, l, c) - u, o.css("background-position", "0px " + d + "px")
        })
    }, o = function(e) {
        return d(e.pageX, e.pageY)
    }, r = function(e) {
        var t, n, a, i, r, o, s, l, c;
        if (window.hasOwnProperty("ontouchstart") || navigator.msMaxTouchPoints > 0) {
            if (i = !1, t = 3, n = n > -t && t > n ? 0 : Math.floor(e.originalEvent.beta), a = a > -t && t > a ? 0 : Math.floor(e.originalEvent.gamma), c = {
                x: document.body.clientWidth / 2,
                y: screen.height / 2
            }, void 0 === r && (r = {
                beta: n,
                gamma: a
            }), void 0 !== window.orientation) {
                switch (window.orientation) {
                case 0:
                case 90:
                    l = n, n = -a, a = l;
                    break;
                case 180:
                    a = -a, n = -n;
                    break;
                case -90:
                    l = n, n = a, a = -l
                }
                i = !0
            }
            if (0 !== n && n !== r.beta && (c.y += n, c.y > document.body.clientHeight ? c.y = document.body.clientHeight : c.y < 0 && (c.y = 0), i = !0), i) return $(window).unbind("mousemove"), o = c.x, s = c.y, d(o, s)
        }
    }, l = function(e) {
        var t, n;
        return t = e.height(), n = e.offset().top, d(e.offset().left + t / 2, n + t / 2)
    }, i = function(e) {
        var t;
        return t = $(this).hasClass("member") ? $(this) : $("#" + $(this).data("target")), t.hasClass("back") ? (t.removeClass("back"), t.hasClass("supporter") || t.find(".full-name").addClass("transparent")) : (t.siblings(".member").removeClass("back"), t.hasClass("supporter") || (t.siblings(".member:not('.supporter')").find(".full-name").addClass("transparent"), t.find(".full-name").removeClass("transparent")), t.addClass("back")), t.hasClass("back") ? ($(window).unbind("mousemove"), $(window).unbind("deviceorientation"), l(t)) : ($(window).mousemove(o), $(window).on("deviceorientation", r), o(e))
    }, s = function() {
        return n.on("mousemove", o), n.on("deviceorientation", r), t.click(i)
    }, e.length ? s() : void 0
}), $(function() {
    return $(".page-new").on("click", ".feature-title", function() {
        return $(this).parent(".feature").toggleClass("open")
    })
}), $(function() {
    var e;
    return e = document.location.toString(), e.match("#") ? $(".partner-tab a[href=#" + e.split("#")[1] + "]").tab("show") : void 0
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d, u, p, f, v, m, h, g, b, y, w, C, k, x;
    return k = function() {
        return '<div class="modal-backdrop nav-backdrop fade"></div>'
    }, x = function() {
        return '<ul class="title-nav">\n  {{#titles}}\n    <li><a href="#{{id}}" data-id="{{id}}">{{{title}}}</a></li>\n  {{/titles}}\n</ul>'
    }, C = function(e, t, n) {
        var a, i;
        return null == n && (n = 0), i = $(window).height(), t ? (a = e.offset().top - n, a < l.scrollTop() && (a -= 49)) : a = e.offset().top + e.outerHeight() + n - i, $("html, body").animate({
            scrollTop: a
        }, 300)
    }, g = function(e) {
        var t, n;
        return e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), t = new RegExp("[\\?&]" + e + "=([^&#]*)"), n = t.exec(location.search), null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    }, w = function(e, t) {
        var n, a;
        return e.stopPropagation(), n = $(e.currentTarget), a = n.scrollTop(), t > 0 && 2 > a ? !1 : 0 > t && n[0].scrollHeight - n.innerHeight() - a < 2 ? !1 : void 0
    }, y = function(e, t) {
        var n, a, i;
        return a = "<span class='highlight'>" + t + "</span>", i = new RegExp(t + "(?!([^<]+)?>)", "igm"), n = e.html().replace(i, a), e.html(n), $(".highlight", e).each(function(e, t) {
            return setTimeout(function() {
                return $(t).addClass("on")
            }, 100 * e)
        })
    }, l = $('body[class*="page-support"], body[class*="page-best-practices"]'), c = $("body.page-support"), d = $("body.page-support-search"), p = $(".search-wrapper", l), s = $(".support-list", l), f = $(".question-nav", l), a = $(".question-content", l), u = $(".search-input", p), u.keyup(function() {
        var e;
        return e = $(this).val(), "" !== e ? $(".search-handler").addClass("active") : $(".search-handler").removeClass("active")
    }).focus(function() {
        return $(".search-icon").addClass("active")
    }).blur(function() {
        var e;
        return e = $(this).val(), "" === e ? $(".search-icon").removeClass("active") : void 0
    }), s.on("click", ".item-title", function(e) {
        var t, n;
        return e.preventDefault(), n = $(e.target), t = n.closest(".list-group-item"), $(".item-content", t).slideToggle(218, function() {}), t.siblings().children(".item-content").slideUp(218)
    }), n = $(k()), o = $(".detail-wrapper"), l.on("click", ".toggle-switch, .nav-backdrop", function() {
        return f.toggleClass("is-open"), f.hasClass("is-open") ? (o.after(n), setTimeout(function() {
            return n.addClass("in")
        }, 0)) : (n.removeClass("in"), setTimeout(function() {
            return n.remove()
        }, 218))
    }), f.on("mousewheel", ".list-wrap", function(e, t) {
        return $(window).width() < 768 ? w(e, t) : void 0
    }).on("click", ".title-nav a", function() {
        var e, t;
        return t = $(this).data("id"), e = a.find("h4[data-id='" + t + "']"), C(e, !0, 16), n.trigger("click")
    }), m = $(".video-list-handler"), v = $(".video-list"), i = $("video", v), r = i.get(0), t = $(".album-list", v), e = $(".album-item", t), m.on("click", function(t) {
        return t.preventDefault(), e.hasClass("is-current") ? void 0 : r.pause()
    }), e.on("click", function() {
        var t, n;
        return t = $(this), n = t.data("url"), v.addClass("is-list-init"), i.children("source").attr("src", n), r.load(), r.play(), e.filter(".is-current").addClass("has-watched"), t.addClass("is-current").siblings().removeClass("is-current")
    }), l.on("ended", function() {
        return e.filter(".is-current").removeClass("is-current"), v.removeClass("is-list-init")
    }), h = function() {
        var e, t, n, i;
        return e = $(".is-current:not(.nav-title)", f), t = $("section h4:first-child", a), i = {}, i.titles = [], t.each(function(e) {
            var t, n;
            return t = "section" + (e + 1), n = $(this).html(), $(this).attr("data-id", t), i.titles.push({
                title: n,
                id: t
            })
        }), i.titles.length && (n = Mustache.render(x(), i), $(n).appendTo(e)), location.hash && l.length ? setTimeout(function() {
            var e;
            return e = t.filter($("[data-id='" + location.hash.slice(1) + "']")), C(e, !0, 16)
        }, 500) : void 0
    }, b = function() {
        var e, t;
        return h(), $('[data-toggle="tooltip"]').tooltip(), d.length ? (e = $(".support-list", d), t = g("q"), y(e, t)) : void 0
    }, l.length && b(), c.length && "#video" === location.hash ? m.trigger("click") : void 0
}), $(function() {
    var e, t, n;
    return e = $(".page-info-member"), $(".next", e).on("click", function(e) {
        var t, n;
        return t = $(".act"), n = t.next(), n.length || (n = t.siblings("li:first")), t.fadeOut(600, function() {
            return $(".workerlist li").removeClass("act"), n.fadeIn(600).addClass("act")
        })
    }), $(".prev", e).on("click", function(e) {
        var t, n;
        return t = $(".act"), n = t.prev(), n.length || (n = t.siblings("li:last")), t.fadeOut(600, function() {
            return $(".workerlist li").removeClass("act"), n.fadeIn(600).addClass("act")
        })
    }), t = function(e) {
        var t, n;
        return n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), t = window.location.search.substr(1).match(n), t ? unescape(t[2]) : void 0
    }, n = t("index"), n >= 0 ? $(".workerlist li").removeClass("act").eq(n).addClass("act") : void 0
}), $(function() {
    return $(".page-tour .slide img").lazyload({
        effect: "fadeIn",
        placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    })
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d;
    return l = $(".tbsite-article"), a = $(".navbar-brand"), i = $(".question-nav"), t = $(".question-detail"), l.length && (c = l.find(".topbanner"), n = l.find(".loadingbar"), navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) || $(window).scroll(function() {
        var e, t;
        return e = $(window).scrollTop(), t = 1 * (c.height() - e) / c.height(), c.css("opacity", t)
    }), d = new Image, d.src = c.data("bg"), d.onload = function() {
        return c.css("background-image", "url(" + d.src + ")"), n.fadeOut(500, function() {
            return this.remove()
        })
    }, i.hasClass("practices-articles") && $(window).width() > 767) ? (i.css("left", a.offset().left), r = i.height(), s = $(".question-content").offset().top, o = i.offset().left, e = t.height(), $(window).scroll(function() {
        var e;
        return i.css("left", a.offset().left), e = $(".question-detail").height() - 80 - $(".question-nav").height(), $(window).scrollTop() >= e ? i.css({
            position: "absolute",
            top: e + 27,
            left: -($(".site-header .container").width() - $(".detail-wrapper .container").width()) / 2
        }) : i.css({
            position: "fixed",
            top: s
        })
    }), $(window).resize(function() {
        return i.css("left", a.offset().left), $(window).trigger("scroll")
    })) : void 0
}), $(function() {
    var e, t, n, a, i, r, o, s;
    return n = $(".tbsite-case"), t = $(".case-banner li", n), e = $(".case-banner-btn li", n), a = t.length, i = 0, o = function() {
        return e.removeClass("active").removeAttr("class"), e.eq(i).addClass("active"), t.removeClass("active").removeAttr("class"), t.eq(i).addClass("active")
    }, r = function() {
        return i++, i === a && (i = 0), o(i)
    }, s = setInterval(function() {
        return r()
    }, 3500), e.on("click", function(e) {
        var t;
        return clearInterval(s), t = $(e.currentTarget), i = t.index(), o(), s = setInterval(function() {
            return r()
        }, 3500)
    })
}), $(function() {
    var e, t, n, a, i, r, o, s, l, c, d, u, p, f, v, m, h, g;
    return navigator.userAgent.match(/micromessenger/i) || ($("body.tbsite-article").length && (m = $(".tbsite-article .topbanner").height() || 200), $(".page-careers .site-header").headroom({
        offset: 300,
        tolerance: 5,
        classes: {
            initial: "animated",
            pinned: "slideDown",
            unpinned: "slideUp"
        }

    })), e = $("body"), l = $(".site-header", e), u = $(".navbar-collapse", l), c = $(".switch-locale-wrap", u), d = $(".switch-locale", c), t = $(".login", l), n = $(".signup", l), p = $(".info-wrap", l), s = $(".dropdown-toggle", c), i = $(".page-careers .category"), r = $(".category-item"), o = $(".category-nav li"), a = $(".category-fixed"), h =801, g = function() {
        return $(window).width() <= h ? (l.removeClass("transparent"), l.addClass("mobile-header"), s.attr("data-toggle", "dropdown")) : e.hasClass("page-index") && (e.scrollTop() || document.documentElement.scrollTop) <= 0 ? (l.removeClass("mobile-header"), l.addClass("transparent"), s.attr("data-toggle", " ")) : (l.removeClass("transparent mobile-header"), s.attr("data-toggle", " "))
    }, v = function() {
        var t, n;
        if (e.hasClass("page-careers") && 0 !== a.length) return t = i.height() + i.offset().top - 160, n = $(window).scrollTop(), n >= t ? a.addClass("show") : a.removeClass("show")
    }, f = function() {
        var t, n, i, s, l, c, d;
        if (e.hasClass("page-careers") && 0 !== a.length) {
            for (v(), d = $(window).scrollTop(), i = n = 0, c = r.length; c > n; i = ++n) t = r[i], l = $(r[i]).offset().top, s = $(r[i]).offset().top + $(r[i]).height(), d >= l - 60 && s - 70 > d ? $(o[i]).addClass("active") : $(o[i]).removeClass("active");
            return $(".navbar-toggle").on("click", function() {
                return u.hasClass("in") ? a.css("top", 50) : a.css("top", 260)
            }), $(".dropdown-toggle").on("click", function() {
                return $(".switch-locale").hasClass("open") ? a.css("top", 260) : a.css("top", 300)
            })
        }
    }, g(), v(), $(window).on("resize", function() {
        return g(), $(window).width() <= h ? u.removeClass("in") : void 0
    }), $(window).on("scroll", function(e) {
        return g(), f()
    }), l.hasClass("static") ? $.ajax({
        url: "/site-api/userme",
        success: function(e) {
            return e._id ? ($(".avatar", p).css("background-image", "url(" + e.avatarUrl + ")"), $(".user-name", p).html(e.name), p.css("display", "inline-block"), t.css("display", "none"), n.css("display", "none")) : void 0
        }
    }) : void 0
}), $(function() {
    var e;
    return e = $.ias({
        container: ".list-wrap .content",
        item: ".list-item:not(.category)",
        pagination: ".pagination",
        next: ".next a",
        delay: 1e3,
        negativeMargin: 100
    }), e.extension(new IASSpinnerExtension({
        html: '<div class="loading-indicator text-center"> <span class="loader-dot"></span> <span class="loader-dot"></span> <span class="loader-dot"></span> </div>'
    })), e.extension(new IASTriggerExtension({
        offset: 3
    }))
}), ~
function(e, t) {
    var n, a;
    return a = {
        is: function(e, t) {
            return Object.prototype.toString.call(e).slice(8, -1) === t
        },
        copy: function(e, t) {
            var n, a;
            for (n in t) t.hasOwnProperty(n) && (a = t[n], e[n] = this.is(a, "Object") ? this.copy({}, a) : this.is(a, "Array") ? this.copy([], a) : a);
            return e
        }
    }, n = function() {
        var n;
        return n = this, this.defaults = {
            status: "normal"
        }, this.el = t.createElement("div"), this.el.className = "essage", this.close = '<span class="close">&times;</span>', this.error = '<span class="icon icon-circle-error"></span>', this.warning = '<span class="icon icon-circle-warning"></span>', this.success = '<span class="icon icon-circle-check"></span>', this.info = '<span class="icon icon-circle-info"></span>', this.el.onclick = function(t) {
            var a;
            return t = t || e.event, a = t.target || t.srcElement, "close" === a.className ? n.hide() : void 0
        }, t.body.appendChild(this.el), this
    }, n.prototype._width = function() {
        return this.el.offsetWidth || this.el.clientWidth
    }, n.prototype._class = function(e, t) {
        var n, a, i;
        return a = this.el, a.classList ? a.classList[t ? "remove" : "add"](e) : (n = a.className, i = new RegExp("\\b" + e + "\\b", "g"), a.className = t ? n.replace(i, "") : n.match(i) ? n : n + " " + e), a
    }, n.prototype.set = function(e) {
        return e = "string" == typeof e ? {
            message: e
        } : e, this.config = a.copy({}, this.defaults), this.config = a.copy(this.config, e), this.el.className = "essage", this._class("essage-" + this.config.status), this
    }, n.prototype.show = function(e, t) {
        var n, a, i;
        return null == t && (t = 2e3), n = this.el, i = this.set(e), n.innerHTML = this.close + this[this.config.status] + " " + this.config.message, a = -this._width() / 2, this.el.style.marginLeft = a + "px", this._class("is-active"), this.delayHide && clearTimeout(this.delayHide), this.delayHide = setTimeout(function() {
            return i.hide()
        }, t), this.el.addEventListener("webkitTransitionEnd", this.delayHide, !1), this.el.addEventListener("transitionend", this.delayHide, !1), this
    }, n.prototype.hide = function() {
        return this._class("is-active", !0), this
    }, e.Essage = new n
}(window, document), $(function() {
    var e, t, n, a, i;
    return e = $("body"), a = $(".modal-back"), t = $(".modal-card"), n = $(".modal-back, .cancel-handler, .close-handler"), $(".modal-handler").on("click", function(n) {
        return n.preventDefault(), e.addClass("open-modal"), t.delay(100).fadeIn(250), a.fadeIn(350)
    }), n.on("click", function() {
        return i()
    }), e.on("keydown", function(e) {
        return 27 === e.keyCode ? i() : void 0
    }), i = function() {
        return t.animate({
            opacity: 0,
            top: "-=200"
        }, 150, function() {
            return t.attr({
                style: "display:none"
            })
        }), a.delay(100).fadeOut(350, function() {
            return e.removeClass("open-modal")
        })
    }

});
//alert($(window).width());
