# Touch事件封装Tap
### 1、Thinking
移动端点击用click事件有300ms的延迟，如果用移动端的touch事件，一次事件包含touchstart，touchmove，touchend，可以通过HTMLElement来扩充原型，方便添加Event，通过判断touch的时间和偏移量来判断是否进行了一下tap事件。

### 2、realize
```javascript
if (!HTMLElement.prototype.addTapEvent) {
    HTMLElement.prototype.addTapEvent = function(callback) {
        let tapStartTime = 0
        let tapEndTime = 0
        const tapTime = 500  //tap等待时间，在此时间下松开可触发方法
        let  tapStartClientX = 0
        let  tapStartClientY = 0
        let  tapEndClientX = 0
        let  tapEndClientY = 0
        const  tapScollHeight = 15 //水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)
        let  cancleClick = false;
        this.addEventListener('touchstart', function() {
            tapStartTime = event.timeStamp;
            const touch = event.changedTouches[0];
            tapStartClientX = touch.clientX;
            tapStartClientY = touch.clientY;
            cancleClick = false;
        })
        this.addEventListener('touchmove', function() {
            var touch = event.changedTouches[0];
            tapEndClientX = touch.clientX;
            tapEndClientY = touch.clientY;
            if ((Math.abs(tapEndClientX - tapStartClientX) > tapScollHeight) || (Math.abs(tapEndClientY - tapStartClientY) > tapScollHeight)) {
                cancleClick = true;
            }
        })
        this.addEventListener('touchend', function() {
            tapEndTime = event.timeStamp;
            if (!cancleClick && (tapEndTime - tapStartTime) <= tapTime) {
                callback();
            }
        })
    }
}
```

### Usage

```
document.getElememtById('test').addTapEvent(function(){
    consle.log('this is a tap event');
})
```

