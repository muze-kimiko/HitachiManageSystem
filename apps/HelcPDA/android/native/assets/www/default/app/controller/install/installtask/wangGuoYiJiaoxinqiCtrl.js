
/* JavaScript content from app/controller/install/installtask/wangGuoYiJiaoxinqiCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.wangGuoYiJiaoxinqiCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'wangGuoYiJiaoxinqiCtrl_id',
config:{
		//wangGuoYiJiaoxinqiSummit_id
		control:{
			/************************************************************************************
			 * 完工详细信息 页面
			 * */
			
			//返回按钮
			'button#wangGuoYiJiaoxinqi_id_FH_BUTTON':{
				tap:'wangGuoYiJiaoxinqi_id_FH_BUTTON'
			},

			//保存按钮
			"button#wangGuoYiJiaoxinqiSave_id":{
				tap:'save1'
			},
			
			//提交按钮
			"button#wangGuoYiJiaoxinqiSummit_id":{
				tap:'Summit1'
			},
			
			//判断移交日期大于等于监理发证日期
			'textfield#time_id':{
				change:'time_id'
			},
			/**
			 **完工详细信息 页面
			 ************************************************************************************/
			
		},
},

			/************************************************************************************
			 * 完工详细信息 页面
			 * */
			//返回按钮
			wangGuoYiJiaoxinqi_id_FH_BUTTON:function(){
				this.showBackView('wangGuoYiJiaoTask_id','HelcPDA.view.install.installtask.wangGuoYiJiaoTask');	
			},
			
			//保存按钮
			save1:function(){
				var obj23=Ext.getCmp('time_id');
				var value23=obj23.getValue();
			    var obj24=Ext.getCmp('time_id2');
			    var value24=obj24.getValue();
			    console.log(value24);
			       
			    var ENGCONTRACT_NUMBERobj=Ext.getCmp('ENGCONTRACT_NUMBER_id');
			    var ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBERobj.getValue();
			    var ELEVATOR_NO_id=Ext.getCmp('ELEVATOR_NO_id');
			    var ELEVATOR_NO=ELEVATOR_NO_id.getValue();
			    var SEQ_NUMobj=Ext.getCmp('SEQ_NUM_id');
			    var SEQ_NUM=SEQ_NUMobj.getValue();
			    var tcodeId1='wangGuoYiJiao';
			       
			    var Tid=ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM;
			    console.log(Tid);
			    var coll=WL.JSONStore.get(collectionName);
				var data={tcode:tcodeId1,tid:Tid};
				var options={
				 };
				 coll.find(data,options).then(function(arrayResults){
					 var list=arrayResults[0].json.stext;
			         list.TRANSFER_COMMENTS=value24;
			         list.SIGNED_TRANSFER_DOC_DATE=value23;
			         var query={_id:arrayResults[0]._id,json:{tcode:tcodeId1,tid:Tid,stext:list}};
					 var options={};
					 coll.replace(query,options).then(function () {
						 WL.Toast.show('保存成功!');
			           
					 }).fail(function(errorObject){
					    	 WL.Toast.show('保存失败!');
					 });
				 }).fail(function(err){
				 		WL.Toast.show('查找失败');
				 });	
			},
			
			//提交按钮
			Summit1:function(){
				var objthis=this;
				//移交日期
				var obj=Ext.getCmp('time_id');
				var value=obj.getValue();
				//备注（非必填）
				var obj=Ext.getCmp('time_id2');
				var value2=obj.getValue();
				if(value!='点击文本设置时间'){
					var ENGCONTRACT_NUMBERobj=Ext.getCmp('ENGCONTRACT_NUMBER_id');
					var ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBERobj.getValue();
					var ELEVATOR_NO_id=Ext.getCmp('ELEVATOR_NO_id');
					var ELEVATOR_NO=ELEVATOR_NO_id.getValue();
					var SEQ_NUMobj=Ext.getCmp('SEQ_NUM_id');
					var SEQ_NUM=SEQ_NUMobj.getValue();
				    var tcodeId1='wangGuoYiJiao';
					var Tid=ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM;
					console.log(Tid);
					var coll=WL.JSONStore.get(collectionName);
					var data={tcode:tcodeId1,tid:Tid};
					var options={
					};
					coll.find(data,options).then(function(arrayResults){ 
						var list=arrayResults[0].json.stext;
						console.log(JSON.stringify(list));
				
						var TASK_PROCESS_ID=list.TASK_PROCESS_ID;
						var ORG_ID=list.ORG_ID;
						var TASK_ID=list.TASK_ID;
						var SEQ_NUM=list.SEQ_NUM;
						var DEBUG_NUM=list.DEBUG_NUM;
						var CHECK_NUM=list.CHECK_NUM;
						
						var FINISH_DATE=list.FINISH_DATE;
						if(FINISH_DATE==undefined){
							FINISH_DATE='';
						};
						
						//TRANSFER_CUSTOMER_BY 获取的值
						var TC_by_ID=init_person_id;
/*						var TC_by_ID=null;
						if(ebs_user_id!=''){
							TC_by_ID=ebs_user_id;
						};
						if(init_person_id!=''){
							TC_by_ID=init_person_id;
						};*/
						//	var SIGNED_TRANSFER_DOC_DATE=list.SIGNED_TRANSFER_DOC_DATE;
						// var GOV_CHECK_END_DATE=list.GOV_CHECK_END_DATE;
						//var TRANSFER_CUSTOMER_DATE=list.TRANSFER_CUSTOMER_DATE;
						//var TRANSFER_CUSTOMER_BY=list.TRANSFER_CUSTOMER_BY;
						//alert("GOV_DATE_TIME:"+GOV_DATE_TIME);
						//var GOV_CHECK_DATE=list.GOV_CHECK_DATE;
						
						//提交结果
						var getResult=function(res){
							if(res.content.msginfo=='提交成功'){
								WL.Toast.show('提交成功!');
							};
							WL.Toast.show('提交失败!');
						 };
						 //console.log(TRANSFER_CUSTOMER_BY);
						 //console.log(TRANSFER_CUSTOMER_DATE);
						 //console.log(TRANSFER_COMMENTS);//放的是备注中的值 xcx 
						 //console.log()
						 //alert("TRANSFER_CUSTOMER_DATE:"+TRANSFER_CUSTOMER_DATE);
						 var content="{'TRANSFER_CUSTOMER_BY':'"+TC_by_ID+"','count':'','USERID':'"+ebs_user_id+"','tcode':'','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','ORG_ID':'"+ORG_ID+"','TASK_ID':'"+TASK_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"','TRANSFER_CUSTOMER_DATE':'"+''+"','TRANSFER_COMMENTS':'"+value2+"','FINISH_DATE':'"+FINISH_DATE+"','SIGNED_TRANSFER_DOC_DATE':'"+value+"'}";
					 	 objthis.connectServer(getResult,'wg_yjAction.do?method=toAdd',content);
					 }).fail(function(errorObject){
						console.log('查询出错');
						 //WL.Toast.show('保存出错!');
					 });
				}else{
					WL.Toast.show('请填写技移交日期');
				};
			},
			
			//判断移交日期大于等于监理发证日期
			time_id:function(){
				//移交日期
				var YJRQ=Ext.getCmp('time_id').getValue();
				var YJRQ2=new Date(YJRQ);	
				//监理发证日期
				var JLFZRQ=Ext.getCmp('Test_JJFZRQ').getValue();
				var JLFZRQ2=new Date(JLFZRQ);	
				//判断
				if(YJRQ2<JLFZRQ2){
					Ext.getCmp('time_id').setValue();
					WL.Toast.show('移交日期不能小与技监发证日期!');
				};
			},
			/**
			 **完工详细信息 页面
			 ************************************************************************************/

});