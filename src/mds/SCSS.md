# SCSS
### 嵌套规则

```
// scss
#id {
    color: red;
    .name {
        color: blue;
        .child {
            color: yellow;
        }
    }
}

// css
#id {
    color: red;
}

#id .name {
    color: blue;
}

#id .name .child {
    color: yellow;
}
```


### 引用父选择器 &

```
// scss
.btn {
    background-color: #fff;
    &.active {
        background-color: red;
    }
    &:hover {
        background-color: blue;
    }
    &:visited {
        background-color: yellow;
    }
    &-success {
        background-color: pink;
    }
}

// css
.btn {
    background-color: #fff;
}

.btn.active {
    background-color: red;
}

.btn:hover {
    background-color: blue;
}

.btn:visited {
    background-color: yellow;
}

.btn-success {
    background-color: pink;
}
```


### 嵌套属性规则

```
// scss
.attr {
    font: {
        family: fantasy;
        size: 1.2em;
        line-hight: 1.4;
    };
    border: {
        radius: 20px;
        color: blue;
    };
}

// css
.attr {
    font-family: fantasy;
    font-size: 1.2em;
    font-line-hight: 1.4;
    border-radius: 20px;
    border-color: blue;
}
```


### 运算
声明变量

```
// scss
$width: 50px;

.wt {
    width: $width;
}

// css
.wt {
    width: 50px;
}

数学运算
// scss
#id {
    width: (1 + 2) *3px;
}

// css
#id {
    width: 9px;
}
```


### 特殊的 / 除法运算符

```
// scss
p {
  font: 10px/8px;             // 纯 CSS，不是除法运算
  $width: 1000px;
  width: $width/2;            // 使用了变量，是除法运算
  width: round(1.5px)/2;        // 使用了函数，是除法运算
  height: (500px/2);          // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
  padding-left: + 100px / 2;  
}

// css
p {
    font: 10px/8px;
    width: 500px;
    width: 1px;
    height: 250px;
    margin-left: 9px;
    padding-left: 50px;
}
```

PS：scss为了兼容IE8,10px/8px不能种的 /不能编译为除法运算符，可以在除法运算前使用+运算符创建命名空间
### 颜色运算符

```
// scss
p {
  color: #001100 + #040506;
}
p {
  color: #010 + #040506;
}

// css
p {
    color: #041606;
}

p {
    color: #041606;
}
```

### 插值 #{}


```
// scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}

// css
p.foo {
    border-color: blue;
}

p {
    font: 12px/30px;
}
```

### 插值内的计算，null为空字符串

```
// scss
p:before {
    content: 'string #{1+2} str';
}
$val: null;
p:before {
    content: 'sting #{$val} str';
}

// css
p:before {
    content: "string 3 str";
}

p:before {
    content: "sting  str";
}
```


### SCSS 指令
#### import导入：import可以导入style.scss的样式到当前文件下

```
// scss
@import 'style.scss';

import 指令支持嵌套
// scss
.warp {
  @import 'style.scss';
}
```


#### media 媒体查询

```
// scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;
.father{
    .sidebar {
        width: 800px;
    }
    @media #{$media} and ($feature: $value) {
      height: 300px;
      .sidebar {
        width: 500px;
      }
      .hello {
          color: red;
      }
    }
}

// css
.father .sidebar {
    width: 800px;
}

@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
    .father {
        height: 300px;
    }

    .father .sidebar {
        width: 500px;
    }

    .father .hello {
        color: red;
    }
}
```


#### extend 继承
extend 只能继承选择器

```
// scss
.error {
  border: 1px #f00;
  background-color: #fdd;
  &.intrusion {
      background-image: url("/image/hacked.png");
    }
}

.seriousError {
  @extend .error;
  border-width: 3px;
}

// css
.error, .seriousError {
    border: 1px #f00;
    background-color: #fdd;
}

.error.intrusion, .intrusion.seriousError {
    background-image: url("/image/hacked.png");
}

.seriousError {
    border-width: 3px;
}
```


#### extend继承选择器的相关性

```
// scss
.hoverlink {
  @extend a:hover;
}

a:hover {
  text-decoration: underline;
}

.comment a.user:hover { // a.user:hover 和a:hover 有相关性，同样被继承 
  font-weight: bold;
}

.comment a .user:hover { // a .user:hover 与a:hover 无相关性，不被继承
  color: red;
}

// css
a:hover, .hoverlink {
    text-decoration: underline;
}

.comment a.user:hover, .comment .user.hoverlink {
    font-weight: bold;
}

.comment a .user:hover {
    color: red;
}
```


#### extend的多次继承

```
// scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}

// csss
.error, .seriousError {
    border: 1px #f00;
    background-color: #fdd;
}

.attention, .seriousError {
    font-size: 3em;
    background-color: #ff0;
}

.seriousError {
    border-width: 3px;
}
```

#### extend的链式继承

```
// scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}

// css
.error, .seriousError, .criticalError {
    border: 1px #f00;
    background-color: #fdd;
}

.seriousError, .criticalError {
    border-width: 3px;
}

.criticalError {
    position: fixed;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
}
```


### mixin + include混合
#### mixin 混合属性

```
// scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

// css
.page-title {
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    color: #ff0000;
    padding: 4px;
    margin-top: 10px;
}
```

#### mixin 在外层混合, 不依赖于父层结构

```
// scss
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}

@include silly-links;

// css
a {
    color: blue;
    background-color: red;
}
```

#### mixin 设置参数

```
// scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p { @include sexy-border(blue, 1in); }

// css
p {
    border-color: blue;
    border-width: 1in;
    border-style: dashed;
}
```


#### mixin 混合未知格式和数量的变量, 使用arg...

```
// scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

// css
.shadows {
    -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

也可以使用插值编写，不过mixin和include指定的是一个不会进行动态识别的字面量不能使用插值

```
// scss
$b: box-shadow;
@mixin box-shadow($shadows...) {
  -moz-#{$b}: $shadows;
  -webkit-#{$b}: $shadows;
  #{$b}: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

// css
.shadows {
    -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```


#### mixin 的复合 mixin内部也可以include

```
// scss
@mixin compound {
  @include highlighted-background;
  @include header-text;
}

@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }

.com {
    @include compound;
}

// css
.com {
    background-color: #fc0;
    font-size: 20px;
}
```


### SCSS 流程控制指令
#### if 条件语句

```
// scss
p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 < 3      { border: 2px dotted; }
  @if null       { border: 3px double; }
}

// css
p {
    border: 1px solid;
}
```

#### else if 语句

```
// scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

// css
p {
    color: green;
}
```

#### for 循环语句

```
// scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

// css
.item-1 {
    width: 2em;
}

.item-2 {
    width: 4em;
}

.item-3 {
    width: 6em;
}
```


#### each 循环语句

```
// scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// css
.puma-icon {
    background-image: url("/images/puma.png");
}

.sea-slug-icon {
    background-image: url("/images/sea-slug.png");
}

.egret-icon {
    background-image: url("/images/egret.png");
}

.salamander-icon {
    background-image: url("/images/salamander.png");
}
```


#### while循环语句

```
// scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}

// css
.item-6 {
    width: 12em;
}

.item-4 {
    width: 8em;
}

.item-2 {
    width: 4em;
}

```

原文作者：coolheadedY

链接：https://www.jianshu.com/p/3259976b414b
