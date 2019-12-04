import { Auth } from '../auth'
import { User, IUser } from '../../models/user'
import { Request, Response } from 'express'
import { Dictionary } from 'express-serve-static-core'

const baseUser: IUser = {
    username: 'anything',
    firstName: 'any',
    lastName: 'thing',
    email: 'asdf@asdf.ca',
    bio: '',
    profilePic: '',
    location: '',
    reviews: [],
    isAdmin: false,
}

describe('Auth Middleware', () => {
    describe('Auth.isAdmin', () => {
        test('Is admin', async () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve({
                    ...baseUser,
                    isAdmin: true,
                })
            })
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
            } as Request
            const res = {} as Response

            res.render = render

            await Auth.isAdmin(req, res, next)

            expect(next).toHaveBeenCalled()
            expect(User.getUser).toHaveBeenCalledWith('someUser')
            expect(render).not.toHaveBeenCalled()
        })

        test('Not admin', async () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve({
                    ...baseUser,
                    isAdmin: false,
                })
            })
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
            } as Request
            const res = {} as Response

            res.render = render

            await Auth.isAdmin(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(User.getUser).toHaveBeenCalledWith('someUser')
            expect(render).toHaveBeenCalledWith('401')
        })

        test('Get user throws', async () => {
            User.getUser = jest.fn(() => {
                return Promise.reject('test error')
            })
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
            } as Request
            const res = {} as Response

            res.render = render

            await Auth.isAdmin(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(User.getUser).toHaveBeenCalledWith('someUser')
            expect(render).toHaveBeenCalledWith('404')
        })

        test('currUser undefined', async () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve({
                    ...baseUser,
                    isAdmin: false,
                })
            })
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: undefined,
                },
            } as Request
            const res = {} as Response

            res.render = render

            await Auth.isAdmin(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(render).toHaveBeenCalledWith('401')
        })
    })

    describe('Auth.isCurrentUser', () => {
        test('true', () => {
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someUser',
                } as Dictionary<string>,
            } as Request
            const res = {} as Response

            Auth.isCurrentUser(req, res, next)

            expect(next).toHaveBeenCalled()
            expect(render).not.toHaveBeenCalled()
        })
        test('false', () => {
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someDiffUser',
                } as Dictionary<string>,
            } as Request
            const res = {} as Response

            res.render = render

            Auth.isCurrentUser(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(render).toHaveBeenCalledWith('404')
        })
        test('currUser not defined', () => {
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: undefined,
                },
                params: {
                    username: 'someDiffUser',
                } as Dictionary<string>,
            } as Request
            const res = {} as Response

            res.render = render

            Auth.isCurrentUser(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(render).toHaveBeenCalledWith('404')
        })
        test('username not defined', () => {
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: undefined,
                } as Dictionary<string | undefined>,
            } as Request
            const res = {} as Response

            res.render = render

            Auth.isCurrentUser(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(render).toHaveBeenCalledWith('404')
        })
        test('userame & curr user not defined', () => {
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: undefined,
                },
                params: {
                    username: undefined,
                } as Dictionary<string | undefined>,
            } as Request
            const res = {} as Response

            res.render = render

            Auth.isCurrentUser(req, res, next)

            expect(next).not.toHaveBeenCalled()
            expect(render).toHaveBeenCalledWith('404')
        })
    })
})
