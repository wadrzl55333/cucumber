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
        controller:function($scope, $element) {
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
        }
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
        controller:function($scope, $element){
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

        },
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
        controller: function($scope){
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

        },
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

