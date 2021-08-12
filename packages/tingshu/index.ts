import { createApp, inject, provide, emit, on, Get, Post } from "@qy-mock/core";
const { app, mockApp } = createApp("apiV3/audio2");
import { AdminRouter } from "./src/router";
mockApp.registerRouter([AdminRouter]).mount("40003");
