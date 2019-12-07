import { LoginRoute } from '../login'
import { Request, Response, response } from 'express'
import { User, IUser } from '../../models/user'
import { IndexRoute } from '..'

describe('login test', () => {
    describe('loginPage', () => {
        test('success', () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            loginRoute.render = render
            const res = {} as Response
            const req = {} as Request

            loginRoute.index(req, res)
            expect(render).toHaveBeenCalledWith(req, res, 'login', { currUser: '' })
        })
    })

    describe('handleLogin', () => {
        test('Success', async () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            loginRoute['validCredential'] = jest.fn(async () => true)
            const res = ({
                status: jest.fn(),
                send: jest.fn(),
                render,
                cookie: jest.fn(),
                redirect: jest.fn(),
            } as unknown) as Response
            const req = {
                body: {
                    username: 'test',
                },
            } as Request

            await loginRoute.handleLogin(req, res)
            expect(render).not.toHaveBeenCalled()
            expect(res.redirect).toHaveBeenCalledWith('/')
            expect(res.cookie).toHaveBeenCalledWith('user', 'test', { maxAge: 1800000 })
        })

        test('invalid credential', async () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            loginRoute['validCredential'] = jest.fn(async () => false)
            const res = ({
                status: jest.fn(),
                send: jest.fn(),
                render,
                cookie: jest.fn(),
                redirect: jest.fn(),
            } as unknown) as Response
            const req = {
                body: {
                    username: 'test',
                },
            } as Request

            await loginRoute.handleLogin(req, res)
            expect(render).toHaveBeenCalledWith('login', { currUser: '', loginErr: true })
            expect(res.redirect).not.toHaveBeenCalled()
            expect(res.cookie).not.toHaveBeenCalled()
        })

        test('failure', async () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            loginRoute['validCredential'] = jest.fn(() => Promise.reject('Fail'))
            const res = ({
                status: jest.fn(),
                send: jest.fn(),
                render,
                cookie: jest.fn(),
                redirect: jest.fn(),
            } as unknown) as Response
            const req = {
                body: {
                    username: 'test',
                },
            } as Request

            await loginRoute.handleLogin(req, res)
            expect(render).toHaveBeenCalledWith('404')
            expect(res.redirect).not.toHaveBeenCalled()
            expect(res.cookie).not.toHaveBeenCalled()
        })
    })

    describe('handleLogout', () => {
        test('success', () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            loginRoute.render = render
            const req = {} as Request
            const res = ({
                cookie: jest.fn(),
                redirect: jest.fn(),
            } as unknown) as Response

            loginRoute.handleLogout(req, res)
            expect(render).not.toHaveBeenCalled()
            expect(res.cookie).toHaveBeenCalledWith('user', undefined, { maxAge: 0 })
            expect(res.redirect).toHaveBeenCalledWith('/')
        })

        test('failure', () => {
            const loginRoute = new LoginRoute()
            const render = jest.fn()
            const req = {} as Request
            const res = ({
                cookie: jest.fn(() => {
                    throw new Error('fail')
                }),
                redirect: jest.fn(),
                status: jest.fn(),
                render,
            } as unknown) as Response

            loginRoute.handleLogout(req, res)
            expect(render).toHaveBeenCalledWith('404')
            expect(res.cookie).toHaveBeenCalledWith('user', undefined, { maxAge: 0 })
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.redirect).not.toHaveBeenCalled()
        })
    })

    describe('parseCredentials', () => {
        test('success', () => {
            const fn = new LoginRoute()['parseCredentials']

            const result = fn({ body: { username: 'jchua' } } as Request)

            expect(result).toBe('jchua')
        })

        test('wrong type', () => {
            const fn = new LoginRoute()['parseCredentials']

            expect(() => {
                fn({ body: { username: 3 } } as Request)
            }).toThrow()
        })
        test('undefined', () => {
            const fn = new LoginRoute()['parseCredentials']

            expect(() => {
                fn({ body: {} } as Request)
            }).toThrow()
        })
    })

    describe('validCredential', () => {
        test('valid', async () => {
            const loginRoute = new LoginRoute()
            User.getUser = jest.fn(() => Promise.resolve({} as IUser))
            const result = await loginRoute['validCredential']('username')

            expect(result).toBe(true)
        })

        test('invalid', async () => {
            const loginRoute = new LoginRoute()
            User.getUser = jest.fn(() => Promise.reject('user not found'))
            const result = await loginRoute['validCredential']('username')

            expect(result).toBe(false)
        })
    })

    describe('getRouter', () => {
        test('get router', () => {
            const router = new IndexRoute().getRouter()

            expect(router).toBeDefined()
        })
    })
})
