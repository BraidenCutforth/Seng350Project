import { getDb } from '../db'
import { ObjectId } from 'mongodb'
import { Review } from './review'
import escapeRegExp from 'lodash.escaperegexp'

export interface IDestination {
    _id?: ObjectId
    name: string
    country: string
    description: string
    img: string
    stars: number
    reviews: Review[]
    spamScore: number
}

export class Destination {
    public static async getDestination(id: ObjectId) {
        const collection = getDb().collection('destinations')
        const destination = await collection.find({ _id: id }).toArray()
        if (destination.length == 0) {
            return Promise.reject(`No destinations found`)
        } else if (destination.length == 1) {
            return destination[0] as IDestination
        } else {
            return Promise.reject(new Error('More than one destination found.'))
        }
    }

    public static async getDestinations(destIds: ObjectId[]) {
        const collection = getDb().collection('destinations')
        const destinations = await collection
            .find({
                _id: { $in: destIds },
            })
            .toArray()
        return destinations as IDestination[]
    }

    public static async deleteDestination(destination: IDestination) {
        const collection = getDb().collection('destinations')
        const result = await collection.deleteOne(destination)
        return result
    }

    public static async updateDestination(id: ObjectId, destinationData: Partial<IDestination>) {
        const collection = getDb().collection('destinations')
        const result = await collection.updateOne({ _id: id }, { $set: destinationData })
        return result
    }

    public static async addDestination(destination: IDestination) {
        const collection = getDb().collection('destinations')
        const result = await collection.insertOne(destination)
        return result
    }

    public static async searchDestinations(queryString: string) {
        const collection = getDb().collection('destinations')
        const parsedQS = escapeRegExp(queryString)
        const regex = new RegExp(`.*${parsedQS}.*`, 'i')
        const result = await collection
            .find({ name: regex })
            .sort({ name: 1 })
            .toArray()
        return result
    }
}
