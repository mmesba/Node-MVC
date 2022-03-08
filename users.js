/*
 * Title: User Handler File
 * Description: User Handler to Handle users
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 08/03/2022
 */
 
// Dependencies.
 
 
// App object or Module scaffolding.
 const users = {};
// main functions or objects.

// JSON API handler
users.userHandler = (data, callback)=>{
    // Check which method is is requested by user and response according to that
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if(acceptedMethods.indexOf(data.method) > -1){
        // Call the corresponding method defined below
        users._users[data.method](data, callback);
    } else{
        callback(405)
    }
}


 users._users = {};


users._users.get = (data, callback)=>{
    callback(200, {'ok': 'ok'});
}
 
 
 
// export the module.
 module.exports = users;