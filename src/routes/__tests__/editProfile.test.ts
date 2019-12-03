import { EditProfileRoute } from '../editProfile'
import { Request } from 'express'

describe('edit profile test', () => {
    describe('parseUser', () => {
        test('success', () => {
            const fn = new EditProfileRoute()['parseUser']

            const result = fn({
                body: { bio: 'Live Laugh Love', email: 'jchua@gmail.com', location: 'Victoria, BC', username: 'jchua' },
            } as Request)

            expect(result).toMatchObject({
                bio: 'Live Laugh Love',
                email: 'jchua@gmail.com',
                location: 'Victoria, BC',
                username: 'jchua',
            })
        })

        test('success - empty fields', () => {
            const fn = new EditProfileRoute()['parseUser']

            const result = fn({
                body: { bio: '', email: 'jchua@gmail.com', location: '', username: 'jchua' },
            } as Request)

            expect(result).toMatchObject({ email: 'jchua@gmail.com', username: 'jchua' })
        })

        test('wrong type', () => {
            const fn = new EditProfileRoute()['parseUser']

            expect(() => {
                fn({ body: 'not object' } as Request)
            }).toThrow()
        })
    })
})
