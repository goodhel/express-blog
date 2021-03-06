import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$article from "../modules/article.module";

export const ArticleController = Router()

interface Query {
    sort?: string
    limit?: string
    page?: string
    filter?: string
}

/**
 * List all article
 */
ArticleController.get('/', async (req: Request<{}, {}, {}, Query>, res: Response, _next: NextFunction) => {
    const list = await m$article.listArticle(req.query)

    response.sendResponse(res, list)
})

/**
 * Add new Article
 * @param name name person
 * @param email email person
 * @param title title article
 * @param category title category
 * @param tags tags article
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
 * @param category title category
 * @param tags tags article
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

/**
 * Publish Article
 * @param id id article
 */
ArticleController.post('/publish/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const publish = await m$article.publishArticle(req.params.id)
    
    response.sendResponse(res, publish)
})