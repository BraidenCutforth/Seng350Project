
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class ProfileRoute
 */
export class ProfileRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class ProfileRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[ProfileRoute::create] Creating index route.");

        //add profile page route
        router.get("/profile", (req: Request, res: Response, next: NextFunction) => {
            new ProfileRoute().index(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class ProfileRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class ProfileRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Home | This is the main page";

        //set message
        let options: Object = {
            "message": "Welcome to the UVic 350!"
        };

        //render template
        this.render(req, res, "profile", options);
    }
}