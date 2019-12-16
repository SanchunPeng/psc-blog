<template>
<div class="about">
    <div class="content">
        <h3>1、工作</h3>
        <div class="desc">作为一名开发工作者，技术是安身立命的本钱，在工作过程中，我的技术有了很大的成长。虽然一直在做VR相关的工作，但是框架以及基础知识都也有了更深的理解，当然，这些应用层的知识都是次要的，学到的编程能力以及思维能力才是最重要的，毕竟事物是有相关系的，一方面精通，其他方面学习起来就会方便容易很多。
        </div>
        <h3>2、运动</h3>
        <div class="desc">身体第一，没有健康身体说啥都是空话，工作一年后越发觉得运动很重要，所以每天中午都会吃完饭到跑步机上走四五十分钟，晚上也会去运动运动，保持一周两三次吧。
        </div>
        <h3>3、生活 · 娱乐</h3>
        <div class="life">
            <h4>3.1、做吃的</h4>
            <div class="desc">在工作的这么长时间里，每天早上都会喝自己煮的粥，周末也会尝试自己做菜，毕竟自己做的菜，吃着健康。</div>
            <img class="eat-img" src="../assets/eat.jpg"/>
            <h4>3.2、电影 · 电视 · 动漫 · 小说</h4>
            <div class="desc">平时休息的时间经常看点电影，电视剧，动漫，现在越来越喜欢国漫了，立意好，画质也是非常棒，就是周更的太慢，而且每次时间有点短，看不够。平时没事也会看小说打发点时间。</div>
            <h4>3.3、玩游戏</h4>
            <div class="desc">玩游戏大部分时间是玩的王者荣耀，偶尔吃鸡，和公司同事组队参加了两次公司比赛，一次得了冠军，一次才八强，不过那种一起打游戏的感觉是很棒的，胜利的喜悦，团队的意识，失败的自责，崛起的雄心，是一段不错的回忆。</div>
        </div>
        <h3>4、额外技能</h3>
        <div class="desc">部门每周都会有人进行分享，我会定会议室，然后将每周分享主题、分享人、分享内容做成手机海报，方便其他部门的人看到内容，如果有兴趣可以过来听，而且也会做一下部门内部最近比较好的产品服务的邮件宣传海报，然后让组内每个人在邮箱后面带上，这样发邮件给别人，或者转发邮件，都是会宣传到部门的产品。</div>
        <img class="share-img" src="../assets/share.jpg"/>
    </div>

</div>
</template>

<script>
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component
export default class About extends Vue {

}
</script>
<style lang="scss">
.about .content {
    width: 100%;
}
.content {
    font-size: 12px;
    background-color: #FFFFFF;
    padding: 20px;
    h3, h4 {
        padding: 15px 0;
    }

    .desc {
        margin: 10px;
        line-height: 30px;
        text-indent: 2em;
    }
    .eat-img{
        width: 100%;
        height: 200px;
    }
    .share-img {
        width: 100%;
        height: 400px;
    }

}


</style>
