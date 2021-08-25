import { deepMerge, logMsg } from "@qy-mock/shared";
import { AccessMethod, RequestData, RouterConfig } from "./types";
import Mock from "mockjs";
import { getRequestInfo } from "./utils";
import { router } from "./router";
import { trackRoute } from "./routeEffect";

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
      trackRoute(target.constructor.name, {
        method,
        url,
        rawFn: target[propertyKey],
        routeFn: (rawFn, url, method) => {
          router[method.toLocaleLowerCase()](url, async (ctx) => {
            const res = rawFn(getRequestInfo(ctx));
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
        },
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
export function mock<T extends Record<string, any> | string>(data: T): any;
export function mock(data) {
  return Mock.mock(data);
}
export function mockArray<T extends Record<string, any> | string>(
  data: T,
  length: number
): any;
export function mockArray(data, length) {
  const mockItem = () => mock(data);
  const mockData = [];
  for (let index = 1; index <= length; index++) {
    mockData.push(mockItem());
  }
  return mockData;
}
