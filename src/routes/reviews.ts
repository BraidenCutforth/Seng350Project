import { BaseRoute } from './route'
import { Router, Request, Response } from 'express'
import { Review, IReview } from '../models/review'
import { Destination, IDestination } from '../models/destination'
import { ObjectId } from 'mongodb'
import { User } from '../models/user'
import { IHeaderOpts } from './helpers'
import url from 'url'
import marked from 'marked'

interface CreateReviewParams extends IHeaderOpts {
    destination: string
    destinationId: string
    username: string
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
            .get('/edit/:reviewId', (req, res) => this.editReview(req, res))
            .post('/update/:reviewId', (req, res) => this.updateReview(req, res))
            .post('/create/:destinationId', (req, res) => this.createReview(req, res))
            .post('/delete/:reviewId', (req, res) => this.deleteReview(req, res))
        return router
    }

    async reviewPage(req: Request, res: Response) {
        const reviewId = new ObjectId(req.params.reviewId)
        try {
            const review = await Review.getReview(reviewId)
            // Get review, and populate reviewOpts
            // const reviewOpts: ReviewOpts = {}
            const reviewHtml = marked(review.content)
            const username = req.cookies.user
            let isReviewCreator = false
            let isAdmin = false
            if (username) {
                const user = await User.getUser(username)
                if (user._id != undefined && user._id.equals(review.creator_id)) {
                    isReviewCreator = true
                }
                if (user.isAdmin) {
                    isAdmin = true
                }
            }
            this.render(req, res, 'review', {
                ...review,
                reviewHtml,
                isAdmin,
                isReviewCreator,
                currUser: req.cookies.user,
            })
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async createReview(req: Request, res: Response) {
        const destinationId = req.params.destinationId
        const username = req.body['user']
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
                title: req.body['title'],
                content: req.body['content'],
                stars: 1,
                reviewRating: {
                    upvoters: [],
                    downvoters: [],
                },
                creator_id: new ObjectId(user._id), // eslint-disable-line @typescript-eslint/camelcase
                spamScore: 0,
            }
            await Review.addReview(review)
            // Now we need to render the review page.
            res.redirect(
                url.format({
                    pathname: `/destination/${destinationId}`,
                    query: req.query,
                }),
            )
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async createPage(req: Request, res: Response) {
        const destinationId = req.params.destinationId
        const username = req.cookies.user as string
        try {
            const destination = await Destination.getDestination(new ObjectId(destinationId))
            const options: CreateReviewParams = {
                destination: destination.name,
                destinationId,
                currUser: req.cookies.user,
                username,
            }
            this.render(req, res, 'create-review', options)
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async deleteReview(req: Request, res: Response) {
        const reviewId = new ObjectId(req.params.reviewId)
        try {
            const review = await Review.getReview(reviewId)
            if (review) {
                Review.deleteReview(reviewId)
            }
            res.redirect(
                url.format({
                    pathname: `/destination/${review.destination_id}`,
                    query: req.query,
                }),
            )
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async editReview(req: Request, res: Response) {
        const reviewId = new ObjectId(req.params.reviewId)
        try {
            const review = await Review.getReview(reviewId)
            const destination = await Destination.getDestination(review.destination_id)
            const destName = destination.name
            this.render(req, res, 'edit-review', { ...review, destName, currUser: req.cookies.user })
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }

    async updateReview(req: Request, res: Response) {
        const reviewId = req.params.reviewId
        try {
            const reviewInfo = this.parseReview(req)

            await Review.updateReview(new ObjectId(reviewId), reviewInfo)
            res.redirect(
                url.format({
                    pathname: `/review/${reviewId}`,
                    query: req.query,
                }),
            )
        } catch {
            res.redirect(req.url)
        }
    }

    private parseReview(req: Request): IReview {
        const newReviewInfo = req.body
        if (typeof newReviewInfo !== 'object') {
            throw new Error('review is undefined')
        }
        Object.keys(newReviewInfo).forEach(
            key => (newReviewInfo[key] == null || newReviewInfo[key] == '') && delete newReviewInfo[key],
        )
        return newReviewInfo
    }
}
