## Want中后台脚手架
该项目使用[Create React App](https://github.com/facebook/create-react-app)创建。
###TypeScript
npx create-react-app my-app --template typescript

### 可用的脚本

在项目文件夹内，你可以执行这样的命令:

#### `yarn start`

以开发模式(dev)启动项目.<br />
在浏览器上打开 [http://localhost:3000](http://localhost:3000) 。

#### `yarn test`
运行测试脚本

#### `yarn build`

把你的项目打包到build文件夹内

### `yarn eject`
暴露配置文件

### 项目环境
`typescript` `ant-design 4.0 ` 

### 高级配置
#### 按需加载
[antd](https://ant.design/docs/react/use-in-typescript-cn#header)

[react-app-rewired](https://github.com/timarney/react-app-rewired)

当前customize-cra有bug，解决方案：

[Just tried customize-cra@next, it works now.](https://github.com/arackaf/customize-cra/issues/231)

#### less支持
[rewrite-less](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions)

## 项目目录（src）说明
```
- assets 静态资源
- common 公共的css和js
- components 公用组件
- layout  布局文件
- page 页面
App.tsx 项目根组件
index.less 入口css样式
Company.tsx 入口文件
menu.config.ts  侧边栏配置文件
router.tsx 路由渲染组件
```

### 侧边栏配置文件demo
```
  [
     {
 
         icon: 'iconbeijing',
         name:'二级路由',
         children: [
             {
                 path: '/demo/son1',
                 component: 'demo/index',
                 name:'子组件1',
                 icon: 'iconbeijing'
             },
             {
                 path: '/demo/son2',
                 component: 'demo/index2',
                 name:'子组件2',
                 icon: 'iconbeijing'
             }
         ]
     },
     {
 
         icon: 'iconbeijing',
         name:'一级路由',
         path:'/demo_n',
         component: 'demoNoChild/index',
     }
 ];
```
 

