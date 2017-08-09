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
