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
  .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.skinClass='skin-gold';
  }])
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

  .config(["NotificationProvider", function(NotificationProvider) {
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
  }])
  .config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.timeout = 5000;
  }])
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

'use strict';

angular.module('trinity')
  .directive('collapseNav', ['$state',
    function($state){
      return {
        restrict: 'A',
        link: function (scope, ele) {
          ele.on('click', function(event){
            var $this, $subMenu, $parent, $lists, menustatus;
            $this = $(this);
            $parent = $this.parent('li');
            $lists = $parent.parent('ul').children('li');
            $subMenu = $this.parent('li').children('.sub-menu');
            var stateTo=ele.attr('state-go');

            if($subMenu.find('li').length===0){
              $lists.children('.sub-menu').hide();
              $lists.removeClass('submenuOpen');
              if(typeof(stateTo)==="undefined"){
                return event.preventDefault();
              }
              if(stateTo!=''){
                $state.go(stateTo);
              }
              return event.preventDefault();
            }
            if($parent.hasClass('submenuOpen')){
              $lists.children('.sub-menu').hide();
              $lists.removeClass('submenuOpen');
              $parent.removeClass('submenuOpen');
              $subMenu.fadeOut(100);
              menustatus=0;
              if(navstatus===1){
                $('#navDiv').css('width','60px');
              }
            }else{
              $lists.children('.sub-menu').hide();
              $lists.removeClass('submenuOpen');
              $parent.addClass('submenuOpen');
              $subMenu.fadeIn(100);
              menustatus=1;
              if(navstatus===1){
                $('#navDiv').css('width','200px');
              }
            }
// $parent.addClass('open');
//$subMenu.fadeToggle();
            return event.preventDefault();
          });
        }
      };
    }
  ])
  .directive('slideWin', [
    function(){//定义右侧滑出窗口元素
      return {
        restrict: 'C',
        link: function (scope, element,attrs) {

        }
      };
    }
  ])
  .directive('slideWinIn', [
    function(){//定义右侧滑入窗口指令
      return {
        restrict: 'A',
        link: function (scope, element,attrs) {
          element.on('click', function(event){
           var $slideWin= element.parents('body').find(attrs.href);
           var $oldSlideWin= element.parents('body').find('.slideWin.slideIn');
            $oldSlideWin.removeClass('slideIn');
            $oldSlideWin.addClass('slideOut');
            $slideWin.removeClass('slideOut');
            $slideWin.addClass('slideIn');
            return event.preventDefault();
          });
        }
      };
    }
  ])
  .directive('slideWinOut', [
    function(){//定义右侧滑出窗口指令
      return {
        restrict: 'A',
        link: function (scope, element,attrs) {
          element.on('click', function(event){
            var $slideWin;
            if(attrs.href===undefined){
              $slideWin= element.parents('.slideWin');
            }else{
              $slideWin= element.parents('body').find(attrs.href);
            }

            $slideWin.removeClass('slideIn');
            $slideWin.addClass('slideOut');
            return event.preventDefault();
          });
        }
      };
    }
  ])
  .directive('tableCollapsibleRow', [
    function(){
      /*
      在表格行中增加一个单元格，使用table-collapsible-row属性，单元格中的内容将隐藏，并在该行前出现一个按钮，点击按钮后在下一行显示隐藏内容
      * <td table-collapsible-row>
         <p>{{d.clientid}}</p>
         <p>{{d.name}}</p>
         <p>{{d.dtadded}}</p>
         <p>{{d.created_by_email}}</p>
         <p>{{d.roles}}</p>
         <p>{{d.status_txt}}</p>
         </td>
      */
      return{
        restrict:'AEC',
        controller:["$scope", "$element", function($scope, $element) {
          var tdCount=$element.parents('tr').find('td').length-1;
          $element.parents('tr').find('td:eq(0)').prepend('<span class="m-r-10 pull-left"><button class="collapsible-button btn btn-xs btn-primary" style="width: 20px;">+</button></span> ');
          $element.hide();
          $element.parents('tr').find('.collapsible-button').click(function(ele){
            if($element.parents('tr').find('.collapsible-button').html()=='+'){
              $element.parents('tr').find('.collapsible-button').html('-');
              $element.parents('tr').after('<tr class="collapsible-tr"><td  colspan="'+tdCount+'"><div class="padding-10">'+$element.html()+'</div></td></tr>');
            }else{
              $element.parents('tr').find('.collapsible-button').html('+');
              $element.parents('tr').next().remove();
            }
          });
        }]
      }
    }
  ])
  .directive('trinityTable', ['$interval',
    function($interval){
      /*
      * Trinity 宽度自适应表格
      * 特点：
      *   单元格宽度随表格区域变化
      *   单元格内容自动省略显示
      *   所有自适应宽度的单元格内容自动添加Tooltip
      * 用法：
      *   在表格上应用样式trinity-table
      *   在th标签上可设置width属性用于固定列宽，未设置固定列宽的列将根据表格列数自动调整宽度。
      *   在th标签上设置hidetooltip=true，可取消该列中单元格上的tooltip
       *   在th标签上设置overflow='show'，可取消该列中单元格上的tooltip
      * */
      return {
        restrict: 'AEC',
        scope:{
          hideCols:'@hideCols'
        },
        controller:["$scope", "$element", function($scope, $element){
          $scope.$watch('hideCols',function(n,o){
            var hCols=angular.fromJson(n);
            if(typeof(hCols)==='undefined'){
              return;
            }
            if(hCols.length==0 ){
              return;
            }
            for(var i in hCols){
              $element.find('.cols-show-hide').find('input:checkbox:eq('+hCols[i]+')').removeAttr('checked');
            }
            $scope.hiddenCol($element,hCols);
          });
          var colC_tmp;
          $scope.colChange=function(){
            var arrSting=[];
            var cString='';
            $element.find('.cols-show-hide').find('input:checkbox:not(:checked)').each(function(i,e){
              arrSting.push($(e).val());
              cString=cString+$(e).val()+';';
            });
            if(colC_tmp===cString){
              //return;
            }
            colC_tmp=cString;
            $scope.hideCols=arrSting;
          };
          if(typeof(tempInterval)==='undefined'){
            var tempInterval=$interval(function(){

              $scope.colChange();
            },1000);
          }
          $scope.hiddenCol=function(table,arr){
            table.find('tr').each(function(r,tr){
              $(tr).find('th').css('display','table-cell');
              $(tr).find('td').css('display','table-cell');
              for(var c in arr){
                $(tr).find('th:eq('+arr[c]+')').css('display','none');
                $(tr).find('td:eq('+arr[c]+')').css('display','none');
              }
            });
          };

        }],
        link:function(scope, el, attr){

        },
        compile: function(element, attrs){
          element.find('tr th').wrapInner('<div class="tableCellWrap"></div>');
          element.find('tr td').wrapInner('<div class="tableCellWrap"></div>');
          var tbWidth_old;
          var tempCol_old;
          if(typeof(tempInterval)==='undefined'){
            var tempInterval=$interval(function(){
              autoWidth(element);

            },1000);
          }
          var colSel='';
          autoWidth(element);
          //自定义显示列

          element.find('tr th:last').css('position','relative');
          element.find('tr th:last').append('<div style="right: 5px; top: 5px; position: absolute;z-index: 950" class="btn-group TTbSeting" dropdown>'+
            '<span class="fa fa-wrench" dropdown-toggle ng-click=""></span>' +
            '<ul class="pull-left cols-show-hide list-unstyled" style="background: #fff;">' +
            '<li ><h6>选择要显示的列：</h6></li>'+
            colSel +
            '</ul>' +
            '</div>');
          function getSel(){
            var arrSting='';
            element.find('.cols-show-hide').find('input:checkbox:not(:checked)').each(function(i,e){
              arrSting=arrSting+$(e).val()+';';
            });
            return arrSting;
          }
          function getColLen(){
            var c=0;
            element.find('th').each(function(i,e){
              if($(e).css('display')!='none'){
                c++
              }
            });
            return c;
          }
          function autoWidth(table){
            var tbWidth=table.parent().width();
            if(tbWidth_old===tbWidth && tempCol_old===getColLen()){
              return;
            }
            var col=table.find('tr:eq(0) th:not([width])').length;
            table.find('tr:eq(0) th:not([width])').each(function(i,e){
              if($(e).css('display')==='none'){
                col=col-1;
              }
              if(col===0){
                col=1;
              }
            });
            var colFw=0;
            element.find('tr:eq(0) th[width]').each(function(i,e){
              colFw=Number($(e).attr('width'))+colFw;
            });
            var average=100/col;

            var colW=[];

            table.find('th').each(function(i,th) {
              if(typeof($(th).attr('width'))==='undefined') {
                colW.push(average*(tbWidth-colFw)/100-16+'px');
              }else{
                colW.push($(th).attr('width')-16+'px');
              }
              if(i===0){
                colSel+='<li><input type="checkbox" value="'+i+'" checked="checked" disabled />'+$(th).find('.tableCellWrap').html()+'</li>';
              }else if(i===table.find('th').length-1){
                colSel+='<li><input type="checkbox" value="'+i+'" checked="checked" disabled/>'+$(th).find('.tableCellWrap').html()+'</li>';
              }else{
                colSel+='<li><input type="checkbox" value="'+i+'" checked="checked" />'+$(th).find('.tableCellWrap').html()+'</li>';
              }

            });
            table.find('tr').each(function(r,tr){
              $(tr).find('.tableCellWrap').each(function(i,e){
                $(e).width(colW[i]);
                if(!table.find('tr th:eq('+i+')').attr('hidetooltip')){
                  $(e).attr('tooltip',$(e).text());
                }
                if(table.find('tr th:eq('+i+')').attr('overflow')=='visible'){
                  $(e).css('overflow','visible');
                }
              });
            });
            tbWidth_old=element.parent().width();
            tempCol_old=getColLen();
          }
        }
      };
    }
  ])
  .directive('appsChart', function(){
      return{
        restrict:'AEC',
        template:'<highchart config="appsChartConfig"></highchart>',
        scope:{
          data:'=data'
        },
        controller: ["$scope", function($scope){
          //appsChartConfig
          $scope.appsChartConfig = {
            'options': {
              'chart': {
                'type': 'bar'
              },
              'plotOptions': {
                'series': {
                  'stacking': 'normal'
                }
              }
            },
            'series': [
              {
                'name': '运行中',
                'id': 'series-0',
                'dashStyle': 'Solid',
                'connectNulls': true,
                'color': '#aac657'
              }
            ],
            'title': {
              'text': ' '
            },
            'credits': {
              'enabled': false
            },
            'loading': false,
            'size': {
              'height': '200'
            }
          };

        }],
        link: function postLink(scope){
          scope.$watch('data', function(data){
            if(data){
              scope.appsChartConfig.series[0].data = data;
            }
          });
        }
      };
    })
  .directive('wbuiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window),
          _mb = 768,
          wrap = $('.app-aside'),
          next,
          backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
            , top
            , w_h = $(window).height()
            , offset = 50
            , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
            next = _this.next();
          }else{
            return;
          }

          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);;


