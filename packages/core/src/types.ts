import Router from "koa-router";
import { Context, Next } from "koa";
import { ParsedUrlQuery } from "querystring";
export type MockApp = {
  mount: (port: string | number, hanlder?: Function) => void;
  unmount: (handler: Function) => void;
  beforeRouterMounted: (handler: Function) => void;
  routerMounted: (handler: Function) => void;
  routerBeforeUnmount: (handler: Function) => void;
  router: Router<any, {}>;
  _isMounted: boolean;
  _port: string;
  _name: string;
  _root: {
    _router: Set<Router<any, {}>>; // 当前项目已经注册的路由
    _childProjects: Set<string>; // 当前项目注册的子项目
    _ports: string[];
    _provides: Map<string | Object, any>;
    _customFn: Map<string | Object, any>; // 存储用户自定义的函数
  };
  setBaseResponse: (router: RouterConfig) => MockApp;
  registerRouter: (routers: RouterContructor | RouterContructor[]) => MockApp;
};
export type AccessMethod = "Get" | "Post" | "Delete" | "Put" | "Options";
export type RouterContructor = new (...args: any[]) => void;
export interface RouterConfig {
  success?: Record<string, any> | (() => Record<string, any>);
  fail?: Record<string, any> | (() => Record<string, any>);
  customTransformer?: (data) => Record<string, any>;
}
export type Middlewares = "RouterLogger" | "BodyParser" | "Cors";
export interface BuiltinMiddlewares {
  name: Middlewares;
  handler: (ctx: Context, next?: Next) => void | Promise<void>;
}
export interface MockConfig {
  middlewares?: Middlewares[];
}
export interface RequestData {
  method: string;
  url: string;
  header: {
    cookie: string;
    host: string;
  };
  query: ParsedUrlQuery;
  params: Record<string, any>;
  body: Record<string, any>;
}
