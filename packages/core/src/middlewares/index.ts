import { setupRouterLogger } from "./routerLog";
import { setupBodyParser } from "./BodyParser";
import Koa from "koa";
import { MockConfig } from "../../types";
import { setupCors } from "./Cors";

export function setupMiddleware(
  app: Koa,
  middlewares: MockConfig["middlewares"]
) {
  if (!middlewares) {
    middlewares = ["Cors", "RouterLogger", "BodyParser"];
  }
  [setupCors, setupRouterLogger, setupBodyParser].forEach((item) => {
    const middle = item();
    if (middlewares.includes(middle.name)) {
      app.use(middle.handler);
    }
  });
  return app;
}
