'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });


    $scope.chapterOne = function(){
      $http({
        method: 'GET',
        url: '/advertising'
      }).
      success(function (data, status, headers, config) {
        $scope.chOne = data;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });


    }


    $scope.chapterTwo = function(){
      $http({
        method: 'GET',
        url: '/law'
      }).
      success(function (data, status, headers, config) {
        $scope.chTwo = data;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });

      
    }    

    $scope.chapterThree = function(){
      $http({
        method: 'GET',
        url: '/clause'
      }).
      success(function (data, status, headers, config) {
        $scope.chThree = data;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });

      
    }    

    $scope.test = "test";





    // NLP CODE HERE


  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here
    $scope.test = "test";
    $scope.dummy = "tesadas";

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
