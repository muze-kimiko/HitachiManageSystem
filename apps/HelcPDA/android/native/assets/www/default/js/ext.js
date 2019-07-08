
/* JavaScript content from js/ext.js in folder common */
/* JavaScript content from js/ext.js in folder common */
//分页
var PageSetting = {
	PageSize : 10,
	PageIndex : 1,
	TotalCount : 0,
	isLastPage : function() {
		if (Math.ceil(this.TotalCount / this.PageSize) >= this.PageIndex)
			return false;
		else
			return true;
	},
	reset : function() {
		this.PageSize = 10;
		this.PageIndex = 1;
		this.TotalCount = 0;
	}
};
// 实时监视
var MonitorModule = {
	Timer : {
		SingleConnectTimeoutId : 0,
		CheckOnlineTimeoutId : 0,
		ReceiveTimeoutId : 0,
		ReconectTimeoutId:0
	}
	,IsConnected : false
	,MonitorList : []
	,MaxMonitorCount : 6// 最大监控电梯数量
	,MonitorTimeoutId : 0
	,ElevatorType : 1// 默认直梯
};
function login() {
	var userId = $("#txtUserid").val();
	var password = $("#txtPassword").val();

	if (userId == "") {
		$("#LabelCheckLogin").html("请输入用户名!");
		$("#div-loading").hide();

		return false;
	}

	var userInfo = '{"ID":null,"UserID":"'
			+ userId
			+ '","Password":"'
			+ password
			+ '","IMEI":null,"IMSI":null,"ChipID":null,"Credential":null,"ApplicationID":"d52e8fee-69b0-4c4d-ad9f-dc8637878b62","PublicKey":null,"VersionID":"1.0.0.1","ExpiredTime":null,"ServerTime":null,"PERSON_ID":null,"SBL_ROW_ID":null,"EBS_USER_ID":null,"INIT_PERSON_ID":null,"SBL_PASSWORD":null,"CacheMode":"1","StaffName":"'
			+ encodeURIComponent(usernames)
			+ '","IsAdmin":null,"Org_Id":null,"COMPANY_CODE":"' + company_code
			+ '","TechUserFlag":null,"HQFlag":"' + HQFlag + '","STATION_ID":"'
			+ station_id + '"}';

	// var userInfo = '{"ID":null,"UserID":"' + userId + '","Password":"' +
	// password +
	// '","IMEI":null,"IMSI":null,"ChipID":null,"Credential":null,"ApplicationID":"c5eb3306-70e1-4ad8-9cd0-929195edc63e","PublicKey":null,"VersionID":"1.0.0.1","ExpiredTime":null,"ServerTime":null,"PERSON_ID":null,"SBL_ROW_ID":null,"EBS_USER_ID":null,"INIT_PERSON_ID":null,"SBL_PASSWORD":null,"CacheMode":"1","StaffName":null,"IsAdmin":null,"Org_Id":null,"COMPANY_CODE":null,"TechUserFlag":null,"HQFlag":null}';

	GetAPIData("/api/users/GetUserInfo", null, onLoginSuccess, onLoginFault,
			null, null, true, false, userInfo, '正在跳转...');
}

function onLoginSuccess(data, userInfo) {
	if (data != undefined && data != null) {
		if (data.StatusID == 0) {
			document.getElementById("LabelCheckLogin").innerHTML = "";
			if (userInfo != undefined && userInfo != null) {
				var password = $("#txtPassword").val();
				var objUserInfo = JSON.parse(userInfo);
				setCookie(appid, userInfo);
				setCookie(appid + "_StaffName", objUserInfo.StaffName);
				setCookie(appid + "_UserId", objUserInfo.UserID);
				setCookie(appid + "_Password", password);

				var page = getUrlParam('page');

				if (typeof page != 'undefined' && page != null && page != "") {
					var url = window.location.href;
					if (url.indexOf("?") != -1) {
						url = url.substr(url.indexOf("?") + 1);
					}
					changePage(page + '?' + url);
				} else {
					changePage("main.html");
				}
			}
		} else {
			document.getElementById("LabelCheckLogin").innerHTML = data.Message;
			$("#div-loading").hide();

		}
	} else {
		document.getElementById("LabelCheckLogin").innerHTML = "用户名或密码错误,登录失败";
		$("#div-loading").hide();
	}
}

function onLoginFault(data) {
	document.getElementById("LabelCheckLogin").innerHTML = "登录失败!"
			+ data.responseText;
	$("#div-loading").hide();
}
function logout() {
	delCookie(appid);
	changePage("index.html");
	return true;
}

function changePage(url) {
	WLJQ.mobile.changePage(url, {
		transition : "slideup"
	});
}

function changePageExt(url) {
	var oldurl = window.location.href;
	var num = oldurl.indexOf("?");
	if (num > -1) {
		if (url.indexOf("?") > -1) {
			url = url + '&' + oldurl.substr(num + 1);
		} else {
			url = url + '?' + oldurl.substr(num + 1);
		}
	}

	WLJQ.mobile.changePage(url, {
		transition : "slideup"
	});
}

function back(inbuttonid, outbuttonid) {
	var from = getUrlParam("from");

	if (typeof from != "undefined" && from != "" && from.length > 0) {

		if (typeof inbuttonid != "undefined")
			$("#" + inbuttonid).hide();

		if (typeof outbuttonid != "undefined")
			$("#" + outbuttonid).show();
		$("#" + outbuttonid).attr("href", from);

	} else {

		if (typeof inbuttonid != "undefined")
			$("#" + inbuttonid).show();

		if (typeof outbuttonid != "undefined") {
			$("#" + outbuttonid).hide();
			$("#" + outbuttonid).attr("href", "#");
		}
	}
}
/** *****************************公用方法 开始*************************************** */
function CommonModule() {
};

