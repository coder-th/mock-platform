import { createApp, inject, provide } from "@qy-mock/core";
const { app, mockApp } = createApp("yuetu");
const { router, mount, routerMounted, beforeRouterMounted } = mockApp;
router.get("/mock", async (ctx) => {
  ctx.body = {
    data: {
      name: "qianyun",
    },
    resultCode: 1,
  };
});
const name = inject("name");
console.log(name);
mount("23332");
