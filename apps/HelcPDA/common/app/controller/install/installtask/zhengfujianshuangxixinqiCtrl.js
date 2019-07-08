Ext.define('HelcPDA.controller.install.installtask.zhengfujianshuangxixinqiCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'zhengfujianshuangxixinqiCtrl_id',
config:{
		
		control:{
			/************************************************************************************
			 * 政府检信息维护页面
			 * */
			
			//政府检信息维护 返回按钮
			'button#zhengfujianshuangxixinqi_id_FH_BUTTON':{
				tap:'zhengfujianshuangxixinqi_id_FH_BUTTON'
			},	
			
			//保存按钮
			"button#zhengfujianButtonSave_id":{
				tap:'save'
			},
			
			//提交按钮
			"button#zhengfujianButtonSummit_id":{
				tap:'summit'
			},
			
			/**
			 **政府检信息维护页面
			 ************************************************************************************/
		},
},

		/************************************************************************************
		 * 政府检信息维护页面
		 * */

		//政府检信息维护 返回按钮
		zhengfujianshuangxixinqi_id_FH_BUTTON:function(){
			this.showBackView('zhengfujianTask_id','HelcPDA.view.install.installtask.zhengfujianTask');
		},
		
		//保存按钮
		save:function(){
			var obj23=Ext.getCmp('time_id_BJJRQ');
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
		    var tcodeId1='zhengfujianTcode';
		       
		    var Tid=ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM;
		    console.log(Tid);
		    var coll=WL.JSONStore.get(collectionName);
			var data={tcode:tcodeId1,tid:Tid};
			var options={ };
			coll.find(data,options).then(function(arrayResults){
				var list=arrayResults[0].json.stext;
		        console.log(list);
		        list.GOV_CHECK_END_DATE=new Date(value24);
		        list.GOV_DATE=new Date(value23);
		        console.log(list.GOV_CHECK_END_DATE);
		        console.log(list.GOV_DATE);
		        console.log(new Date(value23));
		        console.log(list);
		        var query={_id:arrayResults[0]._id,json:{tcode:tcodeId1,tid:Tid,stext:list}};
				options={};
				coll.replace(query,options).then(function () {
					WL.Toast.whow('保存成功!');
				}).fail(function(errorObject){
				    	 WL.Toast.whow('保存出错!');
				});
			}).fail(function(err){
				WL.Toast.whow('查找失败!');
			  });	
		},
		
		//提交按钮
		summit:function(){
			var objthis=this;
			//报技检日期
			var obj=Ext.getCmp('time_id_BJJRQ');
			//var value=Ext.Date.format(obj.getValue(),'Y-m-d');
			var value=obj.getValue();
			//技检时间
			var obj=Ext.getCmp('time_id2');
			//var value2=Ext.Date.format(obj.getValue(),'Y-m-d');
			var value2=obj.getValue();
			//  var obj3=Ext.getCmp('time_id3');
			//  var value3=obj3.getValue();
			var oldTime = (new Date(value)).getTime();
			console.log(oldTime);
			var oldTime2 = (new Date(value2)).getTime();
			
			console.log(oldTime2);
			console.log(value2);
			console.log(value);
			if(value=='点击文本设置时间'){
				alert('请填写政府检日期');
				WL.Toast.show('请填写政府检日期');
			}else if(value2=='点击文本设置时间'){
				alert('请填写技检验收日期');
				WL.Toast.show('请填写技检验收日期');
			}else if(value2!='点击文本设置时间'){
				if(oldTime>oldTime2){
					 alert('技检验收日期不能小于报政府检日期!');
					WL.Toast.show('技检验收日期不能小于报政府检日期!');
				 }else{
					 //合同号
					 var ENGCONTRACT_NUMBERobj=Ext.getCmp('ENGCONTRACT_NUMBER_id');
					 var ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBERobj.getValue();
					 //工号
				     var ELEVATOR_NO_id=Ext.getCmp('ELEVATOR_NO_id');
				     var ELEVATOR_NO=ELEVATOR_NO_id.getValue();
				     //批次
				     var SEQ_NUMobj=Ext.getCmp('SEQ_NUM_id');
				     var SEQ_NUM=SEQ_NUMobj.getValue();
				     var tcodeId1='zhengfujianTcode';
				       
				     var Tid=ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM;
				     console.log(Tid);
				     var coll=WL.JSONStore.get(collectionName);
					 var data={tcode:tcodeId1,tid:Tid};
					 var options={ };
					 coll.find(data,options).then(function(arrayResults){ 
						 var list=arrayResults[0].json.stext;
						 console.log(list);
					 	 var TASK_PROCESS_ID=list.TASK_PROCESS_ID;
					 	 var ORG_ID=list.ORG_ID;
					 	 var TASK_ID=list.TASK_ID;
					 	 var SEQ_NUM=list.SEQ_NUM;
					 	 var DEBUG_NUM=list.DEBUG_NUM;
					 	 var CHECK_NUM=list.CHECK_NUM;
					 	 var GOV_DATE_TIME=list.GOV_DATE_TIME;
					 	 //	var GOV_DATE=list.GOV_DATE;
					 	 // var GOV_CHECK_END_DATE=list.GOV_CHECK_END_DATE;
					 	 var GOV_CHECK_DATE=list.GOV_CHECK_DATE;
					 	 //alert("GOV_DATE_TIME:"+GOV_DATE_TIME);
					 	 //var GOV_CHECK_DATE=list.GOV_CHECK_DATE;
					 	getResult=function(res){
					 			 console.log(res);
					 			 console.log('ok');
					 	};
					 	var content="{'count':''," +
					 			"'USERID':'"+ebs_user_id+"'," +
					 			"'tcode':''," +
					 			"'TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"'," +
					 			"'ORG_ID':'"+ORG_ID+"'," +
					 			"'TASK_ID':'"+TASK_ID+"'," +
					 			"'SEQ_NUM':'"+SEQ_NUM+"'," +
					 			"'DEBUG_NUM':'"+DEBUG_NUM+"'," +
					 			"'CHECK_NUM':'"+CHECK_NUM+"'," +
					 			"'GOV_CHECK_DATE':'"+GOV_CHECK_DATE+"'," +
					 			"'GOV_CHECK_END_DATE':'"+value2+"'," +
					 			"'GOV_DATE_TIME':'"+GOV_DATE_TIME+"'," +
					 			"'GOV_DATE':'"+value+"'}";
				 		objthis.connectServer(getResult,'zhengfujianAction.do?method=toAdd',content);
					 }).fail(function(errorObject){
						 WL.Toast.whow('提交出错!');
					 });
				  };
			  };
		   },
		/**
		 **政府检信息维护页面
		 ************************************************************************************/

});