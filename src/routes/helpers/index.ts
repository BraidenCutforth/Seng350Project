import { Request } from 'express'
import url from 'url'

export interface IHeaderOpts {
    queryParams: string
}

export function parseQueryParams(req: Request): string {
    return url.format({
        query: req.query,
    })
}
