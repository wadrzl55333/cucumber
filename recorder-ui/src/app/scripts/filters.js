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
