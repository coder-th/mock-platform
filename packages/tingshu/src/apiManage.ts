import path from "path";
import glob from "glob";
// mock缓存
export let mockApis = {};
/**
 * 获取当前写的所有mock请求
 * @returns
 */
function updateMockApis() {
  // 先清空mockApis
  mockApis = {};
  const files = glob.sync(path.resolve(__dirname, "./modules/*.ts"));
  files.forEach((file) => {
    const dirs = file.split("/");
    const fileName = dirs[dirs.length - 1].split(".")[0];
    mockApis[fileName] = require(file);
  });
}
/**
 * 初始化mock缓存
 */
updateMockApis();
