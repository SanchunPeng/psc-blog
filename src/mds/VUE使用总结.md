# VUE使用采坑之旅
## 1、vue-loader小技巧
### 1）用preserveWhitespace减少文件体积
在写模板时元素和元素之间会有空格，特别对于行内元素，会产生间隙，这是因为空格会被解析成文本节点，当然也可以font-size:0，其实可以通过配置vue-loader

```javascript
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      'scss': 'vue-style-loader!css-loader!sass-loader',
      'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
    }
    // other vue-loader options go here
    ,preserveWhitespace: false // 默认值是true，如果设置为 false，模版中HTML标签之间的空格将会被忽略。
  }
}
```
它的作用是阻止元素间生成空白内容，在 Vue 模板编译后使用 _v(" ") 表示。如果项目中模板内容多的话，它们还是会占用一些文件体积的。例如 Element 配置该属性后，未压缩情况下文件体积减少了近 30Kb。

#### PS：   
虽然 preserveWhitespace: false 可以删除标签间的空格，但是v-html 配合样式 white-space:pre-wrap 还是可以保留DIV 标签中的空格和换行的。

### 2）使用transformToRequire再也不用把图片写成变量
在写Vue的时候经常会写到这样的代码：需要把图片提前require 传给一个变量再传给组件。

```javascript
<Logo :default-logo={LOGO}></Logo>

created() {
  this.LOGO = require('./assets/logo.png')
}
```
在模版编译过程中，编译器可以将某些属性，如src 路径，转换为require调用，以便目标资源可以由webpack处理.无需手动require，可用transformToRequire配置

```javascript

// 组件：属性 可以配置该组件下的这个属性不用自己reqire，webpack会自己处理
transformToRequire: {
  // 默认配置
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: 'xlink:href',
  // 添加配置
  Logo: ['default-logo']
}
```
所以之前的代码就只需写成这样
```javascript
<Logo default-logo={'./assets/logo.png'}></Logo>

<!--created() {-->
<!--    this.LOGO = require('./assets/logo.png')-->
<!--}-->
```


## 2、render函数
用模板来创建html在大多数情况下是好用的，然而在一些场景中，需要JavaScript的完全编程的能力，这时你可以用渲染函数，它比模板更接近编译器。比如说通过level prop动态生成标题组件Title。  
使用模板的写法是：

```javascript
 <template>
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</template>
```
可以看出，代码冗长，而且在每一个级别的标题中重复书写了<slot></slot>
如果说要设计成带锚点，那还要重复一部分代码

这时可以使用render

```javascript
<template>
  <div>
    <Title :level="level">title 1</Title>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
Vue.component('Title', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称h1,h2,...
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
export default {
  name: 'TitleParent',
  data () {
    return {
      level: 1
    }
  }
}
</script>
```
#### PS: 
当向组件中传递不带v-slot指令的子节点时，这些子节点被存储在组件实例中的$slots.default中

### render函数定义：
- 返回值：虚拟节点（VNode）
- 参数：createElement，本身是一个函数，返回值也是VNode，有三个参数
    
```javascript
// @returns {VNode}
createElement(
  // 第一个参数：{String | Object | Function}
  // 一个HTML标签名(可以是一个组件名)、组件选项对象，或者
  // resolve 了上述任何一种的一个async函数。必填项。
  'div',

  // 第二个参数：{Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在 `on` 属性内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层属性
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
  },

  // 第三个参数：{String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

注意：渲染函数中没有与v-model的直接对应——你必须自己实现相应的逻辑：

```javascript
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```
这些都是比较深入的写法，当然可以使用babel，在Vue中使用JSX语法



## 3、过滤器
过滤器不改变真正的data，而只是改变渲染的结果，并返回过滤后的数据。

### 1）局部过滤器

```javascript
export default {
  data () {return {}}
  filter: {
    myFilter () {
    }
  }
}
```
### 2）全局过滤器

```javascript
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

## 4、懒加载
为给客户更好的客户体验，首屏组件加载速度更快一些，解决白屏问题。
懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。

### 1）路由懒加载

- #### 简单使用

```javascript
import Index from '@/views/Index.vue'

export default new Router ({
  routes: [{
    path: '/index',
    name: 'index',
    component: Index'
  }]  
})
```
- #### 懒加载

```javascript
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: resolve=>(require(["@/views/Index"],resolve))
    }
  ]
```
或
```javascript
const Index = () => import(@/views/Index.vue)
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
```

#### PS：
可以在开发环境下就是非懒加载，生产环境下就是懒加载

```javascript
// 生产环境下 process.env.NODE_ENV === 'production'
const Index = () => import(@/views/Index)
//开发环境下 process.env.NODE_ENV === 'development'
const Index = require(@/view/Index).default
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
```

### 2）组件懒加载
与路由懒加载类似
- #### 简单使用
```javascript
import Index from './Index'
export default {
  components:{
    "index": Index
  }
}
```
- #### 懒加载

```javascript
const Index = ()=>import("./Index");
export default {
  components:{
    "index": Index
  }
}
```
或
```javascript
export default {
  components:{
    "index": resolve=>(['./Index'],resolve)
  }
}
```



参考链接：   
[https://vue-loader.vuejs.org/ ](https://vue-loader.vuejs.org/)    
[https://cn.vuejs.org/v2/guide/render-function.html](https://cn.vuejs.org/v2/guide/render-function.html)