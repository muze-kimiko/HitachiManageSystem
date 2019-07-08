/**
 * 
 */
var FaultForwardingModule = (function() {
	var PAGE_ID="#FaultForwarding";
	var InitParas = {StaffName : ''};
	
	
	WLJQ(document).on('pagehide',PAGE_ID,function() {
		InitParas.StaffName="";
		$("div[data-role=collapsibleset]").collapsibleset("destroy" );
		PageSetting.reset();
	});
	
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		try {
			$("#div-rowcount").hide();
			$("#more").on("click", function() {
				nextPage();
			});
			
			PageSetting.PageIndex = 1;
			InitParas.StaffName=getUrlParam('StaffName')||'';
			//查询
			search();
		} catch (err) {
			
		}
	});
	
	// 查询
	function search() {
		$("#SearchResult").html('');
		PageSetting.PageIndex=1;
		
		var options=buildParas();
		
		getData(options,onSearchSuccess);
		
	}
	// 下一页
	function nextPage() {

		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}

		var options=buildParas();
		
		getData(options,onSearchSuccess,"加载更多...");
	}
	//从接口获取数据
	function getData(param,onSuccess,msg){
		var requestUrl="/api/malfunctionTransfer/GetPdaMTFilialeAndStaffList";
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
		
		options.pageSize =PageSetting.PageSize*PageSetting.PageIndex;
		
		getData(options,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	//参数
	function buildParas(){
		
		var resultParas={
			 PageSize:PageSetting.PageSize
			,PageIndex:PageSetting.PageIndex
			,strOrder:' '
			,StaffName: InitParas.StaffName
			
		};
         
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

			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1 || isReflesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					$("#rowcount").html(PageSetting.TotalCount);					
				}

				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];
					html.push(buildItem(item));
				}
				
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageSetting.PageIndex;
				
				remainCout =remainCout < 0?0:remainCout;

				$("#remaincount").html(remainCout);
				$("#rowcount").html(PageSetting.TotalCount);
				$("#div-more").show();
				
				objResult=null;
			} else {
				$("#div-more").hide();
			};
		}
		
		if(isReflesh){
			$("#SearchResult").html(html.join(''));
		}
		else{
			$("#SearchResult").append(html.join(''));
		}
		$("#SearchResult").show();
		
		html=null;
		
		$("div[data-role=listview] ul").listview('refresh'); 
		$("#SearchResult").collapsibleset('refresh');
		
	};
	
	function buildItem(rowItem){
		
		var html=[];
		html.push("<div data-role='collapsible' id='div-level1-"+rowItem.CompanyId+":"+rowItem.StaffId+"'>");
		html.push("<h4 id=\"h-level1:"+rowItem.CompanyId+rowItem.StaffId+"\" onclick=\"FaultForwardingModule.getDeviceNoList(this,'"+rowItem.CompanyId+" "+rowItem.StaffId+"')\">"+rowItem.CompanyName+"<span class=\"ui-li-count\">"+(rowItem.StaffName || '')+"["+(rowItem.DeviceNoCount||"0")+"]</span></h4>");
		html.push("<div id=\"div-level2-"+rowItem.CompanyId+rowItem.StaffId+"\"></div>");
		html.push("</div>");
		return html.join('');
	}
	//获取工号列表
	var obj=null;

	function getDeviceNoList(o,id){
		
		obj=o;
		
		if(!$(o).hasClass("ui-collapsible-heading-collapsed")){
			return false;
		}
		
		var requestUrl="/api/malfunctionTransfer/GetPdaMTDeviceNoList";
		var ids=id.split(' ');
		
		var param={
			FilialeId:ids[0]
			,StaffId:ids[1]
		};
		
		var tip='正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onGetDeviceNoListSuccess, null, null,null, true, false, null, tip);
		
	}
	
	function onGetDeviceNoListSuccess(data){
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			
			if(objResult && objResult.Table && objResult.Table.length>0){
				
				var html=[];
				
				html.push("<div data-role='collapsibleset' data-theme='a' data-content-theme='a'>");
				
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var row=objResult.Table[i];
					html.push("<div data-role='collapsible'><h4 id=\"h-level2:"+row.CompanyId+row.StaffId+row.DeviceNo+"\" onclick=\"FaultForwardingModule.getFaultList(this,'"+row.CompanyId+" "+row.StaffId+" "+row.DeviceNo+"')\">"+row.DeviceNo+"<p style=\"font-weight: normal;font-size:13px\">"+(row.InstallSite||'')+"</p></h4>");
					html.push("<div id=\"div-level3-"+row.CompanyId+row.StaffId+row.DeviceNo+"\"></div>");
					html.push("</div>");
				}
				$("#div-level2-"+obj.id.split(':')[1]).html(html.join(''));
				html=null;
			}
			objResult=null;
		}
		$("div[data-role=listview] ul").listview('refresh'); 
		$("#SearchResult").collapsibleset('refresh');
	}
	
	//获取故障列表
	var faultObj=null;
	function getFaultList(o,id){
		faultObj=o;
		
		if(!$(o).hasClass("ui-collapsible-heading-collapsed")){
			return false;
		}
		
		var requestUrl="/api/malfunctionTransfer/GetPdaMTFaultList";
		var ids=id.split(' ');
		var param={
			 FilialeId:ids[0]
			,StaffId:ids[1]
			,DeviceNo:ids[2]
		};
		var tip='正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onGetFaultListSuccess, null, null,null, true, false, null, tip);
	}
	function onGetFaultListSuccess(data){
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);
			if(objResult && objResult.Table && objResult.Table.length>0){
				var html=[];
				
				html.push("<ul data-role=\"listview\" class=\"ui-listview\">");
				for(var j=0,len2=objResult.Table.length;j<len2;j++){
					var row=objResult.Table[j];
					
					var cycle=convertCycle(row.Cycle);
					
					html.push("<li class=\"ui-li-divider ui-bar-a ui-first-child\" style=\"text-align:left;\">"+(row.MalClassName ||'')+"</li>");
					html.push("<li>");
					html.push("<p style=\"padding-left:15px;\">"+row.ScopeTime+"【"+cycle+"】</p>");
					html.push("</li>");
				}
				html.push("</ul>");
				
				$("#div-level3-"+faultObj.id.split(':')[1]).html(html.join(''));
				
				html=null;
				
				$("div[data-role=listview] ul").listview('refresh'); 
				$("#SearchResult").collapsibleset('refresh');
			}
			objResult=null;
		}
	}
	//转换显示周期
	function convertCycle(source){
		var result="";
		if(!source)
			return '';
		var cycleArr=source.split(',');
		for(var i=0,len=cycleArr.length;i<len;i++){
			switch(cycleArr[i]){
				case "1":
					result=result+"一";
					break;
				case "2":
					result=result+",二";
					break;
				case "3":
					result=result+",三";
					break;
				case "4":
					result=result+",四";
					break;
				case "5":
					result=result+",五";
					break;
				case "6":
					result=result+",六";
					break;
				case "7":
					result=result+",日";
					break;
				defalut:
					break;
			}
		}
		return result;
	}
	//删除
	function del(){
		var delIds = [];
		$("input[name='chk']:checked").each(function() {
			delIds.push(this.value);
		});
		if (delIds.length <= 0) {
			alert("请选择要删除记录!");
			return;
		}
		
		if (confirm('确定删除数据吗？')) {
			
			var requestUrl="/api/ajax/MalfunctionTransferDelete";
			
			var param = {DelId : delIds.join(',')};
			GetAPIData(requestUrl,JSON.stringify(param), onDelSuccess, onDelError, null,null, true, false, null, "正在删除，请稍后!");
		}
	}
	function onDelSuccess(data){
		alert("删除成功!");
		search();
	}
	function onDelError(data){
		alert("删除失败!");
	}
	WLJQ(document).on('pageshow', '#FaultForwardingSearch', function() {
		try {
			
			$("#btnSearch").on("click", function() {
				var staffName=$("#txtStaffName").val();
					
				changePage("FaultForwarding.html?StaffName="+staffName);
			});
			
		} catch (err) {
			
		}
	});
	return {
		del:function(id){
			if (confirm('确定删除数据吗？')) {
				
				var requestUrl="/api/ajax/MalfunctionTransferDelete";
				
				var param = {DelId : id};
				GetAPIData(requestUrl,JSON.stringify(param), onDelSuccess, onDelError, null,null, true, false, null, "正在删除，请稍后!");
			}
		},
		getDeviceNoList:function(o,id){
			getDeviceNoList(o,id);
		},
		getFaultList:function(o,id){
			getFaultList(o,id);
		}
	};
})();
/*************************************************/
var FaultForwardingSettingModule = (function() {
	var id='';
	var PAGE_ID="#FaultForwardingSetting";
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		try {
			id=getUrlParam('id');
				
			getFaultClass(); 
			
			getCurrentUser();
			
			$("#chkFaultClassAll").on("click",function(){
				selectAll("chkFaultClassAll","chkFaultClass");
			});
			
			$("#txtSelectedDeviceNo").on("click",function(){
				$("#txtDeviceNo").val('');
				$("#list-deviceno").html('');
				$("#popupDeviceNo").popup("open");
			});
			
			$("#btnSearchStaffName").on("click",function(){
				searchStaff();
			});
			$("#btnSearchDeviceNo").on("click",function(){
				searchDevice();
			});
			$("#btnConfirmStaff").on("click",function(){
				var idArr=[],textArr=[];
				$("input[name='chkStaff']:checked").each(function() {
					var arr = this.value.split(',');
					idArr.push(arr[0]);
					textArr.push(arr[1]);
				});
				if(idArr.length<=0){
					alert("请选择联系人");
					return;
				}
				
				$("#txtContactIds").val(idArr.join(','));
				$("#txtSelectedStaff").val(textArr.join(','));
				
				idArr=null,textArr=null;
				
				$("#popupStaff").popup("close");
			});
			$("#btnCycle").on("click",function(){
				$("#popupCycle").popup("open");
			});
			$("#btnClose").on("click",function(){
				$("#popupCycle").popup("close");
			});
			
			
			$("#txtFault").on("click",function(){
				$("#popupFault").popup("open");
			});
			$("#btnFaultClose").on("click",function(){
				$("#popupFault").popup("close");
			});
			
			$("#btnConfirmDeviceNo").on("click",function(){
				var idArr=[],textArr=[];
				$("input[name='chkDeviceNo']:checked").each(function() {
					var arr = this.value.split(',');
					idArr.push(arr[0]);
					textArr.push(arr[1]);
				});
				if(idArr.length<=0){
					alert("请选择工号人");
					return;
				}
				if($("#txtSelectedDeviceNo").val().length>0){
					$("#txtElevatorIds").val($("#txtElevatorIds").val()+","+idArr.join(','));
					$("#txtSelectedDeviceNo").val($("#txtSelectedDeviceNo").val()+","+textArr.join(','));
				}
				else{
					$("#txtElevatorIds").val(idArr.join(','));
					$("#txtSelectedDeviceNo").val(textArr.join(','));
				}
				
				idArr=null,textArr=null;
				$("#popupDeviceNo").popup("close");
			});
			$("#btnSave").on("click",function(){
				save();
			});
				
			initDateTimeControl("txtStartTime");
			initDateTimeControl("txtEndTime");
			$("#txtStartTime").val('00:00');
			$("#txtEndTime").val('23:59');
			
		} catch (err) {
			
		};
	});
	
	//初始化日期控件
	function initDateTimeControl(triggerId){
		var opt = {
			dateFormat : 'HH-mm-ss'
			,date:{preset : 'time'}
			,datetime : {
				preset : 'time',
				stepMinute : 1
			}
			,time : {
				preset : 'datetime-local'
			}
			,tree_list : {
				preset : 'list',
				labels : [ 'Region', 'Country', 'City' ]
			}
			,image_text: {
				preset : 'list',
				labels : [ 'Cars' ]
			}
			,select : {
				preset : 'select'
			}
		};
		$('#'+triggerId).bind('click',function() {
			jQuery('#'+triggerId).val('').scroller('destroy').scroller(
				$.extend(opt['datetime'], {
					theme : 'default',
					mode : 'scroller',
					display : 'modal',
					lang : 'zh',
					dateFormat : 'HH:mm:ss'
				}
			));
		});
		$('#'+triggerId).trigger('click');
	}
	//获取当前用户
	function getCurrentUser(){
		var param={};
		var requestUrl="/api/Staff/GetStaffByJobNo";
		
		GetAPIData(requestUrl,JSON.stringify(param), onGetCurrentUserSuccess, null, null,null, true, false, null, null);
	}
	function onGetCurrentUserSuccess(data){
		$("#txtSelectedStaff").val("联系人未加入通信录");
		$("#txtContactIds").val("");
		$("#txtCompanyId").val("");
		
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);

			if (objResult && objResult.length>0) {
				var item = objResult[0];
				var staff = item.StaffName+"["+(item.Phone||item.Mobile)+"]";

				$("#txtSelectedStaff").val(staff);
				$("#txtContactIds").val(item.StaffId);
				$("#txtCompanyId").val(item.CompanyId);
			}
			
			objResult=null;
		}
	}
	//获取故障类型
	function getFaultClass(){
		var param={Key:'FaultClass'};
		var requestUrl="/api/category/GetListByKey";
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, null);
	}
	// 获取故障类型
	
	function onSuccess(data){
		var html=[];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var objResult = JSON.parse(data.Data);

			if (objResult && objResult.length>0) {
				for (var i = 0, len = objResult.length; i < len; i++) {
					var item = objResult[i];

					html.push("<input onclick=\"faultClick()\" name=\"checkbox-"+item.Id+"\" id=\"checkbox-"+item.Id+"\" type=\"checkbox\" value=\""+item.Id+"\" data-mini=\"true\" data-iconpos=\"right\">");
					html.push("<label id=\"lbl-" +item.Id+"\" for=\"checkbox-"+item.Id+"\" style=\"font-weight:normal;\">"+item.FullName+"</label>");
				}
			}
			objResult=null;
		}
		
		$("#faultlist").html(html.join(''));
		$("#faultlist").trigger("create"); 
		html=null; 
	}
	
	//查询联系人员
	function searchStaff(){
		$("#list-staff").html("");
		var param={
			Top:5
			,Key:$.trim($("#txtStaffName").val())
		};
		if(param.Key.length<2){
			alert("请输入至少2位关键字");
			return;
		}
		var requestUrl="/api/staff/GetStaff";
		var tip='正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onSearchStaffSuccess, null, null,null, true, false, null, tip);
	}
	function onSearchStaffSuccess(data){
		if(data.StatusID!=0){
			alert(data.Message);
			return false;
		}
		
		var html=[];
		var objResult = JSON.parse(data.Data);

		if (objResult && objResult.length>0) {
			for(var i=0,len=objResult.length;i<len;i++){
				var rowItem=objResult[i];
				html.push("<li><input type=\"checkbox\" name=\"chkStaff\" value=\""+rowItem.StaffId+","+rowItem.StaffName+"\" data-role=\"none\">"+rowItem.StaffName+" ["+(rowItem.Mobile|| rowItem.Phone||'')+"]</li>");
			}
			$("#list-staff").html(html.join(""));
			$("#list-staff").listview('refresh');
		}
		else{
			$("#list-staff").html("<li>没查询到相关记录.</li>");
			$("#list-staff").listview('refresh');
		}
		html=null,objResult=null;
	}
	//查询工号
	function searchDevice(){
		$("#list-deviceno").html('');
		var param = {
				PageSize : 5,
				PageIndex : 1,
				OrderBy : "",
				strWhere : "",
				DeviceNo :$.trim($("#txtDeviceNo").val()),
				BuildingName:$.trim($("#txtBuilding").val()),
				strWhere:"'"+$.trim($("#txtCompanyId").val())+"'"
			};
		if(HQFlag !='Y' && $.trim($("#txtCompanyId").val()).length>0)
			param.strWhere=" FilialeID='"+$.trim($("#txtCompanyId").val())+"'";
		else
			param.strWhere='';
		
		if(param.BuildingName.length<=0 && param.DeviceNo.length<4){
			alert("请输入至少4位关键字");
			return;
		}
		var requestUrl="/api/Elevators/GetQuickElevatorListExt";
		var tip='正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onSearchDeviceSuccess, null, null,null, true, false, null, tip);
	}
	function onSearchDeviceSuccess(data){
		if(data!=null){
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			
			var html=[];
			var objResult = JSON.parse(data.Data);
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				var ds=objResult.ds;
				for(var i=0,len=ds.length;i<len;i++){
					var rowItem=ds[i];
					html.push("<li><input type=\"checkbox\" name=\"chkDeviceNo\" value=\""+rowItem.Id+","+rowItem.DeviceNo+"\" data-role=\"none\">"+rowItem.DeviceNo+" ["+rowItem.CompanyName+"]</li>");
				}
				$("#list-deviceno").html(html.join(""));
				$("#list-deviceno").listview('refresh');
			}
			else{
				$("#list-deviceno").html("<li>没查询到相关记录.</li>");
				$("#list-deviceno").listview('refresh');
			}
			objResult=null,html=null;
		}
		else{
			$("#list-deviceno").html("<li>没查询到相关记录.</li>");
			$("#list-deviceno").listview('refresh');
		}
	}
	//保存设置
	function save(){
		
        var param= {
            ContactID: $('#txtContactIds').val(), 
            ElevatorID: $('#txtElevatorIds').val(), 
            MalfunctionID: getSelectedFaultClass(), 
            MalfunctionName:$("#txtFaultNames").html(),
            WeekID: getSelectedWeek(), 
            DateStart: $('#txtStartTime').val()+":00", 
            DateEnd: $('#txtEndTime').val()+":59",
        };
        
        if (param.ContactID == '') {
            alert('请选择通讯录！'); return;
        }
        if (param.ElevatorID == '') {
            alert('请选择电梯！'); return;
        }
        if (param.MalfunctionID == '') {
            alert('请选择故障！'); return;
        }
        if (param.WeekID == '') {
            alert('请选择重复周期！'); return;
        }
        
        if (param.DateStart == '' || param.DateStart == ':00' || param.DateEnd == '' || param.DateEnd == ':00') {
            alert('请选择时间范围！'); return;
        }
        
		var requestUrl="/api/malfunctionTransfer/Save";
		var tip='正在保存,请稍侯...';

		GetAPIData(requestUrl,JSON.stringify(param), onSaveSuccess, null, null,null, true, false, null, tip);
	}
	function onSaveSuccess(data){
		var msg=(data && data.Message)?"保存"+data.Message:"未知错误";
		alert(msg);
		changePage('FaultForwarding.html');
	}
	//获取选中故障
	function getSelectedFaultClass(){
		return $("#txtFaultIds").html();
	}
	//获取选中故障
	function getSelectedWeek(){
		return $("#txtCycleIds").html();
	}
})();
function cycleClick(){
	var controlList=["checkbox-week1","checkbox-week2","checkbox-week3","checkbox-week4","checkbox-week5","checkbox-week6","checkbox-week7"];
	var result=[];
	var nameList=[];
	for(var i=0,len=controlList.length;i<len;i++){
		var control=$("#"+controlList[i])[0];
		
		if(control.checked){
			result.push(control.defaultValue);
			
			switch(control.defaultValue){
				case "1":
					nameList.push("一");
					break;
				case "2":
					nameList.push("二");
					break;
				case "3":
					nameList.push("三");
					break;
				case "4":
					nameList.push("四");
					break;
				case "5":
					nameList.push("五");
					break;
				case "6":
					nameList.push("六");
					break;
				case "7":
					nameList.push("日");
					break;
				defalut:
					break;
			}
		}
	}

	$("#lblCycle").html(nameList.join(','));
	$("#txtCycleIds").html(result.join(','));
	
	controlList=null,result=null,nameList=null;
};
function faultClick(){
	var nameList=[];
	var nameArr=[];
	var idList=[];
	$.each($("#faultlist input:checkbox"),function(i,item){
		if(item.checked){
			idList.push(item.defaultValue);
			var text=$("#lbl-"+item.defaultValue).html();
			nameArr.push(text);
			nameList.push("<li>"+text+"</li>");
		}
	});
	$("#txtFaultIds").html(idList.join(','));
	$("#txtFaultNames").html(nameArr.join(','));
	$("#listview-selectfault").html(nameList.join(''));
	$("#listview-selectfault").listview('refresh'); 
	
	nameList=null,idList=null,nameArr=null;
}
