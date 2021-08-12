import { Get, Post, RequestData } from "@qy-mock/core";
import { generateResponse } from "./handler";

export class AdminRouter {
  @Get("/get")
  get(reqData: RequestData) {
    return generateResponse(reqData);
  }
  @Post("/post")
  post(reqData: RequestData) {
    return generateResponse(reqData);
  }
}
