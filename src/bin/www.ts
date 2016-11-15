'use strict';
/**
 * Module dependencies.
*/

import * as debugModule from 'debug';
import * as http from 'http';
import { Server } from '../server';

const debug = debugModule('express:server');
Server.init(process.env.NODE_ENV === 'development');
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || 3000);
Server.app.set('port',port);

/**
 * Create HTTP server.
 */

var httpServer = http.createServer(Server.app);

/**
 * Listen on provided port,on all network interfaces.
 */

httpServer.listen(port);
httpServer.on('error',onError);
httpServer.on('listening',onListening);

/**
 * Normalize a port into a number,string,or false.
 */
function normalizePort(val : any): number|string|boolean {
  let port = parseInt(val,10);
  
  if(isNaN(port)){
    //name pipe
    return val;
  }
  
  if(port >= 0){
    return port;
  }
  
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall != 'listen') {
    throw error;
  }
  
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
  //handle specific listen errors with friendly messages
  switch(error.code) {
    case 'EACCES':
      console.error(bind + 'requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
  
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

