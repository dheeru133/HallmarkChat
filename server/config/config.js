/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 22:47:07
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-20 12:14:22
 */

// mongodb://crudUser:CRUDDB2018@ds233228.mlab.com:33228/mongo-crud-db
// mongodb://mongoUser:MongoDB2018@ds233228.mlab.com:33228/mongo-crud-db

//Standard process to keep all the development and test variables in seperate json file

// if (env === 'development' || env === 'test') {

//     var config = require('./config.json');
//     var envConfig = config[env];

//     Object.keys(envConfig).forEach((key) => {
//         process.env[key] = envConfig[key];
//     });
// }

const env = process.env.NODE_ENV || 'development';
// const env = 'prod';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else {
    //Production Hardcoded values
    // process.env.PORT = 3000;
    // process.env.MONGODB_URI = 'mongodb://mongoUser:MongoDB2018@ds233228.mlab.com:33228/mongo-crud-db';
}


// Custom production MONGO Cluster URL


module.exports = {
    env,
};