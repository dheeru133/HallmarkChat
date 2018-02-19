/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-16 14:09:07 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-18 11:33:23
 */

var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

// Description of Test with Mocha

describe('generateMessage', () => {
    it(' should generate the correct message Object', () => {
        var from = 'Dheeraj';
        var text = 'Welcome to Hallmark Chat App';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });

});

describe('generateLocationMessage', () => {
    it(' should generate the Location', () => {
        var from = 'Dheeraj';
        var latitude = '44.968046';
        var longitude = '-94.420307';
        var url = 'https://www.google.com/maps?q=44.968046,-94.420307'
        var returnUrl = generateLocationMessage(from, latitude, longitude);
        expect(returnUrl.url).toBe(url);
    });

});