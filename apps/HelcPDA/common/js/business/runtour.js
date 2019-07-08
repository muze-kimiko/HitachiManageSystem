/**
 *  运行巡视
 */
var RuntourModule = (function() {
	var  PAGE_ID="#runtour"
		,RunStatus = "-1"
		, ZaibaoStatus = "-1"
		, BuildingName = ""
		, DeviceNo = ""
		, MaintenanceName = ""
		, myScroll=null;
	
	var OperatorType={
			Normal:"01720D66-EA61-4554-8C64-9AF3F60E75E6"
			,Park:"BC85D1CC-EC21-4DEE-9CA6-380086EE8D9F"
			,Fault:"AC85D1CC-EC21-4DEE-9CA6-380086998D9F"
			,Repair:"7B61DF3A-111E-46E6-8084-C024A61AB97C"
	};
		

	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		TotalCount = PageSetting.TotalCount;
		myScroll=null;
		PageSetting.reset();
	});
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
				 containerId :"wrapperRuntour",
				 pullDownId : "pullDownRuntour",
				 pullDownAction : reflesh
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {

		try {
			DeviceNo = getUrlParam('DeviceNo')|| getUrlParam('deviceno');
			
			$(document).delegate('#test', 'click', function() {
				$('#simpledialog2').simpledialog({
					'mode' : 'string',
				    'prompt' : 'Password?',
				    'inputPassword': true,
				    'buttons' : {
				      'OK': {
				        click: function () {
				          $('#dialogoutput').text($('#dialoglink').attr('data-string'));
				        }
				      },
				      'Cancel': {
				        click: function () { },
				        icon: "delete",
				        theme: "c"
				      }
				    }

				});
			});
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
			$("#runstatus").on("change", function(obj) {
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
				}, 300) ;
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
			
			RunStatus = $("#runstatus").val();
			ZaibaoStatus = "-1";
			BuildingName = ""; // 地盤
			MaintenanceName = "";// 分公司
			DeviceNo = getUrlParam('DeviceNo');

			getData(PageSize,PageIndex,DeviceNo, BuildingName, MaintenanceName, RunStatus,
					ZaibaoStatus);
		} catch (err) {
		}

	}
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-realtime").on("click", function() {
			MainMenuExt(20);
		});
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
	}
	
	function addFavorite(){
		var favoriteInfo = [ '', '', '', '', '', ];
		$("input[name='chk']:checked").each(function() {
			var paraArr = this.value.split(',');
			favoriteInfo = paraArr[2];
			return false;
		});
		var info = favoriteInfo.split(':');
		var fid = "runtour";
		var sid = "runtour.html?DeviceNo=" + info[0];

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
		DeviceNo = '';
		RunStatus = $("#runstatus").val();
		ZaibaoStatus = $("#zaibaostatus").val();

		PageIndex = 1;
		$("#SearchResult").html('');
		$("#div-more").hide();

		getData(PageSize,PageIndex,DeviceNo, BuildingName, MaintenanceName, RunStatus,
				ZaibaoStatus);
		$("#SearchUI").popup("close");
	}
	// 下一页
	function nextPage() {
		PageIndex = PageIndex + 1;
		PageSize=PageSetting.PageSize;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		RunStatus = $("#runstatus").val();
		ZaibaoStatus = $("#zaibaostatus").val();

		getData(PageSize,PageIndex,DeviceNo, BuildingName, MaintenanceName, RunStatus,
				ZaibaoStatus);
	}
	// 获取数据
	function getData(pageSize,pageIndex,deviceNo, buildingName, maintenanceName, runStatus,
			zaibaoStatus, callback) {
		var param = {
			PageSize : pageSize,
			PageIndex : pageIndex,
			OrderBy : "",
			strWhere : "",
			Status : runStatus,
			ZaibaoStatus : zaibaoStatus,
			BuildingName : buildingName,
			MaintenanceName : maintenanceName,
			DeviceNo : deviceNo
		};
		var ck=callback || onSearchSuccess;
		
		GetAPIData("/api/Elevators/GetRunMonitorListExt", JSON
				.stringify(param), ck, err, null, null, true, false,
				null, '正在查询,请稍侯...');
	}
	// 查询成功
	function onSearchSuccess(data) {
		showData(data, false);
	}
	// 手动刷新
	function reflesh(){
		$("#pullDownRuntour").css({display:'none'});
		$("#SearchResult").hide();
		fleshPageSize=PageSize*PageIndex;
		
	getData(fleshPageSize,PageIndex,DeviceNo, BuildingName, MaintenanceName, RunStatus,
			ZaibaoStatus, onRefresh);
	}
	function onRefresh(data) {
		showData(data, true);
	}
	// 查询失败
	function onSearchFault(msg) {
		err(msg);
	};
	
	function showData(data, isReflesh) {
		$("#rowcount").html("0");
		$("#more").html("");
		
		switch ($("#runstatus").val()) {
			case OperatorType.Normal:
				showNormal(data, isReflesh);
				break;
			case OperatorType.Park:
				showPark(data, isReflesh);
				break;
			case  OperatorType.Fault:
				showFault(data, isReflesh);
				break;
			case OperatorType.Repair:
				showRepair(data, isReflesh);
				break;
			default:
				showNormal(data, isReflesh);
				break;
		}
	}
	// 正常运行
	function showNormal(data, isReflesh) {
		var html = [];
		$("#filter").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(PageIndex<=1 || isReflesh)
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
					obj.isActive = CommonModule.getActiveString(item.IsActive);
					obj.isTerminalCutT = CommonModule.getTerminalConnectingString(item.IsTerminalCutT);
					obj.lastContactDate = (!!item.LastContactDate) ? item.LastContactDate.toString().replace(" ", "<br />"): "";
					obj.isDebug = CommonModule.getDebugString(item.IsDebug);
					obj.isWatchCutT = CommonModule.getConnectingString(item.SoftVersion, item.IsWatchCutT);
					obj.fontColor = CommonModule.IsToday(item.LastContactDate) ? "green": "red";
					obj.buildingName = item.BuildingName || "";
					obj.filiale = item.Filiale || item.filiale || "";
					obj.maintenanceName = item.maintenanceName|| item.MaintenanceName || '';

					// 维保状态
					if (item.isService || item.IsService) {
						obj.serviceWord = "<strong ><font color='green'>&nbsp;&nbsp;在保</font></strong>";// 在保
					} else {
						obj.serviceWord = "<strong><font color='red'>&nbsp;&nbsp;脱保</font></strong>";// 脱保
					}
					
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
					
					html.push(buildNormalRowItem(obj));
					
					obj=null;
					item=null;
				}
				
				var remainCout = PageSetting.TotalCount - PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#more").html('更多[剩余' + remainCout + '条]');
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} else {
				$("#div-more").hide();
			};		
		}
		
		if(PageIndex<=1  || isReflesh)
			html.push("</table>");
		
		if(isReflesh){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}
		
		$("#SearchResult").show();
		if(myScroll)
			myScroll.refresh();
	}
	function buildNormalRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td colspan=\"4\" style=\"padding-left:8px;\"  >@installSite</td>");
		html.push("</tr>");
		html.push("<tr class=\"bottomxian\" style=\"background-color:#e4e4e4;height:20px; line-height:20px;\">");
		html.push("<td colspan=\"2\" style=\"padding-left:8px;\"  class=\"bottomxian\">");
		html.push("<span onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" style=\"cursor:pointer;color:#0092E7;\">@deviceNo</span>");
		html.push("</td>");
		html.push("<td  class=\"bottomxian\">@phone</td>");
		html.push("<td style=\"text-align:center;\"  class=\"bottomxian\">@serviceWord&nbsp;");
		html.push("<div style=\"width:16px; height:16px; line-height:16px; background:url(images/duankouhao.png) no-repeat; text-align:center; color:#FFFFFF;float:right;\">@terminalPort</div>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\"><input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@favoriteInfo\"></td>");
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
		.replace(new RegExp("@serviceWord", 'g'), obj.serviceWord)
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
	// 泊梯
	function showPark(data, isAppend) {
		var html = [];
		$("#filter").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(PageIndex<=1 || isAppend)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
			

			if (objResult && objResult.ds && objResult.ds1[0]&& objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isAppend){
				      PageSetting.TotalCount = objResult.ds1[0].datacount;
				      $("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];
					var obj={};
					
					obj.id = item.Id || item.ID || item.id;
					obj.deviceNo = item.DeviceNo || "";
					obj.modelName = (!!(item.ModelName || item.modelName)) ? (item.ModelName || item.modelName): "";
					obj.installSite = item.InstallSite || "";
					obj.buildingName = item.BuildingName || "";
					obj.filiale = item.Filiale || "";
					obj.maintenanceName = item.maintenanceName || item.MaintenanceName || "";

					// 维保状态
					if (item.isService || item.IsService) {
						obj.serviceWord = "<strong ><font color='green'>&nbsp;&nbsp;在保</font></strong>";// 在保
					} else {
						obj.serviceWord = "<strong><font color='red'>&nbsp;&nbsp;脱保</font></strong>";// 脱保
					}    
					
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
					
					html.push(buildParkRowItem(obj));
					
					obj=null;
					item=null;
				}
				
				var remainCout = PageSetting.TotalCount - PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#more").html('更多[剩余' + remainCout + '条]');
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} else {
				$("#div-more").hide();
			};		
		}
		if(PageIndex<=1  || isAppend)
			html.push("</table>");
		
		if(isAppend){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}
		
		$("#SearchResult").show();
		
		if(myScroll)
			myScroll.refresh();
	}
	function buildParkRowItem(obj){
		var html=[];
		
		html.push("<tr>");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@favoriteInfo\"></td>");
		html.push("<td nowrap style=\"padding-left:8px;\">");
		html.push("<span onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" style=\"cursor:pointer;color:#0092E7;\">@deviceNo</span>");
		html.push("</td>");
		html.push("<td nowrap>@modelName</td>");
		html.push("<td nowrap>@serviceWord</td>");
		html.push("<td nowrap>泊梯</td>");
		html.push("</tr>");

		html.push("<tr style=\"height:20px; line-height:20px;\">");
		html.push("<td colspan=\"4\" style=\"padding-left:8px;\"  class=\"bottomxian\">@installSite</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@modelName", 'g'), obj.modelName)
		.replace(new RegExp("@serviceWord", 'g'), obj.serviceWord)
		.replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo);
		
		return result;
	}
	// 电梯故障
	function showFault(data, isAppend) {
		var html = [];
		$("#filter").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			
			if(PageIndex<=1 || isAppend)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");

			if (objResult && objResult.ds && objResult.ds1[0]&& objResult.ds1[0].datacount && objResult.ds1[0].datacount > 0) {
				if (PageSetting.PageIndex <= 1 || isAppend){
				    PageSetting.TotalCount = objResult.ds1[0].datacount;
				    $("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];

					var obj={};
					
					obj.id = item.ElevatorID || item.ID || item.Id || item.id;
					obj.deviceNo = item.DeviceNo || "";

					obj.buildingName = item.BuildingName || "";
					obj.installSite = item.InstallSite || "";
					obj.filiale = item.BranchName || "";

					obj.maintenanceName = (!!item.MaintenanceName) ? item.MaintenanceName: "";
					obj.modelName = (!!item.ModelNoName) ? item.ModelNoName.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					obj.description = recombineDes(item.Description).replace(new RegExp("{ModelNo}", 'g'), obj.modelName);
					obj.floorCode = item.FloorCode || "";
					obj.malfunctionDate=item.MalfunctionDate || '';
					
					// 维保状态
					if (item.isService || item.IsService) {
						obj.serviceWord = "<strong ><font color='green'>&nbsp;&nbsp;在保</font></strong>";// 在保
					} else {
						obj.serviceWord = "<strong><font color='red'>&nbsp;&nbsp;脱保</font></strong>";// 脱保
					}    
					
					if (!!item.RelievedDate) {
						obj.relievedDateDesc="<td nowrap=\"nowrap\" style=\"text-align:center;\" class=\"bottomxian\">√&nbsp;<a href=\"javascript:void(0)\"  style=\"color:#000;font-weight:nomarl;\">"+ item.RelievedDate + "</a></td>";
					} else {
						obj.relievedDateDesc="<td nowrap=\"nowrap\" style=\"text-align:center;\" class=\"bottomxian\">未解除</td>";
					}
					
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
					
					html.push(buildFaultRowItem(obj));
					
					obj=null;
					item=null;
				}
				
				var remainCout = PageSetting.TotalCount - PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#more").html('更多[剩余' + remainCout + '条]');
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} else {
				$("#div-more").hide();
			};		
		}
		if(PageIndex<=1  || isAppend)
			html.push("</table>");
		
		if(isAppend){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}
		
		$("#SearchResult").show();
		
		if(myScroll)
			myScroll.refresh();
	}
	function buildFaultRowItem(obj){
		var html=[];
		html.push("<tr style=\"background-color:#e4e4e4;\">");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@favoriteInfo\">");
		html.push("</td>");
		html.push("<td nowrap style=\"text-align:left;width:20%\">");
		html.push("<span onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" style=\"cursor:pointer;color:#0092E7;\">@deviceNo</span>");
		html.push("</td>");
		html.push("<td nowrap style=\"text-align:center;width:20%\">@modelName</td>");
		html.push("<td nowrap style=\"text-align:center;width:20%\">@serviceWord</td>");
		html.push("<td nowrap style=\"text-align:center;width:20%\">故障中</td>");
		html.push("</tr>");

		html.push("<tr style=\"height:20px; line-height:20px;background-color:#e4e4e4;\">");
		html.push("<td colspan=\"4\" class=\"bottomxian\">@installSite</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td <td colspan=\"5\">");
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
		html.push("<tr style=\"height:20px; line-height:20px;\">");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">&nbsp;</td>");
		html.push("<td nowrap style=\"padding-left:8px;\" >@description</td>");
		html.push("<td nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;color:red;\">!&nbsp;");
		html.push("<a href=\"javascript:void(0)\" style=\"color:red;\"  onclick=\"viewft2('@id')\">@malfunctionDate</a>");
		html.push("</td>");
		html.push("</tr>");
		
		html.push("<tr style=\"height:20px; line-height:20px;\">");
		html.push("<td nowrap style=\"padding-left:8px;\"  class=\"bottomxian\">故障楼层:@floorCode</td>");

		html.push("@relievedDateDesc");
		
		html.push("</tr>");
		html.push("</table>");
		html.push("</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@modelName", 'g'), obj.modelName)
		.replace(new RegExp("@serviceWord", 'g'), obj.serviceWord)
		.replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@description", 'g'), obj.description)
		.replace(new RegExp("@malfunctionDate", 'g'), obj.malfunctionDate)
		.replace(new RegExp("@relievedDateDesc", 'g'), obj.relievedDateDesc);
		
		return result;
	}
	// 维护作业
	function showRepair(data, isAppend) {
		var html = [];
         $("filter").show();
         
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(PageIndex<=1 || isAppend)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");

			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isAppend){
				    PageSetting.TotalCount = objResult.ds1[0].datacount;
				    $("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];
					var obj={};
					
					obj.id = item.ElevatorID || item.ID || item.Id || item.id;
					obj.deviceNo = item.DeviceNo || "";
					obj.buildingName = item.BuildingName || "";
					obj.installSite = item.InstallSite || "";
					obj.filiale = item.BranchName || "";
					obj.maintenanceName = (!!item.MaintenanceName) ? item.MaintenanceName: "";
					obj.modelName = (!!item.ModelNoName) ? item.ModelNoName.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					obj.description = recombineDes(item.Description).replace(new RegExp("{ModelNo}", 'g'), obj.modelName );
					obj.orderNo = item.OrderNO || item.OrderNo || item.orderNO|| item.orderNo || item.orderno || "";
					obj.floorCode = item.FloorCode || "";
					obj.malfunctionDate=item.MalfunctionDate || "";
				
					// 维保状态
					if (item.isService || item.IsService) {
						obj.serviceWord = "<strong ><font color='green'>&nbsp;&nbsp;在保</font></strong>";// 在保
					} else {
						obj.serviceWord = "<strong><font color='red'>&nbsp;&nbsp;脱保</font></strong>";// 脱保
					}    
					
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
					
					html.push(buildPairRowItem(obj));
					
					obj=null;
					item=null;
				}
				var remainCout = PageSetting.TotalCount - PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#more").html('更多[剩余' + remainCout + '条]');
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} else {
				$("#div-more").hide();
			};		
		}
		if(PageIndex<=1  || isAppend)
			html.push("</table>");
		
		if(isAppend){
			$("#SearchResult").html(html.join(''));
		}
		else{
			if(PageIndex<=1)
				$("#SearchResult").append(html.join(''));
			else
				$("#SearchResult table").append(html.join(''));
		}
		
		$("#SearchResult").show();
		
		if(myScroll)
			myScroll.refresh();
	}
	function buildPairRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"background-color:#e4e4e4;\">");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@favoriteInfo\"></td>");
		html.push("<td nowrap><span onclick=\"ElevatorModule.showDetail('@id,@deviceNo')\" style=\"cursor:pointer;color:#0092E7;\">@deviceNo</span></td>");
		html.push("<td nowrap>@modelName</td>");
		html.push("<td nowrap>@serviceWord</td>");
		html.push("<td nowrap>维修中</td>");
		html.push("</tr>");

		html.push("<tr style=\"height:20px; line-height:20px;background-color:#e4e4e4;\">");
		html.push("<td colspan=\"4\" style=\"padding-left:8px;\"  class=\"bottomxian\">@installSite</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td <td colspan=\"5\">");
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
		html.push("<tr style=\"height:20px; line-height:20px;\">");
		html.push("<td width=\"23px\" rowspan=\"2\" style=\"padding-left:8px;\" class=\"bottomxian\">&nbsp;</td>");
		html.push("<td nowrap style=\"padding-left:8px;\" >@description</td>");
		html.push("<td nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;color:red;\">!&nbsp;");
		html.push("<a href=\"javascript:void(0)\" style=\"color:red;\"  onclick=\"viewft2('@id')\">@malfunctionDate</a>");
		html.push("</td>");
		html.push("</tr>");
		
		html.push("<tr style=\"height:20px; line-height:20px;\">");
		html.push("<td nowrap style=\"padding-left:8px;\"  class=\"bottomxian\">故障楼层：@floorCode</td>");
		html.push("<td nowrap style=\"text-align:center;\"  class=\"bottomxian\">故障单号：@orderNo</td>");
		html.push("</tr>");
		html.push("</table>");
		html.push("</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@modelName", 'g'), obj.modelName)
		.replace(new RegExp("@serviceWord", 'g'), obj.serviceWord)
		.replace(new RegExp("@description", 'g'), obj.description)
		.replace(new RegExp("@malfunctionDate", 'g'), obj.malfunctionDate)
		.replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@floorCode", 'g'), obj.floorCode)
		.replace(new RegExp("@orderNo", 'g'), obj.orderNo);
		
		return result;
	}
	function _changeStatus(obj) {
		$("#div-more").hide();
		var obj = document.getElementById('runstatus');

		if (obj != null && typeof obj != 'undefined') {
			RunStatus = $("#runstatus").val();
		} else
			RunStatus = "-1";
		
		var objZaibaoStatus = document.getElementById('zaibaostatus');

		if (objZaibaoStatus != null && typeof objZaibaoStatus != 'undefined') {
			ZaibaoStatus = $("#zaibaostatus").val();
		} else
			ZaibaoStatus = "-1";

		$("#SearchResult").html('');
		PageSetting.PageIndex = 1;
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		getData(PageSize,PageIndex,DeviceNo, BuildingName, MaintenanceName, RunStatus,
				ZaibaoStatus);
	}
	function recombineDes(source) {
		var result = source || "";
		if (!source)
			return "";

		var mainCode = "";
		var secondCode = "";

		var startPoint = source.lastIndexOf("(");

		if (startPoint < 0)
			return source;

		var content = source.substring(0, source.indexOf("("));

		var code = source.substring(startPoint + 1, source.length - 1);
		if (code == "")
			return source;

		var codeArr = code.split(' ');

		if (codeArr == null || codeArr.length <= 0)
			return content;
		else {
			mainCode = codeArr[0];

			if (codeArr.length > 1)
				secondCode = codeArr[1];
		}

		result = content + "("
				+ "<a href=\"javascript:void(0)\" onclick=\"JumpToRetrieval('"
				+ "{ModelNo}" + "','" + mainCode
				+ "','5AD930EB-3761-4B01-BAFF-38C281F561F0')\">" + mainCode
				+ "</a> " + "  "
				+ "<a href=\"javascript:void(0)\" onclick=\"JumpToRetrieval('"
				+ "{ModelNo}" + "','" + secondCode
				+ "','C403E933-213C-4AF3-9DB7-92D25BF0CB99')\">" + secondCode
				+ "</a>)";
		return result;

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