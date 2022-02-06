/*
 * Title: Helpers File
 * Description: Helpers file for api
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 06/02/2022
 */
 
// Dependencies.
 const path = require('path');
const fs = require('fs');
 
// App object or Module scaffolding.
const helpers = {}; 
// main functions or objects.
//  Parse a json string to an  object in all cases, without throwing
helpers.parseJsonObject = (str)=>{
    try {
        let obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}
 
 
// Get the string content of a template
helpers.getTemplate = (templateName, callback)=>{
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    if(templateName){
        let templatesDir = path.join(__dirname, '/templates/');
        fs.readFile(templatesDir+templateName+'.html', 'utf-8', (err, str)=>{
            if(!err && str){
                callback(false, str);
            } else{
                callback('No template could be found')
            }
        })
    } else{
        callback('A valid template name was not specified');
    }
}
 
// export the module.
 module.exports = helpers