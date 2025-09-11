title: Linux运维笔记
author: Believe firmly
tags:

  - 笔记
  - linux
categories: []
date: 2021-03-21 09:28:00
---
个人认为学习最快的方式是看文字版，而不是看视频， 看视频一是非常慢，二是很低效，所以我也喜欢经量用文字的方式表达，还有就是想说一下自我认为在去解决一个任务的时候可以先寻找一下带图形化的配置方案，可能现在有些技术觉得图形化很low而且占资源，但可以极大的避免误操作与减少工作时间(当然如果是批量的实施的情况下还是静默的方式方便，但通常也是有GUI的面板统一的去管理)。

俺做过一段时间的运维，服务器一般接触的是centos7，这里记录一下工作的小技巧以及一些资料收集。(centos不维护了可以转到rocky linux或者红帽)
### Linux环境坑
介绍一下简单的配置查看：
```bash
lscpu 列cpu
lsof  列文件
lsblk 列磁盘
lsusb 列usb设备
lspci 列总线
cat /proc/cpuinfo | grep "cpu"  //查看cpu核心
free -h //查内存
df -Th //查存储
tar czvf xxx.tar //压缩目录
tar zxvf xxx.tar //解压缩
zip -r xxx.zip //压缩目录
unzip -o xxx.zip -d /tmp/ //解压缩d路径
dmidecode -s system-product-name //查看是否是虚拟机
uname -a //处理器位数
cat /etc/os-release  //获取系统信息
cat /etc/redhat-release  //查看系统内核版本
w //查看登录用户
dmesg //查启动模块通常用来排查驱动与内核是否加载
#时区配置: /etc/chrony.conf
#增加国内的 ntp 服务器，或是指定其他常用的时间服务器pool cn.pool.ntp.org iburst
timedatectl set-timezone Asia/Shanghai
yum install chrony 
timedatectl status
systemctl enable chronyd --now
##vim粘贴问题，编辑 ~/.vimrc 文件，加入如下代码： if has('mouse') set mouse-=a endif
:set mouse-=a
###x11远程桌面
sudo yum install xorg-x11-apps xorg-x11-xauth xorg-x11-fonts-* xorg-x11-font-utils xorg-x11-fonts-Type1 xclock ##依赖
sudo vim /etc/ssh/sshd_config 
##AllowTcpForwarding=yes 
##X11Forwarding=yes
##X11UseLocalhost=yes
##X11DisplayOffset=10
#改配置文件启用X11，最后重启ssh，xclock测试
service sshd restart | systeamcal sshd restart
xclock
##root下连不上
sudo cp ~/.Xauthority /root
##定时任务运行crontab -e命令编辑cron文件，添加每10分钟执行一次并写入log文件
*/10 * * * * /root/network.sh >> /home/wwwlogs/oult.log 
##java程序后台如果 不想产生日志可以用>/dev/null  
nohup java -jar jar包名  >output 2>&1 &
##web官方图形化组件
##cockpit-storaged cockpit-docker cockpit-machines libvirt   对应存储docker与kvm，libvirt需要开服务
yum install -y cockpit cockpit-storaged
systemctl enable --now  cockpit.socket
```
mysql外部访问
```sql
mysql -h 127.0.0.1 -u root -p    //登录mysql
use mysql;
update user set host = '%' where user = 'root
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;
```

vnc图形化

```bash
##先安装图形化桌面环境
yum -y groupinstall "X Window System"
yum groupinstall "Xfce" #apt install xfce4 xfce4-goodies
yum install tigervnc-server #apt:tigervnc-standalone-server
#vnc中文显示~/.vnc/xstartup
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh
export LC_ALL=zh_CN.UTF-8
chmod +x ~/.vnc/xstartup
```

网络策略相关：

```bash
lsof -i:3128 ##查看3128端口
ethtool <-S闪烁> <-s eth0 speed 1000 降级千兆>##查看网卡状态最后yes为启用用于判断服务器插入的网线接口与控制
sysctl -w net.ipv4.ip_forward=1  #开启ip转发
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config  #关闭selinux
systemctl stop firewalld.service  #防火墙关闭
systemctl disable  firewalld.service #防火墙自启关闭
service iptables save #防火墙永久生效
# 修改/etc/sysctl.conf禁用某一个指定接口的IPv6(例如：eth0, lo)
net.ipv6.conf.lo.disable_ipv6 = 1
net.ipv6.conf.eth0.disable_ipv6 = 1
echo 1 > /proc/sys/net/ipv6/conf/all/disable_ipv6
echo 1 > /proc/sys/net/ipv6/conf/default/disable_ipv6
##连接无线网卡
iw dev  #查网卡
ifconfig wlan0 up #激活或者用ip link set wlan0 up 
iw wlan0 link #
iw wlan0 scan | grep SSID #扫描
iwconfig wlan0 essid  key  ##连接wifi或wpa_supplicant -B -i wlan0 -c <(wpa_passphrase "ssid""psk") 
dhclient wlan0 #开启网卡dhcp服务
##防火墙配置
firewall-cmd --zone=public --add-port=3306/tcp --add-port=6379/tcp --permanent   # 添加放行指定单个端口
firewall-cmd --reload       # 生效添加的要放行的端口
firewall-cmd --list-ports   # 查看所有被放行的端口
firewall-cmd --zone=public --remove-port=8081/tcp --permanent   # 取消指定一开放端口
```

网络配置方面：
```bash
/etc/sysconfig/network  #主机名配置文件或hostnamectl set-hostname “主机名”
ifconfig eth0  down   #down关闭 up启动 ip route与route -n查网关
service network restart#重启网络ifconfig xx down-up开停网卡
/etc/resolv.conf  #dns目录
/etc/hosts #hosts目录
hostnamectl set-hostname 新主机名#改主机名称
#操作网络服务
systemctl stop NetworkManager
service networking restart
systemctl restart network
route add –net 192.168.0.0/24 gw 172.16.7.3  #添加一条路由delete删除
```

代理设置：

```bash
vim /etc/profile   #设置代理
export http_proxy='http://192.168.18.11:7891'    
export https_proxy='http://192.168.18.11:7891'    
export http_proxy
export https_proxy 
source /etc/profile
```

linux使用全局代理编辑/etc/environment

```bash
export http_proxy="http://192.168.0.32:1080/"
export https_proxy="http://192.168.0.32:1080/"
```



普通网卡配置修改/etc/sysconfig/network-scripts/ifcfg-ethx:x 

```bash
      DEVICE=ethx:x #网卡接口
	  NAME=em1
	  TYPE=Ethernet#有线Wireless无线 Bind绑定 Team类似聚合
      BOOTPROTO=static   #这里可以用dhcp
      IPADDR=   #IP地址 
      NETMASK=  #子网掩码 
      GATEWAY=  #网关 
      ONBOOT=YES   #是否开机启用 
      UUID=#网卡id通过nmcli con show 查看
      HWADDR=...... MAC 
      PEERDNS=no #手动设置dns可以yes dhcp分配
      DNS1=114.114.114.114         
      DNS2=8.8.8.8     
      ###下方是bond模式主要配置
      MASTER=bond0
      SLAVE=yes
```
虚拟网卡ifcfg-bond0 配置

```bash
DEVICE=bond0
NAME=bond0
TYPE=Bond
BONDING_MASTER=yes
BOOTPROTO=static
IPADDR=
NETMASK=
GATEWAY=
ONBOOT=yes
NM_CONTROLLED=no
BONDING_OPTS="mode=1 miimon=100" #平衡mode=0 负载mode=1
```

