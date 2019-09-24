
const app = require('../src/app')
const debug = require('debug')('nodestr: server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); 

const server = http.createServer(app);

server.listen(port); 
console.log('API rodando na porta:' + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;
}


server.on('error', error => {
    if (error.syscall !== 'listen') { throw error }
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${process.env.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });


function onListening (){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

server.on('listening', onListening);

