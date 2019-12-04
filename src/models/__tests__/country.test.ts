import { Country, ICountry } from '../country'
import { initDb, closeDb } from '../../db'
import { ObjectID } from 'mongodb'

describe('country model tests', () => {
    const _id1 = new ObjectID()
    const _id2 = new ObjectID()
    const _id3 = new ObjectID()

    test('Add country', async () => {
        const numCountries = (await Country.getCountries()).length
        const country: ICountry = {
            code: 'GH',
            name: 'Ghana',
            description: 'African country meaning "Warrior King" in the Soninke language',
            destinations: [_id1, _id2, _id3],
            flag: '🇨🇬',
            img:
                'https://www.10wallpaper.com/wallpaper/1366x768/1501/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg',
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
        expect(country.name).toBe('Canada')
    })

    test('get country fail', async () => {
        await expect(Country.getCountry('ajsdfhasjkdfhlakjsdhfjkasdhf')).rejects.toEqual(
            'No countries found matching code ajsdfhasjkdfhlakjsdhfjkasdhf',
        )
    })

    test('remove country', async () => {
        const country: ICountry = {
            code: 'GH',
            name: 'Ghana',
            description: 'African country meaning "Warrior King" in the Soninke language',
            destinations: [_id1, _id2, _id3],
            flag: '🇨🇬',
            img:
                'https://www.10wallpaper.com/wallpaper/1366x768/1501/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg',
        }
        await Country.addCountry(country)

        const numCountries = (await Country.getCountries()).length

        await Country.deleteCountry(country)

        const newNumCountries = (await Country.getCountries()).length
        expect(newNumCountries).toBe(numCountries - 1)
    })

    describe('search', () => {
        test('result expected', async () => {
            const result = await Country.searchCountries('can')
            expect(result.length).toBeGreaterThanOrEqual(1)
        })

        test('result not expected', async () => {
            const result = await Country.searchCountries('completegibberishthatshouldnotreturnaresult')
            expect(result.length).toBe(0)
        })
    })
})
