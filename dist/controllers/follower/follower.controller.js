"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerController = exports.FollowerController = void 0;
const createFollower_service_1 = require("../../services/follower/createFollower.service");
class FollowerController {
    async create(req, res) {
        const { id: user_id } = req.auth;
        const { book_id } = req.params;
        await (0, createFollower_service_1.createFollowerOfBook)(user_id, book_id);
        return res.status(200).json();
    }
}
exports.FollowerController = FollowerController;
exports.followerController = new FollowerController();
