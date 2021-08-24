import { mock } from "@qy-mock/core";

export function getNotify() {
  return {
    data: mock({
      id: "@id",
      "type|1-3": 1,
      content: "部分音频暂不可用，请稍后重新打开小程序",
      publish_time: "@date('yyyy-MM-dd')",
    }),
  };
}
