title: hackrf笔记本
author: Believe firmly
tags:

  - 笔记
  - 无线电
categories: []
date: 2019-01-04 16:56:00
---
### hackrf介绍
HackRF是一个在github上开源的硬件工程，由美国国防部高级研究（DRAPA）赞助开发。因为他是一个开源项目，在中国有许多厂商现在也在生产和销售HackRF，因为它可以满足大部分无限电爱好者的需求，我作为一个无线电刚接触没多久的新手，hackrf的性价比在同系列产品中一定是佼佼者。

![](http://www.2cto.com/uploadfile/Collfiles/20170715/20170715095119470.jpg)
![c501953f-4717-4eb4-b2f7-fd32c9e961cb](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/c501953f-4717-4eb4-b2f7-fd32c9e961cb.png)

![ab6b0267-c4a8-47a8-9d97-27db7eaf1925](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/ab6b0267-c4a8-47a8-9d97-27db7eaf1925.png)

目前无线电设备出名的的三款设备分别是USRP, BladeRF和HackRF ，下图为这三款设备的详细参数对比。详细见下图，HackRF的频率覆盖范围广，价格也比较便宜，美中不足的是仅为半双工(要不可以做一个雷达)，局限与USB2.0接口。
![f87fceeede572f6e21b7dd3d217c251f](https://cdn.jsdelivr.net/gh/myxiaoshen/mypic/img/f87fceeede572f6e21b7dd3d217c251f.png)


### RFCrack工具(依赖yard stick one)

这是一个无线电攻击工具它是为测试RF通信而开发的。它可以在低于4GHz频率的任何物理设备之间进行通信。物联网设备汽车，警报系统等..达到简化信号测试的目的。
先安装依赖（建议python2.7环境使用）
```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
sudo python get-pip.py    # 运行安装脚本
#RFCrack tested on OSX, should also work fine on Linux distros
#Install Pip:
easy install pip

#Install BitString
sudo pip install bitstring

#Install RFCat
git clone https://github.com/atlas0fd00m/rfcat.git
cd rfcat/
sudo python setup.py install
cd ../

#Install PyUSB:
git clone https://github.com/walac/pyusb.git
cd pyusb/
sudo python setup.py install

#Install LibUSB
pip install libusb

#Install Matolib:
sudo easy_install matplotlib

#Install Numpy:
pip install numpy

#python3 install future
sudo pip2.7 install future

#Plug in your device and run the following to verify it works:
rfcat -r


#That should be all you need
```

### 0*01 环境安装
1、首先，需要确保已经安装了所有必需的软件，可以使用发行版包管理器来安装大多数需要的软件以及相应的依赖文件。下面，我们先从hackRF所依赖的工具和库文件开始，在Debian或Ubuntu发行版上，可以通过下面指令安装它们我用的是hackrf与kali linux：
<!--more-->

     apt-get install gnuradio gnuradio-dev rtl-sdr librtlsdr-dev osmo-sdr libosmosdr-dev libosmocore libosmocore-dev cmake libboost-all-dev libcppunit-dev swig doxygen liblog4cpp5-dev python-scipy gr-osmosdr gqrx-sdr wireshark
 ```bash
 apt-get install hackrf libhackrf-dev libhackrf0
 ```-f
     
 2、成功安装这些库之后，就可以将hackrf插入到一个USB端口上，并执行指令hackrf_info，此时，应当会看到类似下面的内容：
 ```
 hackrf_info version: unknown
libhackrf version: unknown (0.5)
Found HackRF
Index: 0
Serial number: 0000000000000000069c69c82e351ed7
Board ID Number: 2 (HackRF One)
Firmware Version: 2018.01.1 (API:1.02)
Part ID Number: 0xa000cb3c 0x006a475d

 ```
3、编译gr-gsm
 ```bash
git clone https://github.com/ptrkrysik/gr-gsm.git
cd gr-gsm
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig 
 ```
 4、编译kalibrate 
 kalibrate-hackrf (kalibrate For HackRF)
 ```bash
   git clone https://github.com/scateu/kalibrate-hackrf.git
cd kalibrate-hackrf
./bootstrap
./configure
make
sudo make install

 ```
### 1*02 获取GSM信号
1、确定GSM 频率

每个国家所采用的每个操作码都使用GSM频率段中的不同的频率，通常是从900 Mhz开始。你可以使用hackrf_kalibrate找到你想嗅探的频率：
```bash
 kal -s GSM900 -g 40 -l 40
```

![](1.png)

在gr-gsm项目中，目录里有用于扫描、解码gsm流量的脚本：
![](2.png)
      


### 1*03 信号捕获

1 确定当前手机接入基站
手机在连入GSM基站时，我们可通过一些方式确定自己手机连入的是哪个基站、ARFCN是多少，安卓手机在2G状态时，可在键盘拨号界面输入：

```
*#*#4636#*#*  
Samsung (Android) : *#*#197328640#*#* or *#0011#
iPhone (all) : *3001#12345#*拨号
HTC (Android) : *#*#7262626#*#*

```
进去以后能找到基站的MCC、MNC、ARFCN这些参数。
```
MCC 移动国家码

MNC Mobile Network Code，移动网络码，共2位，中国联通GSM系统使用01，中国移动GSM系统使用02

ARFCN 绝对无线频道编号（Absolute Radio Frequency Channel Number – ARFCN ），是在GSM无线系统中，用来鉴别特殊射频通道的编号方案。

手机开机后，即搜索广播控制信道（BCCH）的载频。因为系统随时都向在小区中的各用户发送出用广播控制信息。手机收集到最强的（BCCH）对应的载频频率后，读取频率校正信道（FCCH），使手机（MS）的频率与之同步。所以每一个用户的手机在不同的位置（即不同的小区）的载频是固定的，它是由GSM网络运营商组网时确定，而不是由用户的GSM手机来决定。

手机读取同步信道（SCH）的信息后找出基地站（BTS）的认别码，并同步到超高帧TDMA的帧号上。手机在处理呼叫前要读取系统的信息。如：领近小区的情况、现在所处小区的使用频率及小区是否可以使用移动系统的国家号码和网络号码等等，这些信息都以BCCH上得到。

手机在请求接入信道（RACH）上发出接入请求的信息，向系统传送SIM卡帐号等信息。系统在鉴权合格后，通过允许接入信道（AGCH）使GSM手机接入信道上并分配给GSM手机一个独立专用控制信道（SDCCH）。手机在SDCCH上完成登记。在慢速随路控制信道（SACCH）上发出控制指令。然后手机返回空闲状态，并监听BCCH和CCCH公共控制信道上的信息。
```

确定当前基站的下行频率(输入ARFCN )：
打开http://www.cellmapper.net/arfcn.php

获取Downlink Frequency 下行频率 (base station to phone)  ：937.4 MHz 写作：937400000
![](4.png)

捕获下行数据包

### 1*04 嗅探数据 
     grgsm_livemon -f 954.2
![](3.png)
```bash
   sudo wireshark -k -Y 'gsmtap && !icmp' -i lo
```
![](5.png)

### 1*05 解密数据
```
grgsm_capture.py -h
linux; GNU C++ version 4.8.4; Boost_105400; UHD_003.010.git-197-g053111dc

Usage: grgsm_capture.py [options]

RTL-SDR capturing app of gr-gsm.

Options:
  -h, --help            show this help message and exit //打印帮助信息
  -f FC, --fc=FC        Set frequency [default=none] //设定捕获数据的中心频率
  -a ARFCN, --arfcn=ARFCN  //设定ARFCN
                        Set ARFCN instead of frequency. In some cases you may
                        have to provide the GSM band also
  -g GAIN, --gain=GAIN  Set gain [default=30] //设定gain
  -s SAMP_RATE, --samp-rate=SAMP_RATE  //设定采样率 默认2M
                        Set samp_rate [default=2M]
  -p PPM, --ppm=PPM     Set ppm [default=0]
  -b BURST_FILE, --burst-file=BURST_FILE
                        File where the captured bursts are saved
  -c CFILE, --cfile=CFILE
                        File where the captured data are saved
  --band=BAND           Specify the GSM band for the frequency. Available
                        bands are: P-GSM, DCS1800, PCS1900, E-GSM, R-GSM,
                        GSM450, GSM480, GSM850. If no band is specified, it
                        will be determined automatically, defaulting to 0.
  --args=ARGS           Set device arguments [default=]
  -v, --verbose         If set, the captured bursts are printed to stdout
  -T REC_LENGTH, --rec-length=REC_LENGTH
                        Set length of recording in seconds [default=none]

```
吧捕获的数据保存再sms文件里面
```bash
grgsm_capture -g 40 -a 12 -s 1000000 -c sms.cfile -T 20
```
命令执行后可以用另外一部手机给接入ARFCN 12基站的手机打电话、发短信，这样我们就实现了捕获通话过程中的语音、短信数据包。
![](6.png)

查看一下是否文件存在数据
```bash
ls -lah sms.cfile
```
![](7.png)





### 2*01 重放信号
1、首先我们要先去获取相应的信号了。这里首先需要捕获的无线信号的频率，这样才能展开下面的攻击。如果在windows下面，可以使用sdrsharp-x86这一款软件，而如果在linux下，就可以使用gqrx这款软件了。
![](http://5b0988e595225.cdn.sohucs.com/images/20170802/a9e340ac86604924b8234ed6b2630f6d.jpeg)

2、收集无线信号：
接下来所需要做的就是获取信号的频率了，这里需要通过不断尝试才能获取到相应的频率。通过寻找，我们发现信号频率在315MHZ附近.


找到所需要的频率之后，接下来的操作就是录制这个无线信号了。我们先将hackrf插入电脑，通过hackrf_info指令确定hackrf已经和电脑成功连接可以使用。然后在终端内键入如下命令来录制的无线信号：
```bash
hackrf_transfer -r doorbell.raw -f 315000000 -g 16 -l 32 -a 1 -s 8000000 -b 4000000
```
这是hackrf命令翻译
```bash
[-r] <filename> #  把接收到的信号、数据保存到文件中；
 
[-t] <filename> # 从文件中提取、发射射频信号；
 
[-w] # 接收数据到WVA头中
 
[-f freq_hz] #设定播放的频率
 
[-i if_freq_hz] # 中频段 (IF) inHz [2150MHz to 2750MHz].
 
[-o lo_freq_hz] # 前端本地振荡器频率 inHz [84MHz to 5400MHz].
 
[-a amp_enable] # 选择播放接收功能
1=Enable, 0=Disable.

[-p antenna_enable] # 天线口功率, 1=Enable, 0=Disable.
 
[-l gain_db] # 接收低噪声放大器（IF）增益, 0-40dB, 8dB steps
 
[-g gain_db] # 接收VGA（基带）增益, 0-62dB, 2dB steps
 
[-x gain_db] # 发送VGA（基带）增益0-47dB, 1dB steps
 
[-s sample_rate_hz] # 赫兹采样率(8/10/12.5/16/20MHz, default 10MHz).
 
[-n num_samples] # 传送样本数 (默认是无限的).
 
[-c amplitude] # CW信号源模式，振幅0-127（DAC直流值）.
 
[-b baseband_filter_bw_hz] 设置基带滤波器带宽。

```
在录制一段时间之后结束信号的录制，在对应的文件夹下面可以找到录制成功的文件。这里需要注意的是如果信号的录制没有完全，或者录制的时候干扰过大，会导致录制出来的信号会有畸变。这时需要对信号进行波形分析，观察信号是否有明显的畸变，所谓的畸变就是由于干扰，导致信号的高低无法分辨，即无法判断出信号是否为0或者1。所以需要对信号进行重新录制，否则实验是无法成功的。

在对信号进行观察的时候需要使用相应的波形观测软件，这里使用的是Audacity
打开程序后点选“文件”—“导入”—“原始数据”— 配置如下:
![](https://images2015.cnblogs.com/blog/640760/201601/640760-20160127174503348-1229387674.png)
导入频率文件之后，对其进行放大。就可以观察到频率信号的具体情况了。如下图所示：
![](https://images2015.cnblogs.com/blog/640760/201601/640760-20160127174528020-656556185.png)

3、通过命令来播放门铃信号重放文件为录制好的信号（-R 循环重放）：
```bash
hackrf_transfer -t doorbell.raw -f314100000 -x 47 -a 1 -s 8000000 -b 4000000
```

### 2*02 实现实时广播
1.打开收音机，调到你所在地区的任意广播频道，记下频率，如98.0Mhz。
开始录制：

    hackrf_transfer -r 1.raw -f 98000000 -g 30 -l 24 -a 1 -p 1 -s 8000000 -b 4000000
开始重放：

     hackrf_transfer -t 1.raw -f 98000000 -x 32 -a 1 -p 1 -s 8000000 -b 4000000 -R
这时收音机里会重复播放你刚刚录制的那一段声音。



2.在gnuradio里打开这个grc文件，配置成下图所示：

![](https://image.3001.net/images/20170709/14995851898989.png!small)
[grc样本：4pc2](https://pan.baidu.com/s/192UNJrZstzZlJ-nzL7cZeA)
3.在Wav File Source里选择自己的音乐（注：应该为wav格式且采样率为44100 Hz），点击execute即可开始广播。


### 3*01 GPS欺骗
请在原文查看：https://blog.csdn.net/OpenSourceSDR/article/details/51968678
下载编译gps-sdr-sim

因为我的OSX系统下使用MacPorts安装了gcc5，xcode默认安装的gcc是/usr/bin/gcc，所以直接make可能会提示找不到omp.h文件因为调用的是xcode的gcc(苹果xcode安装的gcc很多程序都无法成功编译)，那么按照下面的步骤即可正常安装。
```
  git clone https://github.com/osqzss/gps-sdr-sim.git
  cd gps-sdr-sim
  gcc-mp-5 gpssim.c -lm -O3 -o gps-sdr-sim
```