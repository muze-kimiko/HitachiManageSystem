
/* JavaScript content from js/business/smsreceipt.js in folder common */
/**
 * 
 */
/** ***********************短信回执 开始******************************* */
var SmsReceiptModule = (function() {
	
	WLJQ(document).on('pagehide', '#SmsReceipt', function(){		
		PageSetting.reset();
	});

		
	WLJQ(document).on('pageshow', '#SmsReceipt', function(){
		try{
			// 返回首页
			$("#home").on("click", function() {
				home(1);
			});
			// 下一页
			$("#more").on("click", function() {
				nextPage();
			});
	                PageSetting.PageIndex = 1;
	              search();
			
		}catch (err) {
			// alert(err);
		}
	});
	   function search(){
	     PageSetting.PageIndex = 1;
	     var tel = getUrlParam('tel');
	         getData(tel);
	     }

	// 下一页
	function nextPage() {
	  PageSetting.PageIndex = PageSetting.PageIndex + 1;
	  var tel = getUrlParam('tel');
	            if (PageSetting.isLastPage()) {
	    			alert("已经到最后一页");
	    			return false;
	    		}
		getData(tel);
	}
	function getData(tel){		

		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			tel:tel,
		};
		GetAPIData("/api/Elevators/SendMessageLog", JSON.stringify(param),
				onSearchSuccess, err, null, null, true, false, null,
				'正在查询,请稍侯...');
	}
	function onSearchSuccess(data) {
		
		var html = [];

		if (data) {
			var objResult = eval("(" + data.Data + ")");
	                  html.push(" <table style=\"width:100%;font-size:12px;text-align:center;\" >");
//			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >");
			if (objResult && objResult.ds && objResult.ds1[0]
					&& objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
//					html.push("<tr><td colspan=\"3\" align=\"right\">共搜索到"+ PageSetting.TotalCount + "条数据</td>");
				}
				var mobile = "",sendDate = "",sendtext = "",receivedate = "";
				var item;

				for (var i = 0, len = objResult.ds.length; i < len; i++) {
					item = objResult.ds[i];
					mobile = item.Mobile || "";
					sendDate=item.SendDate|| "";
					sendtext = item.ReceiveDesc || "";
					receivedate = item.ReceiveDate || "";

					html.push("<tr>");
					html.push("<td style=\"width:25%;border-bottom: 1px dashed #BBB;\">"+mobile+"</td>");
					html.push("<td style=\"width:25%;border-bottom: 1px dashed #BBB;\">"+sendDate+"</td>");
					html.push("<td style=\"width:25%;border-bottom: 1px dashed #BBB;\">"+sendtext+"</td>");
					html.push("<td style=\"width:25%;border-bottom: 1px dashed #BBB;\">"+receivedate+"</td>");
					html.push("</tr>");
				}
				$("#div-more").css("display", "");
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize
						* PageSetting.PageIndex;

				if (remainCout < 0)
					remainCout = 0;

				if (remainCout > 0)
					$("#more").html('更多[剩余' + remainCout + '条]');
				else
					$("#more").hide();
			} else {
				$("#div-more").css("display", "none");
				html.push("<tr><td colspan=\"3\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
		
	   }
	};	
	return {
		ToSmsReceipt:function(url){
			changePage(url);
		}
	};
})();