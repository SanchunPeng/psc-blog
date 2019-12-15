# THREE.js-性能优化
## 1、纹理图片尺寸一定得是2的幂次方，并尽可能的小
使用 new THREE.TextureLoader().load( “water.jpg” )加载纹理贴图时，如果不是2的幂次方，那么three.js就会自动转为最合适的2的幂次方尺寸，并在控制台打印出黄色警告。这个不是three.js设置的，是webgl限制的，是为了适合Mipmap设置（为了加快渲染速度和减少图像锯齿，贴图被处理成由一系列被预先计算和优化过的图片组成的文件）。

图片尽可能的小，合并，图片越大不代表越清晰，也会和纹理过滤等各属性有关。降低图片大小，减少内存占用。

注意：如果纹理贴图不能是2的幂次方，可以设置texture.minFilter = THREE.LinearFilter;

## 2、跳帧设置

```javascript
    let skip = 0
    function animation () {
      if (skip !== 0) {
          skip = ++skip % 2
          return
        } else {
          skip = ++skip % 2
        }   
    }
```


## 3、disppose()方法
每当你创建一个three.js中的实例时，都会分配一定数量的内存。当你场景中几何体(geometry,bufferGeometry)，材质(material)，纹理(texture)，渲染目标(WebFLRenderTarget)或者其他杂项废弃不用时，这时这些对象在你得代码里已经结束了他们得生命周期，但是three.js系统并不会帮你回收对象，他们依然存在于你的内存中，你需要手动使用dispose()，去主动释放这些资源。

```javascript
    geometry.dispose();
    material.dispose();
    RenderTarget.dispose();
    texture.dispose();
```
对于纹理的内部资源仅在图像完全被加载后才会分配。如果你在图像被加载之前废置纹理，什么都不会发生。 没有资源被分配，因此也没有必要进行清理。

## 4、object的martrixAutoUpdate属性
martrixAutoUpdate属性默认为true，并且自动重新计算矩阵，可以把该属性设置为false，当修改了object的一些属性后，可以调用object.updateMatrix()手动更新矩阵


## 5、geometry合并
合并条件：  
1）相同材质的几何模型   
2）不需要对单个模型进行控制   
可以将这些几何模型拼接成一个几何模型节约性能，将几何体的定点、面、UV进行合并。

```javascript
function getCubeGroup () {
    const group = new THREE.Group()
    const material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 1
    })
    
    for (let i = 0; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(20, 20, 20)
        const cube = new THREE.Mesh(geometry, material)
        cube.matrixAutoUpdate = false
        // 这里可以对cube的postion，rotation等进行设置
        cube.updateMatrix()
        group.add(cube)
    }
    
    return group
}
```
#### 合并：
```javascript
function getCubeGroup () {
    const geometry = new THREE.Geometry()
    const material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 1
    })
    
    for (let i = 0; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(20, 20, 20)
        const cube = new THREE.Mesh(geometry, material)
        cube.matrixAutoUpdate = false
        // 这里可以对cube的postion，rotation等进行设置
        cube.updateMatrix()
        geometry.merge(cube.geometry, cube.matrix)
    }
    
    return new THREE.Mesh(geometry, material)
}
```
合并后就成了一个mesh

## 6、render优化
在一个全景项目中，在当前屏幕，可能不仅仅是一个全景展示，是多个，那么就会重复的创建render，scene，camera，那样也会创建多个canvas，而且不停的调用多个requestAnimationFrame，性能消耗比较大，可以想到将其合并，可以将多个render合并，使用renderer.setViewport设置视口，这样不用多少个全景，都在一个requestAnimationFrame中通过不同的状态调用renderer.render(scene, camera)

##### 注意： 着色器材质uniforms中赋值纹理贴图的时候一定要注意，如果该变量中已经存在纹理贴图，不能直接赋值，覆盖该变量，那样之前的贴图还在内存中，一定要dispose()，查找问题时通过VRHOUSE_RENDERER.info.memory查看内存中的texture和gemory数目

