import { Get, Post, RequestData } from "@qy-mock/core";
import { generateResponse } from "./handler";

export class AdminRouter {
  @Get("/get")
  getDataDemo(reqData: RequestData) {
    return generateResponse(reqData);
  }
  @Post("/post")
  postDataDemo(reqData: RequestData) {
    return generateResponse(reqData);
  }
}
