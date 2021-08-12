import { getCurPkgInfo, logMsg } from "../../shared";

export function createRender(port: string, hanlder: Function) {
  return function render(app, instance) {
    instance._port = port;
    instance._root._ports.push(port);
    app.listen(port, (...args) => {
      if (!hanlder) {
        logMsg(
          "success",
          `${
            getCurPkgInfo().name
          }项目启动成功，接口的前缀是http://localhost:${port}/${instance._name}`
        );
      } else {
        hanlder.call(app, ...args);
      }
    });
    // 标记当前项目已经挂载
    instance._isMounted = true;
  };
}
