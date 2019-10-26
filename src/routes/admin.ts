import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { User } from '../models/user'

/**
 * / route
 *
 * @class AdminRoute
 */
export class AdminRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class AdminRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[AdminRoute::create] Creating admin route.')

        // add home page route
        router
            // render main admin page
            .get('/admin', (req: Request, res: Response, next: NextFunction) => {
                new AdminRoute().index(req, res, next)
            })

            // Delete method. Note the DELETE method was not used because it is not supported
            // by HTML forms so POST was used instead.
            .post('/admin/delete/:username', (req: Request, res: Response, next: NextFunction) => {
                new AdminRoute().delete(req, res, next)
            })
    }

    /**
     * Constructor
     *
     * @class AdminRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The admin page route.
     *
     * @class AdminRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     *
     * Handles rendering the admin page
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const userData = await User.getUsers()

        //render template
        this.render(req, res, 'admin', { userData })
    }

    /**
     * @class AdminRoute
     * @method delete
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     *
     * Handles deleting a user from the admin page.
     */
    public async delete(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username
        const user = await User.getUser(username)
        await User.deleteUser(user)

        // re-render view
        const userData = await User.getUsers()
        this.render(req, res, 'admin', { userData })
    }
}
