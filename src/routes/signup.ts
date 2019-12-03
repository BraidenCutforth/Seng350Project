import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { User, IUser } from '../models/user'

/**
 * / route
 *
 * @class SignUpRoute
 */
export class SignUpRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class SignUpRoute
     * @method create
     * @static
     */
    public getRouter() {
        console.log('[SignUpRoute::getRouter] Creating sign up router.')

        const router = Router()

        // add home page route
        router
            .get('/', (req: Request, res: Response, next: NextFunction) => {
                this.index(req, res, next)
            })
            .post('/', (req: Request, res: Response, next: NextFunction) => {
                this.createUser(req, res, next)
            })

        return router
    }

    /**
     * Constructor
     *
     * @class SignUpRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The sign up page route.
     *
     * @class SignUpRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //render template
        this.render(req, res, 'signup', { currUser: req.cookies.user })
    }

    /**
     * Handles user creation. Once user is created they are redirected to their profile page.
     * Otherwise sends the user to signup page if their user does not exist
     *
     * @class SignUpRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userInfo = this.parseUser(req)
            await User.addUser(userInfo)
            res.redirect(`/profile/${userInfo.username}`)
        } catch {
            res.redirect('/signup')
        }
    }

    private parseUser(req: Request): IUser {
        const newUserInfo = req.body
        const user = {
            firstName: newUserInfo['firstname'],
            lastName: newUserInfo['lastname'],
            email: newUserInfo['email'],
            username: newUserInfo['username'],
            profilePic: '',
            bio: '',
            location: '',
            joined: new Date().toISOString(),
            isAdmin: false,
            reviews: [],
        }

        if (!user.email || !user.username || !user.firstName || !user.lastName) {
            throw new Error('Incomplete information')
        }

        return user
    }
}
