/*
 * Title: Routes
 * Description: Apps routes
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 06/02/2022
 */

const path = require("path/posix");
const helpers = require("./helpers");

 
// Dependencies.
 
 
// App object or Module scaffolding.
const routes = {} 
// main functions or objects.
 routes.index = (data, callback)=>{
    //  Reject any request that is not a GET
    if(data.method == 'get'){
        // Read in a template as a string
        helpers.getTemplate('index', (err, str)=>{
            if(!err && str){
                callback(200, str, 'html');
            } else{
                console.log(err);
                callback(500, undefined, 'html');
            }
        })
    } else{
        callback(405, undefined, 'html');
    }
 }


 routes.notFound = (data, callback)=>{
    //  Callback a http status code and a payload object
    callback(404, {'notFoundPath': data.trimmedPath})
 }
 

 routes.sample = (data, callback)=>{
     callback(200, {'ok': 'ok;'})
 }
//  routes.test = (data, callback)=>{
//      callback(200, {'test': 'ok'}, 'json');
//  }
 
// export the module.
 module.exports = routes; 