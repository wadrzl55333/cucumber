'use strict';

angular.module('trinity')
  .controller('widgetCtrl', function ($scope, $interval) {

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

  })
  .factory('RandomKVMDataModel', function (WidgetDataModel, $interval) {
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
  })
  .controller('dashboardCtrl', function($scope, $interval, chartDataModel){

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

  });
