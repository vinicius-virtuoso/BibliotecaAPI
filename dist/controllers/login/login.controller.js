"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const login_service_1 = require("../../services/login/login.service");
class LoginController {
    async login(req, res) {
        const { username_or_email, password } = req.body;
        const token = await (0, login_service_1.loginService)({ username_or_email, password });
        return res.status(200).json(token);
    }
}
exports.loginController = new LoginController();
