import { Get, mock, mockArray, Post, RequestData } from "@qy-mock/core";

export class AdminRouter {
  @Get("/helloword")
  get(reqData: RequestData) {
    return mockArray(mock({ title: "helloword" }), 3);
  }
  @Post("/helloword")
  post(reqData: RequestData) {
    return mock({
      name: "@cname",
      title: "@title",
    });
  }
}
