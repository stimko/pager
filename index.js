'use strict';

const Hapi = require('hapi');
const hapiJwt = require('hapi-auth-jwt2');

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port: 3000
});

const people = {
    1: {
        id: 1,
        name: 'Marty Mcfly'
    }
};

const validate = (decoded, request, response) =>  {
    if (!people[decoded.id]) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);

    await server.register(hapiJwt);

    server.auth.strategy('jwt', 'jwt',
        {
            key: 'topsecretstuff',
            validate: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    server.auth.default('jwt');

    server.route({
        method:'GET',
        path:'/organizations',
        config: { auth: 'jwt' },
        handler:function(request,h) {
            
        }
    });

};

start();