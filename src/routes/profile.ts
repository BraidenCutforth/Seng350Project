
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { User } from "../models/user"


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
    router.get("/profile/:username", (req: Request, res: Response, next: NextFunction) => {
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
   * The profile page route.
   *
   * @class ProfileRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public async index(req: Request, res: Response, next: NextFunction) {
    
    // TODO: 
    //      1. URL should be /profile/id
    //      2. Get User from DB
    //      3. If user id == profile id then display edit profile button
    //      4. Edit button triggers function that changes elements on page 
    //      5. Submit function 
    
    const username = req.params.username;
    const userData = await User.getUser(username)

    //set message

    //render template
    this.render(req, res, "profile", userData);
  }
}