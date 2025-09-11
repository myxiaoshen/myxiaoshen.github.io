title: '网络抓包工具 wireshark  '
author: Believe firmly
tags:
  - web技术
  - ''
categories: []
date: 2018-11-08 22:56:00
---
### Wireshark 窗口介绍

WireShark 主要分为这几个界面
![](1.png)
1. Display Filter(显示过滤器)，  用于过滤
<!-- more -->
2. Packet List Pane(封包列表)， 显示捕获到的封包， 有源地址和目标地址，端口号。 颜色不同，代表
3. Packet Details Pane(封包详细信息), 显示封包中的字段
4. Dissector Pane(16进制数据)
5. Miscellanous(地址栏，杂项)

### Wireshark 显示过滤
先看一下网络层的协议图：

![](https://img-blog.csdn.net/20140822202956027?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvY3Vpd2VpdGp1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

过滤器有两种:

  一种是显示过滤器，就是主界面上那个，用来在捕获的记录中找到所需要的记录

  一种是捕获过滤器，用来过滤捕获的封包，以免捕获太多的记录。 在Capture -> Capture Filters 中设置
  ![](2.png)
  ![](5.png) 这些是常用的选项可以快速的建立筛选条件
``` 
1. 协议过滤

比如TCP，只显示TCP协议。

2. IP 过滤

比如 ip.src ==192.168.1.102 显示源地址为192.168.1.102，

ip.dst==192.168.1.102, 目标地址为192.168.1.102

3. 端口过滤

tcp.port ==80,  端口为80的

tcp.srcport == 80,  只显示TCP协议的愿端口为80的。

4. Http模式过滤

http.request.method=="GET",   只显示HTTP GET方法的。

http.request 	(显示所有HTTP请求数据包)

http.response  (显示所有HTTP响应数据包))

5. 逻辑运算符为 AND/ OR

常用的过滤表达式
```
http请求方法;
```
1.OPTION：HTTP客户端可使用该方法让web服务器告知其所支持的功能
2.GET：HTTP客户端可使用该方法请求web服务器发送某个资源
3.HEAD：与GET方法类似。HTTP客户端可在不获取实际资源的情况下，让web服务器发送资源的概况信息
4.POST：HTTP客户端可利用该方法向web服务器传送数据
5.DELETE：借助于该方法，HTTP客户端可请求web服务器删除由URL指定的资源
6.PUT：HTTP客户端利用该方法向web服务器写入数据。一般要通过用户名和密码认证
7.TRACE：当HTTP客户端发起HTTP请求时，HTTP请求报文可能会穿越防火墙。代理服务器或网关等设备，这些设备
	可能会修改原始的HTTP请求数据包中的内容，借助TRACE方法，HTTP客户端就能让web服务器弹回一条
	TRACE响应报文，其中会携带后者实际收到的HTTP请求报文。HTTP客户端可借此了解原始HTTP请求报文是否被损坏或修改过
8.CONNECT：用来连接代理设备
```
### 封包列表(Packet List Pane)
封包列表的面板中显示，编号，时间戳，源地址，目标地址，协议，长度，以及封包信息。 你可以看到不同的协议用了不同的颜色显示。
![](3.png)
###  对应的OSI七层模型与封包详细信息 
![](4.png)
```
这个面板是我们最重要的，用来查看协议中的每一个字段。

各行信息分别为

Frame:   物理层的数据帧概况

Ethernet II: 数据链路层以太网帧头部信息

Internet Protocol Version 4: 互联网层IP包头部信息

Transmission Control Protocol:  传输层T的数据段头部信息，此处是TCP

Hypertext Transfer Protocol:  应用层的信息，此处是HTTP协议
```