/* ========================================================================
 * Bootstrap: tooltip.js v3.0.3
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 - 20  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

(function($){
  $.fn.extend({
    //初始化
    loadStep: function(params){
      
      //基础框架
      var baseHtml =  "<div class='ystep-container'>"+
                        "<ul class='ystep-container-steps'>"+
                        "</ul>"+
                        "<div class='ystep-progress'>"+
                          "<p class='ystep-progress-bar'>"+
                            "<span class='ystep-progress-highlight' style='width:0%'>"+
                            "</span>"+
                          "</p>"+
                        "</div>"+
                      "</div>";
      //步骤框架
      var stepHtml = "<li class='ystep-step ystep-step-undone' data-container='body' data-toggle='popover' data-placement='top' data-title='' data-content='' data-trigger='hover'>"+
                     "</li>";
      //决策器
      var logic = {
        size: {
          small: function($html){
            var stepCount = $html.find("li").length-1,
            containerWidth = (stepCount*65+100)+"px",
            progressWidth = (stepCount*65)+"px";
            $html.css({
              width: containerWidth
            });
            $html.find(".ystep-progress").css({
              width: progressWidth
            });
            $html.find(".ystep-progress-bar").css({
              width: progressWidth
            });
            $html.addClass("ystep-sm");
          },
          large: function($html){
            var stepCount = $html.find("li").length-1,
            containerWidth = (stepCount*100+100)+"px",
            progressWidth = (stepCount*100)+"px";
            $html.css({
              width: containerWidth
            });
            $html.find(".ystep-progress").css({
              width: progressWidth
            });
            $html.find(".ystep-progress-bar").css({
              width: progressWidth
            });
            $html.addClass("ystep-lg"); 
          }
        },
        color: {
          green: function($html){
            $html.addClass("ystep-green");
          },
          blue: function($html){
            $html.addClass("ystep-blue");
          }
        }
      };
      
      //支持填充多个步骤容器
      $(this).each(function(i,n){
        var $baseHtml = $(baseHtml),
        $stepHtml = $(stepHtml),
        $ystepContainerSteps = $baseHtml.find(".ystep-container-steps"),
        arrayLength = 0,
        $n = $(n),
        i=0;
        
        //步骤
        arrayLength = params.steps.length;
        for(i=0;i<arrayLength;i++){
          var _s = params.steps[i];
          //构造步骤html
          $stepHtml.attr("data-title",_s.title);
          $stepHtml.attr("data-content",_s.content);
          $stepHtml.text(_s.title);
          //将步骤插入到步骤列表中
          $ystepContainerSteps.append($stepHtml);
          //重置步骤
          $stepHtml = $(stepHtml);
        }
        
        //尺寸
        logic.size[params.size||"small"]($baseHtml);
        //配色
        logic.color[params.color||"green"]($baseHtml);
        
        //插入到容器中
        $n.append($baseHtml);
        //渲染提示气泡
        $n.find(".ystep-step").popover({});
        //默认执行第一个步骤
        $n.setStep(1);
      });
    },
    //跳转到指定步骤
    setStep: function(step) {
      $(this).each(function(i,n){
        //获取当前容器下所有的步骤
        var $steps = $(n).find(".ystep-container").find("li");
        var $progress =$(n).find(".ystep-container").find(".ystep-progress-highlight");
        //判断当前步骤是否在范围内
        if(1<=step && step<=$steps.length){
          //更新进度
          var scale = "%";
          scale = Math.round((step-1)*100/($steps.length-1))+scale;
          $progress.animate({
            width: scale
          },{
            speed: 1000,
            done: function() {
              //移动节点
              $steps.each(function(j,m){
                var _$m = $(m);
                var _j = j+1;
                if(_j < step){
                  _$m.attr("class","ystep-step-done");
                }else if(_j === step){
                  _$m.attr("class","ystep-step-active");
                }else if(_j > step){
                  _$m.attr("class","ystep-step-undone");
                }
              });
            }
          });
        }else{
          return false;
        }
      });
    },
    //获取当前步骤
    getStep: function() {
      var result = [];
      
      $(this)._searchStep(function(i,j,n,m){
        result.push(j+1);
      });
      
      if(result.length == 1) {
        return result[0];
      }else{
        return result;
      }
    },
    //下一个步骤
    nextStep: function() {
      $(this)._searchStep(function(i,j,n,m){
        $(n).setStep(j+2);
      });
    },
    //上一个步骤
    prevStep: function() {
      $(this)._searchStep(function(i,j,n,m){
        $(n).setStep(j);
      });
    },
    //通用节点查找
    _searchStep: function (callback) {
      $(this).each(function(i,n){
        var $steps = $(n).find(".ystep-container").find("li");
        $steps.each(function(j,m){
          //判断是否为活动步骤
          if($(m).attr("class") === "ystep-step-active"){
            if(callback){
              callback(i,j,n,m);
            }
            return false;
          }
        });
      });
    }
  });
})(jQuery);
'use strict';

angular.module('trinity')
  .directive('ccValidate', ['$parse','$rootScope',
    function($parse,$rootScope){
      return {
        restrict: 'A',
        link: function (scope, element,attrs) {
          //var protocol = '(?:(?:(https|http|ftp|rtsp|mms):)?//)';
          //var protocol = '(http://)';
          var protocol = '(?:(?:(https|http):)?//)';//允许http和https
          var auth = '(?:\\S+(?::\\S*)?@)?';
          var ip = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
          var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
          var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
          var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))';
          var port = '(?::\\d{2,5})?';
          var path = '(?:[/?#]\\S*)?';
          var regex = [
            protocol, auth, '(?:localhost|' + ip + '|' + host + domain + tld + ')',
            port, path
          ].join('');
          var urlRegexp = new RegExp('(?:^' + regex + '$)', 'i')
          var regStr={
            email:/^(?=\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,50}$/,
            name:/^[a-zA-Z]\w{5,17}$/,
            name_cn:/^[\u4e00-\u9fa5_a-zA-Z0-9_\-]{1,20}$/,
            password:/^([\u0000-\u0019]|[\u0021-\u00FF]){6,18}$/,
            password2:/^([\u0000-\u0019]|[\u0021-\u00FF]){6,18}$/,
            ip:/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
            int:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            name_wh:/^[\s\S]{1,20}$/,
            name_fp:/^[\s\S]{1,50}$/,
            description_wh:/^[\s\S]{1,1024}$/,
            category_name:/^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,25}$/,
            url_wh:/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
            url_m:urlRegexp,
            int_cartNum:/^(\d|[1-9]\d|100)$/gm,
            name_customEventName:/^[\s\S]{1,50}$/,
            null:/^[.\n]+$/
          };
          var errMsg={
            email:'Email格式不正确,不能超过50个字符',
            name:'以字母开头，允许字母数字和下划线，长度在6-18之间',
            name_cn:'允许中文、字母、数字、中划线和下划线，长度在1-20之间',
            password:'长度应该在6-18之间,不允许使用中文和空格',
            password2:'两次输入的密码不一致',
            ip:'请输入正确的IP地址',
            int:'请输入0~65535之间的整数',
            name_wh:'请输入1-20个字符',
            name_fp:'请输入1-50个字符',
            description_wh:'输入最长1024',
            category_name:'类别名称长度为2-25个字符',
            url_wh:'地址格式不正确',
            url_m:'请输入正确的url地址',
            int_cartNum:'请输入0~100之间的整数',
            name_customEventName:'名称长度最大50',
            null:'必填'
          };
          var type=attrs.ccValidate;
          var model=attrs.ccValidateModel;
          var costomizeFun=attrs.ccValidateFun;
          var validMode=attrs.ccValidateResult;
          var setValidModel;
          var getModel=$parse(model);
          var setModel=$parse(model).assign;
          var linkModel=attrs.ccValidateLinkModel;
          var getLinkModel=$parse(linkModel);
          var value;
          var regObj;
          var errmsg;
          var checked=false;
          var ngModeX=attrs.ngModel;
          if(ngModeX){
            //FixBug:组件上使用ng-model绑定了父级对象，组件被重新加载后ng-model的值未变,但组件没有值
            var getNgModel=$parse(ngModeX);
            setModel(scope,getNgModel(scope,ngModeX));
          }
          if(validMode){
            console.log('$rootScope.'+validMode+'.'+model+'Valid');
            setValidModel=$parse(validMode+'.'+model+'Valid').assign;
          }else{
            setValidModel=$parse('ccValid.'+model+'Valid').assign;
          }
          function returnValid(obj){
            if(validMode){
              setValidModel($rootScope,obj);
            }else{
              setValidModel(scope,obj);
            }
          }
          function showMsg(msg){
            console.log(msg,element.parent().find('.ccValidateMsg'));
            if(element.parent().find('.ccValidateMsg').length==0){
              element.addClass('ccValidateErr');
              element.parent().append('<div class="ccValidateMsg text-danger"><span class="fa fa-info-circle"></span> '+msg+'</div>');
            }else{
              element.parent().find('.ccValidateMsg').html('<span class="fa fa-info-circle"></span> '+msg);
            }
            if(!scope.$$phase){
              scope.$apply();
            }
          }
          function hideMsg(){
            if(element.parent().find('.ccValidateMsg').length>0){
              element.removeClass('ccValidateErr');
              element.parent().find('.ccValidateMsg').remove();
            }
            if(!scope.$$phase){
              scope.$apply();
            }
          }
          function checkValue(value){
            if(!value){
              setModel(scope,'');
              returnValid({
                valid:false,
                msg:errmsg,
                validErr:false
              });
              hideMsg();

              return;
            }
            if(regObj.test(value)){  //通过正则验证

              if(type=='password2' ){//重复密码验证
                if(regStr['password'].test(getLinkModel(scope,linkModel))){//密码1通过验证
                  // console.log(scope[linkModel]);
                  if(value==getLinkModel(scope,linkModel)){//密码1和密码2相同
                    setModel(scope,value);
                    returnValid({
                      valid:true,
                      msg:'格式正确',
                      validErr:false
                    });
                    hideMsg();
                  }else{//密码1和密码2不同
                    setModel(scope,'');
                    returnValid({
                      valid:false,
                      msg:errmsg,
                      validErr:true
                    });
                    showMsg(errmsg);
                    //console.log('格式正确，但两次密码不一样');
                  }
                }else{
                  setModel(scope,'');
                 // console.log('格式正确，第1个密码未通过验证');
                  returnValid({
                    valid:false,
                    msg:errmsg,
                    validErr:true
                  });
                  showMsg(errmsg);
                }

              }else{
                setModel(scope,value);
                returnValid({
                  valid:true,
                  msg:'格式正确',
                  validErr:false
                });
                hideMsg();
              }

            }else{//未通过验证
              //setModel(scope,'');
              if(type=='password2'){//重复密码验证
                if(value==getLinkModel(scope,linkModel)){
                  if(getLinkModel(scope,linkModel)==''){
                    setModel(scope,'');
                    returnValid({
                      valid: false,
                      msg: errMsg.password,
                      validErr: true
                    });
                    showMsg(errMsg.password);
                  //  console.log('格式错误',errMsg.password);
                  }else{
                    setModel(scope,value);
                    returnValid({
                      valid:true,
                      msg:'格式正确',
                      validErr:false
                    });
                    hideMsg();
                  //  console.log('格式错误，但两次密码一样',errMsg.password);
                  }
                }else{
                  setModel(scope,'');
                  returnValid({
                    valid: false,
                    msg: errMsg.password,
                    validErr: true
                  });
                  showMsg(errMsg.password);
                 // console.log('格式错误，且两次密码不一样',errMsg.password);
                }
              }else{
                setModel(scope,'');
                returnValid({
                  valid:false,
                  msg:errmsg,
                  validErr:true
                });
                showMsg(errmsg);
               // console.log('非密码验证',errMsg.password);
              }


            }
            //console.log(scope);
          }
          if(attrs.ccValidateErrmsg){
            errmsg=attrs.ccValidateErrmsg;
          }else{
            errmsg=errMsg[type];
          }
          if(attrs.ccValidateReg){
            regObj=new RegExp(attrs.ccValidateReg);
          }else{
            regObj=regStr[type];
          }
          element.parent().addClass('ccValidate');
          if(model){
            scope.$watch(model,function(n,o){
              if(!checked){
                if(n){
                  element[0].value=n;
                }else{
                  element[0].value='';
                }
              }
              checked=false;
              //console.log(model,checked);
            });
          }
          var initValue=element[0].value;
          console.log('initValue',initValue);
          var itv=setInterval(function(){//定时器侦听element值的变化，解决异步更新表单值未触发blur keyup change事件的问题。
            if(element[0].value!==initValue){
              initValue=element[0].value;
              element.change();
            }
          },100);
          element.on('blur keyup change', function(event){
            value=event.target.value;
            //console.log(getModel(scope,model));
            //if(value==getModel(scope,model) && value!=''){
            //  return event.preventDefault();
            //}
            checked=true;

            var evalRes;
            setModel(scope,value);
            if(costomizeFun){
              evalRes=scope.$eval(costomizeFun+'(\''+value+'\')');
              if(evalRes.valid){

                returnValid({
                  valid:true,
                  msg:'格式正确',
                  validErr:false
                });
                hideMsg();
              }else{
                setModel(scope,'');
                returnValid({
                  valid:false,
                  msg:evalRes.msg,
                  validErr:true
                });
                showMsg(evalRes.msg);
              }
              return event.preventDefault();
            }
            checkValue(value);
            return event.preventDefault();
          });

          if(linkModel){
            scope.$watch(linkModel,function(n,o){
              if(n!=undefined){
                checkValue(element.context.value);
              }
            });
          }

        }
      };

    }
  ]);

'use strict';
//ccTagHref:点击链接后页面滚动至Tag位置
/*暂命名为锚链接组件
 用法：
 * 链接或按钮上添加属性：cc-tag-href=tagName
 * tagName:要滚动到的对象ID（不带#）
 * 例如：<a cc-tag-href="ccTag1">概述</a> </li>
 * 链接点击后将滚动到ID名为ccTag1的元素位置
 * 附加属性：cc-tag-offset-y   用于滚动位置的位移量，主要是排除页面顶部padding值的影响
 * */
