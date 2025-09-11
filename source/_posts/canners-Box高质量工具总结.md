title: Scanners-Box高质量工具总结
author: Believe firmly
tags:
  - 工具
categories: []
date: 2018-12-05 11:12:00
---
![](https://github.com/We5ter/Scanners-Box/raw/master/logo.png)
原github地址：https://github.com/We5ter/Scanners-Box/blob/master/README_CN.md
#### 简介

Scanners Box也被称为 scanbox，是一个强大完备的黑客工具箱，它收集了Github上数10种类别的开源扫描器，包括子域名，数据库，中间件和其他模块化设计的扫描器等，但对于一些被大众所熟知的知名扫描工具，如nmap、w3af、brakeman、arachni、nikto、metasploit、aircrack-ng将不包括在本项目的收集范围内。
<!--more-->

1.中间件漏洞评估或信息泄露扫描
```
https://github.com/boy-hack/w9scan - 内置1200+插件的web漏洞扫描框架
https://github.com/H4ckForJob/dirmap - 一个高级web目录扫描工具，功能将会强于DirBuster、Dirsearch、cansina、御剑
https://github.com/EnableSecurity/wafw00f - WAF产品指纹识别
https://github.com/Ekultek/WhatWaf - WAF指纹识别及自动化bypass工具
https://github.com/urbanadventurer/whatweb - Web指纹识别
https://github.com/3xp10it/bypass_waf - waf自动暴破绕过
https://github.com/boy-hack/w8fuckcdn - 尝试找出cdn背后的真实ip
https://github.com/xmendez/wfuzz - Web应用fuzz工具、框架，同时可用于web路径、服务扫描
https://github.com/s0md3v/Breacher - 多线程的后台路径扫描器，也可用于发现Execution After Redirect漏洞
https://github.com/s0md3v/Photon - 可以提取网址，电子邮件，文件，网站帐户等的高速爬虫
```
2.子域名收集
```

https://github.com/Ice3man543/subfinder - 继承于Sublist3r项目的模块化体系结构，一个强劲的子域名枚举工具
```
3.sql注入与脱裤
```
https://github.com/m8r0wn/enumdb - MySQL以及MSSQL爆破脱裤工具

```
4.弱口令爆破
```
https://github.com/s0md3v/Blazy - 支持测试 CSRF, Clickjacking, Cloudflare 和 WAF识别的弱口令探测器
```

5.物联网设备爆破与漏洞评估
```
https://github.com/viraintel/OWASP-Nettacker - 自动化信息搜集及渗透测试工具，比较适用于IoT扫描

https://github.com/threat9/routersploit - 嵌入式设备漏洞扫描及利用工具
```

6.多类型跨站脚本漏洞检测
```
https://github.com/s0md3v/XSStrike - 可识别并绕过WAF的XSS扫描工具
https://github.com/stamparm/DSXS - 支持GET、POST方式的高效XSS扫描器
```

7.企业资产管理或数据保护
```
https://github.com/ysrc/xunfeng - 网络资产识别引擎，漏洞检测引擎
https://github.com/0xbug/Hawkeye - 企业资产、敏感信息GitHub泄露监控系统
```

8.恶意脚本或木马检测
```
https://github.com/nbs-system/php-malware-finder - 一款高效率PHP-webshell扫描工具
https://github.com/droidefense/engine - 高级安卓木马病毒分析框架
```

9.内网渗透
```
https://github.com/BlackHole1/WebRtcXSS - 自动化利用XSS入侵内网
```

10.钓鱼测试
```
https://gitee.com/lauix/HFish
```
11.特殊组件或漏洞类型扫描
```
https://github.com/Tuhinshubhra/CMSeeK - CMS漏洞检测和利用套件
https://github.com/code-scan/dzscan - 首款集成化的Discuz扫描工具
https://github.com/Lucifer1993/struts-scan - struts2漏洞全版本检测和利用工具
https://github.com/0xHJK/dumpall - .git / .svn / .DS_Store等信息泄露集成利用工具
https://github.com/rastating/wordpress-exploit-framework - 集成化wordpress漏洞利用框架
https://github.com/hahwul/a2sv - SSL漏洞扫描，例如心脏滴血漏洞等
https://github.com/m4ll0k/WPSeku - 一款精简的Wordpress扫描工具
https://github.com/almandin/fuxploider - 文件上传漏洞扫描器及利用工具
https://github.com/rezasp/vbscan - 论坛框架vBulletin黑盒漏洞扫描器
https://github.com/vulmon/Vulmap - Linux以及Windows服务器本地漏洞扫描
https://github.com/knownsec/Pocsuite - 开源漏洞检测框架
```
12.无线网络漏洞评估
```
https://github.com/P0cL4bs/WiFi-Pumpkin - 无线安全渗透测试套件

```