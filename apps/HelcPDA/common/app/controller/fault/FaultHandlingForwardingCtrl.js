Ext.define('HelcPDA.controller.fault.FaultHandlingForwardingCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		refs : {
			// 进入派工信息的事件
			FaultHandlingForwarding : 'button[id=faultHandlingForwarding]',
			FHF_SearchByinfo : 'button[id=FHF_SearchByinfo]',
			FHF_STATION_ID : 'selectfield[id=FHF_STATION_ID]',
			FHF_area : 'selectfield[id=FHF_area]',
			
		},
		control : {
			FaultHandlingForwarding : {
				tap : 'FaultHandlingForwarding'
			},
			FHF_SearchByinfo : {
				tap : 'FHF_SearchByinfo'
			},
			FHF_STATION_ID : {
				change : 'FHF_STATION_ID'
			},
			FHF_area : {
				change : 'FHF_area'
			}
		},
	},
	
	//搜索人员
	FHF_SearchByinfo : function(){
		var STATION_ID = Ext.getCmp("FHF_STATION_ID").getValue();
		var AREA_ID = Ext.getCmp("FHF_area").getValue();
		var GROUP_ID = Ext.getCmp("FHF_GROUP").getValue();
		
		
		if(STATION_ID == null||STATION_ID==""||typeof(STATION_ID)=="undefined"){
			var COMPANY_ID = Ext.getCmp("COMPANY_ID").getValue();
			var content = "{'COMPANY_ID':'" + COMPANY_ID + "'}";
			var getPerson = function(res) {
				var str = res.rows2;
				Ext.getCmp('person').setOptions(str);
			};
			this.connectServer(getPerson,'zhuanPaiAction.do?method=PDA3_toSearchByinfo', content);
		}
		
		if(STATION_ID != null && STATION_ID !="" && typeof(STATION_ID) !="undefined"){
			var content = "{'STATION_ID':'" + STATION_ID + "'," +
						"'AREA_ID':'"+AREA_ID+"'," +
						"'GROUP_ID':'"+GROUP_ID+"'}";
			var getPerson = function(res) {
				var str = res.rows2;
				Ext.getCmp('person').setOptions(str);
			};
			this.connectServer(getPerson,'zhuanPaiAction.do?method=PDA3_toSearchByinfo', content);
		}
	},
	
	//根据片搜索组
	FHF_area : function(){
		var AREA_ID = Ext.getCmp("FHF_area").getValue();
		var content = "{'AREA_ID':'" + AREA_ID + "'}";
		var getGroup = function(res) {
			var arr=res.rows;
	    	var data="[{'value':'','text':'全部'},";
	   		for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].GROUP_ID+"','text':'"+arr[i].GROUP_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].GROUP_ID+"','text':'"+arr[i].GROUP_NAME+"'}";
	   			}
	   		 }
	   		data+="]";
	    	var str = eval(data);
			Ext.getCmp('FHF_GROUP').setOptions(str);
			Ext.getCmp('FHF_GROUP').setValue("全部");
		};
		this.connectServer(getGroup,'zhuanPaiAction.do?method=toSearchByarea', content);
		
	},
	
	//根据站搜索片
	FHF_STATION_ID : function(){
		var STATION_ID = Ext.getCmp("FHF_STATION_ID").getValue();
		var content = "{'STATION_ID':'" + STATION_ID + "'}";
		var getArea = function(res) {
			var arr=res.rows;
			var data="[{'value':'','text':'全部'},";
	   		for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].AREA_ID+"','text':'"+arr[i].AREA_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].AREA_ID+"','text':'"+arr[i].AREA_NAME+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
			Ext.getCmp('FHF_area').setOptions(str);
			Ext.getCmp('FHF_area').setValue("全部");
		};
		this.connectServer(getArea,'zhuanPaiAction.do?method=toSearchBystation', content);
		
	},
	
	//加载所属站
	FaultHandlingForwarding : function() {
		this.NextView('FaultHandlingForwardPanel','HelcPDA.view.fault.FaultHandlingForwardingPanel');
		Ext.Viewport.removeMenu('right');
		var STATION_ID = station_id;
		var COMPANY_ID = Ext.getCmp("COMPANY_ID").getValue();
		
		if(STATION_NAME==null||STATION_NAME==""||typeof(STATION_NAME)=="undefined"){
			
			var content = "{'STATION_ID':'" + STATION_ID + "','COMPANY_ID':'"+COMPANY_ID+"'}";
			var getPerson = function(res) {
				var arr=res.rows;
		    	var data="[";
		   		for(var i=0;i<arr.length;i++){
		   			if(i!=arr.length-1){
		   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'},";
		   			}else{
		   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'}";
		   			}
		   		 }
		   		data+=",{'vaule':'','text':'司级人员'}]";
		    	var str = eval(data);
		    	
		    	var arr2=res.rows2;
		    	var data="[";
		   		for(var i=0;i<arr2.length;i++){
		   			if(i!=arr2.length-1){
		   				data+="{'value':'"+arr2[i].PERSON_ID+"','text':'"+arr2[i].PERSON_NAME+"'},";
		   			}else{
		   				data+="{'value':'"+arr2[i].PERSON_ID+"','text':'"+arr2[i].PERSON_NAME+"'}";
		   			}
		   		 }
		   		data+=",{'vaule':'','text':'司级人员'}]";
		    	var str2 = eval(data);
				
				Ext.getCmp('FHF_STATION_ID').setOptions(str);
				Ext.getCmp('FHF_STATION_ID').setValue(str[0].value);
				Ext.getCmp('person').setOptions(str2);
			};
			this.connectServer(getPerson,'zhuanPaiAction.do?method=toSearch2', content);

		}else{
			
			var getResult = function(res) {
				var arr=res.rows;
				var data="[";
				for(var i=0;i<arr.length;i++){
					if(i!=arr.length-1){
						data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'},";
					}else{
						data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'}";
					}
				}
				data+=",{'vaule':'','text':'司级人员'}]";
				var str = eval(data);
				
				Ext.getCmp('FHF_STATION_ID').setOptions(str);
				Ext.getCmp('FHF_STATION_ID').setValue(str[0].value);
				
			};
			if(STATION_ID==undefined){
				STATION_ID='';
			};
			var content = "{'STATION_ID':'" + STATION_ID + "','COMPANY_ID':'" + COMPANY_ID +"'}";
			this.connectServer(getResult,'zhuanPaiAction.do?method=toSearch2', content);
		}
		
		


	},
});