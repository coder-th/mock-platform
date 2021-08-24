const { createProjectConfig } = require("../contants");
const fs = require("fs-extra");
const { resolve } = require("../helper/utils");
/* 主要用来生成模板文件的代码
 * @Author: 天衡
 * @Date: 2021-08-24 16:05:41
 */

/**
 * 生成入口文件的代码
 * @param {*} pkgName
 * @param {*} fileName
 */
function genEntry(
  pkgName,
  fileName = createProjectConfig.entry,
  port = createProjectConfig.port
) {
  const template = `
import {
    createApp,
    Get,
    Post,
    RequestData,
    mock,
    mockArray,
  } from "@qy-mock/core";
  const { mockApp } = createApp();
  // 路由，可以抽取到你喜欢的位置
  class AdminRouter {
    @Get("/helloword")
    get(reqData: RequestData) {
      return {
        data: mockArray(mock({ title: "helloword" }), 3),
      };
    }
    @Post("/helloword")
    post(reqData: RequestData) {
      return {
        data: mock({
          name: "@cname",
          title: "@title",
        }),
      };
    }
  }
  mockApp.registerRouter([AdminRouter]).mount(${port});
`;
  const curPkg = resolve(`../../packages/${pkgName}/${fileName}`);
  // 创建文件
  fs.createFileSync(curPkg);
  fs.writeFileSync(curPkg, template);
}

/**
 * 生成package.json文件
 * @param {*} pkgName
 */
function genPkgJson(pkgName, fileName = createProjectConfig.entry) {
  const curPkg = resolve(`../../packages/${pkgName}/package.json`);
  fs.writeJSONSync(curPkg, {
    name: `@qy-mock/${pkgName}`,
    main: fileName,
    scripts: {
      start: `nodemon -e ts --exec ts-node ${fileName}`,
    },
    buildOptions: {
      name:
        "Qymock" +
        pkgName
          .split("-")
          .map((item) => item.replace(/^\S/, (s) => s.toUpperCase()))
          .join(""),
      formats: ["cjs"],
    },
  });
}

/**
 * 生成代码
 * @param {*} pkgName
 * @param {*} entry
 * @param {*} port
 */
function genCode(pkgName, entry, port) {
  genEntry(pkgName, entry, port);
  genPkgJson(pkgName, entry);
}

module.exports = {
  genCode,
};
