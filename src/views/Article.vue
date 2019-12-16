<template>
    <div class="article">
        <div class="content">
            <div v-for="(item, index) in typescriptArticles"
                :key="index">
              <div v-if="item.label.indexOf(getCurrentLabel) > -1" 
                class="article-item"
                @click="handleGotoDetail(item)"
                >
                  <div class="item-label">标签：{{item.label}}</div>
                  <h4>{{item.title}}</h4>
                  <div class="item-desc">{{item.desc}}</div>
                  <img class="item-img" :src="item.path"/>
              </div>
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
import articleDetials from '../utils/staticdata';
import { Getter } from 'vuex-class';

@Component({
  components: {
    PLabel,
  },
})
export default class Article extends Vue {
  @Getter getCurrentLabel !: string

  typescriptArticles : Array<ArticleItems> = articleDetials

  handleGotoDetail(item: ArticleItems) {
    this.$router.push({
      path: '/articledetail',
      query: {
        id: item.id,
      },
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
      padding: 30px;
      position: relative;
      padding-right: 140px;
      cursor: pointer;
      .item-label {
        color: #b2bac2;
        margin-bottom: 10px;
      }
      .item-desc {
        margin-top: 10px;
      }
      .item-img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
}
</style>
