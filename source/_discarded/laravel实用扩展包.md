layout: larave实用扩展包
title: 让自己的larave更简洁更智能
tags:
  - laravel
  - ide
categories: []
date: 2017-08-09 12:06:00
---
###### Laraval IDE 自动补全助手：Laravel IDE Helper Generator
怎么说呢这个工具对于大佬来说当然不是有很大的作用，但可以在实际用节省一些时间，或多或少还是好的，而且也便于学习。对于我来说第一时间就想到了这个扩展包哈哈。安装方法参考laravel学院，还有一些细节处理。
 <!-- more -->

1.在项目目录输入composer命令安装扩展包
``` bash
composer require barryvdh/laravel-ide-helper
```
2.然后在config/app.php的providers类中注册服务提供者
``` bash
Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
```
3.生成Laraval IDE补全信息的文件
``` bash
php artisan ide-helper:generate
```
4.刷新并更新扩展包 
``` bash
composer update
```
5.在composer.json文件下做自动加载配置
``` bash
    "scripts":{
        "post-update-cmd": [
            "php artisan clear-compiled",
            "php artisan ide-helper:generate",
            "php artisan optimize"
        ]
    }
```
######  API 扩展包：Dingo API
后期开发api的神器，轻松、快捷的构建自己的API，里面也包含了各种工具<br>
安装方法和上面类似详细请百度这里做推荐



##### Material Theme UI主题

![](https://plugins.jetbrains.com/files/8006/screenshot_17526.png)
