"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const login_controller_1 = require("../controllers/login/login.controller");
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post('/', (0, middlewares_1.validateBody)(schemas_1.loginSchema), login_controller_1.loginController.login);
