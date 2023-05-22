"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.RegisterController = void 0;
const createUser_service_1 = require("../../services/user/createUser.service");
class RegisterController {
    async create(req, res) {
        const body = req.body;
        const user = await (0, createUser_service_1.createUserService)(body);
        return res.status(201).json(user);
    }
}
exports.RegisterController = RegisterController;
exports.registerController = new RegisterController();
