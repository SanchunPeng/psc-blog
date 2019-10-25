# React-Webpack多入口多出口

## 1、背景
直接用了create-react-app，但是需要更改配置，可以在终端执行：yarn eject后会在根目录下生成一个config文件夹，里面是webpack的配置文件，可以进行自定义配置
## 2、多入口多出口js
### 默认配置--webpack.config.dev.js
```javascript
 entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/app.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
```
### 修改配置--webpack.config.dev.js
```javascript
 entry: {
    'app': [
      require.resolve('./polyfills'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndexJs,
    ],
    'tag': [
      require.resolve('./polyfills'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.tagIndexJs,  // 在paths文件下添加的另一个入口地址
    ],
  },
  output: {
    pathinfo: true,
    filename: 'static/js/[name].js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
```

### PS:
- 多入口时entry为一个对象，每个key代表一个入口。
- output中的filename使用[name]区分输出名，就会根据entry分别编译出对应的js文件。

## 3、多入口多出口html
每调一次HtmlWebpackPlugin就会生成一次HTML页面，所以这里可以通过添加HtmlWebpackPlugin来生成多出口html。
### 默认配置--webpack.config.dev.js

```javascript
new HtmlWebpackPlugin({
    inject: false,
    template: paths.appHtml,
}),
```
### 修改配置--webpack.config.dev.js
```javascript
new HtmlWebpackPlugin({
    inject: false,
    template: paths.appHtml,
}),
new HtmlWebpackPlugin({
    inject: false,
    template: paths.tagHtml, //另一个html地址
    filename: 'tag.html'
}),
```
### PS:
- HtmlWebpackPlugin的参数还有一个chunks属性，指明哪些webpack入口的js会被注入到这个HTML页面。如果不配置，则将所有entry的JS文件都注入HTML。
- filename: 指明生成的HTML路径，如果不配置就是dist/index.html。但是新增的需要配置filename，避免与第一个入口相互覆盖。


### 注意：
此时已经可以生成多出口html，但是start启动后，在浏览器访问不论是什么路径，是/index.html还是/tag.html，展示的都是index.html的内容，应该是http服务将请求重定向到了/index.html，所以需要修改webpackDevServer.config.js
#### 默认配置：
```javascript
historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
},
```
#### 修改配置：
```javascript
historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
    rewrites: [
      { from: /^\/tag.html/, to: '/dist/tag.html' }, // 将/tag.html路径重定向到HtmlWebpackPlugin输出的html路径
    ]
},
```

## 4、生产环境
生产环境同开发环境类似配置

