/**
 * 遥监异常模块
 * 调用：ElevatorModule.showDetail
 */
var DevicetourModule = (function() {
	var PAGE_ID="#devicetour"
		,ActiveStatus = "-1"
		, ZaibaoStatus = "-1"
		, BuildingName = ""
		, DeviceNo = ""
		, MaintenanceName = ""
		, myScroll=null;
	
	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		TotalCount = PageSetting.TotalCount;
		DeviceNo = "";
		myScroll=null;
		PageSetting.reset();
	});
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
				 containerId :"wrapperDevicetour",
				 pullDownId : "pullDownDevicetour",
				 pullDownAction : reflesh
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow(){
		try {
			DeviceNo = getUrlParam('DeviceNo')|| getUrlParam('deviceno');
			// 底部导航按钮
			bindNavEvent();
			// 下一页
			$("#more").on("click", function() {
				nextPage();
			});
			// 维保站
			$("#btnMaintenance").on("click", function() {
				BuildingName = "";
				MaintenanceName = $("#txtKey").val();
				search();
			});
			// 地盤
			$("#btnBulding").on("click", function() {
				MaintenanceName = "";
				BuildingName = $("#txtKey").val();
				search();
			});
			// 显示查询页面
			$("#btnShowSearchUI").on("click", function() {
				showSearchUI();
			});
			$("#activestatus").on("change", function(obj) {
				_changeStatus(obj);
			});
			$("#zaibaostatus").on("change", function(obj) {
				_changeStatus(obj);
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
			
			PageSetting.PageIndex = 1;
			PageIndex = PageSetting.PageIndex;
			PageSize = PageSetting.PageSize;
			
			var param = {
					PageSize : PageSize,
					PageIndex : PageIndex,
					ActiveStatus : "1",// 激活状态
					ZaibaoStatus : "1",// 在保状态
					BuildingName : "",// 地盤
					MaintenanceName : "",// 分公司
				 	DeviceNo : DeviceNo
				};
				getData(param,onSearchSuccess, onSearchFault);
		} catch (err) {
		}
	}
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-activetest").on("click", function() {
			MainMenuExt(30);
		});

		$("#footer-faultfile").on("click", function() {
			MainMenuExt(50);
		});
		$("#footer-favorite").on("click", function() {
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
		$("#footer-elevatorsearch").on("click", function() {
			MainMenuExt(60);
		});
	}
	
	function addFavorite(){
		var favoriteInfo = [ '', '', '', '', '', ];
		$("input[name='chk']:checked").each(function() {
			var paraArr = this.value.split(',');
			favoriteInfo = paraArr[2];
			return false;
		});
		var info = favoriteInfo.split(':');
		var fid = "devicetour";
		var sid = "devicetour.html?DeviceNo=" + info[0];

		var objArr = [];
		var obj;

		obj = {
			SId : sid,
			DeviceNo : info[0],
			Building : info[1],
			InstallSite : info[2],
			Filiale : info[3],
			Maintenance : info[4],
			Fid : fid,
			Uid : userid
		};

		objArr.push(obj);
		
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
		$("#rowcount").html("0");
		$("#div-more").hide();
		$("#SearchResult").html('');
		
		PageSetting.PageIndex = 1;
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;

		var param = {
			PageSize : PageSize,
			PageIndex : PageIndex,
			ActiveStatus : $("#activestatus").val(),
			ZaibaoStatus : $("#zaibaostatus").val(),
			BuildingName : BuildingName,
			MaintenanceName : MaintenanceName,
		 	DeviceNo : DeviceNo
		};
		getData(param,onSearchSuccess, onSearchFault);
	}
	// 下一页
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;
		PageIndex=PageSetting.PageIndex;
		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			ActiveStatus : $("#activestatus").val(),
			ZaibaoStatus : $("#zaibaostatus").val(),
			BuildingName : BuildingName,
			MaintenanceName : MaintenanceName,
		 	DeviceNo : DeviceNo
		};
		getData(param,onSearchSuccess, onSearchFault);
	}
	//从接口获取数据
	function getData(param,onSuccess,onFault,msg){
		var requestUrl="/api/Elevators/GetMonitorListExt";
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
	
	// 手动刷新
	function reflesh(){
		$("#pullDownDevicetour").hide();
		$("#SearchResult").hide();
		var param = {
			PageSize : PageSetting.PageSize*PageSetting.PageIndex,
			PageIndex : 1,
			ActiveStatus : $("#activestatus").val(),
			ZaibaoStatus : $("#zaibaostatus").val(),
			BuildingName : BuildingName,
			MaintenanceName : MaintenanceName,
		 	DeviceNo : DeviceNo
	    };
			
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	// 查询成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}	

	function onSuccess(data, isReflesh) {
		var html = [];
		$("#filter").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(PageSetting.PageIndex<=1 || isReflesh)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
				
	       if (objResult && objResult.ds && objResult.ds1[0]&& objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isReflesh){
		             PageSetting.TotalCount = objResult.ds1[0].datacount;
		             $("#rowcount").html(PageSetting.TotalCount);
				}
			
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					var item = ds[i];
					
					var obj={};
					
					obj.installSite = item.InstallSite || "";
					obj.deviceNo = item.DeviceNo || "";
					obj.id = item.Id || item.ID || item.id || '';
					obj.phone = item.Phone || "";
					obj.terminalPort = item.TerminalPort || "";

					obj.isActive = CommonModule.getActiveString(item.IsActive,item.ActiveStatusFlag);
					obj.isTerminalCutT = CommonModule.getTerminalConnectingString(item.IsTerminalCutT);
					obj.lastContactDate = (!!item.LastContactDate) ? item.LastContactDate.toString().replace(" ", "<br />"): "";
					obj.isDebug = getJinxiuString(item.IsDebug);
					obj.isWatchCutT = CommonModule.getConnectingString(item.SoftVersion, item.IsWatchCutT);
					obj.fontColor = CommonModule.IsToday(item.LastContactDate) ? "green": "red";
					obj.buildingName = item.BuildingName || "";
					obj.filiale = item.Filiale || "";
					obj.maintenanceName = item.maintenanceName|| item.MaintenanceName || '';
					obj.isService=item.isService || item.IsService;
					
					var favoriteArr=[
		                 obj.id,","
		                 ,obj.deviceNo,","
		                 ,obj.deviceNo,":"
		                 ,obj.buildingName,":"
		                 ,obj.installSite,":"
		                 ,obj.filiale,":"
		                 ,obj.maintenanceName
	                 ];
					
					obj.favoriteInfo = favoriteArr.join('');
					
					favoriteArr=null;

					html.push(buildRowItem(obj));
					
					obj=null,item=null;
				}
				
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#more").html('更多[剩余' + remainCout + '条]');
				$("#rowcount").html(PageSetting.TotalCount);
				
				$("#div-more").show();
			} else {
				$("#div-more").hide();
			};		
		}
		
		if(PageSetting.PageIndex<=1  || isReflesh)
			html.push("</table>");
		
		if(isReflesh){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageSetting.PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}

		html=null;
		
		if(myScroll)
			myScroll.refresh();
		
		$("#SearchResult").show();
		
		setTimeout(function(){
			$("#SearchUI").popup("close");
		}, 30) ;
	}
	function buildRowItem(obj){
		var html=[];
		html.push("<tr style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td colspan=\"4\" style=\"padding-left:8px;\"> @installSite </td>");
		html.push("</tr>");
		html.push("<tr class=\"bottomxian\" style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td colspan=\"2\" style=\"padding-left:8px;\"  class=\"bottomxian\">");
		html.push("<span onclick=\"ElevatorModule.showDetail('@id, @deviceNo')\" style=\"cursor:pointer;color:#0092E7;\">@deviceNo </span>");
		html.push("</td>");
		html.push("<td  class=\"bottomxian\">@phone</td>");
		html.push("<td style=\"text-align:center;\"  class=\"bottomxian\">");
		
		if (obj.isService) {
			html.push("<strong ><font color='green'>&nbsp;&nbsp;在保</font></strong>");// 在保
		} else {
			html.push("<strong><font color='red'>&nbsp;&nbsp;脱保</font></strong>");// 脱保
		}  
		html.push("<div style=\"width:16px; height:16px; line-height:16px; background:url(images/duankouhao.png) no-repeat; text-align:center; color:#FFFFFF;float:right;\">@terminalPort</div>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@favoriteInfo\">");
		html.push("</td>");
		html.push("<td style=\"width:32%\">@isActive</td>");
		html.push("<td nowrap style=\"width:32%\">@isTerminalCutT</td>");
		html.push("<td rowspan=\"2\" class=\"bottomxian\">");
		html.push("<div class=\"lastcontactdate\"><font color=\"@fontColor\">@lastContactDate</a>&nbsp;</font></div>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<td nowrap class=\"bottomxian\">@isDebug</td>");
		html.push("<td nowrap class=\"bottomxian\">@isWatchCutT</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@phone", 'g'), obj.phone)
		.replace(new RegExp("@isService", 'g'), obj.isService)
		.replace(new RegExp("@terminalPort", 'g'), obj.terminalPort)
		.replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@isActive", 'g'), obj.isActive)
		.replace(new RegExp("@isTerminalCutT", 'g'), obj.isTerminalCutT)
		.replace(new RegExp("@lastContactDate", 'g'), obj.lastContactDate)
		.replace(new RegExp("@isDebug", 'g'), obj.isDebug)
		.replace(new RegExp("@fontColor", 'g'), obj.fontColor)
		.replace(new RegExp("@isWatchCutT", 'g'), obj.isWatchCutT);
		
		return result;
	}
	// 检修状态
	function getJinxiuString(isDebug) {
		if (!!isDebug)
			return "<div style=\"vertical-align:middle;\"><img src=\"images/zhuangtr.png\" /><span style=\"vertical-align:middle;height:16px;width:16px;\">检修中</span></div>";
		else
			return "<img src=\"images/zhuangtl.png\" style=\"vertical-align:middle;\"/><span style=\"vertical-align:middle;height:16px;width:16px;\">非检修</span></div>";
	}
	function _changeStatus(obj) {
		$("#div-more").hide();
		
		var obj = document.getElementById('activestatus');

		if (obj) {
			ActiveStatus = $("#activestatus").val();
		} else
			ActiveStatus = "-1";

		var objZaibaoStatus = document.getElementById('zaibaostatus');

		if (objZaibaoStatus) {
			ZaibaoStatus = $("#zaibaostatus").val();
		} else
			ZaibaoStatus = "-1";

		$("#SearchResult").html('');

		PageSetting.PageIndex = 1;
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;

		var param = {
				PageSize : PageSize,
				PageIndex : PageIndex,
				ActiveStatus : $("#activestatus").val(),
				ZaibaoStatus : $("#zaibaostatus").val(),
				BuildingName : "",
				MaintenanceName : "",
			 	DeviceNo : DeviceNo
			};
			getData(param,onSearchSuccess, onSearchFault);
	}
	function showSearchUI(para) {
		$("#SearchUI").css("width", $(window).width() * 0.8);
		$("#SearchUI").popup("open");
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
	return {
		changeStatus : function(obj) {
			_changeStatus(obj);
		}
	};
})();