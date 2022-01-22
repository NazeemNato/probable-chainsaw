import { Router } from "express";
import  CommentController from "../controllers/comment_controller";

const router = Router();

router.post("/", CommentController.createComment);
router.get("/", CommentController.getAllComments);
router.put("/:commentId/upvote", CommentController.upvoteComment);
router.post("/:commentId/reply", CommentController.replyToComment);

export default router;