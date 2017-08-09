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
