import { getDb } from '../db'
import { ObjectId } from 'mongodb'

export interface IReview {
    _id?: ObjectId
    destination_id: ObjectId
    title: string
    content: string
    creator_id: string
    stars: number
    reviewRating: {
        upvoters: ObjectId[]
        downvoters: ObjectId[]
    }
    spamScore: number
}

export class Review {
    public static async getReview(_id: ObjectId) {
        const collection = getDb().collection('reviews')
        const review = await collection.find({ _id }).toArray()
        if (review.length == 0) {
            return Promise.reject(`No review found matching id ${_id}`)
        } else if (review.length == 1) {
            console.log(review[0])
            return review[0] as IReview
        } else {
            return Promise.reject(new Error('More than one country found.'))
        }
    }

    public static async getReviewsForDestination(destinationId: ObjectId) {
        const collection = getDb().collection('reviews')
        // eslint-disable-next-line @typescript-eslint/camelcase
        const countries = await collection.find({ destination_id: destinationId }).toArray()
        return countries as IReview[]
    }

    public static async deleteReview(_id: ObjectId) {
        const collection = getDb().collection('reviews')
        const result = await collection.deleteOne({ _id })
        console.log(result)
    }

    public static async updateReview(_id: ObjectId, reviewData: Partial<IReview>) {
        const collection = getDb().collection('countries')
        const result = await collection.updateOne({ _id }, { $set: reviewData })
        console.log(result)
    }

    public static async addReview(review: IReview) {
        const collection = getDb().collection('countries')
        const result = await collection.insertOne(review)
        console.log(result)
    }
}
