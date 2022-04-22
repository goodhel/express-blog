import { Application, Router } from "express";

const _routes: [string, Router][] = [

]

export const routes = (app: Application) => {
    _routes.forEach((router) => {
        const [ url, controller ] = router
        app.use(`/api/${url}`, controller)
    })
}