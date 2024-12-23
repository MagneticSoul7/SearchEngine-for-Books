"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var node_path_1 = require("node:path");
var connection_js_1 = require("./config/connection.js");
var index_js_1 = require("./routes/index.js");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(node_path_1.default.join(__dirname, '../client/build')));
}
app.use(index_js_1.default);
connection_js_1.default.once('open', function () {
    app.listen(PORT, function () { return console.log("\uD83C\uDF0D Now listening on localhost:".concat(PORT)); });
});
