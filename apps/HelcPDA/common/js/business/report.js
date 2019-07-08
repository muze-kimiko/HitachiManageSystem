/**
 * 
 */
/** ***********************************运行报表开始***************************************** */
var StatusReport = (function() {
	var PAGE_ID='#StatusReport';
	WLJQ(document).on('pageshow', PAGE_ID, pageShow);
	
	function pageShow() {
		try {
			back("StatusReport-back", "StatusReport-external-back");

			PageSetting.PageIndex = 1;

			$("#btnsearch").on("click", function() {
				PageSetting.PageIndex = 1;
				search();
			});
			$("#more").on("click", function() {
				nextPage();
			});

			var preDay = getDay(GetDate(), -1);
			$("#tip").html("数据同步于" + preDay + "，仅供参考");
		} catch (err) {
		}
	}
	// 查询
	function search() {
		var days = $("#select-choice-period").val();
		var Percent = $("#select-choice-mini").val();
		var filiale = $("#txtFiliale").val();

		if (typeof days != 'undefined' && days != "") {
			var currDate = GetDate();
			var preDate = getDay(currDate, -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";

			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : "",
				StartTime : StartTime,
				EndTime : EndTime,
				Percent : Percent,
				Filiale : filiale
			};
			GetAPIData("/api/elevators/GetStatusDataExt", JSON.stringify(param),
					onSearchSeccess, err, null, null, true, false, null,
					'正在查询,请稍侯...');
		}
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		search();
	}
	// 查询成功
	function onSearchSeccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var ds1 = objResult.ds1[0];

			html.push("<table class=\"yunxingtongji\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
			if (objResult.ds != 'undefined' && objResult.ds && ds1 && ds1.datacount) {
				if (PageSetting.PageIndex <= 1) {
					$("#SearchResult").html('');
					PageSetting.PageIndex = 1;

					PageSetting.TotalCount = ds1.datacount;
					
					var InServiceCount=parseInt(ds1.InServiceCount);
					var NormalWatchCount=parseInt(ds1.NormalWatchCount);
					var MonitorPercent = ds1.MonitorPercent;
					var NormalWatchIncrement=parseInt(ds1.NormalWatchIncrement);

					html.push("<tr bgcolor=\"#F68C1F\" style=\"color:#FFF;\">");
					html.push("<td nowrap=\"nowrap\" style=\"padding-left:5px;\">正常监控台量"+ NormalWatchCount + "</td>");
					html.push("<td nowrap=\"nowrap\" >正常监控比例"+ Math.round(MonitorPercent) + "%</td>");
					html.push("</tr>");
					html.push("<tr bgcolor=\"#F68C1F\" style=\"color:#FFF;\">");
					html.push("<td nowrap=\"nowrap\" style=\"padding-left:5px;\">在保台量"+ InServiceCount + "</td>");
					html.push("<td nowrap=\"nowrap\">正常监控量增长"+ NormalWatchIncrement + "台</td>");
					html.push("</tr>");
				}

				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					/*
					var obj={
							filialeName:item.分公司 || ""
							,inStoct:item.入库台量 || "0"
							,hasActive:item.激活台量||"0" 
							,inStoctPercent:item.入库台量增幅|| "0"
							,normalCount:item.正常监视台量|| "0"
							,normalCountRate:item.正常监控比例|| "0%"
							,key:"debugcount"+ ((i + 1) + (PageSetting.PageIndex - 1) * 10)
							,inServiceCount:item.InServiceCount|| "0"
					};
					*/
					var obj={
							 filialeName:item.Filiale || ""
							,inServiceCount:item.InServiceCount || "0"
							,normalWatchCount:item.NormalWatchCount||"0" 
							,monitorPercent:item.MonitorPercent|| "0"
							,normalWatchIncrement:item.NormalWatchIncrement|| "0"
							,key:"debugcount"+ ((i + 1) + (PageSetting.PageIndex - 1) * 10)
					};
					
				    html.push(buildRowItem(obj));
				    
				    obj=null,item=null;
				}
				$("#div-more").show();
			} else {
				$("#SearchResult").html('');
				$("#datacount").html(0);
				PageSetting.PageIndex = 1;
				$("#div-more").hide();
				$("#popupNodata").popup("open");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));

			var h = tongjiTitle.clientHeight;
			$("#SearchResult").css("margin-top", h);
			html=null;

			if (objResult.ds != 'undefined' && objResult.ds && ds1
					&& ds1.datacount) {
				for (var i = 0, len2 = objResult.ds.length; i < len2; i++) {
					var item2 = objResult.ds[i];

					var index = ((i + 1) + (PageSetting.PageIndex - 1) * 10);

					$('#debugcount' + index).circliful({
						percent : Math.round(item2.MonitorPercent),
						foregroundColor : '#75db3c',
						foregroundBorderWidth : 5,
						backgroundBorderWidth : 5,
						fillColor : '#f9eeec'
					});
				}
			}
		}
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr>");
		html.push("<td colspan=\"2\" style=\"padding-left:8px;\">@filialeName</td>");
		html.push("</tr>");
		html.push("<tr  >");
		html.push("<td style=\"padding-left:8px;\">正常监控台量<font  style=\"color:#06C;padding-left:2px;\">@normalWatchCount</font></td>");
		html.push("<td style=\"vertical-align:middle;\">");
		html.push("<table><tr><td>正常监控比例</td><td><div id=\"@key\" style=\"width:50px;height:50px;\"></div></td></tr></table>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr style=\"border-bottom:1px solid #CCC\">");
		html.push("<td style=\"padding-left:8px;\">在保台量<font style=\"color:#06C;\">@inServiceCount</font></td>");
		html.push("<td>正常监控台量增长<font style=\"color:#06C;padding-left:2px;\">@normalWatchIncrement</font></td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@filialeName", 'g'), obj.filialeName)
		.replace(new RegExp("@normalWatchCount", 'g'), obj.normalWatchCount)
		.replace(new RegExp("@normalWatchIncrement", 'g'), obj.normalWatchIncrement)
		.replace(new RegExp("@inServiceCount", 'g'), obj.inServiceCount)
		.replace(new RegExp("@key", 'g'), obj.key);
		
		return result;
	}
	
	return {};
})();
/** ********************************运行报表结束***************************************** */