CommonModule.isInServiceDate = function(startDate, endDate) {
	var mydate = new Date();
	var curDate = mydate.getFullYear() + "-";
	curDate += (mydate.getMonth() + 1) + "-";
	curDate += mydate.getDate();

	if (((startDate == null || startDate == '') && (endDate == null || endDate == ''))
			|| (((startDate == null || startDate == '') && DateDiff('d',
					curDate, endDate) < 0)
					|| ((endDate == null || endDate == '') && DateDiff('d',
							curDate, startDate) > 0)
					|| DateDiff('d', curDate, startDate) > 0 || DateDiff('d',
					curDate, endDate) < 0)) {
		return false;
	} else
		return true;
};
// 调试状态
CommonModule.getDebugString = function(isDebug) {
	if (isDebug!=null && !!isDebug)
		return "<img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;\"/><span style=\"vertical-align:middle;height:16px;width:16px;\">已调试</span></div>";
	else
		return "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" style=\"vertical-align:middle;\"/><span style=\"vertical-align:middle;height:16px;width:16px;\">未调试</span></div>";
};
// 采集板连接
CommonModule.getConnectingString = function(softVersion, isWatchCut) {
	var result = "";
	try {
		if (softVersion && softVersion.toString().substring(0, 4) == "1146") 
			result = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title=\"无采集板方案\" style=\"color:#333333\">W11</a>";
		else if(softVersion && (softVersion.toString().substring(0, 4) == "1315" || softVersion.toString().substring(0, 4) == "1518"))
			result = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title=\"无采集板方案\" style=\"color:#333333\">W15</a>";
		else if(softVersion && softVersion.toString().substring(0, 4) == "1529")
			result = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title=\"无采集板方案\" style=\"color:#333333\">W16</a>";
		else {
			if (isWatchCut==null || !!isWatchCut)
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" style=\"vertical-align:middle;\"/><span style=\"vertical-align:middle;height:16px;width:16px;\">采集板断开</span></div>";
			else
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;\"/><span style=\"vertical-align:middle;height:16px;width:16px;\">采集板链接</span></div>";
		}
		
	} catch (err) {

	}
	return result;
};
// 终端连接
CommonModule.getTerminalConnectingString = function(isTerminalCutT) {
	var msg='',pic=''
		,result="<div style=\"vertical-align:middle;\"><img src=\"images/@pic@\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">@msg@</span></div>";
	if (isTerminalCutT==null || !!isTerminalCutT){
		msg = "终端断开";
		pic='zhuangtr.png';
	}
	else{
		msg = "终端连接";
		pic='zhuangtl.png';
	}
	return result.replace(new RegExp("@pic@", 'g'), pic).replace(new RegExp("@msg@", 'g'), msg);
	/*
	try {
		if (!!isTerminalCutT)
			result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">终端断开</span></div>";
		else
			result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">终端连接</span></div>";
	} catch (err) {

	}
	return result;
	*/
};
// 激活状态
CommonModule.getActiveString = function(isActive,ActiveStatusFlag) {
	
	var msg='',pic=''
		,result="<div style=\"vertical-align:middle;\"><img src=\"images/@pic@\" style=\"vertical-align:middle;16px;width:16px;\"/><span style=\"vertical-align:middle;\">@msg@</span></div>";
	
	if (isActive!=null && !!isActive){
		msg = "已激活";
		pic='zhuangtl.png';
	}
	else{
		msg = "未激活";
		pic='zhuangtr.png';
	}
	
	if(typeof ActiveStatusFlag!="undefined" && ActiveStatusFlag!='-1')
		pic='zhuangth.png';
	
	return result.replace(new RegExp("@pic@", 'g'), pic).replace(new RegExp("@msg@", 'g'), msg);
	
	/*
	try {
		if(ActiveStatusFlag==undefined || ActiveStatusFlag==null){
			if (!!isActive)
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">已激活</span></div>";
			else
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">未激活</span></div>";	
		}
		else{
			if(ActiveStatusFlag.toString()=="0"){
				//result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangth.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">主板未激活</span></div>";
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangth.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">已激活</span></div>";
			}
			else if(ActiveStatusFlag.toString()=="1"){
				//result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangth.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">终端未激活</span></div>";
				result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangth.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">已激活</span></div>";
			}
			else{
				if (!!isActive)
					result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">已激活</span></div>";
				else
					result = "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" style=\"vertical-align:middle;height:16px;width:16px;\"/><span style=\"vertical-align:middle;\">未激活</span></div>";
			}
		}
	} catch (err) {

	}
	return result;
	*/
};
CommonModule.IsToday = function(obj) {
	var result = false;

	try {
		if (typeof obj != 'undefined' && obj) {
			var isTimeOut = DateDiff('h', obj, Now()) > 24 ? true : false;

			result = !isTimeOut;
		}
	} catch (err) {
	}

	return result;
};
CommonModule.isSelectedAll = function() {
	var isSeleted = true;

	$("input[name='chk']").each(function() {
		if (!this.checked)
			isSeleted = false;
	});
	if (isSeleted)
		$("#chkAll").prop('checked', true);
	else
		$("#chkAll").removeAttr("checked");
};
CommonModule.selectedAll = function(obj) {
	var checked = $("#" + obj.id).prop("checked");
	$("input[name='chk']").each(function() {
		this.checked = checked;
	});
};
// 格式化时间时分秒数字
// 输入:12 输出:1,2
// 输入:9 输出:0,9
// 结果第一位为十位数，后面为个位数
CommonModule.formatTime = function(digit) {

	var result = '0,0';
	var shi = '0';
	var ge = '0';

	if (digit >= 10)// 小时
	{
		shi = digit.toString().substring(0, 1);
		ge = digit.toString().substring(1, 2);

	} else {
		shi = "0";
		ge = parseInt(digit.toString());
	}
	result = shi + ',' + ge;
	return result;
};
// 获取当前时间
CommonModule.getCurentTime = function(separator) {
	var s = separator || '/';

	var now = new Date();

	var year = now.getFullYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日

	var hh = now.getHours(); // 时
	var mm = now.getMinutes(); // 分
	var ss = now.getSeconds(); // 秒

	var clock = year + s;

	if (month < 10)
		clock += "0";

	clock += month + s;

	if (day < 10)
		clock += "0";

	clock += day + " ";

	if (hh < 10)
		clock += "0";

	clock += hh + ":";

	if (mm < 10)
		clock += '0';

	clock += mm + ":";

	if (ss < 10)
		clock += '0';

	clock += ss;

	return (clock);
};
/** ***********************公用方法 结束******************************* */

