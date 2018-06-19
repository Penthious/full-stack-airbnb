"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const App_1 = require("../App");
exports.setup = () => __awaiter(this, void 0, void 0, function* () {
    const App = typescript_ioc_1.Container.get(App_1.default);
    const server = yield App.start();
    const { port } = server.address();
    process.env.TEST_HOST = `http://127.0.0.1:${port}`;
});
//# sourceMappingURL=setup.js.map