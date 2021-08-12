import { createApp, inject, provide, emit, on, Get, Post } from "@qy-mock/core";
const { app, mockApp } = createApp("tingshu");
import TestRouter from "./test";
mockApp.registerRouter(TestRouter).mount("23331");
