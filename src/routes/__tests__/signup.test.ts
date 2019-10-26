import { SignUpRoute } from '../signup'
import { Request } from 'express'

describe('SignupRouter', () => {
    describe('parseUser', () => {
        test('Full user info', () => {
            const fn = new SignUpRoute()['parseUser']

            const result = fn({
                body: {
                    username: 'something',
                    firstname: 'Braiden',
                    lastname: 'somethingelse',
                    email: 'something@gmail.com',
                },
            } as Request)

            expect(result.email).toBe('something@gmail.com')
            expect(result.username).toBe('something')
            expect(result.firstName).toBe('Braiden')
            expect(result.lastName).toBe('somethingelse')
        })
        test('missing username', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: '',
                        firstname: 'braiden',
                        lastname: 'somethingelse',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing email', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        firstname: 'braiden',
                        lastname: 'somethingelse',
                        email: '',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing firstName', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        lastname: 'somethingelse',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
        test('missing lastName', () => {
            const fn = new SignUpRoute()['parseUser']
            expect(() => {
                fn({
                    body: {
                        username: 'something',
                        firstname: 'braiden',
                        lastname: '',
                        email: 'something@gmail.com',
                    },
                } as Request)
            }).toThrow()
        })
    })
})
