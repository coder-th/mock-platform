const { getFinalTargetNames } = require("./helper/pkgManage");
const { runParallel } = require("./helper/utils");
const path = require("path");
const fs = require("fs-extra");
const execa = require("execa");

const targetDirs = getFinalTargetNames();
/**
 * 打包的主流程
 * @param target
 */
async function build(target) {
  console.log("target", target);
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);
  const env = pkg.buildOptions && pkg.buildOptions.env;
  await fs.remove(`${pkgDir}/dist`);
  /**
   *   执行脚本命令，并加载进环境变量，传入对应的目录等信息，，
   *  将进程信息共享给主进程，让rollup.config.js生成对应目录的配置，然后进行打包
   */
  await execa(
    "rollup",
    [
      "-c",
      "--environment",
      [`TARGET:${target}`, `NODE_ENV:${env}`].filter(Boolean).join(","),
    ],
    {
      stdio: "inherit",
    }
  );
}
runParallel(targetDirs, build);
