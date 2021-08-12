import { mock } from "@qy-mock/core";

export function getNotify() {
  return {
    data: mock({
      id: "@id",
      "type|1-3": 1,
      content: "@cparagraph()",
      publish_time: "@date('yyyy-MM-dd')",
    }),
  };
}
