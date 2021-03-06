# vue-myblog

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.21-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.4.5-brightgreen.svg" alt="element-ui">
  </a>
</p>

## 简介

[vue-myblog](https://github.com/lizhouwei/vue-myblog) 是一个后台管理系统，它基于 [vue](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)等前端技术栈 

 
**注意：该项目使用 element-ui@2.3.0+ 版本，所以最低兼容 vuecil@3.0**
  

## 功能

```
|- 登录 / 注销
|
|- 系统管理
  |- 用户管理
    |-用户列表
    |-用户添加
    |-用户编辑
    |-用户删除
  |  
  |- 角色管理
    |-角色添加
    |-角色编辑
    |-角色删除
    |-角色权限
  |  
  |- 权限管理
    |-权限列表
    |-权限添加
    |-权限编辑
    |-权限删除
```
## 組件
```
- 組件
  - 表格组件
  - 树组件
```

## 开发

```bash
# 克隆项目
git clone https://github.com/lizhouwei/vue-myblog.git

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

浏览器访问 http://localhost:8081

## 发布

```bash
# 构建测试环境
npm run build

```

## 其它

```bash
# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
 