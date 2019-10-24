#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { Server } from "./app";
var server = Server.bootstrap();
const port = 3000;

server.app.listen(port, () =>
  console.log(`Runaway app listening on port ${port}!`)
);

export const client = server.client;
