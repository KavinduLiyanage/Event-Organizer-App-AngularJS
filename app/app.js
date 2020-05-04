'use strict'
let app=angular.module('organizer',['ngMaterial']);

app.controller('MainCtrl',function ($scope,$interval,$log) {

  $scope.EventList =[];

  //Add new Event
  $scope.addClickHandler = function() {

    var Event = {
      id:$scope.EventList.length + 1,
      name:$scope.eventName,
      date:$scope.eventDateFormated,
      dateformated:$scope.eventDate,
      time:$scope.eventTime,
      timeformated:$scope.eventTimeFormated
    };

    $scope.EventList.push(Event);
    $scope.ClearForm();

  };

  //Remove Event
  $scope.removeClickHandler = function (item) {

    var index = $scope.EventList.indexOf(item);
    $scope.EventList.splice(index,1);

  };

  //Edit button click event data bind
  $scope.editClickHandler = function (item) {

    $scope.id = item.id;
    $scope.eventName = item.name;
    $scope.eventDate = item.date;
    $scope.eventTime = item.time;

  };

  //Edit event change save
  $scope.updateClickHandler = function () {

    $.grep($scope.EventList,function (e) {

      if(e.id == $scope.id) {

        e.name=$scope.eventName;
        e.date=$scope.eventDateFormated;
        e.time=$scope.eventTime;
        e.timeformated=$scope.eventTimeFormated;
      }
    });

    $scope.ClearForm();
  };


  //Clear form
  $scope.ClearForm = function () {
    $scope.eventName = "";
    $scope.eventDate = new Date();
    $scope.eventTime = "";
  };

  //Clear selected date
  $scope.ClearDate = function () {

    $scope.calendarDate = "";
    $scope.calFormatedDate = "";
  };


  //Calendar Date convert
  $scope.calendarDate="";
  $scope.calFormatedDate="";
  $scope.changedDate=function(){
    if($scope.calendarDate){
      $scope.calFormatedDate=moment($scope.calendarDate).format('LL');
    }
  };

  //DatePicker Date convert
  $scope.eventDate=new Date();
  $scope.eventDateFormated=moment($scope.eventDate).format('dddd, MMMM D, YYYY');
  $scope.changedDate2=function(){
    if($scope.eventDate){
      $scope.eventDateFormated=moment($scope.eventDate).format('dddd, MMMM D, YYYY');
    }
  };

  $scope.eventTimeFormated=moment($scope.eventTime).format('LT');
  $scope.changedTime=function(){
    if($scope.eventTime){
      $scope.eventTimeFormated=moment($scope.eventTime).format('LT');
    }
  };


  $interval(function () {

    var edate = Math.floor(Date.now() / 1000);
    var time2formated = moment(edate).format('k');
    var timecal = time2formated*60*60*1000;
    var start = Math.floor(Date.now() / 1000);
    var Datedif = edate-start;
    var dateandtimedif = Datedif+timecal;
    let remaining = Datedif/1000;

    $scope.rDays = parseInt(remaining/60/60/24);
    $scope.rHours = parseInt((remaining-($scope.rDays*60*60*24))/60/60);
    $scope.rMinutes = parseInt((remaining-($scope.rDays*60*60*24)-($scope.rHours*60*60))/60);
    $scope.rSeconds = parseInt(remaining-($scope.rDays*60*60*24)-($scope.rHours*60*60)-($scope.rMinutes*60));

  },1000);


  //TimePicker Time convert


});
