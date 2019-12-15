# Vue项目优化
#### 1. 路由懒加载，组件懒加载
#### 2. 代码优化：   
1). v-show，v-if，key的巧妙使用   
2). 减少state双向绑定：有一种情况是，当某个数据更新后更新了state值，在其他组件通过watch监听，更新state、绑定事件，用vuex。  
3). 提取组件的CSS到单独到文件利于缓存，组件内的 CSS 会以标签的方式通过 JavaScript 动态注入存在开销；   
4). 冻结一个对象，vue执行observe的时候就不会对该对象的属性添加setter和getter方法，如果存在一个很大的数组或Object，并且确信数据不会修改，使用Object.freeze()可以让性能大幅提升。     
5). 避免持久化存储的容量持续增长，存储空间有限，及时清除更新。     
#### 3. webpack的一些设置
gzip，不生成.map文件, externals忽略不需要打包的库
#### 4. vue-loader的一些配置
删除空格