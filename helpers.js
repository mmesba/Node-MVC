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
const crypto = require('crypto');
const environmentToExport = require('./environment');
 
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
 
//  Create a SHA256 hash
helpers.hash = (str)=>{
    if(typeof(str) === 'string' && str.length > 0) {
        let hash = crypto.createHmac('sha256', environmentToExport.hashingSecret).update(str).digest('hex');
        return hash;
    }else{
        return false;
    }
}
// Get the string content of a template
helpers.getTemplate = (templateName, data, callback)=>{
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof(data) === 'object' && data !== null ? data : {};

    if(templateName){
        let templatesDir = path.join(__dirname, '/templates/');
        fs.readFile(templatesDir+templateName+'.html', 'utf-8', (err, str)=>{
            if(!err && str){
                // Do interpolation on the string before returning it
                let finalString = helpers.interpolate(str, data);
                callback(false, finalString);
            } else{
                callback('No template could be found')
            }
        })
    } else{
        callback('A valid template name was not specified');
    }
}


// Add the universal header and footer to a string , and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = (str, data, callback)=>{
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};
    // Get the header 
    helpers.getTemplate('_header', data, (err, headerString)=>{
        if (!err && headerString) {
            // Get the footer
            helpers.getTemplate('_footer', data, (err, footerString)=>{
                // Add them all together
                let fullString = headerString+str+footerString;
                callback(false, fullString);
            }) 
          } else {
             callback('Could Not find the header template')
         }
    })
}
 
// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = (str, data)=>{
    str = typeof(str) === 'string' && str.length > 0 ? str : '';
    data = typeof(data) === 'object' && data !== null ? data : {};

    // Add the templateGlobals do the data object, prepending their key name with "global"
    for(var keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data['global.'+keyName] = config.templateGlobals[keyName]
        }
    }

    // For each key in the data object , insert it's value into the string at the corresponding placeholder
    for(var key in data) {
        if(data.hasOwnProperty(key) && typeof(data[key]) === 'string'){
            let replace = data[key];
            let find = '{'+key+'}';
            str = str.replace(find, replace);
        }
    }
    return str; 

}




// export the module.
 module.exports = helpers