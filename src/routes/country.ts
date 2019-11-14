import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { ICountry, Country } from '../models/country'

/**
 * / route
 *
 * @class CountryRoute
 */
export class CountryRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class CountryRoute
     * @method create
     * @static
     */
    public getRouter() {
        //log
        console.log('[CountryRoute::getRouter] Creating country router.')

        const router = Router()
        //add country page route
        router.get('/:code', (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next)
        })

        return router
    }

    // May need different render functions for different page renderings, as they need different options
    render(req: Request, res: Response, template: string, options?: ICountry) {
        super.render(req, res, template, options)
    }

    /**
     * Constructor
     *
     * @class CountryRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The profile page route.
     *
     * @class CountryRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const countryCode = req.params.code
        try {
            const countryData = await Country.getCountry(countryCode)
            this.render(req, res, 'country', countryData)
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }
}
