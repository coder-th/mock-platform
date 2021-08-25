import path from "path";
// import glob from "glob";
import fs from "fs-extra";
import * as comment from "./modules/comment";
// mock缓存
export let mockApis = {
  comment: { ...comment },
};
// /**
//  * 获取当前写的所有mock请求
//  * @returns
//  */
// function updateMockApis() {
//   // 先清空mockApis
//   mockApis = {};
//   // const files = glob.sync(path.resolve(__dirname, "./modules/*.ts"));

//   // files.forEach((file) => {
//   //   const dirs = file.split("/");
//   //   const fileName = dirs[dirs.length - 1].split(".")[0];
//   //   console.log(fileName, file);

//   //   mockApis[fileName] = require(file);
//   // });

//   // 使用fs-extra实现的
//   const fileList = fs.readdirSync(path.resolve(__dirname, "./modules"));
//   fileList.forEach((file) => {
//     const fileName = file.split(".")[0];
//     console.log(fileName, file);

//     mockApis[fileName] = require(path.resolve(__dirname, `./modules/${file}`));
//     console.log(mockApis);
//   });
// }
// /**
//  * 初始化mock缓存
//  */
// updateMockApis();