配置mode也可以修改 **`/etc/modprobe.d/bonding.conf`**

```shell
alias bond0 bonding
options bond0 mode=1 miimon=100
```

保存后执行

```bash
modprobe bonding
```



用户与组操作

```bash
adduser <username>   #创建用户
userdel <username>   #删除用户
usermod -l newuser olduser #修改用户名称 
passwd <username>   #设置密码
groups wuliang     #查询用户属于那个组
gpasswd -a <username> wheel   #授予sudo权限 -d删除组权限
lid -g wheel     #列出wheel组的权限用户
chown -R 用户名:用户组 文件名 #分用户组R递归

用户列表文件：/etc/passwd
用户组列表文件：/etc/group

```
<!--more-->

#### 服务器坑

>太久忘记密码启动菜单按e键，linux版本一行最后加上"init=/bin/sh"然后ro改为rw ->ctrl+x 最后启动更改密码后更新selinux-> touch /.autorelabel
>
>系统文件误删除可以下载镜像进救援模式恢复文件。挂载光盘>Trou3>Re2救援>1>chroot /mnt/sysimage，也可用livecd镜像进入系统挂载源磁盘进行错误排查。
>
>装系统的时候出现找不到镜像，安装界面按e或者tab ，修改vmlinuz initrd=initrd.img inst.stage2=hd:/dev/sdb4 quiet，改的地方就是hd:后面的路径改成安装镜像的挂载目录(ls /dev)或者改为LABEL=CENTOS7(U盘盘名) ctrl+x保存

#### **LiveCD**救援模式

推荐veket或者ubuntu，挂载iso文件后下面是挂载方式

```sh
fdisk -l ##查看原系统分区
mount /dev/sda1 /mnt/system #挂载分区
```

LVM模块挂载方式

```sh
modprobe dm-mod #加载LVM模块
vgscan && vgchange -ay  ##扫码与激活lvm卷
lvdisplay #查看逻辑卷这个时候就能看到原磁盘路径了
mount /dev/centos/root /mnt/system #挂载分区
chroot /mnt/system /bin/bash #进入全局终端环境
sync #做了操作记得写入磁盘
```

##### Raid基础
Raid0：将所有磁盘整合在一起，空间叠加，没有冗余。

优点：磁盘空间利用率最大，可以获得最大的存储空间。读写速度略高于裸盘。
缺点：任何一块磁盘损坏，所有数据丢失。
Raid1：两块磁盘可做 raid1，相互备份，损坏一块阵列可以照常运行。当两块磁盘大小和速度不一致时，容量和读写速度依照小容量和低速盘。

优点：两块磁盘互备，高可用。无法扩展。读速度略高于裸盘。
缺点：损失一半磁盘空间。
Raid10：四块和以上磁盘的偶数磁盘可以做 raid10。结合 raid1 和 raid0 优势，所有磁盘两两分组，组成 raid1，然后多个 raid1 组成 raid10。

优点：每组磁盘两两互备，高可用。磁盘空间可以扩展。读写速度略高于裸盘。
缺点：损失一半磁盘空间。
Raid5：三块以上磁盘可以做 raid5。Raid5 用校验的方式写数据和读数据。提供 n-1 的磁盘空间和 1 块磁盘冗余。

优点：磁盘空间利用率高，无论多少磁盘组成raid，仅损失一块磁盘空间。读速度略高于裸盘，略高于raid0，是所有raid方式中读速度最好的。
缺点：如果磁盘数量过多，冗余度不够，有可能丢失数据。写速度仅有裸盘四分之一。
Raid6：在 raid5 基础上增加一块热备盘，可以提供 n-2 空间和两块磁盘的冗余。在磁盘数量较多的情况下使用 raid6，可以弥补 raid5 冗余度不够的缺点。

配置:一般现在厂家的服务器出厂都带了阵列卡卡驱动直接进入bios就可以配置了,老的机器就ctrl+r进入阵列卡配置界面配置(英文不好的建议配合谷歌翻译)具体操作步骤:F2配置阵列卡clear>create创建>advanced高级配置开启Diskcache>创建后选择配置的Raid>initialization>fast lnit格式化>
##### Linux系统 
用linux针对我们运维人员来说作为主系统的好处非常多这里就不多说啦直接正题！笔者用的deepin，这款系统是国人基于开源linux深度修改的，非常适合国人使用比如：软件安装，驱动安装，包和源的管理非常的人性化，大大的节约开发者的时间吧多余的精力用在工作上。还有这款系统的UI是非常的美丽喔，几乎所有的按钮以及配件都经过深度优化过后的，给使用者一种优雅轻松的感觉。
deepin源

```bash
deb [by-hash=force] https://mirrors.tuna.tsinghua.edu.cn/deepin panda main contrib non-free
```
kali源  

```bash
 deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
```

环境版本切换,python为例子
```bash
python                             # 查看当前系统默认python2版本

cd /usr/bin                       # 进入/usr/bin目录   

ls -l | grep python             # 显示所有名字中包含python的文件

sudo rm -rf python

sudo ln -s /usr/bin/python3 /usr/bin/python   # 把python的指向改为python3即可

python                             # 查看当前系统默认python3版本
```
###### 0*1 git基础环境

```bash
绑定用户：
git config --global user.name "xxx"
git config --global user.email "xxx@gmail.com"
设置SSH key：
ssh-keygen -t rsa -C "your_email@youremail.com" 

打开github，找到账户里面添加SSH，把id_rsa.pub内容复制到key里面。

测试命令：
ssh -T git@github.com
```
上传本地项目到github
```bash
mkdir demo
cd demo
echo "# demo" >> README.md
git init //把这个目录变成Git可以管理的仓库
git clone https://github.com/AppCanOpenSource/666.git --config http.proxy='http://127.0.0.1:1080'  #更改socks5代理 http和https同理
#wget -e "http_proxy=http://192.168.18.11:7890" http://www.subversion.org.cn/svnbook/1.4/  也可以指定代理
git add README.md //文件添加到仓库
git add . //不但可以跟单一文件，还可以跟通配符，更可以跟目录。一个点就把当前目录下所有未追踪的文件全部add了（空目录不会被添加）
git status //查看当前工作区的状态（需提交的变更）
git commit -m "提交说明" //把文件提交到仓库
git remote add origin git@github.com:hxf0663/demo.git //关联远程仓库
git push -u origin master //将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)
git push origin master //将本地主分支推到远程主分支
下载操作：
git pull origin master //把远程库更改拉到本地仓库
git clone git@github.com:hxf0663/demo.git //克隆远程仓库到本地
git clone https://github.com/hxf0663/demo.git //克隆远程仓库到本地
git clone https://github.com/hxf0663/demo //克隆远程仓库到本地

git branch //列出，-d删除
```


###### 0*2 java与python安装

```bash
sudo apt-get install default-jre  //jre安装
sudo apt-get install default-jdk  //jdk安装
sudo apt install -y make build-essential libssl-dev  zlib1g-dev
sudo apt install -y libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm
sudo apt install -y libncurses5-dev  libncurses5-dev xz-utils tk-dev
wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
./configure --enable-optimizations
make -j8 && sudo make altinstall
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py  //下载安装脚本
sudo python get-pip.py
yum install python-pip
pip install docker-compose
-i https://pypi.tuna.tsinghua.edu.cn/simple  #指定pip install 源
```
###### 0*3 docker安装

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add –
echo 'deb https://download.docker.com/linux/debian stretch stable'> 
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun #centos 78 
/etc/apt/sources.list.d/docker.list
apt-get remove docker docker-engine docker.io containerd runc
apt-get install apt-transport-https  ca-certificates   curl  gnupg2  software-properties-common
apt-get update
sudo apt install docker-ce

