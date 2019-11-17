import { User, IUser } from '../user'

import { initDb, closeDb } from '../../db'

describe('user model tests', () => {
    beforeAll(async () => {
        await initDb()
    })
    test('Add user', async () => {
        const numUsers = (await User.getUsers()).length
        const date = new Date()
        const user: IUser = {
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

        await User.addUser(user)

        const newNumUsers = (await User.getUsers()).length
        expect(newNumUsers).toBe(numUsers + 1)

        await User.deleteUser(user)
        expect((await User.getUsers()).length).toBe(numUsers)
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

        const numUsers = (await User.getUsers()).length

        await User.deleteUser(user)

        const newNumUsers = (await User.getUsers()).length
        expect(newNumUsers).toBe(numUsers - 1)
    })

    afterAll(async () => {
        await closeDb()
    })
})