angular.module('trinity')
  .directive('ccTagHref',[function(){
    return {
      restrict: 'A',
      link:function(scope, ele,attrs){
        ele.click(function(){
          var tagName=attrs.ccTagHref;
          var offsetY=Number(attrs.ccTagOffsetY);
          var tagEle=document.getElementById(tagName);
          document.body.scrollTop=tagEle.offsetTop+offsetY;
        });
      }
    }
  }]);
'use strict';
angular.module('trinity')
  .directive('ccStepsOptions', ['$parse',
    function($parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var ccStepsOptions=attrs.ccStepsOptions;
          var ccDefaultStep=attrs.ccStepsDefaultStep;
          var getOption=$parse(ccStepsOptions);
          var optionJson=getOption(scope,ccStepsOptions);
          if(!optionJson){
            optionJson=angular.fromJson(ccStepsOptions);
          }
          if(typeof(optionJson)!='object'){
            return;
          }
          /*
          var html='';
          for(var i in optionJson.steps){
            html+='<div>'+optionJson.steps[i].label+'</div>';
          }
          */
          //----------------//
          element.loadStep(optionJson);
          console.log(optionJson.stepWidth);
          console.log( element.find('.ystep-container-steps').css('width'));

          if(optionJson.stepWidth){
            element.find('.ystep-container-steps li').css('width','100px');
            element.find('.ystep-container-steps li').css('margin-right',optionJson.stepWidth-100+'px');
            element.find('.ystep-container-steps').css('width',optionJson.stepWidth*optionJson.steps.length+'px');
            element.find('.ystep-container').css('width',optionJson.stepWidth*(optionJson.steps.length-1)+'px');
            element.find('.ystep-progress').css('width',optionJson.stepWidth*(optionJson.steps.length-1)+'px');
            element.find('.ystep-progress-bar').css('width',optionJson.stepWidth*(optionJson.steps.length-1)+'px');

          }
          if(ccDefaultStep){
            element.setStep(ccDefaultStep);
          }




        }
      }
    }])

'use strict';
//lichenge @ 2016-01-20
//底部通栏消息提示组件：ccNotify
angular.module('ccNotify', [
  'ngAnimate'
])

  .service('ccNotify',['$rootScope',function($rootScope){
    function showNotifyDiv(txt,type){
      var ccNotifyDiv=angular.element('#ccNotifyDiv');
      if(ccNotifyDiv.length==0){
        angular.element('body').append('<div id="ccNotifyDiv"><div class="txt pull-left"></div><span class="pull-right"><a class="fa fa-times icobtn closebtn"></a></span></div>');
        ccNotifyDiv=angular.element('#ccNotifyDiv');
      }
      ccNotifyDiv.removeClass('hide_o');
      ccNotifyDiv.addClass('show_o');
      ccNotifyDiv.find('.txt').html('<span class="fa fa-exclamation-circle"></span> '+txt);
      ccNotifyDiv.find('.closebtn').click(function(){
        ccNotifyDiv.removeClass('show_o');
        ccNotifyDiv.addClass('hide_o');
      });
      ccNotifyDiv.removeClass('cc_success');
      ccNotifyDiv.removeClass('cc_info');
      ccNotifyDiv.removeClass('cc_error');
      ccNotifyDiv.removeClass('cc_notice');
      ccNotifyDiv.removeClass('cc_notify');
      ccNotifyDiv.addClass(type);
    }

    this.success=function(txt){
      console.log('提示信息：',txt);
      showNotifyDiv(txt,'cc_success');
    };
    this.info=function(txt){
      showNotifyDiv(txt,'cc_info');
    };
    this.error=function(txt){
      showNotifyDiv(txt,'cc_error');
    };
    this.notice=function(txt){
      showNotifyDiv(txt,'cc_notice');
    };
    this.notify=function(txt){
      showNotifyDiv(txt,'cc_notify');
    };
    console.log('ccNotify_run',angular.element().find('body'));
  }])


'use strict';

angular.module('trinity')
  .service('ccLoading', ['$parse',
    function($parse) {
      function getEle(eleStr){
        var ele;
        ele=angular.element('button'+eleStr);
        ele.isButton=true;
        if(ele.length==0){
          ele=angular.element(eleStr);
          ele.isButton=false;
        }
        return ele;
      }
      this.showLoadingBox=function(eleStr,type,msg){
        var ele=getEle(eleStr);
        var icon='<em class="fa fa-spinner fa-spin"></em>';
        if(type==1){
          icon='<em class="fa fa-warning text-warning"></em>';
          if(!msg){
            msg='网络或服务器故障，数据加载失败，请稍后再试。'
          }
        }
        if(!msg){
          msg='加载中...'
        }

        if(ele.find('.LoadingBox').length==0){
          ele.addClass('ccLoadingBox');
          ele.prepend('<div class="LoadingBox"><div class="LoadingIcon">'+icon+'</div><div class="LodingMsg">'+msg+'</div></div>');
        }else{
          ele.find('.LoadingBox').removeClass('hide');
          ele.find('.LoadingIcon').html(icon);
          ele.find('.LodingMsg').html(msg);
        }
      };
      this.hideLoadingBox=function(eleStr,msg){
        var ele=getEle(eleStr);
        if(ele.find('.LoadingBox').length==0){

        }else{
          ele.find('.LoadingBox').addClass('hide');
        }
      };
      this.showLoading=function(eleStr,msg){
        var ele=getEle(eleStr);
        var innerHtml_o;
        if(ele.find('.disabledCon').length>0){
          ele.attr('disabled','disabled');
          if(msg){
            ele.find('.LoadingCon').html('<em class="fa fa-spinner fa-spin"></em> '+msg);
          }
          ele.find('.disabledCon').addClass('hide');
          ele.find('.LoadingCon').removeClass('hide');
        }else{
          innerHtml_o=ele.html();
          ele.html('');
          if(!msg){
            msg=innerHtml_o;
          }
          ele.addClass('ccLoading_btn');
          ele.attr('disabled','disabled');
          ele.prepend('<span class="disabledCon">'+innerHtml_o+'</span>');
          ele.prepend('<span class="LoadingCon"><em class="fa fa-spinner fa-spin"></em> '+msg+'</span>');
          ele.find('.disabledCon').addClass('hide');
        }
      };
      this.hideLoading=function(eleStr){
        var ele=getEle(eleStr);
        ele.removeAttr('disabled');
        if(ele.find('.disabledCon').length>0){
          ele.find('.disabledCon').removeClass('hide');
          ele.find('.LoadingCon').addClass('hide');
        }
      };
    }])
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

