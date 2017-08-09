'use strict';

angular.module('trinity')
  .controller('headerCtrl', ['$rootScope', '$scope', '$log', '$translate', 'LOCALE', function ($rootScope,$scope, $log, $translate, LOCALE){
    $scope.changeTheme = function(){
      //$rootScope.$broadcast('changeTheme',{skin: 'gold'});
      $rootScope.$broadcast('changeTheme', [{skin:'gold'},{skin:'blue'}]);
    };
    $scope.currentLang = LOCALE;
    $scope.changeLang = function() {
      if($scope.currentLang === 'en_US') {
        $scope.currentLang = 'zh_CN';
      } else if($scope.currentLang === 'zh_CN') {
        $scope.currentLang = 'en_US';
      }
      $translate.use($scope.currentLang);
    };

  }]);
