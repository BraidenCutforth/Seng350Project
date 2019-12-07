import { IndexRoute } from '..'
import { Request, Response } from 'express'
import { Country } from '../../models/country'
import { Destination } from '../../models/destination'

describe('Index route', () => {
    describe('Homepage', () => {
        test('get homepage', async () => {
            const indexRoute = new IndexRoute()
            const render = jest.fn()
            indexRoute.render = render
            const req = {
                cookies: {
                    user: 'testuser',
                },
            } as Request
            const res = {} as Response

            await indexRoute.index(req, res)

            expect(render).toHaveBeenCalledWith(req, res, 'index', {
                currUser: 'testuser',
                message: 'Runaway',
                title: 'Runaway',
            })
        })

        test('homepage fail', async () => {
            const indexRoute = new IndexRoute()
            const render = jest.fn()
            indexRoute.render = render
            const req = {} as Request
            const res = {} as Response

            await indexRoute.index(req, res)

            expect(render).toHaveBeenCalledWith({}, {}, '404')
        })
    })

    describe('search page', () => {
        test('success', async () => {
            const indexRoute = new IndexRoute()
            const searchword = 'something'
            const render = jest.fn()
            indexRoute.render = render
            Country.searchCountries = jest.fn(() => Promise.resolve([]))
            Destination.searchDestinations = jest.fn(() => Promise.resolve([]))
            const req = {
                cookies: {},
                body: {
                    searchword,
                },
            } as Request
            const res = {} as Response

            await indexRoute.search(req, res)

            expect(render).toHaveBeenCalledWith(req, res, 'index', {
                currUser: undefined,
                results: { countries: [], destinations: [] },
                title: 'Runaway',
            })
            expect(Country.searchCountries).toHaveBeenCalledWith(searchword)
            expect(Destination.searchDestinations).toHaveBeenCalledWith(searchword)
        })

        test('fail', async () => {
            const indexRoute = new IndexRoute()
            const searchword = 'something'
            const render = jest.fn()
            indexRoute.render = render
            Country.searchCountries = jest.fn(() => Promise.resolve([]))
            Destination.searchDestinations = jest.fn(() => Promise.resolve([]))
            const req = {
                cookies: {},
                body: {},
            } as Request
            const res = {} as Response

            await indexRoute.search(req, res)

            expect(render).toHaveBeenCalledWith(req, res, '404')
            expect(Country.searchCountries).not.toHaveBeenCalled()
            expect(Destination.searchDestinations).not.toHaveBeenCalled()
        })
    })

    describe('get router', () => {
        test('getRouter', () => {
            const router = new IndexRoute().getRouter()

            expect(router).toBeDefined()
        })
    })
})
