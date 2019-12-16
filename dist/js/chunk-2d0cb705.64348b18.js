(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cb705"],{"4a57":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("ol",[r("li",[e._v("使用ref，获得了对应的DOM，当需要获取一些属性值时，总是报错")])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("this.$refs.slider.clientWidth\n")])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("Property 'clientWidth' does not exist on type 'Vue | Element | Vue[] | Element[]'.\n  Property 'clientWidth' does not exist on type 'Vue'.\n")])]),r("p",[e._v("错误原因：typescript是强类型语言，this.$refs.slider的类型是'Vue | Element | Vue[] | Element[]'，并不是每个类型都有clientWidth属性，所以报错，属于类型不明确错误。")]),r("p",[e._v("解决办法：")]),r("ul",[r("li",[e._v("方法一：")])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("let slider : any = this.$refs.slider\n")])]),r("ul",[r("li",[e._v("方法二")])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("this.$refs.slider as HTMLDivElement;\n")])]),r("ul",[r("li",[e._v("方法三")])]),r("p",[e._v("在export default class xxx extends Vue里面声明全部的$ref的类型")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("$refs: {\n    audio: HTMLAudioElement,\n    slider: HTMLDivElement\n}\n")])]),r("p",[e._v("2、控制台报报错： TypeError: Cannot read property 'extend' of undefined")]),r("p",[e._v("原因：组件中没有写@Component")]),r("p",[e._v("3、编译器报错：Property '$router|$store' does not exist on type XXX\n已经进行了类型补充，但是编译器还是会有一个波浪线")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v('// 类型补充\ndeclare module "vue/types/vue" {\n  interface Vue {\n    $router: VueRouter;\n    $route: Route;\n  }\n}\n')])]),r("p",[e._v("解决：")]),r("ul",[r("li",[r("p",[e._v('方法一：把this.$router改成this["$router"]')])]),r("li",[r("p",[e._v("方法二：既然错误显示说没有这个属性，那么就在组件中先声明一下")])])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("export default class Header extends Vue {\n  // computed\n  $route\n  activeIndex : string = 'hompage'\n  handleSelect(key: String, keyPath: String) {\n    // console.log(key, keyPath);\n  }\n  mounted() {\n    this.activeIndex = this.$route.name\n  }\n")])])])}],o=r("6691"),s={},i=Object(o["a"])(s,n,p,!1,null,null,null);t["default"]=i.exports}}]);