title: windwos下搭建openvpn
author: Believe firmly
tags:
  - 实用
  - 网络
categories: []
date: 2019-05-25 12:36:00
---
####  简介

使用vpn你可以享受到的益处：公共互联网创建一个经济，隔离，安全的专用网络
、远程访问内部服务可提高移动员工的工作效率、通过防止对特定网络资源的未授权访问来降低安全风险、加密可确保不受信任的Wi-Fi和其他公共接入网络的隐私将集中式统一威胁管理扩展到远程网络
以下是企业常用vpn对比以及介绍
<table cellspacing="10"><tbody><tr bgcolor="#808080"><td>&nbsp;</td><td><div><strong>PPTP</strong></div></td><td><div><strong>L2TP/IPSEC</strong></div></td><td><div><strong>OpenVPN</strong></div></td></tr><tr><td><strong>简介</strong></td><td>微软推出的第一个VPN协议。占用资源少，应用最为广泛。</td><td>更高级的VPN协议，支持各种平台。安全性更高，但是不太灵活，容易被封锁。</td><td>开源的vpn协议，加密性和适应性都比较好，也比较灵活，不容易被封锁。通过udp端口可以获得较好的速度。</td></tr><tr><td><strong>加密</strong></td><td>支持40位、56位和128位加密</td><td>256位加密</td><td>可自定义160位-256位</td></tr><tr><td><strong>平台支持</strong></td><td><ul><li>Windows</li><li>Mac</li><li>Linux</li><li>iOS</li><li>Android</li><li>DDWRT</li></ul></td><td><ul><li>Windows</li><li>Mac</li><li>Linux</li><li>iOS</li><li>Android</li></ul></td><td><ul><li>Windows（第三方软件）</li><li>Mac（第三方软件）</li><li>Linux</li><li>iOS（第三方软件）</li><li>Android（第三方软件）</li><li>DDWRT</li></ul></td></tr><tr><td><strong>连接速度</strong></td><td>很快</td><td>快</td><td>一般</td></tr><tr><td><strong>端口</strong></td><td>1723 TCP</td><td>500 UDP<br>1701 UDP<br>5500 UDP</td><td>可根据需要自定义和更换</td></tr><tr><td><strong>防封锁</strong></td><td>通过协议和端口很容易被封锁</td><td>通过协议和端口很容易被封锁</td><td>比较难封锁</td></tr></tbody></table>


#### windows下的安装以及配置
官网下载地址：https://openvpn.net/community-downloads/
![](https://s2.ax1x.com/2019/05/25/VkQxUI.md.png)

下载完毕过后找到openvpn安装下的easy-rsa目录所有的初始化都会在这个文件夹里面操作。
1. vars.bat.sample
请依据自身情况改动,也可以不动如下
```
set HOME=C:\Program Files\OPENVPN\easy-rsa
set KEY_COUNTRY=CN                               #(国家)
set KEY_PROVINCE=GuangDong              #(省份)
set KEY_CITY=ShenZhen                             #(城市)
set KEY_ORG=oovc.com                              #(组织)
set KEY_EMAIL=admin@oovc.com            #(邮件地址)

```
<!--more-->
2. 打开cmd，进入到easy-rsa目录下
```
init-config
vars  #下次生成证书只需要执行这一行
clean-all
```

3. 证书制作依次键入命令：build-ca、build-dh、build-key-server server 、build-key client
build-ca的时候输入：
```
Common Name (eg, your name or your server's hostname) [changeme]:OpenVPN-CA	
```

build-key-server server的时候输入：
```
Common Name (eg, your name or your server's hostname) [changeme]:server
```
确认y
```
Sign the certificate? [y/n]:y
out of 1 certificate requests certified, commit? [y/n]y
```
build-key client的时候输入并y
```
Common Name (eg, your name or your server's hostname) [changeme]:client
```
4. 配置server和client并新建server.ovpn文件
复制key目录下的文件到安装目录的config中,此时config文件夹的内容如下：

![](https://s2.ax1x.com/2019/05/25/Vkzk6O.png)

server.ovpn如下：
```bash
port 8080
proto tcp 
dev tun
ca ca.crt
cert server.crt
key server.key # This file should be kept secret
;crl-verify vpncrl.pem
dh dh1024.pem
server 192.168.89.0 255.255.255.0
ifconfig-pool-persist ipp.txt
push "redirect-gateway def1 bypass-dhcp" 
push "dhcp-option DNS 218.85.157.99" 
push "dhcp-option DNS 223.5.5.5" 
push "route 192.168.88.0 255.255.255.0"
client-to-client
;duplicate-cn
keepalive 10 120
tls-auth ta.key 0 # This file is secret
comp-lzo
;max-clients 100
user nobody
group nobody
persist-key
persist-tun
status openvpn-status.log
verb 4
```
5. 修改注册表：

HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters 将IPEnableRouter改为1 ,然后启动客户端

![](http://www.fyluo.com/ueditor/php/upload/image/20180607/1528352314140688.png)

### 客户端的配置

6. 创建客户端配置文件：

把配置文件client.ovpn放到客户端机器的C:\Program Files\OpenVPN\config目录下，并且把服务器C:\Program Files\OpenVPN\easy-rsa\keys目录下的

client01.crt、client01.csr、client01.key、ca.key、ca.crt、ta.key  文件一起复制到

客户端C:\Program Files\OpenVPN\config目录下 （以上文件为服务端生成，客户端需要在服务端拷贝这7个文件过来）

client.ovpn配置文件如下：
```bash
client
dev tun
proto tcp
 
remote 服务端IP 8080
;remote my-server-2 8080
 
;remote-random
 
resolv-retry infinite
nobind
user nobody
group nobody
;route 192.168.0.0 255.255.252.0
persist-key
persist-tun
 
;http-proxy-retry # retry on connection failures
;http-proxy [proxy server] [proxy port #]
 
ca ca.crt
cert client.crt
key client.key
 
ns-cert-type server
tls-auth ta.key 1
comp-lzo
# Set log file verbosity.
verb 4
```