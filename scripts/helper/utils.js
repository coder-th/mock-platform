const path = require("path");
function isObject(target) {
  return target !== null && typeof target === "object";
}
function processMsg(msg) {
  return isObject(msg) ? JSON.stringify(msg) : msg;
}
/**
 * 多进程开启项目，每个进程对应一个项目
 * @param {*} maxConcurrency 当前系统的cpu最大核心数
 * @param {*} source 源代码目录
 * @param {*} iteratorFn
 * @returns
 */
async function runParallel(source, iteratorFn) {
  const maxConcurrency = require("os").cpus().length;
  const ret = [];
  const executing = [];
  for (const item of source) {
    // 将要执行的任务放在promise微任务队列中
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);
    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  isObject,
  processMsg,
  runParallel,
  resolve,
};
