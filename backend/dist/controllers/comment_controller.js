"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// create comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        // check if comment is exist or not
        if (!comment) {
            return res.status(400).send({
                message: "Comment is required"
            });
        }
        // create comment
        yield prisma.comments.create({
            data: {
                text: comment.trim(),
            }
        });
        // return response
        return res.status(201).send({
            message: "Comment created successfully"
        });
    }
    catch (e) {
        res.status(500).send({ message: e === null || e === void 0 ? void 0 : e.message });
    }
});
// get call comments
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma.comments.findMany({
            where: {
                parent_id: {
                    equals: null
                }
            },
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            }
        });
        return res.send(comments);
    }
    catch (e) {
        res.status(500).send({ message: e === null || e === void 0 ? void 0 : e.message });
    }
});
// upvote comment
const upvoteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        // check if comment id is exist or not
        const comment = yield prisma.comments.findFirst({
            where: {
                id: commentId
            }
        });
        if (!comment) {
            return res.status(404).send({
                message: "Comment not found"
            });
        }
        // upvote comment
        yield prisma.comments.update({
            where: {
                id: commentId
            },
            data: {
                upvotes: comment.upvotes + 1
            }
        });
        // return response
        return res.status(200).send({
            message: "Comment upvoted successfully"
        });
    }
    catch (e) {
        res.status(500).send({ message: e === null || e === void 0 ? void 0 : e.message });
    }
});
// reply to comment
const replyToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { reply } = req.body;
        if (!reply) {
            return res.status(400).send({
                message: "Reply is required"
            });
        }
        // check if comment id is exist or not
        const comment = yield prisma.comments.findFirst({
            where: {
                id: commentId
            }
        });
        // check if comment is exist or not
        if (!comment) {
            return res.status(404).send({
                message: "Comment not found"
            });
        }
        // reply to comment
        yield prisma.comments.create({
            data: {
                text: reply.trim(),
                parent_id: commentId
            }
        });
        // return response
        return res.status(201).send({
            message: "Reply created successfully"
        });
    }
    catch (e) {
        res.status(500).send({ message: e === null || e === void 0 ? void 0 : e.message });
    }
});
// export all functions
exports.default = {
    createComment,
    getAllComments,
    upvoteComment,
    replyToComment
};
