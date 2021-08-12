import { rootApp } from "./instance";

export function setCustomFn(key: string, handler) {
  Reflect.set(rootApp._customFn, key, handler);
}
export function getCustomFn(key: string) {
  return Reflect.get(rootApp._customFn, key);
}
export function removeCustomFn(key: string) {
  rootApp._customFn.delete(key);
  Reflect.deleteProperty(rootApp._customFn, key);
}