/** ****************************多梯监视 电梯查询********************************* */
var MutilMonitorSearchModule = (function() {
	WLJQ(document).on('pagehide', '#realtimemoresearch', function() {
		PageSetting.reset();
	});
	WLJQ(document).on('pageshow', '#realtimemoresearch', function() {

		var paralist = getUrlParam('paralist');

		// 查询
		$("#btnsearch").on("click", function() {
			search();
		});
		$("#deviceno,#building,#phone").on("click", function(obj) {
			setQueryKeyStatus(this);
		});
		$("#more").on("click", function() {
			nextPage();
		});
		$("#btnsearchok").on("click", function() {
			var assetnum = '';
			// checkbox值格式：deviceno
			$("input[name='chk']:checked").each(function() {
				var no = this.value.split(',')[1];
				if (assetnum == '')
					assetnum = no;
				else
					assetnum = assetnum + ',' + no;
			});

			if (assetnum != "") {
				assetnum = buildEids(paralist, assetnum);

				url = '?paralist=' + assetnum;
			} else {
				alert('请选择电梯');
				return;
			}

			changePage('realtimemore.html' + url);
		});

		setStatus();

		var obj = {id : "deviceno"};
		
		setQueryKeyStatus(obj);
	});
	//
	function setStatus() {
		var activeCss={"background-color" : "#3388cc","color" : "#fff"};
		
		$("#txtKey").on("tap", function() {
			$("#btnsearch").css(activeCss);
		});
		/*
		$("#txtKey").on("change", function() {
			setStatusCommon();
		});
		$("#txtKey").on("blur", function() {
			setStatusCommon();
		});
		*/
		$('#txtKey').bind('change blur',function() {
			setStatusCommon();
		});

		
		function setStatusCommon(){
			var key = $("#txtKey").val();

			if ($.trim(key).length > 0) {
				$("#btnsearch").css(activeCss);
			} else {
				$("#btnsearch").removeClass('ui-btn-active');
				$("#btnsearch").removeAttr('background-color');
				
				$("#btnsearch").css({"color" : "#000"});
			}
		}
	}
	// 查询精武
	function setQueryKeyStatus(obj) {
		var curCss={'background-image':'url(images/guanjianci_active.png)','cursor':'default'}
		,otherCss={'background-image':'url(images/guanjianci_moren.png)','cursor':'pointer'};
		
		$("#" + obj.id).css(curCss);
		
		if (obj.id == "building") {
			$("#hidquerytype").val(1);
			$("#deviceno,#phone").css(otherCss);
		} else if (obj.id == "deviceno") {
			$("#hidquerytype").val(0);
			$("#building,#phone").css(otherCss);
		} else {
			$("#hidquerytype").val(-1);
			$("#deviceno,#building").css(otherCss);
		}
		PageSetting.PageIndex = 1;
	}
	// 查询电梯信息
	function search() {
		if ($("#btnsearchok")) {
			$("#btnsearchok").removeClass('ui-btn-active');
			$("#btnsearchok").removeAttr('background-color');
			$("#btnsearchok").css({
				"color" : "#000"
			});
		}

		var queryType = $("#hidquerytype").val();
		var key = $("#txtKey").val();

		if (queryType == 0 && $.trim(key).length < 3) {
			alert("查询条件不能少于3位");
			return false;
		}
		PageSetting.PageIndex = 1;
		$("#SearchResult").html('');
		$("#div-more").hide();

		getData(queryType, key);
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		var queryType = $("#hidquerytype").val();
		var key = $("#txtKey").val();

		getData(queryType, key);
	}
	// 获取数据
	function getData(queryType, key) {

		var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				OrderBy : "",
				strWhere : ""
		};
		
		switch(queryType){
			case "0":
				param.DeviceNo = key;
				break;
			case "1":
				param.BuildingName = key;
				break;
			default:
				param.Phone = key;
				break;
		}
		
		GetAPIData("/api/Elevators/GetQuickElevatorListExt", JSON
				.stringify(param), onSearchSuccess, onSearchFault, null, null,
				true, false, null, '正在查询,请稍侯...');
	}
	// 多梯监视--电梯查询
	function onSearchSuccess(data) {
		if (typeof data != 'undefined' && data) {
			var html = [];
			var objResult = JSON.parse(data.Data);

			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"list\">");
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {

				if (PageSetting.PageIndex <= 1) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到"+ PageSetting.TotalCount+ "条数据</td>");
				}
				var ds=objResult.ds;
				
				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = ds[i];

					html.push("<tr class=\"oddtr\" height=\"20px\"><td colspan=\"4\" class=\"splitline\" style=\"line-height:1.2em;padding-left:8px;\">"+ item.Address + "</td></tr>");
					html.push("<tr height=\"20px\" style=\"cursor:pointer;\">");
					html.push("<td class=\"chk\" style=\"padding-left:8px;\"><input class=\"my-checkbox\" type=\"checkbox\" onclick=\"MutilMonitorSearchModule.setButtonActive()\" name=\"chk\" value=\""+ item.Id + "," + item.DeviceNo + "\"></td>");
					html.push("<td nowrap=\"nowrap\" width=\"31%\" style=\"color:blue;\"><a href=\"#\" onclick=\"ElevatorModule.showDetail('"+ item.Id+ ","+ item.DeviceNo+ "')\" data-rel=\"popup\">"+ item.DeviceNo+ "</a></td>");
					html.push("<td nowrap=\"nowrap\" width=\"30%\"><a href=\"#\" style=\"color:Black;font-weight:normal;\" onclick=\"ElevatorModule.showDetail('"+ item.Id+ ","+ item.DeviceNo+ "')\" data-rel=\"popup\">"+ item.CompanyName+ "</a></td>");
					html.push("<td >"+ (item.IsException == "1" ? "<font style=\"color:red;\">遥监异常</font>": "<font style=\"color:green;\">遥监正常</font>")+ "</td>");
					html.push("</tr>");
				}
				
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize
						* PageSetting.PageIndex;
				if (remainCout < 0)
					remainCout = 0;

				if (remainCout > 0)
					$("#more").html('更多[剩余' + remainCout + '条]');
				else
					$("#more").hide();
				
				$("#div-more").show();
			} else {
				$("#div-more").hide();
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
			
			objResult=null,html=null;

			if ($("#btnsearch")) {
				$("#btnsearch").css({
					"background-color" : "#3388cc",
					"color" : "#fff"
				});
			}
		}
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	};
	// 选中复选框后设置按钮状态
	function _setButtonActive() {
		var isSelected = false
		,activeCss={"background-color" : "#3388cc","color" : "#fff"};
		
		$("input[name='chk']:checked").each(function() {
			isSelected = true;
			return;
		});
		
		if (isSelected) {
			if ($("#btnsearchok")) {
				$("#btnsearchok").css(activeCss);
			}

			if ($("#btnsearch")) {
				$("#btnsearch").removeClass('ui-btn-active');
				$("#btnsearch").removeAttr('background-color');
			}
		} else {
			if ($("#btnsearchok")) {
				$("#btnsearchok").removeClass('ui-btn-active');
				$("#btnsearchok").removeAttr('background-color');
			}
			if ($("#btnsearch")) {
				$("#btnsearch").css(activeCss);
			}
		}
	}
	return {
		setButtonActive : function() {
			_setButtonActive();
		}
	};
})();
/** ****************************多梯监视 电梯查询 结束********************************* */
/** ****************************多梯监视 开始********************************* */
var MutilMonitorModule = (function() {
	var Page_ID='#realtimemore'
		, MonitorList = []
		, MaxCount = 6 // 最大监控电梯数量
		, MonitorTimeoutId = 0
		, ElevatorType = 1 // 默认直梯
		, TimeoutList = []
		, HubHasStart=false;
	// 多梯监视事件
	WLJQ(document).on('pagehide', Page_ID, function() {
		try {
			reset();
		} 
		catch (err) {};
	});
	WLJQ(document).on('pageshow',Page_ID,pageShow);
	function pageShow(){
		MonitorList.length = 0;
		
		var paras = getUrlParam('paralist');
		var deviceNoList =paras && paras.split(',');

		if (deviceNoList.length > MaxCount)// 检查是否超过最大的监控数，如果大于则截取
		{
			deviceNoList.splice(MaxCount, deviceNoList.length - 1);
		}

		if (deviceNoList && deviceNoList.length > 0) {
			var param = {assetnum : deviceNoList};
			
			GetAPIData("/api/elevators/GetMultiElevatorInfoExtNew",
					JSON.stringify(param), onGetStaticInfoSuccess, err,
					null, null, true, false, null, '正在加载,请稍侯...');
		}
		$("#addEle").on("click",function() {
			changePage("realtimemoresearch.html?paralist="+ getDeviceNos());
		});
	}
	// 重置
	function reset() {
		if (MonitorTimeoutId > 0) {
			clearInterval(MonitorTimeoutId);
			MonitorTimeoutId = 0;
		}
		if (TimeoutList.length > 0) {
			for (var i = 0; i < TimeoutList.length; i++) {
				clearTimeout(TimeoutList[i].TimeoutId);
				deleteItem(TimeoutList, id);
			}
		}

		$.connection.hub.stop();
		HubHasStart=false;
	}
	// 更新电梯静态信息
	// 1.创建 每台梯的界面
	// 2.赋值
	// 3.记录当前电梯的状态信息。
	// 4.发送指令实时更新信息
	// 5.检查在线状态
	// 监控多梯静态信息（位置，所在楼盤，最后上线时间)
	function onGetStaticInfoSuccess(data) {
		if (typeof data != 'undefined' && data) {
			var objResult = JSON.parse(data.Data);

			if (objResult.ds && objResult.ds.length) {

				if (objResult.ds.length >= MaxCount) {
					$("#div-add").hide();
				} else {
					$("#div-add").show();
				}
				var obj = undefined,eleObj = null;
				
				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					obj = objResult.ds[i];
					var content = buildModel(obj);

					$(content).insertBefore("#div-add");

					eleObj = {
						Id : obj.Id,
						DeviceNo : obj.DeviceNo,
						DoorStatus : obj.DoorStatus,
						LastProcessDate : null,
						Connected : false
					};

					if (typeof obj.IsElevator != 'undefined'&& obj.IsElevator) {
						eleObj.ElevatorType = (obj.IsElevator.toString().toLowerCase() == 'false' ? 0 : 1); // 判断是直梯还是扶梯
					} else {
						eleObj.ElevatorType = 1;
					}

					if (typeof obj.Floor != 'undefined' && obj.Floor) {
						eleObj.FloorTable = JSON.parse("{" + obj.Floor + "}");
					} else {
						eleObj.FloorTable = [];
					}

					MonitorList.push(eleObj);
				}
				var ids = getEleIds();
				if (!!ids) {
					$.connection.hub.url = baseurl + "/signalr";
					$.connection.hub.logging = true;
					chat = $.connection.realTimeHub;
					chat.client.sendMessge = function(message) {
						onGetDynamicInfo(message);
					};
					sendCmd(ids);

					MonitorTimeoutId = setInterval(checkOnline, 5000); // 检查在线情况
				}
			}
		}
	}
	// 建立电梯界面模板
	function buildModel(obj) {
		var time = '',datetmp = '',date = ''
			,hour = '',mi = '',sc = ''
			,hourArr=null,miArr=null,scArr=null;

		if (obj.LastContactDate) {
			time = obj.LastContactDate.split(' ')[1];
			datetmp = obj.LastContactDate.split(' ')[0].split('-');
			date = datetmp[0] + '年' + datetmp[1] + '月'+ datetmp[2] + '日';

			hour = time.split(':')[0];
			mi = time.split(':')[1];
			sc = time.split(':')[2];
			
			hourArr=CommonModule.formatTime(hour).split(',');
			miArr=CommonModule.formatTime(mi).split(',');
			scArr=CommonModule.formatTime(sc).split(',');
		}

		var model = [];

		var key = obj.Id;

		model.push("<div id=\"div-" + key + "\" class=\"circle\" >");
		model.push("<div id=\"Mcstatus-"+ key+ "\" class=\"Mcstatus\"  width=\"100%\" style=\"border:0px;background-color:#e4e4e4;margin-top:0;\" >");
		model.push("<table id=\"tb-"+ key+ "\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
		model.push("<tr>");
		model.push("<td style=\"width:160px;\">");

		if (!obj.IsElevator && obj.IsElevator.toLowerCase() == 'false') {
			model.push("<div id=\"divElevator-"+ key+ "\" style=\"width:160px;height:152px;background:url(images/lift_futi_stop.png) left top no-repeat;position:relative;\"></div>");
		} else {
			model.push("<div id=\"divElevator-"+ key+ "\" style=\"width:160px;height:152px;background:url(images/lift_close.png) left top no-repeat;position:relative;\">");
			model.push("<div id=\"div-zhiti\">");
			model.push("<div  style=\"left: 130px; top: 50px; position: absolute;\"><img id=\"imgUp-"+ key + "\" src=\"images/up_gray.gif\" /></div>");
			model.push("<div id=\"floor-"+ key+ "\" style=\"left: 135px; top: 70px; position: absolute;color:#ffffff;font-size:16px;font-weight:bold;\" ></div>");
			model.push("<div id=\"down-"+ key+ "\" style=\"left: 130px; top: 95px; position: absolute;\"><img id=\"imgDown-"+ key + "\" src=\"images/down_gray.gif\" /></div>");
			model.push("<div class=\"jindu\" title=\"载重\" style=\"left: 10px; top: 50px; position: absolute;\">");
			model.push("<ul>");
			model.push("<li id=\"imgCarry-" + key+ "\" style=\"height: 0%\"></li>");
			model.push("</ul>");
			model.push("</div>");
			model.push("<div id=\"Carry-"+ key+ "\" class=\"bfb\" style=\"left: 15px; top: 100px; position: absolute;\">0%</div>");
			model.push("</div>");
			model.push("</div>");
		}
		model.push("</td>");
		model.push("<td>");
		model.push("<div class=\"\" width=\"100%\" style=\"margin-top:0px\" >");

		model.push("<table style=\"color:#000;\" cellspacing=\"0\" cellpadding=\"0\">");
		model.push("<tr style=\"cursor:pointer;vertical-align:top;\">");

		model.push("<td colspan=\"2\" style=\"padding-left:5px;size:15px;vertical-align:top;font-weight:blod;color:blue;text-align:left;\" id=\"lbElevator-"+ key+ "\"><a href=\"#\" onclick=\"changePage('realtime.html?assetnum="+ obj.DeviceNo+ "');\">"+ obj.DeviceNo+ "</a>&nbsp;&nbsp;<img onclick=\"MutilMonitorModule.remove('"+ key+ "')\" id=\"imgDel-"+ key+ "\" src=\"images/shishijiankong/delete_elevator.png\" /></td>");
		model.push("</tr>");
		model.push("<tr style=\"font-size:12px;vertical-align:top;display:none;\">");
		model.push("<td width=\"30px\" style=\"padding-left:5px;font-weight:blod;\">地盘:</td>");
		model.push("<td id=\"lbBuilding-" + key+ "\"  style=\"font-weight:normal;text-align:left;\">"+ (obj.BuildingName || "") + "</td>");
		model.push("</tr>");
		model.push("<tr style=\"font-size:12px;vertical-align:top;\">");
		model.push("<td width=\"30px\" style=\"padding-left:5px;font-weight:blod;\">位置:</td>");
		model.push("<td id=\"lbAddress-" + key+ "\" style=\"font-weight:normal;text-align:left;\">"+ (obj.InstallSite || "") + "</td>");
		model.push("</tr>");
		model.push("</table>");

		model.push("<table style=\"color:#000;\" cellspacing=\"0\" cellpadding=\"0\">");
		model.push("<tr>");
		model.push("<td rowspan=\"2\" align=\"center\" style=\"width:45px;padding-left:5px;padding-right:5px;\"><img id=\"imgCom-"+ key + "\" src=\"images/shishijiankong/wifi-red.png\" /></td>");
		model.push("<td colspan=\"2\" id=\"lbLastContactDate-"+ key+ "\"  style=\"color:#363636;font-weight:normal;font-size:14px;text-align:left;\">"+ date + "</td>");
		model.push("</tr>");
		model.push("<tr>");
		model.push("<td colspan=\"2\">");
		model.push("<table style=\"width:100%;border-collapse:collapse; font-size:12px;font-weight:normal; color:#fff;padding-right:5px;\" >");
		model.push("<tr>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-hour-shi-"+ key + "\">" + hourArr[0] + "</span></td>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-hour-ge-"+ key + "\">" + hourArr[1] + "</span></td>");
		model.push("<td align=\"center\" style=\"width:3px;background: url(images/shishijiankong/jiankong_time_s02.png) no-repeat center center;padding-left:0px;padding-right:0px;\"></td>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-minute-shi-"+ key + "\">" + miArr[0] + "</span></td>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-minute-ge-"+ key + "\">" + miArr[1] + "</span></td>");
		model.push("<td align=\"center\" style=\"width:3px;background: url(images/shishijiankong/jiankong_time_s02.png) no-repeat center center;padding-left:0px;padding-right:0px;\"></td>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-second-shi-"+ key + "\">" + scArr[0] + "</span></td>");
		model.push("<td align=\"center\" style=\"width:12px;background: url(images/shishijiankong/jiankong_time_s01.png) no-repeat center center;padding-left:0px;padding-right:0px;\"><span id=\"time-second-ge-"+ key + "\">" + scArr[1] + "</span></td>");
		model.push("</tr>");
		model.push("</table>");
		model.push("</td>");
		model.push("</tr>");
		model.push("<tr>");
		model.push("<td colspan=\"3\">");
		model.push("<table>");
		model.push("<tr>");
		model.push("<td align=\"center\"><a href=\"javascript:void(0)\" onclick=\"MutilMonitorModule.connect('"+ key+ "');\"  class=\"bluelink\" style=\"font-size:12px;color:#ffffff;text-shadow: none;font-weight: normal;text-decoration:none;\">连接</a></td>");
		model.push("<td align=\"center\"><a href=\"javascript:void(0)\" onclick=\"MutilMonitorModule.disconnect('"+ key+ "');\" class=\"reddisconnect\" style=\"font-size:12px;color:#ffffff;text-shadow: none;font-weight: normal;text-decoration:none;\">断开</a></td>");
		model.push("</tr>");
		model.push("</table>");
		model.push("</td>");
		model.push("</tr>");
		model.push("</table>");

		model.push("</div>");
		model.push("</td>");
		model.push("</tr>");
		model.push("</table>");
		model.push("<div id=\"divConnect-"+ key+ "\" style=\"color:red;display:none;\" >“通讯超时” ，点击“连接”继续通讯</div>");
		model.push("</div>");
		model.push("</div>");

		return model.join('');
	}
	// 更新实时信息（连接状态门开关状态，楼层状态，在线时间，载重，电梯上下方向状态 ）
	// 监控多梯动态信息连接状态，门开关状态，所在楼层，电梯上下方向状态）
	function onGetDynamicInfo(data) {
		if (typeof data != 'undefined' && data) {
			var objResult = JSON.parse(data);

			
			
			if (typeof objResult != 'undefined' && objResult
					&& objResult.length > 0) {
				var obj = undefined;
				for (var i = 0, len = objResult.length; i < len; i++) {
					obj = objResult[i];
					
					var item = getItem(TimeoutList, obj.Elevator);
	
					// 连接状态
					var imgid = "imgCom-" + obj.Elevator;
					var imgObj=document.getElementById(imgid);
					
					if (obj.IsOnline == "1")// 已经连接
					{
						if(imgObj!=null)
						{
							imgObj.src = "images/shishijiankong/wifi-green.png";

							if (!item) {
								var timeoutObj = {
									Id : obj.Elevator,
									TimeoutId : setTimeout("MutilMonitorModule.setWifiGray('"+ imgid+ "');",1000)
								};

								TimeoutList.push(timeoutObj);
							} else {
								item.TimeoutId = setTimeout("MutilMonitorModule.setWifiGray('"+ imgid+ "');",1000);
							}
						}
							
					} else if (obj.IsOnline == "2") // 关闭连接
					{
						_disconnect(obj.Elevator);
					} else // 连接中
					{
						if (item) {
							if (item.TimeoutId > 0) {
								clearTimeout(item.TimeoutId);
								deleteItem(TimeoutList, obj.Elevator);
							}
						}
						if(imgObj!=null)
							imgObj.src = "images/shishijiankong/wifi-orange.gif";
					}

					// 在线 时间更新
					updateOnlineTime(obj);
					var source = getItem(MonitorList, obj.Elevator);
					source.Connected = true;
					if (source.ElevatorType == 0)
						showFuti(source, obj);
					else
						showZhiti(source, obj);
				}
			}
		}
	}
	function setWifiGray(imgid){
		var obj=document.getElementById(imgid);
		
		if(obj!=null)
			obj.src = "images/shishijiankong/wifi-gray.png";
		
	}
	function showFuti(source, obj) {
		var eleObj=document.getElementById("divElevator-" + obj.Elevator);
		
		if(eleObj==null)
			return;
		
		// 电梯开关状态
		if (obj.DoorStatus.toString() == "0" || obj.DoorStatus.toString() == "1") {
			if (source.DoorStatus != obj.DoorStatus.toString()) {
				if (obj.DoorStatus.toString() == "0") {
					// 方向
					switch (parseInt(obj.RunDirection)) {
					case 0:
						eleObj.style.background = 'url(images/lift_futi_stop.png)';
						break;
					case 1:
						eleObj.style.background = 'url(images/lift_futi_up.png)';
						break;
					case 2:
						eleObj.style.background = 'url(images/lift_futi_down.png)';
						break;
					}
				} else {
					eleObj.style.background = 'url(images/lift_futi_stop.png)';
				}
			}
		} else {
			if (source.DoorStatus != obj.DoorStatus.toString()) {
				if (obj.DoorStatus.toString() == "False") {
					eleObj.style.background = 'url(images/lift_futi_stop.png)';
				} else {
					// 方向
					switch (parseInt(obj.RunDirection)) {
					case 0:
						eleObj.style.background = 'url(images/lift_futi_stop.png)';
						break;
					case 1:
						eleObj.style.background = 'url(images/lift_futi_up.png)';
						break;
					case 2:
						eleObj.style.background = 'url(images/lift_futi_down.png)';
						break;
					}
				}
			}
		}
	}
	function showZhiti(source, obj) {
		try {
			// 电梯门开关状态
			var eleObj=document.getElementById("divElevator-" + obj.Elevator);
			if(eleObj){
				if (obj.DoorStatus.toString() == "0" || obj.DoorStatus.toString() == "1") {
					if (source.DoorStatus != obj.DoorStatus.toString()) {
						if (obj.DoorStatus.toString() == "0") {
							eleObj.style.background = 'url(images/lift_open.png)';
						} else {
							eleObj.style.background = 'url(images/lift_close.png)';
						}
					}
				} else {
					if (source.DoorStatus != obj.DoorStatus.toString()) {
						if (obj.DoorStatus.toString() == "False") {
							eleObj.style.background = 'url(images/lift_close.png)';
						} else {
							eleObj.style.background = 'url(images/lift_open.png)';
						}
					}
				}
			}
			
			var floorObj=document.getElementById("floor-" + obj.Elevator);
			// 所在楼层
			if(floorObj){
				if (source.FloorTable !== undefined && source.FloorTable != null
						&& source.FloorTable.length > 0
						&& obj.Floor.toString() != "0") {
					floorObj.innerHTML = source.FloorTable[obj.Floor.toString()];
				} else {
					floorObj.innerHTML = obj.Floor;
				}
			}
		} catch (err) {
			var floorObj2=document.getElementById("floor-" + obj.Elevator);
			if(floorObj2)
				floorObj2.innerHTML = "0";
		}
		// 电梯上下方向状态
		var imgUpSrc="",imgDownSrc="";
		var imgUpObj=document.getElementById("imgUp-" + obj.Elevator);
		var imgDownObj=document.getElementById("imgDown-" + obj.Elevator);
		
		switch (parseInt(obj.RunDirection)) {
		case 0:
			imgUpSrc="images/up_gray.gif";
			imgDownSrc="images/down_gray.gif";
			break;
		case 1:
			imgUpSrc="images/up.png";
			imgDownSrc="images/down_gray.gif";
			break;
		case 2:
			imgUpSrc="images/up_gray.gif";
			imgDownSrc="images/down.png";
			break;
		}
		if(imgUpObj)
			imgUpObj.src=imgUpSrc;
		
		if(imgDownObj)
			imgDownObj.src=imgDownSrc;
		
		// 电梯载重状态
		try {
			var carryObj=document.getElementById("Carry-" + obj.Elevator);
			
			if(carryObj){
				carryObj.innerHTML = obj.Carry+ "%";
			}
			
			var imgCarryObj=document.getElementById("imgCarry-" + obj.Elevator);
			
			if(imgCarryObj){
				if (obj.Carry >= 100) {
					imgCarryObj.style.height = '100%';
				} else {
					imgCarryObj.style.height = obj.Carry
							+ "%";
				}
				if (imgCarryObj.style.height > 100) {
					imgCarryObj.style.height = '100%';
				}
			}
			
		} catch (err) {
		}
	}
	/** ***********************刷新实时信息****************************** */
	// 连接
	// 输入参数：电梯id
	function _connect(id) {

		$("#divConnect-" + id).hide();

		if (id == "")
			return false;

		if ($.connection.hub.state != 1) {
			$.connection.hub.start().done(function() {
				chat.server.add(id);
				HubHasStart=true;
			}).fail(function(e) {
				alert("温馨提示:无法连接服务器!");
			});
		}
		else{
			if(chat && HubHasStart)
				chat.server.add(id);
		}
		
		
		var param = {
			elevatorid : id,
			userid : userId
		};
		GetAPIData("/api/ajax/StartUploadReal", JSON.stringify(param), function(){
				setTimeout(function(){
					var source = getItem(MonitorList, id);
					if(!source.Connected){
						$("#divConnect-" + id).show();
						resetStatus(id);
					}
				}, 30 * 1000);
			},err, null, null, false, false);

		var imgComObj=document.getElementById("imgCom-" + id);
		
		if(imgComObj)
			imgComObj.src = "images/shishijiankong/wifi-orange.gif";
	}
	;
	// 断开连接
	// 输入参数:电梯id
	// 1.将id从字符串移除
	// 2.发送断开指令
	// 3.当前是否还存在监控电梯，如没有则断开连接
	// 断开连接
	function _disconnect(id) {

		if (id == "")
			return false;
		// 在刷新列表清除此记录
		var item = getItem(TimeoutList, id);

		if (!!item && item.TimeoutId > 0) {
			clearTimeout(item.TimeoutId);
			deleteItem(TimeoutList, id);
		}
		
		try{
			if(chat)
				chat.server.remove(id);
		}
		catch(e){}
		
		resetStatus(id);
	}
	;
	// 重置电梯状态(楼层,开关门状态,连接状态,上下方向状态,载重)
	function resetStatus(id) {
		var imgComObj=document.getElementById("imgCom-" + id);
		
		if(imgComObj)
			imgComObj.src = "images/shishijiankong/wifi-red.png"; // 连接状态
		
		var source = getItem(MonitorList, id);

		var eleObj=document.getElementById("divElevator-" + id);
		var floorObj=document.getElementById("floor-" + id);
		var imgUpObj=document.getElementById("imgUp-" + id);
		var imgDownObj=document.getElementById("imgDown-" + id);
		var imgCarryObj=document.getElementById("imgCarry-" + id);
		var carryObj=document.getElementById("Carry-" + id);
		
		if (source.ElevatorType == 0) {
			if(eleObj)
				eleObj.style.background = 'url(images/lift_futi_stop.png)'; // 开关门状态
		} else {
			if(floorObj)
				floorObj.innerHTML = ""; // 楼层
			
			if(eleObj)
				eleObj.style.background = 'url(images/lift_close.png)'; // 开关门状态

			if(imgUpObj)
				imgUpObj.src = "images/up_gray.gif"; // 上下方向状态
			
			if(imgDownObj)
				imgDownObj.src = "images/down_gray.gif";
			
			if(imgCarryObj)
				imgCarryObj.style.height = "0%"; // 载重
			
			if(carryObj)
				carryObj.innerHTML = "0%"; // 载重
		}

		if (MonitorList != null && MonitorList.length > 0) {
			for (var i = 0; i < MonitorList.length; i++) {
				if (MonitorList[i].Id == id || MonitorList[i].DeviceNo == id) {
					MonitorList[i].Connected = false;
					break;
				}
			}
		}
	}
	// 发送监控指令
	// 输入参数：电梯id字符串（id1,id2)
	// 发送指令
	function sendCmd(ids) {

		if ($.connection.hub.state != 1) {

			$.connection.hub.start().done(function() {
				chat.server.add(ids);
				HubHasStart=true;
			}).fail(function(e) {
				alert("温馨提示:无法连接服务器!");
			});
		}

		for (var i = 0; i < MonitorList.length; i++) {
			document.getElementById("imgCom-" + MonitorList[i].Id).src = "images/shishijiankong/wifi-orange.gif";
		}

		var param = {
			Ids : ids,
			userid : userId
		};
		GetAPIData("/api/ajax/StartUploadRealByIds", JSON.stringify(param),
				onStart, err, null, null, false, false);
	}
	// 通讯1分钟仍连接不上，则在该梯界面显示 “通讯超时” ，点击“连接”继续通讯，并消除“通讯超时”的字样，以此循环。
	function onStart() {
		setTimeout(checkConnected, 60 * 1000);
	}
	// 通讯1分钟仍连接不上，则在该梯界面显示 “通讯超时” ，点击“连接”继续通讯，并消除“通讯超时”的字样，以此循环。
	function checkConnected() {
		if (MonitorList == null || MonitorList.length <= 0)
			return null;
		for (var i = 0; i < MonitorList.length; i++) {
			if (!MonitorList[i].Connected) {
				$("#divConnect-" + MonitorList[i].Id).show();
				resetStatus(MonitorList[i].Id);
			}
		}
	}
	// 检查在线状态
	function checkOnline() {
		try {
			if (MonitorList == null || MonitorList.length <= 0)
				return;

			var newTime = new Date().getTime();

			for (var i = 0; i < MonitorList.length; i++) {
				if (typeof MonitorList[i].LastProcessDate != 'undefine'
						&& MonitorList[i].LastProcessDate != null) {

					if ((newTime - MonitorList[i].LastProcessDate.getTime()) > 15000) {
						if (MonitorList[i].Connected)
							_disconnect(MonitorList[i].Id);
					}
				}
			}
		} catch (err) {
		}
	}
	// 移除监控电梯
	// 输入参数：电梯id
	function _remove(id) {
		if (confirm("是否关闭监控?")) {
			_disconnect(id); // 断开连接并停止刷新

			$("#div-" + id).remove(); // 界面移除

			deleteItem(MonitorList, id); // 从状态表移除

			if (MonitorList.length >= MaxCount) {
				$("#div-add").hide();
			} else {
				$("#div-add").show();
			}
		}
	}
	// 获取监控中的电梯ID列表
	function getEleIds() {
		var result = '';

		for (var j = 0; j < MonitorList.length; j++) {
			if (result == '')
				result = MonitorList[j].Id;
			else
				result = result + ',' + MonitorList[j].Id;
		}
		// alert(result);
		return result;
	}
	// 获取监控中的电梯ID列表
	function getDeviceNos() {
		var result = '';

		for (var j = 0; j < MonitorList.length; j++) {
			if (result == '')
				result = MonitorList[j].DeviceNo;
			else
				result = result + ',' + MonitorList[j].DeviceNo;
		}
		return result;
	}
	// 数组操作
	// 获取数据对象
	function getItem(arr, id) {
		if (arr == null || arr.length <= 0)
			return null;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].Id == id || arr[i].DeviceNo == id)
				return arr[i];
		}
		return null;
	}
	// 删除数据项
	function deleteItem(arr, id) {
		if (arr != null && arr.length > 0 && id != null) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].Id == id || arr[i].DeviceNo == id) {
					arr.splice(i, 1);
					break;
				}
			}
		}
	}
	
	// 增加数据项
	// 更新最后处理里时间及界面显示的当前时间
	// 更新时间
	function updateOnlineTime(obj) {
		var id = obj.Elevator;
		// 时间更新
		var lastDataDate = new Date();
		var hour = lastDataDate.getHours();
		var mi = lastDataDate.getMinutes();
		var sc = lastDataDate.getSeconds();
		var date = lastDataDate.getFullYear() + '年'
				+ (lastDataDate.getMonth() + 1) + '月' + lastDataDate.getDate()
				+ '日';
		$('#lbLastContactDate-' + id).html(date);

		var Timeformatter=CommonModule.formatTime;
		var hourArr=Timeformatter(hour).split(',');
		var miArr=Timeformatter(mi).split(',');
		var scArr=Timeformatter(sc).split(',');
		
		// 时分秒
		$("#time-hour-shi-" + id).html(hourArr[0]);
		$("#time-hour-ge-" + id).html(hourArr[1]);
		$("#time-minute-shi-" + id).html(miArr[0]);
		$("#time-minute-ge-" + id).html(miArr[1]);
		$("#time-second-shi-" + id).html(scArr[0]);
		$("#time-second-ge-" + id).html(scArr[1]);
		
		/*
		if (MonitorList != null && MonitorList.length > 0) {
			for (var i = 0; i < MonitorList.length; i++) {
				if (MonitorList[i].Id == id || MonitorList[i].DeviceNo == id) {
					MonitorList[i].LastProcessDate = lastDataDate;
					MonitorList[i].Connected = true;
					break;
				}
			}
		}
		*/
	}

	return {
		connect : function(id) {
			_connect(id);
		},
		disconnect : function(id) {
			_disconnect(id);
		},
		remove : function(id) {
			_remove(id);
		},
		setWifiGray:function(id){
			setWifiGray(id);
		}
	};
})();
// 是否已经存在
// sourceList:1,2,3
function isExsit(sourceList, item) {
	var arr = sourceList.split(',');
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == item) {
			return true;
		}
	}
	return false;
}
// 重新组合id列表，防止重复
function buildEids(sourceList, newList) {
	if (newList == null || newList.length <= 0)
		return sourceList;

	var result = sourceList;
	var newArr = newList.toString().split(',');
	for (var j = 0; j < newArr.length; j++) {
		if (!isExsit(sourceList, newArr[j])) {
			if (result == '')
				result = newArr[j];
			else
				result = result + ',' + newArr[j];
		}
	}

	return result;
}

