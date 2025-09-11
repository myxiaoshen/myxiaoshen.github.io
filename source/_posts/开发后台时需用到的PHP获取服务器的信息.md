title: 开发后台时需用到的PHP获取服务器的信息
tags:
  - php
categories: []
date: 2017-08-11 14:53:00
---
相信做php的程序员做后台的时候会用到一些获取当前服务器的代码，已遍用户清楚的了解服务器的状态。以下是代码：

###### PHP版本：

``` bash
<?PHP echo PHP_VERSION; ?>

```
 <!-- more -->
###### ZEND版本：

``` bash
<?PHP echo zend_version(); ?>
```


###### 服务器操作系统
``` bash
<?PHP echo PHP_OS; ?>

```


###### mysql支持

``` bash
<?php echo function_exists (mysql_close)?"是":"否"; ?>
```

 

###### mysql最大连接数

``` bash
<?php
echo @get_cfg_var("mysql.max_links")==-1 ? "不限" : @get_cfg_var("mysql.max_links");
?>

```
###### 服务器执行时间
``` bash
<?PHP echo get_cfg_var("max_execution_time")."秒 "; ?>
```
###### 服务器系统时间
``` bash
echo date("Y-m-d G:i:s");

```