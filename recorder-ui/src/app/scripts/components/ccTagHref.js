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