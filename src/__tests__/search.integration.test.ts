import { Server } from '../app'
import supertest from 'supertest'
import { initDb } from '../db'
import { Review } from '../models/review'
import { ObjectId } from 'mongodb'

const request = supertest(Server.bootstrap().app)

describe('Integrations', () => {
    describe('Search', () => {
        test('Search in under 1.5 seconds', async () => {
            const start = new Date()
            const res = await request.post('/search').send('searchword=whi')
            const end = new Date()
            const elapsedTime = end.valueOf() - start.valueOf()
            expect(res.status).toBe(200)
            expect(elapsedTime).toBeLessThan(1500)
        })
    })

    describe('Destination', () => {
        test('Load destination in under 1.5 seconds', async () => {
            const start = new Date()
            const res = await request.get('/destination/5dc3522cbfa6fa7ec0808324')
            const end = new Date()
            const elapsedTime = end.valueOf() - start.valueOf()

            expect(res.status).toBe(200)
            expect(elapsedTime).toBeLessThan(1500)
        })
    })

    describe('Review', () => {
        test('Submit a review in under 1.5 seconds', async () => {
            const start = new Date()
            const randomContent = Math.random().toString()
            const res = await request
                .post('/review/create/5dc3522cbfa6fa7ec0808324')
                .send(`title=test&content=${randomContent}`)
                .set('Cookie', ['user=braidenc'])
            const end = new Date()

            const elapsedTime = end.valueOf() - start.valueOf()

            const match = (res.header.location as string).match(/destination\/([0-9a-f]*)/)
            const _id = match && match[1] ? new ObjectId(match[1]) : undefined
            console.log(_id)
            if (_id) {
                const reviews = await Review.getReviewsForDestination(_id)
                const review = reviews.find(review => review.content === randomContent)
                if (review) {
                    await Review.deleteReview(new ObjectId(review._id))
                }
            }

            expect(res.status).toBe(302)
            expect(elapsedTime).toBeLessThan(1500)
        })
    })
})
