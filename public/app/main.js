"use strict";
var chat_service_1 = require("./services/chat-service");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, [chat_service_1.ChatService]);
//# sourceMappingURL=main.js.map