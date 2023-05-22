"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const follower_controller_1 = require("../controllers/follower/follower.controller");
exports.followerRouter = (0, express_1.Router)();
exports.followerRouter.post('followers/:book_id', middlewares_1.validateToken, middlewares_1.verifyNotExistBook, middlewares_1.verifyIsFollower, follower_controller_1.followerController.create);
