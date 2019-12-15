# Vue-cli3+Typescript封装自己的组件UI

## 1、调整目录结构

- 添加packages文件夹--放所有组件源代码
- 添加example文件夹--用作示例

## 2、修改配置

目录结构调整后需要修改配置：vue.config.js

启动项目的时候，默认入口文件是src/main.js，添加example文件夹后，需要运行示例，就需要重新配置入口文件，也可以将scss变量，或者一些@mixin，可以通过配置统一引入.

```javascript
// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: '@import "./src/style.scss";',
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
```

## 3、编写组件

### 3.1、创建组件

在 packages 目录下，所有的单个组件都以文件夹的形式存储，这里以CheckBox组件为例，在 packages 文件夹下建立 CheckBox 文件夹，在 CheckBox/ 目录下创建 src/ 目录存储组件源码，在 CheckBox/ 目录下创建 index.js 文件对外提供对组件的引用。

修改 /packages/CheckBox/index.js文件，对外提供引用。

```javascript
// 导入组件，组件必须声明 name
import Checkbox from './src/Checkbox.vue';

// 为组件提供 install 安装方法，供按需引入
Checkbox.install = function install(Vue) {
  Vue.component(Checkbox.name, Checkbox);
};

// 默认导出组件
export default Checkbox;

```

### 3.2、整合所有的组件，对外导出，即一个完整的组件库

修改 /packages/index.js 文件，对整个组件库进行导出。

```javascript
import Button from './Button';
import Badge from './Badge';
import Carousel from './Carousel';
import Cascader from './Cascader';
import CheckBox from './CheckBox';
import CheckBoxGroup from './CheckBoxGroup';
import Input from './Input';
import InputNumber from './InputNumber';
import Popover from './Popover';
import Progress from './Progress';
import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Rate from './Rate';
import Select from './Select';
import Slider from './Slider';
import Switch from './Switch';
import Tooltips from './Tooltips';

// 存储组件列表
const components = [
  Button,
  Badge,
  Carousel,
  Cascader,
  CheckBox,
  CheckBoxGroup,
  Input,
  InputNumber,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Rate,
  Select,
  Slider,
  Switch,
  Tooltips,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function install(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components,
};

```

## 4、编写示例

### 4.1、 引入组件库

```javascript
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
// 导入组件库
import PSamrt from '../packages/index';

Vue.use(PSamrt)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.use(Vuetify);
```

### 4.2、 使用

```javascript
<template>
  <div>
    <div class="division">
      <p-radio text="单选1" v-model="radio" label="1" @change="handleRadioChange"></p-radio>
      <p-radio text="单选2" v-model="radio" label="2" @change="handleRadioChange"></p-radio>
      <p-radio text="单选3" v-model="radio" label="3" @change="handleRadioChange"></p-radio>
    </div>

    <div class="division">
      <p-radio text="单选-选中-禁用"
        v-model="disabledRadio"
        :disabled="true" label="1"
        @change="handleRadioChange"></p-radio>
      <p-radio text="单选-禁用"
      v-model="disabledRadio"
      :disabled="true"
      label="2" @change="handleRadioChange"></p-radio>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RadioTest extends Vue {
  radio : string = '1';
  disabledRadio : string = '1';
  radioGroup : string = '1';

  handleRadioChange = (val: string) => {
    console.log('do radio something', val);
  }

  handleRadioGroupChange = (val: string) => {
    console.log('do radio group something', val);
  }
}
</script>
```

### 4.3、 package.json 中新增一条编译为库的命令

在 scripts 中新增一条命令 npm run lib

--target: 构建目标，默认为应用模式。这里修改为 lib 启用库模式。
--dest : 输出目录，默认 dist。这里我们改成 lib
[entry]: 最后一个参数为入口文件，默认为 src/App.vue。这里我们指定编译 packages/ 组件库目录。

```javascript
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "lib": "vue-cli-service build --target lib --name psmart-ui --dest lib packages/index.js"
  }
```

执行:

```javascript
$ npm run lib
```


### 4.4 配置 package.json 文件中的字段发布到 npm

- name: 包名，该名字是唯一的。可在 npm 官网搜索名字，如果存在则需换个名字。
- version: 版本号，每次发布至 npm 需要修改版本号，不能和历史版本号相同。
- description: 描述。
- main: 入口文件，该字段需指向我们最终编译后的包文件。
- keyword：关键字，以空格分离希望用户最终搜索的词。
- author：作者
- private：是否私有，需要修改为 false 才能发布到 npm
- license： 开源协议
