import { ProfileRoute } from '../profile'
import { IUser, User } from '../../models/user'
import { Review } from '../../models/review'

import { Request, Response } from 'express'

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

describe('profile route', () => {
    describe('profile page', () => {
        test('success', async () => {
            const profileRoute = new ProfileRoute()
            const render = jest.fn()
            profileRoute['parseUser'] = jest.fn(async () => ({} as any))
            profileRoute.render = render

            const req = ({
                params: {
                    username: 'test',
                },
                cookies: {
                    user: 'test',
                },
            } as unknown) as Request
            const res = {} as Response

            await profileRoute.index(req, res)

            expect(render).toHaveBeenCalledWith(
                { cookies: { user: 'test' }, params: { username: 'test' } },
                {},
                'profile',
                {},
            )
        })

        test('failure', async () => {
            const profileRoute = new ProfileRoute()
            const render = jest.fn()
            profileRoute['parseUser'] = jest.fn(async () => {
                throw 'error'
            })
            profileRoute.render = render

            const req = ({
                params: {
                    username: 'test',
                },
                cookies: {
                    user: 'test',
                },
            } as unknown) as Request
            const res = {} as Response

            await profileRoute.index(req, res)

            expect(render).toHaveBeenCalledWith({ cookies: { user: 'test' }, params: { username: 'test' } }, {}, '404')
        })
    })

    describe('isCurrentUser', () => {
        test('true', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({ username: 'jchua' } as IUser, 'jchua')

            expect(result).toBe(true)
        })

        test('false wrong username', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({ username: 'something' } as IUser, 'jchua')

            expect(result).toBe(false)
        })

        test('false username undefined', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({} as IUser, 'jchua')

            expect(result).toBe(false)
        })
    })

    describe('parseUser', () => {
        test('success', async () => {
            const profileRoute = new ProfileRoute()
            profileRoute['isCurrentUser'] = jest.fn(() => true)
            Review.getReviews = jest.fn(async () => [])
            User.getUser = jest.fn(async () => mockUser)

            const result = await new ProfileRoute()['parseUser']('jchua', '')
            expect(result).toStrictEqual({
                ...mockUser,
                isOwnProfile: true,
                currUser: '',
                dateJoined: '',
                reviewCount: 0,
                reviewData: [],
            })
        })

        test('failure', async () => {
            const profileRoute = new ProfileRoute()
            profileRoute['isCurrentUser'] = jest.fn(() => true)
            Review.getReviews = jest.fn(async () => [])
            User.getUser = jest.fn(async () => {
                throw 'failure'
            })

            expect(new ProfileRoute()['parseUser']('jchua', '')).rejects.toEqual('failure')
        })
    })

    describe('getRouter', () => {
        test('get router', () => {
            const router = new ProfileRoute().getRouter()

            expect(router).toBeDefined()
        })
    })
})
