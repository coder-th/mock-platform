import { Context } from "koa";
export function getRequestInfo(ctx: Context) {
  const request = ctx.request as unknown as Context & {
    params: Record<string, any>;
    body: Record<string, any>;
  };
  const method = request.method;
  const url = request.url;
  const header = {
    cookie: request.header.cookie,
    host: request.header.host,
  };
  const query = request.query;
  const params = request.params;
  const body = request.body;
  return {
    method,
    url,
    header,
    query,
    params,
    body,
  };
}
