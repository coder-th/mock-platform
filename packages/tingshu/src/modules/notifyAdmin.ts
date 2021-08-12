import Mock from "mockjs";
export function addNotify() {
  return true;
}
export function notifyList() {
  const data = [
    {
      publish_time: "2020-07-11",
      content: Mock.mock("@cparagraph()"),
      rule_type: 1,
      id: 1,
    },
    {
      publish_time: "2020-07-16",
      content: Mock.mock("@cparagraph()"),
      rule_type: 2,
      id: 2,
    },
    {
      publish_time: "2020-04-08",
      content: Mock.mock("@cparagraph()"),
      rule_type: 3,
      id: 3,
    },
  ];
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
