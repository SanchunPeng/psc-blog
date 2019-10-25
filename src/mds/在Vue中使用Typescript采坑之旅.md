1. 使用ref，获得了对应的DOM，当需要获取一些属性值时，总是报错

```
this.$refs.slider.clientWidth
```

```
Property 'clientWidth' does not exist on type 'Vue | Element | Vue[] | Element[]'.
  Property 'clientWidth' does not exist on type 'Vue'.
```

错误原因：typescript是强类型语言，this.$refs.slider的类型是'Vue | Element | Vue[] | Element[]'，并不是每个类型都有clientWidth属性，所以报错，属于类型不明确错误。

解决办法：
- 方法一：

```
let slider : any = this.$refs.slider
```
- 方法二

```
this.$refs.slider as HTMLDivElement;
```
- 方法三

在export default class xxx extends Vue里面声明全部的$ref的类型
```
$refs: {
    audio: HTMLAudioElement,
    slider: HTMLDivElement
}
```

2、控制台报报错： TypeError: Cannot read property 'extend' of undefined

原因：组件中没有写@Component


3、编译器报错：Property '$router|$store' does not exist on type XXX
已经进行了类型补充，但是编译器还是会有一个波浪线
```
// 类型补充
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
  }
}
```

解决：
- 方法一：把this.$router改成this["$router"]

- 方法二：既然错误显示说没有这个属性，那么就在组件中先声明一下
```
export default class Header extends Vue {
  // computed
  $route
  activeIndex : string = 'hompage'
  handleSelect(key: String, keyPath: String) {
    // console.log(key, keyPath);
  }
  mounted() {
    this.activeIndex = this.$route.name
  }
```
