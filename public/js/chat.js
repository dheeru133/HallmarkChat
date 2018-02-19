/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-16 13:07:56 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-19 10:41:34
 */

var socket = io();
var selfUser;
// Height Adjustment
function scrollToBottom() {

    debugger;
    var messageContainer = $('.right-header-contentChat');

    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messageContainer.prop('clientHeight');
    //var scrollTop = messageContent.scrollTop;
    var scrollHeight = messageContainer.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + newMessageHeight + lastMessageHeight <= scrollHeight) {
        messageContainer.scrollTop(scrollHeight);
    }

}
//Connection to server
socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    selfUser = params.name;
    socket.emit('join', params, function(error) {
        if (error) {
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});

//Listen custom event
socket.on('newMessage', function(message) {

    var style;
    //Self user Template
    if (selfUser == message.from) {
        style = 'rightside-left-chat';
    }
    //Mustache Templating
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var validRightLeft = message.from;
    var formatObj = {
        from: message.from,
        text: message.text,
        createdAt: formattedTime,
    };
    if (validRightLeft == 'Admin') {
        formatObj.Admin = 'Admin';
    } else if (style) {
        formatObj.style = style;
    } else {
        formatObj.Normal = 'Normal';
    }
    var html = Mustache.render(template, formatObj);
    $('#messages').append(html);
    scrollToBottom();
});

//Listen Geolocation event
socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    l1.append(a);
    $('#messages').append(li);
});

// Update the user List specific to that room

socket.on('updateUserList', function(users) {
    console.log(users);
    //Mustache Templating
    var template = $('#users-template').html();
    var html = Mustache.render(template, { users: users });
    var usersListAppend = $('#users');
    usersListAppend.empty();
    usersListAppend.append(html);
    scrollToBottom();
});

//Disconnection to server
socket.on('disconnect', function() {
    console.log('Dissconnected to server');
});

//######################Event Listener JQUERY###################
$(document).ready(function() {
    var height = $(window).height();
    $('.left-chat').css('height', (height - 92) + 'px');
    $('.right-header-contentChat').css('height', (height - 153) + 'px');
    // $('.left-chat').css('height', '750px');
    // $('.right-header-contentChat').css('height', '690px');
});

$('#submitForm').on('click', function() {
    $('#message-form').submit();
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    //  Emit custom event
    socket.emit('createMessage', {
        // from: selfUser,
        text: messageTextBox.val(),
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });

    }, function() {
        alert('Unable to fetch location');
    });
});