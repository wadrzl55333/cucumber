'use strict';

angular.module('trinity')
  .controller('bodyCtrl', ['$scope', function ($scope ){
    $scope.skin = 'blue';
    $scope.$on('$destroy',$scope.$on('changeTheme', function(event, msg) {
      if($scope.skin === 'blue'){
        $scope.skin = msg[0].skin;
      }
      else{
        $scope.skin = msg[1].skin;
      }
      //$scope.skin = msg.skin;
    }));
    $scope.webb=false;
    $scope.swithNav=function(){
      if($scope.webb==true){
        $scope.webb=false;}
      else{
        $scope.webb=true;
      }

    }

  }])
  .config(['notificationServiceProvider', function(notificationServiceProvider) {
    notificationServiceProvider

      .setDefaults({
        delay: 40000,
        mouse_reset: false,
        remove: true,
        icon:true,
        buttons: {
          closer: true,
          closer_hover: false,
          sticker: false,
          sticker_hover: false
        },
        desktop:{
          desktop:true
        },
        type: 'error'
      })
      // Configure a stack named 'bottom_right' that append a call 'stack-bottomright'
      .setStack('bottom_right', 'stack-bottomright', {
        dir1: 'up',
        dir2: 'left',
        firstpos1: 25,
        firstpos2: 25
      })
      // Configure a stack named 'top_left' that append a call 'stack-topleft'
      .setStack('top_left', 'stack-topleft', {
        dir1: 'down',
        dir2: 'right',
        push: 'top'
      });
    notificationServiceProvider.setDefaultStack('bottom_right');
  }])


  .controller('pnotifyCtrl', ['$scope','notificationService',  function($scope, notificationService){
    $scope.success = function() {
      notificationService.success('Successing text');
    };
    $scope.info = function() {
      notificationService.info('Info text');
    };
    $scope.notice = function() {
      notificationService.notice('Notice text');
    };
    $scope.error = function() {
      notificationService.error('Error text');
    };
    $scope.generic = function() {
      notificationService.notify({
        title: 'The notice title.',
        title_escape: false,
        text: 'The notice text.',
        text_escape: false,
        styling: 'bootstrap3',
        type: 'notice',
        icon: true
      });
    };
    $scope.confirmDialog = function() {
      notificationService.notify(
        {
          title: 'Confirmation Needed',
          text: 'Are you sure?',
          hide: false,
          confirm: {
            confirm: true
          },
          buttons: {
            closer: false,
            sticker: false
          },
          history: {
            history: false
          }
        }).get().on('pnotify.confirm', function() {
          alert('Ok, cool.');
        }).on('pnotify.cancel', function() {
          alert('Oh ok. Chicken, I see.');
        });
    };
    $scope.overrideDefaults = function() {
      notificationService.notifyWithDefaults({
        text: 'Keeps defaults but override delay',
        delay: 1000
      });
    };
    $scope.stackTopLeft = function(){
      notificationService.info('Hello World : Top left', 'top_left');
    };
    $scope.stackBottomRight = function(){
      notificationService.info('Hello World : Bottom right', 'bottom_right');
    };

  }])
  .controller('popoverCtrl', ['$scope', function($scope){
    $scope.items = [{
      name: "Action"
    }, {
      name: "Another action"
    }, {
      name: "Something else here"
    }];
  }])
  .controller('tagsCtrl', ['$scope', function($scope){

    $scope.tags = [
      { text: 'just' },
      { text: 'some' },
      { text: 'cool' },
      { text: 'tags' }
    ];
    $scope.loadTags = function(query) {
      return $http.get('/tags?query=' + query);
    };
  }])
  .controller('datepickerCtrl',['$scope',function($scope){
    $scope.today = function() {
      $scope.dt = new Date();
    };

    // run today() function
    $scope.today();

    // setup clear
    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);
    // open min-cal
    $scope.openStart = function($event) {
      $scope.status.startOpened = true;
    };
    $scope.openEnd = function($event) {
      $scope.status.endOpened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.status = {
      startOpened:false,
      endOpened: false
    };
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.changed = function () {
      $log.log('Time changed to: ' + $scope.mytime);
    };
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };
  }])
  .controller('selectCtrl',['$scope','$timeout',function($scope,$timeout){

    $scope.person = {};

    //$scope.person.selectedValue = $scope.peopleObj[3];
    //$scope.person.selectedSingle = 'Samantha';
    //$scope.person.selectedSingleKey = '5';

    $scope.people = [
      { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
      { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
      { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
      { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
      { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
      { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
      { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
      { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
      { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
      { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
    ];
  }])
  .controller('multiSelectCtrl',['$scope',function($scope){
    $scope.mulTranslation={buttonDefaultText: '请选择名称',checkAll:'全选',uncheckAll:'全不选',dynamicButtonTextSuffix:'个已选择'}
    $scope.example1model = [];
    $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
  }])
;