mv daemon.json daemon.conf#重启报错去到/etc/docker下改名
或
1. 修改 /etc/docker/daemon.json
{ "storage-driver": "devicemapper" }
2. 修改 /etc/sysconfig/docker-storage
DOCKER_STORAGE_OPTIONS="--selinux-enabled --log-driver=journald --signature-verification=false"
```
###### 0*4 开发环境技巧

```bash
jetbrains系列的软件一套安装好，vim用不惯的用submit，web开发环境建议安装在一个虚拟的centos不需要gui，而且跟线上生产环境也更为接近。如果安装再主系统这会让它变得臃肿并且复杂，而且一旦发生灾难性故障，环境也是分分钟挂掉，关键问题是环境经常会出各种神奇的问题，解决起来浪费大量的时间。虚拟机中配置好环境在设置一个镜像备份出现问题的时候就可以直接恢复了。后期通过jetbrains全家桶SSH与SFTP的连接就可以高效的进行开发了。

小程序与前端开发调试推荐使用HBuilder X +微信开发者工具，多使用F12调试和ide的断点与个个中间件的错误日志排查问题。
```
以下是整理了俺常用的Linux软件:

```
日常类：
FileZilla	ftp管理工具
PHPStorm	代码php
PyCharm	代码python	
Postman	测试api
locust 性能测试
tcpdump 抓包网络诊断
——————————————————————————————————————
web测试类
Wireshark	抓包工具
BurpSuite（汉化+插件）抓包分析
sqlmap	sql注入测试
Hydra	端口服务爆破测试
dirmap（https://github.com/H4ckForJob/dirmap）  目录扫描工具可fuzz 
subdomain3（https://github.com/yanxiu0614/subdomain3） 子域扫描
fuzz（https://github.com/TheKingOfDuck/fuzzDicts）	字典大全
nmap	端口扫描
WhatWaf（https://github.com/Ekultek/WhatWaf） waf识别并尝试绕过
tor		匿名服务
Lynis linux安全扫描
routersploit（https://github.com/threat9/routersploit） 物联网漏洞扫描
w9scan（https://github.com/w-digital-scanner/w9scan/）	1300+插件扫描器
xray（https://github.com/chaitin/xray）	长亭被动式扫描器要强与w13scan
w13scan(https://github.com/w-digital-scanner/w13scan/)	同上一款被动式扫描器
Acunetix与Netsparker  web主动扫描器
Photon（https://github.com/s0md3v/Photon） 	提取一个网站上网址，电子邮件，文件，网站帐户等的高速爬虫
XSStrike（https://github.com/search?q=XSStrike）  可识别并绕过WAF的XSS扫描工具
xunfeng（https://github.com/ysrc/xunfeng）	企业内网的漏洞管理平台
msf（curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall）强大的后渗透框架
Angry IP Scanner（https://github.com/angryip/ipscan/releases/download/3.6.2/ipscan_3.6.2_amd64.deb）快速的局域网ip扫描工具
无线电依赖：sudo apt-get install gnuradio gnuradio-dev gr-osmosdr gr-osmosdr  hackrf 

```



0*5 常用选项

systemctl服务管理用法：
```
 status #查状态
 restart #重启
 start  #启动
 stop #停止
 enable   #开机自启
 disable  #开机关闭
 list-units #列出本机所有服务
systemctl set-default multi-user.target ##开机不开启图形
systemctl set-default graphical.target  ##开机启动图形
setterm                 ##文本界面设定color   

```
service用法
```
service –status -all 
```

nmcli管理网络

```sh
nmcli con show  #查网卡
nmcli con add con-name ens37 type ethernet ifname ens37#激活网卡
nmcli con modify ens33 ipv4.addresses 192.168.229.143/24 ipv4.gateway 192.168.229.2 ipv4.method manual autoconnect yes ##配置Public IP
nmcli con modify ens37 ipv4.addresses 1.1.1.1/24 ipv4.method manual autoconnect yes ##配置Private IP 
##生效
nmcli con up ens33
nmcli con up ens37
nmcli con show
```



![](http://5b0988e595225.cdn.sohucs.com/images/20190314/5dca82d53165496d831b98a63f46a460.jpeg)

### 一、正所谓工欲善其事，必先利其器（在服务器条件允许的条件下使用平台管理）
0.常用系统级面板：Ajenti和Webmin  (可管理 dns和dhcp等等)

1.批量部署与执行：Ansible或方便的[semaphore](https://github.com/semaphoreui/semaphore)，简单日常传传文件执行下命令可以用[BatchShell](http://www.batchshell.cn/)非常强大的批量终端管理工具
2.ssh远程维护：xshell或FinalShell，当然还有企业级的MobaXtermv
3.服务器监控平台： [Prometheus](https://yyzq.cf/?id=167)轻量,zabbix重量,灵活Netdata，Linux-ad域控系统[UCS](https://www.univention.com/)
4.容器管理平台：Portainer k8s搭建用：kubeasz或者KuboardSpray
5.独立管理：[宝塔](https://baota.sbs/)、高仿宝塔[mdserver-web](https://github.com/midoks/mdserver-web)、[1Panel可离线](https://github.com/1Panel-dev/1Panel)、或手动[lnmp](https://lnmp.org/install.html)
6.探针运维集群管理：旗鱼云梯，云帮手，phpstudy。开源vps探针：哪吒，ServerStatus
7.项目自动化发布：Jenkins
8.haporoxy与keeplaive的web管理工具：[haproxy-wi](https://github.com/hap-wi/roxy-wi)
9.日志管理：[Loki](https://blog.csdn.net/weixin_52270081/article/details/124801308)轻量级 ，ELK重量级,[SIEM Log360](https://www.manageengine.jp/products/Log360/),[Splunk](https://www.splunk.com/zh-hans_cn/download/splunk-enterprise.html)
10.服务器缓存（内存）加速：redis web管理工具（redis-manager）
11.云加速：cdn 推荐（百度云，SuCloud宿云）
12.服务配置优化：nginx（https://blog.csdn.net/houjinkai/article/details/81201027） apche（https://www.cnblogs.com/jager/p/4371259.html）
13.数据库远程管理：navicat premium
14.web安全：加固防护(RASP百度)， waf(GOODWAF)。win边缘层：火绒+eset (初步安全可以直接防火墙和OpenRASP，应用服务器上还可挂个waf)
15.负载均衡: 高可用Keepalived(VRRP协议）、四层传输层LVS或haproxy 、七层应用层nginx web工具（nginxWebUI) ，根据企业条件规划架构。



[^架构部署方式]: 高可用前端使可以用haproxy+keepalive（2台）>nginx（2台），也可以nginx+keepalive(2台)，下面介绍后者的部署方式测试可用参考地址：https://cloud.tencent.com/developer/article/1923720

```sh
yum install -y keepalived  #安装keepalived 离线如下
# cd /usr/local/src
# tar -zxvf keepalived-1.2.18.tar.gz
# cd keepalived-1.2.18
# ./configure --prefix=/usr/local/keepalived
# make && make install
# mkdir /etc/keepalived
# cp /usr/local/keepalived/etc/keepalived/keepalived.conf /etc/keepalived/
# cp /usr/local/keepalived/etc/rc.d/init.d/keepalived /etc/init.d/
# cp /usr/local/keepalived/etc/sysconfig/keepalived /etc/sysconfig/
# ln -s /usr/local/sbin/keepalived /usr/sbin/
# ln -s /usr/local/keepalived/sbin/keepalived /sbin/
systemctl enable keepalived | chkconfig keepalived on #自启
vim /etc/keepalived/keepalived.conf #配置文件路径
```

(1) MASTER 节点配置文件（192.168.50.133）

```sh
# vi /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
	## keepalived 自带的邮件提醒需要开启 sendmail 服务。 建议用独立的监控或第三方 SMTP
	router_id liuyazhuang133 ## 标识本节点的字条串，通常为 hostname
} 
## keepalived 会定时执行脚本并对脚本执行的结果进行分析，动态调整 vrrp_instance 的优先级。如果脚本执行结果为 0，并且 weight 配置的值大于 0，则优先级相应的增加。如果脚本执行结果非 0，并且 weight配置的值小于 0，则优先级相应的减少。其他情况，维持原本配置的优先级，即配置文件中 priority 对应的值。
vrrp_script chk_nginx {
	script "/etc/keepalived/nginx_check.sh" ## 检测 nginx 状态的脚本路径
	interval 2 ## 检测时间间隔
	weight -20 ## 如果条件成立，权重-20
}
## 定义虚拟路由， VI_1 为虚拟路由的标示符，自己定义名称
vrrp_instance VI_1 {
	state MASTER ## 主节点为 MASTER， 对应的备份节点为 BACKUP
	interface eth0 ## 绑定虚拟 IP 的网络接口，与本机 IP 地址所在的网络接口相同， 我的是 eth0
	virtual_router_id 33 ## 虚拟路由的 ID 号， 两个节点设置必须一样， 可选 IP 最后一段使用, 相同的 VRID 为一个组，他将决定多播的 MAC 地址
	mcast_src_ip 192.168.50.133 ## 本机 IP 地址
	priority 100 ## 节点优先级， 值范围 0-254， MASTER 要比 BACKUP 高
	nopreempt ## 优先级高的设置 nopreempt 解决异常恢复后再次抢占的问题
	advert_int 1 ## 组播信息发送间隔，两个节点设置必须一样， 默认 1s
	## 设置验证信息，两个节点必须一致
	authentication {
		auth_type PASS
		auth_pass 1111 ## 真实生产，按需求对应该过来
	}
	## 将 track_script 块加入 instance 配置块
	track_script {
		chk_nginx ## 执行 Nginx 监控的服务
	} #
	# 虚拟 IP 池, 两个节点设置必须一样
	virtual_ipaddress {
		192.168.50.130 ## 虚拟 ip，可以定义多个
	}
}
```

(2)BACKUP 节点配置文件（192.168.50.134）

```sh
# vi /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
	router_id liuyazhuang134
}
vrrp_script chk_nginx {
	script "/etc/keepalived/nginx_check.sh"
	interval 2
	weight -20
}
vrrp_instance VI_1 {
	state BACKUP
	interface eth1
	virtual_router_id 33
	mcast_src_ip 192.168.50.134
	priority 90
	advert_int 1
	authentication {
		auth_type PASS
		auth_pass 1111
	}
	track_script {
		chk_nginx
	}
	virtual_ipaddress {
		192.168.50.130
	}
}
```

(3) 编写 Nginx 状态检测脚本 /etc/keepalived/nginx_check.sh (已在 keepalived.conf 中配置)脚本要求：如果 nginx 停止运行，尝试启动，如果无法启动则杀死本机的 keepalived 进程， keepalied将虚拟 ip 绑定到 BACKUP 机器上。 内容如下：

```sh
# vi /etc/keepalived/nginx_check.sh
#!/bin/bash
A=`ps -C nginx –no-header |wc -l`
if [ $A -eq 0 ];then
/usr/local/nginx/sbin/nginx
sleep 2
if [ `ps -C nginx --no-header |wc -l` -eq 0 ];then
	killall keepalived
