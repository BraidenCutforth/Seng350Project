import { Destination, IDestination } from '../destination'

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

    test('get destinations', async () => {
        const objId1 = new ObjectId()
        const objId2 = new ObjectId()
        const destination: IDestination = {
            _id: objId1,
            name: 'test1',
            country: '',
            description: '',
            img: '',
            stars: 0,
            reviews: [],
            spamScore: 0,
        }
        const destination2: IDestination = {
            _id: objId2,
            name: 'test2',
            country: '',
            description: '',
            img: '',
            stars: 0,
            reviews: [],
            spamScore: 0,
        }
        await Destination.addDestination(destination)
        await Destination.addDestination(destination2)

        const result = await Destination.getDestinations([objId1, objId2])

        await Destination.deleteDestination(destination)
        await Destination.deleteDestination(destination2)

        expect(result).toHaveLength(2)
        expect(result).toContainEqual(destination)
        expect(result).toContainEqual(destination2)
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

    test('update destination', async () => {
        const _id = new ObjectId()
        const description = 'Some new test description'
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

        const result = await Destination.updateDestination(_id, { ...destination, description })
        const retrievedCountry = await Destination.getDestination(_id)

        expect(result.modifiedCount).toBe(1)
        expect(retrievedCountry.description).toBe(description)

        await Destination.deleteDestination({ ...destination, description })
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
