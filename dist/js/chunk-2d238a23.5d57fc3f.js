(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d238a23"],{ffe2:function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement;s._self._c;return s._m(0)},n=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h1",[s._v("Touch事件封装Tap")]),a("h3",[s._v("1、Thinking")]),a("p",[s._v("移动端点击用click事件有300ms的延迟，如果用移动端的touch事件，一次事件包含touchstart，touchmove，touchend，可以通过HTMLElement来扩充原型，方便添加Event，通过判断touch的时间和偏移量来判断是否进行了一下tap事件。")]),a("h3",[s._v("2、realize")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (!HTMLElement.prototype.addTapEvent) {\n    HTMLElement.prototype.addTapEvent = "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("callback")]),s._v(") ")]),s._v("{\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" tapStartTime = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" tapEndTime = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" tapTime = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("500")]),s._v("  "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//tap等待时间，在此时间下松开可触发方法")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v("  tapStartClientX = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v("  tapStartClientY = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v("  tapEndClientX = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v("  tapEndClientY = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v("  tapScollHeight = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("15")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v("  cancleClick = "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".addEventListener("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'touchstart'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n            tapStartTime = event.timeStamp;\n            "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" touch = event.changedTouches["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("];\n            tapStartClientX = touch.clientX;\n            tapStartClientY = touch.clientY;\n            cancleClick = "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n        })\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".addEventListener("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'touchmove'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n            "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" touch = event.changedTouches["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("];\n            tapEndClientX = touch.clientX;\n            tapEndClientY = touch.clientY;\n            "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (("),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Math")]),s._v(".abs(tapEndClientX - tapStartClientX) > tapScollHeight) || ("),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Math")]),s._v(".abs(tapEndClientY - tapStartClientY) > tapScollHeight)) {\n                cancleClick = "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("true")]),s._v(";\n            }\n        })\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".addEventListener("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'touchend'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n            tapEndTime = event.timeStamp;\n            "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (!cancleClick && (tapEndTime - tapStartTime) <= tapTime) {\n                callback();\n            }\n        })\n    }\n}\n")])]),a("h3",[s._v("Usage")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[s._v("document.getElememtById('test').addTapEvent(function(){\n    consle.log('this is a tap event');\n})\n")])])])}],r=a("6691"),l={},p=Object(r["a"])(l,e,n,!1,null,null,null);t["default"]=p.exports}}]);