/**
 * 
 */
/**
 * ******************************远程对讲
 * 开发中**********************************************
 */
var CacheKey = {
	RemoteICData : userid + "-RemoteICData"
};
var RemoteICModule = (function() {
	var Config = {
		SubList : [ '00001', '00010', '00011', '00100', '00101', '00110','00111', '01000', '01001', '01010', '01011', '01100', '01101','01110', '01111', '10000', '10001', '10010', '10011', '10100','10101', '10110', '10111', '11000' ]
	};
	var DataSource = {host:{},subList:[]};
	// 主界面
	WLJQ(document).on('pageshow','#remoteintercom',function() {
		var cacheData = LocalCacheModule.get(CacheKey.RemoteICData);
		
		var obj = JSON.parse(cacheData);

		if (obj) {
			$("#btnLocalcache").html($("#btnLocalcache").html() + "("+ obj.length + ")");

			$("#btnLocalcache").on("click", function() {
				buildCacheList(obj);// 从cache获取数据
			});
		} else
			$("#btnLocalcache").html($("#btnLocalcache").html() + "(0)");
	});
	//缓存主机信息列表
	function buildCacheList(obj) {
		var html = [];

		
		
		var len = obj.length;

		if (obj && len > 0) {
			html.push("<ul class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" style=\"padding:0px;margin:0px;\">");

			html.push("<li class=\"ui-li-divider ui-bar-inherit ui-first-child\"><span class=\"ui-li-count\" style=\"cursor:pointer;\" onclick=\"$('#LocalcacheDialog').popup('close');\">关闭</span>未提交数据</li>");
			for (var i = 0; i < len; i++) {

				var host=obj[i].host||{};
				
				if (len == 1)
					html.push("<li class=\"ui-first-child ui-last-child\" onclick=\"RemoteICModule.edit('"+ host.Code+ "')\"><a href=\"#\" class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><h2>主机ID:");
				else {
					if (len == len - 1) {
						html.push("<li onclick=\"RemoteICModule.edit('"+  host.Code+ "')\ class=\"ui-last-child\"><a href=\"#\" class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><h2>主机ID:");
					} else
						html.push("<li onclick=\"RemoteICModule.edit('"+  host.Code+ "')\"><a href=\"#\"  class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><h2>主机ID:");
				}

				html.push( host.Code);
				html.push('</h2><p>主机位置：');
				html.push(host.Position);
				html.push('</p></a></li>');
			}
			html.push("</ul>");
			$("#content").html(html.join(''));
			$("#LocalcacheDialog").css("width", $(window).width());
			$("#LocalcacheDialog").popup("open");
		}
	}
	// 编辑界面
	WLJQ(document).on('pageshow','#remoteintercomsearch',function() {
		$("#btnconfirm").on('click',function() {
			if ($("#txtkey").val().length <= 0) {
				alert("请输入搜索条件!");
				return;
			}
			var urlPara="key="+ $("#txtkey").val() + "&type="+ $("#select-choice-type").val();
			changePage("remoteintercomedit.html?"+ urlPara);
		});
	});
	// 编辑界面
	WLJQ(document).on('pageshow', '#remoteintercomedit', function() {
		var key = getUrlParam('key') || "";
		var type = getUrlParam('type') || "0";
		var source= getUrlParam('source') || "";

		bindClickEvent();
		
		if(type=="0")
			$("#txtHostCode").html(key);
		
		if(source=='cache'){
			searchFromCache(type, key);
		}
		else{
			searchFromDB(type, key);	
		}
	});
	//邦定点击事件
	function bindClickEvent(){
		// 子机号编辑
		$("#btnEditSubkey-cancel").on("click", function() {
			$("#EditSubkeyDialog").popup("close");
		});
		$("#btnEditSubkey-save").on("click", function() {
			var id = $("#subkey-subkey").html();

			var deviceNo = $("#subkey-deviceno").val();
			var subkeyPosition = $("#subkey-position").val();
			var remark = $("#subkey-remark").val();

			$("#deviceno-" + id).html(deviceNo);
			$("#subkeyposition-" + id).html(subkeyPosition);
			$("#remark-" + id).html(remark);

			$("#EditSubkeyDialog").popup("close");
		});
		$("#btnEditSubkey-clear").on("click", function() {
			$("#subkey-deviceno").val("");
			$("#subkey-position").val("");
			$("#subkey-remark").val("");
		});
		// 主机信息编辑
		$("#btnEditHost-cancel").on("click", function() {
			$("#EditHostDialog").popup("close");
		});
		$("#btnEditHost-save").on("click", function() {
			$("#txtHostCode").html($("#host-hostcode").val());
			$("#txtHostPosition").html($("#host-hostposition").val());
			$("#EditHostDialog").popup("close");
		});
		$("#btnEditHost").on("click", function() {
			$("#host-header-code").html($("#txtHostCode").html());
			$("#host-hostcode").val($("#txtHostCode").html());
			$("#host-hostposition").val($("#txtHostPosition").html());
			$("#EditHostDialog").css("width", $(window).width());
			$("#EditHostDialog").popup("open");
		});
		// 本地保存
		$("#btnLocalSave").on("click", function() {
			localSave();
		});
		// 保存到服务器
		$("#btnSubmit").on("click", function() {
			submit();
		});
	}
	//从cache查询
	function searchFromCache(type, key) {

		var cacheData = LocalCacheModule.get(CacheKey.RemoteICData);
		
		$("#txtHostCode").html(key);
		
		setSubkeyDefault();

		if (cacheData) {
			var objResult = JSON.parse(cacheData);
			var item = null,hostItem=null,subkeyList=null;

			if (objResult) {
				var len = objResult.length;
				if (len) {
					item = getItem(objResult, "Code", key);
				}
				if (item) {
					hostItem=item.host;
					subkeyList = item.subList;
					
					$("#txtHostPosition").html(hostItem.Position);
					
					var len = subkeyList.length;

					if (subkeyList && len > 0) {
						for (var i = 0; i < len; i++) {
							var subItem = subkeyList[i];
							var id = subItem.Code;

							$("#deviceno-" + id).html(subItem.DeviceNo);
							$("#subkeyposition-" + id).html(subItem.Position);
							$("#remark-" + id).html(subItem.Remark);
						}
					}
				}
			}
		}
	}
	// 从数据库查询
	function searchFromDB(type, key) {
		setSubkeyDefault();
		var param={type:type, key: key};

		GetAPIData("/api/remoteIC/search", JSON.stringify(param),onSearchSuccess, null, null, null, true, false, null);
	}
	function reset(){
		setSubkeyDefault();
	}
	//查询成功处理
	function onSearchSuccess(result) {
		if (result) {
			var objResult = JSON.parse(result.Data);
			if(objResult && objResult.Table){
				var len=objResult.Table.length;
				if(len>0){
					var subList=[];
					
					$("#txtHostId").html(objResult.Table[0].HostId);
					$("#txtHostCode").html(objResult.Table[0].HostCode);
					$("#txtHostPosition").html(objResult.Table[0].HostPosition);
					
					DataSource.host={
							Id:objResult.Table[0].HostId,
							Code:objResult.Table[0].HostCode,
							Position:objResult.Table[0].HostPosition
					};
					
					for(var i=0;i<len;i++){
						var row = objResult.Table[i];
						var key = row.SubCode;
						
						if(key){
							$("#subid-" + key).html(row.SubId);
							$("#deviceno-" + key).html(row.DeviceNo);
							$("#subkeyposition-" + key).html(row.SubPosition);
							$("#remark-" + key).html(row.Remark);
	
							$("#install-" + key)[0].checked = (row.DeviceNo) ? false: true;
						}
						
						var item={
								Id:row.SubId||'',
								Code:row.SubCode,
								DeviceNo:row.DeviceNo||'',
								Position:row.SubPosition||'',
								Remark:row.Remark||'',
								CreatedUserID:row.CreatedUserID||'',
								CreatedDate:row.CreatedDate||'1900-01-01',
								UpdatedUserID:row.UpdatedUserID||'',
								UpdatedDate:row.UpdatedDate||'1900-01-01'
						};
						
						subList.push(item);
					}
					DataSource.subList=subList;
				}
			}
		}
	}
	//设置默认状态
	function setSubkeyDefault() {
		var subkeyList = Config.SubList;

		for (var i = 0, len = subkeyList.length; i < len; i++) {
			var id = subkeyList[i];

			$("#deviceno-" + id).html();
			$("#remark-" + id).html();
			var installKey="#install-" + id;
			
			if ($(installKey) && $(installKey)[0])
				$(installKey)[0].checked = true;
		}
	}
	function getItem(arr, key, val) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i].host[key] == val)
				return arr[i];
		}
		return null;
	}
	//远程对讲对象
	function buildRemoteICData() {
		var host=buildHostData();
		var subkeyData = buildSubkeyData().changeList;
		
		var result = {
			host : host,
			subList : subkeyData
		};

		return result;
	}
	
	//子机信息对象列表
	function buildSubkeyData() {

		var userId=userid;
		var result={all:[],changeList:[]};
		
		var initSubList = Config.SubList;

		var all=[];//界面上有填写数据的列表
		var changeList = [];//状态变化列表
		var item;

		for (var i = 0, keyLen = initSubList.length; i < keyLen; i++) {
			var key = initSubList[i];

			item = {
					Id: $("#subid-" + key).html() || "00000000-0000-0000-0000-000000000000",
					HostId: $("#txtHostId").html() || "00000000-0000-0000-0000-000000000000",
					Code : $("#subkey-" + key).html(),
					DeviceNo : $("#deviceno-" + key).html(),
					Position : $("#subkeyposition-" + key).html(),
					Remark : $("#remark-" + key).html(),
					Install :  $("#install-" + key)[0].checked,
					Status:0,
					CreatedUserID:userId,
					CreatedDate:'1900-01-01',
					UpdatedUserID:userId,
					UpdatedDate:'1900-01-01'
			};
			
			if(item.DeviceNo.length>0)
				all.push(item);
			
			if(!item.Id || item.Id=="00000000-0000-0000-0000-000000000000"){
				if(item.DeviceNo.length<=0)
					continue;
			}
			else{
				if (item.DeviceNo.length <= 0)
					item.Status=-1;
				else{
					if(!checkSubItemChange(item))
						continue;
					else
						item.Status=1;
				}
			}
			
			changeList.push(item);
		}
		result.changeList=changeList;
		result.all=all;
		
		return result;
	}
	
	
	//远程对讲对象
	function buildHostData() {
		var userId=userid;
		
		var result = {
					Id: $("#txtHostId").html()||"00000000-0000-0000-0000-000000000000"
					,Code:$("#txtHostCode").html()
					,Position:$("#txtHostPosition").html()
					,CreatedUserID:userId
					,UpdatedUserID:userId
				};

		return result;
	}
	// 本地保存
	function localSave() {
		var newCacheList = [];

		var curHostData = buildRemoteICData();
		newCacheList.push(curHostData);

		var cacheDataString = LocalCacheModule.get(CacheKey.RemoteICData);
		var cacheData = JSON.parse(cacheDataString) || [];

		var len = cacheData.length;

		if (len > 0) {
			for (var i = 0; i < len; i++) {
				var cacheItem = cacheData[i];
				if (cacheItem.hostCode == curHostData.host.Code)
					continue;
				newCacheList.push(cacheItem);
			}
		}

		LocalCacheModule.set(CacheKey.RemoteICData, JSON.stringify(newCacheList));
		alert("本地保存成功");
	}
	// 提交
	function submit() {
		//前端验证
		var checkResult= validate();
		
		if(!checkResult.result){
			alert(checkResult.message);
			return false;
		}

		var sub=buildSubkeyData();
		var changeList= sub.changeList;
		//服务端验证工号是否重复
		var param={subList:JSON.stringify(changeList)};
		
		GetAPIData("/api/remoteIC/validateDeviceNo", JSON.stringify(param),onValidateDeviceNoSuccess, null, null, null, true, false, null);
		
	}
	//服务端工号验证
	function onValidateDeviceNoSuccess(result){
		var deviceNoList=[];
		
		if (result) {
			var objResult = JSON.parse(result.Data);
			if(objResult){
				for(var i=0,len=objResult.Table.length;i<len;i++){
					var item = objResult.Table[i];
					deviceNoList.push(item.DeviceNo);
				}
			}
		}
		
		if(deviceNoList.length<=0){
			var url="/api/remoteIC/";
			var param=null;
			
			var remoteIC = buildRemoteICData();
			param={remoteIC:JSON.stringify(remoteIC)};
			
			var operatorType= getOperatorType();
			
			if(operatorType.hostOperator=="none"){
				if(operatorType.subOperator!="none"){
					url=url+"updateSub";
				}
			}
			else{
				switch(operatorType.hostOperator){
				case "add":
					url=url+"add";
					break;
				case "change":
					url=url+"changeHost";
					break;
				case "update":
					if(operatorType.subOperator!="none"){
						url=url+"update";
					}
					else{
						param={host:JSON.stringify(remoteIC.host)};
						url=url+"updateHost";
					}
					break;
				default:
					if(operatorType.subOperator=="update"){
						url=url+"updateSub";
					}
					else{
						param={hostId:remoteIC.host.Id};
						url=url+"delete";
					}
					
					break;
				}
			}
			
			//alert(url);
			GetAPIData(url, JSON.stringify(param),onSubmitSuccess, null, null, null, true, false, null);
		}
		else{
			alert("工号："+deviceNoList.join(',')+"已存在,请检查!");
		}
	}
	
	//检查数据是否有悠改
	function checkSubItemChange(target){
		var sourceSubList= DataSource.subList;
		
		for(var j=0,len=sourceSubList.length;j<len;j++){
			if(sourceSubList[j].Code==target.Code){
				if(sourceSubList[j].DeviceNo==target.DeviceNo 
						&& sourceSubList[j].Position==target.Position 
						&& sourceSubList[j].Remark==target.Remark)
					return false;
			}
		}
		return true;
	}
	
	//前端验证
	function validate(){
		var result= {result: true,message:"成功"};;
		var sub=buildSubkeyData();
		var all=sub.all || [];
		var changeList=sub.changeList || [];
		var operatorType= getOperatorType();
		
		switch(operatorType.hostOperator){
			case "change":
			case "add":
				if(all.length<=0)
					return {result: false,message:"子机号列表不能为空."};
				else{
					for(var i=0,len= all.length;i<len;i++){
						var compareItem=all[i];
						for(var j=i+1;j<len;j++){
							if(compareItem.DeviceNo==all[j].DeviceNo){
								result= {result: false,message:"工号："+compareItem.DeviceNo+"不能重复，请更改。"};
							}
						}
					}
				}
				break;
			case "delete":
				break;
			case "update":
				if(operatorType.subOperator=="update"){
					for(var i=0,len= all.length;i<len;i++){
						var compareItem=all[i];
						for(var j=i+1;j<len;j++){
							if(compareItem.DeviceNo==all[j].DeviceNo){
								result= {result: false,message:"工号："+compareItem.DeviceNo+"不能重复，请更改。"};
							}
						}
					}
				}
				break;
			default :
				if(operatorType.subOperator=="update"){
					for(var i=0,len= all.length;i<len;i++){
						var compareItem=all[i];
						for(var j=i+1;j<len;j++){
							if(compareItem.DeviceNo==all[j].DeviceNo){
								result= {result: false,message:"工号："+compareItem.DeviceNo+"不能重复，请更改。"};
							}
						}
					}
				}
			
				if(changeList.length<=0)
					result= {result: false,message:"数据没有改变."};
				break;
		}

		return result;
	}
	//检查主机信息的改充状态
	function checkHostChange(){
		var result={operatorType:"none"};
		
		var host= buildHostData();
		
		if(DataSource && DataSource.host){
			if(!host.Id || host.Id=="00000000-0000-0000-0000-000000000000"){
				result={operatorType:"add"};
			}
			else if(host.Code!=DataSource.host.Code){
				result={operatorType:"change"};
			}
			else{
				if(host.Position!=DataSource.host.Position){
					result={operatorType:"update"};
				}
			}
		}
		else{
			result={operatorType:"add"};
		}
		return result;
	}
	
	//操作类型：新增，修改，修改主机
	function getOperatorType(){
		
		var operatorType={hostOperator:"none",subOperator:"none"};
		
		var host= checkHostChange();
		
		var sub=buildSubkeyData();
		var changeList= sub.changeList||[];
		var all=sub.all||[];
		
		if(host.operatorType !="none"){
			if(host.operatorType=="add"){
				operatorType.hostOperator="add";
			}
			else if(host.operatorType=="update"){
				operatorType.hostOperator="update";
				if(changeList.length>0){
					if(all.length<=0)
						operatorType.hostOperator="delete";
					else
						operatorType.subOperator="update";
				}
			}
			else if(host.operatorType=="change"){
				operatorType.hostOperator="change";
			}
		}
		else if(changeList.length>0){
			if(DataSource.subList.length >0 && all.length<=0)
				operatorType.hostOperator="delete";
			else
				operatorType.subOperator="update";
		}
		
		return operatorType;
	}
	//提交成功
	function onSubmitSuccess(result){
		if (result) {
			
			if(result.Data.toLowerCase()=="true"){
				searchFromDB("0", $("#txtHostCode").html());
				alert("提交成功！");
			}
			else
				alert("提交失败！");
		}
	}
	// 打开编辑子机拨号信息界面
	function _showEditSubkeyUI(obj) {
		var that = obj;
		var id = that.id;

		$("#subkey-subkey").html('');
		$("#subkey-deviceno").val('');
		$("#subkey-position").html('');
		$("#subkey-remark").html('');

		var subkey = $("#subkey-" + id.split('-')[1]).html();
		var deviceNo = $("#deviceno-" + id.split('-')[1]).html();
		var subkeyPosition = $("#subkeyposition-" + id.split('-')[1]).html();
		var remark = $("#remark-" + id.split('-')[1]).html();

		$("#subkey-subkey").html(subkey);
		$("#subkey-deviceno").val(deviceNo);
		$("#subkey-position").html(subkeyPosition);
		$("#subkey-remark").html(remark);

		$("#EditSubkeyDialog").css("width", $(window).width());
		$("#EditSubkeyDialog").popup("open");

	};
	
	return {
		showEditSubkeyUI : function(obj) {
			_showEditSubkeyUI(obj);
		},
		edit : function(key) {
			changePage('remoteintercomedit.html?source=cache&type=hostid&key=' + key);
		}
	};
})();
/** ********************************************* */
/** *****************缓存*************************** */
var LocalCacheModule = (function() {

	return {
		isExist : function(key) {
			return localStorage.getItem(key) ? true : false;
		},
		get : function(key) {
			return localStorage.getItem(key);
		},
		set : function(key, value) {
			localStorage.setItem(key, value);
		},
		remove : function(key) {
			localStorage.removeItem(key);
		}
	};
})();