import { Review, IReview } from '../review'

import { ObjectId } from 'mongodb'

describe('review model tests', () => {
    test('Add review', async () => {
        const id = new ObjectId()
        const review: IReview = {
            _id: id,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        // Assert the review doens't already exist
        await expect(Review.getReview(id)).rejects.toEqual(`No review found matching id ${id}`)

        // Add review
        await Review.addReview(review)

        // Get the review that was just added
        const retrievedReview = await Review.getReview(id)
        expect(retrievedReview._id).toEqual(id)

        // Delete and verify it isn't in db anymore
        await Review.deleteReview(id)
        await expect(Review.getReview(id)).rejects.toEqual(`No review found matching id ${id}`)
    })

    test('get review', async () => {
        const id = new ObjectId()
        const review: IReview = {
            _id: id,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        // Add review
        await Review.addReview(review)

        // Get the review that was just added
        const retrievedReview = await Review.getReview(id)
        expect(retrievedReview._id).toEqual(id)

        // Delete and verify it isn't in db anymore
        await Review.deleteReview(id)
        await expect(Review.getReview(id)).rejects.toEqual(`No review found matching id ${id}`)
    })

    test('get review fail', async () => {
        const id = new ObjectId()
        await expect(Review.getReview(id)).rejects.toEqual(`No review found matching id ${id}`)
    })

    test('get reviews', async () => {
        const _id1 = new ObjectId()
        const _id2 = new ObjectId()
        const review1: IReview = {
            _id: _id1,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }
        const review2: IReview = {
            _id: _id2,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        await Review.addReview(review1)
        await Review.addReview(review2)

        const result = await Review.getReviews([_id1, _id2])

        await Review.deleteReview(_id1)
        await Review.deleteReview(_id2)

        expect(result).toHaveLength(2)
        expect(result).toContainEqual(review1)
        expect(result).toContainEqual(review2)
    })

    test('get reviews for destination', async () => {
        const _id1 = new ObjectId()
        const _id2 = new ObjectId()
        const destId = new ObjectId()
        const review1: IReview = {
            _id: _id1,
            title: '',
            content: '',
            destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }
        const review2: IReview = {
            _id: _id2,
            title: '',
            content: '',
            destination_id: destId, // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        await Review.addReview(review1)
        await Review.addReview(review2)

        const result = await Review.getReviewsForDestination(destId)

        await Review.deleteReview(_id1)
        await Review.deleteReview(_id2)

        expect(result).toHaveLength(2)
        expect(result).toContainEqual(review1)
        expect(result).toContainEqual(review2)
    })

    test('remove review', async () => {
        const id = new ObjectId()
        const review: IReview = {
            _id: id,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        // Add review
        await Review.addReview(review)

        // Delete review
        const result = await Review.deleteReview(id)
        expect(result.deletedCount).toEqual(1)
    })

    test('Update Review', async () => {
        const newContent = 'dfkasjdfklajsdkfl;asdfjal;skdf'
        const _id = new ObjectId()
        const review: IReview = {
            _id,
            title: '',
            content: '',
            destination_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            creator_id: new ObjectId(), // eslint-disable-line @typescript-eslint/camelcase
            stars: 1,
            reviewRating: {
                upvoters: [],
                downvoters: [],
            },
            spamScore: 0,
        }

        await Review.addReview(review)

        const result = await Review.updateReview(_id, { ...review, content: newContent })
        const newReview = await Review.getReview(_id)
        await Review.deleteReview(_id)

        expect(result.modifiedCount).toEqual(1)
        expect(newReview.content).toEqual(newContent)
    })
})
