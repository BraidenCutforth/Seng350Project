import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { IUser, User } from '../models/user'
import url from 'url'

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
    public getRouter(): Router {
        //log
        console.log('[EditProfileRoute::getRouter] Creating edit profile router.')

        const router = Router()

        //add edit profile page route
        router
            .get('/edit/:username', (req: Request, res: Response, next: NextFunction) => {
                this.index(req, res, next)
            })
            .post('/edit/:username', (req: Request, res: Response, next: NextFunction) => {
                this.updateUser(req, res, next)
            })

        return router
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
    async index(req: Request, res: Response, next: NextFunction) {
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

    /**
     * Handles user creation. Once user is created they are redirected to their profile page.
     * Otherwise sends the user to signup page if their user does not exist
     *
     * @class EditProfileRoute
     * @method updateUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    async updateUser(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username
        try {
            const userInfo = this.parseUser(req)
            await User.updateUser(username, userInfo)
            res.redirect(
                url.format({
                    pathname: `/profile/${username}`,
                    query: req.query,
                }),
            )
        } catch {
            res.redirect(req.url)
        }
    }

    private parseUser(req: Request): IUser {
        const newUserInfo = req.body
        if (typeof newUserInfo !== 'object') {
            throw new Error('info is undefined')
        }
        Object.keys(newUserInfo).forEach(
            key => (newUserInfo[key] == null || newUserInfo[key] == '') && delete newUserInfo[key],
        )
        return newUserInfo
    }
}
