/**
 * Created by yu.liu on 2016/2/2.
 */
/*****************************************************************
 jQuery Ajax封装通用类
 *****************************************************************/



/**
 * ***************************************************************************
 * 前端页面js引擎
 *      ***************************************************************************
 */
// TODO 格式还需进一步修改，采用strict方式。
(function($) {


    // 初始化菜单
    var initMainMenu = function(params) {



    };

    // 初始化轮播图片
    var initFlexslider = function(params) {};





    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    var executeAjax=function(url, type, data, successfn, errorfn, dataType, async){
        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;


        $.ajax({
            type: type,
            async: async,
            data: data,
            url: url,
            dataType: dataType,
            success: function(d){
                successfn(d);
            },
            error: function(e){
                //console.log(e);
                errorfn(e);
               // $.frontEngineDialog.executeDialogContent('提示',e);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    var executeAjaxs=function(url, data, successfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function(d){
                successfn(d);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    var executeAjaxPost=function(url, data, successfn, errorfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };





    var trim = function(str) {
        if (isEmpty(str)) return "";
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };

    //判断对象是否存在
    var isEmpty = function(obj) {
        return obj == null || obj == "" || obj == "null" || typeof(obj) == "undefined";
    };

    /**
     * 校验数据是否为空
     * param id:校验id
     * param obj:校验对象
     * param msg:提示信息
     * param validType:校验类型（1文本框2普通下拉框3树状结构下拉框）默认为1
     * param icon:提示图标(默认warning)
     * param fn:回调函数
     */
    var validData = function(id, msg, validType, obj, icon, fn) {
        var returnVal = true;
        var val = "";
        if (isEmpty(obj)) obj = document.getElementById('win-iframe').contentWindow.$("#" + id);
        if (isEmpty(validType) || validType == 1) {
            val = obj.val();
        } else if (validType == 2) {
            val = obj.combobox("getValue");
        } else if (validType == 3) {
            val = obj.combotree("getValue");
        }

        if (trim(val) == "") {
            if (isEmpty(icon)) icon = "warning";
            $.messager.alert('操作提示', msg, icon, function() {
                try {
                    if (isEmpty(validType) || validType == 1) {
                        obj.focus();
                    } else if (validType == 2){
                        obj.combobox().next('span').find('input').click();
                    } else if (validType == 3){
                        obj.combotree().next('span').find('input').click();
                    }

                    if (!isEmpty(fn)) {
                        fn();
                    }
                } catch(e) {}
            });
            returnVal = false;
        }
        return returnVal;
    };

  /*  var executeAjax = function(url, pars, asynFlag) {
        var retMsg;
        // 是否执行同步 :false为同步
        if (!asynFlag) asynFlag = false;
        $.ajax({
            type: "POST",
            url: url,
            data: pars,
            async: asynFlag,
            dataType:"text",
            success: function(msg) {
                retMsg  = msg;
            },
            error: function(data) {
            }
        });
        return retMsg;
    }*/

    // ****************************************************************************************************
    // $.frontEngine.methodName形式调用
    // ****************************************************************************************************
    $.extend({
        frontEngine: {

            executeAjax: function(url, type, data, successfn, errorfn, dataType, async) {
                return executeAjax(url, type, data, successfn, errorfn, dataType, async);
            },
           /* executeAjaxs: function(url, data, successfn) {
                return executeAjaxs(url, data, successfn);
            },*/
            executeAjaxPost: function(url, data, successfn, errorfn) {
                return executeAjaxPost(url, data, successfn, errorfn);
            }
        }
    });


}) (jQuery);






