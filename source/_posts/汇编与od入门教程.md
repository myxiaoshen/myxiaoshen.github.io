title: 汇编与od入门教程
author: Believe firmly
tags:
  - 笔记
categories: []
date: 2018-12-02 17:16:00

---
> > zd整理的基础汇编教程（强推！）
>
> [原创]x64dbg使用详解-软件逆向-看雪论坛
> https://bbs.pediy.com/thread-272515.htm
>
> [原创]x64dbg反汇编技术 - 小白入门详解视频
> https://www.bilibili.com/video/BV1uU4y1f7HK
>
> [原创]在x64dbg中设置条件断点-软件逆向-看雪论坛
> https://bbs.pediy.com/thread-251385.htm
>
> [教程]x64dbg基本使用方法语音介绍及解锁某软件实战视频
>
> https://cloud.189.cn/web/share?code=YJbA32MNF3Uj
>
> https://pan.baidu.com/s/10dHejxa3Bfd9b_Q0W8qNOA

### 其他平台教程推荐

1：软件逆向教程--https://www.cnblogs.com/LyShark/ 

2：52系类教程--https://www.52pojie.cn/home.php?mod=space&uid=396495&do=thread&type=thread&view=me&from=space

3：视频教程--http://www.yxfzedu.com/course/0/0/1

4：溢出分析--https://www.freebuf.com/articles/system/195614.html，https://www.freebuf.com/articles/system/166500.html

5: x64dbg文本教程--https://morosedog.gitlab.io/categories/x64dbg/

6：x64dbg视频--https://www.52pojie.cn/thread-1337628-1-1.html

7: 大白补丁--https://www.52pojie.cn/thread-1337619-1-1.html

8：汇编基础入门--https://dyf.netlify.app/2019/12/08/assembly/

9： 52呱呱生汉化教程：https://www.52pojie.cn/thread-613071-1-1.html

### 0*01汇编指令
<img src="https://i.loli.net/2018/11/30/5c0094fd212fd.png"></img>
<!--more-->
1.数据传送指令

<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">功能</th><th style="text-align: center;">备注</th></tr></thead><tbody><tr><td style="text-align: center;">mov(MOV)</td><td style="text-align: center;">传送赋值</td><td style="text-align: center;">英文(move)&nbsp; &nbsp;&nbsp; &nbsp;例子:mov a,b 把b的值传给a(异或xor类似mov)</td></tr><tr><td style="text-align: center;">push(PUSH)</td>
<td style="text-align: center;">压栈</td><td style="text-align: center;">英文(Push noto the stack)</td></tr><tr><td style="text-align: center;">pop(POP)</td><td style="text-align: center;">出栈</td><td style="text-align: center;">英文(pop from the stack)&nbsp; &nbsp; 例子: 由于堆栈平衡原理,所以有push就有pop</td></tr><tr><td style="text-align: center;">xchg(XCHG)</td><td style="text-align: center;">交换</td><td style="text-align: center;">英文(Exchange)</td></tr></tbody></table>

2.寄存器传送指令
<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">功能</th><th style="text-align: center;">备注</th></tr></thead><tbody><tr><td style="text-align: center;">pushf(PUSHF)</td><td style="text-align: center;">标志进栈</td><td style="text-align: center;">英文(push the flag)</td></tr><tr><td style="text-align: center;">popf(POPF)</td><td style="text-align: center;">标志出栈</td><td style="text-align: center;">英文(pop the flag)</td></tr></tbody></table>
3.条件判断与空指令

