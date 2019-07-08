/**
 * 引用jquery.js,json2.js,iscroll.js,iscrollwrapper.js
 */
var FaultFileModule = (function() {
	var InitParas = {DeviceNo : '',OrderNo : '',StartTime : '',EndTime : '',DataIndex : 1,IsOrder : 0,Code:''};
	var Template={ItemTemplate:""};
	var myScroll=null;
	
	WLJQ(document).on('pagehide', '#FaultFile', function() {
		myScroll=null;
		PageSetting.reset();
		InitParas = {DeviceNo : '',OrderNo : '',StartTime : '',EndTime : '',DataIndex : 1,IsOrder : 0,Code:''};
	});
	
	WLJQ(document).on('pageinit','#FaultFile',function() {
		//下拉刷新，上拉更多
		var opitons={
				 containerId :"wrapper",
				 pullDownId : "pullDown",
				 pullDownAction : refresh,
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
		Template.ItemTemplate=getItemTemplate();
		//下拉刷新，上拉更多
	});
	
	WLJQ(document).on('pageshow', '#FaultFile', function() {
		try {
			back("internal-back", "external-back");

			bindNavEvent();
			// 下一页
			$("#more").on("click", function() {
				nextPage();
			});
			$("#div-rowcount").hide();
			
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
			alert(err);
		}
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
		$("#footer-faultdata").on("click", function() {
			MainMenuExt(70);
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
	};
	
	function addFavorite(){
		
		var objArr= getFavoriteItem(fid,sid);
		
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
	
	function getFavoriteItem(fid,sid){
		var ids = [];
		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			ids.push(arr[0]);
		});
		if (ids.length <= 0) {
			alert("请选择要收藏的调试记录!");
			return;
		}

		var arr = [];
		var obj;
		for (var i = 0, len = ids.length; i < len; i++) {
			var info = $("#hid" + ids[i]).val().split(',');

			obj = {
				SId : sid + info[0],
				DeviceNo : info[0],
				Building : info[1],
				InstallSite : info[2],
				Filiale : info[3],
				Maintenance : info[4],
				Fid : fid,
				Uid : userid
			};

			arr.push(obj);
		}
		return arr;
	}
	// 查询
	function search() {
		var options=buildParas();
		
		InitParas={
			DeviceNo : options.DeviceNo,
			StartTime : options.StartTime,
			EndTime : options.EndTime,
			OrderNo : options.OrderNo,
			DataIndex : options.DataIndex,
			IsOrder : options.IsOrder,
			Code: options.Code
		}
		
		PageSetting.PageIndex = 1;
		
		if (options.Action == "search") {
			var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : " CreatedDate desc",
				assetnum : InitParas.DeviceNo,
				starttime : InitParas.StartTime,
				endtime : InitParas.EndTime,
				orderno : InitParas.OrderNo,
				dataindex : InitParas.DataIndex,
				isorder : InitParas.IsOrder,
				code : InitParas.Code
			};
			getData(param,onSearchSuccess, onSearchFault);
		};
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
			strOrder : " CreatedDate desc ",
			assetnum : InitParas.DeviceNo,
			starttime : InitParas.StartTime,
			endtime : InitParas.EndTime,
			orderno : InitParas.OrderNo,
			dataindex : InitParas.DataIndex,
			isorder : InitParas.IsOrder,
			code : InitParas.Code
		};
		getData(param,onSearchSuccess, onSearchFault,"加载更多...");
	}
	//从接口获取数据
	function getData(param,onSuccess,onFault,msg){
		var requestUrl="/api/elevatorMalfunctions/GetPage_ElevatorMalfunctionsDataTable";
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
		
		var options=buildParas();
		
		var param = {
			PageSize : PageSetting.PageSize*PageSetting.PageIndex,
			PageIndex : PageSetting.PageIndex,
			strOrder : " CreatedDate desc",
			assetnum : options.DeviceNo,
			starttime : options.StartTime,
			endtime : options.EndTime,
			orderno : options.OrderNo,
			dataindex : options.DataIndex,
			isorder : options.IsOrder,
			code : InitParas.Code
		};
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	//参数
	function buildParas(){
		var resultParas={};
		
		var deviceNo = getUrlParam('assetnum');
		resultParas.DeviceNo = deviceNo ||"";

		var startTime = getUrlParam('starttime');
		resultParas.StartTime = startTime || "";

		var endTime = getUrlParam('endtime');
		resultParas.EndTime = endTime || "";

		var orderNo = getUrlParam('orderno');
		resultParas.OrderNo = orderNo || "";

		var dataIndex = getUrlParam('dataindex');
		resultParas.DataIndex = dataIndex || 1;

		var isOrder = getUrlParam('isorder');
		resultParas.IsOrder = isOrder || 0;

		var code = getUrlParam('code');
		resultParas.Code = code || '';
		
		var action = getUrlParam('action');
		resultParas.Action=action;

		var sendtime = getUrlParam('sendtime');

		if (typeof sendtime != 'undefined' && sendtime ) {
			resultParas.StartTime = DateAdd(InitParas.StartTime, 'h', -12);
			resultParas.Endtime = DateAdd(InitParas.Endtime, 'h', 12);
		}
		return resultParas;
	}
	// 查询成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}
	// 查询成功
	function onSuccess(data,isReflesh) {

		var html = [];
		$("#div-rowcount").show();
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(PageSetting.PageIndex<=1 || isReflesh)
				html.push("<table class=\"gzcudang\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size:15px;\">");

			if (data && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isReflesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					$("#rowcount").html(PageSetting.TotalCount);					
				}

				var id = "",deviceNo = "",modelNo = "";issueTypeName = "",address = "",orderNO = "",buildingName = "",installSite = "",companyName = "",companyDesc = "",favoriteInfo = "";

				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];

					id = item.Id || item.ID || item.id;
					deviceNo = item.DeviceNo || "";
					modelNo = (!!item.ModelNo) ? item.ModelNo.toString().replace("GVF-Ⅱ", "GVF-II") : "";
					issueTypeName = item.IssueTypeName || '';
					address = item.Address || "";
					orderNO = (!!item.OrderNO) ? item.OrderNO : "未下单";
					buildingName = item.BuildingName || "";
					installSite = item.InstallSite || "";
					companyName = item.CompanyName || "";
					companyDesc = item.CompanyDesc || "";

					favoriteInfo = deviceNo + "," + buildingName + ","+ installSite + "," + companyName + ","+ companyDesc;

					var mainCode = "0";
					var secondCode = "0";
					
					if (item.Code) {
						mainCode = item.Code.toString().split('/')[0];
						
						if (item.Code.toString().split('/').Length > 1)
							secondCode = item.Code.toString().split('/')[1];
					}

					var data=[
							     {placeholder:"@id",replacement:id}
								,{placeholder:"@deviceNo",replacement:deviceNo}
								,{placeholder:"@favoriteInfo",replacement:favoriteInfo}
								,{placeholder:"@InitParas.DataIndex",replacement:InitParas.DataIndex}
								,{placeholder:"@modelNo",replacement:modelNo}
								,{placeholder:"@issueTypeName",replacement:issueTypeName}
								,{placeholder:"@address",replacement:address}
								,{placeholder:"@MalfunctionDate",replacement:item.MalfunctionDate}
								,{placeholder:"@Description",replacement:item.Description}
								,{placeholder:"@mainCode",replacement:mainCode}
								,{placeholder:"@secondCode",replacement:secondCode}
								,{placeholder:"@FloorCode",replacement:item.FloorCode}
								,{placeholder:"@orderNO",replacement:orderNO}
								,{placeholder:"@RelievedDateShow",replacement:!!item.RelievedDate?"":"none"}
								,{placeholder:"@RelievedDate",replacement:item.RelievedDate||""}
								
							];
					
					var itemTemplate=getItemTemplateResult(data);
					html.push(itemTemplate);
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
				$("#SearchResult table").append(html.join(''));
		}
		$("#SearchResult").show();
		html=null;
		
		if(myScroll)
			myScroll.refresh();
	}
	//每条数据模板
	function getItemTemplate(){
		
		var html=[];
		html.push("<tr style=\"background-color:#e4e4e4;\">");
		html.push("<td rowspan=\"2\" style=\"width:8px;padding-left:8px;border-top:1px solid #ABABAB;\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\" value=\"@id,@deviceNo\">");
		html.push("<input type=\"hidden\" name=\"hid@id\" id=\"hid@id\" value=\" @favoriteInfo+\">");
		html.push("</td>");
		html.push("<td nowrap=\"nowrap\" style=\"border-top:1px solid #ABABAB;\"><a href=\"javascript:void(0)\" onclick=\"FaultFileModule.showDetail('@id','@DataIndex')\">@deviceNo</a></td>");
		html.push("<td nowrap=\"nowrap\" style=\"border-top:1px solid #ABABAB;\">&nbsp;@modelNo</td>");
		html.push("<td nowrap=\"nowrap\" style=\"border-top:1px solid #ABABAB;\">&nbsp;@issueTypeName</td>");
		html.push("</tr>");
		html.push("<tr style=\"cursor:pointer;background-color:#e4e4e4;\" onclick=\"FaultFileModule.showDetail('@id ','@DataIndex')\">");
		html.push("<td colspan=\"3\">@address</td>");
		html.push("</tr>");
		html.push("<tr onclick=\"FaultFileModule.showDetail('@id+','@DataIndex')\" style=\"color:#f00;cursor:pointer;\">");
		html.push("<td colspan=\"2\" nowrap=\"nowrap\" align=\"left\" style=\"padding-left:8px;\"><font style=\"color:#2B89D3;\">!</font>&nbsp;<a href=\"javascript:void(0)\" style=\"color:#2B89D3;font-weight:normal;\" onclick=\"viewft('@id')\">@MalfunctionDate</a></td>");
		
		html.push("<td colspan=\"2\" nowrap=\"nowrap\">");
		html.push("<span style=\"display:@RelievedDateShow\">");
		html.push("<font style=\"color:#000;\">√</font>&nbsp;<font style=\"color:#000;font-weight:normal;\">");
		html.push("@RelievedDate");
		html.push("</span>");
		html.push("</td>");
		
		html.push("</tr>");
		html.push("<tr style=\"cursor:pointer;\" >");
		html.push("<td class=\"bottomxian\" colspan=\"2\" nowrap=\"nowrap\" style=\"padding-left:8px;\" >");
		html.push("@Description");
		html.push("<a href=\"javascript:void(0)\" onclick=\"JumpToRetrieval('@modelNo','@mainCode','5AD930EB-3761-4B01-BAFF-38C281F561F0')\">(@mainCode</a>  /  <a href=\"javascript:void(0)\" onclick=\"JumpToRetrieval('@modelNo','@secondCode','C403E933-213C-4AF3-9DB7-92D25BF0CB99')\">@secondCode)</a>");
		html.push("</td>");
		html.push("<td class=\"bottomxian\" nowrap=\"nowrap\" onclick=\"FaultFileModule.showDetail('@id','@InitParas.DataIndex')\">故障楼层:@FloorCode</td>");
		html.push("<td class=\"bottomxian\" style=\"text-align:right;padding-right:5px;\" onclick=\"FaultFileModule.showDetail('@id','@InitParas.DataIndex')\">@orderNO</td>");
		html.push("</tr>");
		
		return html.join("");
	}
	//填充数据
	function getItemTemplateResult(data){
		
		var itemTemplate=Template.ItemTemplate;
		var result=itemTemplate;
		
		for(var i=0,len=data.length;i<len;i++){
			var item=data[i];
			
			result=result.replace(new RegExp(item.placeholder,'g'),item.replacement);
		}
		return result;
	}
	// 显示明细
	function _showDetail(id, dataindex) {
		$("#popupFaultFileDetail").css("width", $(window).width());

		try {
			if (id) {
				var param = {PageSize : '1',PageIndex : '1',strOrder : " CreatedDate desc",id : id,dataindex : InitParas.DataIndex,starttime : InitParas.StartTime,endtime : InitParas.EndTime};
				var requestUrl="/api/elevatorMalfunctions/GetPage_ElevatorMalfunctionsListExt";
				
				GetAPIData(requestUrl,JSON.stringify(param), onGetDetailSuccess,onGetDetailFault, null, null, false, false, null,'正在查询,请稍侯...');
			}
		} catch (err) {
		}
	}
	;
	// 获取明细成功
	function onGetDetailSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var item = objResult.ds[0];

			if (typeof item != 'undefined' && item) {
				$('#lbDeviceNo').html(item.DeviceNo);
				$('#lbAddress').html(item.Address);
				$('#lbBuilding').html(item.BuildingName);
				$('#lbModelNo').html(item.OrderNO);
				$('#lbMaintenance').html(item.MaintenanceName);
				$('#lbDescription').html(item.Description);
				$('#lbOrderNo').html(item.OrderNO);
				$('#lbMalfunctionDate').html(item.MalfunctionDate);
				$('#lbRelievedDate').html(item.RelievedDate);
				$('#lbInterval').html(item.Interval);
				$('#lbFloorCode').html(item.FloorCode);
				$('#lbLastIssueDesc').html(item.LastIssueDesc);
				$('#lbMalfunctionMessages').html(item.MalfunctionMessages);
				$('#lbRemark').html(item.Remark);
				$('#lbBuildingRemark').html(item.BuildingRemark);
			}
			item=null;
		}
		$("#popupFaultFileDetail").popup("open");
		$("#basic").show();
		$("#detail").hide();
		var elef = document.getElementById("btnbasic");
		var elen = document.getElementById("btndetail");
		elef.className = "tabfocus";
		elen.className = "tabblur";
	}
	;
	// 获取明细失败
	function onGetDetailFault(msg) {
		err(msg);
	};
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
		showDetail : function(id, dataindex) {
			_showDetail(id, dataindex);
		}
	};
})();
/**************************************************************/
(function() {
	var PAGE_ID="#faultsearch";
	WLJQ(document).on('pageshow',PAGE_ID,pageShow);
	function pageShow() {
		try {
	
			var curr = new Date().getFullYear();
			var opt = {
				dateFormat : 'yy-mm-dd'
			}
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
	
			$('#txtStartTime').bind('click',function() {
				jQuery('#txtStartTime').val('').scroller('destroy').scroller(
						$.extend(opt['datetime'], {
							theme : 'default',
							mode : 'scroller',
							display : 'modal',
							lang : 'zh',
							dateFormat : 'yy-mm-dd'
						}));
			})
			$('#txtEndTime').bind('click',function() {
				jQuery('#txtEndTime').val('').scroller('destroy').scroller(
						$.extend(opt['datetime'], {
							theme : 'default',
							mode : 'scroller',
							display : 'modal',
							lang : 'zh',
							dateFormat : 'yy-mm-dd'
						}));
			})
			$('#txtStartTime').trigger('click');
			$('#txtEndTime').trigger('click');
	
			var currDate = GetDate();
			var preDate = getDay(currDate, -1);
			$("#txtStartTime").val(preDate + " 00:00");
			$("#txtEndTime").val(currDate + " 23:59");
			var assetnum = getUrlParam('assetnum');
			$("#txtDeviceNo").val(assetnum);
	
			$("#CheckBoxFault").on("click", function() {
				var checked = $("#CheckBoxFault").prop("checked");
				
				var currDate = GetDate();
				var preDate = getDay(currDate, -1);
				$("#txtStartTime").val(preDate + " 00:00");
				$("#txtEndTime").val(currDate + " 23:59");
			});
	
			
			initSearch('txtDeviceNo');
			
			$("#btn-fault-search").on("click", function() {
				ok();
			});
		} catch (err) {
		}
	}
	function ok() {
		var deviceNo = $("#txtDeviceNo").val();
		var startTime = $("#txtStartTime").val() + ":00";
		var endTime = $("#txtEndTime").val() + ":59";
		var orderNo = $("#txtOrderNo").val();
		var dataindex = ($("#CheckBoxFault").is(":checked") ? 0 : 1);
		var isOrder = ($("#IsOrder").is(":checked") ? 1 : 0);
		var code = $("#txtCode").val()||'';
		
		if (deviceNo == "" && startTime == "" && endTime == "" && orderNo == "" && code=="") {
			alert("请输入搜索条件!");
			return false;
		}
	
		if (startTime == "") {
			alert("请输入开始日期!");
			return false;
		}
	
		if (!IsDateTime(startTime)) {
			alert("请输入合法的开始日期!");
			return false;
		}
	
		if (endTime == "") {
			alert("请输入结束日期!");
			return false;
		}
	
		if (!IsDateTime(endTime)) {
			alert("请输入合法的结束日期!");
			return false;
		}
		/*如果选择两天内，则判断所选 开始时间和结束时间一定要在两两内*/
	
		if(dataindex==0){
	
			var currDate = GetDate();
			var preDate = getDay(currDate, -1);
			
			var compareStartTime=preDate;
			var compareStartEndTime=currDate+" 23:59:59";
	
			if(DateDiff('s', compareStartTime,startTime)<0 || DateDiff('s', compareStartEndTime,startTime)>0){
				alert("开始时间不在两天内,请重新选择开始时间")
				return;
			}
			
			if(DateDiff('s', compareStartTime,endTime)<0 || DateDiff('s', compareStartEndTime,endTime)>0){
				alert("结束时间不在两天内,请重新选择结束时间")
				return;
			}
		}
	
		/***************************************/
		if (startTime.indexOf("/") > -1) {
			var stdate = startTime.split(' ')[0];
			var sttime = startTime.split(' ')[1];
			var st = stdate.split('/')[2] + "-" + stdate.split('/')[1] + "-"
					+ stdate.split('/')[0];
			startTime = st + " " + sttime
	
			var etdate = endTime.split(' ')[0];
			var ettime = endTime.split(' ')[1];
			var et = etdate.split('/')[2] + "-" + etdate.split('/')[1] + "-"
					+ etdate.split('/')[0];
			endTime = et + " " + ettime
		}
	
		addSearch('txtDeviceNo');
		changePage('FaultFile.html?action=search&assetnum='
				+ encodeURIComponent(deviceNo) + '&starttime='
				+ encodeURIComponent(startTime) + '&endtime='
				+ encodeURIComponent(endTime) + '&orderno='
				+ encodeURIComponent(orderNo) + "&dataindex="
				+ encodeURIComponent(dataindex) + "&isorder="
				+ encodeURIComponent(isOrder)+ "&code="
				+ encodeURIComponent(code)
				);
	}
})();
/**************************************************************/
