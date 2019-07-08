
/* JavaScript content from js/business/main.js in folder common */
/**
 * 
 */
var MainModule = (function() {
	var PAGE_ID='#main';
	var InitMenu = Menu;
	var mySwiper =null;
	var CacheEmnu={LogoImage:"esslogo"
		,ReportData:"essreportdata"
	};
	
	WLJQ(document).on('pageinit', PAGE_ID, mainPageinit);
	// mainPageinit
	function mainPageinit() {
		var replacement='欢迎您' + getCookie(appid + '_UserId');
		var placeholder="{username}";
		var result=$("#labeluser").html().replace(placeholder,replacement);
		$("#labeluser").html(result);
	}
	WLJQ(document).on('pageshow', PAGE_ID, mainPageshow);
	// mainPageshow
	function mainPageshow() {
		try {
			
			mySwiper = new Swiper('.swiper-container', {
				pagination : '.pagination',
				vScroll:false,
				resizeReInit : true,  
				calculateHeight:true,  
				calculateHeight:true,
		    });
			//获取LOGO
			getLogoImage();
			
			var id = getUrlParam('id') || 1;
			
			_buildUI(parseInt(id));
			
			$(".bg").css("width", $(window).width());
			//获取报表数据
			getReportData();
			
		} catch (ex) {
			alert(ex);
		}
	}
	
	// 生成二级菜单
	function _buildUI(id) {
		try{
			switch (id) {
				case 1:
					if (roleStr.indexOf("yjyw", 0) > -1) {
						if(InitMenu.Monitor)
							_buildMenu(InitMenu.Monitor, id);
					}
					break;
				case 2:
					if (roleStr.indexOf("gzgl", 0) > -1) {
						if(InitMenu.Query)
							_buildMenu(InitMenu.Query, id);
					}
					break;
				case 3:
					if (roleStr.indexOf("sjdx", 0) > -1) {
						if(InitMenu.Data)
							_buildMenu(InitMenu.Data, id);
					}
					break;
				case 4:
					if (roleStr.indexOf("ywtj", 0) > -1) {
						if(InitMenu.Report)
							_buildMenu(InitMenu.Report, id);
					}
					break;
				default:
					break;
			}
			
			buildFooterNav(id);
		}
		catch(ex){
			alert(ex);
		}
	}
	// 菜单
	function _buildMenu(menuData, id) {
		var mySwiper= MainModule.getSwiper();
		
		if(mySwiper)
			mySwiper.removeAllSlides();
		
		var columnCount = 3;
		var maxCount = 6;
		var columnWidth = parseInt(100 / columnCount) + "%";
		var result = "";

		var iconLine = "", textLine = "";

		//正式
		var data= getAuthMenu(menuData);
		//测试
		//var data= menuData;

		var len=data.length;
		for (var i = 0; i < len; i++) {
			var item = data[i];
			
			iconLine += "<td style=\"padding-top:10px;\" onclick=\"MainModule.menuClick('" + item.url+ "','" + item.name + "');\">" + "<img src=\""+ item.imgpath + "\" /></td>";
			textLine += "<td onclick=\"MainModule.menuClick('" + item.url+ "','" + item.name+ "');\" >" + item.name+ "</td>";

			if(i%maxCount==0){
				if(i!=0)
					result = result +"</table></div>";
				if(len<=6){
					result = result +"<div class=\"swiper-slide swiper-no-swiping\" style=\"height:180px;\"><table style=\"width:100%;heigth:100%;\">";
				}
				else
				result = result +"<div class=\"swiper-slide\" style=\"height:180px;\"><table style=\"width:100%;heigth:100%;\">";
			}
			if ((i + 1) % columnCount == 0) {
				result = result + "<tr>" + iconLine + "</tr><tr>"+ textLine + "</tr>";
				iconLine = "";
				textLine = "";
			} else if (i == len - 1) {
				if ((i + 1) % columnCount == 1) {
					result = result + "<tr>" + iconLine
							+ "<td style=\"width:" + columnWidth
							+ ";\">&nbsp;</td>" + "<td style=\"width:"
							+ columnWidth + ";\">&nbsp;</td>" + "</tr>"
							+ "<tr>" + textLine + "<td style=\"width:"
							+ columnWidth + ";\">&nbsp;</td>"
							+ "<td style=\"width:" + columnWidth
							+ ";\">&nbsp;</td>" + "</tr>";
					iconLine = "";
					textLine = "";
				} else if ((i + 1) % columnCount == 2) {
					result = result + "<tr>" + iconLine
							+ "<td style=\"width:" + columnWidth
							+ ";\">&nbsp;</td>" + "</tr>" + "<tr>"
							+ textLine + "<td style=\"width:" + columnWidth
							+ ";\">&nbsp;</td>" + "</tr>";
					iconLine = "";
					textLine = "";
				}
			}
		}
		if (iconLine != "") {
			result = result + "<tr>" + iconLine + "</tr>" + "<tr>" + textLine + "</tr>";

			iconLine = "";
			textLine = "";
		}
		result += "</table></div>";
		
		$(".swiper-wrapper").html(result);
		
		if(mySwiper){
			mySwiper.reInit();
			
			if(data.length<=6){
				mySwiper.params.noSwiping=true;
				$("#pagination").hide();
			}
			else{
				mySwiper.params.noSwiping=false;
				$("#pagination").show();
			}
		}
		$(".swiper-slide,.swiper-wrapper.swiper-container").css({height:"200px"});
	}
	//获取有权限的菜单
	function getAuthMenu(menuData){
		var authArr=[];
		for (var i = 0, len = menuData.length; i < len; i++) {
			var item = menuData[i];
			
			if (roleStr.indexOf(item.value, 0) > -1) {
				authArr.push(item);
			}
		}
		return authArr;
	}
	// 底部导航条
	function buildFooterNav(id) {
		var result = "<ul class=\"ui-grid-c\">"
				+ "<li class=\"ui-block-a\" onclick=\"MainModule.buildUI(1)\"><a class=\"ui-link ui-btn {foot-nav-a} ui-btn-icon-top\" id=\"footer-monitor\" href=\"#\" data-icon=\"home-mymonitor\">遥监</a></li>"
				+ "<li class=\"ui-block-b\" onclick=\"MainModule.buildUI(2)\"><a class=\"ui-link ui-btn {foot-nav-b} ui-btn-icon-top\" id=\"footer-search\" href=\"#\" data-icon=\"home-mysearch\">查询</a></li>"
				+ "<li class=\"ui-block-c\" onclick=\"MainModule.buildUI(3)\"><a class=\"ui-link ui-btn {foot-nav-c} ui-btn-icon-top\" id=\"footer-data\" href=\"#\" data-icon=\"home-mydata\">数据</a></li>"
				+ "<li class=\"ui-block-d\" onclick=\"MainModule.buildUI(4)\"><a class=\"ui-link ui-btn {foot-nav-d} ui-btn-icon-top\" id=\"footer-report\" href=\"#\" data-icon=\"home-myreport\" >统计</a></li>"
				+ "</ul>";

		var a = "ui-icon-home-mymonitor";
		var b = "ui-icon-home-mysearch";
		var c = "ui-icon-home-mydata";
		var d = "ui-icon-home-myreport";

		switch (id) {
		case 1:
			a = "ui-icon-home-mymonitor-active";
			break;
		case 2:
			b = "ui-icon-home-mysearch-active";

			break;
		case 3:
			c = "ui-icon-home-mydata-active";
			break;
		case 4:
			d = "ui-icon-home-myreport-active";
			break;
		default:
			break;
		}
		result = result.replace(/{foot-nav-a}/, a).replace(/{foot-nav-b}/, b)
				.replace(/{foot-nav-c}/, c).replace(/{foot-nav-d}/, d);
		$("#navbar-custorm").html(result);
	}
	/*****************获取报表数据*****************/
	function getReportData() {
		var preDate = getDay(GetDate(), -1);
		var temp=preDate.split('-');
		var result = temp[0] + "年" + temp[1]+ "月" + temp[2] + "日";

		var filiale = (HQFlag == 'Y') ? "全国" : (company_name || "");

		$("#tip").html("数据源： " + filiale + " " + result);
		
		var key = userid + "" + getDay(GetDate(), -1);
		
		if(!getReportDataFromCache(key))
			getReportDataFromDB();
	}
	function getReportDataFromCache(key) {
		 return getFromCache(CacheEmnu.ReportData,key,onGetReportDataFromCacheSuccess);
	}
	function onGetReportDataFromCacheSuccess(data){
		showReportData(data);
	}
	// 获取统计数据
	function getReportDataFromDB() {
		
		var statDate = getDay(GetDate(), -1);
		
		var filiale = (HQFlag == 'Y') ? "全国" : (company_name || "");
		
		var startTime = statDate + " 00:00:00"
			, endTime = statDate+ " 23:59:59";

		var param = null;

		if (HQFlag == 'Y')
			param = {
				StartTime : startTime,
				EndTime : endTime,
				CompanyCode:company_code
			};
		else
			param = {
				StartTime : startTime,
				EndTime : endTime,
				Filiale : encodeURIComponent(filiale),
				CompanyCode:company_code
			};

		GetAPIData("/api/elevators/GetStatData", JSON.stringify(param),onGetReportDataSuccess, err, null, null, true,false, null, '正在查询,请稍侯...');
				
	}
	function onGetReportDataSuccess(data) {
		// 已调试台量：StockCount
		// 已激活台量：ActiveCount
		// 正常监控台量：NormalCount
		// 已激活比例：ActivePercent
		// 正常监控比例：MonitorPercent
		if (data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			if (objResult && objResult.ds && objResult.ds[0]) {
				var item = objResult.ds[0];
				var obj = {};
				obj.NormalCount = Math.round(item.NormalCount);
				if(item.StockCount==null || item.StockCount=="0")
					obj.MonitorPercent="0%";
				else
					obj.MonitorPercent=(item.NormalCount*100/item.StockCount)+ "%";
				// 显示统计数据
				showReportData(obj);
				// 写入localStorage
				var reportdata = {
					key : userid + "" + getDay(GetDate(), -1),
					value : obj
				};
				var json = JSON.stringify(reportdata);

				var localStorage = window.localStorage;
				if(localStorage){
					localStorage.removeItem(CacheEmnu.ReportData);
					localStorage.setItem(CacheEmnu.ReportData, json);
				};
			}
		}
	}
	
	// 显示统计数据
	function showReportData(item) {
		$("#monitorcount").html(item.NormalCount);// 正常监控台量
		
		$('#normalrate').circliful({
			percent : item.MonitorPercent.replace('%', ''),
			foregroundColor : '#75db3c',
			foregroundBorderWidth : 5,
			backgroundBorderWidth : 5,
			fillColor : '#f9eeec'
		});
	};
	/******************************************/
	/***************获取logo*******************/
	//获取logo
	function getLogoImage(){
		var key=GetDate();
		
		if(!getLogoImageFromCache(key))
			getLogoImageFromDB();
	}
	//从localstore获取
	function getLogoImageFromCache(key){
	  return getFromCache(CacheEmnu.LogoImage,key,onGetLogoImageFromCacheSuccess);
	}
	function onGetLogoImageFromCacheSuccess(data){
		if(data){
			
			var css={
				"background":"url(data:image/png;base64,"+data+") 0 0 no-repeat "
				,"background-size":"cover"
				,"max-height":"160px"
			};
			
			setTimeout(function(){
				$(".bg").css(css);
			}, 100);
		};
	}
	//从数据库获取
	function getLogoImageFromDB(){
		
		var requestUrl="/api/ajax/GetLogoImage";
		var param = {
				Version : EssApp.LogoImgVersion
			};
		
		GetAPIData(requestUrl,JSON.stringify(param), onGetLogoImageSuccess, null, null,null, true, false, null, null);
	}
	function onGetLogoImageSuccess(data){
		if (data && data.Data) {
			
			setTimeout(function(){
				$(".bg").css({background:"url(data:image/png;base64,"+data.Data+")"});
			}, 100);
			
			//设置localstore
			var imageData = {
				key : GetDate(),
				value: data.Data
			};
			var json = JSON.stringify(imageData);

			var localStorage = window.localStorage;
			if(localStorage){
				localStorage.removeItem(CacheEmnu.LogoImage);
				localStorage.setItem(CacheEmnu.LogoImage, json);
			};
		};
	};
	function getFromCache(cacheKey,itemKey,callback){
		var localStorage = window.localStorage;

		if (localStorage) {
			var storageItem = localStorage.getItem(cacheKey);

			if (storageItem) {
				var item = JSON.parse(storageItem);
				if (item) {
					if (item.key == itemKey) {
						if(item.value && callback)
						  callback(item.value);
						
						return true;
					} ;
				};
			};
		} ;
		
		return false;
	};
	/***************获取logo end*******************/
	/*************************************************/
	return {
		buildUI : function(id) {
			setTimeout(_buildUI(id), 1000);
		},
		buildMenu : function(data, id, showMore) {
			_buildMenu(data, id);
		},
		menuClick : function(url, name) {
			writelog('Menu', '使用' + name);
			changePage(url);
		},
		getSwiper:function(){
			return mySwiper;
		}
	};
})();