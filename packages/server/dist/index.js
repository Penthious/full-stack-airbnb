"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const App_1 = require("./App");
const app = typescript_ioc_1.Container.get(App_1.default);
app.start();
//# sourceMappingURL=index.js.map