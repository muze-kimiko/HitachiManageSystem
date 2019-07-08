
/* JavaScript content from js/business/favorite.js in folder common */
/**
 * 收藏记录
 */
var MainMenuEnum={
	ActivateTest:10,   //激活调试
	RemoteMonitor:20,  //远程监视
	FaultFile:30,      //故障存档
	FaultRW:40,        //故障读写
};

function MainMenuExt2(index) {
	var paraObj=null;
	
	var values=[];
	$("input[name='chk']:checked").each(function() {
		var arr = this.value.split(',');
		values.push(arr[1]);
	});
	
	if (values.length <= 0) {
		alert("请选择电梯");
		return;
	}
	
	switch (index) {
		case MainMenuEnum.ActivateTest:
			if (values.length > 0) {
				url = '?action=jump&assetnum=' + values.join(',');
			} else {
				url = '?assetnum=';
			}
			changePage('ActivateTest.html' + url);
			break;
		case MainMenuEnum.RemoteMonitor:
			if(values.length==1){
				paraObj = {DeviceNo: values[0]};
				GetAPIData("/api/elevators/GetElevatorByDeviceNo", JSON.stringify(paraObj),onRealtimeExceptionSuccess, err, null, null, true, false,null, '正在处理中,请稍侯...');
			}
			else{
				changePage('realtimemore.html?action=jump&paralist=' + values.join(','));
			}
			break;
		case MainMenuEnum.FaultFile:
			paraObj = {DeviceNo:values[0]};

			GetAPIData("/api/elevators/GetElevatorByDeviceNo", JSON.stringify(paraObj),onFaultfileExceptionSuccess, err, null, null, true, false,null, '正在处理中,请稍侯...');
			break;
		case MainMenuEnum.FaultRW:
			paraObj = {DeviceNo: values[0]};

			GetAPIData("/api/elevators/GetElevatorByDeviceNo", JSON.stringify(paraObj),onDatarwExceptionSuccess, err, null, null, true, false,null, '正在处理中,请稍侯...');
			break;
	}
}

