import { Country, ICountry } from '../country'
import { ObjectID, ObjectId } from 'mongodb'

describe('country model tests', () => {
    const _id1 = new ObjectID()
    const _id2 = new ObjectID()
    const _id3 = new ObjectID()

    describe('Create', () => {
        test('Add country', async () => {
            const numCountries = (await Country.getCountries()).length
            const country: ICountry = {
                code: 'GHTEST1',
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
    })

    describe('Read', () => {
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
    })

    describe('Update', () => {
        test('Update country', async () => {
            const countryCode = 'GHTEST2'
            const _id = new ObjectId()
            const country: ICountry = {
                code: countryCode,
                name: 'Ghana Test',
                description: 'African country meaning "Warrior King" in the Soninke language',
                destinations: [_id1, _id2, _id3],
                flag: '🇨🇬',
                img:
                    'https://www.10wallpaper.com/wallpaper/1366x768/1501/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg',
            }

            const description = 'new description string'

            await Country.addCountry(country)

            const result = await Country.updateCountry(countryCode, { ...country, description })

            const retrievedCountry = await Country.getCountry(countryCode)

            await Country.deleteCountry(retrievedCountry)

            expect(result.modifiedCount).toBe(1)
            expect(retrievedCountry.description).toBe(description)
        })
    })

    describe('Delete', () => {
        test('remove country', async () => {
            const country: ICountry = {
                code: 'GHTEST3',
                name: 'Ghana Test',
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

        test('remove non existant country', async () => {
            const result = await Country.deleteCountry({ code: 'JIBBERISH' } as ICountry)
            expect(result.deletedCount).toBe(0)
        })
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
