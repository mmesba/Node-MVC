/*
 * Title: User Handler File
 * Description: User Handler to Handle users
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 08/03/2022
 */
 
// Dependencies.
 const _data = require('./data');
const helpers = require('./helpers');
 
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
    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone.trim() : false;
    let password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length >  0 ? data.payload.password : false;
    let tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        // Make sure the user doesn't already exist
        _data.read('users', phone, (err, data)=>{
            if (err) {
                // Hash the password
                let hashedPassword = helpers.hash(password);


                if(hashedPassword){
                // Create the user object
                let userObject = {
                    'firstName': firstName,
                    'lastName' : lastName,
                    'phone' : phone,
                    'hashedPassword' : hashedPassword,
                    'tosAgreement' : true
                };

                // Store the user
                _data.create('users', phone, userObject, (err)=>{
                    if (!err) {
                        callback(200, {'msg': 'user created successfully'}) ;
                      } else {
                         console.log(err);
                         callback(500, {'Error' : 'Could not create new user'})
                     }
                })

            } else{
                callback(500, {'error': 'could not hash the user\'s password'})
            }
            }else{
                // User already exist
                callback(400, {'Error': 'A user with that phone number already exist'})
            }
        })
    }else{
        callback(400, {'error': 'Missing required field'})
    }
}
 
 
// Get or Read user
users._users.get = (data, callback)=>{
    // Check the phone number is valid
    let phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 11 ? data.queryStringObject.phone.trim() : false;
    if(phone){
        // Lookup the user
        _data.read('users', phone, (err, data)=>{
            if (!err && data) {
                // Remove the hashed password from the user object before returning it to the requester
                delete data.hashedPassword;
                callback(200, data); 
              } else {
                 callback(404, {'Error': 'Not found'})
             }
        })
    }else{
        callback(400, {'Error': 'Missing require field'})
    }
}


// users put
users._users.put = (data, callback)=>{
    // Check for the require field
    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone.trim() : false; 


    // Check the optional field
    let firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    let lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    let password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length >  0 ? data.payload.password : false;

    // Error if the phone is invalid
    if(phone){
        // Error if nothing is sent to update
        if(firstName || lastName || password){
            // lookup the user
            _data.read('users', phone, (err, userData)=>{
                if (!err && userData) {
                    // Update the fields necessary
                    if(firstName){
                        userData.firstName = firstName;
                    }
                    if(lastName){
                        userData.lastName = lastName
                    } 
                    if(password){
                        userData.hashedPassword = helpers.hash(password);
                    }

                    // Store the new updates
                    _data.update('users', phone, userData, (err2)=>{
                        if (!err) {
                            callback(200, {'msg': 'updated!'}) 
                          } else {
                             console.log(err2);
                             callback(500, {'error': 'could not update the user'})
                         }
                    })
                  } else {
                     callback(400, {'error': 'the specified user does not exist'})
                 }
            })
        }else{
            callback(400, {'error': 'missing fields to update'})
        }
    } else{
        callback(400, {'error': 'Missing required field '})
    }
}

// Delete user
users._users.delete = (data, callback)=>{
        // Check the phone number is valid
        let phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 11 ? data.queryStringObject.phone.trim() : false;

        if(phone){
            // Lookup the user
            _data.read('users', phone, (err, data)=>{
                if (!err && data) {
                    _data.delete('users', phone, (err)=>{
                        if (!err) {
                            callback(200, {'msg': 'deleted user!'}) 
                          } else {
                             callback(500, {'error': 'deleting faild'})
                         }
                    }) 
                  } else {
                     callback(400, {'error' : 'could not found user'})
                 }
            })
        } else{
            callback(400, {'error': 'missing required field'})
        }
}

// export the module.
 module.exports = users;