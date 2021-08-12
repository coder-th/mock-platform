export function isObject(target) {
  return target !== null && typeof target === "object";
}
export function processMsg(msg): string {
  return isObject(msg) ? JSON.stringify(msg) : msg;
}
