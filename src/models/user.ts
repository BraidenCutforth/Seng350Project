import { getDb } from '../db'
import { ObjectId } from 'mongodb'

export interface IUser {
    _id?: ObjectId
    firstName: string
    lastName: string
    email: string
    username: string
    profilePic: string
    bio: string
    location: string
    reviews: string[]
    isAdmin: boolean
}

export class User {
    public static async getUser(username: string) {
        const collection = getDb().collection('users')
        const user = await collection.find({ username: username }).toArray()
        if (user.length == 0) {
            return Promise.reject(`No users found matching username ${username}`)
        } else if (user.length == 1) {
            console.log(user[0])
            return user[0] as IUser
        } else {
            return Promise.reject(new Error('More than one user found.'))
        }
    }

    public static async getUsers() {
        const collection = getDb().collection('users')
        const users = await collection.find({}).toArray()
        return users as IUser[]
    }

    public static async deleteUser(user: IUser) {
        const collection = getDb().collection('users')
        const result = await collection.deleteOne(user)
        console.log(result)
    }

    public static async updateUser(username: string, userData: Partial<IUser>) {
        const collection = getDb().collection('users')
        const result = await collection.updateOne({ username: username }, { $set: userData })
        console.log(result)
    }

    public static async addUser(user: IUser) {
        const collection = getDb().collection('users')
        const result = await collection.insertOne(user)
        console.log(result)
    }
}
