import { SignUpRoute } from '../signup'
import { Request, Response } from 'express'
import { IUser, User } from '../../models/user'

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

describe('SignupRouter', () => {
    describe('SignUp Page', () => {
        test('get sign up page', () => {
            const signUpRoute = new SignUpRoute()
            const render = jest.fn()
            signUpRoute.render = render
            const req = {
                cookies: {
                    user: '',
                },
            } as Request
            const res = {} as Response

            signUpRoute.index(req, res)

            expect(render).toHaveBeenCalledWith({ cookies: { user: '' } }, {}, 'signup', { currUser: '' })
        })
    })

    describe('createUser', () => {
        test('success', async () => {
            const signUpRoute = new SignUpRoute()
            signUpRoute['parseUser'] = jest.fn(() => mockUser)
            User.addUser = jest.fn()
            const req = {
                body: mockUser,
            } as Request
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response

            await signUpRoute.createUser(req, res)

            expect(res.redirect).toHaveBeenCalledWith('/login')
            expect(User.addUser).toHaveBeenCalledWith(mockUser)
        })
        test('error', async () => {
            const signUpRoute = new SignUpRoute()
            signUpRoute['parseUser'] = jest.fn(() => {
                throw 'error'
            })
            User.addUser = jest.fn()
            const req = {
                body: mockUser,
            } as Request
            const res = ({
                redirect: jest.fn(),
            } as unknown) as Response

            await signUpRoute.createUser(req, res)

            expect(res.redirect).toHaveBeenCalledWith('/signup')
            expect(User.addUser).not.toHaveBeenCalled()
        })
    })

    describe('parseUser', () => {
        test('Full user info', () => {
            const fn = new SignUpRoute()['parseUser']

            const result = fn({
                body: {
                    username: 'something',
                    firstname: 'Braiden',
                    lastname: 'somethingelse',
                    email: 'something@gmail.com',
                },
            } as Request)

            expect(result.email).toBe('something@gmail.com')
            expect(result.username).toBe('something')
            expect(result.firstName).toBe('Braiden')
            expect(result.lastName).toBe('somethingelse')
        })
        test('missing username', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: '',
                        firstname: 'braiden',
                        lastname: 'somethingelse',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing email', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        firstname: 'braiden',
                        lastname: 'somethingelse',
                        email: '',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing firstName', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        lastname: 'somethingelse',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing lastName', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        firstname: 'braiden',
                        lastname: '',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
    })

    describe('getRouter', () => {
        test('get router', () => {
            const router = new SignUpRoute().getRouter()

            expect(router).toBeDefined()
        })
    })
})