var FavoriteModule = (function() {
	var isFirstInit=false;
	
	var ModuleType = [ 
	                  {name : "激活调试",value : "activetest"}
					, {name : "实时监视",value : "realtime"}
					, {name : "故障发报",value : "faulttransmitters"}
					, {name : "故障发报",value : "faulttransmittersIssue"}
					, {name : "故障存档",value : "faultfile"}
					, {name : "设备巡视",value : "devicetour"}
					, {name : "运行巡视",value : "runtour"}
					, {name : "预诊断报警",value : "alarmcollect"}
	];
	WLJQ(document).on('pageshow','#favorite',function() {
		try {
			$("#popupDelDialog,#popupDelAllDialog").css("width",document.body.clientWidth * 0.85);
			//删除单条数据
			$("#deletesingle").on("click", function() {
				remove();
			});
			
			//新增
			$("#btnAdd").on("click",function(){
				$("#popupMenu").popup("close");
				$("#txtGroupName").val('');
				setTimeout('$("#AddUI").popup("open")', 300) ;
			});
			//删除
			$("#btnDelete").on("click",function(){
				$("#popupMenu").popup("close");
				
				setTimeout('FavoriteGroupModule.getAll(null)', 300);
			});
			
			$("#btn-add-Save").on("click",function(){
				FavoriteGroupModule.add($("#txtGroupName").val());
			});
			$("#btn-add-cancel").on("click",function(){
				$("#AddUI").popup("close");
			});
			
			$("#btnCancel").on("click",function(){
				$("#popupFavoriteGroupDialog").popup("close");
			});
			
			$("#btn-group-move").on("click",function(){
				var targetGroupId="";
				$("input[name='chkgroup']:checked").each(function() {
					targetGroupId=this.value;
					return;
				});
				
				var temp=$("#hiddelid").val();
				var curFavoriteId='',curGroupId='';
				
				if(temp!=''){
					var arr=temp.split(',');
					curFavoriteId=arr[0];
					if(arr.length>1){
						curGroupId=arr[1];
					}
				}
				
				var favoriteGroupObj=[{FavoriteId:curFavoriteId,GroupId:curGroupId}];
				
				var param = {
						FavoritesGroupMapping:JSON.stringify(favoriteGroupObj),
						TagetGroupIds : targetGroupId
					};
				var requestUrl="/api/favorites/Cut";
				GetAPIData(requestUrl, JSON.stringify(param),onSaveSuccess, null, null, null, false, false);
				
			});
			
			$("#btnDelFavorite").on("click",function(){
				var values=[];
				$("input[name='chkgroup']:checked").each(function() {
					var arr = this.value.split(',');
					values.push(arr[0]);
				});
				
				
				if (values.length <= 0) {
					alert("请选择分组");
					return;
				}
				
				FavoriteGroupModule.del(values.join(','));
			});
			$("#btn-group-Cancel").on("click",function(){
				$("#popupMoveGroupDialog").popup("close");
			});
			
			bindNavEvent();
			
			isFirstInit=true;
			
			search();
		} catch (err) {
		}
	});
	// 邦定导航事件
	function bindNavEvent() {
		$("#footer-activetest").on("click", function() {
			MainMenuExt2(MainMenuEnum.ActivateTest);
		});

		$("#footer-faultfile").on("click", function() {
			MainMenuExt2(MainMenuEnum.FaultFile);
		});

		$("#footer-faultrw").on("click", function() {
			MainMenuExt2(MainMenuEnum.FaultRW);
		});

		$("#footer-realtimemore").on("click", function() {
			MainMenuExt2(MainMenuEnum.RemoteMonitor);
		});
	}
	//查询
	function search() {
		var requestUrl='/api/favoritesGroup/GetAllWithFavorites';
		GetAPIData(requestUrl, '',onSearchSuccess, null, null, null, true, false, null,'正在查询,请稍侯...');
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(objResult && objResult.Table && objResult.Table.length>0){
				var groupName='';
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var rowItem=objResult.Table[i];
					rowItem.Source ="";
					if(rowItem.Fid)
						rowItem.Source=getModuleType(rowItem.Fid.toLowerCase());
					
					if(groupName!=rowItem.GroupName){
						if(isFirstInit && rowItem.GroupId && rowItem.GroupId !='00000000-0000-0000-0000-000000000000')
						$("#group-listview").append("<li><input type=\"checkbox\" style=\"float:left;\" name=\"rdgroup\" value=\""+ rowItem.GroupId + "\">"+rowItem.GroupName+"</li>");
						
						if(groupName){
							html.push("</ul>");
							html.push("</div>");
						}
						
						html.push("<div data-role=\"collapsible\">");
						html.push("<h2>"+rowItem.GroupName+"<span class=\"ui-li-count\">"+rowItem.FavoriteCount+"</span></h2>");
						
						html.push("<ul class=\"ui-listview ui-group-theme-a\" data-role=\"listview\" data-theme=\"a\" data-divider-theme=\"b\">");
						if(rowItem.Id){
							html.push(buildItem(rowItem));
						}						
					}
					else{
						if(rowItem.Id){
							html.push(buildItem(rowItem));
						}		
					}
					groupName=rowItem.GroupName;
					
					if(i==(len-1)){
						html.push("</ul>");
						html.push("</div>");
					}
				}
			}
		}
		$("#mycollapsibleset").html(html.join(''));
		$("#mycollapsibleset").collapsibleset('refresh');
		$("#group-listview").listview('refresh');
		isFirstInit=false;
		html=null;
	}
	function buildItem(rowItem){
		var statues=(rowItem.IsException == "1" ? "<font style=\"color:red;\">遥监异常</font>": "<font style=\"color:green;\">遥监正常</font>");
		
		var html=[];
		html.push("<li class=\"ui-li-divider ui-bar-b ui-li-has-count ui-first-child\" style=\"text-align:left;background-color:#fff;color:#000;font-weight:normal;\" data-role=\"list-divider\">");
		html.push("<input type=\"checkbox\" class=\"my-checkbox\" style=\"float:left;\" name=\"chk\" value=\""+rowItem.Id + "," + rowItem.DeviceNo + "," + (rowItem.GroupId||'00000000-0000-0000-0000-000000000000') + "\"><span style=\"color:#2B89D3;text-shadow: none;font-weight:blod;text-align:left;\" onclick=\"changePage('"+ rowItem.SId+ "')\">"+ rowItem.DeviceNo+"</span>");
		html.push("<span style='float:right;'>");
		html.push("<button style=\"background-color:#2B89D3;color:#fff;-webkit-border-radius:.3125em;border-radius:.3125em;font-size: 12.5px;text-align: center;border-width: 1px;border-style: solid;padding: 0 .48em;line-height: 1.6em;min-height: 1.6em;min-width: .64em;right: .8em;\" onclick=\"FavoriteModule.showMoveGroup('"+rowItem.Id+","+rowItem.GroupId+"')\">转组</button>");
		html.push("<button style=\"background-color:#2B89D3;color:#fff;-webkit-border-radius:.3125em;border-radius:.3125em;font-size: 12.5px;text-align: center;border-width: 1px;border-style: solid;padding: 0 .48em;line-height: 1.6em;min-height: 1.6em;min-width: .64em;right: .8em;\" onclick=\"FavoriteModule.confirmDialog('"+ rowItem.Id+","+rowItem.GroupId+ "');\">取消收藏</button>");
		html.push("</span>");
		//html.push("<button style=\"float:left;background-color:#2B89D3;color:#fff;-webkit-border-radius:.3125em;border-radius:.3125em;font-size: 12.5px;text-align: center;border-width: 1px;border-style: solid;padding: 0 .48em;line-height: 1.6em;min-height: 1.6em;min-width: .64em;right: .8em;\" onclick=\"FavoriteModule.showMoveGroup('"+rowItem.Id+","+rowItem.GroupId+"')\">转组</button><span style=\"color:#2B89D3;font-weight: bold;text-shadow:none;\" onclick=\"changePage('"+ rowItem.SId+ "')\">"+ rowItem.DeviceNo+"</span> <button class=\"ui-li-count\" style=\"font-weight: normal;background-color:#2B89D3;color:#fff;\" onclick=\"FavoriteModule.confirmDialog('"+ rowItem.Id+","+rowItem.GroupId+ "');\">取消收藏</button>");
		html.push("</li>");
		html.push("<li style=\"background-color:#fff;\">");
		html.push("<a href=\"#\" class=\"ui-btn\">");
		html.push("<p><strong>"+(rowItem.Filiale|| "")+"</strong> | "+(rowItem.Maintenance || "")+" | "+statues)+"</p>";
		html.push("<p>"+(rowItem.InstallSite || '')+"</p>");
		//html.push("<p >");
		//html.push("<button style=\"background-color:#2B89D3;color:#fff;-webkit-border-radius:.3125em;border-radius:.3125em;font-size: 12.5px;text-align: center;border-width: 1px;border-style: solid;padding: 0 .48em;line-height: 1.6em;min-height: 1.6em;min-width: .64em;right: .8em;\" onclick=\"FavoriteModule.showMoveGroup('"+rowItem.Id+","+rowItem.GroupId+"')\">转组</button>");
		//html.push("<button style=\"background-color:#2B89D3;color:#fff;-webkit-border-radius:.3125em;border-radius:.3125em;font-size: 12.5px;text-align: center;border-width: 1px;border-style: solid;padding: 0 .48em;line-height: 1.6em;min-height: 1.6em;min-width: .64em;right: .8em;\" onclick=\"FavoriteModule.confirmDialog('"+ rowItem.Id+","+rowItem.GroupId+ "');\">取消收藏</button>");
		//html.push("</p>");
		html.push("<p class=\"ui-li-aside\">"+rowItem.Source+"</p>");
		html.push("</a>");
		html.push("</li>");
		return html.join('');
	}
	// 删除单条收藏记录
	function remove() {
		$("#popupDelDialog").popup("close");
		var id = $("#deleteid").val();

		if (id == "") {
			alert("id为 空");
			return;
		}

		var param = {
				FavoritesGroupMapping : JSON.stringify({
					FavoriteId:id.split(',')[0]
					,GroupId:id.split(',')[1]
				})
		};
		GetAPIData("/api/favorites/remove", JSON.stringify(param),
				onDeleteSuccess, err, null, null, false, false);
	};
	// 删除成功
	function onDeleteSuccess(result) {
		alert(result.Message);

		if (result.StatusID == 0)
			search("");
	};
	// 增加收藏记录
	function _add(favoriteList, callback) {
		callback = callback || addCallback;

		var param = {
			FavoriteList : encodeURIComponent(JSON.stringify(favoriteList))
		};

		GetAPIData("/api/elevators/AddFavorites", JSON.stringify(param),
				callback, err, null, null, false, false);
	}
	// 增加收藏记录
	function _add2(favoriteList,groupList, callback) {
		callback = callback || addCallback;

		var param = {
			FavoriteList : encodeURIComponent(JSON.stringify(favoriteList))
			,GroupList: groupList
		};

		GetAPIData("/api/elevators/AddFavorites2", JSON.stringify(param),
				callback, err, null, null, false, false);
	}
	function addCallback(msg) {
		if(msg.Data>0){
		alert("成功收藏!" + msg.Data + "记录");
		}else{
		 alert("该电梯已收藏过");
		}
	};
	
	function onSaveSuccess(result){
		if(result){
			alert(result.Message);
			if(result.StatusID==0){
				$("#popupMoveGroupDialog").popup("close");
				search();
			}
		}
	}
	// 获取模块名称
	function getModuleType(moduleTypeId) {
		if (ModuleType && ModuleType.length > 0) {
			for (var i = 0; i < ModuleType.length; i++) {
				if (moduleTypeId == ModuleType[i].value) {
					return ModuleType[i].name;
				}
			}
		}
		return "";
	};
	function showMoveGroup(id){
		$("#hiddelid").val(id);
		
		$("#moveGroup-listview").html("");
		
		setTimeout('FavoriteGroupModule.getAll(FavoriteModule.GetMoveGroupCallback)', 300);
	}
	function onGetMoveGroupCallback(data,curGroupId){
		var temp=$("#hiddelid").val();
		var curFavoriteId='',curGroupId='';
		
		if(temp!=''){
			var arr=temp.split(',');
			curFavoriteId=arr[0];
			if(arr.length>1){
				curGroupId=arr[1];
			}
		}
			
			
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(objResult && objResult.Table && objResult.Table.length>0){
				
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var rowItem=objResult.Table[i];
					if(curGroupId!='' && rowItem.Id!=curGroupId)
					html.push("<li ><input name=\"chkgroup\" type=\"radio\" value=\""+rowItem.Id + "\">"+rowItem.GroupName+"<span class=\"ui-li-count\">"+rowItem.FavoriteCount+"</span></li>");
				}
				$("#moveGroup-listview").html(html.join(''));
				$("#moveGroup-listview").listview('refresh');
				$("#popupMoveGroupDialog").popup("open");
			}
			else{
				alert("请先建收藏组。");
			}
		}
	};
	
	function _confirmDialog(paras) {
		if (paras) {
			$("#popupDelDialog").popup("open");
			$("#deleteid").val("");
			$("#deleteid").val(paras);
		} else {
			$("#popupDelAllDialog").popup("open");
		}
	};
	return {
		confirmDialog : function(id) {
			_confirmDialog(id);
		},
		add : function(favoriteList, callback) {
			_add(favoriteList, callback);
		},
		add2 : function(favoriteList,groupList, callback) {
			_add2(favoriteList,groupList, callback);
		},
		refresh:function(){
			search();
		},
		showMoveGroup:function(curGroupId){
			showMoveGroup(curGroupId);
		},
		GetMoveGroupCallback:function(data,groupId){
			onGetMoveGroupCallback(data,groupId);
		}
	};
})();

