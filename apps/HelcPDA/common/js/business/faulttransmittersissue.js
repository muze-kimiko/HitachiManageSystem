/**
 * 
 */
/** ***************************我的归档****************************** */
var FaultTransmittersIssueModule = (function() {
	var PAGE_ID="#FaultTransmittersIssue",myScroll=null;
	var PageSize = 10, PageIndex = 1, TotalCount = 0, DeviceNo = "", ArchiveStartTime = "", ArchiveEndTime = ""
		, sourceParaObj = {
		DeviceNo : "",
		PageIndex : 1,
		MalType : -1,
		RelievedDate : "",
		ArchiveStartTime : "",
		ArchiveEndTime : ""
	}, searchParaObj = {
		DeviceNo : "",
		PageIndex : "",
		StartTime : "",
		EndTime : ""
	};

	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageIndex = PageSetting.PageIndex;
		PageSize = PageSetting.PageSize;
		TotalCount = PageSetting.TotalCount;
		DeviceNo = "";
		sourceParaObj = null;
		searchParaObj = null;
		myScroll=null;
		PageSetting.reset();
	});
	
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
			 containerId :"wrapperFaultTransmittersIssue",
			 pullDownId : "pullDownFaultTransmittersIssue",
			 pullDownAction : refresh,
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	
	
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	
	function pageShow() {
		try {
			back("FaultTransmittersIssue-back",
					"FaultTransmittersIssue-external-back");
			DeviceNo = getUrlParam('assetnum');

			sourceParaObj = sourceParaObj || {};
			sourceParaObj.MalType = getUrlParam('maltype');
			sourceParaObj.RelievedDate = getUrlParam('relieveddate');

			searchParaObj = searchParaObj || {};
			searchParaObj.DeviceNo = getUrlParam('assetnum') || "";
			searchParaObj.PageIndex = getUrlParam('pageindex');
			searchParaObj.StartTime = getUrlParam('starttime');
			searchParaObj.EndTime = getUrlParam('endtime');

			$("#more").on("click", function() {
				nextPage();
			});
			$("#btnsearch").on("click", function() {
				DeviceNo = $("#txtDeviceNo").val();
				searchParaObj.DeviceNo = DeviceNo;
				PageIndex = 1;
				if ($("#div-more"))
					$("#div-more").css("display", "none");

				$("#SearchResult").html('');
				search();
			});

			var opt = {
				dateFormat : 'yy-mm-dd'
			};
			opt.date = {
				preset : 'date'
			};
			opt.datetime = {
				preset : 'datetime',
				minDate : new Date(2011, 3, 10, 9, 22),
				maxDate : new Date(2020, 7, 30, 15, 44),
				stepMinute : 1
			};
			opt.time = {
				preset : 'datetime-local'
			};
			opt.tree_list = {
				preset : 'list',
				labels : [ 'Region', 'Country', 'City' ]
			};
			opt.image_text = {
				preset : 'list',
				labels : [ 'Cars' ]
			};
			opt.select = {
				preset : 'select'
			};

			$('#txtStartTime').bind(
					'click',
					function() {
						jQuery('#txtStartTime').val('').scroller(
								'destroy').scroller(
								$.extend(opt['datetime'], {
									theme : 'default',
									mode : 'scroller',
									display : 'modal',
									lang : 'zh',
									dateFormat : 'yy-mm-dd'
								}));
					});
			$('#txtEndTime').bind(
					'click',
					function() {
						jQuery('#txtEndTime').val('').scroller(
								'destroy').scroller(
								$.extend(opt['datetime'], {
									theme : 'default',
									mode : 'scroller',
									display : 'modal',
									lang : 'zh',
									dateFormat : 'yy-mm-dd'
								}));
					});
			
			$('#txtStartTime').trigger('click');
			$('#txtEndTime').trigger('click');

			var currDate = GetDate();
			var preDate = getDay(currDate, -2);

			var startTime = searchParaObj.StartTime|| (preDate + " 00:00");
			var endTime = searchParaObj.EndTime|| (currDate + " 23:59");

			$("#txtDeviceNo").val(searchParaObj.DeviceNo);
			$("#txtStartTime").val(startTime);
			$("#txtEndTime").val(endTime);
			ArchiveStartTime = startTime;
			ArchiveEndTime = endTime;
			DeviceNo = $("#txtDeviceNo").val();

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
		} catch (err) {
		}
	}

	// 查询
	function search() {
		var malType = -1;

		var param = {
			PageSize : PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			malType : malType,
			DeviceNo : DeviceNo,
			ArchiveStartTime : ArchiveStartTime,
			ArchiveEndTime : ArchiveEndTime,
			ArchiveStatus : '1'
		};

		getData(param,onSearchSuccess, onSearchFault);
	}
	// 下一页
	function nextPage() {
		var malType = -1;
		PageSetting.PageIndex = PageSetting.PageIndex + 1;
		
		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			malType : malType,
			DeviceNo : DeviceNo,
			ArchiveStartTime : ArchiveStartTime,
			ArchiveEndTime : ArchiveEndTime,
			ArchiveStatus : '1'
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
		$("#pullDownFaultTransmittersIssue").hide();
		$("#SearchResult").hide();
		
		var param = {
			PageSize : PageSetting.PageSize*PageSetting.PageIndex,
			PageIndex : PageSetting.PageIndex,
			strOrder : "",
			malType : malType,
			DeviceNo : DeviceNo,
			ArchiveStartTime : ArchiveStartTime,
			ArchiveEndTime : ArchiveEndTime,
			ArchiveStatus : '1'
		};
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	// 查询成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}	
	// 查询成功
	function onSuccess(data,isReflesh) {
		var html =[];
		$("#tbcondition").show();
		
		if (data) {
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
					obj.lastIssueTypeName = item.LastIssueTypeName || '';
					obj.modelNoName = (!!item.ModelNoName) ? item.ModelNoName.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					obj.description = RecombineDes(item.Description).replace(new RegExp("{ModelNo}", 'g'), obj.modelNoName);
					obj.orderNo = (!!item.OrderNO) ? "已下单" : "未下单";
					//obj.isDebug = (!!item.IsDebug) ? "<font style=\"color:green;\">检修中</font>": "<font style=\"color:red;\">非检修</font>";
					
					obj.isDebug = item.IsDebug;
					obj.floorCode=item.FloorCode;
					
					obj.relievedDate=item.RelievedDate;
					
					/*
					if (!!item.RelievedDate) {
						obj.relievedDateDesc="√&nbsp;<a href=\"javascript:void(0)\"  style=\"color:#000;font-weight:nomarl;\">"+item.RelievedDate + "</a>";
					} else {
						obj.relievedDateDesc="<font style=\"color:red;padding-left:5px;\">未解除</font>";
					}
					*/
					obj.favoriteInfo = obj.deviceNo + "," + obj.buildingName + ","+ obj.installSite + "," + obj.filiale + ","+ obj.maintenanceName;
					
					html.push(buildRowItem(obj));
					
					obj=null;
					item=null;
				}
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageSetting.PageIndex;
				remainCout =remainCout < 0?0:remainCout;				
				$("#remaincount").html(remainCout);
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
				$("#SearchResult table:first").append(html.join(''));
		}
		$("#SearchResult").show();
		html=null;
		
		if(myScroll)
			myScroll.refresh();
	}
	function buildRowItem(obj){
		html.push("<tr style=\"background-color:#e4e4e4;\">");
		html.push("<td rowspan=\"2\" style=\"width:8px;padding-left:8px;\" class=\"bottomxian\"><input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\"  value=\"@id,@deviceNo,@favoriteInfo\"></td>");
		html.push("<td nowrap=\"nowrap\"><a href=\"javascript:void(0)\" onclick=\"jumpto24hour('@elevatorId','@malfunctionDate2')\">@deviceNo</a><input type=\"hidden\" name=\"hid@id\" id=\"hid@id\" value=\"@favoriteInfo\"></td>");
		html.push("<td nowrap=\"nowrap\">@modelNoName</td>");
		html.push("<td nowrap=\"nowrap\">@lastIssueTypeName</td>");
		html.push("</tr>");

		html.push("<tr style=\"background-color:#e4e4e4;padding-left:8px;\">");
		html.push("<td colspan=\"3\" class=\"bottomxian\">@installSite</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td colspan=\"2\" nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;\"><font style=\"color:#2B89D3;\">!</font>&nbsp;<a href=\"javascript:void(0)\"  onclick=\"viewft2('@id')\">@malfunctionDate</a></td>");
		html.push("<td colspan=\"2\" nowrap=\"nowrap\" style=\"text-align:center;\">故障楼层:@floorCode</td>");
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
		//html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;\">@isDebug</td>");
		
		html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;text-align:right;\">");
		if (!!obj.relievedDate) {
			html.push("√&nbsp;<a href=\"javascript:void(0)\"  style=\"color:#000;font-weight:nomarl;\">@relievedDate</a>");
		} else {
			html.push("<font style=\"color:red;padding-left:5px;\">未解除</font>");
		}
		html.push("</td>");
		
		//html.push("<td nowrap=\"nowrap\" style=\"padding-left:8px;text-align:right;\">@relievedDateDesc</td>");
		html.push("<td style=\"text-align:right;cursor:pointer;\"  onclick=\"FaultTransmittersModule.showDetail('@id')\"><img src=\"images/detail.png\" /></td>");
		html.push("</tr>");
		html.push("</table>");
		html.push("</td>");
		html.push("</tr>");

		html.push("<tr>");
		html.push("<td class=\"\" colspan=\"2\" style=\"padding-left:8px;\">@description</td>");
		html.push("<td class=\"\" colspan=\"2\" style=\"text-align:right;padding-right:40px;\">@orderNo</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<td class=\"bottomxian\" colspan=\"4\" style=\"padding-left:8px;\"><a href='#' onclick=\"FaultTransmittersIssueModule.showIssueRecords('@id','@deviceNo','@description','@malfunctionDate','@installSite','@elevatorId')\">归档记录</a></td>");
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
		//.replace(new RegExp("@isDebug", 'g'), obj.isDebug)
		.replace(new RegExp("@relievedDateDesc", 'g'), obj.relievedDateDesc)
		.replace(new RegExp("@description", 'g'), obj.description)
		.replace(new RegExp("@orderNo", 'g'), obj.orderNo)
		.replace(new RegExp("@elevatorId", 'g'), obj.elevatorId);
		
		return result;
	}
	// 查询失败
	function onSearchFault(msg) {

		$("#popupTipDialog").popup("open");
	}
	// 邦定导航事件
	function bindNavEvent() {
		// 实时监视
		$("#footer-realtime").on("click", function() {
			MainMenuExt(20);
		});
		// 多梯监视
		$("#footer-realtimemore").on("click", function() {
			MainMenuExt(80);
		});
		// 电梯查询
		$("#footer-elevator").on("click", function() {
			MainMenuExt(60);
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
		var fid = "FaultTransmittersIssue";

		var objArr = [];
		var obj;
		for (var i = 0, len = ids.length; i < len; i++) {
			var info = $("#hid" + ids[i]).val().split(',');

			obj = {
				SId : "FaultTransmittersIssue.html?action=search&assetnum="
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

	function _jumpToFaultTransmitters() {

		changePage('FaultTransmitters.html?pageindex='
				+ sourceParaObj.PageIndex + "&maltype=" + sourceParaObj.MalType
				+ "&relieveddate=" + sourceParaObj.RelievedDate);
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
		showIssueRecords : function(id, deivice, description, malfunctionDate,
				installSite, elevatorId) {
			changePage('IssueRecords.html?Id=' + id + '&assetnum=' + deivice
					+ '&Description=' + description + '&MalfunctionDate='
					+ malfunctionDate + '&InstallSite=' + installSite
					+ '&ElevatorId=' + elevatorId + '&StartTime='
					+ $("#txtStartTime").val() + '&EndTime='
					+ $("#txtEndTime").val() + "&pageindex=" + PageIndex
					+ "&key=" + $("#txtDeviceNo").val());
		},
		jumpToFaultTransmitters : function() {
			_jumpToFaultTransmitters();
		}
	};
})();