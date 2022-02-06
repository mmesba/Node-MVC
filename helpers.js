/*
 * Title: Helpers File
 * Description: Helpers file for api
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 06/02/2022
 */
 
// Dependencies.
 
 
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
 
 
 
// export the module.
 module.exports = helpers