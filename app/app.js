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
      time:$scope.eventDate
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
        e.time=$scope.eventDate;
      }
    });
  };


  //Clear form
  $scope.ClearForm = function () {
    $scope.eventName = "";
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

      $log.log( 'sdate :' + sdate);

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
  $scope.changedDate=function(){/*Calendar change function */
    if($scope.calendarDate){
      $scope.calFormatedDate=moment($scope.calendarDate).format('LL');
    }
  };

  //DatePicker Date convert
  $scope.eventDate=new Date();
  $scope.eventDateFormated=moment($scope.eventDate).format('LL');
  $scope.changedDate2=function(){/*Calendar change function */
    if($scope.eventDate){
      $scope.eventDateFormated=moment($scope.eventDate).format('LL');
    }
  };
});