'use strict';

angular.module('trinity')
  .controller('widgetCtrl', ["$scope", "$interval", function ($scope, $interval) {

    //responsiveTimeChartConfig
    $scope.responsiveTimeData=[{
      'x':(new Date()).getTime(),
      'y': Math.random()
    }];
    $scope.responsiveTimeChartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'

        }
      },
      title: {
        text: ' '
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: ' '
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        marker: {
          enabled: false
        },
        name: 'Apps',
        'color': '#e4523b',
        data:(function() {
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i++) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        })()
      }],

      loading: false,
      'size': {
        'height': '200'
      }
    };


    //webChartConfig
    $scope.webChartConfig = {
      'options': {
      'chart': {
        'type': 'spline',
        zoomType: 'x'
      },
      'plotOptions': {
        'series': {
          'stacking': 'normal'
        }
      }
    },
      'series': [
      {
        marker: {
          enabled: false
        },
        'name': 'apps.html',
        'data': [1,2,4,7,3],
        'id': 'series-0',
        'dashStyle': 'Solid',
        'connectNulls': true,
        'color': '#aac657'
      },
      {
        marker: {
          enabled: false
        },
        'name': 'servces.html',
        'data': [3,1,null, 5,2],
        'connectNulls': true,
        'id': 'series-1',
        'color': '#48c0f4'
      }
    ],
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      'title': {
      'text': ' '
    },
      'credits': {
      'enabled': false
    },
      'loading': false,
      'size': {
        'height': '200'
      }
    };

    //webChartConfig
    $scope.errorChartConfig = {
      'options': {
        'chart': {
          'type': 'area'
        },
        'plotOptions': {
          'series': {
            'stacking': 'normal'
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      'series': [
        {
          marker: {
            enabled: false
          },
          'name': 'appOne',
          'data': [1,2,4,7,3],
          'id': 'series-0',
          'dashStyle': 'Solid',
          'connectNulls': true,
          'color': '#aac657'
        },
        {
          marker: {
            enabled: false
          },
          'name': 'appTwo',
          'data': [3,1,null,5,2
          ],
          'connectNulls': true,
          'id': 'series-1',
          'color': '#48c0f4'
        }
      ],
      'title': {
        'text': ' '
      },
      'credits': {
        'enabled': false
      },
      'loading': false,
      'size': {
        'height': '200'
      }
    };


    //appsChartConfig
    $scope.appsChartConfig = {
      'options': {
        'chart': {
          'type': 'bar'
        },
        'plotOptions': {
          'series': {
            'stacking': 'normal'
          }
        }
      },
      'series': [
        {
          'name': '运行中',
          'data': [4,14,11,15,6,16,8,6,13,1
          ],
          'id': 'series-0',
          'dashStyle': 'Solid',
          'connectNulls': true,
          'color': '#aac657'
        },
        {
          'name': '未使用',
          'data': [3,1,4,5, 2,3,1,4, 5, 2],
          'connectNulls': true,
          'id': 'series-1'
        },
        {
          'data': [1,2,1,3, 3,1,2, 1,1,3],
          'id': 'series-4',
          'color': '#e4523b',
          'name': '出错的'
        }
      ],
      'title': {
        'text': ' '
      },
      'credits': {
        'enabled': false
      },
      'loading': false,
      'size': {
        'height': '200'
      }
    };


    var promise = $interval(function(){
      $('#chart2').highcharts().series[0].addPoint([new Date().getTime(), Math.random()],true,true);
    },2000);

    $scope.$on('$destroy', function(){
      $interval.cancel(promise);
    });

  }])
  .factory('RandomKVMDataModel', ["WidgetDataModel", "$interval", function (WidgetDataModel, $interval) {
    function RandomKVMDataModel() {
    }

    RandomKVMDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RandomKVMDataModel.prototype.init = function () {
      var kvm = {};

      this.intervalPromise = $interval(function () {
        kvm.totalNum = Math.floor(Math.random() * 100000);
        kvm.cpuUsage = Math.floor(Math.random() * 100);
        kvm.memoryUsage = Math.floor(Math.random() * 100);
        kvm.diskUsage = Math.floor(Math.random() * 100);
        this.updateScope(kvm);
      }.bind(this), 500);
    };

    RandomKVMDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomKVMDataModel;
  }])
  .controller('dashboardCtrl', ["$scope", "$interval", "chartDataModel", function($scope, $interval, chartDataModel){

    $scope.kvm = {
      name:'KVM', totalNum:'4654',
      cpuName:'CPU', cpuTotal:'6787', cpuUsage:'56',
      memoryName:'Memory', memoryTotal:'1254', memoryUsage:'45',
      diskName:'Disk', diskTotal:'987', diskUsage:'23'
    };
    $scope.vmware = {
      name:'Vmware', totalNum:'13898',
      cpuName:'CPU', cpuTotal:'456', cpuUsage:'56',
      memoryName:'Memory', memoryTotal:'234', memoryUsage:'67',
      diskName:'Disk', diskTotal:'484', diskUsage:'23'
    };
    $scope.host = {
      name:'Host', totalNum:'764544',
      cpuName:'CPU', cpuTotal:'131', cpuUsage:'56',
      memoryName:'Memory', memoryTotal:'1564', memoryUsage:'86',
      diskName:'Disk', diskTotal:'267', diskUsage:'76'
    };

    var promise = $interval(function(){
      $scope.kvm.totalNum = Math.floor(Math.random() * 100000);
      $scope.kvm.cpuUsage = Math.floor(Math.random() * 100);
      $scope.kvm.memoryUsage = Math.floor(Math.random() * 100);
      $scope.kvm.diskUsage = Math.floor(Math.random() * 100);

      $scope.vmware.totalNum = Math.floor(Math.random() * 100000);
      $scope.vmware.cpuUsage = Math.floor(Math.random() * 100);
      $scope.vmware.memoryUsage = Math.floor(Math.random() * 100);
      $scope.vmware.diskUsage = Math.floor(Math.random() * 100);

      $scope.host.totalNum = Math.floor(Math.random() * 100000);
      $scope.host.cpuUsage = Math.floor(Math.random() * 100);
      $scope.host.memoryUsage = Math.floor(Math.random() * 100);
      $scope.host.diskUsage = Math.floor(Math.random() * 100);
    },1000);

    $scope.$on('$destory', function(){
      $interval.cancle(promise);
    });

    var widgetDefinitions = [
      {
        name:'kvm',
        directive:'resource',
        attrs: {
          data: 'kvm'
        },
        style:{
          width:'33%'
        }
      },
      {
        name:'vmware',
        directive:'resource',
        attrs: {
          data: 'vmware'
        },
        style:{
          width:'33%'
        }
      },
      {
        name:'host',
        directive:'resource',
        attrs: {
          data: 'host'
        },
        style:{
          width:'33%'
        }
      },
      {
        name:'eventLog',
        directive:'eventLog',
        title:'事件日志',
        templateUrl:'app/views/widget/eventLog.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'responsiveTime',
        directive:'responsiveTime',
        title:'响应时间',
        templateUrl:'app/views/widget/responsiveTime.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'web',
        directive:'web',
        title:'关键web事务',
        templateUrl:'app/views/widget/web.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'error',
        directive:'error',
        title:'错误',
        templateUrl:'app/views/widget/error.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'apps',
        directive:'apps',
        title:'应用统计数',
        templateUrl:'app/views/widget/apps.html',
        style:{
          width:'99%'
        }
      },
      {
        name:'loginLog',
        directive:'loginLog',
        title:'登录日志',
        templateUrl:'app/views/widget/loginLog.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'operateLog',
        directive:'operateLog',
        title:'最近操作日志',
        templateUrl:'app/views/widget/operateLog.html',
        style:{
          width:'33%'
        }
      },
      {
        name:'testApps',
        directive:'apps-chart',
        dataAttrName:'data',
        dataModelType:chartDataModel,
        style:{
          width:'33%'
        }
      }
    ];

    var defaultWidgets = [
      {name:'kvm'},
      {name:'vmware'},
      {name:'host'},
      {name:'responsiveTime'},
      {name:'web'},
      {name:'error'},
      {name:'apps'},
      {name:'eventLog'},
      {name:'loginLog'},
      {name:'operateLog'},
      {name:'testApps'}

    ];

    $scope.dashboardOptions = {
      widgetButtons:false,
      widgetDefinitions:widgetDefinitions,
      defaultWidgets:defaultWidgets
    };

  }]);

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

