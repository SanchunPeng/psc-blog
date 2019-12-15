# Flutter路由


## 1、基本用法
在Flutter中，使用控件[导航器（Navigator）](https://api.flutter.dev/flutter/widgets/Navigator-class.html)管理路由，通过路由对象Navigator的进push出pop栈来使用户从一个页面跳转到另一个页面。

### 1.1、页面间的跳转
A页面跳转到B，B页面返回A
```
class PageA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('page a'),
      ),
      body: new Center(
        child: new RaisedButton(
          child: new Text('Launch page b'),
          onPressed:  () {
            Navigator.push(
                context,
                new MaterialPageRoute(builder: (context) => new PageB()),
            );
          },
        ),
      ),
    );
  }
}

class PageB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('page b'),
      ),
      body: new Center(
        child: new RaisedButton(
          child: new Text('back!'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
```

### 1.2、页面间传值
A页面跳转到B，并传递id值
```
onPressed:  () {
    Navigator.push(
        context,
        new MaterialPageRoute(builder: (context) => new PageB(id)),
    );
},
```
B页面返回A，并传递id值

```
onPressed: () {
    Navigator.pop(context, id);
}
```

## 2、嵌套路由
一个 App 中可以有多个导航器，将一个导航器嵌套在另一个导航器下面可以创建一个内部的路由。

#### Home页面
添加底部导航栏切换主页和我的页面。

```javascript
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _HomeState();
  }
}

class _HomeState extends State<Home> {
  int _currentIndex = 0;
  final List<Widget> _children = [
    new PlaceholderWidget('主页'),
    new PlaceholderWidget('我的'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _children[_currentIndex],
      bottomNavigationBar: new BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        items: [
          new BottomNavigationBarItem(
            icon: new Icon(Icons.home),
            title: new Text('主页'),
          ),
          new BottomNavigationBarItem(
            icon: new Icon(Icons.person),
            title: new Text('我的'),
          ),
        ],
      ),
    );
  }

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }
}

class PlaceholderWidget extends StatelessWidget {
  final String text;

  PlaceholderWidget(this.text);

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new Text(text),
    );
  }
}
```
然后在Home页面使用Navigator，Navigator中有两个路由页面home和listdetail。home简单显示一个按钮，点击按钮调转listDetail页面。


```javascript
import 'package:flutter/material.dart';

import './navigation.dart';

class HomeNavigator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Navigator(
      initialRoute: 'home',
      onGenerateRoute: (RouteSettings settings) {
        WidgetBuilder builder;
        switch (settings.name) {
          case 'home':
            builder = (BuildContext context) => new HomePage();
            break;
          case 'listDetail':
            builder = (BuildContext context) => new ListDetailPage();
            break;
          default:
            throw new Exception('Invalid route: ${settings.name}');
        }

        return new MaterialPageRoute(builder: builder, settings: settings);
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('主页'),
      ),
      body: new Center(
        child: new RaisedButton(
          child: new Text('列表'),
          onPressed: () {
            Navigator.of(context).pushNamed('listDetail');
          },
        ),
      ),
    );
  }
}
```
