import { Destination, IDestination } from '../destination'

import { initDb, closeDb } from '../../db'

import { ObjectId } from 'mongodb'

xdescribe('destination model tests', () => {
    beforeAll(async () => {
        await initDb()
    })
    const _id = new ObjectId()

    test('Add destination', async () => {
        const numDestinations = (await Destination.getDestinations()).length
        const destination: IDestination = {
            _id,
            name: 'Whistler',
            country: 'CA',
            description: 'Enjoy outdoor winter and summer sports alike.',
            stars: 4.2,
            reviews: [],
            spamScore: 0,
        }

        await Destination.addDestination(destination)

        const newNumDestinations = (await Destination.getDestinations()).length
        expect(newNumDestinations).toBe(numDestinations + 1)

        await Destination.deleteDestination(destination)
        expect((await Destination.getDestinations()).length).toBe(numDestinations)
    })

    test('get destination', async () => {
        const destination = await Destination.getDestination(new ObjectId('5dc3522cbfa6fa7ec0808324'))
        expect(destination).not.toBeNull()
        expect(destination.name).toBe('Whistler')
    })

    test('get destination fail', async () => {
        const altId = new ObjectId()
        await expect(Destination.getDestination(altId)).rejects.toEqual('No destinations found')
    })

    test('remove destination', async () => {
        const destination: IDestination = {
            _id,
            name: 'Whistler',
            country: 'CA',
            description: 'Enjoy outdoor winter and summer sports alike.',
            stars: 4.2,
            reviews: [],
            spamScore: 0,
        }
        await Destination.addDestination(destination)

        const numDestinations = (await Destination.getDestinations()).length

        await Destination.deleteDestination(destination)

        const newNumDestinations = (await Destination.getDestinations()).length
        expect(newNumDestinations).toBe(numDestinations - 1)
    })

    afterAll(async () => {
        await closeDb()
    })
})
