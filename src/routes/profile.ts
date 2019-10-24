
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
    

    // TODO: 
    //      1. URL should be /profile/id
    //      2. Get User from DB
    //      3. If user id == profile id then display edit profile button
    //      4. Edit button triggers function that changes elements on page 
    //      5. Submit function 


    //set message
    let options: Object = {
      "firstName": "Wallace",
      "lastName": "Berder",
      "email": "wberder@gmail.com",
      "username": "wallace",
      "reviews": [],
      "reviewCount": 0,
      "profilePic": "https://pbs.twimg.com/profile_images/1163541386785746944/A1nz8DcJ_400x400.jpg",
      "bio": "Business man. Brothers to Harv, Linus, Mick Donald, Aiden",
      "location": "Moscow, Russia",
      "joined": "October 2019"
    };

    //render template
    this.render(req, res, "profile", options);
  }
}