
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { User } from "../models/user";
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
        console.log("[LoginRoute::create] Creating login route.");

        // add home page route
        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().index(req, res, next);
        })

        // getting login info
        .post("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().handleLogin(req, res, next);
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
     * The login page route.
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

    public handleLogin(req: Request, res: Response, next: NextFunction) {
        res.send("sucessfully submitted user credentials");

        // handle login flow here
        var credentials = req.body;
        console.log("username: " + credentials["username"]);
        console.log("password: " + credentials["password"]);

        // if credientals are verified, redirect to index
    }
}
