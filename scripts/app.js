var myApp = angular.module('myApp', ['ngResource','autocomplete']);
  
myApp.controller('PhotoController',[ '$scope','$http', function PhotoController($scope, $http) {
    $scope.movies = []
    $scope.pics = [];
   var url = "https://api.flickr.com/services/rest/?method=flickr.tags.getListUser&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&format=json&jsoncallback=getTags";
    $http.jsonp("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&format=json").success(function (data) {
        $scope.photos = data.photos;
        $scope.pics = $scope.photos.photo;
        angular.forEach($scope.photos.photo, function(item){
            $scope.movies.push(item.title);
         });
    });
   $http.jsonp(url);
   getTags = function(data){
       $scope.tags = data.who.tags;
   }
    jsonFlickrApi = function(data){
        $scope.photos = data.photos;
        $scope.pics = $scope.photos.photo;
        angular.forEach($scope.photos.photo, function(item){
            $scope.movies.push(item.title);
         });
    };
    
  $scope.doSomething = function(searchString){
     if(searchString.length == 0){
        $scope.photos.photo = $scope.pics;
     }
  }
  $scope.doSomethingElse = function(searchString){
        $scope.photos.photo = $scope.pics;
        $scope.photos.photo = $scope.photos.photo.filter(function(item) {
           return item.title === searchString;
       });
  }

}]);
