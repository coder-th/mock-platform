import { mock, mockArray } from "@qy-mock/core";
export function addNotify() {
  return true;
}
export function notifyList() {
  let data = mockArray(
    {
      publish_time: "@date('yyyy-MM-dd')",
      content: mock("@cparagraph()"),
      "rule_type|1-3": 1,
      id: "@id",
    },
    3
  );
  return {
    data,
  };
}
export function notifyUpdate() {
  return true;
}
export function notifyDel() {
  return true;
}
