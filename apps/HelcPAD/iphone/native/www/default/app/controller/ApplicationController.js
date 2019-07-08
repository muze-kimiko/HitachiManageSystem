
/* JavaScript content from app/controller/ApplicationController.js in folder common */
/**
 * 全局ControllerHideWaitting
 * 
 */
Ext.define("HelcPAD.controller.ApplicationController", {
	extend : "Ext.app.Controller",
	id:'applicon',
	searchStoreName : "Distributors",
	//id:'applicon',
	getPlatform : function() {
		return this.getApplication().platform;
	},
	
	//注册长按时间（必须指定组件name属性，适用表单组件）
	setLongTimeTap:function(field,handTime,handler,backParam){
		var start = [];
		try{
			if(!field.getName()||isNaN(handTime))
				return ;
		}catch(e){
			return ;
		}
		var fieldElement = document.getElementsByName(field.getName());
		for(var i=0;i<fieldElement.length;i++){
			start[i] = 0;
			fieldElement[i].onmousedown = function(){
				start[i] = new Date();
			};
			fieldElement[i].onmouseup = function(){
				if(new Date()-start[i]>=handTime*1000){
					handler(backParam);
				}
			};
		}
	},
	//创建store 的时候使用     2015-7-30
	getStore:function(storeName,FullNAME){
		  var store=Ext.data.StoreManager.get(storeName);
	 		if (!store) { 
	 			store = Ext.create(FullNAME); 
	 		}; 
	 		return store;
	},
	  
	//测试用添加数据方法，正式开发时删
	sssjjj:function(){
		var DataCs=Ext.data.StoreManager.get('CsStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.CsStore');
		};
		var aa=[];
		aa[0]={one:'12'};
		aa[1]={one:'34'};
		DataCs.setData(aa,this);
		var TrimNewImg={};
		TrimNewImg.one='56';
		DataCs.addData(TrimNewImg);
	},
	
	//数据仓删除数据的笨方法
	dataDelect_BFF:function(data_name,data_nameC,data_num){
		 var datadTwo=Ext.data.StoreManager.get(data_name);
		 if(!datadTwo){
			datadTwo=Ext.create(data_nameC);
		};
		//数据仓中的数据
		var DATATwo=datadTwo.getData();
		//数据长度
		var DATATwoLength=DATATwo.length;
		//删除后的数据
		var NewDATA  = [];
		//要删除数据的下标
		var num=0;
		for(var i=0;i<DATATwoLength;i++){
			if(i==data_num[num]){
				num++;
			}else{
				NewDATA.push(DATATwo.items[i].data);
			};
		 };
		 //删除后的数据
		 datadTwo.setData(NewDATA);
	},
	
	//判断必填
	isRequired : function(IdArray){
		var flag = false;
		for(var i =0;i<IdArray.length;i++){
			var id = IdArray[i];
//			cc.log(id);
			var value = Ext.getCmp(id).getValue();
			var label = Ext.getCmp(id).getLabel();
			if(value == "" || value == null){
				Ext.Msg.alert(label+"不能为空");
				WL.Toast.show(label+"不能为空");
//				Ext.getCmp(id).focus();
				flag = true;
			}
			if(flag){
				return flag;
			}
		}
	},
	//从存储数据仓中取出特定类型数据
	extractionData:function(type){
		var store = Ext.data.StoreManager.get('CxAppLovVStore');
		if(!store)
			store = Ext.create('HelcPAD.store.CxAppLovVStore');
		var r =[];
		var storeData = store.getData().all;
		var total = 0;
		
		for(var i=0;i<storeData.length;i++){
			if(storeData[i].data.TYPE==type){
				r [total]= storeData[i].data;
				total++;
			}
		}
		return r;
	},
	//选取照片
	PAD_GGFS_XQZP:function(listID,fn,ctrl){
		var obj=ctrl;
    	function onFail(e){
    		WL.Toast.show("取消选择图片");
    	}
    	function onPhotoURISuccess(data){
    		//alert(1);
    		var tempPic={};
    		tempPic.Fsrc=data;
			tempPic.src= 'data:image/jpeg;base64,'+data; // "data:image/jpeg;base64," +
			//alert(data);
			console.log("data:image/jpeg;base64," + data);
    		picture_list.push(tempPic);
    		fn(obj);
    		
    	}
    	// capture callback
    	navigator.camera.getPicture(onPhotoURISuccess, onFail,{
    		quality: 20,
    		destinationType:Camera.DestinationType.DATA_URL, 
			sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
    	    allowEdit: true
    	});
	},
	
	//拍摄照片
	PAD_GGFS_PSZP:function(listID,fn,ctrl){
    	
    	navigator.camera.getPicture(
				function(data){
					//alert(data);
					var tempPic={};
					tempPic.Fsrc=data;
					tempPic.src= 'data:image/jpeg;base64,'+data;//"data:image/jpeg;base64," +
					console.log("data:image/jpeg;base64," + data);
					picture_list.push(tempPic);
					fn(ctrl);
				},
				function(e){
					WL.Toast.show("取消拍摄图片");
				},
				{
					quality: 20,
					destinationType:Camera.DestinationType.DATA_URL, 
					sourceType:Camera.PictureSourceType.CAMERA,
					allowEdit:true,
					encodingType: Camera.EncodingType.JPEG, 
//					targetWidth: value,
//					targetHeight: value,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: true,
					correctOrientation: true,
					cameraDirection: Camera.Direction.BACK 
				});
	},
	
	
	
	findCountry : function(country,selectfield_id){
		var CountryArray = [
		    {AREA:'亚洲',Countrs:[{text:'请选择',value:''},
		                         {text:'蒙古',value:'蒙古'},
		                         {text:'朝鲜',value:'朝鲜'},
		                         {text:'韩国',value:'韩国'},
		                         {text:'日本',value:'日本'},
		                         {text:'缅甸',value:'缅甸'},
		                         {text:'巴基斯坦',value:'巴基斯坦'},
		                         {text:'斯里兰卡',value:'斯里兰卡'},
		                         {text:'马尔代夫',value:'马尔代夫'},
		                         {text:'孟加拉',value:'孟加拉'},
		                         {text:'伊拉克',value:'伊拉克'},
		                         {text:'阿拉伯联合酋长国',value:'阿拉伯联合酋长国'},
		                         {text:'也门',value:'也门'},
		                         {text:'阿曼',value:'阿曼'},
		                         {text:'伊朗',value:'伊朗'},
		                         {text:'科威特',value:'科威特'},
		                         {text:'沙特',value:'沙特'},
		                         {text:'巴林',value:'巴林'},
		                         {text:'以色列',value:'以色列'},
		                         {text:'巴勒斯坦',value:'巴勒斯坦'},
		                         {text:'文莱',value:'文莱'},
		                         {text:'印度',value:'印度'},
		                         {text:'不丹',value:'不丹'},
		                         {text:'越南',value:'越南'},
		                         {text:'東埔寨',value:'東埔寨'},
		                         {text:'老挝',value:'老挝'},
		                         {text:'马来西亚',value:'马来西亚'},
		                         {text:'菲律宾',value:'菲律宾'},
		                         {text:'印度尼西亚',value:'印度尼西亚'},
		                         {text:'东帝汶',value:'东帝汶'},
		                         {text:'泰国',value:'泰国'},
		                         {text:'新加坡',value:'新加坡'},
		                         {text:'阿富汉',value:'阿富汉'},
		                         {text:'尼泊尔',value:'尼泊尔'},
		                         {text:'黎巴嫩',value:'黎巴嫩'},
		                         {text:'塞浦路斯',value:'塞浦路斯'},
		                         {text:'约旦',value:'约旦'},
		                         {text:'土耳其',value:'土耳其'},
		                         {text:'叙利亚',value:'叙利亚'},
		                         {text:'卡塔尔',value:'卡塔尔'},
		                         {text:'香港、澳门',value:'香港、澳门'},
		                         {text:'台湾',value:'台湾'},]},
		    {AREA:'欧洲',Countrs:[{text:'请选择',value:''},
		                         {text:'罗马尼亚',value:'罗马尼亚'},
		                         {text:'南斯拉夫',value:'南斯拉夫'},
		                         {text:'马其顿',value:'马其顿'},
		                         {text:'斯洛文尼亚',value:'斯洛文尼亚'},
		                         {text:'波黑',value:'波黑'},
		                         {text:'克罗地亚',value:'克罗地亚'},
		                         {text:'阿尔巴尼亚',value:'阿尔巴尼亚'},
		                         {text:'保加利亚',value:'保加利亚'},
		                         {text:'俄罗斯联邦',value:'俄罗斯联邦'},
		                         {text:'立陶宛',value:'立陶宛'},
		                         {text:'拉脱维亚',value:'拉脱维亚'},
		                         {text:'爱沙尼亚',value:'爱沙尼亚'},
		                         {text:'乌克兰',value:'乌克兰'},
		                         {text:'阿塞拜疆',value:'阿塞拜疆'},
		                         {text:'亚美尼亚',value:'亚美尼亚'},
		                         {text:'格鲁吉亚',value:'格鲁吉亚'},
		                         {text:'吉尔吉斯斯坦',value:'吉尔吉斯斯坦'},
		                         {text:'塔吉克斯坦',value:'塔吉克斯坦'},
		                         {text:'土库曼斯坦',value:'土库曼斯坦'},
		                         {text:'乌兹别克斯坦',value:'乌兹别克斯坦'},
		                         {text:'白俄罗斯',value:'白俄罗斯'},
		                         {text:'哈萨克斯坦',value:'哈萨克斯坦'},
		                         {text:'摩尔多瓦',value:'摩尔多瓦'},
		                         {text:'波兰',value:'波兰'},
		                         {text:'德国',value:'德国'},
		                         {text:'荷兰',value:'荷兰'},
		                         {text:'意大利',value:'意大利'},
		                         {text:'比利时',value:'比利时'},
		                         {text:'奥地利',value:'奥地利'},
		                         {text:'希腊',value:'希腊'},
		                         {text:'法国',value:'法国'},
		                         {text:'西班牙',value:'西班牙'},
		                         {text:'卢森堡',value:'卢森堡'},
		                         {text:'爱尔兰',value:'爱尔兰'},
		                         {text:'葡萄牙',value:'葡萄牙'},
		                         {text:'芬兰',value:'芬兰'},
		                         {text:'捷克',value:'捷克'},
		                         {text:'斯洛伐克',value:'斯洛伐克'},
		                         {text:'匈牙利',value:'匈牙利'},
		                         {text:'瑞典',value:'瑞典'},
		                         {text:'丹麦',value:'丹麦'},
		                         {text:'挪威',value:'挪威'},
		                         {text:'瑞士',value:'瑞士'},
		                         {text:'冰岛',value:'冰岛'},
		                         {text:'马尔他',value:'马尔他'},
		                         {text:'英国',value:'英国'},]},
	         {AREA:'美洲',Countrs:[{text:'请选择',value:''},
	                             {text:'美国',value:'美国'},
	                             {text:'加拿大',value:'加拿大'},
	                             {text:'黑西哥',value:'黑西哥'},
	                             {text:'巴西',value:'巴西'},
	                             {text:'牙买加',value:'牙买加'},
	                             {text:'特立尼达和多巴哥',value:'特立尼达和多巴哥'},
	                             {text:'厄瓜多尔',value:'厄瓜多尔'},
	                             {text:'阿根延',value:'阿根延'},
	                             {text:'乌拉圭',value:'乌拉圭'},
	                             {text:'智利',value:'智利'},
	                             {text:'哥伦比亚',value:'哥伦比亚'},
	                             {text:'巴巴多斯',value:'巴巴多斯'},
	                             {text:'圭亚那',value:'圭亚那'},
	                             {text:'古巴',value:'古巴'},
	                             {text:'巴拿马',value:'巴拿马'},
	                             {text:'格林纳达',value:'格林纳达'},
	                             {text:'安提瓜',value:'安提瓜'},
	                             {text:'秘鲁',value:'秘鲁'},
	                             {text:'玻利维亚',value:'玻利维亚'},
	                             {text:'尼加拉瓜',value:'尼加拉瓜'},
	                             {text:'苏里拉',value:'苏里拉'},
	                             {text:'委内瑞拉',value:'委内瑞拉'},
	                             {text:'海地',value:'海地'},
	                             {text:'波多黎各',value:'波多黎各'},
	                             {text:'多米尼加',value:'多米尼加'},
	                             {text:'巴哈马',value:'巴哈马'},
	                             {text:'圣卢西亚',value:'圣卢西亚'},
	                             {text:'阿鲁巴岛',value:'阿鲁巴岛'},
	                             {text:'哥斯达黎加',value:'哥斯达黎加'},]},
             {AREA:'非洲',Countrs:[{text:'请选择',value:''},
                                 {text:'马达加斯加',value:'马达加斯加'},
                                 {text:'喀麦隆',value:'喀麦隆'},
                                 {text:'多哥',value:'多哥'},
                                 {text:'科特迪瓦',value:'科特迪瓦'},
                                 {text:'摩洛哥',value:'摩洛哥'},
                                 {text:'阿尔及尼亚',value:'阿尔及尼亚'},
                                 {text:'卢旺达',value:'卢旺达'},
                                 {text:'几内亚共和国',value:'几内亚共和国'},
                                 {text:'埃塞俄比亚',value:'埃塞俄比亚'},
                                 {text:'厄立特里亚',value:'厄立特里亚'},
                                 {text:'莫桑比克',value:'莫桑比克'},
                                 {text:'塞舌尔',value:'塞舌尔'},
                                 {text:'肯尼亚',value:'肯尼亚'},
                                 {text:'利比亚',value:'利比亚'},
                                 {text:'扎伊尔',value:'扎伊尔'},
                                 {text:'安哥拉',value:'安哥拉'},
                                 {text:'赞比亚',value:'赞比亚'},
                                 {text:'几内亚比绍',value:'几内亚比绍'},
                                 {text:'突尼斯',value:'突尼斯'},
                                 {text:'布隆迪',value:'布隆迪'},
                                 {text:'莱索托',value:'莱索托'},
                                 {text:'津巴布韦',value:'津巴布韦'},
                                 {text:'尼日利亚',value:'尼日利亚'},
                                 {text:'毛里求斯',value:'毛里求斯'},
                                 {text:'索马里',value:'索马里'},
                                 {text:'苏丹',value:'苏丹'},
                                 {text:'贝宁',value:'贝宁'},
                                 {text:'马里',value:'马里'},
                                 {text:'乌干达',value:'乌干达'},
                                 {text:'塞拉立昂',value:'塞拉立昂'},
                                 {text:'吉布提',value:'吉布提'},
                                 {text:'塞内加尔',value:'塞内加尔'},
                                 {text:'冈比亚',value:'冈比亚'},
                                 {text:'加蓬',value:'加蓬'},
                                 {text:'中非',value:'中非'},
                                 {text:'布基纳法索',value:'布基纳法索'},
                                 {text:'毛里塔尼亚',value:'毛里塔尼亚'},
                                 {text:'尼日尔',value:'尼日尔'},
                                 {text:'乍得',value:'乍得'},
                                 {text:'赤道几内亚',value:'赤道几内亚'},
                                 {text:'加纳',value:'加纳'},
                                 {text:'坦桑尼亚',value:'坦桑尼亚'},
                                 {text:'刚果',value:'刚果'},
                                 {text:'埃及',value:'埃及'},
                                 {text:'圣多美和普林西比',value:'圣多美和普林西比'},
                                 {text:'博茨瓦纳',value:'博茨瓦纳'},
                                 {text:'南非',value:'南非'},
                                 {text:'纳米比亚',value:'纳米比亚'},
                                 {text:'斯威士兰',value:'斯威士兰'},
                                 {text:'利比利亚',value:'利比利亚'},
                                 {text:'佛得角',value:'佛得角'},
                                 {text:'科摩罗',value:'科摩罗'},]},
	         {AREA:'大洋洲太平洋岛屿',Countrs:[{text:'请选择',value:''},
	                             {text:'澳大利亚',value:'澳大利亚'},
	                             {text:'新西兰',value:'新西兰'},
	                             {text:'西萨摩亚',value:'西萨摩亚'},
	                             {text:'斐济',value:'斐济'},
	                             {text:'巴布亚新几内亚',value:'巴布亚新几内亚'},
	                             {text:'密克罗尼西亚',value:'密克罗尼西亚'},
	                             {text:'马绍尔群岛',value:'马绍尔群岛'},
	                             {text:'瓦努阿图',value:'瓦努阿图'},
	                             {text:'基里巴斯',value:'基里巴斯'},
	                             {text:'汤加',value:'汤加'},
	                             {text:'帕劳',value:'帕劳'},
	                             {text:'库克群岛',value:'库克群岛'},
	                             {text:'所罗门群岛',value:'所罗门群岛'},]},
	        {AREA:'',Countrs:[]},
		                    ];
		for(var i=0;i<CountryArray.length;i++){
			if(country==CountryArray[i].AREA){
				Ext.getCmp(selectfield_id).setOptions(CountryArray[i].Countrs);
			}
		}
	},
	
	//省 市 县  三级联动 查询
	/*,{"PAR_LIS_VAL":"华南","LAST_UPD":"2012-01-08T00:00:00.000Z","PAR_ROW_ID":"1-KTEL6","ROW_ID":"1-4CQJ","LIS_VAL":"湖南","ORDER_BY":10,"CREATED":"2011-10-12T00:00:00.000Z","TYPE":"HEL_PROVINCE"}

	,{"PAR_LIS_VAL":"湖南","LAST_UPD":"2011-10-12T00:00:00.000Z","PAR_ROW_ID":"1-4CQJ","ROW_ID":"1-4CWO","LIS_VAL":"湘西土家族苗族自治州","ORDER_BY":98,"CREATED":"2011-10-12T00:00:00.000Z","TYPE":"HEL_CITY"},

	{"PAR_LIS_VAL":"湘西土家族苗族自治州","LAST_UPD":"2011-10-12T00:00:00.000Z","PAR_ROW_ID":"1-4CWO","ROW_ID":"1-4FJE","LIS_VAL":"龙山县","ORDER_BY":965,"CREATED":"2011-10-12T00:00:00.000Z","TYPE":"HEL_COUNTY"},

	"PAR_LIS_VAL":null,"LAST_UPD":"1980-01-01T00:00:00.000Z","PAR_ROW_ID":null,"ROW_ID":"0LCHS-FGOL@","LIS_VAL":"中国","ORDER_BY":44,"CREATED":"1980-01-01T00:00:00.000Z","TYPE":"COUNTRY"*/
	SSX_SJLD:function(TOU,SKJname,XKJname,ZLB_type1,ZLB_type2){
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		var num=DataCs.getCount();
		var LIS_VAL_Data=[];
		var LIS_VAL_num=0;
		//直接获得所有省
		if(TOU!=''){
			for(var j=0;j<num;j++){
				if(DataCs.getAt(j).get('TYPE')==ZLB_type1){
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='华北'||DataCs.getAt(j).get('PAR_LIS_VAL')=='华中'||
							DataCs.getAt(j).get('PAR_LIS_VAL')=='华东'||DataCs.getAt(j).get('PAR_LIS_VAL')=='华南'||
							DataCs.getAt(j).get('PAR_LIS_VAL')=='东北'||DataCs.getAt(j).get('PAR_LIS_VAL')=='西北'||
							DataCs.getAt(j).get('PAR_LIS_VAL')=='西南'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
						LIS_VAL_num++;
					};
					/*if(DataCs.getAt(j).get('PAR_LIS_VAL')=='华北'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
						cc.log('po1');
					};
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='华中'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='华东'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='华南'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='东北'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='西北'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}
					if(DataCs.getAt(j).get('PAR_LIS_VAL')=='西南'){
						LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					}else{
						continue;
					};*/
					
					//LIS_VAL_num++;
				};
			};
		};
		//通过省获得关联的市   或  县区
		if(TOU==''){
			var WZnum=0;
			//上一级的值
			var S_data=Ext.getCmp(SKJname).getValue();
			//找到选中的省 ,获取位置
			for(var j=0;j<num;j++){
				if(DataCs.getAt(j).get('TYPE')==ZLB_type1&&DataCs.getAt(j).get('LIS_VAL')==S_data){
					WZnum=j;
				};
			};
			//通过位置获得ROW_ID
			var ROW_ID=DataCs.getAt(WZnum).get('ROW_ID');
			for(var j=0;j<num;j++){
				if(DataCs.getAt(j).get('TYPE')==ZLB_type2&&DataCs.getAt(j).get('PAR_ROW_ID')==ROW_ID){
					LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
					LIS_VAL_num++;
				};
			};
		};
		//为下拉列表添加值
		var LIS_VAL_DataLength=LIS_VAL_Data.length;
		var ssdd='[';
		for(var k=0;k<LIS_VAL_DataLength;k++){
			if(k!=LIS_VAL_DataLength-1){
				ssdd+="{'value':'"+LIS_VAL_Data[k]+"','text':'"+LIS_VAL_Data[k]+"'},";
			}else{
				ssdd+="{'value':'"+LIS_VAL_Data[k]+"','text':'"+LIS_VAL_Data[k]+"'}";
			};
		};
		ssdd+=']';
		Ext.getCmp(XKJname).setOptions(eval(ssdd));
		
	},
	
	
	
  //进入下一个页面，跳转
  NextView:function(viewId,FullName){
	  	var applicationController = this;
		var ViewId = Ext.Viewport.getActiveItem().id;
  		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
  		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
  		var viewName=Ext.getCmp(viewId);
  		   if(viewName){
  			   viewName.destroy();
  		   }
  		var view = Ext.create(FullName);   
  	    Ext.Viewport.setActiveItem(view);
  	    //该部分为selectfield组件增加focus事件监听，消除selectfield默认选择的界面显示，改为进入说列表选择
  	    var activeView = Ext.Viewport.getActiveItem();
  	    
  	    
  	    var selectNeedLister = activeView.query('selectfield');
  	    for(var i=0;i<selectNeedLister.length;i++){
  	    	try{
  	    		selectNeedLister[i].setListeners({
  	    			focus:function(field,e,eOpts){
  	    				var cls = field.getInputCls();
  	    				if(cls=='cusInfo_test'){
  	    					object.getController('common.SelectFieldListCtrl').SelectFieldList_GGFF(applicationController,field);
  	    				};
  	    			}
  	    		});
  	    	}catch(e){
  	    		continue;
  	    	}
  	    }
  	    //该部分为延迟改变组件的颜色并禁用selectfield的默认界面显示
  	 	var exec = "var activeItem = Ext.Viewport.getActiveItem();"+
  	 		"var defineInputfield =  activeItem.query('field');" +
  	 		"for(var i=0;i<defineInputfield.length;i++){" +
  	 		"	try{" +
  	 		"		if(defineInputfield[i].getReadOnly()){" +
  	 		"           if(defineInputfield[i].id!='predictSign'){" +
	 			"			defineInputfield[i].setInputCls('ROCls');" +
	 		"           };" +
  	 		"		}else if(defineInputfield[i].isXType('selectfield')){" +
  	 		"			defineInputfield[i].setInputCls('cusInfo_test')}" +
  	 		"	}catch(e){" +
  	 		"		continue;"+
  	 		"	}finally{" +
  	 		"		if(defineInputfield[i].isXType('selectfield'))" +
  	 		"			defineInputfield[i].setReadOnly(true);"+
  	 		"	}" +
  	 		"}";
  	 	setTimeout(exec,200);
  	 	//console.clear();
  	},
  
  //返回,上一个页面
   BackView:function(){
	  var length = ViewArray.length-1;
		var viewId = ViewArray[length].ViewId;
		var ViewName = ViewArray[length].ViewName;
		
		var activeViewId = Ext.Viewport.getActiveItem().id;
		
		var main = Ext.getCmp(viewId);
		if(!main){
			 main = Ext.create(ViewName);
		}
		Ext.Viewport.setActiveItem(main);
		var activeView = Ext.getCmp(activeViewId);
		if(activeView)
			activeView.destroy();
		ViewArray.splice(ViewArray.length-1,1);
		
  },
  
  /**
	 * 控制全部页面的返回跳转, 当A页面前进到B页面时，AB页面皆存在,当B页面返回到A页面,B页面销毁
	 */
	showBackView : function(id, name) {
		var main = Ext.getCmp(id);
 	 	if(!main){
 	 		main = Ext.create(name);
 	 	};
 	 	
 	 	var ViewId = Ext.Viewport.getActiveItem().id;
  		Ext.Viewport.setActiveItem(main);
 	 	ViewArray.splice(ViewArray.length-1,1);
		
		Ext.Viewport.setActiveItem(main);
		var viewName=Ext.getCmp(ViewId);
		if(viewName){
			viewName.destroy();
		};
	},
	//使用formpanel的方法getValues取代
	/**
	 * 获取参数
	 */
	getElement:function(obj){
		//数组参数获取
		if(obj instanceof Array){
			var tempobj=[];
			var  length =obj.length;
			for(var i=0;i<length;i++){
				tempobj[i]=Ext.getCmp(obj[i]).getValue();
			}
			return tempobj;
		}
		//字符串获取
		if(obj instanceof String){
			return Ext.getCmp(obj).getValue;
		}
		
		
	},
  //填充表单数据
	fillFormValue:function(formId,model,data){
		var formPanel = Ext.getCmp(formId);
		if(!formPanel)
			return Ext.create(model,data);
		var record = Ext.create(model,data);
		formPanel.setRecord(record);
	},
	/**
	 * 访问SQL
	 */
	connectSql : function (fn, jokey) {
		if (jokey.wattingFlag) {
			myLoading.show();
		}
		var invocationData = {  
              adapter : 'SqlAdapter_PDA',  
              procedure : jokey.producedure,
              parameters : jokey.params 
      };
		

		
  	WL.Client.invokeProcedure(invocationData, {
  		timeout:60000,
          onSuccess : function (result) { 
          	myLoading.hide();
          	var httpStatusCode = result.status;
          	if (200 == httpStatusCode) {
                  var invocationResult = result.invocationResult;
                  var isSuccessful = invocationResult.isSuccessful;
                  if (true == isSuccessful) {
                  	var resultSet = invocationResult.resultSet;
                  	 if(resultSet.length>0){ 
                  		 try {
                  			 if (jokey.obj == undefined) {
                      			 fn(resultSet);                    			 
                      		 } else {
                      			 fn(resultSet,jokey.obj);
                      		 }
                  		 } catch(e) {
//                  			 Ext.Msg.alert('提示','数据异常!');
                  			 WL.Toast.show('数据异常，请稍后重试！');
                  		 }
	                   	 }else{
//	                   		 Ext.Msg.alert('提示','没有符合的数据!');   
	                   		WL.Toast.show('服务器繁忙('+ resultSet.length +')！');
	                   	 }
                  	
                  } else {
//                  	Ext.Msg.alert('提示','获取数据失败!');  
                  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
                  }
              } else {
//              	Ext.Msg.alert('提示','网络出错！'); 
              	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
              }
          },  
          onFailure : function () {
          	myLoading.hide();
//          	Ext.Msg.alert('提示','发送请求失败');
          	WL.Toast.show('连接服务器失败,请稍后重试！');
          }
      });
		
	},
	
	
	/*var paaa = {};
	paaa.method = "queryByEmp";
	paaa.params = ['1','2','3'];
	this.connectServer_ws(function (){},'aa');*/
	
	/**
	 * 访问接口
	 */
	connectServer_ws : function(fn, params) {
		var invocationData = {  
				adapter : 'HttpAdapter_PAD',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					myLoading.hide();
					var httpStatusCode = result.status;
				
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var v_result = invocationResult.result;
							var json = eval("("+v_result+")"); 
							fn(json);
						} else {
							WL.Toast.show('服务器繁忙，请稍后重试！');
							fn(null);
						}
					} else {
						WL.Toast.show('服务器繁忙，请稍后重试！');
						fn(null);
					}
				},  
				onFailure : function () {
		      
					//myLoading.hide();
					fn(null);
					WL.Toast.show('连接不上服务器，请稍后重试！');
				}
			});
		} catch (e) {
			//myLoading.hide();
			WL.Toast.show('系统出错，请稍后重试！');
			fn(null);
		}
	},
	
	
	//公司通讯录测试
	connectSql_TXL:function(fn,num,data){
		myLoading.show();
		console.log(data.pcode,data.cond,data.selcomp,data.cond_selcomp);
		var invocationData={
				adapter : 'SqlAdapter_PAD_UCDB',  //Adapter名字
	            procedure : 'procedure_Three',  //Adapter方法名
	            parameters : [num, data.pcode,data.cond,data.selcomp,data.cond_selcomp]	
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//console.log('放的'+eval("("+result+")"));
					myLoading.hide();
					var httpStatusCode = result.status;
				
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var v_result = invocationResult.resultSet;
							//console.log(v_result[0].ORGNAME);
							//var json = eval("("+v_result+")"); 
							fn(v_result);
						} else {
							myLoading.hide();
							WL.Toast.show('服务器繁忙，请稍后重试！');
							fn(null);
						}
					} else {
						myLoading.hide();
						WL.Toast.show('服务器繁忙，请稍后重试！');
						fn(null);
					}
				},  
				onFailure : function () {
					myLoading.hide();
					fn(null);
					WL.Toast.show('连接不上服务器，请稍后重试！');
				}
			});
		} catch (e) {
			alert("error");
			myLoading.hide();
			WL.Toast.show('系统出错，请稍后重试！');
			fn(null);
		}

	},
	
	//获取值列表
	connectSql_ZLB:function(fn,num){
		//myLoading.show();
		var invocationData='';
		if(num==1){
			invocationData={
					adapter : 'SqlAdapter_PAD_helc',  //Adapter名字
		            procedure : 'padXLLB',  //Adapter方法名
			};
		}else if(num==2){
			invocationData={
					adapter : 'SqlAdapter_PAD_helc',  //Adapter名字
		            procedure : 'padZXSJ',  //Adapter方法名
			};
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//myLoading.hide();
					/*cc.log('看看：'+JSON.stringify(result));
					cc.log('看看2：'+result.status);
					cc.log('看看3：'+result.invocationResult);
					cc.log('看看4：'+result.invocationResult.isSuccessful);
					cc.log('看看5：'+result.invocationResult.resultSet);*/
					var status=result.status;
					if (200 == status) {
						var isSuccessful=result.invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var data=result.invocationResult.resultSet;
							fn(data);
						} else {
							WL.Toast.show('服务器繁忙，请稍后重试！');
							fn(null);
						};
					}else {
						WL.Toast.show('服务器繁忙，请稍后重试！');
						fn(null);
					};
				},  
				onFailure : function () {
					myLoading.hide();
					fn(null);
					WL.Toast.show('连接不上服务器，请稍后重试！');
				}
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('系统出错，请稍后重试！');
			fn(null);
		}

	},
	
	//pad验证登陆 
	connectServer_login:function(fn,data){
		//myLoading.show();
		var invocationData={
				adapter : 'HttpAdapter_Pad_login',  //Adapter名字
	            procedure : 'CheckUser',  //Adapter方法名
	            parameters : [data.UserID,data.Password,data.AppID]	
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//obj.HideWaitting();
					//myLoading.hide();
					var httpStatusCode = result.status;
				
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						
						var isSuccessful = invocationResult.isSuccessful;
                
						if (true == isSuccessful) {
							//alert('A '+invocationResult);
							//var status = invocationResult.statusCode;
							fn(invocationResult);
						} else {
							myLogining.hide();
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						myLogining.hidde();
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					//obj.HideWaitting();
					myLoading.hide();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
			
		} catch (e) {
			//obj.HideWaitting();
			myLoading.hide();
			console.log('连接服务器出错');
		}
		
		
		},

	
	//PAD密码修改
	connectServer_loginXG:function(fn,data){
		myLoading.show();
			var invocationData={
					adapter : 'HttpAdapter_Pad_login',  //Adapter名字
		            procedure : 'ChangePassword',  //Adapter方法名
		            parameters : [data.USERID,data.PWD,data.NEW_PWD]	
			};
			
			try {
				WL.Client.invokeProcedure(invocationData, {
					timeout:60000,
					onSuccess : function (result) {
						//obj.HideWaitting();
						myLoading.hide();
						var httpStatusCode = result.status;
					
						if (200 == httpStatusCode) {
							var invocationResult = result.invocationResult;
							
							var isSuccessful = invocationResult.isSuccessful;
	                
							if (true == isSuccessful) {
								
								//var status = invocationResult.statusCode;
								fn(invocationResult);
							} else {
								WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
							}
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					},  
					onFailure : function (result) {
						//obj.HideWaitting();
						var invocationResult = result.invocationResult;
						fn(invocationResult);
						WL.Toast.show('服务器繁忙，请稍后重试！');
					}
				});
				
			} catch (e) {
				//obj.HideWaitting();
				console.log('连接服务器出错');
			}
			
			
	},
	
	
	//Siebel and ERP
	connectServerComm : function(fn, params,num) {
		
		var invocationData={};
		if(num==1){
			myLoading.show();
			console.log('HH '+params.prmName.appContractNo);
			invocationData = {
		              adapter : params.adpName,  
		              procedure : params.prodNmae,
		              parameters : [params.prmName.appContractNo,
		                            params.prmName.appContractType,
		                            params.prmName.appCustomerName,
		                            params.prmName.appElevatorNo,
		                            params.prmName.appUseUnit,
		                            params.prmName.appBigCustomer,
		                            userID],
		              
		             // ContractNumber,ContractType,CustomerName,AssetNumber,FinalUser,BigCustomer
			};
		};
		
		
		if(num==2){
			myLoading.show();
			console.log('HH '+params.prmName.appContractNo);
			invocationData = {
					adapter : params.adpName,  
					procedure : params.prodNmae,
					parameters : [params.prmName.appContractNo,
					              params.prmName.appContractType,
					              params.prmName.appCustomerName,
					              params.prmName.appElevatorNo,
					              params.prmName.appUseUnit,
					              params.prmName.appBigCustomer,
					              ERPuserID],
			};
		};
		
		if(num==11){
			myLoading.show();
			invocationData = {
		              adapter : params.adpName,  
		              procedure : params.prodNmae,
		              parameters : [params.prmName.appContractNo],
		              
			};
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					myLoading.hide();
					console.log('总的： '+JSON.stringify(result));
					var httpStatusCode = result.status;
					console.log('httpStatusCode: '+httpStatusCode);
					if (200 == httpStatusCode) {
						
						try{
							var invocationResult=result.invocationResult;
							var isSuccessful = invocationResult.isSuccessful;
							cc.log('isSuccessful:'+isSuccessful);
							//判断
							if(num==1){
								if (true == isSuccessful) {
									var NumOutputObjects=result.invocationResult.ContractListQueryByExample_Output.NumOutputObjects;
									if(NumOutputObjects=='0'){
										Ext.Msg.alert("查无数据");
									};
									//正式
									var status=result.invocationResult.ContractListQueryByExample_Output.ListOfHelPdaContractsListIo.HelPdaContracts;
									
									fn(status);
								} else {
									WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
								}
							};
					
							
							if(num==2){
								var status=result.invocationResult.CONTRACT_HEADERS_LISTResponse["return"];
								//需要的值
								//var ContractListQueryByExample_Output = invocationResult.ContractListQueryByExample_Output;
								//var ListOfHelPdaContractsListIo=ContractListQueryByExample_Output.ListOfHelPdaContractsListIo;
								console.log('isSuccessful:'+isSuccessful);
								if (true == isSuccessful) {
									//console.log('ListOfHelPdaContractsListIo:'+JSON.stringify(ListOfHelPdaContractsListIo));
									//var status = JSON.stringify(ListOfHelPdaContractsListIo.HelPdaContracts);
									//var res=eval("("+status+")");
									//var status=ListOfHelPdaContractsListIo.HelPdaContracts;
									console.log('result  '+status);
									var json = eval("("+status+")"); 
									fn(json);
								} else {
									WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
								}
							};
							
							if(num==11){
								cc.log('11:'+isSuccessful);
								
								/*var ContractDetailQueryByExampleResponse=invocationResult.ContractDetailQueryByExampleResponse;
								var SiebelMessage=ContractDetailQueryByExampleResponse.SiebelMessage;
								var ListOfHelPdaContractsDetailIo=SiebelMessage.ListOfHelPdaContractsDetailIo;*/
								cc.log('dfsdf2');
								if (true == isSuccessful) {
									cc.log('dfsdf');
									//var status=ListOfHelPdaContractsDetailIo.HelPdaQuoteHeaders;
									//console.log('result  '+status);
									var status=result.invocationResult.ContractDetailQueryByExample_Output.ListOfHelPdaContractsDetailIo.HelPdaQuoteHeaders;
									fn(status);
								} else {
									WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
								};
								
								/*测试
								 * var ContractDetailQueryByExample_Output=invocationResult.ContractDetailQueryByExample_Output;
								var ListOfHelPdaContractsDetailIo=ContractDetailQueryByExample_Output.ListOfHelPdaContractsDetailIo;
								if (true == isSuccessful) {
									var status=ListOfHelPdaContractsDetailIo.HelPdaQuoteHeaders;
									console.log('result  '+status);
									fn(status);
								} else {
									WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
								};*/
							};
						}catch(err){
							//Ext.Msg.alert('服务器繁忙,请稍后重试');
						};
						
						
						
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					myLoading.hide();
					//var invocationResult = result.invocationResult;
					//fn(null);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
			
		} catch (e) {
			myLoading.hide();
			console.log('连接服务器出错');
		}
	},
	
     //调用ERP_headers
	connectServer_erp_headers:function(fn,data){
		myLoading.show();
		var invocationData={
				adapter : data.adpName,  //Adapter名字
	            procedure : data.prodNmae,  //Adapter方法名
	            parameters : [data.prmName.appContractNo]	
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//obj.HideWaitting();
					myLoading.hide();
					console.log('总的： '+JSON.stringify(result));
					var httpStatusCode = result.status;
					var status=result.invocationResult.CONTRACT_HEADERS_INFOResponse["return"];
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						
						var isSuccessful = invocationResult.isSuccessful;
                
						if (true == isSuccessful) {
							console.log('result  '+status);
							//var status = invocationResult.statusCode;
							fn(status);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					//obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
			
		} catch (e) {
			//obj.HideWaitting();
			console.log('连接服务器出错');
		}
		
		
		},
		
		
		//调用ERP
		connectServer_erp:function(fn,data){
			var obj = this;
			//obj.Waitting("正在加载...");
			myLoading.show();
			var invocationData={
					adapter : data.adpName,  //Adapter名字
					procedure : data.prodNmae,  //Adapter方法名
					parameters : [data.p_elevaotr_id]	
			};
			
			try {
				WL.Client.invokeProcedure(invocationData, {
					timeout:60000,
					onSuccess : function (result) {
						//obj.HideWaitting();
						myLoading.hide();
						var httpStatusCode = result.status;
						
						if (200 == httpStatusCode) {
							var invocationResult = result.invocationResult;
							
							var isSuccessful = invocationResult.isSuccessful;
							
							if (true == isSuccessful) {
								
								//var status = invocationResult.statusCode;
								fn(invocationResult);
							} else {
								myLoading.hide();
								WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
							}
						} else {
							myLoading.hide();
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					},  
					onFailure : function (result) {
						//obj.HideWaitting();
						myLoading.hide();
						var invocationResult = result.invocationResult;
						fn(invocationResult);
						WL.Toast.show('服务器繁忙，请稍后重试！');
					}
				});
				
			} catch (e) {
				//obj.HideWaitting();
				myLoading.hide();
				console.log('连接服务器出错');
			}
			
			
		},

		connectServer : function(fn, url, params) {
			myLoading.show();
			var invocationData = {  
		              adapter : 'HttpAdapter_PDA',  
		              procedure : 'getStories_pda',
		              parameters : [url, params]
			};
		  	WL.Client.invokeProcedure(invocationData, {
		  		 timeout:60000,
		          onSuccess : function (result) {
		        	  myLoading.hide();
		          	var httpStatusCode = result.status;
		          	if (200 == httpStatusCode) {
		                  var invocationResult = result.invocationResult;
		                  var isSuccessful = invocationResult.isSuccessful;
		                  if (true == isSuccessful) {
		                  	var status = invocationResult.status.code;
		                  	try {
		                  		if (status == 250) {
			                          var result = invocationResult.content;
			                          // 转化成JSON对象
//			                          console.log(result);
			                          var json = eval("("+ result +")");
			                          fn(json);
			                  	} else {
//			                  		Ext.Msg.alert('提示',"服务器出错！");
			                  		WL.Toast.show('数据异常，请稍后重试！');
			                  	}
		                  	} catch(e) {
//		                  		Ext.Msg.alert('提示',"服务器出错！");
		                  		WL.Toast.show('数据异常，请稍后重试！');
		                  	}
		                  } else {
//		                	  	Ext.Msg.alert('提示',"网络出错！");
		                	  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
		                  }
		              } else {
//		            	  	Ext.Msg.alert('提示',"网络出错！");
		            	  	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
		              }
		          },  
		          onFailure : function () {
		        	  myLoading.hide();
//		        	  Ext.Msg.alert('提示',"失败！");
		        	  WL.Toast.show('连接服务器失败，请稍后重试！');
		          }
		      });
		},
		
		//创建store 的时候使用
		  getStore:function(storeName,FullNAME){
			  var store=Ext.data.StoreManager.get(storeName);
		 		if (!store) { 
		 			store = Ext.create(FullNAME); 
		 		}; 
		 		return store;
		  },
		  //显示等待
		  HideWaitting : function(){
				Ext.Viewport.setMasked(false);
		  },
			//白底蓝字等待框
		  Waitting : function(msg){
				Ext.Viewport.setMasked({
					xtype : 'loadmask',
					message : msg,
					padding:'0',
				});
		  },
			
			
	//查询客户资料
	connectServer_custom:function(fn,TJdata,num,userID){
		myLoading.show();
		var invocationData={};
		if(num==1){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomSeacher',  //Adapter方法名
				    parameters : [TJdata.SearchSpec,TJdata.viewmodel,userID]	
			};
		}else if(num==2){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomInfo',  //Adapter方法名
				    parameters : [TJdata.rowid,TJdata.viewmodel,userID]	
			};
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var data='';
							if(num==1){
								try{
									data=invocationResult.QueryAccount_Output.ListOfHelEaiAppAccount.Account;
								}catch(e){
									data=undefined;
								};
							}else if(num==2){
								data=invocationResult.AccDetailQueryById_Output.ListOfHelEaiAppAccountDetail.Account;
							};
							fn(data);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//客户资料   申请使用
	connectServer_custom_SQSY:function(fn,Trim){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomSQSY',  //Adapter方法名
				    parameters : [
				    /*Trim.ApplyType1,Trim.AccountNumber1,Trim.EBSCustomerName1,
					Trim.CertifiAddress1,Trim.Extraordinary1,Trim.OrgCodeNumber1,
					Trim.OrgCodeDate1,Trim.AccountClass1,Trim.AccountSort1,
					Trim.TaxRegist1,Trim.Associate1,Trim.Region1,
					Trim.SmallScaleTaxpayer1,Trim.HQEBSCustomerId1,Trim.HQEBSCustomerSiteId1,
					Trim.AccountGroup1,Trim.HeadStatus,Trim.AddressStatus,
					Trim.Account, //数组 地址
					Trim.Contact1,
					Trim.MainPhoneNumber,Trim.MainFaxNumber,Trim.AccountAttribute,
					Trim.AccountProperty,Trim.AccountMPType,Trim.Name,
					Trim.Type,*/
				    Trim,
					userID]	
		};
	
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							try{
								var data=result.invocationResult.ApplyUse_Output.ListOfEaiApplyAccountTest.EaiApplyAccount;
								/*if(data==undefined){
									Ext.Msg.alert("申请失败");
									return;
								};*/
								fn(data);
							}catch(e){
								Ext.Msg.alert("申请失败");
							};
							
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//客户资料   同步EBS
	connectServer_custom_TBEBS:function(fn,rowid){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomInfo_TBEBS',  //Adapter方法名
				    parameters : [rowid,userID]	
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							//alert(121);
							var data=result.invocationResult.TransferToEBS_Output.ErrorMsg;
							cc.log('data:'+data);
							if(data==undefined){
								fn('');
								return;
							};
							var datanum=data.length;
							var data2=data.substring(20,datanum);
							Ext.Msg.alert("提示",data2);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//客户资料   提交申请    之      保存
	connectServer_custom_BC:function(fn,Trim){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomInfo_BC',  //Adapter方法名
				    parameters:[Trim,userID]
				    //对照完毕 不必复查    2015-9-7
				    /*parameters : [
						Trim.ApplyType1,
						Trim.CSN,           
						Trim.CertifiAddress1,
						Trim.Extraordinary1,     
						Trim.OrgCodeNumber1,   
						Trim.OrgCodeDate1,
						Trim.AccountClass1,       
						Trim.AccountSort1,         
						Trim.TaxRegist1,     
						Trim.Contact1,             
						Trim.MainPhoneNumber,   
						Trim.MainFaxNumber,     
						Trim.AccountAttribute,
						Trim.AccountProperty,      
						Trim.AccountMPType,     
						Trim.Name,       
						Trim.Type,           
						//和申请使用 不同 的
						Trim.Organization,//组织                   
						Trim.AccountStatus,//状态             
						Trim.ApproveStatus,//审核状态     
						Trim.AccountSubType,//客户子类型         
						Trim.BigCustomer,//大客户        
						Trim.AccountKANumber,//大客户编号   
						Trim.BankName1,//开户银行名称      
						Trim.BankNumber1,//开户银行帐号 
						//是数组的地址集合
						Trim.Account,
						//特殊的ID
						//组织ID
						Trim.OrganizationId,
						//客户Userkey 修改的时候会用到
						Trim.PrimaryOrganizationId,
						//父客户  有点特殊 要考虑下
						Trim.ParentAccountName,
						//父客户ID
						Trim.ParentAccountId,
						//重复保存更新的id
						Trim.Id,
						userID]	*/
		
		};
		//cc.log('ccdd:'+Trim.Id);
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					//myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							try{
								var data=result.invocationResult.AccDetailSynchronize_Output.PrimaryRowId;
								fn(data);
							}catch(e){
								//cc.log(JSON.stringify(result));
								//var cc1=result.invocationResult.WL-Authentication-Success.detail.siebdetail.errorstack.error.errormsg;
								var ccl=result.invocationResult.Fault.detail.siebdetail.errorstack.error.errormsg;
								cc.log('cc1:'+ccl);
								myLoading.hide();
								Ext.Msg.alert('保存失败',ccl);
							};
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//客户资料   之提交申请
	connectServer_custom_TJSQ:function(fn,Trim){
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustomInfo_TJSQ',  //Adapter方法名
				    parameters : [Trim,userID]	
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					myLoading.hide();
					cc.log('看不:'+JSON.stringify(result));
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							try{
								var data=result.invocationResult.Submit_Output.ErrorMsg;
								if(data==undefined){
									fn('');
									return;
								};
								Ext.Msg.alert("提示","提交失败:"+data);
							}catch(e){
								Ext.Msg.alert("提示","提交失败");
								//fn('');
							};
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide(); 
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	
	//业务详细地址查询
	connectServer_custom_address:function(fn,Trim){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustornAddressList',  //Adapter方法名
				    parameters : [
				    Trim.Country,
				    Trim.Province,
					Trim.City,
					Trim.County,
					Trim.StreetAddress,
					userID]	
		};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var data=result.invocationResult.AccAddrQuery_Output.ListOfHelEaiAppAccountAddress.CutAddress;
							//alert(data);
							fn(data);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	//商机检测
	connectServer_checkOpportunity:function(fn,data){
		myLoading.show();
		var invocationData = {
				adapter :data.adpName,  //Adapter名字
			    procedure : data.prodName,  //Adapter方法名
			    parameters : [
			    	data.parameters.SearchSpec,
			    	data.parameters.viewmodel,
			    	data.parameters.userID
			    ]
		};
		
		WL.Client.invokeProcedure(invocationData,{
			timeout:60000,
			onSuccess:function(result){
				window.setTimeout('myLoading.hide()',500);
				var httpStatusCode = result.status;
				if(httpStatusCode==200){
					var invocationResult = result.invocationResult;
					var isSuccessful = invocationResult.isSuccessful;
					if (true == isSuccessful) {
						fn(invocationResult.QueryOppty_Output);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				}else{
					WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
				}
			},
			onFailure:function(){
				myLoading.hide();
				WL.Toast.show('服务器繁忙，请稍后重试！');
			}
		});
	},
	//调用PAD接口
	connectServer_queryOpportunity:function(fn,data){
		//scc.log(fn);
		if(!data.special)
			myLoading.show();
		var invocationData = {
				adapter :data.adpName,  //Adapter名字
			    procedure : data.prodName,  //Adapter方法名
			    parameters : [
			    	data.parameters
			    ]
		};
		WL.Client.invokeProcedure(invocationData,{
			timeout:100000,
			onSuccess:function(result){
					myLoading.hide();
				var httpStatusCode = result.status;
				if(httpStatusCode==200){
					var invocationResult = result.invocationResult;
					var isSuccessful = invocationResult.isSuccessful;
					if (true == isSuccessful) {
						invocationResult.obj = data.obj;
						fn(invocationResult);
					} else {
						myLoading.hide();
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				}else{
					myLoading.hide();
					WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
				}
			},
			onFailure:function(){
				myLoading.hide();
				WL.Toast.show('服务器繁忙，请稍后重试！');
			}
		});
	},
	
	
	//业务详细地 新建
	connectServer_custom_address_add:function(fn,Trim){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustornAddressAdd',  //Adapter方法名
				    parameters : [
				    Trim.Country,
				    Trim.Province,
					Trim.City,
					Trim.County,
					Trim.StreetAddress,
					Trim.StartDate,
					Trim.EndDate,
					Trim.PostalCode,
					userID]	
		};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var data=result.invocationResult.AccAddrSynchronize_Output.ListOfHelEaiAppAccountAddress.CutAddress;
							fn(data);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},

	
	//查询附件
	connectServer_custom_FJ_CX:function(fn,AccntFileExt,AccountId){
		myLoading.show();
		var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'toCustonInfo_CX',  //Adapter方法名
				    parameters : [
				    AccntFileExt,
				    AccountId,
				    userID]	
		};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var data=result.invocationResult.AccAttQuery_Output.ListOfHelEaiAppAccountAttachment.ListOfAccountAttachment.AccountAttachment;
							if(data==undefined){
								//Ext.Msg.alert("查无附件");
								return;
							};
							fn(data);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	
	//添加附件
	connectServer_custom_FJ_SC:function(fn,obj,trim){
		myLoading.show();
		var invocationData={
				adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				procedure : 'toCustonInfo_SC',  //Adapter方法名
				parameters : [trim.AccntFileExt,
				              trim.AccntFileName,
				              trim.AccountId,
				              trim.AccntFileBuffer,
				              userID]	
		};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					cc.log('看不:'+JSON.stringify(result));
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var isSuccessful = result.invocationResult.isSuccessful;
						if (true == isSuccessful) {
							//var dd=result.invocationResult.responseID;
							fn('',obj);
						} else {
							myLoading.hide();
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						myLoading.hide();
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	
	/**
	 * 第三阶段
	 */
	DireactorZGSeach:function(obj,fn,trim,numDDS){
		myLoading.show();
		var invocationData='';
		if(numDDS==1){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'directorDQRYJzg',  //Adapter方法名
					parameters : [trim,userID]	
			};
		};
		if(numDDS==2){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'directorSJXDDL',  //Adapter方法名
					parameters : [trim,userID]	
			};
		};
		if(numDDS==3){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'perfimranceTYDLSYJ',  //Adapter方法名
					parameters : [trim,userID]	
			};
		};
		if(numDDS==4){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'perfimranceBHDLSYJ',  //Adapter方法名
					parameters : [trim,userID]	
			};
		};
		
		try {
			myLoading.hide();
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					cc.log('看不:'+JSON.stringify(result));
					
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var isSuccessful = result.invocationResult.isSuccessful;
						if (true == isSuccessful) {
							myLoading.hide();
							if(numDDS==1){
								var num=result.invocationResult.QueryOppty_Output.NumOutputObjects;
								var data='';
								if(num!=0){
									data=result.invocationResult.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;	
								};
								fn(obj,data,num);
							};
							
							if(numDDS==2){
								var num=result.invocationResult.OpptyAgentQuery_Output.NumOutputObjects;
								var data='';
								if(num!=0){
									data=result.invocationResult.OpptyAgentQuery_Output.ListOfHelEaiAppOpportunityHelAgent.Opportunity.ListOfHelAgent.HelAgent;
								};
								fn(obj,data,num);
							};
							
							if(numDDS==3){
								fn(obj,result);
							};
							
							if(numDDS==4){
								fn(obj,result);
							};
						} else {
							myLoading.hide();
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
					
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//仅销售无圈特殊处理
	DireactorZGSeachJXS:function(obj,fn,trim){
			var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'directorDQRYJzg',  //Adapter方法名
					parameters : [trim,userID]	
			};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log('看不:'+JSON.stringify(result));
					//cc.log(result);
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var isSuccessful = result.invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var num=result.invocationResult.QueryOppty_Output.NumOutputObjects;
							var data='';
							if(num!=0){
								data=result.invocationResult.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;	
							};
							fn(obj,data,num);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
					
				},  
				onFailure : function (result) {
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			WL.Toast.show('连接服务器出错');
		};
	},
	
	
	
	
	//待处理线索
	ToDoClueDirector_ZG_DCLXS:function(obj,fn,Trim,TDCnum){
		myLoading.show();
		var invocationData='';
		if(TDCnum==1){
			invocationData={
				adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				procedure : 'clueListQuery',  //Adapter方法名
				parameters : [Trim]	
			};
		};
		
		if(TDCnum==2){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'clueDetail',  //Adapter方法名
					parameters : [Trim]	
			};
		};
		
		if(TDCnum==3){
			invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
					procedure : 'clueHandleDirector_GLSJ',  //Adapter方法名
					parameters : [Trim]	
			};
		};
		
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					myLoading.hide();
					cc.log(result);
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						
						if(TDCnum==1){
							try{
								var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
								var star=result.invocationResult.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead;
								fn(obj,star,NumOutputObjects);
							}catch(e){
								var starErr='';
								try{
									starErr=result.invocationResult.QueryLeadPage_Output.ErrorMsg;
								}catch(e){
									starErr=result.invocationResult.Fault.detail.siebdetail.errorstack.error.errormsg;
								}
								Ext.Msg.alert("温馨提示",starErr);
							};
						};
						
						if(TDCnum==2){
							var star=result.invocationResult.LeadQueryById_Output.ListOfHelEaiAppLeadDetail.HelLead;
							fn(obj,star);
						};
						
						if(TDCnum==3){
							var star=result.invocationResult.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
							fn(obj,star);
						};
						
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//待处理线索 无等待版                                          
	ToDoClueDirector_ZG_DCLXSNoQ:function(obj,fn,Trim){
		var	invocationData={
				adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				procedure : 'clueListQuery',  //Adapter方法名
				parameters : [Trim]	
			};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					cc.log(result);
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						
							try{
								var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
								var star=result.invocationResult.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead;
								fn(obj,star,NumOutputObjects);
							}catch(e){
								var starErr='';
								try{
									starErr=result.invocationResult.QueryLeadPage_Output.ErrorMsg;
								}catch(e){
									starErr=result.invocationResult.Fault.detail.siebdetail.errorstack.error.errormsg;
								}
								Ext.Msg.alert("温馨提示",starErr);
							};
						
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//xcx的公共adapter方法
	XCX_GG_FF:function(fn,trim){
		myLoading.show();
		var invocationData={
				adapter :trim.adpName,  //Adapter名字
				procedure : trim.prodName,  //Adapter方法名
				parameters : [trim.parameters]
				
		};
		cc.log(trim);
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//cc.log(result);
						var isSuccessful = result.invocationResult.isSuccessful;
						var status=result.status;
						var invocationResult = result.invocationResult;
						if(status==200){
							if (true == isSuccessful) {
								if(trim.LoadNum==1){
									myLoading.hide();
								};
								invocationResult.obj = trim.obj;
								fn(invocationResult);
							} else {
								myLoading.hide();
								WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
							};							
						}else{
							myLoading.hide();
						};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	XCX_GG_FF_NOT:function(obj,fn,Trim){
		var invocationData={
			adapter : Trim.adapter,  //Adapter名字
			procedure : Trim.procedure,  //Adapter方法名
			parameters : [Trim]	
		};
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						result.obj=obj;
						fn(result);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			WL.Toast.show('连接服务器出错');
		};
	},
	
	
	ZXLCallAdapter:function(obj,fn,param){
		var invocationData = {
				adapter :param.adapter,  //Adapter名字
			    procedure : param.procedure,  //Adapter方法名
			    parameters : [
			    	param.parameters
			    ]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						invocationResult.obj=obj;
						fn(invocationResult);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//公共方法 xcx 2016-5-23
	selectCluePublic:function(obj,fn,Trim){
		var	invocationData={
				adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				procedure : 'clueListQuery',  //Adapter方法名
				parameters : [Trim]	
			};
		//cc.log('Trim:'+JSON.stringify(Trim));
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					cc.log(result);
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						
							try{
								var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
								var star=result.invocationResult.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead;
								fn(obj,star,NumOutputObjects);
							}catch(e){
								var starErr='';
								try{
									starErr=result.invocationResult.QueryLeadPage_Output.ErrorMsg;
								}catch(e){
									starErr=result.invocationResult.Fault.detail.siebdetail.errorstack.error.errormsg;
								}
								Ext.Msg.alert("温馨提示",starErr);
							};
						
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	// 审批单
	getApplyFor:function(obj,fn,param){
		if(param.Flag){
			myLoading.show();
		};
		var invocationData = {
				adapter :param.adpName,  //Adapter名字
			    procedure : param.prodName,  //Adapter方法名
			    parameters : [
			    	param.parameters
			    ]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					if(param.Flag){
						myLoading.hide();
					};
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						invocationResult.obj=obj;
						fn(invocationResult);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					if(param.Flag){
						myLoading.hide();
					};
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			if(param.Flag){
				myLoading.hide();
			};
			WL.Toast.show('连接服务器出错');
		};
	},
	
});



//字符串去前后空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};
