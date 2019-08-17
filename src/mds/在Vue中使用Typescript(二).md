# 在Vue中使用Typescript(二)

## 1. 什么是Typescript
typescript是javaScript的超集，这意味着它支持所有都JavaScript的语法。它很像JavaScript的强类型版本，除此之外，它还有一些扩展的语法，如interface/module等。
typescript在编译的时候会去掉类型和特有语法，生成纯粹的JavaScript。

## 2. 为什么需要使用它？
在项目中使用Typescript，每个地方都要声明类型，不然就走不下去，但是为什么还是要使用他呢？

1）如果让做一个选择题：

- 在编译时发现问题
- 还是运行时发现问题

肯定是选择越早发现问题越好

2）使用ts进行参数标注可以检查出传参过程中字段错误，或类型错误(比如说函数参数是number类型，调用的时候传递的是string类型，js也是可以通过，如果有问题可能到运行时才发现)。

在进行参数标注后，在编码过程中即可检查出错误。

而且每个变量都有类型，增加了代码的可读性。

3）代码提示

## 3. vue-class-component
vue英文官网推荐了一个包vue-class-component，可以以class的模式写vue组件。强化Vue组件，使用TypeScript/装饰器增强Vue组件，使 Vue 组件更好的跟TS结合使用。

```javascript
<template>
  <div>
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
        firstName: String,
        lastName: String
    },
    components: {
        'component-a': ComponentA
    }
  })
  export default class App extends Vue {
    // 初始化数据
    msg = 123

    // 生命周期钩子
    mounted () {
        this.greet()
    }

    // 计算属性
    get computedMsg () {
        return 'computed ' + this.msg
    }

    // 方法
    greet () {
        alert('greeting: ' + this.msg)
    }
  }
</script>
```
等同于

```javascript
export default {
  data () {
    return {
      msg: 123
    }
  }

  // 生命周期钩子
  mounted () {
    this.greet()
  }

  // 计算属性
  computed: {
    computedMsg () {
      return 'computed ' + this.msg
    }
  }

  // 方法
  methods: {
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
}
```


## 4. Vue Property Decorator

vue-property-decorator是在vue-class-component上增强了更多与Vue 相关的装饰器，使Vue组件更好的跟TS结合使用。新增了7个装饰器：

- @Prop
- @Model
- @Watch
- @Emit
- @Provide
- @Inject
- @Component (从 vue-class-component 继承)
- Mixins (the helper function named mixins provided by vue-class-component)

### @Prop(options: (PropOptions | Constructor[] | Constructor) = {}) decorator


```javascript
export interface PropOptions<T=any> {
  type?: Prop<T> | Prop<T>[];
  required?: boolean;
  default?: T | null | undefined | (() => T | null | undefined);
  validator?(value: T): boolean;
}
```

```javascript
export declare type Constructor = {
    new (...args: any[]): any;
};
```

```javascript
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC!: string | boolean
}
```

```javascript
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
```

### @Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})


```javascript
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) checked!: boolean
}
```


```javascript
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean
    },
  },
}
```


### @Watch(path: string, options: WatchOptions = {})

```javascript
export interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

```


```javascript
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}
```


```javascript
export default {
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    },
    'person': {
      handler: 'onPersonChanged',
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  }
}
```


### @Emit(event?: string)


```javascript
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}

```


```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}
```

### @Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey)


```javascript
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Vue {
  @Inject() foo!: string
  @Inject('bar') bar!: string
  @Inject({ from: 'optional', default: 'default' }) optional!: string
  @Inject(symbol) baz!: string


  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```


```javascript
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({

  inject: {
    foo: 'foo',
    bar: 'bar',
    'optional': { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```
PS: 不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。而不是局限于只能从当前父组件的prop属性来获取数据。


## 5. TypeScript装饰器（decorators）
装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上，可以修改类的行为。装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

```javascript
/** vue-property-decorator verson 7.2.0 MIT LICENSE copyright 2018 kaorun343 */
import Vue, { PropOptions, WatchOptions } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { InjectKey } from 'vue/types/options';
export declare type Constructor = {
    new (...args: any[]): any;
};
export { Component, Vue, mixins as Mixins };
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
export declare function Inject(options?: {
    from?: InjectKey;
    default?: any;
} | InjectKey): PropertyDecorator;
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
export declare function Provide(key?: string | symbol): PropertyDecorator;
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export declare function Model(event?: string, options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export declare function Prop(options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export declare function Watch(path: string, options?: WatchOptions): MethodDecorator;
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
export declare function Emit(event?: string): MethodDecorator;
```
可以看到装饰器本身其实就是一个函数，理论上忽略参数的话，任何函数都可以当做装饰器使用
- 类装饰器

