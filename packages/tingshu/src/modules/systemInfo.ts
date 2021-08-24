import { mock, mockArray } from "@qy-mock/core";
import { getListParams } from "../helper";
const qyAvatar =
  "http://mmbiz.qpic.cn/mmbiz_jpg/BSBITEwsZeiaUJlgdv7Fnf5pUUuEmXM8d9KHibQ735G6NBWQRx6zzfCCUD5asGQDRohZfpJTjiaPCmyECMDDhoUSQ/0?wx_fmt=jpeg";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
function getTimeStamp() {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const minDiff = 60;
  const hourDiff = minDiff * 60;
  const dayDiff = hourDiff * 24;
  const weekDiff = dayDiff * 7;
  const monthDiff = dayDiff * 30;
  const yearDiff = monthDiff * 12;
  // 前一分钟
  const lastMins = currentTime - minDiff;
  // 前6分钟
  const lastSixMins = currentTime - minDiff * 6;
  // 前一个小时
  const lastHour = currentTime - hourDiff;
  // 昨天
  const lastDay = currentTime - dayDiff;
  // 前6天
  const lastSixDays = currentTime - dayDiff * 6;
  // 上周
  const lastWeeks = currentTime - weekDiff;
  // 6周前
  const lastSixWeeks = currentTime - weekDiff * 6;
  // 上个月
  const lastMonth = currentTime - monthDiff;
  // 6个月前
  const lastSixMonth = currentTime - monthDiff * 6;
  // 2年前
  const lastSecondYear = currentTime - yearDiff * 2;
  // mock可以选择时间范围
  const timeRange = [
    lastMins,
    lastSixMins,
    lastHour,
    lastDay,
    lastSixDays,
    lastWeeks,
    lastSixWeeks,
    lastMonth,
    lastSixMonth,
    lastSecondYear,
  ];
  const index = getRandomInt(0, 9);
  return timeRange[index];
}

export function getInfoList() {
  return {
    data: [
      mock({
        avatar: qyAvatar,
        title: "@ctitle()",
        count: "@integer(1,200)",
        create_time: "@date('yyyy-MM-dd')",
        content: "@cparagraph()",
        type: 1,
      }),
      mock({
        avatar: qyAvatar,
        title: "@ctitle()",
        count: "@integer(1,200)",
        create_time: "@date('yyyy-MM-dd')",
        content: "@cparagraph()",
        type: 2,
      }),
    ],
  };
}

export function getDetailList(reqData) {
  const { pageindex, count, totalpage } = getListParams(reqData);
  const imageRange = [
    "https://imgcache.qq.com/fm/photo/album/rmid_album_720/9/Y/001thEIH1mtA9Y.jpg?time=1508847418",
    "https://imgcache.qq.com/fm/photo/album/rmid_album_720/n/c/002SFxNk0LjVnc.jpg?time=1563180252",
    "https://imgcache.qq.com/fm/photo/album/rmid_album_720/U/z/004fBomc4QEMUz.jpg?time=1565773757",
  ];
  const data = mockArray(
    {
      avatar: qyAvatar,
      create_time: getTimeStamp(),
      title: "@ctitle",
      start_id: "@id",
      end_id: "@id",
      album_info: mock({
        author: "@cname",
        anchor: "@cnanme",
        id: "@id",
        title: "@ctitle",
        cover: imageRange[getRandomInt(0, 2)],
        description: "@cparagraph",
      }),
    },
    pageindex
  );
  return {
    data,
    totalpage,
    count,
  };
}
