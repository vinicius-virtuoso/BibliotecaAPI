"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const register_controller_1 = require("../controllers/register/register.controller");
const schemas_1 = require("../schemas");
exports.registerRouter = (0, express_1.Router)();
exports.registerRouter.post('/', (0, middlewares_1.validateBody)(schemas_1.createUserSchema), middlewares_1.verifyUserExists, register_controller_1.registerController.create);
