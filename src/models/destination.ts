import { getDb } from '../db'
import { ObjectId } from 'mongodb'

export interface IDestination {
    _id?: ObjectId
    name: string
    country: string
    description: string
    stars: number
    //TODO: change this to Review[]
    reviews: string[]
    spamScore: number
}

export class Destination {
    public static async getDestination(id: ObjectId) {
        const collection = getDb().collection('destinations')
        const destination = await collection.find({ _id: id }).toArray()
        if (destination.length == 0) {
            return Promise.reject(`No destinations found`)
        } else if (destination.length == 1) {
            console.log(destination[0])
            return destination[0] as IDestination
        } else {
            return Promise.reject(new Error('More than one destination found.'))
        }
    }

    public static async getDestinations() {
        const collection = getDb().collection('destinations')
        const destinations = await collection.find({}).toArray()
        return destinations as IDestination[]
    }

    public static async deleteDestination(destination: IDestination) {
        const collection = getDb().collection('destinations')
        const result = await collection.deleteOne(destination)
        console.log(result)
    }

    public static async updateDestination(id: ObjectId, destinationData: Partial<IDestination>) {
        const collection = getDb().collection('destinations')
        const result = await collection.updateOne({ _id: id }, { $set: destinationData })
        console.log(result)
    }

    public static async addDestination(destination: IDestination) {
        const collection = getDb().collection('destinations')
        const result = await collection.insertOne(destination)
        console.log(result)
    }
}
