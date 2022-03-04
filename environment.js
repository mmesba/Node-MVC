/*
 * Title: Environment Related Files
 * Description: Environment Files for Project
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 04/03/2022
 */
 
// Dependencies.
 
 
// App object or Module scaffolding.
 const environments = {};
// main functions or objects.
// staging environment
environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
}

// Production environment
environments.production = {
    'port' : 5000,
    'envName' : 'production'
}


// Determine which environment was passed as a command line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging
 
 
// export the module.
module.exports = environmentToExport;