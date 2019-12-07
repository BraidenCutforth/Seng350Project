import { ReviewRoute } from '../reviews'
import { Review, IReview } from '../../models/review'
import { ObjectId } from 'bson'
import { Dictionary } from 'express-serve-static-core'
import { Response, Request } from 'express'
import { User, IUser } from '../../models/user'
import { InsertOneWriteOpResult, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb'
import { Destination, IDestination } from '../../models/destination'

const destId = new ObjectId()
const creatorId = new ObjectId()
const revId = new ObjectId()

const mockReview: IReview = {
    content: '',
    destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
    title: '',
    stars: 5,
    creator_id: creatorId, // eslint-disable-line @typescript-eslint/camelcase
    reviewRating: {
        upvoters: [],
        downvoters: [],
    },
    spamScore: 2,
}

const mockUser: IUser = {
    _id: new ObjectId(),
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profilePic: '',
    bio: '',
    location: '',
    reviews: [],
    isAdmin: true,
}

const mockDestination: IDestination = {
    name: '',
    country: 'CA',
    img: '',
    description: '',
    stars: 3,
    reviews: [],
    spamScore: 2,
}

describe('Review Route', () => {
    describe('getRouter', () => {
        const router = new ReviewRoute().getRouter()

        expect(router).toBeDefined()
    })

    describe('review page', () => {
        test('works', async () => {
            const reviewRoute = new ReviewRoute()
            Review.getReview = jest.fn(() => Promise.resolve(mockReview))
            User.getUser = jest.fn(() => Promise.resolve(mockUser))

            const render = jest.fn()

            const res = {} as Response
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someUser',
                } as Dictionary<string>,
            } as Request

            reviewRoute.render = render

            await reviewRoute.reviewPage(req, res)

            expect(render).toHaveBeenCalledWith(
                {
                    cookies: {
                        user: 'someUser',
                    },
                    params: {
                        username: 'someUser',
                    },
                },
                {},
                'review',
                {
                    content: '',
                    creator_id: creatorId, // eslint-disable-line @typescript-eslint/camelcase
                    currUser: 'someUser',
                    destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
                    isAdmin: true,
                    isReviewCreator: false,
                    reviewHtml: '',
                    reviewRating: { downvoters: [], upvoters: [] },
                    spamScore: 2,
                    stars: 5,
                    title: '',
                },
            )
        })

        test('create review', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            User.getUser = jest.fn(() => Promise.resolve(mockUser))
            Review.addReview = jest.fn(() => Promise.resolve({} as InsertOneWriteOpResult<any>))
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    destinationId: destId.toHexString(),
                },
                body: {
                    title: 'some title',
                    content: 'some content',
                },
            } as unknown) as Request

            await reviewRoute.createReview(req, res)

            expect(render).not.toHaveBeenCalled()
            expect(res.redirect).toHaveBeenCalledWith(`/destination/${destId.toHexString()}`)
        })

        test('delete review', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Review.getReview = jest.fn(() => Promise.resolve(mockReview))
            Review.deleteReview = jest.fn(() => Promise.resolve({} as DeleteWriteOpResultObject))
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    destinationId: destId.toHexString(),
                },
                body: {
                    title: 'some title',
                    content: 'some content',
                },
            } as unknown) as Request

            await reviewRoute.deleteReview(req, res)

            expect(render).not.toHaveBeenCalled()
            expect(res.redirect).toHaveBeenCalledWith(`/destination/${destId.toHexString()}`)
        })

        test('delete review - fail', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Review.getReview = jest.fn(() => {
                return Promise.reject('Review not found')
            })
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    reviewId: revId.toHexString(),
                },
            } as unknown) as Request

            await reviewRoute.deleteReview(req, res)

            expect(render).toHaveBeenCalledWith(req, res, '404')
        })

        test('edit review', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Review.getReview = jest.fn(() => Promise.resolve(mockReview))
            Destination.getDestination = jest.fn(() => Promise.resolve(mockDestination))
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    destinationId: destId.toHexString(),
                },
                body: {
                    title: 'some title',
                    content: 'some content',
                },
            } as unknown) as Request

            await reviewRoute.editReview(req, res)

            expect(render).toHaveBeenCalledWith(req, res, 'edit-review', {
                content: '',
                creator_id: creatorId, // eslint-disable-line @typescript-eslint/camelcase
                currUser: 'someUser',
                destName: '',
                destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
                reviewRating: {
                    downvoters: [],
                    upvoters: [],
                },
                spamScore: 2,
                stars: 5,
                title: '',
            })
        })

        test('edit review - fail', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Review.getReview = jest.fn(() => {
                return Promise.reject('Review not found')
            })
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    reviewId: revId.toHexString(),
                },
            } as unknown) as Request

            await reviewRoute.editReview(req, res)

            expect(render).toHaveBeenCalledWith(req, res, '404')
        })

        test('update review', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            reviewRoute['parseReview'] = jest.fn()
            Review.getReview = jest.fn(() => Promise.resolve(mockReview))
            Review.updateReview = jest.fn(() => Promise.resolve({} as UpdateWriteOpResult))
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    reviewId: revId.toHexString(),
                },
                url: 'testurl',
            } as unknown) as Request

            await reviewRoute.updateReview(req, res)

            expect(render).not.toHaveBeenCalled()
            expect(res.redirect).toHaveBeenCalledWith(`/review/${revId.toHexString()}`)
        })

        test('fails- no user id', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            User.getUser = jest.fn(() => {
                return Promise.reject('User not found')
            })
            Review.addReview = jest.fn(() => Promise.resolve({} as InsertOneWriteOpResult<any>))
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    destinationId: destId.toHexString(),
                },
                body: {
                    title: 'some title',
                    content: 'some content',
                },
            } as unknown) as Request

            await reviewRoute.createReview(req, res)
            expect(render).toHaveBeenCalledWith(req, res, '404')
        })

        test('parse review', async () => {
            const fn = new ReviewRoute()['parseReview']
            const req = {
                body: mockReview,
            } as Request
            const result = fn(req)

            expect(result).toMatchObject({
                creator_id: creatorId, // eslint-disable-line @typescript-eslint/camelcase
                destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
                reviewRating: {
                    downvoters: [],
                    upvoters: [],
                },
                spamScore: 2,
                stars: 5,
            })
        })

        test('parse review - fail', () => {
            const fn = new ReviewRoute()['parseReview']
            const req = {
                body: '',
            } as Request

            expect(() => fn(req)).toThrow()
        })

        test('update review - fail', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Review.updateReview = jest.fn(() => {
                return Promise.reject('Review not found')
            })
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    reviewId: revId.toHexString(),
                },
                url: 'testurl',
            } as unknown) as Request

            await reviewRoute.updateReview(req, res)
            expect(res.redirect).toHaveBeenCalledWith(`testurl`)
        })

        test('fails- create page', async () => {
            const render = jest.fn()
            const reviewRoute = new ReviewRoute()
            reviewRoute.render = render
            Destination.getDestination = jest.fn(() => {
                return Promise.reject('Destination not found')
            })
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response
            const req = ({
                cookies: {
                    user: 'someUser',
                },
                params: {
                    destinationId: destId.toHexString(),
                },
                body: {
                    title: 'some title',
                    content: 'some content',
                },
            } as unknown) as Request

            await reviewRoute.createPage(req, res)
            expect(render).toHaveBeenCalledWith(req, res, '404')
        })
    })
})
