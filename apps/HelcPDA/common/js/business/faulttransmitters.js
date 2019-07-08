/**
 * 
 */
/** *************************故障发报（全部）开始********************************** */
var FaultTransmittersModule = (function() {
	var PAGE_ID="#FaultTransmitters"
		,PageSize = 10
		, PageIndex = 1
		, TotalCount = 0
		, TimeoutId = 0
		, DeviceNo = "";
	var myScroll=null;

	
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
				 containerId :"wrapperFaultTransmitters",
				 pullDownId : "pullDownFaultTransmitters",
				 pullDownAction : refresh,
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	
	WLJQ(document).on('pagehide', PAGE_ID, function() {
		myScroll=null;
		PageSetting.reset();
		
		if (TimeoutId > 0) {
			clearInterval(TimeoutId);
			TimeoutId = 0;
		}

		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		TotalCount = PageSetting.TotalCount;
		DeviceNo = "";
	});
	
	WLJQ(document).on('pageshow', PAGE_ID, pageShow);
	
	function pageShow() {
		try {
			back("FaultTransmitters-back", "FaultTransmitters-external-back");
			DeviceNo = getUrlParam('assetnum');

			PageIndex = getUrlParam('pageindex') || 1;
			var malType = getUrlParam('maltype') || '1';
			var relievedDate = getUrlParam('relieveddate') || '';

			$("#malType").val(malType);
			$("#ddlRelievedDate1").val(relievedDate);

			$("#malType,#ddlRelievedDate1").on("change", function() {
				PageSetting.PageIndex = 1;
				PageIndex = PageSetting.PageIndex;
				PageSize = PageSetting.PageSize;
				TotalCount = PageSetting.TotalCount;
				if ($("#div-more"))
					$("#div-more").css("display", "none");

				$("#SearchResult").html('');
				search();
			});
			$("#more").on("click", function() {
				nextPage();
			});
			// 邦定导航事件
			bindNavEvent();

			//新增
			$("#btnAddGroup").on("click",function(){
				$("#popupFavoriteGroupDialog").popup("close");
				$("#txtGroupName").val('');
				setTimeout('$("#AddGroupUI").popup("open")', 300) ;
			});
			
			$("#btn-add-Save").on("click",function(){
				FavoriteGroupModule.add($("#txtGroupName").val(),onAddGroupSuccess);
			});
			$("#btn-add-cancel").on("click",function(){
				$("#AddGroupUI").popup("close");
			});
			
			search();
			//TimeoutId = setInterval(search, 30000);
		} catch (err) {
			if (TimeoutId > 0) {
				clearInterval(TimeoutId);
				TimeoutId = 0;
			}
		}
	};
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-realtime").on("click", function() {
			MainMenuExt2(MainMenuEnum.RemoteMonitor);
			//MainMenuExt(20);
		});

		$("#footer-datarw").on("click", function() {
			MainMenuExt(40);
		});

		$("#footer-faultfile").on("click", function() {
			MainMenuExt(50);
		});
		// 收藏
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
		$("#btnCancel").on("click",function(){
			$("#popupFavoriteGroupDialog").popup("close");
		});
		
		$("#btnFavorite").on("click",function(){
			addFavorite();
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
		var fid = "FaultTransmitters";

		var objArr = [];
		var obj;
		for (var i = 0, len = ids.length; i < len; i++) {
			var info = $("#hid" + ids[i]).val().split(',');

			obj = {
				SId : "FaultTransmitters.html?action=search&assetnum="
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
		PageSetting.PageIndex = 1;
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;

		var param = {
			PageSize : PageSize,
			PageIndex : PageIndex,
			strOrder : "",
			malType : $("#malType").val(),
			DeviceNo : DeviceNo,
			RelievedDate : $("#ddlRelievedDate1").val()
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
			strOrder : "",
			malType : $("#malType").val(),
			DeviceNo : DeviceNo,
			RelievedDate : $("#ddlRelievedDate1").val()
		};
		getData(param,onSearchSuccess, onSearchFault);
	}
	
	//从接口获取数据
	function getData(param,onSuccess,onFault,msg){
		var requestUrl="/api/elevators/GetFaultCodeInfoDataTable";
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
		$("#pullDownFaultTransmitters").hide();
		$("#SearchResult").hide();
		
		var param = {
			PageSize : PageSetting.PageSize*PageSetting.PageIndex,
			PageIndex : 1,
			strOrder : "",
			malType : $("#malType").val(),
			DeviceNo : DeviceNo,
			RelievedDate : $("#ddlRelievedDate1").val()
		};
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	// 查询成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}	
	
	// 查询成功
	function onSuccess(data,isReflesh) {
		var html = [];
		$("#tbcondition").show();
		
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(PageSetting.PageIndex<=1 || isReflesh)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"guzhangfb\">");
       
			if (objResult && objResult.ds && objResult.ds1[0].datacount > 0) {
				if (PageSetting.PageIndex <= 1 || isReflesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					$("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];
					
					var obj={};
					
					obj.id = item.ID || item.Id || item.id;
					obj.deviceNo = item.DeviceNo || "";
					obj.buildingName = item.BuildingName || "";
					obj.installSite = item.InstallSite || "";
					obj.filiale = item.BranchName || "";
					obj.maintenanceName = item.MaintenanceName || "";
					obj.elevatorId = item.ElevatorID;
					obj.malfunctionDate = item.MalfunctionDate;
					obj.malfunctionDate2 = item.MalfunctionDate.split(' ')[0];
					
					
					if (item.LastIssueTypeName) {
						if (item.LastIssueTypeName == "处理中")
							obj.lastIssueTypeName = '<a href="javascript:void(0)" onclick="archive(\''+ obj.elevatorId+ '\',\''+ obj.id+ '\');">归档</a>['+ item.LastIssueTypeName+ "]";
						else
							obj.lastIssueTypeName = item.LastIssueTypeName;
					} else {
						obj.lastIssueTypeName = '<a href="javascript:void(0)" onclick="archive(\''+ obj.elevatorId + '\',\'' + obj.id + '\');">归档</a>';
					}

					obj.modelNoName = (!!item.ModelNoName) ? item.ModelNoName.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					obj.description = RecombineDes(item.Description).replace(new RegExp("{ModelNo}", 'g'), obj.modelNoName);
					obj.orderNo = (!!item.OrderNO) ? "已下单" : "未下单";
					obj.isDebug = item.IsDebug;
					obj.relievedDate=item.RelievedDate ||"";
					obj.floorCode=item.IsElevator?"故障楼层:"+ item.FloorCode:"";
					obj.favoriteInfo = obj.deviceNo + "," + obj.buildingName + ","+ obj.installSite + "," + obj.filiale + ","+ obj.maintenanceName;
					
					html.push(buildRowItem(obj));
					
					obj=null,item=null;
				}

				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#remaincount").html(remainCout);
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
			} 	
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
				$("#SearchResult table:first").append(html.join(''));
		}
		
		$("#SearchResult").show();
		html=null;
		
		if(myScroll)
			myScroll.refresh();
	}
	function buildRowItem(obj){
		
		var html=[];
		
		html.push("<tr>");
		html.push("<td colspan=\"5\">");
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
		html.push("<tr style=\"background-color:#e4e4e4;\">");
		html.push("<td rowspan=\"2\" style=\"width:8px;padding-left:8px;\" class=\"bottomxian\"><input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\"  value=\"@id,@deviceNo,@favoriteInfo\"></td>");
		html.push("<td nowrap=\"nowrap\" width=\"34%\"><a href=\"javascript:void(0)\" onclick=\"jumpto24hour('@elevatorId','@malfunctionDate2')\">@deviceNo</a><input type=\"hidden\" name=\"hid@id\" id=\"hid@id\" value=\"@favoriteInfo\"></td>");
		html.push("<td nowrap=\"nowrap\" style=\"text-align:center;width:33%\">@modelNoName</td>");
		html.push("<td nowrap=\"nowrap\" width=\"33%\">@lastIssueTypeName</td>");
		html.push("</tr>");
		html.push("<tr style=\"background-color:#e4e4e4;padding-left:8px;\">");
		html.push("<td colspan=\"3\" class=\"bottomxian\">@installSite</td>");
		html.push("</tr>");
		html.push("</table>");
		html.push("</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td colspan=\"2\" nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;\"><font style=\"color:#2B89D3;\">!</font>&nbsp;<a href=\"javascript:void(0)\"  onclick=\"viewft2('@id')\">@malfunctionDate</a></td>");
		html.push("<td colspan=\"2\" nowrap=\"nowrap\" style=\"text-align:center;\">@floorCode</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td colspan=\"4\">");
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
		html.push("<tr>");
		
		html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;\">");
		if(!!obj.isDebug)
			html.push("<font style=\"color:green;\">检修中</font>");
		else
			html.push("<font style=\"color:red;\">非检修</font>");
		html.push("</td>");
		
			
		html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;text-align:right;\">");
		if (!!obj.relievedDate) {
			html.push("√&nbsp;<a href=\"javascript:void(0)\"  style=\"color:#000;font-weight:nomarl;\">@relievedDate</a>");
		} else {
			html.push("<font style=\"color:red;padding-left:5px;\">未解除</font>");
		}
		html.push("</td>");
		
		
		html.push("<td style=\"text-align:right;cursor:pointer;\"  onclick=\"FaultTransmittersModule.showDetail('@id')\"><img src=\"images/detail.png\" /></td>");
		html.push("</tr>");
		html.push("</table>");
		html.push("</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td class=\"bottomxian\" colspan=\"2\" style=\"padding-left:8px;\">@description</td>");
		html.push("<td class=\"bottomxian\" colspan=\"2\" style=\"text-align:right;padding-right:40px;\">@orderNo </td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@modelNoName", 'g'), obj.modelNoName)
		.replace(new RegExp("@lastIssueTypeName", 'g'), obj.lastIssueTypeName)
		.replace(new RegExp("@installSite", 'g'), obj.installSite)
		.replace(new RegExp("@malfunctionDate2", 'g'), obj.malfunctionDate2)
		.replace(new RegExp("@malfunctionDate", 'g'), obj.malfunctionDate)
		.replace(new RegExp("@floorCode", 'g'), obj.floorCode)
		.replace(new RegExp("@isDebug", 'g'), obj.isDebug)
		.replace(new RegExp("@relievedDate", 'g'), obj.relievedDate)
		.replace(new RegExp("@description", 'g'), obj.description)
		.replace(new RegExp("@orderNo", 'g'), obj.orderNo)
		.replace(new RegExp("@elevatorId", 'g'), obj.elevatorId);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {
		if (TimeoutId > 0) {
			clearInterval(TimeoutId);
			TimeoutId = 0;
		}
		$("#popupTipDialog").popup("open");
	}
	//
	function RecombineDes(source) {
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
	function _jumpToIssueRecord() {
		changePage('FaultTransmittersIssue.html?pageindex=' + PageIndex
				+ "&maltype=" + $("#malType").val() + "&relieveddate="
				+ $("#ddlRelievedDate1").val());
	}
	function _showDetail(id) {
		if (id != '') {
			changePage('faultdetail.html?id=' + id);
		} else {
			alert("终端为空!");
		}

	}

	WLJQ(document).on(
			'pageshow',
			'#faultdetail',
			function() {
				try {
					var id = getUrlParam('id');

					var param = {
						id : id
					};
					GetAPIData("/api/elevators/GetFaultCodeDetail", JSON
							.stringify(param), onGetFaultdetailSuccess,
							onGetFaultdetailFault, null, null, false, false);
				} catch (err) {
				}
			});
	function onGetFaultdetailSuccess(data) {

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var item = objResult.ds[0];

			if (typeof item != 'undefined' && item) {
				$('#lbDeviceNo').html(item.DeviceNo);
				$('#lbBuilding').html(item.BuildingName);
				$('#lbAddress').html(item.InstallSite);
				$('#lbFiliale').html(item.BranchName);
				$('#lbMaintenance').html(item.MaintenanceName);
				$('#lbLastIssueTypeName').html(item.LastIssueTypeName);
				$('#lbOrderNO').html(item.OrderNO);

				$('#lbIssueRecordsContent').html(item.IssueRecordsContent);
				$('#lbIssuePerson').html(item.IssuePerson);
				$('#lbLastIssueDate').html(item.LastIssueDate);

				$('#lbRemark').html(item.ElevatorRemark);
				$('#lbBuildingRemark').html(item.BuildingRemark);
				
				item=null;
			}
		}
	}
	function onGetFaultdetailFault(msg) {
		err(msg);
	}
	;
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
		showDetail : function(id) {
			_showDetail(id);
		},
		RebuildDes : function(source) {
			RecombineDes(source);
		},
		jumpToIssueRecord : function() {
			_jumpToIssueRecord();
		}
	};
	
})();
/*********************************************************/
function viewft2(fid) {

	if (fid != '') {
		changePage('FaultTransmittersEdit.html?fid=' + fid);
	} else {
		alert("终端为空!");
	}
}
function viewft(fid) {
	
	$("#popupFaultTransmittersEdit").css("width", $(window).width());
	$("#popupFaultTransmittersEdit").css("height", $(window).height() + 180);

	try {
		var data = {"strWhere":"","strOrder":"","fid":fid};
		GetAPIData("/api/elevators/GetTerminalStatus", JSON.stringify(data),
				fnFaultTransmittersEdit, err, null, null, true, false,
				null, '正在加载,请稍侯...');
	} catch (err) {
	}
	$("#popupFaultTransmittersEdit").popup("open");
}
/*********************故障发报--归档*****************************/
function archive(eid, ids) {
	if(canArchive()){
		changePage('archive.html?eid=' + eid + '&ids=' + ids);
	}
	else{
		alert("没有归档权限");
		return;
	}
}
function canArchive(){
	if(rolename.indexOf("维保")>=0 || rolename.indexOf("总部")>=0 || rolename.indexOf("关键用户")>=0 )
		return true;
	
	return false;
}

