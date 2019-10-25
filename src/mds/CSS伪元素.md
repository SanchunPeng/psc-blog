# css伪元素

### 1、p:first-of-type 
选择父元素内同类型p标签元素中的第一个p元素
### 2、p:last-of-type 
选择父元素内同类型p标签元素中的最后一个p元素
### 3、p:only-of-type
选择该p元素是其父元素唯一的p元素，还是可以有其他的元素，只要p元素只有一个；
### 4、p:nth-of-type(n)
选择父元素内同类型p标签元素中的第n个p元素
### 5、p:nth-last-of-type(n)
选择父元素内同类型p标签元素中的从后往前的第n个p元素
### 6、p:first-child
选择父元素的第一个子元素并且是p元素
### 7、p:last-child
选择父元素的最后一个子元素并且是p元素
### 8、p:only-child
选择父元素的唯一一个子元素并且是p元素
### 9、p:nth-child(n)
选择属于其父元素的第n个p子元素(排序的时候是和其他子元素一起的排序中选取第几个元素，不是单独p元素排序)；p:nth-child(odd) 匹配所有奇数行;p:nth-child(even) 匹配所有偶数行，元素的第一个子元素索引为“1”。p:nth-child(3n+1)三层循环中的第一行，可以是数字，关键词或公式：使用公式 (an + b)。描述：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值。

### 10、p:nth-last-child(n)
选择属于其父元素从后往前的第n个p子元素
### 11、:after
在元素之后添加内容,也可以用来做清除浮动。
### 12、:before
在元素之前添加内容
### 13、:enabled、:disabled
控制表单控件的禁用状态。
### 14、:checked
单选框或复选框被选中。

### PS：
1、E:****-child这类型的伪元素，选择父元素下的所有子元素排列的第几个元素，而且这个元素必须符合E，不论是元素标签还是class类
2、对于E:****-of-type类型的伪元素，可以先看个例子

```javascript
<div class="parent">
    <div>这是第一个段落。</div>
    <p>这是第二个段落。</p>
    <p class="test">这是第三个段落。</p>
    <p>这是第四个段落。</p>
</div>

.test:first-of-type{
    background:#ff0000;    // 并没与选择到第三段落
}

```
上面的css我们都错误理解为父元素内第一个.test元素  
正确理解是父元素内第一个p元素，而且class是test的元素  
如果要选择第三段落可以的写法：  
.test:nth-of-type(2)   
.test:nth-child(3)   

```javascript
<div class="parent">
    <p>这是第一个段落。</p>
    <p>这是第二个段落。</p>
    <div class="test">这是第三个段落。</div>
    <p>这是第四个段落。</p>
</div>

.test:first-of-type{
    background:#ff0000;    // 这是第三个段落背景变为红色
}

```
