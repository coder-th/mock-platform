import { setupRouterLogger } from "./routerLog";
import { setupBodyParser } from "./BodyParser";
import Koa from "koa";
import { MockConfig } from "../../types";

export function setupMiddleware(
  app: Koa,
  middlewares: MockConfig["middlewares"]
) {
  if (!middlewares) {
    middlewares = ["RouterLogger", "BodyParser"];
  }
  [setupRouterLogger, setupBodyParser].forEach((item) => {
    const middle = item();
    if (middlewares.includes(middle.name)) {
      app.use(middle.handler);
    }
  });
  return app;
}
