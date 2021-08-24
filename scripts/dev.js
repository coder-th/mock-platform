const execa = require("execa");
const { getFinalTargets } = require("./helper/pkgManage");
const { runParallel } = require("./helper/utils");

async function setupChildProject(project) {
  await execa("lerna", ["exec", "--scope", project, "--", "yarn", "start"], {
    stdio: "inherit",
  });
}

function run(targets) {
  // 充分利用电脑cpu核心数
  runParallel(targets, setupChildProject);
}
console.log(getFinalTargets());
run(getFinalTargets());
