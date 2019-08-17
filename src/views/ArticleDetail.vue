<template>
    <div class="article-detail">
        <div class="markdown-body">
        <VueMarkdown v-if="$route.query.id === '0001'"/>
        <VueMarkdown1 v-else-if="$route.query.id === '0002'"/>
        <VueMarkdown2 v-else-if="$route.query.id === '0003'"/>
        
        </div>

        <!-- 注册号 -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const VueMarkdown = () => import('../mds/VUE使用总结.md')
const VueMarkdown1 = () => import('../mds/在Vue中使用Typescript(一).md')
const VueMarkdown2 = () => import('../mds/在Vue中使用Typescript(二).md')


@Component({
    components: {
        VueMarkdown,
        VueMarkdown1,
        VueMarkdown2,
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
