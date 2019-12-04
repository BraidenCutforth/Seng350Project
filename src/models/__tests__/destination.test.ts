import { Destination, IDestination } from '../destination'

import { initDb, closeDb } from '../../db'

import { ObjectId } from 'mongodb'

describe('destination model tests', () => {
    test('Add destination', async () => {
        const _id = new ObjectId()
        const destination: IDestination = {
            _id,
            name: 'Whistler',
            country: 'CA',
            description: 'Enjoy outdoor winter and summer sports alike.',
            stars: 4.2,
            reviews: [],
            spamScore: 0,
            img:
                'https://www.10wallpaper.com/wallpaper/1366x768/1501/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg',
        }

        const result = await Destination.addDestination(destination)

        expect(result.insertedCount).toBe(1)

        await Destination.deleteDestination(destination)
    })

    test('get destination', async () => {
        const destination = await Destination.getDestination(new ObjectId('5dc3522cbfa6fa7ec0808324'))
        expect(destination).not.toBeNull()
        expect(destination.name).toBe('Whistler')
    })

    test('get destination fail', async () => {
        const _id = new ObjectId()
        await expect(Destination.getDestination(_id)).rejects.toEqual('No destinations found')
    })

    test('remove destination', async () => {
        const _id = new ObjectId()
        const destination: IDestination = {
            _id,
            name: 'Whistler',
            country: 'CA',
            description: 'Enjoy outdoor winter and summer sports alike.',
            stars: 4.2,
            reviews: [],
            spamScore: 0,
            img:
                'https://www.10wallpaper.com/wallpaper/1366x768/1501/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg',
        }
        await Destination.addDestination(destination)

        const result = await Destination.deleteDestination(destination)
        expect(result.deletedCount).toBe(1)
    })

    describe('search', () => {
        test('result expected', async () => {
            const result = await Destination.searchDestinations('whis')
            expect(result.length).toBeGreaterThanOrEqual(1)
        })

        test('result not expected', async () => {
            const result = await Destination.searchDestinations('completegibberishthatshouldnotreturnaresult')
            expect(result.length).toBe(0)
        })
    })
})
