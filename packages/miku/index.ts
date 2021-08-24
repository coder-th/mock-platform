import {
  createApp,
  Get,
  Post,
  RequestData,
  mock,
  mockArray,
} from "@qy-mock/core";
const { mockApp } = createApp();
// 路由，可以抽取到你喜欢的位置
class AdminRouter {
  @Get("/helloword")
  get(reqData: RequestData) {
    return {
      data: mockArray(mock({ title: "helloword" }), 3),
    };
  }
  @Post("/helloword")
  post(reqData: RequestData) {
    return {
      data: mock({
        name: "@cname",
        title: "@title",
      }),
    };
  }
}
mockApp.registerRouter([AdminRouter]).mount("20000");
