---
title: "字体压缩"
date: "2023-04-20T18:50:35+08:00"
layout: "blog"
tags: [font]
---

压缩前后字体的大小对比如下：

![压缩前](/images/2023-04-20-18-53-12.png)
![压缩后](/images/2023-04-20-18-58-22.png)

主要是压缩了 f1 与 jinkai 这两个字体, f1 这个字体由于我之用到了几个字符所以很小, 大概思路:

1. 首先定义一个包含所需字符的常用字符集
2. 使用 pyftsubset 命令压缩字体，然后将输出的 ttf 文件使用 woff2 进行压缩

```shell
pyftsubset input.ttf --output-file=output.ttf --text-file=subset.txt
woff2_compress output.ttf
```
