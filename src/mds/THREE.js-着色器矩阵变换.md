# Three.js着色器—矩阵变换
Three.js的渲染器解析场景和相机参数进行渲染的时候，会从模型对象获得几何体顶点对应的模型矩阵modelMatrix，从相机对象获得视图矩阵viewMatrix和投影矩阵projectionMatrix，在着色器中可以通过获得的模型矩阵、视图矩阵、投影矩阵对顶点位置坐标进行矩阵变换。

## 1 模型矩阵
### 1.1 定义
平移、缩放、旋转都对应一个几何变换，每个几何变换都可以用一个矩阵表示，所有几何变换对应矩阵的乘积就是一个复合矩阵，可以称为模型矩阵modelMatrix，模型矩阵是将顶点从局部坐标系转换到世界坐标系中。

### 1.2 在着色器使用模型矩阵
使用ShaderMaterial编写着色器代码的时候，模型矩阵modelMatrix不用程序员手动声明，Three.js渲染器 系统渲染的时候会自动往ShaderMaterial顶点着色器字符串中插入一句uniform mat4 modelMatrix;

```
<script id="vertexShader" type="x-shader/x-vertex">
  // uniform mat4 modelMatrix;//不需要声明
  void main(){
  // 模型矩阵modelMatrix对顶点位置坐标进行模型变换
  gl_Position = modelMatrix*vec4( position, 1.0 );
}
</script>
```
### 1.3 modelMatrix变量数据传递
Three.js渲染器渲染的时候会自动从一个Threejs的模型对象提取它世界矩阵属性.matrixWorld的属性值，然后传递给着色器的模型矩阵变量modelMatrix，这个操作是three引擎自动完成，而对模型.matrixWorld的属性值受自身以及父对象的几何变化(设置rotation，position，scale)影响

## 2 视图矩阵和投影矩阵
### 2.1 定义
相机对象本质上就是存储视图矩阵和投影矩阵的信息的一个对象，基类Camera的.matrixWorldInverse属性对应的就是着色器中视图矩阵变量viewMatrix，基类Camera的投影矩阵属性.projectionMatrix对应着色器中的投影矩阵变量projectionMatrix。

### 2.2 在着色器使用视图矩阵和投影矩阵
使用ShaderMaterial构造函数自定义顶点着色器的时候，同样不需要手动声明视图矩阵viewMatrix和投影矩阵projectionMatrix，WebGL渲染器会通过WebGLProgram.js模块自动声明这两个变量，在顶点着色器代码中插入uniform mat4 viewMatrix;和uniform mat4 projectionMatrix;


参考链接：
http://www.yanhuangxueyuan.com/Three.js_course/advanced/shader2.html