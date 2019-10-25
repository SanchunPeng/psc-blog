以下这些造型简单的图形都是纯CSS外加一个HTML标签实现的，不少实现以前我介绍过，或者你也知道，但是有些相信你没见过。

### 1. 正方形
相关CSS代码：
```css
#square {
  width: 100px; height: 100px;
  background: red;
}
```

### 2. 长方形
相关CSS代码：

```css
#rectangle {
  width: 200px; height: 100px;
  background: red;
}
```

### 3. 正圆
这个显然借助圆角实现   
相关CSS代码：
```css
#circle {
  width: 100px; height: 100px;
  background: red;
  border-radius: 50%
}
```
### 4. 椭圆
相比正圆就是尺寸有些不一样，相关CSS代码：
```css
#oval {
  width: 200px; height: 100px;
  background: red;
  border-radius: 50%;
}
```
### 5. 向上三角
相关CSS代码：
```css
#triangle-up {
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

### 6. 向下三角
相关CSS代码：

```css
#triangle-down {
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
}
```

### 7. 方向朝左的三角
相关CSS代码：
```css
#triangle-left {
  width: 0;
  border-top: 50px solid transparent;
  border-right: 100px solid red;
  border-bottom: 50px solid transparent;
}
```

### 8. 方向朝右的三角
相关CSS代码：
```css
#triangle-right {
  width: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid red;
  border-bottom: 50px solid transparent;
}
```

### 9. 左上三角
相关CSS代码：
```css
#triangle-topleft {
  width: 0;
  border-top: 100px solid red;
  border-right: 100px solid transparent;
}
```

也可以使用一个45°的斜向线性渐变实现，不过兼容性没有使用border实现好。

### 10. 右上三角
相关CSS代码：

```css
#triangle-topright {
  width: 0;
  border-top: 100px solid red;
  border-left: 100px solid transparent;
}
```

也可以使用一个45°的斜向线性渐变实现，不过兼容性没有使用border实现好。

### 11. 左下角三角图形

相关CSS代码：


```css
#triangle-bottomleft {
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-right: 100px solid transparent;
}
```

也可以使用渐变绘制。

### 12. 右下角三角图形

相关CSS代码：


```css
#triangle-bottomright {
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-left: 100px solid transparent;
}
```

也可以使用渐变绘制。

### 13. 弧形尾箭头

完整CSS代码：


```css
#curvedarrow {
  position: relative;
  width: 0;
  border-top: 90px solid transparent;
  border-right: 90px solid red;
  transform: rotate(10deg) translateX(100%);
}
#curvedarrow:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 30px solid red;
  border-radius: 200px 0 0 0;
  top: -120px; left: -90px;
  width: 120px; height: 120px;
  transform: rotate(45deg);
}
```

实际使用用不到这么大的图形，只要把CSS中所有的数值（不包括旋转）全部都缩小10倍就好了。

### 14. 梯形

相关CSS代码：


```css
#trapezoid {
  border-bottom: 100px solid red;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  width: 100px;
}
```

### 15. 等边四边形
可以借助transform属性的skew斜切实现：


```css
#parallelogram {
  width: 150px;
  height: 100px;
  transform: skew(20deg);
  background: red;
}
```

### 16.  六角星

相关CSS代码：

```css
#star-six {
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  position: relative;
}
#star-six:after {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
  position: absolute;
  content: "";
  top: 30px; left: -50px;
}
```

### 17. 五角星

```css
五角星实现难度要比六角形大得多，CSS代码为：

#star-five {
  margin: 50px 0;
  position: relative;
  color: red;
  width: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid red;
  border-left: 100px solid transparent;
  transform: rotate(35deg);
}
#star-five:before {
  border-bottom: 80px solid red;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  position: absolute;
  top: -45px; left: -65px;
  content: '';
  transform: rotate(-35deg);
}
#star-five:after {
  position: absolute;
  color: red;
  top: 3px; left: -105px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid red;
  border-left: 100px solid transparent;
  transform: rotate(-70deg);
  content: '';
}
```

### 18. 多边形-五边形

相关CSS代码：

```css
#pentagon {
  position: relative;
  width: 54px;
  box-sizing: content-box;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: red transparent;
}
#pentagon:before {
  content: "";
  position: absolute;
  top: -85px; left: -18px;
  border-width: 0 45px 35px;
  border-style: solid;
  border-color: transparent transparent red;
}
```

当然，最容易理解的实现方法是使用clip-path。

### 19. 多边形-六边形

 

 

相关CSS代码：


```css
#hexagon {
  width: 100px; height: 55px;
  background: red;
  position: relative;
}
#hexagon:before {
  content: "";
  position: absolute;
  top: -25px; left: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 25px solid red;
}
#hexagon:after {
  content: "";
  position: absolute;
  bottom: -25px; left: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 25px solid red;
}
```

### 20. 多边形-八边形

相关CSS代码：

```css
#octagon {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
}
#octagon:before {
  content: "";
  width: 100px;
  position: absolute;
  top: 0; left: 0;
  border-bottom: 29px solid red;
  border-left: 29px solid #fff;
  border-right: 29px solid #fff;
  box-sizing: border-box;
}
#octagon:after {
  content: "";
  width: 100px;
  position: absolute;
  bottom: 0; left: 0;
  border-top: 29px solid red;
  border-left: 29px solid #fff;
  border-right: 29px solid #fff;
  box-sizing: border-box;
}
```

### 21. 爱心❥

相关CSS代码：


```css
#heart {
  position: relative;
  width: 100px; height: 90px;
}
#heart:before,
#heart:after {
  position: absolute;
  content: "";
  left: 50px; top: 0;
  width: 50px; height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
#heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
```

### 22.  无限

相关CSS代码：


```css
#infinity {
  position: relative;
  width: 212px; height: 100px;
  box-sizing: content-box;
}
#infinity:before,
#infinity:after {
  content: "";
  box-sizing: content-box;
  position: absolute;
  top: 0; left: 0;
  width: 60px; height: 60px;
  border: 20px solid red;
  border-radius: 50px 50px 0 50px;
  transform: rotate(-45deg);
}
#infinity:after {
  left: auto; right: 0;
  border-radius: 50px 50px 50px 0;
  transform: rotate(45deg);
}
```

### 23.  菱形方块

相关CSS代码：

```css
#diamond {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: red;
  position: relative;
  top: -50px;
}
#diamond:after {
  content: '';
  position: absolute;
  left: -50px;
  top: 50px;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-top-color: red;
}
```

### 24.  菱形盾构

相关CSS代码：

```css
#diamond-shield {
  width: 0;
  border: 50px solid transparent;
  border-bottom: 20px solid red;
  position: relative;
  top: -50px;
}
#diamond-shield:after {
  content: '';
  position: absolute;
  left: -50px; top: 20px;
  border: 50px solid transparent;
  border-top: 70px solid red;
}
```


### 25.  方块菱形-窄

相关CSS代码：


```css
#diamond-narrow {
  width: 0;
  border: 50px solid transparent;
  border-bottom: 70px solid red;
  position: relative;
  top: -50px;
}
#diamond-narrow:after {
  content: '';
  position: absolute;
  left: -50px; top: 70px;
  border: 50px solid transparent;
  border-top: 70px solid red;
}
```

### 26.  切割菱形-钻石般

值钱的CSS代码：

```css
#cut-diamond {
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 0 25px 25px 25px;
  width: 50px;
  box-sizing: content-box;
  position: relative;
  margin: 20px 0 50px 0;
}
#cut-diamond:after {
  content: "";
  position: absolute;
  top: 25px; left: -25px;
  border-style: solid;
  border-color: red transparent transparent transparent;
  border-width: 70px 50px 0 50px;
}
```

### 27.  鸡蛋形状
实现也很简单，就一个border-radius就可以了：

```css
#egg {
  display: block;
  width: 126px;
  height: 180px;
  background-color: red;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
```

### 28.  吃豆人

相关CSS代码：


```css
#pacman {
  width: 0px; height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid red;
  border-left: 60px solid red;
  border-bottom: 60px solid red;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}
