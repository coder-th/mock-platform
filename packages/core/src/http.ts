import { getRequestInfo, deepMerge } from "@qy-mock/shared";
import { getCurrentAppInstance } from "./instance";
import { AccessMethod, RouterConfig } from "../types";
import Mock from "mockjs";
let baseResponseHandler: RouterConfig = {
  success: {
    msg: "success",
    data: 1,
    resultCode: 1,
  },
  fail: {
    msg: "error",
    data: 0,
    resultCode: 0,
  },
};
function createRouterFn(method: AccessMethod) {
  return (url: string) => {
    return (target, propertyKey) => {
      const router = getCurrentAppInstance().router;
      router[method.toLocaleLowerCase()](url, async (ctx) => {
        const res = target[propertyKey].call(target, getRequestInfo(ctx));
        if (typeof res === "boolean" || typeof res === "number") {
          // 说明用户想要返回最普通的数据
          ctx.body = transformResData(res);
        } else {
          // 用户自己传了一个转换函数
          ctx.body = baseResponseHandler.customTransformer
            ? baseResponseHandler.customTransformer(res)
            : res;
        }
      });
    };
  };
}
function transformResData(flag: boolean | number) {
  return flag ? baseResponseHandler.success : baseResponseHandler.fail;
}
export function setBaseResponse(routerConfig: RouterConfig) {
  if (routerConfig) {
    Object.keys(baseResponseHandler).forEach((key: keyof RouterConfig) => {
      // 用户想要自定义返回的数据
      baseResponseHandler[key] = !routerConfig[key]
        ? baseResponseHandler[key]
        : typeof routerConfig[key] === "function"
        ? routerConfig[key].call()
        : routerConfig[key];
    });
  }
  baseResponseHandler = deepMerge(baseResponseHandler, routerConfig);
}
export const Get = createRouterFn("Get");
export const Post = createRouterFn("Post");
export const Delete = createRouterFn("Delete");
export const Put = createRouterFn("Put");
export const Options = createRouterFn("Options");
export const mock = (data: Record<string, any> | string) => {
  return Mock.mock(data);
};
