import { Review, IReview } from '../review'

import { initDb, closeDb } from '../../db'
import { ObjectId } from 'mongodb'

describe('review model tests', () => {
    beforeAll(async () => {
        await initDb()
    })
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

    afterAll(async () => {
        await closeDb()
    })
})
