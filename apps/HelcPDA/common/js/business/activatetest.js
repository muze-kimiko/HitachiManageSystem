/**
 * 
 */
/** ***********************激活调试 开始******************************* */
var ActiveTestModule = (function() {
	var PAGE_ID="#ActivateTest",SEARCH_PAGE_ID="#activesearch";
	var SetStatusParas = null;// 操作状态参数
	var myScroll=null;
	var InitParas = {
			Tips : {
					 FirstIn : true // 第一次进入
					,LastonlineTip : { // 最后上线时间提示
						TipId : "" // 最后上线时间弹出提示框电梯工号
						,HasTipArr : [] // 已经提示的工号数组
						,Has24TipArr : []// 最后上线时间”为24小时外
					},
					TermianlCurTip : { // 终端断开提示
						TipId : "" // 终端断开弹出提示框电梯工号
						,HasTipArr : []// 已经提示的工号数组
					}
			}
			,CurrentList : [] // 当前页面电梯列表
			,DeviceNo : ""
			,Tel : ""
			,Building : ""
			,Address : ""
			,Port : ""
			,TimeoutId : 0
			,IsRefresh : false// 点击激活调试后刷新
			,RefreshDeviceNo : ""// 激活后要刷新的工号
	};

	WLJQ(document).on('pagehide', SEARCH_PAGE_ID, function() {
		InitParas.Tips.LastonlineTip.TipId = "";
		InitParas.Tips.TermianlCurTip.TipId = "";
		if (InitParas.TimeoutId > 0) {
			clearTimeout(InitParas.TimeoutId);
		}
	});

	WLJQ(document).on('pageshow',SEARCH_PAGE_ID,searchPageShow);
	
	function searchPageShow() {
		$("#txtDeviceNo,#txtTel,#txtBuilding,#txtAddress").on("tap",
				function() {
					$("#searchok").css({
						"background-color" : "#3388cc",
						"color" : "#fff"
					});
				});

		$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress").on(
				"change",
				function() {
					var deviceNo = $("#txtDeviceNo").val();
					var tel = $("#txtTel").val();
					var building = $("#txtBuilding").val();
					var address = $("#txtAddress").val();

					if ($.trim(deviceNo).length > 0
							|| $.trim(tel).length > 0
							|| $.trim(building).length > 0
							|| $.trim(address).length > 0) {
						$("#searchok").css({
							"background-color" : "#3388cc",
							"color" : "#fff"
						});
					} else {
						$("#searchok").removeClass('ui-btn-active');
						$("#searchok").removeAttr('background-color');
						$("#searchok").css({
							"color" : "#000"
						});
					}
				});
		$("#txtDeviceNo,#txtCompany,#txtBuilding,#txtAddress").on(
				"blur",
				function() {
					var deviceNo = $("#txtDeviceNo").val();
					var tel = $("#txtTel").val();
					var building = $("#txtBuilding").val();
					var address = $("#txtAddress").val();

					if ($.trim(deviceNo).length > 0
							|| $.trim(tel).length > 0
							|| $.trim(building).length > 0
							|| $.trim(address).length > 0) {
						$("#searchok").css({
							"background-color" : "#3388cc",
							"color" : "#fff"
						});
					} else {
						$("#searchok").removeClass('ui-btn-active');
						$("#searchok").removeAttr('background-color');
						$("#searchok").css({
							"color" : "#000"
						});
					}
				});
		$("#searchok").click("on",function(){
			ActiveSearchOK();
		});
		

		initSearch('txtDeviceNo');
	}
	function ActiveSearchOK() {
		var deviceNo = $("#txtDeviceNo").val();
		var tel = $("#txtTel").val();
		var building = $("#txtBuilding").val();
		var address = $("#txtAddress").val();
		var port = $("#txtPort").val();
	
		if (deviceNo == "" && tel == "" && building == "" && address == "") {
			alert("请输入搜索条件!");
			return false;
		}
	
		addSearch('txtDeviceNo');
	
		changePage('ActivateTest.html?action=search&assetnum='
				+ encodeURIComponent(deviceNo) + '&tel='
				+ encodeURIComponent(tel) + '&building='
				+ encodeURIComponent(building) + '&address='
				+ encodeURIComponent(address) + '&port='
				+ encodeURIComponent(port));
	}
	
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
				 containerId :"wrapper",
				 pullDownId : "pullDown",
				 pullDownAction : refresh,
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	
	WLJQ(document).on('pagehide', PAGE_ID, function() {
		SetStatusParas = null;
		myScroll=null;
		PageSetting.reset();
	});
		
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("ActivateTest-back",
					"ActivateTes-external-back");
			// 下一页
			$("#more").on("click", function() {
				nextPage();
			});
			// 返回首页
			$("#home,#home-edit").on("click", function() {
				home(1);
			});
			// 新增
			$("#btnAdd,#btnTipAdd").on("click", function() {
				changePage('add.html');
			});
			// 保存
			$("#btnSave").click("click", function() {
				Save();
			});
			// 激活
			$("#btnActive,#btnActive2").on("click", function() {
				setStatus('RegisterOrActive', true, undefined, true);
			//	setStatus('IsActive', true, undefined, true);
			});
			// 取消激活
			$("#btnCancelActive").on("click", function() {
				setStatus('RegisterOrActive', false, 'check');
			//	setStatus('IsActive', false, 'check');
			});
			// 调试
			$("#btnDebug,#btnDebug2").on("click", function() {
				setStatus('IsDebug', true);
			});
			// 取消调试
			$("#btnCancelDebug").on("click", function() {
				setStatus('IsDebug', false, 'check');
			});
			
			$("#btnVersion,#btnVersion2").on("click", function() {
				setStatus('ReadNum', true);
			});
			
			// 底部导航事件
			bindNavEvent();
			//
			$("#activestatus").on("change", function() {
				changeStatus(this);
			});
			// 权限
			if (typeof HQFlag != 'undefined'
					&& HQFlag.toLowerCase() == 'y') {
				$("#tb-nonadmin").hide();
				$("#tb-admin").show();
			} else {
				$("#tb-nonadmin").show();
				$("#tb-admin").hide();
			}
			// 最后上线时间为空
			$("#btn-ShowLastonline-tip").on("click",function() {
				if (!$("#showlastonline").is(":checked")) {
					var lastonlineTip=InitParas.Tips.LastonlineTip;
					deleteItem(lastonlineTip.HasTipArr,lastonlineTip.TipId);
				}

				$("#popupLastonlineDialog").popup("close");
				return;
			});
			// 最后上线时间为24小时外
			$("#btn-ShowLastonline24-tip").on("click",function() {
				if (!$("#showlastonline24").is(":checked")) {
					var lastonlineTip=InitParas.Tips.LastonlineTip;
					deleteItem(lastonlineTip.Has24TipArr,lastonlineTip.TipId);
				}

				$("#popupLastonline24Dialog").popup("close");
				return;
			});
			// 终端设备为断开状态
			$("#btn-ShowTerminalCut-tip").on("click",function() {
				if (!$("#showcut").is(":checked")) {
					var termianlCurTip=InitParas.Tips.TermianlCurTip;
					deleteItem(termianlCurTip.HasTipArr,termianlCurTip.TipId);
				}

				$("#popupCutDialog").popup("close");
				return;
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
				setTimeout(function(){
					$("#AddGroupUI").popup("open");
				}, 30) ;
			});
			
			$("#btn-add-Save").on("click",function(){
				FavoriteGroupModule.add($("#txtGroupName").val(),onAddGroupSuccess);
			});
			$("#btn-add-cancel").on("click",function(){
				$("#AddGroupUI").popup("close");
			});
			$("#btn-mt-refresh").click("on",function(){
				TerminalMessageModule.refresh();
			});
			$("#btn-mt-next").click("on",function(){
				TerminalMessageModule.next();
			});
			
			InitParas.CurrentList.length = 0;
			PageSetting.PageIndex = 1;
			search();
		} catch (err) {
			// alert(err);
		}
	}
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-realtime").on("click", function() {
			MainMenuExt2(MainMenuEnum.RemoteMonitor);
		});

		$("#footer-datarw").on("click", function() {
			MainMenuExt(40);
		});

		$("#footer-faultfile").on("click", function() {
			MainMenuExt(50);
		});

		$("#footer-favorite").on("click",function() {
			var isSelected=false;
			$("input[name='chk']:checked").each(function() {
				isSelected=true;
				return
			});
			if(!isSelected){
				alert('请选择要收藏的记录.');
				return;
			}
			
			FavoriteGroupModule.getAll(null);
		});
	}
	
	function addFavorite(){
		var ids = [];
		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			ids.push(arr[0]);
		});
		if (ids.length <= 0) {
			alert("请选择要收藏的调试记录!");
			return;
		}
		var fid = "activetest";

		var objArr = [];
		var obj;
		for (var i = 0, len = ids.length; i < len; i++) {
			var info = $("#hid" + ids[i]).val().split(',');

			obj = {
				SId : "ActivateTest.html?action=search&assetnum="
						+ info[0],
				DeviceNo : info[0],
				Building : info[1],
				InstallSite : info[2],
				Filiale : info[3],
				Maintenance : info[4],
				Fid : fid,
				Uid : userid
			};
			objArr.push(obj);
		}
		
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
	}
	// 查询
	function search() {
		$("#popupTipDialog").css("width", document.body.clientWidth * 0.85);

		PageSetting.PageIndex = 1;
		
		InitParas.DeviceNo = getUrlParam('assetnum');
		
		InitParas.Tel = getUrlParam('tel');
		InitParas.Building = getUrlParam('building');
		InitParas.Address = getUrlParam('address');
		InitParas.Port = getUrlParam('port');
		
		var action = getUrlParam('action');
		
		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			deviceNo : InitParas.DeviceNo,
			tel : InitParas.Tel,
			building : InitParas.Building,
			address : InitParas.Address,
			port : InitParas.Port,
			activestatus : $("#activestatus").val(),
			QueryType : 0
		};

		if (action == "search") {

		} else if (action == "jump") {
			param.QueryType = 1;
		} else {
			if (InitParas.Tips.FirstIn) {
				document.getElementById("activestatus").value = 1;
				param.activestatus = 1;
			}
		}
		getData(param,onSearchSuccess, onSearchFault);
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			deviceNo : InitParas.DeviceNo,
			tel : InitParas.Tel,
			building : InitParas.Building,
			address : InitParas.Address,
			port : InitParas.Port,
			activestatus : $("#activestatus").val()
		};
		getData(param,onSearchSuccess, onSearchFault);
	}
	
	//从接口获取数据
	function getData(param,onSuccess,onFault,msg){
		var requestUrl="/api/elevators/GetActiveListExt";
		var tip=msg || '正在查询,请稍侯...';
		onFault=onFault||err;
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, onFault, null,null, true, false, null, tip);
	}
	
	// 查询成功
	function onSearchSuccess(data) {
		onSuccess(data,false);
	}
	
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	};
	
	//刷新
	function refresh(){
		$("#pullDown").hide();
		$("#SearchResult").hide();
		
		var param = {
			PageSize : PageSetting.PageSize*PageSetting.PageIndex,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			deviceNo : InitParas.DeviceNo,
			tel : InitParas.Tel,
			building : InitParas.Building,
			address : InitParas.Address,
			port : InitParas.Port,
			activestatus : $("#activestatus").val()
		};
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	
	// 查询成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}
	
	// 查询成功
	function onSuccess(data,isReFlesh) {
		var html = [];
		$("#filter").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			if(PageSetting.PageIndex<=1 || isReFlesh)
				html.push("<table class=\"activetestlist\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size:15px;\">");
			
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isReFlesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
				    $("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var obj={};
					
					obj.id = item.Id || item.ID || item.id;
					obj.terminalId = item.TerminalID||'';
					obj.installSite = item.InstallSite || "";
					obj.deviceNo = item.DeviceNo || "";
					obj.modelName = getModelName(item.ModelName);
					
					var phone ='';
					if (item.SimStatusDesc == "已销卡") {
						phone = "! ".fontcolor("red") + item.Phone;
					} else {
						phone = item.Phone || "";
					}
					obj.phone="<a onclick=\"SmsReceiptModule.ToSmsReceipt('SmsReceipt.html?tel="+ item.Phone + "');\" style=\"color:#4B5459;font-weight:lighter;\">"+phone+"</a>";
					
					
					obj.terminalPort = item.TerminalPort || "";
					obj.isActive = CommonModule.getActiveString(item.IsActive,item.ActiveStatusFlag);
					obj.isTerminalCutT = CommonModule.getTerminalConnectingString(item.IsTerminalCutT);
					obj.isDebug = CommonModule.getDebugString(item.IsDebug);
					obj.isWatchCutT = CommonModule.getConnectingString(item.SoftVersion, item.IsWatchCutT);
					obj.buildingName = item.BuildingName || "";
					obj.filiale = item.Filiale || "";
					obj.maintenanceName = item.MaintenanceName || "";
					obj.lastContactDate = (!!item.LastContactDate) ? item.LastContactDate.toString().replace(" ", "<br />"): "";
					obj.fontColor = (CommonModule.IsToday(item.LastContactDate) ? "green": "red");
					obj.favoriteInfo = obj.deviceNo + "," + obj.buildingName + ","+ obj.installSite + "," + obj.filiale + ","+ obj.maintenanceName;
					obj.tmpara = obj.id + "','" + item.TerminalID + "','" + obj.deviceNo;
					obj.isOnline=item.IsOnline||'0'; 
	
					var obj2 = {
						Id:obj.id,
						DeviceNo :obj.deviceNo,
						LastContactDate: item.LastContactDate || "",
						IsTerminalCut:!!item.IsTerminalCutT
					};
	
					var objItem = getObj(InitParas.CurrentList, "DeviceNo",obj.deviceNo);
	
					if (!objItem)
						InitParas.CurrentList.push(obj2);
					
					html.push(buildRowItem(obj));
					
					obj=null,item=null,obj2=null;
				}
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageSetting.PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#remaincount").html(remainCout);
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} else {
				$("#div-more").hide();
				$("#remaincount").html("0");
				$("#rowcount").html("0");
			};		
		}
		if(PageSetting.PageIndex<=1  || isReFlesh)
			html.push("</table>");
			
		if(isReFlesh){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageSetting.PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}
		html=null;
		$("#SearchResult").show();
		
		if(myScroll && myScroll.refresh)
			myScroll.refresh();
	}
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td colspan=\"6\" style=\"padding-left:8px;\">@installSite</td>");
		html.push("</tr>");
		html.push("<tr style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td nowrap=\"nowrap\" colspan=\"2\" style=\"padding-left:8px;\">");
		html.push("<a href=\"javascript:TerminalMessageModule.ViewEdit('@deviceNo');\">");
		html.push("<img src=\"images/edit.png\" />@deviceNo");
		html.push("</a>");
		html.push("</td>");
		html.push("<td nowrap=\"nowrap\" style=\"padding-left:5px;\">@modelName</td>");
		html.push("<td nowrap=\"nowrap\">@phone</td>");
		html.push("<td><div style=\"width:16px; height:16px; line-height:16px; background:url(images/duankouhao.png) no-repeat; text-align:center; color:#FFFFFF;\">@terminalPort</div></td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td rowspan=\"2\" style=\"padding-left:8px;border-bottom:1px solid #ABABAB;\">");
		html.push("<input type=\"checkbox\" name=\"chk\" class=\"my-checkbox\"  value=\"@id,@deviceNo\">");
		html.push("<input type=\"hidden\" name=\"hidden\" id=\"hid@id\" value=\"@favoriteInfo\"></td>");
		html.push("<td nowrap=\"nowrap\">@isActive</td>");
		html.push("<td nowrap=\"nowrap\">@isTerminalCutT</td>");
		html.push("<td rowspan=\"2\" style=\"border-bottom:1px solid #ABABAB;\">");
		html.push("<div style=\"float:left;display:inline;width:100px;text-align:center;\">");
		html.push("<a href=\"javascript:void(0)\" onclick=\"TerminalMessageModule.ViewTM('@tmpara')\"><font color=\"@fontColor\">@lastContactDate&nbsp;</font></a>");
		html.push("</div>");
		html.push("</td>");
		html.push("<td rowspan=\"2\" style=\"border-bottom:1px solid #ABABAB;\">");
		if(obj.terminalId){
			if(obj.isOnline=="0")
				html.push("<img src=\"images/noonline.png\" style=\"vertical-align:middle;height:20px;width:20px;\"/>");
			else
				html.push("<img src=\"images/online.png\" style=\"vertical-align:middle;height:20px;width:20px;\"/>");
		}
		
		html.push("</td>");
		html.push("<td rowspan=\"2\" style=\"border-bottom:1px solid #ABABAB;\">");
		html.push("<div style=\"float:left;display:inline;\">");
		html.push("<a href=\"javascript:TerminalMessageModule.ViewTM('@tmpara');\"><img src=\"images/detail.png\" /></a>");
		html.push("</div>");
		html.push("</td>");
		html.push("</tr>");
		
		html.push("<tr class=\"bottomxian\">");
		
		html.push("<td style=\"border-bottom:1px solid #ABABAB;\" nowrap=\"nowrap\" >@isDebug</td>");
		html.push("<td style=\"border-bottom:1px solid #ABABAB;\" nowrap=\"nowrap\" >@isWatchCutT</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@modelName", 'g'), obj.modelName)
		.replace(new RegExp("@phone", 'g'), obj.phone)
		.replace(new RegExp("@terminalPort", 'g'), obj.terminalPort)
		.replace(new RegExp("@lastContactDate", 'g'), obj.lastContactDate)
		.replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@isActive", 'g'), obj.isActive)
		.replace(new RegExp("@isTerminalCutT", 'g'), obj.isTerminalCutT)
		.replace(new RegExp("@fontColor", 'g'), obj.fontColor)
		.replace(new RegExp("@isDebug", 'g'), obj.isDebug)
		.replace(new RegExp("@isWatchCutT", 'g'), obj.isWatchCutT)
		.replace(new RegExp("@tmpara", 'g'), obj.tmpara);
		
		return result;
	}
	function getModelName(value) {
		var s = "未知";

		if (value) {
			var str = (value.Length > 3 ? value.substring(0, 3) : value);

			var models = [ "NPX", "NPM", "GVF", "NPH", "UAX", "UA", "NF",
					"HGH", "NBS", "NPH", "MCA", "HGE", "HGM", "EX", "LF",
					"HGP", "LCA" ];

			for (var i = 0,len=models.length; i < len; i++) {
				if (models[i].toLowerCase() == str.toLowerCase())
					return models[i];
			}
		}

		return s;
	}
	//
	function changeStatus(obj) {
		InitParas.CurrentList.length = 0;
		PageSetting.PageIndex = 1;

		if ($("#div-more"))
			$("#div-more").hide();

		$("#SearchResult").html('');

		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			deviceNo : InitParas.DeviceNo,
			tel : InitParas.Tel,
			building : InitParas.Building,
			address : InitParas.Address,
			port : InitParas.Port,
			activestatus : $("#activestatus").val()
		};

		GetAPIData("/api/elevators/GetActiveListExt", JSON.stringify(param),
				onSearchSuccess, err, null, null, true, false, null,
				'正在查询,请稍侯...');
		return true;
	}
	// 根据值获取数组项
	function getItem(arr, id) {
		if (arr == null || arr.length <= 0)
			return null;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == id)
				return arr[i];
		}
		return null;
	}
	// 删除数据项
	function deleteItem(arr, id) {
		if (arr != null && arr.length > 0 && id != null) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == id) {
					arr.splice(i, 1);
					break;
				}
			}
		}
	}
	// 根据值获取数组项
	function getObj(objArr, filedName, filedValue) {
		if (objArr == null || objArr.length <= 0)
			return null;
		for (var i = 0; i < objArr.length; i++) {
			if (objArr[i][filedName] == filedValue)
				return objArr[i];
		}
		return null;
	}
	// 删除数据项
	function deleteObj(objArr, filedName, filedValue) {
		if (objArr != null && objArr.length > 0 && filedValue != "") {
			for (var i = 0; i < arr.length; i++) {
				if (objArr[i][filedName] == filedValue) {
					objArr.splice(i, 1);
					break;
				}
			}
		}
	}
	// 激活，调试，取消激活，取消调试
	function setStatus(sTypeCode, sStatusID, check, isReflesh) {

		var hour = 0;
		TypeCodePage = sTypeCode;

		var ids = "";
		var deviceNos = "";

		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			ids += arr[0] + ",";
			deviceNos += arr[1] + ",";
		});

		if (ids != '') {
			ids = ids.substring(0, ids.length - 1);
		}

		if (deviceNos != '') {
			deviceNos = deviceNos.substring(0, deviceNos.length - 1);
		}

		if (ids != "") {
			if (typeof check != 'undefined' && HQFlag.toLowerCase() != 'y') {
				alert("权限不够，请联系总部人员!");
				return false;
			}
			// 当一务记录时
			// 若电梯的“最后上线时间”为空，用户点击“激活”或“调试”按钮时，则弹出提示“该电话卡未上线，无法激活，请按以下步骤检查：
			// 1、电话号码是否正确；
			// 2、终端断送电后重新操作；
			// 3、联系遥监技术支持”。。。
			// 若电梯的“终端设备”为断开状态，用户点击“激活”或“调试”按钮时，则弹出提示“终端与主板接线断开，无法激活，请按以下步骤检查：
			// 1、检查终端与主控板的接线；
			// 2、电话号码是否正确；
			// 3、终端断送电后重新操作；
			// 4、联系遥监技术支持”。。。
			// 在弹出框做个勾选“不再提示”的选项，勾选后就不再重复提示，除非是重新登录
			// 若电梯的“最后上线时间”为24小时外，用户点击“激活”或“调试”按钮时，则弹出提示“该电话卡已长期未上线，无法激活调试，请按以下步骤检查：
			// 1、终端断送电后重新操作；
			// 2、电话号码是否正确；
			// 3、终端是否损坏；
			// 4、联系遥监技术支持”
			// 。。。在弹出框做个勾选“不再提示”的选项，勾选后就不再重复提示，除非是重新登录

			// var jsonString = '{ "TypeCode":"' + sTypeCode + '", "StatusID":
			// "'+ sStatusID + '","sValue": "' + ids + '", "Hour": "' + hour+ '"
			// }';

			var param = {
				"TypeCode" : sTypeCode,
				"StatusID" : sStatusID.toString(),
				"sValue" : ids,
				"Hour" : hour
			};

			SetStatusParas = param;

			if (!!sStatusID && deviceNos.split(",").length == 1) {
				var item = getObj(InitParas.CurrentList, "DeviceNo", deviceNos);

				if (item) {
					var lastonlineTip=InitParas.Tips.LastonlineTip;
					if (!!item.LastContactDate) {
						// 若电梯的“最后上线时间”为24小时外
						if (DateDiff("h", item.LastContactDate, Now()) > 24) {
							
							var hasShow24Item = getItem(lastonlineTip.Has24TipArr,deviceNos);

							if (!hasShow24Item) {
								lastonlineTip.TipId = deviceNos;
								lastonlineTip.Has24TipArr.push(deviceNos);

								$("#popupLastonline24Dialog").popup("open");
							}

							return;
						}
						// 若电梯的“终端设备”为断开状态，
						else if (!!item.IsTerminalCut) {
							var termianlCurTip=InitParas.Tips.TermianlCurTip;
							var hasShowTerminalCutItem = getItem(termianlCurTip.HasTipArr,deviceNos);

							if (!hasShowTerminalCutItem) {
								termianlCurTip.TipId = deviceNos;
								termianlCurTip.HasTipArr.push(deviceNos);

								$("#popupCutDialog").popup("open");
							}

							return;
						} else {
							if ((sTypeCode="RegisterOrActive" || sTypeCode == "IsActive") && isReflesh) {
								InitParas.RefreshDeviceNo = deviceNos;
								InitParas.IsRefresh = true;
							}
							setStatusForElevator(param);
							// GetAPIData("/api/ajax/SetStatusForElevator",JSON.stringify(param),
							// onSetStatusSuccess, err, null,null, true, false,
							// null, '正在发送命令,请稍侯......');
						}
					}
					// 若电梯的“最后上线时间”为空
					else {
						var hasShowLastonlineItem = getItem(lastonlineTip.HasTipArr,deviceNos);

						if (!hasShowLastonlineItem) {
							lastonlineTip.TipId = deviceNos;
							lastonlineTip.HasTipArr.push(deviceNos);

							$("#popupLastonlineDialog").popup("open");
						}

						return;
					}
				}
			} else {
				setStatusForElevator(param);
				// GetAPIData("/api/ajax/SetStatusForElevator",
				// JSON.stringify(param),onSetStatusSuccess, err, null, null,
				// true, false, null,'正在发送命令,请稍侯......');
			}
		} else {
			alert("请选择电梯!");
		}
		$(this).css('background-image', 'url(images/button_03.png)');

	}
	// y设置状态
	function setStatusForElevator(param) {
		// 如果是激活或调试则过滤掉已销卡状态数据
		if ((param.TypeCode == "RegisterOrActive" || param.TypeCode == "IsDebug")
				&& param.StatusID.toLowerCase() == "true") {
			GetAPIData("/api/ajax/GetElevatorCardStatus", JSON.stringify({
				elevatorId : param.sValue
			}), onFilterSuccess, null, null, null, true, false, null,
					'正在发送命令,请稍侯......');
		} else {
			GetAPIData("/api/ajax/SetStatusForElevator", JSON.stringify(param),
					onSetStatusSuccess, err, null, null, true, false, null,
					'正在发送命令,请稍侯......');
		}
	}
	// 过滤成功 后将过滤好的数据发送到服务器
	function onFilterSuccess(result) {
		var cancelList = [];// 已销卡数据列表
		var sentList = [];// 过滤后数据列表
		if (result) {
			var objResult = JSON.parse(result.Data);

			if (objResult && objResult.ds) {

				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];

					if ((item.Status || '').toUpperCase() == '6D0C7C41-7E36-4026-807A-D532D5442137')
						cancelList.push(item.Phone);
					else
						sentList.push(item.EvlevatorId);
				}
			}
		}
		if (cancelList.length > 0) {
			alert("电话卡" + cancelList.join(',') + "已经销卡，无法发送(激活、调试)操作指令");
		}

		if (sentList.length <= 0) {
			return;
		}
		// 过滤后数据
		SetStatusParas.sValue = sentList.join(',');

		GetAPIData("/api/ajax/SetStatusForElevator", JSON
				.stringify(SetStatusParas), onSetStatusSuccess, err, null,
				null, true, false, null, '正在发送命令,请稍侯......');
	}

	function onSetStatusSuccess(data) {
		if (InitParas.IsRefresh) {
			if (InitParas.RefreshDeviceNo) {
				var param = {
					DeviceNo : InitParas.RefreshDeviceNo
				};
				GetAPIData("/api/Elevators/GetElevatorByDeviceNo", JSON
						.stringify(param), onGetElevatorSuccess, err, null,
						null, true, false, null, '正在发送命令,请稍侯......');

			} else {
				InitParas.TimeoutId = setTimeout('refreshPage()', 20 * 1000);
			}
		}

		hideLoader();
	}
	function onGetElevatorSuccess(data) {
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var item = objResult.ds[0];

			if (objResult && objResult.ds && objResult.ds1[0]
					&& objResult.ds1[0].datacount) {
				$("#tipcontent").html("工号：[" + item.DeviceNo + "]已激活");

				if (!!item.IsActive) {
					$("#popupActiveTip").popup("open");
					InitParas.TimeoutId = setTimeout('refreshPage()', 20 * 1000);
				}
				InitParas.RefreshDeviceNo = "";
				InitParas.IsRefresh = false;
			}
			item=null,objResult=null;
		}
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
})();
/** ***********************激活调试 结束******************************* */
/** ***********************激活调试--点击明细 终端信息******************************* */
var TerminalMessageModule = (function() {
	var PageSize=2,PageIndex=1,TotalCount=0;
	
	 function isLastPage() {
		if (Math.ceil(TotalCount / PageSize) >= PageIndex)
			return false;
		else
			return true;
	}
	function reset(){
		PageSize=2;
		PageIndex=1;
		TotalCount=0;
	}
	function ViewTM(eid, tid, assetnum) {
		try {
	
			$("#SearchResult2").html("");
			$("#title").html("终端信息-" + assetnum);
			$("#eid").val(eid);
			$("#tid").val(tid);
			$("#assetnum").val(assetnum);
			reset();
			
			if (eid != "" && tid != "") {
				var jsonString = {
					"PageSize":PageSize
					,"PageIndex":PageIndex
					,"strOrder":""
					,"eid":eid
					,"tid":tid
				};
				GetAPIData("/api/elevators/GetTMListExt", JSON.stringify(jsonString),
						onSearchSuccess, err, null, null, true, false, null,
						"正在查询,请稍侯...");
			}
		} catch (err) {
		}
	}
	function onSearchSuccess(data) {
		onSuccess(data,false);
	}
	function tmNext() {
		
		if (isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		PageIndex = PageIndex + 1;
		$("#popupTMList").css("height",$(window).height() + 100 * PageIndex);
		
		var jsonString = {
				"PageSize":PageSize
				,"PageIndex":PageIndex
				,"strOrder":""
				,"eid":$("#eid").val()
				,"tid":$("#tid").val()
		};
		
		GetAPIData("/api/elevators/GetTMListExt", JSON.stringify(jsonString), onSearchSuccess,
				err, null, null, true, false, null, "正在查询,请稍侯...");
	}
	function isLastPage() {
		if (Math.ceil(TotalCount / PageSize) > PageIndex)
			return false;
		else
			return true;
	};
	function refreshTMList() {
		var eid = $("#eid").val();
		var tid = $("#tid").val();
		
		if (eid != "" && tid != "") {
			var jsonString = {
					"PageSize":PageIndex*PageSize
					,"PageIndex":1
					,"strOrder":""
					,"eid":eid 
					,"tid":tid
			};
			
			GetAPIData("/api/elevators/GetTMListExt", JSON.stringify(jsonString),
					onRefreshSuccess, err, null, null, true, false, null,
					'正在刷新,请稍侯...');
		}
	}
	
	function onRefreshSuccess(data) {
		$("#SearchResult2").html('');
		onSuccess(data,true);
	};
	
	
	function onSuccess(data,isReFlesh) {
		var html = [];
	
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			$("#popupTMList").css("width", $(window).width());
			$("#popupTMList").css("height", $(window).height() + 100);
	
			var objResult = JSON.parse(data.Data);
			
			if(PageIndex<=1 || isReFlesh)
				html.push("<ul data-role=\"listview\" class=\"ui-listview\">");
	
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				TotalCount = objResult.ds1[0].datacount;

				var ds=objResult.ds;
				
				for (var i = 0,len=ds.length; i < len; i++) {
					var item=ds[i];
					
					if (i == 0 && (PageIndex == 1 || isReFlesh))
						html.push("<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li-divider ui-bar-inherit ui-li-has-count ui-first-child\" style=\"text-align:right;\">共搜索到"+ TotalCount + "条数据</li>");
	
					html.push("<li><a href=\"#\" class=\"ui-btn\">");
					html.push(rebuiltContent((item.Description || "")));

					html.push("<span class=\"ui-li-count ui-body-inherit\">"+ item.CreatedDate + "</span>");
					html.push("</a></li>");
				}
				
				$("#div-more2").show();
			} else {
				$("#div-more2").hide();
				html.push("<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li-divider ui-bar-inherit ui-li-has-count ui-first-child\" style=\"text-align:right;\">共搜索到0条数据</li>");
			}
			
	
			if(PageIndex<=1  || isReFlesh)
				html.push("</ul>");
				
			if(isReFlesh){
				$("#SearchResult2").html(html.join(''));
			}
			else{
				if(PageIndex<=1)
					$("#SearchResult2").append(html.join(''));
				else
					$("#SearchResult2 ul").append(html.join(''));
			}
	
			$("#popupTMList").popup("open");
			
			html=null;
		} else
			alert("共搜索到0条数");
	}
	function rebuiltContent(data) {
		if (!data)
			return "<p></p>"

		if (data.length <= 18) {
			return "<p>" + data + "</p>";
		} else {
			return "<p>" + data.substring(0, 15) + "</p>"
					+ rebuiltContent(data.substring(15));
		}
	}
	function ViewEdit(assetnum) {
		if (assetnum != "") {
			var param = {assetnum:assetnum};
			GetAPIData("/api/elevators/GetElevatorByAssetNum", JSON.stringify(param),fnGetEditElevatorByAssetNum, err, null, null, true, false,null, "正在加载,请稍侯...");
		}
	}
	function fnGetEditElevatorByAssetNum(data) {
		$("#popupElevatorEdit").css("width", $(window).width());
		$("#popupElevatorEdit").css("height", $(window).height() + 180);

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			
			if (objResult && objResult[0]) {
				var obj=objResult[0];
				
				$('#lbDeviceNo').html(obj.DeviceNo);
				$('#lbBuilding').html(obj.Building);
				$('#lbAddress').html(obj.InstallSite);
				$('#lbFiliale').html(obj.Filiale);
				$('#lbFirstActiveDate').html(obj.FirstActiveDate);
				$('#lbCreatedDate').html(obj.CreatedDate);
				$('#lbPhone').val(obj.Phone);
				$('#lbActiveCode').val(obj.ActiveCode);
				$('#lbTerminalPort').val(obj.TerminalPort);
				$('#lbSoftVersion').html(obj.MainVersion);
				$('#lbCompanyDesc').html(obj.CompanyDesc);
				$('#lbStaffName').html(obj.StaffName);
				$('#lbMobile').html(obj.Mobile);
				$('#lbActiveCode').html(obj.ActiveCode||'');
				$('#lbRemark').val(obj.Remark);
				$('#lbLastContactDate').html(obj.LastContactDate);
				$('#txtElevatorId').val(obj.Id);
				obj=null;
			}
			objResult=null;
		}
		$("#popupElevatorEdit").popup("open");
	}
	return{
		ViewTM:function(eid, tid, assetnum){
			ViewTM(eid, tid, assetnum);
		},
		refresh:function(){
			refreshTMList();
		},
		next:function(){
			tmNext();
		},
		ViewEdit:function(assetnum){
			ViewEdit(assetnum);
		}
	}
})();
/********************************************************/
function Save() {
	try {
		var assetnum = $("#lbDeviceNo").html();
		var phone = $("#lbPhone").val();
		var activeCode = $.trim($("#lbActiveCode").val());
		var terminalPort = $("#lbTerminalPort").val();
		var remark = $("#lbRemark").val();
		var installSite = $("#lbAddress").val();
		var elevatorId = $("#txtElevatorId").val();

		if (assetnum == "") {
			alert("工号为空,保存失败!");
			return false;
		}

		if (phone != "") {
			//update by lxm 2018.9.3
			if(!checkPhone(phone)){
				alert("遥监卡号格式错误,格式为11或13位数据,保存失败!");
				return false;
			}
			/*
			if (!isInt(phone)) {
				alert("遥监卡号格式错误,保存失败!");
				return false;
			}

			if (phone.length != 11 && phone.length != 13) {
				alert("遥监卡号格式错误,保存失败!");
				return false;
			}
			*/
		}

		if (terminalPort == "") {
			alert("端口号为空,保存失败!");
			return false;
		}

		if (!isInt(terminalPort)) {
			alert("端口号格式错误,保存失败!");
			return false;
		}
		//add by lxm 2018.9.3
		if (activeCode != "") {
		    if(!checkActiveCode(activeCode)){
		    	alert("激活码只能为10位的数字,保存失败!");
				return false;	
		    }
		}
		
		try {
			var param = {
				"assetnum":assetnum 
				,"phone": phone 
				,"activecode":activeCode
				,"terminalport":terminalPort
				,"remark":remark
				,"installSite":encodeURIComponent(installSite)
				,"elevatorId":elevatorId
			};
			GetAPIData("/api/elevators/UpdateElevatorByDeviceNoNew", JSON.stringify(param),fnUpdateElevatorByDeviceNo, err, null, null, true,false, null, '保存中,请稍侯...');
		} catch (err) {
			alert(err);
			return false;
		}
	} catch (err) {
		alert(err);
		return false;
	}
}
function fnUpdateElevatorByDeviceNo(data) {
	if (typeof data != 'undefined' && data) {
		if (data.StatusID == 0) {
			if (data.Data.toLowerCase() == 'true') {
				alert('保存成功!');
				$("#back").click();
			} else {
				alert('保存失败!');
				return false;
			}
		} else {
			alert(data.Message);
			return false;
		}
	}
}
//验证数字为十二位
function checkActiveCode(value)
{
    eval("var reg = /\^[0-9]{"+10+"\}$/;");
    var re = new RegExp(reg);
    if (re.test(value))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function checkPhone(value)
{
    eval("var reg = /\^[0-9]{"+11+"\}$/;var reg2 = /\^[0-9]{"+13+"\}$/;");
    
    var re = new RegExp(reg);
    if (re.test(value))
    {
        return true;
    }
    else
    {
    	var re2 = new RegExp(reg2);
    	if(re2.test(value))
    		return true;
    	
        return false;
    }
}
