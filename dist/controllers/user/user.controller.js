"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const updateUser_service_1 = require("../../services/user/updateUser.service");
const listUsers_service_1 = require("../../services/user/listUsers.service");
const deleteUser_service_1 = require("../../services/user/deleteUser.service");
const retrieveUser_service_1 = require("../../services/user/retrieveUser.service");
class UserController {
    async list(req, res) {
        const users = await (0, listUsers_service_1.listUserService)();
        return res.status(200).json(users);
    }
    async getOne(req, res) {
        const { user_id } = req.params;
        const user = await (0, retrieveUser_service_1.retrieveUserService)(user_id);
        return res.status(200).json(user);
    }
    async update(req, res) {
        const { user_id } = req.params;
        const payload = req.body;
        const user = await (0, updateUser_service_1.updateUserService)(user_id, payload);
        return res.status(200).json(user);
    }
    async delete(req, res) {
        const { user_id } = req.params;
        await (0, deleteUser_service_1.deleteUserService)(user_id);
        return res.status(204).json();
    }
}
exports.userController = new UserController();
