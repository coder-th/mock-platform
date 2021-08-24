/**
 * 需要忽略开启端口监听的项目
 */
const ignorePkg = ["@qy-mock/core", "@qy-mock/shared"];

const createProjectConfig = {
  projectName: "foo",
  entry: "index.ts",
  port: 20000,
};
/**
 * lerna内置的项目包
 */
const buildInPkg = ["@qy-mock/core", "@qy-mock/shared"];

/**
 * 内置的第三方依赖
 */
const builtInDeps = ["ts-node", "typescript"];

module.exports = {
  ignorePkg,
  createProjectConfig,
  buildInPkg,
  builtInDeps,
};
