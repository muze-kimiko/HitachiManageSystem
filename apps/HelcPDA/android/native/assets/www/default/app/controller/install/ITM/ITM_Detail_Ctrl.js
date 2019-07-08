
/* JavaScript content from app/controller/install/ITM/ITM_Detail_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.ITM.ITM_Detail_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//点击工号列表查看详细信息
			"list#ITM_GH_list":{
				itemtap:'ITM_GH_list'
			},
			//返回到ITM工号列表
			"button#back_to_ITMGHList":{
				tap:'back_to_ITMGHList'
			},
			
		},
	},
	
	//点击工号列表查看详细信息
	ITM_GH_list : function(obj, index, target, record, e, eOpts ){
		var obj = this;
		var ITMGHStore = obj.getStore('ITMGHStore','HelcPDA.store.install.ITM.ITMGHStore');
		
		if(event.target.id!="itm_ENO_Checkbox"){
			obj.NextView('ITM_Detail_V','HelcPDA.view.install.ITM.ITM_Detail_V');
			//左右滑动页签
			var ITM_tab = Ext.getCmp('ITM_tab'); 
			//左右滑动页签
			var i =0;
			Ext.get('ITM_tab').on('swipe',function(e,t){
				
				if (e.direction === 'left' && e.distance >= 20) {
					ITM_tab.setActiveItem(ITM_tab.innerItems[i+1]);
					i++;
			    } else if (e.direction === 'right' && e.distance >= 20) {
			    	ITM_tab.setActiveItem(ITM_tab.innerItems[i-1]);
			    	i--;
			    }
			});
			var ELEVATOR_NO=ITMGHStore.getAt(index).get('ELEVATOR_NO');
			var SEQ_NUM=ITMGHStore.getAt(index).get('SEQ_NUM');
			
			var query={tcode:"ITM_data",tid:ELEVATOR_NO+'_'+SEQ_NUM};
			var options={
		    		   exact:false,
		       }; 
		       
			WL.JSONStore.get(collectionName).find(query,options).then(function(res){
				var data = res[0].json.stext;
				//查看数据
				Ext.getCmp('itm_ENGCONTRACT_NUMBER').setValue(data.ENGCONTRACT_NUMBER);
				Ext.getCmp('itm_ELEVATOR_NO').setValue(data.ELEVATOR_NO);
				Ext.getCmp('itm_CUSTOMER_NAME').setValue(data.CUSTOMER_NAME);
				Ext.getCmp('itm_INSTALL_ADDRESS').setValue(data.INSTALL_ADDRESS);
				Ext.getCmp('itm_PRODUCE_TYPE').setValue(data.PRODUCE_TYPE);
				Ext.getCmp('itm_SEQ_NUM').setValue(data.SEQ_NUM);
				Ext.getCmp('itm_EQUIPMENT_NO').setValue(data.EQUIPMENT_NO);
				Ext.getCmp('itm_CM_ELEVATOR_TYPE_NAME').setValue(data.CM_ELEVATOR_TYPE_NAME);
				Ext.getCmp('itm_ELEVATOR_CLASS_NAME').setValue(data.ELEVATOR_CLASS_NAME);
				Ext.getCmp('itm_dwNAME').setValue(data.dwNAME);
				Ext.getCmp('itm_dzNAME').setValue(data.dzNAME);
				Ext.getCmp('itm_dpNAME').setValue(data.dpNAME);
				Ext.getCmp('itm_BUDGET_INSTALL_METHOD').setValue(data.BUDGET_INSTALL_METHOD);
				var PARAM_C = data.PARAM_C;
				var PARAM_Z = data.PARAM_C;
				var PARAM_M = data.PARAM_C;
				var PARAM_C_Z_M = PARAM_C+'/'+PARAM_Z+'/'+PARAM_M;
				Ext.getCmp('itm_PARAM_C_Z_M').setValue(PARAM_C_Z_M);
				Ext.getCmp('itm_PARAM_ZZ').setValue(data.PARAM_ZZ);
				Ext.getCmp('itm_PARAM_SD').setValue(data.PARAM_SD);
				Ext.getCmp('itm_PARAM_TSGD').setValue(data.PARAM_TSGD);
				Ext.getCmp('itm_PARAM_JDZG').setValue(data.PARAM_JDZG);
				Ext.getCmp('itm_CCRQ').setValue(data.CCRQ);
				
				//录入数据
				//吊装开始时间
				var itm_LIFT_START_DATE = null;
				if(data.VALUE.LIFT_START_DATE==null||data.VALUE.LIFT_START_DATE=="点击选择时间"||data.VALUE.LIFT_START_DATE==""){
					itm_LIFT_START_DATE = Ext.getCmp('itm_LIFT_START_DATE').setValue(null);
				}else{
					itm_LIFT_START_DATE = Ext.getCmp('itm_LIFT_START_DATE').setValue(new Date(data.VALUE.LIFT_START_DATE));
				}
				//吊装结束时间
				var itm_LIFT_END_DATE = null;
				if(data.VALUE.LIFT_END_DATE==null||data.VALUE.LIFT_END_DATE=="点击选择时间"||data.VALUE.LIFT_END_DATE==""){
					itm_LIFT_END_DATE = Ext.getCmp('itm_LIFT_END_DATE').setValue(null);
				}else{
					itm_LIFT_END_DATE = Ext.getCmp('itm_LIFT_END_DATE').setValue(new Date(data.VALUE.LIFT_END_DATE));
				}
				//进场时间
				var itm_ENTRANCE_DATE = null;
				if(data.VALUE.ENTRANCE_DATE==null||data.VALUE.ENTRANCE_DATE=="点击选择时间"||data.VALUE.ENTRANCE_DATE==""){
					itm_ENTRANCE_DATE = Ext.getCmp('itm_ENTRANCE_DATE').setValue(null);
				}else{
					itm_ENTRANCE_DATE = Ext.getCmp('itm_ENTRANCE_DATE').setValue(new Date(data.VALUE.ENTRANCE_DATE));
				}
				//进场录入时间
				var itm_ENTRANCE_ENTER_DATE = null;
				if(data.VALUE.ENTRANCE_ENTER_DATE==null||data.VALUE.ENTRANCE_ENTER_DATE=="点击选择时间"||data.VALUE.ENTRANCE_ENTER_DATE==""){
					itm_ENTRANCE_ENTER_DATE = Ext.getCmp('itm_ENTRANCE_ENTER_DATE').setValue(null);
				}else{
					itm_ENTRANCE_ENTER_DATE = Ext.getCmp('itm_ENTRANCE_ENTER_DATE').setValue(new Date(data.VALUE.ENTRANCE_ENTER_DATE));
				}
				//报调试时间
				var itm_REPORT_DEBUG_DATE = null;
				if(data.VALUE.REPORT_DEBUG_DATE==null||data.VALUE.REPORT_DEBUG_DATE=="点击选择时间"||data.VALUE.REPORT_DEBUG_DATE==""){
					itm_REPORT_DEBUG_DATE = Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(null);
				}else{
					itm_REPORT_DEBUG_DATE = Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(new Date(data.VALUE.REPORT_DEBUG_DATE));
				}
				//报调试录入时间
				var itm_REPORT_DEBUG_ENTER_DATE = null;
				if(data.VALUE.REPORT_DEBUG_ENTER_DATE==null||data.VALUE.REPORT_DEBUG_ENTER_DATE=="点击选择时间"||data.VALUE.REPORT_DEBUG_ENTER_DATE==""){
					itm_REPORT_DEBUG_ENTER_DATE = Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').setValue(null);
				}else{
					itm_REPORT_DEBUG_ENTER_DATE = Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').setValue(new Date(data.VALUE.REPORT_DEBUG_ENTER_DATE));
				}
				
				//时间的限制
				//当吊装开始时间为空的时候，吊装结束时间不可填
				if(Ext.getCmp('itm_LIFT_END_DATE').getValue() ==  null || Ext.getCmp('itm_LIFT_END_DATE').getValue()=="点击选择时间"||Ext.getCmp('itm_LIFT_END_DATE').getValue()==""){
					Ext.getCmp('itm_LIFT_END_DATE').setDisabled(true);  
				}else{
					Ext.getCmp('itm_LIFT_END_DATE').setDisabled(false); 
				};
				//吊装结束时间填写前需先填写吊装开始时间
				var liftstartdate=Ext.getCmp('itm_LIFT_START_DATE');
					liftstartdate.addListener('change',obj.liftstartdate1,this,{
				});
				//吊装结束时间需大于等于吊装开始时间，且不大于当天时间
				var liftenddate=Ext.getCmp('itm_LIFT_END_DATE');
					liftenddate.addListener('change',obj.liftenddate1,this,{
				});
				//入场时间不小于吊装结束时间且不大于当天时间
				var entrancedate=Ext.getCmp('itm_ENTRANCE_DATE');
					entrancedate.addListener('change',obj.entrancedate1,this,{
				});
				//填写报调日期要先填写入场日期且不大于当天时间
				var reportdebugdate=Ext.getCmp('itm_REPORT_DEBUG_DATE');
					reportdebugdate.addListener('change',obj.reportdebugdate1,this,{
				});	
					
			});
		}else{
			
		}
	},
	
	
	
	//返回到ITM工号列表
	back_to_ITMGHList : function(){
		this.showBackView('ITM_EnoList_V','HelcPDA.view.install.ITM.ITM_EnoList_V');
	},
	
	
	//各种监听
	//监听吊装开始时间
    liftstartdate1 : function(obj, newDate, oldDate, eOpts ){
    	var itm_LIFT_START_DATE = Ext.getCmp('itm_LIFT_START_DATE').getValue();
    	var Today = new Date();
    	if(Date.parse(itm_LIFT_START_DATE)>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('itm_LIFT_START_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('itm_LIFT_START_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(itm_LIFT_START_DATE == null){
    	}else{
    		Ext.getCmp('itm_LIFT_END_DATE').setDisabled(false);  
    	}
    	if(newDate == null){
    		Ext.getCmp('itm_LIFT_END_DATE').setValue(null);
    		Ext.getCmp('itm_LIFT_END_DATE').setDisabled(true);
    	}
    },
    
  //监听吊装结束时间
    liftenddate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('itm_LIFT_END_DATE').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('itm_LIFT_END_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('itm_LIFT_END_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(Date.parse(Ext.getCmp('itm_LIFT_START_DATE').getValue())>Date.parse(newDate)){
    		Ext.getCmp('itm_LIFT_END_DATE').setValue(null);
    		WL.Toast.show("吊装结束时间不能小于吊装开始时间");
    	}
    },
	
    
  //进场时间
    entrancedate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	var LIFT_END_DATE = Ext.getCmp('itm_LIFT_END_DATE').getValue();
    	if(LIFT_END_DATE == null || LIFT_END_DATE ==  ""|| LIFT_END_DATE =="点击设置时间"){
    		Ext.getCmp('itm_ENTRANCE_DATE').setValue(null);
    		WL.Toast.show("请先填写吊装结束日期");
    	}else{
    		Ext.getCmp('itm_ENTRANCE_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    	};
    	
    	if(Date.parse(newDate)>Date.parse(Today)){
    		Ext.getCmp('itm_ENTRANCE_DATE').setValue(oldDate);
			WL.Toast.show("填写的日期不能大于今天");
    	}else{
    		Ext.getCmp('itm_ENTRANCE_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    		if(Date.parse(newDate)<Date.parse(LIFT_END_DATE)){
        		Ext.getCmp('itm_ENTRANCE_DATE').setValue(oldDate);
        		WL.Toast.show("入场时间不能小于吊装结束时间");
        	}
        	else{
        		Ext.getCmp('itm_ENTRANCE_DATE').setValue(newDate);
        		Ext.getCmp('itm_ENTRANCE_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
        	};
    	};
    	
    	
	},
	
	
	//报调试时间
	reportdebugdate1 : function(obj, newDate, oldDate, eOpts ){
		var Today = new Date();
    	var ENTRANCE_DATE = Ext.getCmp('itm_ENTRANCE_DATE').getValue();
    	if(ENTRANCE_DATE == null || ENTRANCE_DATE ==  ""|| ENTRANCE_DATE =="点击设置时间"){
    		Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(null);
    		WL.Toast.show("请先填写进场日期");
    	}else{
    		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    	};
    	
    	
    	if(Date.parse(newDate)>Date.parse(Today)){
    		Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(oldDate);
			WL.Toast.show("填写的日期不能大于今天");
    	}else{
    		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    		if(Date.parse(newDate)<Date.parse(ENTRANCE_DATE)){
        		Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(oldDate);
        		WL.Toast.show("入场时间不能小于吊装结束时间");
        	}
        	else{
        		Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue(newDate);
        		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
        	};
    	};
    	
	},
	
	
	
});