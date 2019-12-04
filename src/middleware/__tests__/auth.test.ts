import { Auth } from '../auth'
import { User, IUser } from '../../models/user'
import { Request, Response } from 'express'

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
        test('Is admin', async () => {
            User.getUser = jest.fn(() => {
                return Promise.resolve({
                    ...baseUser,
                    isAdmin: true,
                })
            })
            const render = jest.fn()
            const next = jest.fn()
            const req = {
                cookies: {
                    user: 'someUser',
                },
            } as Request
            const res = {} as Response

            res.render = render

            await Auth.isAdmin(req, res, next)

            expect(next).toHaveBeenCalled()
            expect(User.getUser).toHaveBeenCalledWith('someUser')
            expect(render).not.toHaveBeenCalled()
        })
    })
})
