/* 主要用于lerna命名的管控和模板的管理
 * @Author: 天衡
 * @Date: 2021-08-24 16:07:01
 */
const shell = require("shelljs");
const fs = require("fs-extra");
const { resolve } = require("../helper/utils");
const { builtInDeps, buildInPkg } = require("../contants");
/**
 * lerna创建项目
 * @param {*} name
 * @returns
 */
function generateProject(name) {
  // 调用lerna创建项目,因为我们是创建项目，这里就用shell来创建
  // 不用execa执行命令的原因是，execa执行的过程是创建子进程，
  // 创建的过程是串行的，我们需要控制在同一个进程中
  const result = shell.exec(`lerna create ${name} -y`);
  if (result.code === 0) {
    // 创建成功，清空文件夹
    removePkg(name);
  }
}

async function removePkg(pkgName) {
  const curPkg = resolve(`../../packages/${pkgName}`);
  if (pkgName && fs.statSync(curPkg).isDirectory()) {
    // 当前是个目录
    await fs.emptyDirSync(curPkg);
  }
}
/**
 * 安装必须的依赖
 */
function installDep(pkgName) {
  // 进入要安装的目录
  const curPkg = resolve(`../../packages/${pkgName}`);
  shell.cd(curPkg);
  const deps = builtInDeps.join(" ");
  const installResult = shell.exec(`yarn add ${deps}`);
  if (installResult.code === 0) {
    // 依赖安装成功,退出到当前的根目录
    shell.cd(`../../`);
  }
  // 调用lerna安装 core和shared包
  buildInPkg.forEach((pkg) => {
    shell.exec(`lerna add ${pkg} --scope=@qy-mock/${pkgName}`);
  });
}

module.exports = {
  generateProject,
  removePkg,
  installDep,
};
