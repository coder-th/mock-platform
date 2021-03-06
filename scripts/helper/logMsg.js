const chalk = require("chalk");
const { processMsg } = require("./utils");
/**
 * display info in terminal
 * @param {*} type
 * @param {*} msg
 */
function logMsg(type = "success", msg) {
  msg = processMsg(msg);
  switch (type) {
    case "success":
      console.log(chalk.green(msg));
      break;
    case "warning":
      console.log(chalk.yellow(msg));
      break;
    case "error":
      console.log(chalk.redBright(msg));
      break;
  }
}
module.exports = {
  logMsg,
};
