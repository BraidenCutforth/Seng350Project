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
