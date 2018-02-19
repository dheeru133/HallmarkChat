/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-18 22:47:40 
 * @Last Modified by:   Dheeraj.Chaudhary@contractor.hallmark.com 
 * @Last Modified time: 2018-02-18 22:47:40 
 */
(function($) {
    $.deparam = $.deparam || function(uri) {
        if (uri === undefined) {
            uri = window.location.search;
        }
        var queryString = {};
        uri.replace(
            new RegExp(
                "([^?=&]+)(=([^&#]*))?", "g"),
            function($0, $1, $2, $3) {
                queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
            }
        );
        return queryString;
    };
})(jQuery);