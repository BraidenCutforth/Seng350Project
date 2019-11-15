import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { User } from '../models/user'

import url from 'url'

/**
 * / route
 *
 * @class LoginRoute
 */
export class LoginRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class LoginRoute
     * @method create
     * @static
     */
    public getRouter() {
        console.log('[LoginRoute::getRouter] Creating login router.')

        const router = Router()
        // add home page route
        router
            // Get login page
            .get('/', (req: Request, res: Response, next: NextFunction) => {
                this.index(req, res, next)
            })

            // log the user in
            .post('/', (req: Request, res: Response, next: NextFunction) => {
                this.handleLogin(req, res, next)
            })

        return router
    }

    /**
     * Constructor
     *
     * @class LoginRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The login page route.
     *
     * @class LoginRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set message
        const options: Record<string, any> = {}

        //render template
        this.render(req, res, 'login', options)
    }

    /**
     * Handles user login and sets the query parameter
     *
     * @class LoginRoute
     * @method handleLogin
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public handleLogin(req: Request, res: Response, next: NextFunction) {
        // handle login flow here
        try {
            const credential = this.parseCredentials(req)
            res.redirect(
                url.format({
                    pathname: `/profile/${credential}`,
                    query: {
                        ...req.query,
                        user: credential,
                    },
                }),
            )
        } catch (err) {
            res.status(404)
            res.send(err)
        }

        // if credientals are verified, redirect to index
    }

    /**
     * Parses out the user information from the login page
     * @param req Express request
     */
    private parseCredentials(req: Request): string {
        const credential = req.body
        const username = credential['username']
        if (typeof username !== 'string') {
            throw new Error('username is undefined')
        }
        return username
    }
}
