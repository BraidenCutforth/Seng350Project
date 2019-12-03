import { ProfileRoute } from '../profile'
import { IUser } from '../../models/user'

describe('profile route', () => {
    describe('isCurrentUser', () => {
        test('true', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({ username: 'jchua' } as IUser, 'jchua')

            expect(result).toBe(true)
        })

        test('false wrong username', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({ username: 'something' } as IUser, 'jchua')

            expect(result).toBe(false)
        })

        test('false username undefined', () => {
            const fn = new ProfileRoute()['isCurrentUser']

            const result = fn({} as IUser, 'jchua')

            expect(result).toBe(false)
        })
    })

    describe('parseUser', () => {
        test('true', () => {
            const fn = new ProfileRoute()['parseUser']

            const result = fn('jchua', '')

            expect(result).not.toBeNull()
        })
    })
})
