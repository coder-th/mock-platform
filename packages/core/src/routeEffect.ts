import { getCurrentAppInstance } from "./instance";
import { logMsg } from "@qy-mock/shared";
import { AccessMethod, RequestData } from "./types";
interface IRoute {
  rawFn: (reqData?: RequestData) => any;
  url: string;
  method: AccessMethod;
  routeFn: (
    rawFn: (reqData?: RequestData) => any,
    url: string,
    method: AccessMethod
  ) => void;
}
// 保存当前收集的所有路由处理方法
const routeMap = new Map<string, Set<IRoute>>();
/**
 * 收集指定类下所有的路由
 * @param className
 * @param route
 */
export function trackRoute(className: string, route: IRoute): void;
export function trackRoute(className, route) {
  let targetSet = routeMap.get(className);
  if (!targetSet) {
    // 保证当前类的集合容器存在
    routeMap.set(className, (targetSet = new Set<IRoute>()));
  }
  targetSet.add(route);
}
/**
 * 将路由载入子路由中
 * @param className
 * @returns
 */
export function triggerRoute(className: string): void;
export function triggerRoute(className: string) {
  let targetSet = routeMap.get(className);
  if (!targetSet) {
    // 当前注册的路由不存在
    logMsg("error", `当前注册的${className}不存在(没有被系统收集到)`);
    return;
  }
  const curName = getCurrentAppInstance()._name;
  const prefix = curName
    ? curName.startsWith("/")
      ? curName
      : `/${curName}`
    : "";
  // 执行当前所有注册的函数
  targetSet.forEach((route) =>
    route.routeFn(route.rawFn, prefix + route.url, route.method)
  );
}
