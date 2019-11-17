import { NextFunction, Request, Response, Router } from 'express'
import { BaseRoute } from './route'
import { Destination, IDestination } from '../models/destination'
import { ObjectID } from 'mongodb'
import { IReview, Review } from '../models/review'
import { IHeaderOpts, parseQueryParams } from './helpers'

interface IDestinationData extends IDestination, IHeaderOpts {
    reviewData: IReview[]
}

/**
 * / route
 *
 * @class DestinationRoute
 */
export class DestinationRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class DestinationRoute
     * @method create
     * @static
     */
    public getRouter() {
        //log
        console.log('[DestinationRoute::getRouter] Creating destination router.')

        const router = Router()
        //add destination page route
        router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next)
        })

        return router
    }

    // May need different render functions for different page renderings, as they need different options
    render(req: Request, res: Response, template: string, options?: IDestinationData) {
        super.render(req, res, template, options)
    }

    /**
     * Constructor
     *
     * @class DestinationRoute
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * The destination page route.
     *
     * @class DestinationRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        const destId = new ObjectID(req.params.id)
        try {
            const destData = await Destination.getDestination(destId)
            const reviewData = await Review.getReviewsForDestination(destId)
            this.render(req, res, 'destination', { ...destData, reviewData, queryParams: parseQueryParams(req) })
        } catch (error) {
            console.error(error)
            this.render(req, res, '404')
        }
    }
}