'use strict';
angular.module('trinity')
  .filter('friendlyDate', ['$filter', function ($filter) {
    return function ($timestamp, param1) {
      /*
      *
      * param1可以是字符串或一个对象
      * param1为字符串时用于指定日期显示的格式，默认level为5，即3天内的时间均以文字方式描述
      * param1为对像时格式如下：
      * param1：{dateFormat:'yyyy-MM-dd HH:mm',level:3}
      *     dateFormat：日期时间格式
      *     level：转换范围
      *       1、1分钟内
      *       2、1小时内
      *       3、1天内
      *       4、昨天
      *       5、3天内
      *
      * */
      var level=5;
      var dataFromatStr='yyyy-mm-dd HH:MM';
      if(typeof(param1)=='string'){
        level=5;
        dataFromatStr=param1;
      }else if(typeof(param1)=='object'){
        if(typeof(param1.level)=='undefined'){
          level=5;
        }else{
          level=param1.level;
        }
        dataFromatStr=param1.dateFormat;
      }
      //console.log('typeof($timestamp)',typeof($timestamp));
      var timesTap;
      var timestampNumber;
     if(typeof($timestamp)=='number'){
       timesTap=new Date($timestamp);//解决FF及IE日期转换的兼容性问题
     }else if(typeof($timestamp)=='string'){
       try{
         timestampNumber=Number($timestamp);//$timestamp为字符串类型的数字
       }catch(e) {

       }
       if(timestampNumber){
         timesTap=new Date(timestampNumber);
       }else{
         timesTap=new Date($timestamp.replace(/-/g,"/"));//解决FF及IE日期转换的兼容性问题

       }
     }else{
       return;
     }
      var $curTime = new Date();
      var $space = $curTime.getTime() - timesTap.getTime();
      var $string;
      //console.log('timesTap',timesTap);
      //console.log('timesTap.getTime()',timesTap.getTime());
      //console.log('$space',$space);
      function getDayNum(){
        var d=$curTime.getDate()-timesTap.getDate();
        var m=$curTime.getMonth()-timesTap.getMonth();
        var y=$curTime.getYear()-timesTap.getYear();
        var str_temp='';
        if(m==0 && y==0){
          if(d==0){
            return getHoursNum();
          }else if(d==1  && level>=4){
            return '昨天';
          }else if(d<=3  && level>=5){
            return (d-1)+'天前'
          }
        }else{
          if ($space < 24 * 60 * 60 * 1000  && level>=3) {  //24小时以内
            str_temp = Math.floor($space / ( 60 * 60 * 1000 )) + "小时前";
            return str_temp;
          }else if ($space < 48 * 60 * 60 * 1000  && level>=4) {  //48小时以内
            //console.log("昨天",$curTime.getDate()-timesTap.getDate());
            str_temp = "昨天";
            return str_temp;
          }else if ($space < 96 * 60 * 60 * 1000  && level>=5) {  //96小时以内 (1天前-2天前)
            str_temp = Math.floor($space / ( 24*60 * 60 * 1000 ))-1 + "天前";
            return str_temp;
          }
        }
        if(timesTap){
          return $filter('date')(timesTap, dataFromatStr);
        }else{
          return $filter('date')($timestamp, dataFromatStr);
        }
      }
      function getHoursNum(){
        if ($space < 60 * 1000 && level>=1) {
          $string = "刚刚";
          return $string;
        } else if ($space < 60 * 60 * 1000  && level>=2) {  //一小时以内
          $string = Math.floor($space / ( 60 * 1000 )) + "分钟前";
          return $string;
        } else if ($space < 24 * 60 * 60 * 1000  && level>=3) {  //24小时以内
          $string = Math.floor($space / ( 60 * 60 * 1000 )) + "小时前";
          return $string;
        }
      }
      /*
      if ($space < 60 * 1000 && level>=1) {
        $string = "刚刚";
        return $string;
      } else if ($space < 60 * 60 * 1000  && level>=2) {  //一小时以内
        $string = Math.floor($space / ( 60 * 1000 )) + "分钟前";
        return $string;
      } else if ($space < 24 * 60 * 60 * 1000  && level>=3) {  //24小时以内
        $string = Math.floor($space / ( 60 * 60 * 1000 )) + "小时前";
        return $string;
      }else if ($space < 48 * 60 * 60 * 1000  && level>=4) {  //48小时以内
        console.log("昨天",$curTime.getDate()-timesTap.getDate());
        $string = "昨天";
        return $string;
      }else if ($space < 96 * 60 * 60 * 1000  && level>=5) {  //96小时以内 (1天前-2天前)
        $string = Math.floor($space / ( 24*60 * 60 * 1000 ))-1 + "天前";
        return $string;
      }
      return $filter('date')($timestamp, dataFromatStr);
       */
      return getDayNum();
    }
  }]);

'use strict';
angular.module('trinity.config', [])
.constant('LOCALE', "zh_CN")
.constant('DEBUG', false);

