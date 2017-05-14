var myApp =angular.module( 'myApp', [ ] );
//set up a controller
myApp.controller( 'MovieController', function($http){
  console.log('NG');

  //globals
  var vm = this;
  vm.items = [];
  vm.favs = [];

//Get Movie info from OMDB
    vm.getMovieInfo = function (){

      console.log('in get Movies');
      $http({
        method: 'GET',
        url: 'http://www.omdbapi.com/?s=' + vm.movie_name
      }).then(function(response){
        console.log('responsed data=', response.data.Search);
        vm.items = response.data.Search;
        console.log('vm.display',vm.items);
      });
    }; // end get Movie


  //refresh the dom
    vm.refresh = function (){
      vm.items=[];
      vm.favs = [];
      vm.movie_name = "";
    };  // end refresh





    vm.addFavoriteMovie = function (Title , Poster, Year){
      console.log('in addFavoriteMovie');
      var objectToSend = {
        title: Title,
        poster: Poster,
        date: Year,

      };//end objectToSend
        console.log('sending to db' , objectToSend);
        $http({
          method: 'POST',
          url: '/addFavMovie',
          data: objectToSend
        }).then(function(response){
          console.log('back from server with:', response);
        });
    };//end addFavoriteMovie

  vm.showFavs = function (){
    
    console.log('in showFavs');
    $http({
      method: 'GET',
      url: '/getFavs'
    }).then(function success(response){
      console.log('response.data is:', response.data);
      vm.favs = response.data;
      console.log('favs' , vm.favs);
    });//end http
  };//end getAssignments


});//end myApp
