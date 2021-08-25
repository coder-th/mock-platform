import { createAppInstance } from "./src/instance";
import Koa from "koa";
import { MockConfig } from "./src/types";
const app = new Koa();
export function createApp(namespace: string = "", config?: MockConfig) {
  return {
    app, // 保证koa的app原封不动
    mockApp: createAppInstance(app, namespace, config), // 框架自己扩展的app
  };
}
export { provide, inject } from "./src/globalData";
export { getCurrentAppInstance } from "./src/instance";
export { emit, on } from "./src/event";
export * from "./src/customFn";
export * from "./src/http";
export { RequestData } from "./src/types";
export * from "./src/routeEffect";
