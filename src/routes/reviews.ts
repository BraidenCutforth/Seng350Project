import { BaseRoute } from './route'
import { Router, Request, Response } from 'express'
import { Review, IReview } from '../models/review'
import { ObjectId } from 'mongodb'

interface CreateReviewParams {
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
        // TODO: Parse review content from page into IReview structure
        const review: IReview = {
            destination_id: new ObjectId(destinationId), // eslint-disable-line
            title: '',
            content: '',
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            creator_id: new ObjectId(), // eslint-disable-line
            spamScore: 0,
        }
        await Review.addReview(review)
    }

    async createPage(req: Request, res: Response) {
        const destinationId = req.params.destinationId
        // TODO: Get the destination info (name) from the id in the url
        const options: CreateReviewParams = { destination: '', destinationId }
        this.render(req, res, 'create-review', options)
    }
}
