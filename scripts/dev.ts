import execa from "execa";
import { getFinalTargets } from "./helper/pkgManage";

/**
 * 多进程开启项目，每个进程对应一个项目
 * @param {*} maxConcurrency 当前系统的cpu最大核心数
 * @param {*} source 源代码目录
 * @param {*} iteratorFn
 * @returns
 */
async function runParallel(maxConcurrency, source, iteratorFn) {
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

async function setupChildProject(project) {
  await execa("lerna", ["exec", "--scope", project, "--", "yarn", "start"], {
    stdio: "inherit",
  });
}

function run(targets) {
  // 充分利用电脑cpu核心数
  runParallel(require("os").cpus().length, targets, setupChildProject);
}
run(getFinalTargets());
