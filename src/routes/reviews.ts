import { BaseRoute } from './route'
import { Router, Request, Response } from 'express'
import { Review, IReview } from '../models/review'
import { Destination, IDestination } from '../models/destination'
import { ObjectId } from 'mongodb'
import { User } from '../models/user'
import { IHeaderOpts, parseQueryParams } from './helpers'

interface CreateReviewParams extends IHeaderOpts {
    destination: string
    destinationId: string
}

interface ReviewOpts {
    title: string
    stars: number
    content: string
    upvoters: number
    downvoters: number
    creatorName: string
    creatorUsername: string
    destination: string
}

export class ReviewRoute extends BaseRoute {
    getRouter() {
        const router = Router()
        router
            .get('/:reviewId', (req, res) => this.reviewPage(req, res))
            .get('/create/:destinationId', (req, res) => this.createPage(req, res))
            .post('/create/:destinationId', (req, res) => this.createReview(req, res))
        return router
    }

    async reviewPage(req: Request, res: Response) {
        const reviewId = new ObjectId(req.params.reviewId)
        const review = await Review.getReview(reviewId)
        // Get review, and populate reviewOpts
        // const reviewOpts: ReviewOpts = {}
        this.render(req, res, 'render')
    }

    async createReview(req: Request, res: Response) {
        const destinationId = req.params.destinationId
        const username = req.query.user
        try {
            // TODO: Parse review content from page into IReview structure
            // seem to get the 'user not signed in' error even when signed in
            if (!username) {
                throw new Error('User not signed in')
            }
            const user = await User.getUser(username)
            if (!user._id) {
                throw new Error(`User id not found for ${username}`)
            }

            const review: IReview = {
                destination_id: new ObjectId(destinationId), // eslint-disable-line @typescript-eslint/camelcase
                title: '',
                content: '',
                stars: 1,
                reviewRating: {
                    upvoters: [],
                    downvoters: [],
                },
                creator_id: new ObjectId(user._id), // eslint-disable-line @typescript-eslint/camelcase
                spamScore: 0,
            }
            await Review.addReview(review)
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async createPage(req: Request, res: Response) {
        const destinationId = req.params.destinationId
        try {
            const destination = await Destination.getDestination(new ObjectId(destinationId))
            const options: CreateReviewParams = {
                destination: destination.name,
                destinationId,
                queryParams: parseQueryParams(req),
            }
            this.render(req, res, 'create-review', options)
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }
}
