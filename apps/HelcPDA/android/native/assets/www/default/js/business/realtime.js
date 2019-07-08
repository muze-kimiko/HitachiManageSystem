
/* JavaScript content from js/business/realtime.js in folder common */
/**
 * 
 */
WLJQ(document).on('pagehide', '#realtime', function() {
	try {
		connectCount=0;
		discon(1, false);
	} catch (err) {
	}
});
WLJQ(document).on('pageshow','#realtime',function() {
	try {
		var popupWidth=document.body.clientWidth * 0.85;
		$("#popupDialog").css("width",popupWidth);
		$("#popupConnectDialog").css("width",popupWidth);
		back("realtime-back", "realtime-external-back");

		$("#btnback").on("click", function() {
			$("#popupElevatorDetail").popup("close");
		});
		$("#btnSave").on("click", function() {
			SaveElevator();
		});

		$("#footer-activetest").on("click", function() {
			MainMenu(10);
		});
		$("#footer-readdata").on("click", function() {
			MainMenu(40);
		});
		$("#footer-faultfile").on("click", function() {
			MainMenu(50, getUrlParam('assetnum'));
		});
		$("#footer-favorite").on("click",function() {
			FavoriteGroupModule.getAll(null);
		});
		
		$("#btnCancel").on("click",function(){
			$("#popupFavoriteGroupDialog").popup("close");
		});
		
		$("#btnFavorite").on("click",function(){
			addFavorite();
		});
		
		//新增
		$("#btnAddGroup").on("click",function(){
			$("#popupFavoriteGroupDialog").popup("close");
			$("#txtGroupName").val('');
			setTimeout('$("#AddGroupUI").popup("open")', 30) ;
		});
		
		$("#btn-add-Save").on("click",function(){
			FavoriteGroupModule.add($("#txtGroupName").val(),onAddGroupSuccess);
		});
		$("#btn-add-cancel").on("click",function(){
			$("#AddGroupUI").popup("close");
		});
		
		eid = "";
		var assetnum = getUrlParam('assetnum');
		if (assetnum != "") {
			getelevatorinfo(assetnum);
		}
	} catch (err) {
	}
});
function SaveElevator() {

	try {
		var assetnum = $("#lbDeviceNo2").html()
		,phone = $("#lbPhone2").html()
		,activeCode = $("#lbActiveCode2").html()
		,terminalPort = $("#lbTerminalPort2").html()
		,remark = $("#lbRemark2").val()
		,installSite = $("#lbAddress2").val();
		
		if (assetnum == "") {
			alert("工号为空,保存失败!");
			return false;
		}

		try {
			var jsonString = { 
					 "assetnum": assetnum 
					,"phone": phone
					,"activecode":  activeCode
					,"terminalport":  terminalPort
					,"remark":remark
					,"installSite":installSite
			};
			GetAPIData("/api/elevators/UpdateElevatorByDeviceNo",
					JSON.stringify(jsonString), fnUpdateElevatorByDeviceNo, err, null,
					null, true, false, null, '保存中,请稍侯...');
			return true;
		} catch (err) {
			alert(err);
			return false;
		}
	} catch (err) {
		alert(err);
		return false;
	}
}

function addFavorite(){
	var deviceNo = $('#lbElevator').html()
	,building = $('#lbBuilding').html()
	,installSite = $('#lbAddress').html()
	,filiale = $('#hidFiliale').html()
	,maintenance = $('#hidMaintenance').html()
	,fid = "realtime"
	,sid = "realtime.html"+ window.location.search;

	if (!deviceNo) {
		alert("请选择要收藏的电梯！");
		return;
	}
	
	/*
	var objArr = new Array();
	var obj;

	obj = new Object();
	obj.SId = sid;
	obj.DeviceNo = deviceNo;
	obj.Building = building;
	obj.InstallSite = installSite;
	obj.Filiale = filiale;
	obj.Maintenance = maintenance;
	obj.Fid = fid;
	obj.Uid = userid;
	*/
	
	var objArr = [];
	var obj={
		SId : sid,
		DeviceNo : deviceNo,
		Building : building,
		InstallSite : installSite,
		Filiale : filiale,
		Maintenance : maintenance,
		Fid : fid,
		Uid : userid
	};

	objArr.push(obj);
	obj=null;
	
	var groupId='' ;
	$("input[name='chkgroup']:checked").each(function() {
		var paraArr = this.value.split(',');
		groupId = paraArr[0];
		return false;
	});

	if(groupId==''){
		alert('请选择收藏组。');
		return;
	}
		
	FavoriteModule.add2(objArr,groupId, null);
	
	objArr=null;
}
// 新增成功
function onAddGroupSuccess(result) {
	hideLoader();
	if(result){
		if(result.StatusID==0){
			$("#AddGroupUI").popup("close");
			alert(result.Message);
			FavoriteGroupModule.getAll(null);
		}
		else{
			alert(result.Message);
		}
	}
};
function getelevatorinfo(assetnum) {
	var data = '{"assetnum":"' + assetnum + '"}';
	GetAPIData("/api/elevators/GetElevatorInfoExt", data, fnElevatorInfo,
			err, null, null, true, false, null, '正在加载,请稍侯...');
}

