import { CountryRoute } from '../country'
import { Country, ICountry } from '../../models/country'
import { Destination, IDestination } from '../../models/destination'
import { Request, Response } from 'express'
import { Dictionary } from 'express-serve-static-core'
import { DeleteWriteOpResultObject } from 'mongodb'

const mockCountry: ICountry = {
    code: 'CA',
    img: '',
    flag: '',
    name: '',
    description: '',
    destinations: [],
}

const mockDestinations: IDestination[] = [
    {
        name: '',
        country: 'CA',
        img: '',
        description: '',
        stars: 3,
        reviews: [],
        spamScore: 2,
    },
]

describe('Country Route', () => {
    describe('index', () => {
        test('works', async () => {
            const countryRoute = new CountryRoute()
            Country.getCountry = jest.fn(() => {
                return Promise.resolve(mockCountry)
            })
            Destination.getDestinations = jest.fn(() => {
                return Promise.resolve(mockDestinations)
            })

            const render = jest.fn()

            const res = {} as Response
            const req = {
                cookies: {
                    user: 'someUser',
                },
                params: {
                    code: 'CA',
                } as Dictionary<string>,
            } as Request
            const next = jest.fn()
            countryRoute.render = render

            await countryRoute.index(req, res, next)

            expect(render).toHaveBeenCalledWith(req, res, 'country', {
                code: 'CA',
                currUser: 'someUser',
                description: '',
                destData: [{ country: 'CA', description: '', img: '', name: '', reviews: [], spamScore: 2, stars: 3 }],
                destinations: [],
                flag: '',
                img: '',
                name: '',
            })
        })
    })

    test('fails', async () => {
        const countryRoute = new CountryRoute()

        const render = jest.fn()
        const next = jest.fn()

        countryRoute.render = render

        Country.getCountry = jest.fn(() => {
            return Promise.reject('Country not found')
        })
        Country.deleteCountry = jest.fn(() => Promise.resolve({} as DeleteWriteOpResultObject))
        Country.getCountries = jest.fn(() => Promise.resolve([mockCountry]))

        const res = {} as Response
        const req = {
            cookies: {
                user: 'someUser',
            },
            params: {
                username: 'someUser',
            } as Dictionary<string>,
        } as Request

        await countryRoute.index(req, res, next)

        expect(render).toHaveBeenCalledWith(req, res, '404')
    })

    describe('getRouter', () => {
        const router = new CountryRoute().getRouter()

        expect(router).toBeDefined()
    })
})
