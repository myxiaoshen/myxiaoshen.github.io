title: winodws恶意软件初步分析
author: Believe firmly
tags:
  - 笔记
  - 分析
categories: []
date: 2020-03-13 10:17:00
---
目前的互联网的兴起网上出现了许多各式各样的软件，当然加了"料"的软件也存在其中。加料的软件常常存在与破解软件、钓鱼软件、这些恶意行为的软件可能会上传用户数据、获取系统shell、如何判断他们呢。ps：直接虚拟机调试也行。

##### 杀毒软件
初步的过滤建议还是装一个小白360，个人电脑的用火绒+eset（主核心模块用火绒eset做基线保护）。
![](https://i.niupic.com/images/2020/03/12/70pw.png)
![](https://ftp.bmp.ovh/imgs/2021/07/b401a6233b4261dc.png)
这里有强安全需求的小伙伴可以通过火绒开启联网控制进一步控制电脑的出站流量，记得系统的签名也不要放过达到入站网络零信任环境。系统防护类的选项同理。
![](https://ftp.bmp.ovh/imgs/2021/07/347bd25220f4abd3.png)
##### 在线分析网站
先吧HASH/MD5/SHA1丢平台分析，通过大数据先过滤一遍。有依赖组件的可以打包成单独的可执行文件，上传到某在线网站分析查看结果：推荐360，魔盾，微步云沙箱，Hybrid analysis
![](https://i.niupic.com/images/2020/03/13/719g.png)
<!--more-->

![](https://ftp.bmp.ovh/imgs/2021/06/fffd82177ccc2ced.png)
##### 带进程监控的沙箱软件进行初步分析
可以使用 sandboxie与BSA进行联动分析软件可参考[链接](https://blog.csdn.net/AC1145/article/details/103380567)，简单的小程序可以丢[File_Analysis](https://www.52pojie.cn/thread-580845-1-1.html)这个小工具里面跑跑
![](https://i.niupic.com/images/2020/03/13/719d.png)
![](https://attach.52pojie.cn/forum/201707/09/212028if5nv2132unwm1lp.png)
ProcessHacker可以监控文件的同时直接右键可以程序一键上传到病毒分析网站内置3条接口很方便。
![](https://files.catbox.moe/rlv5va.jpg)


##### 驱动监控与加载（win新版本可以用PowerTool64或者PYArk）
OpenArk64
![](https://pic.rmb.bdstatic.com/bjh/de8a3f7b3f49e67fbd80bb43f54adc68.png)
PowerTool64-PYArk同类型有PCHunter64和YDArk
![](https://pic.rmb.bdstatic.com/bjh/cfefa1f7cebb2b54d609d934f9f82fda.png)


##### 监控文件与网络
监控电脑中所有软件的读写操作，控制软件的恶意删除读取行为当然火绒剑也可以做到。也可以使用：FileActivityWatch或Process Monitor
![](http://www.nirsoft.net/utils/fileactivitywatch.png)

![](https://files.catbox.moe/c3u0vv.jpg)

![](https://files.catbox.moe/j2vhgw.png)

专注网络推荐Netlimiter 4可以看到tcp/udp/ip下级的流量走向并可以进行控制(P2P,LISTENING隧道后ip)，单纯排查可以直接使用windows资源管理器自带的流量管理
![](https://files.catbox.moe/ls43xp.png)

##### 查看文件pe头信息

可以通过像`StudyPE+ x86`这类PE结构分析软件来查看文件的编译时间以及加载信息，如下图我们通过查看PE头中的文件时间戳，并且计算出时间即可得到文件的编译时间。

![](https://files.catbox.moe/opjh8d.jpg)

##### dll分析与简单hook
API Monitor分析电脑中各种dll的调用，也可以通过pe软件查看动态库
 ![](http://www.rohitab.com/gallery/api-monitor-2-0/summary.png)

![](https://files.catbox.moe/777482.jpg)

在X64DBG中加载Rundll32.exe，然后在文件-更改命令行中加载要调用的DLL和导出函数.在选项-首选项中将DLL入口断点勾上,然后反复F9断在你要加载的DLL上面，中途可以通过cheatengine查看内存Ultimap配合x64dbg分析程序反复调试找到hook点下断点分析程序恶意功能。ps:火绒剑内置了汇编代码预览可以简单的进行分析。
![](https://pic.rmb.bdstatic.com/bjh/569ee5970e5e6a2717695b5b2a06c772.png)
![](https://files.catbox.moe/gj9wrv.png)
还有一种直接反编译dll的方法直接使用dnspy
![](https://i.loli.net/2021/09/03/Fx6HDmXtgGPzJvw.gif)

##### 静态文件脱壳分析

新手ida就F5大法和函数中ctrl+F就行，x64dbg就通过关键字F8 F7单步调试，并结合插件帮助自己的完成初步分析。这里对ida与x64dbg不多累赘需要一定的专业基础(汇编基础与编程思想），简单分析字符串可以使用Restorator 可以看到一些未加密的信息（需要先查壳和入口信息）和恶意释放的子程序如bat ，bin，dll文件。简单脱壳工具：XVolkolak

![](https://files.catbox.moe/wqa9rl.png)



##### 进程监控软件
恶意行为ip可以拉入黑名单禁止它出入站，并配合ip情报网站查询。
![](https://files.catbox.moe/qeykt9.jpg)
网络的数据包连接数据包状态码如下：

<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td>CLOSED</td>			<td>没有使用这个套接字[netstat 无法显示closed状态]</td>		</tr><tr><td>LISTEN</td>			<td>套接字正在监听连接[调用listen后]</td>		</tr><tr><td>SYN_SENT</td>			<td>套接字正在试图主动建立连接[发送SYN后还没有收到ACK]</td>		</tr><tr><td>SYN_RECEIVED</td>			<td>正在处于连接的初始同步状态[收到对方的SYN，但还没收到自己发过去的SYN的ACK]</td>		</tr><tr><td>ESTABLISHED</td>			<td>连接已建立</td>		</tr><tr><td>CLOSE_WAIT</td>			<td>远程套接字已经关闭：正在等待关闭这个套接字[被动关闭的一方收到FIN]</td>		</tr><tr><td>FIN_WAIT_1</td>			<td>套接字已关闭，正在关闭连接[发送FIN，没有收到ACK也没有收到FIN]</td>		</tr><tr><td>CLOSING</td>			<td>套接字已关闭，远程套接字正在关闭，暂时挂起关闭确认[在FIN_WAIT_1状态下收到被动方的FIN]</td>		</tr><tr><td>LAST_ACK</td>			<td>远程套接字已关闭，正在等待本地套接字的关闭确认[被动方在CLOSE_WAIT状态下发送FIN]</td>		</tr><tr><td>FIN_WAIT_2</td>			<td>套接字已关闭，正在等待远程套接字关闭[在FIN_WAIT_1状态下收到发过去FIN对应的ACK]</td>		</tr><tr><td>TIME_WAIT</td>			<td>这个套接字已经关闭，正在等待远程套接字的关闭传送[FIN、ACK、FIN、ACK都完毕，这是主动方的最后一个状态，在过了2MSL时间后变为CLOSED状态]</td>		</tr></tbody></table>
进程分析：1.观察进程产生的子进程以及衍生的文件是否存在恶意行为。2.未知的签名文件重点查看其功能。3.查看任务组可以发现对那些文件进行了关联。4.线程可以观看调用了那些底层应用以及开始时间。（一般对电脑系统造成不稳定影响都会被杀软拦截）
![](https://i.niupic.com/images/2020/03/12/70lS.png)

##### Wireshark
直接再网络层进行抓包监控可以通过Wireshark过滤抓包判断数据包是否存在恶意行为,当然全局代理抓包（fd、burp）一样能够获取但是有些软件是socks5以及隧道流量所以还是只能用Wireshark喔，而且直接再（查看tcp流与3次tcp连接的数据包）,通常恶意数据包里面会带exe或者sh远程文件下载，或者执行某些poc。下面是一些常用的过滤规则：

```shell
host 192.168.23.1 抓取主机地址为192.168.23.1的数据包

src host 192.168.23.1 抓取源地址为192.168.23.1的数据包

dst host 192.168.23.1 抓目标地址为192.168.23.1的数据包


src host 192.168.23.1 && dst port 80 抓取源地址为192.168.23.1且目标端口为80的数据包

host 192.168.23.1 || host 192.168.23.2 抓取主机地址为192.168.23.1或者192.168.23.2的数据包

port 80 抓取端口为80的数据包

src port 80 抓取源端口为80的数据包

dst port 80 抓取目标端口为80的数据包

data contains "aaa" 搜索data数据包中包含关键词aaa的部分的内容

tcp.port==80 显示TCP协议端口为80的数据包

tcpsrc.port==80 显示TCP协议源端口为80的数据包

tcpdst.port==80 显示TCP协议目标端口为80的数据包
```



也可以使用在线流量包分析工具[packetTotal](https://packettotal.com/)遇到某些标准头数据包损坏的情况下可以使用[pacpfix](http://f00l.de/hacking/pcapfix.php)修复试试能否还原完整数据包。