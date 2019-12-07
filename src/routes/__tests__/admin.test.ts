import { User, IUser } from '../../models/user'
import { Response, Request, NextFunction } from 'express'
import { Dictionary } from 'express-serve-static-core'
import { AdminRoute } from '../admin'
import { DeleteWriteOpResultObject } from 'mongodb'

const mockUser: IUser = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profilePic: '',
    bio: '',
    location: '',
    reviews: [],
    isAdmin: false,
}

describe('Admin Route', () => {
    describe('delete user', () => {
        test('works', async () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve(mockUser)
            })
            User.deleteUser = jest.fn(() => Promise.resolve({} as DeleteWriteOpResultObject))
            User.getAllUsers = jest.fn(() => Promise.resolve([mockUser]))

            const render = jest.fn()

            const res = {} as Response
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someUser',
                } as Dictionary<string>,
            } as Request

            res.render = render

            await new AdminRoute().deleteUser(req, res)

            expect(render).toHaveBeenCalledWith('admin', {
                currUser: 'someUser',
                userData: [
                    {
                        bio: '',
                        email: '',
                        firstName: '',
                        isAdmin: false,
                        lastName: '',
                        location: '',
                        profilePic: '',
                        reviews: [],
                        username: '',
                    },
                ],
            })
        })

        test('fails', async () => {
            const adminRoute = new AdminRoute()

            const render = jest.fn()

            adminRoute.render = render

            User.getUser = jest.fn(() => {
                return Promise.reject('User not found')
            })
            User.deleteUser = jest.fn(() => Promise.resolve({} as DeleteWriteOpResultObject))
            User.getAllUsers = jest.fn(() => Promise.resolve([mockUser]))

            const res = {} as Response
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someUser',
                } as Dictionary<string>,
            } as Request

            await adminRoute.deleteUser(req, res)

            expect(render).toHaveBeenCalledWith(req, res, '404')
        })
    })

    describe('index', () => {
        test('works', async () => {
            User.getAllUsers = jest.fn(() => Promise.resolve([mockUser]))

            const render = jest.fn()

            const res = {} as Response
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    username: 'someUser',
                } as Dictionary<string>,
            } as Request

            res.render = render

            await new AdminRoute().index(req, res)

            expect(render).toHaveBeenCalledWith('admin', {
                currUser: 'someUser',
                userData: [
                    {
                        bio: '',
                        email: '',
                        firstName: '',
                        isAdmin: false,
                        lastName: '',
                        location: '',
                        profilePic: '',
                        reviews: [],
                        username: '',
                    },
                ],
            })
        })
    })

    describe('getRouter', () => {
        const router = new AdminRoute().getRouter()

        expect(router).toBeDefined()
    })
})
