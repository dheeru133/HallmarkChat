/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-16 13:58:02 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-18 16:23:40
 */

const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf(),
    }
};

var generateLocationMessage = (from, latitude, longitude) => {

    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf(),
    }
};

//Module Export
module.exports = { generateMessage, generateLocationMessage };