fi
fi
```

数据库中间件proxysql配置：

```shell
##前置条件需要安装mysql服务端与proxysql并配置好读写分离
#先主从库创建账户并设置权限，这个权限可能设置%尽量对应host
create user 'monitor'@'%' identified with mysql_native_password by 'Monitor@123.com';
grant all privileges on *.* to 'monitor'@'%' with grant option;
create user 'proxysql'@'%' identified with mysql_native_password by '123456';
grant all privileges on *.* to 'proxysql'@'%' with grant option;
FLUSH PRIVILEGES;
#下面都是配置proxysql
mysql -uadmin -padmin -h127.0.0.1 -p6032
#创建组ProxySQL会根据server的read_only的取值将服务器进行分组。read_only=0的server，master被分到编号为1的写组，read_only=1的server，slave则分到编号为0的读组

insert into mysql_replication_hostgroups (writer_hostgroup,reader_hostgroup,comment) values (1,0,'proxy');
load mysql servers to runtime;
save mysql servers to disk;
select * from mysql_replication_hostgroups;
#加主节点
 insert into mysql_servers(hostgroup_id,hostname,port) values (1,'10.2.0.6',3306);
 insert into mysql_servers(hostgroup_id,hostname,port) values (0,'10.2.0.7',3306);
 load mysql servers to runtime;
  save mysql servers to disk;
  select * from mysql_servers;
#对应监控账户
use monitor
set mysql-monitor_username='monitor';
set mysql-monitor_password='Monitor@123.com';
load mysql variables to runtime;
save mysql variables to disk;
#状态检查
select * from monitor.mysql_server_connect_log;
#对外vip端口与账号
insert into mysql_users (username,password,default_hostgroup,transaction_persistent) values ('proxysql','123456',1,1);
load mysql users to runtime;
save mysql users to disk;
## 添加读写分离规则
insert into mysql_query_rules(rule_id,active,match_pattern,destination_hostgroup,apply) values(3,1,'^select .* for update$',1,1);
insert into mysql_query_rules(rule_id,active,match_pattern,destination_hostgroup,apply) values(2,1,'^select',0,1);
load mysql query rules to runtime;
save mysql query rules to disk

