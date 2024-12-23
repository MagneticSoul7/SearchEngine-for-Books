"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.authenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        var secretKey = process.env.JWT_SECRET_KEY || '';
        jsonwebtoken_1.default.verify(token, secretKey, function (err, user) {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
exports.authenticateToken = authenticateToken;
var signToken = function (username, email, _id) {
    var payload = { username: username, email: email, _id: _id };
    var secretKey = process.env.JWT_SECRET_KEY || '';
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.signToken = signToken;
