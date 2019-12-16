<template>
    <div class="plabel">
        <div class="label-title">标签列表</div>
        <div class="buttons">
            <ul class="label-ul">
                <li class="label-li" v-for="(item, index) in labelNames"
                @click="handleLabelClick(item)"
                :key="index">
                    {{item.name}}
                </li>
            </ul>
            

            <!-- <el-button v-for="(item, index) in labelNames"
                :key="index"
                type="mini"
                :style="{borderColor: item.color}"
            >{{item.name}}</el-button> -->
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LabelItem } from '../interfaces/index';
import { Mutation } from 'vuex-class';



@Component
export default class PLabel extends Vue {

    @Mutation refreshCurrentLabel !: (value: string) => void

    labelNames : Array<LabelItem> = [
      { name: 'VUE', color: '#2dca1f' },
      { name: 'React', color: '#4478bf' },
      { name: 'THREE', color: '#fbb606' },
      { name: 'ElementUI', color: '#0683fb' },
      { name: 'CSS', color: '#635d61' },
      { name: 'Typescript', color: '#b3660e' },
      { name: 'SCSS', color: '#2dca1f' },
      { name: 'Javascript', color: '#158420' },
      { name: 'Webpack', color: '#BBAB8D' },
      { name: '性能', color: '#4478bf' },
      { name: '机器学习', color: '#2dca1f' },
      { name: 'Flutter', color: '#fbb606' },
      { name: '其他', color: '#4478bf' },
    ]

    handleLabelClick (item) {
        this.refreshCurrentLabel(item.name)
        if (this.$route.name !== 'article') {
            this.$router.push('/article');
        }
    }
}
</script>
<style lang="scss">
.plabel {
    width: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 20px;
    .label-title {
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        line-height: 50px;
        border-bottom: 1px solid #f3f6f3;
    }
    .buttons {
        width: 100%;
        // padding-bottom: 15px;
        // .el-button {
        //     margin-top: 12px;
        //     margin-left: 15px;
        //     font-weight: 600;
        //     border-radius: 8px;
        //     background-color: #f3f6f3;
        // }
         .label-ul {
            list-style-type: none;
            padding: 0px;
            .label-li {
                padding-top: 10px;
                cursor: pointer;
                &::before {
                    content: '→';
                }
            }
        }
    }
   
}
</style>
