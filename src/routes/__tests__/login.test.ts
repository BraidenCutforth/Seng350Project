import { LoginRoute } from '../login'
import { Request } from 'express'

describe('login test', () => {
    describe('parseCredentials', () => {
        test('success', () => {
            const fn = new LoginRoute()['parseCredentials']

            const result = fn({ body: { username: 'jchua' } } as Request)

            expect(result).toBe('jchua')
        })

        test('wrong type', () => {
            const fn = new LoginRoute()['parseCredentials']

            expect(() => {
                fn({ body: { username: 3 } } as Request)
            }).toThrow()
        })
        test('undefined', () => {
            const fn = new LoginRoute()['parseCredentials']

            expect(() => {
                fn({ body: {} } as Request)
            }).toThrow()
        })
    })
})
