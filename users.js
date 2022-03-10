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


users._users.post = (data, callback)=>{
//    Check that all required fields are filled out
    let firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    let lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    let phone = typeof(data.payload.phone) === 'string' && data.payload.trim().length == 11 ? data.payload.phone : false;
    let password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length >  0 ? data.payload.password : false;
    let tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement == true ? true : false
}
 
 
 
// export the module.
 module.exports = users;