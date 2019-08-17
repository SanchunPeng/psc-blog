<template>
    <div class="plabel">
        <div class="lable-title">标签</div>
        <div class="buttons">
            <el-button v-for="(item, index) in labelNames"
                :key="index"
                type="mini"
                :style="{borderColor: item.color}"
            >{{item.name}}</el-button>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LabelItem } from '../interfaces/index';

@Component
export default class PLabel extends Vue {
    labelNames : Array<LabelItem> = [
      { name: 'Vue', color: '#2dca1f' },
      { name: 'React', color: '#4478bf' },
      { name: 'Three、WebGL', color: '#fbb606' },
      { name: 'WebGL', color: '#fbb606' },
      { name: 'ElementUI', color: '#0683fb' },
      { name: 'Typescript', color: '#b3660e' },
      { name: 'Javascript', color: '#158420' },
      { name: 'css', color: '#635d61' },
      { name: 'scss', color: '#635d61' },
      { name: 'webpack', color: '#BBAB8D' },
      { name: '算法', color: '#ffb800' },
    ]
}
</script>
<style lang="scss">
.plabel {
    width: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    .lable-title {
        height: 50px;
        font-size: 16px;
        padding-left: 15px;
        font-weight: 600;
        line-height: 50px;
        border-bottom: 1px solid #f3f6f3;
    }
    .buttons {
        width: 100%;
        padding-bottom: 15px;
        .el-button {
            margin-top: 12px;
            margin-left: 15px;
            font-weight: 600;
            border-radius: 8px;
            background-color: #f3f6f3;
        }
    }
}
</style>
