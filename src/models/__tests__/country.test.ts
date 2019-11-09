import { Country, ICountry } from '../country'

import { initDb, closeDb } from '../../db'

xdescribe('country model tests', () => {
    beforeAll(async () => {
        await initDb()
    })
    test('Add country', async () => {
        const numCountries = (await Country.getCountries()).length
        const country: ICountry = {
            code: 'GH',
            countryName: 'Ghana',
            description: 'African country meaning "Warrior King" in the Soninke language',
            destinations: [1461361, 3164357, 2356326],
        }

        await Country.addCountry(country)

        const newNumCountries = (await Country.getCountries()).length
        expect(newNumCountries).toBe(numCountries + 1)

        await Country.deleteCountry(country)
        expect((await Country.getCountries()).length).toBe(numCountries)
    })

    test('get country', async () => {
        const country = await Country.getCountry('CA')
        expect(country).not.toBeNull()
        expect(country.countryName).toBe('Canada')
    })

    test('get country fail', async () => {
        await expect(Country.getCountry('ajsdfhasjkdfhlakjsdhfjkasdhf')).rejects.toEqual(
            'No countries found matching code ajsdfhasjkdfhlakjsdhfjkasdhf',
        )
    })

    test('remove country', async () => {
        const country: ICountry = {
            code: 'GH',
            countryName: 'Ghana',
            description: 'African country meaning "Warrior King" in the Soninke language',
            destinations: [1461361, 3164357, 2356326],
        }
        await Country.addCountry(country)

        const numCountries = (await Country.getCountries()).length

        await Country.deleteCountry(country)

        const newNumCountries = (await Country.getCountries()).length
        expect(newNumCountries).toBe(numCountries - 1)
    })

    afterAll(async () => {
        await closeDb()
    })
})
