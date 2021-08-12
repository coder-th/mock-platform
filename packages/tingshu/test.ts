import { Get, Post } from "../core";

class TestRouter {
  @Get("/mock/:id")
  getList(req) {
    return {
      data: {
        name: "qianyun",
      },
      resultCode: 1,
    };
  }
  @Post("/mock/:id")
  postComment(req) {
    return {
      data: {
        name: "qianyun",
      },
      resultCode: 1,
    };
  }
}

export default TestRouter;