```



16.BL大数据分析平台 ：FineBI或者powerBI
17.存储:MinIO(S3),或者Samba与nas/san,iscsi可以直接用windows快速部署。

```bash
##假设已配置好共享存储服务器，IP为10.211.55.18。
##配置iscsi连接共享存储
yum install -y iscsi-initiator-utils*
##输出targetname
iscsiadm -m discovery -t st -p 20.27.178.253
##连接共享存储
iscsiadm -m node -o new -T iqn.1991-05.com.microsoft:t1-test-target -p 20.27.178.253:3260 ##手动创建新的连接
iscsiadm -m node -T iqn.1991-05.com.microsoft:t1-test-target -p 20.27.178.253 -l
##开机映射
iscsiadm -m node -T iqn.1991-05.com.microsoft:t1-test-target -p 20.27.178.253 --op update -n node.startup -v automatic  
###parted对网络盘分区
parted /dev/sdc  #对/dev/sdc进行分区，lsblk和fidsk -l可以查看
print    #打印信息，从中可以看出这个磁盘大小和分区格式
mklabel gpt   
mkpart primary 0% 100%
print #从中可以看出这个磁盘分区格式已经变了成GPT了
mkfs.xfs /dev/sdc##后续格式化然后挂载就行
```



18.一键部署php/java工具（支持离线部署）：[oneinstack](https://oneinstack.com/)


服务器常用初始配置：
```bash
#安装下载yum源
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
#下载epel源
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
#清空原本yum缓存
yum clean all 
#生成新的阿里云的yum缓存，加速下载预热数据
yum makecache
#补齐
yum install epel-release bash-completion bash-completion-extras
#常用工具包与依赖
yum  install "Development Tools"
yum install epel-release
yum  install net-tools lrzsz wget url 
yum install libpcap-devel tc-devel
#离线整合npm资源以Oracle12c为例
repotrack binutils compat-libcap1 compat-libstdc++-33 compat-libstdc++-33.i686 glibc glibc.i686 \
  glibc-devel glibc-devel.i686 ksh libaio libaio.i686 libaio-devel libaio-devel.i686 libX11 libX11.i686 \
  libXau libXau.i686 libXi libXi.i686 libXtst libXtst.i686 libgcc libgcc.i686 libstdc++ libstdc++.i686 \
  libstdc++-devel libstdc++-devel.i686 libxcb libxcb.i686 make nfs-utils net-tools smartmontools sysstat \
  unixODBC unixODBC-devel gcc gcc-c++ libXext libXext.i686 zlib-devel zlib-devel.i686 unzip wget vim epel-release
  #yum也可以 使用downloadonly选项的时候记得把原有的依赖先卸载掉不然不会下载remove
  yum install --downloadonly --downloaddir=/path/to/download <pacjage -name>
  yum localinstall *.rpm -y ##安装
#查看包是否安装没有的话需要手动npm -ivh安装
yum list installed 
rpm -qa | grep libaio
#强制安装rpm包U 升级 i安装 这里要注意原rpm的包一定要和目标环境一致如果不一致会出现系统功能故障
rpm -Uvh *.rpm --nodeps --force
```
#### 本地yum源配置

```shell
mount -o loop /tmp/image.iso /mnt/cdrom #-o loop 吧镜像当做磁盘挂载
yum clean all && yum makecache #清除与重建缓存
```

![1719367262406](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/1719367262406.jpg)

nfs局域网共享目录配置

```shell
yum install nfs-utils
vim /etc/exports##写入 /home/cdrom <共享网段>/8(rw,sync)
service nfs restart
showmount -e 192.168.17.81  #客户端查询
mount <nfs服务器>:/opt/ky01 /mnt/cdrom#客户端挂载nfs最后和上面一样更改一下yum本地源就行
```



#### nginx配置模板

```yaml
server {
    server_name pan.xlmy.net;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Range $http_range;
        proxy_set_header If-Range $http_if_range;
        proxy_redirect off;
        proxy_pass http://127.0.0.1:5246;   #映射
        # 上传的最大文件尺寸
        client_max_body_size 20000m;
        proxy_read_timeout 300s;  # 接口返回需要较长的超时时间，自行调整
    }
    listen 80;
    listen 443 ssl http2;
    
     #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /www/server/panel/vhost/cert/xlmy.net/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/xlmy.net/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:2ECDH+AES128:RSA+AES128:EE2DH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    # error_page 497  https://$host$request_uri;
   error_page 497   http://127.0.0.1:5244;
		#SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
        # 防止爬虫抓取
    if ($http_user_agent ~* "360Spider|JikeSpider|Spider|spider|bot|Bot|2345Explorer|curl|wget|webZIP|qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|NSPlayer|bingbot")
    {
      return 403;
    }
}
```



### 二、必备命令

#### 综合分析
0.网络带宽分析工具iftop,centos下需要下载源包进行mack编译代码如下
下载地址：http://www.ex-parrot.com/~pdw/iftop/

```
yum install flex byacc  libpcap ncurses ncurses-devel libpcap-devel

tar zxvf iftop-0.17.tar.gz

cd iftop-0.17

./configure

make && make install

//日常用法 i 指定网卡，P使host信息及端口信息默认就都显示，F指定网段监控，b使流量图形条默认就显示
iftop -i etho -P -F
```

1.ps、top命令分析进程配合netstat与ss以及一些常用的网络调试
详细用法[参考链接](https://www.cnblogs.com/hunttown/p/5452253.html)
```bash
ps -ef 查找主进程 
ps -aux --sort -pcpu,-pmem | grep name | head -n 10
//查询所有的进程并进行排序后面用-指定排序规则 管道筛选与name相关的进程 管道筛选出前10条
ps -TSmp  pid 搜索进程的线程并列出Sid等其他信息
ps -axfj 列出所有进程并显示各种id号树结构显示

netstat -antlp或-anulp ##查看tcp或udp的端口监听
netstat -tunlpa |grep 端口号 ##查看端口对应的程序

ss -lspa##查看socks套字节信息后面+t查看tcp +u查看udp

top ##-p pid 筛选进程 M 内存占比排序、C显示路径、P cup占比排序（默认）、N 以PID排序、q 退出

iptables -I INPUT -s ***.***.***.*** -j DROP #封停一个ip

iptables -I INPUT -p tcp --dport 6666 -j ACCEPT #开启某端口

traceroute -p 8080 192.168.10.11 #路由端口追踪

```

2.kill -STOP 先尝试停止进程
  killall -9 name 关闭与name相关的进程
  kill -9 -pid  关闭pid进程组
  pkill -s sid 杀掉session组, 配合ps -axuf查看sid

3.whereis和which命令查找此进程文件位置并且检查/root/.ssh或用ls -l /proc/{pid号}/exe查看pid所在的进程

3.find 路径 -name 文件没  查文件是否存在

4.crontab -l查看是否有定时任务可疑的通过-rf删除

5.chattr +ia -ia 开启解除锁定i权限

6.chmod –R 权限设置 777 000 

7.history 查看历史记录

8.rkhunter --check  查毒

9.chkconfig iptables on 防火墙开启

10.systemctl stop ？ 停止某服务

11.rm 删除与病毒相关的父目录/etc，检查/root/.ssh/路径的ssh文件

12.ls -l  /etc/init.d   查看启动项 

13.通过tcpdump分析数据包流量是否传输正确：

抓包分析
```
c捕获多少包，nn显示端口，i指定网卡，dst到，and拼接， src指定ip。
tcpdump -c 10 -nn -i eth0 tcp dst port 22  #
tcpdump -c 10 -nn -i eth0 icmp and src 192.168.100.62
```
解包分析
```
-XX：输出包的头部数据	
tcpdump -c 2 -q -XX -vvv -nn -i eth0 tcp dst port 22

```
追踪最新的10条抓包信息
```
tail -10f /文件名 
```

#### 内存分析

ps拼接用法

```shell
    ps -aux| grep -v "USER" |sort -n -r -k 4 |awk 'NR==1{ print $0}' #查看内存占用最大的进程

    ps -e -o ppid,stat|grep Z|cut-d ””  -f2|xargs kill -9 # 关闭僵尸进程
```



进程状态如下

```
D    不可中断睡眠 (通常是在IO操作) 收到信号不唤醒和不可运行, 进程必须等待直到有中断发生
R   正在运行或可运行（在运行队列排队中）
S   可中断睡眠 (休眠中, 受阻, 在等待某个条件的形成或接受到信号)
T   已停止的 进程收到SIGSTOP, SIGSTP, SIGTIN, SIGTOU信号后停止运行
W   正在换页(2.6.内核之前有效)
 X   死进程 (未开启)
 Z   僵尸进程  进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放BSD风格的
 <   高优先级(not nice to other users)
 N   低优先级(nice to other users)
 L   页面锁定在内存（实时和定制的IO）
 s   一个信息头
 l   多线程（使用 CLONE_THREAD，像NPTL的pthreads的那样）
 +   在前台进程组
