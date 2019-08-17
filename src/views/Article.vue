<template>
    <div class="article">
        <div class="content">
            <div v-for="(item, index) in typescriptArticles"
                :key="index"
                class="article-item"
                @click="handleGotoDetail(item)"
                >
                <div class="item-label">标签：{{item.label}}</div>
                <h3>{{item.title}}</h3>
                <div class="item-desc">{{item.desc}}</div>
            </div>
        </div>
        <div class="label">
            <PLabel/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PLabel from '../components/PLabel.vue';
import { ArticleItems } from '../interfaces/index';
import articleDetials from '../utils/staticdata'

@Component({
  components: {
    PLabel,
  },
})
export default class Article extends Vue {
    typescriptArticles : Array<ArticleItems> = articleDetials

    handleGotoDetail(item: ArticleItems) {
      this['$router'].push({
        path: '/articledetail',
        query: {
          id: item.id
        }
      });
    }
}
</script>
<style lang="scss">
.article {
    width: 100%;
    height: 100%;

    .article-item {
      border-bottom: 1px solid #f3f6f3;
      padding: 15px 30px;
      cursor: pointer;
      .item-label {
        color: #b2bac2;
        margin-bottom: 10px;
      }
      .item-desc {
        margin-top: 10px;
      }
    }
}
</style>
