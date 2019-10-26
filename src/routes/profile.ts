import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { IUser, User } from '../models/user'

/**
 * / route
 *
 * @class ProfileRoute
 */
export class ProfileRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class ProfileRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log('[ProfileRoute::create] Creating index route.')

        //add profile page route
        router.get('/profile/:username', (req: Request, res: Response, next: NextFunction) => {
            new ProfileRoute().index(req, res, next)
        })
    }

    /**
     * Constructor
     *
     * @class ProfileRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The profile page route.
     *
     * @class ProfileRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username
        try {
            const userData = await User.getUser(username)
            const isOwnProfile = this.isCurrentUser(userData, req.query.user)
            if (!userData.profilePic) {
                userData.profilePic = '/images/default-profile-pic.jpg';
            }
            let reviewCount = userData.reviews != undefined ? userData.reviews.length : -1;
            this.render(req, res, 'profile', { ...userData, isOwnProfile, reviewCount })
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }

    /**
     * Verifies that the user data object has the same username of the given username
     * @param userData User data object
     * @param username Username
     */
    public isCurrentUser(userData: IUser, username?: string) {
        return userData.username === username
    }
}
