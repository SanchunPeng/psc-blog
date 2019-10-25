# 在Vue中使用Typescript(一)
## 1. 新建项目，安装依赖

```javascript
vue init webpack demo
```
然后安装必要依赖项：typescript、ts-loader、vue-class-component

```javascript
npm install typescript vue-class-component vue-property-decorator -D
npm install ts-loader@3.3.1 -D
npm install tslint tslint-loader tslint-config-standard -D
```


## 2. 配置webpack

修改 ./build/webpack.base.conf.js 文件：


```javascript
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
}
```
在 resolve.extension 中添加'.ts'后缀


```javascript
{
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
}
```
在 module.rules 中添加 webpack 对 ts 文件的解析

## 3. 其他配置

项目根目录下创建 tsconfig.json 文件：

```javascript
// 自己项目的配置
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

在 ./src 目录创建 vue-shim.d.ts 文件，让 ts 识别 .vue 文件：


```javascript
// vue-shim.d.ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```