/** ********************************故障统计报表开始***************************************** */
var FaultReport = (function() {
	var PAGE_ID='#FaultReport';
	var Paras = {
		filiale : "",
		building : "",
		days : -1,
		chkFault : 0
	};
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("FaultReport-back", "FaultReport-external-back");

			PageSetting.PageIndex = 1;

			var preDay = getDay(GetDate(), -7);
			var endDay = getDay(GetDate(), -1);
			var html = "数据源: " + FormatDate(preDay) + " - "
					+ FormatDate(endDay);
			$("#tip").html(html);

			$("#btnsearch").on("click", function() {
				search();
			});

			$("#more").on("click", function() {
				nextPage();
			});

			$("#home").on("click", function() {
				Paras.filiale = "";
				Paras.building = "";
				Paras.days = -1;
				Paras.chkFault = 0;
				home(4);
			});

			if (Paras.filiale || Paras.days >= 0 || Paras.chkFault) {
				$("#txtFiliale").val(Paras.filiale);
				$("#txtBuilding").val(Paras.building);
				$("#days").val(Paras.days);
				$("#chkFault").attr("checked", !!Paras.chkFault);
				search();
			}
		} catch (err) {
		}
	}
	// 查询
	function search() {
		var days = $("#days").val();
		var filiale = $("#txtFiliale").val();
		var building = $("#txtBuilding").val();
		Paras.filiale = filiale;
		Paras.building = building;
		Paras.days = days;

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(currDate, -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
				Paras.chkFault = 1;
			} else {
				isFault = 0;
				Paras.chkFault = 0;
			}

			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : "",
				StartTime : StartTime,
				EndTime : EndTime,
				IsFault : isFault,
				Filiale : filiale,
				Building : building,
				actionType : "0"
			};
			GetAPIData("/api/elevators/GetFaultCountExt",
					JSON.stringify(param), onSearchSuccess, onSearchFault,
					null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		search();
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			html.push("<table class=\"yunxingtongji\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
			if (objResult.ds != 'undefined' && objResult.ds && objResult.ds1[0]
					&& objResult.ds1[0].datacount) {

				if (PageSetting.PageIndex <= 1) {
					$("#SearchResult").html('');

					PageSetting.PageIndex = 1;

					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr style=\"border-bottom:1px dashed #88A4BC;background-color:#1497fc;\">");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-left:5px;\">分公司</td>");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-right:5px;\">故障次数</td>");
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

				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var obj={
							filialeName:item.FilialeName || ""
							,quantity:item.Quantity||"" 
					};
				    html.push(buildRowItem(obj));
				    
				    obj=null,item=null;
				}
				$("#div-more").show();
			} else {
				$("#SearchResult").html('');
				$("#datacount").html(0);
				PageSetting.PageIndex = 1;
				$("#div-more").hide();
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
			var h = tongjiTitle.clientHeight;
			$("#SearchResult").css("margin-top", h);
			html=null;
		}
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"border-bottom:1px dashed #88A4BC;\">");
		html.push("<td align=\"center\" style=\"color:#666;padding-left:5px;\">");
		html.push("<a href=\"javascript:void(0)\" onclick=\"FaultReport.showChildrenReport('@filialeName','@quantity')\">@filialeName</a>");
		html.push("</td>");
		html.push("<td align=\"center\" style=\"color:#F58C1E;padding-right:5px;\">@quantity</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@filialeName", 'g'), obj.filialeName)
		.replace(new RegExp("@quantity", 'g'), obj.quantity);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	}
	// 跳转到楼般报表
	function _showChildrenReport(filiale, quantity) {
		var days = $("#days").val();

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
			}

			changePage("FaultFilialeReport.html?action=search&starttime="
					+ encodeURIComponent(StartTime) + "&endtime="
					+ encodeURIComponent(EndTime) + "&isfault=" + isFault
					+ "&filiale=" + encodeURIComponent(filiale) + "&quantity="
					+ encodeURIComponent(quantity) + "&days=" + days);
		}
	}
	return {
		showChildrenReport : function(building, quantity) {
			_showChildrenReport(building, quantity);
		}
	};
})();
//
var FaultFilialeReport = (function() {
	var PAGE_ID='#FaultFilialeReport';
	var Paras = {
		filiale : "",
		building : "",
		days : -1,
		chkFault : 0
	};
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("FaultFilialeReport-back",
					"FaultFilialeReport-external-back");

			PageSetting.PageIndex = 1;

			var preDay = getUrlParam('starttime').replace(" 00:00:00",
					"");
			var endDay = getUrlParam('endtime')
					.replace(" 23:59:59", "");
			var html = "数据源: " + FormatDate(preDay) + " - "
					+ FormatDate(endDay);
			$("#tip").html(html);

			var filiale = getUrlParam('filiale');
			$("#lbFiliale").html(filiale);

			var days = getUrlParam('days');
			var isfault = getUrlParam('isfault');

			Paras.filiale = filiale;
			Paras.days = days;
			Paras.chkFault = isfault;

			$("#days").val(days);
			$("#txtFiliale").val(filiale);

			var quantity = getUrlParam('quantity');
			$("#lbQuantity").html(
					'故障次数      <span style="color:#F58C1E;">'
							+ quantity + '</span>');

			$("#btnsearch").on("click", function() {
				search();
			});

			$("#more").on("click", function() {
				nextPage();
			});

			$("#home").on("click", function() {
				Paras.filiale = "";
				Paras.building = "";
				Paras.days = -1;
				Paras.chkFault = 0;
				home(4);
			});

			if (Paras.filiale || Paras.days >= 0 || Paras.chkFault) {
				$("#txtFiliale").val(Paras.filiale);
				$("#txtBuilding").val(Paras.building);
				$("#days").val(Paras.days);
				$("#chkFault").attr("checked", Paras.chkFault != 0);
				search();
			}
		} catch (err) {
		}
	}
	// 查询
	function search() {
		var days = $("#days").val();
		var filiale = $("#txtFiliale").val();
		var building = $("#txtBuilding").val();
		Paras.filiale = filiale;
		Paras.building = building;
		Paras.days = days;

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
				Paras.chkFault = 1;
			} else {
				isFault = 0;
				Paras.chkFault = 0;
			}

			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : "",
				StartTime : StartTime,
				EndTime : EndTime,
				IsFault : isFault,
				Filiale : filiale,
				Building : building,
				actionType : "1"
			};
			GetAPIData("/api/elevators/GetFaultCountExt",
					JSON.stringify(param), onSearchSuccess, onSearchFault,
					null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		search();
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			html.push("<table class=\"yunxingtongji\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
			if (objResult.ds != 'undefined' && objResult.ds && objResult.ds1[0]
					&& objResult.ds1[0].datacount) {

				if (PageSetting.PageIndex <= 1) {
					$("#SearchResult").html('');
					PageSetting.PageIndex = 1;

					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr style=\"border-bottom:1px dashed #88A4BC;background-color:#1497fc;\">");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-left:5px;\">地盘</td>");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-right:5px;\">故障次数</td>");
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

				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var obj={
							buildingName:item.BuildingName || ""
							,quantity:item.Quantity||"" 
					};
				    html.push(buildRowItem(obj));
				    
				    obj=null,item=null;
				}
				$("#div-more").show();
			} else {
				$("#SearchResult").html('');
				$("#datacount").html(0);
				PageSetting.PageIndex = 1;
				$("#div-more").hide();
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));

			var h = tongjiTitle.clientHeight;
			$("#SearchResult").css("margin-top", h);
			html=null;
		}
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"border-bottom:1px dashed #88A4BC;\">");
		html.push("<td align=\"center\" style=\"color:#666;padding-left:5px;\">");
		html.push("<a href=\"javascript:void(0)\" onclick=\"FaultFilialeReport.showChildrenReport('@buildingName','@quantity')\">@buildingName</a></td>");
		html.push("<td align=\"center\" style=\"color:#F58C1E;padding-right:5px;\">@quantity</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@buildingName", 'g'), obj.buildingName)
		.replace(new RegExp("@quantity", 'g'), obj.quantity);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	}
	// 跳转到楼般报表
	function _showChildrenReport(building, quantity) {
		var days = $("#days").val();
		var filiale = $("#txtFiliale").val();

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
			}

			changePage("FaultBuildingReport.html?action=search&starttime="
					+ encodeURIComponent(StartTime) + "&endtime="
					+ encodeURIComponent(EndTime) + "&isfault=" + isFault
					+ "&filiale=" + encodeURIComponent(filiale) + "&building="
					+ encodeURIComponent(building) + "&quantity="
					+ encodeURIComponent(quantity) + "&days=" + days);
		}
	}
	return {
		showChildrenReport : function(building, quantity) {
			_showChildrenReport(building, quantity);
		}
	};
})();
//
var FaultBuildingReport = (function() {
	var PAGE_ID='#FaultBuildingReport';
	var Paras = {
		filiale : "",
		building : "",
		elevator : "",
		days : -1,
		chkFault : 0
	};
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("FaultBuildingReport-back",
					"FaultBuildingReport-external-back");

			PageSetting.PageIndex = 1;

			var preDay = getUrlParam('starttime').replace(" 00:00:00",
					"");
			var endDay = getUrlParam('endtime')
					.replace(" 23:59:59", "");
			var html = "数据源: " + FormatDate(preDay) + " - "
					+ FormatDate(endDay);
			$("#tip").html(html);

			var filiale = getUrlParam('filiale');
			var building = getUrlParam('building');
			$("#lbFiliale").html(filiale);
			$("#lbBuilding").html(building);

			var days = getUrlParam('days');
			var isfault = getUrlParam('isfault');

			Paras.filiale = filiale;
			Paras.building = building;
			Paras.days = days;
			Paras.chkFault = isfault;

			$("#days").val(days);
			$("#txtFiliale").val(filiale);

			var quantity = getUrlParam('quantity');
			$("#lbQuantity").html(
					'故障次数      <span style="color:#F58C1E;">'
							+ quantity + '</span>');

			$("#btnsearch").on("click", function() {
				search();
			});

			$("#more").on("click", function() {
				nextPage();
			});

			$("#home").on("click", function() {
				Paras.filiale = "";
				Paras.building = "";
				Paras.days = -1;
				Paras.chkFault = 0;
				home(4);
			});

			if (Paras.filiale || Paras.days >= 0 || Paras.chkFault) {
				$("#txtFiliale").val(Paras.filiale);
				$("#txtBuilding").val(Paras.building);
				$("#days").val(Paras.days);
				$("#chkFault").attr("checked", Paras.chkFault != 0);
				search();
			}
		} catch (err) {
		}
	}
	// 查询
	function search() {
		var days = $("#days").val();
		var filiale = $("#txtFiliale").val();
		var building = $("#txtBuilding").val();
		var elevator = $("#txtElevator").val();
		Paras.filiale = filiale;
		Paras.building = building;
		Paras.elevator = elevator;
		Paras.days = days;

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
				Paras.chkFault = 1;
			} else {
				isFault = 0;
				Paras.chkFault = 0;
			}

			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : "",
				StartTime : StartTime,
				EndTime : EndTime,
				IsFault : isFault,
				Filiale : filiale,
				Building : building,
				DeviceNo : elevator,
				actionType : "2"
			};
			GetAPIData("/api/elevators/GetFaultCountExt",
					JSON.stringify(param), onSearchSuccess, onSearchFault,
					null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		search();
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			html.push("<table class=\"yunxingtongji\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
			if (objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					$("#SearchResult").html('');
					PageSetting.PageIndex = 1;

					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr style=\"border-bottom:1px dashed #88A4BC;background-color:#1497fc;\">");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-left:5px;white-space: nowrap;\">工号</td>");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-left:5px;white-space: nowrap;\">位置</td>");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-right:5px;white-space: nowrap;\">故障次数</td>");
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

				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];

					var obj={
							deviceNo:item.DeviceNo || ""
							,installSite:item.InstallSite ||""
							,quantity:item.Quantity || ""
					};
					
					html.push(buildRowItem(obj));
					obj=null,item=null;
				}
				$("#div-more").show();
			} else {
				$("#SearchResult").html('');
				$("#datacount").html(0);
				PageSetting.PageIndex = 1;
				$("#div-more").hide();
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));

			var h = tongjiTitle.clientHeight;
			$("#SearchResult").css("margin-top", h);
			html=null;

		}
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"border-bottom:1px dashed #88A4BC;\">");
		html.push("<td align=\"center\" style=\"color:#666;padding-left:5px;\">");
		html.push("<a href=\"javascript:void(0)\" onclick=\"FaultBuildingReport.showChildrenReport('@deviceNo','@quantity','@installSite')\">@deviceNo</a>");
		html.push("</td>");
		html.push("<td align=\"center\" style=\"color:#F58C1E;padding-right:5px;\">@installSite</td>");
		html.push("<td align=\"center\" style=\"color:#F58C1E;padding-right:5px;\">@quantity</td>");
		html.push("</tr>");
		var result=html.join('').replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@quantity", 'g'), obj.quantity)
		.replace(new RegExp("@installSite", 'g'), obj.installSite);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	}
	// 跳转到楼般报表
	function _showChildrenReport(elevator, quantity, installsite) {
		var days = $("#days").val();
		var building = $("#txtBuilding").val();
		var filiale = $("#txtFiliale").val();

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
			}

			changePage("FaultElevatorReport.html?action=search&starttime="
					+ encodeURIComponent(StartTime) + "&endtime="
					+ encodeURIComponent(EndTime) + "&isfault=" + isFault
					+ "&filiale=" + encodeURIComponent(filiale) + "&building="
					+ encodeURIComponent(building) + "&elevator="
					+ encodeURIComponent(elevator) + "&quantity="
					+ encodeURIComponent(quantity) + "&days=" + days
					+ "&installsite=" + encodeURIComponent(installsite));
		}
	}
	return {
		showChildrenReport : function(elevator, quantity, installsite) {
			_showChildrenReport(elevator, quantity, installsite);
		}
	};
})();

