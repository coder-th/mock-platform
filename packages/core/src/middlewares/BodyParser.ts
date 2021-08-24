import BodyParser from "koa-bodyparser";
import { BuiltinMiddlewares } from "../types";
export function setupBodyParser(): BuiltinMiddlewares {
  return {
    name: "BodyParser",
    handler: BodyParser(),
  };
}
