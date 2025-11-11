title: 初学FluxAdmin开发指导
tags:

  - 开发
  - 经验
categories: []
date: 2025-08-26 18:24:00
---

---
# 前言

💡最近闲着无聊逛github发现一个基于FastApi的开发框架FluxPanel虽然这玩意儿是基于ruoyi-vue-python开发的但轮子上面造轮子应该会更牛逼吧，下面我就已一个初学者的身份带大家入门[FluxPanel](https://github.com/Richard0403/FluxPanel)。带你一步步从零开始，安装环境、了解架构让你能够让这个框架用于学习。

> ps:其他的开源项目同理的思路大家多变通,入门了还是要有自己检索资料与学习的能力。也要多用ai之类的工具让自己的编码效率提升

👤FluxPanel是一个构建在强大的[FastAPI](https://www.google.com/url?sa=E&q=https%3A%2F%2Ffastapi.tiangolo.com%2F)之上的现代化Web开发框架。FastAPI以快速的开发速度和易用性而闻名，它利用了现代Python的诸多特性，如类型提示和异步编程，接口也可以一并生成，使得开发过程既快速又愉快。可以把FastAPI想象成一辆性能炸裂的跑车引擎，而FluxPanel呢，就是我们为这台引擎量身打造的、装好了酷炫外壳、舒适座椅和智能导航的完整跑车！我们把那些新手一见就头疼的、重复性的“造轮子”工作都帮你干了。你只需要踩下油门，专注于你的创意和业务逻辑，剩下的交给FluxPanel就好。

## FluxPanel简介

懒得copy了放个图意思一下，大家可以直接去项目地址查看：https://github.com/Richard0403/FluxPanel

![image-20250821141154847](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821141154847.png)

## 安装与环境设置

⚠️这里开发工具的安装[python](https://www.python.org/downloads/windows/)、[git](https://git-scm.com/downloads)、navicat premium、phpstudy、[pycharm](https://linux.do/t/topic/653353),pip的包可以通过[wingetui](https://wingetui.com/)去图形化管理，git版本控制命令不好记建议用[github desktop](https://github.com/robotze/GithubDesktopZhTool)这些就不再累述了，都是找到安装包下一步就行。这里重点说一下 [nvm](https://github.com/nvm-sh/nvm) 全程下一步就行（它是一个 nodejs 的版本管理工具。通过它可以安装和切换不同版本的 nodejs，解决 node 各种版本存在不兼容现象。），然后去添加环境变量![image-20250821144937045](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821144937045.png)

```bash
nvm ls available  #查可装版本
nvm ls #查以安装版本
nvm use #切换版本
#下载失败的话切换到国内镜像如下手动安装直接复制到nvm目录下改名就行
nvm node_mirror https://npmmirror.com/mirrors/node/ 
nvm npm_mirror https://npmmirror.com/mirrors/npm/ 
```

<!--more-->

安装完成过后类似下图：

![image-20250821163923095](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821163923095.png)

>  小技巧：因为开发很多国外的库和依赖建议配置一个系统环境变量与ide里面配置一个代理。python解释器也是再设置里面可以找到。

![image-20250821181829638](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821181829638.png)

>  小提示：
>
> + 所有通过 `npm install` 安装的依赖都会放在 `node_modules` 文件夹中。`package.json` 记录了项目需要的依赖及版本。`package-lock.json` 锁定了具体安装的版本，确保团队一致性。
>
> - python使用虚拟环境（推荐）：`项目目录/venv/` 或 `.venv/` 中的 `lib` 或 `site-packages`，如果没有虚拟环境则会安装到系统的 Python 环境中（不推荐）

## 框架初始化与依赖

接下来我们根据文档先把项目跑起来。打开cmd，先找一个项目路径git拉取项目

![image-20250821143715382](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821143715382.png)

### 导入项目

pycharm从文件夹打开项目，GitHub桌面客户端也打开当前这个项目目录，mysql与redis测试直接用小皮面板快速起一个。

> **git的作用**：方便跟踪文件的每一次修改，支持回退到任意历史版本，后期多人也可以在不同的分支上开发，互不干扰主要用于修改bug开发新功能，最终可以将各自的工作合并到主分支。帮助是非常的大，初学者一定要熟练掌握。刚开始只需要知道它可以让本地和远程仓库都有完整的代码历史，防止误操作与数据丢失。-b选项可以指定分支。
>
> 比如说有个项目你想参与开发可以先fork一份到自己的仓库，然后clone到本地进行开发，后续编码过程中避免与main分支冲突可以创建一个a分支，以后开发都在a分支开发（如果依赖main分支开发前尽量先sync或者pull一下main分支保持与上游代码不冲突）,a分支开发完成过后可mergs到自己仓库的main分支，确定无误过后就可以通过push吧本地的代码推送到远程仓库与其他成员协作，后续还可以吧代码合并过后的分支main或者a都行只要没有冲突 请求上游项目所有者Pull你的分支，对方可以在Pull requests中看到提交的请求审核通过过后即可合并分支，代码贡献就结束了。

![](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250821183849887.png)

### 依赖安装

> win终端的小技巧：用PowerShell 7最新的版本去代替日常cmd终端可以自定义记录常用的命令与智能tab检索提示非常的便捷。需要先安装加载文件中的依赖如PSReadLine、PSCompletions、Terminal-Icons、posh-git等喜欢的依赖
>
> 终端历史预测文件：notepad "$env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
>
> 终端启动加载文件：notepad $profile

这里我直接吧官方的文档搬过来！

前端

```bash
# 进入前端目录
cd flux-frontend

# 安装依赖
npm install 或 yarn --registry=https://registry.npmmirror.com

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev 或 yarn dev
```

后端

```bash
# 进入后端目录
cd flux-backend
# 安装依赖环境, 建议使用aconda， python版本推荐3.11
pip3 install -r requirements.txt

# 配置环境
在.env.dev（开发环境）文件中配置开发环境的数据库和redis，
.env.prod未正式环境使用， 复制.env.prod-templates文件改名即可

# 运行sql文件
1.新建数据库flux-data(默认，可修改)
2.使用命令或数据库连接工具运行sql文件夹下的flux-data.sql

# 运行后端
python3 app.py --env=dev

```

![image-20250822133527277](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250822133527277.png)

前后端都启动了过后就可以访问前台了。

> 多通过F12开发者工具调试常用的如下
>
> **1. 元素检查与调试：**可以查看和实时编辑网页的HTML结构与CSS样式，便于定位和修改页面布局问题。
> **2. 控制台（Console）：**用于输出日志、查看错误信息，并可直接执行JavaScript代码，方便调试脚本逻辑。
> **3. 网络监控（Network）：**此功能调试的时候会高频使用，可以分析网页加载过程中的所有网络请求，包括请求时间、状态码、资源大小等，有助于优化性能和排查接口问题。
>
> <img src="https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250822152739986.png" alt="image-20250822152739986" style="zoom:50%;" />
>
> **4. 安全与存储：**查看和管理Cookies、LocalStorage、SessionStorage等本地存储数据，以及调试安全相关的请求头和证书信息。

![image-20250822143028126](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250822143028126.png)

```tcl
# 默认账号密码
账号：admin
密码：admin123

# 浏览器访问
地址：http://localhost:80
```

## 架构梳理

完成导入项目过后让我们一起简单了解一下架构方便后期我们寻找编码位置。

### 后端flux-backen

#### 目录结构

<pre class="px-2 py-1.5 has-[code]:rounded-md has-[code]:!bg-[#e5e5e5] has-[div]:bg-transparent has-[div]:!p-0 has-[code]:text-stone-900 dark:has-[code]:!bg-[#242424] has-[code]:dark:text-white [&amp;_code]:block [&amp;_code]:border-none [&amp;_code]:bg-transparent [&amp;_code]:p-0"><div class="group relative cursor-pointer overflow-x-auto rounded-md bg-[#f2f1f0] p-4 transition-colors hover:bg-[#ededed] dark:bg-[#1f1f1f] dark:hover:bg-[#242424]" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r5i»" data-state="closed"><div class="flex justify-center"><svg aria-roledescription="flowchart-v2" role="graphics-document document" viewBox="0 0 3458.4140625 1087.3551025390625" style="max-width: 3458.41px; touch-action: none; user-select: none; cursor: grab;" class="flowchart" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="mermaid-6kp37r5ewda" preserveAspectRatio="xMidYMid meet"><style>#mermaid-6kp37r5ewda{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-6kp37r5ewda .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-6kp37r5ewda .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-6kp37r5ewda .error-icon{fill:#333;}#mermaid-6kp37r5ewda .error-text{fill:#cccccc;stroke:#cccccc;}#mermaid-6kp37r5ewda .edge-thickness-normal{stroke-width:1px;}#mermaid-6kp37r5ewda .edge-thickness-thick{stroke-width:3.5px;}#mermaid-6kp37r5ewda .edge-pattern-solid{stroke-dasharray:0;}#mermaid-6kp37r5ewda .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-6kp37r5ewda .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-6kp37r5ewda .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-6kp37r5ewda .marker{fill:#666;stroke:#666;}#mermaid-6kp37r5ewda .marker.cross{stroke:#666;}#mermaid-6kp37r5ewda svg{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:16px;}#mermaid-6kp37r5ewda p{margin:0;}#mermaid-6kp37r5ewda .label{font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;color:#fff;}#mermaid-6kp37r5ewda .cluster-label text{fill:#fff;}#mermaid-6kp37r5ewda .cluster-label span{color:#fff;}#mermaid-6kp37r5ewda .cluster-label span p{background-color:transparent;}#mermaid-6kp37r5ewda .label text,#mermaid-6kp37r5ewda span{fill:#fff;color:#fff;}#mermaid-6kp37r5ewda .node rect,#mermaid-6kp37r5ewda .node circle,#mermaid-6kp37r5ewda .node ellipse,#mermaid-6kp37r5ewda .node polygon,#mermaid-6kp37r5ewda .node path{fill:#111;stroke:#222;stroke-width:1px;}#mermaid-6kp37r5ewda .rough-node .label text,#mermaid-6kp37r5ewda .node .label text,#mermaid-6kp37r5ewda .image-shape .label,#mermaid-6kp37r5ewda .icon-shape .label{text-anchor:middle;}#mermaid-6kp37r5ewda .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-6kp37r5ewda .rough-node .label,#mermaid-6kp37r5ewda .node .label,#mermaid-6kp37r5ewda .image-shape .label,#mermaid-6kp37r5ewda .icon-shape .label{text-align:center;}#mermaid-6kp37r5ewda .node.clickable{cursor:pointer;}#mermaid-6kp37r5ewda .root .anchor path{fill:#666!important;stroke-width:0;stroke:#666;}#mermaid-6kp37r5ewda .arrowheadPath{fill:#0b0b0b;}#mermaid-6kp37r5ewda .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-6kp37r5ewda .flowchart-link{stroke:#666;fill:none;}#mermaid-6kp37r5ewda .edgeLabel{background-color:#161616;text-align:center;}#mermaid-6kp37r5ewda .edgeLabel p{background-color:#161616;}#mermaid-6kp37r5ewda .edgeLabel rect{opacity:0.5;background-color:#161616;fill:#161616;}#mermaid-6kp37r5ewda .labelBkg{background-color:rgba(22, 22, 22, 0.5);}#mermaid-6kp37r5ewda .cluster rect{fill:#161616;stroke:#222;stroke-width:1px;}#mermaid-6kp37r5ewda .cluster text{fill:#fff;}#mermaid-6kp37r5ewda .cluster span{color:#fff;}#mermaid-6kp37r5ewda div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica;font-size:12px;background:#333;border:1px solid hsl(0, 0%, 10%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-6kp37r5ewda .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-6kp37r5ewda rect.text{fill:none;stroke-width:0;}#mermaid-6kp37r5ewda .icon-shape,#mermaid-6kp37r5ewda .image-shape{background-color:#161616;text-align:center;}#mermaid-6kp37r5ewda .icon-shape p,#mermaid-6kp37r5ewda .image-shape p{background-color:#161616;padding:2px;}#mermaid-6kp37r5ewda .icon-shape rect,#mermaid-6kp37r5ewda .image-shape rect{opacity:0.5;background-color:#161616;fill:#161616;}#mermaid-6kp37r5ewda :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-6kp37r5ewda_flowchart-v2-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"><g data-look="classic" id="subGraph7" class="cluster"><rect height="104" width="218.6458282470703" y="492" x="3036.416664123535" style=""></rect><g transform="translate(3113.7395782470703, 492)" class="cluster-label"><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>外部服务</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph6" class="cluster"><rect height="125.35514831542969" width="1916.4348888397217" y="954" x="1533.9791660308838" style=""></rect><g transform="translate(2452.1966104507446, 954)" class="cluster-label"><foreignObject height="24" width="80"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>数据存储层</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph5" class="cluster"><rect height="128" width="995.013011932373" y="314" x="2346.0546875" style=""></rect><g transform="translate(2811.5611934661865, 314)" class="cluster-label"><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>核心模块</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph4" class="cluster"><rect height="125.35514831542969" width="1470.4739570617676" y="954" x="43.50520896911621" style=""></rect><g transform="translate(709.3359375, 954)" class="cluster-label"><foreignObject height="24" width="138.8125"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>数据访问层 (DAOs)</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph3" class="cluster"><rect height="104" width="1673.4791660308838" y="800" x="16" style=""></rect><g transform="translate(789.8854150772095, 800)" class="cluster-label"><foreignObject height="24" width="125.70833587646484"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>服务层 (Services)</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph2" class="cluster"><rect height="104" width="2317.984375" y="646" x="8" style=""></rect><g transform="translate(1085.2890625, 646)" class="cluster-label"><foreignObject height="24" width="163.40625"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>控制器层 (Controllers)</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph1" class="cluster"><rect height="282" width="2285.5546875" y="314" x="40.5" style=""></rect><g transform="translate(1159.27734375, 314)" class="cluster-label"><foreignObject height="24" width="48"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>路由层</p></span></div></foreignObject></g></g><g data-look="classic" id="subGraph0" class="cluster"><rect height="256" width="1272.7604141235352" y="8" x="1597.984375" style=""></rect><g transform="translate(2194.3645820617676, 8)" class="cluster-label"><foreignObject height="24" width="80"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>应用入口层</p></span></div></foreignObject></g></g></g><g class="edgePaths"><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_App_Server_0" d="M2531.711,111L2531.711,115.167C2531.711,119.333,2531.711,127.667,2531.711,135.333C2531.711,143,2531.711,150,2531.711,153.5L2531.711,157"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Server_RouterManager_0" d="M2441.799,206.439L2307.83,216.032C2173.861,225.626,1905.923,244.813,1771.954,258.573C1637.984,272.333,1637.984,280.667,1637.984,289C1637.984,297.333,1637.984,305.667,1637.984,313.333C1637.984,321,1637.984,328,1637.984,331.5L1637.984,335"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_RouterManager_AdminRouter_0" d="M1536.401,387.956L1444.501,396.964C1352.601,405.971,1168.8,423.985,1076.9,437.159C985,450.333,985,458.667,985,467C985,475.333,985,483.667,985,491.333C985,499,985,506,985,509.5L985,513"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_RouterManager_AppRouter_0" d="M1739.568,389.63L1815.804,398.359C1892.04,407.087,2044.512,424.543,2120.748,437.438C2196.984,450.333,2196.984,458.667,2196.984,467C2196.984,475.333,2196.984,483.667,2196.984,491.333C2196.984,499,2196.984,506,2196.984,509.5L2196.984,513"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_LoginController_0" d="M915,548.174L781.333,556.145C647.667,564.116,380.333,580.058,246.667,592.196C113,604.333,113,612.667,113,621C113,629.333,113,637.667,113,645.333C113,653,113,660,113,663.5L113,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_UserController_0" d="M915,549.465L815.667,557.221C716.333,564.977,517.667,580.488,418.333,592.411C319,604.333,319,612.667,319,621C319,629.333,319,637.667,319,645.333C319,653,319,660,319,663.5L319,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_RoleController_0" d="M915,552.198L852.667,559.498C790.333,566.799,665.667,581.399,603.333,592.866C541,604.333,541,612.667,541,621C541,629.333,541,637.667,541,645.333C541,653,541,660,541,663.5L541,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_MenuController_0" d="M915,560.396L889.667,566.33C864.333,572.264,813.667,584.132,788.333,594.233C763,604.333,763,612.667,763,621C763,629.333,763,637.667,763,645.333C763,653,763,660,763,663.5L763,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_DeptController_0" d="M985,571L985,575.167C985,579.333,985,587.667,985,596C985,604.333,985,612.667,985,621C985,629.333,985,637.667,985,645.333C985,653,985,660,985,663.5L985,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_GenController_0" d="M1055,560.396L1080.333,566.33C1105.667,572.264,1156.333,584.132,1181.667,594.233C1207,604.333,1207,612.667,1207,621C1207,629.333,1207,637.667,1207,645.333C1207,653,1207,660,1207,663.5L1207,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_ImportController_0" d="M1055,550.766L1132.997,558.305C1210.995,565.844,1366.99,580.922,1444.987,592.628C1522.984,604.333,1522.984,612.667,1522.984,621C1522.984,629.333,1522.984,637.667,1522.984,645.333C1522.984,653,1522.984,660,1522.984,663.5L1522.984,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_TableController_0" d="M1055,548.79L1169.997,556.658C1284.995,564.526,1514.99,580.263,1629.987,592.298C1744.984,604.333,1744.984,612.667,1744.984,621C1744.984,629.333,1744.984,637.667,1744.984,645.333C1744.984,653,1744.984,660,1744.984,663.5L1744.984,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AdminRouter_FormController_0" d="M1055,547.707L1206.997,555.756C1358.995,563.805,1662.99,579.902,1814.987,592.118C1966.984,604.333,1966.984,612.667,1966.984,621C1966.984,629.333,1966.984,637.667,1966.984,645.333C1966.984,653,1966.984,660,1966.984,663.5L1966.984,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_AppRouter_AppLoginController_0" d="M2196.984,571L2196.984,575.167C2196.984,579.333,2196.984,587.667,2196.984,596C2196.984,604.333,2196.984,612.667,2196.984,621C2196.984,629.333,2196.984,637.667,2196.984,645.333C2196.984,653,2196.984,660,2196.984,663.5L2196.984,667"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_LoginController_LoginService_0" d="M113,725L113,729.167C113,733.333,113,741.667,113,750C113,758.333,113,766.667,113,775C113,783.333,113,791.667,113,799.333C113,807,113,814,113,817.5L113,821"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_UserController_UserService_0" d="M319,725L319,729.167C319,733.333,319,741.667,319,750C319,758.333,319,766.667,319,775C319,783.333,319,791.667,319,799.333C319,807,319,814,319,817.5L319,821"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_ImportController_ImportService_0" d="M1522.984,725L1522.984,729.167C1522.984,733.333,1522.984,741.667,1522.984,750C1522.984,758.333,1522.984,766.667,1522.984,775C1522.984,783.333,1522.984,791.667,1522.984,799.333C1522.984,807,1522.984,814,1522.984,817.5L1522.984,821"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_GenController_GenService_0" d="M1207,725L1207,729.167C1207,733.333,1207,741.667,1207,750C1207,758.333,1207,766.667,1207,775C1207,783.333,1207,791.667,1207,799.333C1207,807,1207,814,1207,817.5L1207,821"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_LoginService_UserDAO_0" d="M113,879L113,883.167C113,887.333,113,895.667,113,904C113,912.333,113,920.667,113,929C113,937.333,113,945.667,122.343,955.437C131.685,965.207,150.37,976.413,159.713,982.017L169.055,987.62"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_UserService_UserDAO_0" d="M319,879L319,883.167C319,887.333,319,895.667,319,904C319,912.333,319,920.667,319,929C319,937.333,319,945.667,309.938,955.429C300.876,965.192,282.752,976.384,273.691,981.98L264.629,987.576"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_ImportService_ImportDAO_0" d="M1466.91,879L1458.257,883.167C1449.603,887.333,1432.296,895.667,1423.643,904C1414.99,912.333,1414.99,920.667,1414.99,929C1414.99,937.333,1414.99,945.667,1414.99,955.113C1414.99,964.559,1414.99,975.118,1414.99,980.398L1414.99,985.678"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_GenService_GenDAO_0" d="M1207,879L1207,883.167C1207,887.333,1207,895.667,1207,904C1207,912.333,1207,920.667,1207,929C1207,937.333,1207,945.667,1207,955.113C1207,964.559,1207,975.118,1207,980.398L1207,985.678"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Server_Config_0" d="M2477.686,239L2471.914,243.167C2466.142,247.333,2454.598,255.667,2448.827,264C2443.055,272.333,2443.055,280.667,2443.055,289C2443.055,297.333,2443.055,305.667,2443.055,313.333C2443.055,321,2443.055,328,2443.055,331.5L2443.055,335"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Server_Middlewares_0" d="M2595.825,239L2602.675,243.167C2609.525,247.333,2623.225,255.667,2630.075,264C2636.924,272.333,2636.924,280.667,2636.924,289C2636.924,297.333,2636.924,305.667,2636.924,313.333C2636.924,321,2636.924,328,2636.924,331.5L2636.924,335"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Server_Exceptions_0" d="M2621.622,218.472L2658.557,226.06C2695.492,233.648,2769.362,248.824,2806.297,260.579C2843.232,272.333,2843.232,280.667,2843.232,289C2843.232,297.333,2843.232,305.667,2843.232,313.333C2843.232,321,2843.232,328,2843.232,331.5L2843.232,335"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Services_Utils_0" d="M3146.93,221.934L3127.386,228.945C3107.843,235.956,3068.756,249.978,3049.213,261.156C3029.669,272.333,3029.669,280.667,3029.669,289C3029.669,297.333,3029.669,305.667,3029.669,313.333C3029.669,321,3029.669,328,3029.669,331.5L3029.669,335"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_DAOs_MySQL_0" d="M2458.922,879L2458.922,883.167C2458.922,887.333,2458.922,895.667,2458.922,904C2458.922,912.333,2458.922,920.667,2458.922,929C2458.922,937.333,2458.922,945.667,2575.084,959.416C2691.247,973.166,2923.572,992.332,3039.734,1001.915L3155.896,1011.498"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Services_Redis_0" d="M3269.211,223.951L3286.25,230.626C3303.289,237.301,3337.367,250.65,3354.406,261.492C3371.445,272.333,3371.445,280.667,3371.445,289C3371.445,297.333,3371.445,305.667,3371.445,320.5C3371.445,335.333,3371.445,356.667,3371.445,378C3371.445,399.333,3371.445,420.667,3371.445,435.5C3371.445,450.333,3371.445,458.667,3371.445,467C3371.445,475.333,3371.445,483.667,3371.445,496.5C3371.445,509.333,3371.445,526.667,3371.445,544C3371.445,561.333,3371.445,578.667,3371.445,591.5C3371.445,604.333,3371.445,612.667,3371.445,621C3371.445,629.333,3371.445,637.667,3371.445,650.5C3371.445,663.333,3371.445,680.667,3371.445,698C3371.445,715.333,3371.445,732.667,3371.445,745.5C3371.445,758.333,3371.445,766.667,3371.445,775C3371.445,783.333,3371.445,791.667,3371.445,804.5C3371.445,817.333,3371.445,834.667,3371.445,852C3371.445,869.333,3371.445,886.667,3371.445,899.5C3371.445,912.333,3371.445,920.667,3371.445,929C3371.445,937.333,3371.445,945.667,3371.445,953.782C3371.445,961.897,3371.445,969.794,3371.445,973.743L3371.445,977.691"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_ImportService_FileStorage_0" d="M1579.059,879L1587.712,883.167C1596.365,887.333,1613.672,895.667,1622.326,904C1630.979,912.333,1630.979,920.667,1630.979,929C1630.979,937.333,1630.979,945.667,1630.979,955.113C1630.979,964.559,1630.979,975.118,1630.979,980.398L1630.979,985.678"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_MCPServer_OpenAI_0" d="M3174.232,417L3169.483,421.167C3164.734,425.333,3155.237,433.667,3150.488,442C3145.74,450.333,3145.74,458.667,3145.74,467C3145.74,475.333,3145.74,483.667,3145.74,491.333C3145.74,499,3145.74,506,3145.74,509.5L3145.74,513"></path><path marker-end="url(#mermaid-6kp37r5ewda_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_MCPServer_MySQL_0" d="M3253.038,417L3256.709,421.167C3260.379,425.333,3267.721,433.667,3271.392,442C3275.062,450.333,3275.062,458.667,3275.062,467C3275.062,475.333,3275.062,483.667,3275.062,496.5C3275.062,509.333,3275.062,526.667,3275.062,544C3275.062,561.333,3275.062,578.667,3275.062,591.5C3275.062,604.333,3275.062,612.667,3275.062,621C3275.062,629.333,3275.062,637.667,3275.062,650.5C3275.062,663.333,3275.062,680.667,3275.062,698C3275.062,715.333,3275.062,732.667,3275.062,745.5C3275.062,758.333,3275.062,766.667,3275.062,775C3275.062,783.333,3275.062,791.667,3275.062,804.5C3275.062,817.333,3275.062,834.667,3275.062,852C3275.062,869.333,3275.062,886.667,3275.062,899.5C3275.062,912.333,3275.062,920.667,3275.062,929C3275.062,937.333,3275.062,945.667,3271.739,953.855C3268.415,962.044,3261.768,970.088,3258.445,974.11L3255.121,978.133"></path></g><g class="edgeLabels"><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g transform="translate(2531.7109375, 72)" id="flowchart-App-0" class="node default"><rect height="78" width="124" y="-39" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>app.py<br>启动脚本</p></span></div></foreignObject></g></g><g transform="translate(2531.7109375, 200)" id="flowchart-Server-1" class="node default"><rect height="78" width="179.8229217529297" y="-39" x="-89.91146087646484" style="" class="basic label-container"></rect><g transform="translate(-59.911460876464844, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="119.82292175292969"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>server.py<br>FastAPI应用入口</p></span></div></foreignObject></g></g><g transform="translate(1637.984375, 378)" id="flowchart-RouterManager-3" class="node default"><rect height="78" width="203.1666717529297" y="-39" x="-101.58333587646484" style="" class="basic label-container"></rect><g transform="translate(-71.58333587646484, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="143.1666717529297"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>router_manager.py<br>路由管理器</p></span></div></foreignObject></g></g><g transform="translate(985, 544)" id="flowchart-AdminRouter-5" class="node default"><rect height="54" width="140" y="-27" x="-70" style="" class="basic label-container"></rect><g transform="translate(-40, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="80"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>管理端路由</p></span></div></foreignObject></g></g><g transform="translate(2196.984375, 544)" id="flowchart-AppRouter-7" class="node default"><rect height="54" width="140" y="-27" x="-70" style="" class="basic label-container"></rect><g transform="translate(-40, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="80"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>移动端路由</p></span></div></foreignObject></g></g><g transform="translate(113, 698)" id="flowchart-LoginController-9" class="node default"><rect height="54" width="140" y="-27" x="-70" style="" class="basic label-container"></rect><g transform="translate(-40, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="80"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>登录控制器</p></span></div></foreignObject></g></g><g transform="translate(319, 698)" id="flowchart-UserController-11" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>用户管理控制器</p></span></div></foreignObject></g></g><g transform="translate(541, 698)" id="flowchart-RoleController-13" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>角色管理控制器</p></span></div></foreignObject></g></g><g transform="translate(763, 698)" id="flowchart-MenuController-15" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>菜单管理控制器</p></span></div></foreignObject></g></g><g transform="translate(985, 698)" id="flowchart-DeptController-17" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>部门管理控制器</p></span></div></foreignObject></g></g><g transform="translate(1207, 698)" id="flowchart-GenController-19" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>代码生成控制器</p></span></div></foreignObject></g></g><g transform="translate(1522.984375, 698)" id="flowchart-ImportController-21" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>数据导入控制器</p></span></div></foreignObject></g></g><g transform="translate(1744.984375, 698)" id="flowchart-TableController-23" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>表格管理控制器</p></span></div></foreignObject></g></g><g transform="translate(1966.984375, 698)" id="flowchart-FormController-25" class="node default"><rect height="54" width="172" y="-27" x="-86" style="" class="basic label-container"></rect><g transform="translate(-56, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="112"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>表单构建控制器</p></span></div></foreignObject></g></g><g transform="translate(2196.984375, 698)" id="flowchart-AppLoginController-27" class="node default"><rect height="54" width="188" y="-27" x="-94" style="" class="basic label-container"></rect><g transform="translate(-64, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="128"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>移动端登录控制器</p></span></div></foreignObject></g></g><g transform="translate(113, 852)" id="flowchart-LoginService-29" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>登录服务</p></span></div></foreignObject></g></g><g transform="translate(319, 852)" id="flowchart-UserService-31" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>用户服务</p></span></div></foreignObject></g></g><g transform="translate(1522.984375, 852)" id="flowchart-ImportService-33" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>导入服务</p></span></div></foreignObject></g></g><g transform="translate(1207, 852)" id="flowchart-GenService-35" class="node default"><rect height="54" width="156" y="-27" x="-78" style="" class="basic label-container"></rect><g transform="translate(-48, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="96"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>代码生成服务</p></span></div></foreignObject></g></g><g transform="translate(217.50260162353516, 1016.6775741577148)" id="flowchart-UserDAO-37" class="node default"><rect height="54" width="127.97917175292969" y="-27" x="-63.989585876464844" style="" class="basic label-container"></rect><g transform="translate(-33.989585876464844, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="67.97917175292969"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>用户DAO</p></span></div></foreignObject></g></g><g transform="translate(1414.9895839691162, 1016.6775741577148)" id="flowchart-ImportDAO-41" class="node default"><rect height="54" width="127.97917175292969" y="-27" x="-63.989585876464844" style="" class="basic label-container"></rect><g transform="translate(-33.989585876464844, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="67.97917175292969"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>导入DAO</p></span></div></foreignObject></g></g><g transform="translate(1207, 1016.6775741577148)" id="flowchart-GenDAO-43" class="node default"><rect height="54" width="159.9791717529297" y="-27" x="-79.98958587646484" style="" class="basic label-container"></rect><g transform="translate(-49.989585876464844, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="99.97917175292969"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>代码生成DAO</p></span></div></foreignObject></g></g><g transform="translate(2443.0546875, 378)" id="flowchart-Config-44" class="node default"><rect height="78" width="124" y="-39" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>config/<br>配置管理</p></span></div></foreignObject></g></g><g transform="translate(3029.6692657470703, 378)" id="flowchart-Utils-45" class="node default"><rect height="78" width="124" y="-39" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>utils/<br>工具类库</p></span></div></foreignObject></g></g><g transform="translate(2843.2317657470703, 378)" id="flowchart-Exceptions-46" class="node default"><rect height="78" width="148.875" y="-39" x="-74.4375" style="" class="basic label-container"></rect><g transform="translate(-44.4375, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="88.875"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>exceptions/<br>异常处理</p></span></div></foreignObject></g></g><g transform="translate(2636.924476623535, 378)" id="flowchart-Middlewares-47" class="node default"><rect height="78" width="163.73958587646484" y="-39" x="-81.86979293823242" style="" class="basic label-container"></rect><g transform="translate(-51.86979293823242, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="103.73958587646484"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>middlewares/<br>中间件</p></span></div></foreignObject></g></g><g transform="translate(3218.6796798706055, 378)" id="flowchart-MCPServer-48" class="node default"><rect height="78" width="154.02083587646484" y="-39" x="-77.01041793823242" style="" class="basic label-container"></rect><g transform="translate(-47.01041793823242, -24)" style="" class="label"><rect></rect><foreignObject height="48" width="94.02083587646484"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>mcp_server/<br>AI集成模块</p></span></div></foreignObject></g></g><g transform="translate(3218.6796798706055, 1016.6775741577148)" id="flowchart-MySQL-49" class="node default"><path transform="translate(-58.796875, -37.67757310318176)" style="" class="basic label-container" d="M0,12.11838206878784 a58.796875,12.11838206878784 0,0,0 117.59375,0 a58.796875,12.11838206878784 0,0,0 -117.59375,0 l0,51.11838206878784 a58.796875,12.11838206878784 0,0,0 117.59375,0 l0,-51.11838206878784"></path><g transform="translate(-51.296875, -2)" style="" class="label"><rect></rect><foreignObject height="24" width="102.59375"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>MySQL数据库</p></span></div></foreignObject></g></g><g transform="translate(3371.4453048706055, 1016.6775741577148)" id="flowchart-Redis-50" class="node default"><path transform="translate(-43.96875, -34.986498385676555)" style="" class="basic label-container" d="M0,10.3243322571177 a43.96875,10.3243322571177 0,0,0 87.9375,0 a43.96875,10.3243322571177 0,0,0 -87.9375,0 l0,49.3243322571177 a43.96875,10.3243322571177 0,0,0 87.9375,0 l0,-49.3243322571177"></path><g transform="translate(-36.46875, -2)" style="" class="label"><rect></rect><foreignObject height="24" width="72.9375"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Redis缓存</p></span></div></foreignObject></g></g><g transform="translate(1630.9791660308838, 1016.6775741577148)" id="flowchart-FileStorage-51" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>文件存储</p></span></div></foreignObject></g></g><g transform="translate(3145.7395782470703, 544)" id="flowchart-OpenAI-52" class="node default"><rect height="54" width="148.64583587646484" y="-27" x="-74.32291793823242" style="" class="basic label-container"></rect><g transform="translate(-44.32291793823242, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="88.64583587646484"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>OpenAI API</p></span></div></foreignObject></g></g><g transform="translate(3208.0703086853027, 200)" id="flowchart-Services-59" class="node default"><rect height="54" width="122.28125" y="-27" x="-61.140625" style="" class="basic label-container"></rect><g transform="translate(-31.140625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="62.28125"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Services</p></span></div></foreignObject></g></g><g transform="translate(2458.921869277954, 852)" id="flowchart-DAOs-61" class="node default"><rect height="54" width="103.38541793823242" y="-27" x="-51.69270896911621" style="" class="basic label-container"></rect><g transform="translate(-21.69270896911621, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="43.38541793823242"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>DAOs</p></span></div></foreignObject></g></g></g></g></g></svg></div><div class="bg-input-dark absolute right-2 top-2 rounded-sm p-1 opacity-0 transition-opacity group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="light:text-gray-800 text-white dark:text-white"><path d="M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z"></path></svg></div></div></pre>

关键目录结构

- **`config/`** - 配置管理，定义应用、数据库、JWT等各种配置类 

- **`router/`** - 路由管理，统一注册和管理所有API路由 

- **`module_admin/`** - 系统管理模块，包含用户、角色、菜单等核心业务功能

- **`module_gen/`** - 代码生成模块，自动生成前后端CRUD代码 

- **`module_app/`** - 移动端应用模块，处理微信等移动端相关功能

- **`module_website/`** - 官网模块，处理产品官网页面展示 home_controller.py:26-44

- **`module_task/`** - 定时任务模块，管理系统定时任务

- **`mcp_server/`** - AI集成模块，基于MCP协议实现AI问答功能 

- **`sub_applications/`** - 子应用管理，挂载静态文件等子应用

- **`utils/`** - 工具类库，提供各种通用工具函数

- **`sql/`** - 数据库脚本，包含初始化数据和表结构 

- **`exceptions/`** - 异常处理，定义全局异常处理逻辑

- **`middlewares/`** - 中间件，处理请求拦截、日志记录等

关键根目录文件

- **`server.py`** - FastAPI应用的核心入口文件

- **`app.py`** - Uvicorn服务器启动脚本
- ***`.env.prod-templates`**-配置文件模板可以复制多个用于切换环境如新建一个.env.dev开发环境用于开发
- **`requirements.txt`** - Python依赖包清单

#### 后期编码

因为FluxPanel支持自动代码生成功能 ，可以根据数据库表结构自动生成Controller、Service、DAO等代码，这能大大提高开发效率。建议优先使用代码生成功能来创建基础的CRUD功能，然后在生成的代码基础上进行定制化开发。

### 前端flux-frontend

![2764acef53108978478d23c9d80d5abc](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/2764acef53108978478d23c9d80d5abc.png)

#### 目录结构

 **`/src` - 源代码主目录**

这是前端应用的核心源代码目录，包含所有业务逻辑和组件。

**`/src/views` - 页面视图目录**

存放所有页面组件，按业务模块组织：

- `system/` - 系统管理页面
- `monitor/` - 系统监控页面
- `tool/` - 工具页面（如代码生成器）
- `dashboard/` - 仪表板页面 
- `register.vue` - 注册页面 

**`/src/layout` - 布局组件目录**

存放应用的整体布局组件：

- `components/AppMain.vue` - 主内容区域组件
- `components/Navbar` - 顶部导航栏
- `components/TagsView/` - 标签页视图组件 

**`/src/components` - 公共组件目录**

存放可复用的Vue组件：

- `HeaderSearch/` - 头部搜索组件
- `ImportData/` - 数据导入组件

**`/src/assets` - 静态资源目录**

存放样式文件和静态资源：

- `styles/`

  \- 样式文件目录

  - `index.scss` - 全局样式 
  - `sidebar.scss` - 侧边栏样式 
  - `variables.module.scss` - SCSS变量定义 

**`/src/utils` - 工具函数目录**

存放通用工具函数： 

- 参数处理、路径处理等通用函数

关键根目录文件

- `package.json` - 项目依赖和脚本配置`index.html` - 应用入口HTML文件



## 系统常用功能点

### 接口调用

FastAPI 默认会自动文档页面，FluxPanel集成了 OAuth2、JWT封装到了系统工具->系统菜单下，可以在此界面很方便的完成接口查看与测试。下面这张图我用测试业务来做测试，通过后台调试获取到Authorization的JWT值可以正常通过接口返回json信息。后期我们就可以通过接口传入前端了如：web、小程序、app等支持**RESTful API**的程序。

> | REST 原则     | FastAPI 实现方式                                             |
> | ------------- | ------------------------------------------------------------ |
> | **资源路径**  | 使用 `/items/`、`/users/{id}` 等路径表示资源                 |
> | **HTTP 方法** | 使用 `GET`(获取信息)、`POST`(表单提交)、`PUT`(修改更新)、`DELETE`（删除）等方法处理不同操作 |
> | **状态码**    | 自动或手动返回标准 HTTP 状态码（如 200、401、404、422）      |
> | **无状态性**  | 每个请求独立处理，不依赖前一个请求状态                       |
> | **统一接口**  | 使用 JSON 格式作为请求和响应体，结构清晰                     |

![image-20250825122105867](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250825122105867.png)
点击接口文档界面的Try it out按钮可以进行在线调试也非常的方便。
![image-20250825122650848](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250825122650848.png)

### 代码生成

fluxpanel可以生成后台的MVC代码，前端通过Vue生成CRUD界面与对应的API客户端模块用于HTTP通信,生成菜单在系统工具->代码生成 。下方是创建表后生成的代码，具体解释查看注释，还是非常的清晰明了。

![image-20250825185039097](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250825185039097.png)

>controller.py - API控制器层，处理HTTP请求和响应
>service.py - 业务逻辑层，实现具体的业务处理
>dao.py - 数据访问层，直接与数据库交互
>do.py - 数据对象（Data Object），对应数据库表结构的实体类
>vo.py - 视图对象（View Object），用于API请求和响应的数据传输对象
>index.vue - Vue组件页面，提供完整的CRUD界面
>api.js - API客户端模块，封装与后端的HTTP通信

生成完毕过后需要手动复制文件夹中的代码到指定位置`python\*`->`flux-backend\module_admin`、`Vue`->`\flux-frontend\src`、sql的文件直接执行就行（执行了sql文件过后会插入到` sys_menu`与`sys_table`表中发现重复了可以去里面删除），最后去`flux-backend/router/router_manager.py`文件注册路由不然访问不了后端接口。后续需要更改菜单样式以及接口路径移动到系统管理->菜单管理下。图是我用测试的数据粘贴的一张表用于演示，实际用的时候需要结合业务场景去建表。后续的表单也是同样的道理大家自行摸索。

![image-20250825184947076](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250825184947076.png)

大致的框架有了后续通过代码生成、表单构建、Axios、fastapi官方的文档就可以进行愉快的开发啦。

## dmeo演示

接下来继续来演示下前后端的交互，让大家能够充分的利用api接口达到自己想要的目标与学习开发。我用常用的html来演示一下登录模块的逻辑这里需要结合前端的知识通过Axios异步提交到后端，并返回数据。HTML如下

```html
<!--需要先加载axios依赖-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!--demoform表单-->
 <form class="account-form">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">账号</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password">
                                <label for="floatingPassword">密码</label>
                            </div>
                        
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="captchaInput" placeholder="验证码">
                                <label for="captchaInput">验证码</label>
                                <img id="captchaImg" src="" alt="验证码" style="cursor:pointer;margin-top:10px;">
                            </div>

                            <div class="form-group">
                                <div class="d-flex justify-content-between flex-wrap pt-sm-2">
                                    <div class="checkgroup">
                                        <input type="checkbox" name="remember" id="remember">
                                        <label for="remember">Remember Me</label>
                                    </div>
                                    <a href="forgot-pass.html">Forgot Password?</a>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="d-block default-btn move-top"><span>Signin Now</span></button>
                            </div>
                        </form>
```

关键js如下

```javascript
// 等待页面完全加载后再执行
document.addEventListener('DOMContentLoaded', function() {

    // 验证码加载函数
    function loadCaptcha() {
        axios.get('http://127.0.0.1:9099/captchaImage')
            .then(function (response) {
                const captchaImg = document.getElementById('captchaImg');
                captchaImg.src = 'data:image/png;base64,' + response.data.img;
                captchaImg.setAttribute('data-uuid', response.data.uuid);
            })
            .catch(function () {
                document.getElementById('captchaImg').src = '';
            });
    }

    // 页面加载时获取验证码
    loadCaptcha();

    // 验证码图片点击刷新
    const captchaImg = document.getElementById('captchaImg');
    if (captchaImg) {
        captchaImg.onclick = loadCaptcha;
    }

    // 表单提交事件
    const form = document.querySelector('.account-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('floatingInput').value;
            const password = document.getElementById('floatingPassword').value;
            const code = document.getElementById('captchaInput').value;
            const uuid = document.getElementById('captchaImg').getAttribute('data-uuid');

            // 验证必填项
            if (!username || !password || !code) {
                alert('请填写完整的登录信息');
                return;
            }

            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', username);
            params.append('password', password); // 直接使用明文密码，不加密
            params.append('code', code);
            params.append('uuid', uuid);

            axios.post('http://127.0.0.1:9099/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                const data = response.data;
                if (data.token) {
                    // 保存token和其他用户信息
                    localStorage.setItem('access_token', data.access_token);
                    if (data.user_info) {
                        localStorage.setItem('user_info', JSON.stringify(data.user_info));
                    }
                    if (data.username) {
                        localStorage.setItem('username', data.username);
                    }

                    alert('登录成功');
                    // 跳转到author页面
                    window.location.href = 'author.html';
                } else {
                    alert('登录失败：未获取到访问令牌');
                }
            })
            .catch(function (error) {
                console.error('登录错误:', error);
                alert('登录失败: ' + (error.response?.data?.msg || error.response?.data?.detail || error.message));
                loadCaptcha(); // 刷新验证码
            });
        });
    }
});
```

运行F12测试可以看到已经成功完成了鉴权

![image-20250826180108439](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/image-20250826180108439.png)

上述代码理解含义就行，大家有这个思路就行。后期多通过与ai对话也能够很快的写出上述逻辑。GET、PUT等那些也是同样的道理通过ajax，没有什么是一把俊不能解决的！ai工具日常笔者用的github copilot（agnet模式必要时使用mcp介入）+cli（结构梳理与排错）+openspec（规范驱动开发）。

⭐总之一个简单的流程就是这样，以后有需求就可以通过网上找寻开源项目通过ai分析再自己理解项目的运行方式与编码的位置就可以二开了，觉得前端麻烦的也可以用市面上的低代码框架如：PagePlug、**[Refine](https://refine.dev/)**。现在这个时代都是站到ai与前辈们的肩膀上写代码了已经大大降低了开发门槛只要思维到位就可以发挥自己的创作，一起code起来叭。

