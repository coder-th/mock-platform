import { logMsg } from "@qy-mock/shared";
import { Context } from "koa";
import { BuiltinMiddlewares } from "../../types";
export function setupRouterLogger(): BuiltinMiddlewares {
  return {
    name: "RouterLogger",
    handler: async (ctx: Context, next) => {
      const req = ctx.request;
      logMsg(
        "success",
        `当前的请求信息:method => ${req.method},url => ${req.url}`
      );
      await next();
    },
  };
}
