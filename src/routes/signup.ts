
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { users } from '../mock_data/users';

/**
 * / route
 *
 * @class SignUpRoute
 */
export class SignUpRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class SignUpRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[SignUpRoute::create] Creating sign up route.");

        // add home page route
        router.get("/signup", (req: Request, res: Response, next: NextFunction) => {
            new SignUpRoute().index(req, res, next);
        })
        .post("/signup", (req: Request, res: Response, next: NextFunction) => {
            new SignUpRoute().createUser(req, res,next);
        });
    }

    /**
     * Constructor
     *
     * @class SignUpRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The sign up page route.
     *
     * @class SignUpRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {

        //render template
        this.render(req, res, "signup");
    }

    public createUser(req: Request, res: Response, next: NextFunction) { 

        // create user in db
        res.send("creating new user ...");
    }
}
