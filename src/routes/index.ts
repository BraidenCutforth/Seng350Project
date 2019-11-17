import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { Country } from '../models/country'
import { parseQueryParams } from './helpers'

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public getRouter() {
        const router = Router()
        //log
        console.log('[IndexRoute::getRouter] Creating index router.')

        //add home page route
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next)
        })

        return router
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = 'Runaway | Home'

        try {
            const countries = await Country.getCountries()
            //set message
            const options: Record<string, any> = {
                title: 'Runaway',
                message: 'Runaway',
                countries,
                queryParams: parseQueryParams(req),
            }
            //render template
            this.render(req, res, 'index', options)
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }
}
