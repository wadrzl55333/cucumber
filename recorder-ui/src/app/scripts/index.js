'use strict';
if(!angular.merge){
  angular.merge = jQuery.extend;
}
angular.module('trinity', [
  'ngAnimate',
  'ngSanitize',
  'ngResource',
  'ngMessages',
  'ui.router',
  'highcharts-ng',
  'ui.bootstrap',
  'pascalprecht.translate',
  'trinity.config',
  'ui.dashboard',
  'ui.utils',
  'ui.select',
  'jlareau.pnotify',
  'angular-loading-bar',
  'nsPopover',
  'base64',
  'ui-notification',
  'angular-datepicker',
  'ngCookies',
  'ngTagsInput',
  'ccNotify',
  'ngClipboard',
  'angularjs-dropdown-multiselect'
])
  .config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("assets/images/ZeroClipboard.swf");
  }])
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.skinClass='skin-gold';
  })
  /* 替换Pnotify
  .factory('notificationService',['Notification',function(Notification){
    Notification.notice=Notification.warning;
    return Notification;
  }])
  */
  .config(['$logProvider', 'DEBUG', function ($logProvider, DEBUG) {
    $logProvider.debugEnabled(DEBUG); // 调试日志开关
  }])
  .config(['$translateProvider', 'LOCALE', function ($translateProvider, LOCALE) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage(LOCALE);
  }])

  .config(function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 100,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top',
      replaceMessage:true
    });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.timeout = 5000;
  })
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/components/ngGrid');

      // Now set up the states
      $stateProvider
        .state('components', {
          url: '/components',
          abstract: true,
          views: {
            'header@': {
              templateUrl: 'app/views/section/header.html'
            },
            'nav@': {
              templateUrl: 'app/views/components/nav.html',
              controller:['$scope',function($scope){
                $scope.testMenu=[
                  {
                    'caption': 'DEMO',
                    'href': '',
                    'icon': 'fa-sitemap text-purple',
                    'auth': '',
                    'submenu':[
                      {
                        'caption': 'i18n',
                        'href': 'components.i18n',
                        'icon': 'fa fa-desktop',
                        'auth': ''
                      },
                      {
                        'caption': 'pnotify',
                        'href': 'components.pnotify',
                        'icon': 'fa fa-desktop',
                        'auth': ''
                      },
                      {
                        'caption': 'ui-notify',
                        'href': 'components.uinotify',
                        'icon': 'fa fa-desktop',
                        'auth': ''
                      },
                      {
                        'caption': 'WIKI Page',
                        'href':'components.ccTagHref',
                        'icon': 'fa fa-document',
                        'auth': ''
                      }
                    ]
                  },
                  {
                    'caption': 'test',
                    'href': 'components.test',
                    'icon': 'fa fa-desktop text-blue',
                    'auth': ''
                  },
                  {
                    'caption':'步骤引导组件',
                    'href':'components.stepDemo',
                    'icon': 'fa fa-desktop text-blue',
                    'auth': ''
                  },
                  {
                    'caption': '子菜单示例',
                    'href': '',
                    'icon': 'fa-sitemap text-green',
                    'auth': '',
                    'submenu':[
                      {
                        'caption': '子菜单1',
                        'href': 'dev.virtualMachine',
                        'icon': 'fa fa-desktop',
                        'auth': ''
                      },
                      {
                        'caption': '子菜单2',
                        'href': 'components.subnav',
                        'icon': 'fa fa-desktop',
                        'auth': ''
                      }
                    ]
                  }
                ];
              }]
            }
          }
        })
        .state('components.ngGrid', {
          url: '/ngGrid',
          views: {
            'content@': {
              templateUrl: 'app/views/components/ngGrid.html',
              controller: ['$scope', function ($scope) {
                $scope.myData = [{name: 'Moroni', age: 50},
                  {name: 'Teancum', age: 43},
                  {name: 'Jacob', age: 27},
                  {name: 'Nephi', age: 29},
                  {name: 'Enos', age: 34}];
                // 表格设置参考 https://github.com/angular-ui/ng-grid/wiki 文档
                $scope.gridOptions = {
                  data: 'myData',
                  enableColumnResize: true,
                  enablePinning: true,
                  columnDefs: [
                    { field: 'name', displayName: '名字', width: 90, maxWidth: 120 },
                    { field: 'age', displayName: '年龄', width: 80, maxWidth: 200 }
                  ],
                  multiSelect: false
                };
              }]
            }
          }
        })
        .state('components.i18n', {
          url: '/i18n',
          views: {
            'content@': {
              templateUrl: 'app/views/components/i18n.html',
              controller: ['$scope', function($scope) {
                $scope.testI18n = {'param1': '4', 'param2': '5'};
              }]
            }
          }
        })
        .state('components.pnotify',{
          url:'/pnotify',
          views:{
            'content@':{
              templateUrl:'app/views/components/pnotify.html',
              controller:'pnotifyCtrl'
            }
          }
        })
        .state('components.uinotify',{
          url:'/uinotify',
          views:{
            'content@':{
              templateUrl:'app/views/components/ui-notify.html',
              controller:['$scope','Notification','ccNotify','ccLoading',function($scope,Notification,ccNotify,ccLoading){
                $scope.success=function(){
                  Notification.success('操作成功,宽度可以自动扩展，宽度可以自动扩展宽度可以自动扩展');
                };
                $scope.error=function(){
                  Notification.error('操作失败【内部错误】');
                };
                $scope.success2=function(){
                  ccNotify.success('自定义的底部提示栏');
                };
                $scope.error2=function(){
                  ccNotify.error('自定义的底部提示栏');
                };

                $scope.ccLoadingClick1=function(){
                  ccLoading.showLoading('#bt1');//按钮上显示“加载中”
                  ccLoading.showLoadingBox('.dataArea');//区域中显示“加载中”

                };
                $scope.ccLoadingClick2=function(){
                  ccLoading.hideLoading('#bt1');//按钮上隐藏“加载中”
                  ccLoading.hideLoadingBox('.dataArea');//区域中隐藏“加载中”
                  $scope.testLoadingData=[
                    {
                      id:1,
                      text:'fdafdafe'
                    },
                    {
                      id:2,
                      text:'fdafdafe2'
                    },
                    {
                      id:3,
                      text:'fdafdafe3'
                    }
                  ];
                };
                $scope.ccLoadingClick3=function(){
                  ccLoading.showLoading('#bt1','自定义“加载中”文字');//自定义按钮上显示“加载中”文字
                  ccLoading.showLoadingBox('.dataArea',0,'正在加载Test数据...');//自定义区域中显示“加载中”文字
                };
                $scope.ccLoadingClick4=function(){
                  ccLoading.hideLoading('#bt1');
                  ccLoading.showLoadingBox('.dataArea',1);//区域中加载失败
                };
              }]
            }
          }
        })
        .state('components.test',{
          url:'/test',
          views:{
            'content@':{
              templateUrl:'app/views/components/test.html',
              controller:['$scope', '$modal','$base64','$cookieStore','$rootScope', function($scope, $modal,$base64,$cookieStore,$rootScope){
                $rootScope.$watch('validateRes',function(){
                  console.log($rootScope.validateRes);
                });
                $cookieStore.put('name','test');
                console.log('$cookieStore.get:'+$cookieStore.get('name'));
                $scope.username='testusername';
                setTimeout(function(){//模拟异步数据加载
                    $scope.aaa={
                      username:'testU$#serName3456'//用于进行表单验证的值;
                    };
                  },2500);
                $scope.tableData={
                  "success": true,
                  "total": "11",
                  "data": [
                    {
                      "clientid": "4",
                      "id": "196",
                      "name": 'base64:'+$base64.encode("tomcat-nginx-mysql (clone #2)"),
                      "status": "0",
                      "dtadded": "Aug 6, 2015 08:46:51",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "3",
                      "zones": "0",
                      "alerts": "0",
                      "lock": null,
                      "havemysqlrole": false,
                      "havemysql2role": true,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Terminated"
                    },
                    {
                      "clientid": "4",
                      "id": "195",
                      "name": "tomcat-nginx-mysql (clone #1)",
                      "status": "0",
                      "dtadded": "Aug 6, 2015 08:46:42",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "2",
                      "zones": "0",
                      "alerts": "0",
                      "lock": null,
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Terminated"
                    },
                    {
                      "clientid": "4",
                      "id": "194",
                      "name": "tomcat-nginx-mysql",
                      "status": "1",
                      "dtadded": "Aug 6, 2015 08:39:16",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "3",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "3",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "",
                      "havemysqlrole": false,
                      "havemysql2role": true,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    },
                    {
                      "clientid": "4",
                      "id": "191",
                      "name": "xinaa",
                      "status": "1",
                      "dtadded": "Aug 6, 2015 07:18:08",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "1",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "",
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    },
                    {
                      "clientid": "4",
                      "id": "183",
                      "name": "6d4b8bd5",
                      "status": "1",
                      "dtadded": "Aug 6, 2015 05:56:15",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": null,
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    },
                    {
                      "clientid": "4",
                      "id": "160",
                      "name": "TOMCATAPP",
                      "status": "0",
                      "dtadded": "Aug 6, 2015 01:25:48",
                      "created_by_id": "27",
                      "created_by_email": "minshengjie@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "1",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": null,
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Terminated"
                    },
                    {
                      "clientid": "4",
                      "id": "152",
                      "name": "pengzhi",
                      "status": "0",
                      "dtadded": "Aug 4, 2015 08:31:45",
                      "created_by_id": "26",
                      "created_by_email": "wanghai@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "1",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "",
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Terminated"
                    },
                    {
                      "clientid": "4",
                      "id": "151",
                      "name": "formytest1",
                      "status": "1",
                      "dtadded": "Aug 4, 2015 08:30:40",
                      "created_by_id": "26",
                      "created_by_email": "wanghai@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "1",
                      "lock_comment": "Farm was locked by zhangwenjun@chinacloud.com.cn with comment: 'ddddd'.",
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    },
                    {
                      "clientid": "4",
                      "id": "150",
                      "name": "formytest",
                      "status": "1",
                      "dtadded": "Aug 4, 2015 08:29:38",
                      "created_by_id": "20",
                      "created_by_email": "wangxuekai@chinacloud.com.cn",
                      "running_servers": "0",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "0",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "1",
                      "lock_comment": "Farm was locked by minshengjie@chinacloud.com.cn with comment: 'te'.",
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    },
                    {
                      "clientid": "4",
                      "id": "141",
                      "name": "hw_app_noauto",
                      "status": "1",
                      "dtadded": "Aug 4, 2015 06:15:23",
                      "created_by_id": "30",
                      "created_by_email": "huangwei@chinacloud.com.cn",
                      "running_servers": "1",
                      "suspended_servers": "0",
                      "non_running_servers": "0",
                      "roles": "1",
                      "zones": "0",
                      "alerts": "0",
                      "lock": "1",
                      "lock_comment": "Farm was locked by mohaofei@chinacloud.com.cn with comment: 'test'.",
                      "havemysqlrole": false,
                      "havemysql2role": false,
                      "havepgrole": false,
                      "haveredisrole": false,
                      "haverabbitmqrole": false,
                      "havemongodbrole": false,
                      "haveperconarole": false,
                      "havemariadbrole": false,
                      "status_txt": "Running",
                      "shortcuts": []
                    }
                  ]
                };
                $scope.hiddenCol=[3,4,5];
                $scope.open = function (size) {
                  $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    size: size,
                    controller:['$scope','$modalInstance',function($scope,$modalInstance){
                      console.log('--------console.log($modalInstance)-----------------');
                        console.log($modalInstance);
                      $scope.ok=function(){
                        $modalInstance.close();
                      }
                    }]
                  });
                }
                $scope.checkMe=function(v){
                  console.log(v);
                  if(v==''){
                    return {
                      msg:'OK',
                      valid:true
                    }
                  }
                  if(v.length>10){
                    return {
                      msg:'OK',
                      valid:true
                    }
                  }else{
                    return {
                      msg:'这是通过自定义方法进行验证',
                      valid:false
                    }
                  }

                }
              }]
            }
          }
        })
        .state('components.utils', {
          url: '/utils',
          views: {
            'content@': {
              templateUrl: 'app/views/components/utils.html',
              controller: ['$scope', function($scope) {
                $scope.form = {
                  email: '',
                  password: '',
                  name: ''
                };
                $scope.password = '';

                $scope.validateName = function(name) {
                  return name !== 'test';
                };
              }],
              controllerAs: 'utils'
            }
          }
        })
        .state('components.stepDemo', {
          url: '/stepDemo',
          views: {
            'content@': {
              templateUrl: 'app/views/components/step_demo.html',
              controller: ['$scope', function($scope) {
                $scope.stepsOptions={
                  //ystep的外观大小
                  //可选值：small,large
                  size: "large",
                  //ystep配色方案
                  //可选值：green,blue
                  color: "green",
                  stepWidth:200,
                  //ystep中包含的步骤
                  steps: [{
                    //步骤名称
                    title: "发起",
                    //步骤内容(鼠标移动到本步骤节点时，会提示该内容)
                    content: "实名用户/公益组织发起项目"
                  },{
                    title: "审核",
                    content: "乐捐平台工作人员审核项目"
                  },{
                    title: "完成",
                    content: "乐捐平台项目审核完成"
                  }
                  ]
                };
                $scope.stepsOptions2={
                  //ystep的外观大小
                  //可选值：small,large
                  size: "small",
                  //ystep配色方案
                  //可选值：green,blue
                  color: "green",
                  //ystep中包含的步骤
                  steps: [{
                    //步骤名称
                    title: "发起",
                    //步骤内容(鼠标移动到本步骤节点时，会提示该内容)
                    content: "实名用户/公益组织发起项目"
                  },{
                    title: "审核",
                    content: "乐捐平台工作人员审核项目"
                  },{
                    title: "完成",
                    content: "乐捐平台项目审核完成"
                  }
                  ]
                };
              }],
              controllerAs: 'utils'
            }
          }
        })
        .state('components.ccTagHref', {
          url: '/ccTagHref',
          views: {
            'content@': {
              templateUrl: 'app/views/components/ccTagHref.html',
              controller: ['$scope', function($scope) {

              }],
              controllerAs: 'utils'
            }
          }
        })
      ;
    }
  ])
;
