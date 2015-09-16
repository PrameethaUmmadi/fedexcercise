//main module
var myApp = angular.module('myApp', ['ngResource','autocomplete','angularUtils.directives.dirPagination']);
  
//controller  
myApp.controller('PhotoController',[ '$scope','$http', function PhotoController($scope, $http) {
    $scope.html = "photos.html";
    $scope.gallery = []
    $scope.pics = [];
    $scope.selectedIndex = -1;
    //url to fetch tags of a user
   var url = "https://api.flickr.com/services/rest/?method=flickr.tags.getListUser&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&format=json&jsoncallback=getTags";
   //url to fetch all the photos uploaded by a user
   var getAllPicsUrl = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&format=json&jsoncallback=jsonFlickrApi";
   $http.jsonp(url);
   $http.jsonp(getAllPicsUrl);
   //callback functions
   getTags = function(data){
       $scope.tags = data.who.tags;
   }
    jsonFlickrApi = function(data){
        $scope.photos = data.photos;
        $scope.pics = $scope.photos.photo;
        angular.forEach($scope.photos.photo, function(item){
            $scope.gallery.push(item.title);
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
         $scope.selectedIndex = -1;

  }
  $scope.getPhotos = function(selectedTag,i){
    $scope.selectedIndex = i;
    selectedTag = selectedTag.toLowerCase();
    var tag_based_search_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a5e95177da353f58113fd60296e1d250&user_id=132365033@N08&tags="+selectedTag+"&format=json&jsoncallback=getPicsOfTags";
    $http.jsonp(tag_based_search_url);
    getPicsOfTags = function(data){
        $scope.photos = data.photos;
    }
    $scope.html = "tagResult.html";
   document.getElementsByName("searchBox")[0].value = '';
}
$scope.clickOnHeader = function(){
          $scope.photos.photo = $scope.pics;
          document.getElementsByName("searchBox")[0].value = '';
          $scope.selectedIndex = -1;
}

}]);
