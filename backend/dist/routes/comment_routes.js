"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../controllers/comment_controller"));
const router = (0, express_1.Router)();
router.post("/", comment_controller_1.default.createComment);
router.get("/", comment_controller_1.default.getAllComments);
router.put("/:commentId/upvote", comment_controller_1.default.upvoteComment);
router.post("/:commentId/reply", comment_controller_1.default.replyToComment);
exports.default = router;
