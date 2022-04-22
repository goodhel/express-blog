import { Application, Router } from "express";
import { ArticleController } from "./controllers/ArticleController";
import { CommentController } from "./controllers/CommentController";

const _routes: [string, Router][] = [
    ['article', ArticleController],
    ['comment', CommentController],
]

export const routes = (app: Application) => {
    _routes.forEach((router) => {
        const [ url, controller ] = router
        app.use(`/api/${url}`, controller)
    })
}