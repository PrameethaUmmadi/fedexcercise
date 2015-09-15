'use strict';

angular.module('myApp')
    .service('photoService', [$http, function($http) {
        var service = {};
        var url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&format=json";
        service.getList = function () {
            $http.jsonp(url).success(function(data){

            });
            jsonFlickrApi = function(data){
              service.photos = data.photos;
            }
            return service;
        };
}]);