function fnElevatorInfo(data) {
	if (data) {
		var objResult = JSON.parse(data.Data);
		if (objResult && objResult.ds && objResult.ds[0]) {
			var obj=objResult.ds[0];
			
			var buildingNameLen = (!obj.BuildingName) ? 0: obj.BuildingName.replace(new RegExp(',','gm'), '').length
				,installSiteLen = (!obj.InstallSite) ? 0: obj.InstallSite.replace(new RegExp(',','gm'), '').length;

			var h = calculateHeaderHeight(buildingNameLen, installSiteLen);

			$("#content").css({"padding-top" : h});

			if (obj.IsElevator) {
				MonitorModule.ElevatorType = 1;
				$("#div-zhiti").show();
				$("#divElevator").css({background:"url(images/lift_close.png)"});
				//document.getElementById("divElevator").style.background = 'url(images/lift_close.png)';
			} else {
				MonitorModule.ElevatorType = 0;
				$("#div-zhiti").hide();
				$("#divElevator").css({background:"url(images/lift_futi_stop.png)"});
				//document.getElementById("divElevator").style.background = 'url(images/lift_futi_stop.png)';
			}

			$('#lbElevator').html(obj.DeviceNo||'');
			$('#lbBuilding').html(obj.BuildingName||'');
			$('#lbAddress').html(obj.InstallSite||'');

			$('#hidFiliale').html(obj.Filiale||'');
			$('#hidMaintenance').html(obj.MaintenanceName || '');

			var date = "",time = "",dateArr=null,timeArr=null;

			if (obj.LastContactDate) {
				date = obj.LastContactDate.split(' ')[0];
				dateArr=date.split('-');
				date = dateArr[0] + '年' + dateArr[1] + '月'+ dateArr[2] + '日';

				time = obj.LastContactDate.split(' ')[1];
				timeArr=time.split(':');
				
				var hour = timeArr[0]
				,mi = timeArr[1]
				,sc = timeArr[2]
				,hourArr=CommonModule.formatTime(hour).split(',')
				,miArr=CommonModule.formatTime(mi).split(',')
				,scArr=CommonModule.formatTime(sc).split(',');
				
				$("#time-hour-shi").html(hourArr[0]);
				$("#time-hour-ge").html(hourArr[1]);
				
				$("#time-minute-shi").html(miArr[0]);
				$("#time-minute-ge").html(miArr[1]);
				
				$("#time-second-shi").html(scArr[0]);
				$("#time-second-ge").html(scArr[1]);
				 
				 hourArr=null,miArr=null,scArr=null
				,hour=null,mi=null,sc=null;
			}
			
			$('#lbLastContactDate').html(date);
			
			date = null,time = null,dateArr=null,timeArr=null;

			eid = obj.Id;
			//楼层
			if (objResult.Table1 && objResult.Table1[0]) {
				var statusObj=objResult.Table1[0];
				
				$('#Mcstatus').html(statusObj.StatusHTML||'');
				
				if (statusObj.Floor) {
					floorTable =JSON.parse("{" + statusObj.Floor+ "}");
				}
			}
			//刷新数据
			if (eid != "") {
				$.connection.hub.url = baseurl + "/signalr";
				$.connection.hub.logging = true;
				chat = $.connection.realTimeHub;
				chat.client.sendMessge = function(message) {
					if (isStart) {
						if(MonitorModule.Timer.ReconectTimeoutId){
							clearTimeout(MonitorModule.Timer.ReconectTimeoutId);
							MonitorModule.Timer.ReconectTimeoutId=0;
						}
						MonitorModule.IsConnected = true;
						fnRealtimedata(message);
					}
				};
				//sendcmd();
				askConnect();
				MonitorModule.Timer.CheckOnlineTimeoutId = setInterval(
						CheckOnline, 5000);
			}
			obj=null;
		}
		objResult=null;
	}
}
WLJQ(document).on('pageshow','#search',function() {
	$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress,#txtPhone").on("tap", function() {
		$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
	});
	$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress,#txtPhone").on("change",function() {
		if ($.trim($("#txtDeviceNo").val()).length > 0
				|| $.trim($("#txtCompany").val()).length > 0
				|| $.trim($("#txtBuilding").val()).length > 0) 
		{
			$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
		} else {
			$("#btnsearch").removeClass('ui-btn-active');
			$("#btnsearch").removeAttr('background-color');
			$("#btnsearch").css({"color" : "#000"});
		}
	});
	$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress,#txtPhone").on("blur",function() {
		if ($.trim($("#txtDeviceNo").val()).length > 0
				|| $.trim($("#txtCompany").val()).length > 0
				|| $.trim($("#txtBuilding").val()).length > 0) 
		{
			$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
		} else {
			$("#btnsearch").removeClass('ui-btn-active');
			$("#btnsearch").removeAttr('background-color');
			$("#btnsearch").css({
				"color" : "#000"
			});
		}
	});

	initSearch('txtDeviceNo');
});
//计算实时监控页面，电梯基本信息的高度
function calculateHeaderHeight(BuildingNameLen, InstallSiteLen) {
	var height = 140;
	var baseHeigth = 160;

	var bl = Math.ceil(BuildingNameLen / 12);

	if (InstallSiteLen / 12 > 2) {
		if (InstallSiteLen / 12 != 0)
			height = baseHeigth
					+ (Math.floor(InstallSiteLen / 12) - 2 + 1 + (bl - 1))
					* 20;
		else
			height = baseHeigth
					+ (Math.floor(InstallSiteLen / 12) - 2 + (bl - 1)) * 20;
	} else {
		height = baseHeigth + (bl - 1) * 20;
	}
	return height + "px";

}