'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
        "DATETIME_FORMATS": {
            "TODAY":"\u4eca\u5929",
            "CLEAR":"\u6e05\u7a7a",
            "CLOSE":"\u5173\u95ed",
            "AMPMS": [
                "\u4e0a\u5348",
                "\u4e0b\u5348"
            ],
            "DAY": [
                "\u661f\u671f\u65e5",
                "\u661f\u671f\u4e00",
                "\u661f\u671f\u4e8c",
                "\u661f\u671f\u4e09",
                "\u661f\u671f\u56db",
                "\u661f\u671f\u4e94",
                "\u661f\u671f\u516d"
            ],
            "ERANAMES": [
                "\u516c\u5143\u524d",
                "\u516c\u5143"
            ],
            "ERAS": [
                "\u516c\u5143\u524d",
                "\u516c\u5143"
            ],
            "FIRSTDAYOFWEEK": 6,
            "MONTH": [
                "\u4e00\u6708",
                "\u4e8c\u6708",
                "\u4e09\u6708",
                "\u56db\u6708",
                "\u4e94\u6708",
                "\u516d\u6708",
                "\u4e03\u6708",
                "\u516b\u6708",
                "\u4e5d\u6708",
                "\u5341\u6708",
                "\u5341\u4e00\u6708",
                "\u5341\u4e8c\u6708"
            ],
            "SHORTDAY": [
                "\u5468\u65e5",
                "\u5468\u4e00",
                "\u5468\u4e8c",
                "\u5468\u4e09",
                "\u5468\u56db",
                "\u5468\u4e94",
                "\u5468\u516d"
            ],
            "SHORTMONTH": [
                "1\u6708",
                "2\u6708",
                "3\u6708",
                "4\u6708",
                "5\u6708",
                "6\u6708",
                "7\u6708",
                "8\u6708",
                "9\u6708",
                "10\u6708",
                "11\u6708",
                "12\u6708"
            ],
            "STANDALONEMONTH": [
                "\u4e00\u6708",
                "\u4e8c\u6708",
                "\u4e09\u6708",
                "\u56db\u6708",
                "\u4e94\u6708",
                "\u516d\u6708",
                "\u4e03\u6708",
                "\u516b\u6708",
                "\u4e5d\u6708",
                "\u5341\u6708",
                "\u5341\u4e00\u6708",
                "\u5341\u4e8c\u6708"
            ],
            "WEEKENDRANGE": [
                5,
                6
            ],
            "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
            "longDate": "y\u5e74M\u6708d\u65e5",
            "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
            "mediumDate": "y\u5e74M\u6708d\u65e5",
            "mediumTime": "ah:mm:ss",
            "short": "yy/M/d ah:mm",
            "shortDate": "yy/M/d",
            "shortTime": "ah:mm"
        },
        "NUMBER_FORMATS": {
            "CURRENCY_SYM": "\u00a5",
            "DECIMAL_SEP": ".",
            "GROUP_SEP": ",",
            "PATTERNS": [
                {
                    "gSize": 3,
                    "lgSize": 3,
                    "maxFrac": 3,
                    "minFrac": 0,
                    "minInt": 1,
                    "negPre": "-",
                    "negSuf": "",
                    "posPre": "",
                    "posSuf": ""
                },
                {
                    "gSize": 3,
                    "lgSize": 3,
                    "maxFrac": 2,
                    "minFrac": 2,
                    "minInt": 1,
                    "negPre": "-\u00a4\u00a0",
                    "negSuf": "",
                    "posPre": "\u00a4\u00a0",
                    "posSuf": ""
                }
            ]
        },
        "id": "zh-cn",
        "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
    });
}]);
angular.module("trinity").run(["$templateCache", function($templateCache) {$templateCache.put("app/views/dashboard.html","dashboard");
$templateCache.put("app/views/components/ccTagHref.html","<h3>WIKI-Page</h3><div class=\"wikidoc\"><div class=\"wikidoc-con\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"panel-group\" id=\"accordion\"><div class=\"panel panel-default\"><div class=\"panel-heading\" role=\"tab\" id=\"headingOne\"><h4 class=\"panel-title\" id=\"ccTag1\">概述</h4></div><div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\"><div class=\"panel-body\"><p>华云应用监控提供了服务器、中间件、数据库等基础应用堆栈的监控，并且您还可以通过开发插件的监控您的业务系统，上报您的业务数据，并在该页面配置展示。</p></div></div></div><div class=\"panel panel-default\" id=\"ccTag2\"><div class=\"panel-heading\" role=\"tab\" id=\"headingTwo\"><h4 class=\"panel-title\">插件开发步骤</h4></div><div id=\"collapseTwo\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingTwo\"><div class=\"panel-body\"><p>插件可以用任何语言开发，但需要遵守</p><h4 id=\"ccTag3\">约定</h4><ul><li>进程退出返回0，表示成功，输出为数据；</li><li>进程退出返回1，表示警告，输出为警告消息；</li><li>进程退出返回2，表示错误，输出为错误消息；</li><li>输出格式：<pre>\r\n        [\r\n          {\r\n            \"key\": \"people.lost\", # 监控名称，键，标示符，命名格式：监控对象.监控项\r\n            \"value\": $people_lost, # 值\r\n            \"value_type\": \"integer\", # 值类型，可选项：integer, string, floating, timestamp\r\n          }\r\n        ]\r\n                  </pre></li></ul><p>输出必须是合法的JSON格式</p><p>key格式为：{measurement}.{metric}，例如：people.lost，层级以小数点（.）分隔。 value_type主要目的为方便前端展示和告警阀值设置，可选项：integer，floating，long，string，timestamp</p><p>警告或错误直接输出错误消息，即字符串，但必须指定退出码：1警告，2以上错误</p><a href=\"\" id=\"ccTag4\">参考示例</a><pre>\r\n        #!/bin/bash\r\n        output=`curl http://mydomain.com/people/lost`\r\n        # rest api: http://mydomain.com/people/lost return lost peple\r\n        #\r\n        # output:\r\n        # [\r\n        #   {\r\n        #      \"key\": \"redis.memory_used\",\r\n        #      \"value\": $memory_used,\r\n        #      \"value_type\": \"integer\"\r\n        #    }\r\n        # ]\r\n        echo $output\r\n        exit $? # exit 0 if curl success\r\n\r\n                </pre></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\" role=\"tab\" id=\"headingThree\"><h4 class=\"panel-title\" id=\"ccTag5\">插件部署步骤</h4></div><div id=\"collapseThree\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingThree\"><div class=\"panel-body\"><h4>拷贝插件到监控目标主机(注意：请确保该主机已被监控)</h4><h4>配置脚本</h4><p>在监控目标主机创建运行配置脚本</p><p>示例:/etc/sensu/conf.d/redis_memory.json</p><pre>\r\n        {\r\n          \"checks\": {\r\n            \"redis_memory\": {\r\n              \"type\": \"metric\",\r\n              \"handlers\": [\"customized_influxdb\"],\r\n              \"command\": \"/bin/bash /etc/sensu/plugins/redis_memory.sh\",\r\n              \"standalone\": true,\r\n              \"interval\": 30\r\n            }\r\n          }\r\n        }\r\n                </pre><h4>重启监控客户端</h4><p>需要重启监控客户端载入新的配置</p><pre>$sudo /etc/init.d/sensu-client restart</pre></div></div></div></div><h3 id=\"ccTag6\">完成插件开发部署后：单击 <button class=\"btn btn-warning\" href=\"#addChartForm\" slide-win-in=\"\"><i class=\"fa fa-plus m-r-10\"></i>新建自定义监控图表</button> 开始创建图表</h3></div></div></div><div class=\"wikidoc-catalog\"><ul class=\"list-group\"><li class=\"list-group-item list-group-item-warning\"><strong>目录</strong></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag1\" cc-tag-offset-y=\"60\">概述</a></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag2\" cc-tag-offset-y=\"60\">插件开发步骤</a></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag3\" cc-tag-offset-y=\"60\">&nbsp;&nbsp;&nbsp;&nbsp;约定</a></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag4\" cc-tag-offset-y=\"60\">&nbsp;&nbsp;&nbsp;&nbsp;参考示例</a></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag5\" cc-tag-offset-y=\"60\">插件部署步骤</a></li><li class=\"list-group-item\"><a cc-tag-href=\"ccTag6\" cc-tag-offset-y=\"60\">创建监控图表</a></li></ul></div></div>");
$templateCache.put("app/views/components/i18n.html","<div class=\"row\"><div data-translate=\"TEST\"></div><div data-translate=\"WITH_STRING_EXPRESSION\" data-translate-values=\"{\'param1\': \'3\', \'param2\': \'4\'}\"></div><div data-translate=\"WITH_STRING_EXPRESSION\" data-translate-values=\"{{testI18n}}\"></div></div>");
$templateCache.put("app/views/components/messages.html","<div data-ng-message=\"required\">此项为必填项</div><div data-ng-message=\"minlength\">输入过短</div><div data-ng-message=\"maxlength\">输入过长</div><div data-ng-message=\"email\">请输入正确的email地址</div><div data-ng-message=\"file\">请选择文件</div><div data-ng-message=\"unique\">该名字已被占用</div><div data-ng-message=\"confirm_password\">2次输入的密码不一致</div>");
$templateCache.put("app/views/components/myPopoverTemplate.html","myPopoverTemplate");
$templateCache.put("app/views/components/nav.html","<div class=\"nav-wrapper\" id=\"navDiv\"><h3 class=\"logo\"><img src=\"assets/images/chinacloud.png\" width=\"140px\"></h3><div><ul ng-if=\"!webb\" class=\"nav\"><li data-ng-class=\"{\'active\': $state.includes(\'{{m.href}}\')|| $state.includes(\'{{m.activeState}}\')}\" data-ng-repeat=\"m in testMenu\"><a data-ng-click=\"navToState(m.href)\" data-collapse-nav=\"\" state-go=\"{{m.href}}\"><i class=\"fa {{m.icon}}\" tooltip=\"{{m.caption}}\"></i> <span class=\"title\">{{m.caption}}</span> <span class=\"pull-right glyphicon glyphicon-chevron-right\" data-ng-hide=\"!m.submenu\"></span></a><ul class=\"sub-menu\" data-ng-class=\"{\'hidden\': ! m.submenu}\"><li data-ng-repeat=\"s in m.submenu\" data-ng-class=\"{\'active\': $state.includes(\'{{s.href}}\')}\"><a data-ng-click=\"$state.go(s.href)\" data-ng-class=\"{\'active\': $state.includes(\'{{m.href}}\')|| $state.includes(\'{{m.activeState}}\')}\"><i class=\"glyphicon {{s.icon}}\"></i> <span class=\"title\">{{s.caption}}</span></a></li></ul></li></ul><ul ng-if=\"webb\" class=\"nav\" wbui-nav=\"\"><li ui-sref-active=\"active\" data-ng-repeat=\"m in testMenu\"><a ui-sref=\"{{m.href}}\"><span class=\"pull-right\" ng-if=\"m.submenu.length>0\"><i class=\"fa fa-fw fa-caret-down\"></i></span> <i class=\"fa {{m.icon}}\" tooltip=\"{{m.caption}}\"></i> <span>{{m.caption}}</span></a><ul class=\"nav nav-sub dk\"><li data-ng-class=\"{\'active\': $state.includes(\'{{s.href}}\')}\" data-ng-repeat=\"s in m.submenu\"><a ui-sref=\"{{s.href}}\"><span>{{s.caption}}</span></a></li></ul></li></ul></div><div class=\"navswitch\"><a class=\"fa fa-arrows-h\" onclick=\"changeNavW();\"></a><script>\n      //菜单宽度切换\n      var navstatus=0;\n      var menustatus=0;\n      function changeNavW(){\n        var ow=$(\'#navDiv\').width();\n\n        if(ow>150){\n          $(\'#navDiv\').css(\'width\',\'60px\');\n          $(\'body\').css(\'padding-left\',\'80px\');\n          $(\'.comm-top-left\').css(\'padding-left\',\'80px\');\n          navstatus=1;\n        }else{\n          $(\'#navDiv\').css(\'width\',\'200px\');\n          $(\'body\').css(\'padding-left\',\'220px\');\n          $(\'.comm-top-left\').css(\'padding-left\',\'220px\');\n          navstatus=0;\n        }\n      }\n    </script></div></div><div></div>");
$templateCache.put("app/views/components/ngGrid.html","<div class=\"table-responsive\"><div class=\"gridStyle\" data-ng-grid=\"gridOptions\"></div></div>");
$templateCache.put("app/views/components/pnotify.html","<h1 tooltip-html=\"true\" tooltip=\"<h1>324</h1><p>fasdfasf</p>\">angular-pnotify demo</h1><p><button ng-click=\"success()\" class=\"btn btn-success\">Success</button></p><p><button ng-click=\"info()\" class=\"btn btn-info\">Info</button></p><p><button ng-click=\"notice()\" class=\"btn btn-warning\">Notice</button></p><p><button ng-click=\"error()\" class=\"btn btn-danger\">Error</button></p><p>Use the generic PNotify object.</p><p><button ng-click=\"generic()\" class=\"btn btn-primary\">Generic PNotify</button></p><p><button ng-click=\"confirmDialog()\" class=\"btn btn-primary\">Confirm dialog</button></p><p><button ng-click=\"overrideDefaults()\" class=\"btn btn-primary\">Override defaults</button></p><p><button ng-click=\"stackTopLeft()\" class=\"btn btn-primary\">Stack top left</button></p><p><button ng-click=\"stackBottomRight()\" class=\"btn btn-primary\">Stack bottom right</button></p>");
$templateCache.put("app/views/components/step_demo.html","<div><div class=\"ccSteps\" cc-steps-options=\"stepsOptions\" cc-steps-default-step=\"3\"></div><div class=\"ccSteps\" cc-steps-options=\"stepsOptions2\" cc-steps-default-step=\"2\"></div><div>由于该组件还未完善，使用时需要将assets/images/pointes_green.png 和 pointes_blue.png 文件复制到子项目中。</div></div>                        ");
$templateCache.put("app/views/components/test.html","<section class=\"row\"><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-cube circleBG-blue fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"90\" duration=\"3\" count-from=\"0\"></span></h3><h5>虚拟机<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-desktop circleBG-green fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"2312\" duration=\"3\" count-from=\"0\"></span></h3><h5>主机<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-cubes circleBG-purple fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"456\" duration=\"3\" count-from=\"0\"></span></h3><h5>集群<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-file-code-o circleBG-red fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"1234\" duration=\"3\" count-from=\"0\"></span></h3><h5>镜像<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-database circleBG-yellow fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"1234\" duration=\"3\" count-from=\"0\"></span></h3><h5>数据卷<span class=\"text-muted font-12\">（GB）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-bar-chart circleBG-lightBlue fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"1234\" duration=\"3\" count-from=\"0\"></span></h3><h5>路由器<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-bar-chart circleBG-orange fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"1234\" duration=\"3\" count-from=\"0\"></span></h3><h5>私有网络<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div><div class=\"col-xs-12 col-sm-6 col-md-3\"><div class=\"panel\"><div class=\"panel-body\"><div class=\"tile-three\"><div class=\"tile-icon\"><i class=\"fa fa-bar-chart circleBG-grey fa-2x\"></i></div><div class=\"tile-content\"><h3><span count-to=\"1234\" duration=\"3\" count-from=\"0\"></span></h3><h5>虚拟防火墙<span class=\"text-muted font-12\">（个）</span></h5></div></div></div></div></div></section><div class=\"row\"><section class=\"col-sm-3\"><div class=\"panel mirVM\" tooltip=\"33 days, 3 hours and 21 minss\"><div class=\"panel-body\"><ul class=\"list-unstyled\"><li><h6 class=\"bold\">oracle_jinwei_demo2 → oracle-role-demo1 #1</h6></li><li><span class=\"font-12 text-success\">(5ed078f9-...-c5a465279c80)</span></li><li><img src=\"../assets/images/roles_ico/openstack.png\" class=\"vmImg\"></li><li><label class=\"label label-success m-t-10\" style=\"display: block;\">运行中</label></li><li class=\"vmOthers\">公有IP：<span class=\"text-success\">172.16.60.192</span><br>私有IP：<span class=\"text-success\">192.168.100.61</span></li></ul></div></div></section><section class=\"col-sm-3\"><ul class=\"ch-grid\"><li tooltip=\"shield_sqoop_job\" class=\"ng-scope\"><div class=\"ch-card\"><div class=\"ch-item ch-img-i\"><div class=\"ch-info-wrap\"><div class=\"ch-info\"><div class=\"ch-info-front bg-light lt\" style=\"background-image: url(img/address.png)\"></div><div class=\"ch-info-back ch-img-i\"></div></div></div></div><div class=\"font-bold h5 text-info text-center m-t m-b-sm ng-binding\">test001</div><p class=\"text-xs text-center ng-binding\" style=\"font-style: italic;height: 22px\">创建者：xxx</p><div class=\"cardbtn ng-scope\"><a class=\"btn btn-info btn-xs m-b-sm\">查看</a> <a class=\"btn btn-success btn-xs m-b-sm\">应用</a> <a class=\"btn btn-danger btn-xs m-b-sm\">删除</a></div></div></li></ul></section><section class=\"col-sm-6\"><div class=\"panel\"><div class=\"panel-body no-padding\"><table class=\"table table-hover table-striped\"><thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th></tr></thead><tbody><tr><th scope=\"row\">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><th scope=\"row\">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr><tr><th scope=\"row\">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr></tbody></table></div></div></section><div class=\"clearfix\"></div><section class=\"col-sm-6\"><div class=\"panel\"><div class=\"panel-body\"><h3>标题字体</h3><h1>一级标题</h1><h2>二级标题</h2><h3>三级标题，通常用于页面内容区域中，作为页面内容大标题</h3><h4>四级标题</h4><h5>五级标题</h5><h6>六级标题</h6></div></div></section><section class=\"col-sm-6\"><div class=\"panel\"><div class=\"panel-body\"><button type=\"button\" class=\"btn btn-default\">Default</button><button type=\"button\" class=\"btn btn-primary\">Primary</button><button type=\"button\" class=\"btn btn-success\">Success</button><button type=\"button\" class=\"btn btn-info\">Info</button><button type=\"button\" class=\"btn btn-warning\">Warning</button><button type=\"button\" class=\"btn btn-danger\">Danger</button><button type=\"button\" class=\"btn btn-link\">Link</button><hr><span class=\"label label-default\">Default</span> <span class=\"label label-primary\">Primary</span> <span class=\"label label-success\">Success</span> <span class=\"label label-info\">Info</span> <span class=\"label label-warning\">Warning</span> <span class=\"label label-danger\">Danger</span><hr><span class=\"label label-gray\">Default</span> <span class=\"label label-green\">Success</span> <span class=\"label label-blue\">Info</span> <span class=\"label label-yellow\">Warning</span> <span class=\"label label-red\">Danger</span><hr><div><script type=\"text/ng-template\" id=\"myModalContent.html\"><div class=\"alert alert-block alert-warning no-margin \" style=\"border: 0px;\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\"></button> <h4 class=\"alert-heading text-center\">WARNING</h4> <p>content</p> <div class=\"button-set\"> <button class=\"btn btn-primary btn-cons\" type=\"button\" data-ng-click=\"ok()\"> {{\'BTN_OK\'| translate}}</button> <button class=\"btn btn-white btn-cons\" type=\"button\" data-ng-click=\"cancel()\">{{\'BTN_CANCEL\'| translate}}</button> <button class=\"btn btn-white btn-cons\" type=\"button\">继续编辑</button> </div> </div></script><button class=\"btn btn-default\" ng-click=\"open()\">Open me!</button></div></div></div></section><section class=\"clearfix\"></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-info</h4></div><div class=\"panel-body bg-info\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-primarys</h4></div><div class=\"panel-body bg-primary\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-warning</h4></div><div class=\"panel-body bg-warning\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-success</h4></div><div class=\"panel-body bg-success\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-dangers</h4></div><div class=\"panel-body bg-danger\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>bg-muted</h4></div><div class=\"panel-body bg-muted\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>Panel heading without title</h4></div><div class=\"panel-body\">Panel content</div></div></section><section class=\"col-sm-3\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Panel title</h3></div><div class=\"panel-body\">Panel content</div></div></section><section class=\"col-sm-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>form</h4></div><div class=\"panel-body\"><form class=\"form-horizontal\"><div class=\"form-group\"><label for=\"\" class=\"col-sm-2 control-label\" tooltip=\"以字母开头，长度在6-18之间\">用户名（以字母开头，长度在6-18之间）：<span class=\"text-danger\">*</span></label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"Name\" cc-validate=\"name\" cc-validate-model=\"aaa.username\"><div><span>通过验证后的值：{{aaa.username}}</span></div></div></div><div class=\"form-group\"><label for=\"\" class=\"col-sm-2 control-label\">允许中文：<span class=\"text-danger\">*</span></label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"允许中文\" cc-validate=\"name_cn\" cc-validate-model=\"username_cn\" cc-validate-result=\"validateRes\"><div><span>{{username_cn}}</span></div></div></div><div class=\"form-group\"><label for=\"\" class=\"col-sm-2 control-label\">方法回调验证：<span class=\"text-danger\">*</span></label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" cc-validate=\"\" cc-validate-model=\"funreback\" cc-validate-fun=\"checkMe\" cc-validate-result=\"validateRes\"><div><span>{{funreback}}</span></div></div></div><div class=\"form-group\"><label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email：</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\" cc-validate=\"email\" cc-validate-model=\"email001\"><div><span>{{email001}}</span></div></div></div><div class=\"form-group\"><label for=\"inputurl\" class=\"col-sm-2 control-label\">url_m：</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"inputurl\" placeholder=\"http|https\" cc-validate=\"url_m\" cc-validate-model=\"urlString\"><div><span>{{urlString}}</span></div></div></div><div class=\"form-group\"><label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email：</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"Email\" cc-validate=\"email\" cc-validate-model=\"email002\" cc-validate-result=\"validateRes\"><div><span>{{email001}}</span></div></div>将验证结果保存至$rootScope中的validateRes：{{validateRes}}</div><div class=\"form-group\"><label for=\"\" class=\"col-sm-2 control-label\">自定义正则表达式验证：</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"允许中文\" cc-validate=\"userdef\" cc-validate-model=\"userdef\" cc-validate-reg=\"^[a-zA-Z]\\w{5,17}$\" cc-validate-errmsg=\"正则表达式验证出错\"><div><span>{{userdef}}</span></div></div></div><div class=\"form-group\"><label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password：<span class=\"text-danger\">*</span></label><div class=\"col-sm-10\"><input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\" cc-validate=\"password\" cc-validate-model=\"password\"></div></div><div class=\"form-group\"><label for=\"inputPassword3\" class=\"col-sm-2 control-label\">重复密码：<span class=\"text-danger\">*</span></label><div class=\"col-sm-10\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" cc-validate=\"password2\" cc-validate-model=\"password2\" cc-validate-link-model=\"password\"></div></div><div>密码：{{password}} 密码2：{{password2}}</div><div class=\"form-group\"><label for=\"\" class=\"col-sm-2 control-label\">IP地址</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" id=\"\" placeholder=\"IP地址\" cc-validate=\"ip\" cc-validate-model=\"ipaddr\"><div><span>{{ipaddr}}</span></div></div></div><div class=\"form-group\" data-ng-controller=\"tagsCtrl\"><label for=\"inputPassword3\" class=\"col-sm-2 control-label\">标签</label><div class=\"col-sm-10\"><tags-input ng-model=\"tags\"><auto-complete source=\"loadTags($query)\"></auto-complete></tags-input></div></div><div class=\"form-group clearfix\" ng-controller=\"datepickerCtrl\"><label class=\"col-xs-2 text-right m-t-30\">起始时间：<span class=\"text-danger\">*</span></label><div class=\"col-xs-2 m-t-30\"><p class=\"input-group\"><input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"status.startOpened\" min-date=\"minDate\" max-date=\"maxDate\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\"> <span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStart($event)\"><i class=\"fa fa-calendar\"></i></button></span></p></div><div class=\"col-xs-2\"><timepicker ng-model=\"dt\" ng-change=\"changed()\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"ismeridian\"></timepicker></div><label class=\"col-xs-2 text-right m-t-30\">时间字段：<span class=\"text-danger\">*</span></label><div class=\"col-xs-4 m-t-30\"><input class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">date</label><div class=\"col-sm-10\"><input type=\"text\" pick-a-date=\"date\" placeholder=\"Select Date\" class=\"form-control\" pick-a-date-options=\"{ format: \'yyyy-mm-dd\' }\"></div></div><div class=\"form-group\" ng-controller=\"selectCtrl\"><label class=\"col-sm-2 control-label\">下拉框</label><div class=\"col-sm-6\"><p>Selected: {{person.selected}}</p><ui-select ng-model=\"person.selected\" theme=\"bootstrap\"><ui-select-match placeholder=\"Select or search a person in the list...\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"item in people | filter: $select.search\"><div ng-bind-html=\"item.name | highlight: $select.search\"></div><small ng-bind-html=\"item.email | highlight: $select.search\"></small></ui-select-choices></ui-select></div></div><div class=\"form-group\" ng-controller=\"multiSelectCtrl\"><label class=\"col-sm-2 control-label\">多选下拉</label><div class=\"col-sm-10\"><div translation-texts=\"mulTranslation\" ng-dropdown-multiselect=\"\" options=\"example1data\" selected-model=\"example1model\"></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">checkbox</label><div class=\"col-sm-6\"><label class=\"i-checks m-t-5\"><input type=\"checkbox\" checked=\"\"> <i></i></label> <label class=\"i-checks m-t-5\"><input type=\"checkbox\"> <i></i></label> <label class=\"i-checks m-t-5\"><input type=\"radio\" name=\"test\" checked=\"\"> <i></i></label> <label class=\"i-checks m-t-5\"><input type=\"radio\" name=\"test\"> <i></i></label></div></div><div class=\"form-group\"><label class=\"col-sm-2 text-right\">点击复制</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" placeholder=\"Enter text to copy\" ng-model=\"copy1\"> <button class=\"btn btn-default\" clip-copy=\"copy1\">Copy!</button></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><div class=\"checkbox\"><label><input type=\"checkbox\"> Remember me</label></div></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-primary\" data-ng-disabled=\"!username || !username_cn || !password || email001Valid.validErr\">Sign in{{email001Valid.validErr}}</button></div></div></form></div></div></section><section class=\"col-sm-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4>table</h4><input type=\"text\" data-ng-model=\"hiddenCol\"> <input type=\"text\" data-ng-model=\"filterText\"></div><div class=\"panel-body\"><table class=\"table table-striped table-hover trinity-table\" data-hide-cols=\"{{hiddenCol}}\"><tr><th width=\"30\"></th><th width=\"80\" data-hidetooltip=\"true\">列1</th><th>列2</th><th>列3</th><th>列4</th><th width=\"60\">列5</th><th width=\"120\" hidetooltip=\"true\">列6</th><th width=\"400\" hidetooltip=\"true\">操作</th></tr><tr ng-repeat=\"d in tableData.data | filter:{name:filterText}\"><td><div table-collapsible-row=\"\"><p>{{d.clientid}}</p><p>{{d.name}}</p><p>{{d.dtadded}}</p><p>{{d.created_by_email}}</p><p>{{d.roles}}</p><p>{{d.status_txt}}</p></div></td><td>{{d.clientid}}</td><td>{{d.name}}</td><td>{{d.dtadded}}</td><td>{{d.created_by_email}}</td><td>{{d.roles}}</td><td>{{d.status_txt}}</td><td><button auth=\"FARMS.launch\" class=\"btn btn-link btn-xs\" data-ng-click=\"launch(appStackList.id)\" confirm=\"确定要启动应用吗？\"><span data-translate=\"START\"></span></button> <button auth=\"FARMS.terminate\" class=\"btn btn-link btn-xs\" data-ng-click=\"terminate(appStackList.id)\" confirm=\"确定要停止应用吗？\"><span data-translate=\"STOP\"></span></button> <button auth=\"FARMS.clone\" class=\"btn btn-link btn-xs\" data-ng-click=\"clone(appStackList.id)\" confirm=\"确定要克隆应用吗？\"><span data-translate=\"CLONE\"></span></button> <button auth=\"FARMS.manage\" class=\"btn btn-link btn-xs\" data-ui-sref=\"dev.appStack.info({id:appStackList.id})\"><span data-translate=\"CONFIGURATION\"></span></button> <button auth=\"FARMS.manage\" class=\"btn btn-link btn-xs\" data-ng-click=\"delete(appStackList.id)\" data-ng-disabled=\"appStackList.status == 1\" confirm=\"确定要删除应用吗？\"><span data-translate=\"DELETE\"></span></button></td></tr></table></div></div></section></div><div class=\"panel\"><div class=\"panel-body\"><table class=\"table table-striped table-hover\"><tr><th width=\"60\" class=\"text-right\">列1</th><th>列2</th><th>列3</th><th width=\"400\">操作</th></tr><tr ng-repeat=\"d in tableData.data | filter:{name:filterText}\"><td>{{d.clientid}}</td><td>{{d.name}}</td><td>{{d.dtadded}}</td><td><button auth=\"FARMS.launch\" class=\"btn btn-link btn-xs\" data-ng-click=\"launch(appStackList.id)\" confirm=\"确定要启动应用吗？\"><span data-translate=\"START\"></span></button> <button auth=\"FARMS.terminate\" class=\"btn btn-link btn-xs\" data-ng-click=\"terminate(appStackList.id)\" confirm=\"确定要停止应用吗？\"><span data-translate=\"STOP\"></span></button> <button auth=\"FARMS.clone\" class=\"btn btn-link btn-xs\" data-ng-click=\"clone(appStackList.id)\" confirm=\"确定要克隆应用吗？\"><span data-translate=\"CLONE\"></span></button> <button auth=\"FARMS.manage\" class=\"btn btn-link btn-xs\" data-ui-sref=\"dev.appStack.info({id:appStackList.id})\"><span data-translate=\"CONFIGURATION\"></span></button> <button auth=\"FARMS.manage\" class=\"btn btn-link btn-xs\" data-ng-click=\"delete(appStackList.id)\" data-ng-disabled=\"appStackList.status == 1\" confirm=\"确定要删除应用吗？\"><span data-translate=\"DELETE\"></span></button></td><td table-collapsible-row=\"\"><p>{{d.clientid}}</p><p>{{d.name}}</p><p>{{d.dtadded}}</p><p>{{d.created_by_email}}</p><p>{{d.roles}}</p><p>{{d.status_txt}}</p></td></tr></table></div></div><section class=\"row m-b-10\" data-ng-controller=\"popoverCtrl\"><div class=\"col-xs-6\"><script type=\"text/ng-template\" id=\"popover\"><div class=\"triangle\"></div> <div class=\"ns-popover-tooltip\"> <p>111The server has finished initializing. Scalarizr has fired the HostUp event, and will continue to process further orchestration events.</p> </div></script><span>friendlyDate: 2016-02-26 8:22:34 => {{\'2016-02-26 8:22:34\' | friendlyDate :{dateFormat:\'yyyy-MM-dd HH:mm\',level:5} }} | Feb 24, 2016 12:46:51 => {{\'Feb 24, 2016 12:46:51\' | friendlyDate : \'yyyy-MM-dd HH:mm\'}} | 124565315465 => {{124565315465 | friendlyDate : \'yyyy-MM-dd HH:mm\'}} | \'124565315465\' => {{\'124565315465\' | friendlyDate : \'yyyy-MM-dd HH:mm\'}}</span> <button ns-popover=\"\" ns-popover-theme=\"ns-popover-tooltip-theme\" class=\"btn btn-default\" ns-popover-timeout=\'0\"\' ns-popover-popup-delay=\"0.7\" ns-popover-trigger=\"mouseenter\" ns-popover-placement=\"left\" ns-popover-template=\"popover\">Popover</button> <a href=\"javascript:;\" class=\"btn btn-default\" ns-popover=\"\" ns-popover-template=\"popover_content\" ns-popover-trigger=\"mouseenter\" ns-popover-placement=\"bottom\" ns-popover-theme=\"ns-popover-tooltip-theme\" ns-popover-hide-on-click=\"false\" ns-popover-timeout=\"0\">test456464</a><script type=\"text/ng-template\" id=\"popover_content\"><div class=\"triangle\"></div> <div class=\"ns-popover-tooltip\"> 指向显示的内容fdasdfasd </div></script></div><div class=\"col-xs-6\"><div class=\"errorPopover\">popover<div class=\"errorPopover-content\"><h5></h5><p>The server has finished initializing. Scalarizr has fired the HostUp event, and will continue to process further orchestration events.</p></div></div></div></section><div class=\"panel\"><div class=\"panel-body\"><tabset justified=\"true\"><tab heading=\"Justified\">Justified content</tab><tab heading=\"SJ\">Short Labeled Justified content</tab><tab heading=\"Long Justified\">Long Labeled Justified content</tab></tabset></div></div>");
$templateCache.put("app/views/components/ui-notify.html","<h1>angular-ui-notification demo</h1><p><button ng-click=\"success()\" class=\"btn btn-success\">Success</button></p><p><button ng-click=\"error()\" class=\"btn btn-danger\">Error</button></p><h1>ccNotify demo</h1><p><button ng-click=\"success2()\" class=\"btn btn-success\">Success</button></p><p><button ng-click=\"error2()\" class=\"btn btn-danger\">Error</button></p><h1>ccLoading demo</h1><p><button ng-click=\"ccLoadingClick1()\" class=\"btn btn-danger\" id=\"bt1\">Loading按钮</button></p><p><button ng-click=\"ccLoadingClick2()\" class=\"btn btn-success\">Loading结束</button></p><p><button ng-click=\"ccLoadingClick3()\" class=\"btn btn-danger\">更改Loading区域中的提示文字</button></p><div style=\"border:1px solid #999999; height: 100px;\" class=\"dataArea\"><p>数据区域</p><p>{{test_txt.text}}</p><p>{{testLoadingData[0].text}}</p></div><div><input type=\"text\" ng-model=\"test_txt.text\"></div><p><button ng-click=\"ccLoadingClick4()\" class=\"btn btn-black\">加载失败</button></p><div style=\"border:1px solid #999999;\" class=\"dataArea\"><p>数据区域</p></div>");
$templateCache.put("app/views/components/utils.html","<div class=\"row\"><div class=\"col-md-12\"><h3>标题字体</h3></div><div class=\"col-md-12\"><h1>一级标题</h1><h2>二级标题</h2><h3>三级标题，通常用于页面内容区域中，作为页面内容大标题</h3><h4>四级标题</h4><h5>五级标题</h5><h6>六级标题</h6></div><div class=\"col-md-12\"><h3>注册验证</h3></div><div class=\"col-md-12\"><div class=\"col-xs-4\"><form class=\"form-horizontal\" name=\"myForm\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Email</label><div class=\"col-sm-10\"><input type=\"email\" class=\"form-control\" name=\"email\" data-ng-model=\"form.email\" placeholder=\"Email\" required=\"\"></div><div data-ng-messages=\"myForm.email.$error\" data-ng-messages-include=\"app/views/components/messages.html\" class=\"form-error\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">昵称</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" name=\"name\" data-ng-model=\"form.name\" data-ui-validate=\"{unique: \'validateName($value)\'}\" placeholder=\"昵称，输入test会冲突\" required=\"\"></div><div data-ng-messages=\"myForm.name.$error\" data-ng-messages-include=\"app/views/components/messages.html\" class=\"form-error\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">密码</label><div class=\"col-sm-10\"><input type=\"password\" class=\"form-control\" name=\"password\" data-ng-model=\"form.password\" placeholder=\"输入密码\" required=\"\"></div><div data-ng-messages=\"myForm.password.$error\" data-ng-messages-include=\"app/views/components/messages.html\" class=\"form-error\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">重复密码</label><div class=\"col-sm-10\"><input type=\"password\" class=\"form-control\" name=\"confirm_password\" data-ng-model=\"password\" data-ui-validate=\"{confirm_password: \'$value === form.password\'}\" data-ui-validate-watch=\"\'form.password\'\" placeholder=\"再输入一次密码\" required=\"\"></div><div data-ng-messages=\"myForm.confirm_password.$error\" data-ng-messages-include=\"app/views/components/messages.html\" class=\"form-error\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-default\" data-ng-class=\"{disabled: !myForm.$valid}\">注册</button></div></div></form></div></div></div>");
$templateCache.put("app/views/section/header.html","<div class=\"header comm-header\"><div class=\"pull-left comm-top-left\"><h1>Trinity-OneUI 华云公用UI组件库</h1></div><div class=\"pull-right comm-top-right\"><ul class=\"list-inline list-unstyled iconslist\"><li><a data-ng-click=\"swithNav()\">切换菜单栏</a></li><li><span>欢迎您, <a><i class=\"fa fa-user m-r-10\"></i>{{userName}}</a></span></li><li><a class=\"\" data-ng-click=\"changeUserRoles()\"><i class=\"fa fa-cog m-r-10\"></i>切换账户类型</a></li><li><a class=\"fa fa-sign-out\" tooltip=\"退出\" tooltip-placement=\"bottom\"></a></li></ul></div></div>");}]);