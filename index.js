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
 
// App object or Module scaffolding.
 const app = {}
// main functions or objects.
 app.createHttpServer = ()=>{
     const createServer = http.createServer(app.reqResHandler);
     createServer.listen(process.env.PORT || 3000, ()=>{
         console.log('\x1b[31m%s\x1b[0m', 'MVC Server Listening...');
     })
 }
 
// Defining Request and Response Handler
app.reqResHandler = ()=>{
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
req.on('data', (data)=>{
    buffer +=decoder.write(data);
});
req.on('end', ()=>{
    buffer += decoder.end();

    // Chose the handler this request should go to. If one is not found use the not found handler.
    let chosenHandler = typeof(app.router[trimmedPath]) !== undefined ? app.router[trimmedPath] :  route.notFound;

    // Construct the data object to send to the handler
    let data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : helpers.parseJsonObject(buffer)
    }

    // Route the request  to the handler specified in the router
    // Chosen handler now holds the value of a function which will be called as users request.
    chosenHandler(data, (statusCode, payload, contentType)=>{
        // Determine the type of response (fallback to JSON)
        contentType = typeof(contentType) === 'string' ? contentType : 'json';

        // Use the status code called back by the handler or default 200.
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

        // Return the response parts thar are content specific
        let payloadString = '';
        if (contentType == 'json') {
            res.setHeader('Content-Type', 'application/json');
            // Use the payload called back by the handler or default to an empty.
            payload =  typeof(payload) == 'object' ? payload : {};
            payloadString = JSON.stringify(payload)
          } 
        if(contentType == 'html'){
            res.setHeader('Content-Type', 'text/html');
            payloadString = typeof(payloadString) == 'string' ? payload : '';
        }

        // Return the response-parts that are common to all content-types
        res.writeHead(statusCode);
        res.end(payloadString);


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
app.router = {
    '' : route.index,
    '/' : route.index,
    'api/users' : route.users
}


 
//  Start the server
app.createHttpServer();
// export the module.
 