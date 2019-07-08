/**
 * 开发中，未使用
 */
(function($, Monitor) {
	var Control={
		 DeviceNoId:''
		,AddressId:'lbAddress'
		,LastContactDate:'lbLastContactDate'
		,HourShi:'time-hour-shi'
		,HourGe:'time-hour-ge'
		,MinuteShi:'time-minute-shi'
		,MinuteGe:'time-minute-ge'
		,SecondShi:'time-second-shi'
		,SecondGe:'time-second-ge'
		,ConnectingImgId:''
		,ConnectedImgId:''
		,DisConnectedId:''
		,CarryImgId:'imgCarry'
		,CarryValueId:'Carry'
		,FloorId:'floor'
		,DirectionDefaultImgId:''
		,DirectionUpImgId:'imgUp'
		,DirectionDownImgId:'imgDown'
		,ButtonConnectId:''
		,ButtonDisConnectId:''
	};
	var GlobalOptions={
		 ElevatorId:''
		,ElevatorType:1
		,IsStart:false
	};
	//获取电梯基本信息
	function getElevatorinfo(assetnum) {
		var param = {"assetnum": assetnum};
		GetAPIData("/api/elevators/GetElevatorInfoExt", JSON.stringify(param), onGetElevatorInfoSuccess,
				err, null, null, true, false, null, '正在加载,请稍侯...');
	}
	//获取电梯基本信息回调
	function onGetElevatorInfoSuccess(data) {
		if (data) {
			var objResult = eval("(" + data.Data + ")");
			if (objResult && objResult.ds && objResult.ds[0]) {
				var obj=objResult.ds[0];
				
				if (obj.IsElevator) {
					GlobalOptions.ElevatorType = 1;
					$("#div-zhiti").show();
					document.getElementById("divElevator").style.background = 'url(images/lift_close.png)';
				} else {
					GlobalOptions.ElevatorType = 0;
					$("#div-zhiti").hide();
					document.getElementById("divElevator").style.background = 'url(images/lift_futi_stop.png)';
				}

				$('#lbElevator').html(obj.DeviceNo || '');
				$('#lbBuilding').html(obj.BuildingName || '');
				$('#lbAddress').html(obj.InstallSite || '');
				$('#hidFiliale').html(obj.Filiale || '');
				$('#hidMaintenance').html(obj.MaintenanceName || '');

				var date = "";
				var time = "";

				if (typeof objResult.ds[0].LastContactDate) {
					date = objResult.ds[0].LastContactDate.split(' ')[0];

					date = date.split('-')[0] + '年' + date.split('-')[1] + '月'
							+ date.split('-')[2] + '日';

					time = objResult.ds[0].LastContactDate.split(' ')[1];

					var hour = time.split(':')[0];
					var mi = time.split(':')[1];
					var sc = time.split(':')[2];

					$("#time-hour-shi").html(
							CommonModule.formatTime(hour).split(',')[0]);
					$("#time-hour-ge").html(
							CommonModule.formatTime(hour).split(',')[1]);
					$("#time-minute-shi").html(
							CommonModule.formatTime(mi).split(',')[0]);
					$("#time-minute-ge").html(
							CommonModule.formatTime(mi).split(',')[1]);
					$("#time-second-shi").html(
							CommonModule.formatTime(sc).split(',')[0]);
					$("#time-second-ge").html(
							CommonModule.formatTime(sc).split(',')[1]);
				}
				$('#lbLastContactDate').html(date);

				eid = obj.Id;
				//楼层
				if (objResult.Table1 && objResult.Table1[0]) {
					if (objResult.Table1[0].StatusHTML) {
						$('#Mcstatus').html(objResult.Table1[0].StatusHTML);
					}

					if (objResult.Table1[0].Floor) {
						floorTable = eval("({" + objResult.Table1[0].Floor+ "})");
					}
				}
				//刷新数据
				if (eid != "") {
					$.connection.hub.url = baseurl + "/signalr";
					$.connection.hub.logging = true;
					chat = $.connection.realTimeHub;
					chat.client.sendMessge = function(message) {
						if (isStart) {
							MonitorModule.IsConnected = true;
							receive(message);
						}
					};
					start();
					MonitorModule.Timer.CheckOnlineTimeoutId = setInterval(CheckOnline, 5000);
				}
			}
		}
	}
	 //注册客户端
    function register(ids) {
        if ($.connection.hub.state != 1) {
            $.connection.hub.start().done(function() {
                hubProxy.server.add(ids);
                return true;
            }).fail(function(e) {
            	alert("温馨提示:无法连接服务器!");
                return false;
            });
        }
    }
    //开始
    function start(){
    	if(register(1)){
    		var param = {"elevatorid": eid ,"userid": userId};
    		
    		GetAPIData("/api/ajax/StartUploadReal", JSON.stringify(param), onStartMonitor,err, null, null, false, false);
    		
    		$("#imgCom").attr('src',"images/shishijiankong/wifi-orange.gif");
    		
    		GlobalOptions.IsStart = true;
    	}
    	
    }
    //停止
    function stop() {
		$.connection.hub.stop();
		GlobalOptions.IsStart = false;
	}
    //接收实时数据
    function receive(data){
    	try {
			var objdata = eval("(" + data + ")");
			var objRow = undefined;
			for (var x = 0,len=objdata.length; x < len; x++) {
				objRow = objdata[x];
				if (objRow == undefined || ProcessDate == objRow.ProcessDate) {
					return;
				}
				
				//运行状态
				setStatus(objRow.RunStatuses,'RunStatus');
				//设备状态
				setStatus(objRow.DeviceStatuses,'DeviceStatus');
				//故障状态
				setStatus(objRow.FaultStatuses,'FaultStatus');
				//其他状态
				setOtherStatus(objRow.OtherStatuses.split(','),'OtherStatus');
				//接收日期时间
				setReceiveTime();
				//设置连接图片状态
			    setConnectStatus(objRow.IsOnline.toString());
			    //显示电梯图片及状态
			    show();
				
				DoorStatus = objRow.DoorStatus.toString();
				ProcessDate = objRow.ProcessDate;
			}
		} catch (err) {
		}
    }
    //设置状态
    function setStatus(data,prefix){
		for (var j = 0,len2=data.length; j <len2; j++) {
			var status = data.substr(j, 1);
			var obj2 = $("#"+prefix + j);
			var className='';
			
			if(obj2){
				if (parseInt(status) == 1) {
					className =obj2.attr('class').replace("0", "1");
				} else {
					className = obj2.attr('class').replace("1", "0");
				}
				obj2.attr("class",className);
			}
		}
    }
    function setOtherStatus(data,prefix){
		for (var i = 0,len=data.length; i <len; i++) {
			var obj = $("#"+prefix + i);
			
			if(obj){
				obj.innerHTML = data[i];
			}
		}
	}
    //设置接收时间
    function setReceiveTime() {
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
    //设置连接图片状态
    function setConnectStatus(isOnline){
    	if (isOnline == "1") {
    		$("#imgCom").attr('src',"images/shishijiankong/wifi-green.png");
			MonitorModule.Timer.ReceiveTimeoutId = setTimeout($("#imgCom").attr('src',"images/shishijiankong/wifi-gray.png"),1000)
		} else if (isOnline != "2") {
			if (MonitorModule.Timer.ReceiveTimeoutId > 0) {
				clearTimeout(MonitorModule.Timer.ReceiveTimeoutId);
				MonitorModule.Timer.ReceiveTimeoutId = 0;
			}
			$("#imgCom").attr('src',"images/shishijiankong/wifi-orange.gif");
		}
    }
    //显示电梯
    function show(objRow){
    	if (GlobalOptions.ElevatorType == 0){
    		$("#div-zhiti").hide();
			showFuti(objRow);
    	}
		else{
			$("#div-zhiti").show();
			showZhiti(objRow);
		}
    }
    function showZhiti(objRow) {
    	var backgroundImage='';
    	
		//电梯开关状态
		if (objRow.DoorStatus.toString() == "0" || objRow.DoorStatus.toString() == "1") {
			if (DoorStatus != objRow.DoorStatus.toString()) {
				if (objRow.DoorStatus.toString() == "0") {
					backgroundImage = 'url(images/lift_open.png)';
				} else {
					backgroundImage = 'url(images/lift_close.png)';
				}
				$("#divElevator").css("background-image",backgroundImage);
			}
		} else {
			if (DoorStatus != objRow.DoorStatus.toString()) {
				if (objRow.DoorStatus.toString() == "False") {
					backgroundImage = 'url(images/lift_close.png)';
				} else {
					backgroundImage = 'url(images/lift_open.png)';
				}
				$("#divElevator").css("background-image",backgroundImage);
			}
		}
		
		//楼层
		try {
			if (floorTable[objRow.Floor.toString()] !== undefined && objRow.Floor.toString() != "0") {
				$("#floor").html(floorTable[objRow.Floor.toString()]);
			} else {
				$("#floor").html(objRow.Floor);
			}
		} catch (err) {
			$("#floor").html("0");
		}
		//方向
		switch (parseInt(objRow.RunDirection)) {
		case 0:
			$("#imgUp").attr('src','images/up_gray.gif');
			$("#imgDown").attr('src','images/down_gray.gif');
			break;
		case 1:
			$("#imgUp").attr('src', 'images/up.png');
			$("#imgDown").attr('src','images/down_gray.gif');
			break;
		case 2:
			$("#imgUp").attr('src','images/up_gray.gif');
			$("#imgDown").attr('src','images/down.png');
			
			break;
		}
		//载重
		try {
			$("#Carry").html(objRow.Carry + "%");
			if (objRow.Carry >= 100) {
				$("#imgCarry").height('100%');
			} else {
				$("#imgCarry").height(objRow.Carry+ "%");
			}
			if ($("#imgCarry").height() > 100) {
				$("#imgCarry").height('100%');
			}
		} catch (err) {
		}
	}
    function showFuti(objRow) {
    	var runDirection=parseInt(objRow.RunDirection);
    	var backgroundImage='';
	    try {
			switch (runDirection) {
			case 0:
				backgroundImage = 'url(images/lift_futi_stop.png)';
				break;
			case 1:
				backgroundImage = 'url(images/lift_futi_up.png)';
				break;
			case 2:
				backgroundImage = 'url(images/lift_futi_down.png)';
				break;
			default:
				backgroundImage = 'url(images/lift_futi_stop.png)';
				break;
			}
			$("#divElevator").css("background-image",backgroundImage);
		} catch (err) {
		}
    }
})(jQuery, $.ESS.Monitor);