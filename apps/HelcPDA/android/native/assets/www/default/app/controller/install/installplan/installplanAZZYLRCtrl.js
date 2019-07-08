
/* JavaScript content from app/controller/install/installplan/installplanAZZYLRCtrl.js in folder common */
/**
 *  安装资源录入  监视器  xcx  2014- 6-10
 */
//用于记录是从批量安装资源退出还是单个安装资源退出
/*var installplan_AZZYLR_Ctrl_num;*/
//用于判断调用了哪个模块的查询按钮
/*var installplan_AZZYLR_CXButton_num*/;
//吊装工程 人员的集合   
/*var installplan_AZZYLR_DZRY_ARRAY=[];*/
//搭棚工程 人员的集合
/*var installplan_AZZYLR_DPRY_ARRAY=[];*/
//安装工程 人员的集合
/*var installplan_AZZYLR_AZRY_ARRAY=[];*/
//用于判断清空单个资源录入的文本框
/*var installplan_AZZYLR_IFEliminate;*/
//获取批量 资源录入的下标
/*var installplan_PLZYLR_FXK_SHUZU=[];*/
//提交时收集的数据（单个/批量）通用  2014-7-8 xcx
/*var installplan_PLZYLR_ZYLR_TRIM;*/

Ext.define('HelcPDA.controller.install.installplan.installplanAZZYLRCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//安装计划详细-首页  资源
			instalPlan_HomePage_ZY_Button:'button[id=instalPlan_HomePage_ZY_Button]',
			
			//安装资源录入 页面  提交按钮
			installplan_AZZYLR_TJButton:'button[id=installplan_AZZYLR_TJButton]',
			
			//安装资源录入 页面  返回按钮
			installplan_AZZYLR_FHButton:'button[id=installplan_AZZYLR_FHButton]',
			
			//安装资源录入 页面 吊装工程服务商 查询按钮
			installPlan_AZZYLR_DZGCFWS_CXButton:'button[id=installPlan_AZZYLR_DZGCFWS_CXButton]',
			
			//安装资源录入 页面 搭棚工程服务商 查询按钮
			installPlan_AZZYLR_DPGCFWS_CXButton:'button[id=installPlan_AZZYLR_DPGCFWS_CXButton]',
			
			//安装资源录入 页面 安装工程服务商 查询按钮
			installPlan_AZZYLR_AZGCFWS_CXButton:'button[id=installPlan_AZZYLR_AZGCFWS_CXButton]',
			
			//增加吊装人员
			installPlanAZZY_AddDZRY:'button[id=installPlanAZZY_AddDZRY]',
			
			//增加搭棚人员
			installPlanAZZY_AddDPRY:'button[id=installPlanAZZY_AddDPRY]',
			
			//增加安装人员
			installPlanAZZY_AddAZRY:'button[id=installPlanAZZY_AddAZRY]',
			
		},
		control:{
			//安装计划详细-首页  资源  
			'button#instalPlan_HomePage_ZY_Button':{
				tap:'instalPlan_HomePage_ZY_Button'
			},
			
			//安装资源录入 页面  提交按钮
			installplan_AZZYLR_TJButton:{
				tap:'installplan_AZZYLR_TJButton'
			},
			
			//安装资源录入 页面  返回按钮
			installplan_AZZYLR_FHButton:{
				tap:'installplan_AZZYLR_FHButton'
			},
			
			//安装资源录入 页面 吊装工程服务商 查询按钮
			installPlan_AZZYLR_DZGCFWS_CXButton:{
				tap:'installPlan_AZZYLR_DZGCFWS_CXButton'
			},
			
			//安装资源录入 页面 搭棚工程服务商 查询按钮
			installPlan_AZZYLR_DPGCFWS_CXButton:{
				tap:'installPlan_AZZYLR_DPGCFWS_CXButton'
			},
			
			//安装资源录入 页面 安装工程服务商 查询按钮
			installPlan_AZZYLR_AZGCFWS_CXButton:{
				tap:'installPlan_AZZYLR_AZGCFWS_CXButton'
			},
			
			//获取查找到的服务商   (公共的)
			'#InstallPlanAZLR_HDCXZ':{
				itemtap:'InstallPlanAZLR_HDCXZ'
			},
			
			//增加吊装人员
			installPlanAZZY_AddDZRY:{
				tap:'installPlanAZZY_AddDZRY'
			},
			
			//增加搭棚人员
			installPlanAZZY_AddDPRY:{
				tap:'installPlanAZZY_AddDPRY'
			},
			
			//增加安装人员
			installPlanAZZY_AddAZRY:{
				tap:'installPlanAZZY_AddAZRY'
			},
			
			//删除添加的吊装人员
			'list#installPlanAZZYLR_DZStore':{
				itemtap:'installPlanAZZYLR_DZStore'
			},
			
			//删除添加的搭棚人员
			'list#installPlanAZZYLR_DPStore':{
				itemtap:'installPlanAZZYLR_DPStore'
			},
			
			//删除添加的安装人员
			'list#installPlanAZZYLR_AZStore':{
				itemtap:'installPlanAZZYLR_AZStore'
			},
			
		},
	},
	
	//安装计划详细-首页  资源
	instalPlan_HomePage_ZY_Button:function(){
		var installplan_AZZYLR_Ctrl_num=1;
		Ext.getCmp('installplan_AZZYLR_Ctrl_num').setValue(installplan_AZZYLR_Ctrl_num);
		this_obj=this;
		//获取三个服务商
		var dz=Ext.getCmp('HP_LIFT_VENDOR').getValue();//吊装
		var dp=Ext.getCmp('HP_BUILD_VENDOR').getValue();//搭棚
		var az=Ext.getCmp('HP_INST_VENDOR').getValue();//安装
		this_obj.NextView("installplan_AZZYLR","HelcPDA.view.install.installplan.InstallPlanAZZYLR");
		
		installplan_AZZYLR_QingKongTEXT();
/*		//判断是否清空
		if(installplan_AZZYLR_IFEliminate==1){
			installplan_AZZYLR_QingKongTEXT();
			installplan_AZZYLR_IFEliminate=2;
		};*/
		//判断是否对服务商进行修改
		var dz2=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_JG').getValue();
		var dp2=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_JG').getValue();
		var az2=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_JG').getValue();
		
		var dz3=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').getValue();
		var dp3=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').getValue();
		var az3=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').getValue();
		if(dz2!=''&&dz3!=''){
			dz=dz3;
		};
		if(dp2!=''&&dp3!=''){
			dp=dp3;
		};
		if(az2!=''&&az3!=''){
			az=az3;
		};

		Ext.getCmp('installPlan_AZZYLR_DZGCFWS_JG').setValue(dz);
		Ext.getCmp('installPlan_AZZYLR_DPGCFWS_JG').setValue(dp);
		Ext.getCmp('installPlan_AZZYLR_AZGCFWS_JG').setValue(az);
		
		Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').setValue(dz);
		Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').setValue(dp);
		Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').setValue(az);

		//下拉列表获取值
		var count=0;
		//查找吊装服务商ID
		var Trim="{'vendor_name':'"+dz+"','inst_person_id':'"+init_person_id+"'}";
		this_obj.connectServerMainTain(OneIterationMethod,this_obj,"remote/installProcessAction.do?method=toSearchVendor",Trim);
		function OneIterationMethod(result,obj){
			console.log(count+'    '+JSON.stringify(result));
			count++;
			if(count==1){
				//获取吊装人员
				var dzID=result.vendor_name[0].VENDOR_ID;
				Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS_hidden').setValue(dzID);
				var Trim="{'vendor_id':'"+dzID+"','inst_person_id':'"+init_person_id+"'}";
				obj.connectServerMainTain(OneIterationMethod,obj,"remote/installProcessAction.do?method=toSearchIntPerson",Trim);
			}else if(count==2){
				//添加吊装人员下拉列表
				var installplan_AZZYLR_CXButton_num=1;
				Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
				obj.InstallPlanAZLR_HDCXZ2(result);
				
				//查找搭棚服务商ID
				var Trim="{'vendor_name':'"+dp+"','inst_person_id':'"+init_person_id+"'}";
				obj.connectServerMainTain(OneIterationMethod,obj,"remote/installProcessAction.do?method=toSearchVendor",Trim);
			}else if(count==3){
				//获取搭棚人员
				var dpID=result.vendor_name[0].VENDOR_ID;
				Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS_hidden').setValue(dpID);
				var Trim="{'vendor_id':'"+dpID+"','inst_person_id':'"+init_person_id+"'}";
				obj.connectServerMainTain(OneIterationMethod,obj,"remote/installProcessAction.do?method=toSearchIntPerson",Trim);
			}else if(count==4){
				//添加搭棚人员下拉列表
				var installplan_AZZYLR_CXButton_num=2;
				Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
				obj.InstallPlanAZLR_HDCXZ2(result);
				
				//查找安装服务商ID
				var Trim="{'vendor_name':'"+az+"','inst_person_id':'"+init_person_id+"'}";
				obj.connectServerMainTain(OneIterationMethod,obj,"remote/installProcessAction.do?method=toSearchVendor",Trim);
			}else if(count==5){
				//获取安装人员
				var azID=result.vendor_name[0].VENDOR_ID;
				Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS_hidden').setValue(azID);
				var Trim="{'vendor_id':'"+azID+"','inst_person_id':'"+init_person_id+"'}";
				obj.connectServerMainTain(OneIterationMethod,obj,"remote/installProcessAction.do?method=toSearchIntPerson",Trim);
			}else if(count==6){
				//添加搭棚人员下拉列表
				var installplan_AZZYLR_CXButton_num=3;
				Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
				obj.InstallPlanAZLR_HDCXZ2(result);
				//获取JSON中的服务人员
				obj.InstallPlanAZLR_FWRY();
			};
		};
	},
	
	//获取JSON中的服务人员
	InstallPlanAZLR_FWRY:function(){
		//合同号
		var ht=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
		//工号
		var gh=Ext.getCmp('HP_ELEVATOR_NO').getValue();
		//批次
		var pc=Ext.getCmp('HP_SEQ_NUM').getValue();
		
		var trim=ht+'/'+gh+'/'+pc;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'AZZYLR',tid:trim,};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
				console.log('查找到的数据  '+JSON.stringify(arrayResults));
				var num=arrayResults.length;
				if(num!=0){
					var data=arrayResults[num-1].json.stext.value;
					//alert(JSON.stringify(data));
					//获取吊装数据仓
					 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
					 if(!datadTwo){
						datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
					};
					var dz=[];
					var num_DJ=data.LIFT_STAFF.length;
					for(var i=0;i<num_DJ;i++){
						var trim={};
						trim.IDS=data.LIFT_STAFF[i].INST_VENDOR_ID;
						trim.NAMES=data.LIFT_STAFF[i].INST_VENDOR;
						dz[i]=trim;
					};
					datadTwo.setData(dz);
					//获取搭棚数据仓
					 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
					 if(!datadTwo){
						datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
					};
					var dp=[];
					var num_DP=data.BUILD_STAFF.length;
					for(var i=0;i<num_DP;i++){
						var trim={};
						trim.IDS=data.BUILD_STAFF[i].INST_VENDOR_ID;
						trim.NAMES=data.BUILD_STAFF[i].INST_VENDOR;
						dp[i]=trim;
					};
					datadTwo.setData(dp);
					//获取安装数据仓
					 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
					 if(!datadTwo){
						datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
					};
					var az=[];
					var num_AZ=data.INSTALL_STAFF.length;
					for(var i=0;i<num_AZ;i++){
						var trim={};
						trim.IDS=data.INSTALL_STAFF[i].INST_VENDOR_ID;
						trim.NAMES=data.INSTALL_STAFF[i].INST_VENDOR;
						var star=data.INSTALL_STAFF[i].startDate;
						var end=data.INSTALL_STAFF[i].endDate;
						trim.TIME=star+' 至 '+end;
						az[i]=trim;
					};
					datadTwo.setData(az);
				};
		}).fail(function(errorObject){
			console.log('安装资源录入数据查询失败');
		});
	},
	
	//安装资源录入 页面  返回按钮
	installplan_AZZYLR_FHButton:function(){
		var installplan_AZZYLR_Ctrl_num=Ext.getCmp('installplan_AZZYLR_Ctrl_num').getValue();
			if(installplan_AZZYLR_Ctrl_num==1){
				this.showBackView("installplan_AZJHXXHomePage","HelcPDA.view.install.installplan.InstallPlanAZJHXXHomePage");
			}else if(installplan_AZZYLR_Ctrl_num==2){
				this.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
				var sele=document.getElementsByName('groupCheckboxinstall');
        	    for ( var i = 0; i <sele.length; i++)  
        	    {  
        	      // 提取控件  
        	      var checkbox = sele[i];  
        	      checkbox.style.color='#ccc';
        	    };
			};
	},
	
	//安装资源录入 页面 吊装工程服务商 查询按钮   1
	installPlan_AZZYLR_DZGCFWS_CXButton:function(){
		this_obj=this;
		var jg=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_JG').getValue();
		if(jg==""){
			WL.Toast.show("请输入查询条件!");
		}else{
/*			var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
			if(!datads){
				datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
			};
			datads.setData([]);*/
			var installplan_AZZYLR_CXButton_num=1;
			Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
			this_obj.installPlan_AZZYLR_FWS_GGCXFF(this_obj,jg);
		};
	},
	
	//安装资源录入 页面 搭棚工程服务商 查询按钮   2
	installPlan_AZZYLR_DPGCFWS_CXButton:function(){
		this_obj=this;
		var jg=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_JG').getValue();
		if(jg==""){
			WL.Toast.show("请输入查询条件!");
		}else{
/*			var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
			if(!datads){
				datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
			};
			datads.setData([]);*/
			var installplan_AZZYLR_CXButton_num=2;
			Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
			this_obj.installPlan_AZZYLR_FWS_GGCXFF(this_obj,jg);
		};
	},
	
	//安装资源录入 页面 安装工程服务商 查询按钮  3
	installPlan_AZZYLR_AZGCFWS_CXButton:function(){
		this_obj=this;
		var jg=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_JG').getValue();
		if(jg==""){
			WL.Toast.show("请输入查询条件!");
		}else{
/*			var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
			if(!datads){
				datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
			};
			datads.setData([]);*/
			var installplan_AZZYLR_CXButton_num=3;
			Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
			this_obj.installPlan_AZZYLR_FWS_GGCXFF(this_obj,jg);
		};
	},
	
	//安装资源录入 服务商 公共查询方法
	installPlan_AZZYLR_FWS_GGCXFF:function(obj,condition){
		var Trim="{'vendor_name':'"+condition+"','inst_person_id':'"+init_person_id+"'}";
		//console.log('Trim: '+Trim);
		//查询结果显示界面
		var station=function(json){
			//console.log("json: "+JSON.stringify(json));
			if(!ovlay_MainTain2){
				//console.log('进来list来了');
				ovlay_MainTain2=Ext.Viewport.add({
					xtype:'panel',
					id:'statPanel_AZLR',
       		     	hideOnMaskTap: true,
       		     	style:'height:80%;width:90%;',
	     	        centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            style:'height:100%;width:100%;',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'InstallPlanAZLR_HDCXZ',
 		        		   store:'InstallAZZYLRStoreOne',
 		        		   style:'height:100%;width:100%;',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{VENDOR_NAME}<div>',
 		        		       ]
    		            }] 	
    		         }]
				});
				//
			}else{
				ovlay_MainTain2.show();
			};
			var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreOne');
			if(!datads){
				datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreOne');
			}
			datads.setData(json.vendor_name);
			//console.log('数据长度:'+json.vendor_name.length);
		};
		obj.connectServer(station,"remote/installProcessAction.do?method=toSearchVendor",Trim);
	},
	
	//获取选中的服务商 并查询出对应的人员   公共的
	InstallPlanAZLR_HDCXZ:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreOne');
		if(!datads){
			datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreOne');
		};
		var VENDOR_NAME=datads.getAt(index).get('VENDOR_NAME');
		var VENDOR_ID=datads.getAt(index).get('VENDOR_ID');
		
		var installplan_AZZYLR_CXButton_num=Ext.getCmp('installplan_AZZYLR_CXButton_num').getValue();
		if(installplan_AZZYLR_CXButton_num==1){
			panduan(1);
			Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').setValue(VENDOR_NAME);
			Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS_hidden').setValue(VENDOR_ID);
		}else if(installplan_AZZYLR_CXButton_num==2){
			panduan(2);
			Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').setValue(VENDOR_NAME);
			Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS_hidden').setValue(VENDOR_ID);
		}else if(installplan_AZZYLR_CXButton_num==3){
			panduan(3);
			Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').setValue(VENDOR_NAME);
			Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS_hidden').setValue(VENDOR_ID);
		};
		
		//判断
		function panduan(count){
			//获取吊装数据仓
			 var datadTwoDZ=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
			 if(!datadTwoDZ){
				 datadTwoDZ=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
			};
			 var DATATwo=datadTwoDZ.getData();
			 var dz=DATATwo.length;
			 
			//获取搭棚数据仓
			 var datadTwoDP=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
			 if(!datadTwoDP){
				 datadTwoDP=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
			};
			 var DATATwo=datadTwoDP.getData();
			 var dp=DATATwo.length;
			 
			//获取安装数据仓
			 var datadTwoAZ=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
			 if(!datadTwoAZ){
				 datadTwoAZ=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
			};
			var DATATwo=datadTwoAZ.getData();
			 var az=DATATwo.length;
			 
			var data='';
			if(count==1){
				data=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').getValue();
				if(data!=''&&dz!=0){
					navigator.notification.confirm('删除已添加人员！',function(btn){
			 			if(btn ==2){
			 				datadTwoDZ.setData([]);
			 			}else{
			 				return;
			 			};
			 		},"提示","取消,确定");
				};
			}else if(count==2){
				data=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').getValue();
				if(data!=''&&dp!=0){
					navigator.notification.confirm('删除已添加人员！',function(btn){
			 			if(btn ==2){
			 				datadTwoDP.setData([]);
			 			}else{
			 				return;
			 			};
			 		},"提示","取消,确定");
				};
			}else if(count==3){
				data=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').getValue();
				if(data!=''&&az!=0){
					navigator.notification.confirm('删除已添加人员！',function(btn){
			 			if(btn ==2){
			 				datadTwoAZ.setData([]);
			 			}else{
			 				return;
			 			};
			 		},"提示","取消,确定");
				};
			};
		};
		
		//隐藏显示界面
		var listPanel=Ext.getCmp('statPanel_AZLR');
		listPanel.hide();
		
		//查询人员
		var Trim="{'vendor_id':'"+VENDOR_ID+"','inst_person_id':'"+init_person_id+"'}";
		this.connectServer(this.InstallPlanAZLR_HDCXZ2,"remote/installProcessAction.do?method=toSearchIntPerson",Trim);
	},
	
	//处理人员的方法
	InstallPlanAZLR_HDCXZ2:function(result){
		console.log(JSON.stringify(result));
		var dz=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_JG').getValue();
		var dp=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_JG').getValue();
		var az=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_JG').getValue();
		
		var installplan_AZZYLR_CXButton_num=Ext.getCmp('installplan_AZZYLR_CXButton_num').getValue();
		if(installplan_AZZYLR_CXButton_num==1&&dz==''){
			var data1="[{'value':'"+'无'+"','text':'"+'无'+"'}]";
			//installplan_AZZYLR_DZRY_ARRAY=Data;
			Ext.getCmp('installPlanAZLR_DZRY').setOptions(eval(data1));
			return;
		}else if(installplan_AZZYLR_CXButton_num==2&&dp==''){
			var data1="[{'value':'"+'无'+"','text':'"+'无'+"'}]";
			//installplan_AZZYLR_DPRY_ARRAY=Data;
			Ext.getCmp('installPlanAZLR_DPRY').setOptions(eval(data1));
			return;
		}else if(installplan_AZZYLR_CXButton_num==3&&az==''){
			var data1="[{'value':'"+'无'+"','text':'"+'无'+"'}]";
			//installplan_AZZYLR_AZRY_ARRAY=Data;
			Ext.getCmp('installPlanAZLR_AZRY').setOptions(eval(data1));
			return;
		};
		
		
		/* if(result.length==undefined){
			 alert('null : '+langth);
		}else if(result.person_name.IDS.length>0){
			
		};*/
		
		/*alert('langth : '+langth);*/
		//往数据仓中添加数据
		var langth=result.person_name.IDS.length;
		var Data=[];
		var	data1="[";
		if(langth>0){
			//添加数据
			var IDS=result.person_name.IDS;
			var NAMES=result.person_name.NAMES;
			//分解
			var NewIDS=IDS.split('-');
			var NewNAMES=NAMES.split('-');
			//长度
			var num=NewIDS.length;
			for(var i=0;i<num;i++){
	  			var trim={IDS:NewIDS[i],NAMES:NewNAMES[i]};
	  			if(i!=num-1){
	  				data1+="{'value':'"+NewIDS[i]+"','text':'"+NewNAMES[i]+"'},";
	  			}else{
	  				data1+="{'value':'"+NewIDS[i]+"','text':'"+NewNAMES[i]+"'}";
	  			};
	  			Data[i]=trim;
	  		};
	  		/*//往数据仓中添加数据
	  		datads.setData(Data);*/
		}else{
			data1+="{'value':'"+'无'+"','text':'"+'无'+"'}";
		};
  		data1+="]";
  		
  		//选择下拉列表
		if(installplan_AZZYLR_CXButton_num==1){
			var installplan_AZZYLR_DZRY_ARRAY=Data;
			installplan_AZZYLR_DZRY_ARRAY=JSON.stringify(installplan_AZZYLR_DZRY_ARRAY);
			Ext.getCmp('installplan_AZZYLR_DZRY_ARRAY').setValue(installplan_AZZYLR_DZRY_ARRAY);
			Ext.getCmp('installPlanAZLR_DZRY').setOptions(eval(data1));
		}else if(installplan_AZZYLR_CXButton_num==2){
			var installplan_AZZYLR_DPRY_ARRAY=Data;
			installplan_AZZYLR_DPRY_ARRAY=JSON.stringify(installplan_AZZYLR_DPRY_ARRAY);
			Ext.getCmp('installplan_AZZYLR_DPRY_ARRAY').setValue(installplan_AZZYLR_DPRY_ARRAY);
			Ext.getCmp('installPlanAZLR_DPRY').setOptions(eval(data1));
		}else if(installplan_AZZYLR_CXButton_num==3){
			installplan_AZZYLR_AZRY_ARRAY=Data;
			installplan_AZZYLR_AZRY_ARRAY=JSON.stringify(installplan_AZZYLR_AZRY_ARRAY);
			Ext.getCmp('installplan_AZZYLR_AZRY_ARRAY').setValue(installplan_AZZYLR_AZRY_ARRAY);
			Ext.getCmp('installPlanAZLR_AZRY').setOptions(eval(data1));
		};
  		
	},

	//添加吊装人员
	installPlanAZZY_AddDZRY:function(){
			//选中吊装人员的IDS
			var id=Ext.getCmp('installPlanAZLR_DZRY').getValue();
			console.log(id);
			var installplan_AZZYLR_CXButton_num=1;
			Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
			this.installPlanAZZY_AddButton_GG(id,'InstallAZZYLRStoreThree');
	},
	
	//增加搭棚人员
	installPlanAZZY_AddDPRY:function(){
			var id=Ext.getCmp('installPlanAZLR_DPRY').getValue();
			console.log(id);
			var installplan_AZZYLR_CXButton_num=2;
			Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
			this.installPlanAZZY_AddButton_GG(id,'InstallAZZYLRStoreFour');
	},
	
	//增加安装人员
	installPlanAZZY_AddAZRY:function(){
		var startime=Ext.getCmp('installPlanAZLR_STARTIME').getValue();
		var endtime=Ext.getCmp('installPlanAZLR_ENDTIME').getValue();
		if(startime==''){
			WL.Toast.show("请选择计划开始时间！");
			return;
		}else if(endtime==''){
			WL.Toast.show("请选择计划结束时间！");
			return;
		}else if(startime>endtime){
			WL.Toast.show("结束时间不能早于开始时间！");
			return;
		};
		//alert(startime+endtime);
		var id=Ext.getCmp('installPlanAZLR_AZRY').getValue();
		console.log(id);
		var installplan_AZZYLR_CXButton_num=3;
		Ext.getCmp('installplan_AZZYLR_CXButton_num').setValue(installplan_AZZYLR_CXButton_num);
		this.installPlanAZZY_AddButton_GG(id,'InstallAZZYLRStoreFive');
	},
	
	//添加的的公共方法   
	installPlanAZZY_AddButton_GG:function(id,stroeName){
		if(id!='无'&&id!=null){
			var datads=Ext.data.StoreManager.get('InstallAZZYLRStoreTwo');
			if(!datads){
				datads=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreTwo');
			};
			//选择下拉列表 被改变了
			var installplan_AZZYLR_CXButton_num=Ext.getCmp('installplan_AZZYLR_CXButton_num').getValue();
			if(installplan_AZZYLR_CXButton_num==1){
				var installplan_AZZYLR_DZRY_ARRAY=Ext.getCmp('installplan_AZZYLR_DZRY_ARRAY').getValue();
				installplan_AZZYLR_DZRY_ARRAY=eval("("+ installplan_AZZYLR_DZRY_ARRAY +")");
				datads.setData(installplan_AZZYLR_DZRY_ARRAY);
				console.log(JSON.stringify(installplan_AZZYLR_DZRY_ARRAY));
			}else if(installplan_AZZYLR_CXButton_num==2){
				var installplan_AZZYLR_DPRY_ARRAY=Ext.getCmp('installplan_AZZYLR_DPRY_ARRAY').getValue();
				installplan_AZZYLR_DPRY_ARRAY=eval("("+ installplan_AZZYLR_DPRY_ARRAY +")");
				datads.setData(installplan_AZZYLR_DPRY_ARRAY);
			}else if(installplan_AZZYLR_CXButton_num==3){
				var installplan_AZZYLR_AZRY_ARRAY=Ext.getCmp('installplan_AZZYLR_AZRY_ARRAY').getValue();
				installplan_AZZYLR_AZRY_ARRAY=eval("("+ installplan_AZZYLR_AZRY_ARRAY +")");
				datads.setData(installplan_AZZYLR_AZRY_ARRAY);
			};
			
			//获取NAMES
			 var DATA=datads.getData();
			 var length=DATA.length;
			 var NAMES='';
			 for(var i=0;i<length;i++){
				if(id==DATA.items[i].data.IDS){
					NAMES=DATA.items[i].data.NAMES;
				};
			 };
			 //获取人员数据仓中的数据 并判断是否可以添加
			 var datadTwo=Ext.data.StoreManager.get(stroeName);
			 if(!datadTwo){
				datadTwo=Ext.create('HelcPDA.store.install.installplan.'+stroeName);
			};
			 var DATATwo=datadTwo.getData();
			 var DATATwoLength=DATATwo.length;
			 var NewDATA=[];
			 var flag=false;
			 for(var i=0;i<DATATwoLength;i++){
				 var trim={};
				 trim.IDS=DATATwo.items[i].data.IDS;
				 trim.NAMES=DATATwo.items[i].data.NAMES;
				 //特别 当添加安装人员时
				 if(installplan_AZZYLR_CXButton_num==3){
					 var startime=Ext.getCmp('installPlanAZLR_STARTIME').getValue();
					 var endtime=Ext.getCmp('installPlanAZLR_ENDTIME').getValue();
					/* var newStar = Ext.Date.format(startime,'Y-m-d');
					 var newEnd = Ext.Date.format(endtime,'Y-m-d');*/
					 trim.TIME=startime+' 至 '+endtime;
				 };
				 NewDATA[i]=trim;
				 if(DATATwo.items[i].data.IDS==id&&DATATwo.items[i].data.NAMES==NAMES){
					flag=true;
				 };
			 };
			 //判断装载吊装人员的数据仓是否添加
			 if(!flag){
				 var trim={};
				 trim.IDS=id;
				 trim.NAMES=NAMES;
				 if(installplan_AZZYLR_CXButton_num==3){
					 var startime=Ext.getCmp('installPlanAZLR_STARTIME').getValue();
					 var endtime=Ext.getCmp('installPlanAZLR_ENDTIME').getValue();
				
					 trim.TIME=startime+' 至 '+endtime;
				 };
				 NewDATA[DATATwoLength]=trim;
			 };
			 datadTwo.setData(NewDATA);
	
		}else{
			
		};
	},
	
	//删除添加的吊装人员
	installPlanAZZYLR_DZStore:function(obj, index, target, record, e, eOpts ){
		var this_obj=this;
		if(event.target.id=='dz'){
			navigator.notification.confirm('删除人员？',function(btn){
	 			if(btn ==2){
	 				this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreThree');
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			 Ext.Msg.confirm('消息','删除人员？',function(btn){
//					if (btn == 'yes'){
//						this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreThree');
//					}else{
//						return;
//					};
//    			});
		};
	},
	
	//删除添加的搭棚人员
	installPlanAZZYLR_DPStore:function(obj, index, target, record, e, eOpts ){
		var this_obj=this;
		if(event.target.id=='dz'){
			navigator.notification.confirm('删除人员？',function(btn){
	 			if(btn ==2){
	 				this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreFour');
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			 Ext.Msg.confirm('消息','删除人员？',function(btn){
//					if (btn == 'yes'){
//						this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreFour');
//					}else{
//						return;
//					};
//    			});
		};
	},
	
	////删除添加的安装人员
	installPlanAZZYLR_AZStore:function(obj, index, target, record, e, eOpts ){
		var this_obj=this;
		if(event.target.id=='dz'){
			navigator.notification.confirm('删除人员？',function(btn){
	 			if(btn ==2){
	 				this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreFive');
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			 Ext.Msg.confirm('消息','删除人员？',function(btn){
//					if (btn == 'yes'){
//						this_obj.installPlanAZZYLR_StoreSCGG(index,'InstallAZZYLRStoreFive');
//					}else{
//						return;
//					};
//    			});
		};
	},
	
	//删除人员的公共方法
	installPlanAZZYLR_StoreSCGG:function(index,stroeName){
		 var datadTwo=Ext.data.StoreManager.get(stroeName);
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.'+stroeName);
		};
		 /*var DATA=datadTwo.getData();
		console.log(DATA.length);
		 console.log(DATA);*/
		//获取删除条件
		var IDS=datadTwo.getAt(index).get('IDS');
		var NAMES=datadTwo.getAt(index).get('NAMES');
		//删除数据
		var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 if(DATATwo.items[i].data.IDS!=IDS&&DATATwo.items[i].data.NAMES!=NAMES){
				 var trim={};
				 trim.IDS=DATATwo.items[i].data.IDS;
				 trim.NAMES=DATATwo.items[i].data.NAMES;
				 NewDATA[i]=trim;
			 };
		 };
		 datadTwo.setData(NewDATA);
	},
	
	//安装资源录入 页面  提交按钮
	installplan_AZZYLR_TJButton:function(){
		//获取吊装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
		};
		 var DATATwo=datadTwo.getData();
		 var dz=DATATwo.length;
		 
		//获取搭棚数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
		};
		 var DATATwo=datadTwo.getData();
		 var dp=DATATwo.length;
		 
		//获取安装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
		};
		var DATATwo=datadTwo.getData();
		 var az=DATATwo.length;

		//判断最少要有一个服务商
		var dzFW=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').getValue();
		var dpFW=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').getValue();
		var azFW=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').getValue();
		var count=0;
		for(var i=0;i<3;i++){
			if(dzFW!=''){
				count++;
			}else if(dpFW!=''){
				count++;
			}else if(azFW!=''){
				count++;
			};
		};
		if(count==0){
			WL.Toast.show("至少选择一个服务商!");
			return;
		};
		var this_obj=this;
		var installplan_AZZYLR_Ctrl_num=Ext.getCmp('installplan_AZZYLR_Ctrl_num').getValue();
		
		//手机上用
		/*navigator.notification.confirm('提交数据？',function(btn){
 			if(btn ==2){
				if(installplan_AZZYLR_Ctrl_num==1){
					this_obj.installplan_AZZYLR_TJButton2(this_obj);
				}else if(installplan_AZZYLR_Ctrl_num==2){
					this_obj.installplan_AZZYLR_TJButton3(this_obj);
				};
			}else{
 				return;
 			}
 		},"提示","取消,确定");*/
		
		Ext.Msg.confirm('消息','提交数据？',function(btn){
			if (btn == 'yes'){
				//alert('installplan_AZZYLR_Ctrl_num='+installplan_AZZYLR_Ctrl_num);
				if(installplan_AZZYLR_Ctrl_num==1){
					this_obj.installplan_AZZYLR_TJButton2(this_obj);
				}else if(installplan_AZZYLR_Ctrl_num==2){
					this_obj.installplan_AZZYLR_TJButton3(this_obj);
				};
			}else{
				return;
			};
    	});

		
	},
	
	//提交方法  单个
	installplan_AZZYLR_TJButton2:function(obj){
		//资源录入需要的数据  工号 从JSON中获取的
		var installplanZYLR_RESULT_XY=Ext.getCmp('installplanZYLR_RESULT_XY').getValue();
		installplanZYLR_RESULT_XY=eval("("+ installplanZYLR_RESULT_XY +")");
		
		console.log('我想要的数据TASK_PROCESS_ID:'+JSON.stringify(installplanZYLR_RESULT_XY[0].json.stext.TASK_PROCESS_ID));
		console.log('我想要的数据TASK_ID:'+JSON.stringify(installplanZYLR_RESULT_XY[0].json.stext.TASK_ID));
		console.log('我想要的数据userid:'+userid);
		console.log('我想要的数据sbl_row_id:'+sbl_row_id);
		console.log('我想要的数据person_id:'+person_id);
		console.log('我想要的数据ebs_user_id:'+ebs_user_id);
		console.log('我想要的数据init_person_id:'+init_person_id);
		
		var dzID=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS_hidden').getValue();
		var dpID=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS_hidden').getValue();
		var azID=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS_hidden').getValue();
		
		console.log('我想要的数据LIFT_VENDOR_ID:'+dzID);
		console.log('我想要的数据BUILD_VENDOR_ID:'+dpID);
		console.log('我想要的数据INST_VENDOR_ID:'+azID);
		
		var DataValue={};
		//获取吊装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 NewDATA[i]=trim;
		 };
		 DataValue.LIFT_STAFF=NewDATA;
		 
		//获取搭棚数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 NewDATA[i]=trim;
		 };
		 DataValue.BUILD_STAFF=NewDATA;
		 
		//获取安装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 var time=DATATwo.items[i].data.TIME;
			 var times=time.split("至");
			 var startime=times[0].trim();
			 var endtime=times[1].trim();

			 trim.startDate=startime;
			 trim.endDate=endtime;
			 NewDATA[i]=trim;
		 };
		 DataValue.INSTALL_STAFF=NewDATA;
		 console.log('我想要的数据INST_VENDOR_ID:'+JSON.stringify(DataValue));
		
		//收集提交数据
		var Trim={};
		Trim.TASK_PROCESS_ID=installplanZYLR_RESULT_XY[0].json.stext.TASK_PROCESS_ID;
		Trim.TASK_ID=installplanZYLR_RESULT_XY[0].json.stext.TASK_ID;
		Trim.value=DataValue;
		Trim.userid=userid;
		Trim.sbl_row_id=sbl_row_id;
		Trim.person_id=person_id;
		Trim.ebs_user_id=ebs_user_id;
		Trim.init_person_id=init_person_id;
		
		Trim.LIFT_VENDOR_ID=dzID;
		Trim.BUILD_VENDOR_ID=dpID;
		Trim.INST_VENDOR_ID=azID;
		
		//获得单个提交的数据
		Ext.getCmp('installplan_PLZYLR_ZYLR_TRIM').setValue(JSON.stringify(Trim));
		obj.connectServerMainTain(obj.installplan_AZZYLR_TJButton_JG,obj,"remote/installPlanAction.do?method=toAdd_Vendor_Person",JSON.stringify(Trim));
		
	},
	
	//单个提交存储JSON数据
	installplan_AZZYLR_TJButton2_DGCC:function(){
		//JSON删除和存储   2014-7-8
		//合同号
		var ht=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
		//工号
		var gh=Ext.getCmp('HP_ELEVATOR_NO').getValue();
		//批次
		var pc=Ext.getCmp('HP_SEQ_NUM').getValue();
		var trim=ht+'/'+gh+'/'+pc;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'AZZYLR',tid:trim,};
    	
    	var installplan_PLZYLR_ZYLR_TRIM=Ext.getCmp('installplan_PLZYLR_ZYLR_TRIM').getValue();
    	installplan_PLZYLR_ZYLR_TRIM=eval("("+ installplan_PLZYLR_ZYLR_TRIM +")");
    	
    	var queryAdd={tcode:'AZZYLR',tid:trim,stext:installplan_PLZYLR_ZYLR_TRIM};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			var num=arrayResults.length;
			if(num!=0){
				MaintainList.remove(query,options).then(function(){
					console.log('安装资源录入数据删除成功');
					MaintainList.add(queryAdd).then(function(){
						console.log('安装资源录入数据添加成功');
						
					}).fail(function(errorObject){
			    		WL.Toast.show("安装资源录入数据添加失败");
					});
				}).fail(function(errorObject){
		    		WL.Toast.show("安装资源录入数据删除失败");
				});
			}else if(num==0){
				MaintainList.add(queryAdd).then(function(){
					console.log('安装资源录入数据添加成功');
					
				}).fail(function(errorObject){
		    		WL.Toast.show("安装资源录入数据添加失败");
				});
			};
		}).fail(function(errorObject){
    		WL.Toast.show("安装资源录入数据查询失败");
		});
		
	},
	
	//提交方法  批量
	installplan_AZZYLR_TJButton3:function(obj){
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		
		var installplan_PLZYLR_FXK_SHUZU=Ext.getCmp('installplan_PLZYLR_FXK_SHUZU').getValue();
		installplan_PLZYLR_FXK_SHUZU=eval("("+ installplan_PLZYLR_FXK_SHUZU +")");
		var num=installplan_PLZYLR_FXK_SHUZU;
		var numI=installplan_PLZYLR_FXK_SHUZU.length;
		for(var i=0;i<numI;i++){
			console.log('我想要的数据TASK_PROCESS_ID:'+MaintList2.getAt(num[i]).get('TASK_PROCESS_ID'));
			console.log('我想要的数据TASK_ID:'+MaintList2.getAt(num[i]).get('TASK_ID'));
		};
		
		//服务商ID
		var dzID=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS_hidden').getValue();
		var dpID=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS_hidden').getValue();
		var azID=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS_hidden').getValue();
		
		console.log('我想要的数据LIFT_VENDOR_ID:'+dzID);
		console.log('我想要的数据BUILD_VENDOR_ID:'+dpID);
		console.log('我想要的数据INST_VENDOR_ID:'+azID);
		
		var DataValue={};
		//获取吊装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 NewDATA[i]=trim;
		 };
		 DataValue.LIFT_STAFF=NewDATA;
		 
		//获取搭棚数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 NewDATA[i]=trim;
		 };
		 DataValue.BUILD_STAFF=NewDATA;
		 
		//获取安装数据仓
		 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
		 if(!datadTwo){
			datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
		};
		 var DATATwo=datadTwo.getData();
		 var DATATwoLength=DATATwo.length;
		 var NewDATA=[];
		 for(var i=0;i<DATATwoLength;i++){
			 var trim={};
			 trim.INST_VENDOR_ID=DATATwo.items[i].data.IDS;
			 trim.INST_VENDOR=DATATwo.items[i].data.NAMES;
			 
			 var time=DATATwo.items[i].data.TIME;
			 var times=time.split("至");
			 var startime=times[0].trim();
			 var endtime=times[1].trim();
			 
			 trim.startDate=startime;
			 trim.endDate=endtime;
			 NewDATA[i]=trim;
		 };
		 DataValue.INSTALL_STAFF=NewDATA;
		 
		//收集提交数据
		 var Trim={};
		Trim.TASK_PROCESS_ID=MaintList2.getAt(num[0]).get('TASK_PROCESS_ID');
		Trim.TASK_ID=MaintList2.getAt(num[0]).get('TASK_ID');
		Trim.value=DataValue;
		Trim.userid=userid;
		Trim.sbl_row_id=sbl_row_id;
		Trim.person_id=person_id;
		Trim.ebs_user_id=ebs_user_id;
		Trim.init_person_id=init_person_id;
			
		Trim.LIFT_VENDOR_ID=dzID;
		Trim.BUILD_VENDOR_ID=dpID;
		Trim.INST_VENDOR_ID=azID;
		
		//获得批量提交的数据
		Ext.getCmp('installplan_PLZYLR_ZYLR_TRIM').setValue(JSON.stringify(Trim));
		
		var ONEcount=0;
		obj.connectServerMainTain(OneIterationMethod,obj,"remote/installPlanAction.do?method=toAdd_Vendor_Person",JSON.stringify(Trim));
		function OneIterationMethod(result,obj){
			ONEcount++;
			if(ONEcount>=numI){
				obj.installplan_AZZYLR_TJButton_JG(result,obj);
				return;
			};
			Trim.TASK_PROCESS_ID=MaintList2.getAt(num[ONEcount]).get('TASK_PROCESS_ID');
			Trim.TASK_ID=MaintList2.getAt(num[ONEcount]).get('TASK_ID');
			
			obj.connectServerMainTain(OneIterationMethod,obj,"remote/installPlanAction.do?method=toAdd_Vendor_Person",JSON.stringify(Trim));
		};
		
	},
	
	//批量提交    存储JSON数据
	installplan_AZZYLR_TJButton3_PLCC:function(obj,dz,dp,az){
		console.log('/////////////////////////////////////////////////////////');
		//获得批量提交的合同号、工号、批次
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		
		var installplan_PLZYLR_FXK_SHUZU=Ext.getCmp('installplan_PLZYLR_FXK_SHUZU').getValue();
		installplan_PLZYLR_FXK_SHUZU=eval("("+ installplan_PLZYLR_FXK_SHUZU +")");
		var num=installplan_PLZYLR_FXK_SHUZU.length;
		var TrimTJ=[];//添加
		var TrimSC=[];//删除
		for(var i=0;i<num;i++){
			//合同号
			var ht=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('ENGCONTRACT_NUMBER');
			//工号
			var gh=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('ELEVATOR_NO');
			//批次
			var pc=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('SEQ_NUM');
			//从JSONStore添加数据的条件
			var trim=ht+'/'+gh+'/'+pc;

			var queryRemove={tcode:'AZZYLR',tid:trim};
			
			var installplan_PLZYLR_ZYLR_TRIM=Ext.getCmp('installplan_PLZYLR_ZYLR_TRIM').getValue();
	    	installplan_PLZYLR_ZYLR_TRIM=eval("("+ installplan_PLZYLR_ZYLR_TRIM +")");
			
	    	var queryAdd={tcode:'AZZYLR',tid:trim,stext:installplan_PLZYLR_ZYLR_TRIM};
			TrimTJ[i]=queryAdd;
			TrimSC[i]=queryRemove;
			console.log('queryAdd  '+JSON.stringify(queryAdd));
		};
		//JSON删、存
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={
			exacte:false,//默认
		};
		console.log(JSON.stringify(TrimSC));
		MaintainList.find(TrimSC,options).then(function(arrayResults){
			var num=arrayResults.length;
			console.log('installplan_AZZYLR_TJButton3_PLCC   '+JSON.stringify(arrayResults));
        		
			if(num!=0){
				var index=0;
				function xhsc(){
					if(index<num){
						MaintainList.remove(TrimSC[index]).then(function(){
							console.log('安装资源录入数据删除成功'+index);
							xhsc();
				    	}).fail(function(errorObject){
					    	WL.Toast.show("安装资源录入数据删除失败");
						});
						index++;
					}else if(index==num){
						MaintainList.add(TrimTJ).then(function(){
							console.log('安装资源录入数据添加成功');
							console.log('我是第一installplan_AZZYLR_TJButton3_PLCC（批量提交存储JSON数据）');
							//提交后修改JSON
				    	    obj.installplan_AZZYLR_SHUJUGENGGAI_PL(dz,dp,az);
				    	    return;
						}).fail(function(errorObject){
					   		WL.Toast.show("安装资源录入数据添加失败");
						});
					};
					//alert('循环删除');
				};
				xhsc();
				
			}else if(num==0){
				MaintainList.add(TrimTJ).then(function(){
					console.log('安装资源录入数据添加成功');
					console.log('我是第一installplan_AZZYLR_TJButton3_PLCC（批量提交存储JSON数据）');
					//提交后修改JSON
					obj.installplan_AZZYLR_SHUJUGENGGAI_PL(dz,dp,az);
		    	    
				}).fail(function(errorObject){
			   		WL.Toast.show("安装资源录入数据添加失败");
				});
			};
			
		}).fail(function(errorObject){
	    	WL.Toast.show("安装资源录入数据查找失败");
		});
		
		
	},
	
	//提交后的结果  公共
	installplan_AZZYLR_TJButton_JG:function(result,obj){
		//获得供应商
		var dz=Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').getValue();
		var dp=Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').getValue();
		var az=Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').getValue();
		//清空
		installplan_AZZYLR_QingKongTEXT();
		
		console.log(JSON.stringify(result));
		if(result.msginfo!='保存成功'){
			WL.Toast.show("提交失败!");
			return;
		};
		WL.Toast.show("提交成功!");
		var installplan_AZZYLR_Ctrl_num=Ext.getCmp('installplan_AZZYLR_Ctrl_num').getValue();
		if(installplan_AZZYLR_Ctrl_num==1){
			obj.showBackView("installplan_AZJHXXHomePage","HelcPDA.view.install.installplan.InstallPlanAZJHXXHomePage");
			Ext.getCmp('HP_LIFT_VENDOR').setValue(dz);
    		Ext.getCmp('HP_BUILD_VENDOR').setValue(dp);
    		Ext.getCmp('HP_INST_VENDOR').setValue(az);
    		
			//提交后修改JSON
    		obj.installplan_AZZYLR_SHUJUGENGGAI_DG();
    		//提交后添加JSOn 2014-12-5
    		//obj.installplan_AZZYLR_TJButton2_DGCC();
    		
		}else if(installplan_AZZYLR_Ctrl_num==2){
			obj.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
			var sele=document.getElementsByName('groupCheckboxinstall');
    	    for ( var i = 0; i <sele.length; i++)  
    	    {  
    	      // 提取控件  
    	      var checkbox = sele[i];  
    	      checkbox.style.color='#ccc';
    	    };
    	    //批量提交存储JSON数据
    	    obj.installplan_AZZYLR_TJButton3_PLCC(obj,dz,dp,az);
    	  
		};
	},
	
	//单个提交后更改JSON中的数据
	installplan_AZZYLR_SHUJUGENGGAI_DG:function(){
		//合同号
		var ht=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
		//工号
		var gh=Ext.getCmp('HP_ELEVATOR_NO').getValue();
		//批次
		var pc=Ext.getCmp('HP_SEQ_NUM').getValue();
		
		//从JSONStore中查询数据
		var trim=ht+'/'+gh+'/'+pc;
		console.log('安装计划详细查询条件:'+trim);
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	
    	var installTcode=Ext.getCmp('installTcode').getValue();
    	
    	var query={tcode:installTcode,tid:trim};
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		console.log('查找到得数据：'+JSON.stringify(arrayResults));
    		
    		var num=arrayResults.length;
    		var id=arrayResults[0]._id;
    		console.log('查询到的台数: '+num);
    		var item=arrayResults[num-1].json.stext;
    		var progress=arrayResults[num-1].json.ext1;
    		
    		var dz=Ext.getCmp('HP_LIFT_VENDOR').getValue();
    		var dp=Ext.getCmp('HP_BUILD_VENDOR').getValue();
    		var az=Ext.getCmp('HP_INST_VENDOR').getValue();
    		
    		item.dzNAME=dz;
    		item.dpNAME=dp;
    		item.dwNAME=az;
    		
    		var document={_id:id,json:{tcode:installTcode,tid:trim,stext:item,ext1:progress}};
    		console.log('替换后的数据数据：'+JSON.stringify(arrayResults));
    		var options={};//默认
    		MaintainList.replace(document,options).then(function(){
    			console.log('替换成功');
    		}).fail(function(){
    			console.log('替换失败');
    		});

    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	//批量 提交后更改JSON中的数据
	installplan_AZZYLR_SHUJUGENGGAI_PL:function(dz,dp,az){
		console.log('/////////////////////////////////////////////////////////');
		//获得批量提交的合同号、工号、批次
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		
		var installplan_PLZYLR_FXK_SHUZU=Ext.getCmp('installplan_PLZYLR_FXK_SHUZU').getValue();
		installplan_PLZYLR_FXK_SHUZU=eval("("+ installplan_PLZYLR_FXK_SHUZU +")");
		var num=installplan_PLZYLR_FXK_SHUZU.length;
		var TrimSelectTJ=[];//添加
		
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		for(var i=0;i<num;i++){
			//合同号
			var ht=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('ENGCONTRACT_NUMBER');
			//工号
			var gh=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('ELEVATOR_NO');
			//批次
			var pc=MaintList2.getAt(installplan_PLZYLR_FXK_SHUZU[i]).get('SEQ_NUM');
			//从JSONStore添加数据的条件
			var trim=ht+'/'+gh+'/'+pc;
			var queryfind={tcode:installTcode,tid:trim};
			TrimSelectTJ[i]=queryfind;
			console.log(JSON.stringify(queryfind));
		};
		//查找
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={
			exacte:false,//默认
		};
		MaintainList.find(TrimSelectTJ,options).then(function(arrayResults){
    		console.log('批量查找到得数据：'+JSON.stringify(arrayResults));
    		var num=arrayResults.length;
    		var TRIM=[];//用于存放替换条件
    		if(num!=0){
    			for(var i=0;i<num;i++){
    				var id=arrayResults[i]._id;
    				console.log('查询到的台数: '+num);
    				
    	    		var item=arrayResults[i].json.stext;
    	    		var progress=arrayResults[i].json.ext1;
    	    		var mytrim=arrayResults[i].json.tid;
    	    		
    	    		item.dzNAME=dz;
    	    		item.dpNAME=dp;
    	    		item.dwNAME=az;
    	    		
    	    		var document={_id:id,json:{tcode:installTcode,tid:mytrim,stext:item,ext1:progress}};
    	    		console.log('批量替换后的数据数据：'+JSON.stringify(arrayResults));
    	    		TRIM[i]=document;
    			};
    		};
    		//替换
    		MaintainList.replace(TRIM,options).then(function(){
    			console.log('批量替换成功');
    			console.log('我是第二installplan_AZZYLR_SHUJUGENGGAI_PL（批量 提交后更改JSON中的数据）');
    		}).fail(function(){
    			console.log('批量替换失败');
    		});
		}).fail(function(errorObject){
			console.log("批量查询数据失败");
		});
		
	},
	
	
});

//清空单个资源录入的文本框
function  installplan_AZZYLR_QingKongTEXT(){
	//查询框中的服务商
	Ext.getCmp('installPlan_AZZYLR_DZGCFWS_JG').setValue();
	Ext.getCmp('installPlan_AZZYLR_DPGCFWS_JG').setValue();
	Ext.getCmp('installPlan_AZZYLR_AZGCFWS_JG').setValue();
	//显示的服务商
	Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS').setValue();
	Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS').setValue();
	Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS').setValue();
	//隐藏框 服务商ID
	Ext.getCmp('installPlan_AZZYLR_DZGCFWS_DZGCFWSGS_hidden').setValue();
	Ext.getCmp('installPlan_AZZYLR_DPGCFWS_DPGCFWSGS_hidden').setValue();
	Ext.getCmp('installPlan_AZZYLR_AZGCFWS_AZGCFWSGS_hidden').setValue();
	//下拉列表
	var data1="[{'value':'"+''+"','text':'"+''+"'}]";
	Ext.getCmp('installPlanAZLR_DZRY').setOptions(eval(data1));
	Ext.getCmp('installPlanAZLR_DPRY').setOptions(eval(data1));
	Ext.getCmp('installPlanAZLR_AZRY').setOptions(eval(data1));
	//清空日期选中
	Ext.getCmp('installPlanAZLR_STARTIME').setValue();
	Ext.getCmp('installPlanAZLR_ENDTIME').setValue();
	//清空数据仓
	 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreThree');
	 if(!datadTwo){
		datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreThree');
	};
	datadTwo.setData([]);
	//获取安装数据仓
	 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFour');
	 if(!datadTwo){
		datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFour');
	};
	datadTwo.setData([]);
	//获取安装数据仓
	 var datadTwo=Ext.data.StoreManager.get('InstallAZZYLRStoreFive');
	 if(!datadTwo){
		datadTwo=Ext.create('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive');
	};
	datadTwo.setData([]);
};