<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">指令英文全拼</th><th style="text-align: center;">功能</th><th style="text-align: center;">备注</th></tr></thead><tbody><tr><td style="text-align: center;">jmp(JMP)</td><td style="text-align: center;">jump</td><td style="text-align: center;">无条件跳转</td><td style="text-align: center;">强制跳转</td></tr><tr><td style="text-align: center;">nop</td><td style="text-align: center;">NOP</td><td style="text-align: center;">空指令</td><td style="text-align: center;">通常用来覆盖跳转从而执行后面的程序</td></tr><tr><td style="text-align: center;">jz(JZ)/je(JE)</td><td style="text-align: center;">jump if zero,or equal</td><td style="text-align: center;">结果为0(相等)跳转</td><td style="text-align: center;">检测Z位</td></tr><tr><td style="text-align: center;">jnz(JNZ)/jne(JNE)</td><td style="text-align: center;">jump if not zero,or not equal</td><td style="text-align: center;">结果不为0(不相等)跳转</td><td style="text-align: center;">检测Z位</td></tr><tr><td style="text-align: center;">js(JS)</td><td style="text-align: center;">jump if sign</td><td style="text-align: center;">结果为负跳转</td><td style="text-align: center;">检测S位</td></tr><tr><td style="text-align: center;">jns(JNS)</td><td style="text-align: center;">jump if not sign</td><td style="text-align: center;">结果为正跳转</td><td style="text-align: center;">检测S位</td></tr><tr><td style="text-align: center;">jb(JB)</td><td style="text-align: center;">jump below</td><td style="text-align: center;">比较小于跳转</td><td style="text-align: center;">检测C位</td></tr><tr><td style="text-align: center;">jnb(JNB)</td><td style="text-align: center;">jump not below</td><td style="text-align: center;">比较大于或者等于跳转</td><td style="text-align: center;">检测C位</td></tr></tbody></table>

4.标志寄存器Z,S,C，O位解释

```bash
Z 零标志 -- 当结果为负时,SF=1,否则,SF=0.
S 符号标志----当结果为负时,SF=1;否则,SF=0.溢出时情形例外
C 进位标志----- 最高有效位产生进位值,例如,执行加法指令时,MSB有进位,置CF=1;否则,CF=0.
OF 溢出标志-----若操作数结果超出了机器能表示的范围,则产生溢出,置OF=1,否则,OF=0
```
<img src="https://i.loli.net/2018/12/04/5c05f60e0c817.png" alt="标志寄存器" data-bd-imgshare-binded="1">
用jnz去举例,jnz的判断检查Z位，当Z位是0的时候就跳转，在Z位是1的时候就不跳转

5.程序函数指令
<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">指令英文全拼</th><th style="text-align: center;">功能</th></tr></thead><tbody><tr><td style="text-align: center;">call(CALL)</td><td style="text-align: center;">CALL</td><td style="text-align: center;">调用子程序或者函数</td></tr><tr><td style="text-align: center;">ret(RET)</td><td style="text-align: center;">return</td><td style="text-align: center;">返回到</td></tr><tr><td style="text-align: center;">LOOP</td><td style="text-align: center;">LOPP</td><td style="text-align: center;">循环</td></tr></tbody></table>

6.算术指令

<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">功能</th></tr></thead><tbody><tr><td style="text-align: center;">add(ADD)</td><td style="text-align: center;">加法</td></tr><tr><td style="text-align: center;">sub(SUB) subr(SUBR)</td><td style="text-align: center;">减法</td></tr><tr><td style="text-align: center;">mul(MUL),imul</td><td style="text-align: center;">乘法</td></tr><tr><td style="text-align: center;">div(DIV) divr(DIVR) idiv</td><td style="text-align: center;">除法</td></tr><tr><td style="text-align: center;">inc dec</td><td style="text-align: center;">目标数+1，-1</td></tr><tr><td style="text-align: center;">and，or，xor</td><td style="text-align: center;">对两个操作数进行逻辑，异或操作</td></tr></tbody></table>

7.其他指令

<table><thead><tr><th style="text-align: center;">指令名称</th><th style="text-align: center;">功能</th></tr></thead><tbody><tr><td style="text-align: center;">lea(加载有效地址)</td><td style="text-align: center;">取值（也可做运算）</td></tr><td style="text-align: center;">PROC，ENDP（伪指令）</td><td style="text-align: center;">子程序入口，出口</td></tr></tbody></table>

