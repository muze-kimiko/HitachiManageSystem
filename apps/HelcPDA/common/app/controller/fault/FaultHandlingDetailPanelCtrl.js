/**
 * 派工信息监视器  xcx  2014-4-17
 */
Ext.define('HelcPDA.controller.fault.FaultHandlingDetailPanelCtrl',{
	id:'FaultHandDP',
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			/************************************************************************************
			 * 急修处理模块  派工信息页面
			 * */
			
			//返回待处理故障列表
			FaultFHDPButton:'button[id=FaultFHDPButton]',
			
			//进入页面
			dzButton_id:'button[id=dzButton_id]',
			
			//进入故障报表页面
			gzbgButton_id:'button[id=gzbgButton_id]',
			
			/**
			 **急修处理模块  派工信息页面
			 ************************************************************************************/	
		},
		control:{
			
			/************************************************************************************
			 * 急修处理模块  派工信息页面
			 * */
			//返回待处理故障列表
			'button#FaultFHDPButton':{
				tap:'FaultFHDPButton'
			},
			
			//进入反馈信息页面
			'button#dzButton_id':{
				tap:'dzButton_id'
			},
			
			//进入故障报表页面
			'button#gzbgButton_id':{
				tap:'gzbgButton_id'
			},
				
			/**
			 **急修处理模块  派工信息页面
			 ************************************************************************************/	
		},
	},
	
	/************************************************************************************
	 * 急修处理模块  派工信息页面
	 * */
	
	//返回待处理故障列表
	FaultFHDPButton:function(){
		//console.log('跳转到待处理故障列表');
//		this.showBackView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
		MainCtr.BackView();
		faultHandingPC_NEW(MainCtr);
	},
	
	//进入反馈信息页面
	dzButton_id:function(){
		//页面的是否困人
		var KUREN=Ext.getCmp('BOX_UP').getValue();
		//console.log('是否困人'+KUREN);
		
		Ext.Viewport.removeMenu('right');
		this.NextView('faultdandlingFP_id','HelcPDA.view.fault.FaultHandlingFeedbackPanel');

		//获得处理情况状态
		var stauts=Ext.getCmp('FaultFHDP_STATUS').getValue();
		//console.log('状态'+stauts);
	
		//活动ID
		var act=Ext.getCmp('ACTIVITYID').getValue();
		
    	function jieguo(result){
    		console.log('查询结果  '+JSON.stringify(result));
    		var data=result.rows[0];
    		
    		//出-到-救-完-按钮
    		var cf=Ext.getCmp('faultdandlingFP_id_time_id');
    		var dc=Ext.getCmp('time_id2');
    		var jr=Ext.getCmp('time_id3');
    		var wg=Ext.getCmp('time_id4');
    		
    		var cf_T=Ext.getCmp('STATUS_START_TIME');
    		var dc_T=Ext.getCmp('STATUS_ARRIVED_TIME');
    		var jr_T=Ext.getCmp('STATUS_RESCUE_TIME');
    		var wg_T=Ext.getCmp('STATUS_COMPLETE_TIME');
    		
    		//是否注销控件
    		var DisFlag=[true,true,true,true];
    		//按钮文本
    		var DataText='完工';
    		
    		if(data.START_TIME==''){
    			DisFlag[0]=false;
				DataText='出发';
    		}else if(data.ARRIVE_TIME==''){
    			DisFlag[1]=false;
    			DataText='到场';
    		}else if(data.RESCUE_TIME==''){
    			if(KUREN==''&&data.REPAIR_COMPLETE_TIME==''){
    				DisFlag[3]=false;
    			}else if(KUREN=='困人'){
    				DisFlag[2]=false;
        			DataText='救人';
    			}else{
    				Ext.getCmp('sbButton_id').setDisabled(true);
    			};
    		}else if(data.REPAIR_COMPLETE_TIME==''){
    			DisFlag[3]=false;
    		}else{
    			Ext.getCmp('sbButton_id').setDisabled(true);
    		}
    	
    		//注销
    		Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(DisFlag[0]);
			Ext.getCmp('time_id2').setDisabled(DisFlag[1]);
			Ext.getCmp('time_id3').setDisabled(DisFlag[2]);
			Ext.getCmp('time_id4').setDisabled(DisFlag[3]);
    		
			//按钮文本
			Ext.getCmp('sbButton_id').setText(DataText);
			
			//填值
			cf.setValue(data.START_TIME);
			dc.setValue(data.ARRIVE_TIME);
			jr.setValue(data.RESCUE_TIME);
			wg.setValue(data.REPAIR_COMPLETE_TIME);
    		
			cf_T.setValue(data.STATUS_START_TIME);
			dc_T.setValue(data.STATUS_ARRIVED_TIME);
			jr_T.setValue(data.STATUS_RESCUE_TIME);
			wg_T.setValue(data.STATUS_COMPLETE_TIME);

			if(data.REPAIR_COMPLETE_TIME!=''&&data.REPAIR_COMPLETE_TIME!=''){
				WL.Toast.show('这条数据的进度已处理完成,无需进行任何操作！');				
			}
    	
    	};  
    	var content={};
    	content.iswhere='where ACTIVITY_ID='+"'"+act+"'";
	 	this.connectServer(jieguo,'fankuixinxiAction.do?method=toSearch',JSON.stringify(content));
		
	},
	
	//进入故障报表页面
	gzbgButton_id:function(){
		var obj = this;
		Ext.Viewport.removeMenu('right');
		// 判断是否有录入到场时间
		function handleResult(result) {
			if (result.flag == "1") {
				obj.NextView('faultHandlingReportPanel','HelcPDA.view.fault.FaultHandlingReportPanel');
				console.log('----------------123');
				//故障报表详细信息
				//obj.getFaultReport();
				console.log('----------------321');
				//判断故障表报是否提交，使提交可以回退
				obj.getJXCL_SubmitVerification('one');
			} else {
				Ext.Msg.alert("提示","必须在反馈信息录入到场时间，才能填写故障报告书！");
			}
		}
		var searchKey = {};
		searchKey.ACTIVITY_ID = Ext.getCmp("ACTIVITYID").getValue();
		obj.connectServer(handleResult,'fankuixinxiAction.do?method=toSearchDC', JSON.stringify(searchKey));

		baogaoshu(obj);
	
	
		
		
		
		//报告书zhj 
//		   function  baogaoshu(obj){
//		        var getresult=function(res){
//		        	var data=res.content;
//		        	console.log("ressss",data);
//		        	var options={};
//		        	WL.JSONStore.get(collectionName).add(data,options).then(function (re){
//		        		console.log("报告书同步成功！");
//		        		
//		        	}	
//		        	).fail(function(err){
//		        		 console.log("报告书同步失败！"); 
//		        	});
//		        	
//		        };
//		        
//		        //先判断本地是否有数据
//		        var options={exacte:true};
//		        var query={formwork:'乘客电梯、载货电梯保养维修报告书'};
//		        WL.JSONStore.get(collectionName).find(query,options).then(function(res){      	
//		        	console.log("本地有数据！");
//		        	if(res.length==0)
//		            obj.asyconnectServer(getresult,"maintainancePlanItemListAction.do?method=toReport","");	
//		        	 	
//		        }).fail(function(err){
//		        	console.log('本地没数据！');
//		        	
//		        });
//		    
//		        
//		        
//		    	
//		    }
			   
			   //报告书zhj 
			   function  baogaoshu(obj){
			        var getresult=function(res){
			        	var data=res.content;
			        	console.log("ressss",data);	        
			        	var query={formwork_type:'fullyear,repair'};
			        	var options={exact:false};
			        	WL.JSONStore.get(collectionName).remove(query,options).then(function(res){
			        		console.log("成功了！");

				        	var options={};
				        	WL.JSONStore.get(collectionName).add(data,options).then(function (re){
				        		console.log("报告书同步成功！");
				        	}	
				        	).fail(function(err){
				        		 console.log("报告书同步失败！"); 
				        	});
			        	}).fail(function(err){
			        		console.log("失败了！");
			        	});
			        	
			        };
		            obj.asyconnectServer(getresult,"maintainancePlanItemListAction.do?method=toReport","");		    	
			    }
	

	},
	
	//故障报表详细信息
	getFaultReport:function(){},
	
	/**
	 **急修处理模块  派工信息页面
	 ************************************************************************************/	


/////////
});