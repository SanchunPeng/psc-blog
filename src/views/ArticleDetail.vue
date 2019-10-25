<template>
    <div class="article-detail">
        <div class="markdown-body">
        <VueMarkdown1 v-if="$route.query.id === '0001'"/>
        <VueMarkdown2 v-else-if="$route.query.id === '0002'"/>
        <VueMarkdown3 v-else-if="$route.query.id === '0003'"/>
        <VueMarkdown4 v-else-if="$route.query.id === '0004'"/>
        <VueMarkdown5 v-else-if="$route.query.id === '0005'"/>
        <VueMarkdown6 v-else-if="$route.query.id === '0006'"/>
        <VueMarkdown7 v-else-if="$route.query.id === '0007'"/>
        <VueMarkdown8 v-else-if="$route.query.id === '0008'"/>
        <VueMarkdown9 v-else-if="$route.query.id === '0009'"/>
        <VueMarkdown10 v-else-if="$route.query.id === '0010'"/>
        <VueMarkdown11 v-else-if="$route.query.id === '0011'"/>
        <VueMarkdown12 v-else-if="$route.query.id === '0012'"/>
        <VueMarkdown13 v-else-if="$route.query.id === '0013'"/>
        <VueMarkdown14 v-else-if="$route.query.id === '0014'"/>
        <VueMarkdown15 v-else-if="$route.query.id === '0015'"/>
        <VueMarkdown16 v-else-if="$route.query.id === '0016'"/>
        <VueMarkdown17 v-else-if="$route.query.id === '0017'"/>

        </div>

        <!-- 注册号 -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const VueMarkdown1 = () => import('../mds/VUE使用总结.md')
const VueMarkdown2 = () => import('../mds/在Vue中使用Typescript(一).md')
const VueMarkdown3 = () => import('../mds/在Vue中使用Typescript(二).md')
const VueMarkdown4 = () => import('../mds/CSS伪元素.md')
const VueMarkdown5 = () => import('../mds/Element采坑之旅.md')
const VueMarkdown6 = () => import('../mds/跨域那点事.md')
const VueMarkdown7 = () => import('../mds/移动事件封装Tap.md')
const VueMarkdown8 = () => import('../mds/JS拖拽.md')
const VueMarkdown9 = () => import('../mds/React-Webpack-多入口多出口.md')
const VueMarkdown10 = () => import('../mds/VUE-cli3搭建项目-webpack配置.md')
const VueMarkdown11 = () => import('../mds/居中.md')
const VueMarkdown12 = () => import('../mds/从输入URL到页面加载.md')
const VueMarkdown13 = () => import('../mds/浏览器渲染过程.md')
const VueMarkdown14 = () => import('../mds/常见的CSS图形绘制合集.md')
const VueMarkdown15 = () => import('../mds/HTTP2.md')
const VueMarkdown16 = () => import('../mds/THREE中世界坐标和屏幕坐标之间的转换.md')
const VueMarkdown17 = () => import('../mds/自定义着色器.md')

@Component({
    components: {
        VueMarkdown1,
        VueMarkdown2,
        VueMarkdown3,
        VueMarkdown4,
        VueMarkdown5,
        VueMarkdown6,
        VueMarkdown7,
        VueMarkdown8,
        VueMarkdown9,
        VueMarkdown10,
        VueMarkdown11,
        VueMarkdown12,
        VueMarkdown13,
        VueMarkdown14,
        VueMarkdown15,
        VueMarkdown16,
        VueMarkdown17
    }
})
export default class ArticleDetail extends Vue {
    // myMarkdown


    created () {
        // this.source = require('../mds/VUE使用总结.md')
        // console.log(this.source)
    }
}
</script>
