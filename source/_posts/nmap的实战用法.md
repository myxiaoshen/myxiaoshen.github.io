title: nmap的实战用法
author: Believe firmly
tags:
  - 工具
categories: []
date: 2018-11-08 21:57:00
---
先看看几种常用的参数如下：
```bash
-sT	 TCP connect()扫描，这种方式会在目标主机的日志中记录大批连接请求和错误信息。

-sS	 半开扫描，很少有系统能把它记入系统日志。不过，需要Root权限。
-sF  -sN	 秘密FIN数据包扫描、Xmas Tree、Null扫描模式
-sP	 ping扫描，Nmap在扫描端口时，默认都会使用ping扫描，只有主机存活，Nmap才会继续扫描。
-sU	 UDP扫描，但UDP扫描是不可靠的
-sA	 这项高级的扫描方法通常用来穿过防火墙的规则集
-sV	 探测端口服务版本
-Pn	 扫描之前不需要用ping命令，有些防火墙禁止ping命令。可以使用此选项进行扫描
-v	 显示扫描过程，推荐使用

-h	 帮助选项，是最清楚的帮助文档
-p	 指定端口，如“1-65535、1433、135、22、80”等
-O	 启用远程操作系统检测，存在误报
-A	 全面系统检测、启用脚本检测、扫描等
-oN/-oX/-oG	 将报告写入文件，分别是正常、XML、grepable 三种格式
-iL	 读取主机列表，例如，“-iL C:\ip.txt”
-P0 nmap扫描前不Ping目标主机。在扫描之前，不必ping主机。有些网络的防火墙不允许ICMP echo请求穿过，使用这个选项可以对这些网络进行扫描。
 -n/-R  不对 IP 进行域名反向解析/为所有的 IP 都进行域名 的反向解析
 -PS/PA/PU/PY[portlist]  TCP SYN Ping/TCP ACK Ping/UDP Ping 发现 。

 -PE/PP/PM 使用 ICMP echo， timestamp and netmask 请求 包发现主机 。
 -e 指定网卡
 -S 用于伪装源地址进行扫描，需要搭配-e
```
<!--more-->
时序命令

```
-T0  偏执的：非常非常慢，用于IDS逃逸
-T1  猥琐的：相当慢，用于IDS逃逸
-T2  有礼貌的：降低速度以消耗更小的带宽，比默认慢十倍
-T3  普通的：默认，根据目标的反应自动调整时间模式
-T4  野蛮的：假定处在一个很好的网络环境，请求可能会淹没目标
-T5  疯狂的：非常野蛮，很可能会淹没目标端口或是漏掉一些开放端口

```
nmap批量扫描并导3出到csv文件，也可以单ip测试
```bash
nmap -P0 -T2 -sO -iL target.txt -p 1-65535 -oN result.csv
nmap -T4 -P0  -p 1-65535 -oN result.csv 127.0.0.1

```
nmap脚本在实战中也有很大的帮助在扫描时可根据需要设置--script=类别这种方式进行比较笼统的扫描：

```bash
-sC  根据端口识别的服务，调用默认脚本
auth: 负责处理鉴权证书（绕开鉴权）的脚本

broadcast: 在局域网内探查更多服务开启状况，如dhcp/dns/sqlserver等服务

brute: 提供暴力破解方式，针对常见的应用如http/snmp等

default: 使用-sC或-A选项扫描时候默认的脚本，提供基本脚本扫描能力

discovery: 对网络进行更多的信息，如SMB枚举、SNMP查询等

dos: 用于进行拒绝服务攻击

exploit: 利用已知的漏洞入侵系统

external: 利用第三方的数据库或资源，例如进行whois解析

fuzzer: 模糊测试的脚本，发送异常的包到目标机，探测出潜在漏洞 intrusive: 入侵性的脚本，此类脚本可能引发对方的IDS/IPS的记录或屏蔽

malware: 探测目标机是否感染了病毒、开启了后门等信息

safe: 此类与intrusive相反，属于安全性脚本

version: 负责增强服务与版本扫描（Version Detection）功能的脚本

vuln: 负责检查目标机是否有常见的漏洞（Vulnerability），如是否有MS08_067

```


     全面扫描：nmap-T4 -A targetip  
 
    主机发现：nmap-T4 -sn targetip  
 
    端口扫描：nmap-T4 targetip  
 
    服务扫描：nmap-T4 -sV targetip  
 
    操作系统扫描：nmap-T4 -O targetip
    
  使用Decoy（诱骗）方式来掩盖真实的扫描地址，例如-D ip1,ip2,ip3,ip4,ME，这样就会产生多个虚假的ip同时对目标机进行探测，其中ME代表本机的真实地址，这样对方的防火墙不容易识别出是扫描者的身份。

     nmap -T4 -F -n -Pn -D192.168.1.100,192.168.1.101,192.168.1.102,ME 192.168.1.1
使用-S伪装自己源地址扫描需要使用-e指定网卡和-Pn参数才能伪装如下：
	  nmap -e eth0 10.10.10.164 -S 10.10.10.163 -Pn