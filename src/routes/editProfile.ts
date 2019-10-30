import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { IUser, User } from '../models/user'

/**
 * / route
 *
 * @class EditProfileRoute
 */
export class EditProfileRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class EditProfileRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log('[EditProfileRoute::create] Creating edit profile route.')

        //add edit profile page route
        router.get('/profile/edit/:username', (req: Request, res: Response, next: NextFunction) => {
            new EditProfileRoute().index(req, res, next)
        })
    }

    /**
     * Constructor
     *
     * @class EditProfileRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The edit profile page route.
     *
     * @class EditProfileRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username
        try {
            const userData = await User.getUser(username)
            if (!userData.profilePic) {
                userData.profilePic = '/images/default-profile-pic.jpg'
            }
            this.render(req, res, 'edit-profile', { ...userData })
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }
}