```



2.free -m  内存占用情况

3.vmstat x 其中vmstat x代表每隔x秒更新一次数据。

内存释放
```bash 
sync     #先将内存刷出，避免数据丢失
echo 1 > /proc/sys/vm/drop_caches #释放pagecache
echo 2 > /proc/sys/vm/drop_caches #释放dentry和inode
echo 3 > /proc/sys/vm/drop_caches #释放pagecache、dentry和inode
```
4.后台挂起shell进程

```bash
nohup wget site.com/file.zip  //该指令表示不做挂断操作，后台下载
nohup ping -c 10 baidu.com  //会在同一个目录下生成一个名称为 nohup.out 的文件，其中包含了正在运行的程序的输出内容
```

#### 性能分析

cpu占用过高，通常我们会通过`top`或者`htop`来快速的查看占据CPU最高的那个进程，但是通过以上的方法获取到服务器占用资源的进程之后，还是`不知道CPU使用究竟耗时在哪里`,不清楚瓶颈在哪里，此时就可以通过`Linux`系统的性能分析工具`perf`分析，分析其返回的正在消耗CPU的函数以及调用栈。下面列出常用分析命令**捕获堆栈**：

```shell
##perf record表示记录，-F 99表示每秒99次，-p 25633是进程号 -a全部，-g表示记录调用栈，sleep 30则是持续30秒，参数信息可以视情况调整，-e是使用内置模块分析。生成的数据采集文件在当前目录下，名称为perf.data
perf list #列出可用模块
#了解进程的内存使用情况，找到内存泄漏的原因。brk(),mmap() 或者是用memory:malloc,free程序分析内存
 perf record -e syscalls:sys_enter_brk -a -g -- sleep 120
#直接采样程序的堆栈数据用于CPU分析
 perf record -F 99 -p 25633  -g -- sleep 60 
```

可配合火焰图脚本stackcollapse输出`perf`采集的数据，渲染到火焰图。就清楚的知道究竟占用系统CPU资源的罪魁祸首是谁了。项目地址[FlameGraph](https://github.com/brendangregg/FlameGraph.git)，生成步骤如下图:

![](https://s1.ax1x.com/2022/07/19/jTop0f.png)



```shell
##使用脚本perf解析堆栈信息到文件
perf script -i /root/perf.data > /root/perf.unfold
##用 stackcollapse-perf.pl 将 perf 解析出的内容 perf.unfold 中的符号进行折叠
./stackcollapse-perf.pl /root/perf.unfold > /root/perf.folded
##生成火焰图
./flamegraph.pl /root/perf.folded > /root/perf.svg
##火焰图生成一句话
perf script | ../FlameGraph/stackcollapse-perf.pl  | ../FlameGraph/flamegraph.pl > mygraph.svg