8.字符串和数组

| 指令                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| MOVSB、MOVSW、MOVSD | 传送字符串数据：将 ESI 寻址的内存数据复制到 EDI 寻址的内存位置 |
| CMPSB、CMPSW、CMPSD | 比较字符串：比较分别由 ESI 和 EDI 寻址的内存数据             |
| SCASB、SCASW、SCASD | 扫描字符串：比较累加器 (AL、AX 或 EAX) 与 EDI 寻址的内存数据 |
| STOSB、STOSW、STOSD | 保存字符串数据：将累加器内容保存到 EDI 寻址的内存位置        |
| LODSB、LODSW、LODSD | 从字符串加载到累加器：将 ESI 寻址的内存数据加载到累加器      |

9.位移运算和循环

| SHL  | 左移     | ROR  | 循环右移         |
| ---- | -------- | ---- | ---------------- |
| SHR  | 右移     | RCL  | 带进位的循环左移 |
| SAL  | 算术左移 | RCR  | 带进位的循环右移 |
| SAR  | 算术右移 | SHLD | 双精度左移       |
| ROL  | 循环左移 | SHRD | 双精度右移       |

10.布尔和比较指令

| 操作 | 说明                                                        |
| ---- | ----------------------------------------------------------- |
| AND  | 源操作数和目的操作数进行逻辑与操作                          |
| OR   | 源操作数和目的操作数进行逻辑或操作                          |
| XOR  | 源操作数和目的操作数进行逻辑异或操作                        |
| NOT  | 对目标操作数进行逻辑非操作                                  |
| TEST | 源操作数和目的操作数进行逻辑与操作，并适当地设置 CPU 标志位 |

### 0*02快捷指令与功能图

功能栏
<img src="https://i.loli.net/2018/11/30/5c0095e679d85.png" alt="菜单窗口" data-bd-imgshare-binded="1"> 

