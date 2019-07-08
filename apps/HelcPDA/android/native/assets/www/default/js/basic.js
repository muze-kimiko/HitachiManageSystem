
/* JavaScript content from js/basic.js in folder common */
var baseurl = "http://pda.hitachi-helc.com:28000";
window.onerror = function () { return true; };
var appid = "d52e8fee-69b0-4c4d-ad9f-dc8637878b62";
var eid="";
//add by lxm2017.2.10
var EssApp={
	 Version:"2.0.0.6"//App版本号
	,PublishedDate:"2018-09-11"//最新版本发布日期
	,LogoImgVersion:11//图片版本号
};


function setCookie(name, value, seconds) {  
	localStorage.setItem(name,value);
}  

function getCookie(Name) 
{ 
	return localStorage.getItem(Name);
}

function delCookie(name){
	localStorage.removeItem(name);
}


function GetAPIData(url, params, fn, fnerror, fnBeforeSend, fnComplete, isSsync, isGet, userInfo,waitMessage) {
    var returnValue = null;
    if (userInfo == null || userInfo == undefined) {
        userInfo = getCookie(appid, true);
    }
    if (isSsync == null || isSsync == undefined) isSsync = true;
    if (isGet == null || isGet == undefined) isGet = false;
    var typeString="POST";
    if (isGet) {
    	typeString = "GET";
    }

    $.ajax({
    		url:baseurl + url,
    		type:typeString,
    		dataType:"json",
    		processData:true,
    		contentType:"application/json;charset=UTF-8",
    		data:params,
    		crossDomain:true,
    		async:isSsync,
    		cors:true,
    		crossOrigin: true,
    		//headers:{"Key":userInfo},
    		beforeSend:function(request)
    		{
    	        if (waitMessage != undefined && waitMessage != null) {
    	            
    	        	/*
    	        	WLJQ('page').block({
    	                message: '<span><img src="/skin/images/loading.gif" /><h1>'+waitMessage+'</h1></span>',
    	                css: {
    	                    border: '3px solid khaki'
    	                }
    	            });
    	            */
    	        	showLoader(waitMessage);
    	            
    	        }

    	        request.setRequestHeader("UserInfo", userInfo);

    	        request.withCredentials = false;
    	        if (fnBeforeSend != undefined && fnBeforeSend != null) fnBeforeSend();
    		},
    		success:function (data, textStatus, request) {
    	        //if (data != undefined) {
                if (fn != undefined && fn != null) {

                    userInfo = request.getResponseHeader("UserInfo");

                    fn(data, userInfo);
                }
                else {
                    returnValue = data;
                }},
            error:function (msg) {
                if (fnerror != undefined && fnerror != undefined && fnerror != null) {
                    fnerror(msg);
                }
            },
            complete:function () {
                if (waitMessage != undefined && waitMessage != null) {
                    //$.unblockUI();
                	hideLoader();
                }
                if (fnComplete != undefined && fnComplete != null) fnComplete();
            }
            
    		});
    if (!isSsync) {
        return returnValue;
    }

}

function GetAPIDataExt(url, params, onSuccess, onError, onBeforeSend, onComplete, isSsync, isGet, userInfo,waitMessage,isProcessData,contentType) {
	var returnValue = null;
    if (userInfo == null || userInfo == undefined) {
        userInfo = getCookie(appid, true);
    }
    
    if (isSsync == null || isSsync == undefined) 
    	isSsync = true;
    
    if (isGet == null || isGet == undefined) 
    	isGet = false;
    
    var typeString="POST";
    if (isGet) {
    	typeString = "GET";
    }
    if (contentType == null || contentType == undefined) 
    	contentType = "application/json;charset=UTF-8";
    
    $.ajax({
    		url:baseurl + url,
    		type:typeString,
    		dataType:"json",
    		processData:isProcessData,
    		contentType:contentType,
    		data:params,
    		crossDomain:true,
    		async:isSsync,
    		cors:true,
    		crossOrigin: true,
    		beforeSend:function(request)
    		{
    	        if (waitMessage) {
    	        	showLoader(waitMessage);
    	        }

    	        request.setRequestHeader("UserInfo", userInfo);

    	        request.withCredentials = false;
    	        
    	        if (onBeforeSend) 
    	        	onBeforeSend();
    		},
    		success:function (data, textStatus, request) {
                if (onSuccess) {

                    userInfo = request.getResponseHeader("UserInfo");

                    onSuccess(data, userInfo);
                }
                else {
                    returnValue = data;
                }},
            error:function (msg) {
                if (onError) {
                    onError(msg);
                }
            },
            complete:function () {
                if (waitMessage) {
                	hideLoader();
                }
                if (onComplete) 
                	onComplete();
            }
            
    		});
    if (!isSsync) {
        return returnValue;
    }
}

function loadSimpleDialog(dialogText,dialogTitle) {
	WL.SimpleDialog.show(dialogTitle, dialogText, [ {
		text : '确定',
		handler : function() {
			WL.Logger.debug("button pressed");
		}
	} ]);
}

function GetSubString(str,length)
{
	var result=str;
	if(typeof str!='undefined' && str!="" && str.length>length)
	{
		result=str.substring(1,length+1);
	}
	return result;
}

function isInt(value) {
	  return !isNaN(value) && 
	         parseInt(Number(value)) == value && 
	         !isNaN(parseInt(value, 10));
	}

function showLoader(text) {

    $.mobile.loading('show', {
        text: text, 
        textVisible: true,      
        textonly: false,
        theme: 'b',
        html: ""           
    });
}

