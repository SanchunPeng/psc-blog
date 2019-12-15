## 自定义着色器Shader

### 1、THREE的Shader

Three.js提供了RawShaderMaterial和ShaderMaterial两个API用来辅助开发者自定义着色器代码，所以在Three中ShaderMaterial编写着色器代码要比在原生的WenGL中编写着色器代码要方便，语法相同，但是Three渲染器会帮你自动设置一些代码。


```
// ShaderMaterial
const shader = new THREE.ShaderMaterial({
    vertexShader: [ // 顶点着色器，逐顶点运行该程序，顶点位置数据赋值给内置变量gl_Position
          "void main() {",
          "gl_Position = vec4( position, 1.0 );",
          "}"
    ].join("\n"),
    fragmentShader: [ // 片段着色器，逐片元处理，这里每个片元或者说像素设置为红色
          "void main() {",
          "gl_FragColor = vec4(1.0,0.0,0.0,1.0);",
          "}"
    ].join("\n"),
})
```
注意：使用ShaderMaterial API的好处就是在创建的时候Three.js渲染器系统会自动解析几何体对象Geometry中顶点位置、颜色、法向量等数据，然后在渲染的时候传递给着色器中的相应变量。不需要自己定义直接可以使用，比如上面的position


### 2、GLSL（OpenGL Shading Language）

GLSL是编写顶点着色器和片段着色器的语言，语法类似C语言，是在GPU中执行

#### 2.1、变量命名
使用字母，数字以及下划线，不能以数字开头。而且不能以 gl_ 作为前缀，这个是GLSL保留的前缀，用于GLSL 的内部变量。

#### 2.2、数据类型
- void：表示空类型。作为函数的返回类型，表示这个函数不返回值。  
- bool：布尔类型  
- int：有符号整型  
- uint：无符号整形   
- float：浮点型
- vec2,vec3,vec4：包含2、3、4个浮点分量的向量
- ivec2,ivec3,ivec4：包含2、3、4个整数分量的向量
- uvec2,uvec3,uvec4	：包含2、3、4个无符号整数分量的向量
- bvec2,vbec3,bvec4：包含2、3、4个布尔分量的向量
- mat2 或 mat2x2，mat3 或 mat3x3，mat4 或 mat4x4，mat2x3（OpenGL的矩阵是列主顺序的）：2x2、3x3、4x4、2x3的浮点矩阵
- sampler1D：用于内建的纹理函数中引用指定的1D纹理的句柄。只可以作为一致变量或者函数参数使用
- sampler2D：二维纹理句柄
- sampler3D：三维纹理句柄
- samplerCube：cube map纹理句柄
- sampler1DShadow：一维深度纹理句柄
- sampler2DShadow：二维深度纹理句柄
- 数组：GLSL中只可以使用一维的数组。数组的类型可以是一切基本类型或者结构体，e.g. float floatArray[4];
vec4 vecArray[2];float a[4] = float[](1.0,2.0,3.0,4.0);
- 结构体：结构体可以组合基本类型和数组来形成用户自定义的类型。e.g.
```
struct fogStruct {
 vec4 color;
 float start;
 float end;
 vec points[3]; // 固定大小的数组是合法的
} fogVar;
```

PS：向量元素的获取（成分选择）
向量中单独的成分可以通过 {x,y,z,w}, {r,g,b,a} 或者 {s,t,p,q} 的记法来表示。这些不同的记法用于 顶点，颜色，纹理坐标。不可以混合使用。

```
vec3 v1 = {0.5, 0.35, 0.7};//可以通过 {x,y,z,w}, {r,g,b,a} 或者 {s,t,p,q} 来取出向量中的元素值。
vec3 v2
v2.x = 3.0f;
v2.xy = vec2(3.0f,4.0f);
v2.xyz = vec3(3,0f,4,0f,5.0f);

```

