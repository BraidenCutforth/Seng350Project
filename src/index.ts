#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { Server } from './app'
import { initDb } from './db'

const server = Server.bootstrap()
const port = 3000

async function init() {
    await initDb()
    server.app.listen(port, () => console.log(`Runaway app listening on port ${port}!`))
}

init()
