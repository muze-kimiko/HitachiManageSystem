
/* JavaScript content from app/controller/appworkspace/BatchApply/SpecialBatchApplyCtrl.js in folder common */
Ext.define('HelcPAD.controller.appworkspace.BatchApply.SpecialBatchApplyCtrl', {
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//特殊单头   返回   公用
			'button#specialBatchApply_id_FH':{
		    	tap:'specialBatchApply_id_FH'
		    },
		    'button#specialBatchApplySecond_id_FH':{
		    	tap:'specialBatchApply_id_FH'
		    },
		    'button#specialBatchApplyDetail_id_FH':{
		    	tap:'specialBatchApply_id_FH'
		    },
		    
			//特殊排产发货申请 list
		    'list#specialBatchApply_list':{
				itemtap:'specialBatchApply_list'
			},
			
			//批次详细信息 list
			'list#specialBatchApplySecond_id_list':{
				itemtap:'specialBatchApplySecond_id_list'
			},
			
			
		}
	},
	
	specialBatchApply_id_FH:function(){
		this.BackView();
	},
	
	specialBatchApply_list:function(dataview, index, target, record, e, eOpts){
		var id=record.data.SPECIAL_LINE_ID;
		if(record.data.LOT_NUM=='此条特殊分批单不存在批次信息'){
			return;
		};
		var obj=this;
		//单据行
		var params = {
				adpName:'HttpAdapter_PAD_ApplyFor',
				prodName:'getRecieve_SPECIALBILL_LINESELEVATOR',
				parameters: id,
				Flag:true,
		};
		
		var getResult =function(result){
			
			//批次信息
			obj.NextView('specialBatchApplySecond_id','HelcPAD.view.appworkspace.BatchApply.SpecialBatchApplySecond');
			//cc.log(record.data);
			Ext.getCmp('LOT_NUM_SBAS').setValue(record.data.LOT_NUM);
			Ext.getCmp('APPLY_TYPE_SBAS').setValue(record.data.APPLY_TYPE);
			Ext.getCmp('APPLY_REASON_SBAS').setValue(record.data.APPLY_REASON);
			Ext.getCmp('APPLY_DATE_SBAS').setValue(record.data.APPLY_DATE);
			Ext.getCmp('ENABLE_FLAG_SBAS').setValue(record.data.ENABLE_FLAG);
			Ext.getCmp('STATUS_MEAN_SBAS').setValue(record.data.STATUS_MEAN);
			Ext.getCmp('APPLY_COMMENTS_SBAS').setValue(record.data.APPLY_COMMENTS);
			Ext.getCmp('DEBT_REC_DATE_SBAS').setValue(record.data.DEBT_REC_DATE);
			Ext.getCmp('AVG_PRE_RECEIPT_RATE_SBAS').setValue(record.data.AVG_PRE_RECEIPT_RATE);
			Ext.getCmp('AVG_TDG_RECEIPT_RATE_SBAS').setValue(record.data.AVG_TDG_RECEIPT_RATE);
			Ext.getCmp('ALL_INV_PRICE_SBAS').setValue(record.data.ALL_INV_PRICE);
			Ext.getCmp('ALL_INV_DAYS_SBAS').setValue(record.data.ALL_INV_DAYS);
			Ext.getCmp('APPLY_REDUCE_PERCENT_SBAS').setValue(record.data.APPLY_REDUCE_PERCENT);
			Ext.getCmp('APPROVED_REDUCE_PERCENT_SBAS').setValue(record.data.APPROVED_REDUCE_PERCENT);
			
			//cc.log('--------------result');
			//cc.log(result);
			var vv=result.Recieve_SPECIALBILL_LINESELEVATORResponse["return"];
			//cc.log('--------------vv');
			//cc.log(vv);
			var json = eval("("+ vv +")");
			//cc.log('--------------json');
			//cc.log(json);
			var data=json.specialbill_head_line_list;
			//cc.log('--------------data');
			//cc.log(data);
			
			var Bacth=Ext.data.StoreManager.get('SpecialBatchApplySecondStore');
			if(!Bacth){
				Bacth=Ext.create('HelcPAD.store.appworkspace.BatchApply.SpecialBatchApplySecondStore');
			};
			
			//没数据的情况下提示
			var length=data.length;
			if(length==0){
				var ts={
					ELEVATOR_NO:'此条特殊分批单不存在单据行'
				};
				Bacth.setData(ts);
			}else{
				Bacth.setData(data);
			};
			
		};
		
		obj.getApplyFor(obj,getResult,params);

	},
	
	specialBatchApplySecond_id_list:function(dataview, index, target, record, e, eOpts){
		var rd=record.data;
		if(record.data.ELEVATOR_NO=='此条特殊分批单不存在单据行'){
			return;
		};
		//cc.log(rd);
		this.NextView('specialBatchApplyDetail_id','HelcPAD.view.appworkspace.BatchApply.SpecialBatchApplyDetail');
		Ext.getCmp('ELEVATOR_NO').setValue(record.data.ELEVATOR_NO);
		Ext.getCmp('EQUIPMENT_NO').setValue(record.data.EQUIPMENT_NO);
		Ext.getCmp('CM_ELEVATOR_TYPE_NAME').setValue(record.data.CM_ELEVATOR_TYPE_NAME);
		Ext.getCmp('SPLIT_BATCH_FLAG').setValue(record.data.SPLIT_BATCH_FLAG);
		Ext.getCmp('PRE_RECEIPT_RATE').setValue(record.data.PRE_RECEIPT_RATE);
		Ext.getCmp('RECEIPT_RATE').setValue(record.data.RECEIPT_RATE);
		Ext.getCmp('INV_DAYS').setValue(record.data.INV_DAYS);
		Ext.getCmp('INV_PRICE').setValue(record.data.INV_PRICE);
	},
	
});