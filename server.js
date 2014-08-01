var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8080);

// Add the route
server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
				directory: { path: './public', listing: false, index: true }
		}
});

// Start the server
server.start();