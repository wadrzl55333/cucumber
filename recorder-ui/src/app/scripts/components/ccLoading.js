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