
/* JavaScript content from js/business/bindstatus.js in folder common */
/**
 * 
 */
/**
 * 
 */
var BindStatusModule = (function() {
	WLJQ(document).on('pageshow', '#BindStatus', function() {
		try {
			$("#btnSearch").on("click",function(){
				search();
			});
		} catch (err) {
			
		}
	});
	// 查询
	function search() {
		if($.trim($("#txtDeviceNo").val()).length<=0){
			alert("请输入工号");
			return;
		}
			
		reset();
		var param = {
			DeviceNo : $.trim($("#txtDeviceNo").val())
		};
		getData(param,onSearchSuccess);
		
	}
	
	//从接口获取数据
	function getData(param,onSuccess,msg){
		var requestUrl="/api/terminals/GetBindStatus";
		var tip=msg || '正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, tip);
	}
	// 查询成功
	function onSearchSuccess(data) {
		onSuccess(data,false);
	}
	// 查询成功
	function onSuccess(data) {
		if (data) {
			var objResult = eval("(" + data.Data + ")");
			if(objResult && objResult.ds && objResult.ds.length>0){
				var item=objResult.ds[0];
				$("#lbDeviceNo").html(item.DeviceNo ||'');
				$("#lbMainboardId").html(item.MainboardId ||'');
				$("#lbBindElevator").html(item.BindElevator ||'');
				$("#lbMainboardVersion").html(item.MainboardVersion || '');
				var info= bindInfo(item.TerminalPort,item.PName, item.MBStaus,item.MCStaus, item.SBStaus, item.SCStais, item.MainboardId, item.SubboardId);
				
				$("#listview").html(info);
				$(".listview").show();
			}
			else{
				alert("查询不到相关数据!");
			}
		}
		else{
			alert("查询不到相关数据!");
		}
	}
	function bindInfo(port,pname, bindMainB, bindMainC, bindSubB, bindSubC, bindMainD, bindSubD){
		var html=[];
        var bindMainBInfo = bindMainB ? bindMainB.split('/'):null;
        var bindMainCInfo = bindMainC ? bindMainC.split('/'):null;
        var bindMainDInfo = bindMainD ? bindMainD.split('/'):null;
        var bindSubBInfo = bindSubB ? bindSubB.split('/'):null;
        var bindSubCInfo = bindSubC ? bindSubC.split('/'):null;
        var bindSubDInfo = bindSubD ?  bindSubD.split('/'):null;

        var bindMainBStatus = bindMainBInfo != null && bindMainBInfo.length > 0 ? bindMainBInfo[0] : "";
        var bindMainBError = bindMainBInfo != null && bindMainBInfo.length > 1 ? bindMainBInfo[1] : "";
        var bindMainCStatus = bindMainCInfo != null && bindMainCInfo.length > 0 ? bindMainCInfo[0] : "";
        var bindMainCError = bindMainCInfo != null && bindMainCInfo.length > 1 ? bindMainCInfo[1] : "";
        var bindMainDStatus = bindMainDInfo != null && bindMainDInfo.length > 0 ? bindMainDInfo[0] : "";
        var bindMainDError = bindMainDInfo != null && bindMainDInfo.length > 1 ? bindMainDInfo[1] : "";
        var bindSubBStatus = bindSubBInfo != null && bindSubBInfo.length > 0 ? bindSubBInfo[0] : "";
        var bindSubBError = bindSubBInfo != null && bindSubBInfo.length > 1 ? bindSubBInfo[1] : "";
        var bindSubCStatus = bindSubCInfo != null && bindSubCInfo.length > 0 ? bindSubCInfo[0] : "";
        var bindSubCError = bindSubCInfo != null && bindSubCInfo.length > 1 ? bindSubCInfo[1] : "";
        var bindSubDStatus = bindSubDInfo != null && bindSubDInfo.length > 0 ? bindSubDInfo[0] : "";
        var bindSubDError = bindSubDInfo != null && bindSubDInfo.length > 1 ? bindSubDInfo[1] : "";

        switch (pname)
        {
            case "MCA":
            	var chanel=getChanel(bindMainCStatus,bindSubCStatus,bindMainCError,bindSubCError);
            	html.push(getItem('主门B板',bindMainBStatus,bindMainBError));
            	html.push(getItem('副门B板',bindSubBStatus,bindSubBError));
            	html.push(getItem('主门门机板',bindMainDStatus,bindMainDError));
            	html.push(getItem('副门门机板',bindSubDStatus,bindSubDError));
            	html.push(getItem('C板通道1',chanel.One.SetStatus,chanel.One.ErrStatus));
            	html.push(getItem('C板通道2',chanel.Two.SetStatus,chanel.Two.ErrStatus));
            	html.push(getItem('C板通道3',chanel.Three.SetStatus,chanel.Three.ErrStatus));
            	html.push(getItem('C板通道4',chanel.Four.SetStatus,chanel.Four.ErrStatus));
            	html.push(getItem('C板扩展通道1',chanel.ExtOne.SetStatus,chanel.ExtOne.ErrStatus));
            	html.push(getItem('C板扩展通道2',chanel.ExtTwo.SetStatus,chanel.ExtTwo.ErrStatus));
            	html.push(getItem('C板扩展通道3',chanel.ExtThree.SetStatus,chanel.ExtThree.ErrStatus));
            	html.push(getItem('C板扩展通道4',chanel.ExtFour.SetStatus,chanel.ExtFour.ErrStatus));
                break;
            default:
            	html.push(getItem('主门B板',bindMainBStatus,bindMainBError));
            	html.push(getItem('副门B板',bindSubBStatus,bindSubBError));
            	html.push(getItem('主门C板',bindMainCStatus,bindMainCError));
            	html.push(getItem('副门C板',bindSubCStatus,bindSubCError));
                break;
        }
        return html.join('');
    }
	//获取单条记录
	function getItem(title,setStatus,errStatus){
		var html=[];
		
		html.push("<li class=\"ui-li-static ui-body-inherit\" style=\"padding:2px 0px;\"></li>");
		html.push("<li class=\"ui-li-divider ui-bar-inherit ui-first-child\" style=\"text-align:left;\">");
			
		html.push("<span><img style=\"vertical-align:middle;\" alt=\"\" src=\"images/item.png\">"+title+"</span>");            																															
		html.push("</li>");
		
		html.push("<li class=\"ui-li-static ui-body-inherit\" style=\"padding-left:20px;\">");
		html.push("<p>设置状态："+setStatus+"</p>");
		html.push("<p>错误状态："+errStatus+"</p>");
		html.push("</li>");
		
		return html.join('');
	}
	//获取数据
	function getChanel(bindMainCStatus,bindSubCStatus,bindMainCError,bindSubCError){
		
		var result={
				 One:{SetStatus:"",ErrStatus:""}
				,Two:{SetStatus:"",ErrStatus:""}
				,Three:{SetStatus:"",ErrStatus:""}
				,Four:{SetStatus:"",ErrStatus:""}
				,ExtOne:{SetStatus:"",ErrStatus:""}
				,ExtTwo:{SetStatus:"",ErrStatus:""}
				,ExtThree:{SetStatus:"",ErrStatus:""}
				,ExtFour:{SetStatus:"",ErrStatus:""}
				
		};
		
		//设置状态
		if(bindMainCStatus.length >0){
			if(bindMainCStatus.length >= 16){
				result.Four.SetStatus=bindMainCStatus.Substring(12, 4) ;
				result.Three.SetStatus=bindMainCStatus.Substring(8, 4) ;
				result.Two.SetStatus=bindMainCStatus.Substring(4, 4) ;
				result.One.SetStatus=bindMainCStatus.Substring(0, 4) ;
			}
			else if(bindMainCStatus.Length >= 12){
				result.Four.SetStatus=bindMainCStatus.Substring(12, bindMainCStatus.length - 12) ;
				result.Three.SetStatus=bindMainCStatus.Substring(8, 4) ;
				result.Two.SetStatus=bindMainCStatus.Substring(4, 4) ;
				result.One.SetStatus=bindMainCStatus.Substring(0, 4) ;
			}
			else if(bindMainCStatus.Length >= 8){
				result.Three.SetStatus=bindMainCStatus.Substring(8, bindMainCStatus.length - 8) ;
				result.Two.SetStatus=bindMainCStatus.Substring(4, 4) ;
				result.One.SetStatus=bindMainCStatus.Substring(0, 4) ;
			}
			else if(bindMainCStatus.Length >= 4){
				result.Two.SetStatus=bindMainCStatus.Substring(4, bindMainCStatus.length - 4) ;
				result.One.SetStatus=bindMainCStatus.Substring(0, 4) ;
			}
			else {
				result.One.SetStatus=bindMainCStatus ;
			}
		}
		
		//扩展
		if(bindSubCStatus.length >0){
			if(bindSubCStatus.length >= 16){
				result.ExtFour.SetStatus=bindSubCStatus.Substring(12, 4) ;
				result.ExtThree.SetStatus=bindSubCStatus.Substring(8, 4) ;
				result.ExtTwo.SetStatus=bindSubCStatus.Substring(4, 4) ;
				result.ExtOne.SetStatus=bindSubCStatus.Substring(0, 4) ;
			}
			else if(bindSubCStatus.Length >= 12){
				result.ExtFour.SetStatus=bindSubCStatus.Substring(12, bindSubCStatus.length - 12) ;
				result.ExtThree.SetStatus=bindSubCStatus.Substring(8, 4) ;
				result.ExtTwo.SetStatus=bindSubCStatus.Substring(4, 4) ;
				result.ExtOne.SetStatus=bindSubCStatus.Substring(0, 4) ;
			}
			else if(bindSubCStatus.Length >= 8){
				result.ExtThree.SetStatus=bindSubCStatus.Substring(8, bindSubCStatus.length - 8) ;
				result.ExtTwo.SetStatus=bindSubCStatus.Substring(4, 4) ;
				result.ExtOne.SetStatus=bindSubCStatus.Substring(0, 4) ;
			}
			else if(bindSubCStatus.Length >= 4){
				result.ExtTwo.SetStatus=bindSubCStatus.Substring(4, bindSubCStatus.length - 4) ;
				result.ExtOne.SetStatus=bindSubCStatus.Substring(0, 4) ;
			}
			else {
				result.ExtOne.SetStatus=bindSubCStatus ;
			}
		}
		//错误状态
		if(bindMainCError.length > 0){
			if(bindMainCError.length >= 16){
				result.Four.ErrStatus=bindMainCError.Substring(12, 4) ;
				result.Three.ErrStatus=bindMainCError.Substring(8, 4) ;
				result.Two.ErrStatus=bindMainCError.Substring(4, 4) ;
				result.One.ErrStatus=bindMainCError.Substring(0, 4) ;
			}
			else if(bindMainCError.Length >= 12){
				result.Four.ErrStatus=bindMainCError.Substring(12, bindMainCError.length - 12) ;
				result.Three.ErrStatus=bindMainCError.Substring(8, 4) ;
				result.Two.ErrStatus=bindMainCError.Substring(4, 4) ;
				result.One.ErrStatus=bindMainCError.Substring(0, 4) ;
			}
			else if(bindMainCError.Length >= 8){
				result.Three.ErrStatus=bindMainCError.Substring(8, bindMainCError.length - 8) ;
				result.Two.ErrStatus=bindMainCError.Substring(4, 4) ;
				result.One.ErrStatus=bindMainCError.Substring(0, 4) ;
			}
			else if(bindMainCError.Length >= 4){
				result.Two.ErrStatus=bindMainCError.Substring(4, bindMainCError.length - 4) ;
				result.One.ErrStatus=bindMainCError.Substring(0, 4) ;
			}
			else {
				result.One.ErrStatus=bindMainCError ;
			}
		}
		//扩展
		if(bindSubCError.length >0){
			if(bindSubCError.length >= 16){
				result.ExtFour.ErrStatus=bindSubCError.Substring(12, 4) ;
				result.ExtThree.ErrStatus=bindSubCError.Substring(8, 4) ;
				result.ExtTwo.ErrStatus=bindSubCError.Substring(4, 4) ;
				result.ExtOne.ErrStatus=bindSubCError.Substring(0, 4) ;
			}
			else if(bindSubCError.Length >= 12){
				result.ExtFour.ErrStatus=bindSubCError.Substring(12, bindSubCError.length - 12) ;
				result.ExtThree.ErrStatus=bindSubCError.Substring(8, 4) ;
				result.ExtTwo.ErrStatus=bindSubCError.Substring(4, 4) ;
				result.ExtOne.ErrStatus=bindSubCError.Substring(0, 4) ;
			}
			else if(bindSubCError.Length >= 8){
				result.ExtThree.ErrStatus=bindSubCError.Substring(8, bindMainCError.length - 8) ;
				result.ExtTwo.ErrStatus=bindSubCError.Substring(4, 4) ;
				result.ExtOne.ErrStatus=bindSubCError.Substring(0, 4) ;
			}
			else if(bindSubCError.Length >= 4){
				result.ExtTwo.ErrStatus=bindSubCError.Substring(4, bindSubCError.length - 4) ;
				result.ExtOne.ErrStatus=bindSubCError.Substring(0, 4) ;
			}
			else {
				result.ExtOne.ErrStatus=bindSubCError ;
			}
		}
		return result;
	}
	function reset(){
		$("#lbDeviceNo").html('');
		$("#lbMainboardId").html('');
		$("#lbBindElevator").html('');
		$("#lbMainboardVersion").html('');
		$(".listview").hide();
	}
})();