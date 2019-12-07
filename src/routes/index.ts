import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { Country } from '../models/country'
import { Destination } from '../models/destination'

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
        router.get('/', (req, res) => this.index(req, res)).post('/search', (req, res) => this.search(req, res))

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
    public async index(req: Request, res: Response) {
        //set custom title
        this.title = 'Runaway | Home'

        try {
            //set message
            const options: Record<string, any> = {
                title: 'Runaway',
                message: 'Runaway',
                currUser: req.cookies.user,
            }
            //render template
            this.render(req, res, 'index', options)
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }

    async search(req: Request, res: Response) {
        const searchword = req.body.searchword
        try {
            if (!searchword) {
                throw new Error('Search word undefined')
            }
            const countries = await Country.searchCountries(searchword)
            const destinations = await Destination.searchDestinations(searchword)
            const results = {
                countries,
                destinations,
            }
            const options: Record<string, any> = {
                title: 'Runaway',
                currUser: req.cookies.user,
                results,
            }
            this.render(req, res, 'index', options)
        } catch (err) {
            console.error(err)
            this.render(req, res, '404')
        }
    }
}