function onUpdateSuccess(data) {
	if (typeof data != 'undefined' && data) {
		if (data.Data.toLowerCase() == 'true') {
			alert('保存成功!');
		} else {
			alert('保存失败!');
		}
	}
}
function sendcmd() {
	if ($.connection.hub.state != 1) {
		$.connection.hub.start().done(function() {
			var ids = eid;
			chat.server.add(ids);
		}).fail(function(e) {
			alert("温馨提示:无法连接服务器!");
		});
		;
	}
	var jsonString = {"elevatorid": eid ,"userid":userId};
	
	GetAPIData("/api/ajax/StartUploadReal", JSON.stringify(jsonString), onStartMonitor,err, null, null, false, false);
	document.getElementById("imgCom").src = "images/shishijiankong/wifi-orange.gif";
	isStart = true;
}

//开始监控callback事件
function onStartMonitor(data) {
	MonitorModule.IsConnected = false;
	MonitorModule.Timer.SingleConnectTimeoutId = setTimeout(checkConnected,120 * 1000);
}
var connectCount=0;
//检测是否已经连接上
function checkConnected() {
	if (!MonitorModule.IsConnected) {
		$("#popupConnectDialog").popup("open");
	}
}

function askConnect(){
	
	connectCount++;
	if(!MonitorModule.IsConnected && connectCount<6){
		sendcmd();
		MonitorModule.Timer.ReconectTimeoutId= setTimeout(arguments.callee,10*1000);
	}
	else{
		if(MonitorModule.Timer.ReconectTimeoutId){
			clearTimeout(MonitorModule.Timer.ReconectTimeoutId);
		}
		connectCount=0;
	}
	
}
function CheckOnline() {
	
	try {
		if (isStart) {
			if (lastDataDate != null) {

				var today = new Date();

				var oldTime = lastDataDate.getTime();

				var newTime = today.getTime();

					var sec = (newTime - oldTime)/1000;
				if(sec>=60){
				 	discon(1, true);
				}
				/*
				if ((newTime - oldTime) > 15000) {
					discon(1, true);
				}
				*/
			}
		}
	} catch (err) {
	}
	
}

//停止 监控callback事件
function onStopMonitor(data) {
}

function fnRealtime(data) {

}
function fnRealtimedata(data) {
	try {
		var objdata = JSON.parse(data);
		//var tempData = undefined;
		var objRow = undefined;
		for (var x = 0; x < objdata.length; x++) {
			objRow = objdata[x];
			if (objRow == undefined || ProcessDate == objRow.ProcessDate) {
				return;
			}
			for (var i = 0; i < objRow.RunStatuses.length; i++) {
				var status = objRow.RunStatuses.substr(i, 1);
				var objRS = document.getElementById("RunStatus" + i);
				
				if (objRS != undefined && objRS != null) {
					if (parseInt(status) == 1) {
						objRS.className = objRS.className.replace("0", "1");
					} else {
						objRS.className = objRS.className.replace("1", "0");
					}
				}
			}
			for (var i = 0; i < objRow.DeviceStatuses.length; i++) {
				var status = objRow.DeviceStatuses.substr(i, 1);
				var objDS = document.getElementById("DeviceStatus" + i);
				
				if (objDS != undefined && objDS != null) {
					if (parseInt(status) == 1) {
						objDS.className = objDS.className.replace("0", "1");
					} else {
						objDS.className = objDS.className.replace("1", "0");
					}
				}
			}
			for (var i = 0; i < objRow.FaultStatuses.length; i++) {
				var status = objRow.FaultStatuses.substr(i, 1);
				var objFS = document.getElementById("FaultStatus" + i);
				
				if (objFS != undefined  && objFS != null) {
					if (parseInt(status) == 1) {
						objFS.className = objFS.className.replace("0", "1");
					} else {
						objFS.className = objFS.className.replace("1", "0");
					}
				}
			}
			var status = objRow.OtherStatuses.split(',');
			for (var i = 0; i < status.length; i++) {
				var objOS = document.getElementById("OtherStatus" + i);
				if (objOS != null && objOS != undefined) {
					objOS.innerHTML = status[i];
				}
			}

			if (objRow.TimeSpan != undefined) {
				try {
					if (last_date == undefined
							|| objRow.ProcessDate == last_date)
						time_out++;
					else
						time_out = 0;
					// document.getElementById("CommunicationValue").innerHTML = time_out;
					//var str = "" + time_out;
					//var pad = "0000";
					//var ans = pad.substring(0, pad.length - str.length) + str;
					//var dis=ans.substring(0,1)+"    "+ans.substring(2,3);
					//$("#divTimeout").html(dis);
					var n = objRow.TimeSpan;
					if (n > 30) {
						// document.getElementById("imgCommunication").src = "/Skin/images/hui.png";
					} else {
						//document.getElementById("imgCommunication").src = "/Skin/images/o_09.jpg";
					}
				} catch (oException) {
					//document.getElementById("imgCommunication").src = "/Skin/images/hong.png";
				}
				last_date = objRow.ProcessDate;
			}
			//日期时间
			fillDateTime();

			if (objRow.IsOnline.toString() == "1") {
				document.getElementById("imgCom").src = "images/shishijiankong/wifi-green.png";
				MonitorModule.Timer.ReceiveTimeoutId = setTimeout(
							function(){document.getElementById('imgCom').src = 'images/shishijiankong/wifi-gray.png';
						},1000);
			} else if (objRow.IsOnline.toString() == "2") {
				//discon(1, true);
			} else {
				if (MonitorModule.Timer.ReceiveTimeoutId > 0) {
					clearTimeout(MonitorModule.Timer.ReceiveTimeoutId);
					MonitorModule.Timer.ReceiveTimeoutId = 0;
				}
				document.getElementById("imgCom").src = "images/shishijiankong/wifi-orange.gif";
			}
			if (MonitorModule.ElevatorType == 0)
				showFuti(objRow);
			else
				showZhiti(objRow);

			DoorStatus = objRow.DoorStatus.toString();
			ProcessDate = objRow.ProcessDate;
		}
	} catch (err) {
	}
}
function fillDateTime() {
	lastDataDate = new Date();
	var hour = lastDataDate.getHours();
	var mi = lastDataDate.getMinutes();
	var sc = lastDataDate.getSeconds();
	// 日期
	var date = lastDataDate.getFullYear() + '年' + (lastDataDate.getMonth() + 1)
			+ '月' + lastDataDate.getDate() + '日';
	$('#lbLastContactDate').html(date);
	// 小时
	if (hour >= 10) {
		$("#time-hour-shi").html(hour.toString().substring(0, 1));
		$("#time-hour-ge").html(hour.toString().substring(1, 2));
	} else {
		$("#time-hour-shi").html("0");
		$("#time-hour-ge").html(parseInt(hour.toString()));
	}

	// 分钟
	if (mi >= 10) {
		$("#time-minute-shi").html(mi.toString().substring(0, 1));
		$("#time-minute-ge").html(mi.toString().substring(1, 2));
	} else {
		$("#time-minute-shi").html("0");
		$("#time-minute-ge").html(parseInt(mi.toString()));
	}

	// 秒
	if (sc >= 10) {
		$("#time-second-shi").html(sc.toString().substring(0, 1));
		$("#time-second-ge").html(sc.toString().substring(1, 2));
	} else {
		$("#time-second-shi").html("0");
		$("#time-second-ge").html(parseInt(sc.toString()));
	}
}
function showFuti(objRow) {
	$("#div-zhiti").hide();

	FutiModule.setDirectionImg(parseInt(objRow.RunDirection));
	//getFutiImg(parseInt(objRow.RunDirection));
}
function showZhiti(objRow) {
	$("#div-zhiti").css("display", "");
	//电梯开关状态
	if (objRow.DoorStatus.toString() == "0"
			|| objRow.DoorStatus.toString() == "1") {
		if (DoorStatus != objRow.DoorStatus.toString()) {
			if (objRow.DoorStatus.toString() == "0") {
				document.getElementById("divElevator").style.background = 'url(images/lift_open.png)';
			} else {
				document.getElementById("divElevator").style.background = 'url(images/lift_close.png)';
			}
		}
	} else {
		if (DoorStatus != objRow.DoorStatus.toString()) {
			if (objRow.DoorStatus.toString() == "False") {
				document.getElementById("divElevator").style.background = 'url(images/lift_close.png)';
			} else {
				document.getElementById("divElevator").style.background = 'url(images/lift_open.png)';
			}
		}
	}
	//楼层
	try {
		if (floorTable[objRow.Floor.toString()] !== undefined
				&& objRow.Floor.toString() != "0") {
			document.getElementById("floor").innerHTML = floorTable[objRow.Floor
					.toString()];
		} else {
			document.getElementById("floor").innerHTML = objRow.Floor;
		}
	} catch (err) {
		document.getElementById("floor").innerHTML = "0";
	}
	//方向
	switch (parseInt(objRow.RunDirection)) {
	case 0:
		document.getElementById("imgUp").src = "images/up_gray.gif";
		document.getElementById("imgDown").src = "images/down_gray.gif";
		break;
	case 1:
		document.getElementById("imgUp").src = "images/up.png";
		document.getElementById("imgDown").src = "images/down_gray.gif";
		break;
	case 2:
		document.getElementById("imgDown").src = "images/down.png";
		document.getElementById("imgUp").src = "images/up_gray.gif";
		break;
	}
	//载重
	try {
		document.getElementById("Carry").innerHTML = objRow.Carry + "%";
		if (objRow.Carry >= 100) {
			document.getElementById("imgCarry").style.height = '100%';
		} else {
			document.getElementById("imgCarry").style.height = objRow.Carry
					+ "%";
		}
		if (document.getElementById("imgCarry").style.height > 100) {
			document.getElementById("imgCarry").style.height = '100%';
		}
	} catch (err) {
	}
}
function Disconnect() {
	document.getElementById("imgCom").src = "images/shishijiankong/wifi-red.png";
}
function ResetStatus() {
	try {
		var doc=document;
		lastDataDate = null;
		if(doc.getElementById("Carry"))
			doc.getElementById("Carry").innerHTML = "0%";
		if(doc.getElementById("imgCarry"))
			doc.getElementById("imgCarry").style.height = '0%';
		
		for (var i = 0; i < 50; i++) {
			var objRS = doc.getElementById("DeviceStatus" + i);
			if (objRS != undefined && objRS != null) {
				objRS.className = objRS.className.replace("1", "0");
			}
		}
		for (var i = 0; i < 50; i++) {
			var objRS = doc.getElementById("FaultStatus" + i);
			if (objRS != undefined && objRS != null) {
				objRS.className = objRS.className.replace("1", "0");
			}
		}
		for (var i = 0; i < 50; i++) {
			var objRS = doc.getElementById("RunStatus" + i);
			if (objRS != undefined && objRS != null) {
				objRS.className = objRS.className.replace("1", "0");
			}
		}
		for (var i = 0; i < 50; i++) {
			var objRS = doc.getElementById("OtherStatus" + i);
			if (objRS != undefined && objRS != null) {
				objRS.innerHTML = "&nbsp;";
			}
		}
		if(doc.getElementById("imgCom"))
			doc.getElementById("imgCom").src = "images/shishijiankong/wifi-red.png";

		if (MonitorModule.ElevatorType == 0) {
			$("#div-zhiti").hide();
			doc.getElementById("divElevator").style.background = 'url(images/lift_futi_stop.png)';
		} else {
			$("#div-zhiti").show();
			doc.getElementById("floor").innerHTML = "";
			doc.getElementById("divElevator").style.background = 'url(images/lift_close.png)';
			doc.getElementById("imgUp").src = "images/up_gray.gif";
			doc.getElementById("imgDown").src = "images/down_gray.gif";
		}

	} catch (err) {
	}
}
function stopcmd(isTip) {
	/*
	var jsonString = '{\"elevatorid\":\"' + eid + '\",\"userid\":\"'
			+ userId + '\"}';
	GetAPIData("/api/ajax/StopUploadReal", jsonString, onStopMonitor, err,
			null, null, false, false);
	*/
	try {
		$.connection.hub.stop();
		/*
		if (typeof isTip != 'undefine' && isTip != null && isTip) {
			$("#popupDialog").popup("open");
			return;
		}*/
	} catch (err) {
	}
	MonitorModule.IsConnected=false;
	isStart = false;
	connectCount=0;
}
function fnstop(data) {
}
function fnerrorstop(data) {
}
var con = function(id) {
	if(MonitorModule.Timer.SingleConnectTimeoutId>0){
		clearTimeout(MonitorModule.Timer.SingleConnectTimeoutId);
		MonitorModule.Timer.SingleConnectTimeout=0;
	}
	
	if (eid == "") {
		return false;
	}
	//sendcmd();
	askConnect();
};
var discon = function(id, isTip) {
	if (MonitorModule.Timer.ReceiveTimeoutId > 0) {
		clearTimeout(MonitorModule.Timer.ReceiveTimeoutId);
		MonitorModule.Timer.ReceiveTimeoutId = 0;
	}

	if(MonitorModule.Timer.SingleConnectTimeoutId>0){
		clearTimeout(MonitorModule.Timer.SingleConnectTimeoutId);
		MonitorModule.Timer.SingleConnectTimeoutId=0;
	}

	if(MonitorModule.Timer.CheckOnlineTimeoutId>0){
		clearTimeout(MonitorModule.Timer.CheckOnlineTimeoutId);
		MonitorModule.Timer.CheckOnlineTimeoutId=0;
	}
	
	if(MonitorModule.Timer.ReconectTimeoutId){
		clearTimeout(MonitorModule.Timer.ReconectTimeoutId);
		MonitorModule.Timer.ReconectTimeoutId=0;
	}


	if (eid == "") {
		return false;
	}
	stopcmd(isTip);
	ResetStatus();
};
/**************************search页面***********************************/
var SearchModule = (function() {
	var PAGE_ID="#search";
	
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow(){
		
		$("#btnsearch").on("click", function() {
			search();
		});
		$("#next").on("click", function() {
			next();
		});
		$("#btnsearchok").on("click", function() {
			ok();
		});
	}
	
	function search() {
		PageSetting.PageIndex=1;
		$("#SearchResult").html('');
		$("#div-more").hide();
	
		var deviceNo = $("#txtDeviceNo").val();
		var company = $("#txtCompany").val();
		var building = $("#txtBuilding").val();
	
		if (deviceNo == "" && company == "" && building == "" && address == "" && phone == "") {
			alert("请输入搜索条件!");
		} else {
			addSearch('txtDeviceNo');
			var param = {
					"PageSize":PageSetting.PageSize
					,"PageIndex":'1'
					,"strOrder":""
					,"deviceNo":deviceNo
					,"company":company
					,"building":building
			};
	
			GetAPIData("/api/elevators/GetListExt", JSON.stringify(param), onSearchSuccess,
					err, null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	function next() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;
	
		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
	
		var deviceNo = $("#txtDeviceNo").val();
		var company = $("#txtCompany").val();
		var building = $("#txtBuilding").val();
	
	
		var param = {
				"PageSize":PageSetting.PageSize
				,"PageIndex":PageSetting.PageIndex
				,"strOrder":""
				,"deviceNo":deviceNo
				,"company":company 
				,"building":building
				};
		GetAPIData("/api/elevators/GetListExt", JSON.stringify(param), onSearchSuccess, err,
				null, null, true, false, null, '正在查询,请稍侯...');
	}
	
	function onSearchSuccess(data) {
		var html = [];
	
		if (data) {
			var objResult = JSON.parse(data.Data);
			if(PageSetting.PageIndex<=1)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"stdtable\">");
			
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				
				PageSetting.TotalCount = objResult.ds1[0].datacount;
				
				var ds=objResult.ds;
				
				for (var i = 0,len=ds.length; i < len; i++) {
					
					var item = ds[i];
					
					var obj={};
					
					obj.deviceNo=item.DeviceNo||'';
					obj.isException=item.IsException;
					
					obj.trcolor = (i % 2 == 1 ? "oddtr" : "eventr");
					obj.buildingName=item.BuildingName ||'';
					obj.tentName=item.TentName||'';
					obj.isOnline=item.IsOnline||'0';
					
					html.push(buildRowItem(obj));
					
					obj=null;
					item=null;
				}
				$("#div-more").show();
			} else {
				$("#div-more").hide();
				html.push("<tr><td colspan=\"2\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");
	
			if(PageSetting.PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
			
			//$("#SearchResult").append(html.join(''));
	
			if ($("#btnsearch")) {
				$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
			}
			html=null;
		}
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr class=\"@trcolor\" >");
		html.push("<td rowspan=\"3\">");
		
		if (obj.isException == "0") {
			html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@deviceNo\">");
		}

		html.push("</td>");
		html.push("<td onclick=\"CheckSingle('@deviceNo')\">@deviceNo</td>");
		html.push("<td onclick=\"CheckSingle('@deviceNo')\">@buildingName</td>");
		html.push("</tr>");

		html.push("<tr class=\"@trcolor\" onclick=\"CheckSingle('@deviceNo')\">");
		html.push("<td colspan=\"2\">@tentName</td>");
		html.push("</tr>");

		html.push("<tr class=\"@trcolor\">");
		if (obj.isException == "0") {
			if(obj.isOnline=="0")
				html.push("<td colspan=\"2\" style=\"color:green;\">遥监正常<img src=\"images/noonline.png\" style=\"vertical-align:middle;height:20px;width:20px;\"/></td>");
			else
				html.push("<td colspan=\"2\" style=\"color:green;\">遥监正常</td>");
		} else {
			if(obj.isOnline=="0")
				html.push("<td colspan=\"2\" style=\"color:red;\">遥监异常<img src=\"images/noonline.png\" style=\"vertical-align:middle;height:20px;width:20px;\"/></td>");
			else
				html.push("<td colspan=\"2\" style=\"color:red;\">遥监异常</td>");
		}
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@buildingName", 'g'), obj.buildingName)
		.replace(new RegExp("@modelNoName", 'g'), obj.modelNoName)
		.replace(new RegExp("@tentName", 'g'), obj.tentName)
		.replace(new RegExp("@trcolor", 'g'), obj.trcolor)
		.replace(new RegExp("@isException", 'g'), obj.isException);
		
		return result;
	}
	
	function ok() {
		var ids = [];
		$("input[name='chk']:checked").each(function() {
			ids.push(this.value);
		});
		if (ids.length<=0) {
			alert("请选择电梯!");
			return false;
		} else {
			addSearch('txtDeviceNo');
			
			if(ids.length==1){
				paraObj = {DeviceNo: ids[0]};
				GetAPIData("/api/elevators/GetElevatorByDeviceNo", JSON.stringify(paraObj),onRealtimeExceptionSuccess, err, null, null, true, false,null, '正在处理中,请稍侯...');
			}
			else{
				changePage('realtimemore.html?action=jump&paralist=' + ids.join(','));
			}
			return true;
		}
	}
	return{
		search:function(){
			search();
		},
		next:function(){
			next();
		}
	};
})();
/********************************************************/