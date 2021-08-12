import EventEmitter from "events";
import { logMsg } from "@qy-mock/shared";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
export function emit<T>(evtName: string, payload: T) {
  // 检测当前事件是否已经绑定事件
  const listenerCount = myEmitter.listenerCount(evtName);
  if (!listenerCount) {
    logMsg("error", `发射事件失败，您当前的事件${evtName}还没有绑定on函数`);
    return;
  }
  myEmitter.emit(evtName, payload);
}

export function on(evtName: string, handler: (payload: any) => void) {
  myEmitter.on(evtName, handler.bind(myEmitter));
}

export function removeAllEvents() {
  myEmitter.removeAllListeners();
}
