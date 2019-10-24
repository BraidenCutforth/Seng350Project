import { client } from '../index'

export interface IUser {
    firstName: string
    lastName: string
    email: string
    username: string
    profilePic: string
    bio: string
    location: string
    isAdmin: boolean
}

export class User {

    public static async getUser(username: string){
        const collection = client.db('runaway').collection('users')
        const user = await collection.find({'username': username}).toArray()
        if(username==="wallace") {
            return Promise.resolve({
            firstName: "Wallace",
            lastName: "Berder",
            email: "wberder@gmail.com",
            username: "wallace",
            profilePic: "https://pbs.twimg.com/profile_images/1163541386785746944/A1nz8DcJ_400x400.jpg",
            bio: "My name is Wallace Berder, and I enjoy touring around Europe",
            location: "Moscow, Russia",
            joined: "2019-09-01",
            isAdmin: true,
            reviewCount: 0,
            isOwnProfile: true
        })
        } else {
            return Promise.reject("Username not found")
        }
    }

    public static async getUsers() {

    }

    public static async deleteUser() {

    }

    public static async updateUser() {

    }

    public static async addUser() {

    }

}