var FaultElevatorReport = (function() {
	var PAGE_ID='#FaultElevatorReport';
	var Paras = {
		filiale : "",
		building : "",
		elevator : "",
		malfunction : "",
		days : -1,
		chkFault : 0
	};
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("FaultElevatorReport-back","FaultElevatorReport-external-back");

			PageSetting.PageIndex = 1;

			var preDay = getUrlParam('starttime').replace(" 00:00:00","");
			var endDay = getUrlParam('endtime').replace(" 23:59:59", "");
			var html = "数据源: " + FormatDate(preDay) + " - "+ FormatDate(endDay);
			$("#tip").html(html);

			var filiale = getUrlParam('filiale');
			var building = getUrlParam('building');
			var elevator = getUrlParam('elevator');
			var installsite = getUrlParam('installsite');
			$("#lbFiliale").html(elevator);
			$("#lbInstallsite").html(installsite);

			var days = getUrlParam('days');
			var isfault = getUrlParam('isfault');

			Paras.filiale = filiale;
			Paras.building = building;
			Paras.elevator = elevator;
			Paras.days = days;
			Paras.chkFault = isfault;

			$("#days").val(days);
			$("#txtFiliale").val(filiale);

			var quantity = getUrlParam('quantity');
			$("#lbQuantity").html(
					'故障次数      <span style="color:#F58C1E;">'
							+ quantity + '</span>');

			$("#btnsearch").on("click", function() {
				search();
			});

			$("#more").on("click", function() {
				nextPage();
			});

			$("#home").on("click", function() {
				Paras.filiale = "";
				Paras.building = "";
				Paras.elevator = "";
				Paras.malfunction = "";
				Paras.days = -1;
				Paras.chkFault = 0;
				home(4);
			});

			if (Paras.filiale || Paras.days >= 0 || Paras.chkFault) {
				$("#txtFiliale").val(Paras.filiale);
				$("#txtBuilding").val(Paras.building);
				$("#txtElevator").val(Paras.elevator);
				$("#txtMalfunction").val(Paras.malfunction);
				$("#days").val(Paras.days);
				$("#chkFault").attr("checked", Paras.chkFault != 0);
				search();
			}

		} catch (err) {
		}
	}
	// 查询
	function search() {
		var days = $("#days").val();
		var filiale = $("#txtFiliale").val();
		var building = $("#txtBuilding").val();
		var elevator = $("#txtElevator").val();
		var malfunction = $("#txtMalfunction").val();
		Paras.filiale = filiale;
		Paras.building = building;
		Paras.elevator = elevator;
		Paras.malfunction = malfunction;
		Paras.days = days;

		if (typeof days != 'undefined' && days != "") {
			var currDate = getDay(GetDate(), -1);
			var preDate = getDay(GetDate(), -days);

			var StartTime = preDate + " 00:00:00";
			var EndTime = currDate + " 23:59:59";
			var isFault = 0;

			if ($("#chkFault").is(':checked')) {
				isFault = 1;
				Paras.chkFault = 1;
			} else {
				isFault = 0;
				Paras.chkFault = 0;
			}

			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex-1>0?PageSetting.PageIndex-1:0,
				strOrder : "",
				StartTime : StartTime,
				EndTime : EndTime,
				IsFault : isFault,
				Filiale : filiale,
				Building : building,
				DeviceNo : elevator,
				Malfunction : malfunction,
				actionType : "3"
			};
			/*
			GetAPIData("/api/elevators/GetFaultCountExt",
					JSON.stringify(param), onSearchSuccess, onSearchFault,
					null, null, true, false, null, '正在查询,请稍侯...');
			*/
			GetAPIData("/api/elevators/GetFaultTypeCount",
					JSON.stringify(param), onSearchSuccess, onSearchFault,
					null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		search();
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(PageSetting.PageIndex<=1)
				html.push("<table class=\"yunxingtongji\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");

			if (objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					$("#SearchResult").html('');
					PageSetting.PageIndex = 1;

					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr style=\"border-bottom:1px dashed #88A4BC;background-color:#1497fc;\">");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-left:5px;\">故障类别</td>");
					html.push("<td align=\"center\" style=\"color:#ffffff;padding-right:5px;\">故障次数</td>");
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

				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var desc="【"+item.MalfunctionName+(item.MainFaultCode ||'0')+"\\"+(item.SubFaultCode||'0')+"】";
					var obj={malfunctionName:desc,quantity:item.Quantity};
					
					html.push(buildRowItem(obj));
					obj=null,item=null;
				}
				
				$("#div-more").show();
			} else {
				$("#SearchResult").html('');
				$("#datacount").html(0);
				PageSetting.PageIndex = 1;
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
				
				$("#div-more").hide();
			}
			
			if(PageSetting.PageIndex<=1)
				html.push("</table>");
			
			if(PageSetting.PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
			

			var h = tongjiTitle.clientHeight;
			$("#SearchResult").css("margin-top", h);
			html=null;
		}
	}
	function buildRowItem(obj){
		var html=[];
		html.push("<tr style=\"border-bottom:1px dashed #88A4BC;\">");
		html.push("<td align=\"center\" style=\"color:#000;padding-left:5px;\">@malfunctionName</td>");
		html.push("<td align=\"center\" style=\"color:#000;padding-right:5px;\">@quantity</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@malfunctionName", 'g'), obj.malfunctionName)
		.replace(new RegExp("@quantity", 'g'), obj.quantity);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	}
})();
/** ********************************故障统计报表结束***************************************** */
