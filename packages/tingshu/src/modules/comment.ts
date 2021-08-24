import { mock, mockArray } from "@qy-mock/core";
import { getListParams } from "../helper";

export function getMyComment(reqData) {
  const { count, totalpage, pageindex } = getListParams(reqData);
  const data = mockArray(
    {
      id: "@id",
      album_id: "678955",
      avatar: "@image('50x50')",
      comment: "@cparagraph",
      comment_id: "@id",
      create_time: "@date('yyyy-MM-dd')",
      nickName: "@cname",
      uid: "@id",
      good: "@integer(1,100)",
      response: mockArray(
        {
          id: "@id",
          avatar: "@image('50x50')",
          comment: "@cparagraph",
          nikeName: "@cname",
          uid: "@id",
          to_uid: "@id",
          create_time: "@date('yyyy-MM-dd')",
          good: "@integer(1,200)",
          nickName: "@cname",
          avatarUrl: "@image(50x50)",
          to_nickName: "@cname",
          to_avatarUrl: "@image('50x50')",
        },
        mock("@integer(1,5)")
      ),
    },
    pageindex
  );
  return {
    data,
    totalpage,
    count,
  };
}

export function userToResponse() {
  return true;
}
