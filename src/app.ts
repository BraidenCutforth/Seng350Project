import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import errorHandler from 'errorhandler'
import { IndexRoute } from './routes/index'
import { LoginRoute } from './routes/login'
import { SignUpRoute } from './routes/signup'
import { ProfileRoute } from './routes/profile'
import { MongoClient } from 'mongodb'

const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://runaway:Y2ABndDFux4zyWzPsMxa6D4h@seng350-f19-3-6-db-6khes.mongodb.net/test?retryWrites=true&w=majority' // Eventually set to a env var

/**
 * The server.
 *
 * @class Server
 */
export class Server {
    public app: express.Application
    public client: MongoClient

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server()
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express()
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.client.connect(err => {
            if (err) throw err
            console.log('Connection success')
        })

        this.initializeDb()

        //configure application
        this.config()

        //add routes
        this.routes()
    }

    private async initializeDb() {
        // initialize db
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, 'public')))

        //configure pug
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'pug')

        //mount logger
        this.app.use(logger('dev'))

        //mount json form parser
        this.app.use(bodyParser.json())

        //mount query string parser
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        )

        //mount cookie parser middleware
        this.app.use(cookieParser('SECRET_GOES_HERE'))

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404
            next(err)
        })

        //error handling
        this.app.use(errorHandler())
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        const router = express.Router()
        IndexRoute.create(router)
        LoginRoute.create(router)
        SignUpRoute.create(router)
        ProfileRoute.create(router)
        //use router middleware
        this.app.use(router)
    }
}
