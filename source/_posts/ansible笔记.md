title: Ansible入门笔记
author: Believe firmly
tags:
  - 实用技术
  - 笔记
categories: []
date: 2019-05-07 21:33:00
---
#### VM测试环境桥接没网
kali:检查目录 /etc/network/interfaces
检查dns  /etc/resolv.conf 
```
# The loopback network interface
auto lo
iface lo inet loopback
 
# The primary network interface
# 这里通过ifocnfig判断网卡类型选择
auto eth0 
iface eth0 inet dhcp
```
2.检查网卡配置，吧自动换成当前网卡。

3.重置网络，并重启电脑
```
service networking restart
```
centos7: 记录ip add获取的mac 并修改/etc/sysconfig/network-scripts/ifcfg-ensXX

ONBOOT=yes

![](https://img2018.cnblogs.com/blog/16027/201905/16027-20190531171524865-552757814.png)
重置网卡


##### 1. 测试环境 
ansible: Kali Linux 2.0 192.168.3.10  pip安装的ansible
webnode： CentOS 7.5 192.168.3.12

从ansible管理端上生成ssh私钥
<!--more-->
```
ssh-keygen -t rsa
```
把公钥同步到webnode主机上实现登录管理
```
ssh-copy-id -i ~/.ssh/id_rsa  192.168.3.12或 sudo ssh-copy-id root@192.168.3.12

```
ansible默认配置目录，目录下的hosts代表主机清单，[]代表组下面跟webnode。目录下没有请mkdir、touch
```
/etc/ansible
```


##### 2. 常用参数格式
ansible
-m MOD_NAME      #模块名   如:ping
-a MOD_ARGS      #模块执行的参数
-f FORKS         #生成几个子进行程执行
-C               #(不执行，模拟跑)
-u Username      #某主机的用户名
-c  CONNection   #连接方式（default smart）
示列:
```
ansible all -m yum -a "name=ansible state=installed" 

ansible all -m shell -a "ps |grep ansible"
```

ansible-doc 获取帮助信息

-l 获取可用模块及简要信息
-s 跟模块名 获取指定模块帮助信息说明

##### 3. ansible常用模块（选项接=号赋值）

1、copy模块
从本地copy文件分发到目录主机路径 
参数说明:
src 源文件路径
dest 目标路径 
注意src 路径后面带/ 表示带里面的所有内容复制到目标目录下，不带/是目录递归复制过去
content='' 自行填充的新文件内容
owner 属主
group 属组
mode权限

2、fetch模块
从远程主机获取文件到本地
src 需要获取的文件
dest 本地接收目录

3、command模块、shell模块
commnad只能执行裸命令(即系统环境中有支持的命令),管道之类的功能不支持,
shell模块可以做到。通常使用shell模块。

4、file模块
设置文件属性(创建文件)
常用参数:
path目标路径
state （directory为目录,link为软件链接）


5、yum模块
故名思义就是yum安装软件包的模块;
常用参数说明:
enablerepo,disablerepo表示启用与禁用某repo库
name 安装包名
state （installed代表安装，removed代表删除）

6、service模块
service模块是管理服务的，用法：
enabled 是否开机启动，取值为true或false；
name 服务名字；
state 状态，取值有started，stoped，restarted

7、script模块
本地script模块编辑好过后发送给远端执行
```
ansible all -m script -a "/root/test.sh"
```


##### 4.Playbook实战脚本
介绍：
Playbooks可以声明配置，但它们也可以协调任何手动订购流程的步骤，即使不同的步骤必须在特定订单的机器组之间来回跳转。他们可以同步或异步启动任务。
简而言之，playbooks是真正简单的配置管理和多机器部署系统的基础，与已有的系统不同，并且非常适合部署复杂的应用程序。
它是由一个或多个模块组成的，使用多个不同的模块，完成一件事情。通过yaml语法识别描述的状态文件。扩展名是yaml。



###### 0.快速部署用宝塔或者WDCP

1、WDCP

yum install -y wget
wget http://dl.wdlinux.cn/files/lanmp_v3.2.tar.gz
tar zxvf lanmp_v3.2.tar.gz
sh lanmp.sh

2、宝塔（有破解）

yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh

3、旗鱼云梯（集群管理）

完整教程移步：https://blog.csdn.net/leo12036okokok/article/details/89521670