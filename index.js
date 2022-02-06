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
 
// App object or Module scaffolding.
 const app = {}
// main functions or objects.
 app.createHttpServer = ()=>{
     const createServer = http.createServer(app.reqResHandler);
     createServer.listen(process.env.PORT || 3000, ()=>{
         console.log('\x1b[31m%s\x1b[0m', 'MVC Server Listening...');
     })
 }
 
 
//  Start the server
app.createHttpServer();
// export the module.
 