/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-18 22:55:44 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-18 23:54:48
 */

var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = { isRealString };