```

### 29. 带尖角的说话泡泡

相关CSS代码：


```css
#talkbubble {
  width: 120px; height: 80px;
  background: red;
  position: relative;
  border-radius: 10px;
}
#talkbubble:before {
  content: "";
  position: absolute;
  right: 100%; top: 26px;
  border-top: 13px solid transparent;
  border-right: 26px solid red;
  border-bottom: 13px solid transparent;
}
```

### 30. 十二星

相关CSS代码：


```css
#burst-12 {
  background: red;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;
}
#burst-12:before,
#burst-12:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
  background: red;
}
#burst-12:before {
  transform: rotate(30deg);
}
#burst-12:after {
  transform: rotate(60deg);
}
```

这个效果的作者是Alan Johnson。

### 31. 八角形

相关CSS代码：


```css
#burst-8 {
  background: red;
  width: 80px; height: 80px;
  position: relative;
  text-align: center;
  transform: rotate(20deg);
}
#burst-8:before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  height: 80px; width: 80px;
  background: red;
  transform: rotate(135deg);
}
```

### 32.  阴阳八卦

相关CSS代码：
```css
#yin-yang {
  width: 96px; height: 48px;
  background: #eee;
  border-color: red;
  border-style: solid;
  border-width: 2px 2px 50px 2px;
  border-radius: 100%;
  position: relative;
}
#yin-yang:before {
  content: "";
  position: absolute;
  top: 50%; left: 0;
  background: #fff;
  border: 18px solid red;
  border-radius: 100%;
  width: 12px; height: 12px;
}
#yin-yang:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: red;
  border: 18px solid #eee;
  border-radius: 100%;
  width: 12px;
  height: 12px;
}
```

### 33.  徽章缎带

 

相关CSS代码：

```css
#badge-ribbon {
  position: relative;
  background: red;
  height: 100px; width: 100px;
  border-radius: 50px;
}
#badge-ribbon::before,
#badge-ribbon::after {
  content: '';
  position: absolute;
  border-bottom: 70px solid red;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  top: 70px; left: -10px;
  transform: rotate(-140deg);
}
#badge-ribbon::after {
  left: auto;
  right: -10px;
  transform: rotate(140deg);
}
```

### 34.  bilibili电视机

相关CSS代码：


```css
#tv {
  position: relative;
  width: 200px; height: 150px;
  margin: 20px 0;
  background: red;
  border-radius: 50% / 10%;
  color: white;
  text-align: center;
  text-indent: .1em;
}
#tv:before {
  content: '';
  position: absolute;
  top: 10%; bottom: 10%; right: -5%; left: -5%;
  background: inherit;
  border-radius: 5% / 50%;
}
```

### 35. V形线条

相关CSS代码：


```css
#chevron {
  position: relative;
  text-align: center;
  padding: 12px;
  margin-bottom: 6px;
  height: 60px; width: 200px;
}
#chevron:before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 51%;
  background: red;
  transform: skew(0deg, 6deg);
}
#chevron:after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  height: 100%; width: 50%;
  background: red;
  transform: skew(0deg, -6deg);
}
```

### 36. 放大镜

相关CSS代码：

```css
#magnifying-glass {
  font-size: 10em;
  display: inline-block;
  width: 0.4em; height: 0.4em;
  border: 0.1em solid red;
  position: relative;
  border-radius: 0.35em;
}
#magnifying-glass:before {
  content: "";
  display: inline-block;
  position: absolute;
  right: -0.25em; bottom: -0.1em;
  border-width: 0;
  background: red;
  width: 0.35em; height: 0.08em;
  transform: rotate(45deg);
}
```

这个实现很不错，单位是em，实用性就很强。

### 37. 月儿弯弯

相关CSS代码：

```css
#moon {
  width: 80px; height: 80px;
  border-radius: 50%;
  box-shadow: 15px 15px 0 0 red;
}
```

### 38.  旗帜

相关CSS代码：


```css
#flag {
  width: 110px; height: 56px;
  padding-top: 15px;
  position: relative;
  background: red;
}
#flag:after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  border-bottom: 13px solid #fff;
  border-left: 55px solid transparent;
  border-right: 55px solid transparent;
}
```

### 39.  圆锥体

依然是活用圆角border-radius属性：


```css
#cone {
  width: 0; height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 100px solid red;
  border-radius: 50%;
}
```

### 40. 十字架

可以作为添加按钮，或者添加图标。

相关代码：


```css
#cross {
  background: red;
  width: 20px; height: 100px;
  position: relative;
}
#cross:after {
  background: red;
  content: "";
  width: 100px; height: 20px;
  position: absolute;
  left: -40px; top: 40px;
}
```

### 41. 棒球踏板形状

相关CSS代码：


```css
#base {
  background: red;
  display: inline-block;
  height: 55px; width: 100px;
  margin-left: 20px;
  margin-top: 55px;
  position: relative; 
}
#base:before {
  border-bottom: 35px solid red;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  content: "";
  left: 0; top: -35px;
  position: absolute;  
}
```


### 42.  长长的指向图形

相关CSS代码：


```css
#pointer {
  width: 200px; height: 40px;
  position: relative;
  background: red;
}
#pointer:after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
#pointer:before {
  content: "";
  position: absolute;
  right: -20px; bottom: 0;
  border-left: 20px solid red;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
```

### 43.  锁

相关CSS代码：

```css
#lock {
  font-size: 8px;
  position: relative;
  width: 18em; height: 13em;
  border-radius: 2em;
  top: 10em;
  box-sizing: border-box;
  border: 3.5em solid red;
  border-right-width: 7.5em;
  border-left-width: 7.5em;
  margin: 0 0 6rem 0;
}
#lock:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: 2.5em solid red;
  width: 14em; height: 12em;
  left: 50%;
  margin-left: -7em; top: -12em;
  border-top-left-radius: 7em;
  border-top-right-radius: 7em;
}
#lock:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: 1em solid red;
  width: 5em; height: 8em;
  border-radius: 2.5em;
  left: 50%; top: -1em;
  margin-left: -2.5em;
}
```


原文地址：    
[https://www.zhangxinxu.com/wordpress/?p=8386](https://www.zhangxinxu.com/wordpress/?p=8386)