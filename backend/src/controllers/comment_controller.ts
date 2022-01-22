import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// name
function randomName(): string {
    let firstName = ["John", "Jane", "Mary", "Bob", "Tom", "Sam", "Jack", "Lily", "Linda", "Sally", "Sue", "Sara", "Sebastian", "Sophie", "Sofia"]
    let lastName = ["Peters", "Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris"]
    return firstName[Math.floor(Math.random() * firstName.length)] + " " + lastName[Math.floor(Math.random() * lastName.length)]
}
// create comment
const createComment = async (req: Request, res: Response) => {
    try {
        const { comment } = req.body
        // check if comment is exist or not
        if (!comment) {
            return res.status(400).send({
                message: "Comment is required"
            })
        }
        // create comment
        await prisma.comments.create({
            data: {
                text: comment.trim(),
                name: randomName()
            }
        })
        // return response
        return res.status(201).send({
            message: "Comment created successfully"
        })
    } catch (e: any) {
        res.status(500).send({ message: e?.message });
    }
}
// get call comments
const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comments.findMany({
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
            },
            orderBy: [
                {
                    upvotes: "desc"
                },
                {
                    createdAt: "desc"
                }
            ]
        })
        return res.send(comments)
    } catch (e: any) {
        res.status(500).send({ message: e?.message });
    }
}
// upvote comment
const upvoteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params
        // check if comment id is exist or not
        const comment = await prisma.comments.findFirst({
            where: {
                id: commentId
            }
        })

        if (!comment) {
            return res.status(404).send({
                message: "Comment not found"
            })
        }
        // upvote comment
        await prisma.comments.update({
            where: {
                id: commentId
            },
            data: {
                upvotes: comment.upvotes + 1
            }
        })
        // return response
        return res.status(200).send({
            message: "Comment upvoted successfully"
        })
    } catch (e: any) {
        res.status(500).send({ message: e?.message });
    }
}
// reply to comment
const replyToComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params
        const { reply } = req.body
        if (!reply) {
            return res.status(400).send({
                message: "Reply is required"
            })
        }
        // check if comment id is exist or not
        const comment = await prisma.comments.findFirst({
            where: {
                id: commentId
            }
        })
        // check if comment is exist or not
        if (!comment) {
            return res.status(404).send({
                message: "Comment not found"
            })
        }
        // reply to comment
        await prisma.comments.create({
            data: {
                text: reply.trim(),
                parent_id: commentId,
                name: randomName()
            }
        })
        // return response
        return res.status(201).send({
            message: "Reply created successfully"
        })
    } catch (e: any) {
        res.status(500).send({ message: e?.message });
    }
}
// export all functions
export default {
    createComment,
    getAllComments,
    upvoteComment,
    replyToComment
}