import { AccessMethod, RouterConfig } from "./types";
import Mock from "mockjs";
import { getRequestInfo } from "./utils";
import { router } from "./router";
import { trackRoute } from "./routeEffect";
function isFunction(target): target is Function {
  return typeof target === "function";
}
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
  customTransformer: {},
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
            processResponse(res);
            if (typeof res === "boolean" || typeof res === "number") {
              // 说明用户想要返回最普通的数据
              ctx.body = transformResData(res);
            } else {
              ctx.body = baseResponseHandler.success;
            }
          });
        },
      });
    };
  };
}
/**
 * 将用户定义的函数转换统一起来
 * @param data
 */
function processResponse(data) {
  const { success, fail, customTransformer } = baseResponseHandler;
  let successData, failData;
  if (customTransformer) {
    const customData = isFunction(customTransformer)
      ? customTransformer(data)
      : customTransformer;
    successData = customData;
    failData = customData;
  }
  // 如果有传success，那就以success为准
  if (success) {
    successData = isFunction(success) ? success(data) : success;
  }
  if (fail) {
    failData = isFunction(fail) ? fail(data) : fail;
  }
  baseResponseHandler.success = successData;
  baseResponseHandler.fail = failData;
}
function transformResData(flag: boolean | number) {
  return flag ? baseResponseHandler.success : baseResponseHandler.fail;
}
/**
 * 设置基础响应体，优先级是   success > customTransformer > builtIn
 * @param routerConfig
 */
export function setBaseResponse(routerConfig: RouterConfig) {
  if (routerConfig) {
    Object.keys(baseResponseHandler).forEach((key: keyof RouterConfig) => {
      // 用户传了customTransformer,但是不传success，那么替换掉success
      baseResponseHandler[key] = !routerConfig[key]
        ? routerConfig.customTransformer
          ? routerConfig.customTransformer
          : baseResponseHandler[key]
        : routerConfig[key];
    });
  }
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
