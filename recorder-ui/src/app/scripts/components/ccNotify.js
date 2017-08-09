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