//分组
/*
var FavoriteGroupModule = (function() {
	WLJQ(document).on('pageshow','#FavoriteGroup',function() {
		try {
			//新增
			$("#btnAdd").on("click",function(){
				$("#txtGroupName").val('');
				$("#AddUI").popup("open");
			});
			$("#btnSave").on("click",function(){
				add();
			});
			//修改
			$("#btnUpdate").on("click",function(){
				var obj={};
				var values=[];
				$("input[name='chk']:checked").each(function() {
					var arr = this.value.split(',');
					obj.Id=arr[0];
					obj.GroupName=arr[1];
					values.push(obj);
				});
				
				
				if (values.length <= 0) {
					alert("请选择分组");
					return;
				}
				$("#update-txtGroupId").val(values[0].Id);
				$("#update-txtGroupName").val(values[0].GroupName);
				$("#UpdateUI").popup("open");
			});
			$("#update-btnSave").on("click",function(){
				update();
			});
			
			//删除
			$("#btnDelete").on("click",function(){
				del();
			});
			//查询
			search();
		} catch (err) {
		}
	});
	//查询
	function search() {
		var param = {};
		var requestUrl='/api/favoritesGroup/GetAll';
		GetAPIData(requestUrl, JSON.stringify(param),onSearchSuccess, null, null, null, true, false, null,'正在查询,请稍侯...');
	}
	
	//新增
	function add(){
		var param = {
				GroupName : $("#txtGroupName").val()
			};
		if(param.GroupName.length<=0){
			alert("请输入组名。");
			return ;
		}
		showLoader("保存中...");
		GetAPIData("/api/favoritesGroup/Add", JSON.stringify(param),onAddSuccess, null, null, null, false, false);
	}
	//修改
	function update(){
		var param = {
				Id:$("#update-txtGroupId").val()
				,GroupName : $("#update-txtGroupName").val()
			};
		if(param.GroupName.length<=0){
			alert("请输入组名。");
			return ;
		}
		showLoader("更新中...");
		GetAPIData("/api/favoritesGroup/Update", JSON.stringify(param),onUpdateSuccess, null, null, null, false, false);
	}
	//删除
	function del(){
		
		
		var values=[];
		$("input[name='chk']:checked").each(function() {
			var arr = this.value.split(',');
			values.push(arr[0]);
		});
		
		
		if (values.length <= 0) {
			alert("请选择分组");
			return;
		}
		
		var param = {
				Idlist:values.join(',')
			};
		if(param.Idlist.length<=0){
			alert("请输入组名。");
			return ;
		}
		if(!confirm("确定删除此记录？")){
			return;
		}
		GetAPIData("/api/favoritesGroup/DeleteList", JSON.stringify(param),onDeleteSuccess, null, null, null, false, false);
	}
	function _getALL(callback) {
		callback=callback||onGetAllSuccess;
		
		var param = {};
		var requestUrl='/api/favoritesGroup/GetAll';
		GetAPIData(requestUrl, JSON.stringify(param),callback, null, null, null, true, false, null,'正在查询,请稍侯...');
	}
	// 查询成功
	function onGetAllSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			var objResult = eval("(" + data.Data + ")");

			if(objResult && objResult.Table && objResult.Table.length>0){
				
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var rowItem=objResult.Table[i];
					html.push("<li ><input name=\"chkgroup\" type=\"checkbox\" value=\""+rowItem.Id + "," + rowItem.GroupName + "\">"+rowItem.GroupName+"<span class=\"ui-li-count\">"+rowItem.FavoriteCount+"</span></li>");
				}
				$("#favoriteGroup-listview").html(html.join(''));
				$("#favoriteGroup-listview").listview('refresh');
				$("#popupFavoriteGroupDialog").popup("open");
			}
			else{
				alert("请先建收藏组。");
			}
		}
		
	}
	// 查询成功
	function onSearchSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			var objResult = eval("(" + data.Data + ")");

			if(objResult && objResult.Table && objResult.Table.length>0){
				
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var rowItem=objResult.Table[i];
					html.push("<li><input name=\"chk\" type=\"checkbox\" value=\""+rowItem.Id + "," + rowItem.GroupName + "\">"+rowItem.GroupName+"<span class=\"ui-li-count\">"+rowItem.FavoriteCount+"</span></li>");
				}
			}
		}
		$("#mylistview").html(html.join(''));
		$("#mylistview").listview('refresh');
	}
	// 新增成功
	function onAddSuccess(result) {
		hideLoader();
		if(result){
			if(result.StatusID==0){
				$("#AddUI").popup("close");
				alert(result.Message);
				search();
			}
			else{
				alert(result.Message);
			}
		}
		
	};
	// 修改成功
	function onUpdateSuccess(result) {
		hideLoader();
		if(result){
			if(result.StatusID==0){
				$("#UpdateUI").popup("close");
				alert(result.Message);
				search();
			}
			else{
				alert(result.Message);
			}
		}
	};
	// 修改成功
	function onDeleteSuccess(result) {
		if(result){
			if(result.StatusID==0){
				alert(result.Message);
				search();
			}
			else{
				alert(result.Message);
			}
		}
	};
	return {
		//根据登录权限获取收藏组
		getAll : function(callback) {
			_getALL(callback);
		},
		refresh:function(){
			search();
		}
	};
})();
*/
/*******************************************************/
var FavoriteGroupModule = (function() {
	
	//新增
	function add(groupName,callback){
		var param = {
				GroupName : groupName
			};
		if(param.GroupName.length<=0){
			alert("请输入组名。");
			return ;
		}
		var onSuccess=callback||onAddSuccess;
		showLoader("保存中...");
		GetAPIData("/api/favoritesGroup/Add", JSON.stringify(param),onSuccess, null, null, null, false, false);
	}
	//修改
	
	function update(groupId,groupName){
		var param = {
				Id:groupId
				,GroupName : groupName
			};
		if(param.GroupName.length<=0){
			alert("请输入组名。");
			return ;
		}
		showLoader("更新中...");
		GetAPIData("/api/favoritesGroup/Update", JSON.stringify(param),onUpdateSuccess, null, null, null, false, false);
	}
	//删除
	function del(groupIds){
		if (groupIds.length <= 0) {
			alert("请选择分组");
			return;
		}
		
		var param = {
				Idlist:groupIds
			};
		if(param.Idlist.length<=0){
			alert("请输入组名。");
			return ;
		}
		if(!confirm("确定删除此记录？")){
			return;
		}
		GetAPIData("/api/favoritesGroup/DeleteList", JSON.stringify(param),onDeleteSuccess, null, null, null, false, false);
	}
	function _getALL(callback) {
		callback=callback||onGetAllSuccess;
		
		var param = {};
		var requestUrl='/api/favoritesGroup/GetAll';
		GetAPIData(requestUrl, JSON.stringify(param),callback, null, null, null, true, false, null,'正在查询,请稍侯...');
	}
	// 查询成功
	function onGetAllSuccess(data) {
		var html = [];

		if (typeof data != 'undefined' && data) {
			if(data.StatusID!=0){
				alert(data.Message);
				return false;
			}
			var objResult = JSON.parse(data.Data);

			if(objResult && objResult.Table && objResult.Table.length>0){
				
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var rowItem=objResult.Table[i];
					html.push("<li ><input name=\"chkgroup\" type=\"checkbox\" value=\""+rowItem.Id + "," + rowItem.GroupName + "\">"+rowItem.GroupName+"<span class=\"ui-li-count\">"+rowItem.FavoriteCount+"</span></li>");
				}
				$("#favoriteGroup-listview").html(html.join(''));
				$("#favoriteGroup-listview").listview('refresh');
				$("#popupFavoriteGroupDialog").popup("open");
			}
			else{
				alert("请先建收藏组。");
			}
			objResult=null;
		}
		
	}
	
	// 新增成功
	function onAddSuccess(result) {
		hideLoader();
		if(result){
			if(result.StatusID==0){
				$("#AddUI").popup("close");
				alert(result.Message);
				FavoriteModule.refresh();
			}
			else{
				alert(result.Message);
			}
		}
		
	};
	// 修改成功
	function onUpdateSuccess(result) {
		hideLoader();
		if(result){
			if(result.StatusID==0){
				$("#UpdateUI").popup("close");
				alert(result.Message);
				search();
			}
			else{
				alert(result.Message);
			}
		}
	};
	// 修改成功
	function onDeleteSuccess(result) {
		if(result){
			if(result.StatusID==0){
				$("#popupFavoriteGroupDialog").popup("close");
				alert(result.Message);
				FavoriteModule.refresh();
			}
			else{
				alert(result.Message);
			}
		}
	};
	return {
		//根据登录权限获取收藏组
		getAll : function(callback) {
			_getALL(callback);
		},
		add:function(groupName,callback){
			add(groupName,callback);
		},
		update:function(groupId,groupName){
			update(groupId,groupName);
		},
		del:function(groupIds){
			del(groupIds);
		}
	};
})();

