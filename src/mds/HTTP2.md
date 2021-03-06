# HTTP2
## 1. HTTP1.x存在的性能问题

### 1> 需要开启多个连接来实现并发和减少潜在影响<br/>
如果想并发多个请求，必须使用多个TCP链接，且浏览器为了控制资源，限制最多只能同时创建 6~8个TCP连接(不同浏览器不同)
![image](https://sanchunpeng.github.io/HTTP2/image/yumingxianzhi.jpeg)
红色圈出来的请求就因域名链接数已超过限制，而被挂起等待了一段时间。<br/>
针对这个问题的一些解决办法是：减少请求数，合并请求、域名分片(将资源放在不同域名下)、图片精灵等。<br/>
但是每个 TCP 连接本身需要经过 DNS 查询、三步握手、慢启动等，还占用额外的 CPU 和内存，对于服务器来说过多连接也容易造成网络拥挤、交通阻塞。

### 2> 头部没有压缩,造成不必要的网络拥塞<br/>
而且每次请求Header不会变化太多。

### 3> 没有应用资源优先级，线头阻塞
每个 TCP 连接同时只能处理一个请求-响应，浏览器按FIFO原则处理请求，如果上一个响应没返回，后续请求-响应都会受阻。<br/>
解决办法是管线化-pipelining 技术，但是管线化也存在诸多问题，比如第一个响应慢还是会阻塞后续响应、服务器为了按序返回响应，需要缓存多个响应占用更多资源、浏览器中途断连重试服务器可能得重新处理多个请求、还有必须客户端-代理-服务器都支持管线化。

### 4> 明文传输不安全

## 2. HTTP2的优势

### 1). 二进制分帧层(Binary Framing Layer)
帧是数据传输的最小单位，以二进制传输代替原本的明文传输，原本的报文消息被划分为更小的数据帧
![image](https://sanchunpeng.github.io/HTTP2/image/http2-frame.png)
这里对比一下http1.1和HTTP2的报文(PS：这里要用https请求，因为当前HTTP/2网站都使用了HTTPS，数据传输都经过了 SSL 加密)

##### http header
![image](https://sanchunpeng.github.io/HTTP2/image/http_header.jpg)

##### http2 header
![image](https://sanchunpeng.github.io/HTTP2/image/http2_header.jpg)

http2如图所示，会多一些首部信息，报文是重组解析过后的，而且所有头字段均小写

##### 使用chrome://net-internals/#http2进入浏览器管理界面
![image](https://sanchunpeng.github.io/HTTP2/image/liulanqi.jpg)

会列出浏览器当前所有活跃的HTTP/2 Session，点击具体的 Session ID，可以看到全部帧信息。

但Chrome的工具看到的信息毕竟经过了解析和筛选，不如原始信息全面，也没办法在其他浏览器中使用。可以使用Wireshark。

#### 帧的结构
所有帧都是一个固定的9字节头部 (payload之前) 跟一个指定长度的负载(payload):

```
    +-----------------------------------------------+
    |                 Length (24)                   |
    +---------------+---------------+---------------+
    |   Type (8)    |   Flags (8)   |
    +-+-------------+---------------+-------------------------------+
    |R|                 Stream Identifier (31)                      |
    +=+=============================================================+
    |                   Frame Payload (0...)                      ...
    +---------------------------------------------------------------+
```
<br/>
===》 Length：代表整个 frame 的长度，用一个 24 位无符号整数表示。除非接收者在 SETTINGS_MAX_FRAME_SIZE 设置了更大的值 (大小可以是 2^14(16384) 字节到 2^24-1(16777215) 字节之间的任意值)，否则数据长度不应超过 2^14(16384) 字节。头部的 9 字节不算在这个长度里
<br/>
===》 Type：定义 frame 的类型，用 8 bits 表示。帧类型决定了帧主体的格式和语义，如果 type 为 unknown 应该忽略或抛弃。
<br/>
===》 Flags：是为帧类型相关而预留的布尔标识。标识对于不同的帧类型赋予了不同的语义。如果该标识对于某种帧类型没有定义语义，则它必须被忽略且发送的时候应该赋值为 (0x0)
<br/>
===》 R：是一个保留的比特位。这个比特的语义没有定义，发送时它必须被设置为 (0x0), 接收时需要忽略。
<br/>
===》 Stream Identifier： 用作流控制，用 31 位无符号整数表示。客户端建立的 sid 必须为奇数，服务端建立的 sid 必须为偶数，值 (0x0) 保留给与整个连接相关联的帧 (连接控制消息)，而不是单个流
<br/>
===》 Frame Payload： 是主体内容，由帧类型决定

##### 共分为十种类型的帧:

<br/>
===》 HEADERS: 报头帧 (type=0x1)，用来打开一个流或者携带一个首部块片段
<br/>
===》 DATA: 数据帧 (type=0x0)，装填主体信息，可以用一个或多个 DATA 帧来返回一个请求的响应主体
<br/>
===》 PRIORITY: 优先级帧 (type=0x2)，指定发送者建议的流优先级，可以在任何流状态下发送 PRIORITY 帧，包括空闲 (idle) 和关闭 (closed) 的流
<br/>
===》 RST_STREAM: 流终止帧 (type=0x3)，用来请求取消一个流，或者表示发生了一个错误，payload 带有一个 32 位无符号整数的错误码 (Error Codes)，不能在处于空闲 (idle) 状态的流上发送 RST_STREAM 帧
<br/>
===》 SETTINGS: 设置帧 (type=0x4)，设置此 连接 的参数，作用于整个连接
<br/>
===》 PUSH_PROMISE: 推送帧 (type=0x5)，服务端推送，客户端可以返回一个 RST_STREAM 帧来选择拒绝推送的流
<br/>
===》 PING: PING 帧 (type=0x6)，判断一个空闲的连接是否仍然可用，也可以测量最小往返时间 (RTT)
<br/>
===》 GOAWAY: GOWAY 帧 (type=0x7)，用于发起关闭连接的请求，或者警示严重错误。GOAWAY 会停止接收新流，并且关闭连接前会处理完先前建立的流
<br/>
===》 WINDOW_UPDATE: 窗口更新帧 (type=0x8)，用于执行流量控制功能，可以作用在单独某个流上 (指定具体 Stream Identifier) 也可以作用整个连接 (Stream Identifier 为 0x0)，只有 DATA 帧受流量控制影响。初始化流量窗口后，发送多少负载，流量窗口就减少多少，如果流量窗口不足就无法发送，WINDOW_UPDATE 帧可以增加流量窗口大小
<br/>
===》 CONTINUATION: 延续帧 (type=0x9)，用于继续传送首部块片段序列


#### DATA 帧格式

```
    +---------------+
    |Pad Length? (8)|
    +---------------+-----------------------------------------------+
    |                            Data (*)                         ...
    +---------------------------------------------------------------+
    |                           Padding (*)                       ...
    +---------------------------------------------------------------+
```
<br/>
===》 Pad Length: ? 表示此字段的出现时有条件的，需要设置相应标识 (set flag)，指定 Padding 长度，存在则代表 PADDING flag 被设置
<br/>
===》 Data: 传递的数据，其长度上限等于帧的 payload 长度减去其他出现的字段长度
<br/>
===》 Padding: 填充字节，没有具体语义，发送时必须设为 0，作用是混淆报文长度，与 TLS 中 CBC 块加密类似


##### DATA 帧有如下标识 (flags):

![image](https://sanchunpeng.github.io/HTTP2/image/DATA-Frame1.png)
![image](https://sanchunpeng.github.io/HTTP2/image/DATA-Frame3.png)

<br/>
===》 END_STREAM: bit 0 设为 1 代表当前流的最后一帧
<br/>
===》 PADDED: bit 3 设为 1 代表存在 Padding

#### HEADERS 帧格式

```
     +---------------+
     |Pad Length? (8)|
     +-+-------------+-----------------------------------------------+
     |E|                 Stream Dependency? (31)                     |
     +-+-------------+-----------------------------------------------+
     |  Weight? (8)  |
     +-+-------------+-----------------------------------------------+
     |                   Header Block Fragment (*)                 ...
     +---------------------------------------------------------------+
     |                           Padding (*)                       ...
     +---------------------------------------------------------------+
```
<br/>
===》 Pad Length: 指定 Padding 长度，存在则代表 PADDING flag 被设置
<br/>
===》 E: 一个比特位声明流的依赖性是否是排他的，存在则代表 PRIORITY flag 被设置
<br/>
===》 Stream Dependency: 指定一个 stream identifier，代表当前流所依赖的流的 id，存在则代表 PRIORITY flag 被设置
<br/>
===》 Weight: 一个无符号 8 为整数，代表当前流的优先级权重值 (1~256)，存在则代表 PRIORITY flag 被设置
<br/>
===》 Header Block Fragment: header 块片段
<br/>
===》 Padding: 填充字节，没有具体语义，作用与 DATA 的 Padding 一样，存在则代表 PADDING flag 被设置


##### HEADERS 帧有以下标识 (flags):

![image](https://sanchunpeng.github.io/HTTP2/image/HEADERS-Frame.png)
<br/>
===》 END_STREAM: bit 0 设为 1 代表当前 header 块是发送的最后一块，但是带有 END_STREAM 标识的 HEADERS 帧后面还可以跟 CONTINUATION 帧 (这里可以把 CONTINUATION 看作 HEADERS 的一部分)
<br/>
===》 END_HEADERS: bit 2 设为 1 代表 header 块结束
<br/>
===》 PADDED: bit 3 设为 1 代表 Pad 被设置，存在 Pad Length 和 Padding
<br/>
===》 PRIORITY: bit 5 设为 1 表示存在 Exclusive Flag (E), Stream Dependency, 和 Weight

### 2). 多路复用 (MultiPlexing)

HTTP/1.1是把每个请求都当作一个流，那么多个请求变成多个流，而HTTP/2是将请求响应数据分成多个帧，不同流中的帧交错地发送给对方，每帧的 stream identifier 的标明这一帧属于哪个流，然后在对方接收时，根据 stream identifier 拼接每个流的所有帧组成一整块数据。这就是 HTTP/2 中的多路复用。

<br/>流的概念实现了单连接上多请求 
===》 响应并行，解决了线头阻塞的问题，减少了 TCP 连接数量和 TCP 连接慢启动造成的问题， 确保同一连接上的流不会相互干扰。流量控制作用于单个流或整个连接，所以 http2 对于同一域名只需要创建一个连接，而不是像 http/1.1 那样创建 6~8 个连接。

### 3). 服务端推送 (Server Push)

浏览器发送一个请求，服务器主动向浏览器推送与这个请求相关的资源，这样浏览器就不用发起后续请求。

Server-Push 主要是针对资源内联做出的优化，相较于 http/1.1 资源内联的优势:
<br/>
===》 客户端可以缓存推送的资源
<br/>
===》 客户端可以拒收推送过来的资源
<br/>
===》 推送资源可以由不同页面共享
<br/>
===》 服务器可以按照优先级推送资源

#### PUSH_PROMISE 帧格式


```
 +---------------+
 |Pad Length? (8)|
 +-+-------------+-----------------------------------------------+
 |R|                  Promised Stream ID (31)                    |
 +-+-----------------------------+-------------------------------+
 |                   Header Block Fragment (*)                 ...
 +---------------------------------------------------------------+
 |                           Padding (*)                       ...
 +---------------------------------------------------------------+
```
<br/>
===》 Pad Length: 指定 Padding 长度，存在则代表 PADDING flag 被设置
<br/>
===》 R: 保留的1bit位
<br/>
===》 Promised Stream ID: 31 位的无符号整数，代表 PUSH_PROMISE 帧保留的流，对于发送者来说该流标识符必须是可用于下一个流的有效值
<br/>
===》 Header Block Fragment: 包含请求首部域的首部块片段
<br/>
===》 Padding: 填充字节，没有具体语义，作用与 DATA 的 Padding 一样，存在则代表 PADDING flag 被设置


##### PUSH_PROMISE 帧有以下标识 (flags):
<br/>
===》 END_HEADERS: bit 2 置 1 代表 header 块结束
<br/>
===》 PADDED: bit 3 置 1 代表 Pad 被设置，存在 Pad Length 和 Padding

#### 推送的过程

结合上文关于 Server-Push 的流状态转换

PUSH_PROMISE 帧只能在对端(客户端)发起的且流状态为 open 或者 half-closed (remote) 的流上发送

PUSH_PROMISE 帧准备推送的响应总是和来自于客户端的请求相关联。服务端在该请求所在的流上发送 PUSH_PROMISE 帧。PUSH_PROMISE 帧包含一个 Promised Stream ID，该流标识符是从服务端可用的流标识符里选出来的。

如果服务端收到了一个对文档的请求，该文档包含内嵌的指向多个图片文件的链接，且服务端选择向客户端推送那些额外的图片，那么在发送包含图片链接的 DATA 帧之前发送 PUSH_PROMISE 帧可以确保客户端在发现内嵌的链接之前，能够知道有一个资源将要被推送过来。同样地，如果服务端准备推送被首部块引用的响应 (比如，在 Link 首部字段 里的)，在发送首部块之前发送一个 PUSH_PROMISE 帧，可以确保客户端不再请求那些资源

一旦客户端收到了 PUSH_PROMISE 帧，并选择接收被推送的响应，客户端就不应该为准备推送的响应发起任何请求，直到预示的流被关闭以后。


PS：server-push 需要服务端设置，并不是说浏览器发起请求，与此请求相关的资源服务端就会自动推送


#### Server-Push 潜在的问题
Server-Push 满足条件时便会发起推送，可是客户端已经有缓存了想发送 RST 拒收，而服务器在收到 RST 之前已经推送资源了，虽然这部分推送无效但是肯定会占用带宽

另外服务端可以设置 Cookie 或者 Session 记录访问时间，然后之后的访问判断是否需要 Push；还有就是客户端可以限制 PUSH 流的数目，也可以设置一个很低的流量窗口来限制 PUSH 发送的数据大小

### 4). Header 压缩 (HPACK)

HTTP/2 里的首部字段也是一个键具有一个或多个值。这些首部字段用于 HTTP 请求和响应消息，也用于服务端推送操作。

首部列表 (Header List) 是零个或多个首部字段 (Header Field) 的集合。当通过连接传送时，首部列表通过压缩算法 序列化成首部块 (Header Block)。然后，序列化的首部块又被划分成一个或多个叫做首部块片段 (Header Block Fragment) 的字节序列，并通过 HEADERS、PUSH_PROMISE，或者 CONTINUATION 帧进行有效负载传送。

##### 一个完整的首部块有两种可能
一个 HEADERS 帧或 PUSH_PROMISE 帧加上设置 END_HEADERS flag <br/>
一个未设置 END_HEADERS flag 的 HEADERS 帧或 PUSH_PROMISE 帧，加上多个 CONTINUATION 帧，其中最后一个 CONTINUATION 帧设置 END_HEADERS flag <br/>
PS：必须将首部块作为连续的帧序列传送，不能插入任何其他类型或其他流的帧。尾帧设置 END_HEADERS 标识代表首部块结束，这让首部块在逻辑上等价于一个单独的帧。接收端连接片段重组首部块，然后解压首部块重建首部列表。

使用 HPACK 算法来压缩首部内容
![image](https://sanchunpeng.github.io/HTTP2/image/hpack.png)
可以清楚地看到 HTTP2 头部使用的也是键值对形式的值，而且 HTTP1 当中的请求行以及状态行也被分割成键值对，还有所有键都是小写，不同于 HTTP1。除此之外，还有一个包含静态索引表和动态索引表的索引空间，实际传输时会把头部键值表压缩，使用的算法即 HPACK，其原理就是匹配当前连接存在的索引空间，若某个键值已存在，则用相应的索引代替首部条目，比如 “:method: GET” 可以匹配到静态索引中的 index 2，传输时只需要传输一个包含 2 的字节即可；若索引空间中不存在，则用字符编码传输，字符编码可以选择哈夫曼编码，然后分情况判断是否需要存入动态索引表中


####  索引表
##### 静态索引
静态索引表是固定的，对于客户端服务端都一样，目前协议商定的静态索引包含 61 个键值, 详情参见 [Static Table Definition RFC 7541](https://httpwg.org/specs/rfc7541.html#static.table.definition)
比如前几个如下

索引（index） | 字段值（Header Name） | 键值（Header Value）
---|---|---
1 | :authority | /
2 | :method | GET
3 | :method | POST
4 | :path | /
5 | :path | /index.html
6 | :scheme | http
7 | :scheme | https
8 | :status | 200

##### 动态索引

动态索引表是一个 FIFO 队列维护的有空间限制的表，里面含有非静态表的索引。
动态索引表是需要连接双方维护的，其内容基于连接上下文，一个 HTTP2 连接有且仅有一份动态表。
当一个首部匹配不到索引时，可以选择把它插入动态索引表中，下次同名的值就可能会在表中查到索引并替换。
但是并非所有首部键值都会存入动态索引，因为动态索引表是有空间限制的，最大值由 SETTING 帧中的 SETTINGS_HEADER_TABLE_SIZE (默认 4096 字节) 设置

##### 索引地址空间
由静态索引表和动态索引表可以组成一个索引地址空间:

```
<----------  Index Address Space ---------->
  <-- Static  Table -->  <-- Dynamic Table -->
  +---+-----------+---+  +---+-----------+---+
  | 1 |    ...    | s |  |s+1|    ...    |s+k|
  +---+-----------+---+  +---+-----------+---+
                         ⍋                   |
                         |                   ⍒
                  Insertion Point      Dropping Point
```
目前 s 就是 61，而有新键值要插入动态索引表时，从 index 62 开始插入队列，所以动态索引表中索引从小到大依次存着从新到旧的键值



### 5). 应用层的重置连接
对于 HTTP/1 来说，是通过设置 tcp segment 里的 reset flag 来通知对端关闭连接的。这种方式会直接断开连接，下次再发请求就必须重新建立连接。HTTP/2 引入 RST_STREAM 类型的 frame，可以在不断开连接的前提下取消某个 request 的 stream，表现更好。

### 6). 请求优先级设置
HTTP/2 里的每个 stream 都可以设置依赖 (Dependency) 和权重，可以按依赖树分配优先级，解决了关键请求被阻塞的问题

### 7). 流量控制
每个 http2 流都拥有自己的公示的流量窗口，它可以限制另一端发送数据。对于每个流来说，两端都必须告诉对方自己还有足够的空间来处理新的数据，而在该窗口被扩大前，另一端只被允许发送这么多数据。


### 8). HTTP/1.x 的几种优化可以弃用
合并文件、内联资源、雪碧图、域名分片对于 HTTP/2 来说是不必要的，使用 h2 尽可能将资源细粒化，文件分解地尽可能散，不用担心请求数多


## 3. HTTP/2 的协议协商机制
### 1). 非加密下的协商

客户端使用 HTTP Upgrade 机制请求升级，HTTP2-Settings 首部字段是一个专用于连接的首部字段，它包含管理 HTTP/2 连接的参数(使用 Base64 编码)，其前提是假设服务端会接受升级请求


```
 GET / HTTP/1.1
 Host: server.example.com
 Connection: Upgrade, HTTP2-Settings
 Upgrade: h2c
 HTTP2-Settings: <base64url encoding of HTTP/2 SETTINGS payload>
```

服务器如果支持 http/2 并同意升级，则转换协议，否则忽略


```
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: h2c
```

此时潜在的存在一个流 0x1，客户端上这个流在完成 h1 请求后便转为 half-closed 状态，服务端会用这个流返回响应

### 2). 加密的协商机制
TLS 加密中在 Client-Hello 和 Server-Hello 的过程中通过 ALPN 进行协议协商
![image](https://sanchunpeng.github.io/HTTP2/image/application_layer_protocol_negotiation_1.png)

应用层协议协商在 TLS 握手第一步的扩展中，Client Hello 中客户端指定 ALPN Next Protocol 为 h2 或者 http/1.1 说明客户端支持的协议

![image](https://sanchunpeng.github.io/HTTP2/image/application_layer_protocol_negotiation_2.png)
服务端如果在 Server Hello 中选择 h2 扩展，说明协商协议为 h2，后续请求响应跟着变化；如果服务端未设置 http/2 或者不支持 h2，则继续用 http/1.1 通信

## 4. 实例
[https://http2.akamai.com/demo/](https://http2.akamai.com/demo/)

## 5. 使用 HTTP/2 建议

nginx 开启 HTTP2 只需在相应的 HTTPS 设置后加上 http2 即可

```
listen [::]:443 ssl http2 ipv6only=on;
listen 443 ssl http2;

```

### 1)、开启压缩

配置 gzip 等可以使传输内容更小，传输速度更快

例如 nginx 可以再 http 模块中加入以下字段，其他字段和详细解释可以谷歌

```
    gzip  on; // 开启
    gzip_min_length 1k;
    gzip_comp_level 1; // 压缩级别
    gzip_types text/plain application/javascript application/x-javascript application/octet-stream application/json text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png font/ttf font/otf image/svg+xml; // 需要压缩的文件类型
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
```

### 2)、使用缓存

### 3)、CDN 加速

CDN 的好处是就近访问，延迟低，访问快

### 4)、减少 DNS 查询

每个域名都需要 DNS 查询，一般需要几毫秒到几百毫秒，移动环境下会更慢。DNS 解析完成之前，请求会被阻塞。减少 DNS 查询也是优化项之一

浏览器的 DNS Prefetching 技术也是一种优化手段

### 5)、减少重定向

重定向可能引入新的 DNS 查询、新的 TCP 连接以及新的 HTTP 请求，所以减少重定向也很重要。

浏览器基本都会缓存通过 301 Moved Permanently 指定的跳转，所以对于永久性跳转，可以考虑使用状态码 301。对于启用了 HTTPS 的网站，配置 HSTS 策略，也可以减少从 HTTP 到 HTTPS 的重定向

PS：1-5点是 HTTP/1 和 HTTP/2 都同样适用的

### 6)、域名分片

HTTP/2 对于同一域名使用一个 TCP 连接足矣，过多 TCP 连接浪费资源而且效果不见得一定好

而且资源分域会破坏 HTTP/2 的优先级特性，还会降低头部压缩效果

### 7)、资源合并

资源合并会不利于缓存机制，而且单文件过大对于 HTTP/2 的传输不好，尽量做到细粒化更有利于 HTTP/2 传输

### 8)、资源内联

HTTP/2 支持 Server-Push，相比较内联优势更大效果更好

而且内联的资源不能有效缓存

如果有共用，多页面内联也会造成浪费

PS：6-8不推荐在 HTTP/2 中用

### 9)、HTTP/2 最佳实践

使用 HTTP/2 尽可能用最少的连接，因为同一个连接上产生的请求和响应越多，动态字典积累得越全，头部压缩效果也就越好，而且多路复用效率高，不会像多连接那样造成资源浪费

HTTP/2在同一域名下的资源使用同一个连接，所以最好使用相同的IP和证书部署web服务，这样就可以复用同一个连接
