import chalk from "chalk";
import { MockApp } from "../types";
/**
 * 路由注册之前想做的事情
 * @param {*} app
 * @returns
 */
export function beforeRouterMounted(app: MockApp) {
  // 在路由创建之前，用户不能使用router属性
  return createBaseHanlder(app, false);
}
/**
 * 路由挂在后想完成的事情
 * @param {*} app
 * @returns
 */
export function routerMounted(app: MockApp) {
  return createBaseHanlder(app);
}

export function routerBeforeUnmount(app: MockApp) {
  return createBaseHanlder(app);
}
export function createBaseHanlder(app: MockApp, withRouter = true) {
  // 拦截get操作，目的是避免用户在不恰当的生命周期取到路由，导致一系列报错
  const appProxy = new Proxy(app, {
    get(target, key) {
      if (key === "router" && !withRouter) {
        console.log(chalk.red("当前的生命周期不能使用路由"));
        return undefined;
      } else {
        return target[key];
      }
    },
  });
  return (handler) => {
    handler.call(app, appProxy);
  };
}

export function createInvokeHooks() {
  return {
    beforeRouterMounted: (app: MockApp) => beforeRouterMounted(app),
    routerMounted: (app: MockApp) => {
      return routerMounted(app);
    },
    routerBeforeUnmount: (app: MockApp) => {
      return routerBeforeUnmount(app);
    },
  };
}
