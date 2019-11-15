import { BaseRoute } from './route'
import { Router, Request, Response, NextFunction } from 'express'

export class ReviewRoute extends BaseRoute {
    getRouter() {
        const router = Router()

        router
            .get('/:review')
            .get('/create', (req, res, next) => this.createPage(req, res, next))
            .post('/create')

        return router
    }

    createPage(req: Request, res: Response, next: NextFunction) {
        this.render(req, res, 'create-review')
    }
}
