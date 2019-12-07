import { User, IUser } from '../user'
import { ObjectId } from 'mongodb'

describe('user model tests', () => {
    test('Add user', async () => {
        const _id = new ObjectId()
        const user: IUser = {
            _id,
            firstName: 'Bob',
            lastName: 'Smith',
            username: 'xyz778asdfasdf',
            email: 'xyz778asdfasdf@gmail.com',
            bio: 'My user bio',
            profilePic: 'nothing',
            location: '',
            reviews: [],
            isAdmin: false,
        }

        const result = await User.addUser(user)
        expect(result.insertedCount).toBe(1)

        await User.deleteUser(user)
    })

    test('get user', async () => {
        const user = await User.getUser('jchua')
        expect(user).not.toBeNull()
        expect(user.firstName).toBe('Jerusha')
    })

    test('get user fail', async () => {
        await expect(User.getUser('ajsdfhasjkdfhlakjsdhfjkasdhf')).rejects.toEqual(
            'No users found matching username ajsdfhasjkdfhlakjsdhfjkasdhf',
        )
    })

    test('get all users', async () => {
        const result = await User.getAllUsers()
        expect(result.length).toBeGreaterThanOrEqual(1)
    })

    test('get users', async () => {
        const _id1 = new ObjectId()
        const _id2 = new ObjectId()
        const user1: IUser = {
            _id: _id1,
            firstName: 'Bob',
            lastName: 'Smith',
            username: 'fajsdflajsdhfjkaslhdfhasldjfhaksdj',
            email: 'xyz778asdfasdf@gmail.com',
            bio: 'My user bio',
            profilePic: 'nothing',
            location: '',
            reviews: [],
            isAdmin: false,
        }

        const user2: IUser = {
            _id: _id2,
            firstName: 'Bob',
            lastName: 'Smith',
            username: 'jibberishusernameasdjflkasjdfkj;2',
            email: 'xyz778asdfasdf@gmail.com',
            bio: 'My user bio',
            profilePic: 'nothing',
            location: '',
            reviews: [],
            isAdmin: false,
        }

        await User.addUser(user1)
        await User.addUser(user2)

        const result = await User.getUsers([_id1, _id2])

        await Promise.all([User.deleteUser(user1), User.deleteUser(user2)])

        expect(result.length).toBe(2)
        expect(result).toContainEqual(user1)
        expect(result).toContainEqual(user2)
    })

    test('update user', async () => {
        const _id = new ObjectId()
        const username = 'asdjfkla;sdfaksdjfl;aaklsdjffdasdf'
        const newBio = 'There is a new bio for ya'
        const user: IUser = {
            _id,
            firstName: 'Bob',
            lastName: 'Smith',
            username,
            email: 'xyz778asdfasdf@gmail.com',
            bio: 'My user bio',
            profilePic: 'nothing',
            location: '',
            reviews: [],
            isAdmin: false,
        }

        await User.addUser(user)

        const result = await User.updateUser(username, { bio: newBio })
        const updatedUser = await User.getUser(username)

        await User.deleteUser(updatedUser)

        expect(result.modifiedCount).toBe(1)
        expect(updatedUser.bio).toEqual(newBio)
    })

    test('remove user', async () => {
        const date = new Date()
        const user: IUser = {
            firstName: 'Billy Bob',
            lastName: 'Thorton',
            username: 'xxxyyyyzzz',
            email: 'xyz778asdfasdf@gmail.com',
            bio: 'My user bio',
            profilePic: 'nothing',
            location: '',
            reviews: [],
            isAdmin: false,
        }
        await User.addUser(user)

        const numUsers = (await User.getAllUsers()).length

        await User.deleteUser(user)

        const newNumUsers = (await User.getAllUsers()).length
        expect(newNumUsers).toBe(numUsers - 1)
    })
})
