import { getDb } from '../db'
import { ObjectId } from 'mongodb'

export interface ICountry {
    _id?: ObjectId
    code: string
    name: string
    description: string
    destinations: ObjectId[]
}

export class Country {
    public static async getCountry(code: string) {
        const collection = getDb().collection('countries')
        const country = await collection.find({ code: code }).toArray()
        if (country.length == 0) {
            return Promise.reject(`No countries found matching code ${code}`)
        } else if (country.length == 1) {
            return country[0] as ICountry
        } else {
            return Promise.reject(new Error('More than one country found.'))
        }
    }

    public static async getCountries() {
        const collection = getDb().collection('countries')
        const countries = await collection
            .find({})
            .sort({ name: 1 })
            .toArray()
        return countries as ICountry[]
    }

    public static async deleteCountry(country: ICountry) {
        const collection = getDb().collection('countries')
        const result = await collection.deleteOne(country)
        return result
    }

    public static async updateCountry(code: string, countryData: Partial<ICountry>) {
        const collection = getDb().collection('countries')
        const result = await collection.updateOne({ code: code }, { $set: countryData })
        return result
    }

    public static async addCountry(country: ICountry) {
        const collection = getDb().collection('countries')
        const result = await collection.insertOne(country)
        return result
    }
}
