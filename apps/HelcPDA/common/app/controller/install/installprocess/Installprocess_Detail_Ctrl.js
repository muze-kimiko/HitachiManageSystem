var isCome = true;
var step={
		"ZT_FX":"",
		"ZT_CJ":"",
		"ZT_JF":"",
		"ZT_GZJ":"",
		"ZT_TBMT":"",
		"ZT_TJSMT":"",
		"ZT_DQJX":"",
		"ZT_JDPJCC":"",
		"ZT_GHCSN":"",
		"ZT_DLDY":"",
		"FT_BJ":"",
		"FT_BLCB":"",
		"FT_BLM":"",
		"FT_DGDL":"",
		"FT_DLDY":"",
		"FT_DQJX":"",
		"FT_FSDZJ":"",
		"FT_HJYJ":"",
		"FT_NGB":"",
		"FT_QB":"",
		"FT_WGB":"",
};

Ext.define('HelcPDA.controller.install.installprocess.Installprocess_Detail_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//安装组长list
			"list#InstllZzNameList":{
				itemtap:'InstllZzNameList'
			},
			//中间检人员list
			"list#ZjjPersonList":{
				itemtap:'ZjjPersonList'
			},
			//安装服务商list
			"list#InstllVendorNameList":{
				itemtap:'InstllVendorNameList'
			},
			//搭棚服务商list
			"list#BuildVendorNameList":{
				itemtap:'BuildVendorNameList'
			},
			//吊装服务商list
			"list#VendorNameList":{
				itemtap:'VendorNameList'
			},
			"list#BuildPersonNameList":{
				itemtap:'BuildPersonNameList'
			},
			"list#InstPersonNameList":{
				itemtap:'InstPersonNameList'
			},
			"hiddenfield#ipd_INSTLL_VENDOR_ID":{
				change:'ipd_INSTLL_VENDOR_ID'
			},
			"hiddenfield#ipd_BUILD_VENDOR_ID":{
				change:'ipd_BUILD_VENDOR_ID'
			},
			"hiddenfield#ipd_SUSPEND_VENDOR_ID":{
				change:'ipd_SUSPEND_VENDOR_ID'
			},
			"selectfield#ipd_BUILD_PERSON":{
				change:'ipd_BUILD_PERSON'
			},
			"selectfield#ipd_INST_PERSON":{
				change:'ipd_INST_PERSON'
			},
			//查看工号详细
			"list#GH_list":{
				itemtap:'GH_list'
			},
			"button#btn_search_build_vendor":{
				tap:'btn_search_build_vendor'
			},
			"button#btn_search_instll_vendor":{
				tap:'btn_search_instll_vendor'
			},
			"button#btn_search_SUSPEND_VENDOR":{
				tap:'btn_search_SUSPEND_VENDOR'
			},
			//返回到工号列表
			"button#back_to_GHList":{
				tap:'back_to_GHList'
			},
			"button#btn_ipd_ZJJperson":{
				tap:'btn_ipd_ZJJperson'
			},
			"button#btn_add_instllperson":{
				tap:'btn_add_instllperson'
			},
			"button#ipd_btn_search_ZZ":{
				tap:'ipd_btn_search_ZZ'
			},
			//显示吊装搭棚部分输入项
			"button#show_ipd_DZDP":{
				tap:'show_ipd_DZDP'
			},
			//显示安装部分输入项
			"button#show_ipd_AZ":{
				tap:'show_ipd_AZ'
			},
			//显示进场部分输入项
			"button#show_ipd_JC":{
				tap:'show_ipd_JC'
			},
			//显示安装工序（直梯）
			"button#show_ipd_GZ":{
				tap:'show_ipd_GZ'
			},
			//显示安装工序（直梯批量）
			"button#show_ipd_GZ_PL":{
				tap:'show_ipd_GZ_PL'
			},
			//显示安装工序（扶梯）
			"button#show_ipd_FTGZ":{
				tap:'show_ipd_FTGZ'
			},
			"list#InstllPersonNameList":{
				itemtap:'InstllPersonNameList'
			}
		},
	},
	//点击安装组人员列表，把数据放在页面上
	InstllZzNameList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var InstllZzNameListPanel=Ext.getCmp('InstllZzNameListPanel');
    	if(InstllZzNameListPanel){
    		InstllZzNameListPanel.destroy();
    	}
    	
    	var InstllZzNameStore=obj.getStore('InstllZzNameStore','HelcPDA.store.install.installprocess.InstllZzNameStore');  
		  
   	    var EBS_FULL_NAME=InstllZzNameStore.getAt(index).get('EBS_FULL_NAME'); 
   	    var EBS_PERSON_ID=InstllZzNameStore.getAt(index).get('EBS_PERSON_ID'); 
   	    Ext.getCmp('ipd_ZZ').setValue(EBS_FULL_NAME);
	    Ext.getCmp('ipd_INSTALL_HEADER_ID').setValue(EBS_PERSON_ID);
	},
	
	//查找安装组长
	ipd_btn_search_ZZ : function(){
		var obj = this;
		var person_name = Ext.getCmp('ipd_search_ZZ').getValue();
		contentdata={person_name:person_name};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			var InstllZzNameListPanel=Ext.getCmp('InstllZzNameListPanel');
        	if(InstllZzNameListPanel){
        		InstllZzNameListPanel.destroy();
        	}
        	if(res.person_name.length==0){
    			WL.Toast.show("找不到对应名字的人员");
    			return;
    		}else{
    			if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'InstllZzNameListPanel',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		            	items:[{
            		            		xtype:'list',     		
            		            		id:'InstllZzNameList',
            		            		store:'InstllZzNameStore',
            		            		height:300,
            		            		width:400,
            		            		itemTpl:[
            		            		         '<div>{EBS_FULL_NAME}<div>'
            		            		         ]
            		            	}] 
            		            }]
            	});
            		
            			lists.show();
            	}
    		}
        
        	var InstllZzNameStore=obj.getStore('InstllZzNameStore','HelcPDA.store.install.installprocess.InstllZzNameStore');
    		var str=res.person_name;
    		InstllZzNameStore.setData(str);
		};
		
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchPerson_tl', content);
	},
	
	
	//点击中间检人员列表，把数据放在页面上
	ZjjPersonList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var ZjjPersonPanel=Ext.getCmp('ZjjPersonPanel');
    	if(ZjjPersonPanel){
    		ZjjPersonPanel.destroy();
    	}
    	
    	var ZjjPersonStore=obj.getStore('ZjjPersonStore','HelcPDA.store.install.installprocess.ZjjPersonStore');  
		  
   	    var EBS_FULL_NAME=ZjjPersonStore.getAt(index).get('EBS_FULL_NAME'); 
   	    var EBS_PERSON_ID=ZjjPersonStore.getAt(index).get('EBS_PERSON_ID'); 
	    Ext.getCmp('ipd_ZjjPersion').setValue(EBS_FULL_NAME);
	    Ext.getCmp('ipd_MID_CHECK_PERSON_ID').setValue(EBS_PERSON_ID);
	},
	
	//查找中间检人员
	btn_ipd_ZJJperson : function(){
		var obj = this;
		var person_name = Ext.getCmp('ipd_ZJJperson').getValue();
		contentdata={person_name:person_name};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			var ZjjPersonPanel=Ext.getCmp('ZjjPersonPanel');
        	if(ZjjPersonPanel){
        		ZjjPersonPanel.destroy();
        	}
        	if(res.person_name.length==0){
    			WL.Toast.show("找不到对应名字的人员");
    			return;
    		}else{
    			if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'ZjjPersonPanel',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		            	items:[{
            		            		xtype:'list',     		
            		            		id:'ZjjPersonList',
            		            		store:'ZjjPersonStore',
            		            		height:300,
            		            		width:400,
            		            		itemTpl:[
            		            		         '<div>{EBS_FULL_NAME}_{EBS_EMPLOYEE_NUMBER}<div>'
            		            		         ]
            		            	}] 
            		            }]
            	});
            		lists.show();
            	}
    		}
        	var ZjjPersonStore=obj.getStore('ZjjPersonStore','HelcPDA.store.install.installprocess.ZjjPersonStore');
			ZjjPersonStore.setData(res.person_name);
		};
		
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchPerson', content);
	},
	
	//添加安装人员
	btn_add_instllperson : function(){
		var InstllPersonNameStore=this.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
		var instllPersonlist = InstllPersonNameStore.data.items;
		var ipd_INSTLL_PERSON=Ext.getCmp("ipd_INSTLL_PERSON").getValue();
		var PERSON_NAME = null;
		var Options = Ext.getCmp("ipd_INSTLL_PERSON").getOptions();
		for(var i=0;i<Options.length;i++){
			if(ipd_INSTLL_PERSON == Options[i].value){
				PERSON_NAME = Options[i].text;
				INSTLL_PERSON_ID = Options[i].value;
			}
		}
		
		var new_ipd_PLAN_START= Ext.Date.format(Ext.getCmp('ipd_PLAN_START').getValue(),'Y-m-d');
		var new_ipd_PLAN_END= Ext.Date.format(Ext.getCmp('ipd_PLAN_END').getValue(),'Y-m-d');
		
		var new_data =[];
		var new_PERSON_NAME = PERSON_NAME;
		var new_INSTLL_PERSON_ID = INSTLL_PERSON_ID;
		if(new_PERSON_NAME == null ||new_PERSON_NAME==""){
		}else{
			var length_ = instllPersonlist.length;
			for(var i=0;i<length_;i++){
				var newdata_item = {};
				var PERSON_NAME = instllPersonlist[i].data.PERSON_NAME;
				var INSTLL_PERSON_ID = instllPersonlist[i].data.INSTLL_PERSON_ID;
				var PLAN_START = instllPersonlist[i].data.PLAN_START;
				var PLAN_END = instllPersonlist[i].data.PLAN_END;
				
				if(new_PERSON_NAME == instllPersonlist[i].data.PERSON_NAME){
					WL.Toast.show("该人员已添加"); 
					return;
				}else{
					newdata_item.PERSON_NAME = PERSON_NAME; 
					newdata_item.INSTLL_PERSON_ID = INSTLL_PERSON_ID; 
					newdata_item.PLAN_START = PLAN_START; 
					newdata_item.PLAN_END = PLAN_END; 
					new_data[i]=newdata_item;
				}
			}
			
			new_data[length_] ={PERSON_NAME:new_PERSON_NAME,INSTLL_PERSON_ID:new_INSTLL_PERSON_ID,PLAN_START:new_ipd_PLAN_START,PLAN_END:new_ipd_PLAN_END};
			instllPersonlist = new_data; 
			InstllPersonNameStore.setData(instllPersonlist);
		}
	},
	
	
	//删除安装人员
	InstllPersonNameList : function(obj, index, target, record, e, eOpts ){
		var InstllPersonNameStore=this.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
		var instllPersonlist = InstllPersonNameStore.data.items;
		if(event.target.id=="1"){
			navigator.notification.confirm('删除信息？',function(btn){
	 			if(btn ==2){
	 				InstllPersonNameStore.removeAt(index);
					instllPersonlist.splice(index, 1);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			Ext.Msg.confirm('你好','删除信息？',function(btn){
//				if (btn == 'yes'){
//					InstllPersonNameStore.removeAt(index);
//					instllPersonlist.splice(index, 1);
//				}else{
//					return;
//				}
//			});
		}
	},
	
	//删除搭棚人员
	BuildPersonNameList : function(obj, index, target, record, e, eOpts ){
		var BuildPersonNameStore=this.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
		var buildPersonlist = BuildPersonNameStore.data.items;
		if(event.target.id=="2"){
//			navigator.notification.confirm('删除信息？',function(btn){
//	 			if(btn ==2){
//	 				BuildPersonNameStore.removeAt(index);
//					buildPersonlist.splice(index, 1);
//	 			}else{
//	 				return;
//	 			}
//	 		},"提示","取消,确定");
			Ext.Msg.confirm('你好','删除信息？',function(btn){
				if (btn == 'yes'){
					BuildPersonNameStore.removeAt(index);
					buildPersonlist.splice(index, 1);
				}else{
					return;
				}
			});
		}
	},
	
	//删除吊装人员
	InstPersonNameList : function(obj, index, target, record, e, eOpts ){
		var InstPersonNameStore=this.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
		var instPersonlist = InstPersonNameStore.data.items;
		if(event.target.id=="1"){
			navigator.notification.confirm('删除信息？',function(btn){
	 			if(btn ==2){
	 				InstPersonNameStore.removeAt(index);
					instPersonlist.splice(index, 1);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			Ext.Msg.confirm('你好','删除信息？',function(btn){
//				if (btn == 'yes'){
//					InstPersonNameStore.removeAt(index);
//					instPersonlist.splice(index, 1);
//				}else{
//					return;
//				}
//			});
		}
	},
	
	//选择搭棚人员后添加到list
	ipd_BUILD_PERSON : function(){
		var BuildPersonNameStore=this.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
		var buildPersonlist = BuildPersonNameStore.data.items;
		var ipd_BUILD_PERSON=Ext.getCmp("ipd_BUILD_PERSON").getValue();
		var PERSON_NAME = null;
		var buildflg = 0;
		if(typeof(Ext.getCmp('ipd_buildflg'))=="undefined"){
			buildflg = Ext.getCmp('ipd_batch_buildflg').getValue();
		}else{
			buildflg = Ext.getCmp('ipd_buildflg').getValue();
		}		
		if(buildflg>0){
			var Options = Ext.getCmp("ipd_BUILD_PERSON").getOptions();
			for(var i=0;i<Options.length;i++){
				if(ipd_BUILD_PERSON == Options[i].value){
					PERSON_NAME = Options[i].text;
					BUILD_PERSON_ID	= Options[i].value;
				}
			}
			var new_data =[];
			var new_PERSON_NAME = PERSON_NAME;
			var new_BUILD_PERSON_ID = BUILD_PERSON_ID;
			if(new_PERSON_NAME == null ||new_PERSON_NAME==""){
			}else{
				var length_ = buildPersonlist.length;
				for(var i=0;i<length_;i++){
					var newdata_item = {};
					var PERSON_NAME = buildPersonlist[i].data.PERSON_NAME;
					var BUILD_PERSON_ID = buildPersonlist[i].data.BUILD_PERSON_ID;
					
					if(new_PERSON_NAME == buildPersonlist[i].data.PERSON_NAME){
						WL.Toast.show("该人员已添加"); 
						return;
					}else{
						newdata_item.PERSON_NAME = PERSON_NAME; 
						newdata_item.BUILD_PERSON_ID = BUILD_PERSON_ID; 
						new_data[i]=newdata_item;
					}
				}
				
				new_data[length_] ={PERSON_NAME:new_PERSON_NAME,BUILD_PERSON_ID:new_BUILD_PERSON_ID};
				buildPersonlist = new_data; 
				BuildPersonNameStore.setData(buildPersonlist);
			}
		}else{
			buildflg++;
			if(typeof(Ext.getCmp('ipd_buildflg'))=="undefined"){
				Ext.getCmp('ipd_batch_buildflg').setValue("1");
			}else{
				Ext.getCmp('ipd_buildflg').setValue("1");
			}
		}
	},
	
	//选择吊装人员后添加到list
	ipd_INST_PERSON : function(){
		var InstPersonNameStore=this.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
		var ipd_INST_PERSON=Ext.getCmp("ipd_INST_PERSON").getValue();
		var PERSON_NAME = null;
		var flg = 0;
		if(typeof(Ext.getCmp('ipd_flg'))=="undefined"){
			flg = Ext.getCmp('ipd_batch_flg').getValue();
		}else{
			flg = Ext.getCmp('ipd_flg').getValue();
		}
		if(flg>0){
			var Options = Ext.getCmp("ipd_INST_PERSON").getOptions();
			for(var i=0;i<Options.length;i++){
				if(ipd_INST_PERSON == Options[i].value){
					PERSON_NAME = Options[i].text;
					INST_PERSON_ID	 = Options[i].value;
				}
			}
			var new_data =[];
			var new_PERSON_NAME = PERSON_NAME;
			var new_INST_PERSON_ID = INST_PERSON_ID;
			if(new_PERSON_NAME == null ||new_PERSON_NAME==""){
			}else{
				var instPersonlist = InstPersonNameStore.data.items;
				var length_ = instPersonlist.length;
		    	for(var i=0;i<length_;i++){
		    		var newdata_item = {};
		    		var PERSON_NAME = instPersonlist[i].data.PERSON_NAME;
		    		var INST_PERSON_ID = instPersonlist[i].data.INST_PERSON_ID;
			    	
		    			if(new_PERSON_NAME == instPersonlist[i].data.PERSON_NAME){
				    		WL.Toast.show("该人员已添加"); 
				    		return;
			    		}else{
			    			newdata_item.PERSON_NAME = PERSON_NAME; 
			    			newdata_item.INST_PERSON_ID = INST_PERSON_ID; 
				    		new_data[i]=newdata_item;
			    		}
		    	}
		    	
		    	new_data[length_] ={PERSON_NAME:new_PERSON_NAME,INST_PERSON_ID:new_INST_PERSON_ID};
		    	instPersonlist = new_data; 
		    	InstPersonNameStore.setData(instPersonlist);
			}
		}else{
			flg++;
			if(typeof(Ext.getCmp('ipd_flg'))=="undefined"){
				Ext.getCmp('ipd_batch_flg').setValue("1");
			}else{
				Ext.getCmp('ipd_flg').setValue("1");
			}
		}
	},
	
	//安装服务商改变的时候，安装人员相应的改变
	ipd_INSTLL_VENDOR_ID : function(eOpts,newValue, oldValue){
		var content = "{'vendor_id':'" + newValue + "'}";
		var getResult=function(res){
			var person_name=res.person_name;
			var IDS = person_name.IDS;
			var NAMES = person_name.NAMES;
			var ids = IDS.split('-');
			var names = NAMES.split('-');
			var data="[";
			for(var i=0;i<ids.length;i++){
				if(i!=ids.length-1){
					data+="{'value':'"+ids[i]+"','text':'"+names[i]+"'},";
				}else{
					data+="{'value':'"+ids[i]+"','text':'"+names[i]+"'}";
				}
			}
			data+="]";
			var str = eval(data);
			Ext.getCmp('ipd_INSTLL_PERSON').setOptions(str);
			
		};
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchIntPerson', content);
	},
	//搭棚服务商改变的时候，搭棚人员相应的改变
	ipd_BUILD_VENDOR_ID : function(eOpts,newValue, oldValue){
		var content = "{'vendor_id':'" + newValue + "'}";
		var getResult=function(res){
			var person_name=res.person_name;
			var IDS = person_name.IDS;
			var NAMES = person_name.NAMES;
			var ids = IDS.split('-');
			var names = NAMES.split('-');
			var data="[";
			for(var i=0;i<ids.length;i++){
				if(i!=ids.length-1){
					data+="{'value':'"+ids[i]+"','text':'"+names[i]+"'},";
				}else{
					data+="{'value':'"+ids[i].TCD_CODE+"','text':'"+names[i]+"'}";
				}
			}
			data+="]";
			var str = eval(data);
			Ext.getCmp('ipd_BUILD_PERSON').setOptions(str);
			
		};
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchIntPerson', content);
	},
	
	//吊装服务商改变的时候，吊装人员相应的改变
	ipd_SUSPEND_VENDOR_ID : function(eOpts,newValue, oldValue){
		var content = "{'vendor_id':'" + newValue + "'}";
	  	var getResult=function(res){
	       	 var person_name=res.person_name;
	       	 var IDS = person_name.IDS;
	       	 var NAMES = person_name.NAMES;
	       	 var ids = IDS.split('-');
	       	 var names = NAMES.split('-');
	       	 var data="[";
	         for(var i=0;i<ids.length;i++){
	        	 if(i!=ids.length-1){
	        		 data+="{'value':'"+ids[i]+"','text':'"+names[i]+"'},";
	        	 }else{
		   			 data+="{'value':'"+ids[i].TCD_CODE+"','text':'"+names[i]+"'}";
	 	   			}
	         }
	         data+="]";
	         var str = eval(data);
	         Ext.getCmp('ipd_INST_PERSON').setOptions(str);
	  		
	  	};
	  	this.connectServer(getResult, 'installProcessAction.do?method=toSearchIntPerson', content);
	},
	
	//点击安装服务商列表，把数据放在页面上
	InstllVendorNameList : function(obj,index,target,record,e,eOpts){
		var InstllvendorlistPanel=Ext.getCmp('InstllvendorlistPanel');
		if(InstllvendorlistPanel){
			InstllvendorlistPanel.destroy();
		}
		
		var InstllVendorNameStore=this.getStore('InstllVendorNameStore','HelcPDA.store.install.installprocess.InstllVendorNameStore');  
		
		var VENDOR_NAME=InstllVendorNameStore.getAt(index).get('VENDOR_NAME'); 
		var VENDOR_ID=InstllVendorNameStore.getAt(index).get('VENDOR_ID'); 
		Ext.getCmp('ipd_INSTLL_VENDOR').setValue(VENDOR_NAME);
		Ext.getCmp('ipd_INSTLL_VENDOR_ID').setValue(VENDOR_ID);
	},
	//点击搭棚服务商列表，把数据放在页面上
	BuildVendorNameList : function(obj,index,target,record,e,eOpts){
		var BuildvendorlistPanel=Ext.getCmp('BuildvendorlistPanel');
    	if(BuildvendorlistPanel){
    		BuildvendorlistPanel.destroy();
    	}
    	
    	var BuildVendorNameStore=this.getStore('BuildVendorNameStore','HelcPDA.store.install.installprocess.BuildVendorNameStore');  
		  
   	    var VENDOR_NAME=BuildVendorNameStore.getAt(index).get('VENDOR_NAME'); 
   	    var VENDOR_ID=BuildVendorNameStore.getAt(index).get('VENDOR_ID'); 
	    Ext.getCmp('ipd_BUILD_VENDOR').setValue(VENDOR_NAME);
	    Ext.getCmp('ipd_BUILD_VENDOR_ID').setValue(VENDOR_ID);
	},
	
	//点击吊装服务商列表，把数据放在页面上
	VendorNameList : function(obj,index,target,record,e,eOpts){
		var vendorlistPanel=Ext.getCmp('vendorlistPanel');
    	if(vendorlistPanel){
    		vendorlistPanel.destroy();
    	}
    	
    	var InstVendorNameStore=this.getStore('InstVendorNameStore','HelcPDA.store.install.installprocess.InstVendorNameStore');  
		  
   	    var VENDOR_NAME=InstVendorNameStore.getAt(index).get('VENDOR_NAME'); 
   	    var VENDOR_ID=InstVendorNameStore.getAt(index).get('VENDOR_ID'); 
	    Ext.getCmp('ipd_InstSUSPEND_VENDOR').setValue(VENDOR_NAME);
	    Ext.getCmp('ipd_SUSPEND_VENDOR_ID').setValue(VENDOR_ID);
	},
	
	//查询安装服务商
	btn_search_instll_vendor : function(){
		var obj = this;
		var vendor_name = Ext.getCmp('search_instll_vendor').getValue();
		contentdata={inst_person_id:init_person_id,vendor_name:vendor_name};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			var InstllvendorlistPanel=Ext.getCmp('InstllvendorlistPanel');
			if(InstllvendorlistPanel){
				InstllvendorlistPanel.destroy();
			}
			if(res.vendor_name.length==0){
    			WL.Toast.show("找不到对应名字的安装服务商");
    			return;
    		}else{
    			if(!lists){
    				var lists=Ext.Viewport.add({
    					xtype:'panel',
    					id:'InstllvendorlistPanel',
    					height:300,
    					width:400,
    					modal: true,
    					hideOnMaskTap: true,
    					centered: true,
    					items:[
    					       {xtype:'fieldset',
    					    	   height:300,
    					    	   width:400,
    					    	   items:[{
    					    		   xtype:'list',     		
    					    		   id:'InstllVendorNameList',
    					    		   store:'InstllVendorNameStore',
    					    		   height:300,
    					    		   width:400,
    					    		   itemTpl:[
    					    		            '<div>{VENDOR_NAME}<div>'
    					    		            ]
    					    	   }] 
    					       }]
    				});
    				lists.show();
    			}
    		}
			
			var InstllVendorNameStore=obj.getStore('InstllVendorNameStore','HelcPDA.store.install.installprocess.InstllVendorNameStore');
			var str=res.vendor_name;
			InstllVendorNameStore.setData(str);
		};
		
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchVendor', content);
	},
	
	
	//查询搭棚服务商
	btn_search_build_vendor : function(){
		var obj = this;
		var vendor_name = Ext.getCmp('search_build_vendor').getValue();
		contentdata={inst_person_id:init_person_id,vendor_name:vendor_name};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			var BuildvendorlistPanel=Ext.getCmp('BuildvendorlistPanel');
        	if(BuildvendorlistPanel){
        		BuildvendorlistPanel.destroy();
        	}
        	if(res.vendor_name.length==0){
    			WL.Toast.show("找不到对应名字的搭棚服务商");
    			return;
    		}else{
    			if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'BuildvendorlistPanel',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		             items:[{
            		            	xtype:'list',     		
         		        		    id:'BuildVendorNameList',
         		        		    store:'BuildVendorNameStore',
         		        		    height:300,
         		        		    width:400,
         		        		    itemTpl:[
         		        		            '<div>{VENDOR_NAME}<div>'
         		        		            ]
            		            }] 
            		            }]
            	});
            		lists.show();
            	}
    		}
        
        	var BuildVendorNameStore=obj.getStore('BuildVendorNameStore','HelcPDA.store.install.installprocess.BuildVendorNameStore');
    		var str=res.vendor_name;
    		BuildVendorNameStore.setData(str);
		};
		
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchVendor', content);
	},
	
	
	//查询吊装服务商
	btn_search_SUSPEND_VENDOR : function(){
		var obj = this;
		var vendor_name = Ext.getCmp('search_SUSPEND_VENDOR').getValue();
		contentdata={inst_person_id:init_person_id,vendor_name:vendor_name};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			var vendorlistPanel=Ext.getCmp('vendorlistPanel');
        	if(vendorlistPanel){
        		vendorlistPanel.destroy();
        	}
        	if(res.vendor_name.length==0){
    			WL.Toast.show("找不到对应名字的吊装服务商");
    			return;
    		}else{
    			if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'vendorlistPanel',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		             items:[{
            		            	xtype:'list',     		
         		        		    id:'VendorNameList',
         		        		    store:'InstVendorNameStore',
         		        		    height:300,
         		        		    width:400,
         		        		    itemTpl:[
         		        		            '<div>{VENDOR_NAME}<div>'
         		        		            ]
            		            }] 
            		            }]
            	});
            		lists.show();
            	}
    		}
        
        	var InstVendorNameStore=obj.getStore('InstVendorNameStore','HelcPDA.store.install.installprocess.InstVendorNameStore');
    		var str=res.vendor_name;
    		InstVendorNameStore.setData(str);
		};
		
		this.connectServer(getResult, 'installProcessAction.do?method=toSearchVendor', content);
	},
	
	//返回到工号列表
	back_to_GHList : function(){
		if(typeof(Ext.getCmp('ipd_ENGCONTRACT_NUMBER'))=="undefined"){
			this.showBackView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
			return;
		}
		ipd_ENGCONTRACT_NUMBER = Ext.getCmp('ipd_ENGCONTRACT_NUMBER').getValue();
		this.getApplication().getController('install.installprocess.Installprocess_List_Ctrl').LoadGHlist(ipd_ENGCONTRACT_NUMBER);
		this.showBackView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
		
	},
	
	show_ipd_DZDP : function(){
		//吊搭
		if(Ext.getCmp('ipd_DZ_fieldset').getHidden()==true){
			Ext.getCmp('ipd_DP_fieldset').setHidden(false);
			Ext.getCmp('ipd_DDBZ_fieldset').setHidden(false);
			Ext.getCmp('ipd_DZ_fieldset').setHidden(false);
			Ext.getCmp('show_ipd_DZDP').setText('隐藏其他输入项');
		}else{
			Ext.getCmp('ipd_DP_fieldset').setHidden(true);
			Ext.getCmp('ipd_DDBZ_fieldset').setHidden(true);
			Ext.getCmp('ipd_DZ_fieldset').setHidden(true);
			Ext.getCmp('show_ipd_DZDP').setText('显示其他输入项');
		}
		
	},

	show_ipd_AZ : function(){
		//安装
		if(Ext.getCmp('ipd_PF_fieldset').getHidden()==true){
			Ext.getCmp('ipd_PF_fieldset').setHidden(false);
			Ext.getCmp('ipd_ZJJ_fieldset').setHidden(false);
			Ext.getCmp('ipd_GJJ_fieldset').setHidden(false);
			Ext.getCmp('ipd_CB1_fieldset').setHidden(false);
			Ext.getCmp('ipd_CB2_fieldset').setHidden(false);
			Ext.getCmp('ipd_CB3_fieldset').setHidden(false);
			Ext.getCmp('ipd_CB4_fieldset').setHidden(false);
			Ext.getCmp('ipd_CB5_fieldset').setHidden(false);
			Ext.getCmp('ipd_AZZZ_fieldset').setHidden(false);
			Ext.getCmp('show_ipd_AZ').setText('隐藏其他输入项');
		}else{
			Ext.getCmp('ipd_PF_fieldset').setHidden(true);
			Ext.getCmp('ipd_ZJJ_fieldset').setHidden(true);
			Ext.getCmp('ipd_GJJ_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB1_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB2_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB3_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB4_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB5_fieldset').setHidden(true);
			Ext.getCmp('ipd_AZZZ_fieldset').setHidden(true);
			Ext.getCmp('show_ipd_AZ').setText('显示其他输入项');
		}
	},
	
	show_ipd_JC : function(){
		if(Ext.getCmp('ipd_JC_fieldset').getHidden()==true){
			Ext.getCmp('ipd_JC_fieldset').setHidden(false);
			Ext.getCmp('show_ipd_JC').setText('隐藏其他输入项');
		}else{
			Ext.getCmp('ipd_JC_fieldset').setHidden(true);
			Ext.getCmp('show_ipd_JC').setText('显示其他输入项');
		}
	},
	
	show_ipd_GZ : function(){
		if(Ext.getCmp('ZT_FX').getHidden()==true){
			Ext.getCmp('ZT_FX').setHidden(false);
			Ext.getCmp('ZT_CJ').setHidden(false);
			Ext.getCmp('ZT_JF').setHidden(false);
			Ext.getCmp('ZT_GZJ').setHidden(false);
			Ext.getCmp('ZT_TBMT').setHidden(false);
			Ext.getCmp('ZT_TJSMT').setHidden(false);
			Ext.getCmp('ZT_DQJX').setHidden(false);
			Ext.getCmp('ZT_JDPJCC').setHidden(false);
			Ext.getCmp('ZT_GHCSN').setHidden(false);
			Ext.getCmp('ZT_DLDY').setHidden(false);
			Ext.getCmp('show_ipd_GZ').setText('隐藏其他工序');
		}else{
			Ext.getCmp('ZT_FX').setHidden(true);
			Ext.getCmp('ZT_CJ').setHidden(true);
			Ext.getCmp('ZT_JF').setHidden(true);
			Ext.getCmp('ZT_GZJ').setHidden(true);
			Ext.getCmp('ZT_TBMT').setHidden(true);
			Ext.getCmp('ZT_TJSMT').setHidden(true);
			Ext.getCmp('ZT_DQJX').setHidden(true);
			Ext.getCmp('ZT_JDPJCC').setHidden(true);
			Ext.getCmp('ZT_GHCSN').setHidden(true);
			Ext.getCmp('ZT_DLDY').setHidden(true);
			Ext.getCmp('show_ipd_GZ').setText('显示其他工序');
		}
	},
	
	// 批量工序隐藏显示
	show_ipd_GZ_PL : function(){
		if(Ext.getCmp('ZT_FX').getHidden()==true){
			Ext.getCmp('ZT_FX').setHidden(false);
			Ext.getCmp('ZT_CJ').setHidden(false);
			Ext.getCmp('ZT_JF').setHidden(false);
			Ext.getCmp('ZT_GZJ').setHidden(false);
			Ext.getCmp('ZT_TBMT').setHidden(false);
			Ext.getCmp('ZT_TJSMT').setHidden(false);
			Ext.getCmp('ZT_DQJX').setHidden(false);
			Ext.getCmp('ZT_JDPJCC').setHidden(false);
			Ext.getCmp('ZT_GHCSN').setHidden(false);
			Ext.getCmp('ZT_DLDY').setHidden(false);
			Ext.getCmp('show_ipd_GZ_PL').setText('隐藏其他工序');
		}else{
			Ext.getCmp('ZT_FX').setHidden(true);
			Ext.getCmp('ZT_CJ').setHidden(true);
			Ext.getCmp('ZT_JF').setHidden(true);
			Ext.getCmp('ZT_GZJ').setHidden(true);
			Ext.getCmp('ZT_TBMT').setHidden(true);
			Ext.getCmp('ZT_TJSMT').setHidden(true);
			Ext.getCmp('ZT_DQJX').setHidden(true);
			Ext.getCmp('ZT_JDPJCC').setHidden(true);
			Ext.getCmp('ZT_GHCSN').setHidden(true);
			Ext.getCmp('ZT_DLDY').setHidden(true);
			Ext.getCmp('show_ipd_GZ_PL').setText('显示其他工序');
		}
	},
	
	show_ipd_FTGZ : function(){
		if(Ext.getCmp('FT_BJ').getHidden()==true){
			Ext.getCmp('FT_BJ').setHidden(false);
			Ext.getCmp('FT_BLCB').setHidden(false);
			Ext.getCmp('FT_BLM').setHidden(false);
			Ext.getCmp('FT_DGDL').setHidden(false);
			Ext.getCmp('FT_DLDY').setHidden(false);
			Ext.getCmp('FT_DQJX').setHidden(false);
			Ext.getCmp('FT_FSDZJ').setHidden(false);
			Ext.getCmp('FT_HJYJ').setHidden(false);
			Ext.getCmp('FT_NGB').setHidden(false);
			Ext.getCmp('FT_QB').setHidden(false);
			Ext.getCmp('FT_WGB').setHidden(false);
			Ext.getCmp('show_ipd_FTGZ').setText('隐藏所有工序');
		}else{
			Ext.getCmp('FT_BJ').setHidden(true);
			Ext.getCmp('FT_BLCB').setHidden(true);
			Ext.getCmp('FT_BLM').setHidden(true);
			Ext.getCmp('FT_DGDL').setHidden(true);
			Ext.getCmp('FT_DLDY').setHidden(true);
			Ext.getCmp('FT_DQJX').setHidden(true);
			Ext.getCmp('FT_FSDZJ').setHidden(true);
			Ext.getCmp('FT_HJYJ').setHidden(true);
			Ext.getCmp('FT_NGB').setHidden(true);
			Ext.getCmp('FT_QB').setHidden(true);
			Ext.getCmp('FT_WGB').setHidden(true);
			Ext.getCmp('show_ipd_FTGZ').setText('显示所有工序');
		}
	},
	
	
	
	
	//查看工号详细
	GH_list : function(obj, index, target, record, e, eOpts ){
		isCome = true;
		var obj = this;
		var ProcessGHStore = obj.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		
		if(event.target.id!="ipd_ENO_Checkbox"){
			obj.NextView('installProcess_Detail_V','HelcPDA.view.install.installprocess.InstallProcess_Detail_V');
			myLoading.hide();
			//左右滑动页签
			var ipd_tab = Ext.getCmp('ipd_tab'); 
			//左右滑动页签
			var i =0;
			Ext.get('ipd_tab').on('swipe',function(e,t){
				
				if (e.direction === 'left' && e.distance >= 20) {
					ipd_tab.setActiveItem(ipd_tab.innerItems[i+1]);
					i++;
			    } else if (e.direction === 'right' && e.distance >= 20) {
			    	ipd_tab.setActiveItem(ipd_tab.innerItems[i-1]);
			    	i--;
			    }
			});
			
			ipd_tab.addListener('activeitemchange',function(obj,value,oldValue,eOpts  ){
				var itemId = value.id;
				if (itemId == 'ipd_CKSJ') {
					i=0;
				}else if (itemId == 'ipd_DZDP') {
					i=1;
				}else if (itemId == 'ipd_ENTER_container') {
					i=2;
				}else if (itemId == 'ipd_INSTALL_container') {
					i=3;
				}
			},this,{
			});
			
			Ext.getCmp('ipd_flg').setValue("0");
			Ext.getCmp('ipd_buildflg').setValue("0");
			
			//设置页面隐藏部分选项
			//吊搭
			Ext.getCmp('ipd_DZ_fieldset').setHidden(true);
			Ext.getCmp('ipd_DP_fieldset').setHidden(true);
			Ext.getCmp('ipd_DDBZ_fieldset').setHidden(true);
			
			//进场
			Ext.getCmp('ipd_JC_fieldset').setHidden(true);
			//安装
			Ext.getCmp('ipd_PF_fieldset').setHidden(true);
			Ext.getCmp('ipd_ZJJ_fieldset').setHidden(true);
			Ext.getCmp('ipd_GJJ_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB1_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB2_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB3_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB4_fieldset').setHidden(true);
			Ext.getCmp('ipd_CB5_fieldset').setHidden(true);
			Ext.getCmp('ipd_AZZZ_fieldset').setHidden(true);
			
			//安装工序（直梯）
			Ext.getCmp('ZT_FX').setHidden(true);
			Ext.getCmp('ZT_CJ').setHidden(true);
			Ext.getCmp('ZT_JF').setHidden(true);
			Ext.getCmp('ZT_GZJ').setHidden(true);
			Ext.getCmp('ZT_TBMT').setHidden(true);
			Ext.getCmp('ZT_TJSMT').setHidden(true);
			Ext.getCmp('ZT_DQJX').setHidden(true);
			Ext.getCmp('ZT_JDPJCC').setHidden(true);
			Ext.getCmp('ZT_GHCSN').setHidden(true);
			Ext.getCmp('ZT_DLDY').setHidden(true);
			
			//安装工序（扶梯）
			Ext.getCmp('FT_BJ').setHidden(true);
			Ext.getCmp('FT_BLCB').setHidden(true);
			Ext.getCmp('FT_BLM').setHidden(true);
			Ext.getCmp('FT_DGDL').setHidden(true);
			Ext.getCmp('FT_DLDY').setHidden(true);
			Ext.getCmp('FT_DQJX').setHidden(true);
			Ext.getCmp('FT_FSDZJ').setHidden(true);
			Ext.getCmp('FT_HJYJ').setHidden(true);
			Ext.getCmp('FT_NGB').setHidden(true);
			Ext.getCmp('FT_QB').setHidden(true);
			Ext.getCmp('FT_WGB').setHidden(true);
			
			
			var ELEVATOR_NO=ProcessGHStore.getAt(index).get('ELEVATOR_NO');
			var SEQ_NUM=ProcessGHStore.getAt(index).get('SEQ_NUM');
			var WL_process=WL.JSONStore.get(collectionName);
			var query={tcode:init_person_id+"process",tid:ELEVATOR_NO+'_'+SEQ_NUM};
			var options={
		    		   exact:false,
		       }; 
		       
			WL_process.find(query,options).then(function(res){
				var data = res[0].json.stext;
				//查看数据
				Ext.getCmp('ipd_ENGCONTRACT_NUMBER').setValue(data.ENGCONTRACT_NUMBER);
				Ext.getCmp('ipd_ELEVATOR_NO').setValue(data.ELEVATOR_NO);
				Ext.getCmp('ipd_CUSTOMER_NAME').setValue(data.CUSTOMER_NAME);
				Ext.getCmp('ipd_INSTALL_ADDRESS').setValue(data.INSTALL_ADDRESS);
				Ext.getCmp('ipd_PRODUCE_TYPE').setValue(data.PRODUCE_TYPE);
				Ext.getCmp('ipd_SEQ_NUM').setValue(data.SEQ_NUM);
				Ext.getCmp('ipd_EQUIPMENT_NO').setValue(data.EQUIPMENT_NO);
				Ext.getCmp('ipd_CM_ELEVATOR_TYPE_NAME').setValue(data.CM_ELEVATOR_TYPE_NAME);
				Ext.getCmp('ipd_ELEVATOR_CLASS_NAME').setValue(data.ELEVATOR_CLASS_NAME);
				//吊装服务商
				if(data.VALUE.SUSPEND_VENDOR_ID==null||data.VALUE.SUSPEND_VENDOR_ID==""||typeof(data.VALUE.SUSPEND_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_dzNAME').setValue(data.dzNAME);
				}else{
					Ext.getCmp('ipd_dzNAME').setValue(data.VALUE.SUSPEND_VENDOR);
				}
				//搭棚服务商
				if(data.VALUE.BUILD_VENDOR_ID==null||data.VALUE.BUILD_VENDOR_ID==""||typeof(data.VALUE.BUILD_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_dpNAME').setValue(data.dpNAME);
				}else{
					Ext.getCmp('ipd_dpNAME').setValue(data.VALUE.BUILD_VENDOR);
				}
				//安装服务商
				if(data.VALUE.INST_VENDOR_ID==null||data.VALUE.INST_VENDOR_ID==""||typeof(data.VALUE.INST_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_dwNAME').setValue(data.dwNAME);
				}else{
					Ext.getCmp('ipd_dwNAME').setValue(data.VALUE.INST_VENDOR);
				}
				Ext.getCmp('ipd_BUDGET_INSTALL_METHOD').setValue(data.BUDGET_INSTALL_METHOD);
				var PARAM_C = data.PARAM_C;
				var PARAM_Z = data.PARAM_C;
				var PARAM_M = data.PARAM_C;
				var PARAM_C_Z_M = PARAM_C+'/'+PARAM_Z+'/'+PARAM_M;
				Ext.getCmp('ipd_PARAM_C_Z_M').setValue(PARAM_C_Z_M);
				Ext.getCmp('ipd_PARAM_ZZ').setValue(data.PARAM_ZZ);
				Ext.getCmp('ipd_PARAM_SD').setValue(data.PARAM_SD);
				Ext.getCmp('ipd_PARAM_TSGD').setValue(data.PARAM_TSGD);
				Ext.getCmp('ipd_PARAM_JDZG').setValue(data.PARAM_JDZG);
				if(data.INV_OUT_DATE==""||data.INV_OUT_DATE==null){
					Ext.getCmp('ipd_INV_OUT_DATE').setValue(null);
				}else{
					Ext.getCmp('ipd_INV_OUT_DATE').setValue(new Date(data.INV_OUT_DATE));
				}
				if(data.CCRQ==""||data.CCRQ==null){
					Ext.getCmp('ipd_CCRQ').setValue(null);
				}else{
					Ext.getCmp('ipd_CCRQ').setValue(new Date(data.CCRQ));
				}
				Ext.getCmp('ipd_ENGCONTRACT_TYPE').setValue(data.ENGCONTRACT_TYPE);
				//吊装搭棚
				var ipd_LIFT_START_DATE = null;
				if(data.VALUE.LIFT_START_DATE==null||data.VALUE.LIFT_START_DATE=="点击选择时间"||data.VALUE.LIFT_START_DATE==""){
					ipd_LIFT_START_DATE = Ext.getCmp('ipd_LIFT_START_DATE').setValue(null);
				}else{
					ipd_LIFT_START_DATE = Ext.getCmp('ipd_LIFT_START_DATE').setValue(new Date(data.VALUE.LIFT_START_DATE));
				}
				var ipd_LIFT_END_DATE = null;
				if(data.VALUE.LIFT_END_DATE==null||data.VALUE.LIFT_END_DATE=="点击选择时间"||data.VALUE.LIFT_END_DATE==""){
					ipd_LIFT_END_DATE = Ext.getCmp('ipd_LIFT_END_DATE').setValue(null);
				}else{
					ipd_LIFT_END_DATE = Ext.getCmp('ipd_LIFT_END_DATE').setValue(new Date(data.VALUE.LIFT_END_DATE));
				}
				var ipd_BUILD_START_DATE = null;
				if(data.VALUE.BUILD_START_DATE==null||data.VALUE.BUILD_START_DATE=="点击选择时间"||data.VALUE.BUILD_START_DATE==""){
					ipd_BUILD_START_DATE = Ext.getCmp('ipd_BUILD_START_DATE').setValue(null);
				}else{
					ipd_BUILD_START_DATE = Ext.getCmp('ipd_BUILD_START_DATE').setValue(new Date(data.VALUE.BUILD_START_DATE));
				}
				var ipd_BUILD_END_DATE = null;
				if(data.VALUE.BUILD_END_DATE==null||data.VALUE.BUILD_END_DATE=="点击选择时间"||data.VALUE.BUILD_END_DATE==""){
					ipd_BUILD_END_DATE = Ext.getCmp('ipd_BUILD_END_DATE').setValue(null);
				}else{
					ipd_BUILD_END_DATE = Ext.getCmp('ipd_BUILD_END_DATE').setValue(new Date(data.VALUE.BUILD_END_DATE));
				}
				//吊装服务商
				if(data.VALUE.SUSPEND_VENDOR_ID==null||data.VALUE.SUSPEND_VENDOR_ID==""||typeof(data.VALUE.SUSPEND_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_SUSPEND_VENDOR_ID').setValue(data.LIFT_VENDOR_ID);
					Ext.getCmp('ipd_InstSUSPEND_VENDOR').setValue(data.dzNAME);
				}else{
					Ext.getCmp('ipd_SUSPEND_VENDOR_ID').setValue(data.VALUE.SUSPEND_VENDOR_ID);
					Ext.getCmp('ipd_InstSUSPEND_VENDOR').setValue(data.VALUE.SUSPEND_VENDOR);
				}
				//搭棚服务商
				if(data.VALUE.BUILD_VENDOR_ID==null||data.VALUE.BUILD_VENDOR_ID==""||typeof(data.VALUE.BUILD_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_BUILD_VENDOR_ID').setValue(data.BUILD_VENDOR_ID);
					Ext.getCmp('ipd_BUILD_VENDOR').setValue(data.dpNAME);
				}else{
					Ext.getCmp('ipd_BUILD_VENDOR_ID').setValue(data.VALUE.BUILD_VENDOR_ID);
					Ext.getCmp('ipd_BUILD_VENDOR').setValue(data.VALUE.BUILD_VENDOR);
				}
				//已选择的吊装人员
				var instPerson = data.VALUE.LIFT_STAFF;
				var InstPersonNameStore=obj.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
				var InstPersonData = [];
				for(var k=0;k<instPerson.length;k++){
					var temp ={};
					temp.PERSON_NAME = instPerson[k].name;
					temp.INST_PERSON_ID = instPerson[k].id;
					InstPersonData[k]=temp;
				}
				InstPersonNameStore.setData(InstPersonData);
				//已选择的搭棚人员
				var buildPerson = data.VALUE.BUILD_STAFF;
				var BuildPersonNameStore=obj.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
				var BuidPersonData = [];
				for(var k=0;k<buildPerson.length;k++){
					var temp ={};
					temp.PERSON_NAME = buildPerson[k].name;
					temp.Build_PERSON_ID = buildPerson[k].id;
					BuidPersonData[k]=temp;
				}
				BuildPersonNameStore.setData(BuidPersonData);
				//吊搭备注
				Ext.getCmp('ipd_dd_remark').setValue(data.VALUE.LIFT_COMMENTS);
			//进场
//				//如果第一箱头发货日期为空，进场日期不能填
//				if(data.INV_OUT_DATE==""||data.INV_OUT_DATE==null){
//					Ext.getCmp('ipd_ENTRANCE_DATE').setDisabled(true);
//				}
				var ipd_ENTRANCE_DATE = null;
				if(data.VALUE.ENTRANCE_DATE==null||data.VALUE.ENTRANCE_DATE=="点击选择时间"||data.VALUE.ENTRANCE_DATE==""){
					ipd_ENTRANCE_DATE = Ext.getCmp('ipd_ENTRANCE_DATE').setValue(null);
				}else{
					ipd_ENTRANCE_DATE = Ext.getCmp('ipd_ENTRANCE_DATE').setValue(new Date(data.VALUE.ENTRANCE_DATE));
				}
					
				var ipd_ENTRANCE_ENTER_DATE = null;
				if(data.VALUE.ENTRANCE_ENTER_DATE==null||data.VALUE.ENTRANCE_ENTER_DATE=="点击选择时间"||data.VALUE.ENTRANCE_ENTER_DATE==""){
					ipd_ENTRANCE_ENTER_DATE = Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(null);
				}else{
					ipd_ENTRANCE_ENTER_DATE = Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(new Date(data.VALUE.ENTRANCE_ENTER_DATE));
				}
				
				var ipd_reportInstll = null;
				if(data.VALUE.REPORT_INSTALL_DATE==null||data.VALUE.REPORT_INSTALL_DATE=="点击选择时间"||data.VALUE.REPORT_INSTALL_DATE==""){
					ipd_reportInstll = Ext.getCmp('ipd_reportInstll').setValue(null);
				}else{
					ipd_reportInstll = Ext.getCmp('ipd_reportInstll').setValue(new Date(data.VALUE.REPORT_INSTALL_DATE));
				}
				
				//安装服务商
				if(data.VALUE.INST_VENDOR_ID==null||data.VALUE.INST_VENDOR_ID==""||typeof(data.VALUE.INST_VENDOR_ID)=="undefined"){
					Ext.getCmp('ipd_INSTLL_VENDOR_ID').setValue(data.INST_VENDOR_ID);
				}else{
					Ext.getCmp('ipd_INSTLL_VENDOR_ID').setValue(data.VALUE.INST_VENDOR_ID);
				}
				if(data.VALUE.INST_VENDOR==null||data.VALUE.INST_VENDOR==""||typeof(data.VALUE.INST_VENDOR)=="undefined"){
					Ext.getCmp('ipd_INSTLL_VENDOR').setValue(data.dwNAME);
				}else{
					Ext.getCmp('ipd_INSTLL_VENDOR').setValue(data.VALUE.INST_VENDOR);
				}
				//已选择的安装人员
				var instllPerson = data.VALUE.INSTALL_STAFF;
				var InstllPersonNameStore=obj.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
				var InstllPersonData = [];
				for(var k=0;k<instllPerson.length;k++){
					var temp ={};
					temp.PERSON_NAME = instllPerson[k].name;
					temp.INST_PERSON_ID = instllPerson[k].id;
					temp.PLAN_START = instllPerson[k].startDate;
					temp.PLAN_END = instllPerson[k].endDate;
					InstllPersonData[k]=temp;
				}
				InstllPersonNameStore.setData(InstllPersonData);
				
				
				//安装
				if(data.ELEVATOR_CLASS_NAME == "直梯"){
					Ext.getCmp('ipd_FT_field').setHidden(true);
					//工序(直梯)
					if(typeof(data.GONGXU_VALUE)=="undefined"){
					}else{
						var GXValue = data.GONGXU_VALUE;
						if(GXValue.ZT_CJ==true){
							Ext.getCmp('ZT_CJ').setValue("1");
						}else{
							Ext.getCmp('ZT_CJ').setValue("0");
						}
						if(GXValue.ZT_CJ_CONFIRM_DATE == null  || GXValue.ZT_CJ_CONFIRM_DATE == ""){
							step.ZT_CJ='';
						}else{
							step.ZT_CJ=GXValue.ZT_CJ_CONFIRM_DATE;
						}
						if(GXValue.ZT_DGAZ==true){
							Ext.getCmp('ZT_DGAZ').setValue("1");
							Ext.getCmp("dpf_dgaz").setDisabled(false);
						}else{
							Ext.getCmp('ZT_DGAZ').setValue("0");
							Ext.getCmp("dpf_dgaz").setDisabled(true);
						}
						if(GXValue.ZT_DGAZ_CONFIRM_DATE == null || GXValue.ZT_DGAZ_CONFIRM_DATE == "点击选择时间" || GXValue.ZT_DGAZ_CONFIRM_DATE == ""){
							Ext.getCmp('dpf_dgaz').setValue(null);
						}else{
							Ext.getCmp('dpf_dgaz').setValue(new Date(GXValue.ZT_DGAZ_CONFIRM_DATE));
						}
						if(GXValue.ZT_DLDY==true){
							Ext.getCmp('ZT_DLDY').setValue("1");
						}else{
							Ext.getCmp('ZT_DLDY').setValue("0");
						}
						if(GXValue.ZT_DLDY_CONFIRM_DATE == null  || GXValue.ZT_DLDY_CONFIRM_DATE == ""){
							step.ZT_DLDY='';
						}else{
							step.ZT_DLDY=GXValue.ZT_DLDY_CONFIRM_DATE;
						}
						
						if(GXValue.ZT_DQJX==true){
							Ext.getCmp('ZT_DQJX').setValue("1");
						}else{
							Ext.getCmp('ZT_DQJX').setValue("0");
						}
						if(GXValue.ZT_DQJX_CONFIRM_DATE == null  || GXValue.ZT_DQJX_CONFIRM_DATE == ""){
							step.ZT_DQJX='';
						}else{
							step.ZT_DQJX=GXValue.ZT_DQJX_CONFIRM_DATE;
						}
						
						if(GXValue.ZT_FX==true){
							Ext.getCmp('ZT_FX').setValue("1");
						}else{
							Ext.getCmp('ZT_FX').setValue("0");
						}
						if(GXValue.ZT_FX_CONFIRM_DATE == null  || GXValue.ZT_FX_CONFIRM_DATE == ""){
							step.ZT_FX='';
						}else{
							step.ZT_FX=GXValue.ZT_FX_CONFIRM_DATE;
						}
						if(GXValue.ZT_GHCSN==true){
							Ext.getCmp('ZT_GHCSN').setValue("1");
						}else{
							Ext.getCmp('ZT_GHCSN').setValue("0");
						}
						if(GXValue.ZT_GHCSN_CONFIRM_DATE == null  || GXValue.ZT_GHCSN_CONFIRM_DATE == ""){
							step.ZT_GHCSN='';
						}else{
							step.ZT_GHCSN=GXValue.ZT_GHCSN_CONFIRM_DATE;
						}
						if(GXValue.ZT_GZJ==true){
							Ext.getCmp('ZT_GZJ').setValue("1");
						}else{
							Ext.getCmp('ZT_GZJ').setValue("0");
						}
						if(GXValue.ZT_GZJ_CONFIRM_DATE == null  || GXValue.ZT_GZJ_CONFIRM_DATE == ""){
							step.ZT_GZJ='';
						}else{
							step.ZT_GZJ=GXValue.ZT_GZJ_CONFIRM_DATE;
						}
						if(GXValue.ZT_JDPJCC==true){
							Ext.getCmp('ZT_JDPJCC').setValue("1");
						}else{
							Ext.getCmp('ZT_JDPJCC').setValue("0");
						}
						if(GXValue.ZT_JDPJCC_CONFIRM_DATE == null  || GXValue.ZT_JDPJCC_CONFIRM_DATE == ""){
							step.ZT_JDPJCC='';
						}else{
							step.ZT_JDPJCC=GXValue.ZT_JDPJCC_CONFIRM_DATE;
						}
						if(GXValue.ZT_JF==true){
							Ext.getCmp('ZT_JF').setValue("1");
						}else{
							Ext.getCmp('ZT_JF').setValue("0");
						}
						if(GXValue.ZT_JF_CONFIRM_DATE == null  || GXValue.ZT_JF_CONFIRM_DATE == ""){
							step.ZT_JF='';
						}else{
							step.ZT_JF=GXValue.ZT_JF_CONFIRM_DATE;
						}
						if(GXValue.ZT_JXDZ==true){
							Ext.getCmp('ZT_JXDZ').setValue("1");
							Ext.getCmp('dpf_jxdzaz').setDisabled(false);
						}else{
							Ext.getCmp('ZT_JXDZ').setValue("0");
							Ext.getCmp('dpf_jxdzaz').setDisabled(true);
						}
						
						
						if(GXValue.ZT_JXDZ_CONFIRM_DATE == null || GXValue.ZT_JXDZ_CONFIRM_DATE == "点击选择时间" || GXValue.ZT_JXDZ_CONFIRM_DATE == ""){
							Ext.getCmp('dpf_jxdzaz').setValue(null);
						}else{
							Ext.getCmp('dpf_jxdzaz').setValue(new Date(GXValue.ZT_JXDZ_CONFIRM_DATE));
						}
						
						if(GXValue.ZT_TBMT==true){
							Ext.getCmp('ZT_TBMT').setValue("1");
						}else{
							Ext.getCmp('ZT_TBMT').setValue("0");
						}
						
						if(GXValue.ZT_TBMT_CONFIRM_DATE == null  || GXValue.ZT_TBMT_CONFIRM_DATE == ""){
							step.ZT_TBMT='';
						}else{
							step.ZT_TBMT=GXValue.ZT_TBMT_CONFIRM_DATE;
						}
						
						if(GXValue.ZT_TJSMT==true){
							Ext.getCmp('ZT_TJSMT').setValue("1");
						}else{
							Ext.getCmp('ZT_TJSMT').setValue("0");
						}
						if(GXValue.ZT_TJSMT_CONFIRM_DATE == null  || GXValue.ZT_TJSMT_CONFIRM_DATE == ""){
							step.ZT_TJSMT='';
						}else{
							step.ZT_TJSMT=GXValue.ZT_TJSMT_CONFIRM_DATE;
						}
						
						if(GXValue.ZT_TMAZ_CONFIRM_DATE == null || GXValue.ZT_TMAZ_CONFIRM_DATE == "点击选择时间" || GXValue.ZT_TMAZ_CONFIRM_DATE == ""){
							Ext.getCmp('dpf_tmaz').setValue(null);
						}else{
							Ext.getCmp('dpf_tmaz').setValue(new Date(GXValue.ZT_TMAZ_CONFIRM_DATE));
						}
						
						if(GXValue.ZT_TMAZ==true){
							Ext.getCmp('ZT_TMAZ').setValue("1");
							Ext.getCmp('dpf_tmaz').setDisabled(false);
						}else{
							Ext.getCmp('ZT_TMAZ').setValue("0");
							Ext.getCmp('dpf_tmaz').setDisabled(true);
						}
						isCome = false;
					}
				}else{
					Ext.getCmp('ipd_ZT_field').setHidden(true);
					//工序(扶梯)
					if(typeof(data.GONGXU_VALUE)=="undefined"){
					}else{
						var GXValue = data.GONGXU_VALUE;
						if(GXValue.FT_BJ==true){
							Ext.getCmp('FT_BJ').setValue("1");
						}else{
							Ext.getCmp('FT_BJ').setValue("0");
						}
						if(GXValue.FT_BJ_CONFIRM_DATE == null  || GXValue.FT_BJ_CONFIRM_DATE == ""){
							step.FT_BJ='';
						}else{
							step.FT_BJ=GXValue.FT_BJ_CONFIRM_DATE;
						}
						if(GXValue.FT_BLCB==true){
							Ext.getCmp('FT_BLCB').setValue("1");
						}else{
							Ext.getCmp('FT_BLCB').setValue("0");
						}
						if(GXValue.FT_BLCB_CONFIRM_DATE == null  || GXValue.FT_BLCB_CONFIRM_DATE == ""){
							step.FT_BLCB='';
						}else{
							step.FT_BLCB=GXValue.FT_BLCB_CONFIRM_DATE;
						}
						
						if(GXValue.FT_BLM==true){
							Ext.getCmp('FT_BLM').setValue("1");
						}else{
							Ext.getCmp('FT_BLM').setValue("0");
						}
						if(GXValue.FT_BLM_CONFIRM_DATE == null  || GXValue.FT_BLM_CONFIRM_DATE == ""){
							step.FT_BLM='';
						}else{
							step.FT_BLM=GXValue.FT_BLM_CONFIRM_DATE;
						}
						if(GXValue.FT_DGDL==true){
							Ext.getCmp('FT_DGDL').setValue("1");
						}else{
							Ext.getCmp('FT_DGDL').setValue("0");
						}
						if(GXValue.FT_DGDL_CONFIRM_DATE == null  || GXValue.FT_DGDL_CONFIRM_DATE == ""){
							step.FT_DGDL='';
						}else{
							step.FT_DGDL=GXValue.FT_DGDL_CONFIRM_DATE;
						}
						if(GXValue.FT_DLDY==true){
							Ext.getCmp('FT_DLDY').setValue("1");
						}else{
							Ext.getCmp('FT_DLDY').setValue("0");
						}
						if(GXValue.FT_DLDYL_CONFIRM_DATE == null  || GXValue.FT_DLDY_CONFIRM_DATE == ""){
							step.FT_DLDY='';
						}else{
							step.FT_DLDY=GXValue.FT_DLDY_CONFIRM_DATE;
						}
						if(GXValue.FT_DQJX==true){
							Ext.getCmp('FT_DQJX').setValue("1");
						}else{
							Ext.getCmp('FT_DQJX').setValue("0");
						}
						if(GXValue.FT_DQJX_CONFIRM_DATE == null  || GXValue.FT_DQJX_CONFIRM_DATE == ""){
							step.FT_DQJX='';
						}else{
							step.FT_DQJX=GXValue.FT_DQJX_CONFIRM_DATE;
						}
						if(GXValue.FT_FSDZJ==true){
							Ext.getCmp('FT_FSDZJ').setValue("1");
						}else{
							Ext.getCmp('FT_FSDZJ').setValue("0");
						}
						if(GXValue.FT_FSDZJ_CONFIRM_DATE == null  || GXValue.FT_FSDZJ_CONFIRM_DATE == ""){
							step.FT_FSDZJ='';
						}else{
							step.FT_FSDZJ=GXValue.FT_FSDZJ_CONFIRM_DATE;
						}
						if(GXValue.FT_HJYJ==true){
							Ext.getCmp('FT_HJYJ').setValue("1");
						}else{
							Ext.getCmp('FT_HJYJ').setValue("0");
						}
						if(GXValue.FT_HJYJ_CONFIRM_DATE == null  || GXValue.FT_HJYJ_CONFIRM_DATE == ""){
							step.FT_HJYJ='';
						}else{
							step.FT_HJYJ=GXValue.FT_HJYJ_CONFIRM_DATE;
						}
						if(GXValue.FT_NGB==true){
							Ext.getCmp('FT_NGB').setValue("1");
						}else{
							Ext.getCmp('FT_NGB').setValue("0");
						}
						if(GXValue.FT_NGB_CONFIRM_DATE == null  || GXValue.FT_NGB_CONFIRM_DATE == ""){
							step.FT_NGB='';
						}else{
							step.FT_NGB=GXValue.FT_NGB_CONFIRM_DATE;
						}
						if(GXValue.FT_QB==true){
							Ext.getCmp('FT_QB').setValue("1");
						}else{
							Ext.getCmp('FT_QB').setValue("0");
						}
						if(GXValue.FT_QB_CONFIRM_DATE == null  || GXValue.FT_QB_CONFIRM_DATE == ""){
							step.FT_QB='';
						}else{
							step.FT_QB=GXValue.FT_QB_CONFIRM_DATE;
						}
						if(GXValue.FT_WGB==true){
							Ext.getCmp('FT_WGB').setValue("1");
						}else{
							Ext.getCmp('FT_WGB').setValue("0");
						}
						if(GXValue.FT_WGB_CONFIRM_DATE == null  || GXValue.FT_WGB_CONFIRM_DATE == ""){
							step.FT_WGB='';
						}else{
							step.FT_WGB=GXValue.FT_WGB_CONFIRM_DATE;
						}
					}
				
				}
				
				if(data.VALUE.INSTALL_FINISH_DATE==null||data.VALUE.INSTALL_FINISH_DATE=="点击选择时间"||data.VALUE.INSTALL_FINISH_DATE==""){
					Ext.getCmp('ipd_install_end_date').setValue(null);
				}else{
					Ext.getCmp('ipd_install_end_date').setValue(new Date(data.VALUE.INSTALL_FINISH_DATE));
				}
				if(data.VALUE.REPORT_DEBUG_DATE==null||data.VALUE.REPORT_DEBUG_DATE=="点击选择时间"||data.VALUE.REPORT_DEBUG_DATE==""){
					Ext.getCmp('ipd_report_test').setValue(null);
				}else{
					Ext.getCmp('ipd_report_test').setValue(new Date(data.VALUE.REPORT_DEBUG_DATE));
				}
				if(data.VALUE.REPORT_DEBUG_ENTER_DATE==null||data.VALUE.REPORT_DEBUG_ENTER_DATE=="点击选择时间"||data.VALUE.REPORT_DEBUG_ENTER_DATE==""){
					Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').setValue(null);
				}else{
					Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').setValue(new Date(data.VALUE.REPORT_DEBUG_ENTER_DATE));
				}
				//评分
				if(typeof(data.VALUE.QA_VALUE)!="undefined"){
					Ext.getCmp('ipd_quality_score').setValue((data.VALUE.QA_VALUE));
				}
				if(typeof(data.VALUE.INST_VALUE)!="undefined"){
					Ext.getCmp('ipd_stall_score').setValue((data.VALUE.INST_VALUE));
				}
				if(typeof(data.VALUE.ENCIRCLE_VALUE)!="undefined"){
					Ext.getCmp('ipd_envir_score').setValue((data.VALUE.ENCIRCLE_VALUE));
				}
				//中间检
				if(typeof(data.VALUE.MID_CHECK_PERSON_ID)!="undefined"){
					Ext.getCmp('ipd_MID_CHECK_PERSON_ID').setValue((data.VALUE.MID_CHECK_PERSON_ID));
					Ext.getCmp('ipd_ZjjPersion').setValue((data.VALUE.MID_CHECK_PERSON_ID));
				}
				if(data.VALUE.MID_CHECK_DATE==null||data.VALUE.MID_CHECK_DATE=="点击选择时间"||data.VALUE.MID_CHECK_DATE==""){
					Ext.getCmp('ipd_ZJJ_DATE').setValue(null);
				}else{
					Ext.getCmp('ipd_ZJJ_DATE').setValue(new Date(data.VALUE.MID_CHECK_DATE));
				}
				if(typeof(data.VALUE.KEN_CHECK_RESULT)!="undefined"){
					Ext.getCmp('ipd_imp_result').setValue((data.VALUE.KEN_CHECK_RESULT));
				}
				if(typeof(data.VALUE.CB_1)!="undefined"){
					Ext.getCmp('ipd_CB_1').setValue((data.VALUE.CB_1));
				}
				if(typeof(data.VALUE.CB_2)!="undefined"){
					Ext.getCmp('ipd_CB_2').setValue((data.VALUE.CB_2));
				}
				if(typeof(data.VALUE.CB_3)!="undefined"){
					Ext.getCmp('ipd_CB_3').setValue((data.VALUE.CB_3));
				}
				if(typeof(data.VALUE.CB_4)!="undefined"){
					Ext.getCmp('ipd_CB_4').setValue((data.VALUE.CB_4));
				}
				if(typeof(data.VALUE.CB_5)!="undefined"){
					Ext.getCmp('ipd_CB_5').setValue((data.VALUE.CB_5));
				}
				//安装组长
				if(typeof(data.VALUE.INSTALL_HEADER_ID)!="undefined"){
					Ext.getCmp('ipd_INSTALL_HEADER_ID').setValue((data.VALUE.INSTALL_HEADER_ID));
				}
				if(typeof(data.VALUE.INSTALL_HEADER)!="undefined"){
					Ext.getCmp('ipd_ZZ').setValue((data.VALUE.INSTALL_HEADER));
				}
				if(typeof(data.VALUE.INSTTALL_COMMENTS)!="undefined"){
					Ext.getCmp('ipd_install_remark').setValue((data.VALUE.INSTTALL_COMMENTS));
				}
				if(typeof(data.VALUE.TEL)!="undefined"){
					Ext.getCmp('ipd_ZZ_TEL').setValue((data.VALUE.TEL));
				}
				
				var ipd_REPORT_DEBUG_ENTER_DATE=Ext.getCmp('ipd_report_test');
					ipd_REPORT_DEBUG_ENTER_DATE.addListener('change',obj.reportdebugdate1,this,{
				});
				//如果吊搭时间和进场时间还没填写,进场和安装不可填
//				if(ipd_LIFT_END_DATE.getValue() == null && ipd_BUILD_END_DATE.getValue() == null && ipd_ENTRANCE_DATE.getValue() == null){
//					Ext.getCmp('ipd_INSTALL_formpanel').setDisabled(true);  
//					Ext.getCmp('btn_ipd_ZJJperson').setDisabled(true);  
//					Ext.getCmp('ipd_btn_search_ZZ').setDisabled(true);  
//					Ext.getCmp('btn_add_instllperson').setDisabled(true);  
//				};
				
				
				
			//各种监听	
				//安装的数据要在进场时间填写后才能填
				var ZTfield=Ext.getCmp('ipd_ZT_field')._items;
					for(var i =0;i<ZTfield.items.length;i++){
						ZTfield.items[i].addListener('change',obj.ZTfield1,this,{
						});
				};
				
				var FTfield=Ext.getCmp('ipd_FT_field')._items;
				for(var i =0;i<FTfield.items.length;i++){
					FTfield.items[i].addListener('change',obj.ZTfield1,this,{
					});
			   };
				
				//吊装结束时间填写前需先填写吊装开始时间
				var liftstartdate=Ext.getCmp('ipd_LIFT_START_DATE');
					liftstartdate.addListener('change',obj.liftstartdate1,this,{
				});
				//吊装结束时间需大于等于吊装开始时间，且不大于当天时间
				var liftenddate=Ext.getCmp('ipd_LIFT_END_DATE');
					liftenddate.addListener('change',obj.liftenddate1,this,{
				});
				//搭棚结束时间填写前需先填写搭棚开始时间
				var buildstartdate=Ext.getCmp('ipd_BUILD_START_DATE');
					buildstartdate.addListener('change',obj.buildstartdate1,this,{
				});
				//搭棚结束时间需大于等于搭棚开始时间，且不大于当天时间
				var buildenddate=Ext.getCmp('ipd_BUILD_END_DATE');
					buildenddate.addListener('change',obj.buildenddate1,this,{
				});
				//入场时间不小于吊搭结束时间且不大于当天时间
				var entrancedate=Ext.getCmp('ipd_ENTRANCE_DATE');
					entrancedate.addListener('change',obj.entrancedate1,this,{
				});
				if(data.ELEVATOR_CLASS_NAME == "直梯"){
					//安装完成日期要先完成工序
					var installenddate=Ext.getCmp('ipd_install_end_date');
					installenddate.addListener('change',obj.installenddate1,this,{
					});	
				}else{
					var installenddate=Ext.getCmp('ipd_install_end_date');
					installenddate.addListener('change',obj.installenddate2,this,{
					});	
				}
//				//填写报调日期要先填写安装完成日期
//				var reporttest=Ext.getCmp('ipd_report_test');
//					reporttest.addListener('change',obj.reporttest1,this,{
//				});	
					
			});
		}else{
			
		}
    },
    ZTfield1 : function(arg1, arg2, arg3, options, e){
    var name=arg1.getId();
    
     if(Ext.getCmp('ipd_ENTRANCE_DATE').getValue()==null&&name.indexOf('ZT_')!=-1){
    		alert("请先完成进场时间"); 
    		WL.Toast.show("请先完成进场时间"); 
    		for(var i =0;i<Ext.getCmp('ipd_ZT_field')._items.items.length-1;i++){
    			Ext.getCmp('ipd_ZT_field')._items.items[i].setValue(0);
    		};
    		return;
    	}
     var date=Ext.Date.format(new Date(),'Y-m-d');
     
     if(name=="ZT_FX"){
     var data=Ext.getCmp('ZT_FX').getValue();
    	 if(data=='1'){
    		 step.ZT_FX=date;
    	 }else{
    		 step.ZT_FX='';
    	 }

     }else if(name=="ZT_CJ"){
    	 var data=Ext.getCmp('ZT_CJ').getValue();
    	 if(data=='1')
    	 step.ZT_CJ=date;
    	 else
         step.ZT_CJ='';
     }else if(name=="ZT_JF"){
    	 var data=Ext.getCmp('ZT_JF').getValue();
    	 if(data=='1')
    	 step.ZT_JF=date;
    	 else
          step.ZT_JF='';
     }else if(name=="ZT_GZJ"){
    	 var data=Ext.getCmp('ZT_GZJ').getValue();
    	 if(data=='1')
    	 step.ZT_GZJ=date;
    	 else
             step.ZT_GZJ='';
     }else if(name=="ZT_TBMT"){
    	 var data=Ext.getCmp('ZT_TBMT').getValue();
    	 if(data=='1')
    	 step.ZT_TBMT=date;
    	 else
             step.ZT_TBMT='';
     }else if(name=="ZT_TJSMT"){
    	 var data=Ext.getCmp('ZT_TJSMT').getValue();
    	 if(data=='1')
    	 step.ZT_TJSMT=date;
    	 else
             step.ZT_TJSMT='';
     }else if(name=="ZT_DQJX"){
    	 var data=Ext.getCmp('ZT_DQJX').getValue();
    	 if(data=='1')
    	 step.ZT_DQJX=date;
    	 else
             step.ZT_DQJX='';
     }else if(name=="ZT_JDPJCC"){
    	 var data=Ext.getCmp('ZT_JDPJCC').getValue();
    	 if(data=='1')
    	 step.ZT_JDPJCC=date;
    	 else
             step.ZT_JDPJCC='';
     }else if(name=="ZT_GHCSN"){
    	 var data=Ext.getCmp('ZT_GHCSN').getValue();
    	 if(data=='1')
    	 step.ZT_GHCSN=date;
    	 else
             step.ZT_GHCSN='';	 
     }else if(name=="ZT_DLDY"){
    	 var data=Ext.getCmp('ZT_DLDY').getValue();
    	 if(data=='1')
    	 step.ZT_DLDY=date;
    	 else
             step.ZT_DLDY='';
     }else if(name=="FT_BJ"){
    	 var data=Ext.getCmp('FT_BJ').getValue();
    	 if(data=='1')
    	 step.FT_BJ=date;
    	 else
             step.FT_BJ='';
     }else if(name=="FT_BLCB"){
    	 var data=Ext.getCmp('FT_BLCB').getValue();
    	 if(data=='1')
    	 step.FT_BLCB=date;
    	 else
             step.FT_BLCB='';
     }else if(name=="FT_BLM"){
    	 var data=Ext.getCmp('FT_BLM').getValue();
    	 if(data=='1')
    	 step.FT_BLM=date;
    	 else
             step.FT_BLM='';
     }else if(name=="FT_DGDL"){
    	 var data=Ext.getCmp('FT_DGDL').getValue();
    	 if(data=='1')
    	 step.FT_DGDL=date;
    	 else
             step.FT_DGDL='';
     }else if(name=="FT_DLDY"){
    	 var data=Ext.getCmp('FT_DLDY').getValue();
    	 if(data=='1')
    	 step.FT_DLDY=date;
    	 else
          step.FT_DLDY='';
     }else if(name=="FT_DQJX"){
    	 var data=Ext.getCmp('FT_DQJX').getValue();
    	 if(data=='1')
    	 step.FT_DQJX=date;
    	 else
          step.FT_DQJX='';
     }else if(name=="FT_FSDZJ"){
    	 var data=Ext.getCmp('FT_FSDZJ').getValue();
    	 if(data=='1')
    	 step.FT_FSDZJ=date;
    	 else
          step.FT_FSDZJ='';
     }else if(name=="FT_HJYJ"){
    	 var data=Ext.getCmp('FT_HJYJ').getValue();
    	 if(data=='1')
    	 step.FT_HJYJ=date;
    	 else
             step.FT_HJYJ='';
     }else if(name=="FT_NGB"){
    	 var data=Ext.getCmp('FT_NGB').getValue();
    	 if(data=='1')
    	 step.FT_NGB=date;
    	 else
             step.FT_NGB='';
     }else if(name=="FT_QB"){
    	 var data=Ext.getCmp('FT_QB').getValue();
    	 if(data=='1')
    	 step.FT_QB=date;
    	 else
             step.FT_QB='';
     }else if(name=="FT_WGB"){
    	 var data=Ext.getCmp('FT_WGB').getValue();
    	 if(data=='1')
    	 step.FT_WGB=date;
    	 else
          step.FT_WGB='';
     }
     console.log(step);
    },
    
    //监听报调试日期
    reporttest1 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('ipd_report_test').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_report_test').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_report_test').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(Ext.getCmp('ipd_install_end_date').getValue()==null){
    		Ext.getCmp('ipd_report_test').setValue(null);
    		WL.Toast.show("请先填写安装完成日期");
    	}if(copeteNowTime(newDate,Ext.getCmp('ipd_install_end_date').getValue())){
    		WL.Toast.show("报调试日期应大于安装完成日期");
    		Ext.getCmp('ipd_report_test').setValue(new Date(oldDate));
    	}
    	
    	
    	function copeteNowTime(nowDate,competeTime){
    		var tempnewdate=new Date(nowDate);
        	var tempendDate=new Date(competeTime);
        	
        	var newdate1=tempnewdate.getFullYear()+"-"+(tempnewdate.getMonth()+1)+"-"+tempnewdate.getDate();
        	var endDate1=tempendDate.getFullYear()+"-"+(tempendDate.getMonth()+1)+"-"+tempendDate.getDate();
        	
        	if(Date.parse(newdate1)<Date.parse(endDate1)){
        		return true;
        	}else{
        		return false;
        	}
    		
    	}
    },
    
    //监听安装完成日期
    installenddate1 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	
    	if(Ext.getCmp('ZT_TMAZ').getValue()==0){
    		WL.Toast.show('请先完成厅门安装');
    		Ext.getCmp('ipd_install_end_date').setValue(null);
    		return;
    	}
    	if(Ext.getCmp('ZT_JXDZ').getValue()==0){
    		Ext.getCmp('ipd_install_end_date').setValue(null);
    		WL.Toast.show('请先完成轿厢、对重安装');
    		return;
    	}
    	if(Ext.getCmp('ZT_DGAZ').getValue()==0){
    		Ext.getCmp('ipd_install_end_date').setValue(null);
    		WL.Toast.show('请先完成导轨安装');
    		return;
    	}
		if(Date.parse(Ext.getCmp('ipd_install_end_date').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_install_end_date').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_install_end_date').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	if(newDate!=null){
    	var ENTRANCE_DATE=Ext.getCmp('ipd_ENTRANCE_DATE').getValue();
    	var REPORT_DATE=Ext.getCmp('ipd_report_test').getValue();
    	
    	if(ENTRANCE_DATE==null&&REPORT_DATE!=null){
    		REPORT_DATE=Ext.Date.format(REPORT_DATE,'Y-m-d');
    		compREP();
    	}else if(ENTRANCE_DATE!=null&&REPORT_DATE==null){
    		ENTRANCE_DATE=Ext.Date.format(ENTRANCE_DATE,'Y-m-d');
    		compENT();
    	}else if(ENTRANCE_DATE==null&&REPORT_DATE==null){
    		
    	}else{
    		REPORT_DATE=Ext.Date.format(REPORT_DATE,'Y-m-d');
    		ENTRANCE_DATE=Ext.Date.format(ENTRANCE_DATE,'Y-m-d');
    		compREP();
    		compENT();
    	}
    	
    	function compENT(){
    		if(Date.parse(Ext.Date.format(newDate,'Y-m-d'))<Date.parse(ENTRANCE_DATE)){
    			WL.Toast.show('安装完成日期应大于进场日期');
    			if(oldDate==null){
    				obj.setValue(null);
    			}else{
    				obj.setValue(new Date(oldDate));
    			}
    		}
    	}
    	function compREP(){
    		if((Date.parse(REPORT_DATE))<Date.parse(Ext.Date.format(newDate,'Y-m-d'))){
	    		WL.Toast.show('安装完成日期应小于报调试日期');
	    		if(oldDate==null){
	    			obj.setValue(null);
	    		}else{
	    			obj.setValue(new Date(oldDate));
	    		}
	    	}
    	}
    
    	}
		
    },
    
  //监听安装完成日期
    installenddate2 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	
    	if(Date.parse(Ext.getCmp('ipd_install_end_date').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_install_end_date').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_install_end_date').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	if(newDate!=null){
    	var ENTRANCE_DATE=Ext.getCmp('ipd_ENTRANCE_DATE').getValue();
    	var REPORT_DATE=Ext.getCmp('ipd_report_test').getValue();
    	
    	if(ENTRANCE_DATE==null&&REPORT_DATE!=null){
    		REPORT_DATE=Ext.Date.format(REPORT_DATE,'Y-m-d');
    		compREP();
    	}else if(ENTRANCE_DATE!=null&&REPORT_DATE==null){
    		ENTRANCE_DATE=Ext.Date.format(ENTRANCE_DATE,'Y-m-d');
    		compENT();
    	}else if(ENTRANCE_DATE==null&&REPORT_DATE==null){
    		
    	}else{
    		REPORT_DATE=Ext.Date.format(REPORT_DATE,'Y-m-d');
    		ENTRANCE_DATE=Ext.Date.format(ENTRANCE_DATE,'Y-m-d');
    		compREP();
    		compENT();
    	}
    	
    	function compENT(){
    		if(Date.parse(Ext.Date.format(newDate,'Y-m-d'))<Date.parse(ENTRANCE_DATE)){
    			WL.Toast.show("安装完成日期应大于进场日期");
    			if(oldDate==null){
    				obj.setValue(null);
    			}else{
    				obj.setValue(new Date(oldDate));
    			}
    		}
    	}
    	function compREP(){
    		if((Date.parse(REPORT_DATE))<Date.parse(Ext.Date.format(newDate,'Y-m-d'))){
    			WL.Toast.show("安装完成日期应小于报调试日期");
	    		if(oldDate==null){
	    			obj.setValue(null);
	    		}else{
	    			obj.setValue(new Date(oldDate));
	    		}
	    	}
    	}
    	}
    },
    
    //监听吊装开始时间
    liftstartdate1 : function(obj, newDate, oldDate, eOpts ){
    	var ipd_LIFT_START_DATE = Ext.getCmp('ipd_LIFT_START_DATE').getValue();
    	var Today = new Date();
    	if(Date.parse(newDate)>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_LIFT_START_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_LIFT_START_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(ipd_LIFT_START_DATE == null){
    	}else{
    		Ext.getCmp('ipd_LIFT_END_DATE').setDisabled(false);  
    	}
    	if(newDate == null){
    		Ext.getCmp('ipd_LIFT_END_DATE').setValue(null);
    		Ext.getCmp('ipd_LIFT_END_DATE').setDisabled(true);
    	}
    },
    
    //监听吊装结束时间
    liftenddate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('ipd_LIFT_END_DATE').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_LIFT_END_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_LIFT_END_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(Ext.getCmp('ipd_LIFT_START_DATE').getValue() == null || Date.parse(Ext.getCmp('ipd_LIFT_START_DATE').getValue())>Date.parse(newDate)){
    		Ext.getCmp('ipd_LIFT_END_DATE').setValue(null);
    		WL.Toast.show("吊装结束时间不能小于吊装开始时间");
    	}
    },
    
    //监听搭棚开始时间
    buildstartdate1 : function(obj, newDate, oldDate, eOpts ){
    	var ipd_BUILD_START_DATE = Ext.getCmp('ipd_BUILD_START_DATE').getValue();
    	if(ipd_BUILD_START_DATE == null){
    	}else{
    		Ext.getCmp('ipd_BUILD_END_DATE').setDisabled(false);  
    	}
    	if(newDate == null){
    		Ext.getCmp('ipd_BUILD_END_DATE').setValue(null);
    		Ext.getCmp('ipd_BUILD_END_DATE').setDisabled(true);
    	}
    },
    
    //监听搭棚结束时间
    buildenddate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('ipd_BUILD_END_DATE').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_BUILD_END_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_BUILD_END_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(Ext.getCmp('ipd_BUILD_START_DATE').getValue() == null || Date.parse(Ext.getCmp('ipd_BUILD_START_DATE').getValue())>Date.parse(newDate)){
    		Ext.getCmp('ipd_BUILD_END_DATE').setValue(null);
    		WL.Toast.show("搭棚结束时间不能小于搭棚开始时间");
    	}
    },
    
    //进场录入时间
    entrancedate1 : function(obj, newDate, oldDate, eOpts ){
    	var INV_OUT_DATE = Ext.getCmp('ipd_INV_OUT_DATE').getValue();
    	if(INV_OUT_DATE == null ||INV_OUT_DATE ==""){
			WL.Toast.show("填写进场日期需要有第一箱头发货日期");
			Ext.getCmp('ipd_ENTRANCE_DATE').setValue(null);
			return;
    	}
    	var Today = new Date();
    	if(Date.parse(newDate)>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	
    	if(Date.parse(Ext.getCmp('ipd_INV_OUT_DATE').getValue())>Date.parse(newDate)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能小于第一箱头发货日期");
    		}else{
    			Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能小于第一箱头发货日期");
    		}
    		return;
    	};
    	
    	
    	if(newDate !=null ||newDate !=""){
    		Ext.getCmp('ipd_INSTALL_formpanel').setDisabled(false);
    	}
    	
    	Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').setValue(new Date());
    	
	},
	//监听报调试日期
	reportdebugdate1 : function(obj, newDate, oldDate, eOpts){
    	if(Ext.getCmp('ipd_install_end_date').getValue()==null){
    		Ext.getCmp('ipd_report_test').setValue(null);
    		WL.Toast.show('请先填写安装完成日期');
    		return;
    	}
    	if(Date.parse(newDate)>Date.parse(Ext.getCmp('ipd_report_test').getValue())){
    		WL.Toast.show('报调试日期应大于安装完成日期');
    		Ext.getCmp('ipd_report_test').setValue(new Date(oldDate));
    		return;
    	}
    	var targetdate = new Date();
    	var lastTime = targetdate.getDate()+3;
		targetdate.setDate(lastTime);
		console.log("newDate=:"+Date.parse(newDate));
		console.log("oldDate="+new Date(oldDate));
		console.log("targetdate="+Date.parse(targetdate));
    	if(Date.parse(newDate)>Date.parse(targetdate)){
    		WL.Toast.show('报调时间不能超过'+lastTime+'号');
    		if(oldDate==null){
    			Ext.getCmp('ipd_report_test').setValue(null);
    		}else{
    			Ext.getCmp('ipd_report_test').setValue(new Date(oldDate));
    		}
    		return;
    	}
    	Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').setValue(new Date());
    },
});