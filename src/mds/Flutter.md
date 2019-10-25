# Flutter
#### 版本：flutter_macos_v1.7.8+hotfix.4-stable.zip

## 1、环境
- 打开文件：vim .bash_profile 
- 添加：
``` 
    export PATH=[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin
```
[PATH_TO_FLUTTER_GIT_DIRECTORY]是flutter sdk所在的文件夹
PS：这里可以在该文件中加一下国内镜像
```
    export PUB_HOSTED_URL=https://pub.flutter-io.cn
    export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
- 执行：source $HOME/.bash_profile生效
- 验证：flutter

## 2、创建项目

- flutter create myapp
- cd my_app
- open -a Simulator
- flutter run //确保模拟器已经处于运行状态

## 3、vscode编写flutter应用
下载插件：Dart Code、Flutter


## 4、遇到问题

- ### BottomNavigationBar
如果没有设置type属性，当设置BottomNavigationBarItem的个数小于4的时候，没有问题，当大于或等于4个的时候，不但背景颜色设置了没有效果，而且点击了某一项还会晃动，所以一定要指定type值为BottomNavigationBarType.fixed
- ### flutter的主题色
flutter的主题色只能取以下值：
red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, blueGrey。默认是蓝色的。如果要把顶部导航栏和状态栏的修改成其他颜色，比如说白色或者褐色，可以使用primaryColor:Colors.white

