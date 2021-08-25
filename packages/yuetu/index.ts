import Koa from "koa";
import Router from "koa-router";
const app = new Koa();
const router = new Router();

router.get("/list", (ctx) => {
  ctx.body = {
    name: "123",
  };
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(9999, () => {
  console.log("启动成功，地址是http://localhost:9999");
});
