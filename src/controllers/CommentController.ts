import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$comment from "../modules/comment.module";

export const CommentController = Router()

/**
 * List all comment
 */
CommentController.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$comment.listComment()

    response.sendResponse(res, list)
})

/**
 * List all comment by article
 * @param id id article
 */
CommentController.get('/article/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$comment.listCommentByArticle(req.params.id)

    response.sendResponse(res, list)
})

/**
 * Add new Comment
 * @param article id article
 * @param name name person
 * @param email email person
 * @param content content comment
 * @param url url website person
 */
CommentController.post('/', async (req: Request, res: Response, _next: NextFunction) => {
    const add = await m$comment.addComment(req.body)

    response.sendResponse(res, add)
})

/**
 * Update comment
 * @param id id comment
 * @param name name person
 * @param email email person
 * @param content content comment
 * @param url url website person
 */
CommentController.put('/', async (req: Request, res: Response, _next: NextFunction) => {
    const update = await m$comment.editComment(req.body)

    response.sendResponse(res, update)
})

/**
 * Delete comment
 * @param id id comment
 */
CommentController.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const del = await m$comment.deleteComment(req.params.id)

    response.sendResponse(res, del)
})