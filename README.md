<div align="center"> 
	<img alt="tianheng" width="200" height="200" src="https://raw.githubusercontent.com/coder-th/static/master/dynamic-avatar-1.svg" /><br/><br/>
	<br/>
  <h1 align="center">Mock平台</h1>
  <br>
</div>

## 技术栈

[![](<https://img.shields.io/github/stars/koajs/koa?color=rgb(46,190,50)&label=koa>)](https://github.com/koajs/koa)[![GitHub stars](https://img.shields.io/github/stars/lerna/lerna?color=green&label=Lerna)](https://github.com/lerna/lerna)[![GitHub stars](https://img.shields.io/github/stars/microsoft/TypeScript?color=blue&label=Typescript)](https://github.com/microsoft/TypeScript)[![GitHub stars](https://img.shields.io/github/stars/nuysoft/Mock?color=yellow&label=Mock)](https://github.com/nuysoft/Mock)

## 前言

项目诞生背景：由于后端使用的后端框架并不是一成不变的，以前的版本并不是按照现在通用的`Restful`风格去编写的，导致，前端想要编写`Mock`变得十分困难。虽然在内部已经有`Eolinker`这样的平台可以提供 mock，但是始终在线上，而且由于之前的限制，mock 就无法进行编写。

1 所以为了兼容，新旧项目，我们设想了一种情景，加入我有一个环境，可以让我自由编写，在每个不需要管理常用的中间件？我不用管理项目环境变量？能够跟`Eoliner`或者`Postman`一样拥有全局的前置或者后置脚本?能够，自由开启或者同时开启某些项目？

在这样一系列的需求下，我开发了一款适用于内部框架的 Mock 框架。注意，由于本项目是属于个人项目探索，所以，后期的使用者，可酌情考虑自身需求，决定是否使用。

## `预备知识`

> :warning:：使用本框架之前，你得了解对应的基础知识

- `lerna`: 一个项目管理工具，可以让你的项目从以前的单体应用变成多体应用集中管理。`lerna`的使用原理其实也就是`npm link + node_modules`或者`yarn workspaces`，lerna 的使用也十分的简单，相信你看了文档，几分钟就可以快速上手构建一个 lerna 应用推荐直接看[lerna 文档](https://lerna.js.org/)，或者去搜一下视频课程(PS: 课程不知道有哪些，笔者没看过相关的多体应用开发的视频，这里就没有推荐了哈)。

  当然，如果你不想通过工具帮你管理，你可以参考 vue3 的源码，可以知道直接用的就是 yarn workspaces，但是这样有个坏处就是，你安装依赖的时候，需要把 yarn workspaces 选项关闭。可能有更好的解决方案吧，这里就不再赘述了。直接上几条最常用的命令。

  ```shell
  # 全局安装lerna
  yarn add global lerna
  # 初始化项目
  lerna init
  # 创建一个子项目
  lerna create <name>
  # 每个项目安装依赖
  lerna bootstrap
  # 为每个子项目安装某个依赖
  lerna add -D ts-node
  # 为某个项目安装某个依赖
  lerna add <packageName> --scope=<projectName>
  # 执行所有项目的共同脚本（方式1）
  lerna run start
  # 执行所有项目的共同脚本（方式2）
  lerna exec yarn start
  # 执行某个项目的某个脚本
  lerna exec --scope <projectName> -- yarn start
  # 发布
  lerna publish
  ```

- `mock`

  学习怎么使用直接参考[文档](http://mockjs.com/examples.html)

- `typescript`
  学习怎么使用直接参考[文档](https://www.tslang.cn/docs/handbook/basic-types.html)

- `koa`

  学习怎么使用直接参考[文档](https://koajs.com/)

## 新增功能和解决的问题

- Cli(脚手架)自动创建项目的功能
- 修复路由模块化的问题(采用依赖收集和批量触发的方式可以参考 vue3 的`effect`收集和触发)
- 修复打包后`koa`依赖自带的`socket问题`(使用 rollup 的`commonJs`,打包的时候重写`ts`的配置)

## 配置约定

1. 每个子项目的名称需要是`@qy-mock/`开头的，比如你要创建`yuetu`项目，应该使用命令`lerna create @qy-mock/yuetu`。这样做的目的是为了方便项目管理，也是属于业界的规范。
2. 由于本框架，并没有做什么太多的变体，丝毫不影响你使用。完全可以说，你在`koa`的使用习惯，该怎么写就怎么写，完全不会影响，笔者只是对`koa`提供的一些方法进行扩展和抽取而已。至于，本质的东西还是`koa`，所以，本框架给使用者很大的自由度，你不喜欢使用本框架提供的方法，你完全可以不用本框架提供的 api。直接在一个`koa`的环境编写即可。这样，本框架，可以给你一个干干净净的`koa`服务器环境。
3. 值得注意的是，为了后期的项目维护，虽然使用者可以不用框架提供的 api，但是，项目架构希望还是能够按照本框架的要求进行。
4. 希望使用者记得，本框架原则只是为了提供一个便利的`mock`环境，每个子项目你想要什么技术栈或者方式去编写都可以。再啰嗦一句，请记得，我只是为你的项目环境提供了`koa`和`mock`环境，其他想要怎么做，就由使用者决定了。

## 起步

1. 确保您已经安装`lerna`，如果没有，请安装`yarn global add lerna`或者`npm install -g lerna`
2. 在根目录，安装依赖`yarn install`，然后运行`yarn bootstrap`为每个子项目安装依赖
3. 在根目录的`.env`文件中配置当前要启动的项目，项目名称使用你创建子项目的名称。比如

   ```js
   // .env
   MOCK_PROJECT = ["@qy-mock/tingshu"];
   ```

## 创建项目

### 命令式创建

如果您想要使用命令式创建项目，本项目已经为你准备好了一个脚本命令，您只要运行`yarn create:project`就会唤起脚手架，按照操作的提示输入你的期望，最终会帮你生成一个雏形的项目，默认已经帮你安装`@qy-mock/core`和`@qy-mock/shared`这两个包。然后在`.env`文件配置就可以，开启项目了。然后您就可以自由发挥了。

### 手动创建

当然，如果你想要自己创建项目也是可以的。您可以运行`lerna create <projectName>`进行创建，然后您自己改造好你想要的目录。

## 项目构建

本项目已经帮你写好了打包的配置和逻辑。您需要做的就是在根目录的`.env`文件中对应的配置项添加上你想要打包的项目就可以了。

rollup 打包后，你可以看到打包后的文件，直接在`node`环境执行就可以了，不用再去安装依赖什么的。如果在服务器，推荐使用`pm2`来执行，可以维持你的进程状态。

## 目录说明

```
qy-mock
├─ packages                    每一个项目的集中管理包
│  ├─ core                      核心包（为其他项目提供相关的api）
│  │  ├─ src
│  │  │  ├─ middlewares         内置的中间件
│  │  │  │  ├─ BodyParser.ts    post请求体数据的中间件
│  │  │  │  ├─ Cors.ts          跨域处理中间件
│  │  │  │  ├─ index.ts
│  │  │  │  └─ routerLog.ts     路由日志中间件
│  │  │  ├─ customFn.ts         自定义函数相关的api
│  │  │  ├─ event.ts            事件订阅通知的的相关api
│  │  │  ├─ globalData.ts       全局数据共享的api
│  │  │  ├─ http.ts             http请求的相关method
│  │  │  ├─ instance.ts         当前应用实例相关的api
│  │  │  ├─ lifecycle.ts        当前应用实例的生命周期
│  │  │  ├─ render.ts           应用挂载
│  │  │  ├─ routeEffect.ts      路由的收集和载入(做到懒加载)
│  │  │  ├─ router.ts           路由处理相关的api
│  │  │  ├─ types.ts            相关的类型定义
│  │  │  └─ utils.ts            一些工具函数
│  │  ├─ index.ts               应用核心包的主入口
│  │  ├─ package.json
│  │  └─ yarn.lock
│  ├─ shared                    所有项目共享的工具函数
│  │  ├─ src
│  │  │  ├─ logMsg.ts
│  │  │  └─ utils.ts
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  └─ yarn.lock
├─ scripts
│  ├─ create                    脚手架创建项目的核心文件
│  │  ├─ gen.js
│  │  ├─ index.js
│  │  └─ manage.js
│  ├─ helper
│  │  ├─ logMsg.js              日志打印的工具函数
│  │  ├─ pkgManage.js           子项目的管理工具函数
│  │  └─ utils.js
│  ├─ build.js                  打包的脚本文件
│  ├─ contants.js               项目打包或者运行的配置文件
│  └─ dev.js                    项目在开发环境时的脚本
├─ README.md
├─ lerna.json                   项目管理文件
├─ package.json
├─ rollup.config.js             打包配置文件
├─ tsconfig.json
└─ yarn.lock
```

​

## 框架手册

### 应用级别 API

> 相关的 api 集中在@qy-mock/core 进行管理，用户只需要使用即可。这样做目的可以让每个项目分工明确，达到隔离性目的

#### `createApp`

描述：创建一个应用

使用：

```typescript
import { createApp } from "@qy-mock/core";
const { app, mockApp } = createApp("tingshu");
```

#### `getCurrentAppInstance`

描述：获取当前 app 应用实例，可以拿到应用保存的相关信息和状态

使用

```typescript
import { getCurrentAppInstance } from "@qy-mock/core";
const appInstance = getCurrentAppInstance();
console.log(appInstance._port); // 23330
```

#### `mount`

描述：挂载当前应用,接收的参数是端口和挂在之后对应的处理函数

使用

```typescript
const { mount } = mockApp;
mount("23330");
```

#### `unmount`

描述: 卸载应用

使用

```typescript
const { unmount } = mockApp;
unmount();
```

### 数据共享

#### `provide`

描述: 向项目之间提供共享的变量，相当于`eolinker`的环境变量设置

使用：

```typescript
import { provide } from "@qy-mock/core";
provide("foo", { name: "qianyun" });
```

#### `inject`

描述: 向项目之间取到共享的变量，相当于`eolinker`的环境变量设置

使用:

```typescript
import { inject } from "@qy-mock/core";
inject("foo"); //{name: 'qianyun'}
```

### 应用通信

#### `emit`

描述: 为项目注册一个全局事件，基于发布订阅模式，通知对应的订阅者执行 handler，注意，在发射事件之前，请确保已经绑定好了该事件的监听函数

使用:

```typescript
import { emit } from "@qy-mock/core";
emit("add", { count: 10 });
```

#### `on`

描述： 监听对应某个事件，执行对应的处理函数

使用:

```typescript
import { on } from "@qy-mock/core";
on("add", (payload) => {
  console.log(payload.count); //10
});
```

### 生命周期

#### `beforeRouterMounted`

`router`挂载之前调用，注意，这时候由于`router`还没挂载，所以你是拿不到`router`的，函数携带的参数为当前的应用实例。

#### `routerMounted`

`router`挂载之后调用函数携带的参数为当前的应用实例和`router`

#### `routerBeforeUnmount`

`router`即将卸载的时候调用的函数

### 内置中间件

#### `Cors`

用于跨域请求的中间件

#### `RouterLogger`

用于打印出每个接口请求的日志，方便使用者进行观察和调试

#### `BodyParser`

统一转换 Post 请求体的数据

#### 说明

内置中间件目前内置这两个，如果使用想要做更多

- 只想要某些内置中间件，使用者可以在`createApp`函数，传入第二个参数，示例

  ```typescript
  const app = createApp("tingshu", { middlewares: ["RouterLogger"] });
  ```

- 想要扩展更多的中间件，

  使用者想要扩展的话，很简单，一句话，koa 怎么写扩展中间件，你就继续怎么写，你要明白的一件事，本框架只是稍微的对`koa`进行常用的封装，达到项目共享 api 的目的而已。

### 自定义函数

#### `setCustomFn`

描述: 使用者可以设置想要保存在项目中的函数，方便随时调用，注意，函数名如果同名，会默认保存最后一次的值。

使用:

```typescript
import { setCustomFn } from "@qy-mock/core";
setCustomFn("setToken", (ctx) => {
  ctx.cookies.set("name", "qianyun");
});
```

#### `getCustomFn`

描述： 获取存储在项目中的函数

使用:

```typescript
import { getCustomFn } from "@qy-mock/core";
const setToken = getCustomFn("setToken");
setToken();
```

#### `removeCustomFn`

描述: 删除在项目中存储的函数

使用：

```typescript
import { removeCustomFn } from "@qy-mock/core";
removeCustomFn("setToken");
```

### 进阶

#### `trackRoute`

用户可以自己收集你想要的存储的路由，具体使用你可以看函数的定义。该函数用处适用于熟悉框架本身的人，一般用不到

### `triggerRoute`

用户可以自己触发更新已经存储的路由，具体使用你可以看函数的定义。该函数用处适用于熟悉框架本身的人，一般用不到

### 框架封装的 Http 模块

#### `setBaseResponse`

描述：

如果响应的数据是一个简单的布尔类型或者数字类型，框架内部会自动捕获到，帮你自动返回响应成功

设置基本的响应体，默认的响应体结构如下:

返回`true`或者为真的数字，表示成功时:

```json
{
  "msg": "success",
  "data": 1,
  "resultCode": 1
}
```

返回`false`或者为真的数字，表示成功时:

```json
{
  "msg": "error",
  "data": 0,
  "resultCode": 0
}
```

请注意，以上是框架默认的响应体数据。如果使用者想要改变基本响应体或者对每一个响应体做对应的`transform`怎么办?这时候**`setBaseResponse`**提供了三个调用的钩子。

- `success`:传入一个对象或者一个处理函数(需要返回一个对象)，该对象会重置框架默认的**成功**响应体数据
- `fail`:传入一个对象或者一个处理函数(需要返回一个对象)，该对象会重置框架默认的**失败**响应体数据

- `customTransformer`:一个对所有响应体进行再次加工的函数。应用场景可在格式化你的数据结构。

**使用**

```typescript
import {createApp} from "@qy-mock/core"
const {mockApp} = createApp('tingshu')
mockApp.setBaseResponse({
  success: {data:"qianyun",code: 1},
  fail: ...,
  customTransformer:...
})
```

#### `mock`

框架内部集成了`MockJs`,使用者只需要调用就可以正常使用 mock 环境了

示例

```typescript
import { mock } from "@qy-mock/core";
mock("@cname"); //"杨平"
```

#### `mockArray`

描述： 根据规则`mock`出一个对应长度的数组

示例:

```typescript
import { mockArray } from "@qy-mock/core";
mockArray("@cname", 3); //["杨平","","天衡"]
```

#### `编写一个Mock模块`

框架内部帮你写好了五个请求，分别是`Get`,`Post`,`Delete`,`Put`,`Options`，使用方式一样的。接下来编写一个示例

```typescript
import { Get, Post, mock } from "@qy-mock/core";

class TestRouter {
  @Get("/mock/:id")
  getList(reqData) {
    // req框架帮你获取的对应数据
    return {
      data: {
        name: mock("@cname"),
      },
      resultCode: 1,
    };
  }
  @Post("/mock/:id")
  postComment(reqData) {
    return {
      data: {
        name: mock("@cname"),
      },
      resultCode: 1,
    };
  }
}

export default TestRouter;
```

> 注意： 你会看到每个方法都有个`reqData`内置参数，这是框架帮你捕获你这次请求的相关数据，在里面你可以拿到你的请求信息，作相应的处理。`reqData`有什么参数呢?

`reqData`拥有的参数为`query`，`url`,`method`,`header`,`params`,`body`。使用者根据自身需要，获取对应的数据即可。

#### `registerRouter`

描述： 当你写好了对应的路由模块，需要将它注册到框架中才能使用。理由：虽然内部已经帮你`track`过这个路由依赖，但是并没有进行`trigger`，如果不想通过`registerRouter`注册路由，也可以使用提供的`triggerRoute`触发你想要的路由

使用:

```typescript
import { createApp } from "@qy-mock/core";
const { mockApp } = createApp("tingshu");
mockApp.registerRouter(TestRouter).mount("23331");
```
