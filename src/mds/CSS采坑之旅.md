#### 1. line-height不起作用

父元素使用line-height，子元素是内联元素，但是不起作用，需要在内联元素中加vertical-align: middle;

原因：line-height是指两行文字间基线之间的距离

对于文字的居中还有一个坑：

在PC端肉眼观察是居中的，但是在移动端(Android)上总是发现文字偏上，上下相差比较大，而且不同的机型相差数目不一样。

对于某些安卓(小米)机型，默认的line-height是30，低于这个高度的设置line-height没有效果。

解决办法：
```
line-height:normal; 
padding:10px 0; 
```




#### 2. 当子元素使用display: inline-block，父元素的高度会比子元素高5px
原因：行级盒子有的默认vertical-align是baseline的，而且往往因为上文line-height的影响，使它有个line-height，从而使其有了高度，因为baseline对齐的原因，这个匿名盒子就会下沉，往下撑开一些距离，所以把父元素撑高了。

父元素要设置font-size：0；
否则容易出现意想不到的效果，明明设置都是对的，这是因为空格的影响

#### 3 隐藏滚动条

```
/*隐藏滚动条，当IE下溢出，仍然可以滚动*/
-ms-overflow-style:none;
/*火狐下隐藏滚动条*/
overflow:-moz-scrollbars-none;
```
有一个比较投机的方法（当然也适用于其他浏览器）：
大体思路是在div外面再套一个div。这个div设置overflow:hidden。  

而内容div设置 overflow-y: scroll;overflow-x: hidden;

然后再设置外层div的width小于内层div的width。


#### 4、设置盒子自适应高度与宽度成一定比例
描述：宽度进行自适应可以使用width：30%，但是高度却不能做到自动调整（只能从父级继承，或者自行指定px，要么给百分比，但是这个百分比是根据父级的高度来计算的，不是根据元素自身的宽度，那么就做不到盒子的宽高达成一定的比例）
- 方法一：使用vw为单位

```
width： 15vw;
height: 15vw;
```
但是局限性比较大，有些设备不支持

- 方法二：使用padding（推荐）
padding都是根据盒子的width来计算的，那么通过设置这个属性就可以跟width形成比例关系了

```
// 宽度和高度2：1
width: 100%;
height: 0;
padding-top: 50%;
```
PS: 不用担心当在该盒子中放置子元素的时候，因为height为0回overflow，因为overflow属性计算的时候是包含content和padding


#### 5 文字抖动

```css
.shake {
    -webkit-animation:  shake 0.15s linear infinite;
    animation:  shake 0.15s linear infinite;
}
@-webkit-keyframes shake {
    0% {
        -webkit-transform: rotate(1deg) translateY(-1px);
        transform: rotate(1deg) translateY(-1px);
    }
    25% {
        -webkit-transform: rotate(-1deg) translateY(0px);
        transform: rotate(-1deg) translateY(0px);
    }
    50% {
        -webkit-transform: rotate(1deg) translateY(-1px);
        transform: rotate(1deg) translateY(-1px);
    }
    75% {
        -webkit-transform: rotate(0) translateY(1px);
        transform: rotate(0) translateY(1px);
    }
}
@keyframes shake {
    0% {
        -webkit-transform: rotate(1deg) translateY(-1px);
        transform: rotate(1deg) translateY(-1px);
    }
    25% {
        -webkit-transform: rotate(-1deg) translateY(0px);
        transform: rotate(-1deg) translateY(0px);
    }
    50% {
        -webkit-transform: rotate(1deg) translateY(-1px);
        transform: rotate(1deg) translateY(-1px);
    }
    75% {
        -webkit-transform: rotate(0) translateY(1px);
        transform: rotate(0) translateY(1px);
    }
}
```
