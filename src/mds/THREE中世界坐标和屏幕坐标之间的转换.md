## 屏幕坐标 -> 世界坐标
将屏幕坐标转化为世界坐标并通过射线抓取3D世界坐标中的物体。


```javascript
const mousePosition = getMousePosition(event, renderer.domElement)// renderer是一个一个WebRenderer渲染器
// 设置射线的起点是相机
const raycaster =  new THREE.Raycaster();
raycaster.setFromCamera(mousePosition, camera);
const intersects = raycaster.intersectObjects(scene.children, true);
// 将射线投影到屏幕，如果scene.children里的某个或多个形状相交，则返回这些形状
// 第二个参数是设置是否递归，默认是false，也就是不递归。当scene里面添加了Group对象的实例时，就需要设置这个参数为true
// 第一个参数不传scene.children也可以，传一个group.children或一个形状数组都可以（这样可以实现一些特别的效果如点击内部的效果）
// 另外，因为返回的是一个数组，所以遍历数组就可以获得所有相交的对象，当元素重叠时，特别有用

```
```javascript
function getMousePosition(domEvent, domElement) {
  var x = 0, y = 0;
  if (domEvent.type === 'touchstart') {
    x = domEvent.touches[0].pageX;
    y = domEvent.touches[0].pageY;
  } else if (domEvent.type === 'touchend') {
    x = domEvent.changedTouches[0].pageX;
    y = domEvent.changedTouches[0].pageY;
  } else {
    x = domEvent.clientX;
    y = domEvent.clientY;
  }
  x = x / domElement.clientWidth;
  y = y / domElement.clientHeight;
  var position = new THREE.Vector2();
  position.x = x * 2 - 1;
  position.y = -y * 2 + 1;

  return position;
}
```

## 世界坐标 -> 屏幕坐标
```javascript
function convert2ScreenPoint (camera, cavasDom, worldPoint) {
  const pp = worldPoint.clone().project(camera) //得到世界坐标在camera相机对象矩阵变化下对应的标准设备坐标， 标准设备坐标xyz的范围是[-1,1]
  const clientWidth = cavasDom.clientWidth
  const clientHeight = cavasDom.clientHeight
  const left = (pp.x + 1) / 2 * clientWidth
  const top = (1 - pp.y) / 2 * clientHeight
  return {
    left,
    top,
    pp
  }
}
```