function hideLoader()
{
    $.mobile.loading('hide');
}

function getDay(date,days) {
    var date = date.split('-'),
        today = new Date().setFullYear(+date[0], +date[1]-1, +date[2]),    //第二个参数减1因为月份是0~11
        yesterday = new Date(today + days*24 * 60 * 60 * 1000);
            
    return yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();
}

function GetDate()
{
	 var d,s;
	 d = new Date();
	 s = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

	 return(s);  
}

function FormatDate(s)
{
	s=s.replace("-","年").replace("-","月")+"日";
	return s;
}

function IsDate(strDate)
{
    // 先判断格式上是否正确
    var regDate = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (!regDate.test(strDate))
    {
        return false;
    }
     
    // 将年、月、日的值取到数组arr中，其中arr[0]为整个字符串，arr[1]-arr[3]为年、月、日
    var arr = regDate.exec(strDate);
     
    // 判断年、月、日的取值范围是否正确
    return IsMonthAndDateCorrect(arr[1], arr[2], arr[3]);
}
 

function IsDateTime(strDateTime)
{
    // 先判断格式上是否正确
    var regDateTime = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    if (!regDateTime.test(strDateTime))
        return false;
         
    // 将年、月、日、时、分、秒的值取到数组arr中，其中arr[0]为整个字符串，arr[1]-arr[6]为年、月、日、时、分、秒
    var arr = regDateTime.exec(strDateTime);
     
    // 判断年、月、日的取值范围是否正确
    if (!IsMonthAndDateCorrect(arr[1], arr[2], arr[3]))
        return false;
         
    // 判断时、分、秒的取值范围是否正确
    if (arr[4] >= 24)
        return false;
    if (arr[5] >= 60)
        return false;
    if (arr[6] >= 60)
        return false;
     
    // 正确的返回
    return true;
}
 
// 判断年、月、日的取值范围是否正确
function IsMonthAndDateCorrect(nYear, nMonth, nDay)
{
    // 月份是否在1-12的范围内，注意如果该字符串不是C#语言的，而是JavaScript的，月份范围为0-11
    if (nMonth > 12 || nMonth <= 0)
        return false;
 
    // 日是否在1-31的范围内，不是则取值不正确
    if (nDay > 31 || nMonth <= 0)
        return false;
     
    // 根据月份判断每月最多日数
    var bTrue = false;
    switch(nMonth)
    {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            bTrue = true;    // 大月，由于已判断过nDay的范围在1-31内，因此直接返回true
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            bTrue = (nDay <= 30);    // 小月，如果小于等于30日返回true
            break;
    }
     
    if (!bTrue)
        return true;
     
    // 2月的情况
    // 如果小于等于28天一定正确
    if (nDay <= 28)
        return true;
    // 闰年小于等于29天正确
    if (IsLeapYear(nYear))
        return (nDay <= 29);
    // 不是闰年，又不小于等于28，返回false
    return false;
}
 
// 是否为闰年，规则：四年一闰，百年不闰，四百年再闰
function IsLeapYear(nYear)
{
    // 如果不是4的倍数，一定不是闰年
    if (nYear % 4 != 0)
        return false;
    // 是4的倍数，但不是100的倍数，一定是闰年
    if (nYear % 100 != 0)
        return true;
     
    // 是4和100的倍数，如果又是400的倍数才是闰年
    return (nYear % 400 == 0);
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//当前系统时间
function Now() {
    var dt = new Date();
    var y = dt.getFullYear(), m = 1 + dt.getMonth(), d = dt.getDate(), h = dt.getHours(), mi = dt.getMinutes(), ss = dt.getSeconds();
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + ss;
}
function DateAdd(dateStr, strInterval, Number) {
    var dtTmp = dateStr.replace("-", "/").replace("-", "/");
    var d='';
    switch (strInterval) {
        case 's':
            d = new Date(Date.parse(dtTmp) + (1000 * Number));
            break;
        case 'n':
            d = new Date(Date.parse(dtTmp) + (60000 * Number));
            break;
        case 'h':
            d = new Date(Date.parse(dtTmp) + (3600000 * Number));
            break;
        case 'd':
            d = new Date(Date.parse(dtTmp) + (86400000 * Number));
            break;
        case 'w':
            d = new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            break;
        case 'q':
            d = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
        case 'm':
            d = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
        case 'y':
            d = new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
    }
    var result = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return result;
}
//计算两个时间的时间差
function DateDiff(strInterval, dtStart, dtEnd) {

    dtStart = dtStart.replace(/-/g, '/');
    dtEnd = dtEnd.replace(/-/g, '/');

    var dtStart = new Date(dtStart);
    if (isNaN(dtStart)) dtStart = new Date();
    var dtEnd = new Date(dtEnd);
    if (isNaN(dtEnd)) dtEnd = new Date();
    switch (strInterval) {
        case "s": return parseInt((dtEnd - dtStart) / 1000);
        case "n": return parseInt((dtEnd - dtStart) / 60000);
        case "h": return parseInt((dtEnd - dtStart) / 3600000);
        case "d": return parseInt((dtEnd - dtStart) / 86400000);
        case "w": return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case "m": return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
        case "y": return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}

function toDecimal2(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return false;  
    }  
    var f = Math.round(x*100)/100;  
    var s = f.toString();  
    var rs = s.indexOf('.');  
    if (rs < 0) {  
        rs = s.length;  
        s += '.';  
    }  
    while (s.length <= rs + 2) {  
        s += '0';  
    }  
    return s;  
} 

