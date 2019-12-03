import { Auth } from '../auth'
import { User, IUser } from '../../models/user'
import { Request } from 'express'

const baseUser: IUser = {
    username: 'anything',
    firstName: 'any',
    lastName: 'thing',
    email: 'asdf@asdf.ca',
    bio: '',
    profilePic: '',
    location: '',
    reviews: [],
    isAdmin: false,
}

xdescribe('Auth Middleware', () => {
    describe('Auth.isAdmin', () => {
        test('Is admin', () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve({
                    ...baseUser,
                    isAdmin: true,
                })
            })
            const next = jest.fn()
            const req = {} as Request
            const res = {} as Response

            expect(next).toBeCalled()
        })
    })
})
