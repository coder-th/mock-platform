import { rootApp } from "./instance";

export function provide(key: string | Object, data: any) {
  let provides = rootApp._provides;
  provides.set(key, data);
}

export function inject(key) {
  let provides = rootApp._provides;
  return provides.get(key);
}
