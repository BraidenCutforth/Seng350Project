import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'

import url from 'url'
import { User } from '../models/user'
import { IHeaderOpts } from './helpers'

interface LoginOptions extends IHeaderOpts {
    loginErr?: boolean
}

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
            .get('/', (req: Request, res: Response) => {
                this.index(req, res)
            })

            .get('/logout', (req: Request, res: Response) => {
                this.handleLogout(req, res)
            })

            // log the user in
            .post('/', (req: Request, res: Response) => {
                this.handleLogin(req, res)
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
    public index(req: Request, res: Response) {
        //set message
        const options: LoginOptions = {
            currUser: '',
        }

        //render template
        this.render(req, res, 'login', options)
    }

    /**
     * Handles user login and sets the cookie
     *
     * @class LoginRoute
     * @method handleLogin
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     */
    public async handleLogin(req: Request, res: Response) {
        // handle login flow here
        try {
            const credential = this.parseCredentials(req)
            if (!(await this.validCredential(credential))) {
                const loginOpts: LoginOptions = { currUser: '', loginErr: true }
                res.render('login', loginOpts)
                return
            }
            res.cookie('user', credential, { maxAge: 1800000 })
            res.redirect(
                url.format({
                    pathname: `/`,
                    query: req.query,
                }),
            )
        } catch (err) {
            res.status(404)
            res.render('404')
        }
    }

    /**
     * Handles user logout and unsets the cookie
     *
     * @class LoginRoute
     * @method handleLogout
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     */
    public handleLogout(req: Request, res: Response) {
        try {
            res.cookie('user', undefined, { maxAge: 0 })
            res.redirect('/')
        } catch (err) {
            res.status(404)
            res.render('404')
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

    private async validCredential(username: string) {
        try {
            const user = await User.getUser(username)
            if (user) {
                return true
            }
            return false
        } catch (err) {
            return false
        }
    }
}
