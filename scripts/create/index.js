const inquirer = require("inquirer");
const { allPkgs } = require("../helper/pkgManage");
const { createProjectConfig } = require("../contants");
const { generateProject, installDep } = require("./manage");
const { genCode } = require("./gen");
// 不能使用数字|_|@|~|.|(开头或者含有中文或者_结尾的名称
const projectNameReg = /^(\d|_|@|~|\.|\()|(.*)[\/\u4e00-\u9fa5]|(_)$/gi;
// 以.js|.jsx|.ts|.tsx结尾的文件才可以使用
const fileNameReg = /\.[t|j]s[x]?$/gi;
// 不能以0开头的数字
const portReg = /^(?!0)\d+/gi;
/**
 * 向用户询问项目的名称
 * 向用户询问项目的入口文件
 * 向用户询问项目的入口文件
 * @returns
 */
async function inquireCMD(defaultConfig) {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      default: defaultConfig.projectName,
      message: "请输入项目名称:",
      validate: (val) => {
        if (projectNameReg.test(val)) {
          return "不能使用数字|_|@|~|.|(开头或者含有中文或者_结尾的名称";
        }
        if (allPkgs.includes(val)) {
          return "您填写的项目已经注册过了，请输入新的项目名称";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "entry",
      default: defaultConfig.entry,
      message: "请输入当前项目的入口文件",
      validate(val) {
        if (fileNameReg.test(val)) {
          return true;
        }
        return "请使用正确的入口文件(以.js|.jsx|.ts|.tsx结尾的文件才可以使用)";
      },
    },
    {
      type: "input",
      name: "port",
      default: defaultConfig.port,
      message: "请输入服务监听的端口",
      validate(val) {
        if (portReg.test(val)) {
          return true;
        }
        return "请输入正整数";
      },
    },
  ]);
}

async function runCreate() {
  // 收集用户的输入的信息
  const answer = await inquireCMD(createProjectConfig);
  // 创建项目
  generateProject(answer.projectName);
  // 生成代码(入口文件和package.json)
  genCode(answer.projectName, answer.entry, answer.port);
  // 安装依赖
  installDep(answer.projectName);
}

runCreate();
