import { mock } from "@qy-mock/core";
export function getListParams(reqData) {
  const pageindex = reqData.page_index || mock("@integer(5,10)");
  const count = pageindex * mock("@integer(5,10)");
  const totalpage = Math.floor(count / pageindex) + 1;
  return { pageindex, count, totalpage };
}
