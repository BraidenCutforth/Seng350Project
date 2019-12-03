import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'

export class Auth {
    public static isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.cookies.user) {
                const user = await User.getUser(req.cookies.user)
                if (user.isAdmin) {
                    return next()
                }
            }
            res.statusCode = 401
            res.render('401')
        } catch (err) {
            console.error(err)
            res.statusCode = 404
            res.render('404')
        }
    }

    public static isCurrentUser = (req: Request, res: Response, next: NextFunction) => {
        if (req.params.username && req.cookies.user && req.params.username === req.cookies.user) {
            console.log('here?')
            return next()
        }
        console.log('Not current user')
        res.statusCode = 401
        res.render('401')
    }
}
