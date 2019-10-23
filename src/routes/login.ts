
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { users } from '../mock_data/users';

/**
 * / route
 *
 * @class LoginRoute
 */
export class LoginRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class LoginRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[LoginRoute::create] Creating index route.");

        //add home page route
        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().index(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class LoginRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class LoginRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set message
        let options: Object = {
            users
        };

        //render template
        this.render(req, res, "login", options);
    }
}
