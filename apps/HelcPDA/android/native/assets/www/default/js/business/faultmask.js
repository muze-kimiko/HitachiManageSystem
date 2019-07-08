
/* JavaScript content from js/business/faultmask.js in folder common */
/**
 * 
 */
var FaultMaskModule = (function() {
	var InitParas = {DeviceNo : '',StartTime : '',EndTime : ''};
	var PAGE_ID="#FaultMask",myScroll=null;
	
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		//下拉刷新，上拉更多
		var opitons={containerId :"wrapper",pullDownId : "pullDown",pullDownAction : refresh};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
		//下拉刷新，上拉更多
	});
	WLJQ(document).on('pagehide',PAGE_ID,function() {
		InitParas = {DeviceNo : '',StartTime : '',EndTime : ''};
		myScroll=null;
		PageSetting.reset();
	});
	
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		try {
			$("#div-rowcount").hide();
			$("#more").on("click", function() {
				nextPage();
			});
			// 邦定导航事件
			bindNavEvent();
			
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
			//查询
			search();
		} catch (err) {
			
		}
	});
	WLJQ(document).on('pageshow', '#FaultMaskSearch', function() {
		try {
			var opt = {
				dateFormat : 'yy-mm-dd'
				,date:{
					preset : 'date'
				},
				datetime : {
					preset : 'datetime',
					minDate : new Date(2011, 3, 10, 9, 22),
					maxDate : new Date(2020, 7, 30, 15, 44),
					stepMinute : 1
				},
				time : {
					preset : 'datetime-local'
				},
				tree_list : {
					preset : 'list',
					labels : [ 'Region', 'Country', 'City' ]
				},
				image_text : {
					preset : 'list',
					labels : [ 'Cars' ]
				},
				select : {
					preset : 'select'
				}
			};
			var optDatetime={theme : 'default',
					mode : 'scroller',
					display : 'modal',
					lang : 'zh',
					dateFormat : 'yy-mm-dd'};
			
			$('#txtStartTime').bind('click',function() {
				jQuery('#txtStartTime').val('').scroller('destroy').scroller($.extend(opt['datetime'], optDatetime));
			});
			$('#txtEndTime').bind('click',function() {
				jQuery('#txtEndTime').val('').scroller('destroy').scroller($.extend(opt['datetime'], optDatetime));
			});
			$('#txtStartTime').trigger('click');
			$('#txtEndTime').trigger('click');
			
			//查询
			$("#btnSearch").on("click",function(){
				var deviceNo = $("#txtDeviceNo").val();
				var startTime ='',endTime='';
				
				if($("#txtStartTime").val().length>0)
					startTime = $("#txtStartTime").val() + ":00";
				if($("#txtEndTime").val().length>0)
					endTime = $("#txtEndTime").val() + ":59";

				if (deviceNo == "" && startTime == "" && endTime == "") {
					alert("请输入搜索条件!");
					return false;
				}
				
				changePage('FaultMask.html?action=search&deviceNo='
						+ encodeURIComponent(deviceNo) + '&starttime='
						+ encodeURIComponent(startTime) + '&endtime='
						+ encodeURIComponent(endTime));
			});
		}
		catch(ex){
			
		}
	});
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
	};
	// 查询
	function search() {
		var options=buildParas();
		
		InitParas={
			DeviceNo : options.DeviceNo,
			StartTime : options.StartTime,
			EndTime : options.EndTime
		};
		
		PageSetting.PageIndex = 1;
		
		
		var param = {
			pageSize : PageSetting.PageSize,
			pageIndex : PageSetting.PageIndex,
			deviceNo : InitParas.DeviceNo,
			startTime : InitParas.StartTime,
			endTime : InitParas.EndTime
		};
		getData(param,onSearchSuccess);
		
	}
	// 下一页
	function nextPage() {

		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		var param = {
			pageSize : PageSetting.PageSize,
			pageIndex : PageSetting.PageIndex,
			deviceNo : InitParas.DeviceNo,
			startTime : InitParas.StartTime,
			endTime : InitParas.EndTime
		};
		getData(param,onSearchSuccess,"加载更多...");
	}
	//从接口获取数据
	function getData(param,onSuccess,msg){
		var requestUrl="/api/elevators/GetFaultMask";
		var tip=msg || '正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, tip);
	}
	// 查询成功
	function onSearchSuccess(data) {
		onSuccess(data,false);
	}
	//刷新
	function refresh(){
		$("#pullDown").hide();
		$("#SearchResult").hide();
		
		var options=buildParas();
		
		var param = {
			pageSize : PageSetting.PageSize*PageSetting.PageIndex,
			pageIndex : 1,
			deviceNo : options.DeviceNo,
			startTime : options.StartTime,
			endTime : options.EndTime,
		};
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	//参数
	function buildParas(){
		var resultParas={};
		
		var deviceNo = getUrlParam('deviceNo');
		resultParas.DeviceNo = deviceNo ||"";

		var startTime = getUrlParam('starttime');
		resultParas.StartTime = startTime || "";

		var endTime = getUrlParam('endtime');
		resultParas.EndTime = endTime || "";

		var action = getUrlParam('action');

		resultParas.Action=action;

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
			var objResult = JSON.parse(data.Data);

			if(PageSetting.PageIndex<=1 || isReflesh)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size:15px;\">");

			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isReflesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					$("#rowcount").html(PageSetting.TotalCount);					
				}

				//var favoriteInfo = '',id='',deviceNo='',buildingName='',installSite='',filiale='',maintenanceName='',counter=0;
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];
					var obj={};
					obj.id = item.Id || item.id || item.ID;
					obj.deviceNo=item.DeviceNo || '';
					obj.buildingName=item.BuildingName || '';
					obj.installSite=item.InstallSite || '';
					obj.filiale=item.BranchName || '';
					obj.maintenanceName=item.MaintenanceName || '';
					obj.count=item.Count||0;
					obj.desc=item.Desc ||"";
					
					var favoriteArr=[
		                 obj.deviceNo,":"
		                 ,obj.buildingName,":"
		                 ,obj.installSite,":"
		                 ,obj.filiale,":"
		                 ,obj.maintenanceName
	                 ];
					obj.favoriteInfo =favoriteArr.join('');
					favoriteArr=null;

					html.push(buildRowItem(obj));
					
					obj=null;
					item=null;
					
					/*
					var item = objResult.ds[i];
					
					id = item.Id || item.id || item.ID;
					deviceNo=item.DeviceNo || '';
					buildingName=item.BuildingName || '';
					installSite=item.InstallSite || '';
					filiale=item.BranchName || '';
					maintenanceName=item.MaintenanceName || '';
					count=item.Count||0;
					
					favoriteInfo = deviceNo + ":" + buildingName + ":"
					+ installSite + ":" + filiale + ":"
					+ maintenanceName;
					
					html.push("<tr style=\"background-color:#e4e4e4;height:20px;height-line:20px;\">");
					html.push("<td style=\"width:8px;padding-left:8px;border-top:1px solid #ABABAB;padding-top:5px;padding-bottom:5px;\">");
					html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\"  value=\"" + id+ ","+ deviceNo+ ","+ favoriteInfo+ "\">");
					html.push("</td>");
					html.push("<td nowrap=\"nowrap\"  style=\"border-top:1px solid #ABABAB;\">"+deviceNo+"</td>");
					html.push("<td nowrap=\"nowrap\"  style=\"border-top:1px solid #ABABAB;\">"+ count + "</td>");
					html.push("</tr>");
					
					html.push("<tr style=\"height:20px;height-line:20px;\">");
					html.push("<td nowrap=\"nowrap\" colspan=\"3\" style=\"width:8px;padding-left:8px;padding-top:5px;padding-bottom:5px;\">"+(item.Desc || '')+"</td>");
					html.push("</tr>");
					*/
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
		
		myScroll.refresh();
	};
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr style=\"background-color:#e4e4e4;height:20px;height-line:20px;\">");
		html.push("<td style=\"width:8px;padding-left:8px;border-top:1px solid #ABABAB;padding-top:5px;padding-bottom:5px;\">");
		html.push("<input class=\"my-checkbox\" type=\"checkbox\" name=\"chk\"  value=\"@id,@deviceNo,@favoriteInfo\">");
		html.push("</td>");
		html.push("<td nowrap=\"nowrap\"  style=\"border-top:1px solid #ABABAB;\">@deviceNo</td>");
		html.push("<td nowrap=\"nowrap\"  style=\"border-top:1px solid #ABABAB;\">@count </td>");
		html.push("</tr>");
		
		html.push("<tr style=\"height:20px;height-line:20px;\">");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@favoriteInfo", 'g'), obj.favoriteInfo)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@count", 'g'), obj.count)
		.replace(new RegExp("@desc", 'g'), obj.desc);
		
		return result;
	}
})();