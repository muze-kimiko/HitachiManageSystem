
/* JavaScript content from js/business/datarw.js in folder common */
/**
 * 
 */
/** **************************地址读取 开始*********************************** */
var DataRWModule = (function() {
	var TimeoutId = 0, RefleshCount = 0;
	WLJQ(document).on('pagehide', '#DataRW', function() {
		if (TimeoutId > 0)
			clearTimeout(TimeoutId);

		RefleshCount = 0;
		TimeoutId = 0;
	});
	WLJQ(document).on('pageshow','#DataRW',function() {
		try {
			RefleshCount = 0;
			TimeoutId = 0;

			/***********读取*************/
			$("#btnRead").on("click", function() {
				send();
			});

			$("#btnReRead").on("click", function() {
				send(1);
			});

			$("#btnReflesh").on("click", function() {
				refresh();
			});
			/*********地址写入*************/
			$("#tab-read").on("click", function() {
				showRead();
			});
			$("#tab-write").on("click", function() {
				checkPermisssions();
				
			});
			$("#write-chkAll").on("click",function(){
				var checked = $("#write-chkAll").prop("checked");
				$("input[name='write-chk']").each(function() {
					this.checked = checked;
				});
			});
			$("#write-btnWrite").on("click", function() {
				checkPermisssions();
				//write();
			});
			$("#write-btnReflesh").on("click", function() {
				writeRefresh();
			});
			/**********************/
			var assetnum = getUrlParam('assetnum');
			if (assetnum != "") {
				var param = {
					assetnum : assetnum
				};
				GetAPIData("/api/elevators/GetFaultElevatorInfo", JSON
						.stringify(param), onGetElevatorInfoSuccess,
						err, null, null, true,
						false, null, '正在加载,请稍侯...');
			}
		} catch (err) {
		}
	});
	// 获取电梯信息成功
	function onGetElevatorInfoSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var item = objResult.ds[0];

			if (typeof item != 'undefined' && item) {
				$('#txtDeviceNo').html(item.DeviceNo);
				$('#txtAddress').html(item.InstallSite);
				$('#txtBudingName').html(item.BuildingName);
				$('#ElevatorId').val(item.Id);
				$('#ProtocolType').val(item.ProtocolType);
				$('#ProtocolTypeName').val(item.TerminalTypeName);

				// 遥监状态
				if (item.IsException == "0") {
					$('#lbZuangtai').html("遥监正常");
				} else {
					$('#lbZuangtai').html("遥监异常");
				}
			}
			item=null,objResult=null;
		}
		showRead();
	};
	// 发送指令
	function send(IsRepeat) {
		RefleshCount = 0;
		var pid = document.getElementById("hidProcessId1").value;
		var ElevatorId = $("#ElevatorId").val();
		var ProtocolType = $("#ProtocolType").val();
		var isupdate = 0;
		var IsRead = 1;

		if (IsRepeat == undefined || IsRepeat == null) {
			IsRepeat = 0;
		}

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return;
		}

		if (IsRepeat == 1 && pid == '') {
			alert("请先读取故障码!");
			return;
		}

		var ids = "";
		var isError = false;

		$("input[name='chk']:checked").each(function() {
			var address = $("#txtAddress" + this.value).val();
			var length = $("#txtLength" + this.value).val();

			if (address != "" && length != "") {

				try {
					var iAddress = parseInt(address, 16);
				} catch (ex) {
					alert("地址错误,请输入16进制值！");
					isError = true;
					return false;
				}

				if (length == "") {
					alert("地址长度错误,不能为空，并且只能输入值为1、2、4。");
					isError = true;
					return false;
				} else {
					if (length == "1" || length == "2"
							|| length == "4") {
					} else {
						alert("地址长度错误,不能为空，并且只能输入值为1、2、4。");
						isError = true;
						return false;
					}
				}

				//ids += '{"Address":"' + address + '","Length":"' + length + '","WriteValue":"' + '"}' + ',';
				ids += '{"Address":"' + address + '","Length":"' + length + '","WriteValue":"","AddressType":"' + "0" + '"}' + ',';
			}

		});

		if (isError) {
			return;
		}

		if (ids != '') {
			ids = "[" + ids.substring(0, ids.length - 1) + "]";

		} else {
			alert("请选择或输入需要读取物理地址!");
			return;
		}

		if (pid == '') {

			pid = NewGuid();

			isupdate = 0;

			document.getElementById("hidProcessId1").value = pid;
		}

		DCategory = "d36247ab-4bab-472d-8d6f-a8d31e282e4a";

		var param = {
			ElevatorId : ElevatorId,
			ProcessId : pid,
			ProtocolType : ProtocolType,
			Ids : encodeURIComponent(ids),
			IsUpdate : isupdate,
			DCategory : DCategory,
			IsRead : IsRead,
			IsRepeat : IsRepeat
		};
		GetAPIData("/api/ajax/AddAddress", JSON.stringify(param),
				onSendSuccess, err, null, null, true, false, null,
				"正在发送命令,请稍侯...");
	}
	/* 每隔5秒后自动刷新一次，共4次后停止自动刷新 */
	function onSendSuccess(data) {
		refresh();
	}
	function refresh() {

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
			GetAPIData("/api/ajax/GetElevatorAddressValue", JSON.stringify(param), onGetGVSuccess, err, null, null, true,false, null, "正在刷新,请稍侯...");
		}
	}
	// 显示地址信息
	function onGetGVSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			var len = objResult ? objResult.length : 0;

			if (typeof objResult != 'undefined' && len > 0) {
				for (var i = 0; i < len; i++) {
					var item = objResult[i];

					$("input[name='chk']:checked").each(function() {
						var address = $("#txtAddress" + this.value).val();
						if (address.toUpperCase() == item.AddressInput) {
							$("#txtData" + this.value).html(item.Data);
							$("#txtRemark" + this.value).html(item.Remark);
							return false;
						}
					});
				}
			}
			objResult=null;
		}
		// 地址读取
		if (RefleshCount < 4) {
			TimeoutId = setTimeout(refresh, 5000);
			RefleshCount++;
		} else {
			RefleshCount=0;
			if (TimeoutId > 0) {
				clearTimeout(TimeoutId);
				TimeoutId = 0;
			}
		}
	}
	
	function showRead() {
		$("#tb-read").show();
		$("#footer-read").show();
		$("#tb-write").hide();
		$("#footer-write").hide();
		
		var elef = document.getElementById("tab-read");
		var elen = document.getElementById("tab-write");
		
		if(elef)
			elef.className = "tabfocus";
		if(elen)
			elen.className = "tabblur";
	}
	function showWrite() {
		$("#tb-read").hide();
		$("#footer-read").hide();
		
		$("#tb-write").show();
		$("#footer-write").show();
		
		var elef = document.getElementById("tab-write");
		var elen = document.getElementById("tab-read");
		if(elef)
			elef.className = "tabfocus";
		if(elen)
			elen.className = "tabblur";
	}
	/**************写入地址**********************/
	//写入
	function write(IsRepeat){
		var pid = document.getElementById("hidProcessId3").value;
		var ElevatorId = $("#ElevatorId").val();
		var ProtocolType = $("#ProtocolType").val();
		var isupdate = 1;
		var IsRead = 0;

		if (IsRepeat == undefined || IsRepeat == null) {
			IsRepeat = 0;
		}

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return;
		}

		if (IsRepeat == 1 && pid == '') {
			alert("请先读取故障码!");
			return;
		}

        if (pid == '') {
            pid = NewGuid();

            isupdate = 0;
        }
       
        var ids = "";
		var isError = false;

		$("input[name='write-chk']:checked").each(function() {
			var address = $("#write-txtAddress" + this.value).val();
			var len = $("#write-txtLength" + this.value).val();
			var writerValue=$("#write-txtData" + this.value).val();
			
			if (address != "" && len != "" && writerValue !="") {
				try {
					parseInt(address, 16);
				} catch (ex) {
					alert("地址错误,请输入16进制值！");
					isError = true;
					return false;
				}

				if (len == "") {
					alert("地址长度错误,不能为空，并且只能输入值为1、2、4。");
					isError = true;
					return false;
				} else {
					if (len == "1" || len == "2"|| len == "4") {
					} else {
						alert("地址长度错误,不能为空，并且只能输入值为1、2、4。");
						isError = true;
						return false;
					}
				}
				
				
                if (!writerValue) {
                    alert("请输入写入值！");
                    return;
                }
                else if (writerValue.length != len * 2) {
                    alert("请输入正确长度的写入值！");
                    return;
                }
                else {
                    var regx = new RegExp("[a-fA-F0-9]{" + len * 2 + "}");
                    var rs = regx.exec(writerValue);

                    if (!rs) {
                        alert("请输入十六进制的写入值！");
                        return;
                    }
                }
               
                ids += '{"Address":"' + address + '","Length":"' + len + '","WriteValue":"' + writerValue + '","AddressType":"' + 0 + '"}' + ',';
			}
		});

		if (isError) {
			return;
		}
		
        if (ids != "") {
            ids = "[" + ids.substr(0, ids.length - 1) + "]";
            ids = escape(ids);
        }
        
        document.getElementById("hidProcessId3").value = pid;
        DCategory = "d36247ab-4bab-472d-8d6f-a8d31e282e4a";
        
        if (ids == "") {
            alert("请选择或输入需要读取物理地址!");
            return;
        }
        var param = {
    			ElevatorId : ElevatorId,
    			ProcessId : pid,
    			ProtocolType : ProtocolType,
    			Ids : ids,
    			IsUpdate : isupdate,
    			DCategory : DCategory,
    			IsRead : IsRead,
    			IsRepeat : IsRepeat
    		};
    		GetAPIData("/api/ajax/AddAddress", JSON.stringify(param),onWriteSuccess, err, null, null, true, false, null,"正在发送命令,请稍侯...");
	}
	//写入成功
	function onWriteSuccess(data){
         if (data) {
             alert("发送命令成功,请稍侯...");
             writeRefresh();
         }
	}
	//刷新
	function writeRefresh(){
        var pid3 = document.getElementById("hidProcessId3").value;

        if (pid3 != '') {
            var jsonString = '{ "ProcessId": "'+pid3+'"}';
            GetAPIData("/api/ajax/GetElevatorAddressValue", jsonString, onWriteRefreshSuccess, err, null, null, true,false, null, "正在刷新,请稍侯...");
        }
	}
	//刷新成功
	function onWriteRefreshSuccess(data) {
		try {
			if(!data || !data.Data)
				return;
			
			 var objResult = eval("(" + data.Data + ")");
			 var len = objResult ? objResult.length : 0;
			 if (typeof objResult != 'undefined' && len > 0) {
				for (var i = 0; i < len; i++) {
					var item = objResult[i];
		
					$("input[name='write-chk']:checked").each(function() {
						var address = $("#write-txtAddress" + this.value).val();
						if (address.toUpperCase() == item.AddressInput) {
								$("#write-txtData" + this.value).html(item.Data);
								$("#write-txtResult" + this.value).html((item.IsSuccess? "成功" : ""));
								return false;
						}
					});
				}
			 }
			// 地址读取
				if (RefleshCount < 4) {
					TimeoutId = setTimeout(writeRefresh, 5000);
					RefleshCount++;
				} else {
					RefleshCount=0;
					if (TimeoutId > 0) {
						clearTimeout(TimeoutId);
						TimeoutId = 0;
					}
				}
		}
		catch (err) {
		}
    }
	function checkPermisssions(){
		GetAPIData("/api/elevators/GetAddressPermissionsByUserId",'',
				onGetPermissionsSuccess,
				err, null, null, true,
				false, null, '');
	};
	function onGetPermissionsSuccess(data){
		if (typeof data != 'undefined' && data) {
			if(data.Data=="0" || data.Data=="1"){
				showWrite();
			}
			else{
				alert("没有写入的权限，请联系管理员！");
				return false;
			}
		}
	};
	/********************************/
	return {};
})();
/** **************************地址读取 结束*********************************** */
/*********************故障码读取*******************/
var FaultRWModule = (function() {
	var TimeoutId = 0, RefleshCount = 0, ModelName = "";
	WLJQ(document).on('pagehide', '#FaultRW', function() {
		if (TimeoutId > 0)
			clearTimeout(TimeoutId);

		RefleshCount = 0;
		TimeoutId = 0;
		ModelName = "";
	});
	WLJQ(document).on('pageshow','#FaultRW',function() {
		try {
			RefleshCount = 0;
			TimeoutId = 0;
			$("#btnRead").on("click", function() {
				send();
			});
			$("#btnReRead").on("click", function() {
				send(1);
			});
			$("#btnRefresh").on("click", function() {
				refresh();
			});

			var assetnum = getUrlParam('assetnum');
			if (assetnum != "") {
				var param = {
					assetnum : assetnum
				};
				GetAPIData("/api/elevators/GetFaultElevatorInfoNew",
						JSON.stringify(param),
						onGetElevatorInfoSuccess,
						err, null, null, true,
						false, null, '正在加载,请稍侯...');
			}
		} catch (err) {
		}
	});
	// 获取电梯信息成功
	function onGetElevatorInfoSuccess(data) {
		if (typeof data != 'undefined' && data) {
			var objResult = eval("(" + data.Data + ")");
			var obj = objResult.ds[0];

			if (typeof obj != 'undefined') {
				$('#txtDeviceNo').html(obj.DeviceNo);
				$('#txtAddress').html(obj.InstallSite);
				$('#txtBudingName').html(obj.BuildingName);
				$('#ElevatorId').val(obj.Id);
				$('#ProtocolType').val(obj.ProtocolType);
				$('#ProtocolTypeName').val(obj.TerminalTypeName);
				ModelName = obj.ModelName.toUpperCase();

				// 遥监状态
				if (obj.IsException == "0") {
					$('#lbZuangtai').html("遥监正常");
				} else {
					$('#lbZuangtai').html("遥监异常");
				}

				$('#SearchResult').html(obj.HistoryHTML);

				$("#chkAll").prop("checked", true);
				CheckAll();
				// 终端类型：CA09则显示:故障次数，主微机故障码，副微机故障码，时间 add by lxm 2016.8.25
				// update lxm 2017.2.9 增加mca判断
				var typeName=obj.TerminalTypeName.toUpperCase();
				if (typeName.indexOf("CA09") > -1 || typeName.indexOf("MCA") > -1) {
					$("#content").css({'padding-top':'125px'});
					$("#table-info").show();
				} else {
					$("#table-info").hide();
				}
			}
		}
	};
	// 发送指令
	function send(IsRepeat) {
		RefleshCount = 0;
		var pid = document.getElementById("hidProcessId1").value;
		var ElevatorId = $("#ElevatorId").val();
		var ProtocolType = $("#ProtocolType").val();
		var isupdate = 1;
		var IsRead = 1;

		if (IsRepeat == undefined || IsRepeat == null) {
			IsRepeat = 0;
		}

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return;
		}

		if (pid == '') {

			pid = NewGuid();

			isupdate = 0;

			document.getElementById("hidProcessId1").value = pid;
		}

		ids = getSelected();
		DCategory = "30075d43-6a8c-45cc-ae4a-705c9982a158";
		if (ids == "") {
			alert("请选择需要读取历史故障!");
			return;
		}

		var param = {
			ElevatorId : ElevatorId,
			ProcessId : pid,
			ProtocolType : ProtocolType,
			Ids : ids,
			IsUpdate : isupdate,
			DCategory : DCategory,
			IsRead : IsRead,
			IsRepeat : IsRepeat
		};
		GetAPIData("/api/ajax/AddAddress", JSON.stringify(param),
				onSentSuccess, null, null, null, true, false, null,
				"正在发送命令,请稍侯...");
	}
	;
	function getSelected() {
		var id = "";

		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			id += arr[0] + ",";
		});

		if (id != '') {
			id = id.substring(0, id.length - 1);
		}

		return id;
	}
	/* 每隔5秒后自动刷新一次，共4次后停止自动刷新 */
	function onSentSuccess(data) {
		refresh();
	};
	// 刷新数据
	function refresh() {
		var pid1 = document.getElementById("hidProcessId1").value;
		var ElevatorId = $("#ElevatorId").val();

		if (ElevatorId == '') {
			alert("请先选择电梯!");
			return;
		}
		if (pid1 != '') {
			if (IsCheck()) {
				var ProtocolTypeName = $("#ProtocolTypeName").val();
				var param = {
					pid : pid1,
					ProtocolTypeName : ProtocolTypeName
				};
				GetAPIData("/api/elevators/GetManualAddressRead", JSON
						.stringify(param), onGetManualAddressReadSuccess,
						onGetManualAddressReadFault, null, null, true, false,
						null, "正在刷新,请稍侯...");
			}
		}
	};
	// 显示数据
	function onGetManualAddressReadSuccess(data) {
		if (typeof data != 'undefined' && data) {
			var objResult = eval("(" + data.Data + ")");

			var len = (objResult && objResult.ds) ? objResult.ds.length : 0;

			if (typeof objResult != 'undefined' && len > 0) {

				for (var i = 0; i < len; i++) {
					$("input[name='chk']").each(function(index, value) {
						if (this.checked) {
							// G3III，G3II,G3III W11，G3II W11
							// 的故障读取，没有转成10进制
							// ProtocolTypeName判断是否G3开头,G3开头使用10进制,HGP使用10进制
							// parseInt("D6001510",16)
							var dr = objResult.ds[index];

							if ($.trim(dr.Data).length > 0) {
								if (((!!$('#ProtocolTypeName').val()) && $('#ProtocolTypeName').val().indexOf("G3") == 0)|| ModelName == "HGP") {
									$("#Data" + (index + 1)).html("数据:"+ parseInt(dr.Data,16));
								} else {
									$("#Data" + (index + 1)).html("数据:"+ (dr.Data || ''));
								}
								// /终端类型：CA09则显示:故障次数，主微机故障码，副微机故障码，时间
								// add by lxm 2016.8.25
								// update by lxm 2017.2.9 增加MCA判断
								var typeName=$('#ProtocolTypeName').val().toUpperCase();
								if (typeName.indexOf("CA09") > -1 || typeName.indexOf("MCA")>-1 ) {
									if (dr.Description == "故障次数") {
										$("#lblFaultCount").html(parseInt(dr.Data,16));
									} else {
										$("#maincode"+ (index + 1)).html("主微机:"+ (dr.MainCode || ''));
										$("#subcode"+ (index + 1)).html("副微机:"+ (dr.SubCode || ''));
										$("#faulttime"+ (index + 1)).html("故障时间:<br/>"+ (dr.FaultTime || ''));
									}
								}
							}
						}
					});
				}
			}
		}

		// 故障读取
		if (RefleshCount < 4) {
			TimeoutId = setTimeout(refresh, 5000);
			RefleshCount++;
		} else {
			if (TimeoutId > 0) {
				clearTimeout(TimeoutId);
				TimeoutId = 0;
			}
		}
	}
	;

	// 获取失败
	function onGetManualAddressReadFault(msg) {
		err(msg);
	}
	;
	function IsCheck() {

		var result = true;
		try {
			var value = $("#Remark1").html();

			if (typeof value != 'undefined' && value != "") {
				if (value.indexOf('占用') > -1) {
					result = false;
				}
			}

		} catch (err) {
		}

		return result;
	}
	;
	return {
		showDetail:function(address,index,that){
			
			var processId= $("#hidProcessId1").val();
			var elevatorId=$("#ElevatorId").val();
			var protocolType=$("#ProtocolType").val();
			var data=$("#Data"+index).html();
			if(data.length<=0){
				alert("数据为空,请选查询故障！");
				return ;
			}
				
			changePage("FaultCodeDetail.html?address="+address+"&elevatorId="+elevatorId+"&data="+data+"&processId="+processId+"&protocolType="+protocolType);
		}
	};
})();
/*****************************************/
var FaultCodeDetailModule = (function() {
	WLJQ(document).on('pageshow','#FaultCodeDetail',function() {
		loadData();
	});
	function loadData(){
		var elevatorId = getUrlParam('elevatorId')||'';
		var data = getUrlParam('data')||'';
		var processId = getUrlParam('processId')||'';
		var protocolType = getUrlParam('protocolType')||'';
		var address = getUrlParam('address')||'';
		var param = {
				 ElevatorId:elevatorId
				,Data:data
				,ProcessId:processId
				,ProtocolType:protocolType
				,Address:address

			};
			GetAPIData("/api/malfunctionTransfer/GetFaultCodeDetail", JSON.stringify(param),onSuccess, null, null, null, true, false, null,"正在发送命令,请稍侯...");
	}
	function onSuccess(data){
		
		if (typeof data != 'undefined' && data) {
			var objResult = eval("(" + data.Data + ")");
			if(objResult){
				
				if(objResult.Main)
					setMainData(objResult.Main);
				
				if(objResult.Detail)
					setDetailData(objResult.Detail);
				
				if(objResult.Status)
					setStatusData(objResult.Status);
				
				if(objResult.InputStatus)
					setInputStatusData(objResult.InputStatus);
				
				if(objResult.OutputStatus)
					setOutputStatusData(objResult.OutputStatus);
				
				if(objResult.MalfunctionDate)
					setMalfunctionDateData(objResult.MalfunctionDate);
				
			}
		}
	}
	//基本数据
	function setMainData(data){
		if(data && data.length>0){
			var rowItem=data[0];
			
			$("#lbMainFaultCode").html(rowItem.MainFaultCode ||'');
			$("#lbMainFaultCodeDesc").html(rowItem.MainFaultCodeDesc ||'');
			$("#lbSubFaultCode").html(rowItem.SubFaultCode ||'');
			$("#lbDescFaultCodeDesc").html(rowItem.DescFaultCodeDesc ||'');
			$("#lbACD").html(rowItem.ACD ||'');
			$("#lbACDDesc").html(rowItem.ACDDesc ||'');
		}
	}
	//明细数据
	function setDetailData(data){
		var html=[];
		if(data && data.length>0){
			for(var i=0,len=data.length;i<len;i++){
				var rowItem=data[i];
				html.push("<li style=\"height:12px;line-height:12px;font-size:12px;\">");
				html.push("<div class=\"ui-grid-a\">");
				html.push("<div class=\"ui-block-a\"><strong>"+(rowItem.Name ||'')+"</strong></div>");
				html.push("<div class=\"ui-block-b\">"+(rowItem.Value||'')+"</div>");
				html.push("</div>");
				html.push("</li>");	
			}
		}
		$("#listview-detail").html(html.join(''));
		$("#listview-detail").listview( "refresh" );
	};
	//状态
	function setStatusData(data){
		setData(data);
	};
	//输入状态
	function setInputStatusData(data){
		setData(data);
	};
	//输出状态
	function setOutputStatusData(data){
		setData(data);
	};
	function setData(data){
		var html=[];
		if(data && data.length>0){
			for(var i=0,len=data.length;i<len;i++){
				var rowItem=data[i];
				html.push(rowItem.Value);
			}
		}
		$("#content").append(html.join(''));
	}
	//故障时间
	function setMalfunctionDateData(data){
		var html=[];
		html.push("<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\">")
		html.push("<li data-role=\"list-divider\" style=\"height:12px;line-height:12px;font-size:12px;text-align:left;\" class=\"ui-li-divider ui-bar-inherit ui-first-child\">故障时间</li>")
		
		
		if(data && data.length>0){
			for(var i=0,len=data.length;i<len;i++){
				var rowItem=data[i];
				
				html.push("<li class=\"ui-li-static ui-body-inherit ui-last-child\" style=\"height:12px;line-height:12px;font-size:12px;\">");
				html.push("<div class=\"ui-grid-a\">");
				html.push("<div class=\"ui-block-a\">"+rowItem.Name+"</div>");
				html.push("<div class=\"ui-block-b\">"+rowItem.Value+"</div>");
				html.push("</div>");
				html.push("</li>");
				
			}
		}
		$("#content").append(html.join(''));
	};
	
})();
/*************************************************************************/
(function() {
	var PAGE_ID="#faultrwsearch", pageSource = '';
	
	WLJQ(document).on('pageshow',PAGE_ID,function() {
		pageSource = getUrlParam('source');
	
		$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress").on("tap", function() {$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});});
		$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress").on("change",function() {
			if ($.trim($("#txtDeviceNo").val()).length > 0 || $.trim($("#txtCompany").val()).length > 0|| $.trim($("#txtBuilding").val()).length > 0 || $.trim($("#txtAddress").val().length) > 0) {
				$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
			} else {
				$("#btnsearch").removeClass('ui-btn-active');
				$("#btnsearch").removeAttr('background-color');
				$("#btnsearch").css({"color" : "#000"});
			}
		});
		$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress").on("blur",function() {
			if ($.trim($("#txtDeviceNo").val()).length > 0|| $.trim($("#txtCompany").val()).length > 0|| $.trim($("#txtBuilding").val()).length > 0 || $.trim($("#txtAddress").val().length) > 0) {
				$("#btnsearch").css({"background-color" : "#3388cc","color" : "#fff"});
			} else {
				$("#btnsearch").removeClass('ui-btn-active');
	
				$("#btnsearch").removeAttr('background-color');
				$("#btnsearch").css({"color" : "#000"});
			}
		});
		
		$("#btnsearchok").on("click", function() {
			ok();
		});
		$("#btnsearch").on("click", function() {
			SearchModule.search();
		});
		
	});
	function ok() {
		var id = "";
		$("input[name='chk']:checked").each(function() {
			id = this.value;
			return false;
		});
		if (id == "") {
			alert("请选择电梯!");
			return false;
		} else {
			var filename = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
			var arr = filename.split('?');
	
			var source = getUrlParam('source');
			
			changePage((pageSource || arr[0]) + '?assetnum=' + id);
			return true;
		}
	}
})();