function SaveArchive() {
	try {
		var eid = getUrlParam('eid');
		var ids = getUrlParam('ids');

		var IssueType = $("#ddlIssueType").val();
		var Content = $("#txtRecord").val();

		var pdaNO = phoneno;

		if (eid == "" || ids == "") {
			alert("参数错误,保存失败!");
			return false;
		}

		if (IssueType == "") {
			alert("发报类型为空,保存失败!");
			return false;
		}

		if (Content == "") {
			alert("处理记录为空,保存失败!");
			return false;
		}

		try {
			var jsonString = {
					 "ElevatorID":eid
					,"ElevatorMalID": ids
					,"IssueType":IssueType
					, "Content": encodeURIComponent(Content)
					,"staffNO":userid
					,"staffName":encodeURIComponent(usernames)
					,"filiale":encodeURIComponent(company_name)
					,"pdaNO":pdaNO
					};
			
			var result = GetAPIData("/api/elevators/AddIssueRecordByPDA",
					JSON.stringify(jsonString), fnSaveArchive, err, null, null, true,
					false, null, '保存中,请稍侯...');
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

function fnSaveArchive(data) {
	if (typeof data != 'undefined' && data != null && data != "") {
		if (data.StatusID == 0) {
			if (data.Data.toLowerCase() == 'true') {
				alert('保存成功!');
				$("#back").click();
				return true;
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
/****************故障发报--点击时间********************************/
(function() {
	var PAGE_ID="#FaultTransmittersEdit";
		
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow(){
		try {
			
			var fid = getUrlParam('fid');

			var data = {"strWhere":"","strOrder":"","fid":fid};
			
			GetAPIData("/api/elevators/GetTerminalStatus", JSON.stringify(data),
					fnFaultTransmittersEdit, err, null, null, false,
					false);
		} catch (err) {
		}
	}
	function fnFaultTransmittersEdit(data) {
		try {
			if (typeof data != 'undefined' && data) {
				if(data.StatusID!=0){
					alert(data.Message);
					return false;
				}
				var objResult = JSON.parse(data.Data);
				if (objResult && typeof objResult.Table1[0] != 'undefined') {
					$('#Mcstatus').html(objResult.Table1[0].StatusHTML);
				}
				objResult=null;
			}
		} catch (err) {
		}
	}
})();
/*************************************************************/
/****************24小时故障 故障发报--点击工号********************************************/
var Fault24hoursModule = (function() {
	var PAGE_ID='#Fault24hour',MalfunctionDate = "", ElevatorID = "", ID = [];

	WLJQ(document).on('pagehide', PAGE_ID, function() {
		DeviceNo = "";
		MalfunctionDate = "";
		ElevatorID = "";
		PageSetting.PageIndex = 1;
		ID = [];
	});
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		try {
			back("Fault24-back", "Fault24-external-back");

			MalfunctionDate = getUrlParam('currentdate');
			ElevatorID = getUrlParam('elevatorid');

			$("#more").on("click", function() {
				nextPage();
			});

			$("#btnSave").on("click", function() {
				SaveFault24Archive();
			});

			search();
		} catch (err) {
		}
	});

	function SaveFault24Archive() {

		ID = [];

		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			ID.push(arr[0]);
		});
		if (!ID || ID.length <= 0) {
			alert("请选择故障!");
			return;
		}
		// 检查是否符合归档条件
		if (canArchive()) {

			var malIds = ID.join(',');
			var param = {
				MalIds : malIds
			};
			GetAPIData("/api/elevators/GetIssueRecordsList24Ext", JSON
					.stringify(param), onCheckSuccess, onCheckFault, null,
					null, true, false, null, '正在验证,请稍侯...');
		} else {
			alert("没有归档权限.");
		}
	}
	function onCheckSuccess(result) {
		if (typeof result != 'undefined' && result) {
			var objResult = JSON.parse(result.Data);

			if (objResult && objResult.length > 0) {
				for (var i = 0, len = objResult.length; i < len; i++) {
					if (!objResult[i]) {
						alert("不符合归档条件，请检查故障数据。");
						return;
					}
				}
			}

			changePage('archive.html?eid=' + ElevatorID + '&ids='
					+ ID.join(','));
		}
	}
	function onCheckFault(result) {
	}
	// 查询
	function search() {
		if (MalfunctionDate == "" || ElevatorID == "")
			return;

		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			ElevatorID : ElevatorID,
			MalfunctionDate : MalfunctionDate,
			ActionType : "1"
		};
		GetAPIData("/api/elevators/GetFaultCodeInfoDataTable", JSON
				.stringify(param), onSearchSuccess, onSearchFault, null, null,
				true, false, null, '正在查询,请稍侯...');
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
			
			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"guzhangfb\">");

			if (objResult && objResult.ds && objResult.ds1[0].datacount > 0) {
				PageSetting.TotalCount = objResult.ds1[0].datacount;
				$("#rowcount").html("共搜索到" + PageSetting.TotalCount + "条数据");

				var id = ""
				, deviceNo = ""
				, installSite = ""
				, modelNoName = ""
				, description = ""
				, orderNo = ""
				, isDebug = ""
				, lastIssueTypeName = "";

				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];

					id = item.ID || item.Id || item.id;
					deviceNo = item.DeviceNo || "";
					installSite = item.InstallSite || "";
					modelNoName = (!!item.ModelNoName) ? item.ModelNoName.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					description = RecombineDes(item.Description).replace(new RegExp("{ModelNo}", 'g'), modelNoName);
					orderNo = (!!item.OrderNO) ? "已下单" : "未下单";
					isDebug = (!!item.IsDebug) ? "<font style=\"color:green;\">检修中</font>": "<font style=\"color:red;\">非检修</font>";
					lastIssueTypeName = item.LastIssueTypeName || '';

					var dateInfo = MalfunctionDate.split('-');
					var date = dateInfo[0] + "年" + dateInfo[1] + "月"+ dateInfo[2] + "日";

					if (PageSetting.PageIndex == 1 && i == 0) {
						html.push("<tr>");
						html.push("<td colspan=\"4\">");
						html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"background-color:#e4e4e4;padding:0px;magin:0px;\">");
						html.push("<tr style=\"background-color:#e4e4e4;text-align:center;\">");
						html.push("<td nowrap=\"nowrap\"><a href=\"javascript:void(0)\" onclick=\"FaultTransmittersModule.showDetail('"+ id + "')\">" + deviceNo + "</a></td>");
						html.push("<td nowrap=\"nowrap\">" + modelNoName+ "</td>");
						html.push("<td nowrap=\"nowrap\">" + date + "</td>");
						html.push("</tr>");

						html.push("<tr style=\"background-color:#e4e4e4;\">");
						html.push("<td colspan=\"3\" class=\"bottomxian\" style=\"padding-left:8px;\">"+ installSite + "</td>");
						html.push("</tr>");
						html.push("</table>");
						html.push("</td>");
						html.push("</tr>");
					}

					html.push("<tr>");
					html.push("<td style=\"width:8px;padding-left:8px;\" ><input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\"  value=\""+ id + "\"></td>");
					html.push("<td colspan=\"2\" nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;\"><font style=\"color:#2B89D3;\">!</font>&nbsp;<a href=\"javascript:void(0)\"  onclick=\"viewft2('"+ id + "')\">" + item.MalfunctionDate + "</a></td>");
					html.push("<td colspan=\"2\" nowrap=\"nowrap\" style=\"text-align:center;\">故障楼层:"+ item.FloorCode + "</td>");
					html.push("</tr>");

					html.push("<tr>");
					html.push("<td colspan=\"5\">");
					html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
					html.push("<tr>");
					html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;\">"+ isDebug + "</td>");
					
					if (!!item.RelievedDate) {
						html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;text-align:right;\"> ");
						html.push("√&nbsp;<a href=\"javascript:void(0)\"  style=\"color:#000;font-weight:nomarl;\">"+ item.RelievedDate + "</a>");
						html.push("</td>");
					} else {
						html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;text-align:right;\"><font style=\"color:red;padding-left:5px;\">未解除</font></td>");
					}
					html.push("<td style=\"text-align:right;cursor:pointer;\"  onclick=\"FaultTransmittersModule.showDetail('"+ id+ "')\"><img src=\"images/detail.png\" /></td>");
					html.push("</tr>");
					html.push("</table>");
					html.push("</td>");
					html.push("</tr>");

					html.push("<tr>");
					html.push("<td class=\"\" colspan=\"3\" style=\"padding-left:8px;\">"+ description + "</td>");
					html.push("<td class=\"\" colspan=\"2\" style=\"text-align:right;padding-right:40px;\">"+ orderNo + "</td>");
					html.push("</tr>");

					html.push("<tr>");
					html.push("<td class=\"bottomxian\" colspan=\"5\" style=\"padding-left:8px;\">"+ lastIssueTypeName + "</td>");
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
				$("#rowcount").html("共搜索到0条数据");
			}

			html.push("</table>");
			$("#SearchResult").append(html.join(''));
			html=null;
		}
	}
	// 查询失败
	function onSearchFault(msg) {
	}
	//
	function RecombineDes(source) {
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
	function _showDetail(id) {
		if (id != '') {
			changePage('faultdetail.html?id=' + id);
		} else {
			alert("终端为空!");
		}

	}
	return {
		showDetail : function(id) {
			_showDetail(id);
		},
		RebuildDes : function(source) {
			RecombineDes(source);
		}
	};
})();
function jumpto24hour(elevatorId, malfunctionDate) {
	changePage('Fault24hour.html?elevatorid=' + elevatorId + '&currentdate='
			+ malfunctionDate);
}

/****************************************************************************/