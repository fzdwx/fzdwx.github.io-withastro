---
title: "安装双系统"
date: "2023-04-26T20:46:49+08:00"
layout: "blog"
tags: [linux]
---

> 记录安装双系统时遇到的问题以及解决方法.

1. 准备工作: 一台安装有windows的电脑, 一块U盘(包含有目标 linux 的 iso 文件), 一个新的固态
2. USB 启动安装 linux, 我这里用的是 archlinux, 直接用内置的 `archinstall` 安装即可
3. 使用 grub 引导
    - 参考: <https://blog.csdn.net/Dr39276/article/details/128341190>
    - <https://zhuanlan.zhihu.com/p/138951848>
4. 安装完成后没有声音: `yay -S sof-firmware alsa-ucm-conf`

软件方面:

1. wm: <https://github.com/fzdwx/dwm>
2. compositor: <https://yaocc.cc/linuxpicomanimation/>
