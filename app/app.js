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
      time:$scope.eventTime,
      timeformated:$scope.eventTimeFormated
    };

    $scope.EventList.push(Event);
    $scope.ClearForm();
  };

  //Remove Event
  $scope.removeClickHandler = function (item) {

    var index = $scope.EventList.indexOf(item);
    $log.log( 'sdate :' + item);

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
    $scope.calendarDate = "";
    $scope.calFormatedDate = "";

  };

  //Clear selected date
  $scope.ClearDate = function () {

    $scope.calendarDate = "";
    $scope.calFormatedDate = "";


  };


  $scope.getTimeClickHandler = function(item) {
    $interval(function () {



      //$log.log('Date now: ' + Date.now());
      var sdate = item.time;
      $scope.fuck1=moment(sdate).toNow();
      $scope.fuck2=moment().toDate();;
      var start = new Date();

      var dif = sdate-start;
      //let sdate2 = sdate.ge;



      $log.log( '$scope.fuck2 :' + $scope.fuck2);

      $log.log( 'dif :' + dif);

      let expireDate = 18374 * 24 * 60 * 60;
      $log.log('Date exp: ' + expireDate);
      let nTime = Math.floor(Date.now() / 1000);
      $log.log('Date nTi: ' + nTime);
      let remaining = dif/1000;
      $log.log('remaining: ' + remaining);

      $scope.rDays = parseInt(remaining/60/60/24);
      $scope.rHours = parseInt((remaining-($scope.rDays*60*60*24))/60/60);
      $scope.rMinutes = parseInt((remaining-($scope.rDays*60*60*24)-($scope.rHours*60*60))/60);
      $scope.rSeconds = parseInt(remaining-($scope.rDays*60*60*24)-($scope.rHours*60*60)-($scope.rMinutes*60));

    },1000);
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


  //TimePicker Time convert

  $scope.eventTimeFormated=moment($scope.eventTime).format('LT');
  $scope.changedTime=function(){
    if($scope.eventTime){
      $scope.eventTimeFormated=moment($scope.eventTime).format('LT');
    }
  };
});
