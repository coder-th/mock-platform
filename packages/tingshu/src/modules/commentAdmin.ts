import Mock from "mockjs";
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
  var data = [];
  const pageindex = reqData.pageindex || 10;
  for (var i = 0; i <= pageindex; i++) {
    const demoResponse = {
      avatar: Mock.mock("@image('100x100')"),
      comment: Mock.mock("@cparagraph()"),
      id: Mock.mock("@increment()"),
      nickName: Mock.mock("@cname"),
    };
    const demo = {
      avatar: Mock.mock("@image('50x50')"),
      comment: Mock.mock("@cparagraph()"),
      comment_id: Mock.mock("@increment()"),
      create_time: Math.floor(
        new Date(Mock.mock("@datetime")).getTime() / 1000
      ),
      nickName: Mock.mock("@cname"),
      uid: Mock.mock("@increment()"),
      response: new Array(4).fill(demoResponse),
    };
    data.push(demo);
  }
  // 总数
  const count = 56;
  const totalpage = Math.floor(count / pageindex) + 1;
  return {
    resultCode: 1,
    data: data,
    count,
    totalpage,
  };
}

export function replyComment(reqData) {
  return true;
}