```

> - `y` 轴表示调用栈, 每一层都是一个函数. 调用栈越深, 火焰就越高, 顶部就是正在执行的函数, 下方都是它的父函数.
> - `x` 轴表示抽样数, 如果一个函数在 x 轴占据的宽度越宽, 就表示它被抽到的次数多, 即执行的时间长. 注意, x 轴不代表时间, 而是所有的调用栈合并后, 按字母顺序排列的.

生成图如下:

![](https://s1.ax1x.com/2022/07/19/j7CWy6.png)

#### 文本分析

熟练使用常用文本处理命令可以非常便捷的处理很多项目中遇到的问题。

```sh
grep -rn "内容"  查找文本.txt  #r操作目录n显示行数,通常与管道符一起使用快速检索输出内容
sed -i 's/192.168.1.1\/index.php/1.1.1.1\/index.htm/g' tcp.sh #-i参数表示直接修改文件,不输出到终端。's'表示替换,'g'表示全局替换 ，\用来转义特殊符号
find . -type f -type d -exec grep -l "hello" {} \;  # 查询当前目录下所有包含hello字符的文件，f代表文件 d代表目录
find . -type f -type d  | xargs grep "hello" #同上执行更高效 通过 xargs 的处理，换行和空白将被空格取代
wc #查看行数，字节，字数
```



#### 备份操作

syncthing或者**FreeFileSync**（通过ftp协议也可以跨平台备份很方便）：带web界面跨平台，有历史版本。

rsync传输命令如下：

```sh
rsync -av  /home/o1/oracle_da/ o2@10.2.0.5:/home/o2/oracle_da  --progress #同步文件夹不需要一致，最后--是看进度
rsync -av --delete /源文件/  /目标目录/ root@192.168.4.207:/目标目录/  #反向同步调换方向
scp  o2/* o1@10.2.0.4:/home/o1/ #scp同样也可以传输 -r带目录
```

#### 磁盘管理

首先ln命令是必须要会用的

```bash
ln –s  /var/www/test  test \\当前路径创建test 引向/var/www/test 文件夹 
ln –s  /var/www/test   /var/test  \\创建/var/test 引向/var/www/test 文件夹 
```

IO检查

```shell
iostat 2 1  #2=频率 1=次数 -X详细
iotop #类似top
```

刷新磁盘命令

```bash
ls /sys/class/scsi_host

echo "- - -" > /sys/class/scsi_host/host0/scan

echo "- - -" > /sys/class/scsi_host/host1/scan

echo "- - -" > /sys/class/scsi_host/host2/scan

ls /sys/class/scsi_device

出现 0:0:0:0 1:0:0:0 (此结果因不同配置，结果不同)

执行：echo 1 > /sys/class/scsi_device/0:0:0:0/device/rescan

执行：echo 1 > /sys/class/scsi_device/1:0:0:0/device/rescan

```

1.直接挂载磁盘扩容目录，使用查看新磁盘路径

```
fdisk -l  //分区/查看分区
fdisk /dev/sdc //这里写上一步的磁盘路径
```
输入 n 按回车键，然后再输入 p ，按回车键。 n 表示新建一个分区，p 表示是主分区。 输入 m 可以查看所有的命令说明。后面一直默认就行了最后一步w保存。（这里注意默认分区是1，后面需要格式化的盘就选择/dev/sdc1）

格式化磁盘并挂载分区（可用于做外部磁盘扩容）

```shell
mkfs.xfs  /dev/sdc1           #格式化分区 -f强制

mkdir  /home                #建立挂载点，建议挂在对应软件的根目录

mount /dev/sdc1 /Ddata    　　　　　#挂载硬盘

vim /etc/fstab                #挂载永久生效 ext3 ext4  xfs  1 1
***************
/dev/sdc1               /home                 ext3    defaults        0 0
***************
mount -a   #刷新挂载
```
*删除分区（如果设置了永久挂载记得去/etc/fstab删除掉挂载信息）

```
umount -v /dev/sdc1    #卸载磁盘
fdisk /dev/sdc1      #删除分区
m  
d  
1  
d  
```

2.云容器与虚拟机xfs磁盘扩容

```sh
fdisk /dev/sda #确认需要操作的磁盘，通常是带有空闲容量的磁盘
d #先删除为成功挂载的分区
2 #选择分区
n #重新新建分区
p #添加主分区
2 #重新创建分区2然后一路回车
w
reboot
xfs_growfs /dev/sda2  #同步到系统
```

3.添加磁盘拓展LVM扩容

```bash
fdisk  /dev/sdb #初始化新盘分区-n p 1 w
fdisk /dev/sdb #更改分区模式为LVM-t 8e w
mkfs -t xfs /dev/sdb1 #格式化新分区 lvs可以查看vg卷组
pvcreate /dev/sdb1#创建pv物理卷
vgextend centos /dev/sdb1#吧pv添加进vg卷组中
lvextend -l +100%FREE /dev/mapper/centos-root #卷组为使用的卷添加到lv逻辑卷
xfs_growfs /dev/mapper/centos-root #同步到系统
```

6.也可使用GParted可视化扩容

```
先删除swap分区->拖动Resize->创建swap->复制uuid->改/etc/fstab 
```



#### Linux安全分析（配合日志分析）
1.diff命令，将整个web目录和备份目录进行对比，排查出被修改的文件 -r对比文件夹
	

    diff -r webdir webdir_bak 
2.使用find命令配合mtime、ctime参数，搜索事发时间时间段以下是24小时，指定格式的被修改文件
	

    find /var/www/html -mtime +0 "*.jsp"

3.启动项排查

```bash
cat /etc/rc.local            排查rc.local文件中添加的启动项命令记得给他权限以及路径与脚本头正确bin/bash或sh
ls /etc/init.d               排查init.d目录下添加的自启动脚本
ls /etc/profile.d            排查profile.d目录下添加的自启动脚本
chkconfig --list             centos系统列出自启动项
```

4.更新test.txt的时间和test2.txt时间戳相同：touch -r test.txt test2.txt;设定时间戳：touch -t 201605171210.20 test.txt，中文文件乱码可以尝试更改默认语言。

```shell
yum install cjkuni-ukai-fonts #先安装一个中文字体apt-get install ttf-wqy-zenhei
export LANG="en_US.UTF-8" ##英文
export LANG="zh_CN.UTF-8"#中文
vim /etc/locale.conf  ###编辑配置文件然后more永久更 改update-locale LANG=zh_CN.UTF-8
```

5.找回rm删除的正在使用的文件，多文件夹可以用extundelete

```shell
lsof |grep "" #查看谁再使用文件记住id
cd /proc/$id/fd |ls -l #定位文件然后用cp 序列号拿出文件
```



##### 日志清理与管理
*习惯用tail -10f 命令追踪日志文件
1.检查日志磁盘占用

	df -Th 
	journalctl --disk-usage 
2.日志限制与持久(只保存2天的日志，最大500M)
``` 
journalctl --vacuum-time=2d  

journalctl --vacuum-size=500M
```
持久化修改 /etc/systemd/journald.conf

	SystemMaxUse=16M
	ForwardToSyslog=no
3.日志功能解释
常用3个日志查看与当前登录命令:last(用户登录),lastlog(系统日志),lastb(登录失败),who(当前登录)
```
/var/log/boot.log：录了系统在引导过程中发生的事件，就是Linux系统开机自检过程显示的信息

/var/log/lastlog ：记录最后一次用户成功登陆的时间、登陆IP等信息

/var/log/messages ：记录Linux操作系统常见的系统和服务错误信息

/var/log/secure ：Linux系统安全日志，记录用户和工作组变坏情况、用户登陆认证情况

/var/log/btmp ：记录Linux登陆失败的用户、时间以及远程IP地址

/var/log/syslog：只记录警告信息，常常是系统出问题的信息，使用lastlog查看

/var/log/wtmp：该日志文件永久记录每个用户登录、注销及系统的启动、停机的事件，使用last命令查看

/var/run/utmp：该日志文件记录有关当前登录的每个用户的信息。如 who、w、users、finger等就需要访问这个文件
```
4.mysql数据库日志
代码补全工具mycli

```
基本信息导出: mysql -uroot -p -S /opt/data/mysql.sock  -e "\s;show global variables;" > /tmp/msyql_baseinfo.txt
错误日志文件路径:  show variables like 'log_error';
慢日志: show variables like 'slow_query_log_file';
日志路径: show variables like 'general_log_file';
```
sql分析
正在执行的sql
```
show processlist; 

```
sql日志开启与关闭（调试完毕记得关闭不然会塞满磁盘）：

日志文件可能存在的位置：/home/root/mysql/data/mysql/general_log.CSV

```
SET GLOBAL log_output = 'TABLE';SET GLOBAL general_log = 'ON'; 
SET GLOBAL log_output = 'FILE'; SET GLOBAL general_log = 'OFF';  //日志关闭
```

5.nginx日志

日志文件可能存在的位置：/usr/local/nginx/logs/  /var/log/nginx 或者再/www位置下

```
cat access.log | awk '{print $1}'|sort |uniq -c |sort -n -k 1 -r|more #ip访问量统计
cat access.log|grep '103.213.96.234'|awk '{print $7}'|sort | uniq -c |sort -n -k 1 -r |more ##ip访问的路径
cat access.log|awk '{print $9}' |sort|uniq -c |more ##打印响应
```

#### 出站流量控制

定时监控服务器上的出站流量，超过1TB就自动重置计算流量并关机。这个场景主要是对于一些个人的服务器按避免按流量计费与恶意ddos攻击导致额外支出所应急的脚本。

```bash
#!/bin/bash
yum install vnstat -y
# 你的流量限制（单位：GB）
LIMIT=1024000  # 将GB转换成MB，再乘以1000

# 获取当前的出站流量（去掉单位，并转换成整数）
OUTGOING=$(vnstat -i eth0 --oneline | awk -F ";" '{gsub(/[a-zA-Z]/,"",$10); printf "%.0f", $10 * 1000}')

# 初始化网络接口根据实际情况修改我是eth0
vnstat -u -i eth0

# 如果流量超过限制
if (( OUTGOING > LIMIT )); then
  # 重置vnstat数据
  vnstat -i eth0 --delete --force
  vnstat -i eth0 --create
  # 重启vnstat服务
  systemctl restart vnstat
  # 关闭机器
  shutdown -h now
fi
```

然后添加每隔30分钟定时任务执行，并在每月1日自动重置计算流量。crontab -e编辑定时让你无，前面加@reboot参数是开机立即执行

```bash
*/30 * * * * /home/jp1/script.sh
0 0 1 * * vnstat --delete --force && vnstat --create
```

 开机自启动服务如下

```bash
sudo nano /etc/systemd/system/start_script.service   ##创建一个定时服务start_script
```

输入

```bash
[Unit]
Description=Start Script Service
After=network.target

[Service]
ExecStart=/path/to/your/start_script.sh  ##自己的脚本目录

[Install]
WantedBy=default.target
```

自、启动、查看服务

```bash
sudo systemctl enable start_script.service
sudo systemctl start start_script.service
sudo systemctl status start_script.service
```

笔者通常Azure服务器用的较多如果费用问题还可以配合自带的自动化账户完成自动关机与重启达到节省的目的

```shell
# 使用系统分配的托管标识连接到Azure,需要先创建一个系统托管标识给自动化资源
Connect-AzAccount -Identity

# 定义虚拟机的资源组和名称
$ResourceGroupName = "dom"
$VmName = "t1"

