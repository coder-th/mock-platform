const fs = require("fs-extra");
const path = require("path");
const dotenv = require("dotenv");
const { ignorePkg } = require("../contants");
const { logMsg } = require("./logMsg");
function getCustomPkgs() {
  const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
  }).parsed;
  const mockConfig =
    process.env.NODE_ENV === "development"
      ? envConfig.MOCK_PROJECT
      : envConfig.BUILD_PROJECT;
  if (!envConfig || !mockConfig) return;
  const formatConfig = /^\[.+\]$/.test(mockConfig)
    ? JSON.parse(mockConfig)
    : mockConfig;
  const final = formatConfig.filter((pkg) => {
    const isInvalid =
      !/^@qy-mock\//.test(pkg) || !allPkgs.includes(pkg.split("/")[1]);
    if (isInvalid) {
      logMsg(
        "error",
        `当前您传入的${pkg}是无效的项目，请注意是否是以@qy-mock开头或者该项目存不存在`
      );
    }
    return pkg;
  });
  return final;
}
function getAllPkgs() {
  const pkgPath = path.resolve(__dirname, "../../packages");
  const allPkgs = fs.readdirSync(pkgPath);
  // 过滤掉packages下的不是目录的文件
  return allPkgs.filter((shortName) =>
    fs.statSync(path.join(pkgPath, shortName)).isDirectory()
  );
}
// 获取当前所有的项目
const allPkgs = getAllPkgs();
/**
 * 得到当前需要安装的项目名称
 * @param {*} dir
 * @returns
 */
function getPkgName(dir) {
  dir = /^@qy-mock\//.test(dir) ? dir.split("/")[1] : dir;
  const pkgPath = path.resolve(__dirname, `../../packages/${dir}/package.json`);
  const curPkg = require(pkgPath);
  return curPkg.name;
}
/**
 * 获取最终的打包项目包配置
 * @returns
 */
function getFinalTargets() {
  const ignorePkgList = ignorePkg;
  // 如果用户有配置打包的文件，那就按照用户的需求
  const finalPkgs =
    getCustomPkgs() ||
    allPkgs.filter((pkg) => !ignorePkgList.includes(getPkgName(pkg)));
  return finalPkgs.map((pkg) => getPkgName(pkg));
}
function getFinalTargetNames() {
  const targets = getFinalTargets().map((target) => target.split("/")[1]);
  return allPkgs.filter((pkgName) => targets.includes(pkgName));
}
module.exports = {
  getFinalTargets,
  getFinalTargetNames,
  allPkgs,
};
