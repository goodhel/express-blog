import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$article from "../modules/article.module";

export const ArticleController = Router()

/**
 * List all article
 */
ArticleController.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$article.listArticle()

    response.sendResponse(res, list)
})

/**
 * Add new Article
 * @param name name person
 * @param email email person
 * @param title title article
 * @param slug slug article
 * @param content content article
 */
ArticleController.post('/', async (req: Request, res: Response, _next: NextFunction) => {
    const add = await m$article.addArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Update Article
 * @param id id article
 * @param name name person
 * @param email email person
 * @param title title article
 * @param slug slug article
 * @param content content article
 */
ArticleController.put('/', async (req: Request, res: Response, _next: NextFunction) => {
    const edit = await m$article.editArticle(req.body)

    response.sendResponse(res, edit)
})

/**
 * Delete Article
 * @param id id article
 */
ArticleController.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const del = await m$article.deleteArticle(req.params.id)
    
    response.sendResponse(res, del)
})