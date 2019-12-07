import { EditProfileRoute } from '../editProfile'
import { Request, Response } from 'express'
import { User, IUser } from '../../models/user'
import { UpdateWriteOpResult } from 'mongodb'

describe('edit profile test', () => {
    describe('parseUser', () => {
        test('success', () => {
            const fn = new EditProfileRoute()['parseUser']

            const result = fn({
                body: { bio: 'Live Laugh Love', email: 'jchua@gmail.com', location: 'Victoria, BC', username: 'jchua' },
            } as Request)

            expect(result).toMatchObject({
                bio: 'Live Laugh Love',
                email: 'jchua@gmail.com',
                location: 'Victoria, BC',
                username: 'jchua',
            })
        })

        test('success - empty fields', () => {
            const fn = new EditProfileRoute()['parseUser']

            const result = fn({
                body: { bio: '', email: 'jchua@gmail.com', location: '', username: 'jchua' },
            } as Request)

            expect(result).toMatchObject({ email: 'jchua@gmail.com', username: 'jchua' })
        })

        test('wrong type', () => {
            const fn = new EditProfileRoute()['parseUser']

            expect(() => {
                fn({ body: 'not object' } as Request)
            }).toThrow()
        })
    })

    describe('index route', () => {
        test('works', async () => {
            const editProfileRoute = new EditProfileRoute()
            User.getUser = jest.fn(() => Promise.resolve({} as IUser))
            const render = jest.fn()
            const username = 'test'
            editProfileRoute.render = render
            const req = ({
                params: {
                    username,
                },
                cookies: {
                    user: 'testUser',
                },
            } as unknown) as Request
            const res = {} as Response

            await editProfileRoute.index(req, res)

            expect(render).toHaveBeenCalledWith(
                { cookies: { user: 'testUser' }, params: { username: 'test' } },
                {},
                'edit-profile',
                { currUser: 'testUser', profilePic: '/images/default-profile-pic.jpg' },
            )
            expect(User.getUser).toHaveBeenCalledWith(username)
        })

        test('fails', async () => {
            const editProfileRoute = new EditProfileRoute()
            User.getUser = jest.fn(() => Promise.reject('user not found'))
            const render = jest.fn()
            const username = 'test'
            editProfileRoute.render = render
            const req = ({
                params: {
                    username,
                },
                cookies: {
                    user: 'testUser',
                },
            } as unknown) as Request
            const res = {} as Response

            await editProfileRoute.index(req, res)

            expect(render).toHaveBeenCalledWith(
                { cookies: { user: 'testUser' }, params: { username: 'test' } },
                {},
                '404',
            )
            expect(User.getUser).toHaveBeenCalledWith(username)
        })
    })

    describe('updateUser route', () => {
        test('works', async () => {
            const editProfileRoute = new EditProfileRoute()
            User.updateUser = jest.fn(() => Promise.resolve({} as UpdateWriteOpResult))
            const redirect = jest.fn()
            const parseUser = jest.fn(() => ({} as IUser))
            const username = 'test'
            editProfileRoute['parseUser'] = parseUser
            const req = ({
                params: {
                    username,
                },
                cookies: {
                    user: 'testUser',
                },
            } as unknown) as Request
            const res = {} as Response
            res.redirect = redirect

            await editProfileRoute.updateUser(req, res)

            expect(redirect).toHaveBeenCalledWith('/profile/test')
            expect(User.updateUser).toHaveBeenCalledWith('test', {})
        })

        test('fails', async () => {
            const editProfileRoute = new EditProfileRoute()
            User.updateUser = jest.fn(() => Promise.resolve({} as UpdateWriteOpResult))
            const redirect = jest.fn()
            const parseUser = jest.fn(() => {
                throw new Error()
            })
            const username = 'test'
            editProfileRoute['parseUser'] = parseUser
            const req = ({
                params: {
                    username,
                },
                cookies: {
                    user: 'testUser',
                },
                url: 'testurl',
            } as unknown) as Request
            const res = {} as Response
            res.redirect = redirect

            await editProfileRoute.updateUser(req, res)

            expect(redirect).toHaveBeenCalledWith('testurl')
            expect(User.updateUser).not.toHaveBeenCalled()
        })
    })

    describe('getRouter', () => {
        test('returns router', () => {
            const router = new EditProfileRoute().getRouter()

            expect(router).toBeDefined()
        })
    })
})