<table><thead><tr><th style="text-align: center;">序号(编号)</th><th style="text-align: center;">功能</th><th style="text-align: center;">快捷键</th></tr></thead><tbody><tr><td style="text-align: center;">1</td><td style="text-align: center;">打开新的可执行文件</td><td style="text-align: center;">F3</td></tr><tr><td style="text-align: center;">2</td><td style="text-align: center;">重新载入程序</td><td style="text-align: center;">Ctrl+F2</td></tr><tr><td style="text-align: center;">3</td><td style="text-align: center;">关闭程序</td><td style="text-align: center;">Alt+F2</td></tr><tr><td style="text-align: center;">4</td><td style="text-align: center;">运行程序</td><td style="text-align: center;">F9</td></tr><tr><td style="text-align: center;">5</td><td style="text-align: center;">暂停正在运行的程序</td><td style="text-align: center;">F12</td></tr><tr><td style="text-align: center;">6</td><td style="text-align: center;">单步步入</td><td style="text-align: center;">F7</td></tr><tr><td style="text-align: center;">7</td><td style="text-align: center;">单步步过</td><td style="text-align: center;">F8</td></tr><tr><td style="text-align: center;">8</td><td style="text-align: center;">跟踪步入</td><td style="text-align: center;">Ctrl+F11</td></tr><tr><td style="text-align: center;">9</td><td style="text-align: center;">跟踪步过</td><td style="text-align: center;">Ctrl+F12</td></tr><tr><td style="text-align: center;">10</td><td style="text-align: center;">执行到返回</td><td style="text-align: center;">Ctrl+F9</td></tr><tr><td style="text-align: center;">11</td><td style="text-align: center;">转到反汇编窗口中的地址(转到表达式)</td><td style="text-align: center;">Ctrl+G</td></tr><tr><td style="text-align: center;">12</td><td style="text-align: center;">显示记录窗口</td><td style="text-align: center;">Alt+L</td></tr><tr><td style="text-align: center;">13</td><td style="text-align: center;">显示模块窗口</td><td style="text-align: center;">Alt+E</td></tr><tr><td style="text-align: center;">14</td><td style="text-align: center;">显示内存窗口</td><td style="text-align: center;">Alt+M</td></tr><tr><td style="text-align: center;">15</td><td style="text-align: center;">显示线程窗口</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">16</td><td style="text-align: center;">显示窗口</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">17</td><td style="text-align: center;">显示句柄窗口</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">18</td><td style="text-align: center;">显示CPU窗口</td><td style="text-align: center;">Alt+C</td></tr><tr><td style="text-align: center;">19</td><td style="text-align: center;">显示补丁窗口</td><td style="text-align: center;">Alt+P</td></tr><tr><td style="text-align: center;">20</td><td style="text-align: center;">显示调用堆栈窗口</td><td style="text-align: center;">Alt+K</td></tr><tr><td style="text-align: center;">21</td><td style="text-align: center;">显示断点窗口</td><td style="text-align: center;">Alt+B</td></tr><tr><td style="text-align: center;">22</td><td style="text-align: center;">显示参考窗口</td><td style="text-align: center;">Alt+R</td></tr><tr><td style="text-align: center;">23</td><td style="text-align: center;">显示Run跟踪窗口</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">24</td><td style="text-align: center;">显示源码窗口</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">25</td><td style="text-align: center;">调试选项</td><td style="text-align: center;">Alt+O</td></tr><tr><td style="text-align: center;">26</td><td style="text-align: center;">界面选项</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">27</td><td style="text-align: center;">帮助</td><td style="text-align: center;">无</td></tr><tr><td style="text-align: center;">补充</td><td style="text-align: center;">返回上一步</td><td style="text-align: center;">ESC</td></tr><tr><td style="text-align: center;">补充</td><td style="text-align: center;">书签</td><td style="text-align: center;">：</td></tr><tr><td style="text-align: center;">补充</td><td style="text-align: center;">回到入口地址</td><td style="text-align: center;">*</td><tr><td style="text-align: center;">补充</td><td style="text-align: center;">跳过</td><td style="text-align: center;">F4</td>
<tr><td style="text-align: center;">补充</td><td style="text-align: center;">断点</td><td style="text-align: center;">F2</td>


  


### 0*03常用逆向与win漏洞分析思路
整体破解思路：
找软件限制点->查壳脱壳->调试（入口调试、puls窗口、nop填充、二进制跳转、F4跳过当前F7跟进F8步过、善用插件）->过限制->打包

程序入口调试：附加进程->F8单步过找到软件启动项F7跟进调试（出现大变动右键脱壳调试）

F2断点调试：通过值位置设置断点过后F9运行，到断点处会卡住然后单步调，多注意查看寄存器窗口。

win漏洞分析思路：对应测试异常功能点->ID软件启动分析->溢出覆盖EIP->找EIP的偏移地址与量（mona）->确定JMP ESP缓冲大小 -> 设置nop缓冲池（一般在20左右）
![](https://image.3001.net/images/20180601/15278364441127.png!small)

以下windwos漏洞利用教程挺详细的可以学习：

     http://www.freebuf.com/articles/system/166500.html
#### 二进制安全
常见的二进制漏洞主要分为：栈溢出、堆溢出、整数溢出、格式化字符串、双重释放、释放重引用、数组访问越界、内核级、类型混淆、沙盒逃逸以及PRC等。详情访问[安全客](https://www.anquanke.com/post/id/168276)原文，二进制漏洞辅助工具[BinAbsInspector](https://github.com/KeenSecurityLab/BinAbsInspector)
![](https://p5.ssl.qhimg.com/t01d51bd0b4917445b0.jpg)
### python利用教程

![](https://s2.ax1x.com/2019/01/29/kQp9pT.png)

教程地址：  https://github.com/smartFlash/pySecurity