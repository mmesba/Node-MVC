/*
 * Title: Main File for Node MVC
 * Description: Basic MVC server to deliver frontend data
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 06/02/2022
 */
 
// Dependencies.
 const http = require('http');
const fs = require('fs');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const helpers = require('./helpers');
const route = require('./route');
const { parseJsonObject } = require('./helpers');
const config = require('./environment');
const data = require('./data');
const users = require('./users')
 
// App object or Module scaffolding.
 const app = {}
// main functions or objects.
 app.createHttpServer = ()=>{
     const createServer = http.createServer(app.reqResHandler);
     createServer.listen(config.port || 3000, ()=>{
         console.log('\x1b[31m%s\x1b[0m', 'MVC Server Listening...');
     })
 }
 
// Defining Request and Response Handler
app.reqResHandler = (req, res)=>{
    // Handle and lookup request properties
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

// Get the payload 
let decoder = new StringDecoder('utf-8');
let buffer = '';

    // Chose the handler this request should go to. If one is not found use the not found handler.
    let chosenHandler =router[trimmedPath] !== undefined ? router[trimmedPath] :  route.notFound;


req.on('data', (data)=>{
    buffer +=decoder.write(data);
});
req.on('end', ()=>{
    buffer += decoder.end();



    // Construct the data object to send to the handler
    let data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headersObject,
        'payload' : helpers.parseJsonObject(buffer)
    }

    // Route the request  to the handler specified in the router
    // Chosen handler now holds the value of a function which will be called as users request.
    chosenHandler(data, (statusCode, payload, contentType)=>{
        // Determine the type of response (fallback to JSON)
        contentType = typeof(contentType) === 'string'  ? contentType : 'json';



        // Use the status code called back by the handler, or default to 200
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
                
        // Return the response parts that are content specific
        let payloadString = '';
        if(contentType === 'json'){
            res.setHeader('Content-Type', 'Application/json')
            payload = typeof(payload) === 'object' ? payload : {};
            // Use the payload called back by the handler, or default to an empty object
            payloadString =  JSON.stringify(payload);
        } if(contentType === 'html') {
            res.setHeader('Content-Type', 'text/html');
            payloadString = typeof(payload)  ===  'string'  ? payload : '';

        }
        // Return the response parts that are common to all content types
        res.writeHead(statusCode);
        res.end(payloadString)


        //return the final response


        // Print conditionally
        if (statusCode === 200) {
        console.log('\x1b[32m%s\x1b[0m', method.toUpperCase()+'/'+trimmedPath+'  '+statusCode);
        } else {
        console.log('\x1b[31m%s\x1b[0m', method.toUpperCase()+'/'+trimmedPath+'  '+statusCode);
        }

    })

})

}


// Define some user endpoints
router = {
    '' : route.index,
    '/' : route.index,
    'account/create' : 'route.accountCreate',
    'account/edit' : 'route.accountEdit',
    'account/deleted' : 'route.accountDeleted',
    'session/create' : 'route.sessionCreate',
    'session/deleted' : 'route.sessionDeleted',
    'sample' : route.sample,
    'api/user' : users.userHandler
}


 
//  Start the server
app.createHttpServer();
// export the module.
 