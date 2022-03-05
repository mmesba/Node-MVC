/*
 * Title: Data File
 * Description: Data related file to deal with data.
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 05/03/2022
 */
 
// Dependencies.
 const fs = require('fs');
const path = require('path');
 
// App object or Module scaffolding.
 const lib = {};
// main functions or objects.
//  Base Directory of the data folder
lib.baseDir =  path.join(__dirname, '/.data/');

// Write data to file
lib.create = (dir, file, data, callback)=>{
    // open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx' , (err1, fileDescriptor)=>{
        if (!err1 && fileDescriptor) {
            //  Convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and then close it 
            fs.writeFile(fileDescriptor, stringData, (err2)=>{
                if (!err2) {
                    fs.close(fileDescriptor, (err3)=>{
                        if (!err3) {
                            callback(false); 
                          } else {
                             callback('Error closing the new file !')
                         }
                    }) 
                  } else {
                     callback('Error writing to new file')
                 }
            })
          } else {
             callback('Could not create new file , it may already exist')
         }
    })
}


// Read data from file
lib.read = (dir, file, callback)=>{
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', (err, data)=>{
        callback(err, data)
    })
}
 
 
 
// export the module.
 module.exports = lib;