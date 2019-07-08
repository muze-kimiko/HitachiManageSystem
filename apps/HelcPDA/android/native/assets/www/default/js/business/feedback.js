
/* JavaScript content from js/business/feedback.js in folder common */
/**
 * 
 */

/**************************************************************/
var FeedbackModule = (function() {

	WLJQ(document).on('pageshow','#FeedbackList',function() {
		getData(onSuccess,'');
	});
	//从接口获取数据
	function getData(onSuccess,msg){
		var requestUrl="/api/feedback/GetFeedbackType";
		var tip=msg || '正在查询,请稍侯...';
		
		GetAPIData(requestUrl,"", onSuccess, null, null,null, true, false, null, tip);
	}
	function onSuccess(data) {
		var html=[];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			if(objResult && objResult.Table && objResult.Table.length>0){
				html.push("<ul data-role=\"listview\" class=\"ui-listview  ui-listview-inset\">");
				for (var i = 0, len = objResult.Table.length; i < len; i++) {
					var item = objResult.Table[i];
					if(i==0)
						html.push(" <li class=\"ui-first-child\" onclick=\"changePage('FeedbackAdd.html?type=" + encodeURIComponent(item.TypeName)+"')\">");
					else if(i==len-1)
						html.push(" <li class=\"ui-last-child\" onclick=\"changePage('FeedbackAdd.html?type=" + encodeURIComponent(item.TypeName)+"')\">");
					else
						html.push(" <li onclick=\"changePage('FeedbackAdd.html?type=" + encodeURIComponent(item.TypeName)+"')\">");
					html.push(" <a class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" href=\"#\"><h2>"+item.TypeName+"</h2><p>"+item.Desc+"</p></a></li>");
				}
				html.push("</ul>");
			}
			objResult=null;
		}
		
		$("#content").html(html.join(''));
	}
	
})();
//反馈追踪
var FeedbackAddModule = (function() {
	
	var typeId=1,imageData='';
	WLJQ(document).on('pageshow','#FeedbackAdd',function() {
		var title= decodeURIComponent(getUrlParam('type')) || '';
		typeId= decodeURIComponent(getUrlParam('typeId')) || 1;
		$(".pagetitle").html(title);
		
		$("#btnSave").on("click",function(){
			save();
		});
		$("#takephoto").on("click",function(){
			takePhone();
		});
		$("#getpicture").on("click",function(){
			pickImage();
		});
		$("#img-remove").on("click",function(){
			var cameraImage = document.getElementById('cameraImage');
		    cameraImage.src = "";
		    imageData='';
		    $("#cameraImage,#img-remove").hide();
		});
	});
	function save(){
		if($("#description").val().length<=5){
			alert("请输入反馈意见,至少5个字.");
			return;
		}
			
		
		var requestUrl="/api/feedback/Post";
		var tip='正在保存,请稍侯...';
		
		 var fd = new FormData();
	     fd.append("typeId",typeId);
	     fd.append("contact",$("#contact").val());
	     fd.append("description",$("#description").val());
	     fd.append("imageData",imageData);
	     
	     GetAPIDataExt(requestUrl,fd, onSuccess, null, null,null, true, false, null, tip,false,false);
	}
	function onSuccess(data) {
		if (data) {
			alert("保存成功");
		}
		else
			alert("保存失败");
	}
	//调用相机拍照,调用手机相岫
  	var pickImage = function () {
	    var options = {
	      destinationType: navigator.camera.DestinationType.DATA_URL,
	      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
	      allowEdit: false,
	      encodingType: Camera.EncodingType.JPEG,
	      targetHeight: 600,
	    };
	    navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataErr, options);
    };
    //拍照
  	function takePhone() {
		var options = {
	      quality: 50,
	      destinationType: navigator.camera.DestinationType.DATA_URL,
	      sourceType: navigator.camera.PictureSourceType.CAMERA,
	      allowEdit: false,
	      encodingType: navigator.camera.EncodingType.JPEG,
	      targetHeight: 600,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false
	    };
	  
	    navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataErr, options);
	};
  	//成功
	function onPhotoDataSuccess(data) {
		imageData=data||'';
	    var cameraImage = document.getElementById('cameraImage');
	    cameraImage.src = "data:image/jpeg;base64," + data;
	    $("#cameraImage,#img-remove").show();
	};
	//失败
	function onPhotoDataErr(ex) {};
})();
//反馈追踪
var FeedbackTraceModule = (function() {

	WLJQ(document).on('pageshow','#FeedbackTrace',function() {
		PageSetting.PageIndex=1;
		$("#more").on("click", function() {
			nextPage();
		});
		getData(onSuccess,'');
	});
	//从接口获取数据
	function getData(onSuccess,msg){
		var requestUrl="/api/feedback/GetList";
		var tip=msg || '正在查询,请稍侯...';
		
		var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				OrderBy : " CreatedTime desc ",
				Where : "",
			};
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, tip);
	}
	// 下一页
	function nextPage() {

		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		var requestUrl="/api/feedback/GetList";
		var tip='正在查询,请稍侯...';
		
		var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				OrderBy : " CreatedTime desc ",
				Where : "",
			};
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, tip);
	}
	function onSuccess(data) {
		var html=[];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if (objResult && objResult.ds && objResult.ds1[0]&& objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
				}
				
				html.push("<ul data-role=\"listview\" class=\"ui-listview ui-listview-inset \">");
				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					var item = objResult.ds[i];
					if(i==0)
						html.push(" <li class=\"ui-first-child\" onclick=\"changePage('FeedbackDetail.html?OId="+item.OId+"')\">");
					else if(i==len-1)
						html.push(" <li class=\"ui-last-child\" onclick=\"changePage('FeedbackDetail.html?OId="+item.OId+"')\">");
					else
						html.push(" <li onclick=\"changePage('FeedbackDetail.html?OId="+item.OId+"')\">");

					html.push(" <a class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" href=\"#\"><h2>"+item.Description+"</h2><p>"+item.CreatedTime+"</p><span class=\"ui-li-count\">"+item.Status+"</span></a></li>");
				}
				html.push("</ul>");
			}
			objResult=null;
		}
		if(PageSetting.PageIndex<=1)
			$("#content").html(html.join(''));
		else
			$("#content ul").append(html.join(''));
		
		html=null;
	};
	
})();
//反馈追踪
var FeedbackDetailModule = (function() {

	WLJQ(document).on('pageshow','#FeedbackDetail',function() {
		var OId = getUrlParam('OId')||0;
		var param = {
				FeedbackId : OId
			};
		
		getData(param,onSuccess,'');
	});
	//从接口获取数据
	function getData(param,onSuccess,msg){
		var requestUrl="/api/feedback/GetFeedbackReply";
		var tip=msg || '正在查询,请稍侯...';
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, null, null,null, true, false, null, tip);
	}
	function onSuccess(data) {
		var html=[];
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if(objResult && objResult.Table && objResult.Table.length>0) {
				html.push("<ul data-role=\"listview\" class=\"ui-listview\">");
				for (var i = 0, len = objResult.Table.length; i < len; i++) {
					var item = objResult.Table[i];
					
					html.push("<li class=\"ui-li-static ui-body-inherit ui-first-child\">");
					html.push("<h2>软件使用问题</h2>");
					html.push("<p>反馈时间："+item.CreatedTime+"</p>");
					html.push("<p>反馈类型："+item.TypeName+"</p>");
					html.push("<p>问题描述："+item.Description+"</p>");
					html.push("</li>");
			    
					html.push("<li data-role=\"list-divider\" class=\"ui-li-divider ui-bar-inherit\"></li>");
					html.push("<li class=\"ui-li-static ui-body-inherit\"><h2>处理状态</h2></li>");
				    
					if(i==0){
						if(len>1)
							html.push(" <li class=\"ui-li-static ui-body-inherit ui-first-child\">");
						else
							html.push(" <li class=\"ui-li-static ui-body-inherit ui-last-child\">");
					}
					else if(i==len-1)
						html.push(" <li class=\"ui-li-static ui-body-inherit ui-last-child\">");
					else
						html.push(" <li class=\"ui-li-static ui-body-inherit\">");

					html.push("<h2>"+(item.Status||'')+"</h2>");
					html.push("<p>"+(item.Answer||'你提交的反馈已经收到，我们将会尽快处理。')+"</p>");
					html.push("<p>"+(item.ReplyTime||'')+"</p>");
				}
				html.push("</ul>");
			}
		}
		
		$("#content").html(html.join(''));
		html=null;
	}
})();