---
title: "如何在 go-zero 中实现 curd 的自动化生成"
date: "2023-04-18T14:29:40+08:00"
layout: "blog"
tags: [go]
---

go-zero 提供了一个很好用的工具 goctl, 可以生成一些模板代码, 例如根据.api 文件生成 type、route、handle、logic 以及根据 table 生成 model 代码

然而, 对于像我们这样的 curd boy 而言, goctl 缺少了一个很重要的功能, 就是根据 table dsl 生成 curd 的逻辑, 而这在 Java 生态中是一个很基础的功能（Mybatis）.

个人猜测这可能跟 go 中各种 ORM 框架百花齐放的原因有关, 且 go-zero 也并没有强制使用某个 ORM 框架, 所以社区就没有实现这个功能.

**如何实现?**

其实很简单, goctl 已经提供了解析 .api 文件以及读取 table dsl 的功能, 我们只需要将它们结合起来即可.

具体的实现步骤如下:

1. 解析 .api 文件
2. 读取 table 信息
3. 通过 table 信息映射出 add, update, delete, page, get 等功能对应的 request 以及 response 的类型并放入 apiSpec 中
4. 添加 route 到 apiSpec 中
5. 定义 logic template, 这个是跟 ORM 强相关的, 需要根据情况来实现
6. 生成 type, handle, logic 等代码
7. 生成替换原有的 .api 文件, 我这里是将 curd 的 api 信息放在了单独的组中, 以便于区分. 在解析时可以通过自定义属性来设置
8. 生成 route

除此之外, 还可以加一些扩展功能, 比如根据请求类型的 tag 来生成 SQL 语句的 where 条件, 目前我这边是默认为 eq

以上就是实现这个功能的大概思路, 代码就不放出来丢人了...