/** *********************************多梯监视结束***************************************** */
// 归档记录
var IssueRecordsModule = (function() {
	var PAGE_ID='#IssueRecords'
		, PageSize = 10, PageIndex = 1, TotalCount = 0
		, Id = -1, DeviceNo = "", Description = "", MalfunctionDate = "", InstallSite = ""
		, CanAdd = true, NotAddMsg = "", ElevatorId = ""
		, sourceParaObj = {
				PageIndex : 1,
				DeviceNo : "",
				StartTime : "",
				EndTime : ""
			};

	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		TotalCount = PageSetting.TotalCount;
		Id = -1;
		DeviceNo = "";
		Description = "";
		MalfunctionDate = "";
		InstallSite = "";

		NotAddMsg = "";
		CanAdd = true;
		sourceParaObj = null;
	});
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("IssueRecords-back", "IssueRecords-external-back");

			Id = getUrlParam('Id');
			DeviceNo = getUrlParam('assetnum');
			Description = getUrlParam('Description');
			MalfunctionDate = getUrlParam('MalfunctionDate');
			InstallSite = getUrlParam('InstallSite');
			ElevatorId = getUrlParam('ElevatorId');

			sourceParaObj = sourceParaObj || {};
			sourceParaObj.DeviceNo = getUrlParam('key') || "";
			sourceParaObj.PageIndex = getUrlParam('pageindex') || "1";
			sourceParaObj.StartTime = getUrlParam('StartTime') || "";
			sourceParaObj.EndTime = getUrlParam('EndTime') || "";

			$("#lbId").html(Id);// 故障ID
			$("#lbDeviceNo").html(DeviceNo);// 电梯工号
			$("#lbDescription").html(Description);// 故障内容
			$("#lbMalfunctionDate").html(MalfunctionDate);// 故障时间
			$("#lbInstallSite").html(InstallSite);// 地址

			$("#more").on("click", function() {
				nextPage();
			});
			$("#btnAdd").on("click", function() {
				jumpArchive(ElevatorId, Id);
			});

			$("#IssueRecords-content").css("padding-top",$("#Mcheader").height() + 5 + "px");
			// 邦定导航事件
			search();
		} catch (err) {

		}
	}
	// 查询
	function search() {
		var param = {
			PageSize : PageSize,
			PageIndex : '1',
			strOrder : " ProcessDate desc",
			fid : Id
		};
		GetAPIData("/api/elevators/GetIssueRecordsListExt", JSON
				.stringify(param), onSearchSuccess, onSearchFault, null, null,
				true, false, null, '正在查询,请稍侯...');
	}
	// 下一页
	function nextPage() {
		PageIndex = PageIndex + 1;
		PageSize = PageSetting.PageSize * PageIndex;
		search();
	}
	// 查询成功
	function onSearchSuccess(data) {
		if (typeof data != 'undefined' && data) {
			var html = [];
			var objResult = JSON.parse(data.Data);

			html.push("<table width=\"100%\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class=\"guzhangfb\">");

			if (objResult && objResult.ds && objResult.ds1[0].datacount > 0) {
				TotalCount = objResult.ds1[0].datacount;
				$("#rowcount").html("共搜索到" + TotalCount + "条数据");

				var issueTypeName = "",content = "",userID = ""
					,processDate = "",staff_name = "",company_name = ""
					,obj = null;
				
				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					obj = objResult.ds[i];

					issueTypeName = obj.IssueTypeName || "";
					content = obj.Content || "";
					userID = obj.UserID || "";
					processDate = obj.ProcessDate || "";
					staff_name = obj.staff_name || obj.Staff_name||"";
					company_name = obj.company_name || obj.Company_name || "";

					html.push("<tr style=\"background-color:#e4e4e4;\">");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">处理类型:</font>"+ issueTypeName + "</td>");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">处理记录:</font>"+ content + "</td>");
					html.push("</tr>");
					html.push("<tr style=\"background-color:#e4e4e4;\">");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">处理用户:</font>"+ userID + "</td>");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">处理时间:</font>"+ processDate + "</td>");
					html.push("</tr>");
					html.push("<tr style=\"background-color:#e4e4e4;\">");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">姓名:"+ staff_name + "</td>");
					html.push("<td nowrap=\"nowrap\"><font style=\"font-weight:bold;\">所属司:</font>"+ company_name + "</td>");
					html.push("</tr>");
					
					if (len > i + 1) {
						html.push("<tr style=\"background-color:#fff;\">");
						html.push("<td  colspan=\"2\">&nbsp;</td>");
						html.push("</tr>");
					}

				}
				// 判断是否可以新增，两个条件不可以新增：
				// 1、“故障时间(MalfunctionDate)”超过24小时。
				// 2、最后一条记录所属司“总公司”，处理类型非“处理中“
				// 新增调用页面archive.html（不可以随意新增）
				isAllowIssue(objResult.ds[0]);

				$("#div-more").show();
				$("#SearchResult").show();
				var remainCout = TotalCount - PageSize;
				if (remainCout < 0)
					remainCout = 0;

				if (remainCout > 0)
					$("#more").html('更多[剩余' + remainCout + '条]');
				else
					$("#more").hide();
				
			} else {
				$("#div-more").hide();
				$("#SearchResult").hide();
				$("#rowcount").html("共搜索到0条数据");

				if (DateDiff('h', MalfunctionDate, Now()) > 24) {
					CanAdd == false;
				} else
					CanAdd == true;
			}

			html.push("</table>");

			$("#SearchResult").html(html.join(''));
			objResult=null,html=null;
		}
	}

	// 查询失败
	function onSearchFault(msg) {};
	
	function jumpArchive(eid, fid) {
		if (canArchive()) {
			if (CanAdd)
				archive(eid, fid);
			else
				alert(NotAddMsg || "不允许归档");
		} else {
			alert("没有归档权限");
			return;
		}
	}
	// 判断是否可以新增，两个条件不可以新增：
	// 1、“故障时间(MalfunctionDate)”超过24小时。
	// 2、最后一条记录所属司“总公司”，处理类型非“处理中“
	// 新增调用页面archive.html（不可以随意新增）
	function isAllowIssue(obj) {
		if (DateDiff('h', MalfunctionDate, Now()) > 24) {
			CanAdd = false;

			NotAddMsg = "不允许归档（故障时间超过24小时";
		}

		if ((obj.company_name || obj.Company_name) == "总公司"
				&& (obj.IssueTypeName || obj.issueTypeName) != "处理中") {
			CanAdd = false;

			if (NotAddMsg.length > 0)
				NotAddMsg = NotAddMsg + "、" + "总部已归档）";
			else
				NotAddMsg = "不允许归档(总部已归档)";
		} else {
			if (NotAddMsg.length > 0)
				NotAddMsg = NotAddMsg + ")";
		}

	}
	function _backToFaultTransmittersIssue() {
		changePage('FaultTransmittersIssue.html?assetnum='
				+ sourceParaObj.DeviceNo + '&starttime='
				+ sourceParaObj.StartTime + '&endtime=' + sourceParaObj.EndTime
				+ '&paindex=' + sourceParaObj.PageIndex);
	}
	return {
		backToFaultTransmittersIssue : function() {
			_backToFaultTransmittersIssue();
		}
	};
})();

function writelog(action, message) {
	var param = {
		"userId" : userid,
		"action" : action,
		"message" : message
	};
	GetAPIData("/api/log/WritePdaLog", JSON.stringify(param), function(data) {
	}, err, null, null, true, false, null);
}


