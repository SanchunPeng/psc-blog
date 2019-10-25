# JS拖拽
## 1、原生js
```javascript
const drag = function (ele) {
    let clientX = 0;
    let clientY = 0;
    let offsetLeft = 0;
    let offsetTop = 0;
    let isDown = false;
    ele.onmousedown = function (e) {
        //获取x坐标和y坐标
        clientX = e.clientX;
        clientY = e.clientY;
        //获取左部和顶部的偏移量
        offsetLeft = ele.offsetLeft;
        offsetTop = ele.offsetTop;
        //开关打开
        isDown = true;
        //设置样式  
        ele.style.cursor = 'move';
    }
    window.onmousemove = function (e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        const tempClientX = e.clientX;
        const tempClientY = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        const tempL = tempClientX - (clientX - offsetLeft);
        const tempT = tempClientY - (clientY - offsetTop);
        ele.style.left = tempL + 'px';
        ele.style.top = tempT + 'px';
    }
    ele.onmouseup = function () {
        //开关关闭
        isDown = false;
        ele.style.cursor = 'default';
    }
}
```
### PS：为什么mousemove放在window下？
因为当移动鼠标过快，鼠标脱离了绑定元素的范围，绑定的mousemove就会失去响应，元素不动了，鼠标回到元素区域，元素又接着动了。

## 2、html5
```javascript
const drag = function (ele) {
    let clientX = 0;
    let clientY = 0;
    let offsetLeft = 0;
    let offsetTop = 0;
    ele.ondragstart = function (e) {
        //获取x坐标和y坐标
        clientX = e.clientX;
        clientY = e.clientY;
        //获取左部和顶部的偏移量
        offsetLeft = ele.offsetLeft;
        offsetTop = ele.offsetTop;
        //设置样式  
        ele.style.cursor = 'move';
    }
    ele.ondrag = function (e) {
        //获取x和y
        const tempClientX = e.clientX;
        const tempClientY = e.clientY;
        if (tempClientX === 0 || tempClientY === 0) {
        return
        }
        //计算移动后的左偏移量和顶部的偏移量
        const tempL = tempClientX - (clientX - offsetLeft);
        const tempT = tempClientY - (clientY - offsetTop);
        ele.style.left = tempL + 'px';
        ele.style.top = tempT + 'px';
    }
}
```
