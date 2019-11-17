import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { IUser, User } from '../models/user'
import dayjs from 'dayjs'
import { IHeaderOpts, parseQueryParams } from './helpers'

interface IProfileData extends IUser, IHeaderOpts {
    joined: string
    isOwnProfile: boolean
    reviewCount: number
}

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
    public getRouter() {
        //log
        console.log('[ProfileRoute::getRouter] Creating profile router.')

        const router = Router()
        //add profile page route
        router.get('/:username', (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next)
        })

        return router
    }

    // May need different render functions for different page renderings, as they need different options
    render(req: Request, res: Response, template: string, options?: IProfileData) {
        super.render(req, res, template, options)
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
                userData.profilePic = '/images/default-profile-pic.jpg'
            }
            const reviewCount = userData.reviews != undefined ? userData.reviews.length : -1
            let joined = ''
            if (userData._id) {
                const date = userData._id.getTimestamp()
                joined = dayjs(date).format('MMMM D, YYYY')
            }
            this.render(req, res, 'profile', {
                ...userData,
                joined,
                isOwnProfile,
                reviewCount,
                queryParams: parseQueryParams(req),
            })
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