#### 2.3、修饰符
- const：常量值必须在声明是初始化。它是只读的不可修改的。
- attribute：表示只读的顶点数据，只用在顶点着色器中。数据来自当前的顶点状态或者顶点数组。它必须是全局范围声明的，不能再函数内部。一个attribute可以是浮点数类型的标量，向量，或者矩阵。不可以是数组或则结构体
- uniform：一致变量。在着色器执行期间一致变量的值是不变的。与const常量不同的是，这个值在编译时期是未知的是由着色器外部初始化的。一致变量在顶点着色器和片段着色器之间是共享的。它也只能在全局范围进行声明。
- varying：顶点着色器的输出。例如颜色或者纹理坐标，（插值后的数据）作为片段着色器的只读输入数据。必须是全局范围声明的全局变量。可以是浮点数类型的标量，向量，矩阵。不能是数组或者结构体。
- centorid varying：在没有多重采样的情况下，与varying是一样的意思。在多重采样时，centorid varying在光栅化的图形内部进行求值而不是在片段中心的固定位置求值。
- invariant	(不变量)：用于表示顶点着色器的输出和任何匹配片段着色器的输入，在不同的着色器中计算产生的值必须是一致的。所有的数据流和控制流，写入一个invariant变量的是一致的。编译器为了保证结果是完全一致的，需要放弃那些可能会导致不一致值的潜在的优化。除非必要，不要使用这个修饰符。在多通道渲染中避免z-fighting可能会使用到。
- in：用在函数的参数中，表示这个参数是输入的，在函数中改变这个值，并不会影响对调用的函数产生副作用。（相当于C语言的传值），这个是函数参数默认的修饰符
- out：用在函数的参数中，表示该参数是输出参数，值是会改变的。
- inout：用在函数的参数，表示这个参数即是输入参数也是输出参数。


#### 2.4、内置变量
内置变量可以与固定函数功能进行交互。在使用前不需要声明。  
顶点着色器可用的内置变量有：
- gl_Color	vec4：输入属性-表示顶点的主颜色
- gl_SecondaryColor	vec4：输入属性-表示顶点的辅助颜色
- gl_Normal	vec3：输入属性-表示顶点的法线值
- gl_Vertex	vec4：输入属性-表示物体空间的顶点位置
- gl_MultiTexCoordn	vec4：输入属性-表示顶点的第n个纹理的坐标
- gl_FogCoord	float：输入属性-表示顶点的雾坐标
- gl_Position	vec4：输出属性-变换后的顶点的位置，用于后面的固定的裁剪等操作。所有的顶点着色器都必须写这个值。
- gl_ClipVertex	vec4：输出坐标，用于用户裁剪平面的裁剪
- gl_PointSize	float：点的大小
- gl_FrontColor	vec4：正面的主颜色的varying输出
- gl_BackColor	vec4：背面主颜色的varying输出
- gl_FrontSecondaryColor	vec4：正面的辅助颜色的varying输出
- gl_BackSecondaryColor	vec4：背面的辅助颜色的varying输出
- gl_TexCoord[]	vec4：纹理坐标的数组varying输出
- gl_FogFragCoord	float：雾坐标的varying输出

片段着色器的内置变量有：
- gl_Color	vec4：包含主颜色的插值只读输入
- gl_SecondaryColor	vec4：包含辅助颜色的插值只读输入
- gl_TexCoord[]	vec4：包含纹理坐标数组的插值只读输入
- gl_FogFragCoord	float：包含雾坐标的插值只读输入
- gl_FragCoord	vec4：只读输入，窗口的x,y,z和1/w
- gl_FrontFacing	bool：只读输入，如果是窗口正面图元的一部分，则这个值为true
- gl_PointCoord	vec2：点精灵的二维空间坐标范围在(0.0, 0.0)到(1.0, 1.0)之间，仅用于点图元和点精灵开启的情况下。
- gl_FragData[]	vec4：使用glDrawBuffers输出的数据数组。不能与gl_FragColor结合使用。
- gl_FragColor	vec4：输出的颜色用于随后的像素操作
- gl_FragDepth	float：输出的深度用于随后的像素操作，如果这个值没有被写，则使用固定功能管线的深度值代替


#### 2.5、注意
##### 1）GLSL也有 if else、for、while、do while，使用 continue 跳入下一次循环，break 结束循环，新增discard，它会立即跳出片元着色器，片段也不会写入帧缓冲区。

##### 2）GLSL没有隐式类型转换，即便在多维向量中也没有，需要显示转换

##### 3）GLSL 函数中没有递归

总结：
- 1、顶点着色器针对顶点的位置进行设置，可以通过geometry.addAttribute()添加属性值，传入到顶点着色器中。
- 2、片段着色器是针对顶点着色器输出的顶点数据 (gl_Position)进行逐点绘制的，所以该着色器就是对每个点赋予一个颜色值，片段着色器，会自动接收外界赋予的变量(uniform类型)，所以可以通过设置材料中的uniforms属性进行传值。


参考链接：  
https://www.jianshu.com/p/66b10062bd67  
https://www.jianshu.com/p/43aaff0b6226