title: BurpSuite实战与插件
author: Believe firmly
tags:
  - web技术
  - 工具
categories: []
date: 2018-11-08 23:15:00
---
### 主要功能

Burp Suite 是用于攻击web 应用程序的集成平台，包含了许多工具。针对软件可以使用fidder修改返回数据包要相对简单些。
注：Burps适合web测试，软件类建议通过proxifier设置全局代理通过fd的代理进行抓包（活用自动返回响应与返回数据重放可以过某些软件限制）
<!--more-->
![](2.png)
 ```
proxy – Burp Suite设置代理，抓取数据包。
Spider – Burp Suite的蜘蛛功能是用来抓取Web应用程序的链接和内容等。
Scanner – 是用来扫描Web应用程序漏洞的，可以发现常见的web安全漏洞，但会存在误报的可能。
Intruder – 可进行Web应用程序模糊测试,进行暴力猜解等。
Repeater – 对数据包进行重放，可分析服务器返回情况，判断修改参数的影响。
Sequencer – 用来检查Web应用程序提供的会话令牌的随机性.并执行各种测试。
Decoder – 对数据进行加解密操作，包含url、html、base64等等。
Comparer – 此功能用来执行任意的两个请求,响应或任何其它形式的数据之间的比较。
extender – 加载Burp Suite的扩展，使用你自己的或第三方代码来扩展Burp Suite的功能。
options – 设置burp，字体，编码等等
alerts – 是用来存放报错信息的，用来解决错误
```
![](1.png)

下载地址: [BurpSuite实战](https://pan.baidu.com/s/1n3Kkgcf-iJjl-kc2jgE3_A)<br> 提取码: 83ra
自己有时间可以给自己的Burpsuite安装实用的插件让它变成万能的武器库！可以看看大佬推荐的插件感觉很多的非常的实用：
[https://www.cnblogs.com/shengulong/p/6830749.html]()

<code class="hljs css"><span class="hljs-selector-tag">HackBar</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">LFI</span> <span class="hljs-selector-tag">scanner</span> <span class="hljs-selector-tag">checks</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">LoggerPlusPlus</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">WooyunSearch-1</span><span class="hljs-selector-class">.0-SNAPSHOT-jar-with-dependencies</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">burp-vulners-scanner-1</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">bypasswaf</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">chunked-coding-converter</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">domain_hunter-v1</span><span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.jar</span>	<span class="hljs-selector-tag">update</span> <span class="hljs-selector-tag">domain_hunter-v1</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">http-request-smuggler-all</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">httpsmuggler</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">knife-1</span><span class="hljs-selector-class">.6</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">passive-scan-client-0</span><span class="hljs-selector-class">.1-jar-with-dependencies</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">reCAPTCHA-v0</span><span class="hljs-selector-class">.9</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">sqlmap</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">sqlmap4burp</span>++<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.jar</span>
<span class="hljs-selector-tag">jsEncrypter-0</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.jar</span></code>


#### fuzz测试的同时需要一个强大的字典
![](https://i.niupic.com/images/2020/01/02/6d3S.jpg)
https://github.com/TheKingOfDuck/fuzzDicts


#### 验证码爆破插件：
![](https://github.com/bit4woo/reCAPTCHA/raw/master/doc/screenshot.png)
https://github.com/bit4woo/reCAPTCA
#### 验证码杀手
通过调用api识别验证码
![](https://github.com/c0ny1/captcha-killer/raw/master/doc/captcha-killer.png)
https://github.com/c0ny1/captcha-killer
#### HackBar多功能插件:
HackBar是一个Burpsuite插件，支持SQL注入、XSS、WEB SHELL、反弹SHELL等功能。
![](https://www.uedbox.com/wp-content/uploads/2019/07/HackBar.gif)
https://github.com/d3vilbug/HackBar/
#### sqlmap4burp++注入神器调用插件：
![](https://www.uedbox.com/wp-content/uploads/2019/09/sqlmap4burpui.png)
 https://github.com/c0ny1/sqlmap4burp-plus-plus
#### 伪造IP地址插件（避免被ban和针对WAF的策略绕过。）：  
![](https://github.com/TheKingOfDuck/BurpFakeIP/raw/master/images/15597193222287.png)
https://github.com/TheKingOfDuck/burpFakeIP

同类型插件随机用户代理：
https://github.com/m4ll0k/BurpSuite-Random_UserAgent
####  快速探测越权Authz 
![](https://vulkey.oss-cn-hangzhou.aliyuncs.com/2019-06-27/15596409209407.jpg)
Github地址：https://github.com/portswigger/authz

#### 可以把burp的请求包变成python
copy As-python requests
通过windows定时脚本放入python文件就可以了，postman的定时任务也可以达到这种需求
#### 分块编码转换器
![](https://github.com/c0ny1/chunked-coding-converter/raw/master/doc/config.png)
#### 笔者的插件包如下不做过多介绍有需要百度
![](https://i.niupic.com/images/2020/01/06/6eiY.jpg)
#### BurpSuite2.0bate带汉化包与破解文件
![](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3110800220,4072195193&fm=173&app=49&f=JPEG?w=640&h=358&s=E40A5D3A0F3B44090675A4DA0000C0B3)

```bash
下载链接: https://pan.baidu.com/s/1bZtyA3ywc-TgeeswgybCsQ 提取码: l84n

```
##### Linux Mac 下加载 burp-loader-keygen.jar

java -javaagent:BurpSuiteCn.jar -Xbootclasspath/p:burp-loader-keygen.jar -Xmx1024m -jar burpsuite_pro_v1.x.x.jar

##### Windwos 下加载 burp-loader-keygen.jar

需要指定编码否则会乱码！！！

java -Dfile.encoding=utf-8 -javaagent:BurpSuiteCn.jar -Xbootclasspath/p:burp-loader-keygen.jar -Xmx1024m -jar burpsuite_pro_v2.0bate.jar