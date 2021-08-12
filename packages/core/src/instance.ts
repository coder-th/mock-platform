import { createInvokeHooks } from "./lifecycle";
import { createRouter, registerRouter, setupRouter } from "./router";
import { MockApp, MockConfig } from "../types";
import { setupMiddleware } from "./middlewares";
import { createRender } from "./render";
import { removeAllEvents } from "./event";
import { setBaseResponse } from "./http";
export const rootApp: MockApp["_root"] = {
  _router: new Set(), // 当前项目已经注册的路由
  _childProjects: new Set(), // 当前项目注册的子项目
  _ports: [], // 当前项目开启占用的端口
  _provides: new Map(),
  _customFn: new Map(),
};
export let instance = {} as MockApp;
export function createAppInstance(
  app,
  namespace: string,
  config: MockConfig = {}
): MockApp {
  const invokeHooks = createInvokeHooks();
  // app开始创建，调用的生命周期
  instance.beforeRouterMounted = invokeHooks.beforeRouterMounted(instance);
  // 创建子路由
  createRouter(namespace, rootApp, instance);
  // 安装中间件
  setupMiddleware(app, config.middlewares);
  // 将实例挂在到根应用上
  instance.mount = (port, hanlder) => {
    // 将子路由挂在到跟路由上
    setupRouter(app, instance);
    // 创建一个渲染器
    const render = createRender(port, hanlder);
    // 渲染到服务器上
    render(app, instance);
    // 路由挂载完成执行的生命周期
    instance.routerMounted = invokeHooks.routerMounted(instance);
  };
  // 卸载应用
  instance.unmount = (hanlder) => {
    if (hanlder) {
      hanlder.call(instance, instance);
    }
    instance.routerBeforeUnmount = invokeHooks.routerBeforeUnmount(instance);
    instance = null;
    removeAllEvents();
  };
  // 设置基本的响应体
  instance.setBaseResponse = (config) => {
    setBaseResponse(config);
    return instance
  };
  // 注册路由
  instance.registerRouter = (routers) => {
    registerRouter(routers);
    return instance
  };

  return instance;
}
export function getCurrentAppInstance() {
  return instance;
}
