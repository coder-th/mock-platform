import { mock, mockArray } from "@qy-mock/core";
/**
 * 删除评论
 * @param {*} reqData
 * @returns
 */
export function delComment(reqData) {
  return true;
}
/**
 * 获取评论列表
 * @param {*} reqData
 * @returns
 */
export function getAlbumCommentList(reqData) {
  const pageindex = reqData.pageindex || 10;
  // 总数
  const count = 56;
  const totalpage = Math.floor(count / pageindex) + 1;
  const data = mockArray(
    mock({
      avatar: "@image('50x50')",
      comment: "@cparagraph()",
      comment_id: "@increment()",
      create_time: Math.floor(new Date(mock("@datetime()")).getTime() / 1000),
      nickName: "@cname()",
      uid: "@increment()",
      response: mockArray(
        {
          avatar: "@image('100x100')",
          comment: "@cparagraph()",
          id: "@increment()",
          nickName: "@cname",
        },
        mock("@integer(1,6)")
      ),
    }),
    pageindex
  );
  return {
    data,
    count,
    totalpage,
  };
}

export function replyComment(reqData) {
  return true;
}
