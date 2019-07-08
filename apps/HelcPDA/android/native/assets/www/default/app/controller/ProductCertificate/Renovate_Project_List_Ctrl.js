
/* JavaScript content from app/controller/ProductCertificate/Renovate_Project_List_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.ProductCertificate.Renovate_Project_List_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//提交
			"button#Commit_Renovate_Project":{
				tap:'Commit_Renovate_Project'
			},
			//返回
			"button#Renvate_p_back":{
				tap:'Renvate_p_back'
			},
			//进入查找
			"button#btn_RP_search":{
				tap:'btn_RP_search'
			},
			//查找数据
			"button#RP_searchdata_btn":{
				tap:'RP_searchdata_btn'
			},
			//进入同步数据
			"button#btn_RP_update":{
				tap:'btn_RP_update'
			},
			//同步数据
			"button#RP_getdata_btn":{
				tap:'RP_getdata_btn'
			},
			//进入合同和工号层
			"list#RP_Head_list":{
				itemtap:'RP_Head_list'
			},
			//进入整改详细
			"list#RP_Line_list":{
				itemtap:'RP_Line_list'
			},
		}
	},
	
	//提交整改项目
	Commit_Renovate_Project : function(){
		var obj = this;
		var RP_LineStore = this.getStore('RP_LineStore','HelcPDA.store.ProductCertificate.RP_LineStore');
		var ELV_RENO_STATUS = Ext.getCmp('RP_ELV_RENO_STATUS').getValue();
		var COMMENTS = Ext.getCmp('RP_COMMENTS').getValue();
		var RP_ELV_RENO_STATUS = Ext.getCmp('RP_ELV_RENO_STATUS').getValue();
		var RP_ELV_RENO_STATUS_flag = Ext.getCmp('RP_ELV_RENO_STATUS_flag').getValue();
		if(Ext.getCmp('RP_ELEVATOR_NO').getValue()==""){
			Ext.Msg.alert("没有检测到工号，请重新获取数据");
			return;
		}
		if(Ext.getCmp('RP_CONTRACT_NO').getValue()==""){
			Ext.Msg.alert("没有检测到合同号，请重新获取数据");
			return;
		}
		if(RP_ELV_RENO_STATUS==""){
			Ext.Msg.alert("请选择整改状态");
			return;
		}
		if(ELV_RENO_STATUS=="无法整改" && COMMENTS==""){
			Ext.Msg.alert("请填写备注");
			return;
		}
		
		//提交
		navigator.notification.confirm('提交后不能再做修改!',function(btn){
 			if(btn ==2){
 				var RP_ELV_RENO_STATUS_flag = Ext.getCmp('RP_ELV_RENO_STATUS_flag').getValue();
 				if(RP_ELV_RENO_STATUS_flag=="RECTIFIED"||RP_ELV_RENO_STATUS_flag=="APPROVED"||RP_ELV_RENO_STATUS_flag=="UNRECTIFIED"
 					||RP_ELV_RENO_STATUS_flag=="已整改"||RP_ELV_RENO_STATUS_flag=="已审核"||RP_ELV_RENO_STATUS_flag=="不能整改"){
 					WL.Toast.show('无法提交,该工号已经做过整改');
 					return;
 				}
 				var RENOVATE_PROJECT_NUM = Ext.getCmp('RENOVATE_PROJECT_NUM').getValue();
 				var ELEVATOR_NO = Ext.getCmp('RP_ELEVATOR_NO').getValue();
 				var CONTRACT_NO = Ext.getCmp('RP_CONTRACT_NO').getValue();
 				var ELEVATOR_TYPE_NAME = Ext.getCmp('RP_ELEVATOR_TYPE_NAME').getValue();
 				var ELV_RENOVATE_DATE = Ext.getCmp('RP_ELV_RENOVATE_DATE').getValue();
 				var ELV_RENO_STATUS = Ext.getCmp('RP_ELV_RENO_STATUS').getValue();
 				var FINAL_USE_UNIT = Ext.getCmp('RP_FINAL_USE_UNIT').getValue();
 				var INSTALL_ADDRESS = Ext.getCmp('RP_INSTALL_ADDRESS').getValue();
 				var WORK_PERSON_NUM = Ext.getCmp('RP_WORK_PERSON_NUM').getValue();
 				var ACTUAL_WORK_PERSON_NUM = Ext.getCmp('RP_ACTUAL_WORK_PERSON_NUM').getValue();
 				var INT_RENOVATE_DETL_ID = Ext.getCmp('RP_INT_RENOVATE_DETL_ID').getValue();
 				var RENOVATE_PROJECT_LINE_ID = Ext.getCmp('RP_RENOVATE_PROJECT_LINE_ID').getValue();
 				var COMMENTS = Ext.getCmp('RP_COMMENTS').getValue();
 				var contentdata={ELEVATOR_NO:ELEVATOR_NO,CONTRACT_NO:CONTRACT_NO,ELEVATOR_TYPE_NAME:ELEVATOR_TYPE_NAME,
 						ELV_RENOVATE_DATE:ELV_RENOVATE_DATE,ELV_RENO_STATUS:ELV_RENO_STATUS,FINAL_USE_UNIT:FINAL_USE_UNIT,
 						INSTALL_ADDRESS:INSTALL_ADDRESS,WORK_PERSON_NUM:WORK_PERSON_NUM,ACTUAL_WORK_PERSON_NUM:ACTUAL_WORK_PERSON_NUM,
 						INT_RENOVATE_DETL_ID:INT_RENOVATE_DETL_ID,COMMENTS:COMMENTS,RENOVATE_PROJECT_LINE_ID:RENOVATE_PROJECT_LINE_ID};
 				var content = JSON.stringify(contentdata);
 				function getResult(res){
 					WL.Toast.show("已提交整改");
 					//修改本地数据
					var query11={tcode:"ProductCertificate_data",tid:RENOVATE_PROJECT_NUM+'_'+CONTRACT_NO+'_'+ELEVATOR_NO};
					var options={exact:false};
					WL.JSONStore.get(collectionName).find(query11,options).then(function(res){
						var RP_value = res[0].json.stext;
						RP_value.ELV_RENO_STATUS = ELV_RENO_STATUS;
						res[0].json.stext = RP_value;
						var options = {};
						WL.JSONStore.get(collectionName).refresh(res[0],options).then(function(){
							
						}).fail(function(){
							Ext.Msg.alert("刷新本地数据失败");
						});
					}).fail(function(){
						Ext.Msg.alert("查找本地数据失败");
					});
					
 					var RP_LineStore_index = Ext.getCmp('RP_LineStore_index').getValue();
 					RP_LineStore._data.all[RP_LineStore_index].data.ELV_RENO_STATUS=ELV_RENO_STATUS;
 					Ext.getCmp('RP_Line_list').refresh();
 					obj.BackView();
 				}
 				this.connectServer(getResult,'renovateProjectAction.do?method=toAdd', content);
 			}else{
 				return;
 			}
 		},"确认提交?","取消,确定");
		
	},
	
	Renvate_p_back : function(){
		this.BackView();
	},
	
	
	//进入查找页面
	btn_RP_search : function(){
		this.NextView('Renovate_Project_Search_id','HelcPDA.view.ProductCertificate.Renovate_Project_Search');
	},
	
	//查找本地数据
	RP_searchdata_btn : function(){
		var obj  = this;
		var ENGCONTRACT_NUMBER = Ext.getCmp('RP_instpro_con_s').getValue();
		var ELEVATOR_NO = Ext.getCmp('RP_instpro_eno_s').getValue();
		var RENOVATE_PROJECT_NAME = Ext.getCmp('RP_instpro_pro_s').getValue();
		this.BackView();
		var store=this.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
		store.setData([]);
		var query={tcode:"ProductCertificate_data"};
		var options={exact:false};
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			var COMPANY_NAME_LIST=[];
			var RENOVATE_PROJECT_NUM_LIST=[];
			var RENOVATE_PROJECT_NAME_LIST=[];
			var cs = 0;
			for(var i=0;i<res.length-1;i++){
				var json_ENGCONTRACT_NUMBER = res[i].json.stext.CONTRACT_NO;
				var json_ELEVATOR_NO = res[i].json.stext.ELEVATOR_NO;
				var json_COMPANY_NAME = res[i].json.stext.COMPANY_NAME;
				var json_RENOVATE_PROJECT_NAME = res[i].json.stext.RENOVATE_PROJECT_NAME;
				var json_RENOVATE_PROJECT_NUM = res[i].json.stext.RENOVATE_PROJECT_NUM;
				if(json_ENGCONTRACT_NUMBER.indexOf(ENGCONTRACT_NUMBER) >=0 && json_ELEVATOR_NO.indexOf(ELEVATOR_NO)>=0 && json_RENOVATE_PROJECT_NAME.indexOf(RENOVATE_PROJECT_NAME)>=0){
					COMPANY_NAME_LIST[cs]=json_COMPANY_NAME;
					RENOVATE_PROJECT_NUM_LIST[cs]=json_RENOVATE_PROJECT_NUM;
					RENOVATE_PROJECT_NAME_LIST[cs]=json_RENOVATE_PROJECT_NAME;
					cs++;
				};
			};
			var UNIQ_RENOVATE_PROJECT_NUM_LIST=RENOVATE_PROJECT_NUM_LIST.unique3();
			var UNIQ_COMPANY_NAME = [];
			var UNIQ_RENOVATE_PROJECT_NAME = [];
			var NUM=[];
			for(var i=0;i<UNIQ_RENOVATE_PROJECT_NUM_LIST.length;i++){
				NUM[i]=0;
				for(var j=0;j<res.length;j++){
					if(UNIQ_RENOVATE_PROJECT_NUM_LIST[i]==res[j].json.stext.RENOVATE_PROJECT_NUM){
						NUM[i]++;
						UNIQ_COMPANY_NAME[i]=res[j].json.stext.COMPANY_NAME;
						UNIQ_RENOVATE_PROJECT_NAME[i]=res[j].json.stext.RENOVATE_PROJECT_NAME;
					}
				}
			}
			var NEW_NEED_LIST=[];
			for(var i=0;i<UNIQ_RENOVATE_PROJECT_NUM_LIST.length;i++){
				var CNTER_NEED={};
			  	CNTER_NEED.RENOVATE_PROJECT_NUM=UNIQ_RENOVATE_PROJECT_NUM_LIST[i];
			  	CNTER_NEED.COMPANY_NAME=UNIQ_COMPANY_NAME[i];
			  	CNTER_NEED.RENOVATE_PROJECT_NAME=UNIQ_RENOVATE_PROJECT_NAME[i];
			  	CNTER_NEED.NUM=NUM[i];
			  	NEW_NEED_LIST[i]=CNTER_NEED;
			}
			store.setData(NEW_NEED_LIST);
			if(NEW_NEED_LIST.length==0){
				WL.Toast.show('找不到对应数据');
			}
		});
	},
	
	//进入同步页面
	btn_RP_update : function(){
		this.NextView('Renovate_Project_Selection_id','HelcPDA.view.ProductCertificate.Renovate_Project_Selection');
	},
	
	//同步数据
	RP_getdata_btn: function(){
		var obj = this;
		var store=this.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
		store.setData([]);
		var removequery={tcode:"ProductCertificate_data"};
		var removeoptions={exact:true};
		WL.JSONStore.get(collectionName).remove(removequery,removeoptions).then(function(){
		}).fail(function(){
			Ext.Msg.alert("删除本地数据失败");
		});
		
		var CONTRACT_NO = Ext.getCmp('RP_con').getValue();
		var ELEVATOR_NO = Ext.getCmp('RP_eno').getValue();
		var RENOVATE_PROJECT_NAME = Ext.getCmp('RP_pro').getValue();
		obj.BackView();
		
		var contentdata={userid:userid,CONTRACT_NO:CONTRACT_NO,ELEVATOR_NO:ELEVATOR_NO,RENOVATE_PROJECT_NAME:RENOVATE_PROJECT_NAME};
		var content = JSON.stringify(contentdata);
		
		function getResult(res){
			console.log(res);
			if(res.item.rows.length ==0){
				WL.Toast.show("找不到对应数据");
			}else{
				//循环添加每一条到JSONStore
				var ndata=[];
				var statusndata=[];
				var list = res.item.rows;
				var stauts = res.progress;
				for(var i=0;i<list.length;i++){
					if(list[i].ELV_RENO_STATUS=="DISPATCHING" || list[i].ELV_RENO_STATUS==null || list[i].ELV_RENO_STATUS=="" || typeof(list[i].ELV_RENO_STATUS) =="undefined"){
						list[i].ELV_RENO_STATUS="分公司已派工";
					}else if(list[i].ELV_RENO_STATUS=="RECTIFIED"){
						list[i].ELV_RENO_STATUS="已整改";
					}else if(list[i].ELV_RENO_STATUS=="APPROVED"){
						list[i].ELV_RENO_STATUS="已审核";
					}else if(list[i].ELV_RENO_STATUS=="UNRECTIFIED"){
						list[i].ELV_RENO_STATUS="无法整改";
					}
					var query={tcode:"ProductCertificate_data",tid:list[i].RENOVATE_PROJECT_NUM+'_'+list[i].CONTRACT_NO+'_'+list[i].ELEVATOR_NO,stext:list[i]};
					ndata[i]=query;
//					var query1={tcode:"ITM_status",tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,stext:stauts[i].P_STATUS};
//					statusndata[i]=query1;
				}
				if(ndata.length==0){
					 WL.Toast.show("找不到对应数据");
				}else{
					WL.JSONStore.get(collectionName).add(ndata).then(function(){
//						WL.JSONStore.get(collectionName).add(statusndata).then(function(){
							//保存成功后，另存一个list给第一次进来显示用
							var query2={tcode:"ProductCertificate_data"};
							var options2={
									exact:true,
							};
							WL.JSONStore.get(collectionName).find(query2,options2).then(function(res){
								var list = res;
								var RENOVATE_PROJECT_NUM_list=[];
								var RENOVATE_PROJECT_NAME_list=[];  
								for(var i=0;i<list.length;i++){
									RENOVATE_PROJECT_NUM_list[i]=list[i].json.stext.RENOVATE_PROJECT_NUM;
								}
								for(var i=0;i<list.length;i++){
									RENOVATE_PROJECT_NAME_list[i]=list[i].json.stext.RENOVATE_PROJECT_NAME;
								}
								var UNIQ_RENOVATE_PROJECT_NUM_list=RENOVATE_PROJECT_NUM_list.unique3();
								var UNIQ_RENOVATE_PROJECT_NAME_list=RENOVATE_PROJECT_NAME_list.unique3();
								var UNIQ_CUSTOMER_NAME=[];
								var NUM=[];
								for(var i=0;i<UNIQ_RENOVATE_PROJECT_NUM_list.length;i++){
									NUM[i]=0;
									for(var j=0;j<list.length;j++){
										if(UNIQ_RENOVATE_PROJECT_NUM_list[i]==list[j].json.stext.RENOVATE_PROJECT_NUM){
											NUM[i]++;
											UNIQ_CUSTOMER_NAME[i]=list[j].json.stext.COMPANY_NAME;
										}
									}
								}
								var NEW_NEED_LIST=[];
								for(var i=0;i<UNIQ_RENOVATE_PROJECT_NUM_list.length;i++){
									var CNTER_NEED={};
									CNTER_NEED.RENOVATE_PROJECT_NAME=UNIQ_RENOVATE_PROJECT_NAME_list[i];
									CNTER_NEED.RENOVATE_PROJECT_NUM=UNIQ_RENOVATE_PROJECT_NUM_list[i];
									CNTER_NEED.COMPANY_NAME=UNIQ_CUSTOMER_NAME[i];
									CNTER_NEED.NUM=NUM[i];
									NEW_NEED_LIST[i]=CNTER_NEED;
								}
								
								store.setData(NEW_NEED_LIST);
								WL.Toast.show("更新成功，已经是最新数据");
								
								var query={tcode:"ProductCertificate_data",tid:"ProductCertificate_list"};
								var options={exact:true};
								WL.JSONStore.get(collectionName).remove(query,options).then(function(){
									//保存第一张list界面生成的数据放在本地，离线时使用
									var query={tcode:"ProductCertificate_data",tid:"ProductCertificate_list",stext:NEW_NEED_LIST};
									WL.JSONStore.get(collectionName).add(query).then(function(){
									}).fail(function(err){
										Ext.Msg.alert("第一张list添加失败");
									});
								}).fail(function(){
									Ext.Msg.alert("删除list列表失败");
								});
								
							}); 
//						}).fail(function(err){
//							Ext.Msg.alert("添加数据失败2");
//						});
					}).fail(function(err){
						Ext.Msg.alert("添加数据失败1");
					});
				}
			}
			
		}
		this.connectServer(getResult,'renovateProjectAction.do?method=toSearch', content);
	},
	
	
	//进入合同和工号层
	RP_Head_list : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store=obj.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
		var RENOVATE_PROJECT_NUM=store.getAt(index).get('RENOVATE_PROJECT_NUM');
		obj.LoadGHlist(RENOVATE_PROJECT_NUM);
		
		this.NextView('Renovate_Project_LineList_id','HelcPDA.view.ProductCertificate.Renovate_Project_LineList');
		Ext.getCmp('RENOVATE_PROJECT_NUM').setValue(RENOVATE_PROJECT_NUM);
		
	},
	
	LoadGHlist : function(RENOVATE_PROJECT_NUM){
		var obj = this;
		var datas =[];
		var query={tcode:"ProductCertificate_data",tid:RENOVATE_PROJECT_NUM};
		var options={
	    		   exact:false,
	    }; 
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
//			var query1={tcode:"ITM_status",tid:RENOVATE_PROJECT_NUM};
//			var options1={
//		    		   exact:false,
//		    }; 
//			
//			WL.JSONStore.get(collectionName).find(query1,options1).then(function(res1){
				for(var i=0;i<res.length;i++){
					var data = {};
//					for(var j=0;j<res1.length;j++){
//						if(res[i].json.tid == res1[j].json.tid){
							data.CONTRACT_NO=res[i].json.stext.CONTRACT_NO;
							data.ELEVATOR_NO=res[i].json.stext.ELEVATOR_NO;
							data.UNIQUENESS_ID=res[i].json.stext.UNIQUENESS_ID;
							data.RENOVATE_PROJECT_LINE_ID=res[i].json.stext.RENOVATE_PROJECT_LINE_ID;
//							if(res[i].json.stext.ELV_RENO_STATUS==null||typeof(res[i].json.stext.ELV_RENO_STATUS)=="undefined"){
//								data.ELV_RENO_STATUS="未整改";
//							}else{
								data.ELV_RENO_STATUS=res[i].json.stext.ELV_RENO_STATUS;
//							}
//						}
//					}
					datas[i] = data;
				}
				var RP_LineStore = obj.getStore('RP_LineStore','HelcPDA.store.ProductCertificate.RP_LineStore');
				var softdatas = obj.GHsoft(datas);
				RP_LineStore.setData(softdatas);
			});
			
//		});
	},
	
	//排序
	GHsoft : function(datas){
		for(var i = datas.length-1;i>0;i--){
			for(var j=0;j<i;j++){
				if(datas[i].ELEVATOR_NO < datas[j].ELEVATOR_NO){
					var temp = datas[i];
					datas[i] = datas[j];
					datas[j] = temp;
				}
			}
		}
		return datas;
	},
	
	//进入整改详细
	RP_Line_list : function(obj,index,target,record,e,eOpts){
		if(event.target.id!="ipd_ENO_Checkbox"){
			this.NextView('Renovate_Project_Detl_id','HelcPDA.view.ProductCertificate.Renovate_Project_Detl');
			Ext.getCmp('RP_LineStore_index').setValue(index);
			var RENOVATE_PROJECT_LINE_ID = record.data.RENOVATE_PROJECT_LINE_ID;
			var ELEVATOR_NO = record.data.ELEVATOR_NO;
			var contentdata={ELEVATOR_NO:ELEVATOR_NO,RENOVATE_PROJECT_LINE_ID:RENOVATE_PROJECT_LINE_ID};
			var content = JSON.stringify(contentdata);
			function getResult(res){
				console.log(res);
				var data = res.item.rows[0];
				Ext.getCmp('RP_CONTRACT_NO').setValue(data.CONTRACT_NO);
				Ext.getCmp('RP_ELEVATOR_NO').setValue(data.ELEVATOR_NO);
				Ext.getCmp('RP_ELEVATOR_TYPE_NAME').setValue(data.ELEVATOR_TYPE_NAME);
				Ext.getCmp('RP_FINAL_USE_UNIT').setValue(data.FINAL_USE_UNIT);
				Ext.getCmp('RP_INSTALL_ADDRESS').setValue(data.INSTALL_ADDRESS);
				Ext.getCmp('RP_WORK_PERSON_NUM').setValue(data.WORK_PERSON_NUM);
				Ext.getCmp('RP_ACTUAL_WORK_PERSON_NUM').setValue(data.ACTUAL_WORK_PERSON_NUM);
				Ext.getCmp('RP_INT_RENOVATE_DETL_ID').setValue(data.INT_RENOVATE_DETL_ID);
				Ext.getCmp('RP_UNIQUENESS_ID').setValue(data.UNIQUENESS_ID);
				Ext.getCmp('RP_RENOVATE_PROJECT_LINE_ID').setValue(data.RENOVATE_PROJECT_LINE_ID);
				if(typeof(data.COMMENTS)!="undefined"){
					Ext.getCmp('RP_COMMENTS').setValue(data.COMMENTS);
				}
				if(typeof(data.ELV_RENOVATE_DATE)!="undefined"){
					var Date = data.ELV_RENOVATE_DATE.split(' ');
					Ext.getCmp('RP_ELV_RENOVATE_DATE').setValue(Date[0]);
				}
				if(typeof(data.ELV_RENO_STATUS)!="undefined"){
					Ext.getCmp('RP_ELV_RENO_STATUS').setValue(data.ELV_RENO_STATUS);
					Ext.getCmp('RP_ELV_RENO_STATUS_flag').setValue(data.ELV_RENO_STATUS);
				}else{
					Ext.getCmp('RP_ELV_RENO_STATUS_flag').setValue('');
				}
			}
			this.connectServer(getResult,'renovateProjectAction.do?method=toSearchDetail', content);
			
		}
					
	},
	
	
});