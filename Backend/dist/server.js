"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const router_1 = tslib_1.__importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)());
app.enable("trust proxy");
app.use(body_parser_1.default.json({ type: "*/*" }));
(0, router_1.default)(app);
app.listen(4000, () => {
    console.log(`Server started on port  + ${4000}`);
});
//# sourceMappingURL=server.js.map