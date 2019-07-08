/**
 * 电话卡
 */
var TelcardMoudle = (function() {
	var PAGE_ID="#telcardinfo";
	
	WLJQ(document).on('pageinit', PAGE_ID, function() {
		$("#phone,#sim,#imei").css('cursor', 'pointer');
	});
	WLJQ(document).on('pageshow', PAGE_ID, function() {
		$("#phone,#sim,#imei").on("click", function() {
			$("#SearchResult").html('');
			PageSetting.reset();
			_setKeyStatus(this);

			search();
		});
		$("#more").on("click", function() {
			nextPage();
		});
	});
	WLJQ(document).on('pagehide', PAGE_ID, function() {
		PageSetting.reset();
	});
	function _setKeyStatus(obj) {
		if (obj.id == "phone") {
			$("#telcardkeytype").val(0);
			$("#" + obj.id).css('background-image','url(images/guanjianci_active.png)');
			$("#sim,#imei").css('background-image','url(images/guanjianci_moren.png)');
			$("#" + obj.id).css('cursor', 'default');
			$("#sim,#imei").css('cursor', 'pointer');
		} else if (obj.id == "sim") {
			$("#telcardkeytype").val(1);
			$("#" + obj.id).css('background-image','url(images/guanjianci_active.png)');
			$("#phone,#imei").css('background-image','url(images/guanjianci_moren.png)');
			$("#" + obj.id).css('cursor', 'default');
			$("#phone,#imei").css('cursor', 'pointer');
		} else {
			$("#telcardkeytype").val(2);
			$("#" + obj.id).css('background-image','url(images/guanjianci_active.png)');
			$("#phone,#sim").css('background-image','url(images/guanjianci_moren.png)');
			$("#" + obj.id).css('cursor', 'default');
			$("#phone,#sim").css('cursor', 'pointer');
		}
	}
	function search() {
		var keytype = $("#telcardkeytype").val();
		var key = $('#txtKey').val();

		

		if ($.trim(key).length < 1) {
			alert("查询条件不能为空");
			return false;
		}
		$("#rowcount").html("");
		$("#div-more").hide();
		getData(keytype, key);
	}
	function nextPage() {
		var keytype = $("#telcardkeytype").val();
		var key = $('#txtKey').val();
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if ($.trim(key).length < 1) {
			alert("查询条件不能为空");
			return false;
		}
		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		getData(keytype, key);
	}
	// 获取数据
	function getData(keytype, key) {
		var param = {
			PageSize : PageSetting.PageSize,
			PageIndex : PageSetting.PageIndex,
			orderby : "",
			KeyType : keytype,
			Key : key
		};
		GetAPIData("/api/SimCards/GetSimCardsListExt", JSON.stringify(param),
				onSearchSuccess, err, null, null, true, false, null,
				'正在查询,请稍侯...');

	}
	// 获取成功
	
	function onSearchSuccess(data) {
		var html = [];

		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >");
			
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount) {
				if (PageSetting.PageIndex <= 1) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					html.push("<tr><td colspan=\"3\" align=\"right\">共搜索到"+ PageSetting.TotalCount + "条数据</td>");
				}
				
				var ds=objResult.ds;
				
				for (var i = 0, len = ds.length; i < len; i++) {
					
					var item = ds[i];
					
					var obj={};
					
					obj.address = item.电梯位置 || "";
					obj.id = item.Id || item.ID || item.id;
					obj.phone = item.电话卡号码 || "";
					obj.deviceNo = item.工号 || "";
					obj.brand = item.品牌 || "";
					obj.cardStatus=item.是否在用||"";		
					obj.fontColor=item.是否在用 == "已销卡"?"#FF0000":"#000000";
					
					html.push(buildRowItem(obj));
					
					obj=null,item=null;
				}
				
				$("#div-more").show();
				
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize
						* PageSetting.PageIndex;

				if (remainCout < 0)
					remainCout = 0;

				if (remainCout > 0){
					$("#more").html('更多[剩余' + remainCout + '条]');
					$("#more").show();
				}
				else
					$("#more").hide();
			} else {
				$("#div-more").hide();
				html.push("<tr><td colspan=\"3\" align=\"right\">共搜索到0条数据</td></tr>");
			}
			html.push("</table>");

			$("#SearchResult").append(html.join(''));
		}
	};
	function buildRowItem(obj){
		var html=[];
		
		html.push("<tr class=\"oddtr\">");
		html.push("<td colspan=\"4\" class=\"splitline\" style=\"padding-left:8px;line-height:1.2em;\">@address</td>");
		html.push("</tr>");
		html.push("<tr style=\"cursor:pointer;\"  onclick=\"TelcardMoudle.showDetail('@id');\">");
		html.push("<td nowrap=\"nowrap\" width=\"30%\" style=\"color:blue;padding-left:8px;\">@phone</td>");
		html.push("<td nowrap=\"nowrap\" width=\"30%\">@deviceNo</td>");
		html.push("<td nowrap=\"nowrap\" width=\"15%\" style=\"color:@fontColor;\">@cardStatus</td>");
		html.push("<td nowrap=\"nowrap\" width=\"10%\">@brand</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@address", 'g'), obj.address)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@phone", 'g'), obj.phone)
		.replace(new RegExp("@deviceNo", 'g'), obj.deviceNo)
		.replace(new RegExp("@fontColor", 'g'), obj.fontColor)
		.replace(new RegExp("@cardStatus", 'g'), obj.cardStatus)
		.replace(new RegExp("@brand", 'g'), obj.brand);
		
		return result;
	}
	// 电话卡详细信息
	function _showDetail(para) {
		try {
			var param = {
				"Id" : para
			};
			GetAPIData("/api/SimCards/GetSimCardDetial", JSON.stringify(param),
					onGetDetailSuccess, null, null, null, true,
					false, null, '正在加载,请稍侯...');
		} catch (err) {
		}
	}
	// 获取电话卡详细信息成功
	function onGetDetailSuccess(data) {
		$("#popupTelcardDetail").css("width", $(window).width());
		$("#popupTelcardDetail").css("height", $(window).height());

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			var item = objResult.ds[0];

			if (item) {
				$('#lbDeviceNo').html(item.工号);
				$('#lbBuilding').html(item.地盘);
				$('#lbAddress').html(item.电梯位置);
				$('#lbPhone').html(item.电话卡号码);
				$('#lbSimCode').html(item.SIM);
				$('#lbImeiCode').html(item.IMSI);
				$('#lbMalfunction').html(item.品牌);
				$('#lbLastContactDate').html(item.上线时间);
				$('#lbIsUes').html(item.是否在用);
				if (item.是否在用 == "已销卡") {
					$('#lbIsUes').css('color', '#FF0000');
				}else{
					$('#lbIsUes').css('color', '#000000');
				}
			}
		}
		$("#popupTelcardDetail").popup("open");
	};

	return {
		showDetail : function(para) {
			_showDetail(para);
		}
	};
})();