# 启动虚拟机
Start-AzVM -Name $VmName -ResourceGroupName $ResourceGroupName
```

### 三、运维实用脚本（可根据公司需求重构）

#### 初始化脚本

重新定义Linux管理方式的kejilion.sh让初始化服务器更加高效不依赖面板

![](https://kejilion.sh/kejilionsh.webp)

轻量级的系统初始化脚本[shell_raymond9](https://github.com/raymond999999/shell)

![](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/c4ef6f73-2c1e-4002-938e-1f57cf93f0d2.png)

[yum本地换源脚本用于离线环境](https://pan.xlmy.net/d/%E8%BF%90%E7%BB%B4%E7%AC%94%E8%AE%B0/yum%E6%9C%AC%E5%9C%B0%E6%8D%A2%E6%BA%90%E8%84%9A%E6%9C%AC.sh?sign=pxKgNkzjg8yN1cw9zYb_-0pl-u34FPsof__pNmgbsUY=:0)

#### 日常脚本

快捷运维，代号[kjyw](https://github.com/aqzt/kjyw)，项目基于shell、python，运维脚本工具库，收集各类运维常用工具脚本，实现快速安装nginx、mysql、php、redis、nagios、运维经常使用的脚本等等...

https://github.com/Ljohn001/ljohn_ops

https://linuxeye.com/category/script/

#### 应急工具
一站式问题定位平台，以agent的方式无侵入接入应用，提供各种指标，动态线程堆栈追踪，完整集成arthas功能模块，致力于应用级监控，帮助开发人员快速定位问题。[cubic](https://gitee.com/dromara/cubic)
![](https://s1.ax1x.com/2022/07/01/jQDK0O.png)
https://github.com/al0ne/LinuxCheck
![](https://github.com/grayddq/GScan/blob/master/pic/2.png)
https://github.com/grayddq/GScan

### 四、云计算扫盲

常用中间件路径需要记忆以便快速连入容器定位配置文件，当然有nacos管理的情况下最好但不一定每个环境都一定有配套的管理平台记下来也不是坏事。

```bash
MySQL:/etc/my.cnf /var/lib/mysql
Nginx:/etc/nginx/nginx.conf /usr/share/nginx/html /var/log/nginx  
Redis:/etc/redis/redis.conf /var/lib/redis
Apache:/etc/httpd/conf/httpd.conf /var/www/html /var/log/httpd
Tomcat:/etc/tomcat/server.xml /var/lib/tomcat/webapps /var/log/tomcat
RabbitMQ:/etc/rabbitmq/rabbitmq.conf /var/log/rabbitmq
Elasticsearch:/etc/elasticsearch/ /var/lib/elasticsearch/
Zookeeper:/etc/zookeeper/zoo.cfg /var/lib/zookeeper
Memcached:/etc/memcached.conf
PostgreSQL:/etc/postgresql/postgresql.conf /var/lib/postgresql/data
MongoDB:/etc/mongod.conf /var/lib/mongo
Hadoop:/etc/hadoop/hadoop-env.sh /var/lib/hadoop-hdfs
Kafka:/etc/kafka/server.properties /var/lib/kafka-logs  
Solr:/etc/solr/solr.xml /var/solr
Cassandra:/etc/cassandra/cassandra.yaml /var/lib/cassandra
OpenVPN:/etc/openvpn/openvpn.conf
vsftpd:/etc/vsftpd.conf
ProFTPD:/etc/proftpd.conf 
Samba:/etc/samba/smb.conf
Squid:/etc/squid/squid.conf
Bind DNS:/etc/named.conf
DHCP:/etc/dhcp/dhcpd.conf
SSH:/etc/ssh/sshd_config
Rsync:/etc/rsyncd.conf
rsyslog:/etc/rsyslog.conf
Iptables:/etc/sysconfig/iptables
Logrotate:/etc/logrotate.conf /etc/logrotate.d/
Crond:/etc/crontab
Pacemaker:/etc/pacemaker/
Keepalived:/etc/keepalived/keepalived.conf
```

>  教程的话直接看[Kuboard文档](https://kuboard.cn/learning/k8s-basics/kubernetes-basics.html#%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87)下的教程学习效率杠杠的，然后配合[尚硅谷的视频](https://www.bilibili.com/video/BV13Q4y1C7hS)教程开启云原生时代。下面是笔者做的笔记。

#### Kubernetes基础

#### 简单命令

````bash
加 "-o wide" 查看的更加详细 
kubectl get po //查看所有pod 
kubectl get nodes     //查看所有的nodes
kubectl get ns  //查看名称空间
kubectl get all //查看全局状态
kubectl get po pod-name -o yaml      //以yaml文件形式显示一个pod的详细信息
kubectl logs -f podname  //看日志
kubectl edit //编辑服务资源 编辑实列如下：
```
kubectl get service |grep nginx //过滤需要修改的服务
kubectl get service nginx -o yaml //确认一下配置文件
kubectl edit service nginx
```

````



![](https://kuboard.cn/assets/img/module_01_cluster.8f54b2c5.svg)

**术语总结**

> **控制节点（Master）**：负责协调集群中的所有活动，例如调度应用程序，维护应用程序的状态，扩展和更新应用程序。
>
> > > **工作节点（Node）**：是VM(虚拟机)或物理计算机，充当k8s集群中的工作计算机。每个node都有一个Kubelet用于通讯
>
> **负载部署方式**
>
> > >+ Deployment（无状态）：微服务类
> > >+ StatefulSet（有状态副本集）：中间件类
> > >+ DaemonSet（守护进程集）：日志，监控定时类 
> > >
> > >> **容器组（Pod）**:用于存放一组 container（可包含一个或多个 container 容器，即图下正方体)，以及这些 container （容器）的一些共享资源。这些资源包括：
> > >>
> > >> - 共享存储，称为卷(Volumes)：数据挂载地数据与配置文件等
> > >> - 网络，每个 Pod（容器组）在集群中有个唯一的 IP，pod（容器组）中的 container（容器）共享该IP地址
> > >> - container（容器）: 的基本信息，例如容器的镜像版本，对外暴露的端口等
> > >
> > >服务（Service）：它使用 [Labels、LabelSelector(标签和选择器) (opens new window)](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels)匹配一组 Pod。Labels（标签）是附加到 Kubernetes 对象的键/值对，其用途有多种：
> > >
> > >- 将 Kubernetes 对象（Node、Deployment、Pod、Service等）指派用于开发环境、测试环境或生产环境
> > >- 嵌入版本标签，使用标签区别不同应用软件版本
> > >- 使用标签对 Kubernetes 对象进行分类

![](https://kuboard.cn/assets/img/module_03_nodes.38f0ef71.svg)

![Kubernetes教程：伸缩](https://kuboard.cn/assets/img/module_05_scaling2.3f74dfba.svg)

#### 容器启动步骤

1. 首先需要去[dockerhub](https://registry.hub.docker.com/)确定镜像以及参考镜像conf文档
2. 创建配置文件ConfigMap，key=配置文件名，vlue=值
3. 创建存储卷挂载Pvc(建议创建副本集的时候再创建)
4. 创建副本集，需要确定：镜像版本号、启动命令、环境变量、同步时区、选择存储卷
   1. 暴露连接服务用于外部访问（内部访问直接通过服务名或dns域），需要确定： 访问、类型、端口

![](https://s1.ax1x.com/2022/07/01/jQRGOs.png)

#### devops

……

#### 原生总结

原生系列其实无疑就是无限套娃，懂原理过后直接上青云的kubesphere面板或者Kuboard的面板直接突突突就行了,有手就行。 如特殊环境或者减轻服务器压力、弱网环境等可考虑边缘计算KubeEdge并结合云原生和物联网平台满足当前需求。虽然以后许多复杂的配置会被paas或者saas业务所替代但是使用这些服务与工具的前提是基础架构一定要思路清晰，并能够通过配置文件找寻关键问题。原生蓝图参考地址:([云原生环境蓝图](https://landscape.cncf.io/))
