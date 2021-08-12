import { RequestData } from "@qy-mock/core";
import { mockApis } from "./apiManage";

export function generateResponse(reqData: RequestData) {
  // 从请求体提取关键的字段信息
  const reqInfo = getReqInfo(reqData);
  if (reqInfo) {
    const { method, data, action } = reqInfo;
    return mockApis[method][action].call(method, data);
  } else {
    return false;
  }
}
/**
 * 从请求体获取信息
 * @param {*} req
 * @returns
 */
function getReqInfo(req: RequestData):
  | {
      method: string;
      action: string;
      data: Record<string, any>;
    }
  | false {
  const methodType = (req.method || "GET").toUpperCase();
  const isGet = methodType === "GET";
  const method = isGet ? req.query.method : req.body.method;
  const action = isGet ? req.query.action : req.body.action;
  const data = isGet ? req.query : req.body;

  return showTip(req, isGet)
    ? {
        method,
        action,
        data,
      }
    : false;
}
/**
 * 展示当前请求的信息
 * @param {*} req
 */
function showTip(req: RequestData, isGet: boolean) {
  const method = isGet ? req.query.method : req.body.method;
  const action = isGet ? req.query.action : req.body.action;
  const data = JSON.stringify(isGet ? req.query : req.body) || "";
  if (!hasMethodOrAction(method, action)) return false;
  console.log(
    `当前触发了mock请求,url=>${req.url},请求方式=>${req.method},请求模块=> ${method},action=>${action},请求数据=>${data}`
  );
  return true;
}
/**
 * 是否已经定义过当前的action或者method
 * @param method
 * @param action
 * @returns
 */
function hasMethodOrAction(method, action) {
  const hasMethod = !!mockApis[method];
  if (!hasMethod) {
    console.log(`请查看您当前是否在modules文件夹已经写了${method}.ts文件`);
    return false;
  } else {
    const hasAction = mockApis[method][action];
    if (!hasAction) {
      console.log(`请查看您当前在${method}.ts文件是否写了${action}方法`);
      return false;
    }
  }
  return true;
}
