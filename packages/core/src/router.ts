import Router from "koa-router";
import { MockApp } from "./types";
import { isArray, couldBeClass } from "@qy-mock/shared";
import { triggerRoute } from "./routeEffect";
export const router = new Router();
export function createRouter(namespace: string, rootApp, instance) {
  rootApp._router.add(router);
  rootApp._childProjects.add(namespace);
  instance.router = router;
  instance._name = namespace;
  instance._root = rootApp;
}
export function setupRouter(app, instance: MockApp) {
  const { router } = instance;
  // 装载所有子路由
  let rootRouter = new Router();
  rootRouter.use("", router.routes(), router.allowedMethods());
  // 加载路由中间件
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods());
}
export function registerRouter(routers) {
  if (!isArray(routers)) {
    routers = [routers];
  }
  routers.forEach((router) => {
    if (couldBeClass(router)) {
      triggerRoute(router.name);
    }
  });
}