应用于类构造函数，其参数是类的构造函数。
```javascript
function Path(target:any) {
    console.log("I am decorator.")
}

@Path
class HelloService {}
```
编译后执行的结果是

```javascript
I am decorator
```

修饰器对类的行为的改变，是代码编译时发生的（不是TypeScript编译，而是js在执行机中编译阶段），而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。所以问题可以在编译阶段发现而不是运行时。


## 6. 支持render jsx 写法
在.vue单文件中的ts写jsx代码

```javascript
<script lang="tsx">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import CommonPropsMethodMixin, { CascaderOption } from '../mixins/mixins';
import { Mutation, Getter } from 'vuex-class';

@Component({
  components: {
  },
  mixins: [CommonPropsMethodMixin]
})

export default class CascaderMenu extends Vue {

  @Prop() option !: Array<CascaderOption>;
  
  @Getter getCascaderLabel !: string;

  cascaderMenuClick(item: CascaderOption, type: number) {
    console.log(item, type);
  }

  render (h: CreateElement) {
    return (
      <div class={"l-cascader-menu" + this.menuSize}>
        {this.option && <ul class="l-cascader-group">{
          this.option.map((item, index) => (
            <li class={
              {
              'l-cascader-item': true,
              'l-icon-right-line': (item.children && item.children.length > 0),
              'is-selected': (this.getCascaderLabel === item.label)
            }} key={index} onClick={this.cascaderMenuClick.bind(this, item, 1)}>{item.label}</li>
          )
        )
        }</ul>}
      </div>
    )     
  }
}
</script>
```
PS: lang="ts" ===> lang="tsx"

## 7. mixins
在vue-property-decorator中没有找到mixin这个修饰器，如果直接调用mixins中的属性和方法会报没有声明的错误，所以需要在vue实例中声明一下。
mixins.ts
```javascript
import { Component, Vue} from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        getComponentSize (pre: string, suf: string): string
    }
}

@Component

export default class CommonPropsMethodMixin extends Vue {
   getComponentSize(prefix: string, propsize: string) {
    const propSize = propsize ? propsize.toLowerCase() : '';
    return ['default', 'small', 'large'].indexOf(propSize) > -1 ? ` ${prefix}-${propSize}` : ''; 
   } 
}
```
调用：

```javascript
import { Component, Prop, Vue, Model, Watch, Emit } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import CommonPropsMethodMixin from '../mixins/mixins';
// 注入
@Component({
    mixins: [CommonPropsMethodMixin]
})
```




## 8. vuex
Vuex是在vue中集中管理应用状态，Vuex对Typescript的支持，第三方衍生库有很多，vuex-typescript，vuex-ts-decorators，vuex-typex，vuex-class等等，除了vuex-class外，基本都存在侵入性太强的问题，引用不算友好。

```javascript
import {State, Getters, Action, Mutation} from 'vuex-class';

```
写法相较之前没什么区别，只是要加上类型

==>定义module

```javascript

export interface State {
  count: number
}

export default {
  state: {
    count: 0
  },
  mutations: {
    refushCountState(state: State, value: number) {
      state.count = value;
    }
  },
  getters: {
    getCountValue(state: State) {
      return state.count;
    }
  }
}
```

==>index.ts


```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import radioGroup from './module/radioGroup';
import checkboxGroup from './module/checkboxGroup';
import select from './module/select';
import cascader from './module/cascader';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    radioGroup,
    checkboxGroup,
    select,
    cascader,
  },
});

export default store;

```


==>使用

### State

```javascript
computed: {
    count () {
      return this.$store.state.count
    }
  }
```

```
@State count !: number 
```


### mutation

```javascript
methods: {
    ...mapMutations('module', {
      refushCountState: 'refushCountState' // 将this.refushCountState映射为 `this.$store.commit('refushCountState')`
    })
}
```

```javascript
  @Mutation refushCountState !: (count: number) => void;
```
其他的一些用法
```javascript
  @State count!: number;
  @Getter getCountValue!: number;
  @Action getSyncValue!: (id: number) => void;
```


## 总结：
- 任何使用变量的地方都要声明变量类型
- 使用object的地方需要通过interface定义object中有哪些属性以及类型
- 传递函数的地方不再只是传递一个函数名称，需要定义函数的参数、参数类型、返回类型
- 将变量声明成数组的时候，在使用数组的原生方法之前一定要对数组进行赋值，否则会报错，因为没有对数组进行赋值之前，都是undefined。






