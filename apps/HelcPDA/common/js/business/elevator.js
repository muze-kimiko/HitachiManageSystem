/**
 * 电梯查询
 */
var ElevatorModule = (function() {
	var PAGE_ID="#elevator",mySwiper =null;
	
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		try {
			PageSetting.PageIndex = 1;

			var deviceNo = getUrlParam('assetnum');

			$('#txtDeviceNo').val(deviceNo);

			if (deviceNo) {
				search(deviceNo);
			}
			// 查询
			$("#btnsearch").on("click", function() {
				PageSetting.reset();
				search($('#txtDeviceNo').val());
			});
			// 下一页
			$("#more").on("click", function() {
				nextPage();
			});

			mySwiper = new Swiper('.swiper-container', {
				pagination : '.pagination',
				vScroll:false,
				resizeReInit : true,  
				calculateHeight:true,  
				calculateHeight:true,
		    });
			
			bindNavEvent();

			setStatues();
			
			setFaultColor();
		} catch (err) {
		}
	});
	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageSetting.reset();
	});
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-activetest").on("click", function() {
			MainMenuExt(30);
		});
		$("#footer-realtime").on("click", function() {
			MainMenuExt2(MainMenuEnum.RemoteMonitor);
			//MainMenuExt(20);
		});
		$("#footer-readdata").on("click", function() {
			MainMenuExt(40);
		});
		$("#footer-faultfile").on("click", function() {
			MainMenuExt(50);
		});
	}
	// 设置按钮状态
	function setStatues() {
		$("#txtDeviceNo").on("tap", function() {
			$("#btnsearch").css({
				"background-color" : "#3388cc",
				"color" : "#fff"
			});
		});
		$("#txtDeviceNo").on("change", function() {
			var deviceNo = $("#txtDeviceNo").val();

			if ($.trim(deviceNo).length > 0) {
				$("#btnsearch").css({
					"background-color" : "#3388cc",
					"color" : "#fff"
				});
			} else {
				$("#btnsearch").removeClass('ui-btn-active');

				$("#btnsearch").removeAttr('background-color');
				$("#btnsearch").css({
					"color" : "#000"
				});
			}
		});
		$("#txtDeviceNo").on("blur", function() {
			var deviceNo = $("#txtDeviceNo").val();

			if ($.trim(deviceNo).length > 0) {
				$("#btnsearch").css({
					"background-color" : "#3388cc",
					"color" : "#fff"
				});
			} else {
				$("#btnsearch").removeClass('ui-btn-active');

				$("#btnsearch").removeAttr('background-color');
				$("#btnsearch").css({
					"color" : "#000"
				});
			}
		});
	}
	// 查询
	function search(key) {
		key = key || "";

		if ($.trim(key).length < 3) {
			alert("查询条件不能少于3位");
			return false;
		}

		$("#SearchResult").html('');
		$("#div-more").hide();
		PageSetting.PageIndex = 1;

		getData(key);
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		var deviceNo = $("#txtDeviceNo").val();

		if ($.trim(deviceNo).length < 3) {
			alert("查询条件不能少于3位");
			return false;
		}

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		getData(deviceNo);
	}
	// 获取数据
	function getData(key) {
		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			OrderBy : "",
			strWhere : "",
			DeviceNo : key
		};
		GetAPIData("/api/Elevators/GetQuickElevatorListExt", JSON
				.stringify(param), onSearchSuccess, null, null, null,
				true, false, null, '正在查询,请稍侯...');
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (!!data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"list\">");
			
			if (objResult && objResult.ds && objResult.ds1[0]
					&& objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push( "<tr>");
					html.push("<td colspan=\"4\" align=\"right\">共搜索到"+objResult.ds1[0].datacount.toString()+"条数据</td>");
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var obj={};
					
					obj.address = item.Address || "";
					obj.id = item.Id || item.ID || item.id;
					obj.deviceNo = item.DeviceNo || "";
					obj.companyName = item.CompanyName || "";
					obj.status=item.IsException == "1" ? "<font style=\"color:red;\">遥监异常</font>": "<font style=\"color:green;\">遥监正常</font>";
					obj.isOnline=item.IsOnline||'0';
					html.push(buildRowItem(obj));
					
					obj=null;
					item=null;
				}
				$("#div-more").show();
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize
						* PageSetting.PageIndex;

				if (remainCout < 0)
					remainCout = 0;

				if (remainCout > 0)
					$("#more").html('更多[剩余' + remainCout + '条]');
				else
					$("#more").hide();
			} else {
				$("#div-more").hide();
				html.push("<tr><td colspan=\"4\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
			html=null;
			
			if ($("#btnsearch")) {
				$("#btnsearch").css({
					"background-color" : "#3388cc",
					"color" : "#fff"
				});
			}
		}
	};
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr height=\"20px\" style=\"cursor:pointer;\" >");
		html.push("<td class=\"chk\" style=\"padding-left:8px;width:22px;border-top:1px solid #ABABAB;\"><input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@id,@deviceNo\"></td>");
		html.push("<td nowrap=\"nowrap\" width=\"30%\" style=\"color:blue;border-top:1px solid #ABABAB;\"><a href=\"#\" onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" data-rel=\"popup\">@deviceNo</a></td>");
		html.push("<td nowrap=\"nowrap\" width=\"30%\" style=\"border-top:1px solid #ABABAB;\"><a href=\"#\" style=\"color:Black;font-weight:normal;\" onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" data-rel=\"popup\">@companyName </a></td>");
		if(obj.isOnline=="0")
			html.push("<td style=\"border-top:1px solid #ABABAB;\">@status<img src=\"images/noonline.png\" style=\"vertical-align:middle;height:20px;width:20px;\"/></td>");
		else
			html.push("<td style=\"border-top:1px solid #ABABAB;\">@status</td>");
		html.push( "</tr>");
		html.push("<tr class=\"oddtr\">");
		html.push("<td colspan=\"4\" style=\"padding-left:8px;line-height: 1.2em;\">@address</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@companyName", 'g'), obj.companyName)
		.replace(new RegExp("@status", 'g'), obj.status)
		.replace(new RegExp("@address", 'g'), obj.address);
		
		return result;
	}
	// 显示电梯详细信息
	function _showDetail(para) {
		try {
			var deviceNo = para.split(',')[1];
			var id = para.split(',')[0];

			var param = {
				"Id" : id,
				"DeviceNo" : deviceNo
			};
			GetAPIData("/api/Elevators/GetElevatorDetial", JSON
					.stringify(param), onGetDetailSuccess, null,
					null, null, true, false, null, '正在加载,请稍侯...');
		} catch (err) {
		}
	}
	// 获取电梯详细信息成功
	function onGetDetailSuccess(data) {
		$("#popupElevatorDetail").css("width", $(window).width());
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			var item = objResult.ds[0];

			if (typeof item != 'undefined') {
				var serviceStartDate = "";
				if (typeof item.ServiceStartDate != 'undefined' && item.ServiceStartDate) {
					serviceStartDate = item.ServiceStartDate.substring(0, 10);
				}

				var serviceEndDate = "";
				if (typeof item.ServiceEndDate != 'undefined' && item.ServiceEndDate) {
					serviceEndDate = item.ServiceEndDate.substring(0, 10);
				}

				$('#lbCityName').html(item.CityName);
				$('#lbCompanyName').html(item.CompanyName);
				$('#lbAddress').html(item.Address);
				$('#lbDeviceNo').html(item.DeviceNo);
				$('#lbMaintenanceName').html(item.MaintenanceName);
				$('#lbStaffName').html(item.StaffName);
				$('#lbModelName').html(item.ModelName);
				$('#lbAGREE_NUM').html(item.AGREE_NUM);
				$('#lbAGREE_TYPE').html(item.AGREE_TYPE);
				$('#lbProjectType').html(item.ItemTypeName);
				$('#lbCustomerName').html(item.CustomerName);
				$('#lbMainTypeName').html(item.MainTypeName);
				$('#lbServiceDate').html(serviceStartDate + " - " + serviceEndDate);
				$('#lbPhone').html(item.Phone);
				$('#lbStaffMobile').html(item.StaffMobile);
				$('#lbCreatedDate').html(item.CreatedDate);
				$('#lbMainVersion').html(item.MainVersion);
				$('#lbSoftVersion').html(item.SoftVersion);

				// 维保状态
				var isService= item.isService || item.IsService;
				
				if (isService) {
					$("#weibao").attr('src', 'images/elevator/zaibao.png');
					$('#lbWeibao').html("在保");
				} else {
					$("#weibao").attr('src', 'images/elevator/weibao.png');
					$('#lbWeibao').html("脱保");
				}
				// 遥监状态
				if (item.IsException == "0") {
					$("#zuangtai").attr('src', 'images/elevator/normal.png');
					$('#lbZuangtai').html("遥监正常");
				} else {
					$("#zuangtai").attr('src', 'images/elevator/unnormal.png');
					$('#lbZuangtai').html("遥监异常");
				}
				// 电梯类型
				if (item.IsElevator) {
					$("#dianti").attr('src', 'images/elevator/zhiti.png');
				} else {
					$("#dianti").attr('src', 'images/elevator/futi.png');
				}
				
				$('#lbDataUpdateTime,#lbDataUpdateTime2').html(item.LastReportUpdateDate || '');
				$('#lbRunTimes').html(item.RunTimes || '');
				$('#lbRunTime').html(item.RunTime || '');
				$('#lbPurpose').html(item.Purpose || '');
				
				var floor='';
				if((item.C ||'')!='')
					floor=item.C+"/"+(item.Z||'');
				
				$('#lbFloor').html(floor);
				$('#lbPZZZ').html(item.PZZZ || '');
				$('#lbMonthFault').html(item.MonthFault || 0);
				$('#lbTroubleFault').html(item.TroubleFault || 0);
				
				if(!item.InspectionDate)
					$("#lbldate").html('技监发证日期');
				
				$('#lbInspectionDate').html(item.InspectionDate || item.TransferDate ||'');
				$('#lbIsElevator').html(item.IsElevator?"直梯":"扶梯");
			}
			item=null;
		}
		
		$("#popupElevatorDetail").popup("open");
		//获取多发故障次数
		getFaultRatio();
		//获取钢丝绳数据
		getWirerope();
		//多发故障
		//getMultipleFaultInfo();
		
		if(mySwiper){
			mySwiper.reInit();
		}
		$(".swiper-slide,.swiper-wrapper.swiper-container").css({height:"200px"});
	};
	//获取多发故障次数
	function getFaultRatio(){
		$("#faultchart").html('');
		var param = {
				"deviceNo" : $('#lbDeviceNo').html()
			};
			GetAPIData("/api/Elevators/GetFaultRatio", JSON
					.stringify(param), onGetFaultRatioSuccess, null,
					null, null, true, false, null, null);
	}
	var faultMapping={
	         FaultTrap:{name:'困人故障',color:'#c78e23'}
			,FaultStart:{name:'不能起动故障',color:'#c85923'}
			,FaultExection:{name:'电源系统异常',color:'#776f66'}
			,FaultStop:{name:'运行中急停',color:'#8f9135'}
			,FaultSafety:{name:'安全装置动作',color:'#4384b2'}
			,FaultRun:{name:'运行故障',color:'#E8A433'}
	};
	
	
	function setFaultColor(){
		$("#lbFaultTrap").css({'background-color':faultMapping.FaultTrap.color});
		$("#lbFaultStart").css({'background-color':faultMapping.FaultStart.color});
		$("#lbFaultExection").css({'background-color':faultMapping.FaultExection.color});
		$("#lbFaultStop").css({'background-color':faultMapping.FaultStop.color});
		$("#lbFaultSafety").css({'background-color':faultMapping.FaultSafety.color});
		$("#lbFaultRun").css({'background-color':faultMapping.FaultRun.color});
	}
	
	
	function onGetFaultRatioSuccess(result){
		var data = [];
		var title='';
		
		if (typeof result != 'undefined' && result) {
			var objResult = eval("(" + result.Data + ")");
			if (objResult && objResult.ds && objResult.ds.length>0){
				var item=objResult.ds[0];
				title=(item.FaultMonth || '').toString();
				data.push({name : '',value :item.FaultTrap,color:faultMapping.FaultTrap.color});
				data.push({name : '',value :item.FaultStart,color:faultMapping.FaultStart.color});
				data.push({name : '',value :item.FaultExection,color:faultMapping.FaultExection.color});
				data.push({name : '',value :item.FaultStop,color:faultMapping.FaultStop.color});
				data.push({name : '',value :item.FaultSafety,color:faultMapping.FaultSafety.color});
				data.push({name : '',value :item.FaultRun,color:faultMapping.FaultRun.color});
			}
		}
		else{
			data.push({name : '',value :0,color:faultMapping.FaultTrap.color});
			data.push({name : '',value :0,color:faultMapping.FaultStart.color});
			data.push({name : '',value :0,color:faultMapping.FaultExection.color});
			data.push({name : '',value :0,color:faultMapping.FaultStop.color});
			data.push({name : '',value :0,color:faultMapping.FaultSafety.color});
			data.push({name : '',value :0,color:faultMapping.FaultRun.color});
		}
		
		var chart = new iChart.Column2D({
			render : 'faultchart',//渲染的Dom目标,canvasDiv为Dom的ID
			data: data,//绑定数据
			title : title,//设置标题多发故障(类别/次数)
			width : $(window).width(),//设置宽度，默认单位为px
			height : 200,//设置高度，默认单位为px
			shadow:true,//激活阴影
			shadow_color:'#c7c7c7',//设置阴影颜色
			/*
			coordinate:{//配置自定义坐标轴
				scale:[{//配置自定义值轴
					 position:'left',//配置左值轴	
					 start_scale:0,//设置开始刻度为0
					 end_scale:26,//设置结束刻度为26
					 scale_space:2,//设置刻度间距
					 listeners:{//配置事件
						parseText:function(t,x,y){//设置解析值轴文本
							return {text:t};
						}
					}
				}]
			}
			*/
		});
		//调用绘图方法开始绘图
		chart.draw();
	};
	//获取钢丝绳数据
	function getWirerope(){
		$("#wirerope").html('');
		var param = {
				"deviceNo" : $('#lbDeviceNo').html()
			};
			GetAPIData("/api/Elevators/GetWirerope", JSON
					.stringify(param), onGetWireropeSuccess, null,
					null, null, true, false, null, null);
	};
	function onGetWireropeSuccess(data){
		var html = [];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			var item=null;
			for (var i = 0, len = objResult.ds.length; i < len; i++) {
				item = objResult.ds[i];
				html.push("<li data-role=\"list-divider\" class=\"ui-li-divider ui-bar-inherit ui-first-child\">"+(item.CreateDate.substring(0,11) ||'')+"</li>");
				html.push("<li>");
				html.push("<p style=\"font-size:15px;\">最大动作楼层:"+ (item.Floor||'') + "</p>");
				html.push("<p style=\"font-size:15px;\">累计弯折次数:"+ (item.Times||'') + "</p>");
				html.push("<p style=\"font-size:15px;\">评估:"+ (item.Assess||'') + "</p>");
				html.push("</li>");
			}
			objResult=null;
			
			if(html.length<=0)
				$("#wirerope").html("<li>暂无记录</li>");
			else
				$("#wirerope").html(html.join(''));
		}
		else{
			$("#wirerope").html("<li>暂无记录</li>");
		}
		html=null;
		
		$("#wirerope").listview( "refresh" );
	};
	function getMultipleFaultInfo(){
		$("#listview-multipleFaultInfo").html('');
		
		var param = {
				FromDateTime:getDay(GetDate(), -1)
				,TimesOver:0
				,TypeID:1
				,Top:5
				,DeviceNo: $('#lbDeviceNo').html()
			};
			GetAPIData("/api/desktop/MultipleInfo", JSON
					.stringify(param), onGetMultipleFaultInfo, null,
					null, null, true, false, null, null);
	};
	function onGetMultipleFaultInfo(data){
		var html = [];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(objResult && objResult.ds && objResult.ds.length>0){
				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];
					html.push("<li class=\"ui-li-static ui-body-inherit ui-li-has-count ui-first-child\">");
					html.push("<p style=\"font-size:15px;\">"+(item.Description||'')+"</p>");
					html.push("<p style=\"font-size:15px;\">"+ (item.CureentDate||'') + "<span class=\"ui-li-count ui-body-inherit\">"+ (item.iTotal||'') + "次 </span></p>");
					html.push("</li>");
				}
				$("#listview-multipleFaultInfo").html(html.join(''));
			}
			else{
				$("#listview-multipleFaultInfo").html("<li>今日暂无记录</li>");
			}
			objResult=null;
		}
		else{
			$("#listview-multipleFaultInfo").html("<li>今日暂无记录</li>");
		}
		$("#listview-multipleFaultInfo").listview( "refresh" );
	};
	
	return {
		showDetail : function(para) {
			_showDetail(para);
		}
	};
})();
/****************新增电梯--从激活调试跳转过来*************************/
function SaveAdd() {
	var assetnum = $("#lbDeviceNo").val();
	var phone = $("#lbPhone").val();
	var building = $("#lbBuilding").val();
	var address = $("#lbAddress").val();
	var terminalPort = $("#lbTerminalPort").val();
	var remark = $("#lbRemark").val();
	var filiale = $("#lbFiliale").val();

	if (assetnum == "") {
		alert("工号为空,保存失败!");
		return false;
	}

	if (phone == "") {
		alert("遥监卡号为空,保存失败!");
		return false;
	}

	if (!isInt(phone)) {
		alert("遥监卡号格式错误,保存失败!");
		return false;
	}

	if (phone.length == 11 || phone.length == 13) {
	} else {
		alert("遥监卡号格式错误,保存失败!");
		return false;
	}

	if (terminalPort == "") {
		alert("端口号为空,保存失败!");
		return false;
	}

	if (!isInt(terminalPort)) {
		alert("端口号格式错误,保存失败!");
		return false;
	}

	if (building == "") {
		alert("地盘名称为空,保存失败!");
		return false;
	}

	if (address == "") {
		alert("电梯位置为空,保存失败!");
		return false;
	}

	var jsonString = {
				"assetnum":assetnum
				,"phone":phone
				,"building":building
				,"terminalport":terminalPort
				,"address":address
				,"filiale":filiale
				,"remark":remark
			};
	
	GetAPIData("/api/elevators/AddElevatorByDeviceNo", JSON.stringify(jsonString),
			fnAddElevatorByDeviceNo, err, null, null, false, false);

}

function fnAddElevatorByDeviceNo(data) {
	if (typeof data != 'undefined' && data) {
		if (data.StatusID == 0) {
			alert('成功导入1条数据!');
			$("#back").click();
		} else {
			alert(data.Message);
		}
	} else {
		alert('保存失败!');
	}
}