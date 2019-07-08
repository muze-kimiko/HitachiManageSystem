
var RetrievalModule = (function() {
	var PAGE_ID="#retrieval",myScroll=null;
	
	WLJQ(document).on('pageinit',PAGE_ID,function() {
		var opitons={
			 containerId :"wrapper",
			 pullDownId : "pullDown",
			 pullDownAction : refresh,
		};
		myScroll=IscrollWapper(opitons);
		myScroll.init();
	});
	WLJQ(document).on('pagehide',PAGE_ID,function() {
		myScroll=null;
		PageSetting.reset();
	});
	WLJQ(document).on('pageshow',PAGE_ID,function() {			
		//下一页
		$("#more").on("click", function() {
			nextPage();
		});
		search();
	});
	//查询
	function search(){
		var options=buildParas();

		if (options.action == 'search') {
			var param = {
					PageSize : PageSetting.PageSize,
					PageIndex : PageSetting.PageIndex,
					strOrder : "  ",
					alias : options.alias,
					code : options.code,
					name : options.name,
					faultType : options.faultType
				};
			getData(param,onSearchSuccess, err);
		}
	}
	//从接口获取数据
	function getData(param,onSuccess,onFault,msg){
		var requestUrl="/api/malfunctionCodes/GetPage_MalfunctionCodesListExt";
		var tip=msg || '正在查询,请稍侯...';
		onFault=onFault||err;
		
		GetAPIData(requestUrl,JSON.stringify(param), onSuccess, onFault, null,null, true, false, null, tip);
	}
	//查询成功
	function onSearchSuccess(data) {
		onSuccess(data,false);
	}
	// 刷新成功
	function onRefreshSuccess(data) {
		onSuccess(data,true);
	}
	//成功
	function onSuccess(data,isReflesh) {

		var html = [];
		$("#div-rowcount").show();
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(PageSetting.PageIndex<=1 || isReflesh)
				html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"gzshouce\">");
			
			if (objResult && objResult.ds && objResult.ds1[0] && objResult.ds1[0].datacount ) {
				if (PageSetting.PageIndex <= 1 || isReflesh) {
					PageSetting.TotalCount = objResult.ds1[0].datacount;
					$("#rowcount").html(PageSetting.TotalCount);
				}
				
				var ds=objResult.ds;
				
				for (var i = 0,len=ds.length; i < len; i++) {
					
					var item = ds[i];
					var obj={};
					obj.id=item.Id;
					obj.code=item.Code || "";
					obj.name=item.Name || "";
					obj.alias=item.Alias || "";
					obj.faultType=item.faultType||"";
					
					var mainPath = (item.faultType.toString() == "主微机故障" ? "": "_2");
					var imgPath="/upload/malfunctionPic/"+ item.TerminalTypeName + "_"+ item.ElevatorModelName + mainPath+ "/" + item.Code;
					var image1 = imgPath + ".gif";
					var image2 = imgPath + "_1.gif";
					var image3 = imgPath + "_2.gif";

					obj.imgHtml = "<a class=\"ui-btn ui-corner-all ui-shadow ui-btn-inline\" href=\"#popupPhotoLandscape\" data-position-to=\"window\" data-rel=\"popup\" onclick=\"RetrievalModule.changeimage('"+ image1+ "','"+ image2+ "','"+ image3+ "')\"><img src=\"images/dataget/pic_gzsc.png\" /></a>";

					try {
						if (item.ImageExist.toString() == '1') {
							obj.imgHtml = "<a class=\"ui-btn ui-corner-all ui-shadow ui-btn-inline\" href=\"javascript:void(0)\" onclick=\"RetrievalModule.changeimage('"+ image1+ "','"+ image2+ "','"+ image3+ "','"+ item.ImageSize+ "')\"><img src=\"images/dataget/pic_gzsc_yes.png\" /></a>";
						} else {
							obj.imgHtml = "<a class=\"ui-btn ui-corner-all ui-shadow ui-btn-inline\" href=\"javascript:void(0)\"><img src=\"images/dataget/pic_gzsc.png\" /></a>";
						}
					} catch (err) {
					}
					
					html.push(buildRowItem(obj));
					
					obj=null,item=null;
				}
				
				var remainCout = PageSetting.TotalCount - PageSetting.PageSize* PageSetting.PageIndex;
				
				remainCout =remainCout < 0?0:remainCout;

				$("#remaincount").html(remainCout);
				
				$("#div-more").show();
				$("#rowcount").html(PageSetting.TotalCount);
			} else {
				$("#div-more").show();
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
		}
	}
	function buildRowItem(obj){
		var html=[];
		html.push("<tr>");
		html.push("<td class=\"bottomxian\" rowspan=\"2\" style=\"padding-left:8px;width:50px;\">@imgHtml</td>");
		html.push("<td colspan=\"2\" style=\"cursor:pointer;\" onclick=\"RetrievalModule.showDetail('@id')\" ><b>@code</b>@name</td>");
		html.push("<td class=\"bottomxian\" rowspan=\"2\" class=\"xian\"><a href=\"javascript:void(0)\" onclick=\"RetrievalModule.showDetail('@id')\" ><img src=\"images/detail.png\" /></a></td>");
		html.push("</tr>");
		html.push("<tr style=\"cursor:pointer;\" onclick=\"RetrievalModule.showDetail('@id')\">");
		html.push("<td class=\"bottomxian\"  >[@alias]</td>");
		html.push("<td class=\"bottomxian\" style=\"text-align:left;\">@faultType</td>");
		html.push("</tr>");
		
		var result=html.join('').replace(new RegExp("@imgHtml", 'g'), obj.imgHtml)
		.replace(new RegExp("@id", 'g'), obj.id)
		.replace(new RegExp("@code", 'g'), obj.code)
		.replace(new RegExp("@name", 'g'), obj.name)
		.replace(new RegExp("@alias", 'g'), obj.alias)
		.replace(new RegExp("@faultType", 'g'), obj.faultType);
		
		return result;
	}
	function nextPage() {
		PageSetting.PageIndex = PageSetting.PageIndex + 1;

		if (PageSetting.isLastPage()) {
			alert("已经到最后一页");
			return false;
		}
		var options=buildParas();
		var param = {
				PageSize : PageSetting.PageSize,
				PageIndex : PageSetting.PageIndex,
				strOrder : "  ",
				alias : options.alias,
				code : options.code,
				name : options.name,
				faultType : options.faultType,
				
			};
		getData(param,onSearchSuccess, err,"加载更多...");
	}
	function _showDetail(id) {
		$("#popupRetrievalDetail").css({width:$(window).width(),height:$(window).height() + 100});

		if (id) {
			WatermarkModule.setWatermark();

			var param1={id:id};
			GetAPIData("/api/malfunctionCodes/GetPage_MalfunctionCodesId",JSON.stringify(param1), onGetDetailSuccess, err, null, null, true, false,null, '正在加载,请稍侯...');

			var param2={PageSize:10,PageIndex:1,MalfunctionCodeID: id};

			GetAPIData("/api/MalfunctionItems/GetPage_MalfunctionItemsList",JSON.stringify(param2), onCheckDetailInfoSuccess, err, null, null, true,false, null, '正在加载,请稍侯...');
		}
		$("#popupRetrievalDetail").popup("open");
	}
	function onGetDetailSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			
			if (objResult && objResult[0]) {
				var obj=objResult[0];
				$('#lbAlias').html(obj.Alias);
				$('#lbCode').html(obj.Code);
				$('#lbName').html(obj.Name);
				$('#lbDescription').html(obj.Description);
				$('#lbClassName').html(obj.faultType);
				$('#lbRankName').html(obj.RankName);
				obj=null;
			}
		}
	}
	function onCheckDetailInfoSuccess(data) {
		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);
			if (objResult && objResult[0]) {
				$("#checkproject").html(objResult[0].HTML);
			}
		}
	}
	//刷新
	function refresh(){
		$("#pullDown").css({display:'none'});
		$("#SearchResult").hide();
		$("#div-more").hide();
		
		var options=buildParas();
		
		var param = {
				PageSize : PageSetting.PageSize*PageSetting.PageIndex,
				PageIndex : PageSetting.PageIndex,
				strOrder : "  ",
				alias : options.alias,
				code : options.code,
				name : options.name,
				faultType : options.faultType
			};
		
		
		getData(param,onRefreshSuccess, null,"正在刷新,请稍侯...");
	}
	//参数
	function buildParas(){
		var resultParas={};
		
		var action = getUrlParam('action');
		var alias = getUrlParam('alias');
		var code = getUrlParam('code');
		var name = getUrlParam('name');
		var faultType = getUrlParam('faulttype');
		
		resultParas={
				action:action,
				alias:alias,
				code:code,
				name:name,
				faultType:faultType
		}
		return resultParas;
	}
	/***************************************************************************/
	function _changeimage(img1, img2, img3, imagesize) {
		
		var sizes = imagesize.split(',');

		var items = [];

		if (sizes[0] > 0) {
			items.push({
				src : baseurl + "/api/public/GetImage?id="
						+ encodeURIComponent(img1) + '&userid='
						+ encodeURIComponent(userid) + '&usernames='
						+ encodeURIComponent(usernames),
				w : sizes[0],
				h : sizes[1]
			});
		}

		if (sizes[2] > 0) {
			items.push({
				src : baseurl + "/api/public/GetImage?id="
						+ encodeURIComponent(img2) + '&userid='
						+ encodeURIComponent(userid) + '&usernames='
						+ encodeURIComponent(usernames),
				w : sizes[2],
				h : sizes[3]
			});
		}

		if (sizes[4] > 0) {
			items.push({
				src : baseurl + "/api/public/GetImage?id="
						+ encodeURIComponent(img3) + '&userid='
						+ encodeURIComponent(userid) + '&usernames='
						+ encodeURIComponent(usernames),
				w : sizes[4],
				h : sizes[5]
			});
		}

		openPhotoSwipe(items);
	};
	
	var openPhotoSwipe = function(items) {
		var pswpElement = document.querySelectorAll('.pswp')[0];

		var options = {
			history : false,
			focus : false,
			showAnimationDuration : 0,
			hideAnimationDuration : 0
		};

		var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items,
				options);
		gallery.init();
	};

	var initPhotoSwipeFromDOM = function(gallerySelector) {
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes, numNodes = thumbElements.length, items = [], figureEl, linkEl, size, item;
			for (var i = 0; i < numNodes; i++) {
				if (window.CP.shouldStopExecution(1)) {
					break;
				}
				figureEl = thumbElements[i];
				if (figureEl.nodeType !== 1) {
					continue;
				}
				linkEl = figureEl.children[0];
				size = linkEl.getAttribute('data-size').split('x');
				item = {
					src : linkEl.getAttribute('href'),
					w : parseInt(size[0], 10),
					h : parseInt(size[1], 10)
				};
				if (figureEl.children.length > 1) {
					item.title = figureEl.children[1].innerHTML;
				}
				if (linkEl.children.length > 0) {
					item.msrc = linkEl.children[0].getAttribute('src');
				}
				item.el = figureEl;
				items.push(item);
			}
			window.CP.exitedLoop(1);
			return items;
		};
		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			var eTarget = e.target || e.srcElement;
			var clickedListItem = closest(eTarget, function(el) {
				return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
			});
			if (!clickedListItem) {
				return;
			}
			var clickedGallery = clickedListItem.parentNode, childNodes = clickedListItem.parentNode.childNodes, numChildNodes = childNodes.length, nodeIndex = 0, index;
			for (var i = 0; i < numChildNodes; i++) {
				if (window.CP.shouldStopExecution(2)) {
					break;
				}
				if (childNodes[i].nodeType !== 1) {
					continue;
				}
				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}
			window.CP.exitedLoop(2);
			if (index >= 0) {
				openPhotoSwipe(index, clickedGallery);
			}
			return false;
		};
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1), params = {};
			if (hash.length < 5) {
				return params;
			}
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if (window.CP.shouldStopExecution(3)) {
					break;
				}
				if (!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if (pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			window.CP.exitedLoop(3);
			if (params.gid) {
				params.gid = parseInt(params.gid, 10);
			}
			return params;
		};
		var openPhotoSwipe = function(index, galleryElement, disableAnimation,
				fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0], gallery, options, items;
			items = parseThumbnailElements(galleryElement);
			options = {
				galleryUID : galleryElement.getAttribute('data-pswp-uid'),
				getThumbBoundsFn : function(index) {
					var thumbnail = items[index].el.getElementsByTagName('img')[0], pageYScroll = window.pageYOffset
							|| document.documentElement.scrollTop, rect = thumbnail
							.getBoundingClientRect();
					return {
						x : rect.left,
						y : rect.top + pageYScroll,
						w : rect.width
					};
				}
			};
			if (fromURL) {
				if (options.galleryPIDs) {
					for (var j = 0; j < items.length; j++) {
						if (window.CP.shouldStopExecution(4)) {
							break;
						}
						if (items[j].pid == index) {
							options.index = j;
							break;
						}
					}
					window.CP.exitedLoop(4);
				} else {
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}
			if (isNaN(options.index)) {
				return;
			}
			if (disableAnimation) {
				options.showAnimationDuration = 0;
			}
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items,
					options);
			gallery.init();
		};
		var galleryElements = document.querySelectorAll(gallerySelector);
		for (var i = 0, l = galleryElements.length; i < l; i++) {
			if (window.CP.shouldStopExecution(5)) {
				break;
			}
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
		window.CP.exitedLoop(5);
		var hashData = photoswipeParseHash();
		if (hashData.pid && hashData.gid) {
			openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1],
					true, true);
		}
	};
	
	return {
		showDetail : function(id, dataindex) {
			_showDetail(id, dataindex);
		},
		changeimage:function(img1, img2, img3, imagesize) {
			_changeimage(img1, img2, img3, imagesize);
		}
	};
})();
/*********************************************/
(function() {
	var PAGE_ID="#retrievalsearch";
	
	WLJQ(document).on('pageshow',PAGE_ID,function() {	
		
		initElevator('txtAlias');
		
		$("#btn-retrieval-search").on("click", function() {
			ok();
		});
		
	});
	
	function ok() {
		var alias = $("#txtAlias").val();
		var code = $("#txtCode").val();
		var name = $("#txtName").val();
		var faulttype = $("#selectFaulttype").val();

		if (alias == "" && code == "" && name == "") {
			alert("请输入搜索条件!");
			return false;
		}

		changePage('Retrieval.html?action=search&alias='
				+ encodeURIComponent(alias) + '&code='
				+ encodeURIComponent(code) + '&name='
				+ encodeURIComponent(name) + '&faulttype='
				+ encodeURIComponent(faulttype));
	}
})();

