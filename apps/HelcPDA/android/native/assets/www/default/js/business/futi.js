
/* JavaScript content from js/business/futi.js in folder common */
/**
 * 
 */
var FutiModule=(function() {
	var futitimer=0
	,RepuestCount=0
	,IsConnected=false
	,IsStart=false
	,LastReciveDate=null
	,ElevatorId=""
	,HubProxy=null;
	//连接状态图片
	var ConnectImage={
		disconnected:"images/redwifi.png",
		connected: "images/shishijiankong/wifi-green.png",
		connecting:"images/shishijiankong/wifi-orange.gif",
		connectTip:"images/shishijiankong/wifi-gray.png"
	};
	//运行方向图片
	var DirectionImage={
		stop: 'url(images/lift_futi_stop.png)',
		up:'url(images/lift_futi_up.png)',
		down:'url(images/lift_futi_down.png)'
	};
	//开梯方向，上行，下行
	var RunDirection={
		up:"up",
		down:"down"
	};
	var TimeOut={
			CheckOnlineTimeoutId:0,
			ReconectTimeoutId:0,
			ReceiveTimeoutId:0,
			RefreshTimeoutId:0
	};
	//离开页面
	WLJQ(document).on('pagehide', '#futi', function() {
		try {
			disConnect();
			ElevatorId = "";
			RepuestCount=0;
		} catch (err) {
		}
	});
	//显示页面
	WLJQ(document).on('pageshow','#futi',function() {
		try {
			//上行开梯
			$("#upelevator").on("click", function() {
				upelevator();
			});
			//下行开梯
			$("#downelevator").on("click", function() {
				downelevator();
			});
			//关梯
			$("#closeelevator").on("click", function() {
				closeelevator();
			});
			//连接
			$("#btn-futi-con").on("click", function() {
				connect();
			});
			//断开
			$("#btn-futi-discon").on("click", function() {
				disConnect();
			});

			ElevatorId = "";
			var assetnum = getUrlParam('assetnum');
			if (assetnum != "") {
				var data = {"assetnum":assetnum};
				GetAPIData("/api/elevators/GetElevatorInfoExt",JSON.stringify(data) ,
						OnGetElevatorInfoSuccess, err, null, null, true, false, null,
						'正在加载,请稍侯...');
			}
		} catch (err) {
		}
	});
	//上行开梯
	function upelevator(){
		openElevator(RunDirection.up);
	}
	//下行开梯
	function downelevator(){
		openElevator(RunDirection.down);
	}
	//开梯
	function openElevator(derictFlag,interval,tip){
		clearTimeout(futitimer);

		var isauto = $("#slider1").val();
		var actionType=-1;
		
		if (isauto == "on") {
			var timevalue = $("#txtStartTime").val();

			if (timevalue != '') {
				timevalue = timevalue.replace(":", "");
				
				actionType=derictFlag==RunDirection.up?3:4;
				
				sendfuti(actionType, timevalue);
			}
		} else {
			if(getNoPeopleStatus()){
				actionType=derictFlag==RunDirection.up?1:2;
				
				sendfuti(actionType);
				futitimer = setTimeout(function(){
					sendfuti(actionType);
				}, interval||8000);
			} else {
				alert(tip||"无人模式下才允许手动开梯!");
			}
		}
	}
	//关梯
	function closeelevator(){
		clearTimeout(futitimer);

		var isauto = $("#slider2").val();

		if (isauto == "on") {
			var timevalue = $("#txtEndTime").val();

			if (timevalue != '') {
				timevalue = timevalue.replace(":", "");
				sendfuti(6, timevalue);
			}

		} else {
			if(getNoPeopleStatus()){
				sendfuti(5);
				
				futitimer = setTimeout(function(){
					sendfuti(5);
				}, 8000);
			} else {
				alert("无人模式下才允许手动关梯!");
			}
		}
	}
	// 获取电梯数据
	function OnGetElevatorInfoSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if (typeof objResult.ds != 'undefined' && objResult.ds
					&& typeof objResult.ds[0] != 'undefined' && objResult.ds[0]) {
				var item = objResult.ds[0];

				document.getElementById("divElevator").style.background =DirectionImage.stop;

				$('#lbElevator').html(item.DeviceNo);
				$('#lbBuilding').html(item.BuildingName);
				$('#lbAddress').html(item.TentName);
				$('#ElevatorId').val(item.Id);
				$('#ProtocolType').val(item.ProtocolType);
				$('#ProtocolTypeName').val(item.TerminalTypeName);

				ShowLastDatetime(item.LastContactDate);
				
				$("#Mcstatus").html(objResult.Table1[0].FutiStatusHTML);
				
				ElevatorId = item.Id;

				if (ElevatorId != "") {
					$.connection.hub.url = baseurl + "/signalr";
					$.connection.hub.logging = true;
					HubProxy = $.connection.realTimeHub;
					HubProxy.client.sendMessge = function(message) {
						if (IsStart) {
							if(TimeOut.ReconectTimeoutId){
								clearTimeout(TimeOut.ReconectTimeoutId);
								TimeOut.ReconectTimeoutId=0;
							}
							
							IsConnected = true;
							RepuestCount=0;
							onReceive(message);
						}
					};
					repuestConnect();
					TimeOut.CheckOnlineTimeoutId = setInterval(checkOnline, 5000);
				}
			}
		}
	}
	//连接
	function connect() {
		RepuestCount=0;
		
		if (ElevatorId == "") {
			return false;
		}
		clearTimeout(TimeOut.CheckOnlineTimeoutId)
			TimeOut.CheckOnlineTimeoutId = setInterval(checkOnline, 5000);
		
		repuestConnect();
	}
	//断开
	function disConnect() {
		if (TimeOut.ReceiveTimeoutId > 0) {
			clearTimeout(TimeOut.ReceiveTimeoutId);
			TimeOut.ReceiveTimeoutId = 0;
		}

		if(TimeOut.CheckOnlineTimeoutId>0){
			clearTimeout(TimeOut.CheckOnlineTimeoutId);
			TimeOut.CheckOnlineTimeoutId=0;
		}
		
		if(TimeOut.ReconectTimeoutId){
			clearTimeout(TimeOut.ReconectTimeoutId);
			TimeOut.ReconectTimeoutId=0;
		}

		if (ElevatorId == "") {
			return false;
		}
		
		IsConnected=false;
		IsStart = false;
		RepuestCount=0;
		
		try {
			$.connection.hub.stop();
		} catch (err) {
		}
		
		ResetStatus();
	}
	//重置初始状态
	function ResetStatus() {
		try {
			LastReciveDate = null;
			
			document.getElementById("imgCom").src = ConnectImage.disconnected;

		} catch (err) {
		}
	}
	//请求连接，如果连不上，10秒重连，尝试6次
	function repuestConnect(){
		RepuestCount++;
		if(!IsConnected && RepuestCount<6){
			sendCommand();
			TimeOut.ReconectTimeoutId= setTimeout(arguments.callee,10*1000);
		}
		else{
			if(TimeOut.ReconectTimeoutId){
				clearTimeout(TimeOut.ReconectTimeoutId);
			}
			RepuestCount=0;
			document.getElementById("imgCom").src = ConnectImage.disconnected;
		}
		
	}
	//发送连接指令
	function sendCommand() {
		if ($.connection.hub.state != 1) {
			$.connection.hub.start().done(function() {
				var ids = ElevatorId;
				HubProxy.server.add(ids);
			}).fail(function(e) {
				alert("温馨提示:无法连接服务器!");
			});
			;
		}
		var param = {"elevatorid": ElevatorId ,"userid":userId};
		
		GetAPIData("/api/ajax/StartUploadReal", JSON.stringify(param), onStartMonitor,err, null, null, false, false);
		
		IsStart = true;
	}
	//开始监控callback事件
	function onStartMonitor(data) {
		IsConnected = false;
		document.getElementById("imgCom").src = ConnectImage.connecting;
	}
	//检查是否在线
	function checkOnline() {
		try {
			if (IsStart) {
				if (LastReciveDate != null) {

					var today = new Date();

					var oldTime = LastReciveDate.getTime();

					var newTime = today.getTime();

 					var sec = (newTime - oldTime)/1000;
					if(sec>=60){
						disConnect();
					}
				}
			}
		} catch (err) {
		}
		
	}
	// 实时刷新数据
	function onReceive(data) {
		try {
			var doc=document;
			
			var objdata = JSON.parse(data);
			
			var objRow = undefined;

			for (var x = 0, len = objdata.length; x < len; x++) {
				objRow = objdata[x];

				if (objRow == undefined || ProcessDate == objRow.ProcessDate) {
					return;
				}

				LastReciveDate = new Date();
				var year=LastReciveDate.getFullYear()
					,month=LastReciveDate.getMonth() + 1
					,day=LastReciveDate.getDate()
					,hour = LastReciveDate.getHours()
					,mi = LastReciveDate.getMinutes()
					,sc = LastReciveDate.getSeconds();
				
				var dt=year+"-"+month+"-"+day+" "+hour+":"+mi+":"+sc;
				
				ShowLastDatetime(dt);
				
				if (objRow.IsOnline.toString() == "1") {
					
					doc.getElementById("imgCom").src = ConnectImage.connected;
					
					TimeOut.ReceiveTimeoutId = setTimeout(function(){
						doc.getElementById('imgCom').src = ConnectImage.connectTip;
					},1000);
					
				} else if (objRow.IsOnline.toString() == "2") {
					continue;
				} else {
					if (TimeOut.ReceiveTimeoutId > 0) {
						clearTimeout(TimeOut.ReceiveTimeoutId);
						TimeOut.ReceiveTimeoutId = 0;
					}
					doc.getElementById("imgCom").src = ConnectImage.connecting;
				}

				for (var i = 0, len2 = objRow.RunStatuses.length; i < len2; i++) {
					var status = objRow.RunStatuses.substr(i, 1);
					var objRS= doc.getElementById("RunStatus" + i);
					
					if (objRS != undefined && objRS != null) {
						if (parseInt(status) == 1) {
							objRS.className = objRS.className.replace("0", "1");
						} else {
							objRS.className = objRS.className.replace("1", "0");
						}
					}
				}
				//显示电梯上，下行，及有无人图标
				if($("#tdUp div").hasClass("blankgreen1"))
					$("#divUp").show();
				else
					$("#divUp").hide();
				
				if($("#tdDown div").hasClass("blankgreen1"))
					$("#divDown").show();
				else
					$("#divDown").hide();
				
				if(getNoPeopleStatus()){
					$("#divPerson").show();
				}
				else{
					$("#divPerson").hide();
				}
				
				ProcessDate = objRow.ProcessDate;

				// 电梯方向
				setDirectionImg(parseInt(objRow.RunDirection));
			}
		} catch (err) {
		}
	}
	//设置电梯运行方向图片
	function setDirectionImg(runDirection) {
		try {
			var bg='';
			switch (runDirection) {
				case 0:
					bg =DirectionImage.stop;
					break;
				case 1:
					bg = DirectionImage.up;
					break;
				case 2:
					bg = DirectionImage.down;
					break;
				default:
					bg = DirectionImage.stop;
					break;
			}
			document.getElementById("divElevator").style.background = bg;
		} catch (err) {
		}

	}
	//显示时间
	function ShowLastDatetime(objDate){
		if(!objDate)
			return;
		
		var date = ""
			,time = ""
			,LastContactDateArr
			,dateArr,timeArr
			,hour,mi,sc
			,hourArr,miArr,scArr;
		
		LastContactDateArr=objDate.split(' ');
		
		dateArr=LastContactDateArr[0].split('-');
		date = dateArr[0] + '年' + dateArr[1] + '月'+ dateArr[2] + '日';

		time = LastContactDateArr[1];
		
		timeArr=time.split(':');
		
		hour = timeArr[0],mi = timeArr[1],sc = timeArr[2];

		$('#lbLastContactDate').html(date);
		
		hourArr=CommonModule.formatTime(hour).split(',');
		miArr=CommonModule.formatTime(mi).split(',');
		scArr=CommonModule.formatTime(sc).split(',');
		
		$("#time-hour-shi").html(hourArr[0]);
		$("#time-hour-ge").html(hourArr[1]);
		$("#time-minute-shi").html(miArr[0]);
		$("#time-minute-ge").html(miArr[1]);
		$("#time-second-shi").html(scArr[0]);
		$("#time-second-ge").html(scArr[1]);
		
		date = null,time = null,LastContactDateArr=null
		,dateArr=null,timeArr=null
		,hour=null,mi=null,sc=null
		,hourArr=null,miArr=null,scArr=null;
	};
	
	//操作，开梯，关梯
	function sendfuti(actionType, timevalue) {
		RefleshCount = 0;
		var pid
		,ElevatorId
		,ProtocolType
		,isupdate = 0
		,IsRead = 0
		,IsRepeat = 0;
		
		pid = document.getElementById("hidProcessId1").value;
		ElevatorId = $("#ElevatorId").val();
		ProtocolType = $("#ProtocolType").val();

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return;
		}

		var ids = "";

		switch (actionType) {
		case 1:
			ids += '{"Address":"4DFE0000","Length":"4","WriteValue":"FFFFFFFF"}'
					+ ',';
			break;
		case 2:
			ids += '{"Address":"4DFA0000","Length":"4","WriteValue":"FFFFFFFF"}'
					+ ',';
			break;
		case 3:
			ids += '{"Address":"4DF60000","Length":"4","WriteValue":"FF00'
					+ timevalue + '"}' + ',';
			break;
		case 4:
			ids += '{"Address":"4DF60000","Length":"4","WriteValue":"00FF'
					+ timevalue + '"}' + ',';
			break;
		case 5:
			ids += '{"Address":"4DF20000","Length":"4","WriteValue":"FFFFFFFF"}'
					+ ',';
			break;
		case 6:
			ids += '{"Address":"4DEE0000","Length":"4","WriteValue":"FFFF'
					+ timevalue + '"}' + ',';
			break;
		}

		if (ids != '') {
			ids = "[" + ids.substring(0, ids.length - 1) + "]";

		}

		if (pid == '') {

			pid = NewGuid();

			isupdate = 0;

			document.getElementById("hidProcessId1").value = pid;
		}

		//DCategory = "d36247ab-4bab-472d-8d6f-a8d31e282e4a";

		var param = {
			ElevatorId : ElevatorId,
			ProcessId : pid,
			ProtocolType : ProtocolType,
			Ids : encodeURIComponent(ids),
			IsUpdate : isupdate,
			DCategory : "d36247ab-4bab-472d-8d6f-a8d31e282e4a",
			IsRead : IsRead,
			IsRepeat : IsRepeat
		};
		GetAPIData("/api/ajax/AddAddress", JSON.stringify(param),
				onSendFutiSuccess, err, null, null, true, false, null,
				"正在发送命令,请稍侯...");
	}
	/* 每隔5秒后自动刷新一次，共4次后停止自动刷新 */
	function onSendFutiSuccess(data) {
		refreshfuti();
	}

	function refreshfuti() {

		var pid1 = document.getElementById("hidProcessId1").value;
		var ElevatorId = $("#ElevatorId").val();

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return false;
		}

		if (pid1 != '') {
			var param = {
				ProcessId : pid1
			};
			GetAPIData("/api/ajax/GetElevatorAddressValue", JSON.stringify(param),
					onGetFutiGVSuccess, err, null, null, true, false, null,
					"正在刷新,请稍侯...");
		}
	}
	// 显示地址信息
	function onGetFutiGVSuccess(data) {
		if (typeof data != 'undefined' && data && data.Data) {
			var objResult = JSON.parse(data.Data);

			if (typeof objResult != 'undefined' && objResult.length > 0) {
				$("#info").html(objResult[0].Remark);
			}
		}
		// 地址读取
		if (RefleshCount < 4) {
			TimeOut.RefreshTimeoutId = setTimeout(refreshfuti, 5000);
			RefleshCount++;
		} else {
			if (TimeOut.RefreshTimeoutId > 0) {
				clearTimeout(TimeOut.RefreshTimeoutId);
				TimeOut.RefreshTimeoutId = 0;
			}
		}
	};
	//获取是否有人，注意：tdNoPeople在后台代码写死
	function getNoPeopleStatus()
	{
		if($("#tdNoPeople div").hasClass("blankgreen1"))
			return true;
		else
			return false;
	}
	return {
		sendfuti : function(actionType, timevalue) {
			sendfuti(actionType, timevalue);
		},
		setDirectionImg:function(runDirection) {
			setDirectionImg(runDirection);
		}
	};
})();
var FutiSearchModule=(function() {
	WLJQ(document).on('pageshow','#futisearch',function() {
		
		$("#btnClear").on("click", function() {
			clear();
		});
		$("#btnSearch").on("click", function() {
			search();
		});
		$("#btnConfirm").on("click", function() {
			oK();
		});
		$("#btnNext").on("click", function() {
			next();
		});
	});
	//扶梯查询
	function search() {
		PageSetting.PageIndex = 1;
		$("#SearchResult").html('');
		$("#div-more").css('display', 'none');
	
		var deviceNo = $("#txtDeviceNo").val();
		var company = $("#txtCompany").val();
		var building = $("#txtBuilding").val();
		var address = $("#txtAddress").val();
	
		if (deviceNo == "" && company == "" && building == "" && address == "") {
			$("#popupTipDialog").popup("open");
			$("#tip").html("请输入搜索条件");
			return;
		} else {
			var param = {
				Where : "IsElevator=0",
				PageSize : PageSetting.PageSize,
				PageIndex : '1',
				strOrder : "",
				deviceNo : deviceNo,
				company : company,
				building : building,
				address : address,
				Phone : ""
			};
			GetAPIData("/api/elevators/GetListExt", JSON.stringify(param),
					onSearchSuccess, err, null, null, true, false, null, '正在查询,请稍侯...');
		}
	}
	// 下一页
	function next() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;
	
		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		var deviceNo,company,building,address;
		deviceNo = $("#txtDeviceNo").val();
		company = $("#txtCompany").val();
		building = $("#txtBuilding").val();
		address = $("#txtAddress").val();
	
		var param = {
			Where : "IsElevator=0",
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			deviceNo : deviceNo,
			company : company,
			building : building,
			address : address,
			Phone : ""
		};
		GetAPIData("/api/elevators/GetListExt", JSON.stringify(param), onSearchSuccess,
				err, null, null, true, false, null, '正在查询,请稍侯...');
	};
	// 确定
	function oK() {
		var id = "";
		$("input[name='chk']:checked").each(function() {
			id = this.value;
			return false;
		});
		if (id == "") {
			$("#popupTipDialog").popup("open");
			$("#tip").html("请选择电梯");
			return false;
		} else {
			changePage('futi.html?assetnum=' + id);
			return true;
		}
	};
	//清除查询条件
	function clear() {
		$("#txtDeviceNo").val("");
		$("#txtCompany").val("");
		$("#txtBuilding").val("");
		$("#txtAddress").val("");
	};
	//查询结果
	function onSearchSuccess(data) {
		if (data) {
			var html = [];
			var objResult = JSON.parse(data.Data);

			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"stdtable\">");
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				$("#div-more").show();
				PageSetting.TotalCount = objResult.ds1[0].datacount;

				for (var i = 0,len=objResult.ds.length; i < len; i++) {
					var item=objResult.ds[i];
					var deviceNo=item.DeviceNo||''
					,isException=item.IsException;
					
					var trcolor = (i % 2 == 1 ? "oddtr" : "eventr");
					html.push("<tr class=\"" + trcolor + "\" >");
					html.push("<td rowspan=\"3\">");
					
					if (isException == "0") {
						html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"" + deviceNo + "\">");
					}

					html.push("</td>");
					html.push("<td onclick=\"CheckSingle('"+ deviceNo + "')\">"+ deviceNo+ "</td>");
					html.push("<td onclick=\"CheckSingle('"+ deviceNo + "')\">"+ (item.BuildingName ||'')+ "</td>");
					html.push("</tr>");

					html.push("<tr class=\"" + trcolor+ "\" onclick=\"CheckSingle('"+ deviceNo + "')\">");
					html.push("<td colspan=\"2\">" + (item.TentName||'')+ "</td>");
					html.push("</tr>");

					html.push("<tr class=\"" + trcolor + "\">");
					if (isException == "0") {
						html.push("<td colspan=\"2\" style=\"color:green;\">遥监正常</td>");
					} else {
						html.push("<td colspan=\"2\" style=\"color:red;\">遥监异常</td>");
					}
					html.push("</tr>");
				}
			} else {
				$("#div-more").hide();
				html.push("<tr><td colspan=\"2\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
			objResult=null,html=null;
		}
	}
})();