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

        // Prepare data for interpolation
        let templateData= { 
        'head.title' : 'This is the title',
        'head.description' : 'This is the meta description',
        'body.title' : 'This is demo title',
        'body.class' : 'index'
    }


        // Read in a template as a string
        helpers.getTemplate('index', templateData, (err, str)=>{
            if(!err && str){
                // Add universal header and footer
                helpers.addUniversalTemplates(str, templateData,(err, str)=>{
                    if (!err && str) {
                        // Return the page as html
                        callback(200, str, 'html') 
                      } else {
                         callback(500, undefined, 'html')
                     }
                })
            } else{
                console.log(err);
                callback(500, undefined, 'html');
            }
        })
    } else{
        callback(405, undefined, 'html');
    }
 }


//  Favicon 
 routes.favicon = (data, callback) =>{
    //  Reject any request that isn't a GET
    if(data.method !== 'get'){
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', (err, data)=>{
            if (!err && data) {
                // Callback the data
                callback(200, data, 'favicon'); 
              } else {
                 callback(500)
             }
        })
    }else{
        callback(405)
    }
 }

//  Public assets
routes.public = (data, callback)=>{
    // Reject any request that is not GET request
    if (data.method !== 'get') {
        //  Get the filename being requested
        let trimmedAssetName =  data.trimmedPath.replace('/public', '');
        if(trimmedAssetName.length > 0){
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName, (err, data)=>{
                if (!err && data) {
                    // Determine the content type (default to plain text)
                    let contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css';
                    } 
                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png';
                    } 
                    if(trimmedAssetName.indexOf('.jpeg') > -1){
                        contentType = 'jpeg';
                    } 
                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon';
                    } 

                    // callback the data
                    callback(200, data, contentType);
                  } else {
                     callback(404)
                 }
            })
        }else{
            callback(404)
        }
      } else {
         callback(500)
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