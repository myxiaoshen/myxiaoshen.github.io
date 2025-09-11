title: docker常用命令与实践
author: Believe firmly
tags:

  - 网络
categories: []
date: 2019-07-21 15:30:00
---
### 前言
Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。有了docker很多环境就不需要你配了，比如mysql，tomcat,redis等等。活用dockers可以让你再环境搭建中省下很多的事情
—————————————————————————————————————————
docker仓库>镜像>容器>数据
docker命令速查：https://www.jianshu.com/p/2f97f61933b9
docker入门到实践：https://yeasy.gitbooks.io/docker_practice/image/dockerfile/references.html
docker入门到实践：https://docs.docker.com/engine/reference/builder
加速地址命令：
    

    curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://4e70ba5d.m.daocloud.io

docker手动修改配置加速：
编辑文件重启docker服务
/etc/docker/daemon.json

```
{

    "registry-mirrors":["https://almtd3fa.mirror.aliyuncs.com"]      

}

```

### 基础命令
1.启动一个容器并开启实时交互功能,并命名,进入shell终端（rename命名）

	docker run －i－t --name <name> 	/bin/bash //-d守护进程，-p指定端口映射，-P映射所有容器端口； -v 将目录挂载到本地 注：冒号":"前面的目录是宿主机目录，后面的目录是容器内目录。-e传参配置环境参数； --link 链接容器

2.查看容器进程与查看所有容器的ip地址

  	 docker  ps －a -l  <name>
  	
  	docker inspect --format='{{.Name}} - {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
3.重新启动已经stop的容器（-kall直接关闭容器）

    docker start -i  <name>   
4.删除容器

	docker rm <name>
5.ctrl+p carl+q 交互式容器转后台   
	
    docker attach  <iname> //与该容器交互
<!--more-->    
6.查看日志

	docker logs <image>

7.查看容器进程

    docker top <name>
8.启动容器里的进程

   - docker exec <name>
   - docker exec -it <name> bash //进入交互式shell
	9.列出本地镜像，查看镜像信息，创建镜像，删除镜像，修改镜像
	
	 docker images

    docker inspect
    docker image rm
    docker update --restart=always 修改这个容器为自启
    docker commit <name> <new id>创建新的镜像
    docker tag 克隆一个镜像 一般用于命名



10.常用指令如下，docker-compose 同理配置文件需要仔细编写。

```bash
 search #搜索
 pull#拉取
 push#推送
 build#构建
 down#
 up #启动
 restart#重启
 stop#停止
 rm#删除
 exec #进入
 config#配置文件
 ps#进程
 run #启动
 logs#日志
```
11.dockerfile创建镜像

```bash
docker build -t="nginx:v3" .	 ##命令用于构建一个Docker镜像，并为其指定标签为nginx:v3，镜像的构建内容来自当前目录下的Dockerfile。
FORM  <image>:<tag>##指定容器基础依赖镜像名如 ubuntu:latest 
MAINTAINER <name><emali>##镜像信息
RUN <shell> ##运行指令
EXPOSE <port> //指定容器使用的端口
ENTRYPINT[""] CMD[""] ##前者优先级大于后者，可组合使用
ADD ["<src>" "<dest>"] ##适用于文件	空格的情况
COPY ["<src>" "<dest>"] ##适用于文件路径有空格的情况
ONBUILD [] ##镜像触发器
```
12.网络处理
先用apt-get更新镜像里的环境，并安装net-tools  inetutils-ping
	

    docker run --net=xxx//来指定容器使用的网络类型一下是参数类型
    bridge//默认的虚拟网桥，类似nat
    host //容器网络和宿主机一样，类似桥接
    node docker //不设置网络


在docker run创建并运行容器的时候，可以通过-p指定端口映射规则。但是，我们经常会遇到刚开始忘记设置端口映射或者设置错了需要修改。解决方式一般都是重新创建一个容器，但是有业务的情况不建议这样。
先查看容器的CONTAINER ID与对应的网络
```shell
docker ps //看id
docker inspect name //看对应配置文件
```
编辑/var/lib/docker/containers/[CONTAINER ID]/hostconfig.json 文件,修改PortBindings，最后重启docke服务
![](https://i.niupic.com/images/2020/10/06/8LNA.png)

```bash
systemctl restart docker
```

容器使用宿主机的代理的几种方法总结
和 build 时类似，只需要在 生成容器时（run -e http_proxy=...） 或者 容器中 设置环境变量http_proxy和https_proxy变量即可，同样需要注意容易使用的网络类型是bridge还是host，根据类别设置正确的代理 ip 地址

方法一： 直接在容器内使用（推荐)

``` 
export ALL_PROXY='socks5://172.17.0.1:1080'
export https_proxy="192.168.18.11:7890"
export http_proxy="192.168.18.11:7890"

```

方法二： 与宿主机共享网络时直接在容器内使用
创建容器时使用--network=host参数

然后在docker内设置代理，比如全局代理

export ALL_PROXY='socks5://127.0.0.1:1080'
这样就可以使用宿主机的代理了

但是要注意， 如果是用--network=host，这样的话使用 -p 参数映射端口就没用了， 即所有端口都是开放和宿主机共享的

方法三： 映射代理端口后直接在容器内使用
docker run时带参数-p映射代理的端口到容器， 在容器里面使用即可，比如：

docker run  -p 1080:1080 .....
export ALL_PROXY='socks5://127.0.0.1:1080'
方法四： docker配置全局代理，以在生成容器时自动设置代理变量
设置 docker 全局代理，比如设置了http://172.17.0.1:8123， 容器内全都会走这个代理，除了配置文件中的白名单里面的地址以外

docker容器使用代理

```bash
###docker-compose
args:
  - http_proxy=http://proxy.com
  - https_proxy=http://proxy.com
### Dockerfile 
ENV http_proxy http://myproxy:8080
ENV https_proxy http://myproxy:8080
##docker
docker run -e http_proxy=http://myproxy:8080 -e https_proxy=http://myproxy:8080 myimage

```

13.更新容器：

```shell
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -cR 
```



