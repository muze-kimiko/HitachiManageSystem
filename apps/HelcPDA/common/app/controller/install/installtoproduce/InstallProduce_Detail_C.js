Ext.define('HelcPDA.controller.install.installtoproduce.InstallProduce_Detail_C',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'InstallProduce_Detail_C_id',
config:{
		//wangGuoYiJiaoxinqiSummit_id commitButton
		control:{
			
			/************************************************************************************
			 * 排产提交数据页面
			 * */

			//返回
			'button#InstallProduce_Detail_VID_FH_BUTTON':{
				tap:'InstallProduce_Detail_VID_FH_BUTTON'
			},

			//保存按钮
			"button#saveButton":{
				tap:'init2'
			},
			
			//提交按钮
			"button#commitButton":{
				tap:'init4'
			},
			
			//节点确认日期
			"textfield#TimeID":{
				change:'init3'
			},
			
			//处理状态
			"selectfield#selectfieldID2":{
				change:'init5'
			},
			
			//确定按钮
			"button#gzezxy_id":{
				tap:'init6'
			},
			
			/**
			 **排产提交数据页面
			 ************************************************************************************/
			
		}
},

		/************************************************************************************
		 * 排产提交数据页面
		 * */
		
		//返回
		InstallProduce_Detail_VID_FH_BUTTON:function(){
			this.showBackView('InstallProduce_EnoList_VID','HelcPDA.view.install.installtoproduce.InstallProduce_EnoList_V');
		},
		
		//保存按钮
		init2:function(){
			var value=null;
			var obj=Ext.getCmp('HIDDenID');
		    value=obj.getHidden();
			var obj1=Ext.getCmp('selectfieldID');
			var obj2=Ext.getCmp('selectfieldID2');
			var Options2=obj2.getValue();
		    var Options=obj1.getValue();
		    var optionValue=null;
		    var date=null;
		    var date2=null;
		    if(value==false){
		    	 if(Options=='排产撤销'){
		    		   console.log('a');
		    		   optionValue='CANCELLED';
		    	   }else if(Options=='不处理'){
		    		   console.log('b');
		    		   optionValue='IGNORED';
		    	   }
		    }else if(value==true){
		    	var OBJ=Ext.getCmp('TimeID');
		    	date=OBJ.getValue();
		    	console.log(date);
		    	if(date!=''){
		    		date2=date;
		    		//date2=Ext.Date.format(date,'Y-m-d h:m:s');	
		    	};
		    	if(Options2=='不处理'){
		    		 console.log('c');
		    		 optionValue='IGNORED';
		    	}else if(Options2=='下达'){
		    		 console.log('d');
		    		 optionValue='ISSUED';
		    	};
		    };
		   
		    var obj5=Ext.getCmp('CONTRACT_NO');
		    var CONTRACT_NO=obj5.getValue();
		    var obj6=Ext.getCmp('ELEVATOR_NO');
		    var ELEVATOR_NO=obj6.getValue();
		    var Tid=CONTRACT_NO+'_'+ELEVATOR_NO;
		    var tcodeId='ConfirmedScheduling';
			var query={tcode:tcodeId,tid:Tid};
				console.log(tcodeId);
			var coll=WL.JSONStore.get(collectionName);
			coll.find(query).then(function(result){
				console.log(result);
				console.log(result.length);
				var list=[];
				for(var i=0;i<result.length;i++){
					list[i]=result[i].json.stext;
				}
				console.log(list);
				console.log(list[0]);
			coll.remove(query).then(function(){
			//	list[0].QRPC_STATUS='已提交';
				list[0].STATUS=optionValue;
				  list[0].CONFIRM_DATE=date2;
				  console.log(date);
					 var data={tid:list[0].CONTRACT_NO+'_'+list[0].ELEVATOR_NO,tcode:tcodeId,stext:list[0]};
				  coll.add(data).then(function(){
					  WL.Toast.show("保存成功！");
					  //alert('ok');
				  }).fail(function(err){
					  WL.Toast.show("保存失败！");
					  //Ext.Msg.alert("缓存失败");
				  });
			  }).fail(function(err){
				  //Ext.Msg.alert("初始化删除失败");
				  console.log('初始化删除失败');
			  });	
			}).fail(function(err){
				console.log('查询失败');
				//Ext.Msg.alert("查找失败");
			});	
		},
		
		//提交
		init4:function(){
			//判断处理状态
			//哪个显示，哪个隐藏
			//有撤销
			var OBJ=Ext.getCmp('TimeID').getValue();
			var Flag1=Ext.getCmp('HIDDenID').getHidden();
			/*//判断
			var flag=Ext.getCmp('SOURCE_TYPE').getValue();
			if(flag=='下游节点取消'){
			}else if(flag=='上游节点下达'){
			};*/
			//有不处理
			var Flag2=Ext.getCmp('HID_ID').getHidden();
			if(Flag1==false){
				/*if(OBJ==''){
					WL.Toask.show("请选择当前节点日期");
					return;
				};*/
			}else if(Flag2==false){
				//判断状态
				var data=Ext.getCmp('selectfieldID2').getValue();
				if(data!='不处理'){
					if(OBJ==''){
						WL.Toask.show("请选择当前节点日期");
						return;
					};
				};
			};

			var obj=this;
			var objHID=Ext.getCmp('HIDDenID').getHidden();
			//处理状态1
			var obj1=Ext.getCmp('selectfieldID');
			//处理状态2
			var obj2=Ext.getCmp('selectfieldID2');
			var Options2=obj2.getValue();
		    var Options=obj1.getValue();
		    
		    var value = {};
		    if(objHID==false){
		    	if(Options=='排产撤销'){
		 		   console.log('a');
		 		   optionValue='CANCELLED';
		 		   value={STATUS:'CANCELLED',CONFIRM_DATE:''};
		 	   }else if(Options=='不处理'){
		 		   console.log('b');
		 		   optionValue='IGNORED';
		 		   value={STATUS:'IGNORED',CONFIRM_DATE:''};
		 	   }
		    }else if(objHID==true){
		    	if(Options2=='不处理'){
		 		   console.log('c');
		 		   optionValue='IGNORED';
		 		   value={STATUS:'IGNORED',CONFIRM_DATE:''};
		 	   }else if(Options2=='下达'){
		 		   console.log('d');
		 		   optionValue='ISSUED';
		 		   value={STATUS:'ISSUED',CONFIRM_DATE:OBJ};
		 	   };
		    };
		    
		    
		    //合同号
		    var obj5=Ext.getCmp('CONTRACT_NO');
		    var CONTRACT_NO=obj5.getValue();
		    //工号
		    var obj6=Ext.getCmp('ELEVATOR_NO');
		    var ELEVATOR_NO=obj6.getValue();
		    //JSONStore查询条件
		    var Tid=CONTRACT_NO+'_'+ELEVATOR_NO;
		    var tcodeId='ConfirmedScheduling';
			var query={tcode:tcodeId,tid:Tid};
				console.log(tcodeId);
			var coll=WL.JSONStore.get(collectionName);
			var show=null;
			//从JSON中查找出提交的 数据
			coll.find(query).then(function(result){
				console.log(result);
				console.log(result.length);
				var list=[];
				for(var i=0;i<result.length;i++){
					list[i]=result[i].json.stext;
				}
				show=list[0];
				//提交后的结果
				getResult=function(res){
					//WL.Toask.show(res.msginfo);
					
					//跳转页面
					obj.showBackView('InstallProduce_EnoList_VID','HelcPDA.view.install.installtoproduce.InstallProduce_EnoList_V');
/*					var objYM=Ext.getCmp('InstallProduce_EnoList_VID');
					if(!objYM){
						objYM=Ext.create('HelcPDA.view.install.installtoproduce.InstallProduce_EnoList_V');
					}
					Ext.Viewport.setActiveItem(objYM);*/
					
				 	 var tcodeId='ConfirmedScheduling';
				  	 var data={tcode:tcodeId,tid:CONTRACT_NO};
				  	var options={};
				  	 coll.find(data,options).then(function(arrayResults){
				  		  console.log('查询结果'+JSON.stringify(arrayResults));
				  		  var num=arrayResults.length;
				  		  //判断已提交的是哪个数据
				  		  var DataDB=[];
				  		  var _id=0;
				  		  var json;
				  		  for(var i=0;i<num;i++){
				  			  var tt={};
				  			  var sj=arrayResults[i].json.tid;
				  			  var sj2=CONTRACT_NO+'_'+ELEVATOR_NO;
				  			  tt.ELEVATOR_NO=arrayResults[i].json.stext.ELEVATOR_NO;
				  			  tt.QRPC_STATUS=arrayResults[i].json.stext.QRPC_STATUS;
				  			  if(sj==sj2){
				  				tt.QRPC_STATUS='已提交';
				  				_id=arrayResults[i]._id;
				  				arrayResults[i].json.stext.QRPC_STATUS='已提交';
				  				json=arrayResults[i].json;
				  			  };
				  			DataDB[i]=tt;
				  		  };
				  		  //显示
				  		var store=Ext.data.StoreManager.get("InstallProduce_List_S");
						if(!store){
							store=Ext.create("HelcPDA.store.install.installprocess.InstallProduce_List_S");
						}
						store.setData(DataDB,this);
						
						//修改JSON
						var document={_id:_id,json:json};
			    		var options={};//默认
			    		coll.replace(document,options).then(function(){
			    			console.log('替换成功');
			    			
			    			//修改 排产查询页面的数据仓
			    			obj.initPCCX();
			    		//	obj.fanhuiXiuGai();
			    		}).fail(function(){
			    			console.log('替换失败');
			    		});
				  	 }).fail(function(err){
						WL.Toask.show("查找失败");
					 });	
				};
				
				var content="{'show':"+JSON.stringify(show)+",'value':"+JSON.stringify(value)+",'sbl_row_id':'"+sbl_row_id+"','userid':'"+userid+"','init_person_id':'"+init_person_id+"','ebs_user_id':'"+ebs_user_id+"','person_id':'"+person_id+"','username':'"+username+"'}";
				obj.connectServer(getResult,'installQRPCAction.do?method=toUpdate',content);
			}).fail(function(err){
				WL.Toask.show("查找失败");
				//Ext.Msg.alert("查找失败");
			});	
		},
		
		//覆盖排产查询页面的数据仓
		initPCCX:function(){
			//查询数据
			var tcodeId='ConfirmedScheduling';
			var query={tcode:tcodeId};
			var coll=WL.JSONStore.get(collectionName);
			coll.find(query).then(function(result){
				//装载排产集合
				var num=result.length;
				console.log(JSON.stringify(result));
				//alert(result);
				var list=[];
				var index=0;
				for(var i=0;i<num;i++){
					if(result[i].json.stext.QRPC_STATUS=='未提交'){
						var tai=result[i].json.stext;
						
						list[index]=tai;
						index++;
						//alert('1 '+JSON.stringify(list[i]));
					}else{
						//alert('2 '+JSON.stringify(list[i]));
					};
					//console.log(i+'      '+JSON.stringify(list[i]));
				};
				//alert(list.length);
				console.log(i+'      '+JSON.stringify(list[1]));
				//装载合同号的集合
				var ENGCONTRACT_NUMBER_LIST=[];
				//装载地址的集合
				var CUSTOMER_NAME_LIST=[];
				//获取
				for(var i=0;i<list.length;i++){
					  ENGCONTRACT_NUMBER_LIST[i]=list[i].CONTRACT_NO;
					  CUSTOMER_NAME_LIST[i]=list[i].CUSTOMER_NAME;
				 };
				 //获取集合中格的唯一数
				 var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
				 console.log(JSON.stringify('合同号    '+UNIQ_ENGCONTRACT_NUMBER_LIST));
				 var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
				 console.log(JSON.stringify('地址  '+UNIQ_CUSTOMER_NAME));
				 //计算相同的合同号数量
				 var NUM=[];
				 for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					  NUM[i]=0;
					  for(var j=0;j<list.length;j++){
						  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].CONTRACT_NO){
							  NUM[i]++;
						  };
					   };
				  };
				  //为数据仓添加显示数据
				  var NEW_NEED_LIST=[];
				  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					  var CNTER_NEED={};
					  CNTER_NEED.CONTRACT_NO=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
					  CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
					  CNTER_NEED.NUM=NUM[i];
					  NEW_NEED_LIST[i]=CNTER_NEED;
				  };
				  store=Ext.data.StoreManager.get("installtaskStore2");
				  if(!store){
					store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
				  };
				  store.setData([],this);
				  store.setData(NEW_NEED_LIST,this);
				  //在JSON中添加数据
				  var ndata=[];
				  for(var i=0;i<list.length;i++){
					 list[i].QRPC_STATUS = '未提交';
					 var query={tid:list[i].CONTRACT_NO+'_'+list[i].ELEVATOR_NO,tcode:tcodeId,stext:list[i]};
				     ndata[i]=query;
				  }	
			}).fail(function(err){
				WL.Toask.show("查找失败");
			});	
		},
		
		//节点确认日期
		init3:function(){
			//oldTime2  工程日期 
			// a   c 和期
			//oldTime4  最终出产日期
			//获取工程日期
			var GCRQ=Ext.getCmp('TimeID').getValue();
			var GCRQ2=new Date(GCRQ);
			//获取当前日期  
			 var oldTime = (new Date()).getTime();
			//获取制造周期
			 var ZZZQ=Ext.getCmp('RESTRICT_DAY').getValue();
			 if (ZZZQ == '' || ZZZQ == null) {
				 ZZZQ = 16;
			 }
			 //获取当前日期    加上  制造周期  (和期)
			 var oldTime_AND_ZZZQ=oldTime+ZZZQ*24*60*60*1000;
			//把和期转化为Y-m-d格式
			 var hq=new Date(oldTime_AND_ZZZQ);
			 var hq2=Ext.Date.format(hq,'Y-m-d');
			 var hq3=new Date(hq2);
			 /*//获取最终产出日期
			 var ZZCC=Ext.getCmp('FINAL_CONFIRM_DATE').getValue();
			 var ZZCC2=new Date(ZZCC);
			 //比较
			 if((GCRQ2<=hq3)||(ZZCC2>=GCRQ2)){
					alert("所录日期不满足制造周期,确认产出日期不可少于"+hq2,'注意');
					//WL.Toask.show("所录日期不满足制造周期,确认产出日期不可少于"+c[0]);
					Ext.getCmp('TimeID').setValue();
			 };*/
			 var ZKXD=Ext.getCmp('NODE_ZKXDRQ').getValue();
			 var ZKXD2=new Date(ZKXD);
			 if(ZKXD2>GCRQ2){
					alert("所录日期不满足制造周期,确认产出日期不可少于"+ZKXD);
					//WL.Toask.show("所录日期不满足制造周期,确认产出日期不可少于"+c[0]);
					Ext.getCmp('TimeID').setValue();
			 };
			 
		},
		
		//处理状态
		init5:function(){
			var obj2=Ext.getCmp('selectfieldID2');
			var Options2=obj2.getValue();
			console.log(Options2);
			if(Options2=='不处理'){
				
				//清除节点确认日期
				Ext.getCmp('TimeID').setValue();
				
				/*var obj=Ext.getCmp('TimeID');
				obj.setHidden(true);*/
				//制造周期
				Ext.getCmp('RESTRICT_DAY').setHidden(true);
				//当前排产节点
				Ext.getCmp('NODE_NAME_TWO').setHidden(true);
				//最快下达日期
				Ext.getCmp('NODE_ZKXDRQ').setHidden(true);
				//节点确认日期
				Ext.getCmp('InstallProduce_Detail_VID_fieldset').setHidden(true);
				//上一节点确认日期
				Ext.getCmp('PRE_NODE_CONFIRM_DATE').setHidden(true);
				
				
				}else if(Options2=='下达'){
					/*var obj=Ext.getCmp('TimeID');
					obj.setHidden(false);*/
					//制造周期
					Ext.getCmp('RESTRICT_DAY').setHidden(false);
					//当前排产节点
					Ext.getCmp('NODE_NAME_TWO').setHidden(false);
					//最快下达日期
					Ext.getCmp('NODE_ZKXDRQ').setHidden(false);
					//节点确认日期
					Ext.getCmp('InstallProduce_Detail_VID_fieldset').setHidden(false);
					//上一节点确认日期
					Ext.getCmp('PRE_NODE_CONFIRM_DATE').setHidden(false);
				}
		},
		
		//排产 录入数据 确定按钮
		init6:function(){
			//获取营业二次日期 的值
			var obj=Ext.getCmp('NODE_ZKXDRQ');
			var value=obj.getValue();
			
			//获取工程二次日期 
			var obj2=Ext.getCmp('TimeID');
			//营业覆盖工程
			obj2.setValue(value);
			
		},
		
		/**
		 **排产提交数据页面
		 ************************************************************************************/

});

