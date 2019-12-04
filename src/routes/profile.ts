import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { IUser, User } from '../models/user'
import dayjs from 'dayjs'
import { IHeaderOpts } from './helpers'
import { Review } from '../models/review'
import marked from 'marked'

interface IProfileData extends IUser, IHeaderOpts {
    dateJoined: string
    isOwnProfile: boolean
    reviewCount: number
    reviewData: { title: string; content: string }[]
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
            const profileData = await this.parseUser(username, req.cookies.user)
            this.render(req, res, 'profile', {
                ...profileData,
            })
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }

    public async parseUser(username: string, currUser: string): Promise<IProfileData> {
        const userData = await User.getUser(username)
        const isOwnProfile = this.isCurrentUser(userData, currUser)
        if (!userData.profilePic) {
            userData.profilePic = '/images/default-profile-pic.jpg'
        }
        const reviewCount = userData.reviews != undefined ? userData.reviews.length : -1
        let dateJoined = ''
        if (userData._id) {
            const date = userData._id.getTimestamp()
            dateJoined = dayjs(date).format('MMMM D, YYYY')
        }
        const reviews = await Review.getReviews(userData.reviews || [])
        const reviewData = reviews.map(review => ({ title: review.title, content: marked(review.content) }))
        const profileData: IProfileData = {
            dateJoined,
            isOwnProfile: isOwnProfile,
            reviewCount: reviewCount,
            currUser,
            ...userData,
            reviewData,
        }
        return profileData
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
