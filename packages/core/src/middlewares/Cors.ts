import KoaCors from "koa2-cors";
import { BuiltinMiddlewares } from "../../types";
export function setupCors(): BuiltinMiddlewares {
  return {
    name: "Cors",
    handler: KoaCors(),
  };
}
