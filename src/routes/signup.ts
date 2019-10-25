import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { users } from '../mock_data/users'
import { User } from '../models/user'

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
    public static create(router: Router) {
        console.log('[SignUpRoute::create] Creating sign up route.')

        // add home page route
        router
            .get('/signup', (req: Request, res: Response, next: NextFunction) => {
                new SignUpRoute().index(req, res, next)
            })
            .post('/signup', (req: Request, res: Response, next: NextFunction) => {
                new SignUpRoute().createUser(req, res, next)
            })
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
        this.render(req, res, 'signup')
    }

    public createUser(req: Request, res: Response, next: NextFunction) {
        res.send('creating new user ...')

        const newUserInfo = req.body

        console.log('new name: ' + newUserInfo['name'])
        console.log('new username: ' + newUserInfo['username'])

        // create user in db
        const user: User = {
            firstName: newUserInfo['name'],
            lastName: null,
            email: null,
            username: newUserInfo['username'],
            profilePic: null,
            bio: null,
            location: null,
            joined: null,
            isAdmin: false,
            reviewCount: 0,
            isOwnProfile: true,
        }
    }
}
