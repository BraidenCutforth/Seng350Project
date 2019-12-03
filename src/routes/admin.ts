import { NextFunction, Request, Response, Router } from 'express'
import { User } from '../models/user'
import { BaseRoute } from './route'
import { Auth } from '../middleware/auth'

export class AdminRoute extends BaseRoute {
    async deleteUser(req: Request, res: Response) {
        try {
            const username = req.params.username
            const user = await User.getUser(username)
            await User.deleteUser(user)

            // re-render view
            const userData = await User.getUsers()
            res.render('admin', { userData })
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async index(req: Request, res: Response) {
        const userData = await User.getUsers()

        //render template
        res.render('admin', { userData, currUser: req.cookies.user })
    }

    public getRouter(): Router {
        console.log('[AdminRoute::getRouter] Creating admin router.')
        const router = Router()
        // add home page route
        router.use(Auth.isAdmin)
        router
            // render main admin page
            .get('/', (req: Request, res: Response) => {
                this.index(req, res)
            })

            // Delete method. Note the DELETE method was not used because it is not supported
            // by HTML forms so POST was used instead.
            .post('/delete/:username', (req: Request, res: Response) => {
                this.deleteUser(req, res)
            })

        return router
    }
}
