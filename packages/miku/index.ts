import { createApp } from "@qy-mock/core";
import { AdminRouter } from "./src/router";
const { mockApp } = createApp("miku");
// 路由，可以抽取到你喜欢的位置
mockApp.registerRouter([AdminRouter]).mount("20000");
