# ELement采坑之旅
## 1、el-table添加的选择框部分disable

```javascript
<el-table-column
    type="selection"
    align='center'
    :selectable='selectInit'>
</el-table-column>
```

```javascript
methods:{
    selectInit(row,index){
        if(row.propery==xxx){
            return false //不可勾选disabled
        }else{
            return true //可勾选
        }
    }
}
```
## 2、el-table的某些列动态变化，比如说对某些列el-table-column设置v-if，经常会出现数据与表头渲染错乱的情况。 

```javascript
    <el-table-column
        prop="name"
        label="素材名称"
        header-align="center"
        align="center"
        show-overflow-tooltip
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="taskCreateTime"
        header-align="center"
        align="center"
        label="创建任务时间"
        v-if="currentStatus !== 1"
        width="140">
    </el-table-column>
    <el-table-column
        prop="productUserName"
        header-align="center"
        align="center"
        label="操作人"
        v-if="currentStatus !== 1"
        width="140">
    </el-table-column>
    ...
```
这时会出现将操作人的值显示在创建任务时间下，出现错乱。
原因：  
这是因为在v-for或者v-if切换标签时，多个相同的标签被渲染的时候，vue是有一个性能优化的机制，把多个相同的标签进行复用。而原本这些标签每一个都是独立的，所以需要添加key来做区分。:key="Math.random()"
```javascript
    <el-table-column
        prop="name"
        label="素材名称"
        header-align="center"
        align="center"
        show-overflow-tooltip
        :key="Math.random()"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="taskCreateTime"
        header-align="center"
        align="center"
        label="创建任务时间"
        :key="Math.random()"
        v-if="currentStatus !== 1"
        width="140">
    </el-table-column>
    <el-table-column
        prop="productUserName"
        header-align="center"
        align="center"
        label="操作人"
        :key="Math.random()"
        v-if="currentStatus !== 1"
        width="140">
    </el-table-column>
    ...
```

## 3、当使用element-ui的el-menu组件时，:router="true"当点击当前tab时会报错
```javascript
NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
```
原因：这是因为element将this.$router.push的异常给打印出来了
解决办法：

```javascript
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
```