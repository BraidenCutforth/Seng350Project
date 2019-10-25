import { client } from '../index'

export interface IUser {
    _id?: string
    firstName: string
    lastName: string
    email: string
    username: string
    profilePic: string
    bio: string
    location: string
    joined: string
    reviews: string[]
    isAdmin: boolean
}

export class User {
    public static async getUser(username: string) {
        const collection = client.db('runaway').collection('users')
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
        const collection = client.db('runaway').collection('users')
        const users = await collection.find({}).toArray()
        return users
    }

    public static async deleteUser(user: IUser) {
        const collection = client.db('runaway').collection('users')
        const result = await collection.deleteOne(user)
        console.log(result)
    }

    public static async updateUser() {}

    public static async addUser(user: IUser) {
        const collection = client.db('runaway').collection('users')
        const result = await collection.insertOne(user)
        console.log(result)
    }
}
