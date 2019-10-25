import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { User, IUser } from '../models/user'

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
            .get('/admin', (req: Request, res: Response, next: NextFunction) => {
                new AdminRoute().index(req, res, next)
            })

            // getting login info
            .post('/admin', (req: Request, res: Response, next: NextFunction) => {
                new AdminRoute().index(req, res, next)
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
     */
    public async index(req: Request, res: Response, next: NextFunction) {

        const userData = await User.getUsers()
        
        //render template
        this.render(req, res, 'admin', {userData